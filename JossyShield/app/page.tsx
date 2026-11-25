import React from "react";
import Link from "next/link";
import { ArrowRight, Phone, MessageSquare, Check } from "lucide-react";
import {
  OPERATIONAL_CREDENTIALS,
  SERVICE_PILLARS,
  CLIENT_TESTIMONIALS,
} from "@/lib/data";

export default function HomePage() {
  return (
    <div className="bg-[#F8FAFC] text-[#0F172A]">
      {/* ===================================================================== */}
      {/* 1. HIGH-CONTRAST DARK NAVY (#0F172A) HERO BAND                        */}
      {/* ===================================================================== */}
      <section className="border-b border-[#1E293B] bg-[#0F172A] text-white">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-8 lg:py-20">
          {/* Left Column: Authoritative Positioning + Primary CTAs */}
          <div className="lg:col-span-7">
            <p className="font-heading text-[12px] font-semibold uppercase tracking-[0.14em] text-[#F59E0B]">
              Commercial Security · Consultancy · Certified Training
            </p>
            <h1 className="mt-4 font-heading text-[40px] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-[54px]">
              Disciplined physical security built for high-accountability sites.
            </h1>
            <p className="mt-5 max-w-[560px] text-[16px] leading-[1.65] text-[#CBD5E1]">
              Josie Shield Security Services deploys vetted commercial guard teams, executes
              independent facility risk audits, and trains operational security personnel across
              Lagos, Abuja, and Port Harcourt.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-2 rounded-[4px] bg-[#B45309] px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#92400E]"
              >
                Request a Service
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-[4px] border border-white/25 bg-transparent px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:border-white hover:bg-white/5"
              >
                Explore Services
              </Link>
            </div>
          </div>

          {/* Right Column: Clean Operational Credentials Panel + Photo Frame */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[4px] border border-white/15 bg-[#1E293B]/60">
              <div className="aspect-[16/9] w-full overflow-hidden border-b border-white/15 bg-[#0B1120]">
                <img
                  src="/images/hero-commercial-guard.jpg"
                  alt="Josie Shield commercial security supervisor inspecting visitor access credentials"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-[#94A3B8]">
                    Operational Credentials
                  </span>
                  <span className="font-mono text-[12px] text-[#F59E0B]">
                    NSCDC LICENSED
                  </span>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4">
                  {OPERATIONAL_CREDENTIALS.map((cred) => (
                    <div key={cred.label}>
                      <dt className="text-[12px] font-medium text-[#94A3B8]">{cred.label}</dt>
                      <dd className="mt-1 font-heading text-[24px] font-bold leading-none text-white tabular-nums">
                        {cred.value}
                      </dd>
                      <p className="mt-1 text-[12px] leading-snug text-[#CBD5E1]">{cred.detail}</p>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. THREE CORE SERVICE PILLARS (3-Column Bordered Grid)                */}
      {/* ===================================================================== */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 border-b border-[#E2E8F0] pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-[#B45309]">
                Core Capabilities
              </p>
              <h2 className="mt-2 font-heading text-[32px] font-semibold leading-tight text-[#0F172A] sm:text-[38px]">
                Three Commercial Service Pillars
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#0F172A] hover:text-[#B45309]"
            >
              View full technical scope
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {SERVICE_PILLARS.map((pillar) => (
              <article
                key={pillar.key}
                className="flex flex-col justify-between rounded-[4px] border border-[#E2E8F0] bg-white p-6 sm:p-7"
              >
                <div>
                  <p className="font-mono text-[12px] font-medium  text-[#475569]">
                    {pillar.code}
                  </p>
                  <h3 className="mt-2.5 font-heading text-[24px] font-semibold text-[#0F172A]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#475569]">
                    {pillar.tagline}
                  </p>

                  <ul className="mt-5 space-y-2.5 border-t border-[#E2E8F0] pt-5 text-[13px] text-[#0F172A]">
                    {pillar.scopes.map((scope) => (
                      <li key={scope} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#B45309]" />
                        <span>{scope}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 flex items-center justify-between border-t border-[#E2E8F0] pt-5">
                  <Link
                    href={`/services#${pillar.key}`}
                    className="text-[13px] font-medium text-[#475569] hover:text-[#0F172A]"
                  >
                    Service details
                  </Link>
                  <Link
                    href={`/marketplace?category=${pillar.key}`}
                    className="inline-flex items-center gap-1.5 rounded-[4px] bg-[#0F172A] px-3.5 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#1E293B]"
                  >
                    Request Quote
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. APPROVED CLIENT TESTIMONIALS                                       */}
      {/* ===================================================================== */}
      <section className="border-y border-[#E2E8F0] bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 border-b border-[#E2E8F0] pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="font-heading text-[12px] font-semibold uppercase tracking-[0.12em] text-[#B45309]">
                Verified Client Endorsements
              </p>
              <h2 className="mt-2 font-heading text-[32px] font-semibold text-[#0F172A]">
                Approved Client Testimonials
              </h2>
            </div>
            <Link
              href="/testimonials"
              className="text-[14px] font-semibold text-[#0F172A] hover:text-[#B45309]"
            >
              All client reviews →
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
            {CLIENT_TESTIMONIALS.map((t) => (
              <blockquote
                key={t.id}
                className="flex h-full flex-col rounded-[4px] border border-[#E2E8F0] bg-[#F8FAFC] p-6"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-[4px] border border-[#CBD5E1] bg-white px-2.5 py-0.5 font-heading text-[12px] font-semibold text-[#0F172A]">
                      {t.category}
                    </span>
                    <span className="font-mono text-[12px] text-[#475569]">
                      {t.contractDuration}
                    </span>
                  </div>
                  <p className="mt-4 text-[14px] leading-[1.7] text-[#0F172A]">
                    “{t.quote}”
                  </p>
                </div>
                <footer className="mt-6 min-h-[72px] border-t border-[#E2E8F0] pt-4 text-[13px]">
                  <p className="font-semibold text-[#0F172A]">{t.clientName}</p>
                  <p className="text-[#475569]">
                    {t.role} · {t.organisation}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. BOTTOM CTA BANNER (Direct WhatsApp, Phone & Marketplace)           */}
      {/* ===================================================================== */}
      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-8 rounded-[4px] border border-[#0F172A] bg-[#0F172A] p-8 text-white lg:flex-row lg:items-center lg:p-10">
            <div className="max-w-[600px]">
              <p className="font-heading text-[12px] font-semibold uppercase tracking-[0.14em] text-[#F59E0B]">
                Direct Commercial Dispatch
              </p>
              <h2 className="mt-2 font-heading text-[30px] font-semibold leading-tight sm:text-[34px]">
                Need vetted site guarding, a risk audit, or a staff training cohort?
              </h2>
              <p className="mt-2.5 text-[14px] text-[#CBD5E1]">
                Submit your site requirements via our Service Request Marketplace for an assigned
                reference number, or speak directly with our 24/7 operations desk.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row sm:items-center">
              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] bg-[#B45309] px-5 py-3 text-[14px] font-semibold text-white hover:bg-[#92400E]"
              >
                Open Service Marketplace
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/2348035520900"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] border border-white/25 px-4 py-3 text-[13px] font-semibold text-white hover:bg-white/10"
              >
                <MessageSquare className="h-4 w-4 text-[#F59E0B]" />
                WhatsApp Desk
              </a>
              <a
                href="tel:+2348035520900"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] border border-white/25 px-4 py-3 font-mono text-[13px] text-white hover:bg-white/10"
              >
                <Phone className="h-4 w-4 text-[#F59E0B]" />
                +234 803 552 0900
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
