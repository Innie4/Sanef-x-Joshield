"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Overview", href: "/" },
    { name: "Evidence Archive", href: "/portfolio" },
    { name: "Donations & Allocation", href: "/donate" },
    { name: "Partnerships", href: "/partnerships" },
    { name: "Civic Forums", href: "/events" },
    { name: "Field Reports", href: "/blog" },
    { name: "Charter & About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand Bar */}
        <Link
          href="/"
          className="flex items-center gap-3 px-3.5 py-2 rounded-full civic-liquid-glass transition-transform active:scale-[0.98]"
        >
          <div className="w-7 h-7 rounded-full bg-[#0D4A2B] flex items-center justify-center text-white shadow-sm">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex items-baseline gap-1.5 pr-1">
            <span className="font-semibold text-sm tracking-[-0.02em] text-slate-900">
              SANEF
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 hidden sm:inline">
              CIVIC SAFETY
            </span>
          </div>
        </Link>

        {/* Center Nav */}
        <nav className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-full civic-liquid-glass">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-1 rounded-full text-[13px] font-medium transition-all ${
                  isActive
                    ? "bg-[#0D4A2B] text-white font-semibold shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Action */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full civic-liquid-glass text-[11px] font-mono text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 civic-beacon" />
            <span className="text-slate-800">AUDITED NGO</span>
          </div>
          <Link
            href="/donate"
            className="flex items-center gap-1.5 bg-[#0D4A2B] hover:bg-[#14633B] text-white text-[13px] font-semibold px-4 py-2 rounded-full shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Fund An Initiative</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-full civic-liquid-glass text-slate-700 hover:text-slate-900"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden mt-3 max-w-sm mx-auto rounded-3xl civic-liquid-glass p-5 pointer-events-auto space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-2xl text-sm font-medium ${
                    isActive
                      ? "bg-[#0D4A2B] text-white font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-600 civic-beacon" />
              <span>COMMUNITY WATCH ACTIVE</span>
            </div>
            <Link
              href="/donate"
              onClick={() => setIsOpen(false)}
              className="bg-[#0D4A2B] text-white text-xs font-semibold px-4 py-2 rounded-full"
            >
              Donate
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
