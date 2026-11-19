import React from "react";
import Link from "next/link";
import { Handshake, Building2, CheckCircle2, ArrowRight } from "lucide-react";
import { SANEF_PARTNERS } from "@/lib/data";

export default function PartnershipsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold px-3 py-1 rounded bg-emerald-100">
          INSTITUTIONAL COLLABORATIONS
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Partnering for Community Resilience
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          SANEF bridges civic society, municipal agencies, philanthropic trusts, and private technical providers 
          to deliver accountable, sustainable neighborhood interventions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SANEF_PARTNERS.map((partner) => (
          <div
            key={partner.id}
            className="civic-card rounded-3xl p-8 space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  {partner.type}
                </span>
                <span className="text-xs font-mono text-slate-500">{partner.period}</span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900">{partner.name}</h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {partner.summary}
              </p>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
                <div>
                  <strong className="text-slate-800">Projects Co-delivered:</strong>
                  <p className="text-slate-600">{partner.projectsTogether.join(", ")}</p>
                </div>
                <div>
                  <strong className="text-slate-800">Joint Impact Outcomes:</strong>
                  <p className="text-slate-600">{partner.outcomes}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/contact?subject=Partnership%20Inquiry"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                <span>Inquire About Strategic Alliance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
