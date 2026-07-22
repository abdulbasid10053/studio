import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

export interface UploadProgress {
  progress: number; // 0-100
  status: "idle" | "uploading" | "done" | "error";
  url?: string;
  error?: string;
}

/**
 * Upload sebuah file gambar ke Firebase Storage folder `gallery/`
 * dan kembalikan download URL-nya.
 */
export async function uploadGalleryImage(
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const timestamp = Date.now();
  const filename = `gallery/${timestamp}_${Math.random().toString(36).slice(2)}.${ext}`;
  const storageRef = ref(storage, filename);

  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: file.type,
    });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const pct = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        onProgress?.(pct);
      },
      (error) => {
        console.error("Upload error:", error);
        reject(new Error("Gagal upload gambar: " + error.message));
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(url);
      }
    );
  });
}
