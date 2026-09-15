import MenuAdminTable from "@/components/admin/MenuAdminTable";
import { getAdminMenuItems } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  const items = await getAdminMenuItems();
  return <MenuAdminTable items={items} />;
}
