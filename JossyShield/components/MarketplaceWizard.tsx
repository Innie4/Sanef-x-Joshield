"use client";

import React, { useState } from "react";
import {
  Shield,
  FileSearch,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Check,
} from "lucide-react";
import type { ServiceCategoryKey } from "@/lib/data";

const CATEGORIES: {
  key: ServiceCategoryKey;
  title: string;
  code: string;
  summary: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    key: "security",
    title: "Security Services",
    code: "CAT-01 · Deployment",
    summary: "Static commercial guarding, access control, patrol rosters, and transit escort.",
    icon: Shield,
  },
  {
    key: "consultancy",
    title: "Consultancy",
    code: "CAT-02 · Risk Audit",
    summary: "Physical site vulnerability assessments, CCTV blind-spot audits, and SOP design.",
    icon: FileSearch,
  },
  {
    key: "training",
    title: "Training",
    code: "CAT-03 · Academy",
    summary: "Guard certification drills, reception de-escalation, and travel safety workshops.",
    icon: GraduationCap,
  },
];

function SharpSelect({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (val: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative mt-1.5">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] py-2.5 pl-3.5 pr-9 text-[14px] text-[#0F172A] focus:border-[#0F172A] focus:bg-white focus:outline-none"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-[#475569]" />
    </div>
  );
}

export default function MarketplaceWizard({
  initialCategory = "security",
}: {
  initialCategory?: ServiceCategoryKey;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [category, setCategory] = useState<ServiceCategoryKey>(initialCategory);
  const [submitting, setSubmitting] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string>("");

  const [securityForm, setSecurityForm] = useState({
    nameOrOrg: "",
    phone: "",
    email: "",
    serviceType: "24/7 Static & Perimeter Guarding",
    location: "",
    personnelCount: "6",
    duration: "12 Months",
    startDate: "2026-12-01",
    requirements: "",
  });

  const [consultancyForm, setConsultancyForm] = useState({
    nameOrOrg: "",
    phone: "",
    email: "",
    consultancyType: "Physical Site Risk & Vulnerability Audit",
    location: "",
    securityConcern: "",
    engagementDate: "2026-12-05",
    details: "",
  });

  const [trainingForm, setTrainingForm] = useState({
    mode: "Organisation" as "Individual" | "Organisation",
    nameOrOrg: "",
    phone: "",
    email: "",
    trainingType: "Corporate Guard Refresher & Access Drill",
    traineeCount: "16",
    location: "",
    preferredDates: "2026-12-10",
    objectives: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const payload =
      category === "security"
        ? { category: "Security Services", ...securityForm }
        : category === "consultancy"
        ? { category: "Consultancy", ...consultancyForm }
        : { category: "Training", ...trainingForm };

    try {
      const res = await fetch("/api/marketplace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setReferenceNumber(data.referenceNumber || "JS-REQ-2026-0418");
      setStep(3);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* 3-Step Progress Indicator */}
      <div className="grid grid-cols-3 gap-2 rounded-[4px] border border-[#E2E8F0] bg-white p-2">
        {[
          { num: 1, label: "1. Select Service Category" },
          { num: 2, label: "2. Scope & Site Details" },
          { num: 3, label: "3. Reference Confirmation" },
        ].map((s) => {
          const active = step === s.num;
          const done = step > s.num;
          return (
            <button
              key={s.num}
              type="button"
              disabled={s.num === 3 && step < 3}
              onClick={() => {
                if (s.num < 3) setStep(s.num as 1 | 2);
              }}
              className={`rounded-[4px] px-3 py-2.5 text-left text-[12px] font-semibold transition-colors ${
                active
                  ? "bg-[#0F172A] text-white"
                  : done
                  ? "bg-[#F8FAFC] text-[#0F172A]"
                  : "text-[#64748B]"
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* STEP 1: SELECT SERVICE CATEGORY */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const selected = category === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setCategory(cat.key)}
                  className={`flex flex-col justify-between rounded-[4px] border p-6 text-left transition-colors ${
                    selected
                      ? "border-[#0F172A] bg-[#0F172A] text-white"
                      : "border-[#E2E8F0] bg-white text-[#0F172A] hover:border-[#0F172A]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-[12px] font-medium ${
                          selected ? "text-[#F59E0B]" : "text-[#475569]"
                        }`}
                      >
                        {cat.code}
                      </span>
                      <Icon
                        className={`h-5 w-5 ${selected ? "text-[#F59E0B]" : "text-[#0F172A]"}`}
                      />
                    </div>
                    <h2 className="mt-4 font-heading text-[24px] font-semibold">{cat.title}</h2>
                    <p
                      className={`mt-2 text-[14px] leading-relaxed ${
                        selected ? "text-[#CBD5E1]" : "text-[#475569]"
                      }`}
                    >
                      {cat.summary}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-current/15 pt-4 text-[12px] font-semibold">
                    {selected ? (
                      <span className="inline-flex items-center gap-1.5 rounded-[4px] bg-[#B45309] px-2.5 py-1 text-white">
                        <Check className="h-3.5 w-3.5" /> Selected Category
                      </span>
                    ) : (
                      <span>Select Category →</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 rounded-[4px] bg-[#B45309] px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#92400E]"
            >
              Continue to{" "}
              {category === "security"
                ? "Security Services Form"
                : category === "consultancy"
                ? "Consultancy Form"
                : "Training Form"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: DYNAMIC FORM BASED ON CATEGORY SELECTION */}
      {step === 2 && (
        <div className="rounded-[4px] border border-[#E2E8F0] bg-white p-6 sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#E2E8F0] pb-5">
            <div>
              <p className="font-mono text-[12px] font-medium text-[#B45309]">
                Step 2 of 3 · Dynamic Intake Form
              </p>
              <h2 className="mt-1 font-heading text-[26px] font-semibold text-[#0F172A]">
                {category === "security"
                  ? "Security Services Request"
                  : category === "consultancy"
                  ? "Security Consultancy Request"
                  : "Security Training Request"}
              </h2>
            </div>
            <div className="flex gap-1.5">
              {CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setCategory(c.key)}
                  className={`rounded-[4px] px-3 py-1.5 text-[12px] font-semibold ${
                    category === c.key
                      ? "bg-[#0F172A] text-white"
                      : "border border-[#E2E8F0] bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A]"
                  }`}
                >
                  {c.title}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {category === "security" && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Name / Organisation *
                  </label>
                  <input
                    required
                    type="text"
                    value={securityForm.nameOrOrg}
                    onChange={(e) => setSecurityForm({ ...securityForm, nameOrOrg: e.target.value })}
                    placeholder="e.g., Apex Maritime Logistics Ltd — Damilola Adelaja"
                    className="mt-1.5 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-[14px] text-[#0F172A] focus:border-[#0F172A] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Phone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    value={securityForm.phone}
                    onChange={(e) => setSecurityForm({ ...securityForm, phone: e.target.value })}
                    placeholder="+234 803 000 0000"
                    className="mt-1.5 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 font-mono text-[14px] focus:border-[#0F172A] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    value={securityForm.email}
                    onChange={(e) => setSecurityForm({ ...securityForm, email: e.target.value })}
                    placeholder="operations@company.ng"
                    className="mt-1.5 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-[14px] focus:border-[#0F172A] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Service Type *
                  </label>
                  <SharpSelect
                    value={securityForm.serviceType}
                    onChange={(val) => setSecurityForm({ ...securityForm, serviceType: val })}
                  >
                    <option>24/7 Static & Perimeter Guarding</option>
                    <option>Corporate Reception & Access Control</option>
                    <option>Executive & High-Value Transit Escort</option>
                    <option>Industrial Warehouse Gatehouse Control</option>
                    <option>Event Access & Perimeter Screening</option>
                  </SharpSelect>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Site Location *
                  </label>
                  <input
                    required
                    type="text"
                    value={securityForm.location}
                    onChange={(e) => setSecurityForm({ ...securityForm, location: e.target.value })}
                    placeholder="e.g., Victoria Island, Lagos"
                    className="mt-1.5 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-[14px] focus:border-[#0F172A] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Requested Personnel Count
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={securityForm.personnelCount}
                    onChange={(e) =>
                      setSecurityForm({ ...securityForm, personnelCount: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 font-mono text-[14px] focus:border-[#0F172A] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Contract Duration
                  </label>
                  <SharpSelect
                    value={securityForm.duration}
                    onChange={(val) => setSecurityForm({ ...securityForm, duration: val })}
                  >
                    <option>Short-Term / Event (1–14 Days)</option>
                    <option>3 Months</option>
                    <option>6 Months</option>
                    <option>12 Months</option>
                    <option>24 Months+</option>
                  </SharpSelect>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Preferred Start Date *
                  </label>
                  <input
                    required
                    type="date"
                    value={securityForm.startDate}
                    onChange={(e) => setSecurityForm({ ...securityForm, startDate: e.target.value })}
                    className="mt-1.5 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 font-mono text-[14px] focus:border-[#0F172A] focus:bg-white focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Site Requirements & Shift Notes *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={securityForm.requirements}
                    onChange={(e) =>
                      setSecurityForm({ ...securityForm, requirements: e.target.value })
                    }
                    placeholder="Describe gate count, shift hours, radio/CCTV setup, or access protocols..."
                    className="mt-1.5 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-[14px] focus:border-[#0F172A] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            )}

            {category === "consultancy" && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Name / Organisation *
                  </label>
                  <input
                    required
                    type="text"
                    value={consultancyForm.nameOrOrg}
                    onChange={(e) =>
                      setConsultancyForm({ ...consultancyForm, nameOrOrg: e.target.value })
                    }
                    placeholder="e.g., Zenith Diplomatic Advisory — Kemi Adesina"
                    className="mt-1.5 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Phone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    value={consultancyForm.phone}
                    onChange={(e) =>
                      setConsultancyForm({ ...consultancyForm, phone: e.target.value })
                    }
                    placeholder="+234 802 000 0000"
                    className="mt-1.5 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 font-mono text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    value={consultancyForm.email}
                    onChange={(e) =>
                      setConsultancyForm({ ...consultancyForm, email: e.target.value })
                    }
                    placeholder="security@organisation.org"
                    className="mt-1.5 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Consultancy Type *
                  </label>
                  <SharpSelect
                    value={consultancyForm.consultancyType}
                    onChange={(val) =>
                      setConsultancyForm({ ...consultancyForm, consultancyType: val })
                    }
                  >
                    <option>Physical Site Risk & Vulnerability Audit</option>
                    <option>Access Control & SOP Architecture</option>
                    <option>CCTV Coverage & Control Room Audit</option>
                    <option>Emergency Evacuation & Crisis Continuity Plan</option>
                  </SharpSelect>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Facility Location *
                  </label>
                  <input
                    required
                    type="text"
                    value={consultancyForm.location}
                    onChange={(e) =>
                      setConsultancyForm({ ...consultancyForm, location: e.target.value })
                    }
                    placeholder="e.g., Maitama District, Abuja"
                    className="mt-1.5 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Primary Security Concern *
                  </label>
                  <input
                    required
                    type="text"
                    value={consultancyForm.securityConcern}
                    onChange={(e) =>
                      setConsultancyForm({ ...consultancyForm, securityConcern: e.target.value })
                    }
                    placeholder="e.g., Rear perimeter blind spots, vendor access"
                    className="mt-1.5 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Preferred Engagement Date *
                  </label>
                  <input
                    required
                    type="date"
                    value={consultancyForm.engagementDate}
                    onChange={(e) =>
                      setConsultancyForm({ ...consultancyForm, engagementDate: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 font-mono text-[14px]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Scope Details & Facility Overview *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={consultancyForm.details}
                    onChange={(e) =>
                      setConsultancyForm({ ...consultancyForm, details: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-[14px]"
                  />
                </div>
              </div>
            )}

            {category === "training" && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Enrolment Type *
                  </label>
                  <div className="mt-1.5 grid grid-cols-2 gap-3">
                    {(["Organisation", "Individual"] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() =>
                          setTrainingForm({
                            ...trainingForm,
                            mode: m,
                            traineeCount: m === "Individual" ? "1" : trainingForm.traineeCount,
                          })
                        }
                        className={`rounded-[4px] border py-2.5 text-[13px] font-semibold ${
                          trainingForm.mode === m
                            ? "border-[#0F172A] bg-[#0F172A] text-white"
                            : "border-[#E2E8F0] bg-[#F8FAFC] text-[#475569]"
                        }`}
                      >
                        {m} Enrolment
                      </button>
                    ))}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    {trainingForm.mode === "Organisation" ? "Organisation & Coordinator Name *" : "Full Name *"}
                  </label>
                  <input
                    required
                    type="text"
                    value={trainingForm.nameOrOrg}
                    onChange={(e) => setTrainingForm({ ...trainingForm, nameOrOrg: e.target.value })}
                    className="mt-1.5 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Phone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    value={trainingForm.phone}
                    onChange={(e) => setTrainingForm({ ...trainingForm, phone: e.target.value })}
                    placeholder="+234 807 000 0000"
                    className="mt-1.5 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 font-mono text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    value={trainingForm.email}
                    onChange={(e) => setTrainingForm({ ...trainingForm, email: e.target.value })}
                    placeholder="training@company.ng"
                    className="mt-1.5 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Training Type *
                  </label>
                  <SharpSelect
                    value={trainingForm.trainingType}
                    onChange={(val) => setTrainingForm({ ...trainingForm, trainingType: val })}
                  >
                    <option>Corporate Guard Refresher & Access Drill</option>
                    <option>Conflict De-escalation & Front-Desk Screening</option>
                    <option>Control Room CCTV & Incident Logging</option>
                    <option>Personal Travel & Situational Awareness</option>
                  </SharpSelect>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Trainee Count *
                  </label>
                  <input
                    required
                    type="number"
                    min={1}
                    value={trainingForm.traineeCount}
                    onChange={(e) =>
                      setTrainingForm({ ...trainingForm, traineeCount: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 font-mono text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Training Location *
                  </label>
                  <input
                    required
                    type="text"
                    value={trainingForm.location}
                    onChange={(e) => setTrainingForm({ ...trainingForm, location: e.target.value })}
                    placeholder="On-site client facility or Ikeja / Abuja Training Bay"
                    className="mt-1.5 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Preferred Dates *
                  </label>
                  <input
                    required
                    type="date"
                    value={trainingForm.preferredDates}
                    onChange={(e) =>
                      setTrainingForm({ ...trainingForm, preferredDates: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 font-mono text-[14px]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Training Objectives & Operational Focus *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={trainingForm.objectives}
                    onChange={(e) =>
                      setTrainingForm({ ...trainingForm, objectives: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-[14px]"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E2E8F0] pt-5">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 rounded-[4px] border border-[#E2E8F0] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#0F172A] hover:bg-[#F8FAFC]"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Categories
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-[4px] bg-[#B45309] px-6 py-2.5 text-[14px] font-semibold text-white hover:bg-[#92400E] disabled:opacity-60"
              >
                {submitting ? "Logging Service Request..." : "Submit Service Request"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 3: SUBMISSION CONFIRMATION */}
      {step === 3 && (
        <div className="rounded-[4px] border border-[#0F172A] bg-white p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[4px] bg-[#0F172A] text-[#F59E0B]">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-[#B45309]">
                Service Request Logged
              </p>
              <h2 className="mt-1 font-heading text-[28px] font-semibold text-[#0F172A]">
                Your request has been queued with Josie Shield Operations.
              </h2>
              <div className="mt-4 inline-flex items-center gap-3 rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5">
                <span className="text-[12px] font-medium text-[#475569]">Reference Number</span>
                <span className="font-mono text-[16px] font-bold text-[#0F172A]">
                  {referenceNumber}
                </span>
              </div>

              <div className="mt-6 border-t border-[#E2E8F0] pt-5">
                <h3 className="font-heading text-[14px] font-semibold text-[#0F172A]">
                  Next-Step Expectations
                </h3>
                <ol className="mt-3 space-y-2 text-[14px] text-[#475569]">
                  <li>1. A Sector Operations Manager reviews your scope within 4 business hours.</li>
                  <li>2. For static guarding or risk audits, we coordinate an on-site survey prior to issuing a formal SLA quote.</li>
                  <li>3. Quote your reference <strong className="font-mono text-[#0F172A]">{referenceNumber}</strong> if calling our dispatch line at +234 803 552 0900.</li>
                </ol>
              </div>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="mt-6 rounded-[4px] bg-[#0F172A] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#1E293B]"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
