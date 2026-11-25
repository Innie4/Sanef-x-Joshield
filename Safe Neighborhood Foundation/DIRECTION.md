# DIRECTION.md — Safe Neighborhood Foundation (SANEF)

## Step 0: The Brief (Self-Authored)

1. **What is the app, and who is it for?**
   Safe Neighborhood Foundation (SANEF) is a Nigerian community-safety non-governmental organization (CAC/IT/NO 148291) operating across high-density urban wards in Lagos, Kaduna, and Oyo. It builds solar-lit school transit corridors, trains youth dispute mediators, and equips voluntary neighborhood watch groups with licensed VHF/UHF radio dispatch networks.
   **Audience:** Individual and diaspora donors, institutional grantmakers, municipal works agencies, ward development committees, and resident volunteers.
2. **The core action (first 10 seconds):**
   Inspect verifiable on-the-ground evidence of a lit school corridor (real field photography, GPS pole schematic, commissioned lamp count, and signed ward affidavit), then allocate a specific hardware or stipend grant in Naira.
3. **Three words for how it should feel & non-app references:**
   - **Words:** Warm, local, transparent.
   - **References outside apps:**
     1. *Centre for Urban Pedagogy (CUP) Folding Field Monographs* — clear civic diagrams, street-level architectural cross-sections, and unpretentious public evidence.
     2. *Ordnance Survey / Lagos Littoral Ward Survey Folios* — crisp 1px ruled cartographic tables, exact GPS coordinates, and numbered infrastructure plots.
     3. *Aperture Documentary Photobooks* — dignified human-scale documentary photography with full-sentence archival captions and credit lines.
4. **What exists already:**
   - Next.js 14 codebase on port `3002` with 10 routes (`/`, `/portfolio`, `/donate`, `/partnerships`, `/events`, `/careers`, `/blog`, `/blog/[slug]`, `/about`, `/contact`) and 2 API endpoints (`/api/donations`, `/api/contact`).
   - 11 Creative Commons documentary photographs from Nigeria/West Africa in `public/images/` with full attribution in `public/images/CREDITS.md`.
   - User palette constraint: **strictly Green, White, and Gray only**.
5. **What is needed:**
   Complete `/app-designer` redesign across all 10 web pages (`Navbar`, `Footer`, and every route) plus the iPhone 17 Pro native device exploration (`design/explore.html`) and 6-frame mockup suite (`design/mockup.html`), scoring **5/5** on every rubric line with **0 FAILs** and **0 warns** on both `webshoot.mjs` and `shoot.mjs`.
6. **Image generation:**
   Not used (no paid credits spent). All imagery uses verified local Creative Commons documentary photographs in `public/images/` paired with custom cartographic SVG street-corridor schematics.

---

## Current App Audit (Before Redesign)

### 1. Mechanical & Visual Slop Tells Identified
An audit of the prior codebase against `references/slop.md` revealed:
- **Unexamined default font (`Inter`):** Configured in `tailwind.config.js` as primary sans (`Inter`), with no editorial voice or optical contrast.
- **Gradient text on hero headline:** `text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700` on line 89 of `app/page.tsx` — a direct FAIL on `webshoot.mjs`.
- **Marketing & sci-fi slop vocabulary:** Multiple occurrences of banned words across metadata, data, and pages: `"empowers"` (`app/layout.tsx`), `"empowering"` (`components/Footer.tsx`), `"telemetry"` (`lib/data.ts`, `app/events/page.tsx`, `app/careers/page.tsx`), `"autonomous"` (`lib/data.ts`, `app/page.tsx`, `app/about/page.tsx`).
- **Text below 12px floor:** 25+ instances of `text-[10px]` and `text-[11px]` across `Navbar.tsx`, `Footer.tsx`, `app/page.tsx`, `app/portfolio/page.tsx`, and `app/donate/page.tsx`.
- **Uppercase eyebrow spam:** 12+ uppercase letter-spaced eyebrows per page (`PILLAR 01`, `PILLAR 02`, `PILLAR 03`, `AUDITED TRANSPARENCY`, `FOCUS: AJEGUNLE & MUSHIN`, etc.).
- **The 4-stat box row:** Four equal columns (`Night Crime -42.8%`, `Solar Units 140 Beacons`, `Mediators 320 Youth`, `Daily Footfall 65,000+`) dropped beneath the hero CTA.
- **Everything is a rounded card stack (`.civic-bento` / `.monograph-surface`):** Every section wrapped in `rounded-3xl` / `rounded-[32px]` boxes with drop shadows and nested gray boxes inside white cards.
- **Fake-round USD donation presets & 75% bar:** `$25 / $50 / $100 / $250` pills with `$45,200 raised of $60,000 (75% Complete)` for a Nigerian grassroots foundation instead of specific, itemized Naira hardware & stipend costs.
- **Zero photography rendered on any page:** Despite 11 documentary images existing in `public/images/`, not a single `<img>` or `<Image>` tag was rendered anywhere in the application.

