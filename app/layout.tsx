import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oryndel — Never Miss Another Job Call",
  description:
    "Oryndel builds AI phone agents for septic, portable toilet, and dumpster rental businesses. Every call answered, every job booked, 24/7. See it built for your business before you pay.",
  metadataBase: new URL("https://oryndel.com"),
  openGraph: {
    title: "Oryndel — Never Miss Another Job Call",
    description:
      "AI phone agents for trade service businesses. We build a live demo for your business before you pay a cent.",
    url: "https://oryndel.com",
    siteName: "Oryndel",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
