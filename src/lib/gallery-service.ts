import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface GalleryItem {
  id: string;
  title: string;
  category: "makanan" | "suasana" | "proses" | "minuman";
  categoryLabel: string;
  image: string;
  description: string;
  tag?: string;
}

export const initialGalleryItems: GalleryItem[] = [
  {
    id: "wok-cooking",
    title: "Aksi Api Besar (Wok Hei)",
    category: "proses",
    categoryLabel: "Proses Memasak",
    image: "/image/wok-cooking.png",
    description: "Ciri khas Nasgor Muzar: dimasak dengan racikan bumbu khas & kobaran api besar wok hei yang menghasilkan aroma harum magelangan gurih sempurna.",
    tag: "🔥 Rahasia Rasa",
  },
  {
    id: "ambience",
    title: "Suasana Warung Malam",
    category: "suasana",
    categoryLabel: "Suasana Warung",
    image: "/image/ambience.png",
    description: "Suasana santai dan hangat di malam hari. Cocok untuk makan bersama teman, pasangan, atau santap malam keluarga.",
    tag: "✨ Vibe Street Food",
  },
  {
    id: "nasgor-spesial",
    title: "Nasi Goreng Spesial",
    category: "makanan",
    categoryLabel: "Hidangan Utama",
    image: "/image/nasi goreng.webp",
    description: "Nasi goreng favorit dengan topping melimpah: Ayam, Sosis, Bakso, Telur Dadar & Telur Ceplok.",
    tag: "🏆 Best Seller",
  },
  {
    id: "bakmi-goreng",
    title: "Bakmi Goreng / Rebus",
    category: "makanan",
    categoryLabel: "Hidangan Utama",
    image: "/image/bakmi.webp",
    description: "Mie kenyal gurih yang ditumis dengan telur, sayuran segar, dan bumbu rempah pilihan.",
    tag: "🍜 Favorit",
  },
  {
    id: "kwetiaw",
    title: "Kwetiau Goreng Spesial",
    category: "makanan",
    categoryLabel: "Hidangan Utama",
    image: "/image/kwetiaw.webp",
    description: "Kwetiau lembut gurih beraroma smoky dengan pilihan isi ayam, bakso, atau sosis.",
  },
  {
    id: "capcay",
    title: "Capcay Kuah / Goreng",
    category: "makanan",
    categoryLabel: "Hidangan Utama",
    image: "/image/capcay.webp",
    description: "Sayuran lengkap segar yang disajikan hangat dengan kuah kental gurih bernutrisi.",
  },
  {
    id: "bihun",
    title: "Bihun Goreng Mantap",
    category: "makanan",
    categoryLabel: "Hidangan Utama",
    image: "/image/bihun.webp",
    description: "Bihun halus bertabur bumbu rempah melimpah, rasa manis gurih pas di lidah.",
  },
  {
    id: "minuman",
    title: "Minuman Segar & Warm Drink",
    category: "minuman",
    categoryLabel: "Minuman",
    image: "/image/minuman.webp",
    description: "Aneka pilihan minuman penutup segar mulai dari Es Teh, Es Jeruk, Lemon Tea hingga Kopi & Jahe Hangat.",
  },
];

const GALLERY_DOC = doc(db, "gallery", "items");

export async function getGalleryFromFirestore(): Promise<GalleryItem[]> {
  try {
    const snap = await getDoc(GALLERY_DOC);
    if (snap.exists() && snap.data().items) {
      return snap.data().items as GalleryItem[];
    }
    // Seed default gallery items if doc doesn't exist
    await seedGalleryToFirestore();
    return initialGalleryItems;
  } catch (error) {
    console.error("Error fetching gallery from Firestore:", error);
    return initialGalleryItems;
  }
}

export async function saveGalleryToFirestore(items: GalleryItem[]): Promise<void> {
  await setDoc(GALLERY_DOC, { items });
}

async function seedGalleryToFirestore(): Promise<void> {
  try {
    await setDoc(GALLERY_DOC, { items: initialGalleryItems });
    console.log("Gallery seeded to Firestore.");
  } catch (error) {
    console.error("Error seeding gallery to Firestore:", error);
  }
}
