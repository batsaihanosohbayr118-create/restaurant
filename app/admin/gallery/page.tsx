import GalleryAdminTable from "@/components/admin/GalleryAdminTable";
import { getAdminGalleryImages } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const images = await getAdminGalleryImages();
  return <GalleryAdminTable images={images} />;
}
