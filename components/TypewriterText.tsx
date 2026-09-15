"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterTextProps {
  paragraphs: string[];
  className?: string;
  paragraphClassName?: string;
  speed?: number;
  startDelay?: number;
}

export default function TypewriterText({
  paragraphs,
  className = "",
  paragraphClassName = "",
  speed = 12,
  startDelay = 1000,
}: TypewriterTextProps) {
  const fullText = paragraphs.join("\n\n");
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let tickTimeout: ReturnType<typeof setTimeout>;
    const startTimeout = setTimeout(() => {
      let i = 0;
      const tick = () => {
        i += 1;
        setCount(i);
        if (i < fullText.length) {
          tickTimeout = setTimeout(tick, speed);
        }
      };
      tick();
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(tickTimeout);
    };
  }, [started, fullText, speed, startDelay]);

  const typed = fullText.slice(0, count);
  const typedParagraphs = typed.split("\n\n");
  const isDone = count >= fullText.length;

  return (
    <div ref={ref} className={className}>
      <span className="sr-only">{paragraphs.join(" ")}</span>
      <div aria-hidden="true">
        {typedParagraphs.map((paragraph, index) => (
          <p key={index} className={paragraphClassName}>
            {paragraph}
            {!isDone && index === typedParagraphs.length - 1 && (
              <span className="typewriter-cursor" />
            )}
          </p>
        ))}
      </div>
    </div>
  );
}
