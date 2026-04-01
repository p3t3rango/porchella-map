"use client";

import { memo } from "react";
import { UtensilsCrossed, Toilet, ShoppingBag, Info } from "lucide-react";
import type { AmenityType } from "@/data/porchella";

const icons: Record<AmenityType, typeof UtensilsCrossed> = {
  "food-truck": UtensilsCrossed,
  "porta-potty": Toilet,
  merch: ShoppingBag,
  info: Info,
};

const colors: Record<AmenityType, string> = {
  "food-truck": "bg-amber-500 border-amber-600 text-white",
  "porta-potty": "bg-blue-500 border-blue-600 text-white",
  merch: "bg-pink-500 border-pink-600 text-white",
  info: "bg-green-500 border-green-600 text-white",
};

type AmenityMarkerProps = {
  type: AmenityType;
  label: string;
  onClick?: () => void;
};

export const AmenityMarker = memo(function AmenityMarker({ type, label, onClick }: AmenityMarkerProps) {
  const Icon = icons[type];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`group relative flex h-7 w-7 items-center justify-center rounded-md border-2 shadow-sm cursor-pointer ${colors[type]}`}
    >
      <Icon className="h-3.5 w-3.5" />
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-card px-1.5 py-0.5 text-[10px] font-medium text-card-foreground shadow-sm border opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {label}
      </span>
    </button>
  );
});
