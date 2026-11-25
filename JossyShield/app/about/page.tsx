import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OPERATIONAL_CREDENTIALS } from "@/lib/data";

const COMMAND_PRINCIPLES = [
  {
    code: "STD-01",
    title: "Three-Tier Personnel Vetting",
    detail:
      "Every guard and supervisor passes NIN biometric verification, two verified guarantor checks, and police character clearance prior to uniform issue.",
  },
  {
    code: "STD-02",
    title: "Written Post Orders & Shift Logs",
    detail:
      "No officer stands on a post without a site-specific operational manual, timed relief sign-in ledger, and defined emergency escalation tree.",
  },
  {
    code: "STD-03",
    title: "Independent Commercial Operations",
    detail:
      "JossyShield Security Services operates strictly as a licensed private commercial enterprise with dedicated sector managers in Lagos, Abuja, and Rivers.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#F8FAFC] py-12 lg:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-[#E2E8F0] pb-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="font-heading text-[12px] font-semibold uppercase tracking-[0.14em] text-[#B45309]">
              Company Profile & Standards
            </p>
            <h1 className="mt-2 font-heading text-[36px] font-bold leading-[1.08] text-[#0F172A] sm:text-[46px]">
              Structured commercial security engineered for zero-excuse accountability.
            </h1>
            <p className="mt-4 text-[15px] leading-[1.7] text-[#475569]">
              JossyShield Security Services provides physical guarding, facility risk consultancy,
              and guard academy training for commercial towers, industrial depots, maritime
              terminals, and diplomatic compounds across Nigeria.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-2 rounded-[4px] bg-[#0F172A] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#1E293B]"
              >
                Request a Service <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 rounded-[4px] border border-[#E2E8F0] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0F172A] hover:border-[#0F172A]"
              >
                Explore Careers
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <figure className="overflow-hidden rounded-[4px] border border-[#E2E8F0] bg-white">
              <div className="aspect-[16/10] overflow-hidden bg-[#0F172A]">
                <img
                  src="/images/training-operations-drill.jpg"
                  alt="JossyShield commercial operations training and dispatch briefing"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="border-t border-[#E2E8F0] px-4 py-3 font-mono text-[12px] text-[#475569]">
                SECTOR OPERATIONS DESK · IKEJA HEAD OFFICE, LAGOS
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Credentials Strip */}
        <div className="grid grid-cols-1 gap-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {OPERATIONAL_CREDENTIALS.map((c) => (
            <div key={c.label} className="rounded-[4px] border border-[#E2E8F0] bg-white p-5">
              <p className="text-[12px] font-medium text-[#475569]">{c.label}</p>
              <p className="mt-2 font-heading text-[30px] font-bold leading-none text-[#0F172A] tabular-nums">
                {c.value}
              </p>
              <p className="mt-2 text-[12px] text-[#475569]">{c.detail}</p>
            </div>
          ))}
        </div>

        {/* Mission, Vision & Operating Standards */}
        <div className="grid grid-cols-1 gap-6 border-t border-[#E2E8F0] py-12 md:grid-cols-3">
          {COMMAND_PRINCIPLES.map((p) => (
            <div key={p.code} className="rounded-[4px] border border-[#E2E8F0] bg-white p-6">
              <span className="font-mono text-[12px] font-semibold text-[#B45309]">{p.code}</span>
              <h2 className="mt-2 font-heading text-[22px] font-semibold text-[#0F172A]">
                {p.title}
              </h2>
              <p className="mt-2.5 text-[14px] leading-relaxed text-[#475569]">{p.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
