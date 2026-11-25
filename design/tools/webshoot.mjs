#!/usr/bin/env node
/**
 * Web shoot: full-page screenshots of live routes at desktop and mobile widths,
 * plus a light mechanical slop scan adapted from app-designer's shoot.mjs.
 *
 *   node webshoot.mjs --base http://localhost:3001 --routes /,/about --out shots/js-r1
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const req = createRequire("/home/inimfon-udoh/.gemini/config/plugins/app-designer/skills/app-designer/package.json");
const { chromium } = req("playwright-core");

const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(n); return i > -1 && argv[i + 1] ? argv[i + 1] : d; };
const BASE = arg("--base", "http://localhost:3001");
const ROUTES = arg("--routes", "/").split(",");
const OUT = path.resolve(arg("--out", "shots"));
const WIDTHS = arg("--widths", "1440,390").split(",").map(Number);
const MAXH = Number(arg("--maxh", "9000"));
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome", headless: true });
let totalFails = 0;
for (const w of WIDTHS) {
  const page = await browser.newPage({ viewport: { width: w, height: w > 800 ? 900 : 844 }, deviceScaleFactor: w > 800 ? 1 : 2 });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("requestfailed", (r) => errors.push("request failed: " + r.url()));
  page.on("response", (r) => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
  for (const route of ROUTES) {
    errors.length = 0;
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      await document.fonts.ready;
      // reveal lazy content
      for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
      window.scrollTo(0, 0);
      for (const a of document.getAnimations()) { try { const t = a.effect?.getComputedTiming?.(); if (t && t.endTime !== Infinity) a.finish(); } catch {} }
      await new Promise((r) => setTimeout(r, 200));
    });
    const slug = (route === "/" ? "home" : route.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "")) + `-${w}`;
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.screenshot({ path: path.join(OUT, `${slug}.png`), fullPage: h <= MAXH, clip: h > MAXH ? { x: 0, y: 0, width: w, height: MAXH } : undefined });

    const report = await page.evaluate((vw) => {
      const SLOP = ["effortless","seamless","unlock","elevate","supercharge","empower","revolutioni","game-chang","next-level","welcome back","let's get started","journey","lorem","ipsum","john doe","jane doe","ai-powered","powered by ai","all in one place","at your fingertips","take control","level up","stay on track","like never before","transform your","cutting-edge","world-class","unparalleled","state-of-the-art","zero-compromise","autonomous defense","holistic","synergy","robust","leverage","telemetry","cryptographic"];
      const fails = [], warns = [];
      const text = document.body.innerText.toLowerCase();
      const hits = SLOP.filter((w) => text.includes(w));
      if (hits.length) fails.push("Marketing/slop words: " + hits.join(", "));
      if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(document.body.innerText)) fails.push("Emoji in UI");
      const excl = (document.body.innerText.match(/[a-z]!\s/gi) || []).length; if (excl) warns.push(`${excl} exclamation mark(s)`);
      const fonts = new Set(), sizes = new Set();
      let tiny = 0, overflow = 0, glow = 0, gradText = 0, eyebrows = 0;
      for (const el of document.querySelectorAll("body *")) {
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden") continue;
        const hasText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
        if (hasText) {
          fonts.add(cs.fontFamily.split(",")[0].replace(/["']/g, "").trim());
          const fs = parseFloat(cs.fontSize); sizes.add(Math.round(fs));
          if (fs < 12) tiny++;
          if (cs.textTransform === "uppercase" && parseFloat(cs.letterSpacing) > 0.5 && fs <= 13) eyebrows++;
          if (cs.backgroundClip === "text" || cs.webkitBackgroundClip === "text") gradText++;
        }
        const r = el.getBoundingClientRect();
        if (r.right > vw + 2 && cs.position !== "fixed" && r.width > 0 && !el.closest("[data-bleed]")) overflow++;
        const bs = cs.boxShadow;
        if (bs && bs !== "none" && /rgba?\([^)]*\)\s+0px\s+0px\s+\d{2,}px/.test(bs)) glow++;
        if ((cs.filter || "").includes("blur(") && r.width > 150) glow++;
      }
      if (gradText) fails.push(`${gradText} gradient-text element(s)`);
      if (glow) warns.push(`${glow} glow / blurred blob element(s)`);
      if (tiny) warns.push(`${tiny} text nodes under 12px`);
      if (overflow) fails.push(`${overflow} element(s) overflow the viewport horizontally`);
      if (eyebrows > 6) warns.push(`${eyebrows} uppercase letter-spaced eyebrow labels (cap is ~1 per section)`);
      return { fails, warns, fonts: [...fonts], sizes: [...sizes].sort((a, b) => b - a) };
    }, w);
    if (errors.length) report.fails.push("Network/page errors: " + errors.slice(0, 4).join(" | "));
    totalFails += report.fails.length;
    console.log(`\n── ${slug}  (${h}px)`);
    console.log(`  fonts ${JSON.stringify(report.fonts)} sizes [${report.sizes.join(",")}]`);
    for (const f of report.fails) console.log("  FAIL  " + f);
    for (const x of report.warns) console.log("  warn  " + x);
    if (!report.fails.length && !report.warns.length) console.log("  clean");
  }
  await page.close();
}
await browser.close();
console.log(`\n${totalFails ? totalFails + " FAIL(s)" : "No FAILs"} -> ${OUT}`);
process.exit(totalFails ? 1 : 0);
