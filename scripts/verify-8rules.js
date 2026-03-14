/**
 * 8대 원칙 통합 검증기
 * ────────────────────────────────────────
 * 1. 스토리텔링      — 결론→조건→실행 3문단, 나열 금지
 * 2. 기승전결         — 기(공감)→승(데이터)→전(반전)→결(행동)
 * 3. 문체             — 구어체, AI냄새 제거, 문장 리듬
 * 4. 손석희+유시민    — 날카로운 질문, 법조문 근거, 반론
 * 5. 가독성           — 20~80대 전세대, 문장 길이, 괄호 설명
 * 6. 문제해결 100%   — 기관/기한/서류/링크/연락처 완비
 * 7. 오차 제로        — HTML 구조, 모호 표현 금지, 팩트 대조
 * 8. 출처             — source-data 존재, 신선도, 법조문 일치
 *
 * 사용법:
 *   node scripts/verify-8rules.js <slug>
 *   node scripts/verify-8rules.js --all
 *   node scripts/verify-8rules.js --category 가정법률
 *   node scripts/verify-8rules.js --min-score 7
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ARTICLES_DIR = path.resolve(__dirname, "..", "data", "articles");
const SOURCE_DIR = path.resolve(__dirname, "..", "source-data");
const SOURCE_MAP_PATH = path.join(SOURCE_DIR, "source-map.json");
const SCHEMA_PATH = path.join(SOURCE_DIR, "schema.json");
const REPORTS_DIR = path.resolve(__dirname, "..", "reports");
const CONFIG = JSON.parse(fs.readFileSync(path.join(__dirname, "verify-8rules-config.json"), "utf8"));

if (!fs.existsSync(REPORTS_DIR)) fs.mkdirSync(REPORTS_DIR, { recursive: true });

// ══════════════════════════════════════════════════════════════════
// 유틸리티
// ══════════════════════════════════════════════════════════════════

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
}

function splitSentences(text) {
  return stripHtml(text)
    .split(/(?<=[.!?。])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 3);
}

function getEnding(sentence) {
  const clean = sentence.replace(/[.!?。"')\]]/g, "").trim();
  const endings = [
    "합니다", "입니다", "됩니다", "었습니다", "있습니다", "없습니다",
    "해요", "이에요", "예요", "거예요", "세요", "어요", "아요", "네요", "데요", "래요",
    "나요", "가요", "죠",
  ];
  for (const e of endings) {
    if (clean.endsWith(e)) return e;
  }
  return clean.slice(-2);
}

function extractParagraphs(html) {
  const parts = html.split(/<\/p>/i);
  const result = [];
  for (const part of parts) {
    const match = part.match(/<p[^>]*>([\s\S]*)/i);
    if (match) {
      result.push(stripHtml(match[1]).trim());
    }
  }
  return result;
}

function computeOverlap(a, b) {
  if (!a || !b) return 0;
  const wordsA = a.replace(/\\n/g, "").split(/\s+/);
  const wordsB = new Set(b.replace(/\\n/g, "").split(/\s+/));
  let match = 0;
  for (const w of wordsA) {
    if (wordsB.has(w)) match++;
  }
  return match / Math.max(wordsA.length, 1);
}

function extractLawRefs(text) {
  const refs = [];
  const pattern = /[「\u300E]([^」\u300F]+)[」\u300F]\s*제(\d+)조(?:의(\d+))?/g;
  let m;
  while ((m = pattern.exec(text)) !== null) {
    const ref = m[3] ? `「${m[1]}」 제${m[2]}조의${m[3]}` : `「${m[1]}」 제${m[2]}조`;
    if (!refs.includes(ref)) refs.push(ref);
  }
  return refs;
}

function normalizeLawRef(ref) {
  return ref.replace(/\s+/g, "").replace(/[「」\u300E\u300F]/g, "");
}

function scoreRule(name, items) {
  const passed = items.filter(i => i.pass).length;
  const total = items.length;
  const score = total > 0 ? Math.round((passed / total) * 10) : 0;
  return { name, score, passed, total, items };
}

// ══════════════════════════════════════════════════════════════════
// 글 파서
// ══════════════════════════════════════════════════════════════════

function splitSpokeBlocks(content) {
  const blocks = [];
  const slugPattern = /slug:\s*"([^"]+)"/g;
  const slugMatches = [...content.matchAll(slugPattern)];
  const topLevel = slugMatches.filter(m => {
    const before = content.substring(Math.max(0, m.index - 30), m.index);
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

function parseArticle(slug, raw, file) {
  const get = (field) => {
    const m = raw.match(new RegExp(`${field}:\\s*\\n?\\s*"((?:[^"\\\\]|\\\\.)*)"`, "s"));
    return m ? m[1].replace(/\\n/g, "\n").replace(/\\"/g, '"') : "";
  };

  const categoryMatch = raw.match(/categorySlug:\s*"([^"]+)"/);
  const categorySlug = categoryMatch ? categoryMatch[1] : "unknown";

  // 섹션 추출
  const sectionsStart = raw.indexOf("sections:");
  const sectionsRaw = sectionsStart !== -1 ? raw.substring(sectionsStart) : "";
  const sectionTitles = [...sectionsRaw.matchAll(/title:\s*"([^"]+)"/g)].map(m => m[1]);
  const sectionContents = [...sectionsRaw.matchAll(/content:\s*`([\s\S]*?)`/g)].map(m => m[1]);
  const sectionCount = Math.min(sectionTitles.length, sectionContents.length);

  const sections = [];
  for (let i = 0; i < sectionCount; i++) {
    sections.push({
      title: sectionTitles[i],
      content: sectionContents[i],
      paragraphs: extractParagraphs(sectionContents[i]),
    });
  }

  // FAQ 추출
  const faqQuestions = [...raw.matchAll(/question:\s*"([^"]+)"/g)].map(m => m[1]);
  const faqAnswers = [...raw.matchAll(/answer:\s*\n?\s*"((?:[^"\\]|\\.)*)"/g)]
    .map(m => m[1].replace(/\\n/g, "\n").replace(/\\"/g, '"'));

  const allHtml = sectionContents.join("\n");
  const allPlainText = stripHtml(allHtml) + "\n" + faqAnswers.join("\n");

  return {
    slug, file, categorySlug,
    title: get("title"),
    h1: get("h1"),
    metaDescription: get("metaDescription"),
    description: get("description"),
    heroDescription: get("heroDescription"),
    datePublished: get("datePublished"),
    dateModified: get("dateModified"),
    sections,
    faqQuestions,
    faqAnswers,
    allHtml,
    allPlainText,
  };
}

// ══════════════════════════════════════════════════════════════════
// Rule 1: 스토리텔링
// ══════════════════════════════════════════════════════════════════

function rule1_storytelling(article) {
  const items = [];
  const cfg = CONFIG.rule1_storytelling;

  // 섹션 수 3~4
  const secCount = article.sections.length;
  items.push({ id: "1F", pass: secCount >= 3 && secCount <= 4, detail: `섹션 ${secCount}개 (3~4 필수)` });

  for (let si = 0; si < article.sections.length; si++) {
    const section = article.sections[si];
    const ps = section.paragraphs;
    const label = section.title.substring(0, 25);

    // 1A: 첫 <p>가 결론인지
    const firstP = ps[0] || "";
    const hasNumber = /\d/.test(firstP);
    const hasConclusionEnding = cfg.conclusionEndings.some(e => firstP.includes(e));
    const hasFiller = cfg.fillerStarts.some(f => firstP.startsWith(f));
    const isConclusion = (hasNumber || hasConclusionEnding) && !hasFiller;
    items.push({ id: "1A", pass: isConclusion, detail: `[${label}] P1 결론: ${isConclusion ? "OK" : "결론 아닌 서론형 시작"}` });

    // 1B: 둘째 <p>에 조건어
    const secondP = ps[1] || "";
    const hasConditional = cfg.conditionalWords.some(w => secondP.includes(w));
    items.push({ id: "1B", pass: hasConditional || ps.length < 2, detail: `[${label}] P2 조건어: ${hasConditional ? "OK" : "조건/예외 표현 없음"}` });

    // 1C: 셋째 <p>에 행동어
    const thirdP = ps[2] || "";
    const hasAction = cfg.actionWords.some(w => thirdP.includes(w));
    items.push({ id: "1C", pass: hasAction || ps.length < 3, detail: `[${label}] P3 행동어: ${hasAction ? "OK" : "행동 정보 없음"}` });

    // 1F-per: 문단 수 3~5개 (행동정보/링크 문단 포함 허용)
    const pCount = (section.content.match(/<p>/gi) || []).length;
    if ((pCount < 3 || pCount > 5) && pCount > 0) {
      items.push({ id: "1F", pass: false, detail: `[${label}] 문단 ${pCount}개 (3~5개 필수)` });
    }
  }

  // 1D: 나열 패턴 금지 ("있어요" 3연속)
  const listingMatch = article.allPlainText.match(/있어요[^.]{0,50}있어요[^.]{0,50}있어요/);
  items.push({ id: "1D", pass: !listingMatch, detail: listingMatch ? '"있어요" 3연속 나열 패턴 발견' : "나열 패턴 없음" });

  // 1E: ul/li 금지
  const hasListTags = cfg.forbiddenHtml.some(tag => article.allHtml.toLowerCase().includes(tag.toLowerCase()));
  items.push({ id: "1E", pass: !hasListTags, detail: hasListTags ? "<ul>/<li> 금지 태그 발견" : "금지 태그 없음" });

  return scoreRule("1. 스토리텔링", items);
}

// ══════════════════════════════════════════════════════════════════
// Rule 2: 기승전결
// ══════════════════════════════════════════════════════════════════

function rule2_structure(article) {
  const items = [];
  const cfg = CONFIG.rule2_structure;

  // 2A: [기] hero 공감
  const heroHasEmpathy = cfg.empathyPatterns.some(p => article.heroDescription.includes(p));
  items.push({ id: "2A", pass: heroHasEmpathy, detail: heroHasEmpathy ? "[기] hero 공감 OK" : "[기] hero에 공감 요소 없음" });

  // 2B: [승] table 존재
  const hasTable = /<table>/i.test(article.allHtml);
  items.push({ id: "2B", pass: hasTable, detail: hasTable ? "[승] 구조화 테이블 OK" : "[승] <table> 없음" });

  // 2C: [전] 반전/예외 표현
  const hasCounterpoint = article.sections.some(s =>
    cfg.counterpointWords.some(w => s.paragraphs.join(" ").includes(w))
  );
  items.push({ id: "2C", pass: hasCounterpoint, detail: hasCounterpoint ? "[전] 반전/예외 표현 OK" : "[전] 반전 없음" });

  // 2D: [결] 마지막 섹션 마지막 문단에 행동정보
  const lastSection = article.sections[article.sections.length - 1];
  if (lastSection) {
    const lastP = lastSection.paragraphs[lastSection.paragraphs.length - 1] || "";
    const lastHtml = lastSection.content || "";
    const hasActionInfo = (
      /<a\s+href/.test(lastHtml) ||
      /\d{2,4}-\d{3,4}-\d{4}/.test(lastP) ||
      cfg.actionInstitutions.some(inst => lastP.includes(inst))
    );
    items.push({ id: "2D", pass: hasActionInfo, detail: hasActionInfo ? "[결] 행동정보 OK" : "[결] 마지막 문단에 링크/전화/기관 없음" });
  } else {
    items.push({ id: "2D", pass: false, detail: "[결] 섹션 없음" });
  }

  // 2E: title === h1
  items.push({ id: "2E", pass: article.title === article.h1, detail: article.title === article.h1 ? "title === h1 OK" : "title !== h1" });

  // 2F: description vs hero 중복도
  const overlap = computeOverlap(article.description, article.heroDescription);
  items.push({ id: "2F", pass: overlap < 0.9, detail: `description/hero 중복 ${Math.round(overlap * 100)}% (90% 미만 필수)` });

  return scoreRule("2. 기승전결", items);
}

// ══════════════════════════════════════════════════════════════════
// Rule 3: 문체
// ══════════════════════════════════════════════════════════════════

function rule3_style(article) {
  const items = [];
  const cfg = CONFIG.rule3_style;
  const plain = article.allPlainText;
  const sentences = splitSentences(plain);

  // 3A: 문어체 어미 0건
  let formalCount = 0;
  const foundFormals = [];
  for (const ending of cfg.forbiddenEndings) {
    const re = new RegExp(`[가-힣]+${ending}`, "g");
    const matches = plain.match(re);
    if (matches) { formalCount += matches.length; foundFormals.push(...matches.slice(0, 2)); }
  }
  items.push({ id: "3A", pass: formalCount === 0, detail: formalCount === 0 ? "문어체 0건" : `문어체 ${formalCount}건: ${foundFormals.slice(0, 3).join(", ")}` });

  // 3B: AI냄새 단어 0건
  const foundAI = cfg.forbiddenWords.filter(w => plain.includes(w));
  items.push({ id: "3B", pass: foundAI.length === 0, detail: foundAI.length === 0 ? "AI냄새 0건" : `AI냄새: ${foundAI.join(", ")}` });

  // 3C: filler 0건
  const foundFillers = cfg.fillerPatterns.filter(f => plain.includes(f));
  items.push({ id: "3C", pass: foundFillers.length === 0, detail: foundFillers.length === 0 ? "filler 0건" : `filler: ${foundFillers.join(", ")}` });

  // 3D: 같은 어미 3연속 금지
  let maxConsecEnding = 1;
  let currConsecEnding = 1;
  for (let i = 1; i < sentences.length; i++) {
    if (getEnding(sentences[i]) === getEnding(sentences[i - 1])) {
      currConsecEnding++;
      if (currConsecEnding > maxConsecEnding) maxConsecEnding = currConsecEnding;
    } else {
      currConsecEnding = 1;
    }
  }
  items.push({ id: "3D", pass: maxConsecEnding <= cfg.maxConsecutiveSameEnding, detail: `어미 연속 최대 ${maxConsecEnding}회 (${cfg.maxConsecutiveSameEnding} 이하)` });

  // 3E: 같은 문장시작 3연속 금지
  let maxConsecStart = 1;
  let currConsecStart = 1;
  for (let i = 1; i < sentences.length; i++) {
    const prevStart = sentences[i - 1].substring(0, 4);
    const currStart = sentences[i].substring(0, 4);
    if (prevStart === currStart && prevStart.length >= 2) {
      currConsecStart++;
      if (currConsecStart > maxConsecStart) maxConsecStart = currConsecStart;
    } else {
      currConsecStart = 1;
    }
  }
  items.push({ id: "3E", pass: maxConsecStart <= cfg.maxConsecutiveSameStart, detail: `문장시작 연속 최대 ${maxConsecStart}회 (${cfg.maxConsecutiveSameStart} 이하)` });

  // 3F: 문장 길이 표준편차 (로봇문장 방지)
  if (sentences.length >= 3) {
    const lengths = sentences.map(s => s.length);
    const avg = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    const variance = lengths.reduce((sum, l) => sum + Math.pow(l - avg, 2), 0) / lengths.length;
    const stdev = Math.sqrt(variance);
    items.push({ id: "3F", pass: stdev >= cfg.minSentenceLengthStdev, detail: `문장 길이 표준편차 ${stdev.toFixed(1)} (${cfg.minSentenceLengthStdev} 이상)` });
  } else {
    items.push({ id: "3F", pass: true, detail: "문장 수 부족 — 편차 체크 생략" });
  }

  // 3G: em dash 0건
  const hasEmDash = plain.includes("\u2014");
  items.push({ id: "3G", pass: !hasEmDash, detail: hasEmDash ? "Em dash 발견" : "Em dash 없음" });

  return scoreRule("3. 문체", items);
}

// ══════════════════════════════════════════════════════════════════
// Rule 4: 손석희+유시민
// ══════════════════════════════════════════════════════════════════

function rule4_sharpLogic(article) {
  const items = [];
  const cfg = CONFIG.rule4_sharpLogic;

  // 4A: 모든 섹션 제목이 의문문
  const questionRe = new RegExp(cfg.questionPatterns.map(p => p === "?" ? "\\?" : p).join("|"));
  const nonQuestionTitles = article.sections.filter(s => !questionRe.test(s.title));
  items.push({ id: "4A", pass: nonQuestionTitles.length === 0,
    detail: nonQuestionTitles.length === 0 ? "섹션 제목 전부 의문문" : `비의문문 제목 ${nonQuestionTitles.length}개: ${nonQuestionTitles.map(s => s.title.substring(0, 20)).join(", ")}` });

  // 4B: 각 섹션 첫 문장이 결론 (서론형 시작 금지)
  let badStartCount = 0;
  for (const section of article.sections) {
    const firstSent = (section.paragraphs[0] || "").split(/[.!?]/)[0];
    if (cfg.badStarts.some(bs => firstSent.startsWith(bs))) badStartCount++;
  }
  items.push({ id: "4B", pass: badStartCount === 0, detail: badStartCount === 0 ? "전 섹션 결론 선행 OK" : `서론형 시작 ${badStartCount}건` });

  // 4C: 법조문 밀도 >= 섹션당 1건
  const lawRefPattern = /[「\u300E]([^」\u300F]+)[」\u300F]\s*제\d+조/g;
  let totalLawRefs = 0;
  for (const section of article.sections) {
    const sectionPlain = section.paragraphs.join(" ");
    const refs = sectionPlain.match(lawRefPattern) || [];
    totalLawRefs += refs.length;
  }
  const density = article.sections.length > 0 ? totalLawRefs / article.sections.length : 0;
  items.push({ id: "4C", pass: density >= cfg.minLawRefDensity, detail: `법조문 밀도 ${density.toFixed(1)}/섹션 (${cfg.minLawRefDensity} 이상)` });

  // 4D: 연결어 다양성 (같은 연결어 3회 이상 반복 → FAIL)
  const connectorCounts = {};
  for (const c of (cfg.connectors || [])) {
    const escaped = c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const count = (article.allPlainText.match(new RegExp(escaped, "g")) || []).length;
    if (count > (cfg.connectorMaxRepeat || 2)) {
      connectorCounts[c] = count;
    }
  }
  const overusedConnectors = Object.keys(connectorCounts);
  const connectorPass = overusedConnectors.length === 0;
  items.push({ id: "4D", pass: connectorPass,
    detail: connectorPass
      ? "연결어 다양성 OK (반복 없음)"
      : `연결어 반복: ${overusedConnectors.map(c => `"${c}" ${connectorCounts[c]}회`).join(", ")}` });

  // 4E: 근거 없는 숫자 <= 2건
  const sentenceList = splitSentences(article.allPlainText);
  const numberSentenceIdxs = [];
  for (let i = 0; i < sentenceList.length; i++) {
    if (/\d+(?:개월|일|년|만\s*원|원|%|세|회|배)/.test(sentenceList[i])) {
      // 전화번호, 연도(2000~2099), 법조문 자체는 제외
      const s = sentenceList[i];
      if (/\d{2,4}-\d{3,4}-\d{4}/.test(s)) continue;
      if (/20\d{2}년/.test(s) && !/\d+년\s*(?:이내|이상|이하|미만)/.test(s)) continue;
      if (/제\d+조/.test(s)) continue;
      numberSentenceIdxs.push(i);
    }
  }
  const lawRefSentenceIdxs = [];
  for (let i = 0; i < sentenceList.length; i++) {
    if (/[「\u300E]/.test(sentenceList[i]) || /제\d+조/.test(sentenceList[i])) {
      lawRefSentenceIdxs.push(i);
    }
  }
  let unsupported = 0;
  for (const ni of numberSentenceIdxs) {
    const hasNearby = lawRefSentenceIdxs.some(li => Math.abs(li - ni) <= 3);
    if (!hasNearby) unsupported++;
  }
  items.push({ id: "4E", pass: unsupported <= cfg.maxUnsupportedNumbers,
    detail: `근거 없는 숫자 ${unsupported}건 (${cfg.maxUnsupportedNumbers} 이하)` });

  return scoreRule("4. 손석희+유시민", items);
}

// ══════════════════════════════════════════════════════════════════
// Rule 5: 가독성
// ══════════════════════════════════════════════════════════════════

function rule5_readability(article) {
  const items = [];
  const cfg = CONFIG.rule5_readability;
  const sentences = splitSentences(article.allPlainText);

  // 5A: 평균 문장 길이
  if (sentences.length > 0) {
    const avgLen = sentences.reduce((s, sent) => s + sent.length, 0) / sentences.length;
    items.push({ id: "5A", pass: avgLen >= cfg.avgSentenceLengthMin && avgLen <= cfg.avgSentenceLengthMax,
      detail: `평균 문장 길이 ${avgLen.toFixed(0)}자 (${cfg.avgSentenceLengthMin}~${cfg.avgSentenceLengthMax})` });
  } else {
    items.push({ id: "5A", pass: false, detail: "문장 없음" });
  }

  // 5B: 80자 초과 문장 수
  const longCount = sentences.filter(s => s.length > cfg.longSentenceThreshold).length;
  items.push({ id: "5B", pass: longCount <= cfg.maxLongSentences, detail: `${cfg.longSentenceThreshold}자 초과 문장 ${longCount}건 (${cfg.maxLongSentences} 이하)` });

  // 5C: 전문용어 괄호설명
  const technicalRe = new RegExp(`[가-힣]{2,4}(?:${cfg.technicalSuffixes.join("|")})`, "g");
  const terms = article.allPlainText.match(technicalRe) || [];
  const uniqueTerms = [...new Set(terms)];
  let unexplained = 0;
  for (const term of uniqueTerms) {
    const idx = article.allPlainText.indexOf(term);
    const after = article.allPlainText.substring(idx, idx + term.length + 50);
    const before = article.allPlainText.substring(Math.max(0, idx - 10), idx);
    if (!after.includes("(") && !after.includes("즉") && !after.includes("이란") && !after.includes("라는") && !before.includes("(")) {
      unexplained++;
    }
  }
  items.push({ id: "5C", pass: unexplained <= 1, detail: `전문용어 괄호설명 누락 ${unexplained}건 (1 이하)` });

  // 5D: FAQ 답변 2~5문장
  let badFaqCount = 0;
  for (const ans of article.faqAnswers) {
    const sentCount = (ans.match(/[.?!]/g) || []).length;
    if (sentCount < cfg.faqSentenceCountMin || sentCount > cfg.faqSentenceCountMax) badFaqCount++;
  }
  items.push({ id: "5D", pass: badFaqCount === 0, detail: badFaqCount === 0 ? "FAQ 답변 길이 OK" : `FAQ 답변 길이 부적합 ${badFaqCount}건` });

  // 5E: 이중 괄호 없음
  const nestedParens = /\([^)]*\([^)]*\)/.test(article.allPlainText);
  items.push({ id: "5E", pass: !nestedParens, detail: nestedParens ? "이중 괄호 발견" : "이중 괄호 없음" });

  // 5F: 쉼표 4개 이상 문장
  const commaHeavy = sentences.filter(s => (s.match(/,/g) || []).length >= cfg.maxCommasPerSentence + 1).length;
  items.push({ id: "5F", pass: commaHeavy <= 1, detail: `쉼표 ${cfg.maxCommasPerSentence + 1}개+ 문장 ${commaHeavy}건 (1 이하)` });

  return scoreRule("5. 가독성", items);
}

// ══════════════════════════════════════════════════════════════════
// Rule 6: 문제해결 100%
// ══════════════════════════════════════════════════════════════════

function rule6_resolution(article) {
  const items = [];
  const cfg = CONFIG.rule6_resolution;
  const plain = article.allPlainText;

  // 6A: 기관/장소명
  const hasPlace = cfg.placePatterns.some(p => plain.includes(p));
  items.push({ id: "6A", pass: hasPlace, detail: hasPlace ? "기관/장소명 OK" : "기관/장소명 없음" });

  // 6B: 기한/기간
  const hasDeadline = /\d+(?:개월|일|년|주)\s*(?:이내|안에|이내에|이후|후|까지|만에)|기한|마감|신청기간|접수기간/.test(plain);
  items.push({ id: "6B", pass: hasDeadline, detail: hasDeadline ? "기한/기간 OK" : "기한/기간 정보 없음" });

  // 6C: 서류
  const hasDoc = cfg.documentPatterns.some(p => plain.includes(p));
  items.push({ id: "6C", pass: hasDoc, detail: hasDoc ? "서류 정보 OK" : "서류 정보 없음" });

  // 6D: 외부 링크 (화이트리스트)
  const links = article.allHtml.match(/<a\s+href="(https?:\/\/[^"]+)"/g) || [];
  const whitelistLinks = links.filter(l => cfg.linkWhitelist.some(w => l.includes(w)));
  items.push({ id: "6D", pass: whitelistLinks.length > 0, detail: `화이트리스트 링크 ${whitelistLinks.length}개` });

  // 6E: 연락처/온라인 신청
  const contactRe = new RegExp(cfg.contactPatterns.join("|"));
  const hasContact = contactRe.test(plain);
  items.push({ id: "6E", pass: hasContact, detail: hasContact ? "연락처/온라인 경로 OK" : "연락처 없음" });

  // 6F: 마지막 문단 행동 가능
  const lastSection = article.sections[article.sections.length - 1];
  if (lastSection) {
    const lastP = lastSection.paragraphs[lastSection.paragraphs.length - 1] || "";
    const lastIsActionable = cfg.actionWords.some(w => lastP.includes(w));
    items.push({ id: "6F", pass: lastIsActionable, detail: lastIsActionable ? "마지막 문단 행동 가능 OK" : "마지막 문단에 행동 정보 없음" });
  } else {
    items.push({ id: "6F", pass: false, detail: "섹션 없음" });
  }

  // 6G: target="_blank" 금지
  const hasTargetBlank = /target="_blank"|target='_blank'/.test(article.allHtml);
  items.push({ id: "6G", pass: !hasTargetBlank, detail: hasTargetBlank ? 'target="_blank" 발견' : 'target="_blank" 없음' });

  // 6H: "어디에" 체크 — 신청/제출/확인/방문/접수 문장에 기관명 또는 URL 필수
  const actionVerbs = ["신청", "제출", "방문", "접수", "신고"];
  const sentences6H = splitSentences(plain);
  let missingWhere = 0;
  const missingDetails = [];
  for (const sent of sentences6H) {
    const hasActionVerb = actionVerbs.some(v => sent.includes(v));
    if (!hasActionVerb) continue;
    // 이미 기관명/URL/전화번호가 있으면 OK
    const hasInstitution = cfg.placePatterns.some(p => sent.includes(p));
    const hasPhone = /\d{2,4}-\d{3,4}-\d{4}/.test(sent);
    const hasUrl = /홈페이지|\.go\.kr|\.or\.kr/.test(sent);
    if (!hasInstitution && !hasPhone && !hasUrl) {
      missingWhere++;
      if (missingDetails.length < 3) missingDetails.push(sent.substring(0, 40));
    }
  }
  items.push({ id: "6H", pass: missingWhere <= 1,
    detail: missingWhere <= 1
      ? `"어디에" 체크 OK (누락 ${missingWhere}건)`
      : `"어디에" 누락 ${missingWhere}건: ${missingDetails.map(d => `"${d}..."`).join(", ")}` });

  // 6I: 떠넘기기 감지 — 섹션 마지막 문장이 외부로 보내는 패턴이면 FAIL
  // "아래/위 X에서 확인하세요"는 같은 페이지 내 안내이므로 OK
  const dumpPatterns = [
    "전화하세요", "문의하세요", "물어보세요",
    "상담하세요", "연락하세요", "살펴보세요",
    "홈페이지에서 확인", "절차를 확인하세요",
    "알아보세요",
  ];
  const dumpExclude = ["아래", "위 ", "위의", "위에서", "위 표", "위 계산", "위 체크", "위 절차", "위 비교"];
  let dumpCount = 0;
  const dumpDetails = [];
  for (const sec of article.sections) {
    const lastP = sec.paragraphs[sec.paragraphs.length - 1] || "";
    const lastSentences = lastP.split(/(?<=[.!?])\s*/).filter(s => s.trim().length > 3);
    const lastSent = lastSentences[lastSentences.length - 1] || "";
    const isDump = dumpPatterns.some(p => lastSent.includes(p));
    const isPageRef = dumpExclude.some(e => lastSent.includes(e));
    if (isDump && !isPageRef) {
      dumpCount++;
      if (dumpDetails.length < 3) dumpDetails.push(lastSent.substring(0, 50));
    }
  }
  items.push({ id: "6I", pass: dumpCount === 0,
    detail: dumpCount === 0
      ? "떠넘기기 없음"
      : `떠넘기기 ${dumpCount}건: ${dumpDetails.map(d => `"${d}..."`).join(", ")}` });

  return scoreRule("6. 문제해결 100%", items);
}

