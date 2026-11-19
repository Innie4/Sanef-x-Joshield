import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#FAFAF9] text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#0D4A2B] flex items-center justify-center text-white">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-sm tracking-tight text-slate-900">
                SANEF <span className="text-slate-400 font-normal">/ Safe Neighborhood Foundation</span>
              </span>
            </Link>
            <p className="text-slate-600 leading-relaxed max-w-sm">
              An accredited non-governmental organization empowering vulnerable urban communities through evidence-backed safety infrastructure, youth mediation circles, and verified transparent reporting.
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 civic-beacon" />
              <span>COMMUNITY WATCH ACTIVE IN 14 WARDS</span>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2 space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">Interventions</p>
            <ul className="space-y-2">
              <li><Link href="/portfolio" className="hover:text-slate-950 transition-colors">Solar Corridors</Link></li>
              <li><Link href="/portfolio" className="hover:text-slate-950 transition-colors">Youth Academies</Link></li>
              <li><Link href="/portfolio" className="hover:text-slate-950 transition-colors">Watch Radios</Link></li>
              <li><Link href="/portfolio" className="hover:text-slate-950 transition-colors">Evidence Archive</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">Governance</p>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-slate-950 transition-colors">Charter & Mission</Link></li>
              <li><Link href="/partnerships" className="hover:text-slate-950 transition-colors">Civic Partners</Link></li>
              <li><Link href="/donate" className="hover:text-slate-950 transition-colors">Fund Allocation</Link></li>
              <li><Link href="/blog" className="hover:text-slate-950 transition-colors">Field Dispatches</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">Civic Registry</p>
            <div className="monograph-surface rounded-2xl p-4 space-y-2 text-slate-700">
              <p className="font-mono text-xs text-slate-900 font-semibold">CAC / Incorporated Trustees: 148291</p>
              <p className="text-slate-500 text-[11px]">Secretariat: 48 Commercial Way, Yaba Tech Corridor, Lagos</p>
              <div className="pt-2 flex items-center justify-between border-t border-slate-200 text-[10px] font-mono text-slate-500">
                <span>SCUML VERIFIED</span>
                <span className="text-emerald-800 font-semibold">INDEPENDENTLY AUDITED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} Safe Neighborhood Foundation (SANEF). All public assets open for civic audit.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-slate-900">Whistleblower Policy</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-slate-900">Community Intake Line</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
