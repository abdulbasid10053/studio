import { redirect } from "next/navigation";
import { checkAdminAuth, getMenuData, getFeedbackData } from "@/app/admin/actions";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) {
    redirect("/admin");
  }

  const [menuData, feedbackData] = await Promise.all([
    getMenuData(),
    getFeedbackData()
  ]);

  return <DashboardClient initialMenu={menuData} initialFeedback={feedbackData} />;
}

