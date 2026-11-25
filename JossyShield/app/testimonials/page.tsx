"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CLIENT_TESTIMONIALS } from "@/lib/data";

export default function TestimonialsPage() {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Security Services", "Consultancy", "Training"];

  const filtered =
    filter === "All"
      ? CLIENT_TESTIMONIALS
      : CLIENT_TESTIMONIALS.filter((t) => t.category === filter);

  return (
    <div className="bg-[#F8FAFC] py-12 lg:py-16">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 border-b border-[#E2E8F0] pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="font-heading text-[12px] font-semibold uppercase tracking-[0.14em] text-[#B45309]">
              Client Track Record
            </p>
            <h1 className="mt-2 font-heading text-[36px] font-bold leading-[1.08] text-[#0F172A] sm:text-[44px]">
              Approved Client Testimonials
            </h1>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={`rounded-[4px] px-3.5 py-2 text-[12px] font-semibold ${
                  filter === c
                    ? "bg-[#0F172A] text-white"
                    : "border border-[#E2E8F0] bg-white text-[#475569] hover:border-[#0F172A]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {filtered.map((t) => (
            <blockquote
              key={t.id}
              className="flex flex-col justify-between rounded-[4px] border border-[#E2E8F0] bg-white p-6"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-[4px] border border-[#CBD5E1] bg-[#F8FAFC] px-2.5 py-0.5 font-heading text-[12px] font-semibold  text-[#0F172A]">
                    {t.category}
                  </span>
                  <span className="font-mono text-[12px] text-[#475569]">{t.contractDuration}</span>
                </div>
                <p className="mt-4 text-[14px] leading-[1.7] text-[#0F172A]">“{t.quote}”</p>
              </div>
              <footer className="mt-6 border-t border-[#E2E8F0] pt-4 text-[13px]">
                <p className="font-semibold text-[#0F172A]">{t.clientName}</p>
                <p className="text-[#475569]">
                  {t.role} · {t.organisation}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-[4px] border border-[#E2E8F0] bg-white p-7 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-heading text-[22px] font-semibold text-[#0F172A]">
              Require formal commercial references for vendor onboarding?
            </h2>
            <p className="mt-1 text-[14px] text-[#475569]">
              Submit a service request and our operations desk will include verified client contact
              references in your proposal pack.
            </p>
          </div>
          <Link
            href="/marketplace"
            className="shrink-0 rounded-[4px] bg-[#0F172A] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#1E293B]"
          >
            Request a Service
          </Link>
        </div>
      </div>
    </div>
  );
}
