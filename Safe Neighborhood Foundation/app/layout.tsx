import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Safe Neighborhood Foundation (SANEF) | Grassroots Community Safety & Evidence",
  description:
    "SANEF empowers resilient communities with solar safe corridors, youth conflict mediation, neighborhood radio dispatch, and verified evidence-backed reporting.",
  keywords: [
    "Safe Neighborhood Foundation",
    "SANEF",
    "community safety NGO",
    "solar street lighting",
    "youth mediation",
    "neighborhood watch",
    "evidence archive"
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-850 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
