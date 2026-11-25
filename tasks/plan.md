# Unified Platform Project Plan: SANEF & JossyShield

**Source Spec**: `SANEF + JOSSYSHIELD Unified Platform Project Plan (Version 1.0, November 2026)`  
**Architecture Model**: Modular Monolith with Multi-Organisation Support  
**Primary Organisations**:
1. **Safe Neighborhood Foundation (SANEF)** (NGO / Foundation: Community projects, events, partnerships, gallery/evidence, donations)
2. **JossyShield Security Services** (Security Company: Commercial services, consultancy, training, recruitment, talent pool management)
**Status**: Ready for Execution & Board Populating

---

## 1. Project Overview & System Architecture

```
                                  ┌───────────────────────────────┐
                                  │      Client Web Clients       │
                                  └───────────────┬───────────────┘
                                                  │
                 ┌────────────────────────────────┼────────────────────────────────┐
                 ▼                                ▼                                ▼
  ┌─────────────────────────────┐  ┌─────────────────────────────┐  ┌─────────────────────────────┐
  │      SANEF Public Site      │  │  JossyShield Public Site   │  │  Unified Admin Dashboard    │
  │     (sanef.example)         │  │    (jossyshield.example)    │  │      (admin.example)        │
  └──────────────┬──────────────┘  └──────────────┬──────────────┘  └──────────────┬──────────────┘
                 │                                │                                │
                 └────────────────────────────────┼────────────────────────────────┘
                                                  │ (HTTPS / REST API)
                                                  ▼
                                 ┌─────────────────────────────────┐
                                 │       Modular Backend API       │
                                 │  - Auth & Org Context Resolver  │
                                 │  - Granular RBAC Engine         │
                                 │  - Multi-Org Data Isolation     │
                                 │  - Media & S3 Signed URL Mgr    │
                                 └────────────────┬────────────────┘
                                                  │
                 ┌────────────────────────────────┴────────────────────────────────┐
                 ▼                                                                 ▼
  ┌─────────────────────────────┐                                   ┌─────────────────────────────┐
  │   PostgreSQL Database       │                                   │   Object Storage (S3)       │
  │ (Tenancy by organization_id)│                                   │ (Public & Private Buckets)  │
  └─────────────────────────────┘                                   └─────────────────────────────┘
```

---

## 2. Epics and Task Breakdown (End-to-End)

---

### EPIC 1: Database Architecture & Multi-Tenant Data Layer (`[DB]`)

#### Task DB-01: Multi-Tenancy & Core RBAC Schema Migration
- **Discipline**: Database (`DB`)
- **Urgency**: **High** (P0 - Blocker for all backend services)
- **Dependencies**: None
- **Description**: Design and implement the core PostgreSQL database schema for multi-tenancy, authentication, and RBAC.
- **Subtasks**:
  - `DB-01.1`: Create `organizations` table (`id`, `name`, `slug`, `type`, `created_at`, `updated_at`).
  - `DB-01.2`: Create `users` table (`id`, `email`, `password_hash`, `first_name`, `last_name`, `is_super_admin`, `is_active`, `timestamps`).
  - `DB-01.3`: Create `organization_memberships` table linking `users` and `organizations` with status (`active`, `invited`, `suspended`).
  - `DB-01.4`: Create `roles` table (scoped by org or global) and `permissions` table (`blog.create`, `talent_pool.manage`, etc.).
  - `DB-01.5`: Create junction tables `membership_roles` and `role_permissions` with foreign key cascades and unique constraints.
  - `DB-01.6`: Create `audit_logs` table (`id`, `organization_id`, `user_id`, `action`, `resource`, `resource_id`, `ip_address`, `metadata`, `created_at`).
- **Acceptance Criteria**:
  - Migrations run cleanly up and down.
  - Foreign keys, composite unique indexes (e.g. `(user_id, organization_id)`), and NOT NULL constraints enforced.

#### Task DB-02: Shared CMS, Media & Site Settings Schema
- **Discipline**: Database (`DB`)
- **Urgency**: **High** (P0)
- **Dependencies**: `DB-01`
- **Description**: Implement database tables for CMS content and digital asset storage scoped by organization.
- **Subtasks**:
  - `DB-02.1`: Create `pages` table (`id`, `organization_id`, `slug`, `title`, `content_json`, `status` [draft, review, published, archived], `published_at`).
  - `DB-02.2`: Create `blog_posts` table (`id`, `organization_id`, `author_id`, `title`, `slug`, `summary`, `body_html`, `category`, `featured`, `status`, `published_at`).
  - `DB-02.3`: Create `media` table (`id`, `organization_id`, `uploader_id`, `file_name`, `file_path`, `mime_type`, `file_size`, `access_level` [public, private], `metadata`).
  - `DB-02.4`: Create `site_settings` table (`id`, `organization_id`, `key`, `value_json`, `updated_at`) with unique `(organization_id, key)`.