### 2. Inventory: Keep / Lose / Upgrade Contract

| Route / Feature | Status | Redesign Treatment |
|---|---|---|
| `/` (Home: Hero, Ward Evidence Switcher, Quick Pledge, Three Workstreams, Active Projects) | **Keep & Upgrade** | Replace gradient-text bento hero with broadsheet editorial hero (`Newsreader Variable` + 1 italic word), documentary photography, interactive SVG Ward Corridor Schematic (`AJ-01`..`AJ-32`), and itemized Naira Pole & Grant Allocation Ledger. |
| `/portfolio` (Field Evidence Archive with category filter & detail modal/drawer) | **Keep & Upgrade** | Editorial archival index with category & state filters, documentary photography for each project, GPS coordinates, itemized Naira budget ledger, and interactive dossier sheet with downloadable specification. |
| `/donate` (Campaign breakdown, bank wire transfer copy, online pledge form via `/api/donations`) | **Keep & Upgrade** | Specific uneven Naira campaign figures (`₦18,420,500` of `₦23,856,000`), hardware/stipend unit selector, Nigerian trust bank particulars (First Bank & Zenith Bank with 1-click copy), and working `/api/donations` receipt generation. |
| `/partnerships` (Institutional & ward partners list + inquiry link) | **Keep & Upgrade** | Ruled archival ledger of municipal, philanthropic, civic, and technical partners with documentary photos (`/images/solar-committee.jpg`, `/images/lekki-community.jpg`), MOU governance standards, and direct inquiry link. |
| `/events` (Upcoming & past community assemblies + RSVP flow) | **Keep & Upgrade** | Swiss/editorial timetable of ward townhalls, trauma first-aid workshops, and commissioning walks with inline seat registration and past assembly minutes. |
| `/careers` (Field officer & volunteer postings + application flow) | **Keep & Upgrade** | Transparent Naira compensation bands, ward posting locations, role duties, and working inline application form submitting to `/api/contact`. |
| `/blog` & `/blog/[slug]` (Field dispatches list & full article reader) | **Keep & Upgrade** | Editorial broadsheet journal with documentary photos, category filter, author credentials, reading time, and full-length empirical field dispatches. |
| `/about` (Foundation charter, governance, methodology, registration) | **Keep & Upgrade** | Origin story in Lagos school-route safety audits, incorporated trustees governance table, 74.2% / 16.8% / 9.0% audited expenditure split, and field methodology with real photography. |
| `/contact` (Secretariat channels, field office hours, `/api/contact` form) | **Keep & Upgrade** | Direct Lagos & Kaduna field office lines, WhatsApp dispatch link, physical secretariat hours, and validated ward nomination / enquiry form posting to `/api/contact`. |
| `components/Navbar.tsx` & `components/Footer.tsx` | **Keep & Upgrade** | Architectural masthead with top registry strip (`CAC/IT/NO 148291`), 1px hairline border, active underline, mobile drawer, and full colophon with Creative Commons image credits. |

---

## Step 2: Direction, by Exploration

### Three Concept Sentences (Three Distinct Source Families)

1. **Direction A — Place (`place` / `light` / `serif` / `green` / `photo`):**
   *"SANEF is a ward surveyor's field monograph and lit street atlas."*
   Set on cool chalk-stone paper (`#F7F8F5`) with high-contrast optical-size serif headlines (`Newsreader Variable`, roman with one meaning-carrying italic word), precision grotesques (`Mona Sans Variable`), tabular coordinates (`IBM Plex Mono`), real documentary photography from Lagos and Kaduna wards, and plotted SVG street-corridor lamp schematics separated by 1px hairline rules (`#D5DDD7`).
2. **Direction B — Object (`object` / `dark` / `mono` / `yellow` / `shape`):**
   *"SANEF is a brass-stamped solar mast nameplate and night maintenance log."*
   Set on deep anodized slate (`#0D110E`) with tabular monospace numerals, engraved plate borders, and sodium-lamp amber (`#E09F1F`) status indicators.
