"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useReactToPrint } from "react-to-print";
import { Receipt } from "./receipt";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Minus, Printer, X } from "lucide-react";
import Link from "next/link";

interface MenuItem {
  name: string;
  price: string;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

interface OrderItem extends MenuItem {
  quantity: number;
  options?: {
    level?: string;
    temp?: string;
  };
}

interface CashierClientProps {
  menu: MenuCategory[];
}

const parsePrice = (price: string) => {
  return parseInt(price.replace("K", "000"));
};

const foodCategories = ["Nasi Goreng", "Bakmi", "Kwetiau", "Bihun", "Capcay"];
const drinkCategory = "Minuman";
const spicinessLevels = ["Tidak Pedas", "Sedang", "Pedas", "Sangat Pedas"];
const temperatureLevels = ["Es", "Hangat", "Panas"];

export function CashierClient({ menu }: CashierClientProps) {
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [receiptDateTime, setReceiptDateTime] = useState<{ date: string; time: string } | null>(null);
  const [selectedItem, setSelectedItem] = useState<{ item: MenuItem; category: string; } | null>(null);
  const [itemOptions, setItemOptions] = useState<{ level?: string; temp?: string; }>({});
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: `struk-${Date.now()}`,
    onBeforeGetContent: () => {
      return new Promise<void>((resolve) => {
        const now = new Date();
        const formattedDate = now.toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" });
        const formattedTime = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
        setReceiptDateTime({ date: formattedDate, time: formattedTime });
        resolve();
      });
    },
    onAfterPrint: () => {
      setReceiptDateTime(null);
    },
  });

  const generateOrderItemName = (baseName: string, options: { level?: string; temp?: string; }) => {
    let finalName = baseName;
    const details = [];
    if (options.level) {
      details.push(options.level);
    }
    if (options.temp) {
      details.push(options.temp);
    }
    if (details.length > 0) {
      finalName += ` (${details.join(', ')})`;
    }
    return finalName;
  };
  
  const addToOrder = (item: MenuItem, categoryName: string, options: { level?: string; temp?: string; }) => {
    const noPrefixCategories = ["Topping", "Minuman"];
    const baseName = noPrefixCategories.includes(categoryName) ? item.name : `${categoryName} ${item.name}`;
    const finalName = generateOrderItemName(baseName, options);

    setOrder((currentOrder) => {
      const existingItem = currentOrder.find((i) => i.name === finalName);
      if (existingItem) {
        return currentOrder.map((i) =>
          i.name === finalName ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...currentOrder, { ...item, name: finalName, quantity: 1, options }];
    });
  };

  const handleItemClick = (item: MenuItem, categoryName: string) => {
    const isFood = foodCategories.includes(categoryName);
    const isDrink = categoryName === drinkCategory;

    if (isFood || isDrink) {
      setSelectedItem({ item, category: categoryName });
      // Reset options, and set default
      const defaultOptions: { level?: string; temp?: string } = {};
      if (isFood) defaultOptions.level = spicinessLevels[1]; // Default 'Sedang'
      if (isDrink) defaultOptions.temp = temperatureLevels[0]; // Default 'Es'
      setItemOptions(defaultOptions);
    } else {
      // For items without options like Toppings
      addToOrder(item, categoryName, {});
    }
  };
  
  const handleConfirmOptions = () => {
    if (selectedItem) {
      addToOrder(selectedItem.item, selectedItem.category, itemOptions);
      setSelectedItem(null);
      setItemOptions({});
    }
  };

  const incrementOrder = (itemName: string) => {
     setOrder((currentOrder) => {
      return currentOrder.map((i) =>
        i.name === itemName ? { ...i, quantity: i.quantity + 1 } : i
      );
    });
  };

  const removeFromOrder = (itemName: string) => {
    setOrder((currentOrder) => {
      const existingItem = currentOrder.find((i) => i.name === itemName);
      if (existingItem && existingItem.quantity > 1) {
        return currentOrder.map((i) =>
          i.name === itemName ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
      return currentOrder.filter((i) => i.name !== itemName);
    });
  };

  const clearItemFromOrder = (itemName: string) => {
    setOrder((currentOrder) => currentOrder.filter((i) => i.name !== itemName));
  };

  const total = order.reduce(
    (acc, item) => acc + parsePrice(item.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row-reverse">
      <div style={{ display: "none" }}>
        {receiptDateTime && <Receipt ref={receiptRef} order={order} total={total} dateTime={receiptDateTime} />}
      </div>

      {/* Options Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={(isOpen) => !isOpen && setSelectedItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pilih Opsi untuk {selectedItem?.item.name}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedItem && foodCategories.includes(selectedItem.category) && (
              <div className="space-y-2">
                <h4 className="font-medium">Tingkat Kepedasan</h4>
                <RadioGroup value={itemOptions.level} onValueChange={(value) => setItemOptions(prev => ({...prev, level: value}))}>
                  {spicinessLevels.map(level => (
                    <div key={level} className="flex items-center space-x-2">
                      <RadioGroupItem value={level} id={`level-${level}`} />
                      <Label htmlFor={`level-${level}`}>{level}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            {selectedItem && selectedItem.category === drinkCategory && (
              <div className="space-y-2 mt-4">
                <h4 className="font-medium">Suhu Minuman</h4>
                 <RadioGroup value={itemOptions.temp} onValueChange={(value) => setItemOptions(prev => ({...prev, temp: value}))}>
                   {temperatureLevels.map(temp => (
                    <div key={temp} className="flex items-center space-x-2">
                      <RadioGroupItem value={temp} id={`temp-${temp}`} />
                      <Label htmlFor={`temp-${temp}`}>{temp}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedItem(null)}>Batal</Button>
            <Button onClick={handleConfirmOptions}>Tambahkan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Right Sidebar: Order Details */}
      <div className="w-full lg:w-1/3 xl:w-1/4 p-4 flex flex-col h-screen">
        <Card className="flex-grow flex flex-col border-white/10">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Pesanan</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setOrder([])} disabled={order.length === 0} className="text-destructive hover:text-destructive hover:bg-destructive/10">
              <Trash2 className="w-5 h-5" />
            </Button>
          </CardHeader>
          <ScrollArea className="flex-grow">
            <CardContent>
              {order.length === 0 ? (
                <p className="text-foreground/60 text-center py-10">Belum ada pesanan.</p>
              ) : (
                <ul className="space-y-4">
                  {order.map((item) => (
                    <li key={item.name} className="flex items-center gap-3">
                      <div className="flex-grow">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-primary">Rp {parsePrice(item.price).toLocaleString("id-ID")}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="icon" variant="outline" className="w-7 h-7" onClick={() => removeFromOrder(item.name)}>
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-bold w-4 text-center">{item.quantity}</span>
                        <Button size="icon" variant="outline" className="w-7 h-7" onClick={() => incrementOrder(item.name)}>
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="w-7 h-7 text-destructive/80 hover:text-destructive hover:bg-destructive/10" onClick={() => clearItemFromOrder(item.name)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </ScrollArea>
          {order.length > 0 && (
            <div className="p-4 border-t border-white/10 mt-auto">
              <div className="flex justify-between items-baseline font-bold text-lg mb-4">
                <span>Total</span>
                <span>Rp {total.toLocaleString("id-ID")}</span>
              </div>
              <Button size="lg" className="w-full font-bold" onClick={handlePrint}>
                <Printer className="w-5 h-5 mr-2" />
                Cetak Struk
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Left Side: Menu */}
      <div className="flex-grow p-4 h-screen flex flex-col">
        <header className="flex items-center justify-between mb-4">
          <h1 className="font-headline text-3xl font-bold text-primary">Kasir</h1>
          <Button asChild variant="outline">
            <Link href="/"><X className="w-4 h-4 mr-2" />Keluar</Link>
          </Button>
        </header>
        <ScrollArea className="flex-grow pr-4 -mr-4">
          <div className="space-y-6">
            {menu.map((category) => (
              <div key={category.category}>
                <h3 className="font-headline text-2xl font-semibold mb-3">{category.category}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {category.items.map((item) => (
                    <Card
                      key={item.name}
                      onClick={() => handleItemClick(item, category.category)}
                      className="bg-card border-white/10 shadow-sm hover:bg-accent/20 hover:border-primary/50 transition-all duration-200 transform hover:-translate-y-1 cursor-pointer"
                    >
                      <CardContent className="p-4">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-primary font-medium">Rp {parsePrice(item.price).toLocaleString("id-ID")}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
