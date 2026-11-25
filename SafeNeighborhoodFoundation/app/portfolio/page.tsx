"use client";

import React, { useMemo, useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  FileText,
  ExternalLink,
  ArrowLeft,
  Download,
  MapPin,
  CheckCircle2,
  Camera,
  ChevronDown,
} from "lucide-react";
import { SANEF_PROJECTS, type SANEFProjectRecord } from "@/lib/data";

function PortfolioArchiveContent() {
  const searchParams = useSearchParams();
  const initialSlug = searchParams.get("project");

  const [projectsList, setProjectsList] = useState<SANEFProjectRecord[]>(SANEF_PROJECTS);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSlug);
  const [category, setCategory] = useState<string>("All");
  const [year, setYear] = useState<string>("All");
  const [partner, setPartner] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const dashboardApi = process.env.NEXT_PUBLIC_DASHBOARD_API_URL || "http://localhost:3000";
        const res = await fetch(`${dashboardApi}/api/content?type=projects`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && json.data.length > 0) {
            const mapped = json.data.map((p: any) => ({
              slug: p.slug || (p.title ? p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "project"),
              refId: p.referenceCode || p.refId || `SAN-PRJ-2026-0${p.id.substring(0, 3)}`,
              title: p.title,
              category: p.category || "Solar Corridors",
              location: p.location || "Lagos, Nigeria",
              date: p.date || "2026",
              year: p.year || "2026",
              summary: p.summary || "",
              detailedDescription: p.detailedDescription || p.summary || "",
              outcomesSummary: p.outcomes || p.outcomesSummary || "Field verified community impact.",
              outcomesMetrics: p.outcomesMetrics || [
                { label: "Audit Status", value: p.status || "Audited" },
                { label: "Attached Records", value: `${p.photoCount || 4} Photos · ${p.pdfCount || 1} Report` },
              ],
              partners: p.partners || p.partnerNames || ["Ajeromi-Ifelodun Ward Council"],
              coverImage: p.coverImage || "/images/ajegunle-solar-dusk.jpg",
              coverCaption: `${p.title} · ${p.location}`,
              gallery: p.gallery || [
                { src: "/images/ajegunle-solar-dusk.jpg", caption: "Field site overview." },
                { src: "/images/ajegunle-lux-check.jpg", caption: "Photometric audit verification." },
              ],
              photoCount: p.photoCount || 4,
              pdfCount: p.pdfCount || 1,
              reports: p.reports || [],
              featured: Boolean(p.featured),
            }));
            setProjectsList(mapped);
          }
        }
      } catch (e) {
        // Fall back to SANEF_PROJECTS
      }
    }
    loadProjects();
  }, []);

  const categories = ["All", "Solar Corridors", "Youth Mediation", "School Safety", "Community Watch"];
  const years = ["All", "2026", "2025"];
  const allPartners = useMemo(
    () => ["All", ...Array.from(new Set(projectsList.flatMap((p) => p.partners)))],
    [projectsList]
  );

  const filteredProjects = useMemo(() => {
    return projectsList.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (year !== "All" && p.year !== year) return false;
      if (partner !== "All" && !p.partners.includes(partner)) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.refId.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [projectsList, category, year, partner, query]);

  const activeProject: SANEFProjectRecord | null =
    projectsList.find((p) => p.slug === selectedSlug) || null;

  const triggerDownloadFeedback = (fileName: string) => {
    setDownloadNotice(`Prepared verified PDF archive file: ${fileName}`);
    setTimeout(() => setDownloadNotice(null), 3200);
  };

  // =========================================================================
  // STRUCTURED PROJECT DETAIL VIEW (Balanced 2-col dossier + Full-Width Gallery)
  // =========================================================================
  if (activeProject) {
    return (
      <div className="bg-[#FAF8F5] py-12 lg:py-16">
        <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setSelectedSlug(null)}
            className="inline-flex items-center gap-2 rounded-full border border-[#E7E5E4] bg-white px-4 py-2 text-[13px] font-semibold text-[#1C1917] hover:border-[#1B4332] hover:text-[#1B4332]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio & Evidence Archive
          </button>

          {downloadNotice && (
            <div className="mt-4 flex items-center gap-2 rounded-[10px] border border-[#1B4332]/25 bg-[#1B4332]/5 px-4 py-3 text-[13px] font-medium text-[#1B4332]">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              {downloadNotice}
            </div>
          )}

          {/* Header */}
          <div className="mt-8 border-b border-[#E7E5E4] pb-8">
            <div className="flex flex-wrap items-center gap-3 text-[12px]">
              <span className="rounded-full border border-[#1B4332]/20 bg-[#1B4332]/5 px-3 py-1 font-semibold text-[#1B4332]">
                {activeProject.category}
              </span>
              <span className="font-mono text-[#57534E]">{activeProject.refId}</span>
              <span className="text-[#D6D3D1]">·</span>
              <span className="flex items-center gap-1 text-[#57534E]">
                <MapPin className="h-3.5 w-3.5 text-[#1B4332]" />
                {activeProject.location}
              </span>
              <span className="text-[#D6D3D1]">·</span>
              <span className="font-mono text-[#57534E]">{activeProject.date}</span>
            </div>
            <h1 className="mt-4 font-serif text-[34px] font-medium leading-[1.12] tracking-[-0.02em] text-[#1C1917] sm:text-[44px]">
              {activeProject.title}
            </h1>
            <p className="mt-4 max-w-[780px] text-[17px] leading-relaxed text-[#57534E]">
              {activeProject.summary}
            </p>
          </div>

          {/* 2-Column Balanced Dossier (Zero dead void in right rail!) */}
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left Main Narrative + Outcomes Callout */}
            <div className="space-y-8 lg:col-span-8">
              <figure className="overflow-hidden rounded-[10px] border border-[#E7E5E4] bg-white">
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#E7E5E4]">
                  <img
                    src={activeProject.coverImage}
                    alt={activeProject.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="border-t border-[#E7E5E4] px-4 py-3 text-[12px] text-[#57534E]">
                  {activeProject.coverCaption}
                </figcaption>
              </figure>

              <div>
                <h2 className="font-serif text-[26px] font-medium text-[#1C1917]">
                  Field Summary & Implementation Scope
                </h2>
                <p className="mt-3 text-[15px] leading-[1.75] text-[#57534E]">
                  {activeProject.detailedDescription}
                </p>
              </div>

              {/* Outcomes & Impact Callout Box */}
              <div className="rounded-[10px] border border-[#1B4332]/25 bg-white p-6 sm:p-7">
                <p className="text-[12px] font-semibold text-[#1B4332]">
                  Verified Outcomes & Impact
                </p>
                <p className="mt-2.5 text-[15px] leading-relaxed text-[#1C1917]">
                  {activeProject.outcomesSummary}
                </p>
                <div className="mt-6 grid grid-cols-1 gap-4 border-t border-[#E7E5E4] pt-5 sm:grid-cols-3">
                  {activeProject.outcomesMetrics.map((m) => (
                    <div key={m.label}>
                      <p className="font-serif text-[28px] font-medium text-[#1B4332] tabular-nums">
                        {m.value}
                      </p>
                      <p className="mt-0.5 text-[12px] text-[#57534E]">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Audit Ledger + Partners + Flattened Downloadable Reports */}
            <aside className="space-y-6 lg:col-span-4">
              {/* Field Audit Metadata */}
              <div className="rounded-[10px] border border-[#E7E5E4] bg-white p-5">
                <h3 className="font-serif text-[20px] font-medium text-[#1C1917]">
                  Field Audit Record
                </h3>
                <dl className="mt-3.5 divide-y divide-[#E7E5E4] text-[13px]">
                  <div className="flex justify-between py-2.5">
                    <dt className="text-[#57534E]">Archive Reference</dt>
                    <dd className="font-mono font-medium text-[#1C1917]">{activeProject.refId}</dd>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <dt className="text-[#57534E]">Commissioned</dt>
                    <dd className="font-mono text-[#1C1917]">{activeProject.date}</dd>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <dt className="text-[#57534E]">Evidence Attached</dt>
                    <dd className="font-mono text-[#1C1917]">
                      {activeProject.photoCount} Photos · {activeProject.pdfCount}{" "}
                      {activeProject.pdfCount === 1 ? "PDF" : "PDFs"}
                    </dd>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <dt className="text-[#57534E]">Audit Status</dt>
                    <dd className="font-semibold text-[#1B4332]">Published & Verified</dd>
                  </div>
                </dl>
              </div>

              {/* Partner Organisations Involved */}
              <div className="rounded-[10px] border border-[#E7E5E4] bg-white p-5">
                <h3 className="font-serif text-[20px] font-medium text-[#1C1917]">
                  Partner Organisations
                </h3>
                <ul className="mt-3.5 divide-y divide-[#E7E5E4]">
                  {activeProject.partners.map((pName) => (
                    <li key={pName} className="py-3 first:pt-0 last:pb-0">
                      <Link
                        href="/partnerships"
                        className="flex items-center justify-between text-[14px] font-medium text-[#1C1917] hover:text-[#1B4332]"
                      >
                        <span>{pName}</span>
                        <ExternalLink className="h-3.5 w-3.5 text-[#57534E]" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dedicated Downloadable Reports & External Links (Flattened, zero nested boxes) */}
              <div className="rounded-[10px] border border-[#E7E5E4] bg-white p-5">
                <h3 className="font-serif text-[20px] font-medium text-[#1C1917]">
                  Downloadable Reports & External Links
                </h3>
                <p className="mt-1 text-[12px] text-[#57534E]">
                  Verified field datasets, PDF audits, and independent press citations.
                </p>
                <div className="mt-4 divide-y divide-[#E7E5E4]">
                  {activeProject.reports.map((rep) => (
                    <div key={rep.id} className="py-3.5 first:pt-0 last:pb-0">
                      <div className="flex items-start gap-2.5">
                        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-[#C85A32]" />
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] font-semibold leading-snug text-[#1C1917]">
                            {rep.title}
                          </p>
                          <p className="mt-1 font-mono text-[12px] text-[#57534E]">
                            {rep.type} · {rep.fileSize} · {rep.publishedDate}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2.5 pl-6">
                        {rep.type === "External Press" ? (
                          <a
                            href={rep.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1B4332] hover:text-[#C85A32]"
                          >
                            Read external press link
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() => triggerDownloadFeedback(rep.fileName)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-[#E7E5E4] bg-[#FAF8F5] px-3 py-1 text-[12px] font-semibold text-[#1C1917] hover:border-[#1B4332] hover:text-[#1B4332]"
                          >
                            <Download className="h-3.5 w-3.5" />
                            Download PDF ({rep.fileSize})
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* Full-Width Documentary Media Gallery Strip (Zero right-column empty space!) */}
          <section className="mt-14 border-t border-[#E7E5E4] pt-10">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-serif text-[28px] font-medium text-[#1C1917]">
                Documentary Media Gallery
              </h2>
              <span className="inline-flex items-center gap-1.5 font-mono text-[12px] text-[#57534E]">
                <Camera className="h-3.5 w-3.5 text-[#1B4332]" />
                {activeProject.photoCount} archived field photos
              </span>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {activeProject.gallery.map((item) => (
                <figure
                  key={item.caption}
                  className="overflow-hidden rounded-[10px] border border-[#E7E5E4] bg-white"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#E7E5E4]">
                    <img
                      src={item.src}
                      alt={item.caption}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="border-t border-[#E7E5E4] px-3.5 py-2.5 text-[12px] leading-snug text-[#57534E]">
                    {item.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // =========================================================================
  // STRUCTURED PORTFOLIO & EVIDENCE ARCHIVE INDEX
  // =========================================================================
  return (
    <div className="bg-[#FAF8F5] py-12 lg:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-[760px]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#1B4332]">
            Open Evidence Repository
          </p>
          <h1 className="mt-2 font-serif text-[38px] font-medium leading-[1.1] tracking-[-0.02em] text-[#1C1917] sm:text-[46px]">
            Portfolio & Evidence Archive
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-[#57534E]">
            Every SANEF programme is published as a structured record containing field photography,
            partner contributions, verified outcomes, and downloadable PDF audit reports.
          </p>
        </div>

        {/* Filter Bar with Custom Styled Selects */}
        <div className="mt-10 space-y-4 rounded-[10px] border border-[#E7E5E4] bg-white p-5">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors ${
                    active
                      ? "bg-[#1B4332] text-[#FAF8F5]"
                      : "border border-[#E7E5E4] bg-[#FAF8F5] text-[#57534E] hover:border-[#1B4332] hover:text-[#1C1917]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-3 border-t border-[#E7E5E4] pt-4 sm:grid-cols-12">
            <div className="relative sm:col-span-6">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-[#57534E]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search project title, ward, location, or reference ID..."
                className="w-full rounded-[8px] border border-[#E7E5E4] bg-[#FAF8F5] py-2 pl-9 pr-3 text-[14px] text-[#1C1917] placeholder:text-[#57534E] focus:border-[#1B4332] focus:bg-white focus:outline-none"
              />
            </div>
            <div className="relative sm:col-span-3">
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full appearance-none rounded-[8px] border border-[#E7E5E4] bg-white py-2 pl-3 pr-9 text-[14px] text-[#1C1917] focus:border-[#1B4332] focus:outline-none"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y === "All" ? "Year: All Years" : `Year: ${y}`}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-[#57534E]" />
            </div>
            <div className="relative sm:col-span-3">
              <select
                value={partner}
                onChange={(e) => setPartner(e.target.value)}
                className="w-full appearance-none rounded-[8px] border border-[#E7E5E4] bg-white py-2 pl-3 pr-9 text-[14px] text-[#1C1917] focus:border-[#1B4332] focus:outline-none"
              >
                {allPartners.map((p) => (
                  <option key={p} value={p}>
                    {p === "All" ? "Partner: All Partners" : p}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-[#57534E]" />
            </div>
          </div>
        </div>

        {/* Structured Project Cards Grid */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full rounded-[10px] border border-[#E7E5E4] bg-white p-12 text-center">
              <p className="font-serif text-[22px] text-[#1C1917]">No archived records match your filter.</p>
              <button
                type="button"
                onClick={() => {
                  setCategory("All");
                  setYear("All");
                  setPartner("All");
                  setQuery("");
                }}
                className="mt-4 rounded-full bg-[#1B4332] px-5 py-2 text-[13px] font-semibold text-white"
              >
                Reset Archive Filters
              </button>
            </div>
          ) : (
            filteredProjects.map((prj) => (
              <article
                key={prj.slug}
                className="flex flex-col overflow-hidden rounded-[10px] border border-[#E7E5E4] bg-white transition-colors hover:border-[#1B4332]"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#E7E5E4]">
                  <img
                    src={prj.coverImage}
                    alt={prj.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[12px]">
                      <span className="rounded-full border border-[#1B4332]/20 bg-[#1B4332]/5 px-2.5 py-0.5 font-semibold text-[#1B4332]">
                        {prj.category}
                      </span>
                      <span className="font-mono text-[12px] text-[#57534E]">
                        {prj.refId} · {prj.date}
                      </span>
                    </div>
                    <h2 className="mt-3 font-serif text-[24px] font-medium leading-snug text-[#1C1917]">
                      {prj.title}
                    </h2>
                    <p className="mt-1 text-[13px] text-[#57534E]">{prj.location}</p>
                    <p className="mt-3 text-[14px] leading-relaxed text-[#57534E]">
                      {prj.summary}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#E7E5E4] pt-4">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[12px] font-medium text-[#1C1917]">
                      <FileText className="h-3.5 w-3.5 text-[#C85A32]" />
                      {prj.photoCount} Photos • {prj.pdfCount}{" "}
                      {prj.pdfCount === 1 ? "PDF Report" : "PDF Reports"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedSlug(prj.slug)}
                      className="rounded-full bg-[#1B4332] px-4 py-1.5 text-[13px] font-semibold text-[#FAF8F5] hover:bg-[#143326]"
                    >
                      View Evidence Dossier
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-[1200px] px-6 py-16 text-[#57534E]">Loading evidence archive...</div>}>
      <PortfolioArchiveContent />
    </Suspense>
  );
}
