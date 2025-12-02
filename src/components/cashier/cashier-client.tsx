"use client";

import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Receipt } from "./receipt";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, Printer, X, Shirt } from "lucide-react";
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
}

interface CashierClientProps {
  menu: MenuCategory[];
}

const parsePrice = (price: string) => {
  return parseInt(price.replace("K", "000"));
};

export function CashierClient({ menu }: CashierClientProps) {
  const [order, setOrder] = useState<OrderItem[]>([]);
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: "Struk Pesanan",
    onAfterPrint: () => {
      // Optional: Clear order after printing
      // setOrder([]);
    },
  });

  const addToOrder = (item: MenuItem) => {
    setOrder((currentOrder) => {
      const existingItem = currentOrder.find((i) => i.name === item.name);
      if (existingItem) {
        return currentOrder.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...currentOrder, { ...item, quantity: 1 }];
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
  }

  const total = order.reduce(
    (acc, item) => acc + parsePrice(item.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row-reverse">
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #receipt-section,
          #receipt-section * {
            visibility: visible;
          }
          #receipt-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
      
      {/* Hidden Receipt for printing */}
      <div className="hidden">
        <Receipt ref={receiptRef} order={order} total={total} />
      </div>

      {/* Right Sidebar: Order Details */}
      <div className="w-full lg:w-1/3 xl:w-1/4 p-4 flex flex-col h-screen">
        <Card className="flex-grow flex flex-col border-white/10">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Pesanan</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOrder([])}
              disabled={order.length === 0}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </CardHeader>
          <ScrollArea className="flex-grow">
            <CardContent>
              {order.length === 0 ? (
                <p className="text-foreground/60 text-center py-10">
                  Belum ada pesanan.
                </p>
              ) : (
                <ul className="space-y-4">
                  {order.map((item) => (
                    <li key={item.name} className="flex items-center gap-3">
                      <div className="flex-grow">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-primary">Rp {parsePrice(item.price).toLocaleString('id-ID')}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="w-7 h-7"
                          onClick={() => removeFromOrder(item.name)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-bold w-4 text-center">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="w-7 h-7"
                          onClick={() => addToOrder(item)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="w-7 h-7 text-destructive/80 hover:text-destructive hover:bg-destructive/10"
                          onClick={() => clearItemFromOrder(item.name)}
                        >
                            <X className="w-4 h-4"/>
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
              <Button
                size="lg"
                className="w-full font-bold"
                onClick={handlePrint}
              >
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
                <Link href="/"><X className="w-4 h-4 mr-2"/>Keluar</Link>
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
                      onClick={() => addToOrder(item)}
                      className="bg-card border-white/10 shadow-sm hover:bg-accent/20 hover:border-primary/50 transition-all duration-200 transform hover:-translate-y-1 cursor-pointer"
                    >
                      <CardContent className="p-4">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-primary font-medium">Rp {parsePrice(item.price).toLocaleString('id-ID')}</p>
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
