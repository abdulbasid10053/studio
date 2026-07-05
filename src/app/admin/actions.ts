"use server";

import { cookies } from "next/headers";
import { getMenuFromFirestore, saveMenuToFirestore, MenuCategory } from "@/lib/menu-service";

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

export async function getMenuData(): Promise<MenuCategory[]> {
  return getMenuFromFirestore();
}

export async function saveMenuData(categories: MenuCategory[]): Promise<{ success: boolean; error?: string }> {
  try {
    await saveMenuToFirestore(categories);
    return { success: true };
  } catch (error) {
    console.error("Error saving menu:", error);
    return { success: false, error: "Gagal menyimpan menu." };
  }
}
