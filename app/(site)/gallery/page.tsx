import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import { getGalleryImages } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A glimpse inside VELORA — the dining room, the kitchen, and the dishes that bring guests back.",
};

export const revalidate = 60;

export default async function GalleryPage() {
  const images = await getGalleryImages();
  return <Gallery images={images} />;
}
