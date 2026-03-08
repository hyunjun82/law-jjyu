# law.jjyu.co.kr 프로젝트 규칙서

> 이 파일은 Agent Teams 팀원이 동일한 품질의 글을 작성하기 위한 필수 규칙서입니다.
> 모든 에이전트는 이 규칙을 반드시 따라야 합니다.

## 프로젝트 개요

- **사이트**: law.jjyu.co.kr (생활법령 정보 사이트)
- **스택**: Next.js 16.1.6 + Tailwind CSS v4 + shadcn/ui
- **배포**: Vercel (main 브랜치 자동 배포)
- **아키텍처**: Hub/Spoke (허브 = 카테고리 가이드, 스포크 = 개별 법률 글)

## 카테고리 (6개)

| slug | 이름 | 아이콘 | 상태 |
|------|------|--------|------|
| 가정법률 | 가정법률 | 👨‍👩‍👧‍👦 | ✅ 완료 (20개) |
| 부동산임대차 | 부동산/임대차 | 🏠 | 예정 |
| 금융금전 | 금융/금전 | 💰 | 예정 |
| 민형사소송 | 민형사/소송 | ⚖️ | 예정 |
| 근로노동 | 근로/노동 | 🏗️ | 예정 |
| 복지 | 복지 | 🤝 | 예정 |

---

## Source-First 워크플로우 (절대 규칙)

### 원칙: source-data JSON 없이 글 작성 금지

글을 작성하기 전에 **반드시** easylaw.go.kr 소스 데이터를 `source-data/` 폴더에 JSON으로 저장해야 합니다.
이 JSON을 참조하여 글을 작성해야 하며, 기억이나 추론으로 법률 정보를 작성하면 안 됩니다.

### 글 작성 워크플로우

```
1. easylaw.go.kr 해당 페이지를 Playwright(MCP)로 열기
2. page.evaluate()로 DOM 파싱 → JSON 추출
3. source-data/{pageId}.json 으로 저장
4. scripts/easylaw-url-map.json 에 slug → URL 매핑 추가
5. source-data JSON을 읽고 그 내용만으로 글 작성
6. 작성 후 node scripts/fact-compare.js <slug> 실행하여 검증
7. 오류 0건 확인 후 커밋
```

### 소스 데이터 추출 방법

easylaw.go.kr는 JSON API가 없으므로 Playwright MCP 도구로 추출합니다:
- `mcp__playwright__browser_navigate` → easylaw URL로 이동
- `mcp__playwright__browser_run_code` → `div.ovDivbox` 파싱
- CSS 클래스: `plv1a`=대제목, `plv2a`=소제목, `plv3a`=본문, `plv4d`=목록, `tplv4`=주석
- 법조문 링크: `a[href*="law.go.kr"]`
- Write tool로 `source-data/{csmSeq}-{ccfNo}-{cciNo}-{cnpClsNo}.json` 저장

### 콘텐츠 소스 규칙

1. **source-data JSON에 있는 내용만** 글에 반영
2. 에이전트가 자체 검색해서 가져온 정보 금지
3. 에이전트의 개인 해석, 의견 금지
4. easylaw.go.kr 문장을 **구어체로 번역만** 한다
5. 법령 조문 번호, 금액, 기간 등 숫자 정보는 source-data JSON 기준 그대로
6. source-data JSON에 없는 숫자, 서류, 기간을 임의로 추가하지 않는다

### 팩트 검증 스크립트

```bash
# 소스 데이터 vs 글 비교
node scripts/fact-compare.js <slug>

# 전체 매핑된 글 비교
node scripts/fact-compare.js --all
```

### 예시

**원문 (easylaw.go.kr / source-data JSON)**
> 협의이혼 의사확인 신청 시 미성년 자녀가 있는 경우 숙려기간은 3개월입니다.

**변환 결과**
> 미성년 자녀가 있으면 숙려기간이 3개월이에요.

---

## 글쓰기 규칙

### 1. 타이틀 공식 (PAA 키워드 사용)

- 사용자가 제공한 **PAA 키워드를 그대로** title과 h1에 사용
- **title과 h1은 반드시 동일**
- 키워드 한 글자도 수정 금지 (조사 추가, 단어 변경 금지)

