"use client";

import React, { useState } from "react";
import { MapPin, Clock, ArrowUpRight, Shield, Check } from "lucide-react";
import JobApplicationModal from "@/components/JobApplicationModal";
import { JOSSY_JOBS } from "@/lib/data";

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<string>("General Security Operative Application");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApply = (title: string) => {
    setSelectedJob(title);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-mono uppercase tracking-wider text-[#0066FF] font-semibold">
          Personnel & Clearance Roster
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.03em] text-white">
          Join the Vetted Security Operations Force
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
          We maintain an actively screened, background-audited talent pool of armed and static security professionals. Apply directly to a specific station or submit your dossier to our general deployment roster.
        </p>
      </div>

      {/* Talent Pool Banner */}
      <div className="tactical-surface rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 beacon-pulse" />
            <span>GENERAL CANDIDATE INTAKE: ACTIVE</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Apply to the Ready-to-Deploy Pool
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Former armed forces personnel, close-protection specialists, and experienced facility guards undergo fingerprint biometric verification and immediate placement on high-value corporate contracts.
          </p>
        </div>
        <button
          onClick={() => handleApply("General Security Operative Application")}
          className="shrink-0 bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold px-6 py-3.5 rounded-full shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Submit Dossier to Talent Pool
        </button>
      </div>

      {/* Vacancies List */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Immediate Sector Postings
          </h2>
          <p className="text-xs text-zinc-500 font-mono mt-1">
            VERIFIED IMMEDIATE REQUISITION ORDERS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {JOSSY_JOBS.map((job) => (
            <div
              key={job.id}
              className="tactical-surface rounded-2xl p-6 flex flex-col justify-between space-y-6"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/20">
                    {job.type}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {job.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{job.title}</h3>

                <div className="space-y-1.5 text-xs text-zinc-400 mb-4 font-mono">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>Min. Experience: {job.experience}</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 border-t border-white/[0.06] pt-3 leading-relaxed">
                  {job.requirements}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <button
                  onClick={() => handleApply(job.title)}
                  className="w-full flex items-center justify-center gap-2 tactical-surface-interactive text-white hover:text-[#0066FF] text-xs font-semibold py-3 rounded-xl transition-all"
                >
                  <span>Apply for Clearance</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobTitle={selectedJob}
      />
    </div>
  );
}
