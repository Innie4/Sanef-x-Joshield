import React from "react";
import MarketplaceWizard from "@/components/MarketplaceWizard";
import { Clock, FileCheck2, Shield } from "lucide-react";

export default function MarketplacePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-mono uppercase tracking-wider text-[#0066FF] font-semibold">
          Requisition Terminal
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.03em] text-white">
          Tactical Requisition & Quoting Console
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
          Configure security operative headcount, territory coordinates, and threat scope. Your formal requisition is dispatched directly to the Central Command Desk with a cryptographic tracking reference.
        </p>
      </div>

      {/* Interactive Wizard */}
      <MarketplaceWizard />

      {/* SLA Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-white/[0.08]">
        <div className="tactical-surface rounded-2xl p-6 space-y-2">
          <Clock className="w-4 h-4 text-[#0066FF]" />
          <h4 className="text-sm font-bold text-white">4-Hour Response SLA</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Every submitted requisition triggers a high-priority alert in the operations console. A dedicated deployment officer issues a formal response within 4 hours.
          </p>
        </div>

        <div className="tactical-surface rounded-2xl p-6 space-y-2">
          <FileCheck2 className="w-4 h-4 text-[#0066FF]" />
          <h4 className="text-sm font-bold text-white">Transparent Service Agreement</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Receive a formal proposal complete with guard rotation schedules, radio frequency allocations, insurance indemnities, and clear billing.
          </p>
        </div>

        <div className="tactical-surface rounded-2xl p-6 space-y-2">
          <Shield className="w-4 h-4 text-[#0066FF]" />
          <h4 className="text-sm font-bold text-white">Immediate Dispatch Capability</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Emergency close protection and urgent static replacements can be deployed within 4 to 24 hours of confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}
