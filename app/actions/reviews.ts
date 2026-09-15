"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export interface MyReview {
  rating: number;
  review: string;
}

export async function getMyReview(): Promise<MyReview | null> {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const review = await prisma.review.findUnique({
    where: { userId: session.user.id },
    select: { rating: true, review: true },
  });
  return review;
}

export async function submitReview(input: { rating: number; review: string }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { success: false as const, error: "Please log in to leave a review." };
  }

  const rating = Math.round(input.rating);
  const review = input.review.trim();

  if (rating < 1 || rating > 5) {
    return { success: false as const, error: "Please choose a rating between 1 and 5." };
  }
  if (review.length < 5) {
    return { success: false as const, error: "Please write a little more about your visit." };
  }
  if (review.length > 500) {
    return { success: false as const, error: "Review is too long (500 characters max)." };
  }

  await prisma.review.upsert({
    where: { userId: session.user.id },
    create: {
      name: session.user.name ?? "Guest",
      rating,
      review,
      userId: session.user.id,
    },
    update: {
      rating,
      review,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/reviews");
  return { success: true as const };
}

export async function deleteMyReview() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { success: false as const, error: "Please log in first." };
  }

  await prisma.review.deleteMany({ where: { userId: session.user.id } });

  revalidatePath("/");
  revalidatePath("/admin/reviews");
  return { success: true as const };
}
