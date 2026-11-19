"use client";

import React, { useState } from "react";
import { Users, Briefcase, MapPin, Clock, ArrowRight, Shield, CheckCircle } from "lucide-react";
import JobApplicationModal from "@/components/JobApplicationModal";
import { JOSSY_JOBS } from "@/lib/data";

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<string>("General Security Personnel Application");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApply = (title: string) => {
    setSelectedJob(title);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold px-3 py-1 rounded bg-blue-950/60 border border-blue-800/40">
          RECRUITMENT & TALENT POOL ACADEMY
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Join the Elite JossyShield Security Roster
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          We are constantly recruiting, training, and vetting high-caliber security professionals. 
          Even when no specific vacancy matches your profile, you can submit an application to enter our 
          ready-to-deploy security personnel pool for upcoming client contracts.
        </p>
      </div>

      {/* Talent Pool Banner */}
      <div className="glass-panel rounded-3xl p-8 border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-blue-950/30 to-slate-900/60">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>GENERAL CANDIDATE INTAKE OPEN</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Spontaneous Security Personnel Application
          </h3>
          <p className="text-xs text-slate-400 max-w-xl">
            Are you a disciplined security officer, defensive driver, or former serviceman? 
            Submit your credentials, undergo background screening, and become eligible for high-paying corporate assignments.
          </p>
        </div>
        <button
          onClick={() => handleApply("General Security Personnel Application")}
          className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
        >
          Submit CV to Talent Pool
        </button>
      </div>

      {/* Vacancies List */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Current Open Vacancies
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Immediate postings for immediate operational recruitment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {JOSSY_JOBS.map((job) => (
            <div
              key={job.id}
              className="glass-panel rounded-2xl p-6 flex flex-col justify-between space-y-5"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900/40 text-blue-400 border border-blue-800/40">
                    {job.type}
                  </span>
                  <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {job.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{job.title}</h3>

                <div className="space-y-2 text-xs text-slate-400 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Experience: {job.experience}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 border-t border-slate-800/80 pt-3 leading-relaxed">
                  {job.requirements}
                </p>
              </div>

              <button
                onClick={() => handleApply(job.title)}
                className="w-full flex items-center justify-center gap-2 bg-[#121722] hover:bg-blue-600 hover:text-white text-slate-300 border border-slate-700/80 text-xs font-semibold py-2.5 rounded-xl transition-all"
              >
                <span>Apply for this Role</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <JobApplicationModal
        jobTitle={selectedJob}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