- **Acceptance Criteria**:
  - All records strictly mandate `organization_id` foreign key.
  - Indexes on `(organization_id, slug)` and `(organization_id, status)`.

#### Task DB-03: SANEF Specific Data Schema (Projects, Partners, Events, Donations)
- **Discipline**: Database (`DB`)
- **Urgency**: **High** (P0)
- **Dependencies**: `DB-01`, `DB-02`
- **Description**: Schema for Safe Neighborhood Foundation community entities.
- **Subtasks**:
  - `DB-03.1`: Create `projects` table (`id`, `organization_id`, `title`, `summary`, `detailed_description`, `category`, `date`, `location`, `status`, `is_featured`, `evidence_data`).
  - `DB-03.2`: Create `partnerships` table (`id`, `organization_id`, `name`, `logo_media_id`, `profile`, `website`, `partnership_period`, `partnership_type`, `contributions_summary`).
  - `DB-03.3`: Create `project_partners` pivot table linking projects and partnerships.
  - `DB-03.4`: Create `events` table (`id`, `organization_id`, `title`, `description`, `event_date`, `location`, `registration_url`, `status`, `media_id`).
  - `DB-03.5`: Create `donation_campaigns` and `donations` tables (`id`, `campaign_id`, `donor_name`, `amount`, `currency`, `reference_no`, `status`).
  - `DB-03.6`: Create `contact_submissions` table (`id`, `organization_id`, `name`, `email`, `phone`, `subject`, `message`, `status`).
- **Acceptance Criteria**:
  - Foreign keys cleanly established with `media` and `organizations`.

#### Task DB-04: JossyShield Specific Data Schema (Recruitment, Talent Pool & Services)
- **Discipline**: Database (`DB`)
- **Urgency**: **High** (P0)
- **Dependencies**: `DB-01`, `DB-02`
- **Description**: Schema for commercial security offerings, client service requests, recruitment pipeline, and security personnel talent pool.
- **Subtasks**:
  - `DB-04.1`: Create `services` table (`id`, `organization_id`, `category` [security, consultancy, training], `title`, `description`, `scope`, `is_active`).
  - `DB-04.2`: Create `marketplace_requests` table (`id`, `organization_id`, `reference_number`, `service_type`, `client_name`, `company_name`, `email`, `phone`, `location`, `details_json`, `status`, `notes`).
  - `DB-04.3`: Create `jobs` table (`id`, `organization_id`, `title`, `role_description`, `requirements`, `deadline`, `location`, `status`).
  - `DB-04.4`: Create `job_applications` table (`id`, `job_id`, `organization_id`, `applicant_name`, `email`, `phone`, `experience_years`, `cv_media_id`, `status` [new, under_review, shortlisted, interview_scheduled, interview_completed, approved, talent_pool, on_hold, rejected, withdrawn]).
  - `DB-04.5`: Create `interviews` table (`id`, `application_id`, `scheduled_at`, `interviewers`, `feedback_notes`, `outcome`).
  - `DB-04.6`: Create `talent_pool_profiles` table (`id`, `application_id`, `organization_id`, `skills`, `qualification_status`, `deployment_area`, `availability_status` [available, unavailable, unknown, awaiting_confirmation], `last_confirmed_at`, `internal_notes`).
  - `DB-04.7`: Create `testimonials` table (`id`, `organization_id`, `client_name`, `client_title`, `quote`, `rating`, `is_approved`).
- **Acceptance Criteria**:
  - Reference numbers uniquely constrained.
  - Foreign key relations to private CV `media` records.

---

### EPIC 2: Backend Architecture & Services (`[Back-End]`)

#### Task BE-01: Multi-Tenant Architecture & Auth Engine
- **Discipline**: Back-End (`Back-End`)
- **Urgency**: **High** (P0 - Blocker for all frontend integrations)
- **Dependencies**: `DB-01`
- **Description**: Core backend server setup, JWT authentication, and multi-tenant context resolution middleware.
- **Subtasks**:
  - `BE-01.1`: Initialize backend framework with routing, error handling, and structured logging.
  - `BE-01.2`: Implement user authentication (login, refresh tokens, password reset, profile management).
  - `BE-01.3`: Build `OrganizationContextMiddleware`: extracts active organization from request header / subdomain and validates user membership.
  - `BE-01.4`: Implement RBAC authorization guard: verifies user permissions within the active organization context.
  - `BE-01.5`: Super Admin bypass/override handlers for cross-tenant administration.
