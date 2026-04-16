"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Map, { Marker, Source, Layer, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import type { MapRef } from "react-map-gl/maplibre";
import type { LineLayerSpecification } from "maplibre-gl";

import { VenueMarker } from "./venue-marker";
import { AmenityMarker } from "./amenity-marker";
import {
  venues,
  amenities,
  streetClosures,
  performances,
  getBand,
  getVenue,
  type Performance,
  type Amenity,
} from "@/data/porchella";
import type { TimeSlot } from "@/lib/time";

// Bellevue neighborhood — fallback center before fitBounds runs on load.
// Precomputed from the bounding box of all venues + amenities.
const INITIAL_VIEW = {
  longitude: -77.4568,
  latitude: 37.5896,
  zoom: 14.8,
  pitch: 0,
  bearing: 0,
};

// Bounding box of the event area (all venues + amenities) for fitBounds on load.
const EVENT_BOUNDS: [[number, number], [number, number]] = (() => {
  const points = [
    ...venues.map((v) => v.coordinates),
    ...amenities.map((a) => a.coordinates),
  ];
  let west = Infinity, south = Infinity, east = -Infinity, north = -Infinity;
  for (const [lng, lat] of points) {
    if (lng < west) west = lng;
    if (lng > east) east = lng;
    if (lat < south) south = lat;
    if (lat > north) north = lat;
  }
  return [
    [west, south],
    [east, north],
  ];
})();

// Bounds to constrain panning — wide enough to scroll freely at min zoom
const MAX_BOUNDS: [number, number, number, number] = [
  -77.49, 37.56, -77.42, 37.62,
];

const CLOSURE_CLOSED_STYLE: LineLayerSpecification["paint"] = {
  "line-color": "#ef4444",
  "line-width": 4,
  "line-opacity": 0.4,
  "line-dasharray": [2, 2],
};

const CLOSURE_THRU_STYLE: LineLayerSpecification["paint"] = {
  "line-color": "#f97316",
  "line-width": 4,
  "line-opacity": 0.5,
  "line-dasharray": [3, 2],
};

const CLOSURE_CAUTION_STYLE: LineLayerSpecification["paint"] = {
  "line-color": "#eab308",
  "line-width": 4,
  "line-opacity": 0.5,
  "line-dasharray": [2, 2],
};

const MAP_STYLES = {
  light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
};

import { SLOT_COLORS } from "@/lib/colors";

type PorchellaMapProps = {
  activeSlot: TimeSlot;
  selectedPerformance: Performance | null;
  onSelectPerformance: (perf: Performance | null) => void;
  filteredBandIds: Set<string> | null;
  isDark?: boolean;
  showAllVenues?: boolean;
  showFavorites?: boolean;
  favorites?: Set<string>;
  showRestrooms?: boolean;
  showFoodTrucks?: boolean;
  onAmenityClick?: (amenity: Amenity) => void;
};

