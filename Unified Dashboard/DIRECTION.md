# DIRECTION.md — Unified Platform Administration Console (JossyShield & SANEF)

## Step 0: The Brief (Self-Authored)

1. **What is the app, and who is it for?**
   Unified Dashboard is the shared internal operations and administration console for **JossyShield Security Ltd** (a Nigerian commercial guarding, risk assessment, and guard training company) and **Safe Neighborhood Foundation (SANEF)** (a Nigerian community-safety NGO installing solar street lighting, youth mediation hubs, and neighborhood watch radios). It is built for duty commanders, dispatch coordinators, recruitment vetting officers, NGO field directors, and platform auditors.
2. **The core action (first 10 seconds):**
   Select or switch the active organization tenant (`JossyShield Security Ltd` ↔ `Safe Neighborhood Foundation`), inspect the live regional sector/ward schematic plot, click an incoming service requisition or field disbursement in the triage queue, and assign vetted officers, issue a commercial quote, or verify field evidence from the right-hand dossier drawer.
3. **Three words for how it should feel, and outside-app references:**
   - **Exact, calm, accountable.**
   - Outside references:
     1. *Lagos Port Harbour Master & Marine VHF Watch Desk* (physical sector plotting table, callsign strip, shift handover log).
     2. *CERN Control Room / Swiss Federal Railways (SBB) Dispatch Console* (dark slate surface, condensed tabular numerals, zero decorative glow, strict hairline dividers).
     3. * Nagra IV-S Field Recorder Front Panel* (mechanical two-position bus toggle, unmistakable state indicators).
4. **What exists already:**
   Next.js 14 codebase in `/home/inimfon-udoh/SANEF/Unified Dashboard` running on port `3000`, `lib/data-store.ts` multi-tenant repository, and 6 verified local field photographs in `public/images/` (`guard-shoulder.jpg`, `gate-checkpoint.jpg`, `uhf-radios.jpg`, `lagos-corridor.jpg`, `lekki-community.jpg`, `lagos-digital-hub.jpg`).
5. **What is needed:**
   - Full `/app-designer` redesign of all 6 web dashboard modules + mobile responsive layout (`390px` to `1440px+`) at 5/5 on every rubric line.
   - Native iPhone 17 Pro `/app-designer` artifacts in `design/` (`explore.html`, `mockup.html`, `before.html`, `before-after.html`, `CRITIQUE.md`) rendered and scanned via `shoot.mjs` with 0 FAILs.
6. **Image generation:**
   Not used (no paid credits spent). Richness comes from architectural SVG regional sector/ward schematics paired with the 6 verified local photographs in `/images/`.

---

## Current App Audit (Before Redesign)

### 1. Slop Scan & Audit of `design/audit/dash/home-1440.png` & `home-390.png`
- **Typography default (`slop.md §2`)**: Uses `Inter` across all elements (`tailwind.config.js` sets `sans: ["Inter", ...]`), with 24 text nodes below `12px` (`text-[10px]` and `text-[11px]`).
- **The dashboard reflex & empty void (`slop.md §1`, `critique.md` Line 7 Richness)**: On `home-1440.png`, 70% of the viewport is an empty black void (`#090c12`) containing only a 4-stat row (`3`, `4`, `436`, `< 4h`) and 2 bare text rows. There is no visual anchor, no spatial map, and no actionable triage work on the opening screen.
- **Mobile viewport collapse (`home-390.png`)**: `FAIL: 3 element(s) overflow the viewport horizontally`. The `w-64` (`256px`) desktop sidebar never collapses on mobile (`390px`), crushing the main content column into `134px` and clipping headings (`JossyShie...`, `Command...`, `RECENT ACTIVITY & SECURITY...`).
- **Marketing & AI cliché copy (`slop.md §5`)**: Uses banned words in system UI ("Elite Tactical Guarding", "Awaiting tactical review", "Senior Tactical Armed Escort").
- **Color & chrome tells (`slop.md §3`)**: Uses an indigo-violet gradient avatar badge (`bg-gradient-to-tr from-blue-600 to-indigo-600`) and overuses uppercase letter-spaced eyebrows on every card and table header.

