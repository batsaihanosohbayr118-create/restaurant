"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";
import { toDbCategory } from "@/lib/types";

function slugify(text: string) {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `item-${Date.now()}`
  );
}

// ---------- Menu Items ----------

export interface MenuItemInput {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  signature: boolean;
  signatureOrder: number | null;
}

export async function saveMenuItem(input: MenuItemInput) {
  await requireAdmin();

  const data = {
    name: input.name.trim(),
    description: input.description.trim(),
    price: input.price,
    category: toDbCategory(input.category as never) as never,
    image: input.image.trim(),
    signature: input.signature,
    signatureOrder: input.signature ? input.signatureOrder : null,
  };

  if (input.id) {
    await prisma.menuItem.update({ where: { id: input.id }, data });
  } else {
    const id = slugify(input.name);
    await prisma.menuItem.create({ data: { id, ...data } });
  }

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  revalidatePath("/");
  return { success: true as const };
}

export async function deleteMenuItem(id: string) {
  await requireAdmin();
  await prisma.menuItem.delete({ where: { id } });
  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  revalidatePath("/");
  return { success: true as const };
}

// ---------- Gallery Images ----------

export interface GalleryImageInput {
  id?: string;
  src: string;
  alt: string;
  category: string;
  sortOrder: number;
}

export async function saveGalleryImage(input: GalleryImageInput) {
  await requireAdmin();

  const data = {
    src: input.src.trim(),
    alt: input.alt.trim(),
    category: input.category as never,
    sortOrder: input.sortOrder,
  };

  if (input.id) {
    await prisma.galleryImage.update({ where: { id: input.id }, data });
  } else {
    const id = `g-${Date.now()}`;
    await prisma.galleryImage.create({ data: { id, ...data } });
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { success: true as const };
}

export async function deleteGalleryImage(id: string) {
  await requireAdmin();
  await prisma.galleryImage.delete({ where: { id } });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { success: true as const };
}

// ---------- Reviews ----------

export interface ReviewInput {
  id?: string;
  name: string;
  rating: number;
  review: string;
  avatar: string;
}

export async function saveReview(input: ReviewInput) {
  await requireAdmin();

  const data = {
    name: input.name.trim(),
    rating: input.rating,
    review: input.review.trim(),
    avatar: input.avatar.trim() || null,
  };

  if (input.id) {
    await prisma.review.update({ where: { id: input.id }, data });
  } else {
    await prisma.review.create({ data });
  }

  revalidatePath("/admin/reviews");
  revalidatePath("/");
  return { success: true as const };
}

export async function deleteReview(id: string) {
  await requireAdmin();
  await prisma.review.delete({ where: { id } });
  revalidatePath("/admin/reviews");
  revalidatePath("/");
  return { success: true as const };
}

// ---------- Reservations ----------

export async function deleteReservation(id: string) {
  await requireAdmin();
  await prisma.reservation.delete({ where: { id } });
  revalidatePath("/admin/reservations");
  return { success: true as const };
}
