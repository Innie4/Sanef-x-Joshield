"use client";

import React, { useState } from "react";
import { 
  FileCheck2, 
  MapPin, 
  DownloadCloud, 
  ExternalLink, 
  Filter, 
  Calendar, 
  Users, 
  CheckCircle,
  X
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold px-3 py-1 rounded bg-emerald-100">
          EMPIRICAL RESEARCH & PROJECT ARCHIVE
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Evidence Archive & Audited Impact
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          SANEF operates with complete transparency. This archive provides structured records of every 
          field project, community initiative, partner contribution, and verifiable audit report.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mr-2">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter Focus:</span>
        </div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? "bg-emerald-700 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="civic-card civic-card-hover rounded-3xl p-7 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-slate-500">{project.date}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                {project.title}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
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

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-800 flex items-center gap-1">
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{project.evidenceType}</span>
              </span>
              <button
                onClick={() => setSelectedProject(project)}
                className="bg-slate-900 hover:bg-emerald-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors"
              >
                Inspect Evidence
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal / Drawer */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono">
                {selectedProject.category} • {selectedProject.date}
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-2">
                {selectedProject.title}
              </h2>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                {selectedProject.location}
              </p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider">
                Project Overview & Empirical Scope
              </h4>
              <p>{selectedProject.detailedDescription}</p>
            </div>

            {/* Impact Metric Table */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 text-xs font-bold text-slate-800">
                Verified On-The-Ground Metrics
              </div>
              <div className="divide-y divide-slate-100 p-2">
                {selectedProject.impactStats.map((stat, i) => (
                  <div key={i} className="flex justify-between px-3 py-2 text-xs">
                    <span className="text-slate-600">{stat.label}</span>
                    <span className="font-bold font-mono text-emerald-800 text-sm">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Participating Partners */}
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider">
                Partner Institutions Involved
              </h4>
              <p className="text-xs text-slate-600">
                {selectedProject.partners.join(", ")}
              </p>
            </div>

            {/* Download Audit Evidence */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">{selectedProject.downloadFileName}</p>
                  <p className="text-[11px] text-slate-500">Official Audited PDF Documentation (2.4 MB)</p>
                </div>
              </div>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Downloading audited documentation: ${selectedProject.downloadFileName}`);
                }}
                className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm"
              >
                <DownloadCloud className="w-4 h-4" />
                <span>Download Report</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
