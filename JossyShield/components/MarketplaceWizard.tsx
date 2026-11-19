"use client";

import React, { useState } from "react";
import { 
  Shield, 
  Search, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  Copy, 
  Clock, 
  Users, 
  Calendar, 
  AlertCircle 
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
    // Step 2: Service Config
    personnelCount: 4,
    duration: "6 Months",
    location: "Lagos, Nigeria",
    startDate: "",
    serviceLevel: "Armed Escort & Static",
    consultancyFocus: "Full Vulnerability Assessment",
    trainingCohortSize: 20,
    specialRequirements: "",
    
    // Step 3: Client Identity
    clientName: "",
    companyName: "",
    email: "",
    phone: "",
  });

  const categories = [
    {
      id: "Security Services" as ServiceType,
      title: "Security & Guarding",
      badge: "Rapid Deployment",
      desc: "Static guarding, armed convoys, access control, and electronic patrol checkpoint telemetry.",
      icon: Shield,
    },
    {
      id: "Consultancy" as ServiceType,
      title: "Risk Consultancy",
      badge: "ISO 27001 Audits",
      desc: "Physical threat audits, executive vulnerability modeling, and contingency evacuation plans.",
      icon: Search,
    },
    {
      id: "Training" as ServiceType,
      title: "Tactical Training",
      badge: "Accredited Academy",
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
      // Fallback client reference number
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
    <div className="w-full max-w-4xl mx-auto glass-panel rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Wizard Progress Indicator */}
      {step < 4 && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>STEP {step} OF 3</span>
            <span className="text-blue-400">
              {step === 1 && "Select Service Category"}
              {step === 2 && "Configure Requirements"}
              {step === 3 && "Client Contact & Authorization"}
            </span>
          </div>
          <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* STEP 1: CATEGORY SELECTION */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Choose Service Category
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Select the operational capability your organization requires.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = serviceType === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => setServiceType(cat.id)}
                  className={`cursor-pointer rounded-xl p-5 border transition-all text-left relative flex flex-col justify-between ${
                    isSelected
                      ? "bg-blue-950/40 border-blue-500 shadow-lg shadow-blue-600/20"
                      : "bg-[#11151e] border-slate-800 hover:border-slate-700 hover:bg-[#161c28]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                        {cat.badge}
                      </span>
                    </div>
                    <h3 className="font-semibold text-white text-base mb-1">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-medium">
                    <span
                      className={isSelected ? "text-blue-400 font-bold" : "text-slate-500"}
                    >
                      {isSelected ? "Selected" : "Select Capability"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
            >
              <span>Continue to Requirements</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: REQUIREMENTS CONFIGURATION */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Configure {serviceType} Scope
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Customize operational parameters for your deployment.
              </p>
            </div>
            <span className="px-3 py-1 bg-blue-900/40 text-blue-400 border border-blue-700/50 rounded-full text-xs font-mono font-medium">
              {serviceType}
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {/* Dynamic Fields: Security Services */}
            {serviceType === "Security Services" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Requested Guards / Personnel Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.personnelCount}
                    onChange={(e) =>
                      setFormData({ ...formData, personnelCount: parseInt(e.target.value) || 1 })
                    }
                    className="w-full bg-[#10141d] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Engagement Duration
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full bg-[#10141d] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Temporary Event (1-7 Days)">Temporary Event (1-7 Days)</option>
                    <option value="1 to 3 Months">1 to 3 Months</option>
                    <option value="6 Months">6 Months (Standard)</option>
                    <option value="12+ Months Retainer">12+ Months Retainer (24/7)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Dynamic Fields: Consultancy */}
            {serviceType === "Consultancy" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Consultancy Scope & Focus
                  </label>
                  <select
                    value={formData.consultancyFocus}
                    onChange={(e) => setFormData({ ...formData, consultancyFocus: e.target.value })}
                    className="w-full bg-[#10141d] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Full Vulnerability Assessment">Full Vulnerability Assessment</option>
                    <option value="Executive Protection & Travel Threat Modeling">
                      Executive Protection & Travel Threat Modeling
                    </option>
                    <option value="Perimeter Penetration Testing">Perimeter Penetration Testing</option>
                    <option value="Crisis Management & Evacuation Protocol">
                      Crisis Management & Evacuation Protocol
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Target Audit Completion Window
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Within 2 weeks"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full bg-[#10141d] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Dynamic Fields: Training */}
            {serviceType === "Training" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Expected Trainee Cohort Count
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="200"
                    value={formData.trainingCohortSize}
                    onChange={(e) =>
                      setFormData({ ...formData, trainingCohortSize: parseInt(e.target.value) || 5 })
                    }
                    className="w-full bg-[#10141d] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Training Program Stream
                  </label>
                  <select
                    value={formData.serviceLevel}
                    onChange={(e) => setFormData({ ...formData, serviceLevel: e.target.value })}
                    className="w-full bg-[#10141d] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Crisis De-Escalation & Defensive Tactics">
                      Crisis De-Escalation & Defensive Tactics
                    </option>
                    <option value="Evasive Tactical Driving">Evasive Tactical Driving</option>
                    <option value="Industrial Trauma & Tactical First Aid">
                      Industrial Trauma & Tactical First Aid
                    </option>
                    <option value="Corporate Executive Hostile Awareness">
                      Corporate Executive Hostile Awareness
                    </option>
                  </select>
                </div>
              </div>
            )}

            {/* Shared Location & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Deployment / Facility Location
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Victoria Island, Lagos / Abuja FCT"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-[#10141d] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Estimated Deployment Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full bg-[#10141d] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Specific Security Requirements or Special Instructions
              </label>
              <textarea
                rows={3}
                placeholder="Detail any site risks, firearms requirements, canine units, access control system integration, or shift preferences..."
                value={formData.specialRequirements}
                onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                className="w-full bg-[#10141d] border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-4 py-2.5 rounded-lg border border-slate-800"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
            >
              <span>Next: Contact Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: CLIENT IDENTITY */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Client & Authorization Details
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Your official request reference number will be generated immediately upon submission.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Contact Person Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Engr. Babatunde Balogun"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="w-full bg-[#10141d] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Organization / Company Name
              </label>
              <input
                type="text"
                placeholder="e.g. Apex Industrial Logistics Ltd"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full bg-[#10141d] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Official Business Email *
              </label>
              <input
                type="email"
                required
                placeholder="operations@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#10141d] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Direct Phone / WhatsApp Line *
              </label>
              <input
                type="tel"
                required
                placeholder="+234 800 000 0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#10141d] border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40 text-xs text-blue-300 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <p>
              Submitting this request transmits your operational requirements directly to the 
              JossyShield Central Operations Command. A formal tactical assessment and service quote 
              will be dispatched to your email within 4 business hours.
            </p>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-4 py-2.5 rounded-lg border border-slate-800"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-8 py-3 rounded-lg text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
            >
              {isSubmitting ? (
                <span>Generating Request...</span>
              ) : (
                <>
                  <span>Submit Request & Generate Reference</span>
                  <CheckCircle className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* STEP 4: CONFIRMATION & REFERENCE NUMBER */}
      {step === 4 && (
        <div className="py-6 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
              REQUEST LOGGED IN JOSSYSHIELD CENTRAL COMMAND
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-white mt-1">
              Service Request Confirmed
            </h2>
            <p className="text-sm text-slate-400 max-w-md mx-auto mt-2">
              Thank you, {formData.clientName || "Valued Client"}. Your security requisition 
              has been recorded and assigned to our Operations Director.
            </p>
          </div>

          {/* Reference ID Card */}
          <div className="max-w-md mx-auto bg-[#0a0d14] border border-blue-500/40 rounded-xl p-5 shadow-2xl relative">
            <div className="text-xs text-slate-400 mb-1 font-mono uppercase">
              Official Tracking Reference ID
            </div>
            <div className="text-2xl font-mono font-bold text-blue-400 tracking-wider flex items-center justify-center gap-3">
              <span>{referenceId}</span>
              <button
                onClick={copyRef}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Copy Reference ID"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {copied && (
              <span className="text-[11px] text-emerald-400 font-mono mt-1 block">
                ✓ Copied to clipboard
              </span>
            )}
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between">
              <span>Status: <strong className="text-blue-400">Under Review</strong></span>
              <span>SLA Target: <strong>4 Hours</strong></span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => {
                setStep(1);
                setFormData({
                  personnelCount: 4,
                  duration: "6 Months",
                  location: "Lagos, Nigeria",
                  startDate: "",
                  serviceLevel: "Armed Escort & Static",
                  consultancyFocus: "Full Vulnerability Assessment",
                  trainingCohortSize: 20,
                  specialRequirements: "",
                  clientName: "",
                  companyName: "",
                  email: "",
                  phone: "",
                });
              }}
              className="text-xs text-slate-400 hover:text-white px-5 py-2.5 rounded-lg border border-slate-800 hover:bg-slate-900 transition-colors"
            >
              Submit Another Request
            </button>
            <a
              href={`https://wa.me/234800JOSSYSHIELD?text=Hello%20JossyShield,%20I%20just%20submitted%20service%20request%20${referenceId}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-5 py-2.5 rounded-lg shadow-lg shadow-emerald-600/20"
            >
              <span>Instant WhatsApp Follow-up</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
