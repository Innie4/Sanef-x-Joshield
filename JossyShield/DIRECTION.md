# JossyShield — Design Direction (`DIRECTION.md`)

## Step 0: The Brief (Self-Authored)

1. **What is the product, and who is it for?**
   JossyShield is a Nigerian commercial security firm operating standing facility guard posts, inter-state convoy escorts, physical vulnerability audits, and a guard training academy across Lagos, Abuja, and Port Harcourt. It serves two audiences:
   - **Commercial & institutional clients** (warehouse managers, residential estate committees, bank operations heads, energy logistics coordinators) who need to price, configure, and request vetted guards without waiting days for a callback.
   - **Professional security guards and supervisors** applying to enter the background-checked deployment roster.
2. **The core action (first ten seconds):**
   Select a facility zone and service discipline, see the exact number of cleared officers on standby in that sector with their watch commander and response time, adjust the headcount and shift pattern, and issue a binding service requisition with an immediate tracking reference (`JS-REQ-10492`).
3. **Three words for how it should feel & three non-app references:**
   - **Feel:** Exact, accountable, calm.
   - **Outside-app references:**
     1. A **Motorola APX / Sinad UHF dispatch console** in an airport operations room — anodised dark slate metal, crisp engraved legends, one cobalt transmit indicator.
     2. **Leica M Monochrome technical manuals** — high-contrast silver-toned field photography framed by 1px rules, exact focal captions, wide architectural headings.
     3. **Swiss Federal Railways (SBB) signal box diagrams** — schematic line drawings of gates, perimeters, and checkpoints where every dot and coordinate means something physical.
4. **What exists already:**
   - Name: **JossyShield** (strictly one word, camelCase).
   - Palette constraint from user: **Gray, Black, and Blue only**.
   - Local CC-licensed photography in `public/images/` (`guard-shoulder.jpg`, `gate-checkpoint.jpg`, `night-watchbox.jpg`, `uhf-radios.jpg`, `field-handset.jpg`, `officers-briefing.jpg`, `command-table.jpg`, `port-night.jpg`).
   - Next.js 14 codebase with 7 routes (`/`, `/services`, `/marketplace`, `/careers`, `/testimonials`, `/about`, `/contact`) and 3 API endpoints (`/api/marketplace`, `/api/careers`, `/api/contact`).
5. **What is needed:**
   - Complete `/app-designer` redesign across all 7 web pages (desktop `1440px` + mobile `390px`) and native iPhone 17 Pro 3x mockups (`explore.html`, `mockup.html`, `before-after.html`), achieving **5/5** on every rubric line with zero AI slop.
6. **Image generation:**
   - Not used (no paid credits spent). We use our verified local photography in `public/images/` graded to a unified high-contrast silver-slate tone plus bespoke architectural SVG perimeter & radio-net schematics.

---

## Current App Audit (Redesign Inventory)

### 1. Slop Tells Identified in the Previous Build (`design/audit/js/`)
- **Default reach font (`slop.md §2`):** Used `Inter` across every page.
- **ALL-CAPS eyebrows (`slop.md §2`):** 15 uppercase letter-spaced 10px–11px badges on the home page alone (`CENTRAL DISPATCH ONLINE`, `OPERATIONAL CAPABILITY BENTO`, `DISCIPLINE 01`, `SLA INTEGRITY`, `ACTIVE RECRUITMENT GATEWAY`, etc.).
- **Everything is a card (`slop.md §1`):** Every section was a stack of rounded-2xl / rounded-3xl dark boxes with glowing borders and nested inner cards.
- **The four-stat row (`slop.md §1`):** Four equal columns (`< 12 mins`, `8.4%`, `412 Officers`, `ISO 27001`) dropped directly beneath the hero.
- **Gradient text & glow blobs (`slop.md §3`, `color.md §6`):** `.text-gradient-metallic` on the main H1 and a 720px radial blur blob behind the hero.
- **Marketing & sci-fi cosplay copy (`slop.md §5`, `directions.md §C`):** "Autonomous Defense. Vetted Operatives. Zero-Compromise Security.", "military rigor and continuous telemetry", "cryptographic tracking reference".
- **No richness on screen one (`slop.md §7`):** Zero photography and zero architectural illustration — only text boxes on dark grey.
- **Text below floor (`slop.md §2`):** 47 text nodes under 12px on the home page.