- **Acceptance Criteria**:
  - Unauthorized requests to another organization's endpoint strictly return HTTP 403.
  - Unit tests verify no token from User A in Org 1 can access Org 2 data without membership.

#### Task BE-02: Organization & User Management API
- **Discipline**: Back-End (`Back-End`)
- **Urgency**: **High** (P0)
- **Dependencies**: `BE-01`
- **Description**: Administrative endpoints for managing organizations, memberships, invitations, and permissions.
- **Subtasks**:
  - `BE-02.1`: Build organization CRUD & context switcher endpoints (`GET /api/v1/user/organizations`).
  - `BE-02.2`: Build user invite and registration acceptance workflow with email token.
  - `BE-02.3`: Build membership role assignment and permission updating endpoints.
  - `BE-02.4`: Implement audit log interceptor recording all admin security events.
- **Acceptance Criteria**:
  - Membership changes trigger audit log entries.

#### Task BE-03: Media Management Service & Secure Storage API
- **Discipline**: Back-End (`Back-End`)
- **Urgency**: **High** (P0)
- **Dependencies**: `DB-02`, `BE-01`
- **Description**: Storage service supporting public website media and private sensitive files (CVs, documents).
- **Subtasks**:
  - `BE-03.1`: Implement file upload handler with MIME-type whitelist and size limits.
  - `BE-03.2`: Implement public asset delivery pipeline (images, brochures, logos).
  - `BE-03.3`: Implement private file storage and signed URL generation with expiration for CVs and recruitment documents.
  - `BE-03.4`: Scope all media records by `organization_id` to prevent cross-org asset access.
- **Acceptance Criteria**:
  - Public URLs cannot access CV uploads; private downloads require authorized bearer token.

#### Task BE-04: Shared CMS & Settings API
- **Discipline**: Back-End (`Back-End`)
- **Urgency**: **Medium** (P1)
- **Dependencies**: `DB-02`, `BE-01`
- **Description**: Endpoints for dynamic pages, blog engine, and site configuration.
- **Subtasks**:
  - `BE-04.1`: CRUD for CMS pages with lifecycle status (`draft`, `review`, `published`, `archived`).
  - `BE-04.2`: CRUD for blog posts with categories, slug generation, and published filters.
  - `BE-04.3`: Public API endpoints for fetching published CMS pages and blog posts by slug.
  - `BE-04.4`: Site settings get/update endpoints scoped by organization.
- **Acceptance Criteria**:
  - Public endpoints return only `published` status records.

#### Task BE-05: SANEF Foundation Services API
- **Discipline**: Back-End (`Back-End`)
- **Urgency**: **High** (P0)
- **Dependencies**: `DB-03`, `BE-01`, `BE-03`
- **Description**: Backend domain services for SANEF public portal and dashboard management.
- **Subtasks**:
  - `BE-05.1`: Projects and evidence archive API (CRUD for admin, filterable public read).
  - `BE-05.2`: Partnerships management API (partner profiles, linked projects, outcomes).
  - `BE-05.3`: Events API (upcoming/past events, registration links).
  - `BE-05.4`: Contact enquiry submission endpoint with rate-limiting and notification alert.
  - `BE-05.5`: Donations and campaign management API.
- **Acceptance Criteria**:
  - SANEF APIs reject requests missing SANEF organization context.

#### Task BE-06: JossyShield Services & Marketplace Request API
- **Discipline**: Back-End (`Back-End`)
- **Urgency**: **High** (P0)
- **Dependencies**: `DB-04`, `BE-01`
- **Description**: Backend endpoints for service catalog and marketplace lead-generation pipeline.
- **Subtasks**:
  - `BE-06.1`: Services catalog API (Security, Consultancy, Training services).
  - `BE-06.2`: Public marketplace service request submission endpoint (generates unique reference number e.g. `JS-REQ-XXXXX`).
  - `BE-06.3`: Admin marketplace request management API (status pipeline: New, Contacted, In Review, Quoted, Closed).
  - `BE-06.4`: Client follow-up history and internal notes API.
- **Acceptance Criteria**:
  - Submissions automatically generate reference number and timestamped history.

