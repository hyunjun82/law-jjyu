"use client";

import { AccordionChecklist } from "@/components/viz/AccordionChecklist";
import { DateCalculator } from "@/components/viz/DateCalculator";
import { WarningBox } from "@/components/viz/WarningBox";
import { ContactCard } from "@/components/viz/ContactCard";
import { FormDownload } from "@/components/viz/FormDownload";

// ─── 슬러그별 시각화 매핑 ───
// position: "top" = 히어로 아래 본문 전, "after-0" = 섹션0 뒤, "after-1" = 섹션1 뒤, ...

type VizPosition = "top" | `after-${number}`;

interface VizMap {
  [slug: string]: Partial<Record<VizPosition, React.ReactNode>>;
}

const VIZ_MAP: VizMap = {
  "협의이혼-절차-서류-이혼숙려기간": {
    "after-0": (
      <>
        <AccordionChecklist
          groups={[
            {
              title: "기본 서류 (부부 모두 필요)",
              items: [
                "협의이혼의사확인 신청서 1부",
                "가족관계증명서 — 부부 각 1부",
                "혼인관계증명서 — 부부 각 1부",
                "주민등록등본 1부 (세대 전원)",
                "신분증 사본 — 부부 각 1부",
              ],
            },
            {
              title: "미성년 자녀 있을 때 추가 서류",
              items: [
                "자녀의 기본증명서",
                "양육비부담조서 또는 양육사항 협의서",
                "자녀 양육·친권자 결정 협의서",
              ],
            },
            {
              title: "외국 국적 배우자 추가 서류",
              items: [
                "해당 국가 혼인증명서 + 한국어 번역본",
                "번역 공증 (공증사무소/법무법인)",
                "아포스티유 또는 영사 확인",
                "외국인등록증 사본",
                "여권 사본",
              ],
            },
          ]}
        />
        <FormDownload
          items={[
            {
              name: "협의이혼 절차 안내",
              description: "대법원 제공 협의이혼 절차 안내 문서 (2025.05.01)",
              url: "/forms/협의이혼-절차-안내.hwp",
              fileType: "HWP",
            },
          ]}
        />
      </>
    ),
    "after-1": (
      <DateCalculator
        title="이혼숙려기간 · 신고기한 계산기"
        description="이혼안내 상담일(기준일)을 선택하면 숙려기간 만료일과 남은 일수를 계산해요."
        presets={[
          { label: "숙려기간 1개월 (자녀 없음)", days: 30, description: "미성년 자녀 없는 경우" },
          { label: "숙려기간 3개월 (자녀 있음)", days: 90, description: "미성년 자녀 있는 경우" },
          { label: "이혼신고 기한 3개월", days: 90, description: "확인서등본 발급일 기준" },
        ]}
      />
    ),
    "after-3": (
      <>
        <WarningBox type="warning" title="이혼신고 기한을 꼭 지키세요">
          확인서등본 발급일로부터 3개월을 넘기면 확인서등본이 무효가 돼요. 처음부터 다시 해야 하니 가능한 한 빨리 신고하세요.
        </WarningBox>
        <ContactCard
          contacts={[
            {
              name: "대법원 전자민원센터",
              description: "이혼신청서 양식 다운로드",
              url: "https://help.scourt.go.kr",
              urlLabel: "신청서 양식 바로가기",
            },
            {
              name: "전자가족관계등록시스템",
              description: "가족관계·혼인관계 증명서 발급",
              url: "https://efamily.scourt.go.kr",
              urlLabel: "증명서 발급 바로가기",
            },
            {
              name: "정부24",
              description: "주민등록등본 온라인 발급",
              phone: "110",
              url: "https://www.gov.kr/mw/AA020InfoCappView.do?HighCtgCD=A09002&CappBizCD=13100000015",
            },
            {
              name: "대한법률구조공단",
              description: "무료 법률 상담 및 소송 지원",
              phone: "132",
              hours: "평일 09:00~18:00",
              url: "https://www.klac.or.kr",
            },
          ]}
        />
      </>
    ),
  },

  // ── Article 2: 재판상이혼 사유·소멸시효·증거·중대한 사유 ──
  "재판상이혼-사유-부정행위-가정폭력": {
    "after-0": (
      <WarningBox type="warning" title="부정행위 이혼 청구는 기한이 있어요">
        바람 사실을 안 날로부터 6개월, 바람이 있었던 날로부터 2년이 지나면 부정행위(1호)로는 이혼을 청구할 수 없어요. 기한이 지났다면 6호로 청구하는 방법을 검토해 보세요.
      </WarningBox>
    ),
    "after-1": (
      <ContactCard
        contacts={[
          {
            name: "여성긴급전화 1366",
            description: "가정폭력 긴급 상담 및 보호시설 연계",
            phone: "1366",
            hours: "24시간 연중무휴",
          },
          {
            name: "대한법률구조공단",
            description: "가정폭력 피해자 무료 법률 상담",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 3: 이혼조정·재판이혼 기간·비용 ──
  "이혼조정-신청-비용-재판이혼-기간": {
    "after-0": (
      <ContactCard
        contacts={[
          {
            name: "대법원 전자소송",
            description: "이혼조정 신청서 온라인 제출",
            url: "https://ecfs.scourt.go.kr",
            urlLabel: "전자소송 바로가기",
          },
          {
            name: "대한법률구조공단",
            description: "무료 법률 상담 및 소송 지원",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="info" title="조정이 성립되면 되돌릴 수 없어요">
        조정이 성립되면 재판 판결과 같은 효력이 생겨요. 조정 전에 재산분할, 위자료, 양육 조건을 꼼꼼히 따져보세요.
      </WarningBox>
    ),
  },

  // ── Article 4: 재산분할 대상 (퇴직금·연금·채무) ──
  "재산분할-대상-퇴직금-연금-채무": {
    "after-0": (
      <WarningBox type="warning" title="재산분할 청구 기한은 이혼 후 2년">
        이혼한 날로부터 2년이 넘으면 재산분할을 청구할 수 없어요. 이혼할 때 같이 청구하거나, 이혼 직후 바로 준비하세요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "국민연금공단",
            description: "분할연금 신청 및 상담",
            phone: "1355",
            hours: "평일 09:00~18:00",
            url: "https://www.nps.or.kr",
            urlLabel: "국민연금공단 바로가기",
          },
          {
            name: "대한법률구조공단",
            description: "재산분할 무료 상담",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },
};

// ─── 렌더러 ───
export function ArticleViz({
  slug,
  position,
}: {
  slug: string;
  position: VizPosition;
}) {
  const articleViz = VIZ_MAP[slug];
  if (!articleViz) return null;
  const node = articleViz[position];
  if (!node) return null;
  return <>{node}</>;
}
