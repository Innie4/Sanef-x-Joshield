"use client";

import React, { useState } from "react";
import { Mail, MapPin, Phone, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    organisation: "",
    email: "",
    topic: "Community Safety Assessment",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
      setForm({
        name: "",
        organisation: "",
        email: "",
        topic: "Community Safety Assessment",
        message: "",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] py-12 lg:py-16">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left: Direct Channels */}
          <div className="lg:col-span-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#1B4332]">
              Secretariat & Ward Desk
            </p>
            <h1 className="mt-2 font-serif text-[38px] font-medium leading-[1.1] tracking-[-0.02em] text-[#1C1917] sm:text-[44px]">
              Contact SANEF
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-[#57534E]">
              Reach our field desk for municipal lighting surveys, institutional partnership
              proposals, press verification, or evidence dataset citations.
            </p>

            <div className="mt-8 space-y-4 rounded-[10px] border border-[#E7E5E4] bg-white p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#1B4332]" />
                <div>
                  <p className="text-[13px] font-semibold text-[#1C1917]">Lagos Secretariat</p>
                  <p className="text-[13px] text-[#57534E]">14 Herbert Macaulay Way, Yaba, Lagos</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-[#E7E5E4] pt-4">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#1B4332]" />
                <div>
                  <p className="text-[13px] font-semibold text-[#1C1917]">Phone & WhatsApp Desk</p>
                  <p className="font-mono text-[13px] text-[#57534E]">+234 809 441 2200</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-[#E7E5E4] pt-4">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#1B4332]" />
                <div>
                  <p className="text-[13px] font-semibold text-[#1C1917]">Secretariat Email</p>
                  <p className="font-mono text-[13px] text-[#57534E]">secretariat@sanefoundation.org.ng</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 border-t border-[#E7E5E4] pt-4">
                <a
                  href="https://wa.me/2348094412200"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#1B4332] px-4 py-2 text-[12px] font-semibold text-white hover:bg-[#143326]"
                >
                  Message on WhatsApp
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[#E7E5E4] bg-[#FAF8F5] px-4 py-2 text-[12px] font-semibold text-[#1C1917] hover:border-[#1B4332]"
                >
                  Facebook Page
                </a>
              </div>
            </div>
          </div>

          {/* Right: Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-[10px] border border-[#E7E5E4] bg-white p-6 sm:p-8">
              <h2 className="font-serif text-[26px] font-medium text-[#1C1917]">
                Send an Enquiry
              </h2>
              <p className="mt-1 text-[14px] text-[#57534E]">
                Enquiries are routed directly to the relevant programme or partnerships officer.
              </p>

              {submitted ? (
                <div className="mt-6 rounded-[10px] border border-[#1B4332]/25 bg-[#1B4332]/5 p-6">
                  <p className="flex items-center gap-2 text-[16px] font-semibold text-[#1B4332]">
                    <CheckCircle2 className="h-5 w-5" /> Enquiry delivered to SANEF Secretariat
                  </p>
                  <p className="mt-2 text-[14px] text-[#57534E]">
                    Thank you for writing. A programme coordinator will respond within two working days.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 rounded-full border border-[#1B4332] px-4 py-1.5 text-[13px] font-semibold text-[#1B4332]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[13px] font-medium text-[#1C1917]">Your Name</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="mt-1 w-full rounded-[8px] border border-[#E7E5E4] bg-[#FAF8F5] px-3.5 py-2.5 text-[14px] focus:border-[#1B4332] focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-[#1C1917]">
                        Community / Organisation
                      </label>
                      <input
                        type="text"
                        value={form.organisation}
                        onChange={(e) => setForm({ ...form, organisation: e.target.value })}
                        className="mt-1 w-full rounded-[8px] border border-[#E7E5E4] bg-[#FAF8F5] px-3.5 py-2.5 text-[14px] focus:border-[#1B4332] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                      <label className="block text-[13px] font-medium text-[#1C1917]">Enquiry Topic</label>
                      <select
                        value={form.topic}
                        onChange={(e) => setForm({ ...form, topic: e.target.value })}
                        className="mt-1 w-full rounded-[8px] border border-[#E7E5E4] bg-white px-3.5 py-2.5 text-[14px] focus:border-[#1B4332] focus:outline-none"
                      >
                        <option>Community Safety Assessment</option>
                        <option>Institutional Partnership</option>
                        <option>Grant or Donation Reconciliation</option>
                        <option>Media & Research Citation</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-[#1C1917]">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Share ward location, partnership details, or questions..."
                      className="mt-1 w-full rounded-[8px] border border-[#E7E5E4] bg-[#FAF8F5] px-3.5 py-2.5 text-[14px] focus:border-[#1B4332] focus:bg-white focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-full bg-[#1B4332] px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#143326] disabled:opacity-60"
                  >
                    {submitting ? "Sending..." : "Submit Enquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