#### Task BE-07: JossyShield Recruitment & Talent Pool Pipeline API
- **Discipline**: Back-End (`Back-End`)
- **Urgency**: **High** (P0)
- **Dependencies**: `DB-04`, `BE-01`, `BE-03`
- **Description**: Recruitment engine, applicant management, interview scheduling, and ready-to-deploy talent pool.
- **Subtasks**:
  - `BE-07.1`: Public vacancy listing & general candidate application endpoint (multipart upload for CV).
  - `BE-07.2`: Dashboard applicant review API with pipeline status updates (`new` -> `under_review` -> `shortlisted` -> `interview_scheduled` -> `interview_completed` -> `approved` -> `talent_pool`).
  - `BE-07.3`: Interview management API (schedule interview, assign interviewer, submit notes/scores).
  - `BE-07.4`: Talent pool profile conversion & directory API (filter by skills, deployment area, availability).
  - `BE-07.5`: Candidate availability confirmation API (update status: available, unavailable, awaiting confirmation).
- **Acceptance Criteria**:
  - CV download links are securely signed and restricted to authorized recruitment roles.

---

### EPIC 3: Frontend — SANEF Public Website (`[Front-End - SANEF]`)

#### Task FE-SANEF-01: Layout, Design System & Navigation
- **Discipline**: Front-End (`Front-End`)
- **Urgency**: **High** (P0)
- **Dependencies**: None
- **Description**: Implement SANEF's foundation theme, typography, responsive layout, header navigation, and footer.
- **Subtasks**:
  - `FE-SANEF-01.1`: Setup responsive layout shell, branding color scheme (NGO community theme), and typography.
  - `FE-SANEF-01.2`: Build responsive Navbar with links: Home, About Us, Blog, Portfolio/Gallery, Partnerships, Events, Careers, Contact, Donate.
  - `FE-SANEF-01.3`: Build comprehensive Footer with legal links, social channels, and contact info.
- **Acceptance Criteria**:
  - Responsive across mobile, tablet, and desktop viewports.

#### Task FE-SANEF-02: Home / Landing Page
- **Discipline**: Front-End (`Front-End`)
- **Urgency**: **High** (P0)
- **Dependencies**: `FE-SANEF-01`, `BE-05`
- **Description**: Build SANEF landing page engaging community members and donors.
- **Subtasks**:
  - `FE-SANEF-02.1`: Hero section with mission statement and primary Call-To-Action (Donate / Get Involved).
  - `FE-SANEF-02.2`: Impact highlights and key verified metrics section.
  - `FE-SANEF-02.3`: Featured projects and selected portfolio showcase carousel/grid.
  - `FE-SANEF-02.4`: Partner logos carousel and latest news / upcoming events preview.
- **Acceptance Criteria**:
  - Dynamic data populated from API with graceful loading and skeleton states.

#### Task FE-SANEF-03: About Us & Blog Pages
- **Discipline**: Front-End (`Front-End`)
- **Urgency**: **Medium** (P1)
- **Dependencies**: `FE-SANEF-01`, `BE-04`
- **Description**: About Us organizational profile and content-rich Blog section.
- **Subtasks**:
  - `FE-SANEF-03.1`: About Us page: History, mission, vision, values, leadership team, and focus areas.
  - `FE-SANEF-03.2`: Blog list page: Category filtering, search, featured posts, publication dates.
  - `FE-SANEF-03.3`: Blog article detail page: Structured article view, author info, related articles.
- **Acceptance Criteria**:
  - SEO-friendly metadata and responsive reading typography.

#### Task FE-SANEF-04: Structured Portfolio & Evidence Archive
- **Discipline**: Front-End (`Front-End`)
- **Urgency**: **High** (P0)
- **Dependencies**: `FE-SANEF-01`, `BE-05`
- **Description**: Project archive with proof, media, downloadable reports, and outcomes.
- **Subtasks**:
  - `FE-SANEF-04.1`: Project archive gallery with filters (category, year, location).
  - `FE-SANEF-04.2`: Project detail page displaying photos, videos, downloadable PDF reports, external press links, and partner contributions.
- **Acceptance Criteria**:
  - Document downloads and media lightboxes functioning smoothly.

#### Task FE-SANEF-05: Partnerships & Events Pages
- **Discipline**: Front-End (`Front-End`)
- **Urgency**: **Medium** (P1)
- **Dependencies**: `FE-SANEF-01`, `BE-05`
- **Description**: Partner profiles and community events calendar.
- **Subtasks**:
  - `FE-SANEF-05.1`: Partnerships directory with partner profiles, collaboration history, and linked projects.
  - `FE-SANEF-05.2`: Events page displaying upcoming and past events with dates, locations, and registration links.
- **Acceptance Criteria**:
  - Clear distinction between upcoming and past events.

