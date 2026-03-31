"use client";

import { useRef, useState, useCallback, useEffect } from "react";

type DraggablePanelProps = {
  children: React.ReactNode;
};

// Snap points as percentage of viewport height (from bottom)
const SNAP_COLLAPSED = 15; // just the handle + time selector
const SNAP_DEFAULT = 45;   // time + filters + ~2 band cards
const SNAP_EXPANDED = 85;  // nearly full screen

const SNAPS = [SNAP_COLLAPSED, SNAP_DEFAULT, SNAP_EXPANDED];

function closestSnap(pct: number): number {
  let closest = SNAPS[0];
  let minDist = Math.abs(pct - SNAPS[0]);
  for (const snap of SNAPS) {
    const dist = Math.abs(pct - snap);
    if (dist < minDist) {
      minDist = dist;
      closest = snap;
    }
  }
  return closest;
}

export function DraggablePanel({ children }: DraggablePanelProps) {
  const [heightPct, setHeightPct] = useState(SNAP_DEFAULT);
  const dragging = useRef(false);
  const startY = useRef(0);
  const startPct = useRef(SNAP_DEFAULT);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    dragging.current = true;
    startY.current = e.touches[0].clientY;
    startPct.current = heightPct;
  }, [heightPct]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragging.current) return;
    const deltaY = startY.current - e.touches[0].clientY;
    const vh = window.innerHeight;
    const deltaPct = (deltaY / vh) * 100;
    const newPct = Math.max(SNAP_COLLAPSED, Math.min(SNAP_EXPANDED, startPct.current + deltaPct));
    setHeightPct(newPct);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    setHeightPct(closestSnap(heightPct));
  }, [heightPct]);

  // Mouse drag support for desktop testing
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    startY.current = e.clientY;
    startPct.current = heightPct;

    const handleMouseMove = (ev: MouseEvent) => {
      if (!dragging.current) return;
      const deltaY = startY.current - ev.clientY;
      const vh = window.innerHeight;
      const deltaPct = (deltaY / vh) * 100;
      const newPct = Math.max(SNAP_COLLAPSED, Math.min(SNAP_EXPANDED, startPct.current + deltaPct));
      setHeightPct(newPct);
    };

    const handleMouseUp = () => {
      dragging.current = false;
      setHeightPct((prev) => closestSnap(prev));
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }, [heightPct]);

  // Prevent panel scroll from propagating when at scroll top
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const handleWheel = (e: WheelEvent) => {
      const scrollable = panel.querySelector(".band-list");
      if (scrollable && scrollable.scrollTop === 0 && e.deltaY < 0) {
        // At top of scroll, collapse slightly
      }
    };
    panel.addEventListener("wheel", handleWheel, { passive: true });
    return () => panel.removeEventListener("wheel", handleWheel);
  }, []);

  const isExpanded = heightPct > (SNAP_DEFAULT + SNAP_EXPANDED) / 2;
  const isCollapsed = heightPct < (SNAP_COLLAPSED + SNAP_DEFAULT) / 2;

  return (
    <div
      ref={panelRef}
      className="absolute bottom-0 left-0 right-0 z-10 flex flex-col border-t bg-background/95 backdrop-blur-md rounded-t-2xl shadow-[0_-2px_20px_rgba(0,0,0,0.1)] lg:relative lg:z-auto lg:rounded-none lg:shadow-none lg:border-t-0 lg:border-l lg:bg-background lg:backdrop-blur-none lg:w-[400px]"
      style={{
        height: `${heightPct}vh`,
        maxHeight: `${SNAP_EXPANDED}vh`,
        transition: dragging.current ? "none" : "height 0.3s ease-out",
      }}
    >
      {/* Drag handle */}
      <div
        className="flex flex-col items-center gap-0.5 py-2 cursor-grab active:cursor-grabbing touch-manipulation lg:hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        role="separator"
        aria-orientation="horizontal"
        aria-label="Drag to resize band list"
        aria-valuenow={Math.round(heightPct)}
        aria-valuemin={SNAP_COLLAPSED}
        aria-valuemax={SNAP_EXPANDED}
      >
        <div className="h-1 w-10 rounded-full bg-muted-foreground/40" />
        <span className="text-[10px] text-muted-foreground select-none">
          {isExpanded ? "Drag down for map" : isCollapsed ? "Drag up for bands" : ""}
        </span>
      </div>

      {/* Panel content — scrollable */}
      <div className="flex flex-1 flex-col overflow-hidden lg:max-h-none">
        {children}
      </div>
    </div>
  );
}
