// ==============================================================================
// UNIFIED MULTI-ORGANISATION PLATFORM DATA STORE
// Organisations: Safe Neighborhood Foundation (SANEF) & JossyShield Security Services
// Strict organisation-scoped isolation & RBAC metadata
// ==============================================================================

export type OrgId = "org-sanef" | "org-jossyshield" | "org-jossyshield";

export interface Organization {
  id: OrgId;
  slug: "sanef" | "jossyshield" | "jossyshield";
  name: string;
  shortName: string;
  type: "ngo" | "commercial_security";
  dotColor: string;
  websiteDomain: string;
  localUrl: string;
  userRole: string;
  tagline: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roleTitle: string;
  isSuperAdmin: boolean;
}

export type RecruitmentStage =
  | "New Application"
  | "Under Review"
  | "Shortlisted"
  | "Interview Scheduled"
  | "Interview Completed"
  | "Approved / Qualified"
  | "Talent Pool"
  | "On Hold"
  | "Rejected"
  | "Withdrawn";

export const RECRUITMENT_STAGES: RecruitmentStage[] = [
  "New Application",
  "Under Review",
  "Shortlisted",
  "Interview Scheduled",
  "Interview Completed",
  "Approved / Qualified",
  "Talent Pool",
  "On Hold",
  "Rejected",
  "Withdrawn",
];

export interface InterviewEntry {
  id: string;
  date: string;
  time: string;
  interviewer: string;
  mode: "In-Person (Ikeja HQ)" | "Field Assessment" | "Video Panel";
  outcome: "Scheduled" | "Recommended" | "Hold" | "Not Progressed";
  feedback: string;
}

export interface JobApplication {
  id: string;
  organizationId: OrgId;
  referenceCode: string;
  applicantName: string;
  email: string;
  phone: string;
  role: string;
  sourceType: "Vacancy" | "General Talent Pool";
  location: string;
  experienceYears: number;
  qualifications: string;
  availability: "Immediate" | "7 days notice" | "14 days notice" | "30 days notice";
  cvFileName: string;
  cvFileSize: string;
  cvSummary: string;
  stage: RecruitmentStage;
  assignedReviewer: string;
  appliedDate: string;
  skills: string[];
  interviews: InterviewEntry[];
  restrictedNotes: { id: string; author: string; timestamp: string; text: string }[];
  inTalentPool: boolean;
}

export type PoolAvailability = "Available" | "Unavailable" | "Awaiting Confirmation";
export type PoolStatus = "Active" | "Inactive";

export interface TalentPoolProfile {
  id: string;
  organizationId: OrgId;
  applicationRef: string;
  fullName: string;
  phone: string;
  email: string;
  skills: string[];
  preferredAssignment: string;
  location: string;
  availabilityStatus: PoolAvailability;
  lastConfirmedDate: string;
  poolStatus: PoolStatus;
  assessmentOutcome: string;
  experienceYears: number;
  contactHistory: { id: string; date: string; by: string; channel: string; note: string }[];
  internalNotes: string;
}

export type ServiceCategory = "Security Services" | "Consultancy" | "Training";
export type RequestStatus = "New" | "Under Review" | "Proposal Sent" | "Scheduled" | "Closed";

export interface MarketplaceRequest {
  id: string;
  organizationId: OrgId;
  referenceNumber: string;
  clientName: string;
  organisationName: string;
  email: string;
  phone: string;
  serviceCategory: ServiceCategory;
  serviceSubType: string;
  location: string;
  requestedDate: string;
  preferredStartDate: string;
  status: RequestStatus;
  assignedManager: string;
  payload: Record<string, string>;
  followUpTimeline: { id: string; timestamp: string; author: string; entry: string }[];
}

export interface SANEFProject {
  id: string;
  organizationId: OrgId;
  referenceCode: string;
  title: string;
  category: "Solar Infrastructure" | "Youth Mediation" | "School Safety" | "Community Watch";
  location: string;
  date: string;
  year: string;
  partnerNames: string[];
  photoCount: number;
  pdfCount: number;
  status: "Published" | "Draft" | "Archived";
  featured: boolean;
  summary: string;
  outcomes: string;
  reports: { title: string; size: string; date: string }[];
}

export interface SANEFPartnership {
  id: string;
  organizationId: OrgId;
  partnerName: string;
  partnershipPeriod: string;
  partnershipType: "Technical Partner" | "Funding Partner" | "Municipal Agency" | "Community Coalition";
  jointProjects: string[];
  contributions: string;
  outcomes: string;
  status: "Active" | "Completed";
  evidenceCount: number;
}

export interface CMSPage {
  id: string;
  organizationId: OrgId;
  slug: string;
  title: string;
  template: string;
  status: "Published" | "In Review" | "Draft";
  lastUpdated: string;
  updatedBy: string;
}

export interface BlogPost {
  id: string;
  organizationId: OrgId;
  refId: string;
  title: string;
  category: string;
  author: string;
  publishedDate: string;
  status: "Published" | "Review" | "Draft";
  featured: boolean;
}

export interface EventRecord {
  id: string;
  organizationId: OrgId;
  refId: string;
  title: string;
  date: string;
  location: string;
  type: "Upcoming" | "Past";
  registrations: number;
  status: "Published" | "Draft" | "Completed";
}

export interface DonationRecord {
  id: string;
  organizationId: OrgId;
  refId: string;
  donorName: string;
  campaign: string;
  amount: string;
  method: "Bank Transfer" | "Card Gateway" | "Institutional Grant";
  date: string;
  status: "Verified" | "Pending Reconciliation";
}

export interface EnquiryRecord {
  id: string;
  organizationId: OrgId;
  refId: string;
  senderName: string;
  organisation: string;
  email: string;
  channel: "Web Form" | "WhatsApp" | "Email";
  subject: string;
  receivedDate: string;
  status: "New" | "Responded" | "Resolved";
  assignedTo: string;
  message: string;
}

export interface VacancyRecord {
  id: string;
  organizationId: OrgId;
  refId: string;
  title: string;
  department: string;
  location: string;
  type: "Full-Time" | "Contract" | "Shift Roster";
  deadline: string;
  applicantsCount: number;
  status: "Open" | "Paused" | "Closed";
}

export interface ServiceOfferingRecord {
  id: string;
  organizationId: OrgId;
  code: string;
  pillar: ServiceCategory;
  name: string;
  slaStandard: string;
  activeClients: number;
  status: "Published" | "Draft";
}

export interface TestimonialRecord {
  id: string;
  organizationId: OrgId;
  refId: string;
  clientName: string;
  organisation: string;
  category: ServiceCategory;
  quote: string;
  approvedDate: string;
  status: "Approved" | "Pending Review";
}

export interface MediaAsset {
  id: string;
  organizationId: OrgId;
  refId: string;
  fileName: string;
  type: "Image" | "PDF Report" | "Policy Doc";
  url: string;
  fileSize: string;
  uploadedBy: string;
  uploadedAt: string;
  accessScope: "Public" | "Restricted (Org Only)";
}

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  sanefRole: string | null;
  jossyRole: string | null;
  lastActive: string;
  status: "Active" | "Invited";
  permissionsSummary: string;
}

export interface ActivityLog {
  id: string;
  organizationId: OrgId;
  refId: string;
  action: string;
  module: string;
  actor: string;
  timestamp: string;
  severity: "Info" | "Security" | "Update";
}

// ==============================================================================
// SEED DATA
// ==============================================================================

export const ORGANIZATIONS: Organization[] = [
  {
    id: "org-jossyshield",
    slug: "jossyshield",
    name: "JossyShield Security Services",
    shortName: "JossyShield",
    type: "commercial_security",
    dotColor: "#0F172A",
    websiteDomain: "jossyshield.ng",
    localUrl: process.env.NEXT_PUBLIC_JOSSYSHIELD_URL || "https://sanef-x-joshield.vercel.app",
    userRole: "Super Admin",
    tagline: "Commercial security operations, advisory consultancy, training, and vetted talent pool.",
  },
  {
    id: "org-sanef",
    slug: "sanef",
    name: "Safe Neighborhood Foundation (SANEF)",
    shortName: "SANEF",
    type: "ngo",
    dotColor: "#1B4332",
    websiteDomain: "sanefoundation.org.ng",
    localUrl: process.env.NEXT_PUBLIC_SANEF_URL || "https://safe-neighborhood-foundation.vercel.app",
    userRole: "Super Admin",
    tagline: "Community safety infrastructure, documentary evidence archive, partnerships, and campaigns.",
  },
];

export const CURRENT_USER: User = {
  id: "usr-super-01",
  email: "i.udoh@platform.ng",
  firstName: "Inimfon",
  lastName: "Udoh",
  roleTitle: "Super Admin",
  isSuperAdmin: true,
};

