import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "JossyShield Security Services | Defence-Grade Commercial Protection",
  description:
    "JossyShield delivers elite commercial guarding, risk consultancy, tactical readiness training, and a certified ready-to-deploy security personnel pool.",
  keywords: [
    "commercial security",
    "tactical armed escort",
    "security consultancy",
    "security talent pool",
    "VIP protection",
    "JossyShield"
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#08090c] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
