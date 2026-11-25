import "@fontsource-variable/inter/index.css";
import "@fontsource-variable/jetbrains-mono/index.css";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unified Platform Console | SANEF & JossyShield Security Services",
  description:
    "Multi-organisation administration platform for Safe Neighborhood Foundation (SANEF) and JossyShield Security Services.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAFAFA] text-[#09090B] font-sans antialiased selection:bg-[#2563EB]/15 selection:text-[#09090B]">
        {children}
      </body>
    </html>
  );
}
