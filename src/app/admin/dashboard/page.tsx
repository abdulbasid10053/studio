import { redirect } from "next/navigation";
import { checkAdminAuth, getMenuData, getFeedbackData, getGalleryData } from "@/app/admin/actions";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) {
    redirect("/admin");
  }

  const [menuData, feedbackData, galleryData] = await Promise.all([
    getMenuData(),
    getFeedbackData(),
    getGalleryData()
  ]);

  return (
    <DashboardClient 
      initialMenu={menuData} 
      initialFeedback={feedbackData} 
      initialGallery={galleryData} 
    />
  );
}