// ══════════════════════════════════════════════════════════════════
// Rule 7: 오차 제로
// ══════════════════════════════════════════════════════════════════

function rule7_accuracy(article, sourceAvailable) {
  const items = [];
  const cfg = CONFIG.rule7_accuracy;

  // 7A: HTML 태그 균형
  let unclosed = 0;
  for (const tag of cfg.htmlTags) {
    const opens = (article.allHtml.match(new RegExp(`<${tag}[\\s>]`, "gi")) || []).length;
    const closes = (article.allHtml.match(new RegExp(`</${tag}>`, "gi")) || []).length;
    if (opens !== closes) unclosed++;
  }
  items.push({ id: "7A", pass: unclosed === 0, detail: unclosed === 0 ? "HTML 태그 균형 OK" : `${unclosed}종 태그 불균형` });

  // 7B: description 길이
  const descLen = article.description.replace(/\\n/g, "").length;
  items.push({ id: "7B", pass: descLen >= cfg.descriptionLengthMin && descLen <= cfg.descriptionLengthMax,
    detail: `description ${descLen}자 (${cfg.descriptionLengthMin}~${cfg.descriptionLengthMax})` });

  // 7C: metaDescription 길이
  const metaLen = article.metaDescription.length;
  items.push({ id: "7C", pass: metaLen <= cfg.maxMetaDescriptionLength && metaLen > 0,
    detail: `metaDescription ${metaLen}자 (${cfg.maxMetaDescriptionLength} 이하)` });

  // 7D: 숫자 옆 모호 표현
  const vagueNearNum = [];
  for (const vq of cfg.vagueQuantifiers) {
    const re = new RegExp(`${vq}\\s*\\d+|\\d+\\s*${vq}`, "g");
    const matches = article.allPlainText.match(re);
    if (matches) vagueNearNum.push(...matches);
  }
  items.push({ id: "7D", pass: vagueNearNum.length === 0,
    detail: vagueNearNum.length === 0 ? "모호 표현 없음" : `모호 표현 ${vagueNearNum.length}건: ${vagueNearNum.slice(0, 3).join(", ")}` });

  // 7E: 글 내부 모순 (같은 용어 다른 숫자)
  const termValues = {};
  const tvPattern = /([가-힣]{2,8})\s*(?:은|는|이|가)\s*(\d+(?:[,.]?\d+)*\s*(?:개월|일|년|만\s*원|원|%|세|회))/g;
  const contradictionExclude = new Set(cfg.contradictionExcludeTerms || []);
  let m;
  while ((m = tvPattern.exec(article.allPlainText)) !== null) {
    const term = m[1];
    if (contradictionExclude.has(term)) continue;
    const value = m[2].replace(/\s/g, "");
    if (!termValues[term]) termValues[term] = new Set();
    termValues[term].add(value);
  }
  const contradictions = Object.entries(termValues).filter(([, vals]) => vals.size > 1);
  items.push({ id: "7E", pass: contradictions.length === 0,
    detail: contradictions.length === 0 ? "내부 모순 없음" : `모순 ${contradictions.length}건: ${contradictions.map(([t, v]) => `${t}: ${[...v].join(" vs ")}`).join("; ")}` });

  // 7F: verify-facts.js 교차검증
  if (sourceAvailable) {
    try {
      execSync(`node "${path.join(__dirname, "verify-facts.js")}" --slug "${article.slug}"`, { stdio: "pipe", timeout: 30000 });
      items.push({ id: "7F", pass: true, detail: "verify-facts PASS" });
    } catch (e) {
      const output = (e.stdout || "").toString().trim();
      const errorLine = output.split("\n").find(l => l.includes("[ERROR]")) || "팩트 불일치";
      items.push({ id: "7F", pass: false, detail: `verify-facts FAIL: ${errorLine.substring(0, 80)}` });
    }
  } else {
    items.push({ id: "7F", pass: true, detail: "소스 없음 — 팩트 체크 생략" });
  }

  // 7G: verify-selfcheck.js 교차검증
  if (sourceAvailable) {
    try {
      execSync(`node "${path.join(__dirname, "verify-selfcheck.js")}" --slug "${article.slug}"`, { stdio: "pipe", timeout: 30000 });
      items.push({ id: "7G", pass: true, detail: "verify-selfcheck PASS" });
    } catch (e) {
      const output = (e.stdout || "").toString().trim();
      const errorLine = output.split("\n").find(l => l.includes("[ERROR]")) || "맥락 오류";
      items.push({ id: "7G", pass: false, detail: `verify-selfcheck FAIL: ${errorLine.substring(0, 80)}` });
    }
  } else {
    items.push({ id: "7G", pass: true, detail: "소스 없음 — 셀프체크 생략" });
  }

  return scoreRule("7. 오차 제로", items);
}

