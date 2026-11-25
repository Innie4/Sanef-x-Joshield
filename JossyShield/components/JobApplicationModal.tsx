"use client";

import React, { useState } from "react";
import { X, Upload, ShieldAlert, CheckCircle2, ChevronDown } from "lucide-react";

interface JobApplicationModalProps {
  open: boolean;
  onClose: () => void;
  roleTitle: string;
  isGeneralPool?: boolean;
}

export default function JobApplicationModal({
  open,
  onClose,
  roleTitle,
  isGeneralPool = false,
}: JobApplicationModalProps) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    experienceYears: "",
    qualifications: "",
    availability: "Immediate",
    cvFileName: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [refId, setRefId] = useState<string | null>(null);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roleTitle,
          isGeneralPool,
          ...form,
        }),
      });
      const json = await res.json();
      setRefId(json.applicantId || "JS-APP-2026-0412");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-[#0F172A]/60" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 max-h-[90vh] w-full max-w-[660px] overflow-y-auto rounded-[4px] border border-[#E2E8F0] bg-white">
        {/* Header */}
        <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-[#E2E8F0] bg-white px-6 py-4">
          <div>
            <p className="font-mono text-[12px] font-medium text-[#B45309]">
              {isGeneralPool ? "Vetted Talent Pool Intake" : "Vacancy Application"}
            </p>
            <h2 className="mt-0.5 font-heading text-[22px] font-semibold text-[#0F172A]">
              {roleTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close application modal"
            className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6">
          {refId ? (
            <div className="space-y-4">
              <div className="rounded-[4px] border border-[#0F172A] bg-[#F8FAFC] p-5">
                <p className="flex items-center gap-2 font-heading text-[18px] font-semibold text-[#0F172A]">
                  <CheckCircle2 className="h-5 w-5 text-[#B45309]" /> Application Recorded
                </p>
                <p className="mt-2 font-mono text-[14px] font-semibold text-[#0F172A]">
                  Applicant Reference: {refId}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-[#475569]">
                  Our Recruitment Manager will review your credentials against active vetting criteria.
                  Shortlisted candidates are contacted for in-person screening and field drills.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setRefId(null);
                  onClose();
                }}
                className="rounded-[4px] bg-[#0F172A] px-5 py-2.5 text-[13px] font-semibold text-white"
              >
                Return to Careers
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="e.g., Emmanuel Okafor"
                    className="mt-1 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-[14px] focus:border-[#0F172A] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@email.ng"
                    className="mt-1 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Phone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+234 805 000 0000"
                    className="mt-1 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 font-mono text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Current Location / Deployment Area *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g., Ikeja, Lagos or Maitama, Abuja"
                    className="mt-1 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Years of Security Experience *
                  </label>
                  <input
                    required
                    type="number"
                    min={0}
                    value={form.experienceYears}
                    onChange={(e) => setForm({ ...form, experienceYears: e.target.value })}
                    placeholder="e.g., 5"
                    className="mt-1 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 font-mono text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Availability *
                  </label>
                  <div className="relative mt-1">
                    <select
                      value={form.availability}
                      onChange={(e) => setForm({ ...form, availability: e.target.value })}
                      className="w-full appearance-none rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] py-2 pl-3 pr-9 text-[14px] text-[#0F172A] focus:border-[#0F172A] focus:bg-white focus:outline-none"
                    >
                      <option>Immediate</option>
                      <option>7 days notice</option>
                      <option>14 days notice</option>
                      <option>30 days notice</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-[#475569]" />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#475569]">
                    Key Qualifications / Certifications *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.qualifications}
                    onChange={(e) => setForm({ ...form, qualifications: e.target.value })}
                    placeholder="e.g., NSCDC Cert, First Aid, VMS"
                    className="mt-1 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-[14px]"
                  />
                </div>
              </div>

              {/* CV / Document Upload Dropzone */}
              <div>
                <label className="block text-[12px] font-semibold text-[#475569]">
                  Upload CV / Supporting Documents *
                </label>
                <label className="mt-1.5 flex cursor-pointer flex-col items-center justify-center rounded-[4px] border border-dashed border-[#94A3B8] bg-[#F8FAFC] px-4 py-5 text-center hover:border-[#0F172A]">
                  <Upload className="h-5 w-5 text-[#475569]" />
                  <span className="mt-2 text-[13px] font-medium text-[#0F172A]">
                    {form.cvFileName ? form.cvFileName : "Click to select CV or certificates"}
                  </span>
                  <span className="mt-1 font-mono text-[12px] text-[#475569]">
                    Accepted: PDF, DOC, DOCX · Maximum file size 5 MB
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) =>
                      setForm({ ...form, cvFileName: e.target.files?.[0]?.name || "" })
                    }
                  />
                </label>
              </div>

              {/* Privacy & Data-Retention Notice */}
              <div className="flex items-start gap-2.5 rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 text-[12px] leading-relaxed text-[#475569]">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-[#0F172A]" />
                <p>
                  <strong className="text-[#0F172A]">Privacy & Data Retention Notice:</strong>{" "}
                  Uploaded CVs, references, and assessment records are restricted to authorised
                  JossyShield recruitment staff, never exposed publicly, and retained for up to
                  12 months unless you request earlier removal or opt into our Ready-to-Work Talent Pool.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-[4px] border border-[#E2E8F0] bg-white px-4 py-2 text-[13px] font-semibold text-[#475569]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-[4px] bg-[#B45309] px-5 py-2 text-[13px] font-semibold text-white hover:bg-[#92400E] disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
