/**
 * Layer 3: Style Gate — 문체/AI냄새/구조/중복/HTML규칙 검증
 *
 * 사용법:
 *   node scripts/verify-style.js               전체 검증
 *   node scripts/verify-style.js --slug 협의이혼-절차-서류-이혼숙려기간
 *   node scripts/verify-style.js --category 가정법률
 */

const fs = require("fs");
const path = require("path");

const ARTICLES_DIR = path.resolve(__dirname, "..", "data", "articles");
const CONFIG_FILE = path.join(__dirname, "quality-config.json");

// ── spoke 블록 분리 (배열 형식) ──────────────────────────────────
function splitSpokeBlocks(content) {
  const blocks = [];
  const slugPattern = /slug:\s*"([^"]+)"/g;
  const slugMatches = [...content.matchAll(slugPattern)];
  const topLevel = slugMatches.filter(m => {
    const before = content.substring(Math.max(0, m.index - 20), m.index);
    return !before.includes("category");
  });
  for (let i = 0; i < topLevel.length; i++) {
    const slug = topLevel[i][1];
    const start = topLevel[i].index;
    const end = i < topLevel.length - 1 ? topLevel[i + 1].index : content.length;
    blocks.push({ slug, raw: content.substring(start, end) });
  }
  return blocks;
}

// ── 섹션 추출 (backtick content) ─────────────────────────────────
function extractSections(raw) {
  const sectionsStart = raw.indexOf("sections:");
  if (sectionsStart === -1) return [];
  const sectionsRaw = raw.substring(sectionsStart);
  const titles = [...sectionsRaw.matchAll(/title:\s*"([^"]+)"/g)].map(m => m[1]);
  const contents = [...sectionsRaw.matchAll(/content:\s*`([\s\S]*?)`/g)].map(m => m[1]);
  return titles.map((t, i) => ({ title: t, content: contents[i] || "" }));
}

// ── FAQ 답변 추출 ────────────────────────────────────────────────
function extractFaqAnswers(raw) {
  return [...raw.matchAll(/answer:\s*"((?:[^"\\]|\\.)*)"/g)]
    .map(m => m[1].replace(/\\n/g, "\n").replace(/\\"/g, '"'));
}

// ── HTML 제거 ────────────────────────────────────────────────────
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
}

// ── 문장 분리 ────────────────────────────────────────────────────
function splitSentences(text) {
  return stripHtml(text)
    .split(/[.!?。]\s*/)
    .map(s => s.trim())
    .filter(s => s.length > 3);
}

