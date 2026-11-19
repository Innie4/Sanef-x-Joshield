import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { JOSSY_TESTIMONIALS } from "@/lib/data";

export default function TestimonialsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-mono uppercase tracking-wider text-[#0066FF] font-semibold">
          Verified Field Case Studies
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.03em] text-white">
          Client Endorsements & Incident Reduction Records
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
          Direct field reports from freight logistics operators, commercial tower directors, and diplomatic missions secured by JossyShield.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {JOSSY_TESTIMONIALS.map((item, index) => (
          <div
            key={index}
            className="tactical-surface rounded-3xl p-7 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>CASE DOSSIER 0{index + 1}</span>
                <span className="text-[#0066FF] font-semibold">AUDITED</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                "{item.quote}"
              </p>
            </div>

            <div className="border-t border-white/[0.06] pt-4">
              <h4 className="text-sm font-bold text-white">{item.name}</h4>
              <p className="text-xs text-zinc-500">{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="tactical-surface rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6">
        <h3 className="text-2xl font-bold text-white tracking-tight">
          Harden Your Commercial Perimeter
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
          Contact our operations team for a confidential physical security assessment or immediate operative requisition.
        </p>
        <div>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.01]"
          >
            <span>Launch Deployment Requisition</span>
            <ArrowUpRight className="w-4 h-4 opacity-80" />
          </Link>
        </div>
      </div>
    </div>
  );
}
