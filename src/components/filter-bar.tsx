"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getAllGenres } from "@/data/porchella";

type FilterBarProps = {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedGenre: string | null;
  onGenreChange: (genre: string | null) => void;
  resultCount: number;
};

const genres = getAllGenres();

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedGenre,
  onGenreChange,
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
            className="pl-8 h-9 text-sm"
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
      <div className="sr-only" role="status" aria-live="polite">
        {resultCount} {resultCount === 1 ? "band" : "bands"} found
      </div>
    </div>
  );
}
