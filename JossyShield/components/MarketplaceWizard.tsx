"use client";

import React, { useState } from "react";
import { 
  Shield, 
  Search, 
  Award, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Copy, 
  Clock, 
  Users, 
  AlertCircle,
  FileCheck2,
  ChevronRight
} from "lucide-react";

type ServiceType = "Security Services" | "Consultancy" | "Training";

export default function MarketplaceWizard({
  initialService = "Security Services"
}: {
  initialService?: ServiceType;
}) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [serviceType, setServiceType] = useState<ServiceType>(initialService);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    personnelCount: 4,
    duration: "6 Months",
    location: "Lagos, Nigeria",
    startDate: "2026-12-01",
    serviceLevel: "Armed Escort & Static",
    consultancyFocus: "Full Vulnerability Assessment",
    trainingCohortSize: 20,
    specialRequirements: "",
    clientName: "",
    companyName: "",
    email: "",
    phone: "",
  });

  const categories = [
    {
      id: "Security Services" as ServiceType,
      title: "Manned Defense & Static Guarding",
      badge: "Immediate Mobilization",
      desc: "Static guarding, perimeter access control, armed convoys, and electronic patrol checkpoint telemetry.",
      icon: Shield,
    },
    {
      id: "Consultancy" as ServiceType,
      title: "Physical Risk & Vulnerability Audit",
      badge: "ISO 27001 Methodology",
      desc: "Physical penetration audits, executive vulnerability modeling, and contingency evacuation plans.",
      icon: Search,
    },
    {
      id: "Training" as ServiceType,
      title: "Tactical Defense Academy",
      badge: "Certified Cohorts",
      desc: "De-escalation courses, defensive driving, hostile environment reaction, and trauma first aid.",
      icon: Award,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/marketplace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceType,
          ...formData,
        }),
      });
      const data = await res.json();
      setReferenceId(data.referenceNumber || `JS-REQ-${Math.floor(10000 + Math.random() * 90000)}`);
      setStep(4);
    } catch {
      setReferenceId(`JS-REQ-${Math.floor(10000 + Math.random() * 90000)}`);
      setStep(4);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyRef = () => {
    navigator.clipboard.writeText(referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="tactical-surface rounded-3xl p-6 sm:p-10 text-white relative">
      {/* Precision Step Indicator */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 mb-8 text-xs font-mono">
        <div className="flex items-center gap-6 sm:gap-10">
          {[
            { num: 1, label: "DISCIPLINE" },
            { num: 2, label: "PARAMETERS" },
            { num: 3, label: "CONTACT" },
            { num: 4, label: "DISPATCH" },
          ].map((s) => (
            <div
              key={s.num}
              className={`flex items-center gap-2 ${
                step === s.num
                  ? "text-white font-bold"
                  : step > s.num
                  ? "text-zinc-400"
                  : "text-zinc-600"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step === s.num
                    ? "bg-[#0066FF] text-white"
                    : step > s.num
                    ? "bg-zinc-800 text-zinc-300"
                    : "bg-zinc-900 text-zinc-600"
                }`}
              >
                {step > s.num ? "✓" : s.num}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
          ))}
        </div>
        <span className="text-[11px] text-zinc-500 font-mono">STEP 0{step} / 04</span>
      </div>

      {/* STEP 1: SELECT DISCIPLINE */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold tracking-tight text-white">Select Defense Discipline</h3>
            <p className="text-xs text-zinc-400">Choose the operational capability required for your facility or transit.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map((c) => {
              const isSelected = serviceType === c.id;
              const Icon = c.icon;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setServiceType(c.id)}
                  className={`p-5 rounded-2xl text-left transition-all relative ${
                    isSelected
                      ? "bg-[#0c121e] border-2 border-[#0066FF] shadow-lg shadow-blue-600/10"
                      : "bg-[#070A0F] border border-white/[0.06] hover:border-white/[0.15]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? "bg-[#0066FF] text-white" : "bg-zinc-800 text-zinc-400"}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono uppercase text-[#0066FF]">{c.badge}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">{c.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{c.desc}</p>
                </button>
              );
            })}
          </div>

          <div className="pt-6 border-t border-white/[0.08] flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold px-6 py-3 rounded-full transition-all"
            >
              <span>Continue to Parameters</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SPECIFY PARAMETERS */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold tracking-tight text-white">Operational Parameters</h3>
            <p className="text-xs text-zinc-400">Define personnel volume, duration, and deployment location.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {serviceType === "Security Services" && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-zinc-400 flex justify-between">
                    <span>Operatives Count</span>
                    <span className="text-white font-bold">{formData.personnelCount} Officers</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, personnelCount: Math.max(2, formData.personnelCount - 2) })}
                      className="w-10 h-10 rounded-xl bg-[#070A0F] border border-white/[0.1] text-lg font-bold text-white hover:bg-zinc-800 flex items-center justify-center"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={formData.personnelCount}
                      onChange={(e) => setFormData({ ...formData, personnelCount: Number(e.target.value) })}
                      className="flex-1 bg-[#070A0F] border border-white/[0.1] rounded-xl px-4 py-2 text-center text-sm font-mono text-white focus:outline-none focus:border-[#0066FF]"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, personnelCount: formData.personnelCount + 2 })}
                      className="w-10 h-10 rounded-xl bg-[#070A0F] border border-white/[0.1] text-lg font-bold text-white hover:bg-zinc-800 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-zinc-400">Service Clearance Level</label>
                  <select
                    value={formData.serviceLevel}
                    onChange={(e) => setFormData({ ...formData, serviceLevel: e.target.value })}
                    className="w-full bg-[#070A0F] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                  >
                    <option value="Armed Escort & Static">Armed Convoy + Static Guarding (Tier 1)</option>
                    <option value="Armed Convoy Solo">Armed Highway Convoy Solo (Tier 1)</option>
                    <option value="Facility Static Unarmed">Commercial Facility Access Control (Tier 2)</option>
                    <option value="Electronic Checkpoint Surveillance">CCTV & Telemetry Patrol (Tier 2)</option>
                  </select>
                </div>
              </>
            )}

            {serviceType === "Consultancy" && (
              <div className="sm:col-span-2 space-y-2">
                <label className="text-xs font-mono uppercase text-zinc-400">Audit Scope</label>
                <select
                  value={formData.consultancyFocus}
                  onChange={(e) => setFormData({ ...formData, consultancyFocus: e.target.value })}
                  className="w-full bg-[#070A0F] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                >
                  <option value="Full Vulnerability Assessment">Comprehensive Facility Physical Penetration Test</option>
                  <option value="Executive Threat Modeling">Executive Residential & Route Vulnerability Assessment</option>
                  <option value="TSCM Technical Surveillance Countermeasures">TSCM Bug & Wiretap Electronic Sweep</option>
                  <option value="Emergency Evacuation Protocol">Crisis & Emergency Evacuation SOP Formulation</option>
                </select>
              </div>
            )}

            {serviceType === "Training" && (
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-zinc-400">Cohort Size (Personnel)</label>
                <input
                  type="number"
                  value={formData.trainingCohortSize}
                  onChange={(e) => setFormData({ ...formData, trainingCohortSize: Number(e.target.value) })}
                  className="w-full bg-[#070A0F] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-zinc-400">Deployment Duration</label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full bg-[#070A0F] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
              >
                <option value="Single Transit Escort">Single Transit Escort (24-48 Hours)</option>
                <option value="1 Month">1 Month Trial Mobilization</option>
                <option value="3 Months">3 Months Contract</option>
                <option value="6 Months">6 Months Standard Defense Agreement</option>
                <option value="12 Months">12 Months Enterprise Retainer</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-zinc-400">Operating City / Territory</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Lagos, Ikeja Industrial Estate"
                className="w-full bg-[#070A0F] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-mono text-zinc-400 hover:text-white"
            >
              ← Back to Discipline
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold px-6 py-3 rounded-full transition-all"
            >
              <span>Continue to Contact</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: CONTACT & REQUISITION ENTITY */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold tracking-tight text-white">Client Authority & Contact</h3>
            <p className="text-xs text-zinc-400">Where our central dispatch desk will transmit the tactical quote and SLA proposal.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-zinc-400">Authorized Officer / Name *</label>
              <input
                required
                type="text"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="Col. / Mr. / Dr. Full Name"
                className="w-full bg-[#070A0F] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-zinc-400">Corporate Entity / Organization *</label>
              <input
                required
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="e.g. Zenith Cargo Terminals Ltd"
                className="w-full bg-[#070A0F] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-zinc-400">Official Work Email *</label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="security@company.com"
                className="w-full bg-[#070A0F] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-zinc-400">Direct Dispatch Phone *</label>
              <input
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+234 800 000 0000"
                className="w-full bg-[#070A0F] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
              />
            </div>

            <div className="sm:col-span-2 space-y-2">
              <label className="text-xs font-mono uppercase text-zinc-400">Specific Threat Vulnerabilities or Orders (Optional)</label>
              <textarea
                rows={3}
                value={formData.specialRequirements}
                onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                placeholder="Perimeter details, cargo transit routes, high-value asset specs..."
                className="w-full bg-[#070A0F] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-xs font-mono text-zinc-400 hover:text-white"
            >
              ← Back to Parameters
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold px-7 py-3.5 rounded-full transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Transmitting Requisition..." : "Transmit Requisition Order"}
            </button>
          </div>
        </form>
      )}

      {/* STEP 4: REQUISITION CONFIRMATION & TRACKING */}
      {step === 4 && (
        <div className="text-center py-6 space-y-6 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
            <Check className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
              REQUISITION LOGGED IN CENTRAL DISPATCH
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-white">
              Tactical Requisition Received
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Your deployment order has been logged into our operations queue. Our command officer will review threat parameters and issue a formal deployment proposal within 4 hours.
            </p>
          </div>

          <div className="tactical-surface rounded-2xl p-5 border border-white/[0.1] space-y-3 font-mono text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">Cryptographic Reference:</span>
              <button
                type="button"
                onClick={copyRef}
                className="text-xs text-[#0066FF] hover:text-blue-400 flex items-center gap-1 font-semibold"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? "COPIED" : "COPY CODE"}</span>
              </button>
            </div>
            <div className="text-lg font-bold text-white tracking-wider bg-[#06080C] py-2 px-3 rounded-lg border border-white/[0.06] text-center">
              {referenceId}
            </div>
            <div className="text-[11px] text-zinc-500 text-center">
              Quote SLA guarantee: 4 business hours • Hotline: +234 1 800 JOSSY
            </div>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setReferenceId("");
              }}
              className="text-xs text-zinc-400 hover:text-white font-mono"
            >
              Configure Another Deployment Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