#### Task FE-SANEF-06: Careers, Contact & Donation Pages
- **Discipline**: Front-End (`Front-End`)
- **Urgency**: **High** (P0)
- **Dependencies**: `FE-SANEF-01`, `BE-05`
- **Description**: Interactive pages for vacancy announcements, enquiries, and donations.
- **Subtasks**:
  - `FE-SANEF-06.1`: Careers page listing open vacancies with application instructions.
  - `FE-SANEF-06.2`: Contact page with validated enquiry form, direct WhatsApp button, and social channels.
  - `FE-SANEF-06.3`: Donate page displaying campaigns, bank transfer / support methods, and future payment integration placeholder.
- **Acceptance Criteria**:
  - Enquiry form validates inputs and displays success confirmation alert.

---

### EPIC 4: Frontend — JossyShield Public Website (`[Front-End - JossyShield]`)

#### Task FE-JS-01: Layout, Corporate Branding & Navigation
- **Discipline**: Front-End (`Front-End`)
- **Urgency**: **High** (P0)
- **Dependencies**: None
- **Description**: Implement JossyShield's corporate security design language, navbar, and footer.
- **Subtasks**:
  - `FE-JS-01.1`: Setup corporate security aesthetic (dark/navy accents, clean typography, trust indicators).
  - `FE-JS-01.2`: Responsive Navbar: Home, About Us, Services, Marketplace / Request a Service, Careers, Contact, Testimonials.
  - `FE-JS-01.3`: Corporate Footer with certifications, licensing info, contact lines, and navigation.
- **Acceptance Criteria**:
  - Completely distinct visual identity from SANEF.

#### Task FE-JS-02: Home & About Us Pages
- **Discipline**: Front-End (`Front-End`)
- **Urgency**: **High** (P0)
- **Dependencies**: `FE-JS-01`, `BE-06`
- **Description**: Corporate credibility, core offerings, and company profile.
- **Subtasks**:
  - `FE-JS-02.1`: Hero section highlighting security expertise, reliability, and fast quote CTA.
  - `FE-JS-02.2`: Core service pillars overview (Commercial Security, Consultancy, Training).
  - `FE-JS-02.3`: Testimonials carousel and trust badges.
  - `FE-JS-02.4`: About Us page: Mission, vision, leadership, compliance standards, and operating capabilities.
- **Acceptance Criteria**:
  - High performance and professional presentation.

#### Task FE-JS-03: Services Showcase (Security, Consultancy, Training)
- **Discipline**: Front-End (`Front-End`)
- **Urgency**: **Medium** (P1)
- **Dependencies**: `FE-JS-01`, `BE-06`
- **Description**: Detailed service pages with inquiry CTAs.
- **Subtasks**:
  - `FE-JS-03.1`: Security Services page (patrol, guarding, event security, tech surveillance).
  - `FE-JS-03.2`: Consultancy Services page (risk assessment, security audits, protocol design).
  - `FE-JS-03.3`: Training Services page (tactical, defensive, corporate security readiness).
- **Acceptance Criteria**:
  - Each service page includes direct links into the Marketplace request form pre-selected with that service category.

#### Task FE-JS-04: Marketplace / Request a Service Workflow
- **Discipline**: Front-End (`Front-End`)
- **Urgency**: **High** (P0)
- **Dependencies**: `FE-JS-01`, `BE-06`
- **Description**: Multi-step interactive service request flow.
- **Subtasks**:
  - `FE-JS-04.1`: Category selection step (Security Services / Consultancy / Training).
  - `FE-JS-04.2`: Dynamic form fields adapting to category (e.g., personnel count for Security; dates for Consultancy; trainee count for Training).
  - `FE-JS-04.3`: Submission confirmation screen displaying unique tracking reference number (e.g. `JS-REQ-10492`).
- **Acceptance Criteria**:
  - Form validation, reference number display, and clear next-steps guidance.

#### Task FE-JS-05: Careers & Candidate Application Portal
- **Discipline**: Front-End (`Front-End`)
- **Urgency**: **High** (P0)
- **Dependencies**: `FE-JS-01`, `BE-07`
- **Description**: Job vacancy listings and secure CV submission.
- **Subtasks**:
  - `FE-JS-05.1`: Vacancy listings with filter by role and location.
  - `FE-JS-05.2`: General talent application option (for spontaneous security candidates).
  - `FE-JS-05.3`: Multi-field application form (contact, experience, qualifications, availability, location, CV file upload).
  - `FE-JS-05.4`: Submission confirmation with applicant reference ID.