### 2. Inventory: Keep / Lose / Unknown
- **Keep (Contract — all preserved and elevated)**:
  - Instant organization context switcher between **JossyShield Security Ltd** (`org-jossyshield`) and **Safe Neighborhood Foundation** (`org-sanef`).
  - **Module 1 — Duty Desk (Overview)**: Operational summary, live shift handover & audit ledger, and direct triage actions.
  - **Module 2 — Service Requisitions / Grant & Campaign Ledger**: Inbound client guard/consultancy/training requests (`JS-REQ-10492`, `JS-REQ-10489`, `JS-REQ-10481`, `JS-REQ-10474`) with inline status progression (`New` → `Quoted` → `Assigned` → `On Post`), quote calculator, and officer assignment; in SANEF mode, active grant & donor campaign disbursements.
  - **Module 3 — Applicant Pipeline (JossyShield) / Field Projects Archive (SANEF)**: 4-stage candidate vetting board (`Submitted`, `Vetting & NIN Check`, `Field Drill`, `Cleared for Post`) with one-click stage advancement and dossier view; in SANEF mode, audited community projects with field photos and GPS coordinates.
  - **Module 4 — Cleared Officer Roster (JossyShield) / Partner & Donor Ledger (SANEF)**: Searchable roster of cleared personnel with callsigns, assigned zone, and deployment availability toggle; in SANEF mode, municipal partners and verified donor disbursements.
  - **Module 5 — Evidence & Media Archive**: Scoped digital asset repository with file sizes, dimensions, SHA-256 checksums, tenant scope badges, and upload/tag modal.
  - **Module 6 — Users, Roles & Tenant Isolation Matrix**: RBAC permission table (`Super Admin`, `Operations Commander`, `Recruitment Officer`, `Foundation Director`, `Auditor`), interactive tenant isolation verification runner, and operator invite modal.
- **Lose**:
  - The 70% empty black void on the overview screen.
  - The un-collapsible 256px sidebar on mobile viewports.
  - `Inter` font, `10px`/`11px` text nodes, indigo gradient avatar, and banned words.

### 3. Harvested Assets
- `/images/guard-shoulder.jpg` — Vetted static guard shoulder insignia & radio check (Victoria Island Sector 01).
- `/images/gate-checkpoint.jpg` — Perimeter access control & vehicle manifest log (Onne Wharf Sector 04).
- `/images/uhf-radios.jpg` — Dual-band VHF/UHF handheld radio array charged for night watch handover.
- `/images/lagos-corridor.jpg` — Ajegunle school route solar luminaire corridor (SANEF Ward W-01).
- `/images/lekki-community.jpg` — Resident watch assembly and ward boundary walk (SANEF Ward W-02).
- `/images/lagos-digital-hub.jpg` — Youth conflict mediation and vocational training room (SANEF Ward W-04).

### 4. Decisions for the User
- Renamed "Overview Dashboard" to **Duty Desk** and promoted the live **Sector & Ward Schematic + Triage Queue + Dossier Drawer** directly onto the opening view so operators can act within 10 seconds without navigating away.
- Replaced the fixed mobile sidebar with a responsive desktop rail (`lg:w-60`) plus a mobile top context bar and bottom 6-module quick switcher so `390px` viewports have zero horizontal overflow.

---

## Step 1 & Step 2: Three-Direction Exploration

### Three Concept Sentences (Three Distinct Source Families)
1. **Direction A — Place (`place` / `dark` / `condensed` / `blue` / `shape`)**:
   *"Unified Dashboard is a dual-desk regional duty room console with a live sector schematic."*
