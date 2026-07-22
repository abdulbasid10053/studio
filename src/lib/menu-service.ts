import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { menuCategories as staticMenu } from "@/components/menu-data";

export interface MenuItem {
  name: string;
  price: string;
}

export interface MenuCategory {
  category: string;
  description?: string;
  image: string;
  aiHint: string;
  items: MenuItem[];
}

const MENU_DOC = doc(db, "menu", "categories");

export async function getMenuFromFirestore(): Promise<MenuCategory[]> {
  try {
    const snap = await getDoc(MENU_DOC);
    if (snap.exists()) {
      return snap.data().items as MenuCategory[];
    }
    // Seed from static menu on first load
    await seedMenuToFirestore();
    return staticMenu as MenuCategory[];
  } catch (error) {
    console.error("Error fetching menu from Firestore:", error);
    return staticMenu as MenuCategory[];
  }
}

export async function saveMenuToFirestore(categories: MenuCategory[]): Promise<void> {
  await setDoc(MENU_DOC, { items: categories });
}

async function seedMenuToFirestore(): Promise<void> {
  try {
    await setDoc(MENU_DOC, { items: staticMenu });
    console.log("Menu seeded to Firestore.");
  } catch (error) {
    console.error("Error seeding menu:", error);
  }
}
