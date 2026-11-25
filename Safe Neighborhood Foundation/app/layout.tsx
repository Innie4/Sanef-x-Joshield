import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "@fontsource-variable/newsreader/wght-italic.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Safe Neighborhood Foundation (SANEF) — Community Safety & Verified Impact",
  description:
    "Documentary evidence archive, public infrastructure programmes, and community partnerships led by Safe Neighborhood Foundation (SANEF).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAF8F5] text-[#1C1917] font-sans antialiased flex flex-col selection:bg-[#1B4332]/15 selection:text-[#1C1917]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
