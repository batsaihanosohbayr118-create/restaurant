"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Pencil, Trash2, X, Star } from "lucide-react";
import { saveMenuItem, deleteMenuItem, type MenuItemInput } from "@/app/actions/admin";
import { menuCategories } from "@/lib/types";
import Select from "./Select";
import { useConfirm } from "./ConfirmDialog";

interface AdminMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  signature: boolean;
  signatureOrder: number | null;
}

const inputClasses =
  "w-full border border-ink/15 bg-white/60 px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none transition-colors duration-300";

const emptyForm: MenuItemInput = {
  name: "",
  description: "",
  price: 0,
  category: menuCategories[0],
  image: "",
  signature: false,
  signatureOrder: null,
};

export default function MenuAdminTable({ items }: { items: AdminMenuItem[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<MenuItemInput>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { confirm, ConfirmDialog } = useConfirm();

  const openCreate = () => {
    setForm(emptyForm);
    setError(null);
    setShowForm(true);
  };

  const openEdit = (item: AdminMenuItem) => {
    setForm({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      signature: item.signature,
      signatureOrder: item.signatureOrder,
    });
    setError(null);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await saveMenuItem(form);
      setShowForm(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    const ok = await confirm({ description: `Delete "${name}"? This cannot be undone.` });
    if (!ok) return;
    await deleteMenuItem(id);
    router.refresh();
  };

  return (
    <div>
      {ConfirmDialog}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs tracking-widest2 text-gold-dark" style={{ color: "#8A6A38" }}>
            Manage
          </p>
          <h1 className="mt-2 font-display text-3xl text-ink">Menu Items</h1>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-ink px-5 py-2.5 text-sm text-linen transition-colors duration-300 hover:bg-gold hover:text-ink"
        >
          <Plus size={16} />
          Add Item
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
            {form.id ? "Edit Item" : "New Item"}
          </h2>

          <div>
            <label className="mb-1 block text-xs text-ink/50">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClasses}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-ink/50">Category</label>
            <Select
              value={form.category}
              onChange={(category) => setForm({ ...form, category })}
              options={menuCategories}
              className={inputClasses}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-ink/50">Price (USD)</label>
            <input
              required
              type="number"
              min={0}
              step="0.01"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              className={inputClasses}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-ink/50">Image URL</label>
            <input
              required
              type="url"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className={inputClasses}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs text-ink/50">Description</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={`${inputClasses} resize-none`}
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              id="signature"
              type="checkbox"
              checked={form.signature}
              onChange={(e) =>
                setForm({
                  ...form,
                  signature: e.target.checked,
                  signatureOrder: e.target.checked ? form.signatureOrder ?? 0 : null,
                })
              }
              className="h-4 w-4 accent-[#B08B4F]"
            />
            <label htmlFor="signature" className="text-sm text-ink/70">
              Signature dish (featured on homepage)
            </label>
          </div>

          {form.signature && (
            <div>
              <label className="mb-1 block text-xs text-ink/50">Display Order</label>
              <input
                type="number"
                min={0}
                value={form.signatureOrder ?? 0}
                onChange={(e) => setForm({ ...form, signatureOrder: Number(e.target.value) })}
                className={inputClasses}
              />
            </div>
          )}

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
              {submitting ? "Saving..." : "Save Item"}
            </button>
          </div>
        </form>
      )}

      <div className="-mx-4 mt-8 px-4 md:hidden">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex w-[78%] shrink-0 snap-center flex-col border border-ink/10 bg-white/40 transition-transform duration-300 ease-signature active:scale-[0.98]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink/5">
                <Image src={item.image} alt={item.name} fill sizes="78vw" className="object-cover" />
                {item.signature && (
                  <Star
                    size={18}
                    className="absolute right-2.5 top-2.5 fill-gold text-gold drop-shadow"
                    style={{ color: "#B08B4F", fill: "#B08B4F" }}
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-1.5 p-4">
                <p className="text-lg leading-snug text-ink">{item.name}</p>
                <p className="text-sm text-ink/50">{item.category}</p>
                <p className="text-base text-gold-dark" style={{ color: "#8A6A38" }}>
                  ${item.price}
                </p>
                <div className="mt-auto flex justify-end gap-4 pt-3">
                  <button onClick={() => openEdit(item)} className="text-ink/50 hover:text-gold">
                    <Pencil size={19} />
                  </button>
                  <button onClick={() => handleDelete(item.id, item.name)} className="text-ink/50 hover:text-red-600">
                    <Trash2 size={19} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="py-8 text-ink/40">No menu items yet.</p>}
        </div>
      </div>

      <div className="mt-8 hidden overflow-x-auto border border-ink/10 md:block">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 bg-white/40 text-xs uppercase tracking-wide text-ink/40">
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Signature</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-ink/5 last:border-none hover:bg-white/40">
                <td className="flex items-center gap-3 px-4 py-3">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden bg-ink/5">
                    <Image src={item.image} alt={item.name} fill sizes="40px" className="object-cover" />
                  </div>
                  <span className="text-ink">{item.name}</span>
                </td>
                <td className="px-4 py-3 text-ink/60">{item.category}</td>
                <td className="px-4 py-3 text-ink/60">${item.price}</td>
                <td className="px-4 py-3">
                  {item.signature && (
                    <Star size={15} className="fill-gold text-gold" style={{ color: "#B08B4F", fill: "#B08B4F" }} />
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => openEdit(item)} className="text-ink/50 hover:text-gold">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(item.id, item.name)} className="text-ink/50 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink/40">
                  No menu items yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
