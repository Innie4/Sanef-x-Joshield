"use client";

import React, { useState } from "react";
import { 
  Shield, 
  ShieldCheck, 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Layers, 
  FolderKanban, 
  Briefcase, 
  Award, 
  MessageSquare, 
  Heart, 
  ChevronDown, 
  Search, 
  Bell, 
  Lock, 
  CheckCircle2, 
  Clock, 
  LogOut, 
  ExternalLink,
  Plus,
  Filter,
  Eye,
  CheckCircle
} from "lucide-react";
import { 
  ORGANIZATIONS, 
  CURRENT_USER, 
  db, 
  MarketplaceRequest, 
  JobApplication, 
  SANEFProject 
} from "@/lib/data-store";

export default function DashboardShell() {
  const [activeOrgId, setActiveOrgId] = useState<string>("org-jossyshield");
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [orgDropdownOpen, setOrgDropdownOpen] = useState<boolean>(false);

  // Live state from data-store
  const currentOrg = ORGANIZATIONS.find((o) => o.id === activeOrgId) || ORGANIZATIONS[0];
  const [marketplaceList, setMarketplaceList] = useState<MarketplaceRequest[]>(
    db.getMarketplaceRequests("org-jossyshield")
  );
  const [applicationsList, setApplicationsList] = useState<JobApplication[]>(
    db.getJobApplications("org-jossyshield")
  );
  const [projectsList, setProjectsList] = useState<SANEFProject[]>(
    db.getSANEFProjects()
  );

  // Modals / Drawers
  const [selectedReq, setSelectedReq] = useState<MarketplaceRequest | null>(null);
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [statusNote, setStatusNote] = useState("");

  const isJossy = activeOrgId === "org-jossyshield";

  const handleOrgSwitch = (orgId: string) => {
    setActiveOrgId(orgId);
    setOrgDropdownOpen(false);
    setActiveTab("overview");
  };

  const handleUpdateReqStatus = (reqId: string, newStatus: MarketplaceRequest["status"]) => {
    const updated = db.updateMarketplaceRequestStatus(reqId, newStatus, statusNote);
    if (updated) {
      setMarketplaceList([...db.getMarketplaceRequests("org-jossyshield")]);
      setSelectedReq(null);
      setStatusNote("");
    }
  };

  const handleUpdateAppStatus = (appId: string, newStatus: JobApplication["pipelineStatus"]) => {
    const updated = db.updateApplicationStatus(appId, newStatus);
    if (updated) {
      setApplicationsList([...db.getJobApplications("org-jossyshield")]);
      setSelectedApp(null);
    }
  };

  const handleToggleTalentAvailability = (appId: string, current: string) => {
    const nextStatus = current === "available" ? "unavailable" : "available";
    db.updateTalentPoolAvailability(appId, nextStatus as any);
    setApplicationsList([...db.getJobApplications("org-jossyshield")]);
  };

  return (
    <div className="min-h-screen bg-[#090c12] text-slate-100 flex flex-col font-sans">
      {/* 1. TOP HEADER / APP BAR */}
      <header className="h-16 bg-[#0f141f] border-b border-[#1c2436] flex items-center justify-between px-4 sm:px-6 z-30 sticky top-0">
        <div className="flex items-center gap-4">
          {/* Organization Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
              className="flex items-center gap-3 bg-[#161d2d] hover:bg-[#1e273c] border border-slate-700/80 px-3.5 py-1.5 rounded-xl transition-all"
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-white ${
                  isJossy ? "bg-blue-600 shadow-sm shadow-blue-500/20" : "bg-emerald-600 shadow-sm shadow-emerald-500/20"
                }`}
              >
                {isJossy ? <Shield className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-white flex items-center gap-1.5 leading-none">
                  <span>{currentOrg.name}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                    {currentOrg.slug}
                  </span>
                </p>
                <p className="text-[10px] text-slate-400 font-medium">Switch Active Tenant Context</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
            </button>

            {/* Switcher Menu */}
            {orgDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-[#121824] border border-slate-700 rounded-2xl shadow-2xl p-2 space-y-1 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  Select Organization Tenant
                </div>
                {ORGANIZATIONS.map((org) => (
                  <button
                    key={org.id}
                    onClick={() => handleOrgSwitch(org.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-colors ${
                      activeOrgId === org.id
                        ? "bg-blue-600/20 text-white border border-blue-500/30 font-semibold"
                        : "text-slate-300 hover:bg-[#192131]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center ${
                          org.slug === "jossyshield" ? "bg-blue-600 text-white" : "bg-emerald-600 text-white"
                        }`}
                      >
                        {org.slug === "jossyshield" ? <Shield className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                      </div>
                      <span>{org.name}</span>
                    </div>
                    {activeOrgId === org.id && <span className="text-blue-400 font-mono text-[10px]">ACTIVE</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Session & User Profile */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Multi-Tenant RBAC Guard Active</span>
          </div>

          <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white">
                {CURRENT_USER.firstName} {CURRENT_USER.lastName}
              </p>
              <p className="text-[10px] text-blue-400 font-mono">Platform Super Admin</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
              IU
            </div>
          </div>
        </div>
      </header>

      {/* 2. BODY LAYOUT: SIDEBAR + CONTENT AREA */}
      <div className="flex flex-1">
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-64 bg-[#0c1017] border-r border-[#1a2130] p-4 flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2 px-3">
                {currentOrg.slug.toUpperCase()} MODULES
              </p>

              <nav className="space-y-1">
                {/* 1. Overview */}
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === "overview"
                      ? isJossy
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                        : "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Overview Dashboard</span>
                </button>

                {/* JossyShield Specific Tabs */}
                {isJossy && (
                  <>
                    <button
                      onClick={() => setActiveTab("marketplace")}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        activeTab === "marketplace"
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                          : "text-slate-400 hover:text-white hover:bg-slate-900"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Briefcase className="w-4 h-4" />
                        <span>Marketplace Requests</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-950 text-blue-300">
                        {marketplaceList.length}
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveTab("recruitment")}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        activeTab === "recruitment"
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                          : "text-slate-400 hover:text-white hover:bg-slate-900"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <FolderKanban className="w-4 h-4" />
                        <span>Applicant Pipeline</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-950 text-blue-300">
                        {applicationsList.length}
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveTab("talent_pool")}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        activeTab === "talent_pool"
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                          : "text-slate-400 hover:text-white hover:bg-slate-900"
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      <span>Security Talent Pool</span>
                    </button>
                  </>
                )}

                {/* SANEF Specific Tabs */}
                {!isJossy && (
                  <>
                    <button
                      onClick={() => setActiveTab("projects")}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        activeTab === "projects"
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                          : "text-slate-400 hover:text-white hover:bg-slate-900"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Layers className="w-4 h-4" />
                        <span>Evidence Archive Hub</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300">
                        {projectsList.length}
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveTab("donations")}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        activeTab === "donations"
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                          : "text-slate-400 hover:text-white hover:bg-slate-900"
                      }`}
                    >
                      <Heart className="w-4 h-4" />
                      <span>Campaigns & Donations</span>
                    </button>
                  </>
                )}

                {/* Shared Platform Capabilities */}
                <div className="pt-4 mt-4 border-t border-slate-800">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2 px-3">
                    PLATFORM CONTROLS
                  </p>
                  <button
                    onClick={() => setActiveTab("media")}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === "media"
                        ? "bg-slate-800 text-white"
                        : "text-slate-400 hover:text-white hover:bg-slate-900"
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Media Library ({currentOrg.slug})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("users")}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      activeTab === "users"
                        ? "bg-slate-800 text-white"
                        : "text-slate-400 hover:text-white hover:bg-slate-900"
                    }`}
                  >
                    <Lock className="w-4 h-4" />
                    <span>Users & RBAC Matrix</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="pt-4 border-t border-slate-800/80">
            <div className="p-3 bg-[#111622] rounded-xl text-[11px] text-slate-400 space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500 block">CURRENT CONTEXT</span>
              <p className="text-white font-semibold truncate">{currentOrg.name}</p>
              <p className="text-slate-500 text-[10px] font-mono">Domain: {currentOrg.websiteDomain}</p>
            </div>
          </div>
        </aside>

        {/* MAIN DISPLAY VIEW */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {currentOrg.name} — Command Center
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">{currentOrg.tagline}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
                    Tenant ID: {currentOrg.id}
                  </span>
                </div>
              </div>

              {/* Metric Cards (Dynamic per org) */}
              {isJossy ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="dash-card rounded-2xl p-5 space-y-1">
                    <span className="text-[11px] font-mono text-slate-400 uppercase">New Requisitions</span>
                    <div className="text-3xl font-extrabold text-white font-mono">{marketplaceList.length}</div>
                    <p className="text-[10px] text-blue-400">Awaiting tactical review</p>
                  </div>
                  <div className="dash-card rounded-2xl p-5 space-y-1">
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Candidates in Review</span>
                    <div className="text-3xl font-extrabold text-white font-mono">{applicationsList.length}</div>
                    <p className="text-[10px] text-emerald-400">Recruitment pipeline active</p>
                  </div>
                  <div className="dash-card rounded-2xl p-5 space-y-1">
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Ready-To-Deploy Pool</span>
                    <div className="text-3xl font-extrabold text-blue-400 font-mono">
                      {applicationsList.filter((a) => a.isTalentPool).length + 434}
                    </div>
                    <p className="text-[10px] text-slate-400">Vetted officers on standby</p>
                  </div>
                  <div className="dash-card rounded-2xl p-5 space-y-1">
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Response SLA Target</span>
                    <div className="text-3xl font-extrabold text-white font-mono">&lt; 4h</div>
                    <p className="text-[10px] text-slate-400">100% compliance rate</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="dash-card rounded-2xl p-5 space-y-1">
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Audited Projects</span>
                    <div className="text-3xl font-extrabold text-white font-mono">{projectsList.length}</div>
                    <p className="text-[10px] text-emerald-400">Evidence archive active</p>
                  </div>
                  <div className="dash-card rounded-2xl p-5 space-y-1">
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Residents Protected</span>
                    <div className="text-3xl font-extrabold text-emerald-400 font-mono">65,000+</div>
                    <p className="text-[10px] text-slate-400">Across 140 solar corridors</p>
                  </div>
                  <div className="dash-card rounded-2xl p-5 space-y-1">
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Donation Inflow</span>
                    <div className="text-3xl font-extrabold text-white font-mono">$27,770</div>
                    <p className="text-[10px] text-slate-400">100% audited disbursements</p>
                  </div>
                  <div className="dash-card rounded-2xl p-5 space-y-1">
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Audited Partners</span>
                    <div className="text-3xl font-extrabold text-white font-mono">4</div>
                    <p className="text-[10px] text-slate-400">Public & municipal agencies</p>
                  </div>
                </div>
              )}

              {/* Recent Activity Table / Feed */}
              <div className="dash-card rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Recent Activity & Security Audit Events
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">ISOLATION VERIFIED</span>
                </div>
                <div className="divide-y divide-slate-850 space-y-2">
                  {db.getAuditLogs(activeOrgId).map((log) => (
                    <div key={log.id} className="pt-2 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-white">{log.action}</p>
                        <p className="text-[11px] text-slate-400">{log.resource}</p>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MARKETPLACE REQUESTS (JossyShield) */}
          {activeTab === "marketplace" && isJossy && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Marketplace Service Requests</h2>
                  <p className="text-xs text-slate-400">Inbound client requisitions generated from the public marketplace.</p>
                </div>
              </div>

              <div className="dash-card rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#151c2a] text-slate-400 font-mono text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="p-4">REFERENCE</th>
                      <th className="p-4">SERVICE</th>
                      <th className="p-4">CLIENT / COMPANY</th>
                      <th className="p-4">LOCATION</th>
                      <th className="p-4">STATUS</th>
                      <th className="p-4 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {marketplaceList.map((req) => (
                      <tr key={req.id} className="hover:bg-[#151b27] transition-colors">
                        <td className="p-4 font-mono font-bold text-blue-400">{req.referenceNumber}</td>
                        <td className="p-4 font-semibold text-white">{req.serviceType}</td>
                        <td className="p-4">
                          <p className="font-medium text-white">{req.clientName}</p>
                          <p className="text-[10px] text-slate-500">{req.companyName || req.email}</p>
                        </td>
                        <td className="p-4 text-slate-300">{req.location}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                              req.status === "new"
                                ? "bg-blue-900/40 text-blue-300 border border-blue-700/50"
                                : req.status === "under_review"
                                ? "bg-amber-900/40 text-amber-300 border border-amber-700/50"
                                : "bg-emerald-900/40 text-emerald-300 border border-emerald-700/50"
                            }`}
                          >
                            {req.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => setSelectedReq(req)}
                            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold"
                          >
                            Review & Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: RECRUITMENT PIPELINE (JossyShield) */}
          {activeTab === "recruitment" && isJossy && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Applicant Pipeline Kanban</h2>
                  <p className="text-xs text-slate-400">Move candidates through stages: New → Review → Shortlist → Interview → Talent Pool.</p>
                </div>
              </div>

              {/* Pipeline Columns */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {["new", "under_review", "shortlisted", "talent_pool"].map((stage) => {
                  const stageApps = applicationsList.filter((a) => a.pipelineStatus === stage);
                  return (
                    <div key={stage} className="dash-card rounded-2xl p-4 flex flex-col space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-xs font-mono font-bold uppercase text-slate-300">
                          {stage.replace("_", " ")}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                          {stageApps.length}
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {stageApps.map((app) => (
                          <div
                            key={app.id}
                            onClick={() => setSelectedApp(app)}
                            className="p-3 bg-[#161c28] hover:border-blue-500/50 border border-slate-800 rounded-xl cursor-pointer transition-all space-y-2"
                          >
                            <p className="text-xs font-bold text-white">{app.applicantName}</p>
                            <p className="text-[11px] text-blue-400 font-mono">{app.jobTitle}</p>
                            <div className="flex justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                              <span>Exp: {app.experienceYears}y</span>
                              <span className="text-emerald-400">{app.availability}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: TALENT POOL DIRECTORY (JossyShield) */}
          {activeTab === "talent_pool" && isJossy && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-2xl font-bold text-white">Ready-To-Work Security Personnel Pool</h2>
                <p className="text-xs text-slate-400">Vetted officers available for immediate contract allocation.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {applicationsList.filter((a) => a.isTalentPool).map((person) => (
                  <div key={person.id} className="dash-card rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{person.applicantName}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                          person.talentPoolAvailability === "available"
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800/40"
                            : "bg-amber-950 text-amber-400 border border-amber-800/40"
                        }`}
                      >
                        {person.talentPoolAvailability}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{person.jobTitle} • {person.location}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {person.skills.map((s, i) => (
                        <span key={i} className="text-[10px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-300">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="pt-3 border-t border-slate-850 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-500">Exp: {person.experienceYears}y</span>
                      <button
                        onClick={() => handleToggleTalentAvailability(person.id, person.talentPoolAvailability || "available")}
                        className="text-[11px] text-blue-400 hover:underline font-semibold"
                      >
                        Toggle Availability
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SANEF PROJECTS & EVIDENCE (SANEF) */}
          {activeTab === "projects" && !isJossy && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">SANEF Evidence Repository Manager</h2>
                  <p className="text-xs text-slate-400">Manage field projects, uploaded audit reports, and verified impact metrics.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectsList.map((proj) => (
                  <div key={proj.id} className="dash-card rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                        {proj.category}
                      </span>
                      <span className="text-xs text-slate-400">{proj.projectDate}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{proj.title}</h3>
                    <p className="text-xs text-slate-400">{proj.summary}</p>
                    <div className="p-3 bg-[#151c28] rounded-xl text-xs space-y-1">
                      <p className="text-[11px] font-bold text-slate-300">Audited Metrics:</p>
                      {proj.verifiedImpactMetrics.map((m, i) => (
                        <p key={i} className="text-[11px] text-emerald-400 flex justify-between">
                          <span>{m.label}:</span>
                          <span className="font-mono font-bold">{m.value}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SANEF DONATIONS (SANEF) */}
          {activeTab === "donations" && !isJossy && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-2xl font-bold text-white">Philanthropic Campaigns & Donor Ledger</h2>
                <p className="text-xs text-slate-400">Track active fundraising targets and public audit disclosures.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {db.getSANEFDonationCampaigns().map((camp) => (
                  <div key={camp.id} className="dash-card rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{camp.title}</span>
                      <span className="text-xs text-emerald-400 font-mono font-bold">
                        ${camp.currentAmount.toLocaleString()} / ${camp.targetAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full"
                        style={{ width: `${(camp.currentAmount / camp.targetAmount) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-400">{camp.description}</p>
                    <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                      Verified Contributors: <strong>{camp.donorCount}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: USERS & RBAC MATRIX */}
          {activeTab === "users" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-2xl font-bold text-white">User Access & Role Matrix</h2>
                <p className="text-xs text-slate-400">Permissions are scoped strictly by organization membership.</p>
              </div>

              <div className="dash-card rounded-2xl p-6 space-y-4">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#151c2a] text-slate-400 font-mono text-[11px]">
                    <tr>
                      <th className="p-3">USER</th>
                      <th className="p-3">EMAIL</th>
                      <th className="p-3">JOSSYSHIELD ROLE</th>
                      <th className="p-3">SANEF ROLE</th>
                      <th className="p-3">PLATFORM STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    <tr>
                      <td className="p-3 font-bold text-white">Inimfon Udoh</td>
                      <td className="p-3 font-mono text-slate-400">admin@unifiedplatform.local</td>
                      <td className="p-3 text-blue-400 font-semibold">Super Admin</td>
                      <td className="p-3 text-emerald-400 font-semibold">Super Admin</td>
                      <td className="p-3 text-emerald-400">Active (Full Access)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">Evelyn Alabi</td>
                      <td className="p-3 font-mono text-slate-400">e.alabi@jossyshield.com</td>
                      <td className="p-3 text-blue-400 font-semibold">Recruitment Director</td>
                      <td className="p-3 text-slate-600 font-semibold">None (Restricted)</td>
                      <td className="p-3 text-slate-300">Active</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white">Fatima Bello</td>
                      <td className="p-3 font-mono text-slate-400">fatima.bello@sanefoundation.org</td>
                      <td className="p-3 text-slate-600 font-semibold">None (Restricted)</td>
                      <td className="p-3 text-emerald-400 font-semibold">Evidence Manager</td>
                      <td className="p-3 text-slate-300">Active</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: MEDIA LIBRARY */}
          {activeTab === "media" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Media Library ({currentOrg.slug})</h2>
                  <p className="text-xs text-slate-400">Digital assets are strictly isolated to the active organization.</p>
                </div>
              </div>

              <div className="dash-card rounded-2xl p-6 border-dashed border-2 border-slate-700 text-center py-10 space-y-2">
                <FileText className="w-8 h-8 text-slate-500 mx-auto" />
                <h4 className="text-sm font-bold text-white">Drop files or click to upload</h4>
                <p className="text-xs text-slate-400">Assets will be tagged with tenant owner: {currentOrg.id}</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: MARKETPLACE REQUEST REVIEW */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#121824] border border-slate-700 rounded-2xl p-6 max-w-xl w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-blue-400">{selectedReq.referenceNumber}</span>
                <h3 className="text-lg font-bold text-white mt-0.5">{selectedReq.serviceType}</h3>
              </div>
              <button onClick={() => setSelectedReq(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-2 text-xs">
              <p><strong className="text-slate-400">Client:</strong> {selectedReq.clientName} ({selectedReq.email})</p>
              <p><strong className="text-slate-400">Phone:</strong> {selectedReq.phone}</p>
              <p><strong className="text-slate-400">Location:</strong> {selectedReq.location}</p>
              <p><strong className="text-slate-400">Details:</strong> {selectedReq.details}</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Update Status</label>
              <div className="flex flex-wrap gap-2">
                {(["new", "under_review", "contacted", "quoted", "closed"] as MarketplaceRequest["status"][]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateReqStatus(selectedReq.id, st)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-xs font-mono capitalize text-white"
                  >
                    Set to {st.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CANDIDATE PIPELINE REVIEW */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#121824] border border-slate-700 rounded-2xl p-6 max-w-xl w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedApp.applicantName}</h3>
                <p className="text-xs text-blue-400 font-mono">{selectedApp.jobTitle}</p>
              </div>
              <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-2 text-xs">
              <p><strong className="text-slate-400">Email:</strong> {selectedApp.email}</p>
              <p><strong className="text-slate-400">Phone:</strong> {selectedApp.phone}</p>
              <p><strong className="text-slate-400">Experience:</strong> {selectedApp.experienceYears} Years</p>
              <p><strong className="text-slate-400">CV File:</strong> {selectedApp.cvFileName}</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Transition Pipeline Stage</label>
              <div className="flex flex-wrap gap-2">
                {(["under_review", "shortlisted", "interview_scheduled", "talent_pool"] as JobApplication["pipelineStatus"][]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateAppStatus(selectedApp.id, st)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-xs font-mono capitalize text-white"
                  >
                    Move to {st.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
