"use client";

import { Search, X, Heart, Eye, Toilet, UtensilsCrossed, Share2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getAllGenres } from "@/data/porchella";

type FilterBarProps = {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedGenre: string | null;
  onGenreChange: (genre: string | null) => void;
  showFavorites: boolean;
  onToggleFavorites: () => void;
  favoritesCount: number;
  showAllVenues: boolean;
  onToggleAllVenues: () => void;
  showRestrooms: boolean;
  onToggleRestrooms: () => void;
  showFoodTrucks: boolean;
  onToggleFoodTrucks: () => void;
  shareURL: string | null;
  resultCount: number;
};

const genres = getAllGenres();

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  showFavorites,
  onToggleFavorites,
  favoritesCount,
  showAllVenues,
  onToggleAllVenues,
  showRestrooms,
  onToggleRestrooms,
  showFoodTrucks,
  onToggleFoodTrucks,
  shareURL,
  resultCount,
}: FilterBarProps) {
  return (
    <div className="border-b bg-background px-3 py-2 space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search bands..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 pr-8 h-9 text-sm"
            aria-label="Search bands by name or genre"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <select
          value={selectedGenre ?? ""}
          onChange={(e) => onGenreChange(e.target.value || null)}
          className="h-9 rounded-md border bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Filter by genre"
        >
          <option value="">All genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>
      {/* Quick toggles — scrollable on mobile */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-0.5" style={{ WebkitOverflowScrolling: "touch" }}>
        <button
          onClick={onToggleFavorites}
          aria-label={showFavorites ? "Show all bands" : "Show only favorites"}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors flex-shrink-0 ${
            showFavorites
              ? "bg-pink-500/15 text-pink-600 dark:text-pink-400 border border-pink-500/30"
              : "bg-secondary text-secondary-foreground hover:bg-accent"
          }`}
        >
          <Heart className={`h-3 w-3 ${showFavorites ? "fill-current" : ""}`} />
          Favorites{favoritesCount > 0 ? ` (${favoritesCount})` : ""}
        </button>
        {shareURL && (
          <button
            onClick={async () => {
              if (navigator.share) {
                await navigator.share({ title: "My Porchella 2026 Lineup", url: shareURL });
              } else {
                await navigator.clipboard.writeText(shareURL);
              }
            }}
            aria-label="Share your favorites list"
            className="inline-flex items-center justify-center rounded-full h-6 w-6 flex-shrink-0 bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
          >
            <Share2 className="h-3 w-3" />
          </button>
        )}
        <button
          onClick={onToggleAllVenues}
          aria-label={showAllVenues ? "Show current time slot" : "Show all time slots on map"}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors flex-shrink-0 ${
            showAllVenues
              ? "bg-primary/15 text-primary border border-primary/30"
              : "bg-secondary text-secondary-foreground hover:bg-accent"
          }`}
        >
          <Eye className="h-3 w-3" />
          All shows
        </button>
        <button
          onClick={onToggleRestrooms}
          aria-label={showRestrooms ? "Hide restrooms on map" : "Show restrooms on map"}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors flex-shrink-0 ${
            showRestrooms
              ? "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30"
              : "bg-secondary text-secondary-foreground hover:bg-accent"
          }`}
        >
          <Toilet className="h-3 w-3" />
          Restrooms
        </button>
        <button
          onClick={onToggleFoodTrucks}
          aria-label={showFoodTrucks ? "Hide food trucks" : "Show food trucks"}
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors flex-shrink-0 ${
            showFoodTrucks
              ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
              : "bg-secondary text-secondary-foreground hover:bg-accent"
          }`}
        >
          <UtensilsCrossed className="h-3 w-3" />
          Food
        </button>
      </div>
      <div className="sr-only" role="status" aria-live="polite">
        {resultCount} {resultCount === 1 ? "band" : "bands"} found
      </div>
    </div>
  );
}
