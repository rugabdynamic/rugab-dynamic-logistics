import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Oyewale Rukayat Omotunrayo | B2B Logistics Copywriter",
    template: "%s | Oyewale Rukayat Omotunrayo",
  },
  description:
    "Portfolio for Oyewale Rukayat Omotunrayo, a B2B logistics copywriter helping freight, shipping, import, export, and delivery brands win better clients.",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "192x192" }],
    apple: [{ url: "/favicon.png", type: "image/png", sizes: "192x192" }],
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
