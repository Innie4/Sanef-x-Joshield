import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, Target, ArrowUpRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-20">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold">
          Charter & Mission Profile
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.03em] text-slate-950">
          Grassroots Safety. Solar Infrastructure. Mediated Peace.
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          Safe Neighborhood Foundation (SANEF) was incorporated under Nigerian CAMA 2020 NGO guidelines to eliminate predatory vulnerability in urban corridors through measurable environmental design, youth mediation academies, and connected community watch groups.
        </p>
      </div>

      {/* Mission / Vision / Accountability */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="monograph-surface rounded-3xl p-8 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
            <Target className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Our Mission</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            To eliminate pedestrian vulnerability along unlit corridors, divert at-risk youth from predatory cycles, and foster durable safety through verified evidence.
          </p>
        </div>

        <div className="monograph-surface rounded-3xl p-8 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Our Vision</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Urban neighborhoods across Nigeria where residents walk with dignity at night without fear, and disputes are de-escalated through certified mediation.
          </p>
        </div>

        <div className="monograph-surface rounded-3xl p-8 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
            <Heart className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Ledger Accountability</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every grant received is audited by external accountancy firms. All field hardware coordinates and expenditure records are published in our public Evidence Archive.
          </p>
        </div>
      </div>

      {/* Focus Strategies */}
      <div className="monograph-surface rounded-3xl p-8 sm:p-12 space-y-8">
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold">
            Operational Methodology
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            How SANEF Implements Sustainable Protection
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs text-slate-600">
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900">1. Autonomous Solar Safe Corridors</h4>
            <p className="leading-relaxed">
              We engineer high-efficiency solar lighting along high-risk school paths and market alleys. Units feature vandal-resistant enclosures and are maintained by local youth custodians.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900">2. Restorative Youth Mediation</h4>
            <p className="leading-relaxed">
              We operate dispute mediation circles, vocational training courses, and non-violence leadership academies to divert at-risk youth from gang structures.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900">3. Community Watch Communication Mesh</h4>
            <p className="leading-relaxed">
              We equip volunteer neighborhood watch groups with ruggedized UHF two-way transceivers, protective vests, and direct escalation protocols to police stations.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900">4. Empirical Audit Transparency</h4>
            <p className="leading-relaxed">
              We publish pre- and post-intervention incident reports and third-party audit dossiers openly for researchers, municipal authorities, and donors.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-mono">CAC/IT/NO: 148291 • SCUML REGISTERED</p>
          <Link
            href="/portfolio"
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1"
          >
            <span>Explore Evidence Archive</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
