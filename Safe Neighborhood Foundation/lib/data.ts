// ==============================================================================
// SAFE NEIGHBORHOOD FOUNDATION (SANEF) — DOCUMENTARY ARCHIVE & EDITORIAL DATA
// ==============================================================================

export interface EvidenceReport {
  id: string;
  title: string;
  fileName: string;
  fileSize: string;
  publishedDate: string;
  type: "PDF Report" | "Dataset Brief" | "External Press";
  href: string;
}

export interface SANEFProjectRecord {
  slug: string;
  refId: string;
  title: string;
  category: "Solar Corridors" | "Youth Mediation" | "School Safety" | "Community Watch";
  location: string;
  date: string;
  year: string;
  summary: string;
  detailedDescription: string;
  outcomesSummary: string;
  outcomesMetrics: { label: string; value: string }[];
  partners: string[];
  coverImage: string;
  coverCaption: string;
  gallery: { src: string; caption: string }[];
  photoCount: number;
  pdfCount: number;
  reports: EvidenceReport[];
  featured: boolean;
}

export interface PartnerProfile {
  slug: string;
  name: string;
  monogram: string;
  partnershipPeriod: string;
  partnershipType: "Technical Partner" | "Funding Partner" | "Municipal Agency" | "Community Coalition";
  website: string;
  overview: string;
  jointProjects: { title: string; slug: string }[];
  sanefContribution: string;
  partnerContribution: string;
  outcomesSummary: string;
  linkedEvidence: { title: string; meta: string; href: string }[];
}

export interface BlogArticle {
  slug: string;
  title: string;
  category: "Field Evidence" | "School Safety" | "Youth Mediation" | "Governance";
  publishedDate: string;
  readTime: string;
  author: string;
  authorRole: string;
  coverImage: string;
  coverCaption: string;
  excerpt: string;
  body: string[];
  featured: boolean;
}

export interface CommunityEvent {
  id: string;
  day: string;
  month: string;
  year: string;
  fullDate: string;
  title: string;
  location: string;
  status: "Upcoming" | "Past";
  category: string;
  description: string;
  registrationLabel: string;
}

export interface SANEFVacancy {
  id: string;
  refId: string;
  title: string;
  department: string;
  location: string;
  contractType: string;
  deadline: string;
  summary: string;
  requirements: string[];
}

export interface DonationCampaign {
  id: string;
  code: string;
  title: string;
  location: string;
  raisedNaira: number;
  targetNaira: number;
  raisedFormatted: string;
  targetFormatted: string;
  supporters: number;
  summary: string;
  allocationNote: string;
}

export const VERIFIED_IMPACT_STATS = [
  { value: "142", label: "Solar street poles active across 4 wards", note: "99.1% verified uptime" },
  { value: "64,850", label: "Residents using lit evening school corridors", note: "Q3 2026 pedestrian audit" },
  { value: "318", label: "Youth trained in mediation & technical trades", note: "88.4% placed in work" },
  { value: "-42.8%", label: "Recorded decline in dusk corridor incidents", note: "Ajegunle & Orile logs" },
];