let jobApplications: JobApplication[] = [
  {
    id: "app-01",
    organizationId: "org-jossyshield",
    referenceCode: "JS-APP-2026-0318",
    applicantName: "Emmanuel Okafor",
    email: "e.okafor@guardmail.ng",
    phone: "+234 805 777 9901",
    role: "Convoy & Executive Escort Lead",
    sourceType: "Vacancy",
    location: "Victoria Island, Lagos",
    experienceYears: 7,
    qualifications: "NSCDC Private Guard Cert, Defensive Driving Level 3, First Responder Trauma",
    availability: "Immediate",
    cvFileName: "Emmanuel_Okafor_CV_2026.pdf",
    cvFileSize: "1.4 MB",
    cvSummary: "7 years commercial convoy protection and port dockyard supervision across Lagos & Rivers. Zero incident record.",
    stage: "Approved / Qualified",
    assignedReviewer: "Evelyn Alabi",
    appliedDate: "2026-11-18",
    skills: ["Convoy Escort", "VHF/UHF Radio", "Defensive Driving", "First Aid"],
    interviews: [
      {
        id: "int-101",
        date: "2026-11-20",
        time: "10:30 WAT",
        interviewer: "Capt. Tunde Bakare (Ret.)",
        mode: "Field Assessment",
        outcome: "Recommended",
        feedback: "Scored 91/100 on route threat assessment and radio check-in drills. Ready for talent pool onboarding.",
      },
    ],
    restrictedNotes: [
      {
        id: "rn-1",
        author: "Evelyn Alabi",
        timestamp: "2026-11-20 14:15",
        text: "NIN biometric check verified. Both civil-service guarantor letters confirmed by phone.",
      },
    ],
    inTalentPool: false,
  },
  {
    id: "app-02",
    organizationId: "org-jossyshield",
    referenceCode: "JS-APP-2026-0315",
    applicantName: "Fatima Al-Hassan",
    email: "fatima.alhassan@abujasec.ng",
    phone: "+234 812 333 4455",
    role: "Control Room CCTV & Access Operator",
    sourceType: "Vacancy",
    location: "Maitama, Abuja",
    experienceYears: 5,
    qualifications: "Hikvision VMS Certified, B.Sc Criminology, Incident Logging & Dispatch",
    availability: "7 days notice",
    cvFileName: "Fatima_AlHassan_VMS_2026.pdf",
    cvFileSize: "940 KB",
    cvSummary: "5 years operating 64-camera diplomatic compound monitoring desks and turnstile access control matrices.",
    stage: "Interview Scheduled",
    assignedReviewer: "Ibrahim Danjuma",
    appliedDate: "2026-11-17",
    skills: ["CCTV Monitoring", "Access Control", "Incident Reporting", "VMS Dispatch"],
    interviews: [
      {
        id: "int-102",
        date: "2026-11-26",
        time: "14:00 WAT",
        interviewer: "Ibrahim Danjuma",
        mode: "Video Panel",
        outcome: "Scheduled",
        feedback: "Technical assessment on multi-zone CCTV alert triage scheduled.",
      },
    ],
    restrictedNotes: [
      {
        id: "rn-2",
        author: "Ibrahim Danjuma",
        timestamp: "2026-11-19 09:42",
        text: "Strong previous reference from Maitama diplomatic facility supervisor.",
      },
    ],
    inTalentPool: false,
  },
  {
    id: "app-03",
    organizationId: "org-jossyshield",
    referenceCode: "JS-APP-2026-0312",
    applicantName: "Sadiq Danladi",
    email: "s.danladi@apapaguard.ng",
    phone: "+234 809 551 0294",
    role: "Static Perimeter Guard",
    sourceType: "General Talent Pool",
    location: "Apapa Wharf, Lagos",
    experienceYears: 4,
    qualifications: "Basic Guard Training Cert, Fire Safety Warden Level 1",
    availability: "Immediate",
    cvFileName: "Sadiq_Danladi_Resume.pdf",
    cvFileSize: "620 KB",
    cvSummary: "4 years night perimeter patrol and freight gatehouse verification at Apapa warehousing terminals.",
    stage: "New Application",
    assignedReviewer: "Evelyn Alabi",
    appliedDate: "2026-11-23",
    skills: ["Gatehouse Control", "Night Patrol", "Waybill Audit"],
    interviews: [],
    restrictedNotes: [
      {
        id: "rn-3",
        author: "Evelyn Alabi",
        timestamp: "2026-11-23 16:08",
        text: "Submitted via General Security Personnel Applications banner. Initial screening queued.",
      },
    ],
    inTalentPool: false,
  },
  {
    id: "app-04",
    organizationId: "org-jossyshield",
    referenceCode: "JS-APP-2026-0309",
    applicantName: "Kelechi Iheanacho",
    email: "k.iheanacho@patrol.ng",
    phone: "+234 813 604 7122",
    role: "Mobile Patrol Response Officer",
    sourceType: "Vacancy",
    location: "Ikeja Industrial, Lagos",
    experienceYears: 3,
    qualifications: "Commercial Rider License, Emergency Response First Aid",
    availability: "7 days notice",
    cvFileName: "Kelechi_Iheanacho_CV.pdf",
    cvFileSize: "780 KB",
    cvSummary: "3 years rapid response mobile patrol across Ikeja GRA and Ogba commercial zones.",
    stage: "Under Review",
    assignedReviewer: "Ngozi Okafor",
    appliedDate: "2026-11-22",
    skills: ["Rapid Response", "UHF Radio Relay", "Incident Photography"],
    interviews: [],
    restrictedNotes: [],
    inTalentPool: false,
  },
  {
    id: "app-05",
    organizationId: "org-jossyshield",
    referenceCode: "JS-APP-2026-0305",
    applicantName: "Chinedu Eze",
    email: "chinedu.eze99@portmail.ng",
    phone: "+234 803 888 1234",
    role: "Maritime Terminal Security Officer",
    sourceType: "Vacancy",
    location: "Onne Wharf, Port Harcourt",
    experienceYears: 6,
    qualifications: "ISPS Code Port Security Cert, CPR & First Aid, Bilingual EN/FR",
    availability: "Immediate",
    cvFileName: "Chinedu_Eze_ISPS_CV.pdf",
    cvFileSize: "1.8 MB",
    cvSummary: "6 years container terminal gatehouse supervision and ISPS compliance audits in Rivers State.",
    stage: "Talent Pool",
    assignedReviewer: "Tamuno Briggs",
    appliedDate: "2026-11-10",
    skills: ["ISPS Maritime", "Container Seal Audit", "Access Control", "CPR Certified"],
    interviews: [
      {
        id: "int-105",
        date: "2026-11-14",
        time: "11:00 WAT",
        interviewer: "Tamuno Briggs",
        mode: "In-Person (Ikeja HQ)",
        outcome: "Recommended",
        feedback: "Cleared background checks, guarantor verification, and physical drill. Placed in active pool.",
      },
    ],
    restrictedNotes: [
      {
        id: "rn-5",
        author: "Tamuno Briggs",
        timestamp: "2026-11-15 10:20",
        text: "Moved to Ready-to-Work Talent Pool for Rivers maritime contracts.",
      },
    ],
    inTalentPool: true,
  },
  {
    id: "app-06",
    organizationId: "org-jossyshield",
    referenceCode: "JS-APP-2026-0302",
    applicantName: "Amina Yusuf",
    email: "amina.yusuf@shieldops.ng",
    phone: "+234 806 419 8820",
    role: "Corporate Facility Shift Supervisor",
    sourceType: "Vacancy",
    location: "Victoria Island, Lagos",
    experienceYears: 8,
    qualifications: "CPP Associate, High-Rise Fire & Evacuation Command, Shift Rostering",
    availability: "Immediate",
    cvFileName: "Amina_Yusuf_Supervisor_CV.pdf",
    cvFileSize: "1.1 MB",
    cvSummary: "8 years leading 24-officer commercial tower guard rosters in Victoria Island and Ikoyi.",
    stage: "Shortlisted",
    assignedReviewer: "Evelyn Alabi",
    appliedDate: "2026-11-19",
    skills: ["Shift Rostering", "High-Rise Access", "VIP Reception", "Evacuation Lead"],
    interviews: [],
    restrictedNotes: [
      {
        id: "rn-6",
        author: "Evelyn Alabi",
        timestamp: "2026-11-21 11:05",
        text: "Shortlisted for Meridian Towers VI shift supervisor panel.",
      },
    ],
    inTalentPool: false,
  },
  {
    id: "app-07",
    organizationId: "org-jossyshield",
    referenceCode: "JS-APP-2026-0299",
    applicantName: "Babatunde Adeleke",
    email: "b.adeleke@lagosguards.ng",
    phone: "+234 807 222 3456",
    role: "Industrial Site Protection Lead",
    sourceType: "Vacancy",
    location: "Ikeja GRA, Lagos",
    experienceYears: 6,
    qualifications: "Fire Warden Level 2, CCTV Watch, Warehouse Manifest Audit",
    availability: "14 days notice",
    cvFileName: "Babatunde_Adeleke_Dossier.pdf",
    cvFileSize: "1.3 MB",
    cvSummary: "6 years industrial warehousing perimeter security and shift handover compliance.",
    stage: "Interview Completed",
    assignedReviewer: "Ngozi Okafor",
    appliedDate: "2026-11-12",
    skills: ["Warehouse Security", "Fire Warden", "CCTV Watch", "Shift Handover"],
    interviews: [
      {
        id: "int-107",
        date: "2026-11-18",
        time: "09:30 WAT",
        interviewer: "Ngozi Okafor",
        mode: "In-Person (Ikeja HQ)",
        outcome: "Recommended",
        feedback: "Strong leadership composure; awaiting final medical fitness clearance sign-off.",
      },
    ],
    restrictedNotes: [],
    inTalentPool: false,
  },
  {
    id: "app-08",
    organizationId: "org-jossyshield",
    referenceCode: "JS-APP-2026-0294",
    applicantName: "Obinna Nwankwo",
    email: "o.nwankwo@riversguard.ng",
    phone: "+234 803 714 5509",
    role: "Weighbridge & Gatehouse Inspector",
    sourceType: "General Talent Pool",
    location: "Trans-Amadi, Port Harcourt",
    experienceYears: 5,
    qualifications: "Industrial Gate Compliance, Basic First Aid",
    availability: "Immediate",
    cvFileName: "Obinna_Nwankwo_CV.pdf",
    cvFileSize: "870 KB",
    cvSummary: "5 years commercial weighbridge manifest checks and night yard patrols.",
    stage: "On Hold",
    assignedReviewer: "Tamuno Briggs",
    appliedDate: "2026-11-08",
    skills: ["Waybill Audit", "Perimeter Patrol", "VHF Radio"],
    interviews: [],
    restrictedNotes: [
      {
        id: "rn-8",
        author: "Tamuno Briggs",
        timestamp: "2026-11-14 15:40",
        text: "On hold pending second guarantor address verification in Port Harcourt.",
      },
    ],
    inTalentPool: false,
  },
  {
    id: "app-09",
    organizationId: "org-jossyshield",
    referenceCode: "JS-APP-2026-0288",
    applicantName: "Tosin Adeyemi",
    email: "tosin.adeyemi@mail.ng",
    phone: "+234 810 441 9032",
    role: "Security Risk Consultant (Junior)",
    sourceType: "Vacancy",
    location: "Lekki, Lagos",
    experienceYears: 2,
    qualifications: "B.Sc International Relations",
    availability: "30 days notice",
    cvFileName: "Tosin_Adeyemi_CV.pdf",
    cvFileSize: "510 KB",
    cvSummary: "2 years administrative compliance support; no commercial site audit experience.",
    stage: "Rejected",
    assignedReviewer: "Evelyn Alabi",
    appliedDate: "2026-11-04",
    skills: ["Report Writing", "Compliance Docs"],
    interviews: [],
    restrictedNotes: [
      {
        id: "rn-9",
        author: "Evelyn Alabi",
        timestamp: "2026-11-09 12:10",
        text: "Does not meet 5-year minimum physical site risk auditing requirement.",
      },
    ],
    inTalentPool: false,
  },
  {
    id: "app-10",
    organizationId: "org-jossyshield",
    referenceCode: "JS-APP-2026-0283",
    applicantName: "Musa Garba",
    email: "m.garba@northsec.ng",
    phone: "+234 802 918 3304",
    role: "Night Patrol Supervisor",
    sourceType: "Vacancy",
    location: "Wuse II, Abuja",
    experienceYears: 6,
    qualifications: "Ex-Military Police, Defensive Tactics Instructor",
    availability: "Immediate",
    cvFileName: "Musa_Garba_Profile.pdf",
    cvFileSize: "1.0 MB",
    cvSummary: "6 years commercial patrol supervision in FCT Abuja.",
    stage: "Withdrawn",
    assignedReviewer: "Ibrahim Danjuma",
    appliedDate: "2026-11-02",
    skills: ["Patrol Supervision", "Tactical Briefing", "VHF Dispatch"],
    interviews: [],
    restrictedNotes: [
      {
        id: "rn-10",
        author: "Ibrahim Danjuma",
        timestamp: "2026-11-11 08:50",
        text: "Candidate relocated to Kano and formally withdrew application.",
      },
    ],
    inTalentPool: false,
  },
];

