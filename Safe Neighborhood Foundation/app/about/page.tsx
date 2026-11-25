import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FOCUS_AREAS = [
  {
    number: "01",
    title: "Solar Lighting & Pedestrian Corridors",
    summary:
      "Mapping dusk choke points with residents and installing custodian-managed solar street poles along school and market walkways.",
  },
  {
    number: "02",
    title: "Youth Mediation & Vocational Benches",
    summary:
      "Pairing restorative peer dispute resolution with hands-on electrical and solar maintenance apprenticeships.",
  },
  {
    number: "03",
    title: "Safe School Routes & Parent Marshals",
    summary:
      "Designing marked crossings, dismissal wave protocols, and parent crossing teams outside high-traffic public primary schools.",
  },
  {
    number: "04",
    title: "Open Field Audits & Civic Evidence",
    summary:
      "Publishing photometric light readings, ward safety baselines, and grant disbursements as downloadable PDFs.",
  },
];

const VALUES = [
  { name: "Resident Co-Design", detail: "No hardware is placed without walking the route alongside local households and traders first." },
  { name: "Published Evidence", detail: "Outcomes are measured six and twelve months post-commissioning and released publicly, including setbacks." },
  { name: "Local Custodianship", detail: "Every pole, radio, and crossing is paired with named community stewards trained for ongoing upkeep." },
  { name: "Financial Accountability", detail: "Campaign disbursements are independently reconciled and separated cleanly from administrative overhead." },
];

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F5] py-12 lg:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 gap-10 border-b border-[#E7E5E4] pb-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#1B4332]">
              Institutional Profile
            </p>
            <h1 className="mt-2 font-serif text-[38px] font-medium leading-[1.1] tracking-[-0.02em] text-[#1C1917] sm:text-[48px]">
              Safe Neighborhood Foundation exists so public safety is built with communities, not around them.
            </h1>
            <p className="mt-5 text-[16px] leading-[1.7] text-[#57534E]">
              Founded in Lagos in 2021, SANEF works across underserved urban wards and transit
              towns to close everyday physical safety gaps—dark school lanes, dangerous road
              crossings, and youth exclusion—while publishing verifiable field audits for every naira spent.
            </p>
          </div>
          <div className="lg:col-span-5">
            <figure className="overflow-hidden rounded-[10px] border border-[#E7E5E4] bg-white">
              <div className="aspect-[4/3] overflow-hidden bg-[#E7E5E4]">
                <img
                  src="/images/solar-committee.jpg"
                  alt="SANEF community safety review session"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="border-t border-[#E7E5E4] px-4 py-3 text-[12px] text-[#57534E]">
                Ward safety review with local street custodians · Lagos, 2026
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 gap-6 py-14 md:grid-cols-2">
          <div className="rounded-[10px] border border-[#E7E5E4] bg-white p-7">
            <p className="font-mono text-[12px] font-semibold  text-[#1B4332]">
              Our Mission
            </p>
            <p className="mt-3 font-serif text-[24px] font-medium leading-snug text-[#1C1917]">
              Deliver practical, community-maintained safety infrastructure and youth mediation
              programmes backed by open empirical evidence.
            </p>
          </div>
          <div className="rounded-[10px] border border-[#E7E5E4] bg-white p-7">
            <p className="font-mono text-[12px] font-semibold  text-[#C85A32]">
              Our Vision
            </p>
            <p className="mt-3 font-serif text-[24px] font-medium leading-snug text-[#1C1917]">
              Neighborhoods where children walk to school safely, evening commerce thrives without
              fear, and local stewards hold public impact data in their own hands.
            </p>
          </div>
        </div>

        {/* Areas of Focus */}
        <section className="border-t border-[#E7E5E4] py-14">
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#1B4332]">
            Areas of Focus
          </p>
          <h2 className="mt-2 font-serif text-[32px] font-medium text-[#1C1917]">
            Four Core Field Programmes
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {FOCUS_AREAS.map((area) => (
              <div key={area.number} className="rounded-[10px] border border-[#E7E5E4] bg-white p-6">
                <span className="font-mono text-[12px] font-semibold text-[#C85A32]">
                  {area.number}
                </span>
                <h3 className="mt-2 font-serif text-[23px] font-medium text-[#1C1917]">
                  {area.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-[#57534E]">
                  {area.summary}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Core Values & Governance */}
        <section id="governance" className="border-t border-[#E7E5E4] py-14">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#1B4332]">
                Values & Governance
              </p>
              <h2 className="mt-2 font-serif text-[32px] font-medium text-[#1C1917]">
                How We Operate
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#57534E]">
                SANEF is governed by an independent five-member Board of Trustees and adheres to
                strict safeguarding, data minimisation, and annual external audit rules.
              </p>
              <Link
                href="/portfolio"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1B4332] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#143326]"
              >
                Inspect Public Audits
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
              {VALUES.map((v) => (
                <div key={v.name} className="rounded-[10px] border border-[#E7E5E4] bg-white p-5">
                  <h3 className="font-serif text-[20px] font-medium text-[#1C1917]">{v.name}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#57534E]">{v.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
