export interface ProjectEvidence {
  id: string;
  slug: string;
  title: string;
  category: "Safe Spaces" | "Youth Intervention" | "Community Safety" | "Civic Tech";
  location: string;
  date: string;
  summary: string;
  detailedDescription: string;
  evidenceType: "Audited Report" | "Field Evidence" | "Community Survey" | "Sensor Telemetry";
  downloadFileName: string;
  impactStats: { label: string; value: string }[];
  partners: string[];
  isFeatured: boolean;
  status: "published";
}

export interface Partner {
  id: string;
  name: string;
  type: "Municipal Agency" | "Civic NGO" | "Philanthropic Trust" | "Corporate Security";
  period: string;
  summary: string;
  projectsTogether: string[];
  outcomes: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: "Youth Mediation" | "Community Safety Townhall" | "First-Aid Training" | "Walkway Lighting Launch";
  description: string;
  isUpcoming: boolean;
  registrationOpen: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  category: "Community Safety" | "Field Reports" | "Policy & Advocacy" | "Civic Innovations";
  summary: string;
  contentHtml: string;
  readTime: string;
}

export interface DonationCampaign {
  id: string;
  title: string;
  category: string;
  targetAmount: number;
  raisedAmount: number;
  donorCount: number;
  description: string;
  urgent: boolean;
}

// -----------------------------------------------------------------------------
// SANEF REPOSITORY DATA
// -----------------------------------------------------------------------------
export const SANEF_PROJECTS: ProjectEvidence[] = [
  {
    id: "proj-1",
    slug: "solar-safe-corridors",
    title: "Safe Corridors & Solar Street Lighting Initiative",
    category: "Safe Spaces",
    location: "Ajegunle & Orile Districts, Lagos",
    date: "August 2026",
    summary: "Installation of 140 autonomous anti-vandal solar LED luminaires and pedestrian SOS emergency beacons across vulnerable school routes.",
    detailedDescription: "In partnership with neighborhood councils and municipal authorities, SANEF conducted night-time transit audits identifying pitch-black corridors used by over 65,000 residents daily. The project deployed commercial-grade solar lighting, trained 24 local youth maintenance technicians, and established emergency calling hubs. Independent police precinct logs recorded a 42.8% drop in nocturnal muggings and harassment within 6 months.",
    evidenceType: "Audited Report",
    downloadFileName: "SANEF_Safe_Corridors_Audit_2026.pdf",
    impactStats: [
      { label: "Solar Beacons Installed", value: "140 Units" },
      { label: "Nocturnal Crime Reduction", value: "42.8%" },
      { label: "Pedestrians Protected Daily", value: "65,000+" }
    ],
    partners: ["Lagos State Infrastructure Agency", "CleanEnergy Urban Trust", "JossyShield Technical Advisory"],
    isFeatured: true,
    status: "published"
  },
  {
    id: "proj-2",
    slug: "youth-mediation-hub",
    title: "Youth Peer Mediation & Digital Skills Hub",
    category: "Youth Intervention",
    location: "Kafanchan Community Center, Kaduna",
    date: "May 2026",
    summary: "Grassroots conflict resolution center providing certified mediation circles, trauma counseling, and practical digital literacy for at-risk youth.",
    detailedDescription: "Designed to counter youth vulnerability to gang recruitment and inter-communal friction, the Kafanchan Hub provides a neutral, safe space for non-violent dispute resolution. Through vocational curricula in web design, solar repair, and restorative justice dialogue, 320 at-risk youths have been certified, resolving 184 community disputes peacefully.",
    evidenceType: "Field Evidence",
    downloadFileName: "Youth_Mediation_Impact_Evaluation.pdf",
    impactStats: [
      { label: "Youths Certified", value: "320" },
      { label: "Disputes Mediated", value: "184" },
      { label: "Direct Employment Rate", value: "88%" }
    ],
    partners: ["West African Peace Initiative", "Global Voices Fund"],
    isFeatured: true,
    status: "published"
  },
  {
    id: "proj-3",
    slug: "first-responder-network",
    title: "Neighborhood Watch First-Responder Radio Backbone",
    category: "Community Safety",
    location: "Ibadan South-West, Oyo",
    date: "October 2026",
    summary: "Encrypted VHF handheld radio network connecting 28 voluntary neighborhood security groups directly with emergency medical dispatch.",
    detailedDescription: "High-density residential clusters frequently experience fatal ambulance and response delays. SANEF deployed solar-powered repeater towers and trained 112 voluntary neighborhood first responders in emergency trauma management and coordinated distress dispatch, slashing emergency arrival times from 38 minutes to under 9 minutes.",
    evidenceType: "Audited Report",
    downloadFileName: "SANEF_Radio_Network_Brief.pdf",
    impactStats: [
      { label: "Response Latency Reduction", value: "76%" },
      { label: "Watch Units Integrated", value: "28" },
      { label: "Emergency Interventions", value: "1,420" }
    ],
    partners: ["Federal Road Safety Liaison", "Community Elders Council"],
    isFeatured: false,
    status: "published"
  }
];

