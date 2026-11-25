import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText, MapPin } from "lucide-react";
import PartnerMark from "@/components/PartnerMark";
import {
  VERIFIED_IMPACT_STATS,
  SANEF_PROJECTS,
  SANEF_PARTNERS,
  SANEF_EVENTS,
  SANEF_BLOG_POSTS,
  SANEF_TESTIMONIALS,
} from "@/lib/data";

export default function HomePage() {
  const leadProject = SANEF_PROJECTS[0];
  const secondaryProjects = SANEF_PROJECTS.slice(1, 3);
  const upcomingEvents = SANEF_EVENTS.filter((e) => e.status === "Upcoming");

  return (
    <div className="bg-[#FAF8F5] text-[#1C1917]">
      {/* ===================================================================== */}
      {/* 1. EDITORIAL SPLIT HERO                                               */}
      {/* ===================================================================== */}
      <section className="border-b border-[#E7E5E4]">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-8 lg:py-20">
          {/* Left Column: Mission Headline + Overview + Pill CTAs */}
          <div className="lg:col-span-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#1B4332]">
              Safe Neighborhood Foundation · Annual Field Record
            </p>
            <h1 className="mt-4 font-serif text-[40px] font-medium leading-[1.08] tracking-[-0.025em] text-[#1C1917] sm:text-[52px]">
              Safer streets built with residents,{" "}
              <span className="italic text-[#1B4332]">documented in the open.</span>
            </h1>
            <p className="mt-6 max-w-[520px] text-[16px] leading-[1.65] text-[#57534E]">
              SANEF partners with municipal wards, local schools, and civic funders to deliver
              solar-lit pedestrian corridors, youth mediation benches, and community safety
              networks. Every programme is audited and published in our open evidence archive.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full bg-[#1B4332] px-6 py-3 text-[14px] font-semibold text-[#FAF8F5] transition-colors hover:bg-[#143326]"
              >
                Explore Our Work
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 rounded-full border border-[#1C1917]/20 bg-white px-6 py-3 text-[14px] font-semibold text-[#1C1917] transition-colors hover:border-[#1B4332] hover:text-[#1B4332]"
              >
                Support a Campaign
              </Link>
            </div>
          </div>

          {/* Right Column: Grounded Full-Bleed Documentary Photo Frame + Caption Bar */}
          <div className="lg:col-span-6">
            <figure className="overflow-hidden rounded-[10px] border border-[#E7E5E4] bg-white">
              <div className="aspect-[16/11] w-full overflow-hidden bg-[#E7E5E4]">
                <img
                  src="/images/ajegunle-lux-check.jpg"
                  alt="SANEF infrastructure engineer and local ward custodians verifying solar street lighting at twilight"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-[#E7E5E4] bg-white px-4 py-3 text-[12px] text-[#57534E]">
                <span className="flex items-center gap-1.5 font-medium text-[#1C1917]">
                  <MapPin className="h-3.5 w-3.5 text-[#1B4332]" />
                  Boundary Road Dusk Light-Meter Audit, Lagos
                </span>
                <span className="font-mono text-[12px] text-[#57534E]">
                  2026 Field Verification
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. VERIFIED IMPACT STRIP (4 Columns, Vertical Hairlines, No Icons)    */}
      {/* ===================================================================== */}
      <section className="border-b border-[#E7E5E4] bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-[#E7E5E4]">
            {VERIFIED_IMPACT_STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className={`${idx === 0 ? "lg:pr-8" : idx === 3 ? "lg:pl-8" : "lg:px-8"}`}
              >
                <p className="font-serif text-[38px] font-medium leading-none tracking-[-0.02em] text-[#1B4332] tabular-nums">
                  {stat.value}
                </p>
                <p className="mt-2.5 text-[14px] font-medium leading-snug text-[#1C1917]">
                  {stat.label}
                </p>
                <p className="mt-1 font-mono text-[12px] text-[#57534E]">{stat.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. FEATURED PROJECTS & EVIDENCE PREVIEW (Asymmetric 2-Col Editorial)  */}
      {/* ===================================================================== */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 border-b border-[#E7E5E4] pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#1B4332]">
                Portfolio & Evidence Archive
              </p>
              <h2 className="mt-2 font-serif text-[32px] font-medium leading-tight tracking-[-0.02em] text-[#1C1917] sm:text-[38px]">
                Featured Programmes & Field Reports
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#1B4332] hover:text-[#C85A32]"
            >
              Browse full archive
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Lead Documentary Feature (7 cols) */}
            <article className="flex flex-col overflow-hidden rounded-[10px] border border-[#E7E5E4] bg-white lg:col-span-7">
              <div className="aspect-[16/10] w-full overflow-hidden bg-[#E7E5E4]">
                <img
                  src={leadProject.coverImage}
                  alt={leadProject.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 text-[12px]">
                    <span className="rounded-full border border-[#1B4332]/20 bg-[#1B4332]/5 px-2.5 py-0.5 font-medium text-[#1B4332]">
                      {leadProject.category}
                    </span>
                    <span className="text-[#57534E]">{leadProject.location}</span>
                    <span className="text-[#D6D3D1]">·</span>
                    <span className="font-mono text-[12px] text-[#57534E]">{leadProject.date}</span>
                  </div>
                  <h3 className="mt-3.5 font-serif text-[26px] font-medium leading-snug tracking-[-0.015em] text-[#1C1917]">
                    <Link
                      href={`/portfolio?project=${leadProject.slug}`}
                      className="hover:text-[#1B4332]"
                    >
                      {leadProject.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#57534E]">
                    {leadProject.summary}
                  </p>
                  <div className="mt-6 grid grid-cols-3 gap-4 rounded-[8px] border border-[#E7E5E4] bg-[#FAF8F5] p-4">
                    {leadProject.outcomesMetrics.map((m) => (
                      <div key={m.label}>
                        <p className="font-serif text-[22px] font-medium text-[#1B4332] tabular-nums">
                          {m.value}
                        </p>
                        <p className="mt-0.5 text-[12px] leading-snug text-[#57534E]">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 text-[14px] leading-relaxed text-[#57534E]">
                    {leadProject.outcomesSummary}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#E7E5E4] pt-4">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[12px] font-medium text-[#1C1917]">
                    <FileText className="h-3.5 w-3.5 text-[#C85A32]" />
                    {leadProject.photoCount} Photos • {leadProject.pdfCount}{" "}
                    {leadProject.pdfCount === 1 ? "PDF Report" : "PDF Reports"}
                  </span>
                  <Link
                    href={`/portfolio?project=${leadProject.slug}`}
                    className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#1B4332] hover:text-[#C85A32]"
                  >
                    Inspect Evidence
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>

            {/* Stacked Editorial Records with Rich Documentary Thumbnails (5 cols) */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              {secondaryProjects.map((prj) => (
                <article
                  key={prj.slug}
                  className="flex flex-1 flex-col overflow-hidden rounded-[10px] border border-[#E7E5E4] bg-white"
                >
                  <div className="aspect-[16/7] w-full overflow-hidden border-b border-[#E7E5E4] bg-[#E7E5E4]">
                    <img
                      src={prj.coverImage}
                      alt={prj.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[12px]">
                        <span className="rounded-full border border-[#1B4332]/20 bg-[#1B4332]/5 px-2.5 py-0.5 font-medium text-[#1B4332]">
                          {prj.category}
                        </span>
                        <span className="font-mono text-[12px] text-[#57534E]">{prj.date}</span>
                      </div>
                      <h3 className="mt-2.5 font-serif text-[21px] font-medium leading-snug tracking-[-0.015em] text-[#1C1917]">
                        <Link
                          href={`/portfolio?project=${prj.slug}`}
                          className="hover:text-[#1B4332]"
                        >
                          {prj.title}
                        </Link>
                      </h3>
                      <p className="mt-1 text-[13px] text-[#57534E]">{prj.location}</p>
                      <p className="mt-2 text-[14px] leading-relaxed text-[#57534E]">
                        {prj.summary}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[#E7E5E4] pt-3.5">
                      <span className="font-mono text-[12px] font-medium text-[#1C1917]">
                        {prj.photoCount} Photos • {prj.pdfCount}{" "}
                        {prj.pdfCount === 1 ? "PDF Report" : "PDF Reports"}
                      </span>
                      <Link
                        href={`/portfolio?project=${prj.slug}`}
                        className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#1B4332] hover:text-[#C85A32]"
                      >
                        Open Record
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. PARTNER ORGANISATIONS STRIP (Monochrome Wordmarks + Link)          */}
      {/* ===================================================================== */}
      <section className="border-y border-[#E7E5E4] bg-white py-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#57534E]">
              Documented Institutional & Municipal Partners
            </p>
            <Link
              href="/partnerships"
              className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#1B4332] hover:text-[#C85A32]"
            >
              View partnership profiles
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SANEF_PARTNERS.map((partner) => (
              <Link
                key={partner.slug}
                href="/partnerships"
                className="flex items-center gap-3.5 rounded-[10px] border border-[#E7E5E4] bg-[#FAF8F5] px-4 py-3.5 transition-colors hover:border-[#1B4332]"
              >
                <PartnerMark monogram={partner.monogram} size="sm" />
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold leading-snug text-[#1C1917]">
                    {partner.name}
                  </p>
                  <p className="mt-0.5 text-[12px] text-[#57534E]">{partner.partnershipType}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 5. UPCOMING EVENTS & LATEST NEWS (Clean List + Left Date Badges)      */}
      {/* ===================================================================== */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          {/* Upcoming Events List */}
          <div className="lg:col-span-5">
            <div className="flex items-end justify-between border-b border-[#E7E5E4] pb-4">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#1B4332]">
                  Public Calendar
                </p>
                <h2 className="mt-1 font-serif text-[28px] font-medium text-[#1C1917]">
                  Upcoming Events
                </h2>
              </div>
              <Link href="/events" className="text-[13px] font-semibold text-[#1B4332] hover:text-[#C85A32]">
                All events →
              </Link>
            </div>
            <div className="mt-2 divide-y divide-[#E7E5E4]">
              {upcomingEvents.map((ev) => (
                <div key={ev.id} className="flex items-start gap-4 py-5">
                  <div className="flex w-14 shrink-0 flex-col items-center rounded-[10px] border border-[#E7E5E4] bg-white py-2 text-center">
                    <span className="font-mono text-[12px] font-semibold uppercase text-[#C85A32]">
                      {ev.month}
                    </span>
                    <span className="font-serif text-[22px] font-semibold leading-none text-[#1C1917] tabular-nums">
                      {ev.day}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold  text-[#57534E]">
                      {ev.category}
                    </p>
                    <h3 className="mt-0.5 font-serif text-[19px] font-medium leading-snug text-[#1C1917]">
                      {ev.title}
                    </h3>
                    <p className="mt-1 text-[13px] text-[#57534E]">{ev.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Field Notes / Blog List */}
          <div className="lg:col-span-7">
            <div className="flex items-end justify-between border-b border-[#E7E5E4] pb-4">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#1B4332]">
                  Field Dispatches
                </p>
                <h2 className="mt-1 font-serif text-[28px] font-medium text-[#1C1917]">
                  Latest News & Research
                </h2>
              </div>
              <Link href="/blog" className="text-[13px] font-semibold text-[#1B4332] hover:text-[#C85A32]">
                Read all →
              </Link>
            </div>
            <div className="mt-2 divide-y divide-[#E7E5E4]">
              {SANEF_BLOG_POSTS.map((post) => (
                <article key={post.slug} className="py-5">
                  <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#57534E]">
                    <span className="font-mono text-[12px] text-[#1B4332]">{post.publishedDate}</span>
                    <span>·</span>
                    <span>{post.category}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="mt-1.5 font-serif text-[21px] font-medium leading-snug text-[#1C1917]">
                    <Link href={`/blog/${post.slug}`} className="hover:text-[#1B4332]">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[#57534E]">
                    {post.excerpt}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 6. APPROVED COMMUNITY VOICES + CAMPAIGN SUPPORT BAND                  */}
      {/* ===================================================================== */}
      <section className="border-t border-[#E7E5E4] bg-white py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {SANEF_TESTIMONIALS.map((t) => (
              <blockquote
                key={t.author}
                className="flex flex-col justify-between rounded-[10px] border border-[#E7E5E4] bg-[#FAF8F5] p-7"
              >
                <p className="font-serif text-[20px] italic leading-relaxed text-[#1C1917]">
                  “{t.quote}”
                </p>
                <footer className="mt-5 border-t border-[#E7E5E4] pt-4 text-[13px]">
                  <p className="font-semibold text-[#1C1917]">{t.author}</p>
                  <p className="text-[#57534E]">{t.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[10px] border border-[#1B4332] bg-[#1B4332] p-8 text-[#FAF8F5] md:flex-row md:items-center">
            <div className="max-w-[640px]">
              <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-[#FAF8F5]/75">
                Active 2026 Campaign · Surulere Market Extension
              </p>
              <h2 className="mt-2 font-serif text-[28px] font-medium leading-tight sm:text-[32px]">
                Help fund 54 solar street poles for evening traders and students.
              </h2>
            </div>
            <Link
              href="/donate"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#C85A32] px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#AE4B27]"
            >
              Donate to Campaign
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
