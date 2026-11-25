// ==============================================================================
// JOSIE SHIELD SECURITY SERVICES — COMMERCIAL OPERATIONS DATA
// ==============================================================================

export type ServiceCategoryKey = "security" | "consultancy" | "training";

export interface ServicePillar {
  key: ServiceCategoryKey;
  code: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  imageCaption: string;
  scopes: string[];
  deliverables: string[];
  idealClients: string;
}

export interface ClientTestimonial {
  id: string;
  quote: string;
  clientName: string;
  role: string;
  organisation: string;
  category: "Security Services" | "Consultancy" | "Training";
  contractDuration: string;
}

export interface SecurityVacancy {
  id: string;
  refId: string;
  title: string;
  department: string;
  location: string;
  roleType: "Full-Time" | "Shift Roster" | "Contract";
  deadline: string;
  experience: string;
  summary: string;
  requirements: string[];
}

export const OPERATIONAL_CREDENTIALS = [
  { label: "Shift Check-In Compliance", value: "98.4%", detail: "Verified across 19 active commercial posts" },
  { label: "Personnel Vetting Standard", value: "3-Tier", detail: "NIN biometric, guarantor & police clearance" },
  { label: "Command Response SLA", value: "< 15 min", detail: "24/7 UHF dispatch across Lagos, Abuja & PH" },
  { label: "Ready-to-Work Talent Pool", value: "38+ Vetted", detail: "Assessed officers cleared for rapid mobilisation" },
];

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    key: "security",
    code: "PILLAR 01 · OPERATIONS",
    title: "Security Services",
    tagline: "Disciplined static guarding, access control, and transit protection.",
    description:
      "Uniformed, vetted commercial officers operating under written post orders, timed shift handovers, and 24/7 supervisory inspections across high-rise, industrial, and maritime facilities.",
    image: "/images/hero-commercial-guard.jpg",
    imageCaption: "Commercial lobby shift supervisor checking credentials · Victoria Island Sector",
    scopes: [
      "24/7 static & perimeter facility guarding",
      "Corporate lobby turnstile & visitor badge control",
      "Industrial warehouse gatehouse & weighbridge manifest audits",
      "Executive, diplomatic & high-value transit convoy escort",
    ],
    deliverables: [
      "Site-specific written Post Orders & escalation matrix",
      "Digital shift check-in logs & weekly client compliance summary",
      "Dedicated Sector Supervisor with unannounced night inspections",
    ],
    idealClients: "Commercial towers, maritime terminals, manufacturing depots, banking vaults, diplomatic residences.",
  },
  {
    key: "consultancy",
    code: "PILLAR 02 · ADVISORY",
    title: "Consultancy Services",
    tagline: "Independent physical risk audits and operational protocol design.",
    description:
      "Structured facility vulnerability assessments, CCTV blind-spot mapping, and corporate security architecture led by senior risk auditors—delivered as actionable written remediation plans.",
    image: "/images/consultancy-site-audit.jpg",
    imageCaption: "Perimeter access audit & CCTV sightline review · Abuja & Lagos",
    scopes: [
      "Comprehensive physical site risk & vulnerability assessments",
      "Access control architecture & visitor screening SOP design",
      "CCTV blind-spot mapping & control room workflow audits",
      "Emergency evacuation, muster & crisis continuity planning",
    ],
    deliverables: [
      "14-day written Vulnerability & Risk Remediation Report",
      "Prioritised capital vs. procedural mitigation matrix",
      "Board-ready executive briefing & 90-day implementation review",
    ],
    idealClients: "Facility directors, corporate campuses, diplomatic missions, hospitals, logistics hubs.",
  },
  {
    key: "training",
    code: "PILLAR 03 · ACADEMY",
    title: "Training Services",
    tagline: "Practical certification drills for security teams and corporate staff.",
    description:
      "Scenario-based instruction for in-house guard units, corporate reception personnel, and travelling executives—combining conflict de-escalation, access discipline, and emergency first response.",
    image: "/images/training-operations-drill.jpg",
    imageCaption: "Guard certification & radio dispatch briefing · Ikeja Training Bay",
    scopes: [
      "Commercial guard certification & shift handover discipline",
      "Conflict de-escalation & reception access screening drills",
      "Control room CCTV triage & incident documentation standards",
      "Individual & corporate travel situational awareness workshops",
    ],
    deliverables: [
      "Hands-on practical drills with individual competency scoring",
      "Certificate of completion aligned with NSCDC private guard standards",
      "Post-training assessment report for corporate HR & security leads",
    ],
    idealClients: "Organisations with in-house security teams, hotel & hospital front desks, travelling executives, individual applicants.",
  },
];

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: "t-1",
    quote:
      "Shift handovers at Meridian Towers run to the minute. Every contractor badge, basement sweep, and generator fuel lock is logged cleanly without our facilities team having to chase supervisors.",
    clientName: "Bankole Coker",
    role: "Director of Facilities",
    organisation: "Meridian Towers VI, Lagos",
    category: "Security Services",
    contractDuration: "24-Month Contract",
  },
  {
    id: "t-2",
    quote:
      "Their physical risk audit identified three rear-perimeter camera blind spots and an unlogged vendor delivery gate our previous provider missed for two years. The remediation roadmap was clear and immediate.",
    clientName: "Kemi Adesina",
    role: "Head of Operations",
    organisation: "Zenith Diplomatic Advisory, Abuja",
    category: "Consultancy",
    contractDuration: "14-Day Site Audit",
  },
  {
    id: "t-3",
    quote:
      "Within ten days of Josie Shield's gatehouse protocol drill, weighbridge manifest discrepancies across our three depot shifts dropped to zero. Practical training with zero classroom fluff.",
    clientName: "Uche Nnamdi",
    role: "Depot Logistics Manager",
    organisation: "Oba Akran Distribution Yard, Ikeja",
    category: "Training",
    contractDuration: "24-Staff Cohort",
  },
];