export const SANEF_PROJECTS: SANEFProjectRecord[] = [
  {
    slug: "ajegunle-orile-solar-corridor",
    refId: "SAN-PRJ-2026-014",
    title: "Ajegunle & Orile School Route Solar Lighting Corridor",
    category: "Solar Corridors",
    location: "Ajegunle & Orile Iganmu, Lagos",
    date: "August 2026",
    year: "2026",
    summary:
      "Commissioned 142 tamper-resistant solar LED street poles along 4.6 km of evening student walkways and market return lanes.",
    detailedDescription:
      "Between February and August 2026, SANEF engineers and Ajeromi-Ifelodun ward safety committees mapped 19 unlit bottlenecks used daily by evening-shift students, nurses, and market women. Each galvanized pole carries sealed lithium-iron batteries rated for 48 hours of overcast autonomy and is registered to a named street custodian.",
    outcomesSummary:
      "Six-month post-commissioning ward safety logs documented a 42.8% drop in after-dark street incidents across the corridor, while evening retail hours extended by an average of 95 minutes.",
    outcomesMetrics: [
      { label: "Commissioned Solar Poles", value: "142 units" },
      { label: "Dusk Incident Reduction", value: "-42.8%" },
      { label: "Weekly Corridor Footfall", value: "64,850" },
    ],
    partners: ["Lagos Urban Lighting Trust", "Ajeromi-Ifelodun Ward Council"],
    coverImage: "/images/ajegunle-solar-dusk.jpg",
    coverCaption: "Boundary Road school route after dusk solar commissioning · Lagos, 2026",
    gallery: [
      { src: "/images/ajegunle-lux-check.jpg", caption: "Evening light-meter verification with street custodians along Boundary Road." },
      { src: "/images/solar-committee.jpg", caption: "Ward maintenance committee inspecting battery charge controllers." },
      { src: "/images/lit-night-road.jpg", caption: "Post-installation street illumination at 20:45 WAT." },
      { src: "/images/evening-market-solar.jpg", caption: "Evening produce traders operating safely past sunset under solar street poles." },
    ],
    photoCount: 14,
    pdfCount: 2,
    reports: [
      {
        id: "rep-1",
        title: "Ajegunle Corridor Photometric & Incident Audit (Q3 2026)",
        fileName: "Ajegunle_Corridor_Lux_Audit_2026.pdf",
        fileSize: "3.2 MB",
        publishedDate: "12 Sep 2026",
        type: "PDF Report",
        href: "#report-ajegunle-lux",
      },
      {
        id: "rep-2",
        title: "Ward Baseline Safety Survey & Custodian Register",
        fileName: "Ward_Safety_Baseline_Survey_Q3.pdf",
        fileSize: "1.8 MB",
        publishedDate: "29 Aug 2026",
        type: "PDF Report",
        href: "#report-ward-baseline",
      },
      {
        id: "rep-3",
        title: "Lagos Civic Review: How Street Custodians Keep Solar Corridors Working",
        fileName: "lagoscivicreview.ng/ajegunle-solar-2026",
        fileSize: "External Article",
        publishedDate: "04 Oct 2026",
        type: "External Press",
        href: "https://example.org/lagos-civic-review",
      },
    ],
    featured: true,
  },
  {
    slug: "kafanchan-youth-mediation-bench",
    refId: "SAN-PRJ-2026-011",
    title: "Kafanchan Youth Mediation & Vocational Bench",
    category: "Youth Mediation",
    location: "Kafanchan, Southern Kaduna",
    date: "June 2026",
    year: "2026",
    summary:
      "Paired a community peer-mediation desk with a practical solar-electronics and mobile-repair workshop for 318 young adults.",
    detailedDescription:
      "Operating six days a week in Kafanchan, the centre trains young men and women from neighbouring wards in both non-violent community dispute mediation and high-demand electrical diagnostics. Graduates receive starter toolkits and six months of apprenticeship placement tracking.",
    outcomesSummary:
      "Independent Cohort 1–3 tracer audits confirmed 88.4% of graduates are actively earning in local workshops or technical colleges, with 47 local neighborhood disputes settled constructively.",
    outcomesMetrics: [
      { label: "Graduates Placed", value: "281 / 318" },
      { label: "Mediated Cases Resolved", value: "47 disputes" },
      { label: "Cohort Retention Rate", value: "94.6%" },
    ],
    partners: ["West Africa Civic Fund", "Kaduna Peacebuilding Network"],
    coverImage: "/images/kafanchan-workshop-bench.jpg",
    coverCaption: "Cohort 3 practical solar-electronics diagnostics bench · Kafanchan, 2026",
    gallery: [
      { src: "/images/kafanchan-workshop-bench.jpg", caption: "Vocational workshop morning diagnostics session." },
      { src: "/images/classroom-full.jpg", caption: "Peer-mediation roleplay and civic facilitation class." },
      { src: "/images/classroom-student.jpg", caption: "Practical circuit testing before toolkit certification." },
    ],
    photoCount: 11,
    pdfCount: 3,
    reports: [
      {
        id: "rep-4",
        title: "Kafanchan Cohort 1–3 Independent Tracer Study",
        fileName: "Kafanchan_Cohort3_Tracer_Study.pdf",
        fileSize: "2.4 MB",
        publishedDate: "18 Jul 2026",
        type: "PDF Report",
        href: "#report-kafanchan-tracer",
      },
      {
        id: "rep-5",
        title: "Community Mediation Case Resolution Ledger (Anonymised)",
        fileName: "Mediation_Case_Resolution_Summary.pdf",
        fileSize: "1.1 MB",
        publishedDate: "30 Jun 2026",
        type: "PDF Report",
        href: "#report-mediation-ledger",
      },
      {
        id: "rep-6",
        title: "Northern Civic Weekly: Vocational Benches Reducing Street Tension",
        fileName: "northerncivic.ng/kafanchan-bench",
        fileSize: "External Article",
        publishedDate: "11 Aug 2026",
        type: "External Press",
        href: "https://example.org/northern-civic",
      },
    ],
    featured: true,
  },
  {
    slug: "mushin-primary-school-safe-crossings",
    refId: "SAN-PRJ-2025-021",
    title: "Mushin Primary School Safe Crossings Initiative",
    category: "School Safety",
    location: "Idi-Oro & Mushin, Lagos",
    date: "May 2025",
    year: "2025",
    summary:
      "Installed reflective pedestrian crossings, flashing solar beacons, and trained 36 parent marshals across eight public primary schools.",
    detailedDescription:
      "Responding to recurring morning rush-hour collisions along Mushin arterial roads, SANEF worked with school headteachers, parent associations, and ward engineers to redesign eight school gates with high-contrast thermoplastic markings and supervised dismissal schedules.",
    outcomesSummary:
      "Twelve consecutive months of school-gate safety logs recorded zero student traffic injuries during arrival and dismissal windows across all eight participating schools.",
    outcomesMetrics: [
      { label: "Protected School Gates", value: "8 campuses" },
      { label: "Trained Parent Marshals", value: "36 volunteers" },
      { label: "12-Month Student Injuries", value: "0 recorded" },
    ],
    partners: ["Ajeromi-Ifelodun Ward Council", "Safe Routes Africa"],
    coverImage: "/images/school-assembly.jpg",
    coverCaption: "Morning safety briefing with pupils and parent marshals · Mushin, 2025",
    gallery: [
      { src: "/images/school-assembly.jpg", caption: "Term-opening road safety orientation with students." },
      { src: "/images/schoolboys-uniform.jpg", caption: "Supervised afternoon dismissal across marked crossings." },
      { src: "/images/neighborhood-children.jpg", caption: "Community walk-to-school route inspection." },
    ],
    photoCount: 16,
    pdfCount: 1,
    reports: [
      {
        id: "rep-7",
        title: "Mushin 8-School Crossing Impact & Compliance Report",
        fileName: "Mushin_School_Crossing_Impact_2025.pdf",
        fileSize: "2.9 MB",
        publishedDate: "15 Jun 2025",
        type: "PDF Report",
        href: "#report-mushin-crossings",
      },
    ],
    featured: true,
  },
  {
    slug: "makoko-waterfront-emergency-radio",
    refId: "SAN-PRJ-2025-029",
    title: "Makoko Waterfront Emergency Radio Watch",
    category: "Community Watch",
    location: "Makoko & Yaba Edge, Lagos",
    date: "November 2025",
    year: "2025",
    summary:
      "Equipped 42 volunteer jetty wardens with 28 waterproof VHF handsets for flood warnings and night medical boat coordination.",
    detailedDescription:
      "Cellular dead zones during heavy lagoon storms previously delayed night medical transfers and flood alerts in Makoko. SANEF supplied licensed community-band waterproof handsets, solar charging cradles, and a shared escalation roster with mainland clinics.",
    outcomesSummary:
      "Average emergency boat dispatch and clinic pre-alert time dropped from 48 minutes to 14 minutes across six participating waterfront jetties.",
    outcomesMetrics: [
      { label: "VHF Handsets Active", value: "28 units" },
      { label: "Trained Jetty Wardens", value: "42 volunteers" },
      { label: "Avg Alert Coordination", value: "14 mins" },
    ],
    partners: ["Lagoon Community Health Initiative", "Lagos Waterways Civic Desk"],
    coverImage: "/images/makoko-waterfront-radio.jpg",
    coverCaption: "Volunteer jetty wardens testing waterproof VHF emergency handsets · Makoko, 2025",
    gallery: [
      { src: "/images/makoko-waterfront-radio.jpg", caption: "Golden-hour VHF radio net check along Makoko waterfront jetty." },
      { src: "/images/market-walkway.jpg", caption: "Waterfront clinic transfer staging walkway." },
    ],
    photoCount: 9,
    pdfCount: 2,
    reports: [
      {
        id: "rep-8",
        title: "Makoko VHF Watch Net 12-Month Evaluation",
        fileName: "Makoko_VHF_Net_Evaluation_2025.pdf",
        fileSize: "2.1 MB",
        publishedDate: "10 Dec 2025",
        type: "PDF Report",
        href: "#report-makoko-vhf",
      },
    ],
    featured: false,
  },
];