2. **Direction B — Object (`object` / `light` / `grotesque` / `green` / `colour-material`)**:
   *"Unified Dashboard is a split-ledger brass switchboard and dispatch register."*
3. **Direction C — Media (`media` / `colour-field` / `serif` / `orange` / `photo`)**:
   *"Unified Dashboard is an operations broadcast rundown desk."*

### Comparison & Winner
- **Winner: Direction A — Precision Duty Desk & Sector Switchboard (`place` / `dark` / `condensed` / `blue` / `shape`)**.
  - *Why Direction A won*: It honors the dark command-room lineage of the existing console while curing its emptiness with a live **Nigeria Sector & Ward Operations Schematic** (`shape` richness) paired with real field evidence photography inside the dossier drawer and media archive. Its adaptive signal channel shifts cleanly between JossyShield Cobalt Blue (`#2563EB` — gray, black, and blue only) and SANEF Civic Forest Green (`#108548` — green, white, and gray).
  - *Why Direction B lost*: A warm bone paper ledger feels right for static accounting, but reduces contrast for night-shift watch commanders monitoring live radio check-ins.
  - *Why Direction C lost*: A saturated sodium-orange broadcast rundown overpowers long-form NIN vetting tables and multi-tenant RBAC matrices during extended shift work.

### History Check (`~/.app-designer/history.md`)
Row to record: `| 2026-11-19 | Unified Dashboard | place | dark | condensed | blue | shape |`
- Differs from `2026-10-24 | Obligon responsive dashboard refinement | place | dark | grotesque | green | photo` on **3 of 5 columns** (`type`: condensed vs grotesque; `accent hue`: blue vs green; `richness`: shape vs photo).
- Differs from every other row in `~/.app-designer/history.md` on 3 to 5 columns.

---

## Refused Category Defaults

Top enterprise security and multi-tenant admin consoles share three bad defaults that we explicitly refuse:
1. **The Empty KPI Header + Blank Table Skeleton**: Four isolated number boxes floating over a dark void with a two-line "Recent Activity" list underneath. On our Duty Desk, the **Interactive Sector/Ward Plot** and **Actionable Triage Queue + Dossier Inspector** own the first screen.
2. **Sci-Fi HUD Cosplay & Confetti Badges**: Glowing neon cyan borders, radial blur blobs, purple-indigo avatars, and five competing pastel badge colors. We use flat obsidian slate (`#0A0C10`), crisp 1px structural hairlines (`#1E2532`), and **strictly one active organization accent at a time**: Cobalt Blue (`#2563EB`) with cool slate neutrals in JossyShield mode (gray, black, blue only), shifting to Civic Forest Green (`#108548`) with crisp white and gray in SANEF mode.
3. **Unexamined `Inter` & Sub-12px Micro-Labels**: No `Inter`, no `10px` uppercase tracking spam. We pair condensed `Archivo Variable` display numerals and headings with `Mona Sans Variable` UI tables and `IBM Plex Mono` callsigns/reference codes, with a strict `12px` minimum floor.

---

## Design Tokens

### Colour Roles (Adaptive Dual-Tenant Instrument)