- **Acceptance Criteria**:
  - File upload validates PDF/Word format, restricts file size to <=5MB, and confirms upload.

#### Task FE-JS-06: Testimonials & Contact Pages
- **Discipline**: Front-End (`Front-End`)
- **Urgency**: **Low** (P2)
- **Dependencies**: `FE-JS-01`, `BE-06`
- **Description**: Client testimonials directory and direct contact channels.
- **Subtasks**:
  - `FE-JS-06.1`: Testimonials grid featuring approved client reviews and case summaries.
  - `FE-JS-06.2`: Contact page with direct phone lines, rapid dispatch hotline, email form, and WhatsApp chat link.
- **Acceptance Criteria**:
  - Fast response submission feedback.

---

### EPIC 5: Frontend — Unified Admin Dashboard (`[Front-End - Dashboard]`)

#### Task FE-DASH-01: Admin Shell, Authentication & Org Switcher
- **Discipline**: Front-End (`Front-End`)
- **Urgency**: **High** (P0 - Critical Core Component)
- **Dependencies**: `BE-01`, `BE-02`
- **Description**: Unified admin dashboard layout with dynamic organization switching.
- **Subtasks**:
  - `FE-DASH-01.1`: Admin Login, Forgot Password, and Profile screens.
  - `FE-DASH-01.2`: Responsive Admin Shell (Sidebar, Topbar with User Avatar, Breadcrumbs, Notifications).
  - `FE-DASH-01.3`: Organization Switcher dropdown: Allows switching between SANEF and JossyShield, updating store context and permissions.
  - `FE-DASH-01.4`: Dynamic navigation menu rendering based on active organization and assigned user roles.
- **Acceptance Criteria**:
  - Switching organization reloads all context and updates sidebar links immediately.
  - Users without permissions for a module cannot see or navigate to its route.

#### Task FE-DASH-02: Organization Overview Dashboards
- **Discipline**: Front-End (`Front-End`)
- **Urgency**: **Medium** (P1)
- **Dependencies**: `FE-DASH-01`, `BE-05`, `BE-06`, `BE-07`
- **Description**: Metric cards and recent activity feed tailored per organization.
- **Subtasks**:
  - `FE-DASH-02.1`: SANEF Overview: Project count, active events, recent donations, latest enquiries, quick action buttons.
  - `FE-DASH-02.2`: JossyShield Overview: New service requests count, active job openings, candidates in review, talent pool size, recent enquiries.
- **Acceptance Criteria**:
  - Stats load according to active organization context and user permission level.

#### Task FE-DASH-03: Shared CMS & Media Library Modules
- **Discipline**: Front-End (`Front-End`)
- **Urgency**: **High** (P0)
- **Dependencies**: `FE-DASH-01`, `BE-03`, `BE-04`
- **Description**: Dashboard content authoring and asset management.
- **Subtasks**:
  - `FE-DASH-03.1`: CMS Page editor with rich-text / markdown, preview, and status publishing flow.
  - `FE-DASH-03.2`: Blog article manager with category tagging, draft/publish workflow, and image attachment.
  - `FE-DASH-03.3`: Media Library manager: drag-and-drop file upload, thumbnail gallery, folder/tag filter, copy link.
- **Acceptance Criteria**:
  - Media library displays only the active organization's assets.

#### Task FE-DASH-04: SANEF Content Modules (Projects, Partners, Events, Donations)
- **Discipline**: Front-End (`Front-End`)
- **Urgency**: **High** (P0)
- **Dependencies**: `FE-DASH-01`, `BE-05`
- **Description**: Management interfaces for SANEF-specific operations.
- **Subtasks**:
  - `FE-DASH-04.1`: Projects & Evidence Archive manager (create, edit, upload PDF evidence, tag partners).
  - `FE-DASH-04.2`: Partnerships manager (create partner profile, upload logo, link collaborations).
  - `FE-DASH-04.3`: Events manager (schedule events, past/upcoming toggle, registration links).
  - `FE-DASH-04.4`: Donations record viewer & campaign manager.
  - `FE-DASH-04.5`: Contact Enquiries inbox with reply/status marking.
- **Acceptance Criteria**:
  - Full CRUD operations with instant UI feedback and confirmation dialogs.

#### Task FE-DASH-05: JossyShield Marketplace Request Manager
- **Discipline**: Front-End (`Front-End`)
- **Urgency**: **High** (P0)
- **Dependencies**: `FE-DASH-01`, `BE-06`
- **Description**: Interface for processing inbound client service requests.
- **Subtasks**:
  - `FE-DASH-05.1`: Service request list table with status badges (`New`, `Under Review`, `Contacted`, `Quoted`, `Closed`), search, and filters.
  - `FE-DASH-05.2`: Request detail modal/drawer showing client details, requirement JSON, and reference number.
  - `FE-DASH-05.3`: Status update selector and internal follow-up notes thread.
