"use client";

import Image from "next/image";
import { MapPin, Clock, Heart } from "lucide-react";
import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import type { Band, Venue } from "@/data/porchella";
import { TIME_SLOT_LABELS, type TimeSlot } from "@/lib/time";

type BandCardProps = {
  band: Band;
  venue: Venue;
  timeSlot: TimeSlot;
  timeColor: string;
  isSelected: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
};

export const BandCard = memo(function BandCard({
  band,
  venue,
  timeSlot,
  timeColor,
  isSelected,
  isFavorite,
  onToggleFavorite,
  onClick,
}: BandCardProps) {
  return (
    <div
      className={`
        relative w-full text-left rounded-lg border-l-4 border p-3 transition-all duration-150
        ${
          isSelected
            ? "bg-primary/5 shadow-sm border-border"
            : "border-border bg-card hover:shadow-sm"
        }
      `}
      style={{ borderLeftColor: timeColor }}
    >
      <button
        onClick={onClick}
        aria-label={`${band.name}, ${band.genre}, at ${venue.address}, ${TIME_SLOT_LABELS[timeSlot]}`}
        className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
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
          <div className="min-w-0 flex-1 pr-8">
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
      {/* Favorite toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        aria-label={isFavorite ? `Remove ${band.name} from favorites` : `Add ${band.name} to favorites`}
        className="absolute top-3 right-3 p-1 rounded-full hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Heart
          className={`h-4 w-4 transition-colors ${
            isFavorite
              ? "fill-pink-500 text-pink-500"
              : "text-muted-foreground hover:text-pink-400"
          }`}
        />
      </button>
    </div>
  );
});
