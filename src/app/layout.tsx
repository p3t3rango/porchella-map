import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Porchella 2026 — Bellevue Music Walk",
  description:
    "Interactive map for Porchella 2026, a live music walk featuring 36+ bands across the Bellevue neighborhood in Richmond, VA. April 18, 12–6 PM.",
  openGraph: {
    title: "Porchella 2026 — Bellevue Music Walk",
    description:
      "36+ bands on neighborhood porches. April 18, 12–6 PM in Bellevue, Richmond VA.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1282, height: 617 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Porchella 2026 — Bellevue Music Walk",
    description:
      "36+ bands on neighborhood porches. April 18, 12–6 PM in Bellevue, Richmond VA.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f5" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
