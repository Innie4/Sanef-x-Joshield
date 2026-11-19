"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Menu, X, ArrowUpRight, Radio } from "lucide-react";

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
    { name: "Services", href: "/services" },
    { name: "Requisition", href: "/marketplace" },
    { name: "Talent Roster", href: "/careers" },
    { name: "Cases", href: "/testimonials" },
    { name: "About", href: "/about" },
    { name: "Dispatch", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 pointer-events-auto">
        {/* Brand Bar */}
        <Link
          href="/"
          className="flex items-center gap-3 px-3.5 py-2 rounded-full liquid-glass transition-transform active:scale-[0.98] shrink-0"
        >
          <div className="w-7 h-7 rounded-full bg-[#0066FF] flex items-center justify-center text-white shadow-sm shrink-0">
            <Shield className="w-3.5 h-3.5 fill-white/20 stroke-white stroke-[2.2]" />
          </div>
          <div className="flex items-baseline gap-1.5 pr-1 whitespace-nowrap">
            <span className="font-semibold text-sm tracking-[-0.02em] text-white">
              Jossy<span className="text-zinc-400">Shield</span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 hidden sm:inline">
              OPS
            </span>
          </div>
        </Link>

        {/* Center Navigation - Floating Liquid Glass Island */}
        <nav className="hidden lg:flex items-center gap-0.5 px-2 py-1 rounded-full liquid-glass shrink-0">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-1 rounded-full text-[13px] font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-white/10 text-white font-semibold shadow-inner"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Tactical Action */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full liquid-glass text-[11px] font-mono text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 beacon-pulse" />
            <span className="text-zinc-300">HQ LIVE</span>
          </div>
          <Link
            href="/marketplace"
            className="flex items-center gap-1.5 bg-[#0066FF] hover:bg-[#1A75FF] text-white text-[13px] font-semibold px-4 py-2 rounded-full shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Request Guard</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-full liquid-glass text-zinc-300 hover:text-white"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Sheet */}
      {isOpen && (
        <div className="md:hidden mt-3 max-w-sm mx-auto rounded-3xl liquid-glass p-5 pointer-events-auto space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-2xl text-sm font-medium ${
                    isActive
                      ? "bg-white/10 text-white font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 beacon-pulse" />
              <span>HQ DISPATCH READY</span>
            </div>
            <Link
              href="/marketplace"
              onClick={() => setIsOpen(false)}
              className="bg-[#0066FF] text-white text-xs font-semibold px-4 py-2 rounded-full"
            >
              Requisition
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
