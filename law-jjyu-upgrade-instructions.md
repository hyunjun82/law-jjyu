# law-jjyu 워크플로우 자동화 업그레이드 지시서

> 이 지시서를 그대로 실행해줘. 순서대로 하나씩.

## 배경

현재 law-jjyu에는 CLAUDE.md 규칙 + quality-check.js + pre-edit-verify.js 훅이 있지만,
글 작성 후 quality-check.js를 수동으로 돌려야 하고, 안 돌리면 검증 없이 끝나는 문제가 있어.
**글 작성이 끝나면 자동으로 7가지 품질 검증이 돌아가고, 통과 못 하면 멈추게** 만들어야 해.

## 작업 1: Stop 훅 추가 (글 끝나면 자동 품질 검증)

`~/.claude/settings.json`의 `hooks.Stop` 배열에 law-jjyu 전용 Stop 훅을 추가해줘.

### 동작 원리
1. Claude가 응답을 끝내려 할 때 Stop 훅이 실행됨
2. 훅이 현재 세션에서 수정된 law-jjyu articles 파일이 있는지 확인
3. 있으면 quality-check.js를 자동 실행
4. 오류가 있으면 exit 2 → Claude가 멈추지 못하고 수정하게 됨
5. stop_hook_active가 true면 무한루프 방지를 위해 바로 exit 0

### 파일 생성: `C:\Users\user\law-jjyu\.claude\hooks\stop-quality-gate.js`

```javascript
/**
 * Stop Hook: 글 작성 완료 시 자동 품질 검증
 *
 * Claude가 응답을 끝내려 할 때:
 * 1. git diff로 수정된 articles 파일 확인
 * 2. 수정된 파일에서 slug 추출
 * 3. quality-check.js + fact-compare.js 자동 실행
 * 4. 오류 있으면 exit 2 (Claude가 수정하도록 강제)
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = "C:/Users/user/law-jjyu";

function main() {
  let input;
  try {
    input = JSON.parse(process.env.STDIN_JSON || "{}");
  } catch {
    process.exit(0);
  }

  // 무한루프 방지
  if (input.stop_hook_active === true) {
    process.exit(0);
  }

  // git diff로 수정된 articles 파일 확인
  let changedFiles;
  try {
    changedFiles = execSync("git diff --name-only HEAD", {
      cwd: PROJECT_ROOT,
      encoding: "utf8",
      timeout: 5000,
    }).trim();
  } catch {
    // git diff 실패 시 (커밋 안 된 경우) staged + unstaged 확인
    try {
      changedFiles = execSync("git diff --name-only && git diff --name-only --cached", {
        cwd: PROJECT_ROOT,
        encoding: "utf8",
        timeout: 5000,
      }).trim();
    } catch {
      process.exit(0);
    }
  }

  if (!changedFiles) process.exit(0);

  // articles 파일만 필터
  const articleFiles = changedFiles
    .split("\n")
    .filter(f => f.includes("data/articles/") && f.endsWith(".ts") && !f.endsWith("index.ts"));

  if (articleFiles.length === 0) process.exit(0);

  // 수정된 파일에서 slug 추출
  const slugs = new Set();
  for (const file of articleFiles) {
    const fullPath = path.join(PROJECT_ROOT, file);
    if (!fs.existsSync(fullPath)) continue;
    const content = fs.readFileSync(fullPath, "utf8");
    const matches = content.matchAll(/slug:\s*"([^"]+)"/g);
    for (const m of matches) {
      // hub의 spokes 배열 안 slug는 제외 (sections가 없는 것)
      const after = content.substring(m.index, m.index + 500);
      if (after.includes("sections:") || after.includes("content:")) {
        slugs.add(m[1]);
      }
    }
  }

  if (slugs.size === 0) process.exit(0);

  // quality-check.js 실행
  const errors = [];
  for (const slug of slugs) {
    try {
      const result = execSync(`node scripts/quality-check.js "${slug}"`, {
        cwd: PROJECT_ROOT,
        encoding: "utf8",
        timeout: 15000,
      });
      // "오류" 또는 "수정 필요" 가 있으면 실패
      if (result.includes("수정 필요") || result.includes("✗")) {
        const errorLines = result.split("\n").filter(l => l.includes("✗"));
        errors.push(`[${slug}] 품질 검증 실패:\n${errorLines.join("\n")}`);
      }
    } catch (e) {
      errors.push(`[${slug}] quality-check.js 실행 오류: ${e.message}`);
    }
  }

  // fact-compare.js 실행
  for (const slug of slugs) {
    try {
      const result = execSync(`node scripts/fact-compare.js "${slug}"`, {
        cwd: PROJECT_ROOT,
        encoding: "utf8",
        timeout: 15000,
      });
      if (result.includes("불일치") || result.includes("오류")) {
        errors.push(`[${slug}] 팩트 검증 실패: ${result.trim()}`);
      }
    } catch {
      // fact-compare.js 없거나 실패 → 무시 (quality-check만으로도 충분)
    }
  }

  if (errors.length > 0) {
    console.error("=== 자동 품질 검증 실패 — 수정 후 다시 시도하세요 ===\n");
    for (const err of errors) {
      console.error(err + "\n");
    }
    console.error("위 오류를 모두 수정한 후에야 작업을 끝낼 수 있어요.");
    process.exit(2); // Claude가 멈추지 못하고 수정하게 강제
  }

  // 전부 통과
  process.exit(0);
}

main();
```

