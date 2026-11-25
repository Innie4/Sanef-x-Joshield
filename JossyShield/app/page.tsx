import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { SERVICE_PILLARS, CLIENT_TESTIMONIALS } from "@/lib/data";

const FACTS = [
  { value: "98%", label: "on-time shift check-ins" },
  { value: "<15 min", label: "control-room response" },
  { value: "3", label: "cities: Lagos, Abuja, PH" },
];

const SHORT_TITLES: Record<string, { title: string; line: string }> = {
  security: { title: "Guarding", line: "Vetted guards for gates, lobbies and convoys." },
  consultancy: { title: "Site audits", line: "We find the gaps before someone else does." },
  training: { title: "Training", line: "Drills and certification for your own team." },
};

export default function HomePage() {
  const quote = CLIENT_TESTIMONIALS[0];

  return (
    <div className="bg-[#F8FAFC] text-[#0F172A]">
      {/* Hero: full-bleed photo, one line of copy */}
      <section className="relative isolate overflow-hidden bg-[#0B1120] text-white">
        <img
          src="/images/hero-commercial-guard.jpg"
          alt="Josie Shield officer checking visitor credentials at a commercial lobby"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_20%] opacity-60"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/80 to-transparent" />

        <div className="mx-auto flex min-h-[640px] max-w-[1200px] flex-col justify-end px-4 pb-14 pt-28 sm:px-6 lg:min-h-[720px] lg:px-8 lg:pb-16">
          <h1 className="font-condensed max-w-[820px] text-[64px] font-extrabold uppercase leading-[0.9] tracking-[-0.01em] sm:text-[96px] lg:text-[120px]">
            On post.
            <br />
            <span className="text-[#F59E0B]">Every shift.</span>
          </h1>
          <p className="mt-6 max-w-[440px] text-[17px] leading-[1.5] text-[#CBD5E1]">
            Licensed guards, site audits and security training for businesses across Nigeria.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 rounded-[4px] bg-[#B45309] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#92400E]"
            >
              Request guards
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+2348035520900"
              className="inline-flex items-center gap-2 rounded-[4px] border border-white/30 px-6 py-3.5 font-mono text-[14px] text-white transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4 text-[#F59E0B]" />
              +234 803 552 0900
            </a>
          </div>

          <dl className="mt-14 grid max-w-[760px] grid-cols-3 border-t border-white/15 pt-6">
            {FACTS.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="whitespace-nowrap font-heading text-[24px] font-bold leading-none tabular-nums sm:text-[34px]">
                  {f.value}
                </dd>
                <p className="mt-2 text-[13px] text-[#94A3B8]">{f.label}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Services: three photo rows, one line each */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-[36px] font-bold leading-[1.05] sm:text-[48px]">
            What we do
          </h2>

          <div className="mt-12 divide-y divide-[#E2E8F0] border-y border-[#E2E8F0]">
            {SERVICE_PILLARS.map((pillar, i) => {
              const copy = SHORT_TITLES[pillar.key];
              return (
                <Link
                  key={pillar.key}
                  href={`/services#${pillar.key}`}
                  className="group grid grid-cols-12 items-center gap-4 py-6 sm:gap-8"
                >
                  <span className="col-span-2 font-mono text-[13px] text-[#64748B] sm:col-span-1">
                    0{i + 1}
                  </span>
                  <div className="col-span-10 sm:col-span-6">
                    <h3 className="font-heading text-[28px] font-bold leading-tight transition-colors group-hover:text-[#B45309] sm:text-[40px]">
                      {copy.title}
                    </h3>
                    <p className="mt-1 text-[15px] text-[#475569]">{copy.line}</p>
                  </div>
                  <div className="col-span-12 overflow-hidden rounded-[4px] sm:col-span-4">
                    <img
                      src={pillar.image}
                      alt={pillar.imageCaption}
                      className="aspect-[16/9] w-full object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                  </div>
                  <ArrowUpRight className="hidden h-6 w-6 text-[#94A3B8] transition-colors group-hover:text-[#B45309] sm:col-span-1 sm:block sm:justify-self-end" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* One client voice */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[960px] px-4 sm:px-6 lg:px-8">
          <blockquote>
            <p className="font-heading text-[26px] font-semibold leading-[1.3] sm:text-[34px]">
              “Shift handovers run to the minute. We never have to chase a supervisor.”
            </p>
            <footer className="mt-8 flex items-center justify-between gap-4 border-t border-[#E2E8F0] pt-5 text-[14px]">
              <span>
                <span className="font-semibold">{quote.clientName}</span>
                <span className="text-[#475569]"> · {quote.role}, {quote.organisation}</span>
              </span>
              <Link href="/testimonials" className="shrink-0 font-semibold hover:text-[#B45309]">
                More clients →
              </Link>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-[#0F172A] text-white">
        <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:px-8 lg:py-20">
          <h2 className="font-condensed text-[48px] font-extrabold uppercase leading-[0.92] sm:text-[72px]">
            Need guards
            <br />
            this week?
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 rounded-[4px] bg-[#B45309] px-6 py-3.5 text-[15px] font-semibold hover:bg-[#92400E]"
            >
              Get a quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/2348035520900"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-[4px] border border-white/30 px-6 py-3.5 text-[15px] font-semibold hover:bg-white/10"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
