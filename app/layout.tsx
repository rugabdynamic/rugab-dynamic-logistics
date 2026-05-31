import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rugab Dynamic Logistics | Global Shipping & Freight Forwarding",
    template: "%s | Rugab Dynamic Logistics",
  },
  description:
    "Reliable international shipping, freight forwarding, and customs clearance services worldwide. Fast, secure, and cost-effective delivery for businesses and individuals.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