- **Acceptance Criteria**:
  - Status updates persist and are logged in audit trail.

#### Task FE-DASH-06: JossyShield Recruitment & Talent Pool Module
- **Discipline**: Front-End (`Front-End`)
- **Urgency**: **High** (P0 - Essential Differentiator)
- **Dependencies**: `FE-DASH-01`, `BE-07`, `BE-03`
- **Description**: End-to-end recruitment pipeline, interview scheduler, and talent pool directory.
- **Subtasks**:
  - `FE-DASH-06.1`: Vacancies manager (create and publish role listings).
  - `FE-DASH-06.2`: Applicant Tracking Pipeline (Kanban or table view of candidate stages: New -> Under Review -> Shortlisted -> Interview Scheduled -> Interview Completed -> Approved -> Talent Pool).
  - `FE-DASH-06.3`: Applicant Detail View with secure CV preview / download, qualification notes, and recruiter assignment.
  - `FE-DASH-06.4`: Interview Scheduler dialog (recording interview date, interviewer names, feedback score, outcome).
  - `FE-DASH-06.5`: Ready-to-Work Talent Pool directory: search by skills, location, deployment availability (available / unavailable / awaiting confirmation), and manual availability check trigger.
- **Acceptance Criteria**:
  - Candidates can be moved smoothly across recruitment stages into the talent pool.

#### Task FE-DASH-07: User, Role & Permissions Administration
- **Discipline**: Front-End (`Front-End`)
- **Urgency**: **High** (P0)
- **Dependencies**: `FE-DASH-01`, `BE-02`
- **Description**: RBAC management and user invitation controls.
- **Subtasks**:
  - `FE-DASH-07.1`: User list and invite modal (email, organization, role assignment).
  - `FE-DASH-07.2`: Role and permission editor (fine-grained permission toggles).
  - `FE-DASH-07.3`: Security Audit Logs viewer (filter by user, action, and date range).
- **Acceptance Criteria**:
  - Accessible only to Super Admins and Org Admins.

---

### EPIC 6: DevOps, Testing & Security Hardening (`[DevOps]`)

#### Task OPS-01: Containerization & Local Development Orchestration
- **Discipline**: DevOps (`DevOps`)
- **Urgency**: **High** (P0)
- **Dependencies**: None
- **Description**: Standardize container environments for reproducible builds.
- **Subtasks**:
  - `OPS-01.1`: Author production Dockerfile for modular backend API.
  - `OPS-01.2`: Author production Dockerfiles for frontends (SANEF, JossyShield, Admin Dashboard).
  - `OPS-01.3`: Create unified `docker-compose.yml` for local development (Backend, Frontends, PostgreSQL, MinIO/Localstack).
  - `OPS-01.4`: Script automated database seeding for initial Super Admin and sample organization data.
- **Acceptance Criteria**:
  - Single `docker compose up` starts the entire system locally with sample data.

#### Task OPS-02: CI/CD Quality Gates & Automated Pipelines
- **Discipline**: DevOps (`DevOps`)
- **Urgency**: **High** (P0)
- **Dependencies**: `OPS-01`
- **Description**: Continuous integration workflows for automated verification.
- **Subtasks**:
  - `OPS-02.1`: Build CI pipeline running linters, type checks, and formatters on all PRs.
  - `OPS-02.2`: Automated unit and integration test runner for backend API and frontend test suites.
  - `OPS-02.3`: Container image build and vulnerability scanning (Trivy / Snyk).
  - `OPS-02.4`: Automated database migration dry-run check in CI.
- **Acceptance Criteria**:
  - Pull requests blocked if test suite or linting fails.

#### Task OPS-03: Multi-Tenant Data Isolation & Security Audit
- **Discipline**: DevOps (`DevOps`)
- **Urgency**: **High** (P0 - Security Hardening)
- **Dependencies**: `BE-01`, `BE-07`, `OPS-02`
- **Description**: Penetration testing and automated isolation verification to prevent data leaks.
- **Subtasks**:
  - `OPS-03.1`: Write automated test suite for cross-tenant access attempts (verifying SANEF user cannot read JossyShield candidate records, and vice versa).
  - `OPS-03.2`: Validate signed URL expiration and private document bucket policies for applicant CVs.
  - `OPS-03.3`: Review rate-limiting and anti-abuse policies on public form endpoints (Marketplace, Contact, Careers).
