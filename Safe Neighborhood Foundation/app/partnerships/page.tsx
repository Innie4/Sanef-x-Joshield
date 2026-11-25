"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, FileText, Globe } from "lucide-react";
import PartnerMark from "@/components/PartnerMark";
import { SANEF_PARTNERS } from "@/lib/data";

const TYPES = [
  "All",
  "Technical Partner",
  "Funding Partner",
  "Municipal Agency",
  "Community Coalition",
] as const;

export default function PartnershipsPage() {
  const [activeType, setActiveType] = useState<string>("All");

  const filtered =
    activeType === "All"
      ? SANEF_PARTNERS
      : SANEF_PARTNERS.filter((p) => p.partnershipType === activeType);

  return (
    <div className="bg-[#FAF8F5] py-12 lg:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#E7E5E4] pb-8 lg:flex-row lg:items-end">
          <div className="max-w-[720px]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#1B4332]">
              Institutional Collaborations
            </p>
            <h1 className="mt-2 font-serif text-[38px] font-medium leading-[1.1] tracking-[-0.02em] text-[#1C1917] sm:text-[46px]">
              Partnerships Directory
            </h1>
            <p className="mt-4 text-[16px] leading-relaxed text-[#57534E]">
              Durable neighborhood safety depends on municipal agencies, technical trusts, and
              grassroots coalitions. Every partnership profile below records exact contributions,
              joint projects, and independently verified outcomes.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#1B4332] px-6 py-3 text-[14px] font-semibold text-[#FAF8F5] hover:bg-[#143326]"
          >
            Propose a Partnership
          </Link>
        </div>

        {/* Summary & Category Filter Strip */}
        <div className="mt-6 flex flex-col justify-between gap-4 rounded-[10px] border border-[#E7E5E4] bg-white p-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => {
              const count =
                t === "All"
                  ? SANEF_PARTNERS.length
                  : SANEF_PARTNERS.filter((p) => p.partnershipType === t).length;
              const active = activeType === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveType(t)}
                  className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                    active
                      ? "bg-[#1B4332] text-[#FAF8F5]"
                      : "border border-[#E7E5E4] bg-[#FAF8F5] text-[#57534E] hover:border-[#1B4332] hover:text-[#1C1917]"
                  }`}
                >
                  {t} ({count})
                </button>
              );
            })}
          </div>
          <span className="font-mono text-[12px] text-[#57534E]">
            {filtered.length} documented {filtered.length === 1 ? "profile" : "profiles"}
          </span>
        </div>

        {/* Partner Profiles List */}
        <div className="mt-8 space-y-7">
          {filtered.map((partner) => (
            <article
              key={partner.slug}
              className="rounded-[10px] border border-[#E7E5E4] bg-white p-6 sm:p-8"
            >
              {/* Top Row: Bespoke Emblem, Name, Period, Type */}
              <div className="flex flex-col justify-between gap-4 border-b border-[#E7E5E4] pb-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <PartnerMark monogram={partner.monogram} size="md" />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-[#1B4332]/20 bg-[#1B4332]/5 px-2.5 py-0.5 text-[12px] font-semibold text-[#1B4332]">
                        {partner.partnershipType}
                      </span>
                      <span className="font-mono text-[12px] text-[#57534E]">
                        {partner.partnershipPeriod}
                      </span>
                    </div>
                    <h2 className="mt-1.5 font-serif text-[26px] font-medium text-[#1C1917]">
                      {partner.name}
                    </h2>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 font-mono text-[12px] text-[#57534E]">
                  <Globe className="h-3.5 w-3.5" />
                  {partner.website}
                </span>
              </div>

              <p className="mt-5 max-w-[820px] text-[15px] leading-relaxed text-[#57534E]">
                {partner.overview}
              </p>

              {/* Contributions & Outcomes Grid */}
              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
                <div className="rounded-[8px] border border-[#E7E5E4] bg-[#FAF8F5] p-4">
                  <p className="text-[12px] font-semibold text-[#57534E]">Partner Contribution</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#1C1917]">
                    {partner.partnerContribution}
                  </p>
                </div>
                <div className="rounded-[8px] border border-[#E7E5E4] bg-[#FAF8F5] p-4">
                  <p className="text-[12px] font-semibold text-[#57534E]">SANEF Contribution</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#1C1917]">
                    {partner.sanefContribution}
                  </p>
                </div>
                <div className="rounded-[8px] border border-[#1B4332]/25 bg-[#1B4332]/5 p-4">
                  <p className="text-[12px] font-semibold text-[#1B4332]">Documented Outcomes</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#1C1917]">
                    {partner.outcomesSummary}
                  </p>
                </div>
              </div>

              {/* Joint Projects & Linked Evidence */}
              <div className="mt-6 grid grid-cols-1 gap-6 border-t border-[#E7E5E4] pt-5 md:grid-cols-2">
                <div>
                  <p className="text-[12px] font-semibold text-[#57534E]">
                    Joint Projects Undertaken
                  </p>
                  <ul className="mt-2.5 space-y-2">
                    {partner.jointProjects.map((jp) => (
                      <li key={jp.slug}>
                        <Link
                          href={`/portfolio?project=${jp.slug}`}
                          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#1B4332] hover:text-[#C85A32]"
                        >
                          {jp.title}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[12px] font-semibold text-[#57534E]">
                    Linked Evidence & Articles
                  </p>
                  <ul className="mt-2.5 space-y-2">
                    {partner.linkedEvidence.map((ev) => (
                      <li key={ev.title}>
                        <Link
                          href={ev.href}
                          className="inline-flex items-center gap-2 text-[13px] font-medium text-[#1C1917] hover:text-[#1B4332]"
                        >
                          <FileText className="h-3.5 w-3.5 shrink-0 text-[#C85A32]" />
                          <span>{ev.title}</span>
                          <span className="font-mono text-[12px] text-[#57534E]">({ev.meta})</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
