"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Shield, 
  Search, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Lock, 
  Radio, 
  Clock, 
  Star,
  Users,
  Building2,
  FileCheck2
} from "lucide-react";
import MarketplaceWizard from "@/components/MarketplaceWizard";
import JobApplicationModal from "@/components/JobApplicationModal";
import { SECURITY_SERVICES, JOSSY_TESTIMONIALS } from "@/lib/data";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#161b26_1px,transparent_1px),linear-gradient(to_bottom,#161b26_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

        {/* Ambient tactical lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#131824] border border-blue-500/30 text-xs font-mono text-slate-300 shadow-xl shadow-blue-900/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-semibold">24/7 CENTRAL DISPATCH</span>
            <span className="text-slate-600">•</span>
            <span className="text-blue-400">DEFENCE-GRADE COMMERCIAL SECURITY</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Authoritative Security.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-slate-200">
              Vetted Ready Personnel.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-slate-300 text-base sm:text-lg leading-relaxed">
            JossyShield secures corporate facilities, commercial assets, and VIP transit across 
            Nigeria with military-precision guarding, threat consultancy, and an rigorously 
            vetted, ready-to-deploy talent pool.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/marketplace"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-8 py-4 rounded-xl shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Request Service & Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#141924] hover:bg-[#1a2233] text-slate-200 border border-slate-800 font-semibold text-sm px-7 py-4 rounded-xl transition-all"
            >
              <Users className="w-4 h-4 text-blue-400" />
              <span>Join Security Talent Pool</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-slate-900/80">
            <div className="p-4 rounded-xl bg-[#10141d]/80 border border-slate-850 text-left">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">99.98%</div>
              <p className="text-xs text-slate-400 mt-0.5">Incident Prevention SLA</p>
            </div>
            <div className="p-4 rounded-xl bg-[#10141d]/80 border border-slate-850 text-left">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-400">&lt; 15 min</div>
              <p className="text-xs text-slate-400 mt-0.5">Rapid Armed Dispatch</p>
            </div>
            <div className="p-4 rounded-xl bg-[#10141d]/80 border border-slate-850 text-left">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">1,200+</div>
              <p className="text-xs text-slate-400 mt-0.5">Vetted Officers Deployed</p>
            </div>
            <div className="p-4 rounded-xl bg-[#10141d]/80 border border-slate-850 text-left">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-400">ISO 27001</div>
              <p className="text-xs text-slate-400 mt-0.5">Audited Security Standard</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE SERVICE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-400 mb-2">
              <Lock className="w-3.5 h-3.5" />
              <span>Full Operational Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Three Disciplines. One Unbroken Shield.
            </h2>
          </div>
          <Link
            href="/services"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300"
          >
            <span>View Full Service Catalog</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SECURITY_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="glass-panel glass-panel-hover rounded-2xl p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded bg-blue-950/60 border border-blue-800/40 text-blue-300 font-medium">
                    {srv.badge}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-blue-400">
                    <Shield className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{srv.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {srv.shortDesc}
                </p>

                <div className="space-y-2.5 border-t border-slate-800/80 pt-5">
                  {srv.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80">
                <Link
                  href={`/marketplace?category=${encodeURIComponent(srv.title)}`}
                  className="w-full flex items-center justify-center gap-2 bg-[#121722] hover:bg-blue-600 hover:text-white text-slate-300 border border-slate-700/80 text-xs font-semibold py-3 rounded-xl transition-all"
                >
                  <span>Request Deployment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. INTERACTIVE SERVICE MARKETPLACE WIZARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-400 mb-2">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Interactive Lead & Requisition Portal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Configure Your Security Service
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Customize personnel requirements, duration, and threat scope. Receive an immediate 
            tracking reference number and a formal tactical quote within 4 hours.
          </p>
        </div>

        <MarketplaceWizard />
      </section>

      {/* 4. READY-TO-WORK TALENT POOL SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border-blue-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold px-3 py-1 rounded bg-blue-950/50 border border-blue-800/40">
                JOSSYSHIELD VETTED SECURITY TALENT POOL
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Never Wait Weeks for Qualified Security Personnel.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                We maintain an actively screened, background-verified pool of security professionals 
                including static guards, CCTV telemetry analysts, defensive convoy drivers, and 
                VIP close-protection specialists available on rapid deployment notice.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#0e121a] border border-slate-800">
                  <div className="text-blue-400 font-bold text-sm mb-1">01. Biometric & Criminal Audit</div>
                  <p className="text-xs text-slate-400">Triple-layer background clearance with state law enforcement liaison.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#0e121a] border border-slate-800">
                  <div className="text-blue-400 font-bold text-sm mb-1">02. Tactical Assessment</div>
                  <p className="text-xs text-slate-400">Physical fitness, de-escalation psychology, and first-aid certification.</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all"
                >
                  Apply to Enter Talent Pool
                </button>
                <Link
                  href="/careers"
                  className="text-xs text-slate-300 hover:text-white px-5 py-3.5 rounded-xl border border-slate-800 hover:bg-slate-900 transition-colors"
                >
                  Explore Current Vacancies
                </Link>
              </div>
            </div>

            {/* Talent Pool Live Status Card */}
            <div className="bg-[#0b0e14] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-850 pb-4">
                <div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Ready-To-Deploy Dashboard
                  </span>
                  <p className="text-[11px] text-slate-500">Live operational pool capacity</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                  ACTIVE ROSTER
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-[#121622] border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">Armed Convoy & Escort Officers</p>
                    <p className="text-[10px] text-slate-400">Average Experience: 6.8 Years</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-400">84 Available</span>
                </div>
                <div className="p-3 rounded-lg bg-[#121622] border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">Static Commercial Facility Guards</p>
                    <p className="text-[10px] text-slate-400">Average Experience: 4.2 Years</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-400">310 Available</span>
                </div>
                <div className="p-3 rounded-lg bg-[#121622] border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">CCTV & Telemetry Surveillance Specialists</p>
                    <p className="text-[10px] text-slate-400">VMS & Alarm Matrix Certified</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-400">42 Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase tracking-wider text-blue-400">
            VERIFIED CLIENT TESTIMONIALS
          </span>
          <h2 className="text-3xl font-bold text-white tracking-tight mt-1">
            Trusted by Critical Enterprises
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {JOSSY_TESTIMONIALS.map((t, i) => (
            <div key={i} className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>
              <div className="border-t border-slate-800 pt-4">
                <p className="text-xs font-bold text-white">{t.name}</p>
                <p className="text-[11px] text-slate-500">{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Job Application Modal */}
      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
