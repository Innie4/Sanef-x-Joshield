"use client";

import React, { useMemo, useState, useEffect } from "react";
import { MapPin, Calendar, UserCheck, ArrowRight } from "lucide-react";
import { SECURITY_VACANCIES, getLiveVacancies, type SecurityVacancy } from "@/lib/data";
import JobApplicationModal from "@/components/JobApplicationModal";

const LOCATION_FILTERS = ["All", "Lagos", "Abuja", "Port Harcourt"] as const;

export default function CareersPage() {
  const [vacanciesList, setVacanciesList] = useState<SecurityVacancy[]>(SECURITY_VACANCIES);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRole, setModalRole] = useState("");
  const [isGeneralPool, setIsGeneralPool] = useState(false);
  const [locationFilter, setLocationFilter] = useState<string>("All");

  useEffect(() => {
    async function load() {
      const data = await getLiveVacancies();
      setVacanciesList(data);
    }
    load();
  }, []);

  const filteredVacancies = useMemo(() => {
    if (locationFilter === "All") return vacanciesList;
    return vacanciesList.filter((v) =>
      v.location.toLowerCase().includes(locationFilter.toLowerCase())
    );
  }, [locationFilter, vacanciesList]);

  const openModal = (role: string, general: boolean) => {
    setModalRole(role);
    setIsGeneralPool(general);
    setModalOpen(true);
  };

  return (
    <div className="bg-[#F8FAFC] py-12 lg:py-16">
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#E2E8F0] pb-8">
          <p className="font-heading text-[12px] font-semibold uppercase tracking-[0.14em] text-[#B45309]">
            Recruitment & Personnel Pipeline
          </p>
          <h1 className="mt-2 font-heading text-[36px] font-bold leading-[1.08] text-[#0F172A] sm:text-[46px]">
            Careers & Vetted Security Talent Pool
          </h1>
          <p className="mt-3 max-w-[700px] text-[15px] leading-relaxed text-[#475569]">
            Apply directly to an active operational vacancy below, or submit a general security
            personnel profile to be assessed for our Ready-to-Work Talent Pool ahead of new client
            deployments.
          </p>
        </div>

        {/* Clearly Separated Banner: General Security Personnel Applications */}
        <section className="mt-8 flex flex-col justify-between gap-6 rounded-[4px] border border-[#0F172A] bg-[#0F172A] p-6 text-white sm:p-8 lg:flex-row lg:items-center">
          <div className="max-w-[680px]">
            <div className="inline-flex items-center gap-2 font-mono text-[12px] font-semibold text-[#F59E0B]">
              <UserCheck className="h-4 w-4" />
              General Security Personnel Applications · Open Year-Round
            </div>
            <h2 className="mt-2 font-heading text-[26px] font-semibold text-white">
              Don’t see your exact post listed? Apply to join our Vetted Talent Pool.
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-[#CBD5E1]">
              Assessed security officers, control room operators, and drivers who pass our interview
              and vetting checks are maintained in our Ready-to-Work Talent Pool for upcoming client
              contracts. Pool placement is subject to availability confirmation and does not
              guarantee immediate deployment.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openModal("General Security Personnel — Talent Pool Intake", true)}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[4px] bg-[#B45309] px-5 py-3 text-[14px] font-semibold text-white hover:bg-[#92400E]"
          >
            Submit General Application
            <ArrowRight className="h-4 w-4" />
          </button>
        </section>

        {/* Active Vacancies List with Interactive Location Filter Pills */}
        <section className="mt-12">
          <div className="flex flex-col justify-between gap-4 border-b border-[#E2E8F0] pb-4 sm:flex-row sm:items-end">
            <h2 className="font-heading text-[26px] font-semibold text-[#0F172A]">
              Active Vacancies ({filteredVacancies.length})
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {LOCATION_FILTERS.map((loc) => {
                const count =
                  loc === "All"
                    ? vacanciesList.length
                    : vacanciesList.filter((v) =>
                        v.location.toLowerCase().includes(loc.toLowerCase())
                      ).length;
                const active = locationFilter === loc;
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setLocationFilter(loc)}
                    className={`rounded-[4px] px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                      active
                        ? "bg-[#0F172A] text-white"
                        : "border border-[#E2E8F0] bg-white text-[#475569] hover:border-[#0F172A] hover:text-[#0F172A]"
                    }`}
                  >
                    {loc} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 space-y-5">
            {filteredVacancies.map((vac) => (
              <article
                key={vac.id}
                className="rounded-[4px] border border-[#E2E8F0] bg-white p-6"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-[12px]">
                      <span className="font-mono font-medium text-[#475569]">{vac.refId}</span>
                      <span className="rounded-[4px] border border-[#CBD5E1] bg-[#F8FAFC] px-2 py-0.5 font-heading text-[12px] font-semibold text-[#0F172A]">
                        {vac.roleType}
                      </span>
                      <span className="text-[#475569]">{vac.department}</span>
                    </div>
                    <h3 className="mt-2 font-heading text-[24px] font-semibold text-[#0F172A]">
                      {vac.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-4 text-[13px] text-[#475569]">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[#0F172A]" /> {vac.location}
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-[12px]">
                        <Calendar className="h-3.5 w-3.5 text-[#B45309]" /> Deadline: {vac.deadline}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openModal(vac.title, false)}
                    className="shrink-0 rounded-[4px] bg-[#0F172A] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-[#1E293B]"
                  >
                    Apply Now
                  </button>
                </div>

                <p className="mt-4 text-[14px] leading-relaxed text-[#475569]">{vac.summary}</p>
                <ul className="mt-4 grid grid-cols-1 gap-2 border-t border-[#E2E8F0] pt-4 text-[13px] text-[#0F172A] md:grid-cols-3">
                  {vac.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#B45309]" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>

      <JobApplicationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        roleTitle={modalRole}
        isGeneralPool={isGeneralPool}
      />
    </div>
  );
}
