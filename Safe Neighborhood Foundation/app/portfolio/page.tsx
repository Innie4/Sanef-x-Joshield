"use client";

import React, { useState } from "react";
import { 
  FileCheck2, 
  MapPin, 
  DownloadCloud, 
  Filter, 
  Calendar, 
  Users, 
  Check,
  X,
  ArrowUpRight
} from "lucide-react";
import { SANEF_PROJECTS, ProjectEvidence } from "@/lib/data";

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectEvidence | null>(null);

  const categories = ["All", "Safe Spaces", "Youth Intervention", "Community Safety", "Civic Tech"];

  const filteredProjects =
    selectedCategory === "All"
      ? SANEF_PROJECTS
      : SANEF_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold">
          Empirical Project Archive
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.03em] text-slate-950">
          Field Evidence & Audited Outcomes
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          Every SANEF civic intervention is tracked with verifiable geo-coordinates, community committee affidavits, and independent third-party audit reports.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mr-2">
          Filter Focus:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? "bg-[#0D4A2B] text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="monograph-surface rounded-3xl p-7 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 font-semibold">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-slate-400">{project.date}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug">
                {project.title}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>{project.location}</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {project.summary}
              </p>

              {/* Verified Metrics Highlights */}
              <div className="space-y-1.5 border-t border-slate-100 pt-3">
                {project.impactStats.map((stat, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">{stat.label}</span>
                    <span className="font-bold text-slate-900 font-mono">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedProject(project)}
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1"
              >
                <span>Inspect Evidence Dossier</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono text-slate-400">AUDITED</span>
            </div>
          </div>
        ))}
      </div>

      {/* DETAIL MODAL / DRAWER */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                {selectedProject.category} • CERTIFIED EVIDENCE
              </span>
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight">
                {selectedProject.title}
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Location: {selectedProject.location} • Commissioned: {selectedProject.date}
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-700 leading-relaxed font-sans">
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                Detailed Field Findings
              </h4>
              <p>{selectedProject.detailedDescription}</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
                Verified Civic Metrics
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedProject.impactStats.map((stat, i) => (
                  <div key={i} className="text-xs">
                    <p className="text-slate-500">{stat.label}</p>
                    <p className="font-bold text-slate-900 font-mono mt-0.5">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <p className="font-mono text-[11px] uppercase text-slate-400">Community Partners:</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedProject.partners.map((p, i) => (
                  <span key={i} className="px-2.5 py-1 bg-slate-100 rounded-full text-slate-700 font-medium">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <a
                href={`#download-${selectedProject.downloadFileName}`}
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Certified Dossier [${selectedProject.downloadFileName}] logged for download.`);
                }}
                className="inline-flex items-center gap-2 bg-[#0D4A2B] hover:bg-[#14633B] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all"
              >
                <DownloadCloud className="w-3.5 h-3.5" />
                <span>Download Verified PDF Dossier</span>
              </a>

              <button
                onClick={() => setSelectedProject(null)}
                className="text-xs font-mono text-slate-500 hover:text-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
