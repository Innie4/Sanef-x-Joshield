import React from "react";
import Link from "next/link";
import { Shield, Search, Award, CheckCircle2, ArrowRight, Clock, Users, FileText } from "lucide-react";
import { SECURITY_SERVICES } from "@/lib/data";

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold px-3 py-1 rounded bg-blue-950/60 border border-blue-800/40">
          OPERATIONAL SERVICE DIRECTORY
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Comprehensive Protective Capabilities
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          From static facility guarding and tactical armed convoys to risk consultancy dossiers and certified corporate academies, 
          JossyShield delivers end-to-end resilience for critical private and public assets.
        </p>
      </div>

      {/* Services List */}
      <div className="space-y-12">
        {SECURITY_SERVICES.map((service, index) => (
          <div
            key={service.id}
            id={service.category}
            className="glass-panel rounded-3xl p-8 sm:p-10 border-slate-800 relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Title & Description */}
              <div className="lg:col-span-2 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30">
                    {service.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    CAPABILITY 0{index + 1}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {service.title}
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {service.fullDesc}
                </p>

                {/* Features List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Specs & Actions */}
              <div className="bg-[#0b0e14] border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-800">
                    Operational Specifications
                  </h4>
                  <div className="space-y-4">
                    {service.specs.map((spec, i) => (
                      <div key={i}>
                        <p className="text-[11px] text-slate-500">{spec.label}</p>
                        <p className="text-sm font-semibold text-white font-mono mt-0.5">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800">
                  <Link
                    href={`/marketplace?category=${encodeURIComponent(service.title)}`}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-600/25 transition-all"
                  >
                    <span>Request Requisition</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