### 2. Keep / Lose / Decisions Inventory (Contract)
- **Keep (every feature and data flow preserved and made easier to reach):**
  - [x] Interactive Sector Readiness & Shift Configurator on `/` (zone selection: Victoria Island, Ikeja Industrial, Abuja Central, Port Harcourt Wharf; discipline switcher; headcount stepper/slider; live monthly/mission cost calculation in Naira; deep-link into `/marketplace`).
  - [x] Three service disciplines (`/services` + home ledger): Static & Perimeter Guarding, Armed Convoy & Transit Escort, Physical Risk & Vulnerability Audits, plus Guard Training Academy.
  - [x] 4-step Service Requisition workflow (`/marketplace` + `MarketplaceWizard`) posting to `/api/marketplace` and returning a reference code (`JS-REQ-XXXXX`).
  - [x] Vetting pipeline breakdown & Open Roles portal (`/careers` + `JobApplicationModal`) posting to `/api/careers` and returning an applicant ID (`JS-APP-XXXXX`).
  - [x] Verified client post reports & incident reduction records (`/testimonials`).
  - [x] Company charter, NSCDC Category A license details, command leadership, and regional offices (`/about`).
  - [x] 24-hour dispatch desk & direct enquiry form (`/contact`) posting to `/api/contact`.
- **Lose:**
  - `Inter` font, gradient text, radial glow blobs, rounded-3xl bento card stacks, 4-stat row, 10px/11px text, sci-fi jargon ("Autonomous Defense", "telemetry", "cryptographic", "Zero-Compromise").
- **Previous look history row:** `media | dark | grotesque | blue | colour-material`.

---

## Step 2: Direction by Exploration

### Three Concept Sentences (Three Distinct Source Families)

1. **Direction A — Objects & Materials (`object`):**
   *"JossyShield is an anodised-slate UHF duty switchboard and engraved post key-panel."*
   - **Ground:** Dark obsidian iron (`#0A0D12`).
   - **Type:** Expanded architectural grotesque (`Archivo Variable` at `font-stretch: 115%` for display, `Mona Sans Variable` for controls, `IBM Plex Mono` for callsigns and tabular Naira figures).
   - **Accent hue:** Signal cobalt blue (`#2563EB` / `#3B82F6` on dark).
   - **Richness source:** High-contrast silver-slate field photography (`guard-shoulder.jpg`, `gate-checkpoint.jpg`, `uhf-radios.jpg`) paired with technical SVG perimeter & checkpoint diagrams.

2. **Direction B — Printed Matter (`printed`):**
   *"JossyShield is an NSCDC physical site inspection ledger and stamped shift handover sheet."*
   - **Ground:** Cool newsprint stone (`#ECEFF4`).
   - **Type:** Editorial serif (`Newsreader Variable`) + monospace (`IBM Plex Mono`).
   - **Accent hue:** Blueprint navy (`#1D4ED8`).
   - **Richness source:** Ruled inspection tables, architectural site stamps, and blueprint vector elevations.

3. **Direction C — Places (`place`):**
   *"JossyShield is a floodlit port gatehouse overlooking a night container terminal."*
   - **Ground:** Deep cobalt-slate colour field (`#0F2347`).
   - **Type:** Condensed display (`Archivo Variable` at `font-stretch: 78%`).
   - **Accent hue:** Ice blue (`#60A5FA`).
   - **Richness source:** Full-bleed night perimeter photography with scrim-backed bottom sheets.

### Why Direction A Won (and Why B and C Lost)
- **Winner: Direction A (`object | dark | expanded | blue | photo`).** It honours the user's strict **Gray, Black, and Blue** constraint while feeling like a physical piece of dispatch hardware built for facility directors and watch commanders. Combining real monochrome-graded photography of guards and UHF radios with crisp 1px rules and wide `Archivo Variable` display type removes every trace of generic SaaS bento cards.
- **Why B lost:** Light newsprint paper converges too closely with SANEF's daytime civic monograph; keeping JossyShield on obsidian iron gives the two sister organisations unmistakable contrast.
- **Why C lost:** A saturated navy colour field across seven long-form pages reduces legibility on dense requisition tables and inspection matrices.

### History Check (`~/.app-designer/history.md`)
Winning row: `| 2026-11-19 | JossyShield commercial security platform | object | dark | expanded | blue | photo |`
Differs from every row in `~/.app-designer/history.md` on at least 3 of 5 columns (and from the only other dark row, `Obligon`, on `source family`, `type`, and `accent hue`).

