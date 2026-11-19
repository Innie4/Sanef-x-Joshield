"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Shield, 
  ArrowUpRight, 
  Check, 
  Users, 
  Radio, 
  Clock, 
  Lock, 
  FileCheck, 
  MapPin, 
  ChevronRight,
  Sliders,
  AlertTriangle
} from "lucide-react";
import MarketplaceWizard from "@/components/MarketplaceWizard";
import JobApplicationModal from "@/components/JobApplicationModal";
import { SECURITY_SERVICES, JOSSY_TESTIMONIALS } from "@/lib/data";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Tactical Terminal Interactive State
  const [sector, setSector] = useState("Lagos - Victoria Island & Lekki");
  const [serviceTier, setServiceTier] = useState<"static" | "convoy" | "audit">("static");
  const [guardCount, setGuardCount] = useState(4);

  const sectorMetrics: Record<string, { ready: number; eta: string; status: string }> = {
    "Lagos - Victoria Island & Lekki": { ready: 34, eta: "11 mins", status: "Optimal" },
    "Lagos - Ikeja & Industrial Corridor": { ready: 28, eta: "14 mins", status: "Optimal" },
    "Abuja - Central & Diplomatic": { ready: 19, eta: "9 mins", status: "Optimal" },
    "Port Harcourt - Energy Belt": { ready: 16, eta: "18 mins", status: "Heightened" },
  };

  const activeSector = sectorMetrics[sector] || sectorMetrics["Lagos - Victoria Island & Lekki"];

  return (
    <div className="space-y-32 pb-24 overflow-hidden pt-28">
      {/* 1. HERO SECTION: ASYMMETRIC COMMAND CONSOLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Authoritative Editorial Statement */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full tactical-surface text-[11px] font-mono tracking-wide text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 beacon-pulse" />
              <span className="text-white font-medium">DISPATCH COMMAND ACTIVE</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400">CATEGORY A LICENSED</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.035em] text-white leading-[1.04]">
                Commercial defense.
                <br />
                <span className="text-zinc-400">Vetted operatives.</span>
                <br />
                Immediate dispatch.
              </h1>

              <p className="max-w-xl text-base sm:text-lg text-zinc-400 leading-relaxed font-normal pt-2">
                JossyShield provisions armed facility security, armored convoy escorts, and physical threat audits across Nigerian commercial corridors. Every operative on our roster is biometric-vetted and tactical-certified before stepping foot on your perimeter.
              </p>
            </div>

            {/* Tactical Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center gap-2 bg-[#0066FF] hover:bg-[#1A75FF] text-white text-sm font-semibold px-6 py-3.5 rounded-full shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Deploy Security Detail</span>
                <ArrowUpRight className="w-4 h-4 opacity-80" />
              </Link>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 tactical-surface-interactive text-zinc-300 hover:text-white text-sm font-medium px-6 py-3.5 rounded-full"
              >
                <Users className="w-4 h-4 text-zinc-400" />
                <span>Join Vetted Talent Pool</span>
              </button>
            </div>

            {/* Operational Specs Ribbon (Hairline separated, NOT card boxes) */}
            <div className="pt-8 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Response SLA</p>
                <p className="text-xl font-bold text-white font-mono tracking-tight mt-1">&lt; 12 mins</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">Rapid dispatch guarantee</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Vetting Pass</p>
                <p className="text-xl font-bold text-white font-mono tracking-tight mt-1">8.4%</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">Triple-tier background clearance</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Active Roster</p>
                <p className="text-xl font-bold text-white font-mono tracking-tight mt-1">412 Units</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">Stationed across 3 regions</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Compliance</p>
                <p className="text-xl font-bold text-white font-mono tracking-tight mt-1">Class A</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">NSCDC licensed & insured</p>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Telemetry Terminal */}
          <div className="lg:col-span-5">
            <div className="tactical-surface rounded-3xl p-6 sm:p-7 space-y-6 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#0066FF] beacon-pulse" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
                    Live Sector Readiness Telemetry
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">REV. 2026.4</span>
              </div>

              {/* Sector Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                  <span>Operating Sector</span>
                  <span className="text-emerald-400 text-[11px] font-normal">{activeSector.status}</span>
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full bg-[#070A0F] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF] font-medium"
                >
                  {Object.keys(sectorMetrics).map((sec) => (
                    <option key={sec} value={sec} className="bg-[#0b0f17] text-white">
                      {sec}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Tier Switcher */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Mission Discipline
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setServiceTier("static")}
                    className={`py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                      serviceTier === "static"
                        ? "bg-[#0066FF] text-white font-semibold"
                        : "bg-[#070A0F] text-zinc-400 hover:text-white border border-white/[0.05]"
                    }`}
                  >
                    Static Guarding
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceTier("convoy")}
                    className={`py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                      serviceTier === "convoy"
                        ? "bg-[#0066FF] text-white font-semibold"
                        : "bg-[#070A0F] text-zinc-400 hover:text-white border border-white/[0.05]"
                    }`}
                  >
                    Armed Convoy
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceTier("audit")}
                    className={`py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                      serviceTier === "audit"
                        ? "bg-[#0066FF] text-white font-semibold"
                        : "bg-[#070A0F] text-zinc-400 hover:text-white border border-white/[0.05]"
                    }`}
                  >
                    Threat Audit
                  </button>
                </div>
              </div>

              {/* Guard Count Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono uppercase tracking-wider text-zinc-400">Operatives Required</span>
                  <span className="font-mono font-bold text-white text-sm">{guardCount} Officers</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="30"
                  step="2"
                  value={guardCount}
                  onChange={(e) => setGuardCount(Number(e.target.value))}
                  className="w-full accent-[#0066FF] bg-zinc-800 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* Telemetry Output Box */}
              <div className="bg-[#070A0F] rounded-2xl p-4 border border-white/[0.06] space-y-3 font-mono">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Available Operatives in Zone:</span>
                  <span className="text-white font-bold">{activeSector.ready} Cleared Units</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Guaranteed Mobilization ETA:</span>
                  <span className="text-emerald-400 font-bold">{activeSector.eta}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Command Comms:</span>
                  <span className="text-zinc-300">Encrypted UHF 440MHz + LTE</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Bodycam Telemetry:</span>
                  <span className="text-zinc-300">Live Real-Time GPS Logging</span>
                </div>
              </div>

              {/* Launch Requisition Button */}
              <Link
                href={`/marketplace?category=${encodeURIComponent(
                  serviceTier === "static"
                    ? "Static & Facility Security"
                    : serviceTier === "convoy"
                    ? "Armed Convoy & VIP Escort"
                    : "Risk & Threat Consultancy"
                )}&operatives=${guardCount}`}
                className="w-full flex items-center justify-center gap-2 bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-600/25 transition-all"
              >
                <span>Initiate Formal Requisition</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE THREE DISCIPLINES: DEFENSE SPECIFICATION MATRIX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-mono uppercase tracking-wider text-[#0066FF] font-semibold mb-2">
            Defense Specifications
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-white">
            Three disciplines. One unbroken perimeter.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 leading-relaxed">
            Standard security agencies assign unvetted watchmen with flashlights. JossyShield operates structured tactical units equipped with biometric verification, GPS patrol tracking, and direct armed backup liaisons.
          </p>
        </div>

        {/* Technical Spec Matrix (Not 3 generic cards) */}
        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {SECURITY_SERVICES.map((srv, idx) => (
            <div
              key={srv.id}
              className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group"
            >
              <div className="lg:col-span-1 text-xs font-mono text-zinc-600">
                0{idx + 1}
              </div>

              <div className="lg:col-span-4 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#0066FF] px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                  {srv.badge}
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight pt-1">
                  {srv.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {srv.shortDesc}
                </p>
              </div>

              <div className="lg:col-span-5 space-y-3">
                <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                  Operational Standard
                </p>
                <ul className="space-y-2">
                  {srv.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] mt-1.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-2 flex lg:justify-end items-center pt-2 lg:pt-0">
                <Link
                  href={`/marketplace?category=${encodeURIComponent(srv.title)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-[#0066FF] transition-colors"
                >
                  <span>Requisition Spec</span>
                  <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. VETTED SECURITY TALENT POOL LEDGER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="tactical-surface rounded-3xl p-8 sm:p-12 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                ACTIVE VETTING GATEWAY
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Pre-cleared officers. Ready for 4-hour deployment.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
                Commercial institutions lose weeks trying to hire trustworthy security staff. We screen, certify, and hold background-cleared personnel ready for immediate assignment.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold px-6 py-3.5 rounded-full transition-all"
              >
                Apply to Enter Talent Pool
              </button>
              <Link
                href="/careers"
                className="tactical-surface-interactive text-zinc-300 hover:text-white text-xs font-medium px-5 py-3.5 rounded-full text-center"
              >
                Inspect Talent Roster
              </Link>
            </div>
          </div>

          {/* Vetting Stages Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/[0.08]">
            <div className="space-y-2">
              <p className="text-xs font-mono text-[#0066FF] font-semibold">STAGE 01</p>
              <h4 className="text-sm font-semibold text-white">Triple-Tier Criminal & Biometric Audit</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Automated criminal registry cross-checking, fingerprinting, NIN verification, and residential guarantor physical visits.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-mono text-[#0066FF] font-semibold">STAGE 02</p>
              <h4 className="text-sm font-semibold text-white">Psychological & Conflict De-escalation</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Rigorous scenario evaluation designed to test stress tolerance, situational restraint, and tactical non-violent de-escalation.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-mono text-[#0066FF] font-semibold">STAGE 03</p>
              <h4 className="text-sm font-semibold text-white">Live Field Exercises & First Aid</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Fire drills, trauma response, vehicle search protocols, and electronic checkpoint radio communication mastery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE REQUISITION WIZARD */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <p className="text-xs font-mono uppercase tracking-wider text-[#0066FF] font-semibold">
            Requisition Terminal
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Configure Your Defense Detail
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-lg mx-auto">
            Specify team size, service discipline, and site location. Receive a formal deployment quote and cryptographic tracking code within 4 hours.
          </p>
        </div>

        <MarketplaceWizard />
      </section>

      {/* 5. VERIFIED CLIENT AFFIDAVITS (INCIDENT AUDIT LOG) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1">
              Field Deployments
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Verified Incident Reduction Affidavits
            </h2>
          </div>
          <Link
            href="/testimonials"
            className="text-xs font-semibold text-zinc-400 hover:text-white mt-3 sm:mt-0 flex items-center gap-1"
          >
            <span>Read All Operational Reports</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {JOSSY_TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="tactical-surface rounded-2xl p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>AUDITED CASE 0{idx + 1}</span>
                  <span className="text-[#0066FF] font-semibold">VERIFIED</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <p className="text-xs font-semibold text-white">{t.name}</p>
                <p className="text-[11px] text-zinc-500">{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