// ══════════════════════════════════════════════════════════════════
// Rule 8: 출처
// ══════════════════════════════════════════════════════════════════

function rule8_source(article) {
  const items = [];
  const cfg = CONFIG.rule8_source;

  let sourceMap = {};
  try { sourceMap = JSON.parse(fs.readFileSync(SOURCE_MAP_PATH, "utf8")); } catch { /* empty */ }

  const entry = sourceMap[article.slug];

  // 8A: source-map 매핑
  const isMapped = entry && entry.sourceType !== "unmapped";
  items.push({ id: "8A", pass: isMapped, detail: isMapped ? `소스 매핑 OK (${entry.sourceType})` : "소스 미매핑" });

  // 8B: source-data JSON 파일 존재 + 스키마
  let sourceData = null;
  if (isMapped && entry.sourceFile) {
    const filePath = path.join(SOURCE_DIR, entry.sourceFile);
    if (fs.existsSync(filePath)) {
      try {
        sourceData = JSON.parse(fs.readFileSync(filePath, "utf8"));
        let schemaOk = true;
        if (fs.existsSync(SCHEMA_PATH)) {
          const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, "utf8"));
          const missing = (schema.requiredFields || []).filter(f => !sourceData[f]);
          if (missing.length > 0) { schemaOk = false; }
        }
        items.push({ id: "8B", pass: schemaOk, detail: schemaOk ? "소스 JSON 유효" : "소스 JSON 스키마 불통과" });
      } catch {
        items.push({ id: "8B", pass: false, detail: "소스 JSON 파싱 실패" });
      }
    } else {
      items.push({ id: "8B", pass: false, detail: `소스 파일 없음: ${entry.sourceFile}` });
    }
  } else {
    items.push({ id: "8B", pass: false, detail: "소스 파일 미설정" });
  }

  // 8C: hero에 출처 신뢰도 문구
  const hasAuthority = cfg.sourceAuthorityPatterns.some(p => article.heroDescription.includes(p));
  items.push({ id: "8C", pass: hasAuthority, detail: hasAuthority ? "hero 출처 신뢰도 OK" : "hero에 출처 문구 없음" });

  // 8D: 신선도
  if (entry && entry.fetchedAt) {
    const fetched = new Date(entry.fetchedAt);
    const diffDays = Math.floor((Date.now() - fetched.getTime()) / (1000 * 60 * 60 * 24));
    items.push({ id: "8D", pass: diffDays <= cfg.maxFreshnessDays, detail: `소스 신선도 ${diffDays}일 (${cfg.maxFreshnessDays}일 이내)` });
  } else {
    items.push({ id: "8D", pass: false, detail: "fetchedAt 없음" });
  }

  // 8E: 법조문 일치
  if (sourceData) {
    const articleRefs = extractLawRefs(article.allPlainText).map(normalizeLawRef);
    const sourceRefs = (sourceData.lawRefs || []).map(r => normalizeLawRef(typeof r === "object" && r.text ? r.text : String(r)));
    const articleOnly = articleRefs.filter(ar =>
      !sourceRefs.some(sr => sr === ar || sr.includes(ar) || ar.includes(sr))
    );
    const maxMismatch = cfg.maxLawMismatch !== undefined ? cfg.maxLawMismatch : 1;
    items.push({ id: "8E", pass: articleOnly.length <= maxMismatch,
      detail: articleOnly.length <= maxMismatch ? "법조문 소스 일치 OK" : `소스에 없는 법조문 ${articleOnly.length}건` });
  } else {
    items.push({ id: "8E", pass: false, detail: "소스 데이터 없어 법조문 대조 불가" });
  }

  return scoreRule("8. 출처", items);
}