### settings.json 수정

`~/.claude/settings.json`의 `hooks.Stop` 배열에 추가:

```json
{
  "matcher": "",
  "hooks": [
    {
      "type": "command",
      "command": "cd C:/Users/user/law-jjyu && node .claude/hooks/stop-quality-gate.js",
      "timeout": 30
    }
  ]
}
```

---

## 작업 2: pre-edit-verify.js 업그레이드 (MasterPieceContent 구조 검증 추가)

현재 pre-edit-verify.js는 소스 읽기 여부 + 팩트 대조 + 문체만 검사해.
여기에 **MasterPieceContent 구조 검증**을 추가해줘.

### `C:\Users\user\law-jjyu\.claude\hooks\pre-edit-verify.js`에 추가할 검증 로직

기존 L0(분량), L1(소스), L2(팩트), L3(문체) 뒤에 **L4(MasterPieceContent 구조)** 추가:

```javascript
// === L4: MasterPieceContent 구조 검증 (pre-edit에서 사전 차단) ===

// 4-1. heroDescription 독자 공감 체크
const heroMatch = block.match(/heroDescription:\s*"((?:[^"\\]|\\.)*)"/);
if (heroMatch) {
  const hero = heroMatch[1];
  // 공감형 시작이 아니면 경고
  if (!hero.match(/\?|막막|궁금|고민|걱정|어려|힘들/)) {
    errors.push(`[${slug}] heroDescription에 독자 공감 요소 없음 ("~죠?", "~막막하" 등 필요)`);
  }
}

// 4-2. description vs heroDescription 유사도 체크
const descMatch = block.match(/description:\s*"((?:[^"\\]|\\.)*)"/);
if (descMatch && heroMatch) {
  const desc = descMatch[1].replace(/\\n/g, "");
  const hero = heroMatch[1].replace(/\\n/g, "");
  const descWords = desc.split(/\s+/);
  const heroWords = new Set(hero.split(/\s+/));
  let overlap = 0;
  for (const w of descWords) {
    if (heroWords.has(w)) overlap++;
  }
  const ratio = overlap / Math.max(descWords.length, 1);
  if (ratio > 0.9) {
    errors.push(`[${slug}] description과 heroDescription ${Math.round(ratio * 100)}% 동일 — 분리 필요`);
  }
}

// 4-3. 섹션 첫 문단 서론형 시작 금지
const badStarts = ["알아보겠", "살펴보겠", "설명하겠", "알아볼게", "여기서 꼭", "이번에는", "먼저", "이에 대해"];
const contentMatches = [...block.matchAll(/content:\s*`([^`]*)`/g)];
for (const cm of contentMatches) {
  const html = cm[1];
  const firstP = html.match(/<p>([^<]+)/);
  if (firstP) {
    const firstSentence = firstP[1].trim();
    for (const bs of badStarts) {
      if (firstSentence.startsWith(bs)) {
        errors.push(`[${slug}] 서론형 시작 금지 위반: "${firstSentence.substring(0, 40)}..." — 결론부터 시작해야 해요`);
      }
    }
  }
}
```

이 코드를 기존 pre-edit-verify.js의 L3(문체) 검사 뒤, `if (errors.length > 0)` 앞에 넣어줘.

---

## 작업 3: UserPromptSubmit 훅 (키워드 자동 감지) — 선택사항

이건 편의 기능이야. 사용자가 "키워드: 협의이혼 신청 서류" 같은 형식으로 입력하면,
자동으로 STEP 0~6 워크플로우를 상기시켜주는 컨텍스트를 주입해.

### `C:\Users\user\law-jjyu\.claude\hooks\keyword-workflow-inject.js`

```javascript
/**
 * UserPromptSubmit Hook: "키워드:" 패턴 감지 시 워크플로우 컨텍스트 주입
 */
