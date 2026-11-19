import React from "react";
import Link from "next/link";
import { Shield, Award, Users, CheckCircle, ArrowRight, Target, Lock } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold px-3 py-1 rounded bg-blue-950/60 border border-blue-800/40">
          ORGANIZATION PROFILE & MISSION
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Elite Defense Craft. Grounded in Rigorous Integrity.
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Founded to bridge the critical gap between legacy security guard contractors and modern 
          hybrid threat environments, JossyShield Security Services provides institutions with 
          uncompromising protection, proactive threat auditing, and a military-grade personnel standard.
        </p>
      </div>

      {/* Mission / Vision / Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-2xl p-7 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Our Mission</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            To safeguard human life, enterprise assets, and critical commercial infrastructure by deploying 
            disciplined, technologically empowered security professionals and continuous intelligence-led risk management.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-7 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Our Vision</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            To set the benchmark for commercial security excellence across West Africa, recognized for rapid armed response, 
            zero-compromise integrity, and an elite talent pool ready on 24 hours notice.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-7 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Our Standards</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Strict adherence to NSCDC licensing, ISO 27001 physical security guidelines, voluntary principles on security and human rights, 
            and continuous tactical retraining.
          </p>
        </div>
      </div>

      {/* Leadership & Credentials */}
      <div id="leadership" className="glass-panel rounded-3xl p-8 sm:p-12 space-y-8">
        <div>
          <span className="text-xs font-mono uppercase text-blue-400">COMMAND & OPERATIONAL LEADERSHIP</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Governed by Seasoned Defense Professionals
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-[#0c1017] border border-slate-800 space-y-2">
            <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/40 flex items-center justify-center font-bold text-base">
              JU
            </div>
            <h4 className="text-base font-bold text-white">Col. J. Udoh (Rtd.)</h4>
            <p className="text-xs font-mono text-blue-400">Chief Executive & Founder</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              26+ years active command in military intelligence, counter-insurgency doctrine, and industrial facility defense.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0c1017] border border-slate-800 space-y-2">
            <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/40 flex items-center justify-center font-bold text-base">
              MB
            </div>
            <h4 className="text-base font-bold text-white">Capt. Marcus Briggs</h4>
            <p className="text-xs font-mono text-blue-400">Director of Field Operations</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Former Special Boat Service operative specializing in maritime logistics protection, armed convoy escort, and quick reaction tactics.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0c1017] border border-slate-800 space-y-2">
            <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/40 flex items-center justify-center font-bold text-base">
              EA
            </div>
            <h4 className="text-base font-bold text-white">Evelyn Alabi, CPP</h4>
            <p className="text-xs font-mono text-blue-400">Head of Talent & Vetting Academy</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Certified Protection Professional overseeing our 4-stage background screening, biometric auditing, and security personnel training curricula.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            Learn more about our operational protocols or request a tailored defense consultation.
          </p>
          <Link
            href="/marketplace"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-6 py-3 rounded-lg shadow-lg shadow-blue-600/25"
          >
            <span>Request Defense Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
