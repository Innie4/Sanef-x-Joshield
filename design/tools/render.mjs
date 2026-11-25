// Render a contact sheet html to PNG
import { createRequire } from "node:module";
const req = createRequire("/home/inimfon-udoh/.gemini/config/plugins/app-designer/skills/app-designer/package.json");
const { chromium } = req("playwright-core");
const [src, out, width = "1500"] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: "/usr/bin/google-chrome", headless: true });
const p = await b.newPage({ viewport: { width: Number(width), height: 900 } });
await p.goto("file://" + src, { waitUntil: "networkidle", timeout: 90000 }).catch(() => {});
await p.waitForTimeout(1500);
await p.screenshot({ path: out, fullPage: true });
await b.close();