let talentPool: TalentPoolProfile[] = [
  {
    id: "tp-01",
    organizationId: "org-jossyshield",
    applicationRef: "JS-APP-2026-0305",
    fullName: "Chinedu Eze",
    phone: "+234 803 888 1234",
    email: "chinedu.eze99@portmail.ng",
    skills: ["ISPS Maritime", "Container Seal Audit", "CPR Certified", "VHF Radio"],
    preferredAssignment: "Maritime & Port Gatehouse",
    location: "Port Harcourt, Rivers",
    availabilityStatus: "Available",
    lastConfirmedDate: "2026-11-24",
    poolStatus: "Active",
    assessmentOutcome: "Cleared · Score 94/100",
    experienceYears: 6,
    contactHistory: [
      { id: "ch-1", date: "2026-11-24", by: "Tamuno Briggs", channel: "Phone Call", note: "Confirmed ready for 1 Dec Onne Wharf rotation." },
      { id: "ch-2", date: "2026-11-15", by: "Evelyn Alabi", channel: "SMS / Portal", note: "Onboarded into Ready-to-Work Talent Pool after medical clearance." },
    ],
    internalNotes: "Bilingual EN/FR; preferred for international freight terminal posts.",
  },
  {
    id: "tp-02",
    organizationId: "org-jossyshield",
    applicationRef: "JS-APP-2026-0271",
    fullName: "Nnamdi Okonkwo",
    phone: "+234 806 312 7741",
    email: "n.okonkwo@shieldmail.ng",
    skills: ["Corporate Lobby", "Turnstile Access", "Fire Warden", "VIP Protocol"],
    preferredAssignment: "Commercial High-Rise",
    location: "Victoria Island, Lagos",
    availabilityStatus: "Available",
    lastConfirmedDate: "2026-11-23",
    poolStatus: "Active",
    assessmentOutcome: "Cleared · Score 92/100",
    experienceYears: 7,
    contactHistory: [
      { id: "ch-3", date: "2026-11-23", by: "Evelyn Alabi", channel: "Phone Call", note: "Confirmed immediate availability for VI / Ikoyi day shifts." },
    ],
    internalNotes: "Impeccable client feedback from 2025 banking tower cover.",
  },
  {
    id: "tp-03",
    organizationId: "org-jossyshield",
    applicationRef: "JS-APP-2026-0264",
    fullName: "Yusuf Abdullahi",
    phone: "+234 809 740 1128",
    email: "yusuf.a@abujaguards.ng",
    skills: ["Diplomatic Perimeter", "CCTV Triage", "Bollard Control"],
    preferredAssignment: "Diplomatic & Embassy Annex",
    location: "Maitama, Abuja",
    availabilityStatus: "Awaiting Confirmation",
    lastConfirmedDate: "2026-11-09",
    poolStatus: "Active",
    assessmentOutcome: "Cleared · Score 89/100",
    experienceYears: 5,
    contactHistory: [
      { id: "ch-4", date: "2026-11-09", by: "Ibrahim Danjuma", channel: "WhatsApp", note: "Last availability check completed; 14-day refresh due." },
    ],
    internalNotes: "Needs updated availability confirmation before Maitama shortlist.",
  },
  {
    id: "tp-04",
    organizationId: "org-jossyshield",
    applicationRef: "JS-APP-2026-0258",
    fullName: "Grace Etim",
    phone: "+234 813 205 6610",
    email: "grace.etim@secops.ng",
    skills: ["Control Room VMS", "Access Auditing", "Incident Dispatch", "First Aid"],
    preferredAssignment: "Control Room & Monitoring",
    location: "Ikeja, Lagos",
    availabilityStatus: "Available",
    lastConfirmedDate: "2026-11-22",
    poolStatus: "Active",
    assessmentOutcome: "Cleared · Score 95/100",
    experienceYears: 6,
    contactHistory: [
      { id: "ch-5", date: "2026-11-22", by: "Ngozi Okafor", channel: "Phone Call", note: "Confirmed available for Ikeja Depot or Lekki control desk." },
    ],
    internalNotes: "Certified on Hikvision & Milestone VMS suites.",
  },
  {
    id: "tp-05",
    organizationId: "org-jossyshield",
    applicationRef: "JS-APP-2026-0244",
    fullName: "Segun Fashola",
    phone: "+234 805 612 9084",
    email: "segun.f@lagospatrol.ng",
    skills: ["Convoy Escort", "Route Reconnaissance", "Defensive Driving"],
    preferredAssignment: "Executive & Bullion Escort",
    location: "Lekki Phase 1, Lagos",
    availabilityStatus: "Unavailable",
    lastConfirmedDate: "2026-11-18",
    poolStatus: "Active",
    assessmentOutcome: "Cleared · Score 90/100",
    experienceYears: 9,
    contactHistory: [
      { id: "ch-6", date: "2026-11-18", by: "Capt. Tunde Bakare", channel: "Phone Call", note: "On temporary 21-day short-term contract until 9 Dec 2026." },
    ],
    internalNotes: "Re-confirm availability on 10 Dec 2026.",
  },
  {
    id: "tp-06",
    organizationId: "org-jossyshield",
    applicationRef: "JS-APP-2026-0231",
    fullName: "Ifeanyi Mbah",
    phone: "+234 802 589 4412",
    email: "ifeanyi.mbah@ops.ng",
    skills: ["Event Crowd Control", "Perimeter Screening", "Walk-Through Metal Detector"],
    preferredAssignment: "Corporate Events & Conferences",
    location: "Surulere, Lagos",
    availabilityStatus: "Awaiting Confirmation",
    lastConfirmedDate: "2026-11-02",
    poolStatus: "Inactive",
    assessmentOutcome: "Cleared · Score 86/100",
    experienceYears: 4,
    contactHistory: [
      { id: "ch-7", date: "2026-11-02", by: "Evelyn Alabi", channel: "SMS", note: "No response to November roster ping; marked Inactive pending call." },
    ],
    internalNotes: "Keep archived in pool until annual retention review in May 2027.",
  },
];

