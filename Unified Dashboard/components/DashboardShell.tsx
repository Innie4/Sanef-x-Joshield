"use client";

import React, { useMemo, useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  FolderArchive,
  Handshake,
  Calendar,
  Briefcase,
  HeartHandshake,
  Mail,
  Image as ImageIcon,
  Users,
  Settings,
  ShieldCheck,
  Inbox,
  UserCheck,
  MessageSquareQuote,
  ClipboardList,
  ChevronDown,
  Search,
  ExternalLink,
  Download,
  Lock,
  CheckCircle2,
  Plus,
  Menu,
  X,
  ArrowUpRight,
  Clock,
  Check,
  CalendarClock,
  FileCheck2,
} from "lucide-react";
import SlideOverDrawer from "./SlideOverDrawer";
import {
  ORGANIZATIONS,
  CURRENT_USER,
  RECRUITMENT_STAGES,
  db,
  SANEF_PARTNERSHIPS,
  CMS_PAGES,
  BLOG_POSTS,
  EVENTS_DATA,
  DONATIONS_DATA,
  ENQUIRIES_DATA,
  VACANCIES_DATA,
  SERVICE_OFFERINGS,
  TESTIMONIALS_DATA,
  MEDIA_ASSETS,
  PLATFORM_USERS,
  ACTIVITY_LOGS,
  type OrgId,
  type RecruitmentStage,
  type JobApplication,
  type TalentPoolProfile,
  type PoolAvailability,
  type PoolStatus,
  type MarketplaceRequest,
  type RequestStatus,
  type SANEFProject,
  type SANEFPartnership,
  type EnquiryRecord,
  type DonationRecord,
} from "@/lib/data-store";

type NavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
};

// Crisp bespoke geometric emblem for each organisation
function OrgMark({ orgId, size = "md" }: { orgId: OrgId; size?: "sm" | "md" }) {
  const dim = size === "sm" ? "h-5 w-5" : "h-7 w-7";
  if (orgId === "org-sanef") {
    return (
      <span
        className={`flex ${dim} shrink-0 items-center justify-center rounded-[5px] bg-[#1B4332] text-[#FAF8F5]`}
      >
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M10 2.5L16.5 6.25V13.75L10 17.5L3.5 13.75V6.25L10 2.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle cx="10" cy="10" r="2.6" fill="#C85A32" />
        </svg>
      </span>
    );
  }
  return (
    <span
      className={`flex ${dim} shrink-0 items-center justify-center rounded-[5px] bg-[#0F172A] text-white`}
    >
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M10 2.5L16 5V10.2C16 14 13.4 16.9 10 18C6.6 16.9 4 14 4 10.2V5L10 2.5Z"
          stroke="#F59E0B"
          strokeWidth="1.8"
        />
      </svg>
    </span>
  );
}

