"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  SANEF_PROJECTS,
  SANEF_PARTNERS,
  SANEF_TESTIMONIALS,
  getLiveProjects,
  getLivePartners,
  type SANEFProjectRecord,
  type PartnerProfile,
} from "@/lib/data";

const SHORT_TITLES: Record<string, string> = {
  "ajegunle-orile-solar-corridor": "Solar lights on the school route",
  "kafanchan-youth-mediation-bench": "Youth mediators & trades",
  "mushin-primary-school-safe-crossings": "Safe school crossings",
  "makoko-waterfront-emergency-radio": "Waterfront radio watch",
};

const NUMBERS = [
  { value: "142", label: "solar poles lit" },
  { value: "64,850", label: "people walk them weekly" },
  { value: "−43%", label: "fewer incidents after dark" },
];

export default function HomePage() {
  const [projects, setProjects] = useState<SANEFProjectRecord[]>(SANEF_PROJECTS.slice(0, 3));
  const [partners, setPartners] = useState<PartnerProfile[]>(SANEF_PARTNERS);
  const voice = SANEF_TESTIMONIALS[0];

  useEffect(() => {
    async function load() {
      const p = await getLiveProjects();
      if (p.length > 0) setProjects(p.slice(0, 3));
      const parts = await getLivePartners();
      if (parts.length > 0) setPartners(parts);
    }
    load();
  }, []);

  return (
    <div className="bg-[#FAF8F5] text-[#1C1917]">
      {/* Hero: big statement with an inline photo pill */}
      <section className="mx-auto max-w-[1200px] px-4 pb-10 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <h1 className="text-[52px] font-bold leading-[0.98] tracking-[-0.045em] sm:text-[84px] lg:text-[112px]">
          Safer streets,
          <br />
          <span className="inline-flex items-center gap-3 sm:gap-5">
            <span
              aria-hidden
              className="inline-block h-[0.72em] w-[1.6em] rounded-full bg-cover bg-center align-middle"
              style={{ backgroundImage: "url(/images/neighborhood-children.jpg)" }}
            />
            <span className="font-accent font-normal italic tracking-[-0.02em] text-[#1B4332]">
              built
            </span>
          </span>{" "}
          by neighbours.
        </h1>

        <div className="mt-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <p className="max-w-[420px] text-[18px] leading-[1.5] text-[#57534E]">
            We light school routes, train youth mediators and connect local watch teams in Lagos
            and Kaduna.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 rounded-full bg-[#1B4332] px-7 py-3.5 text-[15px] font-semibold text-[#FAF8F5] hover:bg-[#143326]"
            >
              Donate
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center rounded-full border border-[#1C1917]/20 px-7 py-3.5 text-[15px] font-semibold hover:border-[#1B4332] hover:text-[#1B4332]"
            >
              See our work
            </Link>
          </div>
        </div>
      </section>

      {/* Wide photo with numbers sitting on it */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <figure className="relative overflow-hidden rounded-[20px]">
          <img
            src="/images/ajegunle-solar-dusk.jpg"
            alt="Boundary Road school route in Ajegunle, lit by SANEF solar poles at dusk"
            className="aspect-[4/5] w-full object-cover sm:aspect-[21/9]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-6 pb-6 pt-24 sm:px-10 sm:pb-8">
            <dl className="grid grid-cols-3 gap-4 text-white">
              {NUMBERS.map((n) => (
                <div key={n.label}>
                  <dd className="text-[30px] font-bold leading-none tracking-[-0.03em] tabular-nums sm:text-[52px]">
                    {n.value}
                  </dd>
                  <dt className="mt-2 text-[13px] text-white/80 sm:text-[15px]">{n.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </figure>
      </section>

      {/* Projects: image-led, title only */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-[36px] font-bold leading-none sm:text-[52px]">Our work</h2>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1 text-[15px] font-semibold text-[#1B4332] hover:underline"
            >
              All projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {projects.map((p) => (
              <Link key={p.slug} href={`/portfolio?project=${p.slug}`} className="group">
                <div className="overflow-hidden rounded-[16px]">
                  <img
                    src={p.coverImage}
                    alt={p.title}
                    className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[21px] font-semibold leading-snug tracking-[-0.02em]">
                      {SHORT_TITLES[p.slug] ?? p.title}
                    </h3>
                    <p className="mt-1 text-[14px] text-[#57534E]">{p.location}</p>
                  </div>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[#A8A29E] transition-colors group-hover:text-[#1B4332]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* One voice */}
      <section className="bg-[#1B4332] text-[#FAF8F5]">
        <div className="mx-auto max-w-[960px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <blockquote>
            <p className="text-[28px] font-semibold leading-[1.25] tracking-[-0.025em] sm:text-[40px]">
              “I used to shut my clinic at 6pm. Now mothers walk past safely after 8.”
            </p>
            <footer className="mt-8 text-[15px] text-[#FAF8F5]/75">
              {voice.author} · {voice.role}
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Partners: names only */}
      <section className="border-b border-[#E7E5E4] py-10">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-10 gap-y-3 px-4 sm:px-6 lg:px-8">
          <span className="text-[14px] text-[#57534E]">With</span>
          {partners.map((p) => (
            <Link
              key={p.slug}
              href="/partnerships"
              className="text-[16px] font-semibold tracking-[-0.01em] text-[#44403C] hover:text-[#1B4332]"
            >
              {p.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Donate */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:px-8">
          <h2 className="max-w-[720px] text-[44px] font-bold leading-[1] tracking-[-0.04em] sm:text-[72px]">
            ₦344,000 lights{" "}
            <span className="font-accent font-normal italic text-[#1B4332]">one</span> more pole.
          </h2>
          <Link
            href="/donate"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#C85A32] px-7 py-4 text-[15px] font-semibold text-white hover:bg-[#AE4B27] lg:self-auto"
          >
            Fund a pole
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