| Role | CSS Token | JossyShield Mode (Gray / Black / Blue) | SANEF Mode (Green / White / Gray) | Contrast vs Ground |
|---|---|---|---|---|
| **Ground** | `--ground` | `#0A0C10` (Obsidian Slate) | `#0A0D0C` (Deep Charcoal Slate) | — |
| **Raised Panel** | `--raised` | `#11151C` (Instrument Bay) | `#111715` (Field Desk Bay) | — |
| **Active Surface / Sheet** | `--raised-2` | `#171C26` (Selected Row / Drawer) | `#17201C` (Selected Row / Drawer) | — |
| **Primary Ink** | `--ink` | `#ECF0F6` (Crisp Cool White) | `#F0F5F2` (Crisp Chalk White) | `16.4 : 1` |
| **Secondary Ink** | `--ink-2` | `#9BA6B8` (Steel Slate) | `#A3B1AA` (Sage Gray) | `7.4 : 1` |
| **Tertiary Ink** | `--ink-3` | `#738096` (Muted Slate Metadata) | `#788780` (Muted Gray Metadata) | `4.6 : 1` |
| **Hairline Rule** | `--rule` | `#1E2532` (1px Structural Hairline) | `#1E2924` (1px Structural Hairline) | — |
| **Active Accent** | `--accent` | `#2563EB` (Signal Cobalt Blue) | `#108548` (Civic Forest Green) | `4.8 : 1` (fill) |
| **Accent Text / Highlight** | `--accent-ink` | `#60A5FA` (High-Legibility Signal Blue) | `#34D399` (High-Legibility Civic Green) | `8.2 : 1` |
| **Accent Soft Fill** | `--accent-soft` | `rgba(37, 99, 235, 0.14)` | `rgba(16, 133, 72, 0.16)` | — |
| **On-Accent Ink** | `--on-accent` | `#FFFFFF` | `#FFFFFF` | `5.1 : 1` |

*System Tint Rule*: The active tenant accent (`--accent`) owns selection, active sector beacons, primary action buttons, and verified status pills. Within each tenant view, all secondary badges use stepped luminance of the tenant's allowed palette (blue/slate/white in JossyShield; green/gray/white in SANEF).

### Typography Scale (Self-Hosted via `@fontsource`)

- **Display & Numerals (`--font-display`)**: `'Archivo Variable'`, with width axis (`font-variation-settings: "wdth" 88` for hero tabular numerals, `"wdth" 104` for major screen headers).
- **UI & Tables (`--font-sans`)**: `'Mona Sans Variable'`, clean high-x-height grotesque for dense operational rows, forms, and dossier notes.
- **Codes, Callsigns & Coordinates (`--font-mono`)**: `'IBM Plex Mono'`, tabular figures (`tabular-nums`) for reference IDs (`JS-REQ-10492`), timestamps (`18:42 WAT`), GPS coordinates (`6.4281° N, 3.4219° E`), and SHA-256 digests.

| Step | Role | Size | Weight | Tracking | Line Height |
|---|---|---|---|---|---|
| 1 | Hero Display Numeral | `44px` (`2.75rem`) | `700` | `-0.03em` | `1.0` |
| 2 | Screen Title | `24px` (`1.5rem`) | `700` | `-0.02em` | `1.15` |
| 3 | Section Heading | `17px` (`1.0625rem`) | `600` | `-0.01em` | `1.25` |
| 4 | Primary Row / Body | `14px` (`0.875rem`) | `500` | `0` | `1.4` |
| 5 | Secondary / Table Cell | `13px` (`0.8125rem`) | `400` | `0` | `1.4` |
| 6 | Metadata / Code Floor | `12px` (`0.75rem`) | `500` | `+0.01em` | `1.35` |

*Eyebrow Cap*: Maximum **1** uppercase letter-spaced eyebrow per view (used strictly for the live shift timestamp & tenant bus code in the top bar). All section headers, table headers, and badges use sentence case.

### Layout, Spacing & Radii
- **Grid & Chrome**:
  - Top Duty Bar: `56px` height, sticky, holding the Dual-Tenant Bus Switcher, active watch clock (`19 Nov 2026 · 18:42 WAT · Shift B`), quick command search, and operator badge (`Inimfon Udoh · Super Admin`).
  - Left Navigation Rail (Desktop `≥1024px`): `232px` fixed rail with 6 core modules + tenant scope summary card.
  - Mobile Navigation (`<1024px`, including `390px`): Slide-over drawer + persistent bottom 6-module bar with `44px × 44px` minimum tap targets and `overflow-x: hidden` on the root shell.
  - Workspace Split on Duty Desk: 12-column grid (`7 columns` Interactive Sector/Ward Schematic + Shift Roster; `5 columns` Live Triage Queue & Dossier Inspector).
