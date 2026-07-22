"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveMenuData, logoutAdmin, deleteFeedbackAction, toggleFeedbackApprovalAction, saveGalleryData, saveSettingsData } from "@/app/admin/actions";
import { FeedbackData } from "@/lib/feedback-service";
import { GalleryItem } from "@/lib/gallery-service";
import { SettingsData } from "@/lib/settings-service";
import { MenuTab } from "@/components/admin/menu-tab";
import { GalleryTab } from "@/components/admin/gallery-tab";
import { FeedbackTab } from "@/components/admin/feedback-tab";
import {
  ChefHat, Save, LogOut, Check, Package, Loader2, MessageSquare, Camera, X, Music2
} from "lucide-react";

interface MenuItem {
  name: string;
  price: string;
}

interface MenuCategory {
  category: string;
  description?: string;
  image: string;
  aiHint: string;
  items: MenuItem[];
}

interface Props {
  initialMenu: MenuCategory[];
  initialFeedback: FeedbackData[];
  initialGallery: GalleryItem[];
  initialSettings: SettingsData;
}

export function DashboardClient({ initialMenu, initialFeedback, initialGallery, initialSettings }: Props) {
  const [activeTab, setActiveTab] = useState<"menu" | "gallery" | "feedback" | "settings">("menu");
  const [menu, setMenu] = useState<MenuCategory[]>(initialMenu);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [settings, setSettings] = useState<SettingsData>(initialSettings);
  
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [gallerySaveStatus, setGallerySaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [settingsSaveStatus, setSettingsSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // --- Actions ---
  const handleSaveMenu = async () => {
    setSaveStatus("saving");
    const res = await saveMenuData(menu);
    if (res.success) {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    } else {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  const handleSaveGallery = async () => {
    setGallerySaveStatus("saving");
    const res = await saveGalleryData(gallery);
    if (res.success) {
      setGallerySaveStatus("saved");
      setTimeout(() => setGallerySaveStatus("idle"), 2500);
    } else {
      setGallerySaveStatus("error");
      setTimeout(() => setGallerySaveStatus("idle"), 3000);
    }
  };

  const handleSaveSettings = async () => {
    setSettingsSaveStatus("saving");
    const res = await saveSettingsData(settings);
    if (res.success) {
      setSettingsSaveStatus("saved");
      setTimeout(() => setSettingsSaveStatus("idle"), 2500);
    } else {
      setSettingsSaveStatus("error");
      setTimeout(() => setSettingsSaveStatus("idle"), 3000);
    }
  };

  const handleDeleteFeedback = (id: string) => {
    if (confirm("Hapus ulasan pelanggan ini secara permanen?")) {
      startTransition(async () => {
        await deleteFeedbackAction(id);
        router.refresh();
      });
    }
  };

  const handleToggleApproval = (id: string, currentApproved: boolean) => {
    startTransition(async () => {
      await toggleFeedbackApprovalAction(id, !currentApproved);
      router.refresh();
    });
  };

  const handleLogout = async () => {
    await logoutAdmin();
    router.push("/admin");
  };

  const totalMenuLength = menu.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h1 className="font-bold text-foreground leading-none">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Muzar Eats — Panel Pengelola</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === "menu" && (
              <>
                <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground bg-muted rounded-xl px-4 py-2">
                  <span className="flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-orange-400" />
                    {menu.length} Kategori
                  </span>
                  <span className="w-px h-4 bg-white/10" />
                  <span>{totalMenuLength} Item</span>
                </div>

                <button
                  onClick={handleSaveMenu}
                  disabled={saveStatus === "saving"}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    saveStatus === "saved"
                      ? "bg-emerald-500 text-foreground"
                      : saveStatus === "error"
                      ? "bg-red-500 text-foreground"
                      : "bg-orange-500 hover:bg-orange-400 text-foreground hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                  } disabled:opacity-50`}
                >
                  {saveStatus === "saving" ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</>
                  ) : saveStatus === "saved" ? (
                    <><Check className="w-4 h-4" /> Tersimpan!</>
                  ) : saveStatus === "error" ? (
                    <><X className="w-4 h-4" /> Gagal Simpan</>
                  ) : (
                    <><Save className="w-4 h-4" /> Simpan Menu</>
                  )}
                </button>
              </>
            )}

            {activeTab === "gallery" && (
              <>
                <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground bg-muted rounded-xl px-4 py-2">
                  <Camera className="w-3.5 h-3.5 text-orange-400" />
                  <span>{gallery.length} Foto Galeri</span>
                </div>

                <button
                  onClick={handleSaveGallery}
                  disabled={gallerySaveStatus === "saving"}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    gallerySaveStatus === "saved"
                      ? "bg-emerald-500 text-foreground"
                      : gallerySaveStatus === "error"
                      ? "bg-red-500 text-foreground"
                      : "bg-orange-500 hover:bg-orange-400 text-foreground hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                  } disabled:opacity-50`}
                >
                  {gallerySaveStatus === "saving" ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</>
                  ) : gallerySaveStatus === "saved" ? (
                    <><Check className="w-4 h-4" /> Galeri Tersimpan!</>
                  ) : gallerySaveStatus === "error" ? (
                    <><X className="w-4 h-4" /> Gagal Simpan</>
                  ) : (
                    <><Save className="w-4 h-4" /> Simpan Galeri</>
                  )}
                </button>
              </>
            )}

            {activeTab === "settings" && (
              <button
                onClick={handleSaveSettings}
                disabled={settingsSaveStatus === "saving"}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  settingsSaveStatus === "saved"
                    ? "bg-emerald-500 text-foreground"
                    : settingsSaveStatus === "error"
                    ? "bg-red-500 text-foreground"
                    : "bg-orange-500 hover:bg-orange-400 text-foreground hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                } disabled:opacity-50`}
              >
                {settingsSaveStatus === "saving" ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</>
                ) : settingsSaveStatus === "saved" ? (
                  <><Check className="w-4 h-4" /> Tersimpan!</>
                ) : settingsSaveStatus === "error" ? (
                  <><X className="w-4 h-4" /> Gagal Simpan</>
                ) : (
                  <><Save className="w-4 h-4" /> Simpan Pengaturan</>
                )}
              </button>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-4">
          <button
            onClick={() => setActiveTab("menu")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === "menu" ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            }`}
          >
            <Package className="w-4 h-4" />
            Manajemen Menu
          </button>

          <button
            onClick={() => setActiveTab("gallery")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === "gallery" ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            }`}
          >
            <Camera className="w-4 h-4" />
            Manajemen Galeri
            <span className="bg-muted text-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
              {gallery.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("feedback")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === "feedback" ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Feedback Pelanggan
            {initialFeedback.length > 0 && (
              <span className="bg-orange-500 text-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {initialFeedback.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === "settings" ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            }`}
          >
            <Music2 className="w-4 h-4" />
            Musik
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === "menu" && (
          <MenuTab menu={menu} setMenu={setMenu} />
        )}

        {activeTab === "gallery" && (
          <GalleryTab gallery={gallery} setGallery={setGallery} />
        )}

        {activeTab === "feedback" && (
          <FeedbackTab
            feedbackList={initialFeedback}
            isPending={isPending}
            onDelete={handleDeleteFeedback}
            onToggleApproval={handleToggleApproval}
          />
        )}

        {activeTab === "settings" && (
          <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Music2 className="w-5 h-5 text-orange-400" />
                Musik
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Atur URL streaming audio/musik latar belakang untuk halaman utama.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="music-url" className="text-sm font-medium text-foreground block">
                Link Streaming Audio (URL Stream/AAC/MP3)
              </label>
              <input
                id="music-url"
                type="text"
                value={settings.musicUrl}
                onChange={(e) => setSettings({ ...settings, musicUrl: e.target.value })}
                className="w-full px-4 py-2 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-foreground transition-all"
                placeholder="https://s2.cloudmu.id/listen/prambors/radio.aac"
              />
              <p className="text-xs text-muted-foreground">
                Pastikan link merupakan direct audio stream (seperti .aac, .mp3, atau URL streaming shoutcast/icecast).
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
