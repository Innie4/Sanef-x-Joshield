import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unified Administration Console | SANEF & JossyShield",
  description: "Shared multi-organization administration dashboard with scoped RBAC, tenant context switching, and isolated operational modules.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#090c12] text-slate-100 flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
