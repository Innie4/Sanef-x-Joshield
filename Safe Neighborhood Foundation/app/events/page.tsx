"use client";

import React, { useState } from "react";
import { MapPin, CheckCircle2 } from "lucide-react";
import { SANEF_EVENTS } from "@/lib/data";

export default function EventsPage() {
  const [filter, setFilter] = useState<"All" | "Upcoming" | "Past">("All");
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);

  const items =
    filter === "All" ? SANEF_EVENTS : SANEF_EVENTS.filter((e) => e.status === filter);

  return (
    <div className="bg-[#FAF8F5] py-12 lg:py-16">
      <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 border-b border-[#E7E5E4] pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#1B4332]">
              Public Engagement
            </p>
            <h1 className="mt-2 font-serif text-[38px] font-medium leading-[1.1] tracking-[-0.02em] text-[#1C1917] sm:text-[46px]">
              Events & Community Briefings
            </h1>
          </div>
          <div className="flex gap-2">
            {(["All", "Upcoming", "Past"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`rounded-full px-4 py-1.5 text-[13px] font-medium ${
                  filter === tab
                    ? "bg-[#1B4332] text-[#FAF8F5]"
                    : "border border-[#E7E5E4] bg-white text-[#57534E] hover:border-[#1B4332]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Clean List Layout with Date Badges on Left */}
        <div className="mt-4 divide-y divide-[#E7E5E4] rounded-[10px] border border-[#E7E5E4] bg-white px-6">
          {items.map((ev) => {
            const isRegistered = registeredIds.includes(ev.id);
            return (
              <div
                key={ev.id}
                className="flex flex-col justify-between gap-6 py-7 md:flex-row md:items-start"
              >
                <div className="flex items-start gap-5">
                  <div className="flex w-16 shrink-0 flex-col items-center rounded-[10px] border border-[#E7E5E4] bg-[#FAF8F5] py-2.5 text-center">
                    <span className="font-mono text-[12px] font-semibold uppercase text-[#C85A32]">
                      {ev.month}
                    </span>
                    <span className="font-serif text-[26px] font-semibold leading-none text-[#1C1917] tabular-nums">
                      {ev.day}
                    </span>
                    <span className="mt-1 font-mono text-[12px] text-[#57534E]">{ev.year}</span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-[12px]">
                      <span className="rounded-full border border-[#1B4332]/20 bg-[#1B4332]/5 px-2.5 py-0.5 font-semibold text-[#1B4332]">
                        {ev.status}
                      </span>
                      <span className="text-[#57534E]">{ev.category}</span>
                    </div>
                    <h2 className="mt-2 font-serif text-[24px] font-medium text-[#1C1917]">
                      {ev.title}
                    </h2>
                    <p className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-[#57534E]">
                      <MapPin className="h-3.5 w-3.5 text-[#1B4332]" />
                      {ev.location} · {ev.fullDate}
                    </p>
                    <p className="mt-3 max-w-[600px] text-[14px] leading-relaxed text-[#57534E]">
                      {ev.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 md:pt-2">
                  {ev.status === "Upcoming" ? (
                    isRegistered ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1B4332]/30 bg-[#1B4332]/10 px-4 py-2 text-[13px] font-semibold text-[#1B4332]">
                        <CheckCircle2 className="h-4 w-4" /> Seat Confirmed
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setRegisteredIds((prev) => [...prev, ev.id])}
                        className="rounded-full bg-[#1B4332] px-5 py-2 text-[13px] font-semibold text-white hover:bg-[#143326]"
                      >
                        {ev.registrationLabel}
                      </button>
                    )
                  ) : (
                    <span className="inline-block rounded-full border border-[#E7E5E4] bg-[#FAF8F5] px-4 py-2 text-[12px] font-medium text-[#57534E]">
                      Archived Event
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
