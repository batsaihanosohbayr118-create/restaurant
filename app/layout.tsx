import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sansFont = Karla({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://velora-restaurant.com"),
  title: {
    default: "VELORA — Fine Dining Restaurant",
    template: "%s | VELORA",
  },
  description:
    "VELORA is a modern fine-dining restaurant serving carefully crafted dishes in an intimate, elegant setting. Reserve your table today.",
  keywords: [
    "VELORA",
    "fine dining",
    "luxury restaurant",
    "tasting menu",
    "restaurant reservation",
  ],
  openGraph: {
    title: "VELORA — Fine Dining Restaurant",
    description:
      "Carefully crafted dishes, beautiful moments, unforgettable flavors.",
    url: "https://velora-restaurant.com",
    siteName: "VELORA",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "VELORA restaurant interior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VELORA — Fine Dining Restaurant",
    description:
      "Carefully crafted dishes, beautiful moments, unforgettable flavors.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#181613",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displayFont.variable} ${sansFont.variable}`}>
      <body className="font-sans bg-linen text-ink antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
