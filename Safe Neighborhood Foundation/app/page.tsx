import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  ArrowRight, 
  Heart, 
  Calendar, 
  FileCheck2, 
  ChevronRight, 
  Users, 
  CheckCircle2, 
  DownloadCloud, 
  MapPin, 
  Sparkles,
  ExternalLink 
} from "lucide-react";
import { SANEF_PROJECTS, SANEF_EVENTS, SANEF_PARTNERS, SANEF_CAMPAIGNS } from "@/lib/data";

export default function HomePage() {
  const featuredProjects = SANEF_PROJECTS.filter((p) => p.isFeatured);
  const upcomingEvents = SANEF_EVENTS.filter((e) => e.isUpcoming);
  const primaryCampaign = SANEF_CAMPAIGNS[0];

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-50/60 via-slate-50 to-slate-50">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-emerald-200 text-xs font-semibold text-emerald-800 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>COMMUNITY SAFETY THROUGH TRANSPARENCY & EVIDENCE</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Safe Neighborhoods Are Built on{" "}
            <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy underline-offset-8">
              Verified Evidence.
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-slate-600 text-base sm:text-lg leading-relaxed">
            Safe Neighborhood Foundation (SANEF) installs solar lighting along vulnerable school corridors, 
            trains at-risk youth in non-violent conflict mediation, and equips community watch first-responders 
            with rapid distress radios.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/portfolio"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm px-8 py-4 rounded-xl shadow-lg shadow-emerald-700/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Explore Evidence Archive</span>
              <FileCheck2 className="w-4 h-4" />
            </Link>
            <Link
              href="/donate"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-sm px-7 py-4 rounded-xl shadow-sm transition-all"
            >
              <Heart className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              <span>Donate to Active Initiatives</span>
            </Link>
          </div>

          {/* Verified Impact Counters */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-left">
              <div className="text-3xl font-extrabold text-slate-900 font-mono">65,000+</div>
              <p className="text-xs text-slate-600 font-medium mt-1">Pedestrians Protected Daily</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-left">
              <div className="text-3xl font-extrabold text-emerald-700 font-mono">140 Units</div>
              <p className="text-xs text-slate-600 font-medium mt-1">Solar Beacons Installed</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-left">
              <div className="text-3xl font-extrabold text-slate-900 font-mono">42.8%</div>
              <p className="text-xs text-slate-600 font-medium mt-1">Audited Crime Reduction</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-left">
              <div className="text-3xl font-extrabold text-emerald-700 font-mono">320+</div>
              <p className="text-xs text-slate-600 font-medium mt-1">Youth Mediators Certified</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED EVIDENCE ARCHIVE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-semibold">
              STRUCTURED MEDIA & REPORT REPOSITORY
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-1">
              Field Evidence & Verified Outcomes
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Every SANEF initiative is recorded with empirical impact metrics, partner signatures, and public downloadable audits.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
          >
            <span>View Complete Archive</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="civic-card civic-card-hover rounded-3xl p-8 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    {project.category}
                  </span>
                  <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    {project.location}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {project.summary}
                </p>

                {/* Impact metrics tags */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                  {project.impactStats.map((stat, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-xs font-bold text-slate-900 font-mono">{stat.value}</p>
                      <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Partners involved */}
                <div className="pt-2 text-[11px] text-slate-500">
                  <strong className="text-slate-700">Participating Partners:</strong>{" "}
                  {project.partners.join(" • ")}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-700 font-medium">
                  <FileCheck2 className="w-4 h-4" />
                  <span>{project.evidenceType} Available</span>
                </span>
                <Link
                  href={`/portfolio?item=${project.slug}`}
                  className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  <span>Inspect Audit Evidence</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TRANSPARENT FUNDRAISING CAMPAIGN SPOTLIGHT */}
      {primaryCampaign && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="civic-card rounded-3xl p-8 sm:p-12 border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white to-slate-50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-700 font-mono">
                  ACTIVE URGENT CAMPAIGN
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {primaryCampaign.title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {primaryCampaign.description}
                </p>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-bold text-slate-900">
                      Raised: ${primaryCampaign.raisedAmount.toLocaleString()} USD
                    </span>
                    <span className="text-slate-500">
                      Goal: ${primaryCampaign.targetAmount.toLocaleString()} USD
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(primaryCampaign.raisedAmount / primaryCampaign.targetAmount) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Supported by <strong>{primaryCampaign.donorCount}</strong> verified donors. 100% of grassroots contributions go directly to field hardware and community stipends.
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href="/donate"
                    className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-6 py-3.5 rounded-xl shadow-md shadow-emerald-700/20 transition-all hover:scale-[1.02]"
                  >
                    <span>Contribute to this Campaign</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Bank Transfer Transparency Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Direct NGO Bank Wire Details
                  </h4>
                  <p className="text-[11px] text-slate-500">Audited under Nigerian SCUML non-profit regulatory compliance.</p>
                </div>

                <div className="space-y-2.5 text-xs font-mono">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <span className="text-[10px] text-slate-400 block uppercase">Account Name</span>
                    <span className="text-slate-900 font-bold">Safe Neighborhood Foundation</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <span className="text-[10px] text-slate-400 block uppercase">Bank Name</span>
                    <span className="text-slate-900 font-bold">Zenith Bank PLC / GTBank</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">NUBAN Account (NGN)</span>
                      <span className="text-emerald-800 font-bold text-sm">1018491028</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. UPCOMING COMMUNITY EVENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-semibold">
              COMMUNITY MOBILIZATION
            </span>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-1">
              Upcoming Townhalls & Workshops
            </h2>
          </div>
          <Link
            href="/events"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
          >
            <span>View All Events</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.map((evt) => (
            <div
              key={evt.id}
              className="civic-card rounded-2xl p-6 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {evt.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500">{evt.date}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{evt.title}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {evt.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-4">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{evt.location}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-emerald-700 font-semibold">Free Public Entry</span>
                <Link
                  href="/events"
                  className="text-xs font-semibold text-slate-900 hover:text-emerald-700 flex items-center gap-1"
                >
                  <span>Event Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INSTITUTIONAL PARTNERS LOGO STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 pt-16">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-mono uppercase text-slate-500">COLLABORATIVE ECOSYSTEM</span>
          <h3 className="text-xl font-bold text-slate-900 mt-1">Our Strategic Partners</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SANEF_PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 text-center space-y-1 shadow-sm"
            >
              <h4 className="text-sm font-bold text-slate-900">{partner.name}</h4>
              <p className="text-[10px] font-mono text-emerald-700">{partner.type}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
