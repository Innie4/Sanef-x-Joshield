"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Shield } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#E2E8F0] bg-white">
      <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Josie Shield Security Services wordmark */}
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-[#0F172A] text-white">
            <Shield className="h-4 w-4 text-[#B45309]" />
          </span>
          <div className="leading-none">
            <span className="block font-heading text-[18px] font-bold uppercase tracking-[0.02em] text-[#0F172A]">
              Josie Shield
            </span>
            <span className="mt-0.5 block text-[12px] font-semibold uppercase tracking-[0.12em] text-[#475569]">
              Security Services
            </span>
          </div>
        </Link>

        {/* Center: Navigation with Services Dropdown */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary Navigation">
          <Link
            href="/about"
            className={`text-[14px] font-medium transition-colors ${
              pathname === "/about" ? "text-[#0F172A] font-semibold" : "text-[#475569] hover:text-[#0F172A]"
            }`}
          >
            About Us
          </Link>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              className={`inline-flex items-center gap-1 py-2 text-[14px] font-medium transition-colors ${
                pathname?.startsWith("/services")
                  ? "text-[#0F172A] font-semibold"
                  : "text-[#475569] hover:text-[#0F172A]"
              }`}
            >
              Services
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {servicesOpen && (
              <div className="absolute left-0 top-full w-[250px] rounded-[4px] border border-[#E2E8F0] bg-white p-1.5">
                <Link
                  href="/services#security"
                  onClick={() => setServicesOpen(false)}
                  className="block rounded-[4px] px-3 py-2.5 hover:bg-[#F8FAFC]"
                >
                  <p className="text-[13px] font-semibold text-[#0F172A]">Security Services</p>
                  <p className="text-[12px] text-[#475569]">Static guarding, access & escort</p>
                </Link>
                <Link
                  href="/services#consultancy"
                  onClick={() => setServicesOpen(false)}
                  className="block rounded-[4px] px-3 py-2.5 hover:bg-[#F8FAFC]"
                >
                  <p className="text-[13px] font-semibold text-[#0F172A]">Consultancy Services</p>
                  <p className="text-[12px] text-[#475569]">Site risk audits & SOP design</p>
                </Link>
                <Link
                  href="/services#training"
                  onClick={() => setServicesOpen(false)}
                  className="block rounded-[4px] px-3 py-2.5 hover:bg-[#F8FAFC]"
                >
                  <p className="text-[13px] font-semibold text-[#0F172A]">Training Services</p>
                  <p className="text-[12px] text-[#475569]">Guard drills & travel safety</p>
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/careers"
            className={`text-[14px] font-medium transition-colors ${
              pathname === "/careers" ? "text-[#0F172A] font-semibold" : "text-[#475569] hover:text-[#0F172A]"
            }`}
          >
            Careers
          </Link>
          <Link
            href="/testimonials"
            className={`text-[14px] font-medium transition-colors ${
              pathname === "/testimonials" ? "text-[#0F172A] font-semibold" : "text-[#475569] hover:text-[#0F172A]"
            }`}
          >
            Testimonials
          </Link>
          <Link
            href="/contact"
            className={`text-[14px] font-medium transition-colors ${
              pathname === "/contact" ? "text-[#0F172A] font-semibold" : "text-[#475569] hover:text-[#0F172A]"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right: Solid #0F172A "Request a Service" sharp 4px button */}
        <div className="flex items-center gap-3">
          <Link
            href="/marketplace"
            className="inline-flex items-center justify-center rounded-[4px] bg-[#0F172A] px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#1E293B]"
          >
            Request a Service
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation"
            className="flex h-10 w-10 items-center justify-center rounded-[4px] border border-[#E2E8F0] text-[#0F172A] lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-[#E2E8F0] bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col space-y-1 text-[14px] font-medium">
            <Link href="/" onClick={() => setMobileOpen(false)} className="rounded-[4px] px-3 py-2 hover:bg-[#F8FAFC]">Home</Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="rounded-[4px] px-3 py-2 hover:bg-[#F8FAFC]">About Us</Link>
            <Link href="/services#security" onClick={() => setMobileOpen(false)} className="rounded-[4px] px-3 py-2 hover:bg-[#F8FAFC]">Services — Security</Link>
            <Link href="/services#consultancy" onClick={() => setMobileOpen(false)} className="rounded-[4px] px-3 py-2 hover:bg-[#F8FAFC]">Services — Consultancy</Link>
            <Link href="/services#training" onClick={() => setMobileOpen(false)} className="rounded-[4px] px-3 py-2 hover:bg-[#F8FAFC]">Services — Training</Link>
            <Link href="/marketplace" onClick={() => setMobileOpen(false)} className="rounded-[4px] px-3 py-2 font-semibold text-[#B45309] hover:bg-[#F8FAFC]">Marketplace / Request a Service</Link>
            <Link href="/careers" onClick={() => setMobileOpen(false)} className="rounded-[4px] px-3 py-2 hover:bg-[#F8FAFC]">Careers & Talent Pool</Link>
            <Link href="/testimonials" onClick={() => setMobileOpen(false)} className="rounded-[4px] px-3 py-2 hover:bg-[#F8FAFC]">Testimonials</Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="rounded-[4px] px-3 py-2 hover:bg-[#F8FAFC]">Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
}
