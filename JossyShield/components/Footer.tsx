import React from "react";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-[#0F172A] text-white">
      <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-white/15 bg-white/5">
                <Shield className="h-4 w-4 text-[#B45309]" />
              </span>
              <span className="font-heading text-[18px] font-bold uppercase tracking-[0.03em] text-white">
                JossyShield Security Services
              </span>
            </div>
            <p className="mt-4 max-w-[380px] text-[14px] leading-relaxed text-[#94A3B8]">
              Commercial facility guarding, physical risk consultancy, and certified personnel
              training across Lagos, Abuja, and Port Harcourt. Operated with strict vetting and
              measurable shift SLAs.
            </p>
            <div className="mt-5 flex flex-wrap gap-4 font-mono text-[12px] text-[#CBD5E1]">
              <span>24/7 Dispatch: +234 803 552 0900</span>
              <span>·</span>
              <a
                href="https://wa.me/2348035520900"
                target="_blank"
                rel="noreferrer"
                className="text-[#F59E0B] underline underline-offset-4 hover:text-white"
              >
                WhatsApp Operations
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-heading text-[12px] font-semibold  text-[#94A3B8]">
              Service Lines
            </h3>
            <ul className="mt-4 space-y-2.5 text-[14px] text-[#CBD5E1]">
              <li><Link href="/services#security" className="hover:text-white">Security Services</Link></li>
              <li><Link href="/services#consultancy" className="hover:text-white">Consultancy Services</Link></li>
              <li><Link href="/services#training" className="hover:text-white">Training Services</Link></li>
              <li><Link href="/marketplace" className="font-semibold text-[#F59E0B] hover:text-white">Request a Service</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="font-heading text-[12px] font-semibold  text-[#94A3B8]">
              Company & Recruitment
            </h3>
            <ul className="mt-4 space-y-2.5 text-[14px] text-[#CBD5E1]">
              <li><Link href="/about" className="hover:text-white">About JossyShield</Link></li>
              <li><Link href="/careers" className="hover:text-white">Active Vacancies & Talent Pool</Link></li>
              <li><Link href="/testimonials" className="hover:text-white">Approved Client Testimonials</Link></li>
              <li><Link href="/contact" className="hover:text-white">Operations Offices & Contact</Link></li>
            </ul>
            <p className="mt-4 text-[12px] text-[#94A3B8]">
              Head Office: 18 Oba Akran Avenue, Ikeja, Lagos · Regional Desks in Abuja & Port Harcourt
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-[12px] text-[#94A3B8] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} JossyShield Security Services Ltd. All rights reserved.</p>
          <p className="font-mono">ops@jossyshield.ng · NSCDC Licensed Private Security Operator</p>
        </div>
      </div>
    </footer>
  );
}