### The Category Default We Are Refusing
Private security websites default to either:
1. **Paramilitary stock-photo brochure:** cheap gold badges, clip-art shields, blurred stock photos of American police cars, and bombastic slogans ("Your Ultimate Protection Partner!").
2. **Cyber-SaaS dark bento cosplay:** glowing neon blue borders, glassmorphic cards, fake radar animations, and AI words like "Autonomous Defense" and "Zero-Compromise Telemetry".
**We refuse both.** JossyShield uses flat obsidian iron (`#0A0D12`), cold steel rules (`#1E2430`), one functional cobalt signal (`#2563EB`), wide architectural typography (`Archivo Variable` Expanded), real photography of guards, gate posts, and Motorola/Baofeng UHF handsets graded to unified silver-slate contrast, and plain operational English written by a chief security officer.

---

## Tokens

| Role | Dark Mode (Primary Web & Dark Mobile) | Light Mode (Daytime Mobile Inspection Sheet) | Meaning |
|---|---|---|---|
| `--ground` | `#0A0D12` | `#F3F5F8` | Anodised iron base / daytime inspection paper |
| `--raised` | `#11161F` | `#FFFFFF` | Switchboard bay / inset table surface |
| `--ink` | `#F1F5F9` | `#0B0F17` | Primary text and engraved legends (16.8:1 contrast) |
| `--ink-2` | `#A3B1C6` | `#3B4659` | Blue-tinted secondary steel text (8.4:1 contrast) |
| `--ink-3` | `#6E7D94` | `#5E6B80` | Blue-tinted tertiary metadata (4.7:1 contrast) |
| `--rule` | `#1E2634` | `#D5DCE6` | 1px machined hairline divider |
| `--accent` | `#2563EB` (fill) / `#60A5FA` (text on dark) | `#1D4ED8` | One role: active dispatch selection & primary requisition CTA |
| `--on-accent` | `#F8FAFC` | `#FFFFFF` | Text on cobalt action fill |
| `--positive` | `#93C5FD` | `#1E40AF` | Verified clearance / active post indicator (kept within blue family per strict palette rule) |
| `--negative` | `#64748B` | `#475569` | Offline / relief pending (cool slate within gray/blue constraint) |

### Typography Scale
- **Display Face:** `'Archivo Variable'` (`@fontsource-variable/archivo/wdth.css`), set at `font-stretch: 112%` (Expanded), weights `700`–`800`, negative tracking `-0.03em`.
- **UI & Prose Face:** `'Mona Sans Variable'` (`@fontsource-variable/mona-sans/wdth.css`), weights `400`, `500`, `600`.
- **Technical & Tabular Face:** `'IBM Plex Mono'` (`@fontsource/ibm-plex-mono`), weights `400`, `500`, `font-variant-numeric: tabular-nums`.
- **7-Step Size Scale:**
  1. Hero Display / Numeral: `56px` desktop / `38px` mobile (`line-height: 1.02`, `letter-spacing: -0.03em`, weight `800`, `font-stretch: 112%`)
  2. Page / Section Title: `32px` desktop / `26px` mobile (`line-height: 1.12`, `letter-spacing: -0.02em`, weight `700`, `font-stretch: 108%`)
  3. Subsection Heading: `20px` (`line-height: 1.25`, weight `600`)
  4. Primary Body / Row Title: `17px` (`line-height: 1.5`, weight `400` / `500`)
  5. Secondary Copy: `15px` (`line-height: 1.5`, weight `400`)
  6. Metadata / Table Cell: `13px` (`line-height: 1.4`, weight `500`, `tabular-nums`)
  7. Floor Label / Callsign: `12px` (`line-height: 1.35`, weight `500`, `tabular-nums` — absolute minimum floor, never below 12px)

### Richness Source (Art Direction)
1. **Silver-Slate Documentary Photography:** Every page anchors its primary section with real photography from `public/images/` (`guard-shoulder.jpg`, `gate-checkpoint.jpg`, `night-watchbox.jpg`, `uhf-radios.jpg`, `field-handset.jpg`, `officers-briefing.jpg`, `command-table.jpg`, `port-night.jpg`), treated with a unified monochrome-cobalt grade (`filter: grayscale(100%) contrast(1.12) brightness(0.94)` over a `#0D1526` ground blend) and framed by 1px `#1E2634` rules with exact field captions (`POST 04 · APAPA BULK WHARF · 22:15 WAT`).
2. **Architectural Perimeter & Sector Schematics (SVG):** Crisp technical line drawings showing compound gate geometry, guard rotation posts (`P1`–`P6`), UHF repeater links (`453.225 MHz`), and convoy route checkpoints.

