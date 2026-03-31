"use client";

import { useCallback, useMemo, useRef, useState } from "react";
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
} from "@/data/porchella";
import type { TimeSlot } from "@/lib/time";

// Bellevue neighborhood center — centered on the venue cluster
const INITIAL_VIEW = {
  longitude: -77.4558,
  latitude: 37.5885,
  zoom: 15.5,
  pitch: 0,
  bearing: 0,
};

// Bounds to constrain panning
const MAX_BOUNDS: [number, number, number, number] = [
  -77.468, 37.582, -77.448, 37.598,
];

const STREET_CLOSURE_STYLE: LineLayerSpecification["paint"] = {
  "line-color": "#ef4444",
  "line-width": 4,
  "line-opacity": 0.4,
  "line-dasharray": [2, 2],
};

const MAP_STYLES = {
  light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
};

type PorchellaMapProps = {
  activeSlot: TimeSlot;
  selectedPerformance: Performance | null;
  onSelectPerformance: (perf: Performance | null) => void;
  filteredBandIds: Set<string> | null;
  isDark?: boolean;
};

export function PorchellaMap({
  activeSlot,
  selectedPerformance,
  onSelectPerformance,
  filteredBandIds,
  isDark = false,
}: PorchellaMapProps) {
  const mapRef = useRef<MapRef>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const activePerformances = useMemo(() => {
    return performances.filter((p) => {
      if (p.timeSlot !== activeSlot) return false;
      if (filteredBandIds && !filteredBandIds.has(p.bandId)) return false;
      return true;
    });
  }, [activeSlot, filteredBandIds]);

  const activeVenueIds = useMemo(
    () => new Set(activePerformances.map((p) => p.venueId)),
    [activePerformances]
  );

  const closureGeoJSON = useMemo(
    () => ({
      type: "FeatureCollection" as const,
      features: streetClosures.map((c) => ({
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
        const venue = getVenue(venueId);
        if (venue && mapRef.current) {
          mapRef.current.flyTo({
            center: venue.coordinates,
            zoom: 16.5,
            duration: prefersReducedMotion ? 0 : 800,
          });
        }
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
        minZoom={13}
        maxZoom={18}
        mapStyle={isDark ? MAP_STYLES.dark : MAP_STYLES.light}
        attributionControl={false}
        onLoad={() => setMapLoaded(true)}
        reuseMaps
      >
        <NavigationControl position="top-right" showCompass={false} />

        {/* Street closures */}
        {mapLoaded && (
          <Source id="street-closures" type="geojson" data={closureGeoJSON}>
            <Layer
              id="street-closures-line"
              type="line"
              paint={STREET_CLOSURE_STYLE}
            />
          </Source>
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

          return (
            <Marker
              key={venue.id}
              longitude={venue.coordinates[0]}
              latitude={venue.coordinates[1]}
              anchor="center"
            >
              <VenueMarker
                isActive={isActive}
                isSelected={isSelected}
                bandName={band?.name ?? venue.address}
                onClick={() => handleMarkerClick(venue.id)}
              />
            </Marker>
          );
        })}

        {/* Amenity markers */}
        {amenities.map((amenity) => (
          <Marker
            key={amenity.id}
            longitude={amenity.coordinates[0]}
            latitude={amenity.coordinates[1]}
            anchor="center"
          >
            <AmenityMarker type={amenity.type} label={amenity.label} />
          </Marker>
        ))}
      </Map>

      {/* Live region for screen readers */}
      <div className="sr-only" role="status" aria-live="polite">
        {activePerformances.length} performances showing on map
      </div>
    </div>
  );
}
