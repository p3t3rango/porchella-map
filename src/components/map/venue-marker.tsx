"use client";

import { Music } from "lucide-react";

type VenueMarkerProps = {
  isActive: boolean;
  isSelected: boolean;
  bandName: string;
  onClick: () => void;
};

export function VenueMarker({
  isActive,
  isSelected,
  bandName,
  onClick,
}: VenueMarkerProps) {
  return (
    <button
      onClick={onClick}
      aria-label={`${bandName} venue${isActive ? ", now performing" : ""}`}
      className={`
        group relative flex items-center justify-center
        rounded-full border-2 transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        ${
          isSelected
            ? "h-10 w-10 border-primary bg-primary text-primary-foreground shadow-lg scale-110"
            : isActive
              ? "h-8 w-8 border-primary bg-primary/90 text-primary-foreground shadow-md hover:scale-110"
              : "h-6 w-6 border-muted-foreground/40 bg-muted text-muted-foreground hover:scale-110 hover:border-primary/60"
        }
      `}
      style={{ minWidth: isSelected ? 40 : isActive ? 32 : 24, minHeight: isSelected ? 40 : isActive ? 32 : 24 }}
    >
      <Music className={isSelected ? "h-5 w-5" : isActive ? "h-4 w-4" : "h-3 w-3"} />
      {(isActive || isSelected) && (
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-card px-1.5 py-0.5 text-[10px] font-medium text-card-foreground shadow-sm border opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {bandName}
        </span>
      )}
    </button>
  );
}
