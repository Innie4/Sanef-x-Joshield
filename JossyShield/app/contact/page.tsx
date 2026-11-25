"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, MessageSquare, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    organisation: "",
    email: "",
    phone: "",
    subject: "Commercial Guarding Enquiry",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSent(true);
      setForm({
        name: "",
        organisation: "",
        email: "",
        phone: "",
        subject: "Commercial Guarding Enquiry",
        message: "",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] py-12 lg:py-16">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-heading text-[12px] font-semibold uppercase tracking-[0.14em] text-[#B45309]">
              24/7 Operations & Regional Offices
            </p>
            <h1 className="mt-2 font-heading text-[36px] font-bold leading-[1.08] text-[#0F172A] sm:text-[44px]">
              Contact Josie Shield
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-[#475569]">
              Speak directly with our duty operations desk for urgent site mobilisation, vendor
              qualification packs, or general commercial enquiries.
            </p>

            <div className="mt-8 space-y-4 rounded-[4px] border border-[#E2E8F0] bg-white p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#B45309]" />
                <div>
                  <p className="text-[13px] font-semibold text-[#0F172A]">Lagos Head Office</p>
                  <p className="text-[13px] text-[#475569]">18 Oba Akran Avenue, Ikeja, Lagos</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-[#E2E8F0] pt-4">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#B45309]" />
                <div>
                  <p className="text-[13px] font-semibold text-[#0F172A]">24/7 Dispatch Line</p>
                  <p className="font-mono text-[13px] text-[#475569]">+234 803 552 0900</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-[#E2E8F0] pt-4">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#B45309]" />
                <div>
                  <p className="text-[13px] font-semibold text-[#0F172A]">Commercial Desk</p>
                  <p className="font-mono text-[13px] text-[#475569]">ops@josieshield.ng</p>
                </div>
              </div>
              <div className="border-t border-[#E2E8F0] pt-4">
                <a
                  href="https://wa.me/2348035520900"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-[4px] bg-[#0F172A] px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-[#1E293B]"
                >
                  <MessageSquare className="h-4 w-4 text-[#F59E0B]" />
                  Message WhatsApp Dispatch
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-[4px] border border-[#E2E8F0] bg-white p-6 sm:p-8">
              <h2 className="font-heading text-[26px] font-semibold text-[#0F172A]">
                Direct Enquiry Form
              </h2>
              <p className="mt-1 text-[14px] text-[#475569]">
                For full service scoping with an assigned reference ID, use our Marketplace intake.
              </p>

              {sent ? (
                <div className="mt-6 rounded-[4px] border border-[#0F172A] bg-[#F8FAFC] p-6">
                  <p className="flex items-center gap-2 font-heading text-[18px] font-semibold text-[#0F172A]">
                    <CheckCircle2 className="h-5 w-5 text-[#B45309]" /> Enquiry Logged by Operations
                  </p>
                  <p className="mt-2 text-[14px] text-[#475569]">
                    A duty officer will follow up within 4 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-4 rounded-[4px] bg-[#0F172A] px-4 py-2 text-[13px] font-semibold text-white"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[12px] font-semibold  text-[#475569]">
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="mt-1 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-[14px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold  text-[#475569]">
                        Organisation
                      </label>
                      <input
                        type="text"
                        value={form.organisation}
                        onChange={(e) => setForm({ ...form, organisation: e.target.value })}
                        className="mt-1 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-[14px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold  text-[#475569]">
                        Email *
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="mt-1 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-[14px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold  text-[#475569]">
                        Phone *
                      </label>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="mt-1 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 font-mono text-[14px]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold  text-[#475569]">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="mt-1 w-full rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 text-[14px]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-[4px] bg-[#B45309] px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#92400E] disabled:opacity-60"
                  >
                    {submitting ? "Sending..." : "Send Message"}
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
