"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { UtensilsCrossed } from "lucide-react";
import { foodTrucks, type FoodTruck } from "@/data/porchella";

type FoodTruckSheetProps = {
  open: boolean;
  onClose: () => void;
};

export function FoodTruckSheet({ open, onClose }: FoodTruckSheetProps) {
  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="bottom"
        className="max-h-[70vh] overflow-y-auto rounded-t-2xl px-5 pb-8 pt-4"
      >
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <UtensilsCrossed className="h-5 w-5 text-amber-500" />
            Food Trucks
          </SheetTitle>
          <SheetDescription>
            Savory to Sweet — Fauquier blocks near Claremont
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 grid gap-3">
          {foodTrucks.map((truck) => (
            <FoodTruckCard key={truck.id} truck={truck} />
          ))}
        </div>

        <p className="mt-4 text-xs text-muted-foreground text-center">
          Food trucks are located along Fauquier Ave near Claremont.
        </p>
      </SheetContent>
    </Sheet>
  );
}

function FoodTruckCard({ truck }: { truck: FoodTruck }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-3 border-l-4 border-l-amber-500">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-amber-500/10">
        <UtensilsCrossed className="h-5 w-5 text-amber-500" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm">{truck.name}</h3>
        {truck.description && (
          <p className="text-xs text-muted-foreground mt-0.5">{truck.description}</p>
        )}
      </div>
      {truck.website && (
        <a
          href={truck.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary underline flex-shrink-0"
        >
          Menu
        </a>
      )}
    </div>
  );
}
