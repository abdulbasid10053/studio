import { getGalleryFromFirestore } from "@/lib/gallery-service";
import { GalleryClient } from "./gallery-client";

export async function Gallery() {
  const items = await getGalleryFromFirestore();
  return <GalleryClient initialItems={items} />;
}
