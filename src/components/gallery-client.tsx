"use client";

import { useState } from "react";
import { Section } from "./section";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { ZoomIn, ChevronLeft, ChevronRight, Flame, Utensils, Coffee, Store, Sparkles, LayoutGrid, SlidersHorizontal } from "lucide-react";
import { GalleryItem } from "@/lib/gallery-service";

const categories = [
  { key: "all", label: "Semua", icon: Sparkles },
  { key: "makanan", label: "Hidangan", icon: Utensils },
  { key: "proses", label: "Proses Memasak", icon: Flame },
  { key: "suasana", label: "Suasana", icon: Store },
  { key: "minuman", label: "Minuman", icon: Coffee },
] as const;

interface Props {
  initialItems: GalleryItem[];
}

export function GalleryClient({ initialItems }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [mobileLayout, setMobileLayout] = useState<"carousel" | "grid">("carousel");

  const filteredItems = activeCategory === "all" 
    ? initialItems 
    : initialItems.filter((item) => item.category === activeCategory);

  const selectedItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  const handleNext = () => {
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <Section
      id="galeri"
      pill="Galeri Foto"
      title="📸 Visual Rasa & Suasana Muzar"
    >
      {/* Category Filter Buttons + Mobile View Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        {/* Horizontal Scrollable Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.key;
            return (
              <Button
                key={cat.key}
                variant={isActive ? "default" : "secondary"}
                size="sm"
                onClick={() => {
                  setActiveCategory(cat.key);
                  setSelectedItemIndex(null);
                }}
                className={`rounded-full transition-all duration-300 font-medium whitespace-nowrap flex-shrink-0 ${
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105" 
                    : "bg-card hover:bg-card/80 border border-border"
                }`}
              >
                <Icon className="w-3.5 h-3.5 mr-1.5" />
                {cat.label}
              </Button>
            );
          })}
        </div>

        {/* Mobile View Switcher Toggle (Visible on mobile) */}
        <div className="flex sm:hidden items-center justify-end gap-1 bg-card/60 border border-border rounded-lg p-1 w-fit self-end">
          <Button
            size="sm"
            variant={mobileLayout === "carousel" ? "default" : "ghost"}
            onClick={() => setMobileLayout("carousel")}
            className="h-7 px-2.5 text-xs rounded-md"
          >
            <SlidersHorizontal className="w-3 h-3 mr-1" /> Slide
          </Button>
          <Button
            size="sm"
            variant={mobileLayout === "grid" ? "default" : "ghost"}
            onClick={() => setMobileLayout("grid")}
            className="h-7 px-2.5 text-xs rounded-md"
          >
            <LayoutGrid className="w-3 h-3 mr-1" /> Grid 2x2
          </Button>
        </div>
      </div>

      {/* Container: Horizontal Swipe Carousel vs 2-Column Grid on Mobile */}
      <div 
        className={
          mobileLayout === "carousel"
            ? "flex overflow-x-auto snap-x snap-mandatory gap-3.5 pb-4 scrollbar-none sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 -mx-4 px-4 sm:mx-0 sm:px-0"
            : "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        }
      >
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setSelectedItemIndex(idx)}
            className={`group relative overflow-hidden rounded-2xl bg-card border border-border/80 shadow-md cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 ${
              mobileLayout === "carousel" 
                ? "flex-shrink-0 w-[78vw] max-w-[280px] sm:w-auto snap-center" 
                : "w-full"
            }`}
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Tag Badge Top Left */}
              {item.tag && (
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10">
                  <Badge className="bg-primary/90 backdrop-blur-md text-primary-foreground font-semibold px-2 py-0.5 text-[10px] sm:text-[11px] shadow">
                    {item.tag}
                  </Badge>
                </div>
              )}

              {/* Zoom Icon Hover Center */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                <div className="bg-primary/90 text-primary-foreground p-2.5 sm:p-3 rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>

              {/* Text Info Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10 text-white">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-primary font-semibold block mb-0.5">
                  {item.categoryLabel}
                </span>
                <h3 className="font-headline text-sm sm:text-lg font-bold leading-snug text-white group-hover:text-primary transition-colors line-clamp-1">
                  {item.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Dialog Modal */}
      <Dialog 
        open={selectedItemIndex !== null} 
        onOpenChange={(open) => {
          if (!open) setSelectedItemIndex(null);
        }}
      >
        <DialogContent className="max-w-3xl bg-card border-border p-0 overflow-hidden rounded-2xl shadow-2xl">
          {selectedItem && (
            <div className="flex flex-col md:flex-row">
              {/* Modal Image Area */}
              <div className="relative w-full md:w-3/5 aspect-[4/3] md:aspect-auto min-h-[250px] md:min-h-[380px] bg-black overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                
                {/* Previous & Next Floating Nav Buttons */}
                {filteredItems.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-primary text-white hover:text-black p-2 rounded-full backdrop-blur-sm transition-all duration-200"
                      aria-label="Sebelumnya"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-primary text-white hover:text-black p-2 rounded-full backdrop-blur-sm transition-all duration-200"
                      aria-label="Selanjutnya"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Modal Details Area */}
              <div className="w-full md:w-2/5 p-5 md:p-6 flex flex-col justify-between bg-card text-foreground">
                <div>
                  <DialogHeader className="text-left p-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="border-primary/40 text-primary text-xs font-semibold">
                        {selectedItem.categoryLabel}
                      </Badge>
                      {selectedItem.tag && (
                        <Badge className="bg-primary/20 text-primary border-transparent text-xs font-semibold">
                          {selectedItem.tag}
                        </Badge>
                      )}
                    </div>
                    <DialogTitle className="font-headline text-xl md:text-2xl font-bold">
                      {selectedItem.title}
                    </DialogTitle>
                  </DialogHeader>

                  <DialogDescription className="text-foreground/80 mt-3 md:mt-4 text-xs md:text-sm leading-relaxed">
                    {selectedItem.description}
                  </DialogDescription>
                </div>

                <div className="mt-5 md:mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-mono">
                    {selectedItemIndex !== null ? selectedItemIndex + 1 : 1} dari {filteredItems.length} foto
                  </span>

                  <Button
                    asChild
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-xs font-semibold"
                  >
                    <a href="#order" onClick={() => setSelectedItemIndex(null)}>
                      Pesan Sekarang
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}