export const SANEF_PARTNERS: PartnerProfile[] = [
  {
    slug: "lagos-urban-lighting-trust",
    name: "Lagos Urban Lighting Trust",
    monogram: "LULT",
    partnershipPeriod: "2024 – Present",
    partnershipType: "Technical Partner",
    website: "urbanlightingtrust.ng",
    overview:
      "An independent municipal engineering trust advancing resilient off-grid street lighting standards across high-density urban wards.",
    jointProjects: [
      { title: "Ajegunle & Orile School Route Solar Lighting Corridor", slug: "ajegunle-orile-solar-corridor" },
    ],
    sanefContribution:
      "Community route mapping, resident custodian training, post-installation dusk incident auditing, and public reporting.",
    partnerContribution:
      "Photometric engineering specifications, structural wind-load verification, and 40% matching luminaire procurement grant.",
    outcomesSummary:
      "142 solar poles commissioned on schedule with 99.1% verified operational uptime over 14 months.",
    linkedEvidence: [
      { title: "Ajegunle Corridor Photometric Audit (PDF · 3.2 MB)", meta: "Sep 2026", href: "/portfolio?project=ajegunle-orile-solar-corridor" },
      { title: "Field Note: Six Months After Solar Lighting", meta: "Nov 2026", href: "/blog/six-months-after-solar-lighting" },
    ],
  },
  {
    slug: "west-africa-civic-fund",
    name: "West Africa Civic Fund",
    monogram: "WACF",
    partnershipPeriod: "2023 – 2026",
    partnershipType: "Funding Partner",
    website: "wacivicfund.org",
    overview:
      "Regional philanthropic foundation backing community-led conflict prevention, youth vocational transition, and transparent civic infrastructure.",
    jointProjects: [
      { title: "Kafanchan Youth Mediation & Vocational Bench", slug: "kafanchan-youth-mediation-bench" },
    ],
    sanefContribution:
      "Centre operations, local mediator mentorship, vocational curriculum delivery, and quarterly open-ledger financial reporting.",
    partnerContribution:
      "₦28.4M multi-year institutional grant covering workshop benches, diagnostic tooling, and third-party tracer evaluations.",
    outcomesSummary:
      "318 young adults trained across three cohorts with 88.4% verified economic placement within six months of graduation.",
    linkedEvidence: [
      { title: "Kafanchan Cohort 1–3 Independent Tracer Study (PDF · 2.4 MB)", meta: "Jul 2026", href: "/portfolio?project=kafanchan-youth-mediation-bench" },
      { title: "Inside Kafanchan's Youth Mediation Bench", meta: "Oct 2026", href: "/blog/kafanchan-youth-mediation-outcomes" },
    ],
  },
  {
    slug: "ajeromi-ifelodun-ward-council",
    name: "Ajeromi-Ifelodun Ward Council",
    monogram: "AIWC",
    partnershipPeriod: "2024 – Present",
    partnershipType: "Municipal Agency",
    website: "ajeromi-ward.lg.ng",
    overview:
      "Local municipal authority coordinating public works right-of-way approvals, school headteacher access, and ward maintenance stewardship.",
    jointProjects: [
      { title: "Ajegunle & Orile School Route Solar Lighting Corridor", slug: "ajegunle-orile-solar-corridor" },
      { title: "Mushin Primary School Safe Crossings Initiative", slug: "mushin-primary-school-safe-crossings" },
    ],
    sanefContribution:
      "Equipment financing, road-marking execution, marshal training, and quarterly audit briefs shared with council leadership.",
    partnerContribution:
      "Fast-tracked right-of-way permits, ward custodian appointment, and traffic-warden coordination at eight public schools.",
    outcomesSummary:
      "Zero reported hardware vandalism across 142 poles and zero school-gate student traffic injuries over 12 months.",
    linkedEvidence: [
      { title: "Mushin 8-School Crossing Impact Report (PDF · 2.9 MB)", meta: "Jun 2025", href: "/portfolio?project=mushin-primary-school-safe-crossings" },
    ],
  },
  {
    slug: "lagoon-community-health-initiative",
    name: "Lagoon Community Health Initiative",
    monogram: "LCHI",
    partnershipPeriod: "2025 – 2026",
    partnershipType: "Community Coalition",
    website: "lagoonhealth.org.ng",
    overview:
      "Grassroots coastal health and maternal transfer coalition serving Makoko and surrounding lagoon settlements.",
    jointProjects: [
      { title: "Makoko Waterfront Emergency Radio Watch", slug: "makoko-waterfront-emergency-radio" },
    ],
    sanefContribution:
      "Waterproof VHF radio procurement, solar charging stations, and night alert protocol documentation.",
    partnerContribution:
      "Recruitment of 42 trusted waterfront wardens and direct nurse-triage handover links at mainland clinics.",
    outcomesSummary:
      "Reduced emergency boat transfer coordination delays by 70% across six active lagoon jetties.",
    linkedEvidence: [
      { title: "Makoko VHF Watch Net 12-Month Evaluation (PDF · 2.1 MB)", meta: "Dec 2025", href: "/portfolio?project=makoko-waterfront-emergency-radio" },
    ],
  },
];