- **Spacing Scale**: `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`.
- **Radius Family**: Precision instrument corners — `8px` (`rounded-lg`) for panels and tables, `6px` (`rounded-md`) for buttons and inputs, `9999px` for status dots.

---

## Richness Source & Signature Interaction

### Richness Source (Screen One & Across Views)
1. **Interactive Nigeria Sector & Ward Operations Schematic (SVG)**:
   - A multi-layered architectural vector schematic of operational sectors (in JossyShield mode: **Sector 01 Victoria Island**, **Sector 02 Ikeja Industrial**, **Sector 03 Maitama Central**, **Sector 04 Onne Wharf**) and community safety wards (in SANEF mode: **Ward W-01 Ajegunle Corridor**, **Ward W-02 Mushin Lane**, **Ward W-03 Makoko Waterfront**, **Ward W-04 Kafanchan Hub**).
   - Includes coordinate gridlines, waterway/corridor contours, live callsign tags (`VHF CH-04`, `UHF CH-09`), shift relief countdowns (`02h 18m to relief`), and clickable sector pins that filter the triage queue and highlight the on-duty watch commander.
2. **Verified Field Photography Archive**:
   - Real local photographs (`/images/guard-shoulder.jpg`, `/images/gate-checkpoint.jpg`, `/images/uhf-radios.jpg`, `/images/lagos-corridor.jpg`, `/images/lekki-community.jpg`, `/images/lagos-digital-hub.jpg`) embedded inside the Duty Desk Dossier Inspector, SANEF Field Projects cards, and the Evidence & Media Archive.

### Signature Interaction Storyboard: Dual-Tenant Bus Switch & Sector Lock
- **Trigger**: Clicking the dual-position Tenant Switcher (`JossyShield Security Ltd` ↔ `Safe Neighborhood Foundation`) in the top bar, or tapping a sector node on the schematic map.
- **Frames**:
  - *Frame 1 (0ms)*: Operator is on `JossyShield Security Ltd (CH-01)` in Cobalt Blue (`#2563EB`) inspecting `Sector 01 · Victoria Island` (`148 officers on post`).
  - *Frame 2 (140ms)*: The sliding bus indicator translates across the switcher track with `--spring-snappy: linear(0, 0.204, 0.624, 0.96, 1.04, 1.01, 1)`; the schematic grid cross-fades its vector nodes from commercial guard posts to solar corridor wards.
  - *Frame 3 (320ms)*: Signal accent settles into Civic Forest Green (`#108548`); the hero numeral rolls via tabular figures to `142 solar poles reporting`, and the Dossier Inspector locks onto `SAN-PRJ-204 · Ajegunle School Route`.
- **Haptic (iOS Companion)**: `.sensoryFeedback(.selection, trigger: activeTenant)` on tenant bus toggle; `.impact(weight: .light)` when locking a sector pin.
- **Reduced-Motion Fallback**: Instant opacity swap (`120ms ease-out`) without horizontal slide or SVG path pulse.

---

## Step 3: Content First (Exact Copy & Data Inventory)

### Organization Tenants
1. **JossyShield Security Ltd** (`org-jossyshield`)
   - Code: `JS-OPS · CH-01`
   - Tagline: `Commercial guarding, site risk audits, and vetted officer dispatch across 4 regional sectors.`
   - Hero Metric on Duty Desk: `412` officers on post across `19` active client sites (`98.4%` shift check-in compliance; `₦18,640,000` monthly contract book).
2. **Safe Neighborhood Foundation** (`org-sanef`)
   - Code: `SANEF-FIELD · CH-02`
   - Tagline: `Solar street lighting corridors, youth mediation centres, and neighborhood radio watch archives.`
   - Hero Metric on Duty Desk: `142` solar poles reporting across `4` community wards (`64,850` residents along lit school routes; `₦41,280,000` audited grant ledger).

