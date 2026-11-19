import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, Users, Target, CheckCircle2, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold px-3 py-1 rounded bg-emerald-100">
          ABOUT SAFE NEIGHBORHOOD FOUNDATION
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Empowering Grassroots Safety, Lighting Corridors & Mediating Peace
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Safe Neighborhood Foundation (SANEF) was incorporated to transform vulnerable urban and peri-urban 
          neighborhoods into secure, flourishing communities. We reject superficial gestures; our interventions 
          rely on empirical field research, solar hardware deployment, and grassroots peace circles.
        </p>
      </div>

      {/* Mission / Vision / Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="civic-card rounded-2xl p-7 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Our Mission</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            To drastically eliminate night-time vulnerability, reduce youth gang recruitment, and foster resilient 
            community cohesion through solar infrastructure, conflict mediation, and open evidence archives.
          </p>
        </div>

        <div className="civic-card rounded-2xl p-7 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Our Vision</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            An African urban landscape where every woman, child, and worker can walk freely at night without fear, 
            and where neighborhood disputes are resolved through mediation rather than violence.
          </p>
        </div>

        <div className="civic-card rounded-2xl p-7 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Our Accountability</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every naira and dollar donated to SANEF is logged in our public accountability ledger. All project outcomes 
            are independently audited with downloadable PDF reports in our Evidence Archive.
          </p>
        </div>
      </div>

      {/* Focus Areas */}
      <div className="civic-card rounded-3xl p-8 sm:p-12 space-y-6">
        <div>
          <span className="text-xs font-mono uppercase text-emerald-800">CORE INTERVENTION STRATEGIES</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            How SANEF Operates on the Ground
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-600">
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900">1. Autonomous Solar Safe Corridors</h4>
            <p className="leading-relaxed">
              We identify pitch-black school routes, transit walkways, and markets, deploying heavy-duty solar streetlights 
              with emergency SOS alarm buttons maintained by trained neighborhood youths.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900">2. Restorative Youth Mediation</h4>
            <p className="leading-relaxed">
              Instead of criminalizing youth conflict, we provide certified mediation circles, psychological counseling, 
              and marketable digital skills training to desensitize violence.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900">3. Neighborhood Watch Radio Backbone</h4>
            <p className="leading-relaxed">
              We connect accredited voluntary neighborhood watch associations with encrypted communication radios, 
              trauma first-aid packs, and direct liaison to municipal emergency services.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900">4. Open Data & Impact Auditing</h4>
            <p className="leading-relaxed">
              We publish crime telemetry, pre- and post-intervention audits, and financial statements freely to the public, 
              providing research institutions with verifiable community data.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">Learn more about our verified outcomes.</p>
          <Link
            href="/portfolio"
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
          >
            <span>Explore Projects in the Archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
