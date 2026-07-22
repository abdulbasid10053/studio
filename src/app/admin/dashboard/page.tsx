import { redirect } from "next/navigation";
import { checkAdminAuth, getMenuData, getFeedbackData, getGalleryData, getSettingsData } from "@/app/admin/actions";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const isAuthenticated = await checkAdminAuth();
  if (!isAuthenticated) {
    redirect("/admin");
  }

  const [menuData, feedbackData, galleryData, settingsData] = await Promise.all([
    getMenuData(),
    getFeedbackData(),
    getGalleryData(),
    getSettingsData()
  ]);

  return (
    <DashboardClient 
      initialMenu={menuData} 
      initialFeedback={feedbackData} 
      initialGallery={galleryData} 
      initialSettings={settingsData}
    />
  );
}

