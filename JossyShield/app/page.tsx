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
  ChevronRight,
  Sliders,
  MapPin,
  Activity,
  Award,
  Zap,
  CheckCircle2,
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
  const [guardCount, setGuardCount] = useState(6);

  const sectorMetrics: Record<string, { ready: number; eta: string; status: string; commander: string }> = {
    "Lagos - Victoria Island & Lekki": { ready: 38, eta: "9 mins", status: "Optimal", commander: "Capt. M. Briggs (Unit 01)" },
    "Lagos - Ikeja & Industrial Corridor": { ready: 29, eta: "12 mins", status: "Optimal", commander: "Lt. A. Danjuma (Unit 04)" },
    "Abuja - Central & Diplomatic": { ready: 22, eta: "8 mins", status: "Optimal", commander: "Capt. S. Bello (Unit 02)" },
    "Port Harcourt - Energy Belt": { ready: 18, eta: "15 mins", status: "Heightened Readiness", commander: "Lt. C. Okon (Unit 07)" },
  };

  const activeSector = sectorMetrics[sector] || sectorMetrics["Lagos - Victoria Island & Lekki"];

  // Estimated budget indicator based on parameters
  const estimatedBudget = 
    serviceTier === "static"
      ? `₦${(guardCount * 180000).toLocaleString()} / month`
      : serviceTier === "convoy"
      ? `₦${(guardCount * 320000 + 450000).toLocaleString()} / mission`
      : "₦850,000 / audit dossier";

  return (
    <div className="relative overflow-hidden pt-28 pb-32 space-y-36">
      {/* Background Ambience */}
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute inset-0 mesh-grid opacity-40 pointer-events-none" />

      {/* 1. HERO SECTION: ASYMMETRIC BENTO COMMAND CONSOLE */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Authoritative Editorial Statement */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-950/40 border border-blue-500/30 text-xs font-mono text-blue-300 shadow-[0_0_24px_rgba(0,102,255,0.2)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 beacon-pulse" />
              <span className="text-white font-semibold tracking-wide">CENTRAL DISPATCH ONLINE</span>
              <span className="text-blue-500/50">•</span>
              <span>CLASS A NSCDC LICENSED</span>
            </div>

            <div className="space-y-5">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.035em] text-white leading-[1.05]">
                Autonomous Defense.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-slate-200">
                  Vetted Operatives.
                </span>
                <br />
                Zero-Compromise Security.
              </h1>

              <p className="max-w-xl text-base sm:text-lg text-zinc-400 leading-relaxed font-normal">
                JossyShield provisions armed commercial facility protection, rapid convoy transit, and vulnerability audits across Nigeria. Every operative undergoes biometric vetting and tactical stress certification before deployment.
              </p>
            </div>

            {/* Tactical Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-blue-400 text-white text-sm font-semibold px-7 py-4 rounded-full shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <span>Deploy Security Detail</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-sm font-medium px-6 py-4 rounded-full backdrop-blur-xl transition-all"
              >
                <Users className="w-4 h-4 text-blue-400" />
                <span>Join Vetted Talent Pool</span>
              </button>
            </div>

            {/* Trust & Compliance Ribbon */}
            <div className="pt-8 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Dispatch SLA</p>
                <p className="text-2xl font-bold text-white font-mono tracking-tight mt-1">&lt; 12 mins</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">Guaranteed arrival notice</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Vetting Pass</p>
                <p className="text-2xl font-bold text-blue-400 font-mono tracking-tight mt-1">8.4%</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">Biometric & criminal clearance</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Active Units</p>
                <p className="text-2xl font-bold text-white font-mono tracking-tight mt-1">412 Officers</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">Deployed in 3 key regions</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Standards</p>
                <p className="text-2xl font-bold text-blue-400 font-mono tracking-tight mt-1">ISO 27001</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">Audited physical security</p>
              </div>
            </div>
          </div>

          {/* Right Column: Dribbble-Grade Interactive Bento Console */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[32px] p-[1px] bg-gradient-to-b from-blue-500/40 via-white/10 to-transparent shadow-2xl shadow-blue-950/40">
              <div className="bg-[#090d16]/95 backdrop-blur-2xl rounded-[31px] p-6 sm:p-8 space-y-6">
                
                {/* Console Top Header */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0066FF]" />
                    </span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                      Sector Readiness Console
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/80 border border-blue-800/40 text-blue-400">
                    LIVE TELEMETRY
                  </span>
                </div>

                {/* Operating Sector Dropdown */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                    <span>Target Deployment Zone</span>
                    <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {activeSector.status}
                    </span>
                  </label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full bg-[#05080f] border border-white/10 hover:border-white/20 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#0066FF] font-medium transition-colors"
                  >
                    {Object.keys(sectorMetrics).map((sec) => (
                      <option key={sec} value={sec} className="bg-[#0b0f17] text-white">
                        {sec}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Service Discipline Segmented Control */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    Protective Discipline
                  </label>
                  <div className="grid grid-cols-3 gap-2 bg-[#05080f] p-1.5 rounded-2xl border border-white/[0.06]">
                    <button
                      type="button"
                      onClick={() => setServiceTier("static")}
                      className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition-all ${
                        serviceTier === "static"
                          ? "bg-[#0066FF] text-white shadow-md shadow-blue-600/30"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Facility Static
                    </button>
                    <button
                      type="button"
                      onClick={() => setServiceTier("convoy")}
                      className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition-all ${
                        serviceTier === "convoy"
                          ? "bg-[#0066FF] text-white shadow-md shadow-blue-600/30"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Armed Convoy
                    </button>
                    <button
                      type="button"
                      onClick={() => setServiceTier("audit")}
                      className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition-all ${
                        serviceTier === "audit"
                          ? "bg-[#0066FF] text-white shadow-md shadow-blue-600/30"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Threat Audit
                    </button>
                  </div>
                </div>

                {/* Interactive Operatives Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono uppercase tracking-wider text-zinc-400">Operatives Required</span>
                    <span className="font-mono font-bold text-blue-400 text-sm">{guardCount} Officers</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="24"
                    step="2"
                    value={guardCount}
                    onChange={(e) => setGuardCount(Number(e.target.value))}
                    className="w-full accent-[#0066FF] bg-zinc-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                    <span>Min: 2 Units</span>
                    <span>Max: 24 Platoon</span>
                  </div>
                </div>

                {/* Telemetry Output HUD */}
                <div className="bg-[#05080f] rounded-2xl p-4 border border-white/[0.08] space-y-2.5 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Available Operatives:</span>
                    <span className="text-white font-bold">{activeSector.ready} Cleared Officers</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Guaranteed Response ETA:</span>
                    <span className="text-emerald-400 font-bold">{activeSector.eta}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Duty Watch Commander:</span>
                    <span className="text-zinc-300">{activeSector.commander}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/[0.06] pt-2">
                    <span className="text-zinc-400">Estimated Allocation:</span>
                    <span className="text-blue-400 font-bold">{estimatedBudget}</span>
                  </div>
                </div>

                {/* CTA Requisition Button */}
                <Link
                  href={`/marketplace?category=${encodeURIComponent(
                    serviceTier === "static"
                      ? "Static & Facility Security"
                      : serviceTier === "convoy"
                      ? "Armed Convoy & VIP Escort"
                      : "Risk & Threat Consultancy"
                  )}&operatives=${guardCount}`}
                  className="w-full flex items-center justify-center gap-2 bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01]"
                >
                  <span>Launch Formal Requisition Spec</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE CAPABILITIES: DRIBBBLE BENTO GRID */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-500/20 text-[11px] font-mono text-blue-400">
            <Zap className="w-3.5 h-3.5" />
            <span>OPERATIONAL CAPABILITY BENTO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white">
            Three Disciplines. One Unbroken Perimeter.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Eliminating blind spots across commercial properties, highways, and executive residences with military rigor and continuous telemetry.
          </p>
        </div>

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Card 1: Static Facility Guarding (Span 2 cols on md) */}
          <div className="md:col-span-2 bento-card p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 font-semibold">
                  DISCIPLINE 01 • ACCESS CONTROL
                </span>
                <span className="text-xs font-mono text-zinc-500">24/7 PATROL LOGGING</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Manned Facility Guarding & Perimeter Access Control
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
                Uniformed, armed, and static security personnel deployed across high-value commercial facilities, corporate headquarters, and bonded logistics terminals with electronic checkpoint wanding.
              </p>
            </div>

            {/* Feature Tags & CTA */}
            <div className="space-y-4 border-t border-white/[0.08] pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
                  <span>Biometric check-in & NFC RFID checkpoint tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
                  <span>Integrated Quick Reaction Force (QRF) backup</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Link
                  href="/marketplace?category=Static%20Guarding"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-blue-400 transition-colors"
                >
                  <span>Requisition Static Guard Detail</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Armed Transit & Convoy Escort */}
          <div className="bento-card p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 font-semibold">
                  DISCIPLINE 02 • TRANSIT
                </span>
                <span className="text-xs font-mono text-emerald-400">ARMORED</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Armed Highway & Inter-State Convoy Escort
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Armored vehicle convoys, executive transit protection, and high-value cargo escorts along Nigerian commercial routes with route reconnaissance.
              </p>
            </div>

            <div className="border-t border-white/[0.08] pt-4">
              <Link
                href="/marketplace?category=Armed%20Convoy"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-blue-400 transition-colors"
              >
                <span>Requisition Transit Convoy</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Bento Card 3: Vulnerability & TSCM Penetration Audits */}
          <div className="bento-card p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 font-semibold">
                  DISCIPLINE 03 • ADVISORY
                </span>
                <span className="text-xs font-mono text-zinc-500">ISO 27001</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Physical Risk & Vulnerability Audits
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Comprehensive physical facility penetration testing, TSCM electronic bug sweeps, and executive route vulnerability modeling.
              </p>
            </div>

            <div className="border-t border-white/[0.08] pt-4">
              <Link
                href="/marketplace?category=Risk%20Consultancy"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-blue-400 transition-colors"
              >
                <span>Request Threat Audit</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Bento Card 4: 24/7 Central Dispatch SLA (Span 2 cols on md) */}
          <div className="md:col-span-2 bento-card p-8 flex flex-col justify-between space-y-6 bg-gradient-to-r from-blue-950/30 to-[#0b0f17]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                  SLA INTEGRITY
                </span>
                <span className="text-xs font-mono text-zinc-400">99.98% INCIDENT PREVENTION</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Rapid Response QRF & 24/7 Operations Command
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
                Every client site is linked to our 24/7 central operations console with automated incident alarm matrices, UHF emergency radio relays, and armed police tactical liaisons.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.08] pt-4 text-xs font-mono text-zinc-400">
              <span>AVERAGE ARMED INTERVENTION: &lt; 12 MINS</span>
              <span className="text-blue-400 font-semibold">ENCRYPTED TELEMETRY ACTIVE</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VETTED SECURITY PERSONNEL DOSSIER SPOTLIGHT */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bento-card p-8 sm:p-12 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                ACTIVE RECRUITMENT GATEWAY
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Pre-Vetted Operatives. Deployable in 4 Hours.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
                Commercial institutions lose critical weeks searching for trustworthy security staff. We screen, certify, and hold background-cleared personnel ready for immediate field assignment.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3.5">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold px-7 py-4 rounded-full shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
              >
                Apply to Enter Talent Pool
              </button>
              <Link
                href="/careers"
                className="bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-zinc-300 hover:text-white text-xs font-medium px-6 py-4 rounded-full text-center transition-all"
              >
                Inspect Talent Roster
              </Link>
            </div>
          </div>

          {/* Vetting Stages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/[0.08]">
            <div className="space-y-2">
              <p className="text-xs font-mono text-blue-400 font-bold">01 / BIOMETRIC AUDIT</p>
              <h4 className="text-sm font-semibold text-white">Triple-Tier Background Clearance</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Automated criminal registry cross-checks, fingerprinting, NIN verification, and residential guarantor physical visits.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-mono text-blue-400 font-bold">02 / TACTICAL EVALUATION</p>
              <h4 className="text-sm font-semibold text-white">Stress Tolerance & De-escalation</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Scenario stress evaluation measuring crisis de-escalation psychology, unarmed self-defense, and access software mastery.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-mono text-blue-400 font-bold">03 / FIELD READINESS</p>
              <h4 className="text-sm font-semibold text-white">Trauma Response & Radio Drills</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Fire drills, tactical vehicle search protocols, and UHF radio emergency communication protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE REQUISITION WIZARD */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <p className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">
            Requisition Terminal
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Configure Your Security Service
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-lg mx-auto">
            Specify team size, service discipline, and site location. Receive an immediate formal tactical quote within 4 hours.
          </p>
        </div>

        <MarketplaceWizard />
      </section>

      {/* 5. VERIFIED CLIENT ENDORSEMENT DOSSIERS */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1">
              Field Deployments
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Verified Incident Reduction Records
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
              className="bento-card p-7 space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>AUDITED CASE 0{idx + 1}</span>
                  <span className="text-blue-400 font-semibold">VERIFIED</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic font-sans">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.08]">
                <p className="text-sm font-semibold text-white">{t.name}</p>
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