let marketplaceRequests: MarketplaceRequest[] = [
  {
    id: "mreq-01",
    organizationId: "org-jossyshield",
    referenceNumber: "JS-REQ-2026-0418",
    clientName: "Damilola Adelaja",
    organisationName: "Apex Maritime Logistics Ltd",
    email: "d.adelaja@apexfreight.ng",
    phone: "+234 803 552 1940",
    serviceCategory: "Security Services",
    serviceSubType: "Static & Perimeter Guarding",
    location: "Onne Wharf, Port Harcourt",
    requestedDate: "2026-11-24",
    preferredStartDate: "2026-12-01",
    status: "New",
    assignedManager: "Tamuno Briggs",
    payload: {
      "Service Type": "24/7 Static & Perimeter Guarding",
      "Requested Personnel": "12 Vetted Officers (3 shifts × 4)",
      "Contract Duration": "12 Months (Renewable)",
      "Preferred Start Date": "2026-12-01",
      "Site Location": "Marina Industrial Park, Onne Wharf, PH",
      "Specific Requirements": "Container gatehouse access control, weighbridge seal verification, and dual-handler night perimeter sweep.",
    },
    followUpTimeline: [
      { id: "ft-1", timestamp: "2026-11-24 09:14", author: "System", entry: "Service request JS-REQ-2026-0418 submitted via JossyShield Marketplace." },
      { id: "ft-2", timestamp: "2026-11-24 10:02", author: "Tamuno Briggs", entry: "Assigned to Rivers Maritime desk; site survey scheduled for 26 Nov." },
    ],
  },
  {
    id: "mreq-02",
    organizationId: "org-jossyshield",
    referenceNumber: "JS-REQ-2026-0415",
    clientName: "Kemi Adesina",
    organisationName: "Zenith Diplomatic Advisory",
    email: "k.adesina@zenithadvisory.org",
    phone: "+234 802 441 8812",
    serviceCategory: "Consultancy",
    serviceSubType: "Facility Risk & Vulnerability Assessment",
    location: "Maitama District, Abuja",
    requestedDate: "2026-11-22",
    preferredStartDate: "2026-12-04",
    status: "Proposal Sent",
    assignedManager: "Ibrahim Danjuma",
    payload: {
      "Consultancy Type": "Physical Security & Perimeter Risk Audit",
      "Security Concern": "Camera blind spots along rear service lane and uncontrolled contractor deliveries.",
      "Preferred Engagement Date": "2026-12-04",
      "Location": "Gana Street, Maitama, Abuja",
      "Additional Details": "Requires written remediation roadmap and evacuation protocol review for 62 residential staff.",
    },
    followUpTimeline: [
      { id: "ft-3", timestamp: "2026-11-22 14:20", author: "System", entry: "Consultancy enquiry logged via Marketplace." },
      { id: "ft-4", timestamp: "2026-11-23 11:30", author: "Ibrahim Danjuma", entry: "Scope proposal and audit timeline (14 business days) emailed to client." },
    ],
  },
  {
    id: "mreq-03",
    organizationId: "org-jossyshield",
    referenceNumber: "JS-REQ-2026-0411",
    clientName: "Uche Nnamdi",
    organisationName: "Oba Akran Distribution Depot",
    email: "u.nnamdi@obaakrandepot.ng",
    phone: "+234 807 613 2890",
    serviceCategory: "Training",
    serviceSubType: "Corporate Guard Refresher & Access Drill",
    location: "Ikeja Industrial, Lagos",
    requestedDate: "2026-11-20",
    preferredStartDate: "2026-12-08",
    status: "Scheduled",
    assignedManager: "Capt. Tunde Bakare",
    payload: {
      "Enrolment Mode": "Organisation Cohort",
      "Training Type": "Gatehouse Protocol, Conflict De-escalation & Fire Drill",
      "Trainee Count": "24 In-house Personnel",
      "Preferred Dates": "2026-12-08 to 2026-12-10",
      "Location": "Oba Akran Avenue, Ikeja, Lagos",
      "Training Objectives": "Standardise truck manifest verification, visitor screening, and emergency muster compliance.",
    },
    followUpTimeline: [
      { id: "ft-5", timestamp: "2026-11-20 16:05", author: "System", entry: "Training cohort request submitted." },
      { id: "ft-6", timestamp: "2026-11-21 09:45", author: "Capt. Tunde Bakare", entry: "Curriculum pack approved; instructors booked for 8–10 Dec." },
    ],
  },
  {
    id: "mreq-04",
    organizationId: "org-jossyshield",
    referenceNumber: "JS-REQ-2026-0406",
    clientName: "Bankole Coker",
    organisationName: "Meridian Towers Facilities",
    email: "b.coker@meridiantowers.ng",
    phone: "+234 809 318 4402",
    serviceCategory: "Security Services",
    serviceSubType: "Corporate Reception & Access Security",
    location: "Victoria Island, Lagos",
    requestedDate: "2026-11-18",
    preferredStartDate: "2026-11-28",
    status: "Under Review",
    assignedManager: "Ngozi Okafor",
    payload: {
      "Service Type": "Corporate High-Rise Access & Lobby Security",
      "Requested Personnel": "9 Officers + 1 Shift Supervisor",
      "Contract Duration": "24 Months",
      "Preferred Start Date": "2026-11-28",
      "Site Location": "24 Adeola Odeku St, Victoria Island, Lagos",
      "Specific Requirements": "Turnstile visitor badge issuance, basement sweep every 45 mins, and generator fuel lock supervision.",
    },
    followUpTimeline: [
      { id: "ft-7", timestamp: "2026-11-18 11:28", author: "System", entry: "Request logged via Marketplace." },
      { id: "ft-8", timestamp: "2026-11-19 15:10", author: "Ngozi Okafor", entry: "Completed physical lobby walkthrough; preparing staffing roster from Talent Pool." },
    ],
  },
  {
    id: "mreq-05",
    organizationId: "org-jossyshield",
    referenceNumber: "JS-REQ-2026-0399",
    clientName: "Olumide Balogun",
    organisationName: "First Marina Clearing House",
    email: "o.balogun@firstmarina.ng",
    phone: "+234 805 902 1173",
    serviceCategory: "Security Services",
    serviceSubType: "Convoy & High-Value Transit Escort",
    location: "Marina & Victoria Island, Lagos",
    requestedDate: "2026-11-14",
    preferredStartDate: "2026-11-20",
    status: "Closed",
    assignedManager: "Capt. Tunde Bakare",
    payload: {
      "Service Type": "Daylight High-Value Transit Escort",
      "Requested Personnel": "6 Escort Specialists",
      "Contract Duration": "6 Months",
      "Preferred Start Date": "2026-11-20",
      "Site Location": "Broad Street to Victoria Island Corridor",
      "Specific Requirements": "Dedicated UHF channel monitoring and staggered transfer windows between 14 branches.",
    },
    followUpTimeline: [
      { id: "ft-9", timestamp: "2026-11-14 08:40", author: "System", entry: "Service request received." },
      { id: "ft-10", timestamp: "2026-11-19 17:00", author: "Capt. Tunde Bakare", entry: "SLA signed and operational deployment active." },
    ],
  },
  {
    id: "mreq-06",
    organizationId: "org-jossyshield",
    referenceNumber: "JS-REQ-2026-0394",
    clientName: "Dr. Hadiza Suleiman",
    organisationName: "Individual Enrolment",
    email: "h.suleiman@medcare.ng",
    phone: "+234 818 902 4411",
    serviceCategory: "Training",
    serviceSubType: "Personal Situational Awareness Workshop",
    location: "Wuse II, Abuja",
    requestedDate: "2026-11-12",
    preferredStartDate: "2026-12-05",
    status: "Under Review",
    assignedManager: "Ibrahim Danjuma",
    payload: {
      "Enrolment Mode": "Individual",
      "Training Type": "Personal Travel Safety & Situational Awareness",
      "Trainee Count": "1 Participant",
      "Preferred Dates": "2026-12-05 (Saturday Intensive)",
      "Location": "Abuja Training Annex, Wuse II",
      "Training Objectives": "Pre-travel security briefing for field health inspections across northern transit corridors.",
    },
    followUpTimeline: [
      { id: "ft-11", timestamp: "2026-11-12 13:15", author: "System", entry: "Individual training request logged." },
    ],
  },
];

