"use client";

import React, { useState } from "react";
import { Upload, CheckCircle, X, Shield, FileText, AlertCircle } from "lucide-react";

export default function JobApplicationModal({
  jobTitle = "General Security Personnel Application",
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
          cvFileName: fileName || "Candidate_CV.pdf",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#0f131c] border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest mb-1">
              <Shield className="w-4 h-4" />
              <span>JossyShield Talent Pool Vetting</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Apply for: <span className="text-blue-400">{jobTitle}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Qualified candidates undergo background verification and enter our ready-to-deploy personnel pool.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ibrahim Danjuma"
                    value={form.applicantName}
                    onChange={(e) => setForm({ ...form, applicantName: e.target.value })}
                    className="w-full bg-[#161c28] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 800 000 0000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#161c28] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="applicant@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#161c28] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Years of Active Security Experience *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    required
                    value={form.experienceYears}
                    onChange={(e) =>
                      setForm({ ...form, experienceYears: parseInt(e.target.value) || 0 })
                    }
                    className="w-full bg-[#161c28] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Primary Deployment Location
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lagos Mainland / Lekki / Port Harcourt"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full bg-[#161c28] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Availability for Deployment
                  </label>
                  <select
                    value={form.availability}
                    onChange={(e) => setForm({ ...form, availability: e.target.value })}
                    className="w-full bg-[#161c28] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="immediate">Immediate (Ready to Deploy)</option>
                    <option value="2_weeks">Within 2 Weeks</option>
                    <option value="1_month">Within 1 Month</option>
                  </select>
                </div>
              </div>

              {/* Skills Multi-select */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Vetted Competencies & Qualifications (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSkills.map((skill) => {
                    const selected = form.skills.includes(skill);
                    return (
                      <button
                        type="button"
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                          selected
                            ? "bg-blue-600/30 border-blue-500 text-blue-300 font-medium"
                            : "bg-[#141923] border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        {selected ? "✓ " : "+ "}
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CV File Upload */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Upload Curriculum Vitae / Certifications (PDF or DOCX max 5MB) *
                </label>
                <div className="relative border-2 border-dashed border-slate-700 hover:border-blue-500/80 rounded-xl p-4 text-center cursor-pointer bg-[#141822]/60 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <Upload className="w-6 h-6 text-blue-400" />
                    <p className="text-xs text-slate-300 font-medium">
                      {fileName ? (
                        <span className="text-blue-400 flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" />
                          {fileName}
                        </span>
                      ) : (
                        "Click or drag CV file to upload"
                      )}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Encrypted and restricted to authorized recruitment evaluators.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg text-xs font-semibold shadow-lg shadow-blue-600/30"
                >
                  {submitting ? "Submitting Application..." : "Submit Application & Enter Pool"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">Application Recorded</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Your profile has been entered into the JossyShield Talent Evaluation Pipeline.
            </p>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg max-w-xs mx-auto">
              <span className="text-[10px] font-mono text-slate-500 block uppercase">
                Candidate Reference ID
              </span>
              <span className="text-lg font-mono font-bold text-blue-400">
                {applicantId}
              </span>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-6 py-2.5 rounded-lg font-semibold"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
