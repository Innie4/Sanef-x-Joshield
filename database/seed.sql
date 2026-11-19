-- ==============================================================================
-- UNIFIED PLATFORM SEED DATA: SANEF & JOSSYSHIELD
-- ==============================================================================

-- 1. Organizations
INSERT INTO organizations (id, slug, name, organization_type, website_domain)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'jossyshield', 'JossyShield Security Services', 'commercial_security', 'jossyshield.example'),
    ('22222222-2222-2222-2222-222222222222', 'sanef', 'Safe Neighborhood Foundation', 'ngo', 'sanef.example')
ON CONFLICT (id) DO NOTHING;

-- 2. Initial Super Admin User (password: Admin123! hashed via bcrypt)
INSERT INTO users (id, email, password_hash, first_name, last_name, is_super_admin, is_active)
VALUES 
    ('33333333-3333-3333-3333-333333333333', 'admin@unifiedplatform.local', '$2b$10$EpRnTzVlqHNP0.fUbXUw3.eGf45/Hn9pLsq4U4wH0rJ0B8H6eBsmW', 'Inimfon', 'Udoh', TRUE, TRUE)
ON CONFLICT (id) DO NOTHING;

-- 3. Super Admin Memberships in both organisations
INSERT INTO organization_memberships (id, organization_id, user_id, status)
VALUES 
    ('44444444-4444-4444-4444-444444444441', '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'active'),
    ('44444444-4444-4444-4444-444444444442', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 'active')
ON CONFLICT (organization_id, user_id) DO NOTHING;

-- 4. Permissions
INSERT INTO permissions (id, category, description)
VALUES 
    ('blog.create', 'Content', 'Create new blog posts'),
    ('blog.edit', 'Content', 'Edit existing blog posts'),
    ('blog.publish', 'Content', 'Publish and archive blog posts'),
    ('media.upload', 'Media', 'Upload files and images to media library'),
    ('portfolio.manage', 'SANEF', 'Manage projects and evidence archive'),
    ('partnerships.manage', 'SANEF', 'Manage partner profiles and collaborations'),
    ('donations.view', 'SANEF', 'View donation records and campaigns'),
    ('donations.manage', 'SANEF', 'Create and modify donation campaigns'),
    ('careers.manage', 'Recruitment', 'Manage job vacancy listings'),
    ('applications.view', 'Recruitment', 'View candidate applications and CVs'),
    ('applications.manage', 'Recruitment', 'Update candidate status and review notes'),
    ('interviews.manage', 'Recruitment', 'Schedule interviews and record scores'),
    ('talent_pool.view', 'Recruitment', 'View security talent pool directory'),
    ('talent_pool.manage', 'Recruitment', 'Manage talent pool status and deployments'),
    ('marketplace_requests.view', 'Marketplace', 'View incoming service requests'),
    ('marketplace_requests.manage', 'Marketplace', 'Update service requests and quotes'),
    ('users.manage', 'Administration', 'Invite users and modify memberships'),
    ('roles.manage', 'Administration', 'Manage organization roles and permissions'),
    ('settings.manage', 'Administration', 'Update organization website settings')
ON CONFLICT (id) DO NOTHING;
