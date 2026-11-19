import React from "react";
import Link from "next/link";
import { Shield, Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050608] border-t border-slate-900 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
                <Shield className="w-5 h-5" />
              </div>
              <span className="font-bold tracking-tight text-xl text-white">
                Jossy<span className="text-blue-500">Shield</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Defence-grade commercial security, physical risk consultancy, and 
              accredited tactical training. Maintaining a rigorously vetted, ready-to-deploy 
              security talent pool for corporate and industrial missions.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>24/7 Operations Monitoring & Central Dispatch Active</span>
            </div>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-slate-500">
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">NSCDC Certified</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">ISO 27001 Compliant</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">ASIS International Standards</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/services#guarding" className="hover:text-blue-400 transition-colors">
                  Static Guarding & Patrol
                </Link>
              </li>
              <li>
                <Link href="/services#consultancy" className="hover:text-blue-400 transition-colors">
                  Vulnerability & Risk Audits
                </Link>
              </li>
              <li>
                <Link href="/services#training" className="hover:text-blue-400 transition-colors">
                  Tactical Defense Academy
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="hover:text-blue-400 transition-colors">
                  Request Service & Quotes
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-blue-400 transition-colors">
                  Security Talent Pool
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Organization
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About JossyShield
                </Link>
              </li>
              <li>
                <Link href="/about#leadership" className="hover:text-blue-400 transition-colors">
                  Executive Leadership
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-blue-400 transition-colors">
                  Careers & Vacancies
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-blue-400 transition-colors">
                  Client Case Studies
                </Link>
              </li>
              <li>
                <a
                  href="https://sanef.example"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  <span>Safe Neighborhood Foundation</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* 24/7 Rapid Contact */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-medium">+234 (0) 800-JOSSY-SHIELD</p>
                  <p className="text-[11px] text-slate-500">24/7 Emergency Dispatch</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-medium">operations@jossyshield.com</p>
                  <p className="text-[11px] text-slate-500">Corporate Enquiries</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <p className="text-slate-400">
                  Operations HQ, Plot 14 Commercial Crescent, Victoria Island, Lagos
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-900 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4">
          <p>© {new Date().getFullYear()} JossyShield Security Services Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-slate-400 transition-colors">
              Terms of Engagement
            </Link>
            <Link href="/contact" className="hover:text-slate-400 transition-colors">
              Compliance & Ethics
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