export const SECURITY_VACANCIES: SecurityVacancy[] = [
  {
    id: "vac-1",
    refId: "JS-VAC-044",
    title: "Convoy & Executive Escort Lead",
    department: "Field Operations",
    location: "Victoria Island, Lagos",
    roleType: "Full-Time",
    deadline: "12 Dec 2026",
    experience: "5+ years commercial escort or military police",
    summary:
      "Lead daytime high-value transit escorts and executive route reconnaissance across Victoria Island, Ikoyi, and Lagos Mainland corridors.",
    requirements: [
      "Valid commercial defensive driving qualification and clean record.",
      "Demonstrated experience with UHF/VHF radio check-in procedures.",
      "Pass full NIN biometric, guarantor, and police character vetting.",
    ],
  },
  {
    id: "vac-2",
    refId: "JS-VAC-043",
    title: "Control Room CCTV & Access Operator",
    department: "Monitoring & Dispatch",
    location: "Maitama, Abuja",
    roleType: "Shift Roster",
    deadline: "08 Dec 2026",
    experience: "3+ years VMS / CCTV control desk",
    summary:
      "Monitor multi-zone IP camera arrays, triage access alarms, and maintain exact timestamped incident logs across diplomatic client compounds.",
    requirements: [
      "Hands-on proficiency with Hikvision or Milestone VMS platforms.",
      "Clear written English for incident escalation and shift handover logs.",
      "Available for structured 12-hour day/night rotation.",
    ],
  },
  {
    id: "vac-3",
    refId: "JS-VAC-041",
    title: "Corporate Facility Shift Supervisor",
    department: "Commercial Guarding",
    location: "Ikeja & Victoria Island, Lagos",
    roleType: "Full-Time",
    deadline: "18 Dec 2026",
    experience: "5+ years supervising 10+ static guards",
    summary:
      "Oversee daily parade inspections, relief punctuality, visitor access discipline, and client SLA reporting across commercial office towers.",
    requirements: [
      "Proven leadership of multi-shift guarding rosters with high attendance.",
      "Certified fire warden and basic trauma first-aid competence.",
      "Strong client communication and incident documentation rigour.",
    ],
  },
  {
    id: "vac-4",
    refId: "JS-VAC-039",
    title: "Security Risk Auditor (Consultancy)",
    department: "Advisory Practice",
    location: "Port Harcourt / Hybrid",
    roleType: "Contract",
    deadline: "30 Nov 2026",
    experience: "5+ years physical security auditing",
    summary:
      "Conduct on-site physical vulnerability inspections for maritime terminals and industrial depots, producing board-ready remediation reports.",
    requirements: [
      "ISPS Code, CPP/PSP, or ISO 27001 physical controls familiarity.",
      "Track record delivering written site vulnerability assessments.",
      "Ability to travel across Rivers, Lagos, and FCT client sites.",
    ],
  },
];
