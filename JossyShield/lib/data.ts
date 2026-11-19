export interface SecurityService {
  id: string;
  category: 'security' | 'consultancy' | 'training';
  title: string;
  badge: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  specs: { label: string; value: string }[];
  iconName: string;
}

export const SECURITY_SERVICES: SecurityService[] = [
  {
    id: "guarding-patrol",
    category: "security",
    title: "Static Guarding & Armed Patrol Units",
    badge: "Commercial & Industrial",
    shortDesc: "Vetted, military-grade security personnel with 24/7 centralized dispatch and electronic checkpoint verification.",
    fullDesc: "JossyShield provides elite uniformed static guards and rapid response armed escort teams for high-value facilities, corporate offices, and transit convoys. Every officer undergoes rigorous tactical, defensive, and de-escalation vetting.",
    features: [
      "Rigorous background check & biometric clearance",
      "RFID electronic checkpoint wanding & real-time telemetry",
      "Dedicated armed quick response unit (QRF) dispatch",
      "Discreet VIP close protection officers (CPO)"
    ],
    specs: [
      { label: "Deployment Notice", value: "< 24 Hours" },
      { label: "Vetting Standard", value: "Level 4 Military/Police Clear" },
      { label: "Shift Rotations", value: "12h Dedicated / 24h Coverage" }
    ],
    iconName: "Shield"
  },
  {
    id: "corporate-consultancy",
    category: "consultancy",
    title: "Risk Analysis & Threat Assessment",
    badge: "Advisory & Compliance",
    shortDesc: "Comprehensive physical security audits, crisis response planning, and executive vulnerability modeling.",
    fullDesc: "Our senior advisory team diagnoses security vulnerabilities across your physical architecture, supply chain hubs, and personnel protocols to deliver actionable hardening blueprints.",
    features: [
      "Physical facility penetration testing & vulnerability audits",
      "Executive kidnapping & extortion risk profiling",
      "Emergency evacuation & crisis contingency blueprints",
      "Regulatory compliance & safety policy drafting"
    ],
    specs: [
      { label: "Audit Timeline", value: "3 to 7 Business Days" },
      { label: "Report Type", value: "Classified Executive Dossier" },
      { label: "Standards", value: "ISO 27001 / ASIS Certified" }
    ],
    iconName: "Search"
  },
  {
    id: "tactical-training",
    category: "training",
    title: "Tactical Defense & Emergency Readiness",
    badge: "Accredited Academy",
    shortDesc: "High-intensity simulations in crisis de-escalation, defensive driving, tactical first aid, and active threat neutralization.",
    fullDesc: "Certified instruction for in-house security teams, corporate travel executives, and facility personnel, led by seasoned instructors with active field experience.",
    features: [
      "Armed & unarmed close combat de-escalation",
      "Tactical evasive driving & convoy survival maneuvers",
      "Trauma first-aid (Stop-The-Bleed & TCCC certified)",
      "Hostile scenario simulations and hostage reaction drills"
    ],
    specs: [
      { label: "Cohort Size", value: "10 to 30 Candidates" },
      { label: "Certification", value: "JossyShield Tactical Academy" },
      { label: "Venue Options", value: "On-Premise or Tactical Field Range" }
    ],
    iconName: "Award"
  }
];

export const JOSSY_JOBS = [
  {
    id: "job-1",
    title: "Senior Tactical Escort Officer",
    location: "Lagos & Interstate",
    type: "Full-Time",
    experience: "5+ Years",
    requirements: "Valid military/police discharge or certified private security officer badge. Defensive driving license.",
    status: "Active Recruitment"
  },
  {
    id: "job-2",
    title: "CCTV Control Room Surveillance Analyst",
    location: "Abuja HQ",
    type: "Full-Time",
    experience: "3+ Years",
    requirements: "Proficiency in enterprise VMS (Milestone, Hikvision, Avigilon), alarm matrix verification, and incident report drafting.",
    status: "Active Recruitment"
  },
  {
    id: "job-3",
    title: "Corporate Facility Protection Specialist",
    location: "Port Harcourt",
    type: "Full-Time",
    experience: "2+ Years",
    requirements: "Immaculate presentation, crisis communication skills, access-control software literacy, and CPR/First-Aid certificate.",
    status: "Active Recruitment"
  }
];

export const JOSSY_TESTIMONIALS = [
  {
    name: "Tunde Balogun",
    title: "Head of Operations, Apex Freight Logistics",
    quote: "JossyShield secured our 45-acre bonded terminal within 48 hours of engagement. Zero pilferage in 18 months, and their automated guard verification gives us complete peace of mind.",
    rating: 5
  },
  {
    name: "Ngozi Achebe",
    title: "Facility Director, Meridian Towers Victoria Island",
    quote: "Their tactical consultancy overhaul pinpointed access gaps our previous security vendor overlooked for years. Professional, disciplined, and genuinely elite.",
    rating: 5
  },
  {
    name: "David Sterling",
    title: "Regional Security Attache, Global Energy Consortium",
    quote: "The tactical training program conducted for our 60 field drivers dramatically upgraded our convoy defensive readiness. Exceptional instruction standards.",
    rating: 5
  }
];
