"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getMenuFromFirestore, saveMenuToFirestore, MenuCategory } from "@/lib/menu-service";
import { getFeedbackFromFirestore, deleteFeedbackFromFirestore, FeedbackData, toggleFeedbackApproval } from "@/lib/feedback-service";
import { getGalleryFromFirestore, saveGalleryToFirestore, GalleryItem } from "@/lib/gallery-service";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "muzar2024";
const AUTH_COOKIE = "admin_auth";

export async function loginAdmin(password: string): Promise<{ success: boolean; error?: string }> {
  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE, "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 8, // 8 jam
      path: "/",
    });
    return { success: true };
  }
  return { success: false, error: "Password salah." };
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
}

export async function checkAdminAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE)?.value === "authenticated";
}

// --- Menu ---
export async function getMenuData(): Promise<MenuCategory[]> {
  return getMenuFromFirestore();
}

export async function saveMenuData(categories: MenuCategory[]): Promise<{ success: boolean; error?: string }> {
  try {
    await saveMenuToFirestore(categories);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error saving menu:", error);
    return { success: false, error: "Gagal menyimpan menu." };
  }
}

// --- Feedback ---
export async function getFeedbackData(): Promise<FeedbackData[]> {
  return getFeedbackFromFirestore();
}

export async function deleteFeedbackAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await deleteFeedbackFromFirestore(id);
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting feedback:", error);
    return { success: false, error: "Gagal menghapus feedback." };
  }
}

export async function toggleFeedbackApprovalAction(id: string, isApproved: boolean): Promise<{ success: boolean; error?: string }> {
  try {
    await toggleFeedbackApproval(id, isApproved);
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error toggling feedback approval:", error);
    return { success: false, error: "Gagal memperbarui status publikasi." };
  }
}

// --- Gallery ---
export async function getGalleryData(): Promise<GalleryItem[]> {
  return getGalleryFromFirestore();
}

export async function saveGalleryData(items: GalleryItem[]): Promise<{ success: boolean; error?: string }> {
  try {
    await saveGalleryToFirestore(items);
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error saving gallery:", error);
    return { success: false, error: "Gagal menyimpan galeri." };
  }
}