```
예시: "협의이혼 신청 서류 준비 | 이혼숙려기간 이혼신고 기한"
→ title: 그대로 사용
→ h1: 그대로 사용
```

### 2. 섹션 소제목 = PAA 키워드

- 사용자가 제공한 PAA 키워드를 **섹션 title에 그대로 사용**
- 의문문 형태 그대로 유지 (예: "~은 무엇인가요?", "~어떻게 하나요?")

### 3. 문체: 구어체

- "~에요", "~이에요", "~예요", "~돼요" 사용 (존댓말)
- "~합니다", "~입니다" 사용 금지 (문어체 금지)
- metaDescription만 예외적으로 문어체 허용 ("~했습니다")
- 자연스럽고 친근한 톤 유지

### 4. 문체 세부 규칙

1. bold 헤딩 뒤 콜론(:) 금지. 굵기만으로 포인트
2. em dash(—) 금지. 자연스러운 한국어로
3. "또는" 대신 쉼표(,) 선호
4. 한 문장에 정보 하나
5. 전문 용어 사용 후 괄호로 설명 (예: "아포스티유(Apostille)")

### 5. 작성자

- 이름: **"생활법령 에디터"** (모든 카테고리 동일)
- 프로필 링크: `/about`

### 6. 날짜

- `datePublished`: 글 최초 작성일 (YYYY-MM-DD)
- `dateModified`: 글 수정일 (YYYY-MM-DD)
- 신규 작성 시 둘 다 오늘 날짜

---

## 글 구조 (Spoke Article)

### 필수 구성 요소

1. **faq**: 3~4개
2. **sections**: 3~4개 (PAA 키워드를 title로 사용)

### 섹션 본문 규칙 (스트레이트형 필수)

- 각 섹션 정확히 **3문단** (HTML `<p>` 태그로 구분)
- 각 문단 최소 2~3문장
- **`<ul>/<li>` 블릿 목록은 섹션 content에 절대 금지** → 목록 항목은 문장 안에 녹여서 쓴다
- 비교 데이터는 `<table>`로, 나열 항목은 `<p>` 안에 쉼표로 연결
- 다른 법률 주제와의 비교 포함 권장

### 문단 간 접속어 (자연스러운 흐름)

언론 기사처럼 문단과 문단 사이가 매끄럽게 이어지도록 접속어를 사용한다.
단, **기계적 반복은 절대 금지**한다. 섹션마다 같은 접속어 패턴을 쓰면 AI가 쓴 글처럼 보인다.

**핵심 규칙**
1. 키워드·주제·문맥에 맞는 접속어를 자연스럽게 선택한다
2. 같은 글 안에서 동일한 접속어 패턴이 반복되면 안 된다 (예: 매 섹션 "다만 → 참고로" 금지)
3. 접속어 없이도 문맥이 이어지면 굳이 넣지 않아도 된다
4. 접속어는 문단 첫머리뿐 아니라 문장 중간에서도 자연스럽게 쓸 수 있다

**접속어 예시 (참고용, 외우지 말 것)**
그럼에도 불구하고, 따라서, 반면, 이에, 그렇다면, 예를 들어보면, 이와 달리, 한편, 결국, 특히, 물론, 그런데, 다만, 실제로, 이 때문에 등

### FAQ 규칙

- 3~4개
- 실제 사용자가 궁금해할 질문 (PAA 관련)
- 답변은 구어체, 2~4문장

### 섹션 content HTML 규칙

```html
<!-- ✅ 문단 3개 필수, 문맥에 맞게 자연스럽게 이어질 것 -->
<!-- ❌ 매 섹션 "다만 → 참고로/따라서" 패턴 반복 금지 -->
<p>첫 번째 문단: 핵심 내용.</p>

<p>두 번째 문단: 흐름에 맞는 접속어로 자연스럽게 연결.</p>

<p>세 번째 문단: 실용 정보나 보충 설명.</p>

<!-- ✅ 비교·정리 데이터는 표로 -->
<table>
<thead><tr><th>항목</th><th>내용</th></tr></thead>
<tbody>
<tr><td>데이터</td><td>데이터</td></tr>
</tbody>
</table>

<!-- ✅ 링크 (target="_blank" 금지) -->
<a href="https://www.gov.kr">정부24</a>

<!-- ❌ 금지: 블릿 목록 (섹션 content에 절대 사용 금지) -->
<!-- <ul><li>항목</li></ul>  → 문장으로 풀어쓸 것 -->

<!-- ❌ 금지: 굵은 소제목 헤딩 -->
<!-- <p><strong>기본 구비서류</strong></p> → 문단 첫 문장에 녹여서 쓸 것 -->
```