let sanefProjects: SANEFProject[] = [
  {
    id: "sprj-01",
    organizationId: "org-sanef",
    referenceCode: "SAN-PRJ-2026-014",
    title: "Ajegunle & Orile School Route Solar Lighting Corridor",
    category: "Solar Infrastructure",
    location: "Ajegunle & Orile Iganmu, Lagos",
    date: "August 2026",
    year: "2026",
    partnerNames: ["Lagos Urban Lighting Trust", "Ajeromi-Ifelodun Ward Council"],
    photoCount: 14,
    pdfCount: 2,
    status: "Published",
    featured: true,
    summary: "Installed 142 tamper-resistant solar LED street poles across 4.6 km of evening student walkways and market return routes.",
    outcomes: "Six-month ward incident logs recorded a 42.8% reduction in dusk-to-midnight street robberies; 64,850 residents use the lit corridor weekly.",
    reports: [
      { title: "Ajegunle_Corridor_Lux_Audit_2026.pdf", size: "3.2 MB", date: "2026-09-12" },
      { title: "Ward_Safety_Baseline_Survey_Q3.pdf", size: "1.8 MB", date: "2026-08-29" },
    ],
  },
  {
    id: "sprj-02",
    organizationId: "org-sanef",
    referenceCode: "SAN-PRJ-2026-011",
    title: "Kafanchan Youth Mediation & Vocational Bench",
    category: "Youth Mediation",
    location: "Kafanchan, Southern Kaduna",
    date: "June 2026",
    year: "2026",
    partnerNames: ["Kaduna Peacebuilding Network", "West Africa Civic Fund"],
    photoCount: 11,
    pdfCount: 3,
    status: "Published",
    featured: true,
    summary: "Established a community peer-mediation desk paired with an electronics and solar-maintenance workshop for 318 out-of-school youth.",
    outcomes: "88.4% of Cohort 1–3 graduates placed in local apprenticeships or technical trades; 47 neighborhood disputes resolved without escalation.",
    reports: [
      { title: "Kafanchan_Cohort3_Tracer_Study.pdf", size: "2.4 MB", date: "2026-07-18" },
      { title: "Mediation_Case_Resolution_Summary.pdf", size: "1.1 MB", date: "2026-06-30" },
    ],
  },
  {
    id: "sprj-03",
    organizationId: "org-sanef",
    referenceCode: "SAN-PRJ-2025-029",
    title: "Makoko Waterfront Emergency Radio Watch",
    category: "Community Watch",
    location: "Makoko & Yaba Edge, Lagos",
    date: "November 2025",
    year: "2025",
    partnerNames: ["Lagoon Community Health Initiative", "Lagos Waterways Civic Desk"],
    photoCount: 9,
    pdfCount: 2,
    status: "Published",
    featured: true,
    summary: "Distributed 28 waterproof VHF handsets and trained 42 volunteer jetty wardens to coordinate flood alerts and medical transfers.",
    outcomes: "Average emergency response coordination time fell from 48 minutes to 14 minutes across 6 waterfront jetties.",
    reports: [
      { title: "Makoko_VHF_Net_Evaluation_2025.pdf", size: "2.1 MB", date: "2025-12-10" },
    ],
  },
  {
    id: "sprj-04",
    organizationId: "org-sanef",
    referenceCode: "SAN-PRJ-2025-021",
    title: "Mushin Primary School Safe Crossings Initiative",
    category: "School Safety",
    location: "Idi-Oro & Mushin, Lagos",
    date: "May 2025",
    year: "2025",
    partnerNames: ["Ajeromi-Ifelodun Ward Council", "Safe Routes Africa"],
    photoCount: 16,
    pdfCount: 1,
    status: "Published",
    featured: false,
    summary: "Painted high-visibility zebra crossings, installed solar beacons, and trained 36 parent crossing marshals outside 8 public schools.",
    outcomes: "Zero student traffic injuries reported during school hours across all 8 partner campuses over 12 months.",
    reports: [
      { title: "Mushin_School_Crossing_Impact_2025.pdf", size: "2.9 MB", date: "2025-06-15" },
    ],
  },
  {
    id: "sprj-05",
    organizationId: "org-sanef",
    referenceCode: "SAN-PRJ-2026-019",
    title: "Surulere Market Dusk Lighting Extension (Phase II)",
    category: "Solar Infrastructure",
    location: "Lawanson & Surulere, Lagos",
    date: "November 2026",
    year: "2026",
    partnerNames: ["Lagos Urban Lighting Trust"],
    photoCount: 6,
    pdfCount: 1,
    status: "Draft",
    featured: false,
    summary: "Site mapping and community vendor consultations for 54 additional solar poles around evening produce markets.",
    outcomes: "Baseline vendor lighting survey completed across 180 stalls; procurement scheduled for Q1 2027.",
    reports: [
      { title: "Lawanson_Baseline_Site_Map_Draft.pdf", size: "1.6 MB", date: "2026-11-18" },
    ],
  },
];

export const SANEF_PARTNERSHIPS: SANEFPartnership[] = [
  {
    id: "part-01",
    organizationId: "org-sanef",
    partnerName: "Lagos Urban Lighting Trust",
    partnershipPeriod: "2024 – Present",
    partnershipType: "Technical Partner",
    jointProjects: ["Ajegunle & Orile School Route Solar Lighting Corridor", "Surulere Market Dusk Lighting Extension"],
    contributions: "Supplied municipal photometric specs, pole structural testing, and 40% matching hardware grant.",
    outcomes: "142 poles commissioned with 99.1% uptime over 14 months.",
    status: "Active",
    evidenceCount: 6,
  },
  {
    id: "part-02",
    organizationId: "org-sanef",
    partnerName: "West Africa Civic Fund",
    partnershipPeriod: "2023 – 2026",
    partnershipType: "Funding Partner",
    jointProjects: ["Kafanchan Youth Mediation & Vocational Bench"],
    contributions: "Multi-year institutional grant (₦28.4M) supporting workshop tooling, instructor stipends, and independent tracer audits.",
    outcomes: "318 youth graduates trained and independently audited across 3 cohorts.",
    status: "Active",
    evidenceCount: 5,
  },
  {
    id: "part-03",
    organizationId: "org-sanef",
    partnerName: "Ajeromi-Ifelodun Ward Council",
    partnershipPeriod: "2024 – Present",
    partnershipType: "Municipal Agency",
    jointProjects: ["Ajegunle & Orile School Route Solar Lighting Corridor", "Mushin Primary School Safe Crossings Initiative"],
    contributions: "Right-of-way permits, local ward maintenance custodianship, and school headteacher coordination.",
    outcomes: "Zero pole vandalism reported since local ward custodians assumed stewardship.",
    status: "Active",
    evidenceCount: 4,
  },
  {
    id: "part-04",
    organizationId: "org-sanef",
    partnerName: "Lagoon Community Health Initiative",
    partnershipPeriod: "2025 – 2026",
    partnershipType: "Community Coalition",
    jointProjects: ["Makoko Waterfront Emergency Radio Watch"],
    contributions: "Recruited 42 waterfront volunteer wardens and co-designed emergency boat dispatch protocol.",
    outcomes: "Cut medical transfer alert lag by 70% across six lagoon jetties.",
    status: "Completed",
    evidenceCount: 3,
  },
];

export const CMS_PAGES: CMSPage[] = [
  { id: "pg-s1", organizationId: "org-sanef", slug: "/", title: "Home / Landing Page", template: "Editorial Documentary", status: "Published", lastUpdated: "2026-11-24", updatedBy: "Inimfon Udoh" },
  { id: "pg-s2", organizationId: "org-sanef", slug: "/about", title: "About SANEF & Governance", template: "Institutional Profile", status: "Published", lastUpdated: "2026-11-18", updatedBy: "Fatima Bello" },
  { id: "pg-s3", organizationId: "org-sanef", slug: "/portfolio", title: "Portfolio & Evidence Archive", template: "Structured Archive", status: "Published", lastUpdated: "2026-11-22", updatedBy: "Fatima Bello" },
  { id: "pg-s4", organizationId: "org-sanef", slug: "/partnerships", title: "Partnerships Directory", template: "Partner Index", status: "Published", lastUpdated: "2026-11-15", updatedBy: "Chidinma Nwosu" },
  { id: "pg-s5", organizationId: "org-sanef", slug: "/donate", title: "Donate & Campaign Support", template: "Campaign Ledger", status: "In Review", lastUpdated: "2026-11-23", updatedBy: "Inimfon Udoh" },
  { id: "pg-j1", organizationId: "org-jossyshield", slug: "/", title: "Home / Operations Overview", template: "Corporate Hero", status: "Published", lastUpdated: "2026-11-24", updatedBy: "Inimfon Udoh" },
  { id: "pg-j2", organizationId: "org-jossyshield", slug: "/services", title: "Security, Consultancy & Training", template: "Service Pillars", status: "Published", lastUpdated: "2026-11-20", updatedBy: "Capt. Tunde Bakare" },
  { id: "pg-j3", organizationId: "org-jossyshield", slug: "/marketplace", title: "Marketplace / Request a Service", template: "Dynamic Lead Flow", status: "Published", lastUpdated: "2026-11-24", updatedBy: "Inimfon Udoh" },
  { id: "pg-j4", organizationId: "org-jossyshield", slug: "/careers", title: "Careers & Personnel Talent Pool", template: "Vacancies + Pool", status: "Published", lastUpdated: "2026-11-21", updatedBy: "Evelyn Alabi" },
];

export const BLOG_POSTS: BlogPost[] = [
  { id: "bl-1", organizationId: "org-sanef", refId: "SAN-ART-088", title: "Six Months After Solar Lighting: What Ajegunle Night Audits Actually Show", category: "Field Evidence", author: "Chidinma Nwosu", publishedDate: "2026-11-19", status: "Published", featured: true },
  { id: "bl-2", organizationId: "org-sanef", refId: "SAN-ART-085", title: "How Parent Crossing Marshals Made Eight Mushin School Gates Safer", category: "School Safety", author: "Segun Adebayo", publishedDate: "2026-11-08", status: "Published", featured: false },
  { id: "bl-3", organizationId: "org-sanef", refId: "SAN-ART-082", title: "Inside Kafanchan's Youth Mediation Bench: Cohort 3 Outcomes", category: "Youth Mediation", author: "Musa Abdullahi", publishedDate: "2026-10-27", status: "Published", featured: true },
  { id: "bl-4", organizationId: "org-sanef", refId: "SAN-ART-090", title: "Q4 2026 Public Grant Utilization & Independent Verification Note", category: "Governance", author: "Fatima Bello", publishedDate: "2026-11-26", status: "Review", featured: false },
];

