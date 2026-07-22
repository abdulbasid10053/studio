"use client";

import { useState } from "react";
import { Plus, X, Edit2, Trash2 } from "lucide-react";
import { GalleryItem } from "@/lib/gallery-service";
import { ImageUploader } from "./image-uploader";

interface GalleryTabProps {
  gallery: GalleryItem[];
  setGallery: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
}

export function GalleryTab({ gallery, setGallery }: GalleryTabProps) {
  const [editingGalleryIndex, setEditingGalleryIndex] = useState<number | null>(null);
  const [addingGalleryItem, setAddingGalleryItem] = useState(false);
  const [galleryForm, setGalleryForm] = useState<GalleryItem>({
    id: "",
    title: "",
    category: "makanan",
    categoryLabel: "Hidangan Utama",
    image: "/image/nasi goreng.webp",
    description: "",
    tag: "",
  });

  const resetGalleryForm = () => {
    setGalleryForm({
      id: "",
      title: "",
      category: "makanan",
      categoryLabel: "Hidangan Utama",
      image: "/image/nasi goreng.webp",
      description: "",
      tag: "",
    });
  };

  const openAddGalleryModal = () => {
    resetGalleryForm();
    setAddingGalleryItem(true);
  };

  const openEditGalleryModal = (idx: number) => {
    setEditingGalleryIndex(idx);
    setGalleryForm({ ...gallery[idx] });
  };

  const confirmAddGallery = () => {
    if (!galleryForm.title.trim() || !galleryForm.image.trim()) return;
    const newItem: GalleryItem = {
      ...galleryForm,
      id: galleryForm.id || `gallery-${Date.now()}`,
      tag: galleryForm.tag?.trim() || undefined,
    };
    setGallery([...gallery, newItem]);
    setAddingGalleryItem(false);
    resetGalleryForm();
  };

  const confirmEditGallery = () => {
    if (editingGalleryIndex === null || !galleryForm.title.trim()) return;
    const updated = [...gallery];
    updated[editingGalleryIndex] = {
      ...galleryForm,
      tag: galleryForm.tag?.trim() || undefined,
    };
    setGallery(updated);
    setEditingGalleryIndex(null);
    resetGalleryForm();
  };

  const deleteGalleryItem = (idx: number) => {
    if (confirm(`Penghapusan foto "${gallery[idx].title}". Lanjutkan?`)) {
      const updated = [...gallery];
      updated.splice(idx, 1);
      setGallery(updated);
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-lg font-semibold text-zinc-200">Daftar Foto Galeri</h2>
          <p className="text-xs text-muted-foreground">Kelola foto makanan, suasana warung, & aksi memasak yang tampil di halaman utama.</p>
        </div>
        <button
          onClick={openAddGalleryModal}
          className="flex items-center gap-2 text-sm bg-orange-500 hover:bg-orange-400 text-foreground font-semibold px-4 py-2 rounded-xl shadow transition-all"
        >
          <Plus className="w-4 h-4" /> Tambah Foto Galeri
        </button>
      </div>

      {/* Modal Form Tambah / Edit Foto Galeri */}
      {(addingGalleryItem || editingGalleryIndex !== null) && (
        <div className="bg-card border border-orange-500/40 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-orange-400">
              {editingGalleryIndex !== null ? "Edit Foto Galeri" : "Tambah Foto Galeri Baru"}
            </h3>
            <button
              onClick={() => {
                setAddingGalleryItem(false);
                setEditingGalleryIndex(null);
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block font-medium">Judul Foto</label>
              <input
                type="text"
                placeholder="Contoh: Nasi Goreng Spesial / Suasana Warung Malam"
                value={galleryForm.title}
                onChange={e => setGalleryForm({ ...galleryForm, title: e.target.value })}
                className="w-full bg-background border border-border rounded-xl px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block font-medium">Kategori</label>
              <select
                value={galleryForm.category}
                onChange={e => {
                  const cat = e.target.value as GalleryItem["category"];
                  let label = "Hidangan Utama";
                  if (cat === "proses") label = "Proses Memasak";
                  if (cat === "suasana") label = "Suasana Warung";
                  if (cat === "minuman") label = "Minuman";
                  setGalleryForm({ ...galleryForm, category: cat, categoryLabel: label });
                }}
                className="w-full bg-background border border-border rounded-xl px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-orange-500"
              >
                <option value="makanan">makanan (Hidangan Utama)</option>
                <option value="proses">proses (Proses Memasak)</option>
                <option value="suasana">suasana (Suasana Warung)</option>
                <option value="minuman">minuman (Minuman)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs text-muted-foreground mb-1 block font-medium">Foto</label>
              <ImageUploader
                value={galleryForm.image}
                onChange={(url) => setGalleryForm((prev) => ({ ...prev, image: url }))}
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1 block font-medium">Tag Opsional (Badge)</label>
              <input
                type="text"
                placeholder="Contoh: 🔥 Rahasia Rasa / 🏆 Best Seller / ✨ Vibe Street Food"
                value={galleryForm.tag || ""}
                onChange={e => setGalleryForm({ ...galleryForm, tag: e.target.value })}
                className="w-full bg-background border border-border rounded-xl px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1 block font-medium">Deskripsi Foto</label>
            <textarea
              rows={3}
              placeholder="Tuliskan deskripsi yang akan muncul di modal pratinjau..."
              value={galleryForm.description}
              onChange={e => setGalleryForm({ ...galleryForm, description: e.target.value })}
              className="w-full bg-background border border-border rounded-xl px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border/50">
            <button
              onClick={() => {
                setAddingGalleryItem(false);
                setEditingGalleryIndex(null);
              }}
              className="px-4 py-2 rounded-xl text-sm text-muted-foreground hover:bg-muted"
            >
              Batal
            </button>
            <button
              onClick={editingGalleryIndex !== null ? confirmEditGallery : confirmAddGallery}
              className="px-5 py-2 rounded-xl text-sm bg-orange-500 text-foreground font-semibold"
            >
              {editingGalleryIndex !== null ? "Simpan Perubahan" : "Tambahkan ke Galeri"}
            </button>
          </div>
        </div>
      )}

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {gallery.map((item, idx) => (
          <div key={item.id || idx} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group">
            <div>
              {/* Thumbnail preview */}
              <div className="relative aspect-[16/9] w-full bg-muted overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="bg-black/70 backdrop-blur text-orange-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-orange-500/30">
                    {item.categoryLabel}
                  </span>
                  {item.tag && (
                    <span className="bg-orange-500 text-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {item.tag}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4">
                <h4 className="font-bold text-foreground text-base mb-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{item.description}</p>
              </div>
            </div>

            <div className="px-4 pb-4 pt-2 border-t border-border/40 flex items-center justify-between">
              <span className="text-[11px] font-mono text-muted-foreground truncate max-w-[150px]" title={item.image}>
                {item.image}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditGalleryModal(idx)}
                  className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all"
                  title="Edit Foto"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteGalleryItem(idx)}
                  className="p-1.5 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                  title="Hapus Foto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
