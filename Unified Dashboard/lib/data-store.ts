// ==============================================================================
// UNIFIED PLATFORM MULTI-TENANT REPOSITORY & DATA ENGINE
// Supports: JossyShield Security Services & Safe Neighborhood Foundation (SANEF)
// ==============================================================================

export interface Organization {
  id: string;
  slug: string;
  name: string;
  type: 'commercial_security' | 'ngo';
  websiteDomain: string;
  tagline: string;
  primaryColor: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isSuperAdmin: boolean;
  avatarUrl?: string;
}

export interface OrganizationMembership {
  id: string;
  organizationId: string;
  userId: string;
  role: string;
  permissions: string[];
}

export interface MarketplaceRequest {
  id: string;
  organizationId: string;
  referenceNumber: string;
  serviceType: 'Security Services' | 'Consultancy' | 'Training';
  clientName: string;
  companyName?: string;
  email: string;
  phone: string;
  location: string;
  personnelCount?: number;
  duration?: string;
  startDate?: string;
  details: string;
  status: 'new' | 'under_review' | 'contacted' | 'quoted' | 'closed';
  internalNotes: string[];
  createdAt: string;
}

export interface JobApplication {
  id: string;
  organizationId: string;
  jobTitle: string;
  applicantName: string;
  email: string;
  phone: string;
  experienceYears: number;
  location: string;
  availability: 'immediate' | '2_weeks' | '1_month';
  cvFileName: string;
  pipelineStatus: 
    | 'new'
    | 'under_review'
    | 'shortlisted'
    | 'interview_scheduled'
    | 'interview_completed'
    | 'approved'
    | 'talent_pool'
    | 'on_hold'
    | 'rejected';
  interviewDate?: string;
  interviewers?: string;
  interviewScore?: number;
  interviewFeedback?: string;
  skills: string[];
  isTalentPool: boolean;
  talentPoolAvailability?: 'available' | 'unavailable' | 'awaiting_confirmation';
  createdAt: string;
}

export interface SANEFProject {
  id: string;
  organizationId: string;
  title: string;
  summary: string;
  detailedDescription: string;
  category: 'Community Safety' | 'Youth Intervention' | 'Safe Spaces' | 'Civic Tech';
  location: string;
  projectDate: string;
  evidenceType: 'Audit Report' | 'Field Evidence' | 'Video Documentary' | 'Survey';
  evidenceUrl?: string;
  verifiedImpactMetrics: { label: string; value: string }[];
  partnerNames: string[];
  isFeatured: boolean;
  status: 'published' | 'draft';
}

export interface SANEFDonationCampaign {
  id: string;
  organizationId: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  donorCount: number;
  currency: string;
  isActive: boolean;
}

export interface AuditLog {
  id: string;
  organizationId: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  timestamp: string;
}

// -----------------------------------------------------------------------------
// SEED DATA STORE
// -----------------------------------------------------------------------------
export const ORGANIZATIONS: Organization[] = [
  {
    id: "org-jossyshield",
    slug: "jossyshield",
    name: "JossyShield Security Services",
    type: "commercial_security",
    websiteDomain: "jossyshield.example",
    tagline: "Elite Tactical Guarding, Corporate Risk Consultancy & Ready Security Talent",
    primaryColor: "#2563eb",
  },
  {
    id: "org-sanef",
    slug: "sanef",
    name: "Safe Neighborhood Foundation",
    type: "ngo",
    websiteDomain: "sanef.example",
    tagline: "Empowering Resilient Communities through Grassroots Safety & Evidence",
    primaryColor: "#059669",
  },
];

export const CURRENT_USER: User = {
  id: "usr-admin-1",
  email: "admin@unifiedplatform.local",
  firstName: "Inimfon",
  lastName: "Udoh",
  isSuperAdmin: true,
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
};

