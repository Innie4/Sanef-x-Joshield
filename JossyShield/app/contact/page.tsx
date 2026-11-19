"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Check, Shield } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Security Inquiry",
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
        <p className="text-xs font-mono uppercase tracking-wider text-[#0066FF] font-semibold">
          Central Dispatch & Inquiries
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.03em] text-white">
          Contact Central Command
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
          Whether you require immediate armed transit dispatch, a commercial facility audit, or corporate partnership clearance, our operations room is active 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Channels */}
        <div className="lg:col-span-5 space-y-4">
          <div className="tactical-surface rounded-3xl p-7 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500">
              Direct Operational Channels
            </h3>

            <div className="space-y-5 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/20">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-semibold">24/7 Command Hotline</p>
                  <p className="text-zinc-400 font-mono mt-0.5">+234 (0) 800-JOSSY-SHIELD</p>
                  <p className="text-zinc-500 text-[11px] font-mono">+234 (0) 803 555 0192</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/20">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-semibold">Official Dispatch Email</p>
                  <p className="text-zinc-400 mt-0.5">operations@jossyshield.com</p>
                  <p className="text-zinc-500 text-[11px]">inquiries@jossyshield.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/20">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-semibold">National Command Center</p>
                  <p className="text-zinc-400 mt-0.5">Plot 12, Commercial Corridor, Victoria Island, Lagos</p>
                  <p className="text-zinc-500 text-[11px]">Regional stations in Abuja FCT & Port Harcourt</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2 text-[11px] font-mono text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 beacon-pulse" />
              <span>LIVE SATELLITE DISPATCH MONITORING ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="tactical-surface rounded-3xl p-8 text-white">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold tracking-tight text-white">Transmit Tactical Message</h3>
                  <p className="text-xs text-zinc-400">Our duty watch officer will respond within 60 minutes.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-zinc-400">Full Name *</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-[#070A0F] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-zinc-400">Work Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full bg-[#070A0F] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-zinc-400">Inquiry Nature</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-[#070A0F] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                    >
                      <option value="General Security Inquiry">General Security Inquiry</option>
                      <option value="Armed Escort Deployment">Urgent Armed Convoy / Escort</option>
                      <option value="Facility Guarding RFP">Corporate Facility RFP / Requisition</option>
                      <option value="Vulnerability Audit">Physical Threat Audit Request</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-zinc-400">Message / Threat Scope *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Provide facility details, transit corridors, or deployment timelines..."
                    className="w-full bg-[#070A0F] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold px-7 py-3 rounded-full transition-all disabled:opacity-50"
                  >
                    {submitting ? "Transmitting..." : "Send Secure Message"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-10 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Transmission Successful</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Your communication has been registered with the command desk. An operational coordinator will follow up immediately.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