---

## 데이터 파일 작성 규칙

### SpokeArticle 구조

```typescript
{
  slug: "협의이혼-절차-서류-이혼숙려기간",  // URL 슬러그 (한글+하이픈)
  categorySlug: "가정법률",                 // 카테고리 slug
  title: "협의이혼 신청 서류 준비 | 이혼숙려기간 이혼신고 기한",  // PAA 키워드 그대로
  h1: "협의이혼 신청 서류 준비 | 이혼숙려기간 이혼신고 기한",     // title과 동일
  metaDescription: "... 안내합니다.",       // 문어체 허용, 160자 이내
  description: "... 알려드려요.",            // 구어체, 140~160자
  heroDescription: "... 정리했어요.",        // 구어체, 2~3문장
  datePublished: "2025-03-01",
  dateModified: "2025-03-01",
  faq: [ /* 3~4개 */ ],
  sections: [ /* 3~4개, title = PAA 키워드 */ ],
}
```

### HubArticle 구조

```typescript
{
  categorySlug: "가정법률",
  title: "이혼 법률정보 총정리 | 협의이혼 재판이혼 재산분할 양육권",
  h1: "이혼 법률정보 총정리",
  metaDescription: "...",
  description: "...",
  heroDescription: "...",
  datePublished: "2025-03-01",
  dateModified: "2025-03-01",
  spokes: [
    { slug: "협의이혼-절차-서류-이혼숙려기간", title: "...", description: "..." },
    // ...
  ],
}
```

---

## 시각화 컴포넌트 매핑 규칙

글 작성 시 주제 키워드를 보고 **필요한 컴포넌트만** 골라서 ArticleViz.tsx의 VIZ_MAP에 추가한다.
전부 넣지 않는다. 해당 글에 실질적으로 도움이 되는 것만 넣는다.

### 키워드 → 컴포넌트 매핑

| 글의 주제 | 사용 컴포넌트 | 설명 |
|-----------|-------------|------|
| 절차, 신청 방법 | AccordionChecklist, DateCalculator | 서류 체크 + 기한 계산 |
| 비용, 수수료 | CostBreakdown, Calculator | 비용 구조 차트 + 계산기 |
| 자격, 요건 | EligibilityChecker, DecisionTree | 자격 판정 + 분기 가이드 |
| 비교 (협의 vs 재판) | ComparisonTable | 비교표 |
| 기한, 시효 | DeadlineBanner, DateCalculator | D-day + 기한 계산 |
| 양육비, 금액 구간 | RangeTable, Calculator | 구간표 + 계산기 |
| 판례, 사례 | CaseCard | 판례 카드 |
| 서식, 양식 다운로드 | FormDownload | 파일 다운로드 |
| 연락처, 기관 안내 | ContactCard | 기관 카드 |
| 경고, 주의사항 | WarningBox | 경고 박스 |
| 단계별 흐름 (5단계 이상) | ProcessTimeline | 세로 타임라인 |
| 핵심 숫자 요약 | StatCard | 숫자 카드 |

### 시각화 사용 규칙

1. **본문과 중복되는 시각화는 넣지 않는다** (본문에 이미 절차 목록이 있으면 ProcessTimeline 불필요)
2. **섹션마다 1개 목표** — 섹션 4개면 시각화 4개가 기본. 적합한 컴포넌트가 없는 섹션만 생략
3. **위치는 관련 섹션 바로 뒤** (after-0, after-1 등)
4. **top 위치는 꼭 필요한 경우만** (StatCard 등)
5. **모든 외부 링크는 같은 창에서 열기** (target="_blank" 금지)
6. **링크는 메인 URL 사용** (깨지기 쉬운 딥링크 금지)

---

## 링크 규칙

### 허용 링크