// Initial in-memory mutable data
let marketplaceRequests: MarketplaceRequest[] = [
  {
    id: "req-1",
    organizationId: "org-jossyshield",
    referenceNumber: "JS-REQ-84910",
    serviceType: "Security Services",
    clientName: "Apex Logistics Hub",
    companyName: "Apex Freight Corp",
    email: "operations@apexlogistics.com",
    phone: "+234 803 555 0192",
    location: "Marina Industrial Park, Port Harcourt",
    personnelCount: 8,
    duration: "12 Months (24/7)",
    startDate: "2026-12-01",
    details: "High-security perimeter monitoring, access control turnstiles, and nightly patrol dog units.",
    status: "new",
    internalNotes: ["Initial request submitted from public marketplace wizard."],
    createdAt: "2026-11-18T14:32:00Z",
  },
  {
    id: "req-2",
    organizationId: "org-jossyshield",
    referenceNumber: "JS-REQ-84908",
    serviceType: "Consultancy",
    clientName: "Zenith Diplomatic Residence",
    companyName: "Zenith Advisory Group",
    email: "security@zenithadvisory.org",
    phone: "+234 802 444 8812",
    location: "Maitama District, Abuja",
    details: "Full physical security vulnerability assessment and executive protection audit.",
    status: "under_review",
    internalNotes: ["Lead assigned to Senior Tactical Consultant.", "Preliminary audit scheduled for Tuesday."],
    createdAt: "2026-11-17T09:15:00Z",
  },
  {
    id: "req-3",
    organizationId: "org-jossyshield",
    referenceNumber: "JS-REQ-84895",
    serviceType: "Training",
    clientName: "Horizon Bank PLC",
    companyName: "Horizon Bank PLC",
    email: "corporate.security@horizonbank.ng",
    phone: "+234 809 111 2233",
    location: "Victoria Island, Lagos",
    details: "Tactical defense & crisis de-escalation workshop for 45 branch facility guards.",
    status: "contacted",
    internalNotes: ["Quote proposal #JS-Q-2026-44 dispatched to HR Director."],
    createdAt: "2026-11-15T11:20:00Z",
  },
];

let jobApplications: JobApplication[] = [
  {
    id: "app-1",
    organizationId: "org-jossyshield",
    jobTitle: "Senior Tactical Armed Escort",
    applicantName: "Emmanuel Okafor",
    email: "e.okafor@tacticalguard.ng",
    phone: "+234 805 777 9901",
    experienceYears: 7,
    location: "Lekki, Lagos",
    availability: "immediate",
    cvFileName: "CV_Emmanuel_Okafor_Tactical.pdf",
    pipelineStatus: "shortlisted",
    skills: ["Defensive Driving", "VIP Escort", "Handgun Certification", "Crisis De-escalation"],
    isTalentPool: false,
    createdAt: "2026-11-16T10:00:00Z",
  },
  {
    id: "app-2",
    organizationId: "org-jossyshield",
    jobTitle: "Control Room CCTV Surveillance Specialist",
    applicantName: "Fatima Al-Hassan",
    email: "fatima.alhassan@surveillance.org",
    phone: "+234 812 333 4455",
    experienceYears: 5,
    location: "Garki, Abuja",
    availability: "2_weeks",
    cvFileName: "Fatima_Al_Hassan_CCTV_Cert.pdf",
    pipelineStatus: "interview_scheduled",
    interviewDate: "2026-11-20T14:00:00Z",
    interviewers: "Capt. Briggs & Marcus Cole",
    skills: ["Hikvision VMS", "Incident Logging", "Access Control Matrix", "Network IP Monitoring"],
    isTalentPool: false,
    createdAt: "2026-11-14T08:30:00Z",
  },
  {
    id: "app-3",
    organizationId: "org-jossyshield",
    jobTitle: "Static Perimeter Guard",
    applicantName: "Chinedu Eze",
    email: "chinedu.eze99@gmail.com",
    phone: "+234 803 888 1234",
    experienceYears: 4,
    location: "Trans-Amadi, Port Harcourt",
    availability: "immediate",
    cvFileName: "Chinedu_Eze_Security_Badge.pdf",
    pipelineStatus: "talent_pool",
    skills: ["Perimeter Patrol", "Gatehouse Screening", "Bilingual (English/French)", "First Aid Certified"],
    isTalentPool: true,
    talentPoolAvailability: "available",
    interviewScore: 92,
    interviewFeedback: "Vetted background check clear. Highly disciplined former naval rating.",
    createdAt: "2026-11-10T16:45:00Z",
  },
  {
    id: "app-4",
    organizationId: "org-jossyshield",
    jobTitle: "Corporate Facility Protection Officer",
    applicantName: "Babatunde Adeleke",
    email: "babatunde.adeleke@outlook.com",
    phone: "+234 807 222 3456",
    experienceYears: 6,
    location: "Ikeja GRA, Lagos",
    availability: "immediate",
    cvFileName: "Babatunde_Adeleke_Resume.pdf",
    pipelineStatus: "talent_pool",
    skills: ["Corporate Reception Security", "CCTV Monitoring", "Fire Safety Marshall"],
    isTalentPool: true,
    talentPoolAvailability: "awaiting_confirmation",
    interviewScore: 88,
    interviewFeedback: "Passed tactical assessment and psychological evaluation. Awaiting contract allocation.",
    createdAt: "2026-11-05T13:10:00Z",
  },
];

