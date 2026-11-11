"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/*
 * Chef cut-out on a rope, driven by a small physics simulation:
 *  1. free fall under gravity while the rope pays out (slack),
 *  2. rope goes taut and acts like a stiff spring (bounces, can go slack again),
 *  3. a damped pendulum swing, kicked when the rope first snaps tight.
 */

const G = 2800; // gravity, px/s²
const K = 1100; // rope stiffness (spring constant / mass), 1/s²
const C = 14; // rope damping, 1/s
const SWING_DAMP = 0.32; // pendulum damping, 1/s
const SWING_KICK = 0.55; // angular velocity added when the rope snaps taut, rad/s
const HAT_X = 0.423; // hat tip in chef.png: 42.3% from the left…
const HAT_Y = 0.02; // …and 2% from the top

export default function HangingChef({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const swingRef = useRef<HTMLDivElement>(null);
  const ropeRef = useRef<HTMLSpanElement>(null);
  const chefRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const swing = swingRef.current;
    const rope = ropeRef.current;
    const chef = chefRef.current;
    if (!container || !swing || !rope || !chef) return;

    const ANCHOR = 12; // anchor block height
    let restLen = 0; // rope length when hanging still
    let chefH = 0;

    const measure = () => {
      chefH = chef.offsetHeight;
      restLen = Math.max(80, container.clientHeight - ANCHOR - chefH * (1 - HAT_Y));
    };

    // y = stretch past rest length (negative = rope slack / chef still above)
    let y = 0;
    let vy = 0;
    let theta = 0;
    let omega = 0;
    let kicked = false;
    let raf = 0;
    let last = 0;
    let running = false;

    const render = () => {
      const len = restLen + y;
      rope.style.height = `${Math.max(0, len)}px`;
      // when the chef is still above the anchor, the rope is fully wound in
      chef.style.transform = `translateY(${Math.min(0, len)}px)`;
      swing.style.transform = `rotate(${theta}rad)`;
    };

    const step = (t: number) => {
      const dt = Math.min(0.033, (t - last) / 1000 || 0.016);
      last = t;

      // vertical: gravity always, spring only when rope is taut
      let ay = G;
      if (y > 0) {
        ay += -K * y - C * vy;
        if (!kicked) {
          omega += SWING_KICK;
          kicked = true;
        }
      }
      vy += ay * dt;
      y += vy * dt;

      // pendulum about the anchor
      const L = Math.max(60, restLen + y + chefH * 0.5);
      omega += (-(G / L) * Math.sin(theta) - SWING_DAMP * omega) * dt;
      theta += omega * dt;

      render();

      const settled =
        Math.abs(y - G / K) < 0.5 && Math.abs(vy) < 2 && Math.abs(theta) < 0.002 && Math.abs(omega) < 0.002;
      if (settled) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      measure();
      y = -(restLen + chefH + 40); // start fully above the section
      vy = 0;
      theta = 0;
      omega = 0;
      kicked = false;
      chef.style.visibility = "visible";
      render();
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(step);
    };

    measure();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      y = 0;
      chef.style.visibility = "visible";
      render();
    } else {
      // hidden above until it drops
      y = -(restLen + chefH + 40);
      render();
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduced) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.45 }
    );
    io.observe(container);

    const ro = new ResizeObserver(() => {
      measure();
      if (!running) render();
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex min-h-[500px] flex-col items-center sm:min-h-[600px] lg:min-h-[660px] ${className}`}
    >
      {/* Ceiling anchor (does not swing) */}
      <span className="relative z-10 h-3 w-12 shrink-0 rounded-b-full bg-ink/85 shadow" />

      {/* Everything below rotates around the anchor */}
      {/* absolute so rope stretch never changes the layout height */}
      <div
        ref={swingRef}
        className="absolute inset-x-0 top-3 flex origin-top flex-col items-center will-change-transform"
      >
        {/* Twisted rope */}
        <span
          ref={ropeRef}
          aria-hidden
          className="block w-[5px] shrink-0 rounded-b-full shadow-[1px_0_2px_rgba(24,22,19,0.25)]"
          style={{
            height: 0,
            backgroundImage:
              "repeating-linear-gradient(135deg, #8A6A38 0 3px, #D4B788 3px 6px, #B08B4F 6px 8px)",
          }}
        />

        <div ref={chefRef} className="w-full max-w-md will-change-transform" style={{ visibility: "hidden" }}>
          {/* Knot — tucked behind the hat so only the rope is visible going in */}
          <span className="relative z-0 mx-auto -mb-5 block h-4 w-4 rounded-full border-2 border-gold-dark bg-gold-light" />
          {/* chef.png is square; shift so the hat tip sits over the knot */}
          <div
            className="relative z-10 aspect-square w-full"
            style={{ transform: `translate(${(0.5 - HAT_X) * 100}%, -${HAT_Y * 100}%)` }}
          >
            <Image
              src="/chef/chef.png"
              alt="VELORA head chef"
              fill
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
