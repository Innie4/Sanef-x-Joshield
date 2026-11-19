"use client";

import React, { useState } from "react";
import { Upload, Check, X, Shield, FileText } from "lucide-react";

export default function JobApplicationModal({
  jobTitle = "General Security Operative Application",
  isOpen,
  onClose,
}: {
  jobTitle?: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicantId, setApplicantId] = useState("");
  const [fileName, setFileName] = useState("");

  const [form, setForm] = useState({
    applicantName: "",
    email: "",
    phone: "",
    experienceYears: 3,
    location: "Lagos, Nigeria",
    availability: "immediate",
    skills: ["Static Guarding", "Access Control"],
  });

  const availableSkills = [
    "Static Guarding",
    "Armed Escort",
    "VIP Close Protection",
    "Defensive Driving",
    "CCTV Control Room",
    "Access Control",
    "First Aid & CPR",
    "Crisis De-escalation",
  ];

  const toggleSkill = (skill: string) => {
    if (form.skills.includes(skill)) {
      setForm({ ...form, skills: form.skills.filter((s) => s !== skill) });
    } else {
      setForm({ ...form, skills: [...form.skills, skill] });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle,
          ...form,
          cvFileName: fileName || "Candidate_Credentials.pdf",
        }),
      });
      const data = await res.json();
      setApplicantId(data.applicantId || `JS-CAND-${Math.floor(1000 + Math.random() * 9000)}`);
      setSubmitted(true);
    } catch {
      setApplicantId(`JS-CAND-${Math.floor(1000 + Math.random() * 9000)}`);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl tactical-surface rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-white">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#0066FF] uppercase">
                <Shield className="w-3.5 h-3.5" />
                <span>Personnel Clearance Intake</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                Application: {jobTitle}
              </h2>
              <p className="text-xs text-zinc-400">
                All candidates undergo biometric audit and psychological stress screening.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-zinc-400">Full Legal Name *</label>
                <input
                  required
                  type="text"
                  value={form.applicantName}
                  onChange={(e) => setForm({ ...form, applicantName: e.target.value })}
                  placeholder="First and Last Name"
                  className="w-full bg-[#070A0F] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-zinc-400">Email Address *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="officer@email.com"
                    className="w-full bg-[#070A0F] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-zinc-400">Phone Number *</label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+234 800 000 0000"
                    className="w-full bg-[#070A0F] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-zinc-400">Security Experience (Years)</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={form.experienceYears}
                    onChange={(e) => setForm({ ...form, experienceYears: Number(e.target.value) })}
                    className="w-full bg-[#070A0F] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-zinc-400">Deployment City</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full bg-[#070A0F] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-zinc-400">Tactical Competencies</label>
                <div className="flex flex-wrap gap-2">
                  {availableSkills.map((sk) => {
                    const isSelected = form.skills.includes(sk);
                    return (
                      <button
                        key={sk}
                        type="button"
                        onClick={() => toggleSkill(sk)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                          isSelected
                            ? "bg-[#0066FF] border-[#0066FF] text-white font-medium"
                            : "bg-[#070A0F] border-white/[0.08] text-zinc-400 hover:text-white"
                        }`}
                      >
                        {sk}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-zinc-400">CV & Credentials Document (PDF)</label>
                <div className="border border-dashed border-white/[0.15] rounded-xl p-4 text-center cursor-pointer hover:border-[#0066FF] transition-colors relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center gap-1.5 text-xs text-zinc-400">
                    <Upload className="w-4 h-4 text-zinc-300" />
                    <span>{fileName ? fileName : "Upload credentials (PDF, DOCX)"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-mono text-zinc-500 hover:text-zinc-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold px-6 py-3 rounded-full transition-all disabled:opacity-50"
              >
                {submitting ? "Submitting Dossier..." : "Submit for Clearance Review"}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 space-y-5">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Application Received</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Your dossier has been logged into our vetting queue. Our recruitment desk will contact you within 5 business days for biometric scheduling.
              </p>
            </div>
            <div className="bg-[#070A0F] py-3 px-4 rounded-xl border border-white/[0.08] inline-block font-mono text-xs text-zinc-300">
              Candidate Reference: <span className="text-[#0066FF] font-bold">{applicantId}</span>
            </div>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs px-6 py-2.5 rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
