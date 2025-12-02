"use client";

import React from "react";

interface MenuItem {
  name: string;
  price: string;
}
interface OrderItem extends MenuItem {
  quantity: number;
}
interface ReceiptProps {
  order: OrderItem[];
  total: number;
  dateTime: { date: string; time: string };
}

const parsePrice = (price: string) => {
  return parseInt(price.replace("K", "000"));
};

export const Receipt: React.FC<ReceiptProps> = ({ order, total, dateTime }) => {
  if (!dateTime) return null;

  return (
    <div className="p-2 text-black bg-white" style={{ width: '288px', fontFamily: 'monospace', fontSize: '12px' }}>
      <div className="text-center">
        <h1 className="font-bold text-base">NASGOR X STARBAG MUZAR</h1>
        <p>Jl. KHA Dahlan No.7, Purworejo</p>
        <p>--------------------------------</p>
      </div>
      <div className="flex justify-between">
          <p>Tgl: {dateTime.date}</p>
          <p>Jam: {dateTime.time}</p>
      </div>
      <p>--------------------------------</p>
      <div>
        {order.map((item) => (
          <div key={item.name} className="grid grid-cols-12 gap-1">
            <div className="col-span-12">{item.name}</div>
            <div className="col-span-2 text-right">{item.quantity}x</div>
            <div className="col-span-4">
              @{parsePrice(item.price).toLocaleString("id-ID")}
            </div>
            <div className="col-span-6 text-right">
              {(parsePrice(item.price) * item.quantity).toLocaleString(
                "id-ID"
              )}
            </div>
          </div>
        ))}
      </div>
      <p>--------------------------------</p>
      <div>
        <div className="grid grid-cols-12">
          <p className="col-span-6 font-bold">TOTAL</p>
          <p className="col-span-6 font-bold text-right">
            Rp{total.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
      <p className="mt-4 text-center">
        Terima kasih atas kunjungan Anda!
      </p>
    </div>
  );
};
