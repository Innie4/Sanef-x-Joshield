# SANEF & JossyShield — Unified Multi-Tenant Platform

A unified multi-organization platform supporting two distinct public website experiences and one shared administration dashboard with strict organization-scoped RBAC and data isolation.

## Architected Organizations
1. **Safe Neighborhood Foundation (SANEF)**: Non-profit / NGO dedicated to grassroots community safety, solar-lit safe transit corridors, youth conflict mediation, and an open empirical evidence archive.
2. **JossyShield Security Services**: Elite commercial security enterprise offering physical facility guarding, armed convoys, corporate threat consultancy, tactical training academies, and a ready-to-deploy security personnel talent pool.

---

## Directory Structure

```
.
├── JossyShield/                     # Next.js 14 Web App — JossyShield Public Site & Client Requisition Portal
│   ├── app/                         # App Router (Home, Services, Marketplace, Careers, Contact, Testimonials)
│   ├── components/                  # Navbar, Footer, Interactive Marketplace Wizard, Candidate Modal
│   ├── lib/                         # Service definitions, jobs, and testimonials
│   └── package.json
│
├── SafeNeighborhoodFoundation/     # Next.js 14 Web App — SANEF Public Site & Evidence Archive
│   ├── app/                         # App Router (Home, About, Evidence Archive, Partnerships, Events, Blog, Donate)
│   ├── components/                  # Responsive civic navbar, footer
│   ├── lib/                         # Audited projects, partners, events, and campaign data
│   └── package.json
│
├── UnifiedDashboard/               # Next.js 14 Admin Console — Multi-Tenant Command Center
│   ├── app/                         # App Router & Multi-Tenant REST APIs (/api/tenants, /api/admin/...)
│   ├── components/                  # Dynamic Dashboard Shell with 1-click Tenant Switcher & RBAC Matrix
│   ├── lib/                         # Centralized multi-tenant repository & data engine
│   └── package.json
│
├── database/                        # PostgreSQL Production Schemas & Seed Data
│   ├── schema.sql                   # Multi-tenant tables with foreign key cascades & audit logging
│   └── seed.sql                     # Super Admin, tenants, permissions, and initial catalog seed
│
└── tasks/                           # Implementation roadmap & task checklists
    ├── plan.md                      # Comprehensive architectural breakdown
    └── todo.md                      # Checklists mapped to Trello board
```

---

## Brand Palettes & Design System (5/5 Apple Design Award Standard)

- **JossyShield**: Tactical dark theme utilizing `#08090c` obsidian black, `#161b24` slate card panels, and `#2563eb` tactical electric blue accents.
- **Safe Neighborhood Foundation**: Civic light theme utilizing `#ffffff` crisp white, `#f8fafc` soft alabaster, `#059669` forest emerald green, and neutral slate borders.
- **Unified Dashboard**: Adaptive command console with dynamic tenant-aware theming and instant organization context switching.

---

## Local Development Quickstart

Each subproject runs independently with its own dev port:

### 1. JossyShield (Port 3001)
```bash
cd "JossyShield"
npm install
npm run dev
# Opens at http://localhost:3001
```

### 2. Safe Neighborhood Foundation (Port 3002)
```bash
cd "SafeNeighborhoodFoundation"
npm install
npm run dev
# Opens at http://localhost:3002
```

### 3. Unified Dashboard (Port 3000)
```bash
cd "UnifiedDashboard"
npm install
npm run dev
# Opens at http://localhost:3000
```

---

## Vercel Deployment Instructions

Each project can be deployed directly to Vercel:

1. Push this repository to GitHub.
2. In the Vercel Dashboard, click **Add New Project** and select this repository.
3. In the project configuration:
   - For **JossyShield**: Set **Root Directory** to `JossyShield`.
   - For **Safe Neighborhood Foundation**: Set **Root Directory** to `SafeNeighborhoodFoundation`.
   - For **Unified Dashboard**: Set **Root Directory** to `UnifiedDashboard`.
4. Deploy! All three applications are pre-configured for Vercel with zero external configuration required.
