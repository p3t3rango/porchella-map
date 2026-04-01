"use client";

import { useRef, useEffect, useCallback } from "react";
import { TIME_SLOTS, TIME_SLOT_LABELS, type TimeSlot } from "@/lib/time";
import { SLOT_COLORS } from "@/lib/colors";

type TimeSelectorProps = {
  activeSlot: TimeSlot;
  currentSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
};

export function TimeSelector({
  activeSlot,
  currentSlot,
  onSelectSlot,
}: TimeSelectorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Scroll active slot into view on mount
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeSlot]);

  // Arrow key navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const idx = TIME_SLOTS.indexOf(activeSlot);
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        if (idx < TIME_SLOTS.length - 1) onSelectSlot(TIME_SLOTS[idx + 1]);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        if (idx > 0) onSelectSlot(TIME_SLOTS[idx - 1]);
      } else if (e.key === "Home") {
        e.preventDefault();
        onSelectSlot(TIME_SLOTS[0]);
      } else if (e.key === "End") {
        e.preventDefault();
        onSelectSlot(TIME_SLOTS[TIME_SLOTS.length - 1]);
      }
    },
    [activeSlot, onSelectSlot]
  );

  return (
    <div
      className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur-sm"
      role="tablist"
      aria-label="Performance time slots"
      onKeyDown={handleKeyDown}
    >
      <div
        ref={scrollRef}
        className="flex gap-1.5 overflow-x-auto px-3 py-2.5 scrollbar-none"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {TIME_SLOTS.map((slot) => {
          const isActive = slot === activeSlot;
          const isNow = slot === currentSlot;
          return (
            <button
              key={slot}
              ref={isActive ? activeRef : undefined}
              role="tab"
              tabIndex={isActive ? 0 : -1}
              aria-selected={isActive}
              aria-label={`${TIME_SLOT_LABELS[slot]}${isNow ? ", currently playing" : ""}`}
              onClick={() => onSelectSlot(slot)}
              className={`
                relative flex-shrink-0 rounded-full px-3.5 py-2 text-sm font-medium min-h-[44px]
                transition-all duration-150 flex items-center gap-1.5
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                ${
                  isActive
                    ? "text-white shadow-sm"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                }
              `}
              style={isActive ? { backgroundColor: SLOT_COLORS[slot] } : undefined}
            >
              {isNow && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                </span>
              )}
              {!isActive && (
                <span
                  className="h-2 w-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: SLOT_COLORS[slot] }}
                />
              )}
              {TIME_SLOT_LABELS[slot]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
