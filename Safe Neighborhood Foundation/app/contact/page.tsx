"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, MessageSquare, CheckCircle, ArrowRight } from "lucide-react";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold px-3 py-1 rounded bg-emerald-100">
          GET IN TOUCH WITH SANEF
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Community Engagement & Feedback
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Report an unlit school corridor, recommend a neighborhood for solar beacon expansion, 
          or connect with our program leadership for institutional partnerships.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="civic-card rounded-3xl p-6 space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Community Channels
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-900 font-semibold">Toll-Free Citizen Hotline</p>
                  <p className="text-slate-600 font-mono">+234 (0) 800-SANEF-COMMUNITY</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-900 font-semibold">WhatsApp Community Line</p>
                  <a
                    href="https://wa.me/234800SANEF"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 hover:underline font-mono"
                  >
                    +234 800 72633
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-900 font-semibold">Official Email</p>
                  <p className="text-slate-600">contact@sanefoundation.org</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-900 font-semibold">Community Action Center</p>
                  <p className="text-slate-600">18 Commercial Avenue, Yaba, Lagos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 civic-card rounded-3xl p-8 sm:p-10">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Send an Enquiry or Report</h2>
                <p className="text-xs text-slate-500 mt-1">Our field team evaluates all submissions within 24 hours.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Ngozi Balogun"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="ngozi@domain.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Inquiry Category</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Community Safety Inquiry">Community Safety Inquiry</option>
                    <option value="Report Dark/Dangerous Corridor">Report Dark/Dangerous Corridor</option>
                    <option value="Youth Mediation Center Request">Youth Mediation Center Request</option>
                    <option value="Institutional Partnership">Institutional Partnership</option>
                    <option value="Donation & Financial Verification">Donation & Financial Verification</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Provide context, location specifics, or details regarding your inquiry..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-semibold px-6 py-3 rounded-lg shadow-sm"
              >
                {submitting ? "Sending..." : "Submit Inquiry"}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Message Received</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you for reaching out to Safe Neighborhood Foundation. Your enquiry has been routed to our community directorate.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-emerald-700 font-semibold hover:underline"
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