export const SANEF_BLOG_POSTS: BlogArticle[] = [
  {
    slug: "six-months-after-solar-lighting",
    title: "Six Months After Solar Lighting: What Ajegunle Night Audits Actually Show",
    category: "Field Evidence",
    publishedDate: "19 Nov 2026",
    readTime: "5 min read",
    author: "Chidinma Nwosu",
    authorRole: "Head of Field Evidence",
    coverImage: "/images/ajegunle-solar-dusk.jpg",
    coverCaption: "Evening photometric check along Boundary Road · Lagos, 2026",
    excerpt:
      "Why assigning named street custodians mattered just as much as lithium battery sizing in keeping 142 solar poles lit through rainy season.",
    body: [
      "When community lighting projects fail in Lagos, the failure rarely happens in the first ninety days. It happens six months later, after the first monsoon squalls test battery enclosures and when nobody on the street owns a wrench or a maintenance phone number.",
      "Before installing a single pole in Ajegunle and Orile Iganmu, SANEF spent six weeks walking the four school routes after 19:00 with residents, evening pharmacy owners, and headteachers. Together we selected 142 pole locations based on real pedestrian choke points rather than main-road visibility.",
      "Every ten poles were paired with a two-person street custodian team trained to read charge-controller LEDs and log outages via SMS. Across 180 days of monitoring, uptime stayed at 99.1% and ward incident ledgers recorded a 42.8% drop in after-dark street thefts.",
      "The full photometric dataset and anonymised ward baseline survey are published as downloadable PDFs in our Portfolio & Evidence Archive so municipal planners and civic peers can inspect the raw methodology.",
    ],
    featured: true,
  },
  {
    slug: "mushin-parent-crossing-marshals",
    title: "How Parent Crossing Marshals Made Eight Mushin School Gates Safer",
    category: "School Safety",
    publishedDate: "08 Nov 2026",
    readTime: "4 min read",
    author: "Segun Adebayo",
    authorRole: "Programme Coordinator",
    coverImage: "/images/school-assembly.jpg",
    coverCaption: "Morning student crossing drill · Mushin, Lagos",
    excerpt:
      "Paint fades quickly without human stewardship. A look at how 36 trained parents transformed morning rush hour outside eight public campuses.",
    body: [
      "High-visibility thermoplastic crossings and flashing solar beacons slow oncoming commercial buses, but they cannot hold back an impatient lane-changer on their own. That gap is where parent marshals stepped in.",
      "Working alongside the Ajeromi-Ifelodun Ward Council and eight primary school headteachers, SANEF trained 36 parent volunteers in high-visibility whistle protocols, staggered 15-minute dismissal waves, and monthly incident logging.",
      "Over twelve months of school terms, zero student traffic injuries occurred during arrival or dismissal hours across all eight gates—down from eleven recorded near-misses and three hospitalizations the previous academic year.",
    ],
    featured: false,
  },
  {
    slug: "kafanchan-youth-mediation-outcomes",
    title: "Inside Kafanchan's Youth Mediation Bench: Cohort 3 Outcomes",
    category: "Youth Mediation",
    publishedDate: "27 Oct 2026",
    readTime: "6 min read",
    author: "Musa Abdullahi",
    authorRole: "Kafanchan Centre Lead",
    coverImage: "/images/kafanchan-workshop-bench.jpg",
    coverCaption: "Solar inverter troubleshooting workshop · Kafanchan, 2026",
    excerpt:
      "Combining peer dispute resolution with practical solar-electronics skills gave 318 young adults both local credibility and steady income.",
    body: [
      "Youth peacebuilding workshops often lose momentum once participants walk out of the seminar hall back into unemployment. In Kafanchan, we designed the mediation desk and the technical workshop under the exact same roof.",
      "Each morning, cohorts practice inverter repair, DC wiring, and battery diagnostics. Each afternoon, senior mediators guide small-group restorative sessions addressing neighborhood friction before it reaches formal police dockets.",
      "Our independent tracer study for Cohorts 1 through 3 shows 88.4% of graduates now earn consistently in local workshops or solar installation crews, while 47 neighborhood disputes have been peacefully settled.",
    ],
    featured: true,
  },
];

