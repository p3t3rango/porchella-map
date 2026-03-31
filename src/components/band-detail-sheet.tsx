"use client";

import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  Globe,
  Music,
  ExternalLink,
  Heart,
  Navigation,
  Link2,
} from "lucide-react";
import type { Band, Venue } from "@/data/porchella";
import { TIME_SLOT_LABELS, formatTimeRange, type TimeSlot } from "@/lib/time";

type BandDetailSheetProps = {
  band: Band | null;
  venue: Venue | null;
  timeSlot: TimeSlot | null;
  open: boolean;
  onClose: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
};

export function BandDetailSheet({
  band,
  venue,
  timeSlot,
  open,
  onClose,
  isFavorite = false,
  onToggleFavorite,
}: BandDetailSheetProps) {
  if (!band || !venue || !timeSlot) return null;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${venue.coordinates[1]},${venue.coordinates[0]}&travelmode=walking`;

  const socialLinks = [
    band.social.instagram && {
      icon: Link2,
      label: "Instagram",
      url: band.social.instagram,
    },
    band.social.facebook && {
      icon: Link2,
      label: "Facebook",
      url: band.social.facebook,
    },
    band.social.bandcamp && {
      icon: Music,
      label: "Bandcamp",
      url: band.social.bandcamp,
    },
    band.social.website && {
      icon: Globe,
      label: "Website",
      url: band.social.website,
    },
    band.social.youtube && {
      icon: ExternalLink,
      label: "YouTube",
      url: band.social.youtube,
    },
    band.social.linktree && {
      icon: ExternalLink,
      label: "Linktree",
      url: band.social.linktree,
    },
  ].filter(Boolean) as { icon: typeof Link2; label: string; url: string }[];

  const hasTip =
    band.tip?.venmo || band.tip?.paypal || band.tip?.note;

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="bottom"
        className="max-h-[85vh] overflow-y-auto rounded-t-2xl px-5 pb-8 pt-4"
      >
        {/* Band image — show full image, no awkward crops */}
        {band.image && (
          <div className="relative -mx-5 -mt-4 mb-3 overflow-hidden rounded-t-2xl bg-muted">
            <Image
              src={band.image}
              alt={band.name}
              width={800}
              height={500}
              className="w-full h-auto max-h-[35vh] object-contain"
              sizes="(max-width: 768px) 100vw, 600px"
              priority
            />
          </div>
        )}

        <SheetHeader className="text-left">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl">{band.name}</SheetTitle>
            {onToggleFavorite && (
              <button
                onClick={onToggleFavorite}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                className="p-2 rounded-full hover:bg-accent transition-colors"
              >
                <Heart
                  className={`h-5 w-5 transition-colors ${
                    isFavorite
                      ? "fill-pink-500 text-pink-500"
                      : "text-muted-foreground hover:text-pink-400"
                  }`}
                />
              </button>
            )}
          </div>
          <SheetDescription className="sr-only">
            Details for {band.name}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-3 space-y-4">
          {/* Genre + Time */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{band.genre}</Badge>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {formatTimeRange(timeSlot)}
            </span>
          </div>

          {/* Venue + Directions */}
          <div className="flex items-center justify-between rounded-lg border bg-secondary/50 p-3">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{venue.address}</span>
            </div>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Navigation className="h-3 w-3" />
              Directions
            </a>
          </div>

          {/* Description */}
          {band.description && (
            <p className="text-sm text-muted-foreground">{band.description}</p>
          )}

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Follow</h4>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-accent transition-colors"
                  >
                    <link.icon className="h-3.5 w-3.5" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Tip */}
          {hasTip && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-1.5">
                <Heart className="h-3.5 w-3.5 text-pink-500" />
                Tip this artist
              </h4>
              {band.tip?.note && (
                <p className="text-xs text-muted-foreground italic">
                  {band.tip.note}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {band.tip?.venmo && (
                  <a
                    href={band.tip.venmo.startsWith("http") ? band.tip.venmo : `https://account.venmo.com/u/${band.tip.venmo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-accent transition-colors"
                  >
                    Venmo
                  </a>
                )}
                {band.tip?.paypal && (
                  <a
                    href={band.tip.paypal.startsWith("http") ? band.tip.paypal : `https://paypal.me/${band.tip.paypal}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-accent transition-colors"
                  >
                    PayPal
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Volunteer note */}
          <p className="text-xs text-muted-foreground text-center pt-2 border-t">
            All performers volunteer their time and talent for Porchella.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
