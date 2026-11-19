import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SECURITY_SERVICES } from "@/lib/data";

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-20">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-mono uppercase tracking-wider text-[#0066FF] font-semibold">
          Operational Capabilities Index
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.03em] text-white">
          Defense Specifications & Service Standards
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
          From static facility guarding and tactical highway escorts to risk penetration audits and certified corporate academies, JossyShield operates certified, auditable protective infrastructure.
        </p>
      </div>

      {/* Services List */}
      <div className="space-y-12">
        {SECURITY_SERVICES.map((service, index) => (
          <div
            key={service.id}
            id={service.category}
            className="tactical-surface rounded-3xl p-8 sm:p-10 space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Title & Description */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/20">
                    {service.badge}
                  </span>
                  <span className="text-xs font-mono text-zinc-600">
                    DISCIPLINE 0{index + 1}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {service.title}
                </h2>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {service.fullDesc}
                </p>

                {/* Features List */}
                <div className="space-y-2.5 pt-2">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                    Mandatory Inclusions
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] mt-1.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Specs & Actions */}
              <div className="lg:col-span-5 bg-[#070A0F] border border-white/[0.07] rounded-2xl p-6 flex flex-col justify-between space-y-6">
                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-4 pb-2 border-b border-white/[0.06]">
                    Service Level Agreement (SLA)
                  </h4>
                  <div className="space-y-4">
                    {service.specs.map((spec, i) => (
                      <div key={i}>
                        <p className="text-[11px] text-zinc-500">{spec.label}</p>
                        <p className="text-sm font-semibold text-white font-mono mt-0.5">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/[0.06]">
                  <Link
                    href={`/marketplace?category=${encodeURIComponent(service.title)}`}
                    className="w-full flex items-center justify-center gap-2 bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all"
                  >
                    <span>Requisition This Discipline</span>
                    <ArrowUpRight className="w-4 h-4 opacity-80" />
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
