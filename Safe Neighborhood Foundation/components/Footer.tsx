import React from "react";
import Link from "next/link";
import { ShieldCheck, Mail, Phone, MapPin, Heart, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Organization Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-bold tracking-tight text-xl text-white">
                SANEF <span className="text-xs font-normal text-emerald-400 uppercase tracking-widest block">Safe Neighborhood Foundation</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Safe Neighborhood Foundation (SANEF) is an accredited non-governmental organization 
              empowering vulnerable urban communities through evidence-backed safety infrastructure, 
              youth mediation circles, and verified transparent reporting.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-slate-400">
              <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-md">CAC Registered NGO</span>
              <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-md">SCUML Certified</span>
              <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-md">Annual Public Audit Verified</span>
            </div>
          </div>

          {/* Core Initiatives */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Focus Areas
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/portfolio?category=Safe%20Spaces" className="hover:text-emerald-400 transition-colors">
                  Solar Safe Corridors
                </Link>
              </li>
              <li>
                <Link href="/portfolio?category=Youth%20Intervention" className="hover:text-emerald-400 transition-colors">
                  Youth Conflict Mediation
                </Link>
              </li>
              <li>
                <Link href="/portfolio?category=Community%20Safety" className="hover:text-emerald-400 transition-colors">
                  Neighborhood Watch Radios
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-emerald-400 transition-colors">
                  Verified Evidence Archive
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-emerald-400 transition-colors">
                  Community Townhalls
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Governance
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About SANEF & Mission
                </Link>
              </li>
              <li>
                <Link href="/partnerships" className="hover:text-emerald-400 transition-colors">
                  Institutional Partners
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emerald-400 transition-colors">
                  Field Reports & Policy
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-emerald-400 transition-colors">
                  Donate & Financial Accountability
                </Link>
              </li>
              <li>
                <a
                  href="https://jossyshield.example"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <span>JossyShield Security Services</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Community Hotline */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Community Contact
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-medium">+234 (0) 800-SANEF-COMMUNITY</p>
                  <p className="text-[11px] text-slate-500">Citizen Helpline</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-medium">contact@sanefoundation.org</p>
                  <p className="text-[11px] text-slate-500">General & Partnerships</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <p className="text-slate-400">
                  SANEF Community Action Center, 18 Commercial Avenue, Yaba, Lagos
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Safe Neighborhood Foundation (SANEF). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Data Privacy & Ethics
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Whistleblower Policy
            </Link>
            <Link href="/donate" className="hover:text-slate-300 transition-colors">
              Donation Disclosures
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
