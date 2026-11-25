"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/partnerships", label: "Partnerships" },
  { href: "/events", label: "Events" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#E7E5E4] bg-[#FAF8F5]">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: SANEF wordmark + simple geometric emblem */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#1B4332] text-[#FAF8F5]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M10 2.5L16.5 6.25V13.75L10 17.5L3.5 13.75V6.25L10 2.5Z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <circle cx="10" cy="10" r="2.6" fill="#C85A32" />
            </svg>
          </span>
          <div className="leading-none">
            <span className="block font-serif text-[20px] font-semibold tracking-[-0.02em] text-[#1C1917]">
              SANEF
            </span>
            <span className="mt-0.5 hidden text-[12px] font-medium text-[#57534E] sm:block">
              Safe Neighborhood Foundation
            </span>
          </div>
        </Link>

        {/* Center: Public Navigation */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary Navigation">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[14px] transition-colors ${
                  active
                    ? "font-semibold text-[#1B4332]"
                    : "font-medium text-[#57534E] hover:text-[#1C1917]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Solid #C85A32 Donate Pill Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/donate"
            className="inline-flex items-center justify-center rounded-full bg-[#C85A32] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#AE4B27]"
          >
            Donate
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#E7E5E4] bg-white text-[#1C1917] lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-[#E7E5E4] bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="rounded-[8px] px-3 py-2 text-[15px] font-medium text-[#1C1917] hover:bg-[#FAF8F5]"
            >
              Home
            </Link>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-[8px] px-3 py-2 text-[15px] font-medium text-[#1C1917] hover:bg-[#FAF8F5]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
