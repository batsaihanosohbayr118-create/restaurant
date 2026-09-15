import ReviewsAdminTable from "@/components/admin/ReviewsAdminTable";
import { getAdminReviews } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const reviews = await getAdminReviews();
  return <ReviewsAdminTable reviews={reviews} />;
}
