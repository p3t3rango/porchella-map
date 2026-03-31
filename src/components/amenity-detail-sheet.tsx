"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { MapPin, Navigation } from "lucide-react";
import type { Amenity } from "@/data/porchella";

type AmenityDetailSheetProps = {
  amenity: Amenity | null;
  open: boolean;
  onClose: () => void;
};

export function AmenityDetailSheet({
  amenity,
  open,
  onClose,
}: AmenityDetailSheetProps) {
  if (!amenity) return null;

  const lat = amenity.coordinates[1];
  const lng = amenity.coordinates[0];
  const directionsLinks = [
    { label: "Google Maps", url: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking` },
    { label: "Apple Maps", url: `https://maps.apple.com/?daddr=${lat},${lng}&dirflg=w` },
    { label: "Waze", url: `https://waze.com/ul?ll=${lat},${lng}&navigate=yes` },
  ];

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="bottom"
        className="rounded-t-2xl px-5 pb-8 pt-4"
      >
        <SheetHeader className="text-left">
          <SheetTitle className="text-lg">{amenity.label}</SheetTitle>
          <SheetDescription className="sr-only">
            Directions to {amenity.label}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-3">
          <div className="rounded-lg border bg-secondary/50 p-3 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>Get walking directions</span>
            </div>
            <div className="flex gap-2">
              {directionsLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-medium hover:bg-accent transition-colors"
                >
                  <Navigation className="h-3 w-3" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
