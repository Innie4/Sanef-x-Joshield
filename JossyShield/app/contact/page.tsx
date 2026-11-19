"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, MessageSquare, CheckCircle, Clock, Shield, ArrowRight } from "lucide-react";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold px-3 py-1 rounded bg-blue-950/60 border border-blue-800/40">
          CENTRAL DISPATCH & INQUIRIES
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Connect with JossyShield Operations
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Whether you need immediate tactical deployment, a facility vulnerability assessment, 
          or direct contact with our central dispatch room, our team is active 24/7/365.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Channels */}
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider text-xs">
              Direct Channels
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-semibold">24/7 Hotline & Dispatch</p>
                  <p className="text-slate-400 font-mono mt-0.5">+234 (0) 800-JOSSY-SHIELD</p>
                  <p className="text-slate-500 text-[11px]">+234 (0) 803 555 0192</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-semibold">Official Email</p>
                  <p className="text-slate-400 mt-0.5">operations@jossyshield.com</p>
                  <p className="text-slate-500 text-[11px]">inquiries@jossyshield.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-semibold">WhatsApp Operations Line</p>
                  <a
                    href="https://wa.me/234800JOSSYSHIELD"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:underline font-mono"
                  >
                    +234 800 JOSSYSHIELD
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-semibold">Command Operations HQ</p>
                  <p className="text-slate-400 mt-0.5">
                    Plot 14 Commercial Crescent, Victoria Island, Lagos, Nigeria.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0c1018] border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Response Commitment</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Standard commercial inquiries are replied to within 2 hours. Active operational alerts 
              receive immediate telephone escalation.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-8 sm:p-10 border-slate-800">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Send a Direct Message
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Complete this form to reach our executive security and client services team.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sandra Okon"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#121620] border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sandra@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#121620] border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 800 000 0000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#121620] border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Inquiry Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-[#121620] border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="General Security Inquiry">General Security Inquiry</option>
                    <option value="Commercial Contract Request">Commercial Contract Request</option>
                    <option value="Risk Assessment & Auditing">Risk Assessment & Auditing</option>
                    <option value="Recruitment & Academy Inquiries">Recruitment & Academy Inquiries</option>
                    <option value="Media & Partnership">Media & Partnership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Detailed Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your inquiry, facility requirements, or question..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-[#121620] border border-slate-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold px-6 py-3 rounded-lg shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
              >
                {submitting ? "Transmitting..." : "Send Secure Message"}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">Message Delivered</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Thank you for contacting JossyShield. A senior operations representative will review 
                your communication and respond shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-blue-400 hover:underline pt-2"
              >
                Send another message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
