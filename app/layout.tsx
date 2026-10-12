import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Merch × Dhanda '26 — E-Cell IIM Kozhikode",
  description: "Five tees, front and back. The E-Cell IIM Kozhikode merch catalogue for Dhanda '26.",
  openGraph: {
    title: "MERCH × DHANDA '26 — E-Cell IIM Kozhikode",
    description: "Built for the ones who build. Five tees, front and back.",
    images: [`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/higher-ed-back.webp`],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ECE8E1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // "js" turns on the scroll-reveal styles; Interactions.tsx reveals content as it scrolls in.
  return (
    <html lang="en" className="js">
      <body>{children}</body>
    </html>
  );
}