// Custom flat styled select with crisp inset Lucide ChevronDown
function FlatSelect({
  value,
  onChange,
  children,
  className = "",
}: {
  value: string;
  onChange: (val: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-[6px] border border-[#E4E4E7] bg-white py-1.5 pl-3 pr-8 text-[13px] font-medium text-[#09090B] focus:border-[#2563EB] focus:outline-none"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-[#71717A]" />
    </div>
  );
}

// Status badge helper — muted tinted pills, strictly zero neon
function StatusPill({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: "neutral" | "green" | "amber" | "red" | "blue" | "slate";
}) {
  const styles: Record<string, string> = {
    neutral: "border-[#E4E4E7] bg-[#F4F4F5] text-[#3F3F46]",
    green: "border-[#BBF7D0] bg-[#F0FDF4] text-[#166534]",
    amber: "border-[#FDE68A] bg-[#FFFBEB] text-[#92400E]",
    red: "border-[#FECACA] bg-[#FEF2F2] text-[#991B1B]",
    blue: "border-[#BFDBFE] bg-[#EFF6FF] text-[#1E40AF]",
    slate: "border-[#CBD5E1] bg-[#F1F5F9] text-[#334155]",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[12px] font-medium leading-4 whitespace-nowrap ${styles[tone]}`}
    >
      {label}
    </span>
  );
}

function stageTone(stage: RecruitmentStage): "neutral" | "green" | "amber" | "red" | "blue" | "slate" {
  switch (stage) {
    case "New Application":
      return "blue";
    case "Under Review":
    case "Shortlisted":
      return "slate";
    case "Interview Scheduled":
    case "Interview Completed":
      return "amber";
    case "Approved / Qualified":
    case "Talent Pool":
      return "green";
    case "On Hold":
      return "neutral";
    case "Rejected":
    case "Withdrawn":
      return "red";
  }
}

function requestTone(status: RequestStatus): "neutral" | "green" | "amber" | "red" | "blue" | "slate" {
  switch (status) {
    case "New":
      return "blue";
    case "Under Review":
      return "amber";
    case "Proposal Sent":
      return "slate";
    case "Scheduled":
      return "green";
    case "Closed":
      return "neutral";
  }
}

function availabilityTone(status: PoolAvailability): "green" | "amber" | "red" {
  if (status === "Available") return "green";
  if (status === "Awaiting Confirmation") return "amber";
  return "red";
}

function isMonoField(key: string, val: string) {
  const k = key.toLowerCase();
  return (
    k.includes("date") ||
    k.includes("phone") ||
    k.includes("email") ||
    k.includes("count") ||
    /^\d{4}-\d{2}-\d{2}/.test(val)
  );
}

export default function DashboardShell() {
  const [activeOrgId, setActiveOrgId] = useState<OrgId>("org-josieshield");
  const [orgMenuOpen, setOrgMenuOpen] = useState(false);
  const [mobileOrgMenuOpen, setMobileOrgMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeModule, setActiveModule] = useState<string>("overview");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activePersona, setActivePersona] = useState<"super_admin" | "shared_jane">("super_admin");

  const [applications, setApplications] = useState<JobApplication[]>(() =>
    db.getJobApplications("org-josieshield")
  );
  const [talentPool, setTalentPool] = useState<TalentPoolProfile[]>(() =>
    db.getTalentPool("org-josieshield")
  );
  const [requests, setRequests] = useState<MarketplaceRequest[]>(() =>
    db.getMarketplaceRequests("org-josieshield")
  );
  const [sanefProjects, setSanefProjects] = useState<SANEFProject[]>(() =>
    db.getSANEFProjects()
  );
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>(ENQUIRIES_DATA);
  const [activities, setActivities] = useState(ACTIVITY_LOGS);

  // Filters: Applications
  const [appSearch, setAppSearch] = useState("");
  const [appStage, setAppStage] = useState<string>("All");
  const [appRoleFilter, setAppRoleFilter] = useState("All");
  const [appLocationFilter, setAppLocationFilter] = useState("All");
  const [appAvailFilter, setAppAvailFilter] = useState("All");
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [newNoteText, setNewNoteText] = useState("");
  const [interviewForm, setInterviewForm] = useState({
    date: "2026-11-28",
    time: "11:00 WAT",
    interviewer: "Capt. Tunde Bakare (Ret.)",
    mode: "In-Person (Ikeja HQ)" as "In-Person (Ikeja HQ)" | "Field Assessment" | "Video Panel",
    feedback: "",
  });

  // Filters: Talent Pool
  const [poolSearch, setPoolSearch] = useState("");
  const [poolAvailFilter, setPoolAvailFilter] = useState("All");
  const [poolStatusFilter, setPoolStatusFilter] = useState("All");
  const [selectedPoolId, setSelectedPoolId] = useState<string | null>(null);
  const [poolContactNote, setPoolContactNote] = useState("");

  // Filters: Marketplace Requests
  const [reqSearch, setReqSearch] = useState("");
  const [reqCategoryFilter, setReqCategoryFilter] = useState<string>("All");
  const [reqStatusFilter, setReqStatusFilter] = useState<string>("All");
  const [selectedReqId, setSelectedReqId] = useState<string | null>(null);
  const [reqFollowUpNote, setReqFollowUpNote] = useState("");

  // Drawers for SANEF & reusable modules
  const [selectedProject, setSelectedProject] = useState<SANEFProject | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<SANEFPartnership | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null);
  const [selectedDonation, setSelectedDonation] = useState<DonationRecord | null>(null);
  const [genericSearch, setGenericSearch] = useState("");

  const activeOrg = ORGANIZATIONS.find((o) => o.id === activeOrgId) || ORGANIZATIONS[0];
  const orgAccentBar = activeOrgId === "org-sanef" ? "bg-[#1B4332]" : "bg-[#0F172A]";
  const orgTintBg =
    activeOrgId === "org-sanef"
      ? "border-[#1B4332]/25 bg-[#1B4332]/[0.04]"
      : "border-[#0F172A]/20 bg-[#0F172A]/[0.03]";

  const currentRoleLabel =
    activePersona === "super_admin"
      ? "Super Admin"
      : activeOrgId === "org-sanef"
      ? "Blog Editor"
      : "Recruitment Manager";

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage((curr) => (curr === msg ? null : curr)), 3200);
  };

  const pushActivity = (orgId: OrgId, refId: string, action: string, module: string) => {
    const now = new Date().toISOString().slice(0, 16).replace("T", " ");
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        organizationId: orgId,
        refId,
        action,
        module,
        actor: activePersona === "super_admin" ? "Inimfon Udoh" : "Jane Okonkwo",
        timestamp: now,
        severity: "Update",
      },
      ...prev,
    ]);
  };

  // Reconciled exact live counts across sidebar badges, KPIs, and tables
  const triageRequestsCount = requests.filter(
    (r) => r.status === "New" || r.status === "Under Review"
  ).length;
  const unscreenedAppsCount = applications.filter(
    (a) => a.stage === "New Application" || a.stage === "Under Review"
  ).length;
  const activePoolCount = talentPool.filter((t) => t.poolStatus === "Active").length;
  const availablePoolCount = talentPool.filter(
    (t) => t.poolStatus === "Active" && t.availabilityStatus === "Available"
  ).length;
  const awaitingPoolCount = talentPool.filter(
    (t) => t.availabilityStatus === "Awaiting Confirmation"
  ).length;

  const navItems: NavItem[] = useMemo(() => {
    if (activeOrgId === "org-sanef") {
      return [
        { id: "overview", label: "Overview", icon: LayoutDashboard },
        { id: "pages", label: "Pages / CMS", icon: FileText },
        { id: "blog", label: "Blog", icon: Newspaper },
        { id: "projects", label: "Projects & Evidence", icon: FolderArchive, badge: sanefProjects.length },
        { id: "partnerships", label: "Partnerships", icon: Handshake },
        { id: "events", label: "Events", icon: Calendar },
        { id: "careers", label: "Careers", icon: Briefcase },
        { id: "donations", label: "Donations", icon: HeartHandshake },
        {
          id: "enquiries",
          label: "Enquiries",
          icon: Mail,
          badge: enquiries.filter((e) => e.organizationId === "org-sanef" && e.status === "New").length,
        },
        { id: "media", label: "Media Library", icon: ImageIcon },
        { id: "users", label: "Users & Roles", icon: Users },
        { id: "settings", label: "Settings", icon: Settings },
      ];
    }
    return [
      { id: "overview", label: "Overview", icon: LayoutDashboard },
      { id: "pages", label: "Pages / CMS", icon: FileText },
      { id: "services", label: "Services", icon: ShieldCheck },
      {
        id: "marketplace",
        label: "Marketplace Requests",
        icon: Inbox,
        badge: triageRequestsCount,
      },
      { id: "careers", label: "Careers", icon: Briefcase },
      {
        id: "applications",
        label: "Applications",
        icon: ClipboardList,
        badge: unscreenedAppsCount,
      },
      { id: "interviews", label: "Interviews", icon: CalendarClock },
      {
        id: "talent-pool",
        label: "Talent Pool",
        icon: UserCheck,
        badge: activePoolCount,
      },
      { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
      {
        id: "enquiries",
        label: "Enquiries",
        icon: Mail,
        badge: enquiries.filter((e) => e.organizationId === "org-josieshield" && e.status === "New").length,
      },
      { id: "media", label: "Media Library", icon: ImageIcon },
      { id: "users", label: "Users & Roles", icon: Users },
      { id: "settings", label: "Settings", icon: Settings },
    ];
  }, [
    activeOrgId,
    activePoolCount,
    enquiries,
    sanefProjects.length,
    triageRequestsCount,
    unscreenedAppsCount,
  ]);

  const handleOrgSwitch = (nextOrgId: OrgId) => {
    setActiveOrgId(nextOrgId);
    setActiveModule("overview");
    setOrgMenuOpen(false);
    setMobileOrgMenuOpen(false);
    setSelectedAppId(null);
    setSelectedPoolId(null);
    setSelectedReqId(null);
    setSelectedProject(null);
    setSelectedPartner(null);
    setSelectedEnquiry(null);
    setGenericSearch("");
    const target = ORGANIZATIONS.find((o) => o.id === nextOrgId);
    if (target) showToast(`Switched workspace to ${target.name}`);
  };

  // Filtered Applications
  const uniqueAppRoles = useMemo(
    () => Array.from(new Set(applications.map((a) => a.role))),
    [applications]
  );
  const uniqueAppLocations = useMemo(
    () => Array.from(new Set(applications.map((a) => a.location))),
    [applications]
  );

  const filteredApplications = useMemo(() => {
    return applications.filter((a) => {
      if (appStage !== "All" && a.stage !== appStage) return false;
      if (appRoleFilter !== "All" && a.role !== appRoleFilter) return false;
      if (appLocationFilter !== "All" && a.location !== appLocationFilter) return false;
      if (appAvailFilter !== "All" && a.availability !== appAvailFilter) return false;
      if (appSearch.trim()) {
        const q = appSearch.toLowerCase();
        return (
          a.applicantName.toLowerCase().includes(q) ||
          a.referenceCode.toLowerCase().includes(q) ||
          a.role.toLowerCase().includes(q) ||
          a.location.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [applications, appStage, appRoleFilter, appLocationFilter, appAvailFilter, appSearch]);

  const selectedApp = applications.find((a) => a.id === selectedAppId) || null;

  // Filtered Talent Pool
  const filteredPool = useMemo(() => {
    return talentPool.filter((p) => {
      if (poolAvailFilter !== "All" && p.availabilityStatus !== poolAvailFilter) return false;
      if (poolStatusFilter !== "All" && p.poolStatus !== poolStatusFilter) return false;
      if (poolSearch.trim()) {
        const q = poolSearch.toLowerCase();
        return (
          p.fullName.toLowerCase().includes(q) ||
          p.applicationRef.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.preferredAssignment.toLowerCase().includes(q) ||
          p.skills.some((s) => s.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [talentPool, poolAvailFilter, poolStatusFilter, poolSearch]);

  const selectedPool = talentPool.find((p) => p.id === selectedPoolId) || null;

  // Filtered Marketplace Requests
  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      if (reqCategoryFilter !== "All" && r.serviceCategory !== reqCategoryFilter) return false;
      if (reqStatusFilter !== "All" && r.status !== reqStatusFilter) return false;
      if (reqSearch.trim()) {
        const q = reqSearch.toLowerCase();
        return (
          r.referenceNumber.toLowerCase().includes(q) ||
          r.clientName.toLowerCase().includes(q) ||
          r.organisationName.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [requests, reqCategoryFilter, reqStatusFilter, reqSearch]);

  const selectedReq = requests.find((r) => r.id === selectedReqId) || null;

  // Handlers: Applications
  const handleStageChange = async (appId: string, nextStage: RecruitmentStage) => {
    const target = applications.find((a) => a.id === appId);
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, stage: nextStage } : a))
    );
    if (target) {
      pushActivity("org-josieshield", target.referenceCode, `Stage changed to ${nextStage} (${target.applicantName})`, "Applications");
      showToast(`${target.applicantName} moved to "${nextStage}"`);
    }
    try {
      await fetch("/api/admin/recruitment", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: appId, stage: nextStage }),
      });
    } catch {
      // synced locally
    }
  };

  const handleAddRestrictedNote = () => {
    if (!selectedApp || !newNoteText.trim()) return;
    const now = new Date().toISOString().slice(0, 16).replace("T", " ");
    const entry = {
      id: `rn-${Date.now()}`,
      author: activePersona === "super_admin" ? "Inimfon Udoh" : "Jane Okonkwo",
      timestamp: now,
      text: newNoteText.trim(),
    };
    setApplications((prev) =>
      prev.map((a) =>
        a.id === selectedApp.id
          ? { ...a, restrictedNotes: [entry, ...a.restrictedNotes] }
          : a
      )
    );
    setNewNoteText("");
    showToast("Internal restricted note logged.");
  };

  const handleScheduleInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;
    const entry = {
      id: `int-${Date.now()}`,
      date: interviewForm.date,
      time: interviewForm.time,
      interviewer: interviewForm.interviewer,
      mode: interviewForm.mode,
      outcome: "Scheduled" as const,
      feedback: interviewForm.feedback.trim() || "Interview panel scheduled via recruitment console.",
    };
    setApplications((prev) =>
      prev.map((a) =>
        a.id === selectedApp.id
          ? { ...a, stage: "Interview Scheduled", interviews: [entry, ...a.interviews] }
          : a
      )
    );
    setInterviewForm((f) => ({ ...f, feedback: "" }));
    pushActivity("org-josieshield", selectedApp.referenceCode, `Interview scheduled for ${selectedApp.applicantName} on ${entry.date}`, "Interviews");
    showToast(`Interview scheduled for ${selectedApp.applicantName}`);
  };

  const handleMoveToTalentPool = (app: JobApplication) => {
    const today = new Date().toISOString().slice(0, 10);
    setApplications((prev) =>
      prev.map((a) =>
        a.id === app.id ? { ...a, stage: "Talent Pool", inTalentPool: true } : a
      )
    );
    const exists = talentPool.some((t) => t.applicationRef === app.referenceCode);
    if (!exists) {
      const newProfile: TalentPoolProfile = {
        id: `tp-${Date.now()}`,
        organizationId: "org-josieshield",
        applicationRef: app.referenceCode,
        fullName: app.applicantName,
        phone: app.phone,
        email: app.email,
        skills: app.skills,
        preferredAssignment: app.role,
        location: app.location,
        availabilityStatus: "Available",
        lastConfirmedDate: today,
        poolStatus: "Active",
        assessmentOutcome: "Approved via Recruitment Pipeline",
        experienceYears: app.experienceYears,
        contactHistory: [
          {
            id: `ch-${Date.now()}`,
            date: today,
            by: activePersona === "super_admin" ? "Inimfon Udoh" : "Jane Okonkwo",
            channel: "Pipeline Promotion",
            note: "Promoted from Applications to Ready-to-Work Talent Pool.",
          },
        ],
        internalNotes: app.qualifications,
      };
      setTalentPool((prev) => [newProfile, ...prev]);
    }
    pushActivity("org-josieshield", app.referenceCode, `Added ${app.applicantName} to Ready-to-Work Talent Pool`, "Talent Pool");
    showToast(`${app.applicantName} added to Ready-to-Work Talent Pool`);
  };

  const handleConfirmAvailability = async (profileId: string, nextAvail: PoolAvailability = "Available") => {
    const today = new Date().toISOString().slice(0, 10);
    const target = talentPool.find((p) => p.id === profileId);
    setTalentPool((prev) =>
      prev.map((p) =>
        p.id === profileId
          ? {
              ...p,
              availabilityStatus: nextAvail,
              poolStatus: "Active",
              lastConfirmedDate: today,
              contactHistory: [
                {
                  id: `ch-${Date.now()}`,
                  date: today,
                  by: activePersona === "super_admin" ? "Inimfon Udoh" : "Jane Okonkwo",
                  channel: "Availability Confirmation",
                  note: `Availability confirmed as ${nextAvail}.`,
                },
                ...p.contactHistory,
              ],
            }
          : p
      )
    );
    if (target) {
      pushActivity("org-josieshield", target.applicationRef, `Confirmed availability (${nextAvail}) for ${target.fullName}`, "Talent Pool");
      showToast(`Confirmed ${target.fullName} as ${nextAvail} (${today})`);
    }
    try {
      await fetch("/api/admin/recruitment", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: profileId, talentPoolAvailability: nextAvail }),
      });
    } catch {
      // synced
    }
  };

  const handleTogglePoolStatus = (profileId: string, nextStatus: PoolStatus) => {
    setTalentPool((prev) =>
      prev.map((p) => (p.id === profileId ? { ...p, poolStatus: nextStatus } : p))
    );
    showToast(`Pool status updated to ${nextStatus}`);
  };

  const handleLogPoolContact = () => {
    if (!selectedPool || !poolContactNote.trim()) return;
    const today = new Date().toISOString().slice(0, 10);
    setTalentPool((prev) =>
      prev.map((p) =>
        p.id === selectedPool.id
          ? {
              ...p,
              contactHistory: [
                {
                  id: `ch-${Date.now()}`,
                  date: today,
                  by: activePersona === "super_admin" ? "Inimfon Udoh" : "Jane Okonkwo",
                  channel: "Direct Follow-up",
                  note: poolContactNote.trim(),
                },
                ...p.contactHistory,
              ],
            }
          : p
      )
    );
    setPoolContactNote("");
    showToast("Contact history entry logged.");
  };

  const handleReqStatusChange = async (reqId: string, nextStatus: RequestStatus) => {
    const target = requests.find((r) => r.id === reqId);
    const now = new Date().toISOString().slice(0, 16).replace("T", " ");
    setRequests((prev) =>
      prev.map((r) =>
        r.id === reqId
          ? {
              ...r,
              status: nextStatus,
              followUpTimeline: [
                {
                  id: `ft-${Date.now()}`,
                  timestamp: now,
                  author: activePersona === "super_admin" ? "Inimfon Udoh" : "Jane Okonkwo",
                  entry: `Request status updated to ${nextStatus}.`,
                },
                ...r.followUpTimeline,
              ],
            }
          : r
      )
    );
    if (target) {
      pushActivity("org-josieshield", target.referenceNumber, `Marketplace request marked ${nextStatus}`, "Marketplace Requests");
      showToast(`${target.referenceNumber} status set to ${nextStatus}`);
    }
    try {
      await fetch("/api/admin/marketplace", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: reqId, status: nextStatus }),
      });
    } catch {
      // synced
    }
  };

  const handleAddReqFollowUp = () => {
    if (!selectedReq || !reqFollowUpNote.trim()) return;
    const now = new Date().toISOString().slice(0, 16).replace("T", " ");
    setRequests((prev) =>
      prev.map((r) =>
        r.id === selectedReq.id
          ? {
              ...r,
              followUpTimeline: [
                {
                  id: `ft-${Date.now()}`,
                  timestamp: now,
                  author: activePersona === "super_admin" ? "Inimfon Udoh" : "Jane Okonkwo",
                  entry: reqFollowUpNote.trim(),
                },
                ...r.followUpTimeline,
              ],
            }
          : r
      )
    );
    setReqFollowUpNote("");
    showToast("Follow-up note added to timeline.");
  };

  const activeNavObj = navItems.find((n) => n.id === activeModule) || navItems[0];
  const orgActivities = activities.filter((a) => a.organizationId === activeOrgId);
  const orgEnquiries = enquiries.filter((e) => e.organizationId === activeOrgId);
  const orgPages = CMS_PAGES.filter((p) => p.organizationId === activeOrgId);
  const orgMedia = MEDIA_ASSETS.filter((m) => m.organizationId === activeOrgId);
  const orgVacancies = VACANCIES_DATA.filter((v) => v.organizationId === activeOrgId);

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] text-[#09090B]">
      {/* Signature 3px Organisation Context Top Bar */}
      <div className={`h-[3px] w-full shrink-0 transition-colors ${orgAccentBar}`} />

      <div className="flex min-w-0 flex-1">
        {/* Mobile Sidebar Backdrop */}
        {mobileNavOpen && (
          <div
            className="fixed inset-0 z-30 bg-[#09090B]/30 lg:hidden"
            onClick={() => setMobileNavOpen(false)}
          />
        )}

        {/* ===================================================================== */}
        {/* FIXED 240px LEFT SIDEBAR (Sticky full-viewport so footer never clips) */}
        {/* ===================================================================== */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-[240px] shrink-0 flex-col border-r border-[#E4E4E7] bg-white lg:sticky lg:top-[3px] lg:flex lg:h-[calc(100vh-3px)] ${
            mobileNavOpen ? "flex" : "hidden"
          }`}
        >
          {/* Top-Left Organisation Switcher */}
          <div className="relative shrink-0 border-b border-[#E4E4E7] p-3">
            <button
              type="button"
              onClick={() => setOrgMenuOpen((v) => !v)}
              className={`flex w-full items-center justify-between gap-2 rounded-[6px] border px-2.5 py-2 text-left transition-colors hover:bg-[#F4F4F5] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/25 ${orgTintBg}`}
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <OrgMark orgId={activeOrgId} />
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold leading-tight text-[#09090B]">
                    {activeOrg.shortName}
                  </p>
                  <p className="truncate text-[12px] text-[#71717A]">{currentRoleLabel}</p>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 shrink-0 text-[#71717A]" />
            </button>

            {orgMenuOpen && (
              <div className="absolute left-3 right-3 top-[66px] z-50 rounded-[6px] border border-[#E4E4E7] bg-white p-1.5">
                <p className="px-2 py-1 text-[12px] font-medium text-[#71717A]">
                  Switch organisation
                </p>
                {ORGANIZATIONS.map((org) => {
                  const selected = org.id === activeOrgId;
                  return (
                    <button
                      key={org.id}
                      type="button"
                      onClick={() => handleOrgSwitch(org.id)}
                      className={`flex w-full items-center justify-between rounded-[5px] px-2 py-2 text-left text-[13px] ${
                        selected
                          ? "bg-[#EFF6FF] font-semibold text-[#1D4ED8]"
                          : "text-[#3F3F46] hover:bg-[#FAFAFA]"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <OrgMark orgId={org.id} size="sm" />
                        <span className="truncate">{org.shortName}</span>
                      </span>
                      {selected && <Check className="h-3.5 w-3.5 text-[#2563EB]" />}
                    </button>
                  );
                })}

                <div className="my-1.5 border-t border-[#E4E4E7]" />
                <p className="px-2 py-1 text-[12px] font-medium text-[#71717A]">
                  RBAC role preview
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActivePersona("super_admin");
                    setOrgMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-[5px] px-2 py-1.5 text-left text-[12px] ${
                    activePersona === "super_admin"
                      ? "bg-[#EFF6FF] font-medium text-[#1D4ED8]"
                      : "text-[#52525B] hover:bg-[#FAFAFA]"
                  }`}
                >
                  <span>Inimfon Udoh · Super Admin</span>
                  {activePersona === "super_admin" && <Check className="h-3 w-3" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActivePersona("shared_jane");
                    setOrgMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-[5px] px-2 py-1.5 text-left text-[12px] ${
                    activePersona === "shared_jane"
                      ? "bg-[#EFF6FF] font-medium text-[#1D4ED8]"
                      : "text-[#52525B] hover:bg-[#FAFAFA]"
                  }`}
                >
                  <span className="truncate">Jane Okonkwo · Scoped Role</span>
                  {activePersona === "shared_jane" && <Check className="h-3 w-3" />}
                </button>
              </div>
            )}
          </div>

          {/* Org-Scoped Navigation Links */}
          <nav className="flex-1 space-y-0.5 overflow-y-auto px-2.5 py-3" aria-label="Organisation Navigation">
            <p className="mb-1.5 px-2.5 text-[12px] font-medium text-[#71717A]">
              {activeOrgId === "org-sanef" ? "SANEF workspace" : "Josie Shield workspace"}
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveModule(item.id);
                    setMobileNavOpen(false);
                    setGenericSearch("");
                  }}
                  className={`relative flex w-full items-center justify-between rounded-[6px] px-2.5 py-2 text-[13px] transition-colors ${
                    isActive
                      ? "bg-[#EFF6FF] font-semibold text-[#1D4ED8]"
                      : "text-[#52525B] hover:bg-[#F4F4F5] hover:text-[#09090B]"
                  }`}
                >
                  {isActive && (
                    <span className="absolute bottom-1.5 left-0 top-1.5 w-[3px] rounded-r bg-[#2563EB]" />
                  )}
                  <span className="flex items-center gap-2.5 truncate">
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-[#2563EB]" : "text-[#71717A]"}`} />
                    <span className="truncate">{item.label}</span>
                  </span>
                  {typeof item.badge === "number" && item.badge > 0 && (
                    <span
                      className={`rounded-[4px] px-1.5 py-0.5 font-mono text-[12px] font-medium tabular-nums ${
                        isActive ? "bg-[#DBEAFE] text-[#1D4ED8]" : "bg-[#F4F4F5] text-[#52525B]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom Org Isolation Footer (Pinned, zero clipping) */}
          <div className="mt-auto shrink-0 border-t border-[#E4E4E7] p-3">
            <div className={`rounded-[6px] border px-2.5 py-2 ${orgTintBg}`}>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-[#09090B]">Tenant Isolation</span>
                <span className="inline-flex items-center gap-1 font-mono text-[12px] text-[#166534]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" /> Active
                </span>
              </div>
              <p className="mt-0.5 truncate font-mono text-[12px] text-[#52525B]">
                scope: {activeOrg.id}
              </p>
            </div>
          </div>
        </aside>

        {/* ===================================================================== */}
        {/* MAIN CONTENT SHELL                                                    */}
        {/* ===================================================================== */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Sticky 56px Top Bar */}
          <header className="sticky top-[3px] z-20 flex h-14 items-center justify-between gap-3 border-b border-[#E4E4E7] bg-white px-4 lg:px-6">
            <div className="flex min-w-0 items-center gap-2.5">
              <button
                type="button"
                onClick={() => setMobileNavOpen(true)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] border border-[#E4E4E7] text-[#52525B] lg:hidden"
                aria-label="Open navigation"
              >
                <Menu className="h-4 w-4" />
              </button>

              {/* Mobile Active Tenant Switcher Pill (<lg) */}
              <div className="relative lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileOrgMenuOpen((v) => !v)}
                  className={`inline-flex items-center gap-1.5 rounded-[6px] border px-2 py-1 text-[12px] font-semibold text-[#09090B] ${orgTintBg}`}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: activeOrg.dotColor }}
                  />
                  <span>{activeOrg.shortName}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-[#71717A]" />
                </button>
                {mobileOrgMenuOpen && (
                  <div className="absolute left-0 top-9 z-50 w-52 rounded-[6px] border border-[#E4E4E7] bg-white p-1.5">
                    {ORGANIZATIONS.map((org) => (
                      <button
                        key={org.id}
                        type="button"
                        onClick={() => handleOrgSwitch(org.id)}
                        className={`flex w-full items-center justify-between rounded-[5px] px-2.5 py-2 text-left text-[13px] ${
                          org.id === activeOrgId
                            ? "bg-[#EFF6FF] font-semibold text-[#1D4ED8]"
                            : "text-[#3F3F46] hover:bg-[#FAFAFA]"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <OrgMark orgId={org.id} size="sm" />
                          <span>{org.shortName}</span>
                        </span>
                        {org.id === activeOrgId && <Check className="h-3.5 w-3.5" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Breadcrumb */}
              <div className="flex min-w-0 items-center gap-2 text-[13px]">
                <span className="hidden items-center gap-1.5 text-[#71717A] lg:inline-flex">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: activeOrg.dotColor }}
                  />
                  <span className="truncate">{activeOrg.name}</span>
                </span>
                <span className="hidden text-[#D4D4D8] lg:inline">/</span>
                <span className="truncate font-semibold text-[#09090B]">{activeNavObj.label}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href={activeOrg.localUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-1.5 rounded-[6px] border border-[#E4E4E7] bg-white px-2.5 py-1.5 text-[12px] font-medium text-[#3F3F46] hover:bg-[#FAFAFA] sm:inline-flex"
              >
                <span>{activeOrg.websiteDomain}</span>
                <ExternalLink className="h-3.5 w-3.5 text-[#71717A]" />
              </a>
              <div className="flex items-center gap-2 rounded-[6px] border border-[#E4E4E7] bg-[#FAFAFA] px-2.5 py-1">
                <span className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-[#18181B] text-[12px] font-semibold text-white">
                  {activePersona === "super_admin" ? "IU" : "JO"}
                </span>
                <div className="hidden text-left md:block">
                  <p className="text-[12px] font-semibold leading-tight text-[#09090B]">
                    {activePersona === "super_admin"
                      ? `${CURRENT_USER.firstName} ${CURRENT_USER.lastName}`
                      : "Jane Okonkwo"}
                  </p>
                  <p className="text-[12px] leading-tight text-[#71717A]">{currentRoleLabel}</p>
                </div>
              </div>
            </div>
          </header>

          {/* Inline Toast Banner */}
          {toastMessage && (
            <div className="flex items-center justify-between border-b border-[#BFDBFE] bg-[#EFF6FF] px-6 py-2 text-[12px] font-medium text-[#1E40AF]">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {toastMessage}
              </span>
              <button type="button" onClick={() => setToastMessage(null)} className="text-[#1E40AF] hover:opacity-75">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Dense Main Content Canvas */}
          <main className="flex-1 p-4 lg:p-6">
            {/* ================================================================= */}
            {/* SCREEN 1: ORGANISATION OVERVIEW                                   */}
            {/* ================================================================= */}
            {activeModule === "overview" && (
              <div className="space-y-5">
                {/* Page Header & Quick Actions */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: activeOrg.dotColor }}
                      />
                      <span className="font-mono text-[12px] font-medium text-[#52525B]">
                        {activeOrgId === "org-sanef" ? "org-sanef · NGO workspace" : "org-josieshield · Security operations"}
                      </span>
                    </div>
                    <h1 className="mt-1 text-[22px] font-semibold tracking-[-0.02em] text-[#09090B]">
                      {activeOrg.name} Overview
                    </h1>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {activeOrgId === "org-josieshield" ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setActiveModule("applications")}
                          className="inline-flex items-center gap-1.5 rounded-[6px] border border-[#E4E4E7] bg-white px-3 py-2 text-[13px] font-medium text-[#09090B] hover:bg-[#FAFAFA]"
                        >
                          Review Applications
                          <ArrowUpRight className="h-3.5 w-3.5 text-[#71717A]" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveModule("marketplace")}
                          className="inline-flex items-center gap-1.5 rounded-[6px] bg-[#2563EB] px-3.5 py-2 text-[13px] font-medium text-white hover:bg-[#1D4ED8]"
                        >
                          Marketplace Queue ({triageRequestsCount})
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => setActiveModule("partnerships")}
                          className="inline-flex items-center gap-1.5 rounded-[6px] border border-[#E4E4E7] bg-white px-3 py-2 text-[13px] font-medium text-[#09090B] hover:bg-[#FAFAFA]"
                        >
                          Partner Directory
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveModule("projects")}
                          className="inline-flex items-center gap-1.5 rounded-[6px] bg-[#2563EB] px-3.5 py-2 text-[13px] font-medium text-white hover:bg-[#1D4ED8]"
                        >
                          Projects & Evidence
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Role-Scoped 4-Card KPI Strip (2x2 compact grid on mobile 390px!) */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
                  {(activeOrgId === "org-josieshield"
                    ? [
                        {
                          label: "Marketplace Requests",
                          value: String(requests.length),
                          meta: `${triageRequestsCount} awaiting triage`,
                          action: () => setActiveModule("marketplace"),
                        },
                        {
                          label: "Total Applications",
                          value: String(applications.length),
                          meta: `${unscreenedAppsCount} unscreened · 1 interview`,
                          action: () => setActiveModule("applications"),
                        },
                        {
                          label: "Active Talent Pool",
                          value: String(activePoolCount),
                          meta: `${availablePoolCount} available · ${awaitingPoolCount} unconfirmed`,
                          action: () => setActiveModule("talent-pool"),
                        },
                        {
                          label: "Open Vacancies",
                          value: String(orgVacancies.filter((v) => v.status === "Open").length),
                          meta: "Lagos, Abuja & PH",
                          action: () => setActiveModule("careers"),
                        },
                      ]
                    : [
                        {
                          label: "Archived Projects",
                          value: String(sanefProjects.length),
                          meta: `${sanefProjects.filter((p) => p.status === "Published").length} published · ${sanefProjects.reduce((acc, p) => acc + p.pdfCount, 0)} PDFs`,
                          action: () => setActiveModule("projects"),
                        },
                        {
                          label: "Partner Profiles",
                          value: String(SANEF_PARTNERSHIPS.length),
                          meta: `${SANEF_PARTNERSHIPS.filter((p) => p.status === "Active").length} active collaborations`,
                          action: () => setActiveModule("partnerships"),
                        },
                        {
                          label: "Verified Donations",
                          value: "₦13.3M",
                          meta: `${DONATIONS_DATA.length} Q4 contributions`,
                          action: () => setActiveModule("donations"),
                        },
                        {
                          label: "Public Enquiries",
                          value: String(orgEnquiries.length),
                          meta: `${orgEnquiries.filter((e) => e.status === "New").length} awaiting reply`,
                          action: () => setActiveModule("enquiries"),
                        },
                      ]
                  ).map((kpi) => (
                    <button
                      key={kpi.label}
                      type="button"
                      onClick={kpi.action}
                      className="group rounded-[6px] border border-[#E4E4E7] bg-white p-3.5 text-left transition-colors hover:border-[#2563EB] sm:p-4"
                    >
                      <p className="text-[12px] font-medium text-[#71717A]">{kpi.label}</p>
                      <p className="mt-1.5 font-mono text-[24px] font-semibold tracking-[-0.02em] text-[#09090B] tabular-nums sm:text-[26px]">
                        {kpi.value}
                      </p>
                      <p className="mt-1 text-[12px] text-[#52525B] group-hover:text-[#2563EB]">
                        {kpi.meta}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Operational Distribution Micro-Visual Bar + Quick Actions */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                  {/* Flat Solid Distribution Bar (Zero gradients/shadows) */}
                  <div className="rounded-[6px] border border-[#E4E4E7] bg-white p-4 lg:col-span-6">
                    {activeOrgId === "org-josieshield" ? (
                      <>
                        <div className="flex items-center justify-between">
                          <h2 className="text-[14px] font-semibold text-[#09090B]">
                            Recruitment Pipeline & Pool Readiness
                          </h2>
                          <span className="font-mono text-[12px] text-[#52525B]">
                            {applications.length} candidates
                          </span>
                        </div>
                        <div className="mt-3 flex h-2.5 w-full overflow-hidden rounded-[3px] bg-[#F4F4F5]">
                          <div className="bg-[#2563EB]" style={{ width: "20%" }} title="New / Review (2)" />
                          <div className="bg-[#0F172A]" style={{ width: "30%" }} title="Shortlisted / Interview (3)" />
                          <div className="bg-[#16A34A]" style={{ width: "20%" }} title="Qualified / Talent Pool (2)" />
                          <div className="bg-[#D4D4D8]" style={{ width: "30%" }} title="Hold / Closed (3)" />
                        </div>
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[#52525B]">
                          <span className="inline-flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-[#2563EB]" /> Screening ({unscreenedAppsCount})
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-[#0F172A]" /> Interviewing (3)
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-[#16A34A]" /> Cleared / Pool (2)
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-[#D4D4D8]" /> Hold / Closed (3)
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <h2 className="text-[14px] font-semibold text-[#09090B]">
                            Evidence Archive & Campaign Progress
                          </h2>
                          <span className="font-mono text-[12px] text-[#1B4332]">
                            67% Q4 campaign target
                          </span>
                        </div>
                        <div className="mt-3 flex h-2.5 w-full overflow-hidden rounded-[3px] bg-[#F4F4F5]">
                          <div className="bg-[#1B4332]" style={{ width: "67%" }} title="Funded (67%)" />
                          <div className="bg-[#C85A32]" style={{ width: "14%" }} title="Pending Reconciliation (14%)" />
                        </div>
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[#52525B]">
                          <span className="inline-flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-[#1B4332]" /> Verified Grants (₦9.9M)
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-[#C85A32]" /> Pending Audit (₦3.4M)
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Quick Actions Strip (Full-width uniform buttons on mobile) */}
                  <div className="rounded-[6px] border border-[#E4E4E7] bg-white p-4 lg:col-span-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-[14px] font-semibold text-[#09090B]">Quick Actions</h2>
                      <span className="text-[12px] text-[#71717A]">{currentRoleLabel}</span>
                    </div>
                    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                      {(activeOrgId === "org-josieshield"
                        ? [
                            {
                              label: "Screen New Applications",
                              onClick: () => {
                                setActiveModule("applications");
                                setAppStage("New Application");
                              },
                            },
                            {
                              label: "Confirm Stale Pool Availability",
                              onClick: () => {
                                setActiveModule("talent-pool");
                                setPoolAvailFilter("Awaiting Confirmation");
                              },
                            },
                            {
                              label: "Triage Service Requests",
                              onClick: () => {
                                setActiveModule("marketplace");
                                setReqStatusFilter("New");
                              },
                            },
                          ]
                        : [
                            {
                              label: "Audit Evidence Reports",
                              onClick: () => setActiveModule("projects"),
                            },
                            {
                              label: "Review Draft Articles",
                              onClick: () => setActiveModule("blog"),
                            },
                            {
                              label: "Reconcile Donations",
                              onClick: () => setActiveModule("donations"),
                            },
                          ]
                      ).map((qa) => (
                        <button
                          key={qa.label}
                          type="button"
                          onClick={qa.onClick}
                          className="inline-flex w-full items-center justify-between gap-2 rounded-[6px] border border-[#E4E4E7] bg-[#FAFAFA] px-3 py-2 text-[12px] font-medium text-[#09090B] hover:border-[#2563EB] hover:bg-[#EFF6FF] hover:text-[#1D4ED8] sm:w-auto sm:py-1.5"
                        >
                          <span>{qa.label}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#71717A]" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Activity Dense Table (Desktop) + Uniform Mobile List */}
                <div className="overflow-hidden rounded-[6px] border border-[#E4E4E7] bg-white">
                  <div className="flex items-center justify-between gap-3 border-b border-[#E4E4E7] px-4 py-3">
                    <div className="min-w-0">
                      <h2 className="text-[14px] font-semibold text-[#09090B]">
                        Recent Organisation Activity & Audit Log
                      </h2>
                      <p className="text-[12px] text-[#71717A]">
                        Isolated to {activeOrg.name} — cross-organisation events are filtered server-side.
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-[12px] text-[#71717A]">
                      {orgActivities.length} events
                    </span>
                  </div>

                  {/* Mobile Uniform List (<768px — consistent alignment on all rows) */}
                  <div className="divide-y divide-[#E4E4E7] md:hidden">
                    {orgActivities.map((act) => (
                      <div key={act.id} className="space-y-1.5 px-4 py-3.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[12px] text-[#52525B]">{act.refId}</span>
                          <StatusPill
                            label={act.severity}
                            tone={
                              act.severity === "Security"
                                ? "amber"
                                : act.severity === "Update"
                                ? "blue"
                                : "neutral"
                            }
                          />
                        </div>
                        <p className="text-[13px] font-medium leading-snug text-[#09090B]">
                          {act.action}
                        </p>
                        <div className="flex items-center justify-between gap-2 text-[12px] text-[#71717A]">
                          <span className="truncate">{act.module} · {act.actor}</span>
                          <span className="shrink-0 font-mono tabular-nums">{act.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Dense Data Table (>=768px) */}
                  <div className="hidden overflow-x-auto md:block" data-bleed>
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-[#E4E4E7] bg-[#FAFAFA] text-[12px] font-medium text-[#71717A]">
                          <th className="px-4 py-2.5">Ref ID</th>
                          <th className="px-4 py-2.5">Event</th>
                          <th className="px-4 py-2.5">Module</th>
                          <th className="px-4 py-2.5">Actor</th>
                          <th className="px-4 py-2.5">Type</th>
                          <th className="px-4 py-2.5 text-right">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4E4E7] text-[13px]">
                        {orgActivities.map((act) => (
                          <tr key={act.id} className="hover:bg-[#FAFAFA]">
                            <td className="px-4 py-3 font-mono text-[12px] text-[#52525B] whitespace-nowrap">
                              {act.refId}
                            </td>
                            <td className="px-4 py-3 font-medium text-[#09090B]">{act.action}</td>
                            <td className="px-4 py-3 text-[#52525B] whitespace-nowrap">{act.module}</td>
                            <td className="px-4 py-3 text-[#52525B] whitespace-nowrap">{act.actor}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <StatusPill
                                label={act.severity}
                                tone={
                                  act.severity === "Security"
                                    ? "amber"
                                    : act.severity === "Update"
                                    ? "blue"
                                    : "neutral"
                                }
                              />
                            </td>
                            <td className="px-4 py-3 text-right font-mono text-[12px] text-[#71717A] whitespace-nowrap tabular-nums">
                              {act.timestamp}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ================================================================= */}
            {/* SCREEN 2: JOSIE SHIELD — APPLICATIONS & RECRUITMENT PIPELINE      */}
            {/* ================================================================= */}
            {activeModule === "applications" && activeOrgId === "org-josieshield" && (
              <div className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="font-mono text-[12px] text-[#71717A]">
                      Josie Shield Recruitment · 10-Stage Pipeline
                    </p>
                    <h1 className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-[#09090B]">
                      Applications & Recruitment Pipeline
                    </h1>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveModule("talent-pool")}
                    className="rounded-[6px] border border-[#E4E4E7] bg-white px-3 py-1.5 text-[13px] font-medium text-[#09090B] hover:border-[#2563EB] hover:text-[#2563EB]"
                  >
                    Open Talent Pool ({activePoolCount} Active)
                  </button>
                </div>

                {/* Pipeline Stage Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto border-b border-[#E4E4E7] pb-2">
                  {["All", ...RECRUITMENT_STAGES].map((st) => {
                    const count =
                      st === "All"
                        ? applications.length
                        : applications.filter((a) => a.stage === st).length;
                    const active = appStage === st;
                    return (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setAppStage(st)}
                        className={`inline-flex shrink-0 items-center gap-1.5 rounded-[6px] px-2.5 py-1.5 text-[12px] font-medium transition-colors ${
                          active
                            ? "bg-[#2563EB] text-white"
                            : "text-[#52525B] hover:bg-[#F4F4F5] hover:text-[#09090B]"
                        }`}
                      >
                        <span>{st}</span>
                        <span
                          className={`font-mono text-[12px] tabular-nums ${
                            active ? "text-white/80" : "text-[#71717A]"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Filter Bar */}
                <div className="flex flex-wrap items-center gap-2 rounded-[6px] border border-[#E4E4E7] bg-white p-3">
                  <div className="relative min-w-[220px] flex-1">
                    <Search className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#71717A]" />
                    <input
                      type="text"
                      value={appSearch}
                      onChange={(e) => setAppSearch(e.target.value)}
                      placeholder="Search candidate, Ref ID, role, location..."
                      className="w-full rounded-[6px] border border-[#E4E4E7] bg-[#FAFAFA] py-1.5 pl-8 pr-3 text-[13px] text-[#09090B] placeholder:text-[#71717A] focus:border-[#2563EB] focus:bg-white focus:outline-none"
                    />
                  </div>
                  <FlatSelect value={appRoleFilter} onChange={setAppRoleFilter}>
                    <option value="All">Role: All</option>
                    {uniqueAppRoles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </FlatSelect>
                  <FlatSelect value={appLocationFilter} onChange={setAppLocationFilter}>
                    <option value="All">Location: All</option>
                    {uniqueAppLocations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </FlatSelect>
                  <FlatSelect value={appAvailFilter} onChange={setAppAvailFilter}>
                    <option value="All">Availability: All</option>
                    <option value="Immediate">Immediate</option>
                    <option value="7 days notice">7 days notice</option>
                    <option value="14 days notice">14 days notice</option>
                    <option value="30 days notice">30 days notice</option>
                  </FlatSelect>
                </div>

                {/* Dense Applications Data Table */}
                <div className="overflow-hidden rounded-[6px] border border-[#E4E4E7] bg-white">
                  <div className="overflow-x-auto" data-bleed>
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-[#E4E4E7] bg-[#FAFAFA] text-[12px] font-medium text-[#71717A]">
                          <th className="px-4 py-2.5">Candidate</th>
                          <th className="px-4 py-2.5">Ref ID</th>
                          <th className="px-4 py-2.5">Role</th>
                          <th className="px-4 py-2.5">Location</th>
                          <th className="px-4 py-2.5">Pipeline Stage</th>
                          <th className="px-4 py-2.5">Assigned Reviewer</th>
                          <th className="px-4 py-2.5 text-right">Applied Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4E4E7] text-[13px]">
                        {filteredApplications.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="px-4 py-10 text-center text-[13px] text-[#71717A]">
                              No candidate records match the current filters.
                            </td>
                          </tr>
                        ) : (
                          filteredApplications.map((app) => {
                            const isSelected = app.id === selectedAppId;
                            return (
                              <tr
                                key={app.id}
                                onClick={() => setSelectedAppId(app.id)}
                                className={`cursor-pointer transition-colors ${
                                  isSelected ? "bg-[#EFF6FF]" : "hover:bg-[#FAFAFA]"
                                }`}
                              >
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <p className="font-medium text-[#09090B]">{app.applicantName}</p>
                                  <p className="text-[12px] text-[#71717A]">
                                    {app.experienceYears} yrs · {app.availability}
                                  </p>
                                </td>
                                <td className="px-4 py-3 font-mono text-[12px] text-[#52525B] whitespace-nowrap">
                                  {app.referenceCode}
                                </td>
                                <td className="px-4 py-3 text-[#3F3F46]">
                                  <p className="font-medium text-[#09090B]">{app.role}</p>
                                  <p className="text-[12px] text-[#71717A]">{app.sourceType}</p>
                                </td>
                                <td className="px-4 py-3 text-[#52525B] whitespace-nowrap">{app.location}</td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <StatusPill label={app.stage} tone={stageTone(app.stage)} />
                                </td>
                                <td className="px-4 py-3 text-[#52525B] whitespace-nowrap">
                                  {app.assignedReviewer}
                                </td>
                                <td className="px-4 py-3 text-right font-mono text-[12px] text-[#71717A] whitespace-nowrap tabular-nums">
                                  {app.appliedDate}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#E4E4E7] bg-[#FAFAFA] px-4 py-2.5 text-[12px] text-[#71717A]">
                    <span>
                      Showing <strong className="text-[#09090B]">{filteredApplications.length}</strong> of{" "}
                      {applications.length} applications — click any row to inspect CV, interviews & restricted notes.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ================================================================= */}
            {/* SCREEN 3: JOSIE SHIELD — READY-TO-WORK TALENT POOL                */}
            {/* ================================================================= */}
            {activeModule === "talent-pool" && activeOrgId === "org-josieshield" && (
              <div className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="font-mono text-[12px] text-[#71717A]">
                      Vetted Deployment Roster · {talentPool.length} Profiles ({activePoolCount} Active)
                    </p>
                    <h1 className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-[#09090B]">
                      Ready-to-Work Security Talent Pool
                    </h1>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[12px] text-[#52525B]">
                    <span className="rounded-[6px] border border-[#E4E4E7] bg-white px-2.5 py-1.5">
                      Available: <strong className="text-[#166534]">{availablePoolCount}</strong>
                    </span>
                    <span className="rounded-[6px] border border-[#E4E4E7] bg-white px-2.5 py-1.5">
                      Awaiting Confirm: <strong className="text-[#92400E]">{awaitingPoolCount}</strong>
                    </span>
                  </div>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-wrap items-center gap-2 rounded-[6px] border border-[#E4E4E7] bg-white p-3">
                  <div className="relative min-w-[220px] flex-1">
                    <Search className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#71717A]" />
                    <input
                      type="text"
                      value={poolSearch}
                      onChange={(e) => setPoolSearch(e.target.value)}
                      placeholder="Search personnel, skill tag, preferred assignment, location..."
                      className="w-full rounded-[6px] border border-[#E4E4E7] bg-[#FAFAFA] py-1.5 pl-8 pr-3 text-[13px] text-[#09090B] placeholder:text-[#71717A] focus:border-[#2563EB] focus:bg-white focus:outline-none"
                    />
                  </div>
                  <FlatSelect value={poolAvailFilter} onChange={setPoolAvailFilter}>
                    <option value="All">Availability: All</option>
                    <option value="Available">Available</option>
                    <option value="Awaiting Confirmation">Awaiting Confirmation</option>
                    <option value="Unavailable">Unavailable</option>
                  </FlatSelect>
                  <FlatSelect value={poolStatusFilter} onChange={setPoolStatusFilter}>
                    <option value="All">Pool Status: All</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </FlatSelect>
                </div>

                {/* Compact Talent Pool Table (All 8 columns fit cleanly at 1440px) */}
                <div className="overflow-hidden rounded-[6px] border border-[#E4E4E7] bg-white">
                  <div className="overflow-x-auto" data-bleed>
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-[#E4E4E7] bg-[#FAFAFA] text-[12px] font-medium text-[#71717A]">
                          <th className="px-3 py-2.5">Personnel</th>
                          <th className="px-3 py-2.5">Skills & Training</th>
                          <th className="px-3 py-2.5">Preferred Assignment</th>
                          <th className="px-3 py-2.5">Location</th>
                          <th className="px-3 py-2.5">Availability</th>
                          <th className="px-3 py-2.5">Confirmed</th>
                          <th className="px-3 py-2.5">Pool</th>
                          <th className="px-3 py-2.5 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4E4E7] text-[13px]">
                        {filteredPool.map((p) => (
                          <tr
                            key={p.id}
                            onClick={() => setSelectedPoolId(p.id)}
                            className={`cursor-pointer transition-colors ${
                              p.id === selectedPoolId ? "bg-[#EFF6FF]" : "hover:bg-[#FAFAFA]"
                            }`}
                          >
                            <td className="px-3 py-3 whitespace-nowrap">
                              <p className="font-medium text-[#09090B]">{p.fullName}</p>
                              <p className="font-mono text-[12px] text-[#71717A]">{p.applicationRef}</p>
                            </td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-1 whitespace-nowrap">
                                <span className="rounded-[4px] border border-[#E4E4E7] bg-[#FAFAFA] px-2 py-0.5 text-[12px] text-[#3F3F46]">
                                  {p.skills[0]}
                                </span>
                                {p.skills.length > 1 && (
                                  <span className="rounded-[4px] bg-[#F4F4F5] px-1.5 py-0.5 font-mono text-[12px] text-[#71717A]">
                                    +{p.skills.length - 1}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="max-w-[165px] px-3 py-3 text-[#3F3F46] leading-snug">
                              {p.preferredAssignment}
                            </td>
                            <td className="px-3 py-3 text-[#52525B] whitespace-nowrap">{p.location}</td>
                            <td className="px-3 py-3 whitespace-nowrap">
                              <StatusPill
                                label={
                                  p.availabilityStatus === "Awaiting Confirmation"
                                    ? "Awaiting Confirm"
                                    : p.availabilityStatus
                                }
                                tone={availabilityTone(p.availabilityStatus)}
                              />
                            </td>
                            <td className="px-3 py-3 font-mono text-[12px] text-[#52525B] whitespace-nowrap tabular-nums">
                              {p.lastConfirmedDate}
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap">
                              <StatusPill
                                label={p.poolStatus}
                                tone={p.poolStatus === "Active" ? "slate" : "neutral"}
                              />
                            </td>
                            <td
                              className="px-3 py-3 text-right whitespace-nowrap"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                type="button"
                                onClick={() => handleConfirmAvailability(p.id, "Available")}
                                className="rounded-[6px] border border-[#E4E4E7] bg-white px-2.5 py-1 text-[12px] font-medium text-[#09090B] hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
                              >
                                Confirm
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ================================================================= */}
            {/* SCREEN 4: JOSIE SHIELD — MARKETPLACE SERVICE REQUESTS             */}
            {/* ================================================================= */}
            {activeModule === "marketplace" && activeOrgId === "org-josieshield" && (
              <div className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="font-mono text-[12px] text-[#71717A]">
                      Client Intake & Service Requests · {triageRequestsCount} Awaiting Triage
                    </p>
                    <h1 className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-[#09090B]">
                      Marketplace Service Requests
                    </h1>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {(["All", "Security Services", "Consultancy", "Training"] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setReqCategoryFilter(cat)}
                        className={`rounded-[6px] px-2.5 py-1.5 text-[12px] font-medium ${
                          reqCategoryFilter === cat
                            ? "bg-[#2563EB] text-white"
                            : "border border-[#E4E4E7] bg-white text-[#52525B] hover:bg-[#FAFAFA]"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-wrap items-center gap-2 rounded-[6px] border border-[#E4E4E7] bg-white p-3">
                  <div className="relative min-w-[220px] flex-1">
                    <Search className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#71717A]" />
                    <input
                      type="text"
                      value={reqSearch}
                      onChange={(e) => setReqSearch(e.target.value)}
                      placeholder="Search Ref ID, client name, organisation, location..."
                      className="w-full rounded-[6px] border border-[#E4E4E7] bg-[#FAFAFA] py-1.5 pl-8 pr-3 text-[13px] text-[#09090B] placeholder:text-[#71717A] focus:border-[#2563EB] focus:bg-white focus:outline-none"
                    />
                  </div>
                  <FlatSelect value={reqStatusFilter} onChange={setReqStatusFilter}>
                    <option value="All">Status: All</option>
                    <option value="New">New</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Closed">Closed</option>
                  </FlatSelect>
                </div>

                {/* Requests Table */}
                <div className="overflow-hidden rounded-[6px] border border-[#E4E4E7] bg-white">
                  <div className="overflow-x-auto" data-bleed>
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-[#E4E4E7] bg-[#FAFAFA] text-[12px] font-medium text-[#71717A]">
                          <th className="px-4 py-2.5">Ref ID</th>
                          <th className="px-4 py-2.5">Client / Organisation</th>
                          <th className="px-4 py-2.5">Service Category</th>
                          <th className="px-4 py-2.5">Location</th>
                          <th className="px-4 py-2.5">Requested Date</th>
                          <th className="px-4 py-2.5">Status</th>
                          <th className="px-4 py-2.5">Assigned Manager</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4E4E7] text-[13px]">
                        {filteredRequests.map((req) => (
                          <tr
                            key={req.id}
                            onClick={() => setSelectedReqId(req.id)}
                            className={`cursor-pointer transition-colors ${
                              req.id === selectedReqId ? "bg-[#EFF6FF]" : "hover:bg-[#FAFAFA]"
                            }`}
                          >
                            <td className="px-4 py-3 font-mono text-[12px] font-medium text-[#09090B] whitespace-nowrap">
                              {req.referenceNumber}
                            </td>
                            <td className="px-4 py-3">
                              <p className="font-medium text-[#09090B]">{req.organisationName}</p>
                              <p className="text-[12px] text-[#71717A]">{req.clientName}</p>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <StatusPill
                                label={req.serviceCategory}
                                tone={
                                  req.serviceCategory === "Security Services"
                                    ? "slate"
                                    : req.serviceCategory === "Consultancy"
                                    ? "amber"
                                    : "blue"
                                }
                              />
                            </td>
                            <td className="px-4 py-3 text-[#52525B]">{req.location}</td>
                            <td className="px-4 py-3 font-mono text-[12px] text-[#52525B] whitespace-nowrap tabular-nums">
                              {req.requestedDate}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <StatusPill label={req.status} tone={requestTone(req.status)} />
                            </td>
                            <td className="px-4 py-3 text-[#52525B] whitespace-nowrap">
                              {req.assignedManager}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ================================================================= */}
            {/* REMAINING MODULES (SANEF & SHARED)                                */}
            {/* ================================================================= */}
            {activeModule === "projects" && activeOrgId === "org-sanef" && (
              <div className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="font-mono text-[12px] text-[#71717A]">
                      SANEF Structured Archive · Media & PDF Reports
                    </p>
                    <h1 className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-[#09090B]">
                      Projects & Evidence Archive
                    </h1>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const created = db.createSANEFProject({
                        title: "Bariga Market Footbridge Solar Beacon Draft",
                        category: "Solar Infrastructure",
                        location: "Bariga, Lagos",
                        status: "Draft",
                      });
                      setSanefProjects((prev) => [created, ...prev]);
                      showToast(`Created draft project ${created.referenceCode}`);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-[6px] bg-[#2563EB] px-3.5 py-2 text-[13px] font-medium text-white hover:bg-[#1D4ED8]"
                  >
                    <Plus className="h-3.5 w-3.5" /> New Project Record
                  </button>
                </div>

                <div className="overflow-hidden rounded-[6px] border border-[#E4E4E7] bg-white">
                  <div className="overflow-x-auto" data-bleed>
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-[#E4E4E7] bg-[#FAFAFA] text-[12px] font-medium text-[#71717A]">
                          <th className="px-4 py-2.5">Ref ID</th>
                          <th className="px-4 py-2.5">Project Title</th>
                          <th className="px-4 py-2.5">Category</th>
                          <th className="px-4 py-2.5">Location</th>
                          <th className="px-4 py-2.5">Attached Evidence</th>
                          <th className="px-4 py-2.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4E4E7] text-[13px]">
                        {sanefProjects.map((prj) => (
                          <tr
                            key={prj.id}
                            onClick={() => setSelectedProject(prj)}
                            className="cursor-pointer hover:bg-[#FAFAFA]"
                          >
                            <td className="px-4 py-3 font-mono text-[12px] text-[#52525B] whitespace-nowrap">
                              {prj.referenceCode}
                            </td>
                            <td className="px-4 py-3">
                              <p className="font-medium text-[#09090B]">{prj.title}</p>
                              <p className="text-[12px] text-[#71717A]">{prj.date}</p>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <StatusPill label={prj.category} tone="slate" />
                            </td>
                            <td className="px-4 py-3 text-[#52525B]">{prj.location}</td>
                            <td className="px-4 py-3 font-mono text-[12px] text-[#3F3F46] whitespace-nowrap">
                              {prj.photoCount} Photos · {prj.pdfCount} {prj.pdfCount === 1 ? "PDF" : "PDFs"}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <StatusPill
                                label={prj.status}
                                tone={prj.status === "Published" ? "green" : "amber"}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeModule === "partnerships" && activeOrgId === "org-sanef" && (
              <div className="space-y-4">
                <div>
                  <p className="font-mono text-[12px] text-[#71717A]">
                    SANEF Partner Profiles & Collaboration Records
                  </p>
                  <h1 className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-[#09090B]">
                    Partnerships Directory
                  </h1>
                </div>
                <div className="overflow-hidden rounded-[6px] border border-[#E4E4E7] bg-white">
                  <div className="overflow-x-auto" data-bleed>
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-[#E4E4E7] bg-[#FAFAFA] text-[12px] font-medium text-[#71717A]">
                          <th className="px-4 py-2.5">Partner Organisation</th>
                          <th className="px-4 py-2.5">Type</th>
                          <th className="px-4 py-2.5">Period</th>
                          <th className="px-4 py-2.5">Joint Projects</th>
                          <th className="px-4 py-2.5">Evidence</th>
                          <th className="px-4 py-2.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4E4E7] text-[13px]">
                        {SANEF_PARTNERSHIPS.map((pt) => (
                          <tr
                            key={pt.id}
                            onClick={() => setSelectedPartner(pt)}
                            className="cursor-pointer hover:bg-[#FAFAFA]"
                          >
                            <td className="px-4 py-3 font-medium text-[#09090B]">{pt.partnerName}</td>
                            <td className="px-4 py-3 text-[#52525B]">{pt.partnershipType}</td>
                            <td className="px-4 py-3 font-mono text-[12px] text-[#52525B]">
                              {pt.partnershipPeriod}
                            </td>
                            <td className="px-4 py-3 text-[#3F3F46]">{pt.jointProjects.length} projects</td>
                            <td className="px-4 py-3 font-mono text-[12px] text-[#52525B]">
                              {pt.evidenceCount} files
                            </td>
                            <td className="px-4 py-3">
                              <StatusPill
                                label={pt.status}
                                tone={pt.status === "Active" ? "green" : "neutral"}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeModule === "pages" && (
              <div className="space-y-4">
                <div>
                  <p className="font-mono text-[12px] text-[#71717A]">
                    Shared CMS Foundation · {activeOrg.shortName}
                  </p>
                  <h1 className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-[#09090B]">
                    Pages & Content Lifecycle
                  </h1>
                </div>
                <div className="overflow-hidden rounded-[6px] border border-[#E4E4E7] bg-white">
                  <div className="overflow-x-auto" data-bleed>
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-[#E4E4E7] bg-[#FAFAFA] text-[12px] font-medium text-[#71717A]">
                          <th className="px-4 py-2.5">Route</th>
                          <th className="px-4 py-2.5">Page Title</th>
                          <th className="px-4 py-2.5">Template</th>
                          <th className="px-4 py-2.5">Status</th>
                          <th className="px-4 py-2.5">Updated By</th>
                          <th className="px-4 py-2.5 text-right">Last Updated</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4E4E7] text-[13px]">
                        {orgPages.map((pg) => (
                          <tr key={pg.id} className="hover:bg-[#FAFAFA]">
                            <td className="px-4 py-3 font-mono text-[12px] text-[#2563EB]">{pg.slug}</td>
                            <td className="px-4 py-3 font-medium text-[#09090B]">{pg.title}</td>
                            <td className="px-4 py-3 text-[#52525B]">{pg.template}</td>
                            <td className="px-4 py-3">
                              <StatusPill
                                label={pg.status}
                                tone={pg.status === "Published" ? "green" : "amber"}
                              />
                            </td>
                            <td className="px-4 py-3 text-[#52525B]">{pg.updatedBy}</td>
                            <td className="px-4 py-3 text-right font-mono text-[12px] text-[#71717A]">
                              {pg.lastUpdated}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeModule === "blog" && activeOrgId === "org-sanef" && (
              <div className="space-y-4">
                <div>
                  <p className="font-mono text-[12px] text-[#71717A]">SANEF Editorial Dispatches</p>
                  <h1 className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-[#09090B]">
                    Blog & Announcements
                  </h1>
                </div>
                <div className="overflow-hidden rounded-[6px] border border-[#E4E4E7] bg-white">
                  <div className="overflow-x-auto" data-bleed>
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-[#E4E4E7] bg-[#FAFAFA] text-[12px] font-medium text-[#71717A]">
                          <th className="px-4 py-2.5">Ref ID</th>
                          <th className="px-4 py-2.5">Article Title</th>
                          <th className="px-4 py-2.5">Category</th>
                          <th className="px-4 py-2.5">Author</th>
                          <th className="px-4 py-2.5">Status</th>
                          <th className="px-4 py-2.5 text-right">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4E4E7] text-[13px]">
                        {BLOG_POSTS.map((post) => (
                          <tr key={post.id} className="hover:bg-[#FAFAFA]">
                            <td className="px-4 py-3 font-mono text-[12px] text-[#52525B]">{post.refId}</td>
                            <td className="px-4 py-3 font-medium text-[#09090B]">{post.title}</td>
                            <td className="px-4 py-3 text-[#52525B]">{post.category}</td>
                            <td className="px-4 py-3 text-[#52525B]">{post.author}</td>
                            <td className="px-4 py-3">
                              <StatusPill
                                label={post.status}
                                tone={post.status === "Published" ? "green" : "amber"}
                              />
                            </td>
                            <td className="px-4 py-3 text-right font-mono text-[12px] text-[#71717A]">
                              {post.publishedDate}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeModule === "events" && activeOrgId === "org-sanef" && (
              <div className="space-y-4">
                <div>
                  <p className="font-mono text-[12px] text-[#71717A]">SANEF Public Engagement</p>
                  <h1 className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-[#09090B]">
                    Events & Townhalls
                  </h1>
                </div>
                <div className="overflow-hidden rounded-[6px] border border-[#E4E4E7] bg-white">
                  <div className="overflow-x-auto" data-bleed>
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-[#E4E4E7] bg-[#FAFAFA] text-[12px] font-medium text-[#71717A]">
                          <th className="px-4 py-2.5">Ref ID</th>
                          <th className="px-4 py-2.5">Event</th>
                          <th className="px-4 py-2.5">Location</th>
                          <th className="px-4 py-2.5">Date</th>
                          <th className="px-4 py-2.5">Registrations</th>
                          <th className="px-4 py-2.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4E4E7] text-[13px]">
                        {EVENTS_DATA.map((ev) => (
                          <tr key={ev.id} className="hover:bg-[#FAFAFA]">
                            <td className="px-4 py-3 font-mono text-[12px] text-[#52525B]">{ev.refId}</td>
                            <td className="px-4 py-3 font-medium text-[#09090B]">{ev.title}</td>
                            <td className="px-4 py-3 text-[#52525B]">{ev.location}</td>
                            <td className="px-4 py-3 font-mono text-[12px] text-[#52525B]">{ev.date}</td>
                            <td className="px-4 py-3 font-mono text-[12px] text-[#09090B]">{ev.registrations}</td>
                            <td className="px-4 py-3">
                              <StatusPill
                                label={ev.type}
                                tone={ev.type === "Upcoming" ? "blue" : "neutral"}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeModule === "donations" && activeOrgId === "org-sanef" && (
              <div className="space-y-4">
                <div>
                  <p className="font-mono text-[12px] text-[#71717A]">
                    SANEF Campaign Ledger · Restricted Access
                  </p>
                  <h1 className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-[#09090B]">
                    Donations & Institutional Grants
                  </h1>
                </div>
                <div className="overflow-hidden rounded-[6px] border border-[#E4E4E7] bg-white">
                  <div className="overflow-x-auto" data-bleed>
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-[#E4E4E7] bg-[#FAFAFA] text-[12px] font-medium text-[#71717A]">
                          <th className="px-4 py-2.5">Ref ID</th>
                          <th className="px-4 py-2.5">Donor / Institution</th>
                          <th className="px-4 py-2.5">Campaign</th>
                          <th className="px-4 py-2.5">Amount</th>
                          <th className="px-4 py-2.5">Method</th>
                          <th className="px-4 py-2.5">Status</th>
                          <th className="px-4 py-2.5 text-right">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4E4E7] text-[13px]">
                        {DONATIONS_DATA.map((d) => (
                          <tr
                            key={d.id}
                            onClick={() => setSelectedDonation(d)}
                            className="cursor-pointer hover:bg-[#FAFAFA]"
                          >
                            <td className="px-4 py-3 font-mono text-[12px] text-[#52525B]">{d.refId}</td>
                            <td className="px-4 py-3 font-medium text-[#09090B]">{d.donorName}</td>
                            <td className="px-4 py-3 text-[#52525B]">{d.campaign}</td>
                            <td className="px-4 py-3 font-mono text-[13px] font-semibold text-[#09090B]">
                              {d.amount}
                            </td>
                            <td className="px-4 py-3 text-[#52525B]">{d.method}</td>
                            <td className="px-4 py-3">
                              <StatusPill
                                label={d.status}
                                tone={d.status === "Verified" ? "green" : "amber"}
                              />
                            </td>
                            <td className="px-4 py-3 text-right font-mono text-[12px] text-[#71717A]">
                              {d.date}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeModule === "enquiries" && (
              <div className="space-y-4">
                <div>
                  <p className="font-mono text-[12px] text-[#71717A]">
                    Public Contact Intake · {activeOrg.shortName}
                  </p>
                  <h1 className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-[#09090B]">
                    Contact Enquiries
                  </h1>
                </div>
                <div className="overflow-hidden rounded-[6px] border border-[#E4E4E7] bg-white">
                  <div className="overflow-x-auto" data-bleed>
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-[#E4E4E7] bg-[#FAFAFA] text-[12px] font-medium text-[#71717A]">
                          <th className="px-4 py-2.5">Ref ID</th>
                          <th className="px-4 py-2.5">Sender</th>
                          <th className="px-4 py-2.5">Subject</th>
                          <th className="px-4 py-2.5">Channel</th>
                          <th className="px-4 py-2.5">Status</th>
                          <th className="px-4 py-2.5 text-right">Received</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4E4E7] text-[13px]">
                        {orgEnquiries.map((eq) => (
                          <tr
                            key={eq.id}
                            onClick={() => setSelectedEnquiry(eq)}
                            className="cursor-pointer hover:bg-[#FAFAFA]"
                          >
                            <td className="px-4 py-3 font-mono text-[12px] text-[#52525B]">{eq.refId}</td>
                            <td className="px-4 py-3">
                              <p className="font-medium text-[#09090B]">{eq.senderName}</p>
                              <p className="text-[12px] text-[#71717A]">{eq.organisation}</p>
                            </td>
                            <td className="px-4 py-3 text-[#3F3F46]">{eq.subject}</td>
                            <td className="px-4 py-3 text-[#52525B]">{eq.channel}</td>
                            <td className="px-4 py-3">
                              <StatusPill
                                label={eq.status}
                                tone={eq.status === "New" ? "blue" : eq.status === "Responded" ? "amber" : "green"}
                              />
                            </td>
                            <td className="px-4 py-3 text-right font-mono text-[12px] text-[#71717A]">
                              {eq.receivedDate}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeModule === "careers" && (
              <div className="space-y-4">
                <div>
                  <p className="font-mono text-[12px] text-[#71717A]">
                    Vacancy Management · {activeOrg.shortName}
                  </p>
                  <h1 className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-[#09090B]">
                    Active Vacancies
                  </h1>
                </div>
                <div className="overflow-hidden rounded-[6px] border border-[#E4E4E7] bg-white">
                  <div className="overflow-x-auto" data-bleed>
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-[#E4E4E7] bg-[#FAFAFA] text-[12px] font-medium text-[#71717A]">
                          <th className="px-4 py-2.5">Ref ID</th>
                          <th className="px-4 py-2.5">Role Title</th>
                          <th className="px-4 py-2.5">Location</th>
                          <th className="px-4 py-2.5">Type</th>
                          <th className="px-4 py-2.5">Applicants</th>
                          <th className="px-4 py-2.5">Deadline</th>
                          <th className="px-4 py-2.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4E4E7] text-[13px]">
                        {orgVacancies.map((v) => (
                          <tr key={v.id} className="hover:bg-[#FAFAFA]">
                            <td className="px-4 py-3 font-mono text-[12px] text-[#52525B]">{v.refId}</td>
                            <td className="px-4 py-3 font-medium text-[#09090B]">{v.title}</td>
                            <td className="px-4 py-3 text-[#52525B]">{v.location}</td>
                            <td className="px-4 py-3 text-[#52525B]">{v.type}</td>
                            <td className="px-4 py-3 font-mono text-[12px] text-[#09090B]">
                              {v.applicantsCount}
                            </td>
                            <td className="px-4 py-3 font-mono text-[12px] text-[#71717A]">{v.deadline}</td>
                            <td className="px-4 py-3">
                              <StatusPill label={v.status} tone="green" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeModule === "services" && activeOrgId === "org-josieshield" && (
              <div className="space-y-4">
                <div>
                  <p className="font-mono text-[12px] text-[#71717A]">Josie Shield Commercial Catalogue</p>
                  <h1 className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-[#09090B]">
                    Security, Consultancy & Training Services
                  </h1>
                </div>
                <div className="overflow-hidden rounded-[6px] border border-[#E4E4E7] bg-white">
                  <div className="overflow-x-auto" data-bleed>
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-[#E4E4E7] bg-[#FAFAFA] text-[12px] font-medium text-[#71717A]">
                          <th className="px-4 py-2.5">Code</th>
                          <th className="px-4 py-2.5">Pillar</th>
                          <th className="px-4 py-2.5">Service Line</th>
                          <th className="px-4 py-2.5">SLA / Standard</th>
                          <th className="px-4 py-2.5">Active Clients</th>
                          <th className="px-4 py-2.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4E4E7] text-[13px]">
                        {SERVICE_OFFERINGS.map((s) => (
                          <tr key={s.id} className="hover:bg-[#FAFAFA]">
                            <td className="px-4 py-3 font-mono text-[12px] text-[#52525B]">{s.code}</td>
                            <td className="px-4 py-3">
                              <StatusPill label={s.pillar} tone="slate" />
                            </td>
                            <td className="px-4 py-3 font-medium text-[#09090B]">{s.name}</td>
                            <td className="px-4 py-3 font-mono text-[12px] text-[#52525B]">{s.slaStandard}</td>
                            <td className="px-4 py-3 font-mono text-[12px] text-[#09090B]">{s.activeClients}</td>
                            <td className="px-4 py-3">
                              <StatusPill label={s.status} tone="green" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeModule === "interviews" && activeOrgId === "org-josieshield" && (
              <div className="space-y-4">
                <div>
                  <p className="font-mono text-[12px] text-[#71717A]">
                    Restricted Interview Schedule & Assessment Log
                  </p>
                  <h1 className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-[#09090B]">
                    Scheduled & Completed Interviews
                  </h1>
                </div>
                <div className="overflow-hidden rounded-[6px] border border-[#E4E4E7] bg-white">
                  <div className="overflow-x-auto" data-bleed>
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-[#E4E4E7] bg-[#FAFAFA] text-[12px] font-medium text-[#71717A]">
                          <th className="px-4 py-2.5">Candidate</th>
                          <th className="px-4 py-2.5">Ref ID</th>
                          <th className="px-4 py-2.5">Date & Time</th>
                          <th className="px-4 py-2.5">Interviewer</th>
                          <th className="px-4 py-2.5">Format</th>
                          <th className="px-4 py-2.5">Outcome</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4E4E7] text-[13px]">
                        {applications
                          .flatMap((a) =>
                            a.interviews.map((i) => ({
                              ...i,
                              applicantName: a.applicantName,
                              appId: a.id,
                              ref: a.referenceCode,
                            }))
                          )
                          .map((row) => (
                            <tr
                              key={row.id}
                              onClick={() => {
                                setActiveModule("applications");
                                setSelectedAppId(row.appId);
                              }}
                              className="cursor-pointer hover:bg-[#FAFAFA]"
                            >
                              <td className="px-4 py-3 font-medium text-[#09090B]">{row.applicantName}</td>
                              <td className="px-4 py-3 font-mono text-[12px] text-[#52525B]">{row.ref}</td>
                              <td className="px-4 py-3 font-mono text-[12px] text-[#3F3F46]">
                                {row.date} · {row.time}
                              </td>
                              <td className="px-4 py-3 text-[#52525B]">{row.interviewer}</td>
                              <td className="px-4 py-3 text-[#52525B]">{row.mode}</td>
                              <td className="px-4 py-3">
                                <StatusPill
                                  label={row.outcome}
                                  tone={row.outcome === "Recommended" ? "green" : "amber"}
                                />
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeModule === "testimonials" && activeOrgId === "org-josieshield" && (
              <div className="space-y-4">
                <div>
                  <p className="font-mono text-[12px] text-[#71717A]">Approved Client Endorsements</p>
                  <h1 className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-[#09090B]">
                    Client Testimonials
                  </h1>
                </div>
                <div className="overflow-hidden rounded-[6px] border border-[#E4E4E7] bg-white">
                  <div className="overflow-x-auto" data-bleed>
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-[#E4E4E7] bg-[#FAFAFA] text-[12px] font-medium text-[#71717A]">
                          <th className="px-4 py-2.5">Ref ID</th>
                          <th className="px-4 py-2.5">Client & Organisation</th>
                          <th className="px-4 py-2.5">Category</th>
                          <th className="px-4 py-2.5">Excerpt</th>
                          <th className="px-4 py-2.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4E4E7] text-[13px]">
                        {TESTIMONIALS_DATA.map((t) => (
                          <tr key={t.id} className="hover:bg-[#FAFAFA]">
                            <td className="px-4 py-3 font-mono text-[12px] text-[#52525B]">{t.refId}</td>
                            <td className="px-4 py-3">
                              <p className="font-medium text-[#09090B]">{t.clientName}</p>
                              <p className="text-[12px] text-[#71717A]">{t.organisation}</p>
                            </td>
                            <td className="px-4 py-3">
                              <StatusPill label={t.category} tone="slate" />
                            </td>
                            <td className="max-w-[360px] px-4 py-3 text-[#3F3F46]">{t.quote}</td>
                            <td className="px-4 py-3">
                              <StatusPill label={t.status} tone="green" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeModule === "media" && (
              <div className="space-y-4">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="font-mono text-[12px] text-[#71717A]">
                      Organisation-Scoped Storage · {activeOrg.id}
                    </p>
                    <h1 className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-[#09090B]">
                      Media Library
                    </h1>
                  </div>
                  <input
                    type="text"
                    value={genericSearch}
                    onChange={(e) => setGenericSearch(e.target.value)}
                    placeholder="Filter files..."
                    className="rounded-[6px] border border-[#E4E4E7] bg-white px-3 py-1.5 text-[12px] text-[#09090B]"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {orgMedia
                    .filter((m) =>
                      genericSearch ? m.fileName.toLowerCase().includes(genericSearch.toLowerCase()) : true
                    )
                    .map((m) => (
                      <div key={m.id} className="overflow-hidden rounded-[6px] border border-[#E4E4E7] bg-white">
                        <div className="flex h-32 items-center justify-center overflow-hidden border-b border-[#E4E4E7] bg-[#F4F4F5]">
                          {m.type === "Image" ? (
                            <img src={m.url} alt={m.fileName} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex flex-col items-center gap-1 text-[#52525B]">
                              <FileCheck2 className="h-6 w-6" />
                              <span className="font-mono text-[12px]">{m.type}</span>
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <p className="truncate font-mono text-[12px] font-medium text-[#09090B]">
                            {m.fileName}
                          </p>
                          <div className="mt-1.5 flex items-center justify-between text-[12px] text-[#71717A]">
                            <span>{m.fileSize}</span>
                            <StatusPill
                              label={m.accessScope === "Public" ? "Public" : "Restricted"}
                              tone={m.accessScope === "Public" ? "neutral" : "amber"}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {activeModule === "users" && (
              <div className="space-y-4">
                <div>
                  <p className="font-mono text-[12px] text-[#71717A]">
                    Multi-Organisation Memberships & Granular RBAC
                  </p>
                  <h1 className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-[#09090B]">
                    Users, Memberships & Roles
                  </h1>
                </div>
                <div className="overflow-hidden rounded-[6px] border border-[#E4E4E7] bg-white">
                  <div className="overflow-x-auto" data-bleed>
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="border-b border-[#E4E4E7] bg-[#FAFAFA] text-[12px] font-medium text-[#71717A]">
                          <th className="px-4 py-2.5">User</th>
                          <th className="px-4 py-2.5">SANEF Access</th>
                          <th className="px-4 py-2.5">Josie Shield Access</th>
                          <th className="px-4 py-2.5">Permission Scope</th>
                          <th className="px-4 py-2.5 text-right">Last Active</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E4E4E7] text-[13px]">
                        {PLATFORM_USERS.map((u) => (
                          <tr key={u.id} className="hover:bg-[#FAFAFA]">
                            <td className="px-4 py-3">
                              <p className="font-medium text-[#09090B]">{u.name}</p>
                              <p className="font-mono text-[12px] text-[#71717A]">{u.email}</p>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {u.sanefRole ? (
                                <StatusPill label={u.sanefRole} tone="green" />
                              ) : (
                                <span className="text-[12px] text-[#A1A1AA]">None</span>
                              )}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {u.josieRole ? (
                                <StatusPill label={u.josieRole} tone="slate" />
                              ) : (
                                <span className="text-[12px] text-[#A1A1AA]">None</span>
                              )}
                            </td>
                            <td className="max-w-[300px] px-4 py-3 text-[12px] text-[#52525B]">
                              {u.permissionsSummary}
                            </td>
                            <td className="px-4 py-3 text-right font-mono text-[12px] text-[#71717A] whitespace-nowrap">
                              {u.lastActive}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeModule === "settings" && (
              <div className="max-w-[760px] space-y-4">
                <div>
                  <p className="font-mono text-[12px] text-[#71717A]">
                    Organisation Configuration · {activeOrg.id}
                  </p>
                  <h1 className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-[#09090B]">
                    {activeOrg.name} Settings
                  </h1>
                </div>
                <div className="space-y-4 rounded-[6px] border border-[#E4E4E7] bg-white p-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[12px] font-medium text-[#52525B]">Organisation Name</label>
                      <input
                        type="text"
                        defaultValue={activeOrg.name}
                        className="mt-1 w-full rounded-[6px] border border-[#E4E4E7] bg-[#FAFAFA] px-3 py-2 text-[13px] text-[#09090B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-medium text-[#52525B]">Public Domain</label>
                      <input
                        type="text"
                        defaultValue={activeOrg.websiteDomain}
                        className="mt-1 w-full rounded-[6px] border border-[#E4E4E7] bg-[#FAFAFA] px-3 py-2 font-mono text-[13px] text-[#09090B]"
                      />
                    </div>
                  </div>
                  <div className="border-t border-[#E4E4E7] pt-4">
                    <h3 className="text-[13px] font-semibold text-[#09090B]">Data Isolation & Retention Controls</h3>
                    <p className="mt-1 text-[12px] text-[#71717A]">
                      Every database row and media object is partitioned by <code className="font-mono text-[#09090B]">organization_id</code>.
                      Candidate CVs, interview notes, and donor records require server-verified role tokens.
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => showToast(`Saved settings for ${activeOrg.shortName}`)}
                      className="rounded-[6px] bg-[#2563EB] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#1D4ED8]"
                    >
                      Save Organisation Settings
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* WIDE SLIDE-OVER DRAWER 1: APPLICATION DETAIL & PIPELINE               */}
      {/* ===================================================================== */}
      <SlideOverDrawer
        open={Boolean(selectedApp)}
        onClose={() => setSelectedAppId(null)}
        refBadge={selectedApp?.referenceCode}
        title={selectedApp?.applicantName || ""}
        subtitle={selectedApp ? `${selectedApp.role} · ${selectedApp.location}` : ""}
        footer={
          selectedApp && (
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[12px] text-[#71717A]">
                Reviewer: <strong className="text-[#09090B]">{selectedApp.assignedReviewer}</strong>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedAppId(null)}
                  className="rounded-[6px] border border-[#E4E4E7] bg-white px-3 py-1.5 text-[12px] font-medium text-[#3F3F46] hover:bg-[#FAFAFA]"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveToTalentPool(selectedApp)}
                  disabled={selectedApp.inTalentPool}
                  className="inline-flex items-center gap-1.5 rounded-[6px] bg-[#2563EB] px-3.5 py-1.5 text-[12px] font-medium text-white hover:bg-[#1D4ED8] disabled:opacity-50"
                >
                  <UserCheck className="h-3.5 w-3.5" />
                  {selectedApp.inTalentPool ? "In Talent Pool" : "Move to Talent Pool"}
                </button>
              </div>
            </div>
          )
        }
      >
        {selectedApp && (
          <div className="space-y-6">
            {/* Stage Selector */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[6px] border border-[#E4E4E7] bg-[#FAFAFA] p-3.5">
              <div>
                <p className="text-[12px] font-medium text-[#71717A]">Recruitment Pipeline Stage</p>
                <p className="mt-0.5 text-[12px] text-[#52525B]">Applied {selectedApp.appliedDate}</p>
              </div>
              <FlatSelect
                value={selectedApp.stage}
                onChange={(val) => handleStageChange(selectedApp.id, val as RecruitmentStage)}
                className="w-52"
              >
                {RECRUITMENT_STAGES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </FlatSelect>
            </div>

            {/* Applicant Information */}
            <section>
              <h3 className="text-[12px] font-semibold text-[#71717A]">Applicant Details</h3>
              <dl className="mt-2 grid grid-cols-2 gap-3 rounded-[6px] border border-[#E4E4E7] bg-white p-3.5 text-[13px]">
                <div>
                  <dt className="text-[12px] text-[#71717A]">Email</dt>
                  <dd className="mt-0.5 font-mono text-[12px] text-[#09090B]">{selectedApp.email}</dd>
                </div>
                <div>
                  <dt className="text-[12px] text-[#71717A]">Phone</dt>
                  <dd className="mt-0.5 font-mono text-[12px] text-[#09090B]">{selectedApp.phone}</dd>
                </div>
                <div>
                  <dt className="text-[12px] text-[#71717A]">Experience</dt>
                  <dd className="mt-0.5 font-medium text-[#09090B]">{selectedApp.experienceYears} years</dd>
                </div>
                <div>
                  <dt className="text-[12px] text-[#71717A]">Availability</dt>
                  <dd className="mt-0.5 font-medium text-[#09090B]">{selectedApp.availability}</dd>
                </div>
                <div className="col-span-2 border-t border-[#E4E4E7] pt-2.5">
                  <dt className="text-[12px] text-[#71717A]">Qualifications</dt>
                  <dd className="mt-0.5 text-[#3F3F46]">{selectedApp.qualifications}</dd>
                </div>
              </dl>
            </section>

            {/* Uploaded CV Viewer / Download */}
            <section>
              <h3 className="text-[12px] font-semibold text-[#71717A]">
                Uploaded CV & Supporting Document
              </h3>
              <div className="mt-2 rounded-[6px] border border-[#E4E4E7] bg-white p-3.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-mono text-[12px] font-medium text-[#09090B]">
                      {selectedApp.cvFileName}
                    </p>
                    <p className="text-[12px] text-[#71717A]">
                      PDF · {selectedApp.cvFileSize} · Authorised recruitment access only
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast(`Downloaded ${selectedApp.cvFileName} (logged in audit trail)`)}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-[6px] border border-[#E4E4E7] bg-[#FAFAFA] px-2.5 py-1.5 text-[12px] font-medium text-[#09090B] hover:border-[#2563EB] hover:text-[#2563EB]"
                  >
                    <Download className="h-3.5 w-3.5" /> Download
                  </button>
                </div>
                <p className="mt-2.5 border-t border-[#E4E4E7] pt-2.5 text-[12px] leading-relaxed text-[#52525B]">
                  {selectedApp.cvSummary}
                </p>
              </div>
            </section>

            {/* Interview Scheduler & Feedback Log */}
            <section>
              <h3 className="text-[12px] font-semibold text-[#71717A]">
                Interview Schedule & Feedback Log
              </h3>
              <div className="mt-2 space-y-2.5">
                {selectedApp.interviews.length === 0 ? (
                  <p className="rounded-[6px] border border-[#E4E4E7] bg-[#FAFAFA] px-3.5 py-3 text-[12px] text-[#71717A]">
                    No interviews recorded yet. Use the form below to schedule an assessment slot.
                  </p>
                ) : (
                  selectedApp.interviews.map((iv) => (
                    <div key={iv.id} className="rounded-[6px] border border-[#E4E4E7] bg-white p-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[12px] font-medium text-[#09090B]">
                          {iv.date} · {iv.time}
                        </span>
                        <StatusPill
                          label={iv.outcome}
                          tone={iv.outcome === "Recommended" ? "green" : "amber"}
                        />
                      </div>
                      <p className="mt-1 text-[12px] text-[#52525B]">
                        {iv.interviewer} · {iv.mode}
                      </p>
                      <p className="mt-2 text-[12px] leading-relaxed text-[#3F3F46]">{iv.feedback}</p>
                    </div>
                  ))
                )}

                <form
                  onSubmit={handleScheduleInterview}
                  className="space-y-2.5 rounded-[6px] border border-[#E4E4E7] bg-[#FAFAFA] p-3.5"
                >
                  <p className="text-[12px] font-semibold text-[#09090B]">Schedule Interview</p>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={interviewForm.date}
                      onChange={(e) => setInterviewForm({ ...interviewForm, date: e.target.value })}
                      className="rounded-[6px] border border-[#E4E4E7] bg-white px-2.5 py-1.5 font-mono text-[12px]"
                    />
                    <input
                      type="text"
                      value={interviewForm.time}
                      onChange={(e) => setInterviewForm({ ...interviewForm, time: e.target.value })}
                      className="rounded-[6px] border border-[#E4E4E7] bg-white px-2.5 py-1.5 font-mono text-[12px]"
                    />
                    <input
                      type="text"
                      value={interviewForm.interviewer}
                      onChange={(e) =>
                        setInterviewForm({ ...interviewForm, interviewer: e.target.value })
                      }
                      className="rounded-[6px] border border-[#E4E4E7] bg-white px-2.5 py-1.5 text-[12px]"
                      placeholder="Interviewer"
                    />
                    <FlatSelect
                      value={interviewForm.mode}
                      onChange={(val) =>
                        setInterviewForm({
                          ...interviewForm,
                          mode: val as "In-Person (Ikeja HQ)" | "Field Assessment" | "Video Panel",
                        })
                      }
                      className="w-full"
                    >
                      <option value="In-Person (Ikeja HQ)">In-Person (Ikeja HQ)</option>
                      <option value="Field Assessment">Field Assessment</option>
                      <option value="Video Panel">Video Panel</option>
                    </FlatSelect>
                  </div>
                  <input
                    type="text"
                    value={interviewForm.feedback}
                    onChange={(e) => setInterviewForm({ ...interviewForm, feedback: e.target.value })}
                    placeholder="Interview agenda or assessment focus..."
                    className="w-full rounded-[6px] border border-[#E4E4E7] bg-white px-2.5 py-1.5 text-[12px]"
                  />
                  <button
                    type="submit"
                    className="rounded-[6px] bg-[#2563EB] px-3 py-1.5 text-[12px] font-medium text-white hover:bg-[#1D4ED8]"
                  >
                    Record Interview Slot
                  </button>
                </form>
              </div>
            </section>

            {/* Internal Restricted Notes */}
            <section>
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-1.5 text-[12px] font-semibold text-[#71717A]">
                  <Lock className="h-3.5 w-3.5" /> Internal Restricted Notes
                </h3>
                <span className="font-mono text-[12px] text-[#92400E]">Authorised Staff Only</span>
              </div>
              <div className="mt-2 space-y-2">
                {selectedApp.restrictedNotes.map((rn) => (
                  <div key={rn.id} className="rounded-[6px] border border-[#FDE68A] bg-[#FFFBEB] p-3">
                    <div className="flex items-center justify-between text-[12px] text-[#92400E]">
                      <span className="font-semibold">{rn.author}</span>
                      <span className="font-mono">{rn.timestamp}</span>
                    </div>
                    <p className="mt-1 text-[12px] text-[#09090B]">{rn.text}</p>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Add restricted vetting or recruiter note..."
                    className="flex-1 rounded-[6px] border border-[#E4E4E7] bg-white px-3 py-1.5 text-[12px] focus:border-[#2563EB] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddRestrictedNote}
                    className="rounded-[6px] border border-[#E4E4E7] bg-white px-3 py-1.5 text-[12px] font-medium text-[#09090B] hover:border-[#2563EB] hover:text-[#2563EB]"
                  >
                    Add Note
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
      </SlideOverDrawer>

      {/* ===================================================================== */}
      {/* WIDE SLIDE-OVER DRAWER 2: TALENT POOL PROFILE & CONTACT HISTORY       */}
      {/* ===================================================================== */}
      <SlideOverDrawer
        open={Boolean(selectedPool)}
        onClose={() => setSelectedPoolId(null)}
        refBadge={selectedPool?.applicationRef}
        title={selectedPool?.fullName || ""}
        subtitle={selectedPool ? `${selectedPool.preferredAssignment} · ${selectedPool.location}` : ""}
        footer={
          selectedPool && (
            <div className="flex items-center justify-between gap-2">
              <FlatSelect
                value={selectedPool.poolStatus}
                onChange={(val) => handleTogglePoolStatus(selectedPool.id, val as PoolStatus)}
                className="w-40"
              >
                <option value="Active">Pool: Active</option>
                <option value="Inactive">Pool: Inactive</option>
              </FlatSelect>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleConfirmAvailability(selectedPool.id, "Unavailable")}
                  className="rounded-[6px] border border-[#E4E4E7] bg-white px-3 py-1.5 text-[12px] font-medium text-[#3F3F46] hover:bg-[#FAFAFA]"
                >
                  Mark Unavailable
                </button>
                <button
                  type="button"
                  onClick={() => handleConfirmAvailability(selectedPool.id, "Available")}
                  className="rounded-[6px] bg-[#2563EB] px-3.5 py-1.5 text-[12px] font-medium text-white hover:bg-[#1D4ED8]"
                >
                  Confirm Available Today
                </button>
              </div>
            </div>
          )
        }
      >
        {selectedPool && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3 rounded-[6px] border border-[#E4E4E7] bg-[#FAFAFA] p-3.5 text-[13px]">
              <div>
                <p className="text-[12px] text-[#71717A]">Availability Status</p>
                <div className="mt-1">
                  <StatusPill
                    label={selectedPool.availabilityStatus}
                    tone={availabilityTone(selectedPool.availabilityStatus)}
                  />
                </div>
              </div>
              <div>
                <p className="text-[12px] text-[#71717A]">Last Confirmed Date</p>
                <p className="mt-1 font-mono text-[13px] font-medium text-[#09090B]">
                  {selectedPool.lastConfirmedDate}
                </p>
              </div>
              <div>
                <p className="text-[12px] text-[#71717A]">Assessment Outcome</p>
                <p className="mt-0.5 font-medium text-[#09090B]">{selectedPool.assessmentOutcome}</p>
              </div>
              <div>
                <p className="text-[12px] text-[#71717A]">Direct Phone</p>
                <p className="mt-0.5 font-mono text-[12px] text-[#09090B]">{selectedPool.phone}</p>
              </div>
            </div>

            <section>
              <h3 className="text-[12px] font-semibold text-[#71717A]">Verified Skills & Training</h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {selectedPool.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-[4px] border border-[#E4E4E7] bg-white px-2.5 py-1 text-[12px] font-medium text-[#09090B]"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-2.5 text-[12px] text-[#52525B]">{selectedPool.internalNotes}</p>
            </section>

            <section>
              <h3 className="text-[12px] font-semibold text-[#71717A]">
                Contact & Availability History
              </h3>
              <div className="mt-2 space-y-2">
                {selectedPool.contactHistory.map((ch) => (
                  <div key={ch.id} className="rounded-[6px] border border-[#E4E4E7] bg-white p-3">
                    <div className="flex items-center justify-between text-[12px] text-[#71717A]">
                      <span className="font-medium text-[#09090B]">
                        {ch.by} · {ch.channel}
                      </span>
                      <span className="font-mono">{ch.date}</span>
                    </div>
                    <p className="mt-1 text-[12px] text-[#3F3F46]">{ch.note}</p>
                  </div>
                ))}
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={poolContactNote}
                    onChange={(e) => setPoolContactNote(e.target.value)}
                    placeholder="Log phone call or availability check note..."
                    className="flex-1 rounded-[6px] border border-[#E4E4E7] bg-white px-3 py-1.5 text-[12px]"
                  />
                  <button
                    type="button"
                    onClick={handleLogPoolContact}
                    className="rounded-[6px] border border-[#E4E4E7] bg-white px-3 py-1.5 text-[12px] font-medium text-[#09090B] hover:border-[#2563EB] hover:text-[#2563EB]"
                  >
                    Log Contact
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
      </SlideOverDrawer>

      {/* ===================================================================== */}
      {/* WIDE SLIDE-OVER DRAWER 3: MARKETPLACE SERVICE REQUEST PAYLOAD         */}
      {/* ===================================================================== */}
      <SlideOverDrawer
        open={Boolean(selectedReq)}
        onClose={() => setSelectedReqId(null)}
        refBadge={selectedReq?.referenceNumber}
        title={selectedReq?.organisationName || ""}
        subtitle={selectedReq ? `${selectedReq.serviceCategory} · ${selectedReq.location}` : ""}
      >
        {selectedReq && (
          <div className="space-y-6">
            {/* Single clean workflow status control (zero duplicate status badge) */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[6px] border border-[#E4E4E7] bg-[#FAFAFA] p-3.5">
              <div>
                <p className="text-[12px] font-medium text-[#71717A]">Workflow Status</p>
                <p className="mt-0.5 text-[12px] text-[#52525B]">
                  Manager: <strong className="text-[#09090B]">{selectedReq.assignedManager}</strong>
                </p>
              </div>
              <FlatSelect
                value={selectedReq.status}
                onChange={(val) => handleReqStatusChange(selectedReq.id, val as RequestStatus)}
                className="w-44"
              >
                <option value="New">New</option>
                <option value="Under Review">Under Review</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Closed">Closed</option>
              </FlatSelect>
            </div>

            <section>
              <h3 className="text-[12px] font-semibold text-[#71717A]">Submitted Form Payload</h3>
              <dl className="mt-2 divide-y divide-[#E4E4E7] rounded-[6px] border border-[#E4E4E7] bg-white text-[13px]">
                <div className="grid grid-cols-3 gap-2 px-3.5 py-2.5">
                  <dt className="text-[#71717A]">Contact Person</dt>
                  <dd className="col-span-2 font-medium text-[#09090B]">{selectedReq.clientName}</dd>
                </div>
                <div className="grid grid-cols-3 gap-2 px-3.5 py-2.5">
                  <dt className="text-[#71717A]">Phone</dt>
                  <dd className="col-span-2 font-mono text-[12px] text-[#09090B] tabular-nums">
                    {selectedReq.phone}
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-2 px-3.5 py-2.5">
                  <dt className="text-[#71717A]">Email</dt>
                  <dd className="col-span-2 font-mono text-[12px] text-[#09090B]">{selectedReq.email}</dd>
                </div>
                {Object.entries(selectedReq.payload).map(([k, v]) => (
                  <div key={k} className="grid grid-cols-3 gap-2 px-3.5 py-2.5">
                    <dt className="text-[#71717A]">{k}</dt>
                    <dd
                      className={`col-span-2 text-[#09090B] ${
                        isMonoField(k, v) ? "font-mono text-[12px] tabular-nums" : ""
                      }`}
                    >
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section>
              <h3 className="text-[12px] font-semibold text-[#71717A]">Follow-Up Timeline</h3>
              <div className="mt-2 space-y-2">
                {selectedReq.followUpTimeline.map((ft) => (
                  <div key={ft.id} className="rounded-[6px] border border-[#E4E4E7] bg-white p-3">
                    <div className="flex items-center justify-between text-[12px] text-[#71717A]">
                      <span className="font-semibold text-[#09090B]">{ft.author}</span>
                      <span className="flex items-center gap-1 font-mono tabular-nums">
                        <Clock className="h-3 w-3" /> {ft.timestamp}
                      </span>
                    </div>
                    <p className="mt-1 text-[12px] text-[#3F3F46]">{ft.entry}</p>
                  </div>
                ))}
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={reqFollowUpNote}
                    onChange={(e) => setReqFollowUpNote(e.target.value)}
                    placeholder="Record client call, proposal note, or site visit update..."
                    className="flex-1 rounded-[6px] border border-[#E4E4E7] bg-white px-3 py-1.5 text-[12px] focus:border-[#2563EB] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddReqFollowUp}
                    className="rounded-[6px] bg-[#2563EB] px-3.5 py-1.5 text-[12px] font-medium text-white hover:bg-[#1D4ED8]"
                  >
                    Log Follow-up
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
      </SlideOverDrawer>

      {/* Reusable Drawers for SANEF Projects, Partnerships, Enquiries, Donations */}
      <SlideOverDrawer
        open={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        refBadge={selectedProject?.referenceCode}
        title={selectedProject?.title || ""}
        subtitle={selectedProject ? `${selectedProject.location} · ${selectedProject.date}` : ""}
      >
        {selectedProject && (
          <div className="space-y-5 text-[13px]">
            <div className="rounded-[6px] border border-[#E4E4E7] bg-[#FAFAFA] p-3.5">
              <p className="text-[12px] font-semibold text-[#71717A]">Summary</p>
              <p className="mt-1 leading-relaxed text-[#09090B]">{selectedProject.summary}</p>
            </div>
            <div className="rounded-[6px] border border-[#BBF7D0] bg-[#F0FDF4] p-3.5">
              <p className="text-[12px] font-semibold text-[#166534]">Verified Outcomes & Impact</p>
              <p className="mt-1 leading-relaxed text-[#14532D]">{selectedProject.outcomes}</p>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-[#71717A]">Partner Organisations</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {selectedProject.partnerNames.map((p) => (
                  <span key={p} className="rounded-[4px] border border-[#E4E4E7] bg-white px-2.5 py-1 text-[12px]">
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-[#71717A]">
                Downloadable PDF Reports ({selectedProject.reports.length})
              </p>
              <div className="mt-2 space-y-2">
                {selectedProject.reports.map((rep) => (
                  <div
                    key={rep.title}
                    className="flex items-center justify-between rounded-[6px] border border-[#E4E4E7] bg-white px-3 py-2.5"
                  >
                    <div>
                      <p className="font-mono text-[12px] font-medium text-[#09090B]">{rep.title}</p>
                      <p className="text-[12px] text-[#71717A]">
                        {rep.size} · {rep.date}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast(`Opened ${rep.title}`)}
                      className="rounded-[6px] border border-[#E4E4E7] px-2.5 py-1 text-[12px] font-medium hover:border-[#2563EB] hover:text-[#2563EB]"
                    >
                      PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </SlideOverDrawer>

      <SlideOverDrawer
        open={Boolean(selectedPartner)}
        onClose={() => setSelectedPartner(null)}
        title={selectedPartner?.partnerName || ""}
        subtitle={
          selectedPartner ? `${selectedPartner.partnershipType} · ${selectedPartner.partnershipPeriod}` : ""
        }
      >
        {selectedPartner && (
          <div className="space-y-4 text-[13px]">
            <div className="rounded-[6px] border border-[#E4E4E7] bg-[#FAFAFA] p-3.5">
              <p className="text-[12px] font-semibold text-[#71717A]">Contributions</p>
              <p className="mt-1 leading-relaxed text-[#09090B]">{selectedPartner.contributions}</p>
            </div>
            <div className="rounded-[6px] border border-[#BBF7D0] bg-[#F0FDF4] p-3.5">
              <p className="text-[12px] font-semibold text-[#166534]">Documented Outcomes</p>
              <p className="mt-1 leading-relaxed text-[#14532D]">{selectedPartner.outcomes}</p>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-[#71717A]">Joint Projects</p>
              <ul className="mt-2 space-y-1.5">
                {selectedPartner.jointProjects.map((jp) => (
                  <li key={jp} className="rounded-[6px] border border-[#E4E4E7] bg-white px-3 py-2 font-medium text-[#09090B]">
                    {jp}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </SlideOverDrawer>

      <SlideOverDrawer
        open={Boolean(selectedEnquiry)}
        onClose={() => setSelectedEnquiry(null)}
        refBadge={selectedEnquiry?.refId}
        title={selectedEnquiry?.subject || ""}
        subtitle={selectedEnquiry ? `${selectedEnquiry.senderName} · ${selectedEnquiry.organisation}` : ""}
      >
        {selectedEnquiry && (
          <div className="space-y-4 text-[13px]">
            <div className="rounded-[6px] border border-[#E4E4E7] bg-[#FAFAFA] p-3.5">
              <p className="text-[12px] font-semibold text-[#71717A]">Enquiry Message</p>
              <p className="mt-1.5 leading-relaxed text-[#09090B]">{selectedEnquiry.message}</p>
            </div>
            <div className="flex items-center justify-between rounded-[6px] border border-[#E4E4E7] bg-white p-3.5">
              <span className="text-[#52525B]">Assigned to {selectedEnquiry.assignedTo}</span>
              <button
                type="button"
                onClick={() => {
                  setEnquiries((prev) =>
                    prev.map((e) => (e.id === selectedEnquiry.id ? { ...e, status: "Resolved" } : e))
                  );
                  setSelectedEnquiry({ ...selectedEnquiry, status: "Resolved" });
                  showToast(`${selectedEnquiry.refId} marked Resolved`);
                }}
                className="rounded-[6px] bg-[#2563EB] px-3 py-1.5 text-[12px] font-medium text-white hover:bg-[#1D4ED8]"
              >
                Mark Resolved
              </button>
            </div>
          </div>
        )}
      </SlideOverDrawer>

      <SlideOverDrawer
        open={Boolean(selectedDonation)}
        onClose={() => setSelectedDonation(null)}
        refBadge={selectedDonation?.refId}
        title={selectedDonation?.donorName || ""}
        subtitle={selectedDonation ? `${selectedDonation.campaign} · ${selectedDonation.amount}` : ""}
      >
        {selectedDonation && (
          <div className="space-y-4 text-[13px]">
            <dl className="divide-y divide-[#E4E4E7] rounded-[6px] border border-[#E4E4E7] bg-white">
              <div className="flex justify-between px-3.5 py-2.5">
                <dt className="text-[#71717A]">Amount</dt>
                <dd className="font-mono font-semibold text-[#09090B]">{selectedDonation.amount}</dd>
              </div>
              <div className="flex justify-between px-3.5 py-2.5">
                <dt className="text-[#71717A]">Method</dt>
                <dd className="text-[#09090B]">{selectedDonation.method}</dd>
              </div>
              <div className="flex justify-between px-3.5 py-2.5">
                <dt className="text-[#71717A]">Status</dt>
                <dd>
                  <StatusPill
                    label={selectedDonation.status}
                    tone={selectedDonation.status === "Verified" ? "green" : "amber"}
                  />
                </dd>
              </div>
              <div className="flex justify-between px-3.5 py-2.5">
                <dt className="text-[#71717A]">Date</dt>
                <dd className="font-mono text-[#09090B]">{selectedDonation.date}</dd>
              </div>
            </dl>
          </div>
        )}
      </SlideOverDrawer>
    </div>
  );
}