### Sectors (JossyShield) & Wards (SANEF)
- **JossyShield Sectors**:
  1. `SEC-01` · **Victoria Island & Ikoyi** (`6.4281° N, 3.4219° E`) — Watch Commander: Capt. Tunde Bakare (Ret.) · Radio: `UHF CH-04` · `148` officers on post · `2` open requisitions · Relief in `02h 18m` · Photo: `/images/guard-shoulder.jpg`.
  2. `SEC-02` · **Ikeja Industrial & Apapa** (`6.5965° N, 3.3421° E`) — Watch Commander: Ngozi Okafor · Radio: `UHF CH-07` · `116` officers on post · `1` open requisition · Relief in `03h 45m` · Photo: `/images/uhf-radios.jpg`.
  3. `SEC-03` · **Maitama & Central District, Abuja** (`9.0820° N, 7.4910° E`) — Watch Commander: Ibrahim Danjuma · Radio: `VHF CH-02` · `64` officers on post · `1` open requisition · Relief in `01h 52m` · Photo: `/images/gate-checkpoint.jpg`.
  4. `SEC-04` · **Onne Wharf & Trans-Amadi, PH** (`4.7231° N, 7.1519° E`) — Watch Commander: Tamuno Briggs · Radio: `VHF CH-09` · `84` officers on post · `1` open requisition · Relief in `02h 18m` · Photo: `/images/gate-checkpoint.jpg`.
- **SANEF Wards**:
  1. `WRD-01` · **Ajegunle & Orile School Corridor** (`6.4512° N, 3.3318° E`) — Field Lead: Chidinma Nwosu · Radio: `VHF W-01` · `68` solar poles active · `1` audit verification due · Photo: `/images/lagos-corridor.jpg`.
  2. `WRD-02` · **Mushin & Surulere Transit Walkways** (`6.5298° N, 3.3541° E`) — Field Lead: Segun Adebayo · Radio: `VHF W-02` · `46` solar poles active · `1` disbursement pending · Photo: `/images/lekki-community.jpg`.
  3. `WRD-03` · **Makoko & Yaba Waterfront Watch** (`6.4961° N, 3.3912° E`) — Field Lead: Funke Akindele-Cole · Radio: `VHF W-03` · `28` solar poles active · `18` radio units linked · Photo: `/images/uhf-radios.jpg`.
  4. `WRD-04` · **Kafanchan Youth Mediation Hub, Kaduna** (`9.5836° N, 8.2925° E`) — Field Lead: Musa Abdullahi · Radio: `VHF W-04` · `318` youth trainees enrolled · `1` grant tranche ready · Photo: `/images/lagos-digital-hub.jpg`.

### Inbound Service Requisitions (JossyShield)
1. `JS-REQ-10492` · **Apex Freight Terminal** (`Marina Industrial Park, Onne Wharf`, Sector `SEC-04`) · Service: `Static & Perimeter Guarding` · `12 officers (24/7 rotation)` · Monthly Quote: `₦1,840,000 / mo` · Status: `New` · Contact: `Engr. Dapo Adelaja (+234 803 552 1940)` · Submitted: `19 Nov 2026, 16:14 WAT`.
2. `JS-REQ-10489` · **Meridian Towers VI** (`Adeola Odeku St, Victoria Island`, Sector `SEC-01`) · Service: `Access Control & Night Patrol` · `8 officers + 1 shift supervisor` · Monthly Quote: `₦1,425,000 / mo` · Status: `Quoted` · Contact: `Bolanle Coker (+234 809 318 4402)` · Submitted: `19 Nov 2026, 11:28 WAT`.
3. `JS-REQ-10481` · **Zenith Chancellery Annex** (`Maitama District, Abuja`, Sector `SEC-03`) · Service: `Site Risk & Perimeter Audit` · `3 senior assessors (14 days)` · Fixed Fee: `₦2,150,000` · Status: `Assigned` · Contact: `Amb. Kemi Adesina (+234 802 441 8812)` · Submitted: `18 Nov 2026, 14:05 WAT`.
4. `JS-REQ-10474` · **First Marina Bullion Vault** (`Broad Street / VI Boundary`, Sector `SEC-01`) · Service: `Guard Certification & Drill` · `38 facility guards` · Fixed Fee: `₦1,680,000` · Status: `On Post` · Contact: `Oluwaseun Balogun (+234 805 902 1173)` · Submitted: `17 Nov 2026, 09:40 WAT`.
5. `JS-REQ-10468` · **Guinness Warehousing Yard** (`Oba Akran Ave, Ikeja`, Sector `SEC-02`) · Service: `Gatehouse & Weighbridge Security` · `14 officers` · Monthly Quote: `₦2,190,000 / mo` · Status: `On Post` · Contact: `Uche Nnamdi (+234 807 613 2890)` · Submitted: `15 Nov 2026, 17:22 WAT`.