export const SANEF_PARTNERS: Partner[] = [
  {
    id: "part-1",
    name: "Lagos State Infrastructure Agency",
    type: "Municipal Agency",
    period: "2024 – Present",
    summary: "Collaborative municipal framework for public lighting grid expansion and right-of-way permitting across high-density communities.",
    projectsTogether: ["Safe Corridors & Solar Street Lighting Initiative"],
    outcomes: "Approved 140 public ground installations and integrated emergency beacons with state dispatch."
  },
  {
    id: "part-2",
    name: "CleanEnergy Urban Trust",
    type: "Philanthropic Trust",
    period: "2025 – Present",
    summary: "Providing grant funding and renewable technology hardware for off-grid community safety installations.",
    projectsTogether: ["Safe Corridors & Solar Street Lighting Initiative"],
    outcomes: "Supplied 140 lithium-iron-phosphate battery solar heads with anti-theft telemetry."
  },
  {
    id: "part-3",
    name: "West African Peace Initiative",
    type: "Civic NGO",
    period: "2023 – Present",
    summary: "Technical curriculum partner for restorative justice, trauma-informed mediation, and community reconciliation forums.",
    projectsTogether: ["Youth Peer Mediation & Digital Skills Hub"],
    outcomes: "Certified 320 community mediators across Northern Nigeria."
  },
  {
    id: "part-4",
    name: "JossyShield Security Services",
    type: "Corporate Security",
    period: "2024 – Present",
    summary: "Corporate technical partner providing voluntary risk assessments, physical security audits, and defensive trainer secondment.",
    projectsTogether: ["Safe Corridors & Solar Street Lighting Initiative", "First-Responder Network"],
    outcomes: "Conducted 12 free neighborhood vulnerability mapping surveys and trained first-responders."
  }
];

export const SANEF_EVENTS: CommunityEvent[] = [
  {
    id: "event-1",
    title: "Ajegunle Community Safety & Lighting Townhall",
    date: "December 5, 2026",
    time: "10:00 AM – 1:30 PM",
    location: "Ajeromi-Ifelodun Local Government Hall, Lagos",
    category: "Community Safety Townhall",
    description: "Community feedback forum reviewing 6-month nocturnal crime telemetry and voting on priority zones for Phase 2 solar beacon expansion.",
    isUpcoming: true,
    registrationOpen: true
  },
  {
    id: "event-2",
    title: "Trauma First-Aid & Stop-The-Bleed Workshop",
    date: "December 18, 2026",
    time: "9:00 AM – 3:00 PM",
    location: "Kafanchan Peace Center, Kaduna",
    category: "First-Aid Training",
    description: "Hands-on emergency medical certification for voluntary neighborhood watch members and community market leaders.",
    isUpcoming: true,
    registrationOpen: true
  },
  {
    id: "event-3",
    title: "Ibadan South-West Radio Dispatch Handover Ceremony",
    date: "October 12, 2026",
    time: "11:00 AM – 2:00 PM",
    location: "Ring Road Cultural Center, Ibadan",
    category: "Walkway Lighting Launch",
    description: "Official commissioning and handover of 28 VHF communication radio transceivers to accredited ward safety teams.",
    isUpcoming: false,
    registrationOpen: false
  }
];

export const SANEF_BLOG: BlogPost[] = [
  {
    id: "post-1",
    slug: "lighting-the-dark-pedestrian-safety",
    title: "How 140 Solar Beacons Cut Night-Time Assaults by 42% in Ajegunle",
    date: "November 10, 2026",
    author: "Fatima Bello (Field Research Director)",
    category: "Field Reports",
    summary: "An in-depth empirical analysis of our Safe Corridors intervention, examining crime telemetry, pedestrian transit density, and resident survey feedback.",
    contentHtml: "<p>When street lighting fails, the darkness does not merely create discomfort; it drastically constrains economic freedom and personal security for women, students, and night workers. In this report, we detail the 6-month audited metrics of the Safe Corridors program.</p><p>By combining durable solar luminaires with community ownership circles, SANEF proved that verifiable safety infrastructure can be sustained at a fraction of municipal budget costs.</p>",
    readTime: "5 min read"
  },
  {
    id: "post-2",
    slug: "restorative-justice-over-retribution",
    title: "Why Youth Peer Mediation Outperforms Retributive Policing",
    date: "October 24, 2026",
    author: "Dr. Samuel Adeyemi",
    category: "Policy & Advocacy",
    summary: "Exploring the data behind restorative mediation circles in de-escalating youth gang friction before violence erupts.",
    contentHtml: "<p>Punitive detention often hardens youth offenders rather than remediating the root causes of anti-social behavior. Our Kafanchan Hub demonstrated that peer mediation achieves an 88% sustained desistance rate when combined with tangible digital vocational pathways.</p>",
    readTime: "7 min read"
  }
];

export const SANEF_CAMPAIGNS: DonationCampaign[] = [
  {
    id: "camp-1",
    title: "Solar Safe Corridors Phase 2: 100 More Walkways",
    category: "Infrastructure",
    targetAmount: 25000,
    raisedAmount: 18450,
    donorCount: 214,
    description: "Help us fund 100 additional solar luminaires and pedestrian SOS alarms along vulnerable school transit roads in Orile and Bariga.",
    urgent: true
  },
  {
    id: "camp-2",
    title: "Community Emergency First-Aid Response Kits",
    category: "Medical Dispatch",
    targetAmount: 15000,
    raisedAmount: 9320,
    donorCount: 142,
    description: "Equipping 50 voluntary neighborhood first responders with certified trauma packs, tourniquets, and emergency radios.",
    urgent: false
  }
];
