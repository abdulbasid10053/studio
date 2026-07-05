"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveMenuData, logoutAdmin, deleteFeedbackAction } from "@/app/admin/actions";
import { FeedbackData } from "@/lib/feedback-service";
import {
  ChefHat, Plus, Trash2, Edit2, Save, LogOut, X,
  Check, Package, Loader2, ChevronDown, ChevronUp, GripVertical, MessageSquare, AlertCircle, Clock
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
}

export function DashboardClient({ initialMenu, initialFeedback }: Props) {
  const [activeTab, setActiveTab] = useState<"menu" | "feedback">("menu");
  
  // Menu State
  const [menu, setMenu] = useState<MenuCategory[]>(initialMenu);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [editingItem, setEditingItem] = useState<{ catIdx: number; itemIdx: number } | null>(null);
  const [editValues, setEditValues] = useState({ name: "", price: "" });
  const [addingItem, setAddingItem] = useState<{ catIdx: number } | null>(null);
  const [newItem, setNewItem] = useState({ name: "", price: "" });
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({ category: "", description: "", image: "/image/nasi goreng.webp", aiHint: "" });
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  
  // Generic State
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // --- Menu Handlers ---
  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const startEdit = (catIdx: number, itemIdx: number) => {
    setEditingItem({ catIdx, itemIdx });
    setEditValues({ name: menu[catIdx].items[itemIdx].name, price: menu[catIdx].items[itemIdx].price });
  };

  const confirmEdit = () => {
    if (!editingItem) return;
    const { catIdx, itemIdx } = editingItem;
    const updated = structuredClone(menu);
    updated[catIdx].items[itemIdx] = { name: editValues.name, price: editValues.price };
    setMenu(updated);
    setEditingItem(null);
  };

  const deleteItem = (catIdx: number, itemIdx: number) => {
    const updated = structuredClone(menu);
    updated[catIdx].items.splice(itemIdx, 1);
    setMenu(updated);
  };

  const confirmAddItem = (catIdx: number) => {
    if (!newItem.name.trim() || !newItem.price.trim()) return;
    const updated = structuredClone(menu);
    updated[catIdx].items.push({ name: newItem.name, price: newItem.price });
    setMenu(updated);
    setNewItem({ name: "", price: "" });
    setAddingItem(null);
  };

  const confirmAddCategory = () => {
    if (!newCategory.category.trim()) return;
    const updated = structuredClone(menu);
    updated.push({
      category: newCategory.category,
      description: newCategory.description || undefined,
      image: newCategory.image || "/image/nasi goreng.webp",
      aiHint: newCategory.aiHint || newCategory.category.toLowerCase(),
      items: [],
    });
    setMenu(updated);
    setNewCategory({ category: "", description: "", image: "/image/nasi goreng.webp", aiHint: "" });
    setAddingCategory(false);
    setExpandedCategories(prev => new Set([...prev, newCategory.category]));
  };

  const deleteCategory = (catIdx: number) => {
    if (!confirm(`Hapus kategori "${menu[catIdx].category}"? Semua item di dalamnya akan ikut terhapus.`)) return;
    const updated = structuredClone(menu);
    updated.splice(catIdx, 1);
    setMenu(updated);
  };

  const handleSave = () => {
    setSaveStatus("saving");
    startTransition(async () => {
      const result = await saveMenuData(menu);
      if (result.success) {
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000);
        router.refresh();
      } else {
        setSaveStatus("error");
        setTimeout(() => setSaveStatus("idle"), 3000);
      }
    });
  };

  // --- Feedback Handlers ---
  const handleDeleteFeedback = (id: string) => {
    if (!confirm("Hapus feedback ini secara permanen?")) return;
    startTransition(async () => {
      await deleteFeedbackAction(id);
      router.refresh();
    });
  };

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAdmin();
      router.push("/admin");
    });
  };

  const totalItems = menu.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-zinc-900/95 backdrop-blur border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h1 className="font-bold text-white leading-none">Admin Dashboard</h1>
              <p className="text-xs text-zinc-500 mt-0.5">Muzar Eats — Panel Pengelola</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === "menu" && (
              <>
                {/* Stats */}
                <div className="hidden sm:flex items-center gap-4 text-sm text-zinc-400 bg-zinc-800 rounded-xl px-4 py-2">
                  <span className="flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-orange-400" />
                    {menu.length} Kategori
                  </span>
                  <span className="w-px h-4 bg-white/10" />
                  <span>{totalItems} Item</span>
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  disabled={saveStatus === "saving"}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    saveStatus === "saved"
                      ? "bg-emerald-500 text-white"
                      : saveStatus === "error"
                      ? "bg-red-500 text-white"
                      : "bg-orange-500 hover:bg-orange-400 text-white hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]"
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

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        
        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab("menu")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === "menu" ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Package className="w-4 h-4" />
            Manajemen Menu
          </button>
          <button
            onClick={() => setActiveTab("feedback")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === "feedback" ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Feedback Pelanggan
            {initialFeedback.length > 0 && (
              <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {initialFeedback.length}
              </span>
            )}
          </button>
        </div>

        {/* --- TAB: MENU --- */}
        {activeTab === "menu" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Add Category Button */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-zinc-200">Daftar Kategori Menu</h2>
              <button
                onClick={() => setAddingCategory(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-zinc-300 hover:text-white transition-all"
              >
                <Plus className="w-4 h-4" />
                Tambah Kategori
              </button>
            </div>

            {/* Add Category Form */}
            {addingCategory && (
              <div className="bg-zinc-900 border border-orange-500/30 rounded-2xl p-5 space-y-4">
                <h3 className="font-semibold text-orange-400 flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Kategori Baru
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-zinc-400 mb-1 block">Nama Kategori *</label>
                    <input
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                      placeholder="cth: Mie Ayam"
                      value={newCategory.category}
                      onChange={(e) => setNewCategory(prev => ({ ...prev, category: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 mb-1 block">Deskripsi (opsional)</label>
                    <input
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                      placeholder="cth: Goreng / Rebus"
                      value={newCategory.description}
                      onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={confirmAddCategory}
                    disabled={!newCategory.category.trim()}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-400 disabled:bg-zinc-700 disabled:text-zinc-500 text-white rounded-lg text-sm font-medium transition-all"
                  >
                    <Check className="w-4 h-4" /> Tambahkan
                  </button>
                  <button
                    onClick={() => { setAddingCategory(false); setNewCategory({ category: "", description: "", image: "/image/nasi goreng.webp", aiHint: "" }); }}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm transition-all"
                  >
                    <X className="w-4 h-4" /> Batal
                  </button>
                </div>
              </div>
            )}

            {/* Category Cards */}
            {menu.map((cat, catIdx) => {
              const isExpanded = expandedCategories.has(cat.category);
              return (
                <div key={cat.category + catIdx} className="bg-zinc-900 border border-white/8 rounded-2xl overflow-hidden">
                  {/* Category Header */}
                  <div
                    className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                    onClick={() => toggleCategory(cat.category)}
                  >
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-4 h-4 text-zinc-600" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-white">{cat.category}</h3>
                          {cat.description && (
                            <span className="text-xs text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full">{cat.description}</span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-500 mt-0.5">{cat.items.length} item</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteCategory(catIdx); }}
                        className="p-1.5 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        title="Hapus kategori"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                    </div>
                  </div>

                  {/* Items List */}
                  {isExpanded && (
                    <div className="border-t border-white/8 px-5 py-3 space-y-1">
                      {cat.items.map((item, itemIdx) => (
                        <div key={item.name + itemIdx} className="flex items-center gap-2 py-2 group">
                          {editingItem?.catIdx === catIdx && editingItem?.itemIdx === itemIdx ? (
                            // Edit mode
                            <div className="flex-1 flex items-center gap-2">
                              <input
                                className="flex-1 bg-zinc-800 border border-orange-500/40 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                                value={editValues.name}
                                onChange={(e) => setEditValues(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Nama item"
                                autoFocus
                              />
                              <input
                                className="w-24 bg-zinc-800 border border-orange-500/40 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                                value={editValues.price}
                                onChange={(e) => setEditValues(prev => ({ ...prev, price: e.target.value }))}
                                placeholder="13K"
                              />
                              <button onClick={confirmEdit} className="p-1.5 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all">
                                <Check className="w-4 h-4" />
                              </button>
                              <button onClick={() => setEditingItem(null)} className="p-1.5 text-zinc-500 hover:bg-white/5 rounded-lg transition-all">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            // View mode
                            <>
                              <span className="flex-1 text-sm text-zinc-300">{item.name}</span>
                              <span className="text-sm font-semibold text-orange-400 min-w-[40px] text-right">{item.price}</span>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => startEdit(catIdx, itemIdx)}
                                  className="p-1.5 text-zinc-500 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => deleteItem(catIdx, itemIdx)}
                                  className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}

                      {/* Add Item Form */}
                      {addingItem?.catIdx === catIdx ? (
                        <div className="flex items-center gap-2 pt-2 border-t border-white/5 mt-2">
                          <input
                            className="flex-1 bg-zinc-800 border border-orange-500/30 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                            value={newItem.name}
                            onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Nama item baru"
                            autoFocus
                          />
                          <input
                            className="w-24 bg-zinc-800 border border-orange-500/30 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                            value={newItem.price}
                            onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
                            placeholder="13K"
                          />
                          <button
                            onClick={() => confirmAddItem(catIdx)}
                            disabled={!newItem.name.trim() || !newItem.price.trim()}
                            className="p-1.5 text-emerald-400 hover:bg-emerald-500/10 disabled:text-zinc-600 rounded-lg transition-all"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => { setAddingItem(null); setNewItem({ name: "", price: "" }); }}
                            className="p-1.5 text-zinc-500 hover:bg-white/5 rounded-lg transition-all"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setAddingItem({ catIdx }); setNewItem({ name: "", price: "" }); }}
                          className="flex items-center gap-2 text-sm text-zinc-500 hover:text-orange-400 py-2 w-full transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" /> Tambah item
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Save reminder */}
            <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-4 text-sm text-amber-200/60 flex items-start gap-3">
              <Save className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              Setelah mengedit, klik tombol <strong className="text-amber-300 mx-1">Simpan</strong> di atas agar perubahan tersimpan ke database dan tampil di website.
            </div>
          </div>
        )}

        {/* --- TAB: FEEDBACK --- */}
        {activeTab === "feedback" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {initialFeedback.length === 0 ? (
              <div className="bg-zinc-900 border border-white/10 rounded-2xl p-12 text-center">
                <MessageSquare className="w-12 h-12 text-zinc-600 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-zinc-300 mb-1">Belum ada feedback</h3>
                <p className="text-zinc-500 text-sm">Feedback yang masuk dari pelanggan akan tampil di sini.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {initialFeedback.map((fb) => (
                  <div key={fb.id} className="bg-zinc-900 border border-white/10 rounded-2xl p-5 relative group overflow-hidden">
                    {/* Background glow for publishable */}
                    {fb.isPublishable && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl -z-0 rounded-full" />
                    )}
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-white flex items-center gap-2">
                            {fb.isAnonymous ? "👤 Anonim" : `👤 ${fb.name || "Tanpa Nama"}`}
                            {fb.isPublishable ? (
                              <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                                Publik
                              </span>
                            ) : (
                              <span className="text-[10px] uppercase font-bold tracking-wider bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">
                                Privat
                              </span>
                            )}
                          </h3>
                          <p className="text-xs text-zinc-500 flex items-center gap-1.5 mt-1">
                            <Clock className="w-3.5 h-3.5" />
                            {new Date(fb.createdAt as string).toLocaleString("id-ID", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </p>
                        </div>
                        <button
                          onClick={() => fb.id && handleDeleteFeedback(fb.id)}
                          disabled={isPending}
                          className="p-2 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                          title="Hapus Feedback"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="bg-black/30 border border-white/5 rounded-xl p-4 mt-2 text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
                        {fb.feedback}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="bg-blue-500/5 border border-blue-500/15 rounded-xl p-4 text-sm text-blue-200/70 flex items-start gap-3 mt-8">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-blue-400" />
              <div>
                Notifikasi feedback baru juga tetap dikirimkan ke Telegram Anda secara realtime. Menghapus data di sini tidak akan menghapus pesan di Telegram.
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
