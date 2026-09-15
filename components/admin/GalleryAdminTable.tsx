"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { saveGalleryImage, deleteGalleryImage, type GalleryImageInput } from "@/app/actions/admin";
import Select from "./Select";

const categories = ["Interior", "Chef", "Dishes", "Table", "Drinks", "Kitchen"];

interface AdminGalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  sortOrder: number;
}

const inputClasses =
  "w-full border border-ink/15 bg-white/60 px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none transition-colors duration-300";

const emptyForm: GalleryImageInput = {
  src: "",
  alt: "",
  category: categories[0],
  sortOrder: 0,
};

export default function GalleryAdminTable({ images }: { images: AdminGalleryImage[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<GalleryImageInput>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const openCreate = () => {
    setForm({ ...emptyForm, sortOrder: images.length });
    setError(null);
    setShowForm(true);
  };

  const openEdit = (image: AdminGalleryImage) => {
    setForm({
      id: image.id,
      src: image.src,
      alt: image.alt,
      category: image.category,
      sortOrder: image.sortOrder,
    });
    setError(null);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await saveGalleryImage(form);
      setShowForm(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, alt: string) => {
    if (!confirm(`Delete "${alt}"? This cannot be undone.`)) return;
    await deleteGalleryImage(id);
    router.refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs tracking-widest2 text-gold-dark" style={{ color: "#8A6A38" }}>
            Manage
          </p>
          <h1 className="mt-2 font-display text-3xl text-ink">Gallery</h1>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-ink px-5 py-2.5 text-sm text-linen transition-colors duration-300 hover:bg-gold hover:text-ink"
        >
          <Plus size={16} />
          Add Image
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
            {form.id ? "Edit Image" : "New Image"}
          </h2>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs text-ink/50">Image URL</label>
            <input
              required
              type="url"
              value={form.src}
              onChange={(e) => setForm({ ...form, src: e.target.value })}
              className={inputClasses}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-ink/50">Alt Text / Caption</label>
            <input
              required
              value={form.alt}
              onChange={(e) => setForm({ ...form, alt: e.target.value })}
              className={inputClasses}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-ink/50">Category</label>
            <Select
              value={form.category}
              onChange={(category) => setForm({ ...form, category })}
              options={categories}
              className={inputClasses}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-ink/50">Sort Order</label>
            <input
              type="number"
              min={0}
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
              className={inputClasses}
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
              {submitting ? "Saving..." : "Save Image"}
            </button>
          </div>
        </form>
      )}

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((image) => (
          <div key={image.id} className="group relative aspect-square overflow-hidden border border-ink/10">
            <Image src={image.src} alt={image.alt} fill sizes="240px" className="object-cover" />
            <div className="absolute inset-0 flex flex-col justify-between bg-ink/0 p-3 opacity-0 transition-all duration-300 group-hover:bg-ink/60 group-hover:opacity-100">
              <span className="self-start bg-ink/70 px-2 py-1 text-[10px] uppercase tracking-wide text-linen">
                {image.category}
              </span>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => openEdit(image)}
                  className="bg-linen/90 p-2 text-ink transition-colors hover:bg-gold"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(image.id, image.alt)}
                  className="bg-linen/90 p-2 text-ink transition-colors hover:bg-red-500 hover:text-white"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {images.length === 0 && (
          <p className="col-span-full py-8 text-center text-ink/40">No gallery images yet.</p>
        )}
      </div>
    </div>
  );
}
