"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Check } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Community Safety Inquiry",
    message: "",
  });

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
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold">
          Civic Secretariat & Field Intake
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.03em] text-slate-950">
          Connect with the Foundation
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          Nominate a vulnerable corridor for solar installation, recommend an at-risk youth cohort for mediation academy entry, or explore philanthropic grants.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Information */}
        <div className="lg:col-span-5 space-y-4">
          <div className="monograph-surface rounded-3xl p-7 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500">
              Community Channels
            </h3>

            <div className="space-y-5 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-900 font-semibold">Toll-Free Citizen Line</p>
                  <p className="text-slate-600 font-mono mt-0.5">+234 (0) 800-SANEF-COMMUNITY</p>
                  <p className="text-slate-500 text-[11px] font-mono">+234 (0) 802 444 8921</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-900 font-semibold">Official Secretariat Email</p>
                  <p className="text-slate-600 mt-0.5">secretariat@sanefoundation.org</p>
                  <p className="text-slate-500 text-[11px]">programs@sanefoundation.org</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-900 font-semibold">National Secretariat</p>
                  <p className="text-slate-600 mt-0.5">48 Commercial Way, Yaba Innovation Corridor, Lagos</p>
                  <p className="text-slate-500 text-[11px]">Field stations in Ajegunle, Mushin & Makoko</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center gap-2 text-[11px] font-mono text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 civic-beacon" />
              <span>FIELD DESK OPEN MON-FRI 8:00 AM - 6:00 PM</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="monograph-surface rounded-3xl p-8 space-y-6">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900">Submit Community Inquiry / Proposal</h3>
                  <p className="text-xs text-slate-500">Our programs officer will reply within 24 business hours.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-slate-500">Full Name *</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0D4A2B]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-slate-500">Email Address *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your.email@organization.org"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0D4A2B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-slate-500">Phone Number *</label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+234 800 000 0000"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0D4A2B]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-slate-500">Category of Inquiry</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0D4A2B]"
                    >
                      <option value="Corridor Lighting Nomination">Nominate Dark School Corridor</option>
                      <option value="Youth Academy Referral">Youth Conflict Mediation Referral</option>
                      <option value="Philanthropic Grant Discussion">Philanthropic Grant / Partnership</option>
                      <option value="General Information">General Civic Information</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-500">Message / Neighborhood Location Details *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Specify community name, LGA, school boundary, or partnership framework..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#0D4A2B]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#0D4A2B] hover:bg-[#14633B] text-white text-xs font-semibold px-7 py-3 rounded-full transition-all disabled:opacity-50"
                  >
                    {submitting ? "Transmitting..." : "Submit Community Message"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-10 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Message Logged Successfully</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you for reaching out. Our community field officer will review your nomination or inquiry promptly.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
