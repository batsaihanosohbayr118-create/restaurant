import { prisma } from "./prisma";
import { toCategoryLabel, toDbCategory, type MenuItem, type GalleryImage, type Review } from "./types";

export async function getMenuItems(): Promise<MenuItem[]> {
  const items = await prisma.menuItem.findMany({ orderBy: { createdAt: "asc" } });
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: Number(item.price),
    category: toCategoryLabel(item.category),
    image: item.image,
    signature: item.signature,
  }));
}

export async function getSignatureDishes(): Promise<MenuItem[]> {
  const items = await prisma.menuItem.findMany({
    where: { signature: true },
    orderBy: { signatureOrder: "asc" },
  });
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: Number(item.price),
    category: toCategoryLabel(item.category),
    image: item.image,
    signature: item.signature,
  }));
}

export async function getMenuItemById(id: string): Promise<MenuItem | null> {
  const item = await prisma.menuItem.findUnique({ where: { id } });
  if (!item) return null;
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    price: Number(item.price),
    category: toCategoryLabel(item.category),
    image: item.image,
    signature: item.signature,
  };
}

export async function getRelatedMenuItems(category: MenuItem["category"], excludeId: string, take = 3): Promise<MenuItem[]> {
  const items = await prisma.menuItem.findMany({
    where: { category: toDbCategory(category) as never, NOT: { id: excludeId } },
    orderBy: { createdAt: "asc" },
    take,
  });
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: Number(item.price),
    category: toCategoryLabel(item.category),
    image: item.image,
    signature: item.signature,
  }));
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const images = await prisma.galleryImage.findMany({ orderBy: { sortOrder: "asc" } });
  return images.map((image) => ({
    id: image.id,
    src: image.src,
    alt: image.alt,
    category: image.category as GalleryImage["category"],
  }));
}

export async function getReviews(): Promise<Review[]> {
  const reviews = await prisma.review.findMany({ orderBy: { createdAt: "asc" } });
  return reviews.map((review) => ({
    id: review.id,
    name: review.name,
    rating: review.rating,
    review: review.review,
    avatar: review.avatar,
  }));
}

// ---------- Admin (raw records, includes DB-only fields) ----------

export async function getAdminMenuItems() {
  const items = await prisma.menuItem.findMany({ orderBy: { createdAt: "desc" } });
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: Number(item.price),
    category: toCategoryLabel(item.category),
    image: item.image,
    signature: item.signature,
    signatureOrder: item.signatureOrder,
  }));
}

export async function getAdminGalleryImages() {
  const images = await prisma.galleryImage.findMany({ orderBy: { sortOrder: "asc" } });
  return images.map((image) => ({
    id: image.id,
    src: image.src,
    alt: image.alt,
    category: image.category as GalleryImage["category"],
    sortOrder: image.sortOrder,
  }));
}

export async function getAdminReviews(): Promise<Review[]> {
  return getReviews();
}

export async function getAdminReservations() {
  const reservations = await prisma.reservation.findMany({ orderBy: { createdAt: "desc" } });
  return reservations.map((r) => ({
    id: r.id,
    name: r.name,
    phone: r.phone,
    email: r.email,
    date: r.date,
    time: r.time,
    guests: r.guests,
    request: r.request,
    createdAt: r.createdAt.toISOString(),
  }));
}
