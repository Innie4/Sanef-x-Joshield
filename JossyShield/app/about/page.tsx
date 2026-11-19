import React from "react";
import Link from "next/link";
import { Shield, Target, Award, ArrowUpRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-20">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-mono uppercase tracking-wider text-[#0066FF] font-semibold">
          Doctrine & Command Profile
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.03em] text-white">
          Defense Craft. Grounded in Absolute Integrity.
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
          Founded to eliminate vulnerabilities in commercial infrastructure and high-value transit, JossyShield provides corporations, diplomatic missions, and energy assets with disciplined, technological defense.
        </p>
      </div>

      {/* Mission / Vision / Standards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="tactical-surface rounded-3xl p-8 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/20 flex items-center justify-center">
            <Target className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">Our Mission</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            To eliminate perimeter risks and asset compromise by deploying rigorously screened, tactically trained security personnel backed by continuous central telemetry.
          </p>
        </div>

        <div className="tactical-surface rounded-3xl p-8 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/20 flex items-center justify-center">
            <Shield className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">Our Vision</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            To serve as the most trusted commercial defense partner in West Africa, renowned for zero-breach records, rapid dispatch, and transparent accountability.
          </p>
        </div>

        <div className="tactical-surface rounded-3xl p-8 space-y-3">
          <div className="w-8 h-8 rounded-lg bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/20 flex items-center justify-center">
            <Award className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">Our Standards</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Category A licensing from NSCDC, ISO 27001 physical security compliance, full background biometric audits, and mandatory continuous retraining.
          </p>
        </div>
      </div>

      {/* Leadership & Command Staff */}
      <div id="leadership" className="tactical-surface rounded-3xl p-8 sm:p-12 space-y-8">
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-[#0066FF] font-semibold">
            Command Leadership
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Governed by Seasoned Defense Professionals
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#070A0F] border border-white/[0.06] rounded-2xl p-6 space-y-2">
            <div className="w-10 h-10 rounded-full bg-zinc-800 text-white font-bold text-xs flex items-center justify-center font-mono">
              JU
            </div>
            <h4 className="text-base font-bold text-white">Col. J. Udoh (Rtd.)</h4>
            <p className="text-[11px] font-mono text-[#0066FF]">Chief Executive & Commander</p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              26+ years active military intelligence, counter-insurgency doctrine, and industrial facility defense.
            </p>
          </div>

          <div className="bg-[#070A0F] border border-white/[0.06] rounded-2xl p-6 space-y-2">
            <div className="w-10 h-10 rounded-full bg-zinc-800 text-white font-bold text-xs flex items-center justify-center font-mono">
              MB
            </div>
            <h4 className="text-base font-bold text-white">Capt. Marcus Briggs</h4>
            <p className="text-[11px] font-mono text-[#0066FF]">Director of Field Operations</p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Former Special Boat Service operative specializing in maritime transit security, armed convoys, and rapid intervention.
            </p>
          </div>

          <div className="bg-[#070A0F] border border-white/[0.06] rounded-2xl p-6 space-y-2">
            <div className="w-10 h-10 rounded-full bg-zinc-800 text-white font-bold text-xs flex items-center justify-center font-mono">
              EA
            </div>
            <h4 className="text-base font-bold text-white">Evelyn Alabi, CPP</h4>
            <p className="text-[11px] font-mono text-[#0066FF]">Head of Vetting Academy</p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Certified Protection Professional overseeing our multi-tier background screening, biometric audits, and crisis de-escalation curricula.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