### Signature Interaction Storyboard
- **Name:** *Post Allocation & Shift Relief Dial*
- **Trigger:** The facility manager clicks a deployment sector (*Victoria Island & Lekki*, *Ikeja & Apapa Industrial*, *Abuja Central & Maitama*, *Port Harcourt Trans-Amadi*) or drags the officer headcount control (`2` to `24` guards).
- **Frames:**
  1. `0ms`: Sector row highlights with a 2px cobalt left bar; the SVG perimeter schematic re-plots the active guard posts (`P1`..`Pn`) around the compound diagram.
  2. `120ms`: The tabular monthly retainer and hourly guard rate roll to the exact figure (`₦1,148,000 / mo` for 6 guards on 12-hour relief) while the assigned watch commander callsign (`UNIT 01 · CAPT. M. BRIGGS · CH 04`) updates in place.
  3. `260ms`: The primary CTA updates its deep-link payload (`Issue requisition for 6 guards in Victoria Island →`).
- **Haptic / Feedback:** `.sensoryFeedback(.selection)` on iOS; visual post-node illumination on web.
- **Reduced Motion Fallback:** Instant state swap with zero transform animation.

---

## Step 3: Content Inventory (Written Before Layout)

### Navigation & Masthead
- **Top Status Strip:** `NSCDC License No. CAT-A/01948 · 24-Hour Control Room: +234 1 888 5677 · 412 Officers on Post`
- **Primary Links:** `Post Desk` (`/`), `Disciplines` (`/services`), `Requisition` (`/marketplace`), `Guard Roster` (`/careers`), `Post Reports` (`/testimonials`), `Company` (`/about`), `Control Room` (`/contact`)
- **Primary Action:** `Request guards`

### Home (`/`)
- **Headline:** `Standing guards, convoy escorts, and physical site audits across Nigeria.`
- **Lead paragraph:** `JossyShield staffs commercial compounds, bank branches, and industrial terminals in Lagos, Abuja, and Port Harcourt. Every guard on our roster holds verified NIN and police fingerprint clearance, completes 14 days of live range and radio drills, and checks in every 30 minutes over UHF and NFC post tags.`
- **Hero Photograph:** `/images/guard-shoulder.jpg` — Caption: `Post 02 · Victoria Island Diplomatic Annex · Night watch check-in on UHF Channel 04 (453.225 MHz).`
- **Hero Single Metric (replacing the 4-stat row):** `412 cleared officers on standing post tonight across 38 client sites — average armed response arrival 9 minutes 20 seconds.`
- **Interactive Post & Shift Configurator:**
  - Sectors:
    - `Lagos — Victoria Island & Lekki` (`38 officers on standby`, `9 min response`, `Capt. M. Briggs · Callsign Sierra-01`, `Base rate ₦186,500 / guard / month`)
    - `Lagos — Ikeja & Apapa Wharf` (`44 officers on standby`, `11 min response`, `Capt. T. Danjuma · Callsign Sierra-02`, `Base rate ₦194,000 / guard / month`)
    - `Abuja — Central Area & Maitama` (`26 officers on standby`, `8 min response`, `Maj. (Rtd) S. Bello · Callsign Sierra-03`, `Base rate ₦198,500 / guard / month`)
    - `Port Harcourt — Trans-Amadi & Onne` (`19 officers on standby`, `12 min response`, `Capt. E. Amadi · Callsign Sierra-04`, `Base rate ₦205,000 / guard / month`)
  - Disciplines:
    - `Standing facility guards` (24-hour two-shift rotation, NFC perimeter checkpoints, supervisor patrol visit twice per night)
    - `Armed highway & port escort` (Lead & chase escort vehicles, police mobile force liaison, live GPS corridor tracking)
    - `Physical vulnerability audit` (7-day on-site perimeter inspection, blind-spot mapping, gate protocol stress test, written remediation dossier)
- **Three Operational Disciplines Ledger** (hairline-ruled architectural rows with photography `/images/gate-checkpoint.jpg`, `/images/uhf-radios.jpg`, `/images/command-table.jpg`).
- **Vetting & Training Pipeline** (3-stage tabular ledger with pass/rejection numbers: `1,480 applicants screened in 2026 → 124 cleared for post (8.37% pass rate)` and `/images/officers-briefing.jpg`).
- **Embedded Requisition Terminal** (`MarketplaceWizard`) + **Signed Post Reports** preview.
