import React from "react";
import Link from "next/link";
import { Star, Shield, ArrowRight, Quote } from "lucide-react";
import { JOSSY_TESTIMONIALS } from "@/lib/data";

export default function TestimonialsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold px-3 py-1 rounded bg-blue-950/60 border border-blue-800/40">
          PROVEN OPERATIONAL EVIDENCE
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Client Endorsements & Case Studies
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Read verified feedback from logistics operators, commercial facility directors, and diplomatic attaches 
          who depend on JossyShield for round-the-clock defense and threat mitigation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {JOSSY_TESTIMONIALS.map((item, index) => (
          <div
            key={index}
            className="glass-panel rounded-2xl p-7 flex flex-col justify-between space-y-6 relative"
          >
            <div>
              <Quote className="w-8 h-8 text-blue-500/30 mb-4" />
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                "{item.quote}"
              </p>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <h4 className="text-sm font-bold text-white">{item.name}</h4>
              <p className="text-xs text-slate-400">{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6">
        <h3 className="text-2xl font-bold text-white">
          Secure Your Facilities with Verified Excellence
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Contact our operations team to discuss a confidential security review and tailored guard deployment.
        </p>
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
        >
          <span>Initiate Service Requisition</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