// ══════════════════════════════════════════════════════════════════
// 메인 실행
// ══════════════════════════════════════════════════════════════════

function checkSourceAvailable(slug) {
  try {
    const sourceMap = JSON.parse(fs.readFileSync(SOURCE_MAP_PATH, "utf8"));
    const entry = sourceMap[slug];
    if (!entry || entry.sourceType === "unmapped") return false;
    if (!entry.sourceFile) return false;
    return fs.existsSync(path.join(SOURCE_DIR, entry.sourceFile));
  } catch {
    return false;
  }
}

function runAllRules(article) {
  const sourceAvailable = checkSourceAvailable(article.slug);
  return [
    rule1_storytelling(article),
    rule2_structure(article),
    rule3_style(article),
    rule4_sharpLogic(article),
    rule5_readability(article),
    rule6_resolution(article),
    rule7_accuracy(article, sourceAvailable),
    rule8_source(article),
  ];
}

function printReport(article, results, minScore) {
  const lines = [];
  lines.push(`\n${"=".repeat(65)}`);
  lines.push(`  8대 원칙 검증: ${article.slug}`);
  lines.push(`${"=".repeat(65)}`);
  lines.push("");
  lines.push("| 규칙 | 점수 | 세부 | 판정 |");
  lines.push("|------|------|------|------|");

  let totalScore = 0;
  let allPass = true;
  const failedRules = [];

  for (const r of results) {
    totalScore += r.score;
    const verdict = r.score >= minScore ? "PASS" : "FAIL";
    if (r.score < minScore) { allPass = false; failedRules.push(r.name); }
    lines.push(`| ${r.name} | ${r.score}/10 | ${r.passed}/${r.total} | ${verdict} |`);
  }

  const avg = (totalScore / results.length).toFixed(1);
  const avgPass = parseFloat(avg) >= CONFIG.minAverageScore;
  if (!avgPass) allPass = false;

  lines.push(`| **평균** | **${avg}/10** | | ${avgPass ? "PASS" : "FAIL"} |`);
  lines.push("");

  if (allPass) {
    lines.push("PASS — 8대 원칙 전항목 통과");
  } else {
    lines.push(`FAIL — ${failedRules.join(", ")} 미달`);
    lines.push("");

    // 실패 항목 상세
    for (const r of results) {
      if (r.score < minScore) {
        lines.push(`  [${r.name}] ${r.score}/10`);
        for (const item of r.items) {
          if (!item.pass) {
            lines.push(`    FAIL ${item.id}: ${item.detail}`);
          }
        }
      }
    }
  }

  // WARN: PASS 규칙 중 실패 항목 출력 (개선 권장)
  const warnLines = [];
  for (const r of results) {
    if (r.score >= minScore) {
      const warnItems = r.items.filter(i => !i.pass);
      if (warnItems.length > 0) {
        warnLines.push(`  ⚠️  [${r.name}] PASS이지만 ${warnItems.length}개 개선 권장:`);
        for (const item of warnItems) {
          warnLines.push(`    WARN ${item.id}: ${item.detail}`);
        }
      }
    }
  }
  if (warnLines.length > 0) {
    lines.push("");
    lines.push("--- 개선 권장 사항 (WARN) ---");
    for (const l of warnLines) lines.push(l);
  }

  // 사람 검수 체크리스트
  lines.push("");
  lines.push("--- 사람 검수 체크리스트 (자동화 불가) ---");
  for (const item of CONFIG.humanChecklist) {
    lines.push(`  [ ] ${item}`);
  }

  lines.push("");
  const report = lines.join("\n");
  console.log(report);

  // JSON 리포트 저장
  const jsonReport = {
    slug: article.slug,
    category: article.categorySlug,
    timestamp: new Date().toISOString(),
    results: results.map(r => ({ name: r.name, score: r.score, passed: r.passed, total: r.total, items: r.items })),
    average: parseFloat(avg),
    verdict: allPass ? "PASS" : "FAIL",
    failedRules,
  };
  fs.writeFileSync(path.join(REPORTS_DIR, `8rules-${article.slug}.json`), JSON.stringify(jsonReport, null, 2), "utf8");

  return allPass;
}