export const EVENTS_DATA: EventRecord[] = [
  { id: "ev-1", organizationId: "org-sanef", refId: "SAN-EVT-041", title: "Lawanson Dusk Lighting Community Townhall", date: "2026-12-06", location: "Surulere Civic Hall, Lagos", type: "Upcoming", registrations: 114, status: "Published" },
  { id: "ev-2", organizationId: "org-sanef", refId: "SAN-EVT-042", title: "2026 Annual Impact & Evidence Briefing", date: "2026-12-14", location: "Yaba Civic Centre & Livestream", type: "Upcoming", registrations: 238, status: "Published" },
  { id: "ev-3", organizationId: "org-sanef", refId: "SAN-EVT-038", title: "Kafanchan Cohort 3 Graduation & Employer Fair", date: "2026-10-18", location: "Kafanchan Mediation Hub, Kaduna", type: "Past", registrations: 192, status: "Completed" },
];

export const DONATIONS_DATA: DonationRecord[] = [
  { id: "don-1", organizationId: "org-sanef", refId: "SAN-DON-2026-1104", donorName: "West Africa Civic Fund", campaign: "Kafanchan Youth Mediation Bench", amount: "₦8,500,000", method: "Institutional Grant", date: "2026-11-21", status: "Verified" },
  { id: "don-2", organizationId: "org-sanef", refId: "SAN-DON-2026-1098", donorName: "Adebayo & Partners LLP", campaign: "Surulere Market Solar Extension", amount: "₦1,250,000", method: "Bank Transfer", date: "2026-11-19", status: "Verified" },
  { id: "don-3", organizationId: "org-sanef", refId: "SAN-DON-2026-1092", donorName: "Ngozi Eze (Monthly Patron)", campaign: "School Route Safe Crossings", amount: "₦150,000", method: "Card Gateway", date: "2026-11-17", status: "Verified" },
  { id: "don-4", organizationId: "org-sanef", refId: "SAN-DON-2026-1089", donorName: "CleanEnergy Urban Trust", campaign: "Ajegunle Corridor Maintenance Fund", amount: "₦3,400,000", method: "Bank Transfer", date: "2026-11-14", status: "Pending Reconciliation" },
];

export const ENQUIRIES_DATA: EnquiryRecord[] = [
  { id: "enq-s1", organizationId: "org-sanef", refId: "SAN-ENQ-2026-0214", senderName: "Folake Adeyemi", organisation: "Alimosho Residents Forum", email: "folake@alimosho.org", channel: "Web Form", subject: "Ward lighting survey request for Egbeda school corridor", receivedDate: "2026-11-23", status: "New", assignedTo: "Chidinma Nwosu", message: "Requesting a field assessment team visit for three unlit secondary school junctions off Egbeda road." },
  { id: "enq-s2", organizationId: "org-sanef", refId: "SAN-ENQ-2026-0209", senderName: "Dr. Samuel Ojo", organisation: "Lagos Civic Research Lab", email: "s.ojo@civiclab.ng", channel: "Email", subject: "Data citation permission for 2026 Ajegunle Lux Audit", receivedDate: "2026-11-20", status: "Responded", assignedTo: "Fatima Bello", message: "Seeking permission to cite the Q3 Ajegunle corridor baseline metrics in our urban infrastructure brief." },
  { id: "enq-j1", organizationId: "org-jossyshield", refId: "JS-ENQ-2026-0142", senderName: "Tunde Fashina", organisation: "Atlantic Cold Chain Ltd", email: "t.fashina@atlanticcold.ng", channel: "WhatsApp", subject: "Weekend perimeter audit quote for Lekki Free Zone depot", receivedDate: "2026-11-24", status: "New", assignedTo: "Ngozi Okafor", message: "Need an urgent security vulnerability review before December cold-storage commissioning." },
  { id: "enq-j2", organizationId: "org-jossyshield", refId: "JS-ENQ-2026-0137", senderName: "Grace Nwoke", organisation: "Harbourview Medical Centre", email: "g.nwoke@harbourview.ng", channel: "Web Form", subject: "Reception conflict de-escalation training for 16 staff", receivedDate: "2026-11-21", status: "Responded", assignedTo: "Capt. Tunde Bakare", message: "Enquiring about half-day on-site de-escalation workshops for hospital front-desk and gate officers." },
];

export const VACANCIES_DATA: VacancyRecord[] = [
  { id: "vac-j1", organizationId: "org-jossyshield", refId: "JS-VAC-044", title: "Convoy & Executive Escort Lead", department: "Field Operations", location: "Victoria Island, Lagos", type: "Full-Time", deadline: "2026-12-12", applicantsCount: 19, status: "Open" },
  { id: "vac-j2", organizationId: "org-jossyshield", refId: "JS-VAC-043", title: "Control Room CCTV & Access Operator", department: "Monitoring Desk", location: "Maitama, Abuja", type: "Shift Roster", deadline: "2026-12-08", applicantsCount: 27, status: "Open" },
  { id: "vac-j3", organizationId: "org-jossyshield", refId: "JS-VAC-041", title: "Corporate Facility Shift Supervisor", department: "Commercial Guarding", location: "Ikeja & VI, Lagos", type: "Full-Time", deadline: "2026-12-18", applicantsCount: 14, status: "Open" },
  { id: "vac-j4", organizationId: "org-jossyshield", refId: "JS-VAC-039", title: "Security Risk Auditor (Consultancy)", department: "Advisory", location: "Port Harcourt / Hybrid", type: "Contract", deadline: "2026-11-30", applicantsCount: 11, status: "Open" },
  { id: "vac-s1", organizationId: "org-sanef", refId: "SAN-VAC-012", title: "Community Field Coordinator (Lagos Mainland)", department: "Programmes", location: "Surulere, Lagos", type: "Full-Time", deadline: "2026-12-15", applicantsCount: 22, status: "Open" },
  { id: "vac-s2", organizationId: "org-sanef", refId: "SAN-VAC-011", title: "Monitoring, Evaluation & Evidence Analyst", department: "Evidence Archive", location: "Yaba, Lagos", type: "Full-Time", deadline: "2026-12-20", applicantsCount: 16, status: "Open" },
];

export const SERVICE_OFFERINGS: ServiceOfferingRecord[] = [
  { id: "srv-1", organizationId: "org-jossyshield", code: "JS-SEC-01", pillar: "Security Services", name: "Static Commercial & Perimeter Guarding", slaStandard: "98.4% Check-In SLA", activeClients: 14, status: "Published" },
  { id: "srv-2", organizationId: "org-jossyshield", code: "JS-SEC-02", pillar: "Security Services", name: "Executive, Bullion & Transit Convoy Escort", slaStandard: "UHF Tracked 24/7", activeClients: 5, status: "Published" },
  { id: "srv-3", organizationId: "org-jossyshield", code: "JS-CON-01", pillar: "Consultancy", name: "Physical Site Risk & Vulnerability Audits", slaStandard: "14-Day Written Report", activeClients: 8, status: "Published" },
  { id: "srv-4", organizationId: "org-jossyshield", code: "JS-CON-02", pillar: "Consultancy", name: "Access Control Architecture & SOP Design", slaStandard: "ISO 27001 Aligned", activeClients: 4, status: "Published" },
  { id: "srv-5", organizationId: "org-jossyshield", code: "JS-TRN-01", pillar: "Training", name: "Guard Certification & De-escalation Drills", slaStandard: "NSCDC Compliant", activeClients: 11, status: "Published" },
  { id: "srv-6", organizationId: "org-jossyshield", code: "JS-TRN-02", pillar: "Training", name: "Corporate Travel & Situational Awareness", slaStandard: "Individual / Cohort", activeClients: 6, status: "Published" },
];

export const TESTIMONIALS_DATA: TestimonialRecord[] = [
  { id: "tst-1", organizationId: "org-jossyshield", refId: "JS-TST-019", clientName: "Bankole Coker", organisation: "Meridian Towers Facilities, VI", category: "Security Services", quote: "Shift handovers run to the minute. Every visitor badge and basement sweep is logged without us having to chase supervisors.", approvedDate: "2026-10-14", status: "Approved" },
  { id: "tst-2", organizationId: "org-jossyshield", refId: "JS-TST-016", clientName: "Kemi Adesina", organisation: "Zenith Diplomatic Advisory, Abuja", category: "Consultancy", quote: "Their physical vulnerability audit uncovered three rear-perimeter blind spots our previous vendor missed for two years.", approvedDate: "2026-09-28", status: "Approved" },
  { id: "tst-3", organizationId: "org-jossyshield", refId: "JS-TST-012", clientName: "Uche Nnamdi", organisation: "Oba Akran Distribution Depot", category: "Training", quote: "Within one week of JossyShield's gatehouse drill, weighbridge manifest discrepancies dropped to zero across all three shifts.", approvedDate: "2026-08-19", status: "Approved" },
];

