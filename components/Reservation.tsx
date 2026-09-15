"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { createReservation } from "@/app/actions/reservations";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import GuestsPicker from "./GuestsPicker";
import Reveal from "./Reveal";

const inputClasses =
  "w-full border-b border-ink/20 bg-transparent py-3 text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none transition-colors duration-300";

export default function Reservation() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("2");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitted) {
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [submitted]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setSubmitting(true);
    setError(null);

    const result = await createReservation({
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      date: String(formData.get("date") || ""),
      time: String(formData.get("time") || ""),
      guests: Number(formData.get("guests") || 1),
      request: String(formData.get("request") || ""),
    });

    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error ?? "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="relative bg-linen pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <Reveal className="text-center">
          <p className="text-xs tracking-widest2 text-gold-dark" style={{ color: "#8A6A38" }}>
            Book Your Evening
          </p>
          <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
            Reserve a Table
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink/60">
            For parties of eight or more, please contact us directly so we
            can prepare the room for you.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-14">
          {submitted ? (
            <div ref={successRef} className="flex flex-col items-center border border-gold/40 px-8 py-16 text-center animate-scale-in scroll-mt-32">
              <CheckCircle2 size={40} className="text-gold" style={{ color: "#B08B4F" }} />
              <h3 className="mt-5 font-display text-2xl text-ink">
                Reservation Requested
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/60">
                Thank you, {name || "guest"}. We&apos;ve received your request
                for {guests} guest{guests === "1" ? "" : "s"} on {date || "your chosen date"} at{" "}
                {time || "your chosen time"}. A member of our team will
                confirm shortly by phone or email.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-8 border border-gold px-6 py-2.5 text-sm text-gold transition-colors duration-300 hover:bg-gold hover:text-ink"
              >
                Make Another Reservation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="mb-1 block text-xs text-ink/50">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-1 block text-xs text-ink/50">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-xs text-ink/50">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@email.com"
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="date" className="mb-1 block text-xs text-ink/50">
                  Date
                </label>
                <DatePicker
                  id="date"
                  name="date"
                  required
                  value={date}
                  onChange={setDate}
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="time" className="mb-1 block text-xs text-ink/50">
                  Time
                </label>
                <TimePicker
                  id="time"
                  name="time"
                  required
                  value={time}
                  onChange={setTime}
                  className={inputClasses}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="guests" className="mb-1 block text-xs text-ink/50">
                  Number of Guests
                </label>
                <GuestsPicker
                  id="guests"
                  name="guests"
                  value={guests}
                  onChange={setGuests}
                  className={inputClasses}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="request" className="mb-1 block text-xs text-ink/50">
                  Special Request
                </label>
                <textarea
                  id="request"
                  name="request"
                  rows={3}
                  placeholder="Allergies, celebrations, seating preferences..."
                  className={`${inputClasses} resize-none`}
                />
              </div>

              {error && (
                <p className="sm:col-span-2 text-center text-sm text-red-600">{error}</p>
              )}

              <div className="sm:col-span-2 mt-4 flex justify-center">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-ink px-10 py-3.5 text-sm tracking-wide text-linen transition-colors duration-300 hover:bg-gold hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Reserve a Table"}
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}