function getAllArticles() {
  const articles = [];
  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith(".ts") && f !== "index.ts" && f.includes("-spokes-"));
  for (const f of files) {
    const content = fs.readFileSync(path.join(ARTICLES_DIR, f), "utf8");
    const blocks = splitSpokeBlocks(content);
    for (const block of blocks) {
      articles.push(parseArticle(block.slug, block.raw, f));
    }
  }
  return articles;
}

function main() {
  const args = process.argv.slice(2);
  const minScore = args.includes("--min-score") ? parseInt(args[args.indexOf("--min-score") + 1]) : CONFIG.minScorePerRule;
  const categoryFilter = args.includes("--category") ? args[args.indexOf("--category") + 1] : null;

  let articles;

  if (args.includes("--all")) {
    articles = getAllArticles();
  } else if (args.includes("--slug")) {
    const slug = args[args.indexOf("--slug") + 1];
    articles = getAllArticles().filter(a => a.slug === slug);
  } else if (categoryFilter) {
    articles = getAllArticles().filter(a => a.categorySlug === categoryFilter);
  } else if (args.length > 0 && !args[0].startsWith("--")) {
    // 첫 인자를 slug로 처리
    const slug = args[0];
    articles = getAllArticles().filter(a => a.slug === slug);
  } else {
    console.log("사용법:");
    console.log("  node scripts/verify-8rules.js <slug>");
    console.log("  node scripts/verify-8rules.js --all");
    console.log("  node scripts/verify-8rules.js --category 가정법률");
    console.log("  node scripts/verify-8rules.js --min-score 7");
    process.exit(1);
  }

  if (articles.length === 0) {
    console.log("글을 찾을 수 없습니다.");
    process.exit(1);
  }

  let allPassed = true;
  const summaryResults = [];

  for (const article of articles) {
    const results = runAllRules(article);
    const passed = printReport(article, results, minScore);
    if (!passed) allPassed = false;
    const avg = results.reduce((s, r) => s + r.score, 0) / results.length;
    summaryResults.push({ slug: article.slug, category: article.categorySlug, avg: avg.toFixed(1), passed });
  }

  // 전체 요약 (2개 이상일 때)
  if (articles.length > 1) {
    console.log(`\n${"=".repeat(65)}`);
    console.log("  전체 요약");
    console.log(`${"=".repeat(65)}`);
    console.log(`검사: ${articles.length}개 글`);
    const passCount = summaryResults.filter(r => r.passed).length;
    const failCount = summaryResults.filter(r => !r.passed).length;
    console.log(`PASS: ${passCount}개  |  FAIL: ${failCount}개`);

    if (failCount > 0) {
      console.log("\nFAIL 글 목록:");
      for (const r of summaryResults.filter(r => !r.passed)) {
        console.log(`  [${r.category}] ${r.slug} — 평균 ${r.avg}/10`);
      }
    }

    const totalAvg = (summaryResults.reduce((s, r) => s + parseFloat(r.avg), 0) / summaryResults.length).toFixed(1);
    console.log(`\n전체 평균: ${totalAvg}/10`);
  }

  process.exit(allPassed ? 0 : 1);
}

main();
