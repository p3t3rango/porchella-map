"use client";

import Image from "next/image";
import { MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Band, Venue } from "@/data/porchella";
import { TIME_SLOT_LABELS, type TimeSlot } from "@/lib/time";

type BandCardProps = {
  band: Band;
  venue: Venue;
  timeSlot: TimeSlot;
  isSelected: boolean;
  onClick: () => void;
};

export function BandCard({
  band,
  venue,
  timeSlot,
  isSelected,
  onClick,
}: BandCardProps) {
  return (
    <button
      onClick={onClick}
      aria-label={`${band.name}, ${band.genre}, at ${venue.address}, ${TIME_SLOT_LABELS[timeSlot]}`}
      className={`
        w-full text-left rounded-lg border p-3 transition-all duration-150
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        ${
          isSelected
            ? "border-primary bg-primary/5 shadow-sm"
            : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
        }
      `}
    >
      <div className="flex items-start gap-3">
        {band.image && (
          <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-muted">
            <Image
              src={band.image}
              alt={band.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sm text-card-foreground truncate">
            {band.name}
          </h3>
          <Badge variant="secondary" className="mt-1 text-[11px] font-normal">
            {band.genre}
          </Badge>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {venue.address}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {TIME_SLOT_LABELS[timeSlot]}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