### Applicant Pipeline & Cleared Officer Roster (JossyShield)
- `JS-APP-309` · **Emmanuel Okafor** · Role: `Convoy & Escort Lead` · `7 yrs exp` · Location: `Lekki, Lagos` · Stage: `Field Drill` · NIN Check: `Verified (NIN-8492-1104)` · Drill Score: `91 / 100` · Callsign: `ECHO-14`.
- `JS-APP-312` · **Fatima Al-Hassan** · Role: `Control Room CCTV Operator` · `5 yrs exp` · Location: `Garki, Abuja` · Stage: `Vetting & NIN Check` · NIN Check: `Verified (NIN-5520-8831)` · Drill Score: `88 / 100` · Callsign: `SIERRA-08`.
- `JS-APP-304` · **Chinedu Eze** · Role: `Static Perimeter Officer` · `4 yrs exp` · Location: `Trans-Amadi, PH` · Stage: `Cleared for Post` · NIN Check: `Verified (NIN-3190-4412)` · Drill Score: `94 / 100` · Availability: `Available` · Callsign: `WHISKEY-03`.
- `JS-APP-298` · **Babatunde Adeleke** · Role: `Corporate Reception Officer` · `6 yrs exp` · Location: `Ikeja GRA, Lagos` · Stage: `Cleared for Post` · NIN Check: `Verified (NIN-7741-9023)` · Drill Score: `89 / 100` · Availability: `Assigned to SEC-02` · Callsign: `KILO-11`.
- `JS-APP-315` · **Sadiq Danladi** · Role: `Night Dog Handler & Patrol` · `5 yrs exp` · Location: `Apapa Wharf, Lagos` · Stage: `Submitted` · NIN Check: `Pending NIMC lookup` · Drill Score: `84 / 100` · Callsign: `DELTA-19`.
- `JS-APP-291` · **Amina Yusuf** · Role: `Access Control Supervisor` · `8 yrs exp` · Location: `Victoria Island, Lagos` · Stage: `Cleared for Post` · NIN Check: `Verified (NIN-6012-3389)` · Drill Score: `96 / 100` · Availability: `Available` · Callsign: `VICTOR-02`.
- `JS-APP-287` · **Obinna Nwankwo** · Role: `Industrial Gatehouse Lead` · `6 yrs exp` · Location: `Onne Wharf, PH` · Stage: `Cleared for Post` · NIN Check: `Verified (NIN-4901-7721)` · Drill Score: `92 / 100` · Availability: `Available` · Callsign: `WHISKEY-07`.
- `JS-APP-318` · **Kelechi Iheanacho** · Role: `Mobile Patrol Rider` · `3 yrs exp` · Location: `Surulere, Lagos` · Stage: `Vetting & NIN Check` · NIN Check: `Guarantor signed` · Drill Score: `86 / 100` · Callsign: `ROMEO-21`.

