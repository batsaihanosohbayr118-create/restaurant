"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Star, CheckCircle2, Trash2 } from "lucide-react";
import { getMyReview, submitReview, deleteMyReview } from "@/app/actions/reviews";
import Reveal from "./Reveal";

export default function ReviewForm() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [hasReview, setHasReview] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Grow the textarea with its content instead of reserving empty lines.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [text]);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") return;
    let cancelled = false;
    getMyReview().then((existing) => {
      if (cancelled) return;
      if (existing) {
        setHasReview(true);
        setRating(existing.rating);
        setText(existing.review);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [status]);

  if (status === "loading") return null;

  if (!session) {
    return (
      <Reveal className="mx-auto mt-14 max-w-xl">
        <div className="border border-linen/10 p-8 text-center" style={{ backgroundColor: "#211D18" }}>
          <p className="text-sm text-linen/70">
            Have you dined with us?{" "}
            <a href="/login" className="text-gold underline underline-offset-4" style={{ color: "#B08B4F" }}>
              Log in
            </a>{" "}
            to share your experience.
          </p>
        </div>
      </Reveal>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    const result = await submitReview({ rating, review: text });

    setSubmitting(false);

    if (result.success) {
      setHasReview(true);
      setSuccess(true);
      router.refresh();
    } else {
      setError(result.error);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);
    const result = await deleteMyReview();
    setDeleting(false);

    if (result.success) {
      setHasReview(false);
      setRating(5);
      setText("");
      setSuccess(false);
      router.refresh();
    } else {
      setError(result.error);
    }
  };

  return (
    <Reveal className="mx-auto mt-14 max-w-xl">
      <div className="border border-linen/10 p-8" style={{ backgroundColor: "#211D18" }}>
        <p className="text-center text-sm text-linen/70">
          {hasReview ? "Update your review" : "Share your experience"}
        </p>

        <form onSubmit={handleSubmit} className="mt-5">
          <div className="flex justify-center gap-1.5">
            {Array.from({ length: 5 }, (_, i) => {
              const value = i + 1;
              const filled = value <= (hoverRating || rating);
              return (
                <button
                  key={value}
                  type="button"
                  aria-label={`${value} star${value === 1 ? "" : "s"}`}
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1"
                >
                  <Star
                    size={26}
                    className={filled ? "fill-gold text-gold" : "text-linen/20"}
                    style={filled ? { fill: "#B08B4F", color: "#B08B4F" } : undefined}
                  />
                </button>
              );
            })}
          </div>

          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={1}
            maxLength={500}
            placeholder="Tell other guests what stood out about your visit..."
            className="mt-5 block max-h-48 w-full resize-none overflow-y-auto border-b border-linen/20 bg-transparent py-2 text-sm leading-relaxed text-linen placeholder:text-linen/30 focus:border-gold focus:outline-none transition-colors duration-300"
          />

          {error && <p className="mt-3 text-center text-sm text-red-400">{error}</p>}

          {success && !error && (
            <p className="mt-3 flex items-center justify-center gap-2 text-center text-sm text-gold" style={{ color: "#B08B4F" }}>
              <CheckCircle2 size={16} />
              Thank you for your review.
            </p>
          )}

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-2.5 text-sm text-ink transition-colors duration-300 hover:bg-linen disabled:cursor-not-allowed disabled:opacity-60"
              style={{ backgroundColor: "#B08B4F" }}
            >
              {submitting ? "Saving..." : hasReview ? "Update Review" : "Post Review"}
            </button>

            {hasReview && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-1.5 text-sm text-linen/50 transition-colors duration-300 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Trash2 size={14} />
                {deleting ? "Removing..." : "Remove"}
              </button>
            )}
          </div>
        </form>
      </div>
    </Reveal>
  );
}