3. **Direction C — Nature (`nature` / `colour-field` / `expanded` / `orange` / `colour-material`):**
   *"SANEF is a dusk-to-dawn daylight canopy chart."*
   Set on a saturated twilight forest field (`#0E472B`) with wide expanded sans display typography and warm dusk-orange (`#E86C2C`) horizon bars.

### Exploration Verdict (`design/explore.html`)
- **Winner: Direction A (Ward Surveyor's Field Monograph & Lit Street Atlas)**, incorporating the dusk-to-dawn illumination timeline from Direction C inside the corridor schematic.
- **Why Direction B lost:** The dark anodized nameplate aesthetic feels like a private hardware terminal rather than a warm, open public-interest foundation for donors and residents; it also violates the user's strict green/white/gray palette constraint with amber.
- **Why Direction C lost:** A full-bleed saturated ground across 10 content-heavy pages reduces long-form reading comfort for audit reports and introduces orange outside the strict green/white/gray constraint.

### History Comparison (`~/.app-designer/history.md`)
Current look before redesign: `printed | light | grotesque | green | shape` (Inter + rounded white cards + no photos).
Our chosen direction (`nature` / `colour-field` merged into `place` / `light` / `serif` / `green` / `photo`) differs from the prior app on 3 columns (`place`, `serif`, `photo`) and brings real documentary photography + cartographic SVG corridor maps to every screen.

---

## Refused Category Defaults

Top NGO and charity websites default to: (1) emotional poverty/guilt imagery or generic stock handshakes, (2) rounded white shadow cards stacked on soft cream/beige backgrounds, (3) arbitrary "$25 / $50 / $100" donation pills over a fake "75% complete" bar, and (4) vague uplifting buzzwords ("Empowering communities", "Transforming lives").

**What we refuse:**
- **No rounded shadow-card stacks:** We group with whitespace, strict vertical alignment, and exposed 1px hairline rules (`#D5DDD7`). Containers are sharp-edged architectural folios (`border-radius: 2px` or `0px`), never bubbly `28px` pillows.
- **No wellness cream:** Our paper ground (`#F7F8F5`) is cool chalk-stone tinted 2% toward leaf green, paired with mist stone (`#EEF1EC`) and crisp white archival sheets (`#FFFFFF`).
- **No 4-stat box row:** One primary figure owns the hero (`142 solar poles lit across 6 wards`); secondary figures sit in ruled ledger rows.
- **No vague USD donation pills:** Every contribution is tied to real Nigerian field costs in Naira (`₦68,500` for a replacement LiFePO4 battery pack, `₦284,000` for a complete 6m galvanized solar mast and luminaire, `₦45,000` for a certified youth mediator's monthly ward stipend).

---

## Design Tokens

### Colour Roles (Strictly Green, White, and Gray)

| Token | Light Mode (Hex) | Dark Mode (Hex) | Semantic Role & Contrast |
|---|---|---|---|
| `--ground` | `#F7F8F5` | `#0B120E` | Cool chalk-stone white tinted 2% toward leaf green (Dark: deep night-ward forest black) |
| `--raised` | `#EEF1EC` | `#131D17` | Mist stone grey-green secondary surface for ledger bands & schematics |
| `--sheet` | `#FFFFFF` | `#18241D` | Crisp archival white sheet for primary dossiers & forms |
| `--ink` | `#111914` | `#EBF0EC` | Deep forest-slate charcoal primary text (16.4:1 on `--ground`) |
| `--ink-2` | `#3E4C43` | `#9BB0A2` | Green-tinted secondary slate body copy (8.2:1 on `--ground`) |
| `--ink-3` | `#637268` | `#6E8476` | Green-tinted tertiary metadata & captions (4.8:1 on `--ground`, exceeds 4.5:1 AA) |
| `--rule` | `#D5DDD7` | `#24332A` | 1px exposed structural hairline divider |
| `--accent` | `#0E5A36` | `#279B61` | Deep civic signal emerald — owns ONE role: primary action & verified field status |
| `--on-accent` | `#F7F8F5` | `#08120C` | Chalk-stone text/glyphs on `--accent` (8.5:1 contrast) |

### Typography Tokens (Self-Hosted via `@fontsource`, Zero Inter)

- **Display & Editorial Headlines (`--font-serif`):** `'Newsreader Variable'`, optical size axis enabled (`opsz 36..72`). Roman 500/600 weight with **one meaning-carrying italic word** per major headline.
- **UI Controls & Long-Form Body (`--font-sans`):** `'Mona Sans Variable'`, clean, high-x-height grotesque with subtle architectural tension.
- **Coordinates, Voucher Codes & Tabular Numerals (`--font-mono`):** `'IBM Plex Mono'` (400, 500) with `font-variant-numeric: tabular-nums`.

| Step | Role | Family | Size / Line-Height | Weight | Tracking |
|---|---|---|---|---|---|
| 1 | Hero Display / Headline | `Newsreader Variable` | `56px` (`3.5rem`) / `1.05` (Mobile: `38px`) | `500` | `-0.025em` |
| 2 | Page / Section Title | `Newsreader Variable` | `36px` (`2.25rem`) / `1.12` (Mobile: `28px`) | `500` | `-0.02em` |
| 3 | Sub-section / Dossier Title | `Newsreader Variable` | `24px` (`1.5rem`) / `1.22` | `500` | `-0.015em` |
| 4 | Primary Body Copy | `Mona Sans Variable` | `17px` / `1.6` | `400` | `-0.005em` |
| 5 | Secondary UI / Table Cell | `Mona Sans Variable` | `15px` / `1.5` | `400` / `600` | `0em` |
| 6 | Metadata / GPS / Registry | `IBM Plex Mono` | `13px` / `1.45` | `400` / `500` | `+0.01em` |

*Hard Floor:* No text anywhere on any page or mobile screen is below `12px` (`13px` is our practical metadata floor).

### Layout, Spacing & Radius Tokens
- **Grid:** 12-column architectural broadsheet grid (`max-w-7xl`, `1280px`), `24px` outer margin on mobile (`390px`), `32px` on desktop (`1440px`), `1px` exposed `#D5DDD7` rules separating columns and rows.
- **Spacing scale:** `4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px`.
- **Radius family:** `2px` (`rounded-sm`) for archival frames, photos, and inputs; `0px` for ruled ledger tables.

---

## Richness Source & Art Direction

1. **Documentary Photography (11 Local CC Photographs in `public/images/`):**
   - Shot at street level in daylight and dusk across Lagos and Nigerian schools (`lagos-corridor.jpg`, `lekki-community.jpg`, `school-assembly.jpg`, `schoolboys-uniform.jpg`, `classroom-student.jpg`, `classroom-full.jpg`, `lagos-digital-hub.jpg`, `market-walkway.jpg`, `solar-committee.jpg`, `neighborhood-children.jpg`, `lit-night-road.jpg`).
   - **Grade:** Unified with `filter: contrast(1.04) saturate(0.92)` inside a `1px solid #D5DDD7` frame with an attached archival caption strip showing the exact ward, GPS coordinates, date, and Creative Commons credit.
2. **Cartographic SVG Street-Corridor Schematics:**
   - Every ward intervention pairs its photograph with a precision SVG street-corridor schematic rendered in `--ink`, `--rule`, and `--accent` (`#0E5A36`), plotting numbered solar poles (`AJ-01` through `AJ-32`), school gates, canal footbridges, and dusk-to-dawn lux coverage radii.

---

## Signature Interaction: Interactive Ward Corridor Schematic & Hardware Grant Ledger

- **Trigger:** Tapping or clicking a ward tab (*Ajegunle Canal Walk*, *Mushin Market Lane*, or *Makoko Jetty Approach*) or an individual plotted pole cluster on the SVG corridor schematic, or selecting a specific field budget line item (*1 LiFePO4 battery pack — ₦68,500*, *1 complete solar mast & lamp — ₦284,000*, *1 youth mediator monthly stipend — ₦45,000*).
- **Frames & Timing:**
  - **Frame 1 (0ms):** User taps *Ajegunle Canal Walk (32 poles)* or selects *1 complete solar mast & lamp (₦284,000)*.
  - **Frame 2 (140ms, spring `--spring-snappy`):** The SVG corridor map animates the active pole nodes (`AJ-01`..`AJ-32`) with a crisp emerald ring (`#0E5A36`), updating the tabular coordinate readout (`6.4474° N, 3.3326° E`) and commissioning log.
  - **Frame 3 (320ms, spring `--spring-smooth`):** The paired documentary photograph cross-fades to the ward's field photo with its signed Community Development Committee affidavit, and the grant allocation ledger recalculates the exact Naira split (`74.2%` hardware `₦210,728`, `16.8%` ward custodian stipends `₦47,712`, `9.0%` independent audit `₦25,560`).
- **Haptic (iOS Companion):** `.sensoryFeedback(.selection, trigger: selectedWard)` on corridor switch; `.sensoryFeedback(.impact(weight: .light), trigger: selectedGrantItem)` on ledger allocation.
- **Reduced-Motion Fallback:** Instant state swap and opacity cross-fade (`120ms linear`) with zero path or scale translation when `prefers-reduced-motion: reduce` is active.

---

## Step 3: Content Inventory (Written Before Layout)

### Global Masthead & Registry Strip
- **Registry Strip:** `CAC/IT/NO 148291 · SCUML RN 084192 · Lagos & Kaduna Field Offices · 2026 Audit Ledger Open`
- **Primary Navigation:** `Overview (/)` · `Evidence (/portfolio)` · `Donate (/donate)` · `Partners (/partnerships)` · `Forums (/events)` · `Dispatches (/blog)` · `Careers (/careers)` · `About (/about)` · `Contact (/contact)`
- **Primary Action Button:** `Fund a corridor`

### Screen / Page 1: Home (`/`)
- **Hero Display Headline:** *"Light along the school walk, before the first *bell*."*
- **Hero Lead Copy:** `"Safe Neighborhood Foundation installs off-grid solar street lamps along unlit school footpaths, trains neighborhood youth as certified dispute mediators, and links resident watch teams by two-way radio across Lagos, Kaduna, and Oyo."`
- **Single Hero Figure:** `142 solar poles lit across 6 wards` — `"Commissioned with GPS pole registries, quarterly battery checks, and signed community committee affidavits."`
- **Interactive Ward Corridor Atlas (3 Wards):**
  1. **Ward 01 — Ajegunle Canal Walk (`AJ-01` to `AJ-32`):**
     - Location: `Ajeromi-Ifelodun LGA, Lagos · 6.4474° N, 3.3326° E`
     - Commissioned: `14 March 2026 · 32 LiFePO4 poles across 2.4 km`
     - Measured Outcome: `-58.4% evening street robberies (Ajeromi Division log)`
     - Daily Footfall: `18,420 pupils and market commuters`
     - Photo: `/images/lagos-corridor.jpg`
     - Affidavit Sign-off: `"Signed: Chief O. Lawal, Chairman, Ajeromi Ward 4 Community Development Committee"`
  2. **Ward 02 — Mushin Market Lane (`MS-01` to `MS-24`):**
     - Location: `Mushin Central, Lagos · 6.5292° N, 3.3512° E`
     - Commissioned: `22 January 2026 · 24 solar poles + mediation hub`
     - Measured Outcome: `-41.2% nocturnal market stall break-ins`
     - Daily Footfall: `26,850 evening traders and apprentices`
     - Photo: `/images/market-walkway.jpg`
     - Affidavit Sign-off: `"Signed: Alhaja K. Adeleke, Secretary, Mushin Central Market Traders Association"`
  3. **Ward 03 — Makoko Jetty Approach (`MK-01` to `MK-18`):**
     - Location: `Yaba Waterfront, Lagos · 6.4969° N, 3.3934° E`
     - Commissioned: `09 May 2026 · 18 marine-grade poles + 28 VHF radios`
     - Measured Outcome: `-36.7% night jetty transit incidents · 8.5 min medical dispatch`
     - Daily Footfall: `19,940 waterfront residents`
     - Photo: `/images/lit-night-road.jpg`
     - Affidavit Sign-off: `"Signed: Baale J. Akapo, Waterfront Council of Elders, Yaba"`
- **Interactive Pole & Grant Allocation Ledger:**
  - Active Campaign: `Phase II School Corridor Expansion — Orile & Bariga Wards`
  - Ledger Status: `₦18,420,500 committed of ₦23,856,000 target (64 of 84 poles funded · 342 donors)`
  - Selectable Budget Items:
    - `1 Youth Mediator Monthly Stipend — ₦45,000`
    - `1 LiFePO4 Replacement Battery Pack — ₦68,500`
    - `1 Licensed VHF Watch Radio Pair — ₦112,000`
    - `1 Complete 6m Solar Mast & Luminaire — ₦284,000`
  - Audited Split: `74.2% Field Hardware · 16.8% Ward Maintenance Stipends · 9.0% External Audit & Permits`

### Screen / Page 2: Evidence Archive (`/portfolio`)
- **6 Complete Audited Interventions** with real photos (`/images/lagos-corridor.jpg`, `/images/lagos-digital-hub.jpg`, `/images/lit-night-road.jpg`, `/images/school-assembly.jpg`, `/images/market-walkway.jpg`, `/images/solar-committee.jpg`), exact voucher numbers, GPS coordinates, itemized Naira expenditure tables, and modal dossier viewer.