export const SANEF_EVENTS: CommunityEvent[] = [
  {
    id: "evt-1",
    day: "06",
    month: "DEC",
    year: "2026",
    fullDate: "06 Dec 2026 · 10:00 WAT",
    title: "Lawanson Dusk Lighting Community Townhall",
    location: "Surulere Civic Hall, Lagos",
    status: "Upcoming",
    category: "Community Consultation",
    description:
      "Open route-mapping session with Lawanson market traders, school principals, and ward engineers ahead of Phase II solar pole placement.",
    registrationLabel: "Register Attendance",
  },
  {
    id: "evt-2",
    day: "14",
    month: "DEC",
    year: "2026",
    fullDate: "14 Dec 2026 · 14:00 WAT",
    title: "2026 Annual Impact & Evidence Briefing",
    location: "Yaba Civic Centre & Public Livestream",
    status: "Upcoming",
    category: "Annual Report",
    description:
      "Public release of SANEF's 2026 audited financial statement, photometric field audits, and 2027 municipal ward roadmap.",
    registrationLabel: "Reserve Seat",
  },
  {
    id: "evt-3",
    day: "18",
    month: "OCT",
    year: "2026",
    fullDate: "18 Oct 2026",
    title: "Kafanchan Cohort 3 Graduation & Employer Fair",
    location: "Kafanchan Mediation Hub, Kaduna",
    status: "Past",
    category: "Youth Mediation",
    description:
      "108 graduates received starter diagnostics toolkits and interviewed with 14 regional solar and electrical employers.",
    registrationLabel: "View Event Summary",
  },
];

