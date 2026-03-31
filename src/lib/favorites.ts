"use client";

import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "porchella-favorites";

function loadFavorites(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

function saveFavorites(favorites: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
}

/** Check URL for shared favorites on first load */
function loadFromURL(): Set<string> | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const fav = params.get("fav");
  if (!fav) return null;
  return new Set(fav.split(",").filter(Boolean));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [imported, setImported] = useState(false);

  // Load from URL (shared link) or localStorage on mount
  useEffect(() => {
    const fromURL = loadFromURL();
    if (fromURL && fromURL.size > 0) {
      // Merge URL favorites into localStorage
      const existing = loadFavorites();
      const merged = new Set([...existing, ...fromURL]);
      saveFavorites(merged);
      setFavorites(merged);
      setImported(true);
      // Clean URL without reload
      const url = new URL(window.location.href);
      url.searchParams.delete("fav");
      window.history.replaceState({}, "", url.pathname);
    } else {
      setFavorites(loadFavorites());
    }
  }, []);

  const toggleFavorite = useCallback((bandId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(bandId)) {
        next.delete(bandId);
      } else {
        next.add(bandId);
      }
      saveFavorites(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (bandId: string) => favorites.has(bandId),
    [favorites]
  );

  /** Generate a shareable URL with current favorites */
  const getShareURL = useCallback(() => {
    if (favorites.size === 0) return null;
    const base =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://porchella-map.vercel.app";
    return `${base}?fav=${[...favorites].join(",")}`;
  }, [favorites]);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    count: favorites.size,
    getShareURL,
    imported,
  };
}
