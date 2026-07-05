"use client";

import { useState } from 'react';
import { Dices, Sparkles } from "lucide-react";
import { Section } from "./section";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { menuCategories } from "./menu.ts";

interface MenuItem {
  name: string;
  price: string;
}

interface SelectedPair {
  food: MenuItem;
  drink: MenuItem;
}

// Ambil semua item makanan dari menuCategories, kecuali 'Minuman' dan 'Topping'
const allFoods: MenuItem[] = menuCategories
  .filter(cat => cat.category !== 'Minuman' && cat.category !== 'Topping')
  .flatMap(cat => cat.items.map(item => ({ name: `${item.name} (${cat.category})`, price: item.price })));

// Ambil semua item minuman
const allDrinks: MenuItem[] = menuCategories
  .find(cat => cat.category === 'Minuman')?.items ?? [];


export function RandomMenuPicker() {
  const [selectedPair, setSelectedPair] = useState<SelectedPair | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const pickRandomMenu = () => {
    setIsSpinning(true);
    setSelectedPair(null);
    
    // Simulasi proses acak
    setTimeout(() => {
      const randomFood = allFoods[Math.floor(Math.random() * allFoods.length)];
      const randomDrink = allDrinks[Math.floor(Math.random() * allDrinks.length)];
      
      setSelectedPair({ food: randomFood, drink: randomDrink });
      setIsSpinning(false);
    }, 700);
  };

  return (
    <Section
      id="random-picker"
      pill="Menu Acak"
      title="Bingung mau pesan apa?"
    >
      <Card className="bg-gradient-to-br from-card to-card/60 border-primary/20">
        <CardContent className="p-6 text-center">
          <p className="mb-6 text-foreground/80">
            Biarkan takdir yang memilih! Klik tombol di bawah untuk mendapatkan pasangan menu acak.
          </p>
          <Button size="lg" onClick={pickRandomMenu} disabled={isSpinning}>
             <Dices className={`w-5 h-5 mr-2 ${isSpinning ? 'animate-spin' : ''}`} />
            {isSpinning ? 'Mengacak...' : 'Acak Menu!'}
          </Button>

          {selectedPair && (
            <div className="mt-6 text-left">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Pilihanmu hari ini:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-lg bg-card/50 p-4 border border-primary/20">
                <div>
                  <p className="font-bold text-lg">{selectedPair.food.name}</p>
                  <p className="text-primary font-semibold">Rp {selectedPair.food.price}</p>
                </div>
                <div>
                  <p className="font-bold text-lg">{selectedPair.drink.name}</p>
                  <p className="text-primary font-semibold">Rp {selectedPair.drink.price}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Section>
  );
}