const main = () => {
  let input;
  try {
    input = JSON.parse(process.env.STDIN_JSON || "{}");
  } catch { process.exit(0); }

  const prompt = input.prompt || "";

  // "키워드:" 또는 "키워드 :" 패턴 감지
  if (!prompt.match(/키워드\s*[:：]/)) {
    process.exit(0);
  }

  // 워크플로우 컨텍스트 출력 (Claude에게 주입됨)
  const context = JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "UserPromptSubmit",
      additionalContext: [
        "🔔 키워드 감지 — MasterPieceContent 워크플로우 시작:",
        "STEP 0: source-data/{slug}.json 확인 → 없으면 easylaw 스크래핑",
        "STEP 1: 메타데이터 작성 (title=h1=PAA, hero=공감형, desc=가치제안형)",
        "STEP 2: 섹션 3~4개 작성 (결론→조건→실행 3문단, 법조문 근거 필수)",
        "STEP 3: FAQ 3~4개 작성",
        "STEP 4: ArticleViz.tsx 시각화 매핑",
        "STEP 5: hub 엔트리 추가",
        "STEP 6: quality-check.js + fact-compare.js 검증 → 0 에러 필수",
        "⚠️ Stop 훅이 자동으로 검증합니다. 검증 통과 못 하면 끝낼 수 없어요."
      ].join("\n")
    }
  });

  console.log(context);
  process.exit(0);
};

main();
```

### settings.json에 추가

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "cd C:/Users/user/law-jjyu && node .claude/hooks/keyword-workflow-inject.js",
            "timeout": 5
          }
        ]
      }
    ]
  }
}
```

---

## 작업 4: pharm-jjyu에도 동일 Stop 훅 추가

law-jjyu와 같은 구조로 pharm-jjyu에도 Stop 훅을 만들어줘.
차이점: quality-check.js 대신 verify-wiki-quality.js 사용.

### `C:\Users\user\pharm-jjyu\.claude\hooks\stop-quality-gate.js`

law-jjyu 버전을 복사하되:
- `PROJECT_ROOT`를 `C:/Users/user/pharm-jjyu`로 변경
- quality-check.js 대신 `node scripts/verify-wiki-quality.js` 호출
- fact-compare.js 대신 `node scripts/verify-facts.js` 호출

### settings.json Stop 배열에 추가

```json
{
  "matcher": "",
  "hooks": [
    {
      "type": "command",
      "command": "cd C:/Users/user/pharm-jjyu && node .claude/hooks/stop-quality-gate.js",
      "timeout": 30
    }
  ]
}
```

---

## 요약: 완료 후 워크플로우 흐름

```
사용자: "키워드: 양육비 산정기준표 금액"
        ↓
[UserPromptSubmit 훅] → STEP 0~6 워크플로우 컨텍스트 자동 주입
        ↓
[Claude] → STEP 0: source-data 확인/수집
        → STEP 1: 메타데이터 작성
        → STEP 2: 섹션 작성 (결론→조건→실행)
        → STEP 3: FAQ 작성
        → STEP 4~5: 시각화 + hub 엔트리
        ↓
[pre-edit-verify.js 훅] → 저장할 때마다 자동 대조
   소스 안 읽었으면 → 차단
   팩트 불일치 → 차단
   문체 위반 → 차단
   구조 위반 → 차단 (NEW: L4 MasterPieceContent)
        ↓
[Claude 응답 종료 시도]
        ↓
[Stop 훅: stop-quality-gate.js] → quality-check.js 자동 실행
   7가지 체크 전부 통과 → 종료 허용
   오류 있음 → exit 2 → Claude가 수정 강제
        ↓
[수정 후 재시도] → 통과할 때까지 반복
        ↓
✅ 완성 (키워드만 던졌는데 검증된 글이 나옴)
```

## 테스트 방법

작업 완료 후 이렇게 테스트:

1. law-jjyu 프로젝트에서 새 대화 시작
2. "키워드: 양육비 산정기준표 금액 | 양육비 산정 기준표 자녀 나이별" 입력
3. Claude가 STEP 0~6 자동 실행하는지 확인
4. 글 저장 시 pre-edit-verify.js가 사전 차단하는지 확인
5. 응답 끝날 때 Stop 훅이 quality-check.js 돌리는지 확인
6. 오류 있으면 Claude가 자동 수정하는지 확인

---

## 주의사항

1. `~/.claude/settings.json`은 **모든 프로젝트 공유** — law, pharm 둘 다 영향
2. Stop 훅은 `stop_hook_active` 체크 필수 (안 하면 무한루프)
3. git diff가 빈 경우 (이미 커밋됨) → 훅이 건너뜀 → 커밋 전에 검증되도록
4. timeout은 30초로 설정 (quality-check.js가 여러 slug 돌리면 좀 걸림)
