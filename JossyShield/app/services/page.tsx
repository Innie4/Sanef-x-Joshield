"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SERVICE_PILLARS, getLiveServices, type ServicePillar } from "@/lib/data";

export default function ServicesPage() {
  const [pillars, setPillars] = useState<ServicePillar[]>(SERVICE_PILLARS);

  useEffect(() => {
    async function load() {
      const data = await getLiveServices();
      setPillars(data);
    }
    load();
  }, []);

  return (
    <div className="bg-[#F8FAFC] py-12 lg:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-[#E2E8F0] pb-8 lg:flex-row lg:items-end">
          <div className="max-w-[720px]">
            <p className="font-heading text-[12px] font-semibold uppercase tracking-[0.14em] text-[#B45309]">
              Operational Scope & Deliverables
            </p>
            <h1 className="mt-2 font-heading text-[36px] font-bold leading-[1.08] text-[#0F172A] sm:text-[46px]">
              Security, Consultancy & Training Services
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-[#475569]">
              Every engagement operates under written Post Orders, defined service-level
              standards, and direct supervisory oversight.
            </p>
          </div>
          <Link
            href="/marketplace"
            className="inline-flex shrink-0 items-center gap-2 rounded-[4px] bg-[#B45309] px-5 py-3 text-[14px] font-semibold text-white hover:bg-[#92400E]"
          >
            Request a Service Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Jump Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {pillars.map((p) => (
            <a
              key={p.key}
              href={`#${p.key}`}
              className="rounded-[4px] border border-[#E2E8F0] bg-white px-4 py-2 text-[13px] font-semibold text-[#0F172A] hover:border-[#0F172A]"
            >
              {p.title}
            </a>
          ))}
        </div>

        <div className="mt-10 space-y-10">
          {pillars.map((pillar) => (
            <section
              key={pillar.key}
              id={pillar.key}
              className="scroll-mt-24 overflow-hidden rounded-[4px] border border-[#E2E8F0] bg-white"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="border-b border-[#E2E8F0] bg-[#0F172A] lg:col-span-5 lg:border-b-0 lg:border-r">
                  <div className="aspect-[16/11] w-full overflow-hidden">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-5 text-white">
                    <p className="font-mono text-[12px] uppercase text-[#F59E0B]">{pillar.code}</p>
                    <p className="mt-1.5 text-[12px] text-[#CBD5E1]">{pillar.imageCaption}</p>
                    <div className="mt-4 border-t border-white/10 pt-3">
                      <p className="text-[12px] font-semibold  text-[#94A3B8]">
                        Typical Clients
                      </p>
                      <p className="mt-1 text-[13px] text-white">{pillar.idealClients}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7">
                  <div>
                    <h2 className="font-heading text-[30px] font-semibold text-[#0F172A]">
                      {pillar.title}
                    </h2>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-[#475569]">
                      {pillar.description}
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-6 border-t border-[#E2E8F0] pt-6 md:grid-cols-2">
                      <div>
                        <h3 className="font-heading text-[13px] font-semibold  text-[#0F172A]">
                          Scope of Work
                        </h3>
                        <ul className="mt-3 space-y-2 text-[13px] text-[#0F172A]">
                          {pillar.scopes.map((s) => (
                            <li key={s} className="flex items-start gap-2">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#B45309]" />
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-heading text-[13px] font-semibold  text-[#0F172A]">
                          Client Deliverables
                        </h3>
                        <ul className="mt-3 space-y-2 text-[13px] text-[#475569]">
                          {pillar.deliverables.map((d) => (
                            <li key={d} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#0F172A]" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-[#E2E8F0] pt-5">
                    <span className="font-mono text-[12px] text-[#475569]">
                      SLA proposal issued after site scoping
                    </span>
                    <Link
                      href={`/marketplace?category=${pillar.key}`}
                      className="inline-flex items-center gap-2 rounded-[4px] bg-[#0F172A] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#1E293B]"
                    >
                      Request {pillar.title}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
