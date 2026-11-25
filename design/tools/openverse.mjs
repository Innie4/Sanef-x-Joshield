// Query Openverse (documented public API) for CC-licensed candidates and build a contact sheet.
import fs from "node:fs";
import path from "node:path";
const OUT = process.argv[2] || "/home/inimfon-udoh/SANEF/design/imagery";
const queries = JSON.parse(process.argv[3]);
fs.mkdirSync(OUT, { recursive: true });
const all = [];
for (const q of queries) {
  const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&page_size=12&license_type=commercial,modification&aspect_ratio=wide,square,tall&size=large,medium`;
  try {
    const r = await fetch(url); const j = await r.json();
    for (const it of j.results || []) all.push({ q, id: it.id, title: it.title, url: it.url, thumb: it.thumbnail, creator: it.creator, license: `${it.license} ${it.license_version}`, landing: it.foreign_landing_url, w: it.width, h: it.height });
    console.error(q, (j.results || []).length);
  } catch (e) { console.error("fail", q, e.message); }
}
fs.writeFileSync(path.join(OUT, "candidates.json"), JSON.stringify(all, null, 2));
const html = `<html><body style="margin:0;background:#222;font:11px sans-serif;color:#ddd;display:grid;grid-template-columns:repeat(6,1fr);gap:6px;padding:6px;width:1500px">${all.map((a, i) => `<figure style="margin:0"><img src="${a.thumb}" style="width:100%;height:160px;object-fit:cover;display:block"><figcaption>#${i} ${a.q.slice(0, 18)} · ${a.w}x${a.h}</figcaption></figure>`).join("")}</body></html>`;
fs.writeFileSync(path.join(OUT, "sheet.html"), html);
console.log(all.length);