// ── 어미 추출 ────────────────────────────────────────────────────
function getEnding(sentence) {
  const clean = sentence.replace(/[.!?。"')\]]/g, "").trim();
  const endings = [
    "합니다", "입니다", "됩니다", "었습니다", "있습니다", "없습니다", "됐습니다", "봅니다", "줍니다",
    "해요", "이에요", "예요", "거예요", "세요", "어요", "아요", "네요", "데요", "래요",
    "할게요", "볼게요", "나요", "가요", "죠",
  ];
  for (const e of endings) {
    if (clean.endsWith(e)) return e;
  }
  return clean.slice(-2);
}

// ── categorySlug 추출 ────────────────────────────────────────────
function extractCategory(raw) {
  const m = raw.match(/categorySlug:\s*"([^"]+)"/);
  return m ? m[1] : "unknown";
}

function main() {
  const args = process.argv.slice(2);
  const singleSlug = args.includes("--slug") ? args[args.indexOf("--slug") + 1] : null;
  const singleCat = args.includes("--category") ? args[args.indexOf("--category") + 1] : null;

  console.log("=== Layer 3: Style Gate ===\n");

  const config = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
  const style = config.style;

  const files = fs.readdirSync(ARTICLES_DIR).filter(f =>
    f.endsWith(".ts") && f !== "index.ts" && f.includes("-spokes-")
  );

  let totalChecked = 0;
  let totalErrors = 0;
  let totalWarnings = 0;
  const errorList = [];
  const allFaqQuestions = new Map();

  for (const f of files) {
    const content = fs.readFileSync(path.join(ARTICLES_DIR, f), "utf8");
    const blocks = splitSpokeBlocks(content);

    for (const block of blocks) {
      const { slug, raw } = block;
      if (singleSlug && slug !== singleSlug) continue;

      const cat = extractCategory(raw);
      if (singleCat && cat !== singleCat) continue;

      totalChecked++;
      const errs = [];
      const warns = [];
      const sections = extractSections(raw);
      const faqAnswers = extractFaqAnswers(raw);

      // metaDescription은 문어체 허용 → 제외
      const metaBlock = raw.match(/metaDescription:\s*"[^"]*"/)?.[0] || "";
      const allText = sections.map(s => stripHtml(s.content)).join("\n") + "\n" + faqAnswers.join("\n");

      // ── 1. 금지 어미 (문어체) ──────────────────────────────────
      for (const ending of style.forbiddenEndings) {
        const re = new RegExp(ending, "g");
        const matches = allText.match(re);
        if (matches && matches.length > 0) {
          errs.push(`문어체 "${ending}" ${matches.length}회 발견`);
        }
      }

      // ── 2. AI냄새 단어 ─────────────────────────────────────────
      let forbiddenCount = 0;
      const foundForbidden = [];
      for (const word of style.forbiddenWords) {
        if (allText.includes(word)) {
          forbiddenCount++;
          foundForbidden.push(word);
        }
      }
      if (forbiddenCount > style.maxForbiddenWordCount) {
        errs.push(`AI냄새 단어 ${forbiddenCount}개: ${foundForbidden.join(", ")}`);
      }

      // ── 3. Filler 문장 ─────────────────────────────────────────
      for (const filler of style.fillerPatterns) {
        if (allText.includes(filler)) {
          warns.push(`filler 문장: "${filler}"`);
        }
      }

      // ── 4. 연속 어미 반복 ──────────────────────────────────────
      for (const section of sections) {
        const sentences = splitSentences(section.content);
        let consecutive = 1;
        for (let i = 1; i < sentences.length; i++) {
          const prev = getEnding(sentences[i - 1]);
          const curr = getEnding(sentences[i]);
          if (prev === curr) {
            consecutive++;
            if (consecutive > style.maxConsecutiveSameEnding) {
              warns.push(`"${section.title}" 어미 ${consecutive}회 연속 반복: "~${curr}"`);
              break;
            }
          } else {
            consecutive = 1;
          }
        }
      }

      // ── 5. 연속 문장 시작 반복 ─────────────────────────────────
      for (const section of sections) {
        const sentences = splitSentences(section.content);
        let consecutive = 1;
        for (let i = 1; i < sentences.length; i++) {
          const prevStart = sentences[i - 1].substring(0, 4);
          const currStart = sentences[i].substring(0, 4);
          if (prevStart === currStart && prevStart.length >= 2) {
            consecutive++;
            if (consecutive > style.maxConsecutiveSameStart) {
              warns.push(`"${section.title}" 문장시작 ${consecutive}회 반복: "${currStart}..."`);
              break;
            }
          } else {
            consecutive = 1;
          }
        }
      }

      // ── 6. Em dash ─────────────────────────────────────────────
      if (raw.includes("\u2014")) {
        warns.push("Em dash (\u2014) 발견");
      }

      // ── 7. <ul>/<li> 금지 (섹션 content) ──────────────────────
      for (const section of sections) {
        for (const tag of style.forbiddenHtml) {
          if (section.content.toLowerCase().includes(tag.toLowerCase())) {
            errs.push(`"${section.title}" 금지 태그 ${tag} 포함`);
          }
        }
      }

      // ── 8. 문단 수 검사 (섹션당 3 <p>) ────────────────────────
      for (const section of sections) {
        const pCount = (section.content.match(/<p>/gi) || []).length;
        if (pCount !== style.requiredParagraphCount && pCount > 0) {
          warns.push(`"${section.title}" 문단 ${pCount}개 (${style.requiredParagraphCount}개 권장)`);
        }
      }

      // ── 9. 접속어 패턴 반복 검사 ────────────────────────
      // 매 섹션 같은 접속어 패턴 반복 감지 (예: 모든 섹션이 "다만→참고로" 동일 패턴)
      const sectionPatterns = [];
      for (const section of sections) {
        const paragraphs = section.content.split(/<\/p>\s*(?:\n\s*)*<p>/i);
        const starts = [];
        for (let i = 1; i < paragraphs.length; i++) {
          const plainStart = stripHtml(paragraphs[i]).trim().substring(0, 10);
          const found = style.connectingWords.find(w => plainStart.startsWith(w));
          starts.push(found || "없음");
        }
        sectionPatterns.push(starts.join("→"));
      }
      if (sectionPatterns.length >= 3) {
        const unique = new Set(sectionPatterns);
        if (unique.size === 1 && sectionPatterns[0] !== "") {
          warns.push(`모든 섹션에서 접속어 패턴이 동일 ("${sectionPatterns[0]}") — 자연스럽게 다양하게 사용하세요`);
        }
      }

      // ── 10. bold 뒤 콜론 금지 ─────────────────────────────────
      for (const section of sections) {
        if (/<strong>[^<]+<\/strong>\s*:/.test(section.content)) {
          warns.push(`"${section.title}" bold 뒤 콜론(:) 사용 금지`);
        }
      }

      // ── 11. FAQ 중복 (글 간) ──────────────────────────────────
      const faqQuestions = [...raw.matchAll(/question:\s*"([^"]+)"/g)].map(m => m[1]);
      for (const q of faqQuestions) {
        const normalized = q.replace(/\s+/g, "").replace(/[?？]/g, "");
        if (allFaqQuestions.has(normalized)) {
          warns.push(`FAQ 중복: "${q}" (${allFaqQuestions.get(normalized)}과 동일)`);
        } else {
          allFaqQuestions.set(normalized, `${cat}/${slug}`);
        }
      }

      // ── 12. 링크 검증 (target="_blank" 금지 + whitelist) ──────
      const LINK_WHITELIST = [
        "gov.kr", "efamily.scourt.go.kr", "easylaw.go.kr",
        "0404.go.kr", "nhis.or.kr", "nps.or.kr",
      ];
      for (const section of sections) {
        if (section.content.includes('target="_blank"') || section.content.includes("target='_blank'")) {
          errs.push(`"${section.title}" target="_blank" 사용 금지`);
        }
        const links = [...section.content.matchAll(/<a\s+href="(https?:\/\/[^"]+)"/g)];
        for (const link of links) {
          const url = link[1];
          if (!LINK_WHITELIST.some(w => url.includes(w))) {
            warns.push(`"${section.title}" 허용되지 않는 외부 링크: ${url}`);
          }
        }
      }

      // ── 13. 섹션간 content 중복 ───────────────────────────────
      for (let i = 0; i < sections.length; i++) {
        for (let j = i + 1; j < sections.length; j++) {
          const a = stripHtml(sections[i].content).substring(0, 100);
          const b = stripHtml(sections[j].content).substring(0, 100);
          if (a.length > 50 && a === b) {
            errs.push(`섹션 content 중복: "${sections[i].title}" = "${sections[j].title}"`);
          }
        }
      }

      if (errs.length > 0) {
        totalErrors += errs.length;
        errorList.push({ cat, slug, type: "ERROR", items: errs });
      }
      if (warns.length > 0) {
        totalWarnings += warns.length;
        errorList.push({ cat, slug, type: "WARN", items: warns });
      }
    }
  }

  // 결과 출력
  const errorsOnly = errorList.filter(e => e.type === "ERROR");
  const warnsOnly = errorList.filter(e => e.type === "WARN");

  if (errorsOnly.length > 0) {
    console.log(`[ERROR] ${totalErrors}건:\n`);
    for (const e of errorsOnly) {
      for (const item of e.items) {
        console.log(`  [${e.cat}/${e.slug}] ${item}`);
      }
    }
  }

  if (warnsOnly.length > 0) {
    console.log(`\n[WARN] ${totalWarnings}건:\n`);
    const warnTypes = {};
    for (const e of warnsOnly) {
      for (const item of e.items) {
        const type = item.includes("어미") ? "어미반복"
          : item.includes("문장시작") ? "문장시작반복"
          : item.includes("FAQ 중복") ? "FAQ중복"
          : item.includes("filler") ? "filler"
          : item.includes("Em dash") ? "Emdash"
          : item.includes("문단") ? "문단수"
          : item.includes("접속어") ? "접속어반복"
          : item.includes("bold") ? "bold콜론"
          : item.includes("태그") ? "금지태그"
          : item.includes("법조문") ? "법조문"
          : item.includes("서류") ? "서류누락"
          : "기타";
        warnTypes[type] = (warnTypes[type] || 0) + 1;
      }
    }
    for (const [type, count] of Object.entries(warnTypes).sort((a, b) => b[1] - a[1])) {
      console.log(`  ${type}: ${count}건`);
    }
  }

  console.log("\n=== Style Gate 결과 ===");
  console.log(`검사 대상:  ${totalChecked}개`);
  console.log(`ERROR:      ${totalErrors}건`);
  console.log(`WARN:       ${totalWarnings}건`);

  if (totalErrors === 0) {
    console.log("\nLayer 3 Style Gate PASS");
  } else {
    console.log("\nLayer 3 Style Gate FAIL");
    process.exit(1);
  }
}

main();