export const MEDIA_ASSETS: MediaAsset[] = [
  { id: "med-s1", organizationId: "org-sanef", refId: "SAN-MED-401", fileName: "lagos-corridor.jpg", type: "Image", url: "/images/lagos-corridor.jpg", fileSize: "167 KB", uploadedBy: "Chidinma Nwosu", uploadedAt: "2026-11-18", accessScope: "Public" },
  { id: "med-s2", organizationId: "org-sanef", refId: "SAN-MED-402", fileName: "lekki-community.jpg", type: "Image", url: "/images/lekki-community.jpg", fileSize: "191 KB", uploadedBy: "Segun Adebayo", uploadedAt: "2026-11-16", accessScope: "Public" },
  { id: "med-s3", organizationId: "org-sanef", refId: "SAN-MED-403", fileName: "lagos-digital-hub.jpg", type: "Image", url: "/images/lagos-digital-hub.jpg", fileSize: "224 KB", uploadedBy: "Musa Abdullahi", uploadedAt: "2026-11-12", accessScope: "Public" },
  { id: "med-s4", organizationId: "org-sanef", refId: "SAN-MED-404", fileName: "Ajegunle_Corridor_Lux_Audit_2026.pdf", type: "PDF Report", url: "#", fileSize: "3.2 MB", uploadedBy: "Fatima Bello", uploadedAt: "2026-11-10", accessScope: "Public" },
  { id: "med-j1", organizationId: "org-jossyshield", refId: "JS-MED-201", fileName: "guard-shoulder.jpg", type: "Image", url: "/images/guard-shoulder.jpg", fileSize: "236 KB", uploadedBy: "Capt. Tunde Bakare", uploadedAt: "2026-11-19", accessScope: "Public" },
  { id: "med-j2", organizationId: "org-jossyshield", refId: "JS-MED-202", fileName: "gate-checkpoint.jpg", type: "Image", url: "/images/gate-checkpoint.jpg", fileSize: "249 KB", uploadedBy: "Tamuno Briggs", uploadedAt: "2026-11-17", accessScope: "Public" },
  { id: "med-j3", organizationId: "org-jossyshield", refId: "JS-MED-203", fileName: "uhf-radios.jpg", type: "Image", url: "/images/uhf-radios.jpg", fileSize: "341 KB", uploadedBy: "Ngozi Okafor", uploadedAt: "2026-11-14", accessScope: "Public" },
  { id: "med-j4", organizationId: "org-jossyshield", refId: "JS-MED-204", fileName: "Emmanuel_Okafor_CV_2026.pdf", type: "Policy Doc", url: "#", fileSize: "1.4 MB", uploadedBy: "Evelyn Alabi", uploadedAt: "2026-11-18", accessScope: "Restricted (Org Only)" },
];

export const PLATFORM_USERS: PlatformUser[] = [
  { id: "pu-1", name: "Inimfon Udoh", email: "i.udoh@platform.ng", sanefRole: "Super Admin", jossyRole: "Super Admin", lastActive: "2026-11-25 06:18", status: "Active", permissionsSummary: "Full platform administration, org memberships, audit logs" },
  { id: "pu-2", name: "Jane Okonkwo", email: "jane.okonkwo@platform.ng", sanefRole: "Blog Editor", jossyRole: "Recruitment Manager", lastActive: "2026-11-24 18:42", status: "Active", permissionsSummary: "SANEF: blog.create/edit/publish · JossyShield: careers, applications, interviews, talent_pool" },
  { id: "pu-3", name: "Evelyn Alabi", email: "e.alabi@jossyshield.ng", sanefRole: null, jossyRole: "Recruitment Manager", lastActive: "2026-11-24 17:15", status: "Active", permissionsSummary: "JossyShield only: applications.manage, interviews.manage, talent_pool.manage" },
  { id: "pu-4", name: "Fatima Bello", email: "fatima.bello@sanefoundation.org.ng", sanefRole: "SANEF Administrator", jossyRole: null, lastActive: "2026-11-24 16:04", status: "Active", permissionsSummary: "SANEF only: portfolio.manage, partnerships.manage, donations.view, media.upload" },
  { id: "pu-5", name: "Capt. Tunde Bakare", email: "t.bakare@jossyshield.ng", sanefRole: null, jossyRole: "Service Manager", lastActive: "2026-11-24 14:51", status: "Active", permissionsSummary: "JossyShield only: marketplace_requests.manage, services.edit" },
  { id: "pu-6", name: "Chidinma Nwosu", email: "c.nwosu@sanefoundation.org.ng", sanefRole: "Partnerships Manager", jossyRole: null, lastActive: "2026-11-23 19:20", status: "Active", permissionsSummary: "SANEF only: partnerships.manage, projects.edit, events.manage" },
];

export const ACTIVITY_LOGS: ActivityLog[] = [
  { id: "act-j1", organizationId: "org-jossyshield", refId: "JS-REQ-2026-0418", action: "New Security Services request submitted (Apex Maritime Logistics)", module: "Marketplace Requests", actor: "Public Portal", timestamp: "2026-11-24 09:14", severity: "Info" },
  { id: "act-j2", organizationId: "org-jossyshield", refId: "JS-APP-2026-0305", action: "Availability confirmed (Available) in Ready-to-Work Talent Pool", module: "Talent Pool", actor: "Tamuno Briggs", timestamp: "2026-11-24 08:40", severity: "Update" },
  { id: "act-j3", organizationId: "org-jossyshield", refId: "JS-APP-2026-0318", action: "Moved Emmanuel Okafor to Approved / Qualified after field drill", module: "Applications", actor: "Evelyn Alabi", timestamp: "2026-11-23 16:52", severity: "Update" },
  { id: "act-j4", organizationId: "org-jossyshield", refId: "JS-REQ-2026-0415", action: "Consultancy proposal dispatched to Zenith Diplomatic Advisory", module: "Marketplace Requests", actor: "Ibrahim Danjuma", timestamp: "2026-11-23 11:30", severity: "Info" },
  { id: "act-j5", organizationId: "org-jossyshield", refId: "AUD-RBAC-091", action: "Restricted CV downloaded (Emmanuel_Okafor_CV_2026.pdf)", module: "Audit & Security", actor: "Evelyn Alabi", timestamp: "2026-11-23 10:15", severity: "Security" },
  { id: "act-s1", organizationId: "org-sanef", refId: "SAN-ENQ-2026-0214", action: "Ward lighting survey enquiry received from Alimosho Residents Forum", module: "Enquiries", actor: "Public Portal", timestamp: "2026-11-23 15:22", severity: "Info" },
  { id: "act-s2", organizationId: "org-sanef", refId: "SAN-DON-2026-1104", action: "Institutional grant verified (₦8,500,000 — West Africa Civic Fund)", module: "Donations", actor: "Fatima Bello", timestamp: "2026-11-21 14:10", severity: "Update" },
  { id: "act-s3", organizationId: "org-sanef", refId: "SAN-PRJ-2026-014", action: "Attached PDF audit report Ajegunle_Corridor_Lux_Audit_2026.pdf", module: "Projects & Evidence", actor: "Chidinma Nwosu", timestamp: "2026-11-20 11:05", severity: "Update" },
  { id: "act-s4", organizationId: "org-sanef", refId: "SAN-ART-088", action: "Published field report article to SANEF Blog", module: "Blog", actor: "Jane Okonkwo", timestamp: "2026-11-19 16:40", severity: "Info" },
  { id: "act-s5", organizationId: "org-sanef", refId: "AUD-RBAC-088", action: "Verified org-isolation check on SANEF media bucket", module: "Audit & Security", actor: "Inimfon Udoh", timestamp: "2026-11-19 09:00", severity: "Security" },
];

// ==============================================================================
// IN-MEMORY MUTABLE COLLECTIONS
// ==============================================================================

let sanefPartnerships: SANEFPartnership[] = [...SANEF_PARTNERSHIPS];
let eventsData: EventRecord[] = [...EVENTS_DATA];
let vacanciesData: VacancyRecord[] = [...VACANCIES_DATA];
let serviceOfferings: ServiceOfferingRecord[] = [...SERVICE_OFFERINGS];
let testimonialsData: TestimonialRecord[] = [...TESTIMONIALS_DATA];
let blogPosts: BlogPost[] = [...BLOG_POSTS];

// ==============================================================================
// IN-MEMORY API REPOSITORY (Preserves live REST API compatibility)
// ==============================================================================

