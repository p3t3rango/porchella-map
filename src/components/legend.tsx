"use client";

import { Music, UtensilsCrossed, Toilet, ShoppingBag, Minus } from "lucide-react";

const items = [
  { icon: Music, label: "Active venue", color: "bg-primary text-primary-foreground" },
  { icon: UtensilsCrossed, label: "Food trucks", color: "bg-amber-500 text-white" },
  { icon: Toilet, label: "Restrooms", color: "bg-blue-500 text-white" },
  { icon: ShoppingBag, label: "Merch / Info", color: "bg-pink-500 text-white" },
  { icon: Minus, label: "Street closure", color: "bg-red-400 text-white" },
];

export function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-3 px-3 py-2 text-xs text-muted-foreground border-b">
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <span className={`flex h-4 w-4 items-center justify-center rounded ${item.color}`}>
            <item.icon className="h-2.5 w-2.5" />
          </span>
          {item.label}
        </span>
      ))}
    </div>
  );
}