let sanefProjects: SANEFProject[] = [
  {
    id: "proj-1",
    organizationId: "org-sanef",
    title: "Safe Corridors & Solar Street Lighting Initiative",
    summary: "Installation of 140 autonomous solar street luminaires and pedestrian SOS emergency call beacons across vulnerable neighborhood school routes.",
    detailedDescription: "Partnering with municipal authorities, SANEF conducted lighting density audits across 4 districts. Within 6 months post-installation, night-time pedestrian incidents dropped by 42%.",
    category: "Safe Spaces",
    location: "Ajegunle & Orile Districts, Lagos",
    projectDate: "2026-08-15",
    evidenceType: "Audit Report",
    evidenceUrl: "/evidence/SANEF_Safe_Corridors_Audit_2026.pdf",
    verifiedImpactMetrics: [
      { label: "Solar Beacons Installed", value: "140 units" },
      { label: "Night Crime Reduction", value: "42.8%" },
      { label: "Residents Impacted", value: "65,000+" },
    ],
    partnerNames: ["Lagos State Infrastructure Agency", "CleanEnergy Urban Trust"],
    isFeatured: true,
    status: "published",
  },
  {
    id: "proj-2",
    organizationId: "org-sanef",
    title: "Youth Mediation & Digital Skills Hub",
    summary: "Community de-escalation center training at-risk youth in conflict mediation, digital literacy, and certified vocational skills.",
    detailedDescription: "A safe haven offering certified robotics, web design, and peer mediation circles. Over 320 youths graduated with 88% entering direct employment or secondary education.",
    category: "Youth Intervention",
    location: "Kafanchan Community Center, Kaduna",
    projectDate: "2026-05-10",
    evidenceType: "Field Evidence",
    evidenceUrl: "/evidence/Youth_Mediation_Impact_Evaluation.pdf",
    verifiedImpactMetrics: [
      { label: "Youths Certified", value: "320" },
      { label: "Community Disputes Resolved", value: "184" },
      { label: "Employment Rate", value: "88%" },
    ],
    partnerNames: ["West African Peace Initiative", "Global Voices Fund"],
    isFeatured: true,
    status: "published",
  },
  {
    id: "proj-3",
    organizationId: "org-sanef",
    title: "Neighborhood Watch First-Responder Radio Network",
    summary: "Encrypted VHF handheld radio backbone connecting 28 community watch associations with localized emergency medical dispatch.",
    detailedDescription: "Decreased emergency response arrival latency from 38 minutes to 9 minutes across target suburban clusters.",
    category: "Community Safety",
    location: "Ibadan South-West, Oyo",
    projectDate: "2026-10-02",
    evidenceType: "Audit Report",
    evidenceUrl: "/evidence/SANEF_Radio_Network_Technical_Brief.pdf",
    verifiedImpactMetrics: [
      { label: "Response Time Reduction", value: "76%" },
      { label: "Watch Units Connected", value: "28" },
      { label: "Lives Assisted", value: "1,420" },
    ],
    partnerNames: ["Federal Road Safety Liaison", "Community Elders Council"],
    isFeatured: false,
    status: "published",
  },
];

let sanefCampaigns: SANEFDonationCampaign[] = [
  {
    id: "camp-1",
    organizationId: "org-sanef",
    title: "Solar Lighting for 100 Dark Walkways",
    description: "Equipping 100 high-risk transit walkways with anti-vandal solar LED luminaires.",
    targetAmount: 25000,
    currentAmount: 18450,
    donorCount: 214,
    currency: "USD",
    isActive: true,
  },
  {
    id: "camp-2",
    organizationId: "org-sanef",
    title: "Community Emergency First-Aid Response Kits",
    description: "Deploying 500 industrial trauma kits and certified training to voluntary neighborhood volunteers.",
    targetAmount: 15000,
    currentAmount: 9320,
    donorCount: 142,
    currency: "USD",
    isActive: true,
  },
];

