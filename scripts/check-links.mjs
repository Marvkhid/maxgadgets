// Crawls a running copy of the site and reports broken links, anchors and images.
// Usage: npm run build && npm start   (in one terminal)
//        npm run check:links          (in another; BASE_URL defaults to http://localhost:3000)

const base = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const pages = new Map();
const failures = [];
const externals = new Set();
const fragments = [];
const images = new Set();

function decode(value) {
  return value.replace(/&amp;/g, "&");
}

async function load(path) {
  if (pages.has(path)) return;
  const response = await fetch(base + path, { redirect: "manual" });
  if (response.status !== 200) {
    failures.push(`${path} returned ${response.status}`);
    pages.set(path, null);
    return;
  }
  const html = await response.text();
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  pages.set(path, ids);

  for (const match of html.matchAll(/<a\s[^>]*?href="([^"]*)"/g)) {
    const href = decode(match[1]);
    if (href.startsWith("#")) fragments.push({ from: path, path, id: href.slice(1) });
    else if (href.startsWith("/")) {
      const [target, hash] = href.split("#");
      if (hash) fragments.push({ from: path, path: target, id: hash });
      if (!pages.has(target)) await load(target);
    } else if (href.startsWith("tel:")) {
      if (!/^tel:\+\d{10,15}$/.test(href)) failures.push(`${path}: bad phone link ${href}`);
    } else if (href.startsWith("mailto:")) {
      if (!/^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/.test(href)) failures.push(`${path}: bad email link ${href}`);
    } else if (href.startsWith("https://wa.me/")) {
      if (!/^https:\/\/wa\.me\/234\d{10}(\?text=.+)?$/.test(href)) failures.push(`${path}: bad WhatsApp link ${href}`);
    } else if (href.startsWith("http://")) {
      failures.push(`${path}: insecure link ${href}`);
    } else if (href.startsWith("https://")) {
      externals.add(href);
    } else if (href !== "") {
      failures.push(`${path}: unexpected link ${href}`);
    }
  }
  for (const match of html.matchAll(/<img\s[^>]*?src="([^"]+)"/g)) images.add(decode(match[1]));
}

await load("/");

for (const src of images) {
  if (!src.startsWith("/") && !src.startsWith("data:")) continue;
  if (src.startsWith("data:")) continue;
  const response = await fetch(base + src);
  if (!response.ok) failures.push(`image ${src} returned ${response.status}`);
}

for (const { from, path, id } of fragments) {
  const ids = pages.get(path);
  if (ids === undefined) await load(path);
  const known = pages.get(path);
  if (known && !known.has(id)) failures.push(`${from}: link to ${path}#${id} but that id does not exist`);
}

const sitemap = await fetch(`${base}/sitemap.xml`);
if (!sitemap.ok) failures.push(`/sitemap.xml returned ${sitemap.status}`);
else {
  const xml = await sitemap.text();
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const path = new URL(match[1]).pathname;
    if (!pages.has(path)) await load(path);
    if (pages.get(path) === null) failures.push(`sitemap lists ${path} but it fails`);
  }
}
const robots = await fetch(`${base}/robots.txt`);
if (!robots.ok) failures.push(`/robots.txt returned ${robots.status}`);

console.log(`Pages checked: ${[...pages.keys()].join(", ")}`);
console.log(`Images checked: ${images.size}`);
console.log(`External links (not fetched): ${externals.size}`);
if (failures.length > 0) {
  console.error(`\n${failures.length} problem(s):\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log("\nNo broken links found.");
