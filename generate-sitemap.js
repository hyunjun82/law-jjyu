/**
 * 정적 sitemap.xml 생성기
 *
 * next build (output: 'export') 후 out/ 디렉토리를 스캔하여
 * out/sitemap.xml을 생성한다.
 *
 * 사용: node generate-sitemap.js
 * 빌드 스크립트: "build": "next build --webpack && node generate-sitemap.js"
 */

const fs = require("fs");
const path = require("path");

const SITE_URL = "https://law.jjyu.co.kr";
const OUT_DIR = path.resolve(__dirname, "out");
const TODAY = new Date().toISOString().split("T")[0];

function collectUrls(dir, base = "") {
  const urls = [];

  if (!fs.existsSync(dir)) {
    console.error("out/ 디렉토리가 없습니다. 먼저 npm run build를 실행하세요.");
    process.exit(1);
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name.startsWith("_") || entry.name === "404" || entry.name === "forms" || entry.name === "demo") continue;
      urls.push(...collectUrls(fullPath, base + "/" + entry.name));
    } else if (entry.name.endsWith(".html")) {
      // 제외 대상
      if (entry.name.startsWith("_") || entry.name === "404.html" || entry.name === "demo.html") continue;

      if (entry.name === "index.html") {
        urls.push(base || "/");
      } else {
        // 가정법률.html → /가정법률, slug.html → /카테고리/slug
        const slug = entry.name.replace(".html", "");
        urls.push(base + "/" + slug);
      }
    }
  }

  return urls;
}

function generateSitemap(urls) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  // 홈페이지
  const home = urls.find(u => u === "/");
  if (home) {
    lines.push(`  <url>`);
    lines.push(`    <loc>${SITE_URL}</loc>`);
    lines.push(`    <lastmod>${TODAY}</lastmod>`);
    lines.push(`    <changefreq>weekly</changefreq>`);
    lines.push(`    <priority>1.0</priority>`);
    lines.push(`  </url>`);
  }

  // 나머지 URL
  for (const url of urls.sort()) {
    if (url === "/") continue;
    if (url === "/about") continue; // about 페이지는 낮은 우선순위

    // 카테고리 허브 (depth 1) vs spoke (depth 2)
    const depth = url.split("/").filter(Boolean).length;
    const priority = depth === 1 ? "0.9" : "0.7";
    const changefreq = depth === 1 ? "weekly" : "monthly";

    lines.push(`  <url>`);
    lines.push(`    <loc>${SITE_URL}${url}</loc>`);
    lines.push(`    <lastmod>${TODAY}</lastmod>`);
    lines.push(`    <changefreq>${changefreq}</changefreq>`);
    lines.push(`    <priority>${priority}</priority>`);
    lines.push(`  </url>`);
  }

  lines.push("</urlset>");
  return lines.join("\n");
}

// 실행
const urls = collectUrls(OUT_DIR);
const sitemap = generateSitemap(urls);
const outputPath = path.join(OUT_DIR, "sitemap.xml");

fs.writeFileSync(outputPath, sitemap, "utf8");
console.log(`sitemap.xml 생성 완료: ${urls.length}개 URL → ${outputPath}`);