let auditLogs: AuditLog[] = [
  {
    id: "log-1",
    organizationId: "org-jossyshield",
    userId: "usr-admin-1",
    userName: "Inimfon Udoh (Super Admin)",
    action: "Shortlisted Candidate",
    resource: "Candidate: Emmanuel Okafor (Senior Tactical Escort)",
    timestamp: "2026-11-19T08:12:00Z",
  },
  {
    id: "log-2",
    organizationId: "org-jossyshield",
    userId: "usr-admin-1",
    userName: "Inimfon Udoh (Super Admin)",
    action: "Service Request Status Updated",
    resource: "Request #JS-REQ-84908 moved to In Review",
    timestamp: "2026-11-18T16:45:00Z",
  },
  {
    id: "log-3",
    organizationId: "org-sanef",
    userId: "usr-admin-1",
    userName: "Inimfon Udoh (Super Admin)",
    action: "Published Evidence Project",
    resource: "Safe Corridors & Solar Street Lighting Initiative",
    timestamp: "2026-11-17T11:30:00Z",
  },
];

// -----------------------------------------------------------------------------
// REPOSITORY METHODS (DATA ACCESS LAYER)
// -----------------------------------------------------------------------------
export const db = {
  // Organizations
  getOrganizations: () => ORGANIZATIONS,
  getOrganizationById: (id: string) => ORGANIZATIONS.find((o) => o.id === id || o.slug === id),

  // Marketplace Requests
  getMarketplaceRequests: (orgId = "org-jossyshield") =>
    marketplaceRequests.filter((r) => r.organizationId === orgId),
  createMarketplaceRequest: (data: Omit<MarketplaceRequest, "id" | "referenceNumber" | "status" | "internalNotes" | "createdAt">) => {
    const referenceNumber = `JS-REQ-${Math.floor(10000 + Math.random() * 90000)}`;
    const newReq: MarketplaceRequest = {
      ...data,
      id: `req-${Date.now()}`,
      referenceNumber,
      status: "new",
      internalNotes: ["Request received from public marketplace portal."],
      createdAt: new Date().toISOString(),
    };
    marketplaceRequests.unshift(newReq);
    return newReq;
  },
  updateMarketplaceRequestStatus: (id: string, status: MarketplaceRequest["status"], note?: string) => {
    const req = marketplaceRequests.find((r) => r.id === id || r.referenceNumber === id);
    if (req) {
      req.status = status;
      if (note) req.internalNotes.push(note);
    }
    return req;
  },

  // Job Applications & Talent Pool
  getJobApplications: (orgId = "org-jossyshield") =>
    jobApplications.filter((a) => a.organizationId === orgId),
  createJobApplication: (data: Omit<JobApplication, "id" | "pipelineStatus" | "isTalentPool" | "createdAt">) => {
    const newApp: JobApplication = {
      ...data,
      id: `app-${Date.now()}`,
      pipelineStatus: "new",
      isTalentPool: false,
      createdAt: new Date().toISOString(),
    };
    jobApplications.unshift(newApp);
    return newApp;
  },
  updateApplicationStatus: (id: string, pipelineStatus: JobApplication["pipelineStatus"], feedback?: string, score?: number) => {
    const app = jobApplications.find((a) => a.id === id);
    if (app) {
      app.pipelineStatus = pipelineStatus;
      if (feedback) app.interviewFeedback = feedback;
      if (score !== undefined) app.interviewScore = score;
      if (pipelineStatus === "talent_pool") {
        app.isTalentPool = true;
        app.talentPoolAvailability = app.talentPoolAvailability || "available";
      }
    }
    return app;
  },
  updateTalentPoolAvailability: (id: string, status: 'available' | 'unavailable' | 'awaiting_confirmation') => {
    const app = jobApplications.find((a) => a.id === id);
    if (app) {
      app.talentPoolAvailability = status;
    }
    return app;
  },

  // SANEF Projects & Evidence
  getSANEFProjects: () => sanefProjects,
  createSANEFProject: (data: Omit<SANEFProject, "id">) => {
    const newProj: SANEFProject = {
      ...data,
      id: `proj-${Date.now()}`,
    };
    sanefProjects.unshift(newProj);
    return newProj;
  },

  // SANEF Campaigns
  getSANEFDonationCampaigns: () => sanefCampaigns,

  // Audit Logs
  getAuditLogs: (orgId?: string) =>
    orgId ? auditLogs.filter((l) => l.organizationId === orgId) : auditLogs,
  addAuditLog: (log: Omit<AuditLog, "id" | "timestamp">) => {
    const newLog: AuditLog = {
      ...log,
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    auditLogs.unshift(newLog);
    return newLog;
  },
};
