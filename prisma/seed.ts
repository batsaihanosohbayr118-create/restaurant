import { PrismaClient } from "@prisma/client";
import {
  menuItems,
  signatureDishIds,
  galleryImages,
  reviews,
} from "../lib/data";

const prisma = new PrismaClient();

const CATEGORY_MAP: Record<string, string> = {
  "Main Course": "MainCourse",
};

function toEnumCategory(category: string) {
  return CATEGORY_MAP[category] ?? category;
}

async function main() {
  for (const item of menuItems) {
    const signatureOrder = signatureDishIds.includes(item.id)
      ? signatureDishIds.indexOf(item.id)
      : null;

    await prisma.menuItem.upsert({
      where: { id: item.id },
      update: {
        name: item.name,
        description: item.description,
        price: item.price,
        category: toEnumCategory(item.category) as never,
        image: item.image,
        signature: Boolean(item.signature),
        signatureOrder,
      },
      create: {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        category: toEnumCategory(item.category) as never,
        image: item.image,
        signature: Boolean(item.signature),
        signatureOrder,
      },
    });
  }

  for (const [index, image] of galleryImages.entries()) {
    await prisma.galleryImage.upsert({
      where: { id: image.id },
      update: {
        src: image.src,
        alt: image.alt,
        category: image.category as never,
        sortOrder: index,
      },
      create: {
        id: image.id,
        src: image.src,
        alt: image.alt,
        category: image.category as never,
        sortOrder: index,
      },
    });
  }

  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {
        name: review.name,
        rating: review.rating,
        review: review.review,
        avatar: review.avatar,
      },
      create: {
        id: review.id,
        name: review.name,
        rating: review.rating,
        review: review.review,
        avatar: review.avatar,
      },
    });
  }

  console.log(
    `Seeded ${menuItems.length} menu items, ${galleryImages.length} gallery images, ${reviews.length} reviews.`
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