export function PorchellaMap({
  activeSlot,
  selectedPerformance,
  onSelectPerformance,
  filteredBandIds,
  isDark = false,
  showAllVenues = false,
  showFavorites = false,
  favorites,
  showRestrooms = true,
  showFoodTrucks = true,
  onAmenityClick,
}: PorchellaMapProps) {
  const mapRef = useRef<MapRef>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  // Edit mode: toggled via ?edit=1 in the URL. Enables drag on amenity
  // markers and shows an overlay with copy-able JSON of their coordinates.
  const [editMode, setEditMode] = useState(false);
  const [editedCoords, setEditedCoords] = useState<Record<string, [number, number]>>({});
  useEffect(() => {
    if (typeof window === "undefined") return;
    setEditMode(new URLSearchParams(window.location.search).get("edit") === "1");
  }, []);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const activePerformances = useMemo(() => {
    return performances.filter((p) => {
      // All shows: show everything (filtered by search/genre if active)
      if (showAllVenues) {
        if (filteredBandIds && !filteredBandIds.has(p.bandId)) return false;
        return true;
      }
      // Favorites: show only favorited bands across all slots
      if (showFavorites && favorites) {
        return favorites.has(p.bandId);
      }
      // Default: show only the active time slot
      if (p.timeSlot !== activeSlot) return false;
      if (filteredBandIds && !filteredBandIds.has(p.bandId)) return false;
      return true;
    });
  }, [activeSlot, filteredBandIds, showAllVenues, showFavorites, favorites]);

  const activeVenueIds = useMemo(
    () => new Set(activePerformances.map((p) => p.venueId)),
    [activePerformances]
  );

  const closedGeoJSON = useMemo(
    () => ({
      type: "FeatureCollection" as const,
      features: streetClosures
        .filter((c) => c.type === "closed")
        .map((c) => ({
          type: "Feature" as const,
          properties: { id: c.id, description: c.description },
          geometry: {
            type: "LineString" as const,
            coordinates: c.coordinates,
          },
        })),
    }),
    []
  );

  const cautionGeoJSON = useMemo(
    () => ({
      type: "FeatureCollection" as const,
      features: streetClosures
        .filter((c) => c.type === "caution")
        .map((c) => ({
          type: "Feature" as const,
          properties: { id: c.id, description: c.description },
          geometry: {
            type: "LineString" as const,
            coordinates: c.coordinates,
          },
        })),
    }),
    []
  );

  const thruGeoJSON = useMemo(
    () => ({
      type: "FeatureCollection" as const,
      features: streetClosures
        .filter((c) => c.type === "thru-traffic")
        .map((c) => ({
          type: "Feature" as const,
          properties: { id: c.id, description: c.description },
          geometry: {
            type: "LineString" as const,
            coordinates: c.coordinates,
          },
        })),
    }),
    []
  );

  const handleMarkerClick = useCallback(
    (venueId: string) => {
      const perf = activePerformances.find((p) => p.venueId === venueId);
      if (perf) {
        onSelectPerformance(perf);
      }
    },
    [activePerformances, onSelectPerformance, prefersReducedMotion]
  );

  return (
    <div className="map-container relative h-full w-full" role="application" aria-label="Porchella venue map">
      <Map
        ref={mapRef}
        initialViewState={INITIAL_VIEW}
        maxBounds={MAX_BOUNDS}
        minZoom={13.5}
        maxZoom={18}
        mapStyle={isDark ? MAP_STYLES.dark : MAP_STYLES.light}
        attributionControl={false}
        cooperativeGestures={true}
        onLoad={() => {
          setMapLoaded(true);
          // Mobile: bottom drawer covers ~45% of viewport at default snap,
          // so pad bottom by that much so the fit falls in the visible area.
          const isMobile = window.innerWidth < 1024;
          const bottomPad = isMobile ? Math.round(window.innerHeight * 0.45) + 16 : 40;
          mapRef.current?.fitBounds(EVENT_BOUNDS, {
            padding: { top: 24, bottom: bottomPad, left: 24, right: 24 },
            duration: 0,
            linear: true,
          });
        }}
        reuseMaps
      >
        <NavigationControl position="top-right" showCompass={false} />

        {/* Street closures */}
        {mapLoaded && (
          <>
            <Source id="street-closures-closed" type="geojson" data={closedGeoJSON}>
              <Layer
                id="closures-closed-line"
                type="line"
                paint={CLOSURE_CLOSED_STYLE}
              />
            </Source>
            <Source id="street-closures-thru" type="geojson" data={thruGeoJSON}>
              <Layer
                id="closures-thru-line"
                type="line"
                paint={CLOSURE_THRU_STYLE}
              />
            </Source>
            <Source id="street-closures-caution" type="geojson" data={cautionGeoJSON}>
              <Layer
                id="closures-caution-line"
                type="line"
                paint={CLOSURE_CAUTION_STYLE}
              />
            </Source>
          </>
        )}

        {/* Venue markers */}
        {venues.map((venue) => {
          const isActive = activeVenueIds.has(venue.id);
          const isSelected = selectedPerformance?.venueId === venue.id;
          const perf = activePerformances.find(
            (p) => p.venueId === venue.id
          );
          const band = perf ? getBand(perf.bandId) : null;

          if (!isActive && !isSelected) return null;

          // Always color by time slot so users associate colors with times
          const slotColor = perf ? SLOT_COLORS[perf.timeSlot] : undefined;

          return (
            <Marker
              key={`${venue.id}-${perf?.timeSlot ?? ""}`}
              longitude={venue.coordinates[0]}
              latitude={venue.coordinates[1]}
              anchor="center"
            >
              <VenueMarker
                isActive={isActive}
                isSelected={isSelected}
                bandName={band?.name ?? venue.address}
                onClick={() => handleMarkerClick(venue.id)}
                color={slotColor}
              />
            </Marker>
          );
        })}

        {/* Amenity markers — respect toggle states */}
        {amenities
          .filter((a) => {
            if (a.type === "porta-potty" && !showRestrooms) return false;
            if (a.type === "food-truck" && !showFoodTrucks) return false;
            return true;
          })
          .map((amenity) => {
            const coords = editedCoords[amenity.id] ?? amenity.coordinates;
            return (
              <Marker
                key={amenity.id}
                longitude={coords[0]}
                latitude={coords[1]}
                anchor="center"
                draggable={editMode}
                onDragEnd={(e) =>
                  setEditedCoords((prev) => ({
                    ...prev,
                    [amenity.id]: [e.lngLat.lng, e.lngLat.lat],
                  }))
                }
              >
                <AmenityMarker
                  type={amenity.type}
                  label={amenity.label}
                  onClick={editMode ? undefined : () => onAmenityClick?.(amenity)}
                />
              </Marker>
            );
          })}
      </Map>

      {editMode && (
        <EditModeOverlay
          amenities={amenities}
          editedCoords={editedCoords}
          onReset={() => setEditedCoords({})}
        />
      )}

      {/* Live region for screen readers */}
      <div className="sr-only" role="status" aria-live="polite">
        {activePerformances.length} performances showing on map
      </div>
    </div>
  );
}

type EditOverlayProps = {
  amenities: Amenity[];
  editedCoords: Record<string, [number, number]>;
  onReset: () => void;
};

function EditModeOverlay({ amenities, editedCoords, onReset }: EditOverlayProps) {
  const [copied, setCopied] = useState(false);
  const snippet = useMemo(() => {
    const lines = amenities.map((a) => {
      const [lng, lat] = editedCoords[a.id] ?? a.coordinates;
      return `  { id: "${a.id}", type: "${a.type}", coordinates: [${lng.toFixed(5)}, ${lat.toFixed(5)}], label: ${JSON.stringify(a.label)} },`;
    });
    return `export const amenities: Amenity[] = [\n${lines.join("\n")}\n];`;
  }, [amenities, editedCoords]);
  const editedCount = Object.keys(editedCoords).length;
  return (
    <div className="absolute right-3 top-3 z-10 w-[360px] max-w-[90vw] rounded-lg border bg-background/95 p-3 shadow-lg backdrop-blur">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold">Edit mode — drag amenity pins</span>
        <span className="text-xs text-muted-foreground">{editedCount} moved</span>
      </div>
      <textarea
        readOnly
        value={snippet}
        className="h-40 w-full resize-none rounded border bg-muted/40 p-2 font-mono text-[11px]"
      />
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(snippet);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-accent"
        >
          {copied ? "Copied!" : "Copy JSON"}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-accent"
          disabled={editedCount === 0}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
