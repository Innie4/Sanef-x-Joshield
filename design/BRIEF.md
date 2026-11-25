# SANEF / JossyShield web redesign: shared brief (self-authored)

The user asked for /app-designer at 5/5 on every rubric line, every page reworked, zero AI slop.
The skill targets iPhone apps; here it is applied to responsive websites. Same process,
same rubric, same slop catalogue. "Native fluency" (rubric line 10) is read as
**web fluency**: fast, responsive 360px to 1920px, real keyboard/focus states, semantic HTML,
sticky/fixed chrome that behaves, forms that validate inline, no layout shift.

Skill folder: /home/inimfon-udoh/.gemini/config/plugins/app-designer/skills/app-designer
Read: references/slop.md (all), type.md, color.md, layout.md (rhythm sections), copy.md,
imagery.md, motion.md, critique.md.

## Brief (self-authored; user is reachable but asked us to just execute)
1. **JossyShield**: a Nigerian private security company. Guarding (static, mobile patrol,
   event), consultancy (risk assessment, audits, protocol design), training (guard
   certification, corporate readiness), a "request a service" marketplace, and a careers /
   talent pool. Audience: facility managers, estate boards, logistics and bank ops leads;
   and job-seeking guards.
   Core action: request guards for a site (and, for candidates, apply).
   Palette constraint from user: **gray, black and blue only**.
2. **Safe Neighborhood Foundation (SANEF)**: a Nigerian community-safety NGO. Solar street
   lighting for school routes, youth mediation, community watch radio, with an evidence
   archive (portfolio), partners, events, careers, blog, donations.
   Audience: donors (local and diaspora), partner organisations, residents, volunteers.
   Core action: understand the work with evidence, then give or partner.
   Palette constraint from user: **green, white and gray only**.
3. **Unified Dashboard**: the internal admin for both organisations (tenant switcher).
4. Feel: JossyShield = exact, calm, accountable. SANEF = warm, local, transparent.
5. Brand colours/logos/photos: none supplied yet ("we will edit when we get them").
   Everything is tokenised so a later brand swap is a token change.
6. Image generation: not used (no permission to spend credits). Imagery comes from drawn
   SVG (JossyShield) and CC-licensed photography via the Openverse API, credited (SANEF).

## Hard bans across all three (on top of slop.md)
- No Inter, Poppins, Manrope, DM Sans, Space Grotesk, Playfair. Fonts are self-hosted via
  @fontsource (never next/font/google: the build must not depend on Google at build time).
- No gradient text, no glow box-shadows, no blurred colour blobs, no mesh/radial "ambient"
  backgrounds, no glassmorphism on content, no "bento" card grids as section default.
- No uppercase letter-spaced eyebrow above every section (max one per page, and only when it
  carries information such as a date or a code).
- No four-stat row, no "Trusted by" fake-logo strip, no testimonials carousel, no icon-chip
  rows, no lucide icon next to every heading. Icons only where they aid recognition
  (phone, WhatsApp, download, arrow, close, menu). One icon weight.
- Copy: no "elite", "tactical", "zero-compromise", "military-grade", "telemetry",
  "cryptographic", "autonomous", "empower", "seamless", "world-class", "cutting-edge",
  "unlock", "journey", "holistic", "robust", exclamation marks, Title Case Headings.
  Sentence case. Labels say what things are.
- Data is specific and uneven (₦1,862,500 not ₦2,000,000; 412 officers not 400).
- Text never below 12px on the web (13px is the practical floor for meta).
- Every page must work at 390px wide with no horizontal overflow.

## Tools
- Live-route screenshots + mechanical slop scan:
  `node /home/inimfon-udoh/SANEF/design/tools/webshoot.mjs --base http://localhost:PORT --routes /,/about --out /home/inimfon-udoh/SANEF/design/shots/<app>/r1`
  (shoots 1440 and 390 wide; exit 1 on any FAIL). Open every PNG yourself.
- Openverse CC image search (documented public API):
  `node /home/inimfon-udoh/SANEF/design/tools/openverse.mjs <outdir> '["query 1","query 2"]'`
  then `node /home/inimfon-udoh/SANEF/design/tools/render.mjs <abs>/sheet.html <abs>/sheet.png`.
  Download chosen originals into the app's `public/images/` (never hotlink), keep a
  `public/images/CREDITS.md` and render credits on the page footer or caption.
- Do NOT scrape Unsplash/Pexels: they sit behind bot challenges. Do not try to bypass them.

## Servers
The old production servers have been stopped. Each builder owns its app's port:
JossyShield :3001, SANEF :3002, Dashboard :3000.
- Iterate with `npm run dev` (next dev on that port) as a background/daemon process.
- NEVER run `next build` while `next dev` is running in the same folder: they share `.next`
  and the dev server starts serving 404 CSS (this already broke the site once).
- To finish: stop your dev server, `rm -rf .next && npm run build` (must pass with 0 errors),
  then `npm run start` as a daemon so the user can view the production build on the port.

## Rubric
critique.md's 12 lines (13 for a redesign: add Fidelity). Bar: 5/5 on every line.
