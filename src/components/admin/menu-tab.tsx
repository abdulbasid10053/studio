"use client";

import { useState } from "react";
import { Plus, Trash2, Edit2, Check, X } from "lucide-react";

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

interface MenuTabProps {
  menu: MenuCategory[];
  setMenu: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
}

export function MenuTab({ menu, setMenu }: MenuTabProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [editingItem, setEditingItem] = useState<{ catIdx: number; itemIdx: number } | null>(null);
  const [editValues, setEditValues] = useState({ name: "", price: "" });
  const [addingItem, setAddingItem] = useState<{ catIdx: number } | null>(null);
  const [newItem, setNewItem] = useState({ name: "", price: "" });
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({
    category: "",
    description: "",
    image: "/image/nasi goreng.webp",
    aiHint: "",
  });

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
    setEditValues({
      name: menu[catIdx].items[itemIdx].name,
      price: menu[catIdx].items[itemIdx].price,
    });
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
    if (confirm(`Hapus seluruh kategori "${menu[catIdx].category}"?`)) {
      const updated = structuredClone(menu);
      updated.splice(catIdx, 1);
      setMenu(updated);
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-zinc-200">Daftar Kategori Menu</h2>
        <button
          onClick={() => setAddingCategory(true)}
          className="flex items-center gap-2 text-sm bg-muted hover:bg-zinc-700 text-foreground px-3.5 py-2 rounded-xl border border-border transition-all"
        >
          <Plus className="w-4 h-4 text-orange-400" /> Kategori Baru
        </button>
      </div>

      {/* Modal Tambah Kategori */}
      {addingCategory && (
        <div className="bg-card border border-orange-500/30 rounded-2xl p-5 space-y-4 shadow-xl">
          <h3 className="font-semibold text-orange-400">Tambah Kategori Baru</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Nama Kategori (contoh: Minuman Spesial)"
              value={newCategory.category}
              onChange={e => setNewCategory({ ...newCategory, category: e.target.value })}
              className="bg-background border border-border rounded-xl px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-orange-500"
            />
            <input
              type="text"
              placeholder="Deskripsi singkat (opsional)"
              value={newCategory.description}
              onChange={e => setNewCategory({ ...newCategory, description: e.target.value })}
              className="bg-background border border-border rounded-xl px-3.5 py-2 text-sm text-foreground focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setAddingCategory(false)} className="px-3.5 py-1.5 rounded-xl text-sm text-muted-foreground hover:bg-muted">Batal</button>
            <button onClick={confirmAddCategory} className="px-4 py-1.5 rounded-xl text-sm bg-orange-500 text-foreground font-medium">Tambah</button>
          </div>
        </div>
      )}

      {/* Categorised List */}
      {menu.map((cat, catIdx) => (
        <div key={cat.category} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 bg-card/60 flex items-center justify-between cursor-pointer" onClick={() => toggleCategory(cat.category)}>
            <div className="flex items-center gap-3">
              <span className="font-bold text-foreground">{cat.category}</span>
              <span className="text-xs text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full">{cat.items.length} item</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={(e) => { e.stopPropagation(); deleteCategory(catIdx); }} className="p-1.5 text-muted-foreground hover:text-red-400 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4 space-y-2 border-t border-border/50">
            {cat.items.map((item, itemIdx) => {
              const isEditing = editingItem?.catIdx === catIdx && editingItem?.itemIdx === itemIdx;
              return (
                <div key={itemIdx} className="flex items-center justify-between p-2.5 rounded-xl bg-background/40 hover:bg-background/80 transition-all border border-border/40">
                  {isEditing ? (
                    <div className="flex items-center gap-2 flex-grow">
                      <input type="text" value={editValues.name} onChange={e => setEditValues({ ...editValues, name: e.target.value })} className="bg-background border border-orange-500 rounded-lg px-2.5 py-1 text-sm text-foreground flex-grow" />
                      <input type="text" value={editValues.price} onChange={e => setEditValues({ ...editValues, price: e.target.value })} className="bg-background border border-orange-500 rounded-lg px-2.5 py-1 text-sm text-foreground w-20" />
                      <button onClick={confirmEdit} className="p-1.5 bg-emerald-500 text-foreground rounded-lg"><Check className="w-4 h-4" /></button>
                      <button onClick={() => setEditingItem(null)} className="p-1.5 bg-muted text-muted-foreground rounded-lg"><X className="w-4 h-4" /></button>
                    </div>
                  ) : (
                    <>
                      <span className="text-sm font-medium text-foreground">{item.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-orange-400">Rp {item.price}</span>
                        <button onClick={() => startEdit(catIdx, itemIdx)} className="text-muted-foreground hover:text-foreground p-1"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => deleteItem(catIdx, itemIdx)} className="text-muted-foreground hover:text-red-400 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}

            {/* Add Item to Category */}
            {addingItem?.catIdx === catIdx ? (
              <div className="flex items-center gap-2 p-2 bg-card border border-orange-500/40 rounded-xl">
                <input type="text" placeholder="Nama item" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} className="bg-background border border-border rounded-lg px-2.5 py-1 text-sm text-foreground flex-grow" />
                <input type="text" placeholder="Harga (misal: 15K)" value={newItem.price} onChange={e => setNewItem({ ...newItem, price: e.target.value })} className="bg-background border border-border rounded-lg px-2.5 py-1 text-sm text-foreground w-28" />
                <button onClick={() => confirmAddItem(catIdx)} className="px-3 py-1 bg-orange-500 text-foreground text-xs font-semibold rounded-lg">Simpan</button>
                <button onClick={() => setAddingItem(null)} className="p-1 text-muted-foreground"><X className="w-4 h-4" /></button>
              </div>
            ) : (
              <button onClick={() => { setAddingItem({ catIdx }); setNewItem({ name: "", price: "" }); }} className="text-xs text-orange-400 hover:underline flex items-center gap-1 mt-2 pt-1">
                <Plus className="w-3.5 h-3.5" /> Tambah Item ke {cat.category}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