export const SANEF_VACANCIES: SANEFVacancy[] = [
  {
    id: "svac-1",
    refId: "SAN-VAC-012",
    title: "Community Field Coordinator (Lagos Mainland)",
    department: "Programmes & Infrastructure",
    location: "Surulere, Lagos (Field-based)",
    contractType: "Full-Time",
    deadline: "15 Dec 2026",
    summary:
      "Lead ward consultations, street-custodian onboarding, and monthly uptime inspections across Lagos solar corridor sites.",
    requirements: [
      "3+ years managing community infrastructure or municipal liaison programmes.",
      "Demonstrated experience conducting resident surveys and maintaining field audit logs.",
      "Fluency in English and Yoruba or Pidgin; comfort working dusk site checks.",
    ],
  },
  {
    id: "svac-2",
    refId: "SAN-VAC-011",
    title: "Monitoring, Evaluation & Evidence Analyst",
    department: "Evidence Archive",
    location: "Yaba, Lagos (Hybrid)",
    contractType: "Full-Time",
    deadline: "20 Dec 2026",
    summary:
      "Design baseline safety surveys, verify partner impact data, and compile downloadable PDF audit briefs for public transparency.",
    requirements: [
      "Degree in Statistics, Urban Planning, Public Policy, or related quantitative field.",
      "Strong data hygiene and ability to write clear, jargon-free humanitarian reports.",
      "Experience with ethical data anonymisation for community incident records.",
    ],
  },
];

