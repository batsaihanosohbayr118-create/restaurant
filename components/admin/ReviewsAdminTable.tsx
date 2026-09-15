"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, Star } from "lucide-react";
import { saveReview, deleteReview, type ReviewInput } from "@/app/actions/admin";
import type { Review } from "@/lib/types";

const inputClasses =
  "w-full border border-ink/15 bg-white/60 px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none transition-colors duration-300";

const emptyForm: ReviewInput = { name: "", rating: 5, review: "", avatar: "" };

export default function ReviewsAdminTable({ reviews }: { reviews: Review[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ReviewInput>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const openCreate = () => {
    setForm(emptyForm);
    setError(null);
    setShowForm(true);
  };

  const openEdit = (review: Review) => {
    setForm({
      id: review.id,
      name: review.name,
      rating: review.rating,
      review: review.review,
      avatar: review.avatar ?? "",
    });
    setError(null);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await saveReview(form);
      setShowForm(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete review from "${name}"? This cannot be undone.`)) return;
    await deleteReview(id);
    router.refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs tracking-widest2 text-gold-dark" style={{ color: "#8A6A38" }}>
            Manage
          </p>
          <h1 className="mt-2 font-display text-3xl text-ink">Reviews</h1>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-ink px-5 py-2.5 text-sm text-linen transition-colors duration-300 hover:bg-gold hover:text-ink"
        >
          <Plus size={16} />
          Add Review
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="relative mt-8 grid grid-cols-1 gap-4 border border-ink/10 bg-white/50 p-6 sm:grid-cols-2"
        >
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="absolute right-4 top-4 text-ink/40 hover:text-ink"
          >
            <X size={18} />
          </button>

          <h2 className="col-span-full font-display text-xl text-ink">
            {form.id ? "Edit Review" : "New Review"}
          </h2>

          <div>
            <label className="mb-1 block text-xs text-ink/50">Guest Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClasses}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-ink/50">Rating (1-5)</label>
            <input
              required
              type="number"
              min={1}
              max={5}
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              className={inputClasses}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs text-ink/50">Avatar URL (optional)</label>
            <input
              type="url"
              value={form.avatar}
              onChange={(e) => setForm({ ...form, avatar: e.target.value })}
              className={inputClasses}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs text-ink/50">Review Text</label>
            <textarea
              required
              rows={3}
              value={form.review}
              onChange={(e) => setForm({ ...form, review: e.target.value })}
              className={`${inputClasses} resize-none`}
            />
          </div>

          {error && <p className="col-span-full text-sm text-red-600">{error}</p>}

          <div className="col-span-full mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="border border-ink/15 px-5 py-2.5 text-sm text-ink/70 hover:text-ink"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-ink px-6 py-2.5 text-sm text-linen transition-colors duration-300 hover:bg-gold hover:text-ink disabled:opacity-60"
            >
              {submitting ? "Saving..." : "Save Review"}
            </button>
          </div>
        </form>
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div key={review.id} className="flex flex-col justify-between border border-ink/10 bg-white/40 p-5">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-ink">{review.name}</p>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={i < review.rating ? "fill-gold text-gold" : "text-ink/20"}
                      style={i < review.rating ? { fill: "#B08B4F", color: "#B08B4F" } : undefined}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">{review.review}</p>
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button onClick={() => openEdit(review)} className="text-ink/50 hover:text-gold">
                <Pencil size={16} />
              </button>
              <button onClick={() => handleDelete(review.id, review.name)} className="text-ink/50 hover:text-red-600">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {reviews.length === 0 && (
          <p className="col-span-full py-8 text-center text-ink/40">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
