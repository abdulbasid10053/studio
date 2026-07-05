import { redirect } from "next/navigation";
import { checkAdminAuth, getMenuData } from "@/app/admin/actions";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) {
    redirect("/admin");
  }

  const menuData = await getMenuData();

  return <DashboardClient initialMenu={menuData} />;
}
