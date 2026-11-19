import React from "react";
import Link from "next/link";
import { Shield, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#05070A] text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Purpose */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#0066FF] flex items-center justify-center text-white">
                <Shield className="w-3 h-3 fill-white/20 stroke-white stroke-[2.2]" />
              </div>
              <span className="font-semibold text-sm tracking-tight text-white">
                Jossy<span className="text-zinc-400">Shield</span>
              </span>
            </Link>
            <p className="text-zinc-400 leading-relaxed max-w-sm">
              Commercial defense operations, rapid armed dispatch, and an audited talent pool of vetted officers serving commercial infrastructure across Nigeria.
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 beacon-pulse" />
              <span>CENTRAL COMMAND DISPATCH ONLINE 24/7/365</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">Capabilities</p>
            <ul className="space-y-2">
              <li><Link href="/services" className="hover:text-white transition-colors">Static Perimeter Defense</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Armed Escort & Transit</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Vulnerability & TSCM Audits</Link></li>
              <li><Link href="/marketplace" className="hover:text-white transition-colors">Requisition Portal</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">Personnel</p>
            <ul className="space-y-2">
              <li><Link href="/careers" className="hover:text-white transition-colors">Vetted Talent Roster</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Officer Application Portal</Link></li>
              <li><Link href="/testimonials" className="hover:text-white transition-colors">Field Case Studies</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Command Leadership</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">Command Desk</p>
            <div className="tactical-surface rounded-2xl p-4 space-y-2">
              <p className="text-zinc-300 font-mono text-xs">24/7 Hotline: +234 1 800 JOSSY (56779)</p>
              <p className="text-zinc-500 text-[11px]">Primary Command: Plot 12, Commercial Corridor, Victoria Island, Lagos</p>
              <div className="pt-2 flex items-center justify-between border-t border-white/[0.06] text-[10px] font-mono text-zinc-500">
                <span>NSCDC CATEGORY A</span>
                <span className="text-[#0066FF]">ISO 27001 AUDITED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-600 font-mono">
          <p>© {new Date().getFullYear()} JossyShield Security Ltd. All tactical rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-zinc-400">Security Clearance Protocols</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-zinc-400">Encrypted Dispatch Line</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