export const SANEF_CAMPAIGNS: DonationCampaign[] = [
  {
    id: "camp-1",
    code: "SAN-CMP-2026-01",
    title: "Surulere Market Dusk Lighting Extension (54 Solar Poles)",
    location: "Lawanson & Surulere, Lagos",
    raisedNaira: 12450000,
    targetNaira: 18600000,
    raisedFormatted: "₦12,450,000",
    targetFormatted: "₦18,600,000",
    supporters: 148,
    summary:
      "Funds 54 galvanized solar LED street poles and custodian toolkits covering three evening market walkways and two secondary school exits.",
    allocationNote: "89% hardware & installation · 7% independent audit · 4% custodian maintenance reserve.",
  },
  {
    id: "camp-2",
    code: "SAN-CMP-2026-02",
    title: "Kafanchan Cohort 4 Youth Starter Toolkits",
    location: "Kafanchan, Southern Kaduna",
    raisedNaira: 6820000,
    targetNaira: 9500000,
    raisedFormatted: "₦6,820,000",
    targetFormatted: "₦9,500,000",
    supporters: 92,
    summary:
      "Equips 110 incoming youth mediation and solar-electronics apprentices with multimeters, insulated hand tools, and safety gear.",
    allocationNote: "92% direct trainee toolkits & bench consumables · 8% external tracer audit.",
  },
];

export const SANEF_TESTIMONIALS = [
  {
    quote:
      "Before the Boundary Road poles went up, I shut my clinic dispensary at 18:15 every evening. Now mothers walk past safely past 20:30, and our street custodian checks the lights every Friday.",
    author: "Matron Grace Olatunji",
    role: "Community Health Dispenser, Ajegunle Ward",
  },
  {
    quote:
      "SANEF publishes the actual light-meter readings and custodian logs instead of promotional brochures. That transparency made our board approve a second multi-year grant.",
    author: "Dr. Ibrahim Sule",
    role: "Programme Director, West Africa Civic Fund",
  },
];