| 사이트 | URL | 비고 |
|--------|-----|------|
| 정부24 | https://www.gov.kr | 메인 URL만 |
| 대법원 전자가족관계 | https://efamily.scourt.go.kr | 증명서 발급 |
| 찾기쉬운 생활법령 | https://easylaw.go.kr | 출처 참고 |
| 외교부 영사콜센터 | https://www.0404.go.kr | 영사 서비스 |
| 국민건강보험공단 | https://www.nhis.or.kr | 건강보험 |
| 국민연금공단 | https://www.nps.or.kr | 연금 관련 |

### 금지 링크

- 대법원 전자민원센터 (help.scourt.go.kr) → 다운로드 안 됨
- 깨지기 쉬운 딥링크 (쿼리 파라미터 포함 URL)
- target="_blank" 사용 금지

---

## UI 컴포넌트 규칙

### 사이드바 (CategorySidebar)
- PC에서만 표시 (`hidden lg:block`)
- 같은 카테고리 전체 spoke 목록 (개수 제한 없음)
- `sticky top-24`

### 본문 내부링크 (RelatedSpokes)
- **최대 3개**만 표시
- 2번째 섹션(i=1) 뒤에 배치

### 다음(Daum) 웹마스터도구 클래스
- h1: `daum-wm-title`
- time: `daum-wm-datetime`
- article: `daum-wm-content`

---

## 빌드 & 검증 체크리스트

글 작성 완료 후 반드시 아래 순서로 검증:

### 필수 검증 (자동)
```bash
npm run build          # 빌드 성공 확인
```

### 수동 검증 항목
- [ ] title과 h1이 동일한가
- [ ] PAA 키워드를 그대로 사용했는가 (한 글자도 수정 없이)
- [ ] 구어체 ("~에요") 사용했는가
- [ ] 섹션 3~4개, FAQ 3~4개인가
- [ ] 각 섹션이 정확히 `<p>` 3문단인가
- [ ] `<ul>/<li>` 블릿이 섹션 content에 없는가
- [ ] 접속어가 자연스럽고 섹션마다 같은 패턴이 반복되지 않는가
- [ ] 내용 출처가 easylaw.go.kr인가
- [ ] 법령 조문, 금액, 기간 등 숫자가 정확한가
- [ ] ArticleViz.tsx VIZ_MAP에 시각화가 추가됐는가
- [ ] hub spokes에 새 글이 추가되었는가
- [ ] 외부 링크가 작동하는가
- [ ] target="_blank" 사용하지 않았는가
- [ ] bold 뒤 콜론(:) 사용하지 않았는가

---

## Agent Teams 작업 규칙

### 파일 충돌 방지
- **1 에이전트 = 1 카테고리** (절대 규칙)
- 다른 에이전트의 카테고리 파일을 수정하지 않는다
- 공통 파일 (`lib/types.ts`, `components/`, `app/`) 수정 금지

### 작업 순서 (키워드 → 배포까지 전체 흐름)

```
키워드 입력
    ↓
① easylaw.go.kr 페이지를 Playwright MCP로 열기
    ↓
② page.evaluate()로 DOM 파싱 → source-data/{pageId}.json 저장
    ↓
③ scripts/easylaw-url-map.json에 slug → URL 매핑 추가
    ↓
④ source-data JSON을 Read tool로 읽고 확인
    ↓
⑤ source-data JSON 기반으로 data/articles/{카테고리}-spokes-N.ts 작성
   - 스트레이트형 3문단 x 3~4섹션
   - 접속어는 문맥에 맞게 자연스럽게 (같은 패턴 반복 금지)
   - <ul>/<li> 절대 금지
    ↓
⑥ node scripts/fact-compare.js <slug> 실행 → 오류 0건 확인
    ↓
⑦ components/ArticleViz.tsx VIZ_MAP에 시각화 추가
    ↓
⑧ hub spokes 엔트리 추가
    ↓
⑨ npm run build 통과 확인
    ↓
⑩ git commit & push → Vercel 자동 배포
```

**레이어 역할**
| 레이어 | 파일 | 역할 |
|--------|------|------|
| 규칙 | `CLAUDE.md` | 글쓰기·구조·시각화 기준 |
| 타입 | `lib/types.ts` | 필수 필드 누락 시 빌드 에러 |
| 데이터 | `data/articles/*.ts` | 실제 글 내용 |
| 시각화 | `components/ArticleViz.tsx` | slug별 컴포넌트 위치 매핑 |
| 렌더러 | `app/[category]/[slug]/page.tsx` | 항상 동일한 순서로 출력 |

