"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowUpRight, 
  MapPin, 
  Calendar, 
  FileCheck2, 
  Check, 
  Users, 
  Heart,
  ChevronRight,
  ShieldCheck,
  Sun,
  Radio,
  BookOpen
} from "lucide-react";
import { SANEF_PROJECTS, SANEF_EVENTS, SANEF_PARTNERS, SANEF_CAMPAIGNS } from "@/lib/data";

export default function HomePage() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const activeInterventions = [
    {
      title: "Ajegunle School Corridor Solar Grid",
      tag: "INFRASTRUCTURE",
      location: "Ajeromi-Ifelodun, Lagos",
      installed: "March 2026",
      impact: "-58% Evening Street Robberies",
      pedestrians: "18,400 Students Daily",
      coords: "6.4474° N, 3.3326° E",
      summary: "32 pole-mounted lithium iron phosphate solar floodlights installed along 2.4km of unlit pedestrian alleyways leading to 4 public primary schools.",
      witness: "Chief O. Lawal, Community Development Committee",
    },
    {
      title: "Mushin Youth Non-Violence Academy",
      tag: "HUMAN CAPACITY",
      location: "Mushin Central, Lagos",
      installed: "January 2026",
      impact: "140 At-Risk Youths Diverted",
      pedestrians: "9 Community Quarters",
      coords: "6.5292° N, 3.3512° E",
      summary: "A 12-week intensive behavioral mediation program integrating trauma recovery, vocational electrical training, and restorative justice forums.",
      witness: "Alhaja K. Adeleke, Market Traders Association",
    },
    {
      title: "Makoko Waterfront Watch Radio Network",
      tag: "RAPID RESPONSE",
      location: "Yaba Waterfront, Lagos",
      installed: "May 2026",
      impact: "12-Min Police Dispatch Liaison",
      pedestrians: "35,000 Canal Residents",
      coords: "6.4969° N, 3.3934° E",
      summary: "Deployment of 45 ruggedized UHF two-way transceivers, a centralized solar repeater station, and structured incident reporting protocols.",
      witness: "Baale J. Akapo, Waterfront Council of Elders",
    },
  ];

  const currentIntervention = activeInterventions[activeProjectIndex];

  return (
    <div className="space-y-32 pb-24 overflow-hidden pt-28">
      {/* 1. HERO SECTION: ASYMMETRIC CIVIC MONOGRAPH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Mission Editorial Statement */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full monograph-surface text-[11px] font-mono tracking-wide text-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 civic-beacon" />
              <span className="text-slate-900 font-medium">CAC/IT/NO: 148291</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-500">AUDITED PUBLIC SAFETY MONOGRAPH</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.035em] text-slate-950 leading-[1.04]">
                Safer streets.
                <br />
                <span className="text-emerald-800">Verified evidence.</span>
                <br />
                Measured human impact.
              </h1>

              <p className="max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal pt-2">
                Safe Neighborhood Foundation (SANEF) eliminates urban vulnerability through auditable public safety investments: solar lighting along unlit school pathways, restorative youth mediation academies, and connected community watch networks.
              </p>
            </div>

            {/* Civic Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2 bg-[#0D4A2B] hover:bg-[#14633B] text-white text-sm font-semibold px-6 py-3.5 rounded-full shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Inspect Field Evidence Archive</span>
                <ArrowUpRight className="w-4 h-4 opacity-80" />
              </Link>

              <Link
                href="/donate"
                className="inline-flex items-center justify-center gap-2 monograph-surface-interactive text-slate-700 hover:text-slate-950 text-sm font-medium px-6 py-3.5 rounded-full"
              >
                <Heart className="w-4 h-4 text-emerald-700" />
                <span>Explore Transparent Allocations</span>
              </Link>
            </div>

            {/* Audited Impact Ribbon (Hairline separated, NOT card boxes) */}
            <div className="pt-8 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500">Night Crime</p>
                <p className="text-xl font-bold text-slate-900 font-mono tracking-tight mt-1">-42.8%</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Audited police station data</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500">Solar Units</p>
                <p className="text-xl font-bold text-emerald-800 font-mono tracking-tight mt-1">140 Beacons</p>
                <p className="text-slate-500 text-[11px] mt-0.5">Installed & GPS-verified</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500">Mediators</p>
                <p className="text-xl font-bold text-slate-900 font-mono tracking-tight mt-1">320 Youth</p>
                <p className="text-slate-500 text-[11px] mt-0.5">Certified in de-escalation</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500">Daily Footfall</p>
                <p className="text-xl font-bold text-emerald-800 font-mono tracking-tight mt-1">65,000+</p>
                <p className="text-slate-500 text-[11px] mt-0.5">Protected pedestrians daily</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Field Evidence Inspector */}
          <div className="lg:col-span-5">
            <div className="monograph-surface rounded-3xl p-6 sm:p-7 space-y-6 shadow-sm relative">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-600 civic-beacon" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-900">
                    Live Field Intervention Audit
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">CASE #2026-NIG</span>
              </div>

              {/* Intervention Selector Buttons */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                  Select Verified Project
                </p>
                <div className="space-y-2">
                  {activeInterventions.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveProjectIndex(idx)}
                      className={`w-full p-3 rounded-2xl text-left transition-all text-xs flex items-center justify-between ${
                        activeProjectIndex === idx
                          ? "bg-[#0D4A2B] text-white font-semibold shadow-sm"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/60"
                      }`}
                    >
                      <span className="truncate pr-2">{item.title}</span>
                      <span className="font-mono text-[10px] opacity-80 shrink-0">{item.tag}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Intervention Data Display */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-600 border-b border-slate-200 pb-2">
                  <span>Territory Coordinates:</span>
                  <span className="text-slate-900 font-semibold">{currentIntervention.coords}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 border-b border-slate-200 pb-2">
                  <span>Commissioning Date:</span>
                  <span className="text-slate-900 font-semibold">{currentIntervention.installed}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 border-b border-slate-200 pb-2">
                  <span>Verified Outcome:</span>
                  <span className="text-emerald-700 font-bold">{currentIntervention.impact}</span>
                </div>
                <div className="text-slate-600 font-sans text-xs leading-relaxed pt-1">
                  <p className="font-mono uppercase text-[10px] text-slate-400 mb-1">FIELD AUDIT REPORT</p>
                  <p>{currentIntervention.summary}</p>
                </div>
                <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-200 font-sans">
                  Sign-off affidavit: <span className="font-semibold text-slate-800">{currentIntervention.witness}</span>
                </div>
              </div>

              {/* Link to Full Evidence Archive */}
              <Link
                href="/portfolio"
                className="w-full flex items-center justify-center gap-2 bg-[#0D4A2B] hover:bg-[#14633B] text-white text-xs font-semibold py-3.5 rounded-xl shadow-sm transition-all"
              >
                <span>Download Certified Audit Dossier</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE THREE CIVIC PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold mb-2">
            Intervention Methodology
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-slate-950">
            Three pillars of durable public safety.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Safety cannot be sustained by armed policing alone. SANEF addresses environmental design, youth opportunity pathways, and direct community communication infrastructure.
          </p>
        </div>

        {/* Civic Spec Breakdown */}
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          <div className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-1 text-xs font-mono text-slate-400">
              01
            </div>
            <div className="lg:col-span-4 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                PHYSICAL ENVIRONMENT
              </span>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight pt-1">
                Solar Safe Corridors & Lighting
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dark alleyways and unlit pedestrian bridges create predatory choke points. We engineer decentralized solar street lamps equipped with anti-theft battery enclosures.
              </p>
            </div>
            <div className="lg:col-span-5 space-y-3">
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                Audited Standards
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                  <span>3000-lumen LiFePO4 battery solar beacons with 48-hour continuous autonomy</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                  <span>Installed strictly on high-density pedestrian corridors and public school boundaries</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                  <span>Community custodian handover with quarterly maintenance inspections</span>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2 flex lg:justify-end items-center pt-2 lg:pt-0">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-emerald-800 transition-colors"
              >
                <span>Inspect Corridors</span>
                <ArrowUpRight className="w-4 h-4 opacity-70" />
              </Link>
            </div>
          </div>

          <div className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-1 text-xs font-mono text-slate-400">
              02
            </div>
            <div className="lg:col-span-4 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                HUMAN REHABILITATION
              </span>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight pt-1">
                Youth Mediation & Vocational Diversion
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gang recruitment thrives on economic despair. Our academy trains disenfranchised youths in dispute resolution, electrical wiring, and community sports leadership.
              </p>
            </div>
            <div className="lg:col-span-5 space-y-3">
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                Audited Standards
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                  <span>12-week certified mediation curriculum backed by dispute resolution magistrates</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                  <span>100% of certified graduates receive electrical/technical toolkits and stipends</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                  <span>Zero-recidivism monitoring protocol with biannual field check-ins</span>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2 flex lg:justify-end items-center pt-2 lg:pt-0">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-emerald-800 transition-colors"
              >
                <span>Inspect Academies</span>
                <ArrowUpRight className="w-4 h-4 opacity-70" />
              </Link>
            </div>
          </div>

          <div className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-1 text-xs font-mono text-slate-400">
              03
            </div>
            <div className="lg:col-span-4 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                RAPID ALERT
              </span>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight pt-1">
                Community Watch Telemetry & Radio Links
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Volunteer neighborhood watch groups are the real first responders. We provide licensed UHF radios, high-visibility tactical vests, and direct police DPO hotline integration.
              </p>
            </div>
            <div className="lg:col-span-5 space-y-3">
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                Audited Standards
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                  <span>Emergency dispatch channels with direct Nigeria Police Divisional liaison</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                  <span>Human rights compliance training and rules of engagement vetting</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                  <span>Digital incident logging logbooks reviewed monthly by local CDAs</span>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2 flex lg:justify-end items-center pt-2 lg:pt-0">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-emerald-800 transition-colors"
              >
                <span>Inspect Radios</span>
                <ArrowUpRight className="w-4 h-4 opacity-70" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRANSPARENT FUND ALLOCATION (DONATION CALCULATOR) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="monograph-surface rounded-3xl p-8 sm:p-12 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-800 font-semibold px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200">
                CIVIC CAPITAL TRANSPARENCY
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Every Naira audited. Zero executive overhead diversion.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                We believe donor trust requires radical ledger transparency. An independent auditing firm validates all fund allocations annually, with receipts made public on this portal.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
              <Link
                href="/donate"
                className="bg-[#0D4A2B] hover:bg-[#14633B] text-white text-xs font-semibold px-6 py-3.5 rounded-full transition-all text-center"
              >
                Fund a Specific Corridor
              </Link>
              <Link
                href="/about"
                className="monograph-surface-interactive text-slate-700 hover:text-slate-900 text-xs font-medium px-5 py-3.5 rounded-full text-center"
              >
                Read Annual Audit
              </Link>
            </div>
          </div>

          {/* Allocation Ratio Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
            <div className="space-y-2">
              <p className="text-xs font-mono text-emerald-800 font-bold">72% DIRECT CAPITAL</p>
              <h4 className="text-sm font-semibold text-slate-900">Hardware & Street Infrastructure</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct procurement of Tier-1 solar lights, lithium batteries, galvanized poles, and radio repeaters.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-mono text-emerald-800 font-bold">18% CAPACITY BUILDING</p>
              <h4 className="text-sm font-semibold text-slate-900">Youth Stipends & Training</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instructor fees, vocational toolkits, trauma counselor compensation, and community watch gear.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-mono text-emerald-800 font-bold">10% COMPLIANCE & AUDIT</p>
              <h4 className="text-sm font-semibold text-slate-900">Independent Field Verification</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                External accountancy audits, GPS verification software, and field survey enumerator logistics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ACTIVE COMMUNITY CAMPAIGNS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
              Active Community Campaigns
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Direct Field Interventions in Progress
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 mt-3 sm:mt-0 flex items-center gap-1"
          >
            <span>View All Historical Records</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SANEF_PROJECTS.slice(0, 3).map((p) => (
            <div
              key={p.id}
              className="monograph-surface rounded-3xl p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="text-emerald-800 font-semibold">{p.category}</span>
                  <span>{p.location}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {p.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] font-mono text-emerald-800 font-semibold">
                  {p.impactStats[0]?.value || "Audited"}
                </span>
                <Link
                  href="/portfolio"
                  className="text-xs font-semibold text-slate-800 hover:text-emerald-800 inline-flex items-center gap-1"
                >
                  <span>Evidence</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
