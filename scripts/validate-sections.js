#!/usr/bin/env node
/**
 * 섹션 수 검증 스크립트
 * 모든 spoke 글이 최소 4섹션인지 확인
 * 사용: node scripts/validate-sections.js
 */

const fs = require("fs");
const path = require("path");

const articlesDir = path.join(__dirname, "..", "data", "articles");
const files = fs
  .readdirSync(articlesDir)
  .filter((f) => f.includes("-spokes-") && f.endsWith(".ts"));

let errors = 0;
let total = 0;

files.forEach((file) => {
  const content = fs.readFileSync(path.join(articlesDir, file), "utf8");
  const blocks = content.split(/slug:\s*['"]/).slice(1);

  blocks.forEach((block) => {
    const slug = (block.match(/^([^'"]+)/) || ["", "unknown"])[1];
    const afterSections = block.slice(block.indexOf("sections: ["));
    const sectionTitles = (
      afterSections.match(/title:\s*['"][^'"]+['"]/g) || []
    ).length;
    total++;

    if (sectionTitles < 4) {
      console.error(`❌ ${file} | ${slug} | sections: ${sectionTitles} (최소 4개 필요)`);
      errors++;
    } else {
      console.log(`✅ ${file} | ${slug} | sections: ${sectionTitles}`);
    }
  });
});

console.log(`\n총 ${total}개 글, 오류 ${errors}개`);
if (errors > 0) {
  process.exit(1);
}
