"use client";

import { useRef, useState } from "react";
import { UploadCloud, Link as LinkIcon, AlertCircle } from "lucide-react";
import { uploadGalleryImage } from "@/lib/upload-service";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

export function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Ukuran file maksimal 5MB.");
      return;
    }

    setUploadError(null);
    setUploadProgress(0);
    try {
      const url = await uploadGalleryImage(file, (pct) => setUploadProgress(pct));
      onChange(url);
      setUploadProgress(null);
    } catch (err: any) {
      setUploadError(err.message || "Gagal upload gambar.");
      setUploadProgress(null);
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div>
      {/* Mode switcher: Upload vs URL */}
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => setImageInputMode("upload")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            imageInputMode === "upload"
              ? "bg-orange-500 text-foreground"
              : "bg-muted text-muted-foreground hover:bg-zinc-700"
          }`}
        >
          <UploadCloud className="w-3.5 h-3.5" /> Upload File
        </button>
        <button
          type="button"
          onClick={() => setImageInputMode("url")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            imageInputMode === "url"
              ? "bg-orange-500 text-foreground"
              : "bg-muted text-muted-foreground hover:bg-zinc-700"
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" /> URL / Path Manual
        </button>
      </div>

      {imageInputMode === "upload" ? (
        <div>
          {/* Drop Zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-border hover:border-orange-500/50 rounded-xl p-4 text-center cursor-pointer transition-all bg-background/40 hover:bg-orange-500/5 group"
          >
            {value && value.startsWith("http") ? (
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={value}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-lg border border-border flex-shrink-0"
                />
                <div className="text-left">
                  <p className="text-xs text-emerald-400 font-semibold">✅ Foto ter-upload ke Firebase Storage</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 font-mono truncate max-w-xs">{value.slice(0, 60)}...</p>
                  <p className="text-xs text-orange-400 mt-1 group-hover:underline">Klik untuk ganti foto</p>
                </div>
              </div>
            ) : (
              <div className="py-2">
                <UploadCloud className="w-8 h-8 text-muted-foreground mx-auto mb-2 group-hover:text-orange-400 transition-colors" />
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Klik untuk pilih gambar</p>
                <p className="text-xs text-muted-foreground/60 mt-1">JPG, PNG, WebP • Maks 5MB</p>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handleImageUpload}
          />

          {uploadProgress !== null && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-orange-400 font-medium">Mengupload...</span>
                <span className="text-xs text-orange-400 font-mono">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className="bg-orange-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {uploadError && (
            <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {uploadError}
            </p>
          )}
        </div>
      ) : (
        <input
          type="text"
          placeholder="Contoh: /image/nasi goreng.webp atau https://..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-background border border-border rounded-xl px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-orange-500 font-mono text-xs"
        />
      )}
    </div>
  );
}