- **Acceptance Criteria**:
  - All cross-tenant isolation test cases pass with 100% assertion coverage.

---

### EPIC 7: Infrastructure, Hosting & Site Go-Live (`[Hosting & Live]`)

#### Task HOST-01: Cloud Infrastructure & Database Provisioning
- **Discipline**: Hosting (`Hosting & Live`)
- **Urgency**: **High** (P0)
- **Dependencies**: `OPS-01`
- **Description**: Stand up staging and production hosting environments.
- **Subtasks**:
  - `HOST-01.1`: Provision managed PostgreSQL cluster with automated daily backups and point-in-time recovery.
  - `HOST-01.2`: Provision S3-compatible cloud object storage (Public bucket for images, Private bucket for CVs and legal documents).
  - `HOST-01.3`: Configure secrets manager and environment configuration across Staging and Production.
- **Acceptance Criteria**:
  - Database connection pool verified and backup restore tested.

#### Task HOST-02: Reverse Proxy, Domain Routing & SSL Automation
- **Discipline**: Hosting (`Hosting & Live`)
- **Urgency**: **High** (P0)
- **Dependencies**: `HOST-01`
- **Description**: Multi-domain ingress routing to serve distinct sites from one deployment platform.
- **Subtasks**:
  - `HOST-02.1`: Configure reverse proxy / ingress rules:
    - Route `sanef.example` (and `www.sanef.example`) -> SANEF Public Website
    - Route `jossyshield.example` (and `www.jossyshield.example`) -> JossyShield Public Website
    - Route `admin.example` -> Unified Admin Dashboard
    - Route `api.example` (or `/api`) -> Backend API
  - `HOST-02.2`: Automated SSL/TLS certificate provisioning and renewal (Let's Encrypt / Cloudflare Edge).
  - `HOST-02.3`: Configure security headers (HSTS, CSP, X-Frame-Options, CORS whitelist).
- **Acceptance Criteria**:
  - All domains resolve cleanly via HTTPS with A+ security rating.

#### Task HOST-03: Staging Deployment & End-to-End User Acceptance Testing (UAT)
- **Discipline**: Hosting (`Hosting & Live`)
- **Urgency**: **High** (P0)
- **Dependencies**: `HOST-02`, All Epics
- **Description**: Deploy full build to Staging for stakeholder review.
- **Subtasks**:
  - `HOST-03.1`: Deploy latest release to Staging environment.
  - `HOST-03.2`: Execute End-to-End smoke tests across SANEF site, JossyShield site, and Admin Dashboard.
  - `HOST-03.3`: Validate email deliverability (invitations, contact notifications, applicant confirmations).
  - `HOST-03.4`: Stakeholder UAT sign-off across all key workflows.
- **Acceptance Criteria**:
  - Zero critical or high severity defects on Staging.

#### Task HOST-04: Production Go-Live, Monitoring & Handoff
- **Discipline**: Hosting (`Hosting & Live`)
- **Urgency**: **High** (P0 - Final Milestone)
- **Dependencies**: `HOST-03`
- **Description**: Production cutover, health check monitoring, and operational handoff.
- **Subtasks**:
  - `HOST-04.1`: Final database migration and seed verification on Production.
  - `HOST-04.2`: DNS cutover to live production IP/load balancer.
  - `HOST-04.3`: Setup uptime monitoring, application error alerting (Sentry), and log aggregation.
  - `HOST-04.4`: Deliver administrator guide and technical handoff documentation.
- **Acceptance Criteria**:
  - Both public websites and the admin dashboard are live, fast, secure, and monitored.

---

## 3. Trello Board Structure & Column Mapping

The user has specified the target organization on Trello:
- **Discipline Columns (Task Type)**:
  - `[DB]` Database Development
  - `[Back-End]` Backend APIs & Multi-Tenant Core
  - `[Front-End - SANEF]` SANEF Public Website
  - `[Front-End - JossyShield]` JossyShield Public Website
  - `[Front-End - Dashboard]` Unified Admin Dashboard
  - `[DevOps]` Containerization, CI/CD & Testing
  - `[Hosting & Live]` Cloud Infra, Ingress & Production Launch
- **Workflow / Status Columns**:
  - `To Do`
  - `In Progress`
  - `Reviewing`
  - `Done`
- **Labels / Badges**:
  - **Urgency**: `High Priority (P0)`, `Medium Priority (P1)`, `Low Priority (P2)`
  - **Type**: `Database`, `Backend`, `Frontend`, `DevOps`, `Hosting`