### 커밋 규칙
- 커밋 메시지: `{카테고리} 카테고리 {N}개 spoke 글 추가`

---

## 파일 구조

```
law-jjyu/
├── scripts/
│   ├── easylaw-scraper.js           ← Playwright DOM → JSON (CLI용)
│   ├── easylaw-url-map.json         ← slug → easylaw URL 매핑
│   └── fact-compare.js              ← source-data vs 글 비교
├── source-data/                     ← ⭐ easylaw 소스 JSON (글 작성 전 필수)
│   ├── 233-2-2-1.json               ← 예: 이혼 > 협의이혼 > 절차
│   └── toc-233.json                 ← 이혼 전체 목차
├── reports/                         ← 팩트체크 리포트 출력
├── app/
│   ├── [category]/[slug]/page.tsx  ← Spoke 페이지 (핵심)
│   ├── [category]/page.tsx         ← Hub 페이지
│   ├── about/page.tsx              ← 작성자 소개
│   ├── layout.tsx                  ← 루트 레이아웃 + 메타데이터
│   ├── page.tsx                    ← 홈페이지
│   ├── sitemap.ts                  ← 사이트맵 자동 생성
│   └── feed.xml/route.ts          ← RSS 피드
├── components/
│   ├── ui/                        ← shadcn/ui 기본 컴포넌트
│   ├── viz/                       ← ⭐ 시각화 컴포넌트 (16종)
│   │   ├── AccordionChecklist.tsx
│   │   ├── Calculator.tsx
│   │   ├── CaseCard.tsx
│   │   ├── ComparisonTable.tsx
│   │   ├── ContactCard.tsx
│   │   ├── CostBreakdown.tsx
│   │   ├── DateCalculator.tsx
│   │   ├── DeadlineBanner.tsx
│   │   ├── DecisionTree.tsx
│   │   ├── EligibilityChecker.tsx
│   │   ├── FormDownload.tsx
│   │   ├── ProcessTimeline.tsx
│   │   ├── ProgressTracker.tsx
│   │   ├── RangeTable.tsx
│   │   ├── StatCard.tsx
│   │   ├── WarningBox.tsx
│   │   └── index.ts
│   ├── ArticleViz.tsx             ← VIZ_MAP (slug → 시각화 위치)
│   ├── AuthorBio.tsx
│   ├── CategorySidebar.tsx
│   ├── FAQSection.tsx
│   ├── RelatedSpokes.tsx
│   └── ShareButtons.tsx
├── data/
│   ├── articles/                  ← ⭐ 카테고리별 분리
│   │   ├── index.ts               ← 통합 export
│   │   ├── 가정법률.ts             ← Hub + spoke 라우터
│   │   ├── divorce-spokes-1.ts    ← Spokes 1-5
│   │   ├── divorce-spokes-2.ts    ← Spokes 6-10
│   │   ├── divorce-spokes-3.ts    ← Spokes 11-15
│   │   └── divorce-spokes-4.ts    ← Spokes 16-20
│   └── categories.ts             ← 6개 카테고리
├── lib/
│   ├── types.ts                   ← TypeScript 인터페이스
│   └── utils.ts                   ← 유틸리티 (cn)
├── public/
│   ├── forms/                     ← 다운로드 양식 (.hwp 등)
│   └── robots.txt                 ← Daum 인증키 포함
└── CLAUDE.md                      ← 이 파일
```

### Agent Teams 카테고리 파일 규칙
- 에이전트는 자기 카테고리 파일만 편집
- `data/articles/index.ts`에 새 카테고리 import 추가 시 주석 해제
- `data/categories.ts` count 업데이트

---

## Windows 환경 주의사항

- Turbopack dev 서버가 Windows에서 자주 충돌 → `npm run build`로 검증
- `.next` 캐시 삭제 시 프로세스 잠금 문제 발생 가능
- preview_start 대신 빌드 검증 후 Vercel 배포로 확인
- 확인은 항상 **프로덕션 URL** (law.jjyu.co.kr)에서 (localhost 금지)
