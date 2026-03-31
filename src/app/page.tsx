"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { PorchellaMap } from "@/components/map/porchella-map";
import { TimeSelector } from "@/components/time-selector";
import { FilterBar } from "@/components/filter-bar";
import { BandCard } from "@/components/band-card";
import { BandDetailSheet } from "@/components/band-detail-sheet";
import { Legend } from "@/components/legend";
import {
  performances,
  getBand,
  getVenue,
  sponsors,
  type Performance,
} from "@/data/porchella";
import { TIME_SLOTS, getCurrentSlot, isEventDay, type TimeSlot } from "@/lib/time";
import { Music, ExternalLink } from "lucide-react";
import { SLOT_COLORS } from "@/lib/colors";
import { ThemeToggle } from "@/components/theme-toggle";
import { DraggablePanel } from "@/components/draggable-panel";
import { useFavorites } from "@/lib/favorites";

export default function Home() {
  // Time slot state — default to current slot on event day, else first slot
  const [activeSlot, setActiveSlot] = useState<TimeSlot>(() => {
    if (typeof window === "undefined") return TIME_SLOTS[0];
    return getCurrentSlot() ?? TIME_SLOTS[0];
  });

  const [currentSlot, setCurrentSlot] = useState<TimeSlot | null>(null);

  // Update "now" indicator every 30 seconds
  useEffect(() => {
    const update = () => setCurrentSlot(getCurrentSlot());
    update();
    if (isEventDay()) {
      const interval = setInterval(update, 30_000);
      return () => clearInterval(interval);
    }
  }, []);

  // Dark mode — observe the class on <html>
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const html = document.documentElement;
    setIsDark(html.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDark(html.classList.contains("dark"));
    });
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showAllVenues, setShowAllVenues] = useState(false);
  const [showRestrooms, setShowRestrooms] = useState(true);
  const [showFoodTrucks, setShowFoodTrucks] = useState(true);

  // Favorites
  const { favorites, toggleFavorite, isFavorite, count: favoritesCount } = useFavorites();


  // Selection
  const [selectedPerformance, setSelectedPerformance] =
    useState<Performance | null>(null);

  // Filtered band IDs based on search + genre + favorites
  const filteredBandIds = useMemo(() => {
    if (!searchQuery && !selectedGenre && !showFavorites) return null;
    const q = searchQuery.toLowerCase();
    const ids = new Set<string>();
    performances.forEach((p) => {
      const band = getBand(p.bandId);
      if (!band) return;
      const matchesSearch =
        !q ||
        band.name.toLowerCase().includes(q) ||
        band.genre.toLowerCase().includes(q);
      const matchesGenre = !selectedGenre || band.genre === selectedGenre;
      const matchesFavorites = !showFavorites || favorites.has(band.id);
      if (matchesSearch && matchesGenre && matchesFavorites) ids.add(band.id);
    });
    return ids;
  }, [searchQuery, selectedGenre, showFavorites, favorites]);

  // Show across all time slots when filtering, favorites, or all-shows is active
  const isFiltering = !!searchQuery || !!selectedGenre || showFavorites || showAllVenues;

  // Performances for the active slot (or all slots when filtering), filtered
  const slotPerformances = useMemo(() => {
    return performances
      .filter((p) => {
        if (!isFiltering && p.timeSlot !== activeSlot) return false;
        if (filteredBandIds && !filteredBandIds.has(p.bandId)) return false;
        return true;
      })
      .map((p) => ({
        ...p,
        band: getBand(p.bandId)!,
        venue: getVenue(p.venueId)!,
      }))
      .sort((a, b) => {
        // When showing all, sort by time then name
        if (isFiltering) {
          const timeCompare = a.timeSlot.localeCompare(b.timeSlot);
          if (timeCompare !== 0) return timeCompare;
        }
        return a.band.name.localeCompare(b.band.name);
      });
  }, [activeSlot, filteredBandIds, isFiltering]);

  const handleSelectPerformance = useCallback(
    (perf: Performance | null) => {
      setSelectedPerformance(perf);
    },
    []
  );

  const selectedBand = selectedPerformance
    ? getBand(selectedPerformance.bandId) ?? null
    : null;
  const selectedVenue = selectedPerformance
    ? getVenue(selectedPerformance.venueId) ?? null
    : null;

  const panelContent = (
    <>
      <TimeSelector
        activeSlot={activeSlot}
        currentSlot={currentSlot}
        onSelectSlot={setActiveSlot}
      />
      {/* Legend — hidden on mobile to save space */}
      <div className="hidden lg:block">
        <Legend />
      </div>
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        showFavorites={showFavorites}
        onToggleFavorites={() => setShowFavorites((v) => !v)}
        favoritesCount={favoritesCount}
        showAllVenues={showAllVenues}
        onToggleAllVenues={() => setShowAllVenues((v) => !v)}
        showRestrooms={showRestrooms}
        onToggleRestrooms={() => setShowRestrooms((v) => !v)}
        showFoodTrucks={showFoodTrucks}
        onToggleFoodTrucks={() => setShowFoodTrucks((v) => !v)}
        resultCount={slotPerformances.length}
      />

      {/* Band list */}
      <div
        className="band-list flex-1 overflow-y-auto px-3 py-2 space-y-2"
        role="list"
        aria-label="Bands performing at selected time"
      >
        {slotPerformances.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <Music className="h-8 w-8 mb-2 opacity-50" />
            <p className="text-sm">No bands found</p>
            <p className="text-xs mt-1">
              {isFiltering
                ? "Try a different search or genre"
                : "Try a different time slot"}
            </p>
          </div>
        ) : (
          slotPerformances.map((p) => (
            <div key={`${p.bandId}-${p.venueId}`} role="listitem">
              <BandCard
                band={p.band}
                venue={p.venue}
                timeSlot={p.timeSlot}
                timeColor={SLOT_COLORS[p.timeSlot]}
                isSelected={selectedPerformance?.bandId === p.bandId}
                isFavorite={isFavorite(p.bandId)}
                onToggleFavorite={() => toggleFavorite(p.bandId)}
                onClick={() =>
                  handleSelectPerformance(
                    selectedPerformance?.bandId === p.bandId ? null : p
                  )
                }
              />
            </div>
          ))
        )}
      </div>

      {/* Sponsor footer */}
      <footer className="border-t px-3 py-2 text-center text-[10px] text-muted-foreground">
        <span>Sponsored by </span>
        {sponsors.map((s, i) => (
          <span key={s.name}>
            {i > 0 && " & "}
            <a
              href={s.website}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              {s.name}
            </a>
          </span>
        ))}
      </footer>
    </>
  );

  return (
    <div className="flex h-dvh flex-col" id="main-content">
      {/* Header */}
      <header className="flex items-center justify-between border-b bg-background px-3 py-2 lg:px-4">
        <div className="flex items-center gap-2">
          <Music className="h-5 w-5 text-primary" />
          <div>
            <h1 className="text-base font-bold leading-tight">
              Porchella 2026
            </h1>
            <p className="text-[11px] text-muted-foreground">
              Bellevue, Richmond VA &middot; Apr 18, 12–6 PM
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="https://bellevueweb.org/join-bca/#join"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium hover:bg-accent transition-colors"
          >
            Join BCA
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </header>

      {/* Desktop: side-by-side | Mobile: map + draggable overlay panel */}
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden relative">
        {/* Map — fills the entire area; panel overlays on mobile */}
        <div className="absolute inset-0 lg:relative lg:flex-1">
          <PorchellaMap
            activeSlot={activeSlot}
            selectedPerformance={selectedPerformance}
            onSelectPerformance={handleSelectPerformance}
            filteredBandIds={filteredBandIds}
            isDark={isDark}
            showAllVenues={showAllVenues}
            showFavorites={showFavorites}
            favorites={favorites}
            showRestrooms={showRestrooms}
            showFoodTrucks={showFoodTrucks}
          />
        </div>

        {/* Mobile: draggable panel | Desktop: fixed sidebar */}
        {/* On mobile, DraggablePanel handles positioning */}
        <div className="lg:hidden">
          <DraggablePanel>
            {panelContent}
          </DraggablePanel>
        </div>
        {/* Desktop sidebar */}
        <div className="hidden lg:flex lg:flex-col lg:w-[400px] lg:border-l lg:overflow-hidden">
          {panelContent}
        </div>
      </div>

      {/* Band detail sheet */}
      <BandDetailSheet
        band={selectedBand}
        venue={selectedVenue}
        timeSlot={selectedPerformance?.timeSlot ?? null}
        open={selectedPerformance !== null}
        onClose={() => handleSelectPerformance(null)}
        isFavorite={selectedPerformance ? isFavorite(selectedPerformance.bandId) : false}
        onToggleFavorite={selectedPerformance ? () => toggleFavorite(selectedPerformance.bandId) : undefined}
      />
    </div>
  );
}
