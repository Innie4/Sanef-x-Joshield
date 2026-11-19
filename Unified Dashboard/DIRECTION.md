# DIRECTION.md — Unified Platform Administration Dashboard

## Step 0: The Brief
- **App**: Unified Platform Administration Dashboard — Multi-tenant management console serving both Safe Neighborhood Foundation (SANEF) and JossyShield Security Services under one secure system shell.
- **Audience**: Platform Super Admins, SANEF Executive Directors & Content Editors, JossyShield Operations Directors, Recruitment Coordinators, and Service Dispatch Managers.
- **Core Action (First 10s)**: Switch organization context smoothly with one click, inspect real-time operational metrics (service requests, candidate pipeline, donation status), and manage content or recruitment actions.
- **Feel**: Mission-control executive console, highly responsive, zero latency, role-isolated, and context-aware.
- **Brand Theming**:
  - Global Shell: Premium neutral slate command console with dark/light adaptive sidebar.
  - Organization Context Dynamic Mode:
    - In **JossyShield** mode: Tactical dark slate accent with electric blue status indicators and recruitment Kanban.
    - In **SANEF** mode: Civic emerald accent with evidence archive and community donation feeds.

## Refused Defaults (Anti-Slop)
- Refuse generic flat bootstrap admin tables with clipped overflow.
- Refuse confusing multi-tenant clutter where users cannot instantly tell which organization they are operating within.
- Refuse unvalidated state changes; provide immediate optimistic UI with clear status badges and audit log feedback.

## Design Tokens & Modules
- **Context Switcher**: Persistent, prominent top-bar component displaying current organization badge, quick dropdown, and user role.
- **Recruitment Kanban**: Multi-column drag/click pipeline for JossyShield candidate vetting (New -> Review -> Shortlisted -> Interview -> Approved -> Talent Pool).
- **Service Request Hub**: Real-time incoming leads with reference numbers, client details, status pipeline, and follow-up history notes.
- **SANEF Content Studio**: Clean markdown/rich-text editor with live preview, media library integration, and publishing state control (Draft -> Review -> Published).
- **RBAC Matrix**: Granular permission toggles scoped strictly per organization to guarantee zero cross-tenant data leakage.