export const db = {
  // --- SANEF Projects ---
  getSANEFProjects() {
    return sanefProjects;
  },
  createSANEFProject(payload: Partial<SANEFProject>) {
    const created: SANEFProject = {
      id: `sprj-${Date.now()}`,
      organizationId: "org-sanef",
      referenceCode: `SAN-PRJ-2026-0${sanefProjects.length + 20}`,
      title: payload.title || "Untitled Community Project",
      category: payload.category || "Solar Infrastructure",
      location: payload.location || "Lagos",
      date: payload.date || "November 2026",
      year: "2026",
      partnerNames: payload.partnerNames || ["Ajeromi-Ifelodun Ward Council"],
      photoCount: payload.photoCount ?? 4,
      pdfCount: payload.pdfCount ?? 1,
      status: payload.status || "Published",
      featured: Boolean(payload.featured),
      summary: payload.summary || "",
      outcomes: payload.outcomes || "Pending field verification.",
      reports: payload.reports || [{ title: "Initial_Field_Audit_Dossier.pdf", size: "1.4 MB", date: new Date().toISOString().slice(0, 10) }],
    };
    sanefProjects = [created, ...sanefProjects];
    return created;
  },
  updateSANEFProject(id: string, updates: Partial<SANEFProject>) {
    sanefProjects = sanefProjects.map((p) => (p.id === id ? { ...p, ...updates } : p));
    return sanefProjects.find((p) => p.id === id);
  },
  deleteSANEFProject(id: string) {
    const target = sanefProjects.find((p) => p.id === id);
    sanefProjects = sanefProjects.filter((p) => p.id !== id);
    return Boolean(target);
  },

  // --- SANEF Partnerships ---
  getSANEFPartnerships() {
    return sanefPartnerships;
  },
  createSANEFPartnership(payload: Partial<SANEFPartnership>) {
    const created: SANEFPartnership = {
      id: `part-${Date.now()}`,
      organizationId: "org-sanef",
      partnerName: payload.partnerName || "New Strategic Partner",
      partnershipPeriod: payload.partnershipPeriod || "2026 – Present",
      partnershipType: payload.partnershipType || "Technical Partner",
      jointProjects: payload.jointProjects || ["Civic Safety Initiative"],
      contributions: payload.contributions || "Collaboration on community safety development.",
      outcomes: payload.outcomes || "Under active implementation.",
      status: payload.status || "Active",
      evidenceCount: payload.evidenceCount ?? 2,
    };
    sanefPartnerships = [created, ...sanefPartnerships];
    return created;
  },
  updateSANEFPartnership(id: string, updates: Partial<SANEFPartnership>) {
    sanefPartnerships = sanefPartnerships.map((p) => (p.id === id ? { ...p, ...updates } : p));
    return sanefPartnerships.find((p) => p.id === id);
  },
  deleteSANEFPartnership(id: string) {
    const target = sanefPartnerships.find((p) => p.id === id);
    sanefPartnerships = sanefPartnerships.filter((p) => p.id !== id);
    return Boolean(target);
  },

  // --- Events ---
  getEvents(orgId?: string) {
    if (!orgId) return eventsData;
    return eventsData.filter((e) => e.organizationId === orgId);
  },
  createEvent(payload: Partial<EventRecord>) {
    const created: EventRecord = {
      id: `ev-${Date.now()}`,
      organizationId: payload.organizationId || "org-sanef",
      refId: `SAN-EVT-0${eventsData.length + 50}`,
      title: payload.title || "Community Field Event",
      date: payload.date || new Date().toISOString().slice(0, 10),
      location: payload.location || "Lagos, Nigeria",
      type: payload.type || "Upcoming",
      registrations: payload.registrations ?? 0,
      status: payload.status || "Published",
    };
    eventsData = [created, ...eventsData];
    return created;
  },
  updateEvent(id: string, updates: Partial<EventRecord>) {
    eventsData = eventsData.map((e) => (e.id === id ? { ...e, ...updates } : e));
    return eventsData.find((e) => e.id === id);
  },
  deleteEvent(id: string) {
    const target = eventsData.find((e) => e.id === id);
    eventsData = eventsData.filter((e) => e.id !== id);
    return Boolean(target);
  },

  // --- JossyShield Services ---
  getServices(orgId?: string) {
    if (!orgId) return serviceOfferings;
    return serviceOfferings.filter((s) => s.organizationId === orgId);
  },
  createService(payload: Partial<ServiceOfferingRecord>) {
    const pillarCode = payload.pillar === "Security Services" ? "SEC" : payload.pillar === "Consultancy" ? "CON" : "TRN";
    const created: ServiceOfferingRecord = {
      id: `srv-${Date.now()}`,
      organizationId: payload.organizationId || "org-jossyshield",
      code: payload.code || `JS-${pillarCode}-0${serviceOfferings.length + 1}`,
      pillar: payload.pillar || "Security Services",
      name: payload.name || "New Security Service Line",
      slaStandard: payload.slaStandard || "24/7 Shifted Protocol",
      activeClients: payload.activeClients ?? 0,
      status: payload.status || "Published",
    };
    serviceOfferings = [created, ...serviceOfferings];
    return created;
  },
  updateService(id: string, updates: Partial<ServiceOfferingRecord>) {
    serviceOfferings = serviceOfferings.map((s) => (s.id === id ? { ...s, ...updates } : s));
    return serviceOfferings.find((s) => s.id === id);
  },
  deleteService(id: string) {
    const target = serviceOfferings.find((s) => s.id === id);
    serviceOfferings = serviceOfferings.filter((s) => s.id !== id);
    return Boolean(target);
  },

  // --- JossyShield Vacancies / Careers ---
  getVacancies(orgId?: string) {
    if (!orgId) return vacanciesData;
    return vacanciesData.filter((v) => v.organizationId === orgId);
  },
  createVacancy(payload: Partial<VacancyRecord>) {
    const created: VacancyRecord = {
      id: `vac-${Date.now()}`,
      organizationId: payload.organizationId || "org-jossyshield",
      refId: `JS-VAC-0${vacanciesData.length + 50}`,
      title: payload.title || "New Security Personnel Role",
      department: payload.department || "Field Operations",
      location: payload.location || "Lagos Command",
      type: payload.type || "Full-Time",
      deadline: payload.deadline || "2026-12-31",
      applicantsCount: 0,
      status: payload.status || "Open",
    };
    vacanciesData = [created, ...vacanciesData];
    return created;
  },
  updateVacancy(id: string, updates: Partial<VacancyRecord>) {
    vacanciesData = vacanciesData.map((v) => (v.id === id ? { ...v, ...updates } : v));
    return vacanciesData.find((v) => v.id === id);
  },
  deleteVacancy(id: string) {
    const target = vacanciesData.find((v) => v.id === id);
    vacanciesData = vacanciesData.filter((v) => v.id !== id);
    return Boolean(target);
  },

  // --- JossyShield Testimonials ---
  getTestimonials(orgId?: string) {
    if (!orgId) return testimonialsData;
    return testimonialsData.filter((t) => t.organizationId === orgId);
  },
  createTestimonial(payload: Partial<TestimonialRecord>) {
    const created: TestimonialRecord = {
      id: `tst-${Date.now()}`,
      organizationId: payload.organizationId || "org-jossyshield",
      refId: `JS-TST-0${testimonialsData.length + 20}`,
      clientName: payload.clientName || "Corporate Client",
      organisation: payload.organisation || "Commercial Facility",
      category: payload.category || "Security Services",
      quote: payload.quote || "Professional service delivery and exemplary discipline.",
      approvedDate: new Date().toISOString().slice(0, 10),
      status: payload.status || "Approved",
    };
    testimonialsData = [created, ...testimonialsData];
    return created;
  },
  updateTestimonial(id: string, updates: Partial<TestimonialRecord>) {
    testimonialsData = testimonialsData.map((t) => (t.id === id ? { ...t, ...updates } : t));
    return testimonialsData.find((t) => t.id === id);
  },
  deleteTestimonial(id: string) {
    const target = testimonialsData.find((t) => t.id === id);
    testimonialsData = testimonialsData.filter((t) => t.id !== id);
    return Boolean(target);
  },

  // --- Recruitment / Applications ---
  getJobApplications(orgId: string) {
    return jobApplications.filter((a) => a.organizationId === orgId || (orgId === "org-jossyshield" && a.organizationId === "org-jossyshield"));
  },
  updateApplicationStatus(id: string, stage?: RecruitmentStage, noteText?: string) {
    jobApplications = jobApplications.map((app) => {
      if (app.id !== id) return app;
      const nextNotes = noteText
        ? [
            {
              id: `rn-${Date.now()}`,
              author: "Inimfon Udoh",
              timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
              text: noteText,
            },
            ...app.restrictedNotes,
          ]
        : app.restrictedNotes;
      return {
        ...app,
        stage: stage || app.stage,
        inTalentPool: stage === "Talent Pool" ? true : app.inTalentPool,
        restrictedNotes: nextNotes,
      };
    });
    return jobApplications.find((a) => a.id === id);
  },
  deleteJobApplication(id: string) {
    const target = jobApplications.find((a) => a.id === id);
    jobApplications = jobApplications.filter((a) => a.id !== id);
    return Boolean(target);
  },

  // --- Talent Pool ---
  getTalentPool(orgId: string) {
    return talentPool.filter((t) => t.organizationId === orgId || (orgId === "org-jossyshield" && t.organizationId === "org-jossyshield"));
  },
  updateTalentPoolAvailability(id: string, availabilityStatus: PoolAvailability) {
    const today = new Date().toISOString().slice(0, 10);
    talentPool = talentPool.map((p) => {
      if (p.id !== id) return p;
      return {
        ...p,
        availabilityStatus,
        lastConfirmedDate: today,
        contactHistory: [
          {
            id: `ch-${Date.now()}`,
            date: today,
            by: "Inimfon Udoh",
            channel: "Dashboard Confirm",
            note: `Availability updated to ${availabilityStatus}.`,
          },
          ...p.contactHistory,
        ],
      };
    });
    return talentPool.find((p) => p.id === id);
  },
  deleteTalentPoolProfile(id: string) {
    const target = talentPool.find((p) => p.id === id);
    talentPool = talentPool.filter((p) => p.id !== id);
    return Boolean(target);
  },

  // --- Marketplace Requests ---
  getMarketplaceRequests(orgId: string) {
    return marketplaceRequests.filter((r) => r.organizationId === orgId || (orgId === "org-jossyshield" && r.organizationId === "org-jossyshield"));
  },
  updateMarketplaceRequestStatus(id: string, status?: RequestStatus, note?: string) {
    marketplaceRequests = marketplaceRequests.map((r) => {
      if (r.id !== id) return r;
      return {
        ...r,
        status: status || r.status,
        followUpTimeline: note
          ? [
              {
                id: `ft-${Date.now()}`,
                timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
                author: "Inimfon Udoh",
                entry: note,
              },
              ...r.followUpTimeline,
            ]
          : r.followUpTimeline,
      };
    });
    return marketplaceRequests.find((r) => r.id === id);
  },
  deleteMarketplaceRequest(id: string) {
    const target = marketplaceRequests.find((r) => r.id === id);
    marketplaceRequests = marketplaceRequests.filter((r) => r.id !== id);
    return Boolean(target);
  },
};
