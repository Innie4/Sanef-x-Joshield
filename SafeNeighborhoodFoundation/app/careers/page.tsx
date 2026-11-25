"use client";

import React, { useState } from "react";
import { MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { SANEF_VACANCIES } from "@/lib/data";

export default function CareersPage() {
  const [selectedVacancy, setSelectedVacancy] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", note: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `SAN-APP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(ref);
    setForm({ name: "", email: "", phone: "", note: "" });
  };

  return (
    <div className="bg-[#FAF8F5] py-12 lg:py-16">
      <div className="mx-auto max-w-[1040px] px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#E7E5E4] pb-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#1B4332]">
            Join the Secretariat
          </p>
          <h1 className="mt-2 font-serif text-[38px] font-medium leading-[1.1] tracking-[-0.02em] text-[#1C1917] sm:text-[46px]">
            Careers & Field Fellowships
          </h1>
          <p className="mt-4 max-w-[680px] text-[16px] leading-relaxed text-[#57534E]">
            We hire field coordinators, monitoring analysts, and community engineers committed to
            open documentation and long-term neighborhood stewardship.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          {SANEF_VACANCIES.map((vac) => (
            <article key={vac.id} className="rounded-[10px] border border-[#E7E5E4] bg-white p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-[12px]">
                    <span className="font-mono text-[#57534E]">{vac.refId}</span>
                    <span className="text-[#D6D3D1]">·</span>
                    <span className="rounded-full border border-[#1B4332]/20 bg-[#1B4332]/5 px-2.5 py-0.5 font-semibold text-[#1B4332]">
                      {vac.department}
                    </span>
                    <span className="text-[#57534E]">{vac.contractType}</span>
                  </div>
                  <h2 className="mt-2.5 font-serif text-[26px] font-medium text-[#1C1917]">
                    {vac.title}
                  </h2>
                  <div className="mt-2 flex flex-wrap gap-4 text-[13px] text-[#57534E]">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-[#1B4332]" /> {vac.location}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-[12px]">
                      <Calendar className="h-3.5 w-3.5 text-[#C85A32]" /> Deadline: {vac.deadline}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedVacancy(vac.title);
                    setSubmittedRef(null);
                  }}
                  className="shrink-0 rounded-full bg-[#1B4332] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#143326]"
                >
                  Apply for Role
                </button>
              </div>

              <p className="mt-4 text-[15px] leading-relaxed text-[#57534E]">{vac.summary}</p>

              <div className="mt-5 border-t border-[#E7E5E4] pt-4">
                <p className="text-[12px] font-semibold  text-[#57534E]">
                  Key Requirements
                </p>
                <ul className="mt-2.5 space-y-1.5 text-[14px] text-[#1C1917]">
                  {vac.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1B4332]" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* Inline Application Form when role selected */}
        {selectedVacancy && (
          <section className="mt-10 rounded-[10px] border border-[#1B4332] bg-white p-6 sm:p-8">
            <h2 className="font-serif text-[26px] font-medium text-[#1C1917]">
              Submit Expression of Interest — {selectedVacancy}
            </h2>
            {submittedRef ? (
              <div className="mt-4 rounded-[8px] border border-[#1B4332]/25 bg-[#1B4332]/5 p-5">
                <p className="flex items-center gap-2 text-[15px] font-semibold text-[#1B4332]">
                  <CheckCircle2 className="h-5 w-5" /> Application received by SANEF Secretariat
                </p>
                <p className="mt-1 font-mono text-[13px] text-[#1C1917]">
                  Reference: {submittedRef}
                </p>
                <p className="mt-2 text-[13px] text-[#57534E]">
                  Shortlisted applicants are contacted within 10 working days after the published deadline.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[13px] font-medium text-[#1C1917]">Full Name</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-1 w-full rounded-[8px] border border-[#E7E5E4] bg-[#FAF8F5] px-3.5 py-2.5 text-[14px] focus:border-[#1B4332] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#1C1917]">Email Address</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-1 w-full rounded-[8px] border border-[#E7E5E4] bg-[#FAF8F5] px-3.5 py-2.5 text-[14px] focus:border-[#1B4332] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#1C1917]">Phone Number</label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="mt-1 w-full rounded-[8px] border border-[#E7E5E4] bg-[#FAF8F5] px-3.5 py-2.5 text-[14px] focus:border-[#1B4332] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#1C1917]">CV / Portfolio (PDF, max 5MB)</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="mt-1 w-full rounded-[8px] border border-[#E7E5E4] bg-[#FAF8F5] px-3 py-2 text-[13px]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[13px] font-medium text-[#1C1917]">
                    Relevant Field Experience
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                    className="mt-1 w-full rounded-[8px] border border-[#E7E5E4] bg-[#FAF8F5] px-3.5 py-2.5 text-[14px] focus:border-[#1B4332] focus:bg-white focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2 flex items-center justify-between pt-2">
                  <p className="text-[12px] text-[#57534E]">
                    Application data is retained strictly for recruitment review for 6 months.
                  </p>
                  <button
                    type="submit"
                    className="rounded-full bg-[#1B4332] px-6 py-2.5 text-[14px] font-semibold text-white hover:bg-[#143326]"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
