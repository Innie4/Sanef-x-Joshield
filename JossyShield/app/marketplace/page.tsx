import React from "react";
import MarketplaceWizard from "@/components/MarketplaceWizard";
import { Shield, Clock, FileCheck2, HelpCircle } from "lucide-react";

export default function MarketplacePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold px-3 py-1 rounded bg-blue-950/60 border border-blue-800/40">
          CENTRAL REQUISITION & MARKETPLACE
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Service Request & Live Quotation Portal
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Configure security personnel headcount, facility locations, and consultation requirements. 
          Your formal requisition is logged directly into the Central Operations Command with an instantaneous tracking reference ID.
        </p>
      </div>

      {/* Interactive Wizard */}
      <MarketplaceWizard />

      {/* SLA and Process Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-900">
        <div className="p-6 rounded-2xl bg-[#0b0e14] border border-slate-800 space-y-2">
          <Clock className="w-5 h-5 text-blue-400" />
          <h4 className="text-sm font-bold text-white">4-Hour Response SLA</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every submitted marketplace request triggers an alert in the central operations console. A dedicated deployment specialist contacts you within 4 hours.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0b0e14] border border-slate-800 space-y-2">
          <FileCheck2 className="w-5 h-5 text-blue-400" />
          <h4 className="text-sm font-bold text-white">Custom Tactical Quotation</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Receive a formal PDF service agreement, complete with insurance indemnities, guard rotation schedules, and clear cost transparent breakdowns.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0b0e14] border border-slate-800 space-y-2">
          <Shield className="w-5 h-5 text-blue-400" />
          <h4 className="text-sm font-bold text-white">Rapid Deployment Roster</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Emergency and short-notice deployments can be mobilized in as little as 24 hours from contract confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}
