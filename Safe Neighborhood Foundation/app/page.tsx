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
  BookOpen,
  Sparkles,
  Zap,
  CheckCircle2
} from "lucide-react";
import { SANEF_PROJECTS, SANEF_EVENTS, SANEF_PARTNERS, SANEF_CAMPAIGNS } from "@/lib/data";

export default function HomePage() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [pledgeAmount, setPledgeAmount] = useState(50);
  const [pledgeSent, setPledgeSent] = useState(false);

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
    <div className="relative overflow-hidden pt-28 pb-32 space-y-36">
      {/* Background Ambience */}
      <div className="absolute inset-0 civic-glow pointer-events-none" />

      {/* 1. HERO SECTION: ASYMMETRIC CIVIC BENTO SHOWCASE */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Mission Editorial Statement */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-xs font-semibold text-emerald-800 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-600 civic-beacon" />
              <span>CAC/IT/NO: 148291</span>
              <span className="text-slate-300">•</span>
              <span>100% AUDITED CIVIC SAFETY FOUNDATION</span>
            </div>

            <div className="space-y-5">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.035em] text-slate-950 leading-[1.06]">
                Lighting Every Street.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700">
                  Protecting Every Child.
                </span>
                <br />
                Building Safe Communities.
              </h1>

              <p className="max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Safe Neighborhood Foundation (SANEF) eliminates urban vulnerability through auditable public safety investments: solar safe corridors along unlit school paths, restorative youth mediation academies, and connected community watch radios.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center gap-2.5 bg-[#0D4A2B] hover:bg-[#14633B] text-white text-sm font-semibold px-7 py-4 rounded-full shadow-lg shadow-emerald-900/15 hover:shadow-emerald-900/25 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Support Our Mission (Donate)</span>
              </Link>

              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold px-6 py-4 rounded-full shadow-sm transition-all"
              >
                <span>Inspect Field Evidence Archive</span>
                <ArrowUpRight className="w-4 h-4 opacity-70" />
              </Link>
            </div>

            {/* Impact Metric Ribbon */}
            <div className="pt-8 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500">Night Crime</p>
                <p className="text-2xl font-bold text-slate-950 font-mono tracking-tight mt-1">-42.8%</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Audited police station data</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500">Solar Units</p>
                <p className="text-2xl font-bold text-emerald-800 font-mono tracking-tight mt-1">140 Beacons</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Installed & GPS-verified</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500">Mediators</p>
                <p className="text-2xl font-bold text-slate-950 font-mono tracking-tight mt-1">320 Youth</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Certified in de-escalation</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500">Daily Footfall</p>
                <p className="text-2xl font-bold text-emerald-800 font-mono tracking-tight mt-1">65,000+</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Protected pedestrians daily</p>
              </div>
            </div>
          </div>

          {/* Right Column: Dribbble-Grade Interactive Bento Impact Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[32px] p-[1px] bg-gradient-to-b from-emerald-300/60 via-slate-200/60 to-transparent shadow-xl shadow-slate-200/60">
              <div className="bg-white/95 backdrop-blur-2xl rounded-[31px] p-6 sm:p-8 space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 civic-beacon" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                      Active Community Campaign
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                    MATCHED 1:1
                  </span>
                </div>

                {/* Campaign Progress Card */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-emerald-800 font-semibold">
                      FOCUS: AJEGUNLE & MUSHIN
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      Solar Safe Corridors for 20 Primary Schools
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Funding 50 additional anti-theft solar street lamps along vulnerable school transit alleyways.
                    </p>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-baseline font-mono text-xs">
                      <div>
                        <span className="text-base font-extrabold text-emerald-800">$45,200</span>
                        <span className="text-slate-400 text-[11px]"> raised</span>
                      </div>
                      <span className="text-slate-500 font-medium">Goal: $60,000</span>
                    </div>

                    <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-[#0D4A2B] h-full rounded-full transition-all duration-500" style={{ width: "75.3%" }} />
                    </div>

                    <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                      <span>342 verified community donors</span>
                      <span className="font-bold text-slate-900">75% Complete</span>
                    </div>
                  </div>

                  {/* 1-Click Interactive Donation Presets */}
                  <div className="space-y-2 pt-1">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                      Quick Grant Pledge
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                      {[25, 50, 100, 250].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setPledgeAmount(amt);
                            setPledgeSent(false);
                          }}
                          className={`py-2 px-1 rounded-xl text-xs font-mono font-bold transition-all ${
                            pledgeAmount === amt
                              ? "bg-[#0D4A2B] text-white shadow-sm"
                              : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80"
                          }`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pledge Action Button */}
                  <Link
                    href={`/donate?amount=${pledgeAmount}`}
                    className="w-full flex items-center justify-center gap-2 bg-[#0D4A2B] hover:bg-[#14633B] text-white text-xs font-semibold py-3.5 rounded-xl shadow-md shadow-emerald-900/15 transition-all hover:scale-[1.01]"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>Contribute ${pledgeAmount} to Active Corridors</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE THREE CIVIC PILLARS: DRIBBBLE BENTO GRID */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-mono text-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>INTERVENTION METHODOLOGY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-slate-950">
            Three Pillars of Durable Community Safety
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Sustainable urban peace is not achieved by policing alone. SANEF combines environmental lighting design, youth non-violence mediation, and direct community communication infrastructure.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Card 1: Solar Corridors (Span 2 cols on md) */}
          <div className="md:col-span-2 civic-bento p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
                  PILLAR 01 • ENVIRONMENTAL DESIGN
                </span>
                <span className="text-xs font-mono text-slate-500">140 BEACONS INSTALLED</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Autonomous Solar Safe Corridors
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                We engineer heavy-duty, tamper-resistant solar streetlights equipped with lithium iron phosphate batteries along unlit pedestrian walkways, bridges, and primary school corridors.
              </p>
            </div>

            <div className="space-y-4 border-t border-slate-100 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>3,000-lumen LiFePO4 autonomous fixtures with 48h battery reserve</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Quarterly maintenance managed by neighborhood youth stipendiaries</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-emerald-800 transition-colors"
                >
                  <span>Explore Corridor Case Studies</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Restorative Youth Mediation */}
          <div className="civic-bento p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
                  PILLAR 02 • HUMAN CAPACITY
                </span>
                <span className="text-xs font-mono text-emerald-700">CERTIFIED</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Youth Mediation & Non-Violence Academies
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A 12-week intensive behavioral program diverting at-risk youth from gang structures into certified dispute mediation circles and technical vocational skills.
              </p>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-emerald-800 transition-colors"
              >
                <span>Read Academy Impact</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Bento Card 3: Community Watch Radio Backbone */}
          <div className="civic-bento p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
                  PILLAR 03 • RAPID ALERT
                </span>
                <span className="text-xs font-mono text-slate-500">UHF 440MHz</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Community Watch Communication Network
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Equipping voluntary neighborhood watch associations with licensed two-way radios, reflective high-visibility kits, and direct police station emergency hotlines.
              </p>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-emerald-800 transition-colors"
              >
                <span>Inspect Watch Equipment</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Bento Card 4: Verified Evidence Accountability (Span 2 cols on md) */}
          <div className="md:col-span-2 civic-bento p-8 flex flex-col justify-between space-y-6 bg-gradient-to-r from-emerald-50/50 to-white">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                  AUDITED TRANSPARENCY
                </span>
                <span className="text-xs font-mono text-slate-600">INDEPENDENT ANNUAL AUDIT</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                Public Accountability & Open Evidence
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                Every project milestone, solar beacon geo-coordinate, and grant disbursement is recorded in our open archive with signed affidavits from community development committees.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200/80 pt-4 text-xs font-mono text-slate-600">
              <span>72% HARDWARE • 18% YOUTH STIPENDS • 10% AUDIT</span>
              <span className="text-emerald-800 font-bold">100% AUDIT RECORD COMPLIANT</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE FIELD EVIDENCE INSPECTOR */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="civic-bento p-8 sm:p-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold">
                Live Field Intervention Audit
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mt-1">
                Inspect Ground Truth & Verified Sign-Offs
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">CASE #2026-NIG</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Project List Selector */}
            <div className="lg:col-span-5 space-y-2.5">
              {activeInterventions.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveProjectIndex(idx)}
                  className={`w-full p-4 rounded-2xl text-left transition-all text-xs flex items-center justify-between ${
                    activeProjectIndex === idx
                      ? "bg-[#0D4A2B] text-white font-semibold shadow-md shadow-emerald-900/15"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80"
                  }`}
                >
                  <div className="space-y-0.5 truncate pr-2">
                    <p className="font-bold text-sm truncate">{item.title}</p>
                    <p className={`text-[11px] font-mono ${activeProjectIndex === idx ? "text-emerald-200" : "text-slate-500"}`}>
                      {item.location}
                    </p>
                  </div>
                  <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${activeProjectIndex === idx ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"}`}>
                    {item.tag}
                  </span>
                </button>
              ))}
            </div>

            {/* Dossier Output Box */}
            <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-mono uppercase text-slate-500">Verified Location:</span>
                <span className="font-mono text-xs font-bold text-slate-900">{currentIntervention.coords}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-mono uppercase text-slate-500">Commissioning Date:</span>
                <span className="font-mono text-xs font-semibold text-slate-800">{currentIntervention.installed}</span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-mono uppercase text-slate-500">Measured Outcome:</span>
                <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                  {currentIntervention.impact}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 leading-relaxed font-sans">
                <p className="font-mono uppercase text-[10px] text-slate-400">FIELD AUDIT REPORT</p>
                <p>{currentIntervention.summary}</p>
              </div>

              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>Sign-off: <strong className="text-slate-900">{currentIntervention.witness}</strong></span>
                <Link
                  href="/portfolio"
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1"
                >
                  <span>Download PDF Dossier</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ACTIVE COMMUNITY PROJECTS GRID */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
              Active Community Campaigns
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
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
              className="civic-bento p-7 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="text-emerald-800 font-semibold px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                    {p.category}
                  </span>
                  <span>{p.location}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {p.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-emerald-800 font-bold">
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
