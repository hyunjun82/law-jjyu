"use client";

import { AccordionChecklist } from "@/components/viz/AccordionChecklist";
import { ComparisonTable } from "@/components/viz/ComparisonTable";
import { DateCalculator } from "@/components/viz/DateCalculator";
import { WarningBox } from "@/components/viz/WarningBox";
import { ContactCard } from "@/components/viz/ContactCard";
import { FormDownload } from "@/components/viz/FormDownload";
import { StatCard } from "@/components/viz/StatCard";
import { RangeTable } from "@/components/viz/RangeTable";
import { ProcessTimeline } from "@/components/viz/ProcessTimeline";
import { Calculator } from "@/components/viz/Calculator";

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
              name: "전자가족관계등록시스템",
              description: "가족관계·혼인관계 증명서 발급",
              url: "https://efamily.scourt.go.kr",
              urlLabel: "증명서 발급 바로가기",
            },
            {
              name: "정부24",
              description: "주민등록등본 온라인 발급",
              phone: "110",
              url: "https://www.gov.kr",
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

  // ── 금융금전: 개인회생 vs 개인파산 비교 ──
  "personal-rehabilitation-vs-bankruptcy": {
    "after-0": (
      <ComparisonTable
        title="채무조정 3가지 제도 한눈에 비교"
        columns={[
          { name: "개인워크아웃" },
          { name: "개인회생", highlight: true },
          { name: "개인파산" },
        ]}
        rows={[
          { label: "담당기관", values: ["신용회복위원회", "법원", "법원"] },
          { label: "소득 필요", values: ["필요", "필요", "불필요"] },
          { label: "채무 한도", values: ["제한 없음", "무담보 5억 / 담보 10억", "제한 없음"] },
          { label: "원금 탕감", values: ["제한적", "70~90%", "전액 면제"] },
          { label: "상환 기간", values: ["최대 10년", "3~5년", "없음"] },
          { label: "재산 유지", values: [true, true, false] },
        ]}
      />
    ),
    "after-1": (
      <StatCard
        items={[
          { label: "무담보 채무 한도", value: "5억 원", sub: "초과 시 개인파산 검토" },
          { label: "원금 탕감률", value: "70~90%", sub: "3~5년 변제 후 잔여 채무 면제" },
          { label: "이자 발생", value: "중지", sub: "개인회생 신청일부터" },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="이런 경우엔 면책이 안 될 수 있어요">
        사치나 도박으로 재산을 크게 줄인 경우, 채무 내역을 숨기거나 거짓으로 신고한 경우, 7년 이내에 면책을 받은 이력이 있는 경우에는 개인파산 후 면책이 불허될 수 있어요. 면책이 되지 않으면 채무 소멸 효과가 없으니 주의하세요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "개인워크아웃·프리워크아웃 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
          {
            name: "대한법률구조공단",
            description: "개인회생·파산 무료 법률 상담",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 6: 재산분할청구권 소멸시효 2년 ──
  "재산분할청구권-소멸시효-2년": {
    "after-1": (
      <DateCalculator
        title="재산분할 청구 기한 계산기"
        description="이혼 성립일(기준일)을 선택하면 재산분할 청구 가능 기한과 남은 일수를 계산해요."
        presets={[
          { label: "재산분할 청구 2년", days: 730, description: "이혼 성립일 기준 제척기간" },
          { label: "위자료 청구 3년", days: 1095, description: "이혼 성립일 기준 소멸시효" },
          { label: "사해행위 취소 1년", days: 365, description: "취소원인을 안 날 기준" },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="2년 제척기간은 연장이 안 돼요">
        재산분할의 2년은 제척기간이라서 내용증명을 보내거나 상대방이 분할 의사를 표시해도 기간이 연장되지 않아요. 반드시 2년 내에 법원에 심판 청구서를 접수해야 해요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "대한법률구조공단",
            description: "재산분할 무료 법률 상담 및 소송 지원",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
          {
            name: "대법원 전자소송",
            description: "재산분할 심판 청구서 온라인 제출",
            url: "https://ecfs.scourt.go.kr",
            urlLabel: "전자소송 바로가기",
          },
        ]}
      />
    ),
  },

  // ── Article 7: 재산분할 양도소득세·위자료 취득세 비교 ──
  "이혼-재산분할-양도소득세-취득세": {
    "after-2": (
      <WarningBox type="warning" title="취득세 신고는 60일 이내">
        재산분할로 부동산을 받은 날로부터 60일 안에 관할 시·군·구청에 취득세를 신고·납부해야 해요. 기한을 넘기면 무신고 가산세(20%)가 붙어요.
      </WarningBox>
    ),
    "after-3": (
      <ComparisonTable
        title="재산분할 vs 위자료 세금 한눈에 비교"
        columns={[
          { name: "재산분할", highlight: true },
          { name: "위자료(현금)" },
          { name: "위자료(부동산)" },
        ]}
        rows={[
          { label: "증여세", values: ["비과세", "비과세", "비과세"] },
          { label: "양도소득세(넘기는 쪽)", values: ["비과세", "없음", "과세"] },
          { label: "취득세(받는 쪽)", values: ["2.3% 특례", "없음", "1~12%"] },
          { label: "절세 효과", values: [true, true, false] },
        ]}
      />
    ),
  },

  // ── Article 8: 위자료 평균 금액·산정 기준 ──
  "이혼-위자료-금액-유책배우자": {
    "after-2": (
      <WarningBox type="info" title="위자료 청구 소멸시효는 3년">
        이혼 성립일로부터 3년이에요. 재산분할 2년(제척기간)과 달리 소멸시효라서 재판상 청구나 내용증명 발송으로 시효를 중단시킬 수 있어요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "대한법률구조공단",
            description: "위자료 청구 무료 법률 상담 및 소송 지원",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
          {
            name: "여성긴급전화 1366",
            description: "가정폭력 피해자 긴급 상담 및 연계",
            phone: "1366",
            hours: "24시간 연중무휴",
          },
        ]}
      />
    ),
  },

  // ── Article 9: 위자료 vs 재산분할 차이점 ──
  "이혼-위자료-재산분할-차이점": {
    "after-0": (
      <ComparisonTable
        title="위자료 vs 재산분할 핵심 비교"
        columns={[
          { name: "위자료" },
          { name: "재산분할", highlight: true },
        ]}
        rows={[
          { label: "법적 성격", values: ["정신적 손해배상", "공동재산 청산"] },
          { label: "귀책사유 필요", values: ["필요", "불필요"] },
          { label: "청구 기한", values: ["이혼 후 3년(소멸시효)", "이혼 후 2년(제척기간)"] },
          { label: "부동산 이전 시 양도소득세", values: ["과세", "비과세"] },
          { label: "부동산 취득세율", values: ["1~12%", "2.3% 특례"] },
        ]}
      />
    ),
  },

  // ── Article 10: 친권자 지정 (단독 vs 공동) ──
  "협의이혼-친권자-지정-재판이혼": {
    "after-2": (
      <ComparisonTable
        title="단독 친권 vs 공동 친권 비교"
        columns={[
          { name: "단독 친권" },
          { name: "공동 친권" },
        ]}
        rows={[
          { label: "의사결정", values: ["일방 단독 가능", "쌍방 합의 필요"] },
          { label: "신속성", values: ["빠름", "느릴 수 있음"] },
          { label: "갈등 위험", values: ["낮음", "높을 수 있음"] },
          { label: "자녀 심리", values: ["안정적(갈등시)", "유리(협력 가능시)"] },
          { label: "적합 상황", values: ["부모 갈등 심한 경우", "부모 협력 원활한 경우"] },
        ]}
      />
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

  // ── Article 11: 양육권 판단 기준 ──
  "이혼-양육권-판단기준-지정방법": {
    "after-2": (
      <WarningBox type="info" title="양육자 변경은 쉽지 않아요">
        이혼 시 정해진 양육자를 변경하려면 현재 양육환경이 자녀 복리에 반한다는 구체적 사유가 필요해요. 학대·방치, 양육능력 상실, 면접교섭 반복 방해 등이 변경 사유로 인정돼요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "대한법률구조공단",
            description: "양육권 분쟁 무료 법률 상담",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 12: 양육비 산정기준표 ──
  "이혼-양육비-산정기준표-소득": {
    "after-0": (
      <WarningBox type="info" title="산정기준표는 절대 기준이 아니에요">
        법원은 개별 사안의 특수한 사정을 반영해서 기준표 금액의 약 ±20% 범위에서 가감할 수 있어요. 사교육비, 의료비, 채무 상황 등이 가감 사유가 돼요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "양육비이행관리원",
            description: "양육비 산정 상담 및 자동 계산 서비스",
            phone: "1644-6621",
            hours: "평일 09:00~18:00",
            url: "https://www.childsupport.or.kr",
            urlLabel: "양육비이행관리원 바로가기",
          },
        ]}
      />
    ),
  },

  // ── Article 13: 양육비 미지급 이행명령 ──
  "양육비-미지급-이행명령-직접지급": {
    "after-0": (
      <WarningBox type="warning" title="이행명령 불이행 시 감치(구금) 가능">
        정당한 이유 없이 이행명령을 따르지 않으면 1천만원 이하의 과태료, 그래도 불이행 시 30일 이내 감치(구금)에 처해질 수 있어요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "양육비이행관리원",
            description: "양육비 추심·재산조회·이행명령 지원 (무료)",
            phone: "1644-6621",
            hours: "평일 09:00~18:00",
            url: "https://www.childsupport.or.kr",
            urlLabel: "양육비이행관리원 바로가기",
          },
          {
            name: "대한법률구조공단",
            description: "한부모가정 무료 소송 대리",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 14: 친권 양육권 차이 ──
  "친권-양육권-차이-분리지정": {
    "after-0": (
      <ComparisonTable
        title="친권 vs 양육권 핵심 비교"
        columns={[
          { name: "친권" },
          { name: "양육권", highlight: true },
        ]}
        rows={[
          { label: "법적 성격", values: ["법률행위 대리·재산관리·교육 결정", "자녀를 직접 돌보는 권리"] },
          { label: "포함 관계", values: ["양육권을 포함하는 상위 개념", "친권의 일부"] },
          { label: "행사 내용", values: ["여권 발급·수술 동의·재산 관리", "일과표·식사·의복·생활 관리"] },
          { label: "분리 지정", values: ["가능 (비권장)", "가능 (비권장)"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="친권·양육권 분리 지정은 피하세요">
        친권자와 양육자를 다른 사람으로 지정하면 여권 발급, 수술 동의, 계좌 개설 등 매번 친권자의 서명을 받아야 해요. 특별한 사유가 없다면 같은 사람에게 부여하는 것이 좋아요.
      </WarningBox>
    ),
  },

  // ── Article 15: 면접교섭권 거부 이행강제 ──
  "면접교섭권-거부-이행강제": {
    "after-2": (
      <WarningBox type="warning" title="면접교섭 거부는 양육권까지 잃을 수 있어요">
        면접교섭 이행명령 불이행 시 1천만원 이하 과태료, 30일 이내 감치(구금)가 가능해요. 반복 거부는 양육자 변경 사유가 될 수 있어요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "가정법원 면접교섭 지원센터",
            description: "전문 상담사 동석 면접교섭 지원",
            phone: "02-530-1813",
            hours: "평일 09:00~18:00",
          },
          {
            name: "대한법률구조공단",
            description: "면접교섭 분쟁 무료 법률 상담",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 16: 자녀 성본 변경 ──
  "이혼후-자녀-성본변경-재혼": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "성본변경 허가 신청 시 필요 서류",
            items: [
              "성본변경 허가 심판 청구서",
              "자녀의 기본증명서",
              "자녀의 가족관계증명서",
              "혼인관계증명서 (친부와의 이혼 확인용)",
              "재혼 배우자와의 혼인관계증명서 (재혼 시)",
              "주민등록등본",
            ],
          },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="성본변경 vs 친양자 입양 비교"
        columns={[
          { name: "성본변경" },
          { name: "친양자 입양", highlight: true },
        ]}
        rows={[
          { label: "친부와 친자관계", values: ["유지", "단절"] },
          { label: "친부 상속권", values: ["유지", "소멸"] },
          { label: "친부 면접교섭권", values: ["유지", "소멸"] },
          { label: "필요 절차", values: ["법원 허가", "법원 허가 + 친부 동의(원칙)"] },
        ]}
      />
    ),
  },

  // ── Article 17: 가정폭력 이혼소송 증거 ──
  "가정폭력-이혼소송-증거-양육권": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "가정폭력 증거 수집 체크리스트",
            items: [
              "의료기관 진단서 (상해·골절·정신과 진료)",
              "폭행 부위 사진·영상",
              "대화 녹음 파일 (당사자 녹음은 적법)",
              "112 신고 기록",
              "카카오톡·문자 메시지 (사과·폭행 인정 내용)",
              "가정폭력 상담소 상담 기록",
              "여성긴급전화 1366 상담 내역",
            ],
          },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "여성긴급전화 1366",
            description: "가정폭력 긴급 상담 및 보호시설 연계",
            phone: "1366",
            hours: "24시간 연중무휴",
          },
          {
            name: "경찰 신고",
            description: "가정폭력 현장 신고 및 긴급임시조치",
            phone: "112",
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

  // ── Article 18: 사실혼 파기 재산분할 ──
  "사실혼-파기-재산분할-위자료": {
    "after-1": (
      <DateCalculator
        title="사실혼 파기 청구 기한 계산기"
        description="사실혼 해소일(기준일)을 선택하면 위자료·재산분할 청구 가능 기한을 계산해요."
        presets={[
          { label: "재산분할 청구 2년", days: 730, description: "사실혼 해소일 기준" },
          { label: "위자료 청구 3년", days: 1095, description: "사실혼 해소일 기준 소멸시효" },
        ]}
      />
    ),
    "after-2": (
      <ComparisonTable
        title="사실혼 vs 법률혼 법적 권리 비교"
        columns={[
          { name: "사실혼" },
          { name: "법률혼", highlight: true },
        ]}
        rows={[
          { label: "재산분할", values: ["인정", "인정"] },
          { label: "위자료", values: ["인정", "인정"] },
          { label: "상속권", values: ["불인정", "인정"] },
          { label: "유족연금", values: ["인정", "인정"] },
          { label: "관계 증명", values: ["별도 입증 필요", "혼인관계증명서"] },
        ]}
      />
    ),
  },

  // ── Article 19: 협의이혼 취소·무효 ──
  "협의이혼-취소-무효-이혼의사철회": {
    "after-0": (
      <ComparisonTable
        title="이혼 무효 vs 이혼 취소 비교"
        columns={[
          { name: "이혼 무효" },
          { name: "이혼 취소", highlight: true },
        ]}
        rows={[
          { label: "사유", values: ["이혼의사 없음·의사무능력·위조", "사기·강박에 의한 이혼"] },
          { label: "효력", values: ["처음부터 이혼 없었던 것", "취소 시점부터 소급 무효"] },
          { label: "제소기간", values: ["제한 없음", "사기·강박 안 날로부터 3개월"] },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="warning" title="이혼취소 제척기간은 단 3개월">
        사기를 안 날 또는 강박 상태에서 벗어난 날로부터 3개월 이내에 취소 소송을 제기해야 해요. 기간 연장이 인정되지 않으니 즉시 법적 조치를 취하세요.
      </WarningBox>
    ),
  },

  // ── Article 20: 유책배우자 이혼청구 ──
  "유책배우자-이혼청구-별거-혼인파탄": {
    "after-0": (
      <WarningBox type="info" title="유책배우자도 예외적으로 이혼 청구 가능">
        2015년 대법원 전원합의체 판결 이후, 상대방도 이혼 의사가 있고 자녀에게 고통을 주지 않는 경우 유책배우자의 이혼청구가 예외적으로 인정돼요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "대한법률구조공단",
            description: "이혼소송 무료 법률 상담 및 소송 지원",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 21: 사실상 이혼 법적 효력 중혼 ──
  "사실상-이혼-법적-효력-중혼": {
    "after-0": (
      <ComparisonTable
        title="사실상 이혼 vs 법률상 이혼 비교"
        columns={[
          { name: "사실상 이혼" },
          { name: "법률상 이혼", highlight: true },
        ]}
        rows={[
          { label: "법적 부부 여부", values: ["여전히 부부", "혼인 해소"] },
          { label: "상속권", values: ["유지", "소멸"] },
          { label: "재혼 가능 여부", values: ["불가 (중혼)", "자유롭게 가능"] },
          { label: "재산분할 청구", values: ["불가", "이혼 후 2년 내"] },
          { label: "건강보험 피부양자", values: ["유지", "자격 상실"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox title="이혼신고 없이 재혼하면 중혼">
        사실상 이혼 상태에서 다른 사람과 혼인신고를 하면 민법 제810조 위반(중혼)에 해당하고, 형법 제241조에 따라 2년 이하의 징역에 처해질 수 있어요. 반드시 법적 이혼 절차를 먼저 완료하세요.
      </WarningBox>
    ),
  },

  // ── Article 22: 이혼소송 전 증거 수집 가압류 ──
  "이혼소송-전-증거-수집-가압류": {
    "after-1": (
      <AccordionChecklist
        groups={[
          {
            title: "보전처분 종류 (가사소송법 제63조)",
            items: [
              "부동산가압류",
              "예금채권가압류",
              "주식가압류",
              "부동산처분금지가처분",
              "부동산점유이전금지가처분",
            ],
          },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "한국가정법률상담소",
            description: "가정 문제 전문 법률상담",
            url: "https://easylaw.go.kr",
          },
          {
            name: "대한법률구조공단",
            description: "무료 법률상담 및 소송대리 지원",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 23: 이혼소송 피고 답변서 응소 ──
  "이혼소송-피고-답변서-응소": {
    "after-0": (
      <WarningBox title="답변서 제출기한: 30일">
        이혼소장 부본을 송달받은 날부터 30일 이내에 답변서를 제출해야 해요. 미제출 시 법원이 원고 주장을 인정한 것으로 보고 무변론 판결(피고 패소)을 할 수 있어요.
      </WarningBox>
    ),
    "after-3": (
      <ComparisonTable
        title="이혼 판결 불복 절차 비교"
        columns={[
          { name: "기한" },
          { name: "제출 법원" },
        ]}
        rows={[
          { label: "항소 (1심→2심)", values: ["판결정본 송달 후 14일", "1심 법원"] },
          { label: "상고 (2심→대법원)", values: ["판결정본 송달 후 14일", "2심 법원"] },
        ]}
      />
    ),
  },

  // ── Article 24: 이혼 후 인척관계 소멸 재혼 제한 ──
  "이혼-후-인척관계-소멸-재혼-제한": {
    "after-0": (
      <ComparisonTable
        title="혼인 중 vs 이혼 후 법적 관계 변화"
        columns={[
          { name: "혼인 중" },
          { name: "이혼 후", highlight: true },
        ]}
        rows={[
          { label: "배우자 관계", values: ["유지", "소멸"] },
          { label: "인척 관계 (시댁·처가)", values: ["유지", "소멸 (민법 §775①)"] },
          { label: "자녀와 법적 관계", values: ["유지", "유지 (변화 없음)"] },
          { label: "건강보험 피부양자", values: ["가능", "자격 상실"] },
          { label: "국민연금", values: ["합산", "분할연금 청구 가능"] },
        ]}
      />
    ),
    "after-1": (
      <WarningBox title="이혼 후에도 재혼 금지 대상 있음">
        인척관계가 소멸해도 &apos;인척이었던 자&apos;와는 혼인할 수 없어요 (민법 제809조 제2항). 전 남편의 형제, 전 아내의 자매 등 6촌 이내 혈족의 배우자·배우자의 혈족과의 재혼은 법적으로 금지돼요.
      </WarningBox>
    ),
  },

  // ── Article 25: 이혼신고 무효 사유 확인소송 ──
  "이혼신고-무효-사유-확인소송": {
    "after-0": (
      <ComparisonTable
        title="이혼 무효 vs 이혼 취소 비교"
        columns={[
          { name: "이혼 무효" },
          { name: "이혼 취소", highlight: true },
        ]}
        rows={[
          { label: "원인", values: ["이혼의사 자체 없음", "사기·강박에 의한 동의"] },
          { label: "제소 기간", values: ["제한 없음", "안 날/벗어난 날부터 3개월"] },
          { label: "조정 전치", values: ["불필요 (바로 소송)", "필요"] },
          { label: "판결 효과", values: ["처음부터 이혼 없었던 것", "처음부터 이혼 없었던 것"] },
          { label: "제기권자", values: ["당사자, 법정대리인, 4촌 이내 친족", "당사자만"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox title="이혼무효 확정 후 재혼은 중혼이 됩니다">
        이혼 기간 중 다른 사람과 재혼했다면, 이혼무효 판결 확정 후 그 재혼은 중혼이 돼요 (민법 제816조 제1호). 중혼은 혼인취소 사유에 해당해요.
      </WarningBox>
    ),
  },

  // ── Article 26: 이혼 취소 사기 강박 제척기간 ──
  "이혼-취소-사기-강박-제척기간": {
    "top": (
      <StatCard
        items={[
          { label: "이혼 취소 제척기간", value: "3개월", sub: "사기 발견일 또는 강박 탈출일 기산" },
          { label: "항소 기간", value: "14일", sub: "가정법원 판결 선고일 기산" },
        ]}
      />
    ),
    "after-1": (
      <WarningBox title="제척기간 3개월은 연장 불가">
        사기를 안 날 또는 강박을 면한 날부터 3개월이 지나면 이혼 취소 청구권이 완전히 소멸해요. 소멸시효와 달리 중단·정지가 되지 않으므로 즉시 법적 조치를 취해야 해요.
      </WarningBox>
    ),
  },

  // ── Article 27: 사실혼 재산분할 청구권 소멸시효 ──
  "사실혼-재산분할-청구권-소멸시효": {
    "top": (
      <StatCard
        items={[
          { label: "재산분할 청구 기간", value: "2년", sub: "사실혼 해소일 기산" },
        ]}
      />
    ),
    "after-2": (
      <WarningBox title="중혼적 사실혼은 재산분할 청구 불가">
        법률혼 배우자가 있는 상태에서 형성한 중혼적 사실혼 관계는 재산분할을 청구할 수 없어요 (대법원 1995. 9. 26. 선고 94므1638). 법률혼 배우자의 권리 보호를 위한 제한이에요.
      </WarningBox>
    ),
  },

  // ── Article 28: 사실혼 자녀 양육비 인지 절차 ──
  "사실혼-자녀-양육비-인지-절차": {
    "after-1": (
      <AccordionChecklist
        groups={[
          {
            title: "아버지 인지신고 준비 서류",
            items: [
              "인지신고서 (시·구·읍·면사무소 비치)",
              "자녀의 가족관계증명서 또는 출생증명서",
              "신고인(아버지)의 신분증",
              "미성년 자녀인 경우: 어머니(법정대리인)의 동의서",
              "성인 자녀인 경우: 자녀 본인의 동의서",
            ],
          },
        ]}
      />
    ),
    "after-2": (
      <ContactCard
        contacts={[
          {
            name: "양육비 이행관리원",
            description: "양육비 미지급 시 강제집행 지원, 선지급 서비스",
            phone: "1644-6621",
            hours: "평일 09:00~18:00",
            url: "https://www.gov.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 29: 협의이혼 양육협의서 양육비부담조서 ──
  "협의이혼-양육협의서-양육비부담조서": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "양육협의서 필수 기재 3가지",
            items: [
              "양육자의 결정 (누가 자녀를 키울 것인지)",
              "양육비용의 부담 (얼마를 누가 낼 것인지)",
              "면접교섭권의 행사 여부 (만나는 방법과 횟수)",
            ],
          },
          {
            title: "별도 제출 서류",
            items: [
              "친권자지정 합의서 (친권자 결정 내용)",
              "합의 불성립 시: 가정법원 심판정본",
            ],
          },
        ]}
      />
    ),
    "after-1": (
      <WarningBox title="양육비부담조서 = 강제집행 가능">
        가정법원이 작성한 양육비부담조서는 확정판결과 동일한 채무명의예요. 양육비를 지급하지 않으면 별도 소송 없이 바로 급여·예금에 강제집행을 신청할 수 있어요.
      </WarningBox>
    ),
  },

  // ── Article 30: 협의이혼 재산합의 구속력 번복 ──
  "협의이혼-재산합의-구속력-번복": {
    "top": (
      <StatCard
        items={[
          { label: "재산분할 청구 기간", value: "이혼 후 2년", sub: "제척기간, 연장 불가" },
          { label: "위자료 청구 기간", value: "이혼 후 3년", sub: "소멸시효" },
        ]}
      />
    ),
    "after-1": (
      <WarningBox title="재산 합의만으로는 강제집행 불가">
        이혼 합의서에 재산분할 내용을 적었더라도 공증(집행증서)이 없으면 상대방이 이행하지 않을 때 바로 강제집행할 수 없어요. 합의 후 반드시 공증사무소에서 집행증서 공증을 받아두세요.
      </WarningBox>
    ),
  },

  // ── Article 31: 해외 거주 한국인 협의이혼 ──
  "해외거주-한국인-협의이혼-재외공관": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "부부 모두 해외 거주 시 기본 서류",
            items: [
              "협의이혼의사확인 신청서 (부부 모두)",
              "가족관계증명서 (부부 각 1부)",
              "혼인관계증명서 (부부 각 1부)",
              "진술요지서 (재외공관 비치)",
              "주민등록등본 (국내 주민등록 유지 시)",
            ],
          },
          {
            title: "미성년 자녀 있을 때 추가 서류",
            items: [
              "양육협의서 (양육자·양육비·면접교섭 포함)",
              "친권자 지정 합의서",
            ],
          },
        ]}
      />
    ),
    "after-2": (
      <ComparisonTable
        title="부부 모두 해외 vs 한쪽만 해외 절차 비교"
        columns={[
          { name: "부부 모두 해외" },
          { name: "한쪽만 해외", highlight: true },
        ]}
        rows={[
          { label: "신청 장소", values: ["관할 재외공관", "국내: 가정법원 / 해외: 재외공관"] },
          { label: "확인 기관", values: ["서울가정법원", "주소지 관할 가정법원"] },
          { label: "숙려기간 (자녀 없음)", values: ["1개월", "1개월"] },
          { label: "숙려기간 (자녀 있음)", values: ["3개월", "3개월"] },
          { label: "이혼신고 기한", values: ["확인서 수령 후 3개월", "확인서 수령 후 3개월"] },
        ]}
      />
    ),
  },

  // ── Article 32: 협의이혼 위자료 미합의 소멸시효 ──
  "협의이혼-위자료-미합의-소멸시효": {
    "top": (
      <StatCard
        items={[
          { label: "위자료 소멸시효", value: "3년", sub: "이혼신고일(협의이혼) 또는 판결 확정일 기산" },
          { label: "재산분할 제척기간", value: "2년", sub: "연장·중단 불가" },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="warning" title="위자료 소멸시효, 내용증명으로 중단하세요">
        소멸시효 만료가 임박했다면 먼저 내용증명을 발송하세요. 재판 외 청구는 6개월간 시효 진행을 유예시켜요. 단, 6개월 이내에 반드시 소송을 제기해야 최종 중단이 돼요.
      </WarningBox>
    ),
  },

  // ── Article 33: 재산분할 재산명시·재산조회 제도 ──
  "재산분할-재산명시-재산조회-제도": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "재산명시 대상 재산 (생활필수품 제외)",
            items: [
              "부동산 (토지, 건물)",
              "자동차",
              "특허권 등 지식재산권",
              "100만 원 이상 금전·예금·보험금",
              "주권 등 유가증권",
              "금·은·보석류",
              "회원권 (골프, 콘도 등)",
            ],
          },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="재산명시 거부 시 1천만 원 이하 과태료">
        법원의 재산명시명령을 정당한 사유 없이 거부하거나 허위 목록을 제출하면 1천만 원 이하의 과태료가 부과돼요. 재산정보를 심판 외 목적으로 사용하면 2년 이하 징역 또는 500만 원 이하 벌금에 처해져요.
      </WarningBox>
    ),
  },

  // ── Article 34: 친권자·양육자 변경 사유 심판 ──
  "친권자-양육자-변경-사유-심판": {
    "after-1": (
      <ComparisonTable
        title="양육자 변경 vs 친권자 변경 비교"
        columns={[
          { name: "양육자 변경" },
          { name: "친권자 변경", highlight: true },
        ]}
        rows={[
          { label: "합의 가능 여부", values: ["가능 (합의 후 법원 확인)", "불가 (반드시 심판)"] },
          { label: "청구권자", values: ["부·모·자녀·검사", "자녀의 4촌 이내 친족"] },
          { label: "자녀 의견 청취 (13세 이상)", values: ["필수", "필수"] },
          { label: "확정 후 신고 기한", values: ["1개월 이내", "1개월 이내"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="info" title="13세 이상 자녀 의견은 반드시 청취">
        가정법원은 친권자·양육자 변경 심판에서 13세 이상 자녀의 의견을 반드시 청취해야 해요. 자녀의 복지를 해칠 특별한 사정이 없는 한 예외가 인정되지 않아요.
      </WarningBox>
    ),
  },

  // ── Article 35: 친권 상실 선고·후견인 지정 ──
  "친권-상실-선고-후견인-지정": {
    "after-0": (
      <WarningBox type="warning" title="친권 상실 청구권자: 자녀·친족·검사·지자체장">
        아동학대나 친권 남용을 목격했다면 아동보호전문기관(112)에 신고하거나 검사에게 친권 상실 선고 청구를 요청할 수 있어요. 법원은 상황에 따라 친권 상실, 일시 정지, 일부 제한 중 최소한의 조치를 선택해요.
      </WarningBox>
    ),
    "after-2": (
      <ComparisonTable
        title="친권 제한 조치 3가지 비교"
        columns={[
          { name: "친권 상실", highlight: true },
          { name: "친권 일시 정지" },
          { name: "친권 일부 제한" },
        ]}
        rows={[
          { label: "근거", values: ["민법 §924", "민법 §924의2", "민법 §925"] },
          { label: "효과", values: ["전면 박탈", "최대 2년 정지", "특정 사항만 제한"] },
          { label: "후견인 선임", values: ["필요", "필요", "경우에 따라"] },
          { label: "취소 가능", values: ["사유 소멸 시", "기간 종료 시", "기간 종료 시"] },
        ]}
      />
    ),
  },

  // ── Article 36: 양육비 증액·감액 사정변경 ──
  "양육비-증액-감액-사정변경": {
    "top": (
      <StatCard
        items={[
          { label: "양육비 증감 청구", value: "횟수 제한 없음", sub: "사정 현저 변경 시 언제든 청구 가능" },
          { label: "양육비 지급 원칙 종료", value: "자녀 만 19세", sub: "합의로 대학 졸업까지 연장 가능" },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="warning" title="심판 전 임의 감액은 금지">
        양육비 감액 사유가 생겼더라도 법원 심판이 확정되기 전까지는 임의로 양육비를 줄여 보내면 안 돼요. 미지급분은 채무로 남아 강제집행 대상이 되고, 감치(구금) 위험도 있어요.
      </WarningBox>
    ),
  },

  // ── Article 37: 양육비 대지급·양육비이행관리원 ──
  "양육비-대지급-양육비이행관리원": {
    "after-1": (
      <AccordionChecklist
        groups={[
          {
            title: "양육비 대지급 기본 신청 서류",
            items: [
              "양육비 대지급 신청서 (양육비이행관리원 비치)",
              "양육비 채무명의 서류 (심판정본·조서 등)",
              "양육비 미지급 입증 자료 (통장 내역 등)",
              "신청인(양육자) 신분증",
              "자녀의 기본증명서·가족관계증명서",
              "건강보험료 납부확인서 (소득 기준 확인용)",
            ],
          },
        ]}
      />
    ),
    "after-2": (
      <ContactCard
        contacts={[
          {
            name: "양육비이행관리원",
            description: "양육비 대지급 신청·상담, 양육비 채권 추심 지원",
            phone: "1644-6621",
            hours: "평일 09:00~18:00",
            url: "https://www.childsupport.or.kr",
            urlLabel: "양육비이행관리원 바로가기",
          },
        ]}
      />
    ),
  },

  // ── Article 38: 면접교섭권 제한·배제 심판 ──
  "면접교섭권-제한-배제-심판": {
    "after-0": (
      <WarningBox type="warning" title="면접교섭 거부 시 감치(구금) 가능">
        정당한 사유 없이 면접교섭 이행명령을 따르지 않으면 1천만 원 이하 과태료, 반복 시 30일 이내 감치에 처해질 수 있어요. 일방적 거부는 양육권 변경 사유로도 작용해요.
      </WarningBox>
    ),
    "after-2": (
      <ComparisonTable
        title="면접교섭 제한 방법 비교"
        columns={[
          { name: "방법·장소 변경" },
          { name: "횟수·기간 제한" },
          { name: "완전 배제", highlight: true },
        ]}
        rows={[
          { label: "적용 상황", values: ["가벼운 갈등·분쟁", "중간 수준 위험", "심각한 학대·폭력"] },
          { label: "자녀 의사 반영", values: ["13세 이상 필수", "13세 이상 필수", "13세 이상 필수"] },
          { label: "법원 심판 필요", values: ["필요", "필요", "필요"] },
          { label: "재개 가능 여부", values: ["즉시 가능", "조건 충족 시", "사정 변경 시"] },
        ]}
      />
    ),
  },

  // ── Article 39: 가정폭력 고소·보호처분·접근금지 ──
  "가정폭력-고소-보호처분-접근금지": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "가정폭력 증거 수집 체크리스트",
            items: [
              "의료기관 상해진단서",
              "폭행 부위 사진·영상",
              "112 신고 기록",
              "당사자 직접 녹음 파일 (적법)",
              "카카오톡·문자 (사과·폭행 인정 내용)",
              "가정폭력 상담소 상담 기록",
              "목격자 진술서",
            ],
          },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "여성긴급전화 1366",
            description: "가정폭력 긴급 상담·보호시설 연계",
            phone: "1366",
            hours: "24시간 연중무휴",
          },
          {
            name: "경찰 신고",
            description: "가정폭력 현장 신고·긴급임시조치",
            phone: "112",
            hours: "24시간 연중무휴",
          },
          {
            name: "대한법률구조공단",
            description: "가정폭력 피해자 무료 법률 상담·소송 지원",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 2: 개인회생 변제금 계산 방법 ──
  "personal-rehabilitation-repayment-calculation": {
    "after-0": (
      <StatCard
        items={[
          { label: "가용소득", value: "소득 - 생계비", sub: "변제금의 기준 금액" },
          { label: "변제 기간", value: "3~5년", sub: "원칙 5년, 소득 충분 시 3년 단축 가능" },
          { label: "이자 발생", value: "중지", sub: "신청일부터 기존 채무 이자 중단" },
          { label: "원금 탕감률", value: "70~90%", sub: "변제 완료 후 잔여 채무 면제" },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="tip" title="최저생계비 추가 인정을 놓치지 마세요">
        실제 임차료가 기준보다 높거나 만성질환 의료비가 많다면 추가 생계비 인정을 신청할 수 있어요. 추가 인정을 받으면 가용소득이 줄어 변제금이 낮아져요. 임대차계약서, 진단서, 치료비 내역서를 미리 준비하세요.
      </WarningBox>
    ),
    "after-2": (
      <WarningBox type="warning" title="청산가치보장 원칙을 확인하세요">
        부동산·자동차 등 재산이 있다면 총 변제액이 개인파산 시 배당받을 금액(청산가치)보다 낮을 수 없어요. 재산 가치가 높을수록 변제액도 높아지므로, 신청 전 보유 재산 평가를 미리 확인하는 게 중요해요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "대한법률구조공단",
            description: "개인회생·파산 무료 법률 상담 및 소송 지원",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
          {
            name: "신용회복위원회",
            description: "개인워크아웃·프리워크아웃 채무조정 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 3: 개인회생 최저생계비 2026 ──
  "personal-rehabilitation-living-expenses-2026": {
    "after-0": (
      <StatCard
        items={[
          { label: "1인 가구", value: "약 165만 원", sub: "서울중앙지방법원 2026 기준" },
          { label: "2인 가구", value: "약 257만 원", sub: "부양가족 1인 추가 기준" },
          { label: "3인 가구", value: "약 329만 원", sub: "부양가족 2인 추가 기준" },
          { label: "4인 가구", value: "약 398만 원", sub: "부양가족 3인 추가 기준" },
        ]}
      />
    ),
    "after-1": (
      <RangeTable
        title="2026년 가구원 수별 최저생계비 (서울중앙지방법원 기준)"
        description="법원마다 기준이 다를 수 있으며 매년 기준 중위소득에 따라 조정됩니다."
        rowHeader="가구 규모"
        colHeaders={[
          { label: "최저생계비 (월)" },
          { label: "가용소득 계산 예시 (월소득 300만 원)" },
        ]}
        rows={[
          { range: "1인 (본인만)", values: ["약 165만 원", "135만 원"] },
          { range: "2인 (본인 + 1명)", values: ["약 257만 원", "43만 원"] },
          { range: "3인 (본인 + 2명)", values: ["약 329만 원", "해당 없음"], highlight: true },
          { range: "4인 (본인 + 3명)", values: ["약 398만 원", "해당 없음"] },
        ]}
        highlightLabel="예시 기준"
      />
    ),
    "after-2": (
      <WarningBox type="tip" title="부양가족 인정 서류를 미리 준비하세요">
        부양가족으로 인정받으려면 실제로 생계를 책임지고 있어야 해요. 가족관계증명서와 주민등록등본을 제출하고, 따로 사는 부모님이나 장애가 있는 가족을 부양 중이라면 추가 증빙서류를 함께 준비하세요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "대한법률구조공단",
            description: "개인회생 최저생계비 추가 인정 무료 상담",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
          {
            name: "신용회복위원회",
            description: "채무조정 상담 및 프리워크아웃 신청",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 4: 개인회생 신청 서류 절차 ──
  "personal-rehabilitation-application-procedure": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "공통 필수 서류",
            items: [
              "개인회생 신청서",
              "채권자목록 (모든 채무 빠짐없이 기재)",
              "재산목록",
              "수입·지출 목록",
              "진술서",
              "변제계획안 초안",
            ],
          },
          {
            title: "근로소득자 추가 서류",
            items: [
              "최근 3개월 급여명세서",
              "재직증명서",
              "근로계약서 사본",
            ],
          },
          {
            title: "영업소득자 추가 서류",
            items: [
              "소득세 신고서 (최근 1~2년)",
              "매출 증빙 서류",
              "사업자등록증 사본",
            ],
          },
        ]}
      />
    ),
    "after-1": (
      <StatCard
        items={[
          { label: "서울 담당 법원", value: "서울회생법원", sub: "서울 주소지 채무자 전담" },
          { label: "지방 담당 법원", value: "지방법원 파산부", sub: "각 지역 관할 법원" },
          { label: "신청~인가 기간", value: "3~6개월", sub: "법원 사정에 따라 변동" },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="청산가치 이상 변제가 원칙이에요">
        재산이 있다면 변제계획안의 총 변제액이 개인파산 시 배당받을 금액(청산가치)보다 낮을 수 없어요. 부동산이나 자동차가 있다면 신청 전 보유 재산 가치를 먼저 확인하세요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "대법원 전자소송",
            description: "개인회생 신청서 온라인 접수",
            url: "https://ecfs.scourt.go.kr",
            urlLabel: "전자소송 바로가기",
          },
          {
            name: "대한법률구조공단",
            description: "개인회생·파산 무료 법률 상담 및 소송 지원",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 5: 개인회생 채권자집회 ──
  "personal-rehabilitation-creditor-meeting": {
    "after-1": (
      <WarningBox type="warning" title="채권자집회 불참 시 절차 폐지될 수 있어요">
        정당한 사유 없이 채무자가 채권자집회에 불출석하면 법원이 개인회생 절차를 폐지할 수 있어요. 반드시 직접 참석하고, 불가피한 경우에는 미리 법원에 연락하세요.
      </WarningBox>
    ),
    "after-2": (
      <ComparisonTable
        title="채권자집회 채무자 vs 채권자 역할"
        columns={[
          { name: "채무자(신청인)" },
          { name: "채권자(은행·카드사)", highlight: true },
        ]}
        rows={[
          { label: "참석 의무", values: ["필수", "없음"] },
          { label: "불참 시 불이익", values: ["절차 폐지 가능", "없음"] },
          { label: "이의 제기 방법", values: ["해당 없음", "서면 또는 집회에서 직접"] },
          { label: "강제인가 가능 여부", values: ["해당 없음", "이의 있어도 인가 가능"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "대한법률구조공단",
            description: "채권자집회 준비 및 이의 대응 무료 상담",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 6: 개인회생 무료 지원 ──
  "personal-rehabilitation-free-legal-support": {
    "after-0": (
      <StatCard
        items={[
          { label: "지원 소득 기준", value: "중위소득 125% 이하", sub: "신용회복위·법률구조공단 공통" },
          { label: "신용회복위 서비스", value: "서류·접수 대행", sub: "법정 대리는 제외" },
          { label: "법률구조공단 서비스", value: "소송 대리 포함", sub: "무료 변호사 선임 가능" },
        ]}
      />
    ),
    "after-2": (
      <ComparisonTable
        title="무료 지원 vs 법무사 vs 변호사 비용 비교"
        columns={[
          { name: "무료 지원", highlight: true },
          { name: "법무사" },
          { name: "변호사" },
        ]}
        rows={[
          { label: "비용", values: ["0원", "50~150만 원", "150~400만 원"] },
          { label: "서류 작성", values: ["지원", "지원", "지원"] },
          { label: "법원 접수 대행", values: ["지원", "지원", "지원"] },
          { label: "법원 변론 대리", values: ["불가", "불가", "가능"] },
          { label: "적합 상황", values: ["소득 기준 충족 시", "단순 채무 구조", "채권자 이의·복잡 사건"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "개인회생·파산 서류 작성 및 접수 무료 지원",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
          {
            name: "대한법률구조공단",
            description: "개인회생·파산 무료 법률 상담 및 소송 대리",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 7: 개인회생 직장 불이익 ──
  "personal-rehabilitation-employment-disadvantage": {
    "after-2": (
      <WarningBox type="warning" title="개인파산은 면책 전 일부 직종에서 결격사유">
        파산선고 후 면책결정 확정 전까지 공무원, 변호사, 공인중개사, 의사, 약사 등 일부 직종에서 법률상 결격사유가 돼요. 면책결정이 확정되면 복권되어 대부분의 제한이 해제돼요.
      </WarningBox>
    ),
    "after-3": (
      <ComparisonTable
        title="개인회생 vs 개인파산 불이익 비교"
        columns={[
          { name: "개인회생", highlight: true },
          { name: "개인파산" },
        ]}
        rows={[
          { label: "직업 제한", values: ["없음", "면책 전 일부 직종 제한"] },
          { label: "재산 유지", values: ["가능", "파산재단으로 환가"] },
          { label: "공무원 시험", values: ["제한 없음", "면책 전 불가"] },
          { label: "신용정보 기록", values: ["최대 5년", "최대 5년"] },
          { label: "연체 정보 해제", values: ["인가 후 신청 가능", "면책 후 신청 가능"] },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 8: 자영업자 개인회생 ──
  "self-employed-personal-rehabilitation": {
    "after-0": (
      <ComparisonTable
        title="자영업자 vs 근로자 개인회생 비교"
        columns={[
          { name: "자영업자" },
          { name: "근로자", highlight: true },
        ]}
        rows={[
          { label: "소득 요건", values: ["영업소득 있어야 함", "급여소득 있어야 함"] },
          { label: "소득 증명 방법", values: ["소득세 신고서·통장·카드매출", "급여명세서·재직증명서"] },
          { label: "영업 유지", values: ["가능 (권장)", "해당 없음"] },
          { label: "채무 한도", values: ["무담보 5억·담보 10억", "무담보 5억·담보 10억"] },
          { label: "소득 변동 대응", values: ["변제계획 변경 가능", "변경 가능"] },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="warning" title="소득세 신고 안 했다면 추가 증빙이 필요해요">
        소득세 신고 내역이 없다면 통장 거래 내역, 카드 매출 내역, 세금계산서 등으로 소득을 입증해야 해요. 증빙이 부족하면 법원이 소득을 낮게 산정해 변제 기간이 늘어날 수 있어요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "자영업자 개인회생·파산 신청 무료 지원",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
          {
            name: "대한법률구조공단",
            description: "자영업자 채무조정 무료 법률 상담",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 9: 개인회생 변제 완료 면책 ──
  "personal-rehabilitation-discharge-completion": {
    "top": (
      <StatCard
        items={[
          { label: "면책 신청", value: "변제 완료 후", sub: "자동 면책 아님, 별도 신청 필요" },
          { label: "즉시항고 기간", value: "7일", sub: "면책결정 고지일 기산" },
          { label: "신용정보 기록", value: "최대 5년", sub: "면책 후에도 이력 남음" },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="warning" title="면책 효력이 미치지 않는 채무가 있어요">
        국세·지방세 등 세금, 벌금·과태료, 양육비, 고의적 불법행위로 인한 손해배상은 면책 후에도 남아요. 변제계획에 포함됐더라도 이런 채무는 계속 갚아야 해요.
      </WarningBox>
    ),
    "after-2": (
      <WarningBox type="info" title="면책 효력은 연대보증인에게 미치지 않아요">
        채무자가 면책을 받아 채무에서 벗어나도 연대보증인은 여전히 채무를 갚을 의무가 있어요. 연대보증인이 있다면 미리 상황을 공유하는 게 좋아요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "면책 후 연체 정보 해제 및 신용 관리 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
          {
            name: "대한법률구조공단",
            description: "면책결정 신청 및 불복 무료 법률 상담",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 10: 개인회생 폐지 사유 ──
  "personal-rehabilitation-procedure-dismissal": {
    "after-1": (
      <WarningBox type="warning" title="미납 즉시 법원에 연락하세요">
        변제금을 낼 수 없는 상황이 생겼다면 즉시 법원에 연락하거나 변제계획 변경 신청을 하세요. 무대응이 가장 위험해요. 일시적 어려움이라면 법원과 소통하면 폐지를 막을 수 있는 경우가 많아요.
      </WarningBox>
    ),
    "after-2": (
      <StatCard
        items={[
          { label: "즉시항고 기간", value: "7일", sub: "폐지 결정 고지일 기산" },
          { label: "재신청 제한", value: "면책 후 7년", sub: "이전 면책 없이 폐지 시 제한 없음" },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "대한법률구조공단",
            description: "개인회생 폐지 즉시항고 무료 법률 상담",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 11: 개인파산 신청 자격 ──
  "personal-bankruptcy-application-eligibility": {
    "after-0": (
      <ComparisonTable
        title="개인회생 vs 개인파산 선택 기준"
        columns={[
          { name: "개인회생", highlight: true },
          { name: "개인파산" },
        ]}
        rows={[
          { label: "소득 요건", values: ["필요 (지속 수입)", "불필요"] },
          { label: "채무 한도", values: ["무담보 5억·담보 10억", "제한 없음"] },
          { label: "재산 유지", values: ["가능", "파산재단으로 환가"] },
          { label: "직업 제한", values: ["없음", "면책 전 일부 직종"] },
          { label: "상환 기간", values: ["3~5년", "없음 (면책으로 소멸)"] },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="warning" title="이런 경우 면책이 불허될 수 있어요">
        사치·도박·투기로 재산을 크게 줄인 경우, 채무나 재산을 숨긴 경우, 7년 이내에 면책을 받은 이력이 있는 경우에는 파산선고를 받더라도 면책이 허가되지 않을 수 있어요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "개인파산 신청 서류 작성 및 접수 무료 지원",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
          {
            name: "대한법률구조공단",
            description: "개인파산·면책 무료 법률 상담 및 소송 대리",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 12: 개인파산 면책불허가 사유 ──
  "personal-bankruptcy-discharge-refusal-reasons": {
    "after-0": (
      <WarningBox type="warning" title="도박·사행행위 빚은 면책불허가 사유에 해당해요">
        도박, 투기, 사행행위로 재산을 현저히 줄이거나 과대한 채무를 부담한 경우는 법률상 면책불허가 사유예요. 다만 법원이 재량면책을 인정할 수 있으니 포기하지 말고 상담받아 보세요.
      </WarningBox>
    ),
    "after-2": (
      <WarningBox type="info" title="재량면책을 받으려면 적극적인 소명이 필요해요">
        면책심문에서 파산에 이르게 된 경위가 불가피했다는 점, 현재 생활이 개선됐다는 점, 갱생 의지가 있다는 점을 성실하게 소명해야 해요. 적극적으로 진술할수록 재량면책 허가 가능성이 높아요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "대한법률구조공단",
            description: "면책심문 준비·재량면책 소명 무료 법률 상담",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 13: 개인파산 자격 제한 직업 ──
  "personal-bankruptcy-qualification-restrictions": {
    "after-0": (
      <ComparisonTable
        title="파산선고 시 직업별 결격사유 여부"
        columns={[
          { name: "직종" },
          { name: "파산 중 제한", highlight: true },
          { name: "면책 후" },
        ]}
        rows={[
          { label: "일반 사기업 직원", values: ["없음", "없음"] },
          { label: "공무원", values: ["당연 퇴직", "복직 가능 (재임용 절차 필요)"] },
          { label: "변호사·법무사·세무사", values: ["자격 정지", "복권 후 회복"] },
          { label: "공인중개사·의사·약사", values: ["면허 제한", "복권 후 회복"] },
          { label: "금융기관 임원", values: ["결격", "복권 후 회복"] },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="info" title="파산의 불이익은 본인에게만 적용돼요">
        개인파산 효력은 신청인 본인에게만 적용돼요. 배우자, 자녀, 부모님의 신용등급이나 취업·자격증에는 아무런 영향이 없어요. 가족이 연대보증인이 아니라면 채무 부담도 생기지 않아요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "파산 면책 후 신용 관리 및 연체 정보 해제 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
          {
            name: "대한법률구조공단",
            description: "개인파산·면책 무료 법률 상담",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 14: 개인파산 신청 절차 ──
  "personal-bankruptcy-application-procedure": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "파산·면책 동시 신청 기본 서류",
            items: [
              "파산신청서 + 면책신청서",
              "채권자목록 (모든 채권자·금액 기재)",
              "재산목록",
              "수입·지출 목록",
              "진술서",
              "가족관계증명서",
              "주민등록등본",
            ],
          },
          {
            title: "소득 유형별 추가 서류",
            items: [
              "근로소득자: 급여명세서 3개월 + 재직증명서",
              "영업소득자: 소득세 신고서 + 매출 증빙",
              "무소득: 건강보험료 납부내역 등 소득 없음 증빙",
            ],
          },
        ]}
      />
    ),
    "after-2": (
      <StatCard
        items={[
          { label: "수입인지", value: "약 2만 원", sub: "파산 + 면책 신청서 합산" },
          { label: "송달료 (채권자 1인당)", value: "약 5,200원 × 10회", sub: "채권자 수에 따라 변동" },
          { label: "법무사 비용", value: "50~150만 원", sub: "직접 신청 시 없음" },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "개인파산 서류 작성 및 접수 무료 지원",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
          {
            name: "대한법률구조공단",
            description: "개인파산·면책 무료 법률 상담 및 소송 대리",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 15: 개인파산 복권 ──
  "personal-bankruptcy-reinstatement": {
    "top": (
      <StatCard
        items={[
          { label: "자동 복권", value: "면책 확정 즉시", sub: "별도 신청 불필요" },
          { label: "즉시항고 기간", value: "7일", sub: "면책결정 고지일 기산" },
          { label: "면책 취소 청구 기한", value: "1년", sub: "취소 사유 안 날부터" },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="warning" title="면책 불허 시 자동 복권이 안 돼요">
        면책불허가 결정이 나면 파산선고로 인한 불이익이 그대로 유지돼요. 복권을 받으려면 모든 채무를 변제하거나 채권자 전원의 동의를 받아 법원에 복권 신청을 해야 해요. 면책 불허 결정을 받으면 즉시 즉시항고 여부를 검토하세요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "대한법률구조공단",
            description: "면책 취소·복권 신청 무료 법률 상담",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 16: 개인회생 면책 후 신용 회복 ──
  "personal-rehabilitation-post-discharge-credit": {
    "top": (
      <StatCard
        items={[
          { label: "회생 이력 신용정보", value: "최대 5년", sub: "면책 후에도 이력 남음" },
          { label: "개인회생 재신청 제한", value: "5년", sub: "면책 확정일 기산" },
          { label: "개인파산 면책 재진행 제한", value: "7년", sub: "면책 확정일 기산" },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="info" title="연체 기록과 회생 이력은 달라요">
        연체 기록은 면책 후 신청으로 삭제되지만, 개인회생 진행 이력 자체는 최대 5년간 신용정보에 남아요. 연체 기록이 삭제됐어도 이력이 있는 동안에는 대출 심사에 영향을 줄 수 있어요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "면책 후 연체 정보 해제 및 신용 관리 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 17: 개인회생 채무 한도 ──
  "personal-rehabilitation-debt-ceiling": {
    "after-0": (
      <ComparisonTable
        title="개인회생 채무 한도 vs 일반회생 vs 개인파산"
        columns={[
          { name: "개인회생", highlight: true },
          { name: "일반회생" },
          { name: "개인파산" },
        ]}
        rows={[
          { label: "무담보 채무 한도", values: ["10억 원 이하", "제한 없음", "제한 없음"] },
          { label: "담보부 채무 한도", values: ["15억 원 이하", "제한 없음", "제한 없음"] },
          { label: "소득 요건", values: ["필요", "필요", "불필요"] },
          { label: "절차 복잡도", values: ["간소", "복잡", "간소"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="연체 이자가 쌓이면 한도 초과 위험이 있어요">
        채무 한도는 원금뿐 아니라 이자·연체료를 합산해 계산해요. 신청을 미룰수록 이자가 불어 한도를 초과할 수 있어요. 한도에 근접했다면 빨리 신청하는 게 유리해요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "대한법률구조공단",
            description: "채무 한도 초과 여부 확인 및 일반회생 무료 상담",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 18: 개인회생 강제집행 중지 ──
  "personal-rehabilitation-stay-enforcement": {
    "after-0": (
      <StatCard
        items={[
          { label: "자동중지 효력 발생", value: "개시결정 즉시", sub: "신청만으로는 효력 없음" },
          { label: "중지 대상", value: "강제집행·경매·가압류", sub: "조세 체납처분은 제외" },
          { label: "보증인 보호", value: "해당 없음", sub: "채무자 본인에게만 적용" },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="보증인에 대한 추심은 계속될 수 있어요">
        개인회생 자동중지 효력은 신청인 본인에게만 적용돼요. 연대보증인은 채무자 회생과 무관하게 채권자의 추심을 받을 수 있어요. 보증인이 있다면 미리 상황을 알리고 별도 상담을 받는 게 좋아요.
      </WarningBox>
    ),
  },

  // ── 금융금전 Article 19: 개인회생 변제계획 변경 ──
  "personal-rehabilitation-repayment-plan-change": {
    "after-1": (
      <WarningBox type="warning" title="변경 신청 중에도 기존 변제 계속해야 해요">
        변제계획 변경 신청 중에도 기존 계획에 따른 납부를 멈추면 안 돼요. 법원이 변경을 허가하기 전에 임의로 중단하면 폐지 사유가 될 수 있어요.
      </WarningBox>
    ),
    "after-2": (
      <StatCard
        items={[
          { label: "기본 변제기간", value: "3년", sub: "원칙" },
          { label: "최대 변제기간", value: "5년", sub: "청산가치 높을 때 연장 가능" },
          { label: "특별면책 요건", value: "변제기간 3/4 이상 경과", sub: "+ 청산가치 초과 변제" },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "대한법률구조공단",
            description: "변제계획 변경·특별면책 신청 무료 법률 상담",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 20: 개인회생 청산가치 ──
  "personal-rehabilitation-liquidation-value": {
    "after-0": (
      <ComparisonTable
        title="재산 유형별 청산가치 평가 기준"
        columns={[
          { name: "재산 유형" },
          { name: "평가 기준", highlight: true },
          { name: "청산가치 반영" },
        ]}
        rows={[
          { label: "부동산", values: ["실거래가·공시지가", "시가 - 담보채무"] },
          { label: "자동차", values: ["보험개발원 기준가", "시가 기준"] },
          { label: "예금·적금", values: ["잔액 기준", "전액"] },
          { label: "퇴직금 예정액", values: ["재직기간·평균임금 계산", "예정액의 1/2"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="청산가치 낮추려 재산 처분하면 면책 위험">
        파산 신청 전 청산가치를 낮출 목적으로 재산을 처분하면 부인권 대상이 되거나 면책불허가 사유가 될 수 있어요. 재산 처분 전에 반드시 전문가와 상담하세요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "대한법률구조공단",
            description: "청산가치 계산 및 변제금 산정 무료 법률 상담",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 21: 개인파산 면책 후 금융거래 ──
  "personal-bankruptcy-post-discharge-finance": {
    "top": (
      <StatCard
        items={[
          { label: "파산 이력 잔존", value: "최대 5년", sub: "면책 후에도 신용정보에 남음" },
          { label: "복권 시점", value: "면책 확정 즉시", sub: "직업 자격 제한 자동 해제" },
          { label: "면책 후 재산 취득", value: "자유", sub: "파산재단과 무관" },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="info" title="창업도 면책 후 자유롭게 가능해요">
        면책결정 확정 후에는 사업자 등록과 창업에 법적 제한이 없어요. 초기 자금이 부족하다면 서민금융진흥원(☎1397)의 창업 지원 상품을 알아볼 수 있어요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "면책 후 신용 관리·연체 정보 해제 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
          {
            name: "서민금융진흥원",
            description: "면책 후 소액 대출·창업 지원 상품 안내",
            phone: "1397",
            hours: "평일 09:00~18:00",
            url: "https://www.kinfa.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 22: 개인회생 탕감 비율 ──
  "personal-rehabilitation-debt-reduction-rate": {
    "after-0": (
      <WarningBox type="warning" title="'90% 탕감' 광고는 모든 사람에게 해당하지 않아요">
        탕감률은 소득과 재산에 따라 사람마다 달라요. 광고에서 말하는 90% 탕감은 소득이 매우 적고 재산도 거의 없는 경우예요. 가용소득이 높거나 보유 재산이 있다면 탕감률은 낮아져요.
      </WarningBox>
    ),
    "after-3": (
      <ComparisonTable
        title="개인회생 vs 개인파산 채무 탕감 비교"
        columns={[
          { name: "개인회생", highlight: true },
          { name: "개인파산" },
        ]}
        rows={[
          { label: "탕감 방식", values: ["가용소득×변제기간 초과분 면책", "채무 전액 면책"] },
          { label: "소득 요건", values: ["필요", "불필요"] },
          { label: "이자 탕감", values: ["개시결정 이후 이자 면제", "면책결정으로 전액 소멸"] },
          { label: "변제금 발생", values: ["있음 (3~5년)", "없음"] },
          { label: "평균 탕감률", values: ["50~90% (개인차)", "사실상 100%"] },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 23: 개인회생 신청 비용 ──
  "personal-rehabilitation-application-costs": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "법원 납부 비용",
            items: [
              "인지대 — 1만 원",
              "송달료 — 약 10만~15만 원 (채권자 수에 따라 다름)",
              "개시결정 예납금 — 약 50만~100만 원 (법원별 상이)",
            ],
          },
          {
            title: "전문가 선임 비용 (선택)",
            items: [
              "법무사 — 약 50만~200만 원 (자료 작성 대행)",
              "변호사 — 약 100만~400만 원 (대리인 선임)",
              "대한법률구조공단 — 무료 (저소득 자격 해당 시)",
            ],
          },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="법무사 vs 변호사 선임 비교"
        columns={[
          { name: "법무사" },
          { name: "변호사", highlight: true },
        ]}
        rows={[
          { label: "역할", values: ["서류 작성 대행", "법원 출석·대리"] },
          { label: "평균 비용", values: ["50만~200만 원", "100만~400만 원"] },
          { label: "법원 출석 대리", values: ["불가", "가능"] },
          { label: "추천 상황", values: ["사안 단순할 때", "채권자 이의·복잡 사안"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "대한법률구조공단",
            description: "개인회생 신청 비용 무료 지원 (저소득 요건 해당 시)",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 24: 사채·비공식 채무 포함 ──
  "personal-rehabilitation-private-debt-inclusion": {
    "after-1": (
      <WarningBox type="warning" title="채권자 목록에서 빠진 채무는 면책이 안 돼요">
        사채나 지인 차용금도 채권자 목록에 반드시 포함해야 해요. 고의로 빠뜨리면 해당 채무는 면책 대상에서 제외되고, 허위 목록 제출로 면책불허가 사유가 될 수 있어요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "서울회생법원",
            description: "채권자 목록 작성 및 사채 포함 방법 상담",
            phone: "1588-1037",
            hours: "평일 09:00~18:00",
            url: "https://slb.scourt.go.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 25: 담보 채무·전세보증금 ──
  "personal-rehabilitation-secured-debt": {
    "top": (
      <StatCard
        items={[
          { label: "담보부 채무 한도", value: "15억 원 이하", sub: "개인회생 신청 가능 기준" },
          { label: "무담보 채무 한도", value: "10억 원 이하", sub: "개인회생 신청 가능 기준" },
          { label: "담보 채무 별제권", value: "별도 변제", sub: "변제계획과 별도로 처리" },
        ]}
      />
    ),
    "after-3": (
      <ComparisonTable
        title="개인회생 vs 개인파산: 담보 재산 처리 비교"
        columns={[
          { name: "개인회생", highlight: true },
          { name: "개인파산" },
        ]}
        rows={[
          { label: "담보 재산 처리", values: ["유지 가능 (변제 계속)", "환가·청산 원칙"] },
          { label: "전세보증금", values: ["임차인 권리 그대로", "관재인이 처리"] },
          { label: "주택 유지", values: ["변제 이행 시 가능", "원칙적 불가"] },
          { label: "별제권 채권자", values: ["담보 우선 변제", "담보 범위 내 배당"] },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 26: 개인파산 동시폐지 ──
  "personal-bankruptcy-simultaneous-closure": {
    "after-0": (
      <StatCard
        items={[
          { label: "동시폐지 비율", value: "전체의 약 80%", sub: "파산 사건 중 가장 흔한 결과" },
          { label: "환가 재산 기준", value: "실질 없을 때", sub: "관재인 선임 불필요" },
          { label: "면책 결정 기간", value: "파산선고 후 수개월", sub: "이의 없으면 빠르게 확정" },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "대한법률구조공단",
            description: "동시폐지 요건 해당 여부 및 파산 신청 무료 상담",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 27: 직장인 vs 자영업자 개인회생 ──
  "employed-vs-selfemployed-rehabilitation": {
    "after-0": (
      <ComparisonTable
        title="직장인 vs 자영업자 개인회생 비교"
        columns={[
          { name: "직장인", highlight: true },
          { name: "자영업자" },
        ]}
        rows={[
          { label: "소득 증빙", values: ["급여명세서·근로소득원천징수", "부가세 신고서·매출 자료"] },
          { label: "가용소득 산정", values: ["급여 - 최저생계비", "순수익 - 최저생계비"] },
          { label: "소득 변동성", values: ["낮음 (고정 급여)", "높음 (매출 따라 변동)"] },
          { label: "인가 안정성", values: ["높음", "낮음 (소득 입증 어려움)"] },
          { label: "추가 제출 서류", values: ["근로소득 서류", "사업 매출·지출 증빙"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "자영업자 채무조정·개인회생 사전 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 28: 변제계획 인가 요건 ──
  "personal-rehabilitation-plan-approval": {
    "after-2": (
      <WarningBox type="warning" title="인가 요건 미충족 시 폐지·기각 처리돼요">
        변제계획 인가는 법원이 청산가치 보장, 최선변제 원칙, 수행가능성을 모두 검토해요. 한 가지라도 충족하지 못하면 불인가로 이어지고 회생 절차가 종료될 수 있어요. 제출 전 요건 충족 여부를 반드시 확인하세요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "서울회생법원",
            description: "변제계획 인가 요건 및 절차 안내",
            phone: "1588-1037",
            hours: "평일 09:00~18:00",
            url: "https://slb.scourt.go.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 29: 개인파산 채권자 신청·압류 전 개시 ──
  "personal-bankruptcy-voluntary-vs-creditor": {
    "after-1": (
      <WarningBox type="warning" title="파산 신청 전 특정 채권자에게만 변제하면 안 돼요">
        파산 신청 전 일부 채권자에게만 변제하는 편파행위는 면책불허가 사유가 될 수 있어요. 모든 채권자를 동등하게 대우해야 하며, 재산을 숨기거나 처분하는 행위도 사기파산으로 처벌받을 수 있어요.
      </WarningBox>
    ),
    "after-2": (
      <WarningBox type="warning" title="대출 직후 파산 신청은 면책불허가 위험이 있어요">
        대출 실행 직후 파산을 신청하면 법원이 처음부터 갚을 의사가 없었다고 판단할 수 있어요. 도박, 사치 소비, 투기성 채무는 특히 주의가 필요해요. 신청 전 최소 3~6개월간 신규 대출과 과소비를 자제하는 게 좋아요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "대한법률구조공단",
            description: "개인파산 신청 시기·면책불허가 사유 무료 법률 상담",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 30: 워크아웃 vs 개인회생 비교 ──
  "workout-vs-personal-rehabilitation": {
    "after-1": (
      <ComparisonTable
        title="워크아웃 vs 개인회생 vs 개인파산 비교"
        columns={[
          { name: "워크아웃" },
          { name: "개인회생", highlight: true },
          { name: "개인파산" },
        ]}
        rows={[
          { label: "절차 기관", values: ["신용회복위원회", "법원", "법원"] },
          { label: "소득 요건", values: ["필요", "필요", "불필요"] },
          { label: "채무 한도", values: ["별도 기준 없음", "무담보 10억·담보 15억", "제한 없음"] },
          { label: "원금 탕감", values: ["원칙 없음", "일부 면책", "전액 면책"] },
          { label: "법원 이력", values: ["없음", "있음", "있음"] },
        ]}
      />
    ),
    "after-2": (
      <AccordionChecklist
        groups={[
          {
            title: "신용회복위원회 채무조정 신청 서류",
            items: [
              "신분증 사본",
              "소득 증빙 서류 (급여명세서, 근로소득원천징수 등)",
              "채무 내역서 (각 금융기관 잔액 확인서)",
              "재산 목록 (부동산, 차량, 예금 등)",
            ],
          },
          {
            title: "연체 전 프리워크아웃 추가 확인",
            items: [
              "연체 발생 전 또는 31일 이내 연체",
              "채무 총액 15억 원 이하",
              "실직, 폐업, 소득 감소 등 상환 어려움 사유",
            ],
          },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "워크아웃·프리워크아웃·개인채무조정 상담 및 신청",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 31: 개인회생 자동차 청산가치 ──
  "personal-rehabilitation-car-liquidation-value": {
    "top": (
      <StatCard
        items={[
          { label: "차량 청산가치", value: "시세 - 할부 잔액", sub: "순가치가 변제금 기준에 반영" },
          { label: "면제재산 인정", value: "법원 판단", sub: "생계용 차량 입증 서류 필요" },
          { label: "할부차량 별제권", value: "담보 범위 내 우선", sub: "초과분은 무담보 채무 처리" },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="면제재산 신청을 누락하면 변제금이 높아져요">
        배달·영업직 등 생계용 차량이 있어도 면제재산 신청을 하지 않으면 차량 시세가 청산가치에 그대로 포함돼요. 신청 시 직종 증빙 서류를 함께 제출해야 법원이 인정할 수 있어요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "대한법률구조공단",
            description: "개인회생 차량 면제재산 신청 및 청산가치 계산 무료 상담",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 32: 개인파산 비면책채권 ──
  "personal-bankruptcy-non-dischargeable-debts": {
    "top": (
      <StatCard
        items={[
          { label: "조세·공과금", value: "비면책채권", sub: "세금·벌금·과태료 전액 잔존" },
          { label: "양육비·부양료", value: "비면책채권", sub: "자녀 생존권 채무, 면제 불가" },
          { label: "고의 불법행위", value: "비면책채권", sub: "사기·횡령 손해배상 잔존" },
        ]}
      />
    ),
    "after-0": (
      <WarningBox type="warning" title="세금 체납은 면책 후에도 압류가 계속돼요">
        파산 면책으로 사적 채무는 소멸하지만 국세·지방세 체납은 그대로 남아요. 면책 후에도 체납 세금이 있으면 재산 압류가 지속되므로 세금은 분납 신청 등을 통해 별도로 해결해야 해요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "근로복지공단",
            description: "사업주 파산 시 체당금 신청 및 미지급 임금 지원",
            phone: "1588-0075",
            hours: "평일 09:00~18:00",
            url: "https://www.comwel.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 33: 개인회생 보증인 채무 ──
  "personal-rehabilitation-guarantor-liability": {
    "after-0": (
      <WarningBox type="warning" title="주채무자 면책이 보증인 채무를 없애지는 않아요">
        채무자가 개인회생 면책을 받아도 보증인의 채무는 그대로 유지돼요. 채권자는 면책 후 보증인에게 전액 청구할 수 있어요. 보증채무가 감당하기 어렵다면 보증인 본인도 채무조정 절차를 검토해야 해요.
      </WarningBox>
    ),
    "after-2": (
      <ComparisonTable
        title="단순보증 vs 연대보증 책임 비교"
        columns={[
          { name: "단순보증" },
          { name: "연대보증", highlight: true },
        ]}
        rows={[
          { label: "청구 순서", values: ["주채무자 먼저", "채권자 선택"] },
          { label: "최고·검색 항변권", values: ["있음", "없음"] },
          { label: "전액 책임", values: ["주채무 이행 후", "즉시 전액 청구"] },
          { label: "구상권 발생", values: ["대신 갚은 금액", "대신 갚은 금액"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "대한법률구조공단",
            description: "보증채무 개인회생 포함 방법 및 구상권 무료 상담",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 34: 개인회생 신용 회복 기간 ──
  "personal-rehabilitation-credit-recovery-timeline": {
    "top": (
      <StatCard
        items={[
          { label: "개인회생 신용정보 등록", value: "최대 5년", sub: "면책 확정일 기산" },
          { label: "개인파산 신용정보 등록", value: "최대 7년", sub: "면책 확정일 기산" },
          { label: "체크카드 발급", value: "면책 직후 가능", sub: "신용 심사 불필요" },
        ]}
      />
    ),
    "after-2": (
      <ComparisonTable
        title="개인회생 vs 개인파산 신용 회복 비교"
        columns={[
          { name: "개인회생", highlight: true },
          { name: "개인파산" },
        ]}
        rows={[
          { label: "신용정보 등록 기간", values: ["최대 5년", "최대 7년"] },
          { label: "변제 이력", values: ["있음 (긍정 반영)", "없음"] },
          { label: "신용카드 재발급", values: ["이력 삭제 후 가능", "더 오래 걸림"] },
          { label: "금융 정상화 예상", values: ["5~6년", "7년 이상"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "면책 후 신용기록 삭제 신청 및 신용 관리 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 35: 개인워크아웃 무직자 소득 조건 ──
  "workout-income-jobless-condition": {
    "top": (
      <StatCard
        items={[
          { label: "가용소득 산정 기준", value: "소득 - 최저생계비", sub: "전 가구원 합산" },
          { label: "1인 가구 최저생계비", value: "약 100만원", sub: "2025년 기준 (월)" },
          { label: "무직자 소득 인정", value: "배우자·부업 합산", sub: "0원이면 신청 어려움" },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "무직자 워크아웃 소득 증빙 및 가용소득 산정 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 36: 워크아웃 상각채권 원금 감면율 ──
  "workout-charged-off-loan-reduction-rate": {
    "after-1": (
      <ComparisonTable
        title="상각채권 vs 미상각채권 감면율 비교"
        columns={[
          { name: "상각채권", highlight: true },
          { name: "미상각채권" },
        ]}
        rows={[
          { label: "원금 감면율", values: ["최대 30~70%", "감면 없음"] },
          { label: "이자·연체이자", values: ["전액 감면", "협의에 따라"] },
          { label: "채권 상태", values: ["금융사 손실처리 완료", "정상·연체 중"] },
          { label: "변제 기간", values: ["최대 10년", "최대 10년"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "상각채권 원금 감면율 및 워크아웃 조정 조건 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 37: 채무조정 3가지 비교 ──
  "debt-adjustment-3types-comparison": {
    "after-0": (
      <ComparisonTable
        title="신속채무조정 · 프리워크아웃 · 개인워크아웃 비교"
        columns={[
          { name: "신속채무조정" },
          { name: "프리워크아웃", highlight: true },
          { name: "개인워크아웃" },
        ]}
        rows={[
          { label: "연체 기준", values: ["30일 미만", "31~89일", "90일 이상"] },
          { label: "원금 감면", values: ["없음", "없음", "최대 70%"] },
          { label: "이자 감면", values: ["일부", "연체이자 면제", "전액 감면"] },
          { label: "변제 기간", values: ["최대 10년", "최대 10년", "최대 10년"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "채무조정 유형 선택 및 신청 절차 무료 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 38: 워크아웃 이자 감면 월 변제금 ──
  "workout-interest-relief-monthly-payment": {
    "top": (
      <StatCard
        items={[
          { label: "이자·연체이자 감면", value: "전액 감면", sub: "워크아웃 확정 후" },
          { label: "최대 변제 기간", value: "10년", sub: "120개월 분할" },
          { label: "상각채권 원금 감면", value: "최대 70%", sub: "금융사 손실처리 채권" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="변제 기간별 월 납입액 예시 (원금 1,000만원 기준)"
        columns={[
          { name: "5년 변제" },
          { name: "10년 변제", highlight: true },
        ]}
        rows={[
          { label: "월 납입액", values: ["약 167,000원", "약 83,000원"] },
          { label: "이자 납입", values: ["없음", "없음"] },
          { label: "총 납입액", values: ["1,000만원", "1,000만원"] },
          { label: "적합 소득", values: ["중간 소득층", "저소득층·무직자"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "월 변제금 산정 및 이자 감면 조건 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 39: 워크아웃 협약 금융사 채무 범위 ──
  "workout-debt-scope-nonmember-lender": {
    "after-1": (
      <WarningBox type="warning" title="사채·세금 체납은 워크아웃 대상이 아니에요">
        개인워크아웃은 신용회복위원회 협약 금융사 채무만 조정 대상이에요. 사채(불법 고금리 대출), 체납 세금, 건강보험료는 포함되지 않아요. 비협약 금융사 채무는 별도로 해결해야 하며, 조정 비율(20% 이내)을 초과하면 신청이 제한될 수 있어요.
      </WarningBox>
    ),
    "after-2": (
      <ComparisonTable
        title="워크아웃 포함 채무 vs 미포함 채무"
        columns={[
          { name: "포함 (조정 가능)", highlight: true },
          { name: "미포함 (별도 해결)" },
        ]}
        rows={[
          { label: "은행 대출", values: ["✅ 포함", "—"] },
          { label: "카드사 채무", values: ["✅ 포함", "—"] },
          { label: "저축은행 대출", values: ["✅ 포함", "—"] },
          { label: "사채·비공식 대출", values: ["—", "❌ 미포함"] },
          { label: "세금·건강보험료 체납", values: ["—", "❌ 미포함"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "협약 금융사 채무 범위 확인 및 워크아웃 신청 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 40: 개인워크아웃 미납 실효 부활 신청 방법 ──
  "workout-revival-after-default": {
    "after-0": (
      <WarningBox type="warning" title="실효 전에 상환유예·재조정을 먼저 신청하세요">
        개인워크아웃이 실효되면 채무 조정이 중단되고 채권자 추심이 재개돼요. 납입이 어려워지면 실효 전에 즉시 신용회복위원회에 연락해 상환유예 또는 재조정을 신청하는 게 중요해요. 실효 확정 후에는 새 조정안을 처음부터 다시 신청해야 해요.
      </WarningBox>
    ),
    "after-2": (
      <ComparisonTable
        title="상환유예 vs 재조정 비교"
        columns={[
          { name: "상환유예" },
          { name: "재조정", highlight: true },
        ]}
        rows={[
          { label: "신청 사유", values: ["일시적 소득 감소·질병 등", "소득 지속 감소·부양가족 증가"] },
          { label: "변제금 변경", values: ["없음 (납입만 미룸)", "월 납입액·기간 조정"] },
          { label: "최대 기간", values: ["1년 (6개월×2회)", "총 10년 초과 불가"] },
          { label: "채권자 동의", values: ["불필요", "필요"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "워크아웃 상환유예·재조정·75% 면책 특례 신청 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 41: 개인워크아웃 완료 후 신용기록 삭제 시점 ──
  "workout-credit-record-deletion": {
    "top": (
      <StatCard
        items={[
          { label: "공공기록 최대 등록 기간", value: "5년", sub: "조정 완료 후 기산" },
          { label: "조기 삭제 조건", value: "2년 성실상환", sub: "신용회복위원회 신청 필요" },
          { label: "탕감 금융사 재거래 제한", value: "3~5년", sub: "금융사 내부 정책에 따라" },
        ]}
      />
    ),
    "after-2": (
      <ComparisonTable
        title="공공기록 자동 삭제 vs 조기 삭제 비교"
        columns={[
          { name: "자동 삭제" },
          { name: "조기 삭제", highlight: true },
        ]}
        rows={[
          { label: "삭제 시점", values: ["완료 후 5년", "2년 성실상환 후"] },
          { label: "별도 신청", values: ["불필요", "신용회복위원회 신청"] },
          { label: "신용 회복 시점", values: ["5년 후", "2년 후"] },
          { label: "조건", values: ["자동", "연체·실효 이력 없어야"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "워크아웃 완료 후 신용정보 조기 삭제 신청 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 42: 개인회생 워크아웃 전환 최적 시점 ──
  "personal-rehabilitation-to-workout-conversion": {
    "after-0": (
      <ComparisonTable
        title="개인회생 vs 개인워크아웃 비교"
        columns={[
          { name: "개인회생" },
          { name: "개인워크아웃", highlight: true },
        ]}
        rows={[
          { label: "담보채무 포함", values: ["✅ 포함", "❌ 미포함"] },
          { label: "채권자 동의", values: ["불필요 (법원 인가)", "필요"] },
          { label: "원금 감면", values: ["청산가치 이상 변제", "최대 70~90% (상각채권)"] },
          { label: "변제 기간", values: ["3~5년", "최대 10년"] },
          { label: "법원 절차", values: ["있음 (비용 발생)", "없음"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "개인회생 폐지 후 워크아웃 전환 절차 및 상각채권 확인 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 43: 개인워크아웃 취약계층 원금 90% 감면 조건 ──
  "workout-vulnerable-class-90percent-reduction": {
    "top": (
      <StatCard
        items={[
          { label: "일반 상각채권 감면율", value: "최대 70%", sub: "협약 금융사 채무" },
          { label: "취약계층 감면율", value: "최대 90%", sub: "기초수급자·중증장애인 등" },
          { label: "소액 장기연체 면제", value: "1,000만원 이하", sub: "10년 이상 연체 취약계층" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="취약계층 인정 범위 및 서류"
        columns={[
          { name: "취약계층 유형" },
          { name: "필요 서류" },
        ]}
        rows={[
          { label: "기초생활수급자", values: ["수급자 증명서", "(3개월 이내 발급)"] },
          { label: "중증장애인", values: ["장애인 등록증 사본", "복지카드 가능"] },
          { label: "만 70세 이상", values: ["주민등록증", "나이 확인"] },
          { label: "한부모 가정", values: ["한부모가족증명서", "(3개월 이내 발급)"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "취약계층 90% 감면 특례 및 소액 장기연체 채무 면제 신청 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 44: 프리워크아웃 이자율 인하 폭 신청 조건 ──
  "preworkout-interest-rate-reduction": {
    "top": (
      <StatCard
        items={[
          { label: "프리워크아웃 신청 요건", value: "연체 31~89일", sub: "90일 이상이면 개인워크아웃" },
          { label: "원금 감면", value: "없음", sub: "이자·연체이자만 조정" },
          { label: "최장 분할상환 기간", value: "10년", sub: "연체기록 신용불량 등록 방지" },
        ]}
      />
    ),
    "after-2": (
      <ComparisonTable
        title="프리워크아웃 vs 개인워크아웃 비교"
        columns={[
          { name: "프리워크아웃", highlight: true },
          { name: "개인워크아웃" },
        ]}
        rows={[
          { label: "연체 기간", values: ["31~89일", "90일 이상"] },
          { label: "원금 감면", values: ["없음", "최대 70~90%"] },
          { label: "이자 감면", values: ["금리 인하", "전액 감면"] },
          { label: "신용불량 등록", values: ["방지 가능", "이미 등록"] },
          { label: "변제 기간", values: ["최대 10년", "최대 10년"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "프리워크아웃 이자율 인하 조건 및 변제 유예 신청 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 45: 개인워크아웃 신청 서류 목록 소득 증빙 ──
  "workout-application-documents-income-proof": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "기본 필수 서류",
            items: [
              "신분증 (주민등록증 또는 운전면허증)",
              "채권자 목록 또는 신용정보조회서",
              "소득 증빙 (원천징수영수증 / 통장 3개월 거래내역)",
              "재산 서류 (부동산 등기부등본, 자동차 등록원부)",
            ],
          },
          {
            title: "무소득자·특수 상황 대체 서류",
            items: [
              "소득 없음 확인서 (신용회복위원회 자체 양식)",
              "가족 송금 이체 내역 (생활비 지원 증빙)",
              "실업급여 수급자 증명서 또는 기초수급자 증명서",
            ],
          },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "워크아웃 신청 서류 확인 및 비대면·방문 접수 안내",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 46: 개인워크아웃 신청일 추심 중단 효력 ──
  "workout-enforcement-suspension-guarantor": {
    "top": (
      <StatCard
        items={[
          { label: "추심 중단 효력 발생", value: "신청 다음날부터", sub: "정식 접수 완료 시" },
          { label: "보증인 추심 중단", value: "함께 보호", sub: "주채무 조정 기간 중" },
          { label: "신규 카드·대출", value: "제한", sub: "체크카드는 발급 가능" },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="보증인 보호는 주채무자 이행 기간에만 유효해요">
        주채무자가 워크아웃을 성실히 이행하는 동안만 보증인에 대한 추심이 중단돼요. 주채무자가 조정안을 이행하지 않아 실효되면 채권자는 보증인에게 추심을 재개할 수 있어요. 주채무자의 성실한 납입이 보증인 보호의 핵심이에요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "추심 중단 확인, 보증인 별도 채무조정 신청 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 47: 신용회복위원회 채무조정 신청 비용 ──
  "ccrs-debt-adjustment-fee-procedure": {
    "top": (
      <StatCard
        items={[
          { label: "채무조정 수수료", value: "5만원", sub: "조정안 확정 후 납부" },
          { label: "저소득층 수수료", value: "면제·감면 가능", sub: "기초수급자·차상위계층" },
          { label: "콜센터", value: "1600-5500", sub: "평일 09:00~18:00" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="방문 접수 vs 온라인·앱 접수 비교"
        columns={[
          { name: "방문 접수" },
          { name: "온라인·앱 접수", highlight: true },
        ]}
        rows={[
          { label: "이용 시간", values: ["평일 09:00~18:00", "24시간"] },
          { label: "서류 제출", values: ["현장 제출", "스캔·사진 업로드"] },
          { label: "담당자 즉석 안내", values: ["가능", "채팅 상담"] },
          { label: "추천 대상", values: ["처음 신청자", "재신청·변경"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "채무조정 수수료 안내, 방문 상담 예약, 온라인 접수 지원",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 48: 개인워크아웃 담보채무 이자 감면 범위 ──
  "workout-secured-debt-interest-relief": {
    "after-0": (
      <ComparisonTable
        title="담보채무 vs 신용채무 워크아웃 적용 비교"
        columns={[
          { name: "담보채무" },
          { name: "신용채무(상각)", highlight: true },
        ]}
        rows={[
          { label: "원금 감면", values: ["없음", "최대 70~90%"] },
          { label: "이자 감면", values: ["연체이자 전액", "이자·연체이자 전액"] },
          { label: "최장 상환기간", values: ["35년", "10년"] },
          { label: "경매 자동 중단", values: ["안 됨 (별도 신청)", "해당 없음"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="경매 중단은 워크아웃만으로 자동 보장되지 않아요">
        개인워크아웃 신청만으로는 법원 경매나 강제집행이 자동으로 멈추지 않아요. 경매 중단이 필요하면 법원에 별도로 신청하거나, 채권자와 협의해 자발적 취하를 요청해야 해요. 경매가 급하다면 법원 강제력이 있는 개인회생도 함께 검토해보세요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "담보채무 연체이자 감면·상환기간 연장 조정 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 49: 개인워크아웃 청년 성실상환 인센티브 ──
  "workout-youth-incentive-extra-reduction": {
    "top": (
      <StatCard
        items={[
          { label: "청년 인센티브 대상", value: "만 34세 이하", sub: "신청일 기준" },
          { label: "성실상환 조건", value: "1년 이상", sub: "납입 공백 없이 이행" },
          { label: "일시 완제 시", value: "추가 감면", sub: "일반 감면율보다 확대" },
        ]}
      />
    ),
    "after-2": (
      <ComparisonTable
        title="일반 채무자 vs 청년 인센티브 비교"
        columns={[
          { name: "일반 채무자" },
          { name: "청년 (34세 이하)", highlight: true },
        ]}
        rows={[
          { label: "성실상환 인센티브", values: ["있음", "있음 (확대)"] },
          { label: "일시 완제 감면", values: ["적용", "추가 확대 적용"] },
          { label: "취업 연계 인센티브", values: ["적용 가능", "적용 가능"] },
          { label: "신청 조건", values: ["1년 이상 이행", "1년 이상 이행"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "청년 성실상환 인센티브·취업 연계 추가 감면 신청 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 50: 워크아웃 성실상환 소액대출 신청 ──
  "workout-microloan-living-expenses": {
    "top": (
      <StatCard
        items={[
          { label: "소액대출 신청 조건", value: "6개월 성실상환", sub: "납입 공백 없이" },
          { label: "최대 한도", value: "1,500만원", sub: "용도별 한도 상이" },
          { label: "대출 금리", value: "연 10% 내외", sub: "고금리 차환 목적 가능" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="소액대출 용도별 한도"
        columns={[
          { name: "용도" },
          { name: "최대 한도" },
        ]}
        rows={[
          { label: "생활안정자금", values: ["긴급 생계·공과금", "최대 500만원"] },
          { label: "학자금", values: ["본인·자녀 학비", "최대 1,000만원"] },
          { label: "임차보증금", values: ["전·월세 계약", "최대 1,000만원"] },
          { label: "창업·운영자금", values: ["소규모 사업", "최대 1,500만원"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "소액대출 신청 조건, 용도별 한도, 고금리 차환 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 51: 신속채무조정 30일 이하 연체 자격 ──
  "rapid-debt-adjustment-30days-eligibility": {
    "after-2": (
      <ComparisonTable
        title="신속채무조정 vs 일반 워크아웃 비교"
        columns={[
          { name: "신속채무조정" },
          { name: "일반 워크아웃", highlight: true },
        ]}
        rows={[
          { label: "연체 기간", values: ["30일 이내", "90일 이상"] },
          { label: "신청 시점", values: ["연체 직전·초기", "장기 연체 후"] },
          { label: "이자 감면", values: ["일부 감면", "최대 전액 감면"] },
          { label: "신용 영향", values: ["최소화 가능", "연체 기록 등록"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "신속채무조정 자격 요건 및 신청 절차 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 52: 프리워크아웃 취업·창업시 이자율 ──
  "pre-workout-income-employment-rate": {
    "after-0": (
      <ComparisonTable
        title="프리워크아웃 vs 개인워크아웃 비교"
        columns={[
          { name: "프리워크아웃" },
          { name: "개인워크아웃", highlight: true },
        ]}
        rows={[
          { label: "연체 기간", values: ["30일 이내", "90일 이상"] },
          { label: "이자 감면", values: ["일부 감면·유예", "전액 감면 가능"] },
          { label: "취업 인센티브", values: ["이자율 추가 인하", "이자율 추가 인하"] },
          { label: "신용 영향", values: ["최소화", "연체 기록 등록"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "프리워크아웃 취업·창업 인센티브 이자율 인하 신청 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 53: 개인워크아웃 90일 연체 상환구조 ──
  "personal-workout-90days-repayment-structure": {
    "top": (
      <StatCard
        items={[
          { label: "적용 연체 기간", value: "90일 이상", sub: "개인워크아웃 기준" },
          { label: "무담보 최대 감면", value: "원금 60%", sub: "이자·연체이자 전액" },
          { label: "상환 기간", value: "최장 10년", sub: "담보 채무 15년 가능" },
        ]}
      />
    ),
    "after-2": (
      <ComparisonTable
        title="무담보 vs 담보 채무 상환 조건"
        columns={[
          { name: "무담보 채무" },
          { name: "담보 채무", highlight: true },
        ]}
        rows={[
          { label: "원금 감면", values: ["최대 60%", "없음 (이자만)"] },
          { label: "이자 감면", values: ["전액 감면", "전액 감면"] },
          { label: "상환 기간", values: ["최장 10년", "최장 15년"] },
          { label: "연체이자", values: ["전액 면제", "전액 면제"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "개인워크아웃 90일 이상 연체 상환구조 및 감면 비율 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 54: 채무조정 대상 채무 범위·기각 사유 ──
  "debt-adjustment-eligibility-exclusion": {
    "after-1": (
      <WarningBox
        type="warning"
        title="채무조정 신청 전 반드시 확인"
      >
        <ul className="list-disc pl-4 space-y-1">
          <li>신청일로부터 6개월 이내 신규 취득 채무는 대상에서 제외돼요</li>
          <li>사기·횡령 등 불법 행위로 생긴 채무는 신청 불가해요</li>
          <li>도박·사행행위 등 사회 통념상 허용 안 되는 채무도 제외돼요</li>
          <li>재산을 은닉하거나 허위 신청하면 즉시 기각될 수 있어요</li>
        </ul>
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "채무조정 신청 자격·제외 사유·기각 방지 사전 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 55: 신용회복위원회 협약 채권 범위·양도 ──
  "ccrs-covered-debt-scope-transferred": {
    "after-0": (
      <ComparisonTable
        title="협약 채권 vs 비협약 채권"
        columns={[
          { name: "협약 채권" },
          { name: "비협약 채권", highlight: true },
        ]}
        rows={[
          { label: "주요 대상", values: ["은행·카드사·보험사", "대부업체·개인채권"] },
          { label: "채무조정 적용", values: ["전부 적용", "원칙적 제외"] },
          { label: "양도 후 처리", values: ["협약 조건 그대로 유지", "협약 해제 가능"] },
          { label: "상담 창구", values: ["신용회복위원회", "개별 협의 필요"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "협약 채권 범위, 양도 후 채무조정 유지 여부 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 56: 연체정보 미등록 채무 조회 방법 ──
  "no-delinquency-record-debt-check": {
    "top": (
      <StatCard
        items={[
          { label: "내신용정보 조회", value: "무료", sub: "전국 은행연합회" },
          { label: "채무조회 창구", value: "신용회복위원회", sub: "미등록 채무 확인 가능" },
          { label: "조회 가능 채무", value: "금융권 전체", sub: "대부업 포함" },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "연체정보 미등록 채무 조회 및 채무 확인 서비스",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 57: 국세 지방세 체납 채무조정 신청 여부 ──
  "tax-arrears-debt-adjustment-alternative": {
    "after-2": (
      <ComparisonTable
        title="채무조정 vs 개인회생 vs 개인파산 비교"
        columns={[
          { name: "채무조정(신복위)" },
          { name: "개인회생" },
          { name: "개인파산", highlight: true },
        ]}
        rows={[
          { label: "절차", values: ["신복위 합의", "법원 심판", "법원 심판"] },
          { label: "변제 기간", values: ["최장 10년", "3~5년", "없음(면책)"] },
          { label: "원금 감면", values: ["최대 60%", "잔여 면책", "전액 면책"] },
          { label: "공개 여부", values: ["비공개", "법원 공고", "법원 공고"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "채무조정 vs 개인회생·파산 전환 적합성 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 58: 채무조정 최저생계비 변제금 산정 기준 ──
  "minimum-livelihood-income-workout-apply": {
    "top": (
      <StatCard
        items={[
          { label: "변제금 산정 기준", value: "소득 - 최저생계비", sub: "가처분 소득 범위 내" },
          { label: "최저생계비 기준", value: "매년 갱신", sub: "보건복지부 중위소득 기준" },
          { label: "소득 제공 가능", value: "가족 지원 인정", sub: "소득제공 확인서 제출" },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "최저생계비 산정, 실직자·프리랜서 신청 방법 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 59: 채무조정 소득 증명 대체 서류 ──
  "income-proof-alternative-docs-rental": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "급여명세서 대체 서류",
            items: [
              "고용계약서 (입사 초기 필수)",
              "재직증명서",
              "사용확인서 (고용주 서명 포함)",
              "통장 급여 입금 내역서",
            ],
          },
          {
            title: "프리랜서·임대수익자 서류",
            items: [
              "종합소득세 신고 확인서",
              "임대차 계약서 및 입금 내역",
              "국민연금 납부 이력 확인서",
              "세금계산서 또는 거래명세서",
            ],
          },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "소득 증빙 서류 대체 방법 및 임대수익 인정 여부 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 60: 경매 진행 중 부동산 채무조정 신청 ──
  "auction-property-debt-adjustment-lien": {
    "after-1": (
      <ComparisonTable
        title="경매·가압류 상태별 채무조정 효력"
        columns={[
          { name: "채무조정 신청 전" },
          { name: "채무조정 확정 후", highlight: true },
        ]}
        rows={[
          { label: "경매 진행", values: ["계속 진행", "채권자 동의 시 취하 가능"] },
          { label: "가압류", values: ["유지", "채권자 해제 신청 필요"] },
          { label: "추심", values: ["계속", "완화 가능"] },
          { label: "집 처분", values: ["위험", "채권자 협의로 방어 가능"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "경매 진행 중 채무조정 신청 및 경매 중단 협의 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 61: 급여 가압류 채무조정 효력 처리 ──
  "wage-garnishment-workout-public-rental": {
    "after-1": (
      <ComparisonTable
        title="급여 압류 채무조정 전·후 비교"
        columns={[
          { name: "채무조정 전" },
          { name: "채무조정 확정 후", highlight: true },
        ]}
        rows={[
          { label: "급여 압류", values: ["지속", "채권자 협의 후 해제 가능"] },
          { label: "수령 급여", values: ["압류 후 잔액만", "해제 시 전액"] },
          { label: "추심·독촉", values: ["계속", "채무조정 수용 시 완화"] },
          { label: "임차보증금", values: ["별개 가압류 가능", "신청만으로 가압류 안 됨"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "급여 가압류 해제 협의 및 영구임대 임차보증금 보호 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 62: 보증서담보대출 채무조정 포함 여부 ──
  "guarantee-mortgage-loan-debt-adjustment": {
    "after-2": (
      <ComparisonTable
        title="담보대출 vs 무담보대출 채무조정 비교"
        columns={[
          { name: "무담보대출" },
          { name: "담보대출", highlight: true },
        ]}
        rows={[
          { label: "원금 감면", values: ["최대 60%", "제한적 (이자 위주)"] },
          { label: "이자 감면", values: ["전액 면제", "전액 면제"] },
          { label: "연체이자", values: ["전액 면제", "전액 면제"] },
          { label: "상환 기간", values: ["최장 10년", "최장 15년"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "담보대출·보증서담보대출 채무조정 포함 범위 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 63: 채무조정 중 자동차 처분 기준 생계형 ──
  "vehicle-disposal-workplace-notification": {
    "after-0": (
      <WarningBox
        type="info"
        title="생계형 차량은 처분하지 않아도 돼요"
      >
        출퇴근, 사업에 필수적인 생계형 차량은 채무조정 중에도 유지할 수 있어요. 고가 차량이나 불필요한 차량은 처분 권고 대상이 될 수 있으니, 신청 전에 신용회복위원회에 미리 확인하세요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "채무조정 중 차량 유지 기준, 직장 통보 여부, 출국 제한 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 64: 채무조정 신청 필요 서류 목록 ──
  "debt-adjustment-documents-consultation": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "공통 필수 서류",
            items: [
              "신분증 (주민등록증 또는 운전면허증)",
              "채무 확인 서류 (대출 잔액 확인서, 연체 내역서)",
              "소득 증빙 서류 (급여명세서, 재직증명서 등)",
              "주민등록등본 (가족 관계 확인 필요 시)",
            ],
          },
          {
            title: "재산 보유 시 추가 서류",
            items: [
              "부동산 등기부등본 (부동산 있는 경우)",
              "자동차등록증 사본 (차량 있는 경우)",
              "금융재산 확인서 (예금, 적금 등)",
            ],
          },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="방문 상담 vs 온라인 상담 비교"
        columns={[
          { name: "방문 상담" },
          { name: "온라인 상담", highlight: true },
        ]}
        rows={[
          { label: "장점", values: ["1:1 맞춤 안내", "시간·장소 자유"] },
          { label: "서류 제출", values: ["직접 제출", "전자 제출 가능"] },
          { label: "적합 대상", values: ["복잡한 상황", "바쁜 직장인·거동 불편자"] },
          { label: "예약 방법", values: ["1600-5500", "ccrs.or.kr"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "채무조정 신청 서류 안내 및 방문·온라인 상담 예약",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 65: 채무조정 확정 절차 부동의 채권사 처리 ──
  "debt-adjustment-confirmation-dissent-creditor": {
    "after-0": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "신청 접수", desc: "서류 제출 + 신청비 5만원 납부" },
          { step: "2", title: "채권 조회", desc: "협약 채권금융회사 채무 내역 확인" },
          { step: "3", title: "채권자 의견 수렴", desc: "각 금융사 동의 여부 확인" },
          { step: "4", title: "심의위원회 의결", desc: "부동의 금융사 있어도 강제 의결 가능" },
          { step: "5", title: "확정 + 협의서 체결", desc: "체결일부터 변제 시작" },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "채무조정 확정 절차 및 부동의 채권자 처리 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 66: 채무조정 신청 후 예적금 자동이체 처리 ──
  "post-application-auto-transfer-deposit": {
    "after-1": (
      <WarningBox
        type="warning"
        title="채무조정 신청 후 반드시 확인하세요"
      >
        <ul className="list-disc pl-4 space-y-1">
          <li>자동이체는 자동 해지되지 않으니 직접 각 금융사에 해지 요청하세요</li>
          <li>특정 금융사에만 먼저 상환하면 채무조정에 불리해질 수 있어요</li>
          <li>예·적금 상계 우려 시 신청 전 미리 이체하는 것이 안전해요</li>
        </ul>
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "신청 후 자동이체 처리, 임의상환 주의사항 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 67: 개인워크아웃 연체정보 해제 시점 기준 ──
  "workout-delinquency-release-guarantor": {
    "top": (
      <StatCard
        items={[
          { label: "공공정보 조기 삭제", value: "1년 이상 성실 상환", sub: "신용회복위원회 신청 필요" },
          { label: "보증인 효력", value: "별도 적용 없음", sub: "보증인은 독립 상환 의무" },
          { label: "완료 후 기록 해제", value: "채무 완료 후", sub: "일정 기간 경과 시 삭제" },
        ]}
      />
    ),
    "after-2": (
      <ComparisonTable
        title="주채무자 vs 보증인 채무조정 효력 비교"
        columns={[
          { name: "주채무자" },
          { name: "보증인", highlight: true },
        ]}
        rows={[
          { label: "채무조정 효력", values: ["적용됨", "적용 안 됨"] },
          { label: "상환 의무", values: ["조정된 변제금", "원래 채무 전액"] },
          { label: "추심 압박", values: ["완화됨", "독립적으로 유지"] },
          { label: "별도 신청", values: ["본인 신청", "별도 채무조정 가능"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "연체정보 조기 삭제 신청 및 보증인 채무조정 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 68: 채무조정 신청비 납부 방법 누락 채무 추가 ──
  "application-fee-missing-debt-collection-call": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "신청 접수 후 즉시 처리 사항",
            items: [
              "신청비 5만원 납부 (담당 심사역 안내 확인)",
              "카드·대출 자동이체 직접 해지",
              "누락 채무 있으면 담당자에게 즉시 알리기",
              "접수 확인서 발급 후 보관",
            ],
          },
          {
            title: "진행 중 관리 사항",
            items: [
              "독촉전화 시 추심중단 요청 신청",
              "이사·전화번호 변경 시 즉시 통보",
              "특정 채권자에게 임의 상환 금지",
            ],
          },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "신청비 납부, 독촉전화 중단, 누락 채무 추가 안내",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── 금융금전 Article 69: 자영업자 카드매출 입금통장 지급정지 해제 ──
  "self-employed-card-sales-account-freeze": {
    "after-0": (
      <WarningBox
        type="warning"
        title="자영업자 채무조정 신청 전 꼭 확인하세요"
      >
        카드매출 입금통장 지급정지를 막으려면 신청 전에 매출 입금 통장을 채무가 없는 다른 은행으로 미리 변경하는 것이 안전해요. 지급정지가 발생하면 신용회복위원회를 통해 해제 협의를 진행할 수 있어요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "자영업자 카드매출 통장 지급정지 해제 및 사업 계속 운영 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 70: 채무조정 변제금 미납 취소 기준 ──
  "repayment-default-cancellation-lump-sum-account": {
    "after-0": (
      <WarningBox type="danger" title="변제금 미납 취소 기준">
        <ul className="list-disc pl-4 space-y-1 text-sm">
          <li>연속 3회 이상 미납 → 채무조정 취소 가능</li>
          <li>총 6회 이상 미납 → 채무조정 취소 가능</li>
          <li>취소 시 원채무 전액·이자 부활, 추심 재개</li>
          <li>납부 어려우면 미리 신용회복위원회에 연락, 유예 신청 가능</li>
        </ul>
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "변제금 납입 계좌 조회, 유예·재산정 상담, 일시 완제 문의",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 71: 채무조정 이행 중 신규 대출·카드·보험·신원보증보험 ──
  "workout-new-loan-card-insurance-surety": {
    "after-0": (
      <ComparisonTable
        title="채무조정 이행 중 금융 거래 가능 여부"
        columns={[
          { name: "금융 거래 유형" },
          { name: "가능 여부" },
          { name: "비고" },
        ]}
        rows={[
          { label: "체크카드·선불카드", values: ["가능", "신용 심사 없음"] },
          { label: "신규 신용카드", values: ["원칙 불가", "신용 심사에서 거절"] },
          { label: "일반 금융기관 신규 대출", values: ["원칙 불가", "채무조정 위반 사유"] },
          { label: "성실상환 소액대출", values: ["6개월 후 가능", "최대 1,500만 원"] },
          { label: "취업용 신원보증보험", values: ["예외적 가능", "보험사 협조 필요"] },
          { label: "기존 보험 해약 환급금", values: ["가능(신고 필수)", "변제금 재산정 가능"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "채무조정 이행 중 금융 거래 가능 여부, 소액대출 신청 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 72: 채무조정 확정 후 재산 은닉 취소 ──
  "workout-asset-concealment-cancellation-restriction": {
    "after-0": (
      <WarningBox type="danger" title="재산 은닉·도피 시 채무조정 즉시 취소">
        <ul className="list-disc pl-4 space-y-1 text-sm">
          <li>가족에게 부동산 증여·시세 이하 매각 → 사해행위, 취소 소송 가능</li>
          <li>금융 자산을 제3자 명의로 이전 → 취소 사유</li>
          <li>소득을 신고하지 않고 현금으로 은닉 → 취소 사유</li>
          <li>취소 시 원채무 전액 부활, 가압류·강제집행 재개</li>
          <li>재산 처분 전 반드시 신용회복위원회에 사전 상담</li>
        </ul>
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "재산 처분·변동 사전 상담, 채무조정 취소 예방 지원",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 73: 개인회생 신청 소득 상한 총채무 절차 ──
  "individual-rehabilitation-income-debt-limit-procedure": {
    "after-1": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "신청서 접수", desc: "법원에 신청서·채권자 목록·재산 목록·수입·지출 명세서 제출" },
          { step: "2", title: "법원 심사·개시 결정", desc: "법원이 서류 검토 후 개시 결정 시 채권자 강제집행 자동 중지" },
          { step: "3", title: "채권자 집회·이의", desc: "채권자 집회에서 변제 계획에 대한 이의 수렴" },
          { step: "4", title: "변제 계획 인가", desc: "법원 인가 결정 → 채권자 동의 없이 확정" },
          { step: "5", title: "변제 실행", desc: "급여소득자 36개월·영업소득자 60개월 변제 이행" },
          { step: "6", title: "면책 결정", desc: "변제 완료 후 잔여 채무 면책, 신용 회복 시작" },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "대한법률구조공단",
            description: "개인회생 신청 서류 작성, 무료 법률 지원, 변제 계획안 상담",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 74: 개인회생 변제금 가처분소득·비면책 채권 ──
  "rehabilitation-repayment-disposable-income-non-exempt-claims": {
    "top": (
      <StatCard
        items={[
          { label: "변제금 산정 공식", value: "소득 − 생계비", sub: "= 가처분소득" },
          { label: "급여소득자 변제 기간", value: "36개월", sub: "3년 성실 변제 후 면책" },
          { label: "영업소득자 변제 기간", value: "60개월", sub: "5년 성실 변제 후 면책" },
          { label: "총채무 상한", value: "담보 15억 / 무담보 10억", sub: "초과 시 개인파산 검토" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="개인회생 면책 채권 vs 비면책 채권"
        columns={[
          { name: "채권 유형" },
          { name: "면책 여부" },
          { name: "비고" },
        ]}
        rows={[
          { label: "일반 금융 채무(대출·카드)", values: ["면책 ○", "변제 완료 후 탕감"] },
          { label: "조세·국세·지방세", values: ["비면책 ×", "별도 납부 필요"] },
          { label: "양육비·부양료", values: ["비면책 ×", "가정법원 통해 처리"] },
          { label: "벌금·과료·몰수·추징", values: ["비면책 ×", "별도 납부 필요"] },
          { label: "고의 불법행위 손해배상", values: ["비면책 ×", "민사 청구 가능"] },
          { label: "근로자 임금·퇴직금", values: ["비면책 ×", "우선변제 청구 가능"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "대한법률구조공단",
            description: "개인회생 변제금 산정, 비면책 채권 처리 방법, 무료 법률 지원",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 75: 개인파산 신청 자격 면책 제도 ──
  "personal-bankruptcy-eligibility-discharge-procedure": {
    "after-2": (
      <AccordionChecklist
        groups={[
          {
            title: "신분 및 현황 서류",
            items: [
              "파산·면책 신청서 (법원 양식)",
              "주민등록등본 (3개월 이내 발급)",
              "가족관계증명서",
              "인감증명서 또는 본인서명사실확인서",
            ],
          },
          {
            title: "재산·부채 관련 서류",
            items: [
              "채권자 목록 (채권자별 채권 금액 포함)",
              "재산 목록 (부동산·차량·금융 자산 전체)",
              "부동산 등기부등본 (보유 시)",
              "차량 등록원부 (보유 시)",
            ],
          },
          {
            title: "소득·지출 증빙 서류",
            items: [
              "급여 명세서 또는 근로소득 원천징수영수증",
              "건강보험료 납부확인서",
              "월 지출 명세서 (생활비 내역)",
            ],
          },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회 (개인회생·파산 지원)",
            description: "개인파산 신청 서류 작성 지원, 법원 비용 면제, 접수 동행",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 76: 개인파산 비면책 채권·면책 불허가 사유 ──
  "bankruptcy-non-dischargeable-debts-discharge-denial": {
    "after-1": (
      <WarningBox type="danger" title="면책이 불허될 수 있는 주요 사유">
        <ul className="list-disc pl-4 space-y-1 text-sm">
          <li>도박·사치·낭비로 과도하게 채무를 늘린 경우</li>
          <li>재산을 고의로 은닉하거나 허위 신고한 경우</li>
          <li>채권자 목록에서 일부 채권자를 의도적으로 누락한 경우</li>
          <li>특정 채권자에게만 편파적으로 변제한 경우</li>
          <li>이전 파산·면책 결정 후 일정 기간이 경과하지 않은 경우</li>
        </ul>
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "면책 불허가 사유 사전 확인, 취약채무자 신속면책 신청 지원",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 77: 신용회복위원회 개인회생·파산 법률 지원 ──
  "ccrs-rehabilitation-bankruptcy-legal-support-eligibility": {
    "after-0": (
      <ComparisonTable
        title="신용회복위원회 개인회생·파산 지원 내용"
        columns={[
          { name: "지원 항목" },
          { name: "지원 내용" },
          { name: "비고" },
        ]}
        rows={[
          { label: "서류 작성 지원", values: ["신청서·채권자 목록 등 대행", "담당 직원 동행"] },
          { label: "법원 인지대·송달료", values: ["면제 가능", "소득·재산 요건 충족 시"] },
          { label: "법원 접수 동행", values: ["지원", "보정 명령 대응 포함"] },
          { label: "절차 중 상담", values: ["지속 지원", "채권자 집회·심문 안내"] },
          { label: "이행 중 사후 상담", values: ["가능", "변제금 재산정 등"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "개인회생·파산 법률 지원 신청, 소득·재산 요건 확인 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 78: 신용회복위원회 소액금융 지원 제도 ──
  "ccrs-microloan-program-post-debt-adjustment-eligibility": {
    "after-2": (
      <WarningBox type="warning" title="소액금융 심사 탈락 주요 사유">
        <ul className="list-disc pl-4 space-y-1 text-sm">
          <li>소득 불안정 또는 무소득 (상환 능력 미충족)</li>
          <li>최근 연체·미납 이력 (신용 상태 불량)</li>
          <li>소득 대비 기존 부채 비율 과다</li>
          <li>채무조정 이행 기간 6개월 미충족</li>
          <li>소액금융 지원 재원 소진 (신청 시점 문제)</li>
        </ul>
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "소액금융 지원 자격 상담, 신청 방법 안내, 탈락 시 재신청 조건 확인",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 79: 신용회복 소액대출 인터넷 신청 방법 ──
  "ccrs-microloan-online-application-documents-processing-time": {
    "after-1": (
      <AccordionChecklist
        groups={[
          {
            title: "기본 신분 서류",
            items: [
              "신분증 사본",
              "주민등록등본 (3개월 이내 발급)",
              "건강보험료 납부확인서",
            ],
          },
          {
            title: "소득 증빙 서류",
            items: [
              "근로소득 원천징수영수증 또는 사업소득 확인서",
              "급여 명세서 최근 3개월분",
              "금융거래 확인서 (무소득자)",
            ],
          },
          {
            title: "채무조정 이행 서류 (해당자)",
            items: [
              "채무조정 협약서 사본",
              "성실상환 이행 확인서 (6개월 이상)",
            ],
          },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "소액대출 온라인·방문 신청, 필요 서류 확인, 심사 진행 상황 문의",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 80: 신용회복 소액대출 이자율·한도·담보 ──
  "ccrs-microloan-interest-rate-limit-no-collateral": {
    "after-0": (
      <ComparisonTable
        title="신용회복위원회 소액대출 주요 조건"
        columns={[
          { name: "항목" },
          { name: "내용" },
          { name: "비고" },
        ]}
        rows={[
          { label: "금리 수준", values: ["연 2~5% 수준 저금리", "상품·시점별 상이"] },
          { label: "최대 한도", values: ["최대 1,500만 원", "성실상환 소액대출 기준"] },
          { label: "담보·보증인", values: ["원칙 불필요", "신용 심사로 대체"] },
          { label: "본인 신청", values: ["원칙 본인 직접", "특수 사정 시 위임 가능"] },
          { label: "신청 방법", values: ["온라인·방문 모두 가능", "ccrs.or.kr 또는 지역지부"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "소액대출 금리·한도 확인, 담보 없는 신청 방법, 상품별 조건 문의",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 81: 신용회복 소액대출 상환일 변경·중도상환·자동이체 ──
  "ccrs-microloan-repayment-date-change-early-payoff-autotransfer": {
    "after-0": (
      <WarningBox type="info" title="상환일·자동이체 관련 주요 주의사항">
        <ul className="list-disc pl-4 space-y-1 text-sm">
          <li>상환일이 공휴일이면 → 다음 영업일 자동 처리 (자동이체 설정 시)</li>
          <li>자동이체 계좌 변경 → 다음 상환일 7영업일 전까지 신청 필요</li>
          <li>중도 상환 전 → 수수료 발생 여부 사전 확인</li>
          <li>상환일 변경 → 신용회복위원회에 별도 신청 (횟수 제한 있을 수 있음)</li>
        </ul>
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "상환일 변경, 자동이체 계좌 변경, 중도 상환 문의",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 82: 신용회복 소액대출 연체 불이익 ──
  "ccrs-microloan-overdue-penalty-existing-delinquency": {
    "after-0": (
      <WarningBox type="danger" title="소액대출 연체 시 발생하는 불이익">
        <ul className="list-disc pl-4 space-y-1 text-sm">
          <li>연체 이자 발생 (약정 이율 초과 적용)</li>
          <li>연체 발생 후 10~30일 내 신용정보 등록 → 신용점수 하락</li>
          <li>장기 연체 시 채권 추심 시작 (전화·내용증명·법적 조치)</li>
          <li>채무조정 이행 중이라면 → 취소 위험 발생</li>
          <li>연체 예상 시 즉시 1600-5500 연락 → 유예·조정 상담 가능</li>
        </ul>
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "소액대출 연체 위기 상담, 상환 유예·조정, 채무조정 통합 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 83: 신용회복 소액대출 추가·완제 후 반환금·재이용 ──
  "ccrs-microloan-additional-loan-payoff-refund-inquiry": {
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "추가 대출 가능 여부, 완제 후 반환금 확인, 상환 내역 조회, 재신청 조건 문의",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 84: 성실상환자 소액신용카드 지원 자격·제외 조건 ──
  "ccrs-good-payer-credit-card-eligibility-exclusion": {
    "after-1": (
      <ComparisonTable
        title="소액신용카드 vs 체크카드 신청 가능 조건"
        columns={[
          { name: "구분" },
          { name: "소액신용카드", highlight: true },
          { name: "체크카드" },
        ]}
        rows={[
          { label: "신청 자격", values: ["성실상환 6개월 이상", "성실상환 6개월 이상"] },
          { label: "결제 방식", values: ["후불 (신용 한도 내)", "선불 (계좌 잔액 내)"] },
          { label: "초기 한도", values: ["30만 원 내외", "계좌 잔액"] },
          { label: "미납 위험", values: ["있음 (관리 필요)", "없음"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "소액신용·체크카드 신청 자격 및 이행 현황 문의",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 85: 소액신용카드 신청 방법·서류·디지털상담 ──
  "ccrs-credit-card-application-documents-online": {
    "after-1": (
      <AccordionChecklist
        groups={[
          {
            title: "온라인 신청 시 필요 사항",
            items: [
              "공동인증서 (본인 확인용)",
              "채무조정 이행 현황 (온라인 자동 연동)",
            ],
          },
          {
            title: "방문 신청 시 필요 서류",
            items: [
              "신분증 (주민등록증·운전면허증 등)",
              "채무조정 이행 확인서",
            ],
          },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "소액신용카드 신청 방법 및 필요 서류 사전 확인",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 86: 소액신용카드 한도·종류 비교·해지 후 재발급 ──
  "ccrs-credit-card-limit-type-reissue": {
    "after-0": (
      <ComparisonTable
        title="소액신용카드 vs 체크카드 비교"
        columns={[
          { name: "항목" },
          { name: "소액신용카드", highlight: true },
          { name: "체크카드" },
        ]}
        rows={[
          { label: "결제 방식", values: ["후불 결제", "계좌 잔액 내 결제"] },
          { label: "초기 한도", values: ["30만 원 내외", "계좌 잔액"] },
          { label: "미납 위험", values: ["있음", "없음"] },
          { label: "현금서비스", values: ["제한 가능", "해당 없음"] },
          { label: "추천 대상", values: ["지출 관리 자신 있는 분", "지출 관리 어려운 분"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "카드 종류 선택 및 해지·재발급 가능 여부 문의",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 87: 디지털상담 본인인증·로그인·합의서 ──
  "ccrs-digital-consultation-login-auth-agreement": {
    "after-2": (
      <WarningBox
        type="warning"
        title="접수 완료 후 내용 수정이 불가해요"
      >
        <ul className="list-disc pl-4 space-y-1">
          <li>접수 전에 채무 금액, 채권자 정보, 연락처 등을 꼼꼼히 확인하세요.</li>
          <li>접수 완료 후 수정이 필요하면 1600-5500으로 연락해 요청해야 해요.</li>
          <li>합의서 서명 전에 내용을 충분히 검토하고 서명하세요.</li>
        </ul>
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "디지털상담 인증 오류 및 접수 내용 수정 문의",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 88: 디지털상담 프로그램 설치·환경 설정 ──
  "ccrs-digital-consultation-program-setup": {
    "after-2": (
      <WarningBox
        type="tip"
        title="디지털상담 접속 오류 시 확인 순서"
      >
        <ul className="list-disc pl-4 space-y-1">
          <li>보안 프로그램이 최신 버전인지 먼저 확인하세요.</li>
          <li>브라우저를 크롬·엣지 등 최신 버전으로 바꿔보세요.</li>
          <li>여러 방법을 시도해도 안 되면 1600-5500에 기술 지원을 요청하세요.</li>
        </ul>
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "디지털상담 프로그램 설치 및 접속 오류 기술 지원",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 89: 방문 상담 예약 필수 여부·변경·취소·미방문 불이익 ──
  "ccrs-visit-reservation-required-change-cancel-penalty": {
    "after-2": (
      <WarningBox
        type="warning"
        title="예약 미방문이 반복되면 예약이 제한돼요"
      >
        <ul className="list-disc pl-4 space-y-1">
          <li>방문이 어렵다면 반드시 전날까지 취소 또는 변경 처리하세요.</li>
          <li>당일 갑자기 못 가게 됐다면 1600-5500에 바로 연락해 취소하세요.</li>
          <li>반복 미방문 시 예약 이용 제한과 채무조정 처리 지연이 생길 수 있어요.</li>
        </ul>
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "방문 상담 예약·변경·취소 및 지역지부 안내",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 90: 개인워크아웃 공공정보 조기해제·추가 이자율 인하 ──
  "workout-public-info-early-removal-interest-rate": {
    "after-0": (
      <ProcessTimeline
        steps={[
          { step: "1단계", title: "1년 성실 납입", desc: "채무조정 확정 후 연체 없이 1년 이상 납입" },
          { step: "2단계", title: "조기해제 신청", desc: "신용회복위원회 방문 또는 홈페이지에서 신청" },
          { step: "3단계", title: "신용정보원 삭제", desc: "공공정보 삭제 처리 완료" },
          { step: "4단계", title: "신용점수 반영", desc: "해제 후 1~2개월 내 신용평가사 반영" },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "공공정보 조기해제 및 추가 이자율 인하 신청 문의",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 91: 채무조정 일시완제 추가 원금 감면·성실상환 혜택 전체 정리 ──
  "debt-lump-payoff-extra-reduction-benefits": {
    "top": (
      <StatCard
        items={[
          { label: "성실상환자 혜택 수", value: "6가지+", sub: "공공정보 조기해제·이자율 인하·소액카드·크레딧점프·전세보증·건보료 지원" },
          { label: "일시완제 추가 감면", value: "사전 확인 필수", sub: "신용회복위원회(1600-5500) 감면 조건 확인 후 진행" },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "일시완제 감면 조건 및 성실상환 혜택 전체 안내",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
          {
            name: "국민건강보험공단",
            description: "체납 건강보험료 지원 신청 문의",
            phone: "1577-1000",
            hours: "평일 09:00~18:00",
            url: "https://www.nhis.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 92: 성실상환 신용상승 지원사업 크레딧점프 ──
  "good-payer-credit-score-rise-jump-program": {
    "after-0": (
      <ProcessTimeline
        steps={[
          { step: "1단계", title: "1년 성실 납입", desc: "연체 없이 변제금 꾸준히 납입" },
          { step: "2단계", title: "공공정보 조기해제 신청", desc: "신용회복위원회에 조기해제 신청" },
          { step: "3단계", title: "크레딧점프 신청", desc: "신용회복위원회에 신용상승 지원사업 신청" },
          { step: "4단계", title: "신용점수 반영", desc: "성실상환 내역이 신용정보원→신용평가사에 반영" },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "신용상승 지원사업(크레딧점프) 신청 및 조건 문의",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 93: 채무조정 실효 원인·재조정·상환유예 신청 ──
  "debt-adjustment-lapse-readjustment-application": {
    "after-0": (
      <WarningBox
        type="warning"
        title="실효 전에 재조정 신청이 핵심이에요"
      >
        <ul className="list-disc pl-4 space-y-1">
          <li>3회 연속 미납 또는 누적 6회 이상 미납 시 실효될 수 있어요.</li>
          <li>납입이 어려워지면 미납 전에 즉시 재조정을 신청하세요.</li>
          <li>실효되면 원채무(이자 포함)가 부활해 추심이 시작될 수 있어요.</li>
        </ul>
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "재조정·상환유예 신청 및 실효 관련 긴급 문의",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 94: 채무조정 수정조정·효력부활·이행기간 중 면책 ──
  "modification-revival-midterm-debt-exemption": {
    "after-1": (
      <ComparisonTable
        title="수정조정 vs 효력부활 vs 재조정 비교"
        columns={[
          { name: "구분" },
          { name: "수정조정", highlight: true },
          { name: "효력부활" },
          { name: "재조정" },
        ]}
        rows={[
          { label: "사용 시점", values: ["채무 추가·조건 변경 필요 시", "실효 후 재개 시", "납입 어려움 예상 시"] },
          { label: "전제 조건", values: ["31일 이상 연체 채무 존재", "미납 변제금 납부 완료", "사정 변경 사유 있음"] },
          { label: "주요 효과", values: ["새 채무 포함·조건 변경", "기존 계획 그대로 재개", "기간 연장·변제금 감액"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "수정조정·효력부활·이행기간 중 면책 신청 문의",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 95: 주택담보대출 채무조정 이자율·상환기간·담보 무담보 차이 ──
  "mortgage-debt-adjustment-rate-period-difference": {
    "after-2": (
      <ComparisonTable
        title="담보대출 vs 무담보 채무조정 비교"
        columns={[
          { name: "항목" },
          { name: "주택담보대출", highlight: true },
          { name: "무담보 채무" },
        ]}
        rows={[
          { label: "원금 감면", values: ["어려운 경우 많음", "가능한 경우 있음"] },
          { label: "이자율 인하", values: ["제한적", "상대적으로 유연"] },
          { label: "기간 연장", values: ["가능 (담보 가치 고려)", "가능"] },
          { label: "경매 연계", values: ["있음 (빠른 접수 필요)", "해당 없음"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "주택담보대출 채무조정 포함 여부 및 경매 대응 긴급 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 96: 소상공인 새출발기금 중개형·부실우려차주·신용회복위원회 연계 ──
  "new-start-fund-sme-bad-debtor-ccrs-process": {
    "after-0": (
      <ComparisonTable
        title="새출발기금 부실우려차주 vs 부실차주 비교"
        columns={[
          { name: "구분" },
          { name: "부실우려차주", highlight: true },
          { name: "부실차주" },
        ]}
        rows={[
          { label: "연체 기준", values: ["90일 미만", "90일 이상"] },
          { label: "주요 지원", values: ["이자 감면·기간 연장", "원금 감면 가능"] },
          { label: "공공정보 등록", values: ["없음", "이미 영향 있을 수 있음"] },
          { label: "신청 서둘러야 하는 이유", values: ["빠를수록 신용 보호 유리", "조속한 조정으로 추심 중단"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "소상공인 새출발기금 중개형 접수 및 대상 여부 확인",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 97: 새도약기금 7년 장기연체 채권 자동매입·새도약론 ──
  "new-leap-fund-long-overdue-auto-purchase-loan": {
    "after-0": (
      <ProcessTimeline
        steps={[
          { step: "1단계", title: "자동 매입", desc: "2018년 6월 이전 7년 이상 연체 채권 자동 매입" },
          { step: "2단계", title: "안내 통지", desc: "채무자에게 변제 계획 안내 통지 발송" },
          { step: "3단계", title: "동의 및 확정", desc: "변제 계획에 동의하면 채무조정 확정" },
          { step: "4단계", title: "새도약론 신청", desc: "확정 후 6개월 성실 상환 시 저금리 대출 신청 가능" },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "새도약기금 대상 여부 및 변제 계획 확인 문의",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 98: 금융회사 자체 채무조정 vs 신용회복위원회 워크아웃 ──
  "financial-institution-self-debt-adjustment-comparison": {
    "after-1": (
      <ComparisonTable
        title="금융회사 자체 채무조정 vs 신용회복위원회 워크아웃"
        columns={[
          { name: "항목" },
          { name: "자체 채무조정" },
          { name: "신용회복 워크아웃", highlight: true },
        ]}
        rows={[
          { label: "적용 범위", values: ["해당 금융회사 채무만", "여러 금융회사 통합"] },
          { label: "공공정보 등록", values: ["없음", "확정 시 등록"] },
          { label: "원금 감면", values: ["어려운 경우 많음", "가능한 경우 있음"] },
          { label: "처리 기간", values: ["2~4주 (금융회사 기준)", "접수~협의 후 확정"] },
          { label: "추천 상황", values: ["단일 금융회사 채무", "다수 금융회사 채무"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "금융회사 자체 조정과 워크아웃 중 유리한 방법 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 99: 신용회복위원회 금융·고용·복지·복합지원 연계 ──
  "ccrs-financial-employment-welfare-combined-support": {
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "금융·고용·복지·법률 복합지원 연계 종합 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
          {
            name: "국민건강보험공단",
            description: "체납 건강보험료 지원 및 복지 연계 문의",
            phone: "1577-1000",
            hours: "평일 09:00~18:00",
            url: "https://www.nhis.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 100: 신용회복위원회 신용복지 컨설팅·소상공인 재기 맞춤 상담 ──
  "credit-welfare-consulting-sme-restart-support": {
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용회복위원회",
            description: "신용복지 컨설팅 신청 및 소상공인 재기 지원 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 101: 신용회복위원회 온라인 신용교육 무료·찾아가는 교육 ──
  "ccrs-credit-education-online-free-visiting": {
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "신용교육원",
            description: "온라인 신용교육 무료 수강 및 과정 확인",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 102: 불법사금융 연이율 60% 초과 무효·피해 신고 구제 흐름 ──
  "illegal-lending-60pct-void-damage-report-process": {
    "after-0": (
      <WarningBox
        type="danger"
        title="연이율 60% 초과 대출은 원금·이자 모두 무효예요 (2025.7.22~)"
      >
        <ul className="list-disc pl-4 space-y-1">
          <li>갚지 않아도 되며, 이미 납부한 금액은 반환 청구가 가능해요.</li>
          <li>해당 대출에 대한 추심이 계속된다면 즉시 신고하세요.</li>
          <li>금융감독원(☎1332) 또는 경찰청(☎112)에 신고하면 돼요.</li>
        </ul>
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "금융감독원 불법사금융 신고센터",
            description: "불법사금융 피해 신고 및 구제 절차 안내",
            phone: "1332",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
          {
            name: "신용회복위원회",
            description: "불법사금융 피해구제 연계 및 채무조정 상담",
            phone: "1600-5500",
            hours: "평일 09:00~18:00",
            url: "https://www.ccrs.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 40: 이혼 결심·협의이혼·재판이혼 비교 ──
  "이혼결심-협의이혼-재판이혼-비교": {
    "top": (
      <StatCard
        items={[
          { label: "협의이혼 숙려기간", value: "1~3개월", sub: "자녀 없음 1개월 / 있음 3개월" },
          { label: "재산분할 청구 기한", value: "이혼 후 2년", sub: "제척기간, 연장 불가" },
          { label: "위자료 청구 기한", value: "이혼 후 3년", sub: "소멸시효" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="협의이혼 vs 재판이혼 선택 기준"
        columns={[
          { name: "협의이혼" },
          { name: "재판이혼", highlight: true },
        ]}
        rows={[
          { label: "합의 필요 여부", values: ["쌍방 합의 필수", "불필요 (법원 결정)"] },
          { label: "이혼 사유", values: ["제한 없음", "민법 제840조 사유 필요"] },
          { label: "소요 기간", values: ["1~3개월", "6개월~1년 이상"] },
          { label: "비용", values: ["저렴", "변호사비 포함 고비용"] },
          { label: "유리한 상황", values: ["합의 가능·갈등 적음", "합의 불가·유책사유 있음"] },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "대한법률구조공단",
            description: "이혼 준비 무료 법률 상담 및 소송 지원",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 41: 상속포기 서류 목록 | 가정법원 신고 절차 ──
  "sangsokpogi-seoryu-mokrok-gajeonbeopwon-singyo": {
    "after-0": (
      <DateCalculator
        title="상속포기 신청 기한 계산기"
        description="피상속인 사망(상속 개시 있음을 안 날)을 기준일로 선택하면 3개월 기한 만료일을 계산해요."
        presets={[
          { label: "상속포기 신청 기한 3개월", days: 90, description: "상속 개시 있음을 안 날 기준" },
        ]}
      />
    ),
    "after-1": (
      <AccordionChecklist
        groups={[
          {
            title: "상속포기 신청 서류 (기본)",
            items: [
              "상속포기 신고서 1부 (인감도장 날인)",
              "신고인의 인감증명서 (6개월 이내) — 또는 본인서명사실확인서",
              "신고인의 가족관계증명서 (3개월 이내)",
              "신고인의 기본증명서 (3개월 이내)",
              "피상속인의 기본증명서 (사망 기재된 것)",
              "피상속인의 가족관계증명서",
            ],
          },
          {
            title: "미성년 상속인이 있는 경우 추가 서류",
            items: [
              "법정대리인의 인감증명서",
              "법정대리인의 기본증명서",
              "이해충돌 시 특별대리인 선임 심판서",
            ],
          },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="후순위 상속인에게 채무가 연쇄 이전될 수 있어요">
        선순위가 포기하면 2순위(직계존속), 3순위(형제자매) 순으로 채무가 넘어가요. 후순위 상속인도 각자 3개월 이내에 포기 신청을 해야 해요. 후순위 보호가 필요하다면 한정승인을 검토하세요.
      </WarningBox>
    ),
  },

  // ── Article 42: 한정승인 신청 서류 | 상속재산목록 작성 방법 ──
  "hanjeongseugin-singyo-seoryu-jaesanmokrok": {
    "after-0": (
      <DateCalculator
        title="한정승인 신청 기한 계산기"
        description="피상속인 사망(상속 개시 있음을 안 날)을 기준일로 선택하면 3개월 기한 만료일을 계산해요."
        presets={[
          { label: "한정승인 신청 기한 3개월", days: 90, description: "상속 개시 있음을 안 날 기준" },
          { label: "채권자 공고 최소 기간 2개월", days: 60, description: "한정승인 수리 후 공고 기간" },
        ]}
      />
    ),
    "after-1": (
      <AccordionChecklist
        groups={[
          {
            title: "한정승인 신청 서류 (기본)",
            items: [
              "한정승인 신고서 1부 (인감도장 날인)",
              "상속재산목록 1부",
              "신고인의 인감증명서 (6개월 이내) — 또는 본인서명사실확인서",
              "신고인의 가족관계증명서 (3개월 이내)",
              "신고인의 기본증명서 (3개월 이내)",
              "피상속인의 기본증명서 (사망 기재된 것)",
              "피상속인의 가족관계증명서",
            ],
          },
          {
            title: "상속재산목록 기재 항목",
            items: [
              "적극재산: 부동산, 예금, 보험 해약환급금, 자동차, 주식, 임차보증금",
              "소극재산: 금융기관 대출, 카드 빚, 개인 채무, 보증 채무, 미납 세금",
              "각 항목별 종류·소재지(계좌 정보)·평가 금액 기재",
            ],
          },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="채권자 공고를 5일 이내에 반드시 해야 해요">
        한정승인 수리 후 5일 이내에 일간신문에 채권자 공고를 내야 해요(민법 제1032조). 공고 기간 중 상속재산을 임의로 처분하면 단순승인으로 간주될 수 있어요. 알고 있는 채권자에게는 개별 통지도 해야 해요.
      </WarningBox>
    ),
  },

  // ── Article 43: 한정승인 상속포기 차이 | 후순위 연쇄 상속 비교 ──
  "hanjeongseugin-sangsokpogi-chai-husunwi-bigyo": {
    top: (
      <ComparisonTable
        title="한정승인 vs 상속포기 한눈에 비교"
        columns={[
          { name: "한정승인", highlight: true },
          { name: "상속포기" },
        ]}
        rows={[
          { label: "후순위 연쇄 승계", values: ["없음", "있음"] },
          { label: "재산 보전", values: ["채무 변제 후 잔여 유지", "재산 전부 포기"] },
          { label: "절차 복잡도", values: ["복잡 (재산목록+공고)", "간단"] },
          { label: "신문공고 의무", values: ["있음 (수리 후 5일 이내)", "없음"] },
          { label: "채무 면제 범위", values: ["재산 초과분 면제", "전액 면제"] },
          { label: "유리한 상황", values: ["재산 있음·후순위 보호 필요", "재산 없음·전원 포기 동의"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="info" title="신문공고 비용은 10만~30만 원 수준이에요">
        한정승인 후 채권자 공고는 전국 또는 지역 일간지에 1회 게재해요. 게재 후 확인 사본을 반드시 보관하세요. 알고 있는 채권자에게는 개별 통지(내용증명 등)도 함께 발송해야 해요.
      </WarningBox>
    ),
  },

  // ── Article 44: 특별한정승인 신청 요건 | 단순승인 후 채무 초과 발견 ──
  "teukbyeol-hanjeongseugin-singyo-yogeon": {
    "after-0": (
      <WarningBox type="warning" title="채무 초과 사실을 안 날로부터 3개월 이내에 신청해야 해요">
        특별한정승인은 채무 초과 사실을 알게 된 날이 기산점이에요. 채권자 청구서·지급명령을 받은 날, 채무 조회 결과를 확인한 날 등이 시작점이 될 수 있어요. 3개월을 놓치면 구제받기 어려우니 즉시 행동하세요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "대한법률구조공단",
            description: "특별한정승인 무료 법률 상담 및 소송 지원",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
          {
            name: "대법원 전자가족관계등록시스템",
            description: "가족관계증명서·기본증명서 온라인 발급",
            url: "https://efamily.scourt.go.kr",
            urlLabel: "증명서 발급 바로가기",
          },
        ]}
      />
    ),
  },

  // ── Article 46: 상속세 세율 구간 계산 | 과세표준 공제 후 납부액 ──
  "sangsokse-seyul-guwon-gyesan-gwasepyojun": {
    "after-0": (
      <ComparisonTable
        title="상속세 과세표준 구간별 세율표"
        columns={[
          { name: "과세표준 구간" },
          { name: "세율", highlight: true },
          { name: "누진공제" },
        ]}
        rows={[
          { label: "1억원 이하", values: ["1억원 이하", "10%", "없음"] },
          { label: "1억~5억원", values: ["1억원 초과~5억원 이하", "20%", "1천만원"] },
          { label: "5억~10억원", values: ["5억원 초과~10억원 이하", "30%", "6천만원"] },
          { label: "10억~30억원", values: ["10억원 초과~30억원 이하", "40%", "1억6천만원"] },
          { label: "30억원 초과", values: ["30억원 초과", "50%", "4억6천만원"] },
        ]}
      />
    ),
    "after-2": (
      <StatCard
        items={[
          { label: "과세표준 7억원 산출세액", value: "1억5천만원", sub: "7억 × 30% − 6천만원 = 1.5억" },
          { label: "과세표준 3억원 산출세액", value: "4천만원", sub: "3억 × 20% − 1천만원 = 4천만원" },
          { label: "최고 세율", value: "50%", sub: "과세표준 30억원 초과 구간" },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="10년 이내 사전증여는 과세표준에 합산돼요">
        상속 개시 10년 이내에 상속인에게 증여한 재산은 상속세 과세가액에 합산돼요. 합산되면 세율 구간이 올라갈 수 있어요. 10년을 넘긴 증여만 과세표준에서 제외돼요.
      </WarningBox>
    ),
  },

  // ── Article 47: 상속세 신고 기한 6개월 | 미신고 가산세 금액 ──
  "sangsokse-singyo-gihan-misingo-gasanse": {
    "after-0": (
      <DateCalculator
        title="상속세 신고 기한 계산기"
        description="피상속인 사망일이 속한 달의 말일을 기준일로 선택하면 신고 기한 만료일을 계산해요."
        presets={[
          { label: "상속세 신고 기한 6개월", days: 180, description: "상속개시일이 속하는 달 말일 기준" },
          { label: "외국 거주자 신고 기한 9개월", days: 270, description: "피상속인·상속인 전원 외국 주소 시" },
        ]}
      />
    ),
    "after-1": (
      <StatCard
        items={[
          { label: "일반 무신고 가산세", value: "20%", sub: "납부세액 기준" },
          { label: "부정 무신고 가산세", value: "40%", sub: "의도적 누락 등" },
          { label: "납부 지연 가산세", value: "하루 0.022%", sub: "미납 세액 × 일수" },
          { label: "일반 과소신고 가산세", value: "10%", sub: "과소신고 납부세액 기준" },
        ]}
      />
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "국세청 홈택스",
            description: "상속세 신고·납부 온라인 신청",
            url: "https://www.hometax.go.kr",
            urlLabel: "홈택스 바로가기",
          },
          {
            name: "국세상담센터",
            description: "상속세 신고·납부 전화 상담",
            phone: "126",
            hours: "평일 09:00~18:00",
          },
        ]}
      />
    ),
  },

  // ── Article 48: 유류분 반환청구 소멸시효 | 생전 증여 포함 계산 ──
  "yurubun-hwanwancheongu-somelsiyo-saengjeon-jeungyeo": {
    "after-0": (
      <StatCard
        items={[
          { label: "단기 시효", value: "1년", sub: "유류분 침해 사실을 안 날로부터" },
          { label: "장기 시효", value: "10년", sub: "상속 개시일(사망일)로부터 절대 기한" },
          { label: "상속인 생전증여 포함", value: "기간 제한 없음", sub: "상속인에 대한 증여 전부 합산" },
          { label: "상속인 외 생전증여", value: "1년 이내", sub: "사망 전 1년 이내 증여만 합산" },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="info" title="원물반환이 원칙이지만 가액반환도 가능해요">
        수증자가 재산을 이미 팔았거나 나누기가 곤란하면 가액(돈)으로 반환받을 수 있어요. 가액 기준은 상속 개시 당시 시가예요. 협의가 안 되면 소송으로 법원이 방식을 결정해요.
      </WarningBox>
    ),
    "after-3": (
      <ContactCard
        contacts={[
          {
            name: "대한법률구조공단",
            description: "유류분 반환청구 무료 법률 상담 및 소송 지원",
            phone: "132",
            hours: "평일 09:00~18:00",
            url: "https://www.klac.or.kr",
          },
        ]}
      />
    ),
  },

  // ── Article 49: 유류분 비율 직계비속 배우자 | 형제자매 헌법불합치 영향 ──
  "yurubun-biyul-jikyebisok-baeuija-hyeongje": {
    top: (
      <ComparisonTable
        title="상속인별 유류분 비율"
        columns={[
          { name: "상속인 구분" },
          { name: "법정상속분", highlight: true },
          { name: "유류분 비율" },
        ]}
        rows={[
          { label: "직계비속 (자녀 등)", values: ["직계비속", "법정상속분", "법정상속분의 1/2"] },
          { label: "배우자", values: ["배우자", "직계비속 1인분 × 1.5배", "법정상속분의 1/2"] },
          { label: "직계존속 (부모 등)", values: ["직계존속", "법정상속분", "법정상속분의 1/3"] },
          { label: "형제자매", values: ["형제자매", "법정상속분", "헌법불합치(사실상 폐지)"] },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="warning" title="2024년 헌법불합치 결정으로 형제자매 유류분은 사실상 폐지됐어요">
        헌재는 2024년 4월 25일 형제자매 유류분 조항이 헌법에 합치하지 않는다고 결정했어요. 개정 시한(2025.12.31.)이 지난 현재 해당 조항의 효력이 상실됐을 가능성이 높아요. 형제자매가 유류분을 주장하는 소송은 기각될 수 있어요.
      </WarningBox>
    ),
  },

  // ── Article 50: 법정상속순위 배우자 자녀 | 부모 형제 상속 순서 ──
  "beopjeong-sangsoksunwi-baeuija-janyeo": {
    top: (
      <ProcessTimeline
        steps={[
          { step: "1순위", title: "직계비속 + 배우자", desc: "자녀·손자녀 등. 배우자는 직계비속 1인분의 1.5배" },
          { step: "2순위", title: "직계존속 + 배우자", desc: "부모·조부모 등. 직계비속이 없을 때. 배우자는 1.5배" },
          { step: "3순위", title: "형제자매 (+ 배우자)", desc: "직계비속·직계존속 모두 없을 때" },
          { step: "4순위", title: "4촌 이내 방계혈족", desc: "형제자매도 없을 때" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="배우자 + 자녀 상속분 계산 예시"
        columns={[
          { name: "상속인 구성" },
          { name: "배우자 몫" },
          { name: "자녀 1인 몫", highlight: true },
        ]}
        rows={[
          { label: "배우자 + 자녀 1명", values: ["배우자 + 자녀 1명", "3/5 (60%)", "2/5 (40%)"] },
          { label: "배우자 + 자녀 2명", values: ["배우자 + 자녀 2명", "3/7 (약 43%)", "2/7 (약 29%)"] },
          { label: "배우자 + 자녀 3명", values: ["배우자 + 자녀 3명", "3/9 = 1/3", "2/9 (약 22%)"] },
          { label: "배우자 단독 (자녀·부모 없음)", values: ["배우자 단독", "전액 (100%)", "해당 없음"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="info" title="형제자매 유류분은 사실상 폐지됐어요">
        3순위 형제자매는 상속권이 있지만 유류분 보장은 없어요. 피상속인이 유언으로 전 재산을 타인에게 주더라도 형제자매는 이의를 제기할 유류분 권리가 없어요. 형제자매가 상속인이 되는 상황이라면 유언장 확인과 상속 계획이 중요해요.
      </WarningBox>
    ),
  },

  // ── Article 45: 상속세 기초공제 일괄공제 | 배우자 상속공제 최대 금액 ──
  "sangsokse-gichocongje-iljalgongje-baeujaigongje": {
    top: (
      <StatCard
        items={[
          { label: "일괄공제", value: "5억 원", sub: "기초+인적공제 합계와 비교해 유리한 쪽 선택" },
          { label: "배우자 공제 최소", value: "5억 원", sub: "실제 상속액 없어도 공제 가능" },
          { label: "배우자 공제 최대", value: "30억 원", sub: "법정 상속분 한도 내 실수령액 기준" },
          { label: "동거주택 공제 한도", value: "6억 원", sub: "10년 이상 동거·1세대 1주택 요건" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="상속세 주요 공제 항목 비교"
        columns={[
          { name: "기초공제" },
          { name: "일괄공제", highlight: true },
          { name: "배우자 공제" },
        ]}
        rows={[
          { label: "공제 금액", values: ["2억 원", "5억 원", "5억~30억 원"] },
          { label: "적용 조건", values: ["기본 적용", "기초+인적공제 합 미만 시 선택", "배우자 실수령액 한도"] },
          { label: "중복 적용", values: ["가능", "인적공제와 대체", "가능"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="info" title="상속세 신고 기한은 사망일 다음 달 말일로부터 6개월이에요">
        기한 내에 신고하지 않으면 무신고 가산세(20%)와 납부 지연 가산세가 추가돼요. 금융재산 조회와 공제 항목 정리에 시간이 걸리니 사망 직후부터 준비를 시작하는 게 좋아요.
      </WarningBox>
    ),
  },

  // ── Article 51: 배우자 단독상속 요건 | 자녀 부모 없을 때 상속 범위 ──
  "baeuija-dandoksangsok-yogeon-hobeom": {
    top: (
      <StatCard
        items={[
          { label: "기초공제", value: "2억 원", sub: "단독상속 시 적용" },
          { label: "배우자 공제 최소", value: "5억 원", sub: "실제 수령액 없어도 보장" },
          { label: "배우자 공제 최대", value: "30억 원", sub: "법정상속분 한도 내 실수령액" },
          { label: "기초+배우자 합계", value: "최대 32억 원", sub: "이 범위 내면 상속세 없음" },
        ]}
      />
    ),
    "after-0": (
      <ProcessTimeline
        steps={[
          { step: "1단계", title: "직계비속 확인", desc: "자녀·손자녀 있으면 배우자와 공동상속 (1순위)" },
          { step: "2단계", title: "직계존속 확인", desc: "자녀 없고 부모·조부모 있으면 배우자와 공동상속 (2순위)" },
          { step: "3단계", title: "1·2순위 없음", desc: "직계비속·직계존속 모두 없으면 배우자 단독상속" },
          { step: "4단계", title: "형제자매 순위", desc: "배우자가 있는 한 형제자매(3순위)는 상속 불가" },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="사실혼 배우자는 법정상속권이 없어요">
        아무리 오랜 사실혼 관계여도 혼인신고가 없으면 상속권이 없어요. 사전에 공정증서 유언을 작성해 재산을 유증하는 방법을 검토하세요.
      </WarningBox>
    ),
  },

  // ── Article 52: 상속등기 필요 서류 목록 | 취득세 신고 기한 ──
  "sangsokdeunggi-seoryu-mokrok-cwiduksesingo": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "피상속인 서류",
            items: [
              "기본증명서 (사망 사실 포함)",
              "가족관계증명서",
              "주민등록말소자 초본",
              "제적등본 (2008년 이전 혼인·친자 이력)",
            ],
          },
          {
            title: "상속인 서류 (전원)",
            items: [
              "가족관계증명서 (각 1부)",
              "기본증명서 (각 1부)",
              "주민등록등본 (각 1부)",
              "신분증 사본",
            ],
          },
          {
            title: "협의분할 등기 추가 서류",
            items: [
              "상속재산분할협의서 (원본)",
              "인감증명서 (상속인 전원, 3개월 이내)",
              "취득세 납부 영수증",
            ],
          },
        ]}
      />
    ),
    "after-2": (
      <DateCalculator
        title="취득세 신고 기한 계산기"
        description="상속 개시일(사망일)을 선택하면 취득세 신고 기한을 계산해요."
        presets={[
          { label: "취득세 신고 기한 (6개월)", days: 183, description: "상속 개시일이 속한 달 말일 기준 6개월" },
          { label: "상속세 신고 기한 (6개월)", days: 183, description: "상속 개시일이 속한 달 말일 기준 6개월" },
        ]}
      />
    ),
  },

  // ── Article 53: 상속등기 협의분할 인감증명서 | 공동상속인 전원 동의 ──
  "sangsokdeunggi-hyeobuibunhal-ingamjeungmyeong": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "협의분할 단독 명의 등기 서류",
            items: [
              "상속재산분할협의서 (원본)",
              "상속인 전원 인감증명서 (3개월 이내)",
              "피상속인 기본증명서·가족관계증명서·제적등본",
              "상속인 전원 주민등록등본",
              "취득세 납부 영수증",
            ],
          },
          {
            title: "해외 거주 상속인 대체 서류",
            items: [
              "재외공관 서명공증 또는 해당국 공증인 공증",
              "아포스티유 인증 (협약 가입국)",
              "외국어 서류 한국어 번역 공증",
            ],
          },
        ]}
      />
    ),
    "after-3": (
      <StatCard
        items={[
          { label: "취득세 (일반 부동산)", value: "2.8%", sub: "지방교육세·농특세 별도" },
          { label: "취득세 (농지)", value: "2.3%", sub: "지방교육세 별도" },
          { label: "등기신청 수수료", value: "약 1.5만 원", sub: "건당" },
          { label: "인감증명서 발급비", value: "600원", sub: "읍면사무소·주민센터" },
        ]}
      />
    ),
  },

  // ── Article 54: 상속재산분할협의서 작성 방법 | 부동산 등기 제출 서류 ──
  "sangsok-bunhalhyeobuiseo-jakseong-bangbeop": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "협의서 필수 기재사항",
            items: [
              "피상속인 성명·주민등록번호·사망일·최후 주소",
              "상속인 전원의 성명·주민등록번호·주소",
              "분할 대상 재산 특정 (부동산 소재지·지번·면적)",
              "각 상속인이 취득할 재산 내역 (구체적으로)",
              "작성일자",
              "상속인 전원의 인감도장 날인",
            ],
          },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="상속인 일부를 빠뜨리면 협의서가 무효예요">
        상속인 전원이 참여하지 않은 협의서는 처음부터 무효예요. 제적등본으로 혼외 자녀·입양 자녀 여부를 반드시 확인하세요.
      </WarningBox>
    ),
  },

  // ── Article 55: 상속재산분할협의서 공증 | 인감증명서 대체 효력 ──
  "sangsok-bunhalhyeobuiseo-gongjeon-ingam": {
    top: (
      <StatCard
        items={[
          { label: "공증 비용 (1천만원 이하)", value: "약 1.1만 원", sub: "공증인 수수료 기준" },
          { label: "공증 비용 (1억원 이하)", value: "약 4.3만 원", sub: "5천만~1억원 구간" },
          { label: "인감증명서 발급비", value: "600원", sub: "공증 선택 시 불필요" },
          { label: "공정증서 원본 보관", value: "20년", sub: "공증기관 보관 기간" },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="상속세 신고 기한 후 재분할하면 증여세가 붙을 수 있어요">
        기한(6개월) 이후 협의를 변경하면 세무서가 이를 증여로 보아 증여세를 부과할 수 있어요. 협의분할은 기한 내에 완료하세요.
      </WarningBox>
    ),
    "after-3": (
      <DateCalculator
        title="상속세·협의분할 기한 계산기"
        description="상속 개시일(사망일)을 선택하면 주요 기한을 계산해요."
        presets={[
          { label: "상속세 신고 기한 (6개월)", days: 183, description: "무신고 시 가산세 20% 부과" },
          { label: "한정승인·상속포기 기한 (3개월)", days: 90, description: "상속 개시를 안 날로부터" },
        ]}
      />
    ),
  },

  // ── Article 56: 대습상속 요건 손자녀 | 상속결격 사망 인정 사유 ──
  "daesup-sangsok-yogeon-sonjanyeo-gyeolgyeok": {
    "after-0": (
      <ProcessTimeline
        steps={[
          { step: "원칙", title: "직계비속 상속", desc: "자녀·손자녀가 1순위 상속인" },
          { step: "대습 발생", title: "자녀 사망·결격", desc: "상속인이 될 자녀가 피상속인보다 먼저 사망하거나 결격" },
          { step: "대습상속", title: "손자녀가 대신", desc: "사망·결격된 자녀의 직계비속이 그 상속 순위를 이어받음" },
          { step: "상속분", title: "피대습인의 몫 그대로", desc: "손자녀 여러 명이면 피대습인 상속분을 균등 분할" },
        ]}
      />
    ),
    "after-3": (
      <ComparisonTable
        title="일반상속 vs 대습상속 비교"
        columns={[
          { name: "구분" },
          { name: "일반상속" },
          { name: "대습상속", highlight: true },
        ]}
        rows={[
          { label: "상속인", values: ["상속인", "자녀 본인", "손자녀(자녀의 자녀)"] },
          { label: "발생 요건", values: ["발생 요건", "피상속인 사망", "상속인 사망·결격 후 피상속인 사망"] },
          { label: "상속분", values: ["상속분", "법정 상속분", "피대습인의 상속분 그대로"] },
          { label: "포기 적용", values: ["포기 적용", "대습 가능", "포기 시 대습 불가"] },
        ]}
      />
    ),
  },

  // ── Article 57: 기여분 인정 기준 | 상속재산 분할 협의 반영 ──
  "giyeobun-injeonggijun-sangsok-bunhal": {
    top: (
      <StatCard
        items={[
          { label: "기여분 인정 비율 (판례)", value: "10~30%", sub: "기여 정도·기간·재산 증가 종합 판단" },
          { label: "심판 청구 기한", value: "10년", sub: "상속 개시를 안 날 or 개시일로부터 빠른 날" },
          { label: "기여분 한도", value: "상속재산 이내", sub: "기여분이 상속재산을 초과할 수 없음" },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="info" title="기여분 주장은 구체적인 증거가 핵심이에요">
        간병 사실은 진료기록, 약 구매 영수증, 증인 진술로 입증해요. 가업 종사는 근무 기록, 무보수 증빙이 필요해요. 증거가 구체적일수록 인정 가능성이 높아요.
      </WarningBox>
    ),
  },

  // ── Article 58: 상속 채무 범위 보증채무 | 상속인 고유재산 책임 한계 ──
  "sangsok-chaemubeomwi-bozeungchaeumu-goyujaesan": {
    top: (
      <ComparisonTable
        title="상속 방식별 채무 책임 비교"
        columns={[
          { name: "구분" },
          { name: "단순승인" },
          { name: "한정승인", highlight: true },
          { name: "상속포기" },
        ]}
        rows={[
          { label: "채무 범위", values: ["채무 범위", "무한 (고유재산 포함)", "상속재산 한도", "책임 없음"] },
          { label: "기한", values: ["기한", "3개월 내 미신청 시 자동", "3개월 내 신청", "3개월 내 신청"] },
          { label: "특징", values: ["특징", "재산 > 채무면 유리", "채무 불명 시 안전", "완전히 벗어남"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="3개월 내 아무것도 안 하면 단순승인이 돼요">
        상속 개시를 안 날로부터 3개월이 지나거나 상속재산을 처분하면 자동으로 단순승인 처리돼요. 채무가 의심된다면 먼저 안심상속 서비스로 재산·채무를 파악하세요.
      </WarningBox>
    ),
  },

  // ── Article 59: 상속재산 조회 금융거래 | 사망자 예금 부동산 파악 ──
  "sangsok-jaesan-johoe-geumyunggeorare": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "안심상속 원스톱 서비스 조회 항목",
            items: [
              "금융거래 (예금·대출·보험·주식·연금)",
              "부동산 (토지·건물 소유 내역)",
              "자동차 (차량 소유 내역)",
              "국세 체납 (국세청)",
              "지방세 체납 (지방자치단체)",
              "국민연금 가입·수령 내역",
              "건강보험료 체납 여부",
              "출입국 내역 (선택)",
            ],
          },
          {
            title: "신청 시 필요 서류",
            items: [
              "가족관계증명서 (신청인 기준)",
              "기본증명서 (피상속인 사망 확인)",
              "신청인 신분증",
              "대리 신청 시 위임장 + 대리인 신분증",
            ],
          },
        ]}
      />
    ),
    "after-2": (
      <DateCalculator
        title="안심상속 서비스 신청 기한 계산기"
        description="사망일을 선택하면 안심상속 서비스 신청 마감일을 계산해요."
        presets={[
          { label: "안심상속 신청 기한 (1년)", days: 365, description: "사망일이 속한 달 말일로부터 1년" },
          { label: "한정승인·포기 기한 (3개월)", days: 90, description: "상속 개시를 안 날로부터 3개월" },
        ]}
      />
    ),
  },

  // ── Article 60: 유언장 종류 효력 | 자필증서 공정증서 작성 차이 ──
  "yueunjang-jongryu-hyoryeok-japiljeungseo": {
    "after-0": (
      <WarningBox type="warning" title="자필증서 형식 요건 하나라도 빠지면 무효예요">
        전문, 연월일, 주소, 성명 자필 + 날인이 모두 갖춰져야 해요. 타자·출력 일부 포함 시 무효, 날인 누락 시 무효예요. 수정 시에도 수정 부분에 날인이 필요해요.
      </WarningBox>
    ),
    "after-1": (
      <ComparisonTable
        title="주요 유언 방식 비교"
        columns={[
          { name: "구분" },
          { name: "자필증서" },
          { name: "공정증서", highlight: true },
          { name: "녹음" },
        ]}
        rows={[
          { label: "작성 방법", values: ["작성 방법", "전문 자필 + 날인", "공증인 앞 구술 + 서명", "음성 녹음 + 증인 구술"] },
          { label: "증인 필요", values: ["증인 필요", "불필요", "2명 필요", "1명 필요"] },
          { label: "비용", values: ["비용", "없음", "재산 규모별 수만 원", "없음"] },
          { label: "분실·위조 위험", values: ["분실·위조 위험", "있음", "없음 (공증인 보관)", "변조 위험 있음"] },
        ]}
      />
    ),
  },

  // ── Article 61: 상속세 연부연납 신청 | 물납 허가 요건 ──
  "sangsokse-yeonbuyeonnam-singyo-mulnam": {
    top: (
      <StatCard
        items={[
          { label: "연부연납 최소 세액", value: "2천만 원 초과", sub: "이 이상이어야 신청 가능" },
          { label: "최대 분납 기간", value: "10년", sub: "가업상속 특례 시 최대 20년" },
          { label: "연부연납 가산금 이율", value: "연 2.9%", sub: "2025년 기준, 매년 변동" },
          { label: "물납 허용 재산", value: "국내 부동산·상장주식", sub: "비상장주식·해외 부동산 불가" },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="연부연납·물납 신청은 상속세 신고 기한 내에 해야 해요">
        상속 개시일이 속한 달 말일로부터 6개월이 신고 기한이에요. 기한 내 신청하지 않으면 연부연납·물납이 불가능하고 무신고 가산세(20%)까지 붙어요.
      </WarningBox>
    ),
  },

  // ── Article 62: 미성년자 상속 특별대리인 | 친권자 이해충돌 회피 ──
  "miseongnyeonja-sangsok-teukbyeoldaeriin": {
    "after-0": (
      <ProcessTimeline
        steps={[
          { step: "1단계", title: "이해충돌 확인", desc: "부모와 미성년 자녀가 함께 상속인인지 확인" },
          { step: "2단계", title: "특별대리인 후보 선정", desc: "조부모·삼촌 등 친척 또는 변호사 후보 결정" },
          { step: "3단계", title: "가정법원 신청", desc: "특별대리인 선임 심판 청구서 + 서류 제출" },
          { step: "4단계", title: "법원 심판 (2~4주)", desc: "법원 심사 후 특별대리인 선임 결정" },
          { step: "5단계", title: "협의서 서명", desc: "특별대리인이 미성년 자녀 대리해 협의서에 날인" },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="특별대리인 없이 진행한 협의는 무효예요">
        사후 추인(동의)으로도 치유되지 않아요. 등기가 완료돼도 자녀 성인 후 무효 주장이 가능해요. 반드시 특별대리인 선임 후 협의서를 다시 작성해야 해요.
      </WarningBox>
    ),
  },

  // ── Article 63: 상속회복청구권 기간 | 참칭상속인 재산 반환 소송 ──
  "sangsok-hoebokcheonggugwon-chamching-soson": {
    top: (
      <StatCard
        items={[
          { label: "단기 소멸시효", value: "3년", sub: "침해 사실을 안 날로부터" },
          { label: "장기 소멸시효", value: "10년", sub: "상속 개시일로부터" },
          { label: "적용 원칙", value: "빠른 날 기준", sub: "두 기한 중 먼저 도래하는 날에 소멸" },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="warning" title="참칭상속인이 선의의 제3자에게 처분하면 반환이 어려워요">
        참칭상속인이 부동산을 매도하고 제3자가 등기를 마쳤다면 진정한 상속인이 제3자에게 반환 청구를 하기 어려워요. 재산 침탈 사실을 알았을 때 빠르게 가처분 신청을 해야 해요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 1: 상가 환산보증금 서울 지역별 ──
  "sangga-hwansan-bojeunggeum-jiyeokbyeol": {
    top: (
      <Calculator
        title="환산보증금 계산기"
        description="보증금과 월세를 입력하면 환산보증금을 계산해요. 상임법 적용 기준을 확인할 수 있어요."
        fields={[
          { key: "deposit", label: "보증금", unit: "만 원", placeholder: "5000", type: "number" },
          { key: "monthly", label: "월세(차임)", unit: "만 원", placeholder: "200", type: "number" },
        ]}
        results={[
          {
            label: "환산보증금",
            formula: (v) => {
              const d = Number(v.deposit) || 0;
              const m = Number(v.monthly) || 0;
              const total = d + m * 100;
              return `${total.toLocaleString()} 만 원`;
            },
            highlight: true,
          },
          {
            label: "서울 기준(9억 원) 대비",
            formula: (v) => {
              const d = Number(v.deposit) || 0;
              const m = Number(v.monthly) || 0;
              const total = d + m * 100;
              return total <= 90000 ? "✅ 기준 이하 — 상임법 전면 적용" : "⚠️ 기준 초과 — 일부 보호 미적용";
            },
          },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="지역별 환산보증금 상한 기준"
        columns={[
          { name: "지역" },
          { name: "환산보증금 상한", highlight: true },
        ]}
        rows={[
          { label: "서울특별시", values: ["서울특별시", "9억 원"] },
          { label: "수도권 과밀억제권역(서울 제외)", values: ["수도권 과밀억제권역(서울 제외)", "6억 9천만 원"] },
          { label: "광역시·세종시·파주·화성·안산·용인·김포·광주", values: ["광역시·세종시 등", "5억 4천만 원"] },
          { label: "그 밖의 지역", values: ["그 밖의 지역", "3억 7천만 원"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="기준 초과 임차인도 계약갱신요구권과 권리금 보호는 받아요">
        2019년 상임법 개정 이후 환산보증금이 기준을 초과해도 계약갱신요구권(10년), 권리금 보호, 연 5% 이내 차임인상 제한은 적용돼요. 다만 우선변제권과 소액임차인 최우선변제는 기준 이하 임차인에게만 인정돼요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 2: 상가 임차인 대항력 취득 시점 ──
  "sangga-saeupja-daehangnyeok-chwideuk-sijeom": {
    "after-0": (
      <ProcessTimeline
        steps={[
          { step: "1단계", title: "건물 인도 (점유)", desc: "임차인이 상가건물을 실제 점유·사용 시작" },
          { step: "2단계", title: "사업자등록 신청", desc: "관할 세무서에 사업자등록 신청 (당일 또는 다음날 0시)" },
          { step: "3단계", title: "대항력 취득", desc: "인도 + 사업자등록 다음 날 0시부터 대항력 발생" },
          { step: "4단계", title: "확정일자 부여", desc: "세무서·법원에서 확정일자 받으면 우선변제권도 취득" },
        ]}
      />
    ),
    "after-3": (
      <ComparisonTable
        title="대항력 vs 우선변제권 비교"
        columns={[
          { name: "대항력" },
          { name: "우선변제권", highlight: true },
        ]}
        rows={[
          { label: "취득 요건", values: ["건물 점유 + 사업자등록", "대항력 요건 + 확정일자"] },
          { label: "효력 발생", values: ["사업자등록 다음날 0시", "확정일자 받은 날"] },
          { label: "보호 내용", values: ["임대인 변경 후에도 계약 유지", "경매 시 보증금 우선 배당"] },
          { label: "대상", values: ["환산보증금 기준 무관", "환산보증금 기준 이하만"] },
        ]}
      />
    ),
  },

  // ── 부동산임대차 Article 3: 상가 보증금 월세 전환이율 계산 ──
  "sangga-bojeunggeum-wolse-jeonhwan-yijaeyul": {
    top: (
      <Calculator
        title="전월세 전환 계산기 (상가)"
        description="보증금을 월세로 전환할 때 상임법상 상한이율(기준금리 + 4.5%)을 적용한 월세를 계산해요."
        fields={[
          { key: "deposit", label: "전환할 보증금", unit: "만 원", placeholder: "3000", type: "number" },
          { key: "rate", label: "전환이율 (연, %)", unit: "%", placeholder: "6", type: "number", defaultValue: "6" },
        ]}
        results={[
          {
            label: "월 환산 임대료",
            formula: (v) => {
              const d = Number(v.deposit) || 0;
              const r = Number(v.rate) || 6;
              const monthly = Math.round((d * 10000 * r) / 100 / 12);
              return `${monthly.toLocaleString()} 원`;
            },
            highlight: true,
          },
          {
            label: "연 임대료",
            formula: (v) => {
              const d = Number(v.deposit) || 0;
              const r = Number(v.rate) || 6;
              const annual = Math.round((d * 10000 * r) / 100);
              return `${annual.toLocaleString()} 원`;
            },
          },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="임대인이 전환이율 상한을 초과하면 초과분은 무효예요">
        상임법은 보증금을 월세로 전환할 때 이율 상한을 기준금리 + 4.5%로 제한해요. 이 상한을 초과하는 월세 전환은 초과분이 무효가 되고, 임차인은 초과 납부한 금액을 반환받을 수 있어요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 4: 소액임차인 최우선변제 금액 ──
  "sangga-soaek-imsaigin-choeuiseon-byeoje": {
    top: (
      <ComparisonTable
        title="지역별 소액임차인 기준 및 최우선변제액"
        columns={[
          { name: "지역" },
          { name: "소액임차인 기준 (환산보증금)", highlight: true },
          { name: "최우선변제 한도" },
        ]}
        rows={[
          { label: "서울특별시", values: ["서울특별시", "6,500만 원 이하", "2,200만 원"] },
          { label: "수도권 과밀억제권역(서울 제외)", values: ["수도권 과밀억제권역(서울 제외)", "5,500만 원 이하", "1,900만 원"] },
          { label: "광역시·세종시 등", values: ["광역시·세종시 등", "3,800만 원 이하", "1,300만 원"] },
          { label: "그 밖의 지역", values: ["그 밖의 지역", "3,000만 원 이하", "1,000만 원"] },
        ]}
      />
    ),
    "after-1": (
      <ProcessTimeline
        steps={[
          { step: "1단계", title: "경매 개시", desc: "임대 건물에 경매가 신청됨" },
          { step: "2단계", title: "배당 요구", desc: "임차인이 경매 법원에 배당 요구 신청" },
          { step: "3단계", title: "소액임차인 확인", desc: "경매 개시결정 등기 전 대항력 취득 여부 확인" },
          { step: "4단계", title: "최우선변제", desc: "경매 낙찰금에서 선순위 담보권보다 먼저 배당" },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="경매 개시결정 등기 전에 대항력을 갖춰야 최우선변제를 받아요">
        소액임차인 최우선변제는 경매 개시결정 등기 전에 건물 점유와 사업자등록을 마친 임차인에게만 적용돼요. 경매가 시작된 이후에 입주하거나 사업자등록을 하면 해당되지 않아요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 5: 임대인 매매 후 임대차 승계 ──
  "sangga-imdaein-maemae-imdaecha-seungge": {
    "after-0": (
      <ComparisonTable
        title="임대인 변경 시 대항력 있는 임차인 vs 없는 임차인"
        columns={[
          { name: "대항력 있는 임차인", highlight: true },
          { name: "대항력 없는 임차인" },
        ]}
        rows={[
          { label: "임대차 계약 승계", values: ["자동 승계 (매수인이 새 임대인)", "승계 없음"] },
          { label: "보증금 반환 청구", values: ["새 임대인에게 청구 가능", "원래 임대인에게만 청구"] },
          { label: "계약갱신요구권", values: ["새 임대인에게도 행사 가능", "행사 불가"] },
          { label: "퇴거 요구 시", values: ["응할 의무 없음 (대항 가능)", "퇴거해야 할 수 있음"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="info" title="매수인은 기존 임대차 조건을 그대로 이어받아요">
        상가건물이 매매·경매로 소유자가 바뀌어도 대항력 있는 임차인의 임대차 계약은 그대로 유지돼요. 매수인은 보증금 반환 의무도 함께 승계하므로, 새 소유자와의 별도 계약은 필요 없어요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 6: 상가 보증금 반환 내용증명 ──
  "sangga-bojeunggeum-banhwan-naeyongjeungmyeong": {
    "after-0": (
      <ProcessTimeline
        steps={[
          { step: "1단계", title: "내용증명 발송", desc: "임대인에게 보증금 반환 최고 + 소멸시효 중단" },
          { step: "2단계", title: "임차권등기 신청", desc: "법원에 임차권등기명령 신청 (임대인 동의 불필요)" },
          { step: "3단계", title: "법적 절차 선택", desc: "지급명령(3천만 초과) 또는 소액사건심판(3천만 이하)" },
          { step: "4단계", title: "강제집행", desc: "확정판결 후 임대인 재산에 강제집행" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="지급명령 vs 소액사건심판 비교"
        columns={[
          { name: "지급명령" },
          { name: "소액사건심판", highlight: true },
        ]}
        rows={[
          { label: "대상 금액", values: ["제한 없음", "3,000만 원 이하"] },
          { label: "처리 기간", values: ["채무자 이의 없으면 약 30일", "일반 소송보다 짧음"] },
          { label: "채무자 이의 시", values: ["일반 민사소송으로 전환", "심판 절차 계속 진행"] },
          { label: "비용", values: ["인지대 10분의 1 수준", "소액 인지대"] },
          { label: "추천 상황", values: ["다툼 없는 명확한 채무", "채무자 이의 가능성 있을 때"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="임차권등기 전에 이사하면 대항력을 잃을 수 있어요">
        임차권등기명령을 신청해 등기가 완료된 것을 확인한 뒤에 이사해야 해요. 등기 완료 전에 이사하면 대항력이 소멸해 우선변제권도 함께 사라질 수 있어요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 7: 상가 전세권 설정 사업자등록 비교 ──
  "sangga-jeonse-gwon-saeupja-bihyo": {
    top: (
      <ComparisonTable
        title="전세권 설정 vs 사업자등록+확정일자 비교"
        columns={[
          { name: "전세권 설정", highlight: true },
          { name: "사업자등록+확정일자" },
        ]}
        rows={[
          { label: "임대인 동의", values: ["필요", "불필요"] },
          { label: "환산보증금 제한", values: ["없음 (물권)", "지역 기준 이하만"] },
          { label: "비용", values: ["등록면허세 등 발생", "확정일자 600원"] },
          { label: "이사 후 보호", values: ["자동 유지", "임차권등기 필요"] },
          { label: "배당 순위 기준", values: ["전세권 설정등기일", "확정일자 부여일"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="선순위 근저당이 있는 상가에 전세권 설정은 위험해요">
        선순위 근저당 채권 최고액이 크면 경매 낙찰가에서 임차인에게 배당될 금액이 거의 없을 수 있어요. 계약 전 등기부등본으로 근저당 현황을 반드시 확인하세요.
      </WarningBox>
    ),
    "after-3": (
      <ComparisonTable
        title="전세권 vs 임차권등기 보증금 보호 방식"
        columns={[
          { name: "전세권", highlight: true },
          { name: "임차권등기" },
        ]}
        rows={[
          { label: "설정 시점", values: ["임대차 계약 중 사전 설정", "임대차 종료 후 사후 신청"] },
          { label: "임대인 동의", values: ["필요", "불필요 (법원 명령)"] },
          { label: "우선변제 기준", values: ["물권 (등기일 기준)", "기존 대항력·확정일자 기준"] },
          { label: "이사 후 보호", values: ["등기만으로 보호 유지", "등기 후 이사 시 보호 유지"] },
        ]}
      />
    ),
  },

  // ── 부동산임대차 Article 8: 상가 임대차 경매 배당 순위 ──
  "sangga-imdaecha-gyeongmae-baedang-sunwi": {
    "after-0": (
      <ProcessTimeline
        steps={[
          { step: "1단계", title: "경매 개시 확인", desc: "등기부등본·법원경매정보로 경매 개시 사실 확인" },
          { step: "2단계", title: "배당 요구 종기 확인", desc: "법원 공고에서 배당 요구 종기일 확인" },
          { step: "3단계", title: "배당 요구 신청", desc: "종기일 전 법원에 배당요구서 + 임대차계약서 제출" },
          { step: "4단계", title: "배당 결과 확인", desc: "낙찰 후 배당표 열람·이의 신청 가능" },
        ]}
      />
    ),
    "after-2": (
      <ComparisonTable
        title="경매 배당 순위"
        columns={[
          { name: "순위" },
          { name: "권리자", highlight: true },
          { name: "근거" },
        ]}
        rows={[
          { label: "1순위", values: ["1순위", "소액임차인 최우선변제", "상임법 제14조"] },
          { label: "2순위", values: ["2순위", "임금·퇴직금 채권", "근로기준법"] },
          { label: "3순위", values: ["3순위", "확정일자 기준 우선변제권자", "등기일·확정일자 순서"] },
          { label: "4순위", values: ["4순위", "일반 채권자", "안분 배당"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="배당 요구 종기일을 놓치면 배당을 받을 수 없어요">
        경매 법원이 정한 배당 요구 종기일이 지나면 배당 신청 자체가 불가능해요. 상가를 임차 중이라면 등기부등본을 주기적으로 확인해 경매 개시 여부를 미리 파악하는 것이 중요해요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 9: 상가 권리금 회수 방해 4가지 유형 ──
  "sangga-gwolligeum-hoesu-bang-hae-yuhyeong": {
    top: (
      <StatCard
        items={[
          { label: "권리금 보호 기간", value: "계약 종료 3개월 전부터", sub: "임차인 권리금 회수 기회 보장 기간" },
          { label: "손해배상 소멸시효", value: "3년", sub: "손해 및 가해자를 안 날로부터" },
          { label: "방해 행위 유형", value: "4가지", sub: "상임법 제10조의4 열거 유형" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="권리금 방해 행위 4가지 유형"
        columns={[
          { name: "유형" },
          { name: "방해 행위 내용", highlight: true },
        ]}
        rows={[
          { label: "유형 1", values: ["유형 1", "신규 임차인에게 직접 권리금 요구"] },
          { label: "유형 2", values: ["유형 2", "신규 임차인과의 계약 정당한 이유 없이 거절"] },
          { label: "유형 3", values: ["유형 3", "현저히 고액 차임·보증금 요구로 계약 방해"] },
          { label: "유형 4", values: ["유형 4", "그 밖의 방법으로 권리금 회수 방해"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="신규 임차인 주선은 반드시 서면으로 진행하세요">
        신규 임차인 정보를 임대인에게 내용증명으로 발송하고 임대인의 응답을 서면으로 받아두면 방해 행위 입증이 훨씬 쉬워져요. 구두로만 진행하면 증거를 남기기 어려워요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 10: 권리금 소멸시효 3년 기산일 계산 ──
  "gwolligeum-somelsiho-3nyeon-gisanil": {
    top: (
      <StatCard
        items={[
          { label: "단기 소멸시효", value: "3년", sub: "손해 및 가해자를 안 날로부터" },
          { label: "장기 소멸시효", value: "10년", sub: "방해 행위가 있은 날로부터" },
          { label: "최고 후 후속 조치", value: "6개월 이내", sub: "내용증명 발송 후 소 제기 등" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="소멸시효 중단 방법 비교"
        columns={[
          { name: "방법" },
          { name: "효과", highlight: true },
          { name: "주의사항" },
        ]}
        rows={[
          { label: "소 제기", values: ["소 제기", "제출 즉시 확정 중단", "비용 발생"] },
          { label: "가압류·압류", values: ["가압류·압류", "신청 즉시 확정 중단", "담보 제공 필요할 수 있음"] },
          { label: "내용증명(최고)", values: ["내용증명(최고)", "6개월 임시 중단", "6개월 내 후속 조치 필수"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="내용증명만 보내고 6개월 넘기면 시효 중단 효력이 없어져요">
        내용증명은 발송 후 6개월 이내에 소 제기, 가압류, 압류 중 하나를 실행해야만 최고 시점으로 소급해 시효 중단이 확정돼요. 내용증명만 보내고 방치하면 권리가 소멸할 수 있어요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 11: 권리금 소송 입증 서류 ──
  "sangga-gwolligeum-sosong-ipjeung-seoryu": {
    "after-0": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "방해 행위 즉시 캡처·녹음", desc: "문자·이메일·통화 즉시 보존" },
          { step: "2", title: "계약의향서 확보", desc: "신규 임차인 성명·조건·날짜 기재" },
          { step: "3", title: "내용증명 발송", desc: "방해 사실 명시 + 소멸시효 중단" },
          { step: "4", title: "감정평가 의뢰", desc: "금액 근거 확보 후 소송 제기" },
        ]}
      />
    ),
    "after-2": (
      <StatCard
        items={[
          { label: "감정평가 비용", value: "50~200만원", sub: "규모·항목에 따라 상이" },
          { label: "시세 사례 수집", value: "3건 이상", sub: "동일 상권·업종·면적 기준" },
          { label: "소멸시효", value: "3년", sub: "방해 행위일로부터 기산" },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="방해 행위 직후 증거 보존이 핵심이에요">
        시간이 지날수록 문자 기록이 삭제되고 목격자 기억이 흐려져요. 방해 행위가 있었다면 즉시 화면 캡처, 통화 녹음, 자필 진술서를 작성해 보존해두세요. 소멸시효 3년 이내에 소송을 제기해야 해요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 12: 권리금 유형 차이 ──
  "gwolligeum-yeongeobgwon-sisel-gyeyak-cha": {
    top: (
      <ComparisonTable
        title="권리금 3가지 유형 비교"
        columns={[
          { name: "유형" },
          { name: "내용" },
          { name: "감정평가 방법", highlight: true },
        ]}
        rows={[
          { label: "영업권리금", values: ["영업권리금", "단골·노하우·브랜드 가치", "수익환원법"] },
          { label: "시설권리금", values: ["시설권리금", "인테리어·설비 잔존가치", "원가법(감가상각)"] },
          { label: "계약권리금", values: ["계약권리금", "위치·유동인구·접근성", "거래사례비교법"] },
        ]}
      />
    ),
    "after-1": (
      <AccordionChecklist
        groups={[
          {
            title: "표준권리금계약서 필수 기재 항목",
            items: [
              "양도인·양수인 성명, 주소, 연락처",
              "대상 상가 주소 및 호수",
              "권리금 유형별 금액 (영업·시설·계약 구분)",
              "지급 일정 (계약금·중도금·잔금)",
              "시설 목록 별지 (수량·상태·취득 연도)",
              "잔금 지급 조건: 임대차계약 체결 후",
              "위약금 조항",
              "영업 노하우·거래처 이전 범위",
            ],
          },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="시설권리금과 영업권리금을 구분하지 않으면 세금 폭탄 맞을 수 있어요">
        계약서에 유형별 금액을 구분하지 않으면 세무조사에서 전체 권리금에 부가가치세 10%가 부과될 수 있어요. 시설권리금만 부가세 대상이므로 반드시 유형별로 나눠서 계약서에 기재하세요.
      </WarningBox>
    ),
    "after-3": (
      <ComparisonTable
        title="감정평가 방법 3가지 비교"
        columns={[
          { name: "방법" },
          { name: "적용 유형" },
          { name: "핵심 기준", highlight: true },
        ]}
        rows={[
          { label: "수익환원법", values: ["수익환원법", "영업권리금", "연간 초과수익 × 환원율"] },
          { label: "원가법", values: ["원가법", "시설권리금", "취득원가 − 감가상각"] },
          { label: "거래사례비교법", values: ["거래사례비교법", "계약권리금", "인근 유사 사례 3건 이상"] },
        ]}
      />
    ),
  },

  // ── 부동산임대차 Article 13: 재건축 권리금 거절 요건 ──
  "imdaein-jaegeonsuk-gwolligeum-georjeol-yogeon": {
    "after-0": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "통보 시점 확인", desc: "만료 6개월~1개월 전 서면인지 확인" },
          { step: "2", title: "재건축 정당성 검토", desc: "건축허가·안전진단 서류 요구" },
          { step: "3", title: "신규 임차인 즉시 주선", desc: "주선 사실 서면으로 임대인에게 통지" },
          { step: "4", title: "거절 시 증거 확보", desc: "내용증명 발송 후 소송 준비" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="재건축 고지 여부에 따른 권리금 보호 차이"
        columns={[
          { name: "상황" },
          { name: "갱신 거절" },
          { name: "권리금 방해 금지", highlight: true },
        ]}
        rows={[
          { label: "최초 계약에 재건축 미고지", values: ["최초 계약에 재건축 미고지", "가능(요건 충족 시)", "의무 있음"] },
          { label: "최초 계약에 재건축 고지", values: ["최초 계약에 재건축 고지", "가능", "의무 없음(예외 적용)"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="퇴거 후 1년 6개월은 임대인의 영업 재개를 모니터링해야 해요">
        임대인이 재건축 후 1년 6개월 이내에 다른 임차인에게 영리 목적으로 임대하면 손해배상 청구가 가능해요. 퇴거 후에도 현장 방문·사업자등록 조회로 영업 현황을 확인하고, 의심 상황이 발견되면 즉시 증거를 수집하세요.
      </WarningBox>
    ),
    "after-3": (
      <WarningBox type="info" title="재건축 통보를 받은 즉시 신규 임차인 주선을 시작하세요">
        재건축 통보를 받더라도 신규 임차인 주선은 임대차 만료 6개월 전부터 가능해요. 임대인에게 서면으로 소개하고 그 반응을 기록해두면 권리금 방해 소송의 핵심 증거가 돼요. 소멸시효(3년) 내에 소송을 제기해야 해요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 14: 10년 경과 권리금 보호 ──
  "sangga-10nyeon-gwolligeum-boho-jeok-yong": {
    top: (
      <StatCard
        items={[
          { label: "계약갱신요구권", value: "최대 10년", sub: "2018.10.16 개정 후" },
          { label: "권리금 보호 시행일", value: "2015.5.13", sub: "개정 전 계약도 적용 가능" },
          { label: "개정 전 갱신요구 기간", value: "5년", sub: "2018.10.16 이전 기준" },
        ]}
      />
    ),
    "after-2": (
      <ComparisonTable
        title="2018년 10월 개정 전후 비교"
        columns={[
          { name: "구분" },
          { name: "개정 전 (5년)" },
          { name: "개정 후 (10년)", highlight: true },
        ]}
        rows={[
          { label: "갱신요구권 기간", values: ["갱신요구권 기간", "최초 임대차 포함 5년", "최초 임대차 포함 10년"] },
          { label: "적용 기준일", values: ["적용 기준일", "2018.10.15 이전", "2018.10.16 이후 체결·갱신"] },
          { label: "소급 적용", values: ["소급 적용", "해당 없음", "갱신요구권 남아있는 계약에 적용"] },
          { label: "권리금 보호", values: ["권리금 보호", "갱신요구권과 무관하게 적용", "갱신요구권과 무관하게 적용"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="10년 계산은 최초 계약일 기준이에요">
        묵시적 갱신 기간도 전체 10년 계산에 포함돼요. 임차인이 교체됐더라도 영업 양도·권리금 수수 등 실질적 연속성이 인정되면 기간이 합산될 수 있어요. 계약서 원본과 갱신 이력을 반드시 보관하세요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 15: 표준계약서 작성 ──
  "sangga-gwolligeum-pyojun-gyeyakseo-jagseong": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "표준권리금계약서 체크리스트",
            items: [
              "양도인·양수인 인적사항 (성명·주소·연락처)",
              "대상 상가 주소 및 호수 명시",
              "권리금 유형별 금액 구분 기재 (영업·시설·계약)",
              "지급 일정 (계약금·중도금·잔금 날짜 명시)",
              "시설 목록 별지 첨부 (수량·상태·취득 연도)",
              "잔금 지급 조건: 임대인-신규임차인 임대차계약 체결 후",
              "위약금 조항 (계약금 배액 반환 기준)",
              "영업 노하우·거래처 이전 범위 특약",
              "잔금 전까지 시설 현 상태 유지 의무",
            ],
          },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="공증 있음 vs 없음 비교"
        columns={[
          { name: "구분" },
          { name: "공증 없음" },
          { name: "공증 있음", highlight: true },
        ]}
        rows={[
          { label: "법적 필수 여부", values: ["법적 필수 여부", "필수 아님", "필수 아님"] },
          { label: "증거력", values: ["증거력", "사서증서 (법원 인정)", "공증인 확인으로 강화"] },
          { label: "강제집행", values: ["강제집행", "소송 후 가능", "공정증서 시 소송 없이 가능"] },
          { label: "비용", values: ["비용", "없음", "수십만~수백만 원"] },
          { label: "위조 방지", values: ["위조 방지", "상대적으로 취약", "작성일·내용 공식 확인"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="임대인이 서명하지 않으면 방해 금지 조항이 임대인에게 직접 효력이 없어요">
        권리금 계약서의 방해 금지 조항은 임대인이 서명하지 않으면 임대인에게 직접적인 구속력이 없어요. 임대인에게 별도로 동의 확인서(자필 서명·날인)를 받아두거나, 임대인이 동석한 자리에서 작성하면 증거력이 높아져요.
      </WarningBox>
    ),
    "after-3": (
      <WarningBox type="info" title="계약서에 시설·영업 권리금 구분 기재가 절세의 핵심이에요">
        유형별 금액을 구분하지 않으면 세무조사에서 전체에 부가세 10%가 부과될 수 있어요. 시설권리금만 부가세 대상이므로, 영업권리금과 시설권리금을 계약서에 반드시 따로 기재하세요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 16: 과도한 임대료 권리금 방해 ──
  "imdaein-gwado-imdaeryo-gwolligeum-bang-hae": {
    top: (
      <StatCard
        items={[
          { label: "방해 판단 기준", value: "현저히 고액", sub: "인근 시세 대비 비교" },
          { label: "소송 기간 (1심)", value: "6개월~1년", sub: "쌍방 항소 시 추가 소요" },
          { label: "변호사 착수금", value: "100~300만원", sub: "+ 성공보수 5~15%" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="손해배상액 산정 근거 비교"
        columns={[
          { name: "자료" },
          { name: "내용" },
          { name: "증거력", highlight: true },
        ]}
        rows={[
          { label: "권리금 계약서", values: ["권리금 계약서", "신규임차인과 합의한 금액", "높음"] },
          { label: "감정평가서", values: ["감정평가서", "공인 감정법인 평가액", "매우 높음"] },
          { label: "인근 거래 사례", values: ["인근 거래 사례", "유사 상가 3건 이상", "중간"] },
        ]}
      />
    ),
    "after-2": (
      <ComparisonTable
        title="소송 vs 조정 비교"
        columns={[
          { name: "구분" },
          { name: "소송" },
          { name: "조정 (임대차분쟁조정위)", highlight: true },
        ]}
        rows={[
          { label: "기간", values: ["기간", "1심 6개월~1년", "3~6개월"] },
          { label: "비용", values: ["비용", "변호사 비용 발생", "무료 신청 가능"] },
          { label: "효력", values: ["효력", "판결 확정 시 강제집행", "조정 성립 시 재판상 화해"] },
          { label: "임대인 동의", values: ["임대인 동의", "불필요", "필요"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="권리금 방해는 형사처벌이 없어요 — 민사 소송만 가능해요">
        현행 상임법에는 권리금 방해에 대한 형사처벌 조항이 없어요. 임대인의 행위가 사기·강요 등 별도 형사 범죄를 구성하는 경우에만 고소가 가능해요. 권리금 회수가 목적이라면 민사 손해배상 청구를 기본으로 진행해야 해요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 17: 내용증명 발송 시점 ──
  "gwolligeum-bang-hae-naeyongjeungmyeong-seuiyo": {
    "after-0": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "방해 행위 인지 즉시", desc: "증거 캡처·보존 (문자·이메일·녹음)" },
          { step: "2", title: "내용증명 발송", desc: "방해 사실 + 손해배상 청구 의사 명시" },
          { step: "3", title: "6개월 이내 후속 조치", desc: "소 제기 또는 가압류로 시효 확정 중단" },
          { step: "4", title: "소장 제출 또는 조정 신청", desc: "3년 소멸시효 내 반드시 진행" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="소멸시효 중단 방법 비교"
        columns={[
          { name: "방법" },
          { name: "중단 효과" },
          { name: "주의사항", highlight: true },
        ]}
        rows={[
          { label: "소 제기", values: ["소 제기", "확정 중단", "비용 발생"] },
          { label: "가압류", values: ["가압류", "확정 중단 + 채권 보전", "담보 공탁 필요할 수 있음"] },
          { label: "내용증명(최고)", values: ["내용증명(최고)", "6개월 임시 중단", "6개월 내 후속 조치 필수"] },
          { label: "채무 승인", values: ["채무 승인", "승인 시점부터 재기산", "서면 확보 필수"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="조정 불성립 후 6개월 내에 소송을 제기해야 해요">
        조정 신청도 소멸시효를 잠시 중단하지만, 조정 불성립 후 6개월 이내에 소송을 제기해야 중단 효과가 유지돼요. 조정만 믿고 기다리다가 6개월이 지나면 시효 중단 효력이 사라져요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 18: 주선 실패 원인 ──
  "sangga-gwolligeum-juseon-silpae-imdaein-bang-hae": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "신규 임차인 주선 의무 체크리스트",
            items: [
              "계약 의향이 실제로 있는 신규 임차인 섭외",
              "신규 임차인의 보증금 납부 능력 확인",
              "임대인에게 서면(문자·이메일)으로 신규 임차인 소개",
              "계약의향서 또는 가계약금 이체 내역 확보",
              "임대인의 반응(수락·거절) 날짜와 내용 기록 보존",
              "임대인 거절 시 사유 서면 요구",
            ],
          },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="임대인의 정당한 거절 vs 부당한 거절"
        columns={[
          { name: "구분" },
          { name: "정당한 거절" },
          { name: "부당한 거절 (방해)", highlight: true },
        ]}
        rows={[
          { label: "지급 능력", values: ["지급 능력", "보증금 납부 불능", "단순 업종 불호"] },
          { label: "훼손 우려", values: ["훼손 우려", "현저한 훼손 이력", "주관적 불신"] },
          { label: "임대료", values: ["임대료", "합리적 수준 요구", "현저히 고액 요구"] },
          { label: "재건축", values: ["재건축", "최초 계약 시 고지된 재건축", "고지 없이 갑작스러운 주장"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="'권리금 없이 나가겠다'는 표현은 절대 서면으로 쓰지 마세요">
        협상 중이라도 권리금을 포기한다는 의사를 서면으로 남기면 나중에 번복하기 어려워요. 임대인이 이를 믿고 다른 임차인과 계약하면 철회가 불가능해질 수 있어요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 19: 갱신요구권 10년 기산일 ──
  "sangga-gyeyakgaesinyogugwon-10nyeon-gisanil": {
    top: (
      <StatCard
        items={[
          { label: "갱신요구권 기간", value: "최대 10년", sub: "최초 임대차 포함 전체 기간" },
          { label: "묵시적 갱신", value: "포함", sub: "명시적·묵시적 갱신 모두 합산" },
          { label: "묵시적 갱신 시 계약기간", value: "1년", sub: "전 임대차 기간과 무관" },
        ]}
      />
    ),
    "after-0": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "최초 임대차 개시일 확인", desc: "계약서 원본 또는 사업자등록일 조회" },
          { step: "2", title: "전체 임대차기간 합산", desc: "명시적 갱신 + 묵시적 갱신 포함" },
          { step: "3", title: "10년 만료일 산정", desc: "개시일로부터 정확히 10년 후 날짜" },
          { step: "4", title: "만료 6개월 전부터 신규임차인 주선 시작", desc: "권리금 회수 준비" },
        ]}
      />
    ),
    "after-3": (
      <ComparisonTable
        title="갱신요구권 소멸 후 남는 임차인 권리"
        columns={[
          { name: "권리" },
          { name: "내용" },
          { name: "소멸 여부", highlight: true },
        ]}
        rows={[
          { label: "권리금 보호", values: ["권리금 보호", "신규임차인 주선 + 방해 시 손해배상", "소멸 안 함"] },
          { label: "대항력·우선변제권", values: ["대항력·우선변제권", "경매 시 보증금 보호", "소멸 안 함"] },
          { label: "보증금 반환 청구권", values: ["보증금 반환 청구권", "만료 후 반환 청구", "소멸 안 함"] },
          { label: "계약갱신요구권", values: ["계약갱신요구권", "갱신 강제 요구", "소멸"] },
        ]}
      />
    ),
  },

  // ── 부동산임대차 Article 20: 갱신 거절 통보 시기 ──
  "sangga-imdaein-gaeshin-georjeol-tonbo-sigi": {
    "after-0": (
      <ComparisonTable
        title="갱신 거절 통보 기간 준수 여부에 따른 결과"
        columns={[
          { name: "상황" },
          { name: "결과" },
          { name: "임차인 권리", highlight: true },
        ]}
        rows={[
          { label: "6개월~1개월 전 서면 통보", values: ["6개월~1개월 전 서면 통보", "갱신 거절 유효", "정당한 사유 없으면 다툼 가능"] },
          { label: "1개월 이내 통보", values: ["1개월 이내 통보", "통보 무효", "갱신 요구 가능"] },
          { label: "6개월 초과 전 통보", values: ["6개월 초과 전 통보", "통보 무효", "갱신 요구 가능"] },
          { label: "통보 없음", values: ["통보 없음", "묵시적 갱신 (1년)", "3개월 전 통보로 언제든 해지 가능"] },
        ]}
      />
    ),
    "after-1": (
      <StatCard
        items={[
          { label: "통보 유효 기간", value: "6개월~1개월 전", sub: "도달일 기준" },
          { label: "묵시적 갱신 기간", value: "1년", sub: "전 임대차 조건과 동일" },
          { label: "임차인 해지 통보 기간", value: "3개월 전", sub: "묵시적 갱신 시 적용" },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="내용증명은 발송일이 아닌 도달일이 기준이에요">
        갱신 거절 내용증명은 만료 1개월 전 이전에 임차인에게 도달해야 해요. 연휴·명절 등으로 배달이 늦어지면 기간 요건을 어길 수 있으니 만료 2개월 전에 발송하는 것이 안전해요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 21: 임대료 5% 제한 ──
  "sangga-imdaeryo-jeunggaek-5percent-jeyhan": {
    top: (
      <StatCard
        items={[
          { label: "임대료 증액 상한", value: "5%", sub: "환산보증금 기준 이하 상가 적용" },
          { label: "재청구 제한", value: "1년", sub: "직전 증액 청구일로부터 1년 이내 불가" },
          { label: "감액 청구", value: "가능", sub: "임차인도 경기 침체 이유로 청구 가능" },
        ]}
      />
    ),
    "after-0": (
      <ComparisonTable
        title="지역별 환산보증금 기준 (5% 상한 적용 여부)"
        columns={[
          { name: "지역" },
          { name: "환산보증금 기준" },
          { name: "5% 상한 적용", highlight: true },
        ]}
        rows={[
          { label: "서울", values: ["서울", "9억 원 이하", "적용"] },
          { label: "수도권과밀억제권역", values: ["수도권과밀억제권역", "6.9억 원 이하", "적용"] },
          { label: "광역시(세종·공주 포함)", values: ["광역시(세종·공주 포함)", "5.4억 원 이하", "적용"] },
          { label: "기타 지역", values: ["기타 지역", "3.7억 원 이하", "적용"] },
          { label: "기준 초과 상가", values: ["기준 초과 상가", "기준 초과", "미적용 (합의로 결정)"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="info" title="임대인이 5% 초과 인상을 요구하면 현행 임대료를 납부하며 거부하세요">
        임차인은 5% 초과 인상에 동의하지 않고 기존 임대료를 계속 납부해도 연체가 아니에요. 임대인이 증액을 원한다면 법원에 증액 청구 소송을 제기해야 해요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 22: 묵시적 갱신 해지 ──
  "sangga-muksijeok-gaeshin-haiji-imsaigin-tonbo": {
    top: (
      <StatCard
        items={[
          { label: "묵시적 갱신 기간", value: "1년", sub: "전 임대차 조건과 동일" },
          { label: "임차인 해지 통보 기간", value: "3개월 전", sub: "서면으로 통보해야 효력 발생" },
          { label: "임대인 퇴거 요구", value: "불가", sub: "3개월 전 통보만으로는 퇴거 요구 불가" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="묵시적 갱신 중 임차인 vs 임대인 해지 권한 비교"
        columns={[
          { name: "주체" },
          { name: "해지 방법" },
          { name: "효력 발생", highlight: true },
        ]}
        rows={[
          { label: "임차인", values: ["임차인", "언제든 서면 해지 통보", "통보 후 3개월 경과 시"] },
          { label: "임대인", values: ["임대인", "정당한 갱신 거절 사유 필요", "갱신 기간 만료 시 (1년 후)"] },
          { label: "임대인 (의무 위반)", values: ["임대인 (의무 위반)", "3기 연체 등 사유 발생 시", "사유 발생 즉시 해지 가능"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="info" title="묵시적 갱신 해지 통보는 내용증명으로 발송하세요">
        구두 통보는 날짜와 내용이 나중에 다툼이 될 수 있어요. 내용증명 우편으로 발송하면 도달 사실과 날짜가 공식 증명돼요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 23: 재건축 고지 의무 ──
  "sangga-jaegeonsuk-gyehoek-goji-gaeshin-georjeol": {
    "after-0": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "계약 체결 당시 재건축 계획 고지", desc: "공사 시기·소요 기간 등 구체적 내용 계약서에 명시" },
          { step: "2", title: "갱신 거절 통보 (만료 6~1개월 전)", desc: "재건축을 이유로 갱신 거절, 서면으로 통보" },
          { step: "3", title: "임차인 퇴거 및 보증금 반환", desc: "계약 만료 시 보증금 반환 후 명도" },
          { step: "4", title: "착공 여부 모니터링", desc: "퇴거 후 6~12개월간 건축 허가 현황 조회" },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="계약서에 재건축 특약이 있으면 권리금 보호가 제한될 수 있어요">
        재건축 특약이 있는 상가는 임대인의 방해 금지 의무가 면제될 수 있어요. 권리금 회수 가능성을 사전에 신중히 검토하세요.
      </WarningBox>
    ),
    "after-3": (
      <WarningBox type="info" title="임대인이 착공을 안 하면 손해배상을 청구할 수 있어요">
        재건축 이유로 퇴거 후 임대인이 실제 공사를 안 하거나 다른 임차인을 들이면 권리금 상당액 손해배상을 청구하세요. 소멸시효는 3년이에요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 24: 차임연체 3기 ──
  "sangga-chaimyeonche-3gi-gaeshin-georjeol-jogeon": {
    top: (
      <StatCard
        items={[
          { label: "갱신 거절 기준", value: "누적 3기", sub: "연속이 아닌 전체 기간 누적 금액 기준" },
          { label: "권리금 보호", value: "박탈", sub: "3기 연체 사실 있으면 방해 금지 의무 면제" },
          { label: "3기 금액 기준", value: "3개월분 월세", sub: "횟수 아닌 누적 연체 금액으로 판단" },
        ]}
      />
    ),
    "after-0": (
      <WarningBox type="warning" title="연속이 아니어도 누적 3기면 갱신 거절이 가능해요 (대법원 판례)">
        1월·5월·9월처럼 띄엄띄엄 연체해도 누적 금액이 3개월분에 달하면 임대인이 갱신을 거절할 수 있어요. 나중에 다 갚아도 이미 발생한 3기 연체 사실은 사라지지 않아요.
      </WarningBox>
    ),
    "after-3": (
      <WarningBox type="warning" title="월세 연체는 갱신요구권·권리금 보호를 동시에 잃을 수 있어요">
        월세 3기 연체가 누적되면 임대인은 갱신을 거절할 수 있고, 임차인의 권리금 방해 금지 보호도 소멸해요. 영업이 어렵더라도 임대료는 최우선으로 납부하세요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 25: 환산보증금 초과 임대료 ──
  "sangga-hwansan-chogwa-imdaeryo-inang-hyeob-ui": {
    top: (
      <ComparisonTable
        title="환산보증금 기준 이하 vs 초과 상가 비교"
        columns={[
          { name: "구분" },
          { name: "기준 이하 상가", highlight: true },
          { name: "기준 초과 상가" },
        ]}
        rows={[
          { label: "임대료 5% 상한", values: ["임대료 5% 상한", "적용", "미적용 (합의)"] },
          { label: "계약갱신요구권", values: ["계약갱신요구권", "10년", "10년 (동일)"] },
          { label: "권리금 보호", values: ["권리금 보호", "적용", "적용 (동일)"] },
          { label: "대항력·우선변제", values: ["대항력·우선변제", "적용", "적용 (동일)"] },
          { label: "임대료 분쟁 해결", values: ["임대료 분쟁 해결", "상임법 11조", "민법 628조 차임증감청구권"] },
        ]}
      />
    ),
    "after-1": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "임대인의 임대료 인상 요구 수령", desc: "인상 요구 내용을 서면으로 확인" },
          { step: "2", title: "서면으로 이의 제기", desc: "현행 임대료 납부 의사와 조정 신청 계획 통보" },
          { step: "3", title: "임대차분쟁조정위원회 조정 신청", desc: "무료 신청, 3~6개월 내 결과" },
          { step: "4", title: "조정 불성립 시 차임증감청구 소송", desc: "민법 제628조 근거, 법원 적정 임대료 결정" },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="info" title="환산보증금 초과 상가 계약 시 임대료 인상 특약을 넣어두세요">
        계약서에 '계약기간 중 임대료는 연 5% 이상 올리지 않는다'는 특약을 넣으면 5% 상한이 없더라도 약정으로 보호받을 수 있어요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 26: 계약갱신요구 행사 기간 ──
  "sangga-gyeyakgaesin-yogug-haengsa-gigan": {
    top: (
      <StatCard
        items={[
          { label: "갱신 요구 가능 기간", value: "만료 6~1개월 전", sub: "임차인이 이 기간 내에 임대인에게 도달해야 함" },
          { label: "임대인 거절 통보 기간", value: "동일 (6~1개월 전)", sub: "기간 외 통보는 무효" },
          { label: "기간 경과 시", value: "묵시적 갱신", sub: "1년 연장, 10년에 합산" },
        ]}
      />
    ),
    "after-0": (
      <ComparisonTable
        title="갱신 요구 기간 준수 여부에 따른 결과"
        columns={[
          { name: "상황" },
          { name: "결과" },
          { name: "임차인 권리", highlight: true },
        ]}
        rows={[
          { label: "6~1개월 전 적법 요구", values: ["6~1개월 전 적법 요구", "갱신요구권 유효", "임대인 정당 사유 없으면 갱신 의무"] },
          { label: "1개월 이내 요구", values: ["1개월 이내 요구", "요구 효력 불확실", "임대인 거절 가능성 높음"] },
          { label: "요구 없음 + 임대인 거절 없음", values: ["요구 없음 + 임대인 거절 없음", "묵시적 갱신 (1년)", "임차인 3개월 전 통보로 해지 가능"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="info" title="갱신 요구는 내용증명 우편으로 기간 내에 발송하세요">
        도달 기준이므로 만료 1개월 전 당일 발송하면 기간을 벗어날 수 있어요. 만료 2개월 전에 내용증명을 발송하는 것이 안전해요.
      </WarningBox>
    ),
    "after-3": (
      <WarningBox type="warning" title="임대인 거절 통보가 기간 위반이면 무효예요">
        임대인이 만료 1개월 이내에 거절 통보를 하면 효력이 없어요. 기간 내 적법한 거절 통보가 없으면 묵시적 갱신이 되고 임차인은 계속 영업할 수 있어요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 27: 명도소송 소요기간 비용 ──
  "sangga-myeongdo-sosong-soyo-gigan-biyong": {
    top: (
      <StatCard
        items={[
          { label: "1심 소요기간", value: "6~12개월", sub: "항소 시 추가 6~12개월" },
          { label: "인지대 (소가 1억 기준)", value: "약 45만 원", sub: "소가 구간별로 달라짐" },
          { label: "점유이전금지 가처분", value: "소송 전 필수", sub: "소송 중 점유 이전 방지" },
        ]}
      />
    ),
    "after-1": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "점유이전금지 가처분 신청", desc: "소 제기 전 임차인 점유 현상 유지 명령 신청" },
          { step: "2", title: "명도소송 제기", desc: "관할 지방법원에 소장 제출 + 인지대·송달료 납부" },
          { step: "3", title: "1심 판결 (6~12개월)", desc: "가집행 선고 포함 시 항소 중에도 집행 가능" },
          { step: "4", title: "강제집행 신청", desc: "집행문 부여 후 법원 집행관실에 신청" },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="소 제기 전 점유이전금지 가처분을 먼저 신청하세요">
        소송 중 임차인이 제3자에게 점유를 넘기면 새 소송이 필요해요. 가처분이 있으면 점유자가 바뀌어도 기존 판결로 집행할 수 있어요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 28: 차임연체 3기 계약해지 ──
  "sangga-chaimyeonche-3gi-gyeyakhaejie-yogeon": {
    "after-0": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "연체 내역 확인 및 기록", desc: "연체 날짜, 금액, 납부 독촉 내역 정리" },
          { step: "2", title: "내용증명 발송", desc: "연체 내역 명시 + 해지 의사 + 퇴거 요청 기한 포함" },
          { step: "3", title: "퇴거 미이행 시 명도소송 제기", desc: "소 제기 전 점유이전금지 가처분 신청 병행" },
          { step: "4", title: "판결 후 강제집행", desc: "집행관 신청 → 계고 → 노무업체 동행 집행" },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="warning" title="연속이 아닌 누적 3기도 해지 사유예요 (대법원 판례)">
        1월, 4월, 7월처럼 띄엄띄엄 연체해도 누적 금액이 3개월분에 달하면 임대인이 계약을 해지할 수 있어요. 나중에 다 갚아도 해지 사유가 소멸하지 않아요.
      </WarningBox>
    ),
    "after-3": (
      <WarningBox type="info" title="3기 연체 시 권리금 방해 금지 의무도 면제돼요">
        3기 연체로 해지된 임차인은 신규 임차인을 주선해도 임대인이 거부할 수 있고 손해배상을 청구하기 어려워요. 임차인의 권리금 회수가 사실상 불가능해져요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 29: 명도소송 강제집행 절차 ──
  "sangga-myeongdo-gangjejibe-jeolcha-jiphaengwan": {
    "after-0": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "집행문 부여 신청", desc: "법원 민원실에서 판결문에 집행문 부여 신청" },
          { step: "2", title: "강제집행 신청서 제출", desc: "집행관실에 신청서 + 집행문·확정증명서·송달증명서 제출 + 비용 예납" },
          { step: "3", title: "계고장 부착 (자진퇴거 기간 부여)", desc: "집행관 현장 방문 → 계고장 부착 → 통상 3~7일 기간 부여" },
          { step: "4", title: "강제 명도 집행", desc: "노무업체 동행 → 물건 반출 → 창고 임치" },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="info" title="노무업체와 보관 창고를 집행 전날까지 미리 섭외하세요">
        집행 기일에 노무업체나 창고가 준비 안 되면 집행이 연기될 수 있어요. 짐 목록을 집행관 입회 하에 작성해두면 나중에 분실 책임 분쟁을 막을 수 있어요.
      </WarningBox>
    ),
    "after-3": (
      <WarningBox type="info" title="임차인이 남긴 짐은 목록 작성 후 창고에 보관하세요">
        강제집행 후 남은 물건은 임치 창고에 보관하고 임차인에게 반출 기한을 통보하세요. 기한 내 미수거 시 집행관 허가 후 처분할 수 있어요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 30: 제소전화해 조서 ──
  "sangga-jesojeong-hwahae-joseo-gangjejibe": {
    top: (
      <StatCard
        items={[
          { label: "효력", value: "확정판결과 동일", sub: "민사소송법 제220조" },
          { label: "인지대", value: "소송의 1/10", sub: "비용이 저렴한 편" },
          { label: "명도소송 불필요", value: "즉시 집행 가능", sub: "계약 만료 후 바로 강제집행 신청 가능" },
        ]}
      />
    ),
    "after-0": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "화해 신청서 작성", desc: "당사자 정보, 임대차 목적물, 화해 조항 기재" },
          { step: "2", title: "관할 지방법원에 신청서 제출", desc: "인지대·송달료 납부 후 접수" },
          { step: "3", title: "화해 기일 출석", desc: "임대인·임차인 양 당사자 법원 출석 + 조항 확인" },
          { step: "4", title: "조서 성립", desc: "확정판결과 동일 효력 → 집행문 부여 후 강제집행 가능" },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="warning" title="상임법 강행규정 위반 조항은 무효예요">
        임차인의 계약갱신요구권 포기, 권리금 보호 배제 등 상임법 강행규정에 반하는 조항은 제소전화해 조서에 담겨도 무효예요. 명도 이행 의무 확인에 초점을 맞춘 조서를 작성하세요.
      </WarningBox>
    ),
    "after-3": (
      <WarningBox type="info" title="제소전화해는 계약 체결 시점에 함께 진행하는 것이 가장 현실적이에요">
        분쟁이 생긴 후에는 임차인이 협조하지 않아 제소전화해가 어려워요. 신규 임대차 계약 시 조건으로 제시하는 방법이 효과적이에요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 31: 원상복구 범위 ──
  "sangga-wongsangboggu-beomwi-imsaigin-uimu": {
    top: (
      <StatCard
        items={[
          { label: "원상복구 의무 근거", value: "민법 제615조", sub: "임차인이 설치한 시설 철거 의무" },
          { label: "자연 노후·마모", value: "임차인 면제", sub: "통상적 사용에 따른 손상은 불포함" },
          { label: "분쟁 예방 핵심", value: "입·퇴거 사진", sub: "목적물 상태 촬영으로 책임 범위 입증" },
        ]}
      />
    ),
    "after-0": (
      <ComparisonTable
        title="원상복구 의무 있는 항목 vs 없는 항목"
        columns={[
          { name: "항목" },
          { name: "원상복구 의무", highlight: true },
          { name: "근거" },
        ]}
        rows={[
          { label: "임차인 설치 인테리어·공사", values: ["임차인 설치 인테리어·공사", "있음", "민법 제615조"] },
          { label: "임차인 설치 간판·에어컨", values: ["임차인 설치 간판·에어컨", "있음", "임차인 귀책 시설"] },
          { label: "통상적 사용 마모·노후", values: ["통상적 사용 마모·노후", "없음", "자연 소모"] },
          { label: "입주 전부터 있던 시설", values: ["입주 전부터 있던 시설", "없음", "임차인 설치 아님"] },
          { label: "임대인 수선 의무 대상 파손", values: ["임대인 수선 의무 대상 파손", "없음", "민법 제623조"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="info" title="임대인이 과도한 원상복구 비용을 청구하면 다른 업체 견적서로 이의를 제기하세요">
        동일 공사 내용으로 2~3개 업체 견적을 받아 비교하면 임대인 청구 금액의 과다 여부를 판단할 수 있어요. 감정평가사나 건축사 감정도 활용할 수 있어요.
      </WarningBox>
    ),
    "after-3": (
      <WarningBox type="warning" title="퇴거 당일 임대인과 함께 목적물 상태를 확인하고 서명을 받아두세요">
        퇴거 후 임대인이 추가 원상복구 비용을 청구하는 분쟁을 막으려면 반환 당시 상태를 사진·영상으로 기록하고 임대인의 확인 서명을 받아두는 것이 가장 안전해요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 32: 보증금 공제 항목 ──
  "sangga-bojeunggeum-gongje-mihap-imdaeryo": {
    top: (
      <StatCard
        items={[
          { label: "공제 가능 항목", value: "미납 임대료·관리비", sub: "임차인 동의 불필요" },
          { label: "원상복구 비용", value: "실제 공사비만", sub: "과도한 공제 이의 가능" },
          { label: "임대료 소멸시효", value: "3년", sub: "시효 완성 채권 공제는 법적 다툼 있음" },
        ]}
      />
    ),
    "after-0": (
      <ComparisonTable
        title="보증금 공제 항목별 가능 여부"
        columns={[
          { name: "공제 항목" },
          { name: "공제 가능 여부", highlight: true },
          { name: "주의사항" },
        ]}
        rows={[
          { label: "미납 임대료", values: ["미납 임대료", "가능", "납부 내역으로 입증 필요"] },
          { label: "미납 관리비", values: ["미납 관리비", "가능 (계약서 명시 시)", "임차인 부담 항목 확인"] },
          { label: "원상복구 비용", values: ["원상복구 비용", "가능 (실제 공사비 한도)", "과다 청구 이의 가능"] },
          { label: "임대인 수선 의무 대상", values: ["임대인 수선 의무 대상", "불가", "임대인 부담 항목"] },
          { label: "3년 초과 연체 임대료", values: ["3년 초과 연체 임대료", "법적 다툼 있음", "소멸시효 주장 가능"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="info" title="보증금 공제 이의는 내용증명 발송 + 임대차분쟁조정위원회 조정 신청을 병행하세요">
        이의 내용증명 발송 후 조정을 신청하면 소송 없이 3~6개월 내에 분쟁을 해결할 수 있어요. 조정이 안 되면 보증금 반환 청구 소송을 제기하세요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 33: 임차인 파산 회생 ──
  "sangga-imsaigin-pasan-hoesaeng-myeongdo": {
    top: (
      <StatCard
        items={[
          { label: "파산관재인 권한", value: "이행 또는 해지 선택", sub: "채무자회생법 제335조" },
          { label: "임대인 계약 해지", value: "파산 자체로는 불가", sub: "연체 등 별도 사유 필요" },
          { label: "보증금 반환", value: "파산재단에 반환", sub: "미납 차임 공제 후 잔액" },
        ]}
      />
    ),
    "after-0": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "임차인 파산 선고 확인", desc: "파산 법원 공고 확인, 파산관재인 연락처 파악" },
          { step: "2", title: "채권 신고", desc: "파산 법원에 미납 임대료 등 채권 신고 (기간 내 필수)" },
          { step: "3", title: "파산관재인의 이행/해지 선택 확인", desc: "파산관재인에게 상당 기간 내 선택 요청 가능" },
          { step: "4", title: "해지 시 명도 절차 진행", desc: "파산관재인 해지 선택 후 퇴거 요청 → 강제집행" },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="파산 채권 신고 기간을 절대 놓치지 마세요">
        파산 법원이 정한 채권 신고 기간 내에 신고하지 않으면 배당을 받지 못할 수 있어요. 파산 공고를 확인하는 즉시 법률 전문가와 함께 채권 신고를 준비하세요.
      </WarningBox>
    ),
    "after-3": (
      <WarningBox type="info" title="임차인 개인회생 중에도 임대료 납부가 계속되면 계약 해지 불가해요">
        개인회생 신청만으로는 임대인이 계약을 해지할 수 없어요. 하지만 임대료를 3기 연체하면 회생 절차 중에도 해지 사유가 될 수 있어요. 납부 상황을 주시하세요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 34: 점유이전금지 가처분 ──
  "sangga-jeomyu-ijeonggeumji-gacheobun-gongtak": {
    top: (
      <StatCard
        items={[
          { label: "신청 인지대", value: "약 1만 원", sub: "공탁금은 목적물 가치의 5~15%" },
          { label: "공탁보증보험", value: "현금 공탁 대체", sub: "보험료는 공탁금의 1~2%" },
          { label: "결정까지 소요기간", value: "1~2주", sub: "결정 후 집행관 집행" },
        ]}
      />
    ),
    "after-0": (
      <WarningBox type="warning" title="명도소송 전에 반드시 가처분을 먼저 신청하세요">
        가처분 없이 소송 중 임차인이 점유를 이전하면 새 소송이 필요해요. 시간과 비용이 크게 낭비될 수 있으니 소장 제출 전 또는 동시에 가처분을 신청하세요.
      </WarningBox>
    ),
    "after-2": (
      <ComparisonTable
        title="강제집행 계고 vs 본집행 비교"
        columns={[
          { name: "구분" },
          { name: "내용" },
          { name: "임차인 조치", highlight: true },
        ]}
        rows={[
          { label: "계고", values: ["계고", "집행관이 계고장 부착 + 자진퇴거 기간 통보", "자진퇴거 시 본집행 불필요"] },
          { label: "본집행", values: ["본집행", "노무업체와 함께 물건 반출 + 강제 퇴거", "저항 시 집행방해죄 성립"] },
          { label: "자진퇴거 합의", values: ["자진퇴거 합의", "이사비 지원 + 공정증서 작성", "강제집행 비용 절약"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="info" title="자진퇴거 합의 시 공정증서로 만들어두면 약속 위반 시 즉시 집행 가능해요">
        합의서를 공증하면 임차인이 약속을 어겨도 별도 소송 없이 강제집행이 가능해요. 합의 기간을 명확히 정하고 기간 내 불이행 시 즉시 집행 전환 방침을 세워두세요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 35: 권리금 기타소득 필요경비 세율 ──
  "sangga-gwoligeum-gitasodeuk-pillyogyeongbi": {
    top: (
      <StatCard
        items={[
          { label: "필요경비 공제율", value: "60%", sub: "기타소득금액 = 권리금 × 40%" },
          { label: "원천징수 세율", value: "22%", sub: "원천징수 = 권리금 × 40% × 22%" },
          { label: "실효 세율", value: "8.8%", sub: "권리금 수령액 기준 실제 납부 비율" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="소득 구간별 종합소득세율"
        columns={[
          { name: "과세표준 구간" },
          { name: "세율" },
          { name: "누진공제액", highlight: true },
        ]}
        rows={[
          { label: "1,400만 원 이하", values: ["1,400만 원 이하", "6%", "0원"] },
          { label: "5,000만 원 이하", values: ["1,400만~5,000만 원", "15%", "126만 원"] },
          { label: "8,800만 원 이하", values: ["5,000만~8,800만 원", "24%", "576만 원"] },
          { label: "1.5억 원 이하", values: ["8,800만~1.5억 원", "35%", "1,544만 원"] },
          { label: "1.5억~3억 원", values: ["1.5억~3억 원", "38%", "1,994만 원"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="종합소득세 확정신고 시 분리과세와 종합합산을 비교해 유리한 방식을 선택하세요">
        기타소득이 300만 원 초과이면 종합합산 신고를 해야 해요. 300만 원 이하이면 원천징수로 분리과세를 선택할 수 있어요. 다른 소득이 많으면 종합합산 시 세율이 높아질 수 있으니 세무사와 상담하세요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 36: 권리금 부가가치세 ──
  "gwoligeum-bugase-segeumgyesan-pogwal": {
    top: (
      <StatCard
        items={[
          { label: "부가세율", value: "10%", sub: "권리금 × 10% = 양도인이 납부" },
          { label: "포괄양수도 부가세", value: "면제", sub: "사업의 동일성 유지 요건 충족 시" },
          { label: "세금계산서 발행", value: "공급일로부터 10일 이내", sub: "지연 발행 시 가산세 1%" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="부가가치세 발생 여부 비교"
        columns={[
          { name: "구분" },
          { name: "부가세 발생" },
          { name: "비고", highlight: true },
        ]}
        rows={[
          { label: "일반 권리금 양도", values: ["일반 권리금 양도", "발생 (10%)", "세금계산서 발행 의무"] },
          { label: "포괄양수도", values: ["포괄양수도", "면제", "업종 동일·사업 연속성 필요"] },
          { label: "면세사업자 간 거래", values: ["면세사업자 간 거래", "해당 없음", "계산서(면세) 발행"] },
          { label: "간이과세자", values: ["간이과세자", "간이과세율 적용", "세금계산서 발행 불가인 경우도 있음"] },
        ]}
      />
    ),
    "after-2": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "권리금 계약 체결", desc: "권리금 금액, 지급 방법, 이전 항목 명시" },
          { step: "2", title: "세금계산서 발행", desc: "공급일(대금 수령일)로부터 10일 이내 전자세금계산서 발행" },
          { step: "3", title: "부가세 신고·납부", desc: "양도인이 해당 분기 부가세 신고 시 포함해 납부" },
          { step: "4", title: "포괄양수도 신고", desc: "포괄양수도로 처리 시 관할 세무서에 신고서 제출" },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="포괄양수도 요건을 갖추지 못하면 부가세가 소급 부과될 수 있어요">
        업종이 달라지거나 사업 운영이 중단되면 포괄양수도 요건이 부인될 수 있어요. 계약서에 포괄양수도 문구를 명시하고 세무사를 통해 사전 검토를 받으세요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 37: 권리금 원천징수 ──
  "gwoligeum-weoncheongjingsu-gyesan-yangsu": {
    top: (
      <StatCard
        items={[
          { label: "원천징수 실효율", value: "8.8%", sub: "권리금 × 40% × 22%" },
          { label: "신고·납부 기한", value: "지급일 다음 달 10일", sub: "사업자인 양수인이 원천징수 의무" },
          { label: "지방소득세 포함", value: "8.8% = 소득세 8% + 지방소득세 0.8%", sub: "지방소득세는 별도 신고" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="원천징수 계산 예시"
        columns={[
          { name: "권리금" },
          { name: "필요경비(60%)" },
          { name: "기타소득금액(40%)" },
          { name: "원천징수액(22%)", highlight: true },
        ]}
        rows={[
          { label: "1,000만 원", values: ["1,000만 원", "600만 원", "400만 원", "88만 원"] },
          { label: "3,000만 원", values: ["3,000만 원", "1,800만 원", "1,200만 원", "264만 원"] },
          { label: "5,000만 원", values: ["5,000만 원", "3,000만 원", "2,000만 원", "440만 원"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="양수인이 원천징수를 이행하지 않으면 가산세와 함께 납부 책임이 생겨요">
        사업자인 양수인이 원천징수를 하지 않으면 불이행 가산세(미납 세액의 10%)가 부과돼요. 권리금 지급 시 반드시 8.8%를 공제하고, 다음 달 10일까지 세무서에 신고·납부하세요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 38: 권리금 양도소득세 ──
  "gwoligeum-yangdosodeukse-gyesan-bigyo": {
    top: (
      <StatCard
        items={[
          { label: "부동산과 함께 양도 시", value: "양도소득세 과세", sub: "영업권이 사업용 고정자산에 포함" },
          { label: "단독 권리금 양도", value: "기타소득세 과세", sub: "원천징수 8.8%" },
          { label: "양도소득 기본공제", value: "연 250만 원", sub: "다른 양도 자산과 합산" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="기타소득 vs 양도소득 과세 비교"
        columns={[
          { name: "구분" },
          { name: "기타소득" },
          { name: "양도소득", highlight: true },
        ]}
        rows={[
          { label: "과세 시기", values: ["과세 시기", "권리금 수령 시점", "부동산 양도 시점에 합산"] },
          { label: "필요경비 공제", values: ["필요경비 공제", "권리금 × 60%", "실제 취득가액 + 필요경비"] },
          { label: "세율", values: ["세율", "22% (소득금액의 22%)", "6~45% (누진세율)"] },
          { label: "신고 방식", values: ["신고 방식", "양수인이 원천징수", "양도인이 예정·확정 신고"] },
          { label: "납부 시기", values: ["납부 시기", "지급 다음 달 10일", "양도일 속하는 달의 말일부터 2개월 내"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="부동산과 함께 권리금을 양도하면 반드시 세무사 상담을 받으세요">
        영업권을 부동산과 함께 양도할 때는 가액 배분 방식에 따라 세금 차이가 크게 날 수 있어요. 계약서에 권리금과 부동산 가격을 명확히 구분해 기재하는 것이 중요해요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 39: 권리금 포괄양수도 요건 ──
  "gwoligeum-pogwal-yangsu-yopgeon-byeol": {
    top: (
      <StatCard
        items={[
          { label: "포괄양수도 핵심 요건", value: "사업의 동일성 유지", sub: "업종 동일 + 모든 자산·부채 이전" },
          { label: "부가세 면제 효과", value: "권리금 10% 절세", sub: "조건 불충족 시 소급 부과 위험" },
          { label: "관련 규정", value: "부가가치세법 제10조 제8항", sub: "사업의 양도 규정" },
        ]}
      />
    ),
    "after-0": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "업종 동일성 확인", desc: "양도인과 양수인의 업종이 동일해야 함 (업태·종목 일치)" },
          { step: "2", title: "모든 자산·부채 이전 계약 체결", desc: "영업에 관한 권리·의무 전체 양도 명시" },
          { step: "3", title: "사업자 지위 승계", desc: "사업자등록 변경 또는 신규 등록 (양도일로부터 20일 이내)" },
          { step: "4", title: "세무서 신고", desc: "포괄양수도 사실 신고 (일반적으로 부가세 신고 시 함께)" },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="업종이 달라지면 포괄양수도로 인정되지 않아 부가세가 발생해요">
        커피숍에서 편의점으로 업종을 변경하는 경우처럼 업태·종목이 달라지면 사업의 동일성이 인정되지 않아요. 포괄양수도 처리 후 업종을 변경하면 세무서가 부가세를 소급 부과할 수 있어요.
      </WarningBox>
    ),
    "after-3": (
      <WarningBox type="info" title="포괄양수도 계약서에 구체적인 이전 자산 목록을 첨부해두면 분쟁 예방에 도움이 돼요">
        비품, 재고, 영업권, 거래처 목록 등 이전 항목을 계약서 별지로 첨부하세요. 세무 조사 시 포괄양수도 요건 충족 여부를 입증하는 핵심 자료가 돼요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 40: 권리금 영업권 무형자산 감가상각 ──
  "gwoligeum-yeongeoprwon-gamgasamgak-yangsu": {
    top: (
      <StatCard
        items={[
          { label: "영업권 상각 기간", value: "5년", sub: "정액법 적용 (매년 취득가액 × 20%)" },
          { label: "무형자산 계정 처리", value: "영업권 (무형자산)", sub: "취득 시점부터 상각 시작" },
          { label: "세법상 상각 한도", value: "5년 균등 상각", sub: "임의 변경 불가" },
        ]}
      />
    ),
    "after-1": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "권리금 취득", desc: "권리금을 무형자산(영업권)으로 회계 처리 — 차변: 영업권, 대변: 현금" },
          { step: "2", title: "상각 기간 설정", desc: "세법상 5년 정액법 적용 — 연간 비용 = 취득가액 ÷ 5" },
          { step: "3", title: "연간 감가상각비 계상", desc: "매 회계연도 결산 시 감가상각비로 비용 처리 — 차변: 감가상각비, 대변: 무형자산상각누계액" },
          { step: "4", title: "법인세(소득세) 신고 시 반영", desc: "5년간 매년 비용으로 인정받아 과세소득 절감" },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="info" title="권리금이 크다면 감가상각으로 5년에 걸쳐 세금을 절감할 수 있어요">
        권리금 3,000만 원을 취득하면 매년 600만 원씩 비용 처리가 가능해요. 법인세율 10~25%, 소득세율 6~45%를 고려하면 5년간 절세 효과가 상당해요. 기장 세무사를 통해 무형자산 등록을 꼭 하세요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 41: 권리금 무자료 거래 세무조사 위험 ──
  "sangga-gwoligeum-muryo-semujo": {
    top: (
      <StatCard
        items={[
          { label: "무신고 가산세", value: "20%", sub: "부정 무신고 시 40%까지" },
          { label: "납부 불성실 가산세", value: "일 0.022%", sub: "미납 기간 동안 누적" },
          { label: "지출증빙 미수취 가산세", value: "2%", sub: "법인의 경우 추가 부과" },
        ]}
      />
    ),
    "after-1": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "권리금 계약서 작성", desc: "금액, 이전 항목, 양도인·양수인 인적 사항 명확 기재" },
          { step: "2", title: "원천징수 이행 (양수인)", desc: "지급일 다음 달 10일까지 권리금 × 40% × 22% 신고·납부" },
          { step: "3", title: "세금계산서 발행 (양도인)", desc: "공급일로부터 10일 이내 전자세금계산서 발행" },
          { step: "4", title: "종합소득세 신고 (양도인)", desc: "다음 해 5월 기타소득 합산 또는 분리과세 선택" },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="현금 거래라도 양수인 장부·중개기록으로 국세청에 적발될 수 있어요">
        양수인이 영업권을 무형자산으로 장부에 올리면 국세청이 역으로 양도인 소득을 확인해요. 권리금을 현금으로 수수했다고 안심하면 안 돼요. 자진 신고하면 가산세를 크게 줄일 수 있어요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 42: 권리금 분리과세 선택 기준 ──
  "gwoligeum-bunnigwasei-seonaek-gitasodeuk": {
    top: (
      <StatCard
        items={[
          { label: "분리과세 한도", value: "기타소득금액 300만 원 이하", sub: "권리금 750만 원 이하 시 해당" },
          { label: "원천징수 세율", value: "22%", sub: "소득금액(권리금 × 40%) 기준" },
          { label: "기타소득 수입 시기", value: "대금 지급받은 날", sub: "계약일 아닌 실제 입금일 기준" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="분리과세 vs 종합합산 유불리 비교"
        columns={[
          { name: "구분" },
          { name: "분리과세" },
          { name: "종합합산", highlight: true },
        ]}
        rows={[
          { label: "적용 세율", values: ["적용 세율", "22% (고정)", "6~45% (누진)"] },
          { label: "유리한 경우", values: ["유리한 경우", "다른 소득 많아 합산 세율 22% 이상", "다른 소득 적어 세율 6~15%"] },
          { label: "신고 의무", values: ["신고 의무", "없음 (원천징수로 종결)", "5월 종합소득세 확정신고"] },
          { label: "환급 가능 여부", values: ["환급 가능 여부", "불가", "차액 환급 가능"] },
          { label: "선택 가능 조건", values: ["선택 가능 조건", "기타소득금액 300만 원 이하", "기타소득금액 초과 시 의무"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="info" title="다른 소득이 적다면 5월에 종합신고를 해서 환급을 받으세요">
        원천징수로 납부한 8.8%보다 합산 세율이 낮은 경우 차액을 환급받을 수 있어요. 소득이 낮은 해에 권리금을 수령했다면 5월 확정신고가 유리해요. 세무사 상담으로 어느 쪽이 유리한지 계산해보세요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 43: 권리금 세금 양도인 양수인 비교 ──
  "gwoligeum-se-yangdoin-yangsu-bigyo": {
    top: (
      <StatCard
        items={[
          { label: "양도인 기타소득세 실효율", value: "8.8%", sub: "권리금 × 40% × 22%" },
          { label: "양수인 부가세 부담", value: "10%", sub: "포괄양수도 시 면제" },
          { label: "포괄양수도 절세 효과", value: "권리금 × 10%", sub: "5,000만 원 기준 500만 원 절감" },
        ]}
      />
    ),
    "after-0": (
      <ComparisonTable
        title="권리금 5,000만 원 기준 세금 부담 비교"
        columns={[
          { name: "구분" },
          { name: "양도인 (받는 쪽)" },
          { name: "양수인 (주는 쪽)", highlight: true },
        ]}
        rows={[
          { label: "기타소득세(8.8%)", values: ["기타소득세(8.8%)", "440만 원 납부", "원천징수 후 세무서 납부"] },
          { label: "부가가치세(10%)", values: ["부가가치세(10%)", "500만 원 납부", "양도인에게 별도 지급"] },
          { label: "포괄양수도 시", values: ["포괄양수도 시", "부가세 면제", "부가세 지급 불필요"] },
          { label: "실수령/실지급", values: ["실수령/실지급", "4,560만 원 (부가세 별도)", "5,500만 원 (부가세 포함)"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="info" title="계약서에 부가세 포함 여부와 원천징수 처리 방식을 명확히 기재하세요">
        세금 부담 주체를 계약서에 명시하지 않으면 사후 분쟁이 생겨요. 권리금 금액, 부가세 포함 여부, 원천징수 처리 방식을 별도 조항으로 넣으면 분쟁을 예방할 수 있어요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 44: 권리금 감정평가 영업권 세금 ──
  "gwoligeum-gamjeongpyeong-yeongeoprwon-se": {
    top: (
      <StatCard
        items={[
          { label: "권리금 3유형", value: "영업권·시설·바닥", sub: "유형별 세금 처리 방식이 달라요" },
          { label: "단독 양도 시 과세", value: "기타소득세 (8.8%)", sub: "원천징수 후 종합소득세 신고" },
          { label: "부동산 함께 양도 시", value: "양도소득세 과세", sub: "양도차익에 누진세율 적용" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="단독 양도 vs 부동산 함께 양도 세금 비교"
        columns={[
          { name: "구분" },
          { name: "권리금 단독 양도" },
          { name: "부동산과 함께 양도", highlight: true },
        ]}
        rows={[
          { label: "소득 구분", values: ["소득 구분", "기타소득", "양도소득"] },
          { label: "필요경비 공제", values: ["필요경비 공제", "수령액 × 60%", "실제 취득가액 + 필요경비"] },
          { label: "세율", values: ["세율", "22% (기타소득금액 기준)", "6~45% (양도차익 기준)"] },
          { label: "신고 방식", values: ["신고 방식", "원천징수 + 5월 확정신고", "양도일로부터 2개월 내 예정신고"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="건물과 권리금을 함께 팔 때는 계약서에 금액을 반드시 분리 기재하세요">
        분리 기재가 없으면 국세청이 임의로 배분해 세금이 늘어날 수 있어요. 부동산 취득 시 영업권 취득가도 함께 기재해두어야 나중에 양도소득세 계산 시 취득원가를 인정받아요.
      </WarningBox>
    ),
  },

  // ── 부동산임대차 Article 45: 권리금 무신고 불이익 추징 위험 ──
  "gwoligeum-musingo-booliyik-gasan": {
    top: (
      <StatCard
        items={[
          { label: "무신고 가산세", value: "20%", sub: "고의 탈세 시 40%" },
          { label: "기한 후 신고 감면", value: "1개월 이내 50%", sub: "1년 이내 20%, 세무조사 착수 전 한정" },
          { label: "수정신고 감면", value: "1개월 이내 90%", sub: "1년 이내 50%, 2년 이내 20%" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="자진 신고 시기별 가산세 감면율"
        columns={[
          { name: "신고 시기" },
          { name: "수정신고 감면율" },
          { name: "기한 후 신고 감면율", highlight: true },
        ]}
        rows={[
          { label: "1개월 이내", values: ["1개월 이내", "90% 감면", "50% 감면"] },
          { label: "3개월 이내", values: ["3개월 이내", "75% 감면", "30% 감면"] },
          { label: "6개월 이내", values: ["6개월 이내", "50% 감면", "20% 감면"] },
          { label: "1년 이내", values: ["1년 이내", "30% 감면", "20% 감면"] },
          { label: "2년 이내", values: ["2년 이내", "20% 감면", "없음"] },
          { label: "세무조사 착수 후", values: ["세무조사 착수 후", "감면 없음", "감면 없음"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="세무조사 통보를 받기 전에 자진 신고하면 가산세를 크게 줄일 수 있어요">
        조사 착수 후에는 가산세 감면이 없어요. 뒤늦게라도 신고 의무를 인지했다면 지금 바로 세무사와 상담해 기한 후 신고나 수정신고를 진행하세요. 빠를수록 감면율이 높아요.
      </WarningBox>
    ),
  },

  // ── 46. 재개발 임시상가 입주 자격 ──
  "jaegebal-imsisangga-ipju-jakyeok": {
    "after-0": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "사업시행계획 공고 확인", desc: "관할 구청 또는 조합에서 임시상가 설치 여부 공고 확인" },
          { step: "2", title: "입주 신청 안내문 수령", desc: "사업시행자가 이주 개시 전 발송하는 안내문 확인" },
          { step: "3", title: "서류 준비", desc: "사업자등록증, 임대차계약서, 영업 확인 서류 준비" },
          { step: "4", title: "신청서 제출", desc: "조합 사무소 또는 사업시행자에게 기한 내 제출" },
          { step: "5", title: "임시상가 배정", desc: "선착순 또는 추첨 방식으로 입주 위치 배정" },
        ]}
      />
    ),
    "after-1": (
      <AccordionChecklist
        groups={[
          {
            title: "임시상가 입주 신청 서류",
            items: [
              "사업자등록증 사본",
              "임대차계약서 사본",
              "영업 확인 서류 (허가증, 신고증 등)",
              "신분증 사본",
              "입주 신청서 (사업시행자 양식)",
            ],
          },
          {
            title: "이주비 대출 신청 서류",
            items: [
              "이주비 대출 신청서",
              "사업자등록증 및 임대차계약서",
              "사업시행인가 고시문 사본",
              "이주 계획서",
            ],
          },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="사업시행인가 이후 임차인은 임시상가 입주 대상에서 제외될 수 있어요">
        임시상가 입주 및 영업손실보상 대상은 사업시행인가 고시일 이전부터 적법하게 영업 중인 임차인이에요. 인가 이후 체결한 계약은 보상 대상에서 제외되는 경우가 많아요.
      </WarningBox>
    ),
    "after-3": (
      <StatCard
        items={[
          { label: "임시상가 철거 기한", value: "60~90일", sub: "준공 인가 후 이내" },
          { label: "협의 기간", value: "30일 이상", sub: "이주 개시 전 신청 안내" },
          { label: "이의신청", value: "1년 이내", sub: "협의 만료일부터" },
        ]}
      />
    ),
  },

  // ── 47. 재건축 재개발 보상 차이 ──
  "jaegeonsuk-jaegebal-bosan-chai": {
    top: (
      <ComparisonTable
        title="재건축 vs 재개발 보상 비교"
        columns={[
          { name: "재건축" },
          { name: "재개발", highlight: true },
        ]}
        rows={[
          { label: "적용 법령", values: ["자체 내규 (임의)", "토지보상법 (의무)"] },
          { label: "영업손실보상", values: ["법적 의무 없음", "법적 의무 있음"] },
          { label: "이주비", values: ["협상에 따라 가능", "지급 의무 있음"] },
          { label: "수용 재결", values: ["불가 (공익사업 아님)", "가능"] },
          { label: "퇴거 시기", values: ["관리처분계획 인가 후", "수용 재결 후"] },
        ]}
      />
    ),
    "after-2": (
      <ComparisonTable
        title="영업폐지 보상 vs 이주비 (영업이전비) 비교"
        columns={[
          { name: "영업폐지 보상" },
          { name: "이주비 (영업이전비)", highlight: true },
        ]}
        rows={[
          { label: "선택 요건", values: ["폐업 결정 시", "이주 후 영업 지속 시"] },
          { label: "보상 기준", values: ["2년치 영업이익", "이전 비용 + 3개월 손실"] },
          { label: "폐업 신고", values: ["필수", "불필요"] },
          { label: "선택 변경", values: ["합의 전까지 가능", "합의 전까지 가능"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="재건축·재개발 모두 퇴거 전에 보상액을 반드시 확인하세요">
        법적 보호 범위가 재건축과 재개발에서 크게 다르므로 초기부터 법무사나 변호사 상담을 받는 것이 좋아요. 합의서에 서명하면 추가 보상을 요구하기 어려워요.
      </WarningBox>
    ),
  },

  // ── 48. 재개발 영업폐지 보상 요건 ──
  "jaegebal-yeongeopjeji-bosan-yogeon": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "영업폐지 보상 요건 체크리스트",
            items: [
              "사업시행인가 고시일 이전부터 영업 중",
              "적법한 사업자등록 보유",
              "임대차계약서와 사업자등록 주소 일치",
              "이주 후 해당 장소에서만 가능한 영업 (이전 불가)",
              "실제 폐업 신고 완료",
            ],
          },
          {
            title: "감정평가 제출 서류",
            items: [
              "최근 3년 종합소득세 신고서",
              "최근 3년 부가가치세 신고서",
              "매출·비용 관련 장부 또는 통장 내역",
              "임대차계약서 및 사업자등록증",
            ],
          },
        ]}
      />
    ),
    "after-1": (
      <StatCard
        items={[
          { label: "보상 기준 기간", value: "2년치", sub: "영업이익 기준 감정평가" },
          { label: "감정평가 주체", value: "2개 이상", sub: "감정평가법인 평균" },
          { label: "이의신청 기한", value: "30일 이내", sub: "재결서 정본 수령 후" },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="info" title="권리금은 재개발 사업시행자에게 청구할 수 없어요">
        권리금은 토지보상법상 보상 항목이 아니에요. 임대인에게 민사 청구는 가능하지만 사업시행자(조합)에게는 직접 청구가 어려워요. 임대차계약 체결 시 권리금 반환 약정을 계약서에 반드시 넣어두세요.
      </WarningBox>
    ),
    "after-3": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "보상 협의 통보 수령", desc: "사업시행자로부터 개별 보상 협의 통보" },
          { step: "2", title: "감정평가서 확인", desc: "2개 감정평가법인 평가 결과 수령 및 검토" },
          { step: "3", title: "이의 있으면 재평가 요청", desc: "다른 감정평가법인에 의뢰하여 이의 제기" },
          { step: "4", title: "재결 신청", desc: "협의 불성립 시 토지수용위원회에 재결 신청" },
          { step: "5", title: "행정소송", desc: "재결 불복 시 90일 이내 행정소송 제기 가능" },
        ]}
      />
    ),
  },

  // ── 49. 재개발 상가 명도 거부 보상 협의 ──
  "jaegebal-sangga-myeongdo-bosan-hyeobi": {
    "after-0": (
      <StatCard
        items={[
          { label: "협의 기간 (법정)", value: "30일 이상", sub: "보상 계획 공고 후 부여" },
          { label: "재결 소요 기간", value: "3~6개월", sub: "신청 후 재결까지" },
          { label: "이의신청 기한", value: "30일 이내", sub: "재결서 정본 수령 후" },
          { label: "행정소송 기한", value: "90일 이내", sub: "이의재결서 수령 후" },
        ]}
      />
    ),
    "after-1": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "보상 계획 공고", desc: "사업시행인가 고시 후 사업시행자가 보상 계획 공고" },
          { step: "2", title: "개별 협의 통보", desc: "임차인에게 개별 보상 협의 통보 (30일 이상 협의 기간)" },
          { step: "3", title: "감정평가서 수령", desc: "임차인은 감정평가서를 제출받아 보상액 확인" },
          { step: "4", title: "합의서 서명", desc: "합의 성립 시 합의서 작성 및 보상금 수령" },
        ]}
      />
    ),
    "after-2": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "재결 신청", desc: "협의 불성립 시 토지수용위원회에 재결 신청 (기한: 협의 만료 후 1년 이내)" },
          { step: "2", title: "심리 기일 지정", desc: "신청 후 30~60일 이내 심리 기일 지정" },
          { step: "3", title: "재결 결정", desc: "통상 3~6개월 이내 재결 — 보상금 결정" },
          { step: "4", title: "보상금 공탁", desc: "사업시행자가 보상금 공탁 후 명도 소송 가능" },
        ]}
      />
    ),
    "after-3": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "이의신청", desc: "재결 불복 시 재결서 정본 수령 후 30일 이내 중앙토지수용위원회에 신청" },
          { step: "2", title: "이의재결", desc: "중앙토지수용위원회가 이의재결 결정" },
          { step: "3", title: "행정소송", desc: "이의재결에 불복 시 재결서 수령 후 90일 이내 행정소송 제기 가능" },
        ]}
      />
    ),
  },

  // ── 50. 재개발 상가 임차인 우선분양 ──
  "jaegebal-imsaigin-useondongbyang": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "우선분양 신청 요건 체크리스트",
            items: [
              "사업시행인가 고시일 이전부터 적법하게 영업 중",
              "사업시행계획서에 세입자 우선분양 조항 명시",
              "사업자등록증 및 임대차계약서 보유",
              "분양 공고 기한 내 신청서 제출",
            ],
          },
          {
            title: "우선분양 신청 서류",
            items: [
              "우선분양 신청서 (사업시행자 양식)",
              "사업자등록증 사본",
              "임대차계약서 사본",
              "영업 확인 서류",
              "신분증 사본",
            ],
          },
        ]}
      />
    ),
    "after-1": (
      <StatCard
        items={[
          { label: "계약금 비율", value: "10~20%", sub: "분양가 대비" },
          { label: "공고 시기", value: "관리처분 인가 후", sub: "사업시행자 공고" },
          { label: "신청 기한", value: "공고 내 기간", sub: "초과 시 일반 분양 전환" },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="사업시행계획서에 우선분양 조항이 없으면 신청 자체가 불가능해요">
        상가 임차인의 우선분양권은 법적으로 강제되는 권리가 아니에요. 사업시행계획서 공람 기간에 조항이 포함됐는지 반드시 확인하고, 미포함 시 의견 제출 기간에 포함 요청을 하세요.
      </WarningBox>
    ),
    "after-3": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "사업시행계획서 확인", desc: "공람 기간에 우선분양 조항 포함 여부 확인" },
          { step: "2", title: "분양 공고 확인", desc: "관리처분계획 인가 후 사업시행자 공고 확인" },
          { step: "3", title: "신청서 제출", desc: "공고 기한 내 서류 제출 (기한 초과 시 일반 분양 전환)" },
          { step: "4", title: "배정 및 계약 체결", desc: "추첨 또는 선착순 배정 후 분양 계약 체결" },
        ]}
      />
    ),
  },

  // ── 51. 단순경비율 간편장부 차이 ──
  "sangga-imdaesaeobja-dansoonggyeongbiyul-bipyo": {
    "after-0": (
      <StatCard
        items={[
          { label: "단순경비율 적용 기준", value: "2,400만 원 미만", sub: "직전 연도 임대수입" },
          { label: "복식부기 의무 기준", value: "7,500만 원 이상", sub: "직전 연도 임대수입" },
          { label: "기장 공제 한도", value: "100만 원", sub: "산출세액의 20%" },
        ]}
      />
    ),
    "after-2": (
      <ComparisonTable
        title="단순경비율 vs 간편장부 비교"
        columns={[
          { name: "단순경비율" },
          { name: "간편장부", highlight: true },
        ]}
        rows={[
          { label: "적용 기준", values: ["수입 2,400만 원 미만", "수입 2,400만~7,500만 원"] },
          { label: "대출이자 공제", values: ["불가", "가능 (실제 지출액)"] },
          { label: "기장 공제", values: ["없음", "산출세액 20% (한도 100만 원)"] },
          { label: "기장 부담", values: ["없음 (간편)", "수입·지출 기록 필요"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="복식부기 의무자가 간편장부로 신고하면 산출세액 20%가 가산세로 부과돼요">
        직전 연도 임대수입이 7,500만 원 이상이면 반드시 복식부기로 신고해야 해요. 복식부기 의무자임을 모르고 간편장부로 신고하면 가산세 부담이 커요.
      </WarningBox>
    ),
  },

  // ── 52. 감가상각비 필요경비 산입 ──
  "sangga-imdaesaeobja-gamgasamgakbi-pillyogyeongbi": {
    "after-0": (
      <StatCard
        items={[
          { label: "철근콘크리트 기준 내용연수", value: "40년", sub: "±25% 선택 가능" },
          { label: "선택 가능 범위", value: "30~50년", sub: "철근콘크리트 기준" },
          { label: "연간 절세(24% 세율 예시)", value: "약 120만 원", sub: "건물가액 2억·내용연수 40년 기준" },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="감가상각비만큼 양도세 취득가액이 차감돼요">
        필요경비로 처리한 감가상각비 누적액은 양도소득세 계산 시 취득가액에서 빠져요. 종합소득세 절세와 양도세 증가를 종합적으로 고려해 감가상각 여부를 결정하세요.
      </WarningBox>
    ),
    "after-3": (
      <ComparisonTable
        title="장기 보유 vs 단기 매도 시 감가상각 유불리"
        columns={[
          { name: "장기 보유" },
          { name: "단기 매도", highlight: true },
        ]}
        rows={[
          { label: "감가상각 절세 효과", values: ["누적 효과 큼", "효과 제한적"] },
          { label: "양도세 증가 영향", values: ["장기보유특별공제로 상쇄 가능", "증가분이 절세보다 클 수 있음"] },
          { label: "상속·증여 예정", values: ["유리 (취득가액 리셋)", "해당 없음"] },
          { label: "감가상각 권장 여부", values: ["권장", "신중 검토 필요"] },
        ]}
      />
    ),
  },

  // ── 53. 대출이자 필요경비 인정 ──
  "sangga-imdaesaeobja-daechoolija-pillyogyeongbi": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "필요경비로 인정되는 대출이자",
            items: [
              "상가 취득 담보대출 이자",
              "임대 목적 수리·리모델링 대출 이자",
              "사업용 자산 범위 내 대출이자",
            ],
          },
          {
            title: "필요경비로 인정되지 않는 대출이자",
            items: [
              "생활비·자녀 학자금 등 사업 무관 용도 대출이자",
              "초과인출금 대응 이자 (사업용 자산 가액 초과분)",
              "임대 공실 기간 발생 이자 (전액 불인정 가능성)",
            ],
          },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="초과인출금 이자는 상가 취득 대출이더라도 경비로 인정받지 못해요">
        사업용 자산 가액을 초과하여 인출한 금액에 대응하는 이자는 필요경비에서 제외돼요. 사업용 계좌와 개인 계좌를 분리해 운용하고, 자금 사용 내역을 명확히 기록해두세요.
      </WarningBox>
    ),
    "after-3": (
      <StatCard
        items={[
          { label: "취득 전 이자 처리", value: "취득가액 산입", sub: "양도세 취득원가에 포함" },
          { label: "취득 후 이자 처리", value: "매년 필요경비", sub: "종합소득세 공제" },
          { label: "이중공제 여부", value: "불가", sub: "경비 처리 후 취득가액 중복 산입 금지" },
        ]}
      />
    ),
  },

  // ── 54. 감가상각 절세 방법 ──
  "sangga-imdaesaeobja-gamgasamgak-jonghap-bipyo": {
    top: (
      <ComparisonTable
        title="감가상각 O vs 감가상각 X 비교"
        columns={[
          { name: "감가상각 O" },
          { name: "감가상각 X", highlight: true },
        ]}
        rows={[
          { label: "종합소득세", values: ["매년 절세 (경비 증가)", "매년 세금 높음"] },
          { label: "양도소득세", values: ["취득가액 감소 → 양도세 증가", "취득가액 유지 → 양도세 낮음"] },
          { label: "장기 보유", values: ["장기보유특별공제로 양도세 완화", "유불리 동일"] },
          { label: "상속·증여 예정", values: ["유리 (취득가액 리셋)", "불리 (절세 효과 없음)"] },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="info" title="종합소득세 절세와 양도세 증가는 동전의 양면이에요">
        감가상각비 1,000만 원을 처리하면 종합소득세 세율 24%라면 240만 원 절세, 양도세율 20%라면 200만 원 증가해요. 세율 차이가 절세 유불리를 결정하므로 현재 세율 구간을 먼저 확인하세요.
      </WarningBox>
    ),
    "after-2": (
      <StatCard
        items={[
          { label: "절세 유리 조건", value: "종합소득세율 > 양도세율", sub: "고소득 임대사업자" },
          { label: "절세 불리 조건", value: "단기 매도 예정", sub: "양도세 증가 > 절세 효과" },
          { label: "상속·증여 시", value: "무조건 유리", sub: "취득가액 리셋 효과" },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="상속·증여 계획이 있다면 지금 당장 감가상각을 시작하세요">
        상속·증여 시 취득가액이 시가로 리셋되므로 감가상각 누적액의 양도세 영향이 사라져요. 생전에 감가상각을 최대한 활용하면 종합소득세만 줄이고 양도세 불이익 없이 절세할 수 있어요.
      </WarningBox>
    ),
  },

  // ── Article 55: 상가 임대사업자 종합소득세 경비 항목 ──
  "sangga-imdaesaeobja-jonghapsodeukse-gyeongbi": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "인정되는 주요 필요경비",
            items: [
              "재산세 및 종합부동산세 (납부연도 기준)",
              "임대 건물 화재보험료",
              "수선비 및 원상복구 비용",
              "공인중개사 수수료",
              "세무사 기장 수수료",
              "임대 목적 건물의 감가상각비 (기장 사업자만)",
            ],
          },
          {
            title: "인정되지 않는 비용",
            items: [
              "개인 자동차 리스비 (업무 관련성 입증 필요)",
              "지역가입자 건강보험료 (세액공제로 처리)",
              "개인적인 생활비·식대",
              "임대 목적 외 지출",
            ],
          },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="warning" title="공실 기간이 3개월 넘으면 임대 의도 입증 자료를 준비하세요">
        공실 기간 관리비·재산세는 원칙상 경비로 인정되지만, 임대 의도가 없다고 판단되면 세무 조사 시 부인될 수 있어요. 공인중개사 임대 의뢰 계약서, 인터넷 매물 등록 내역을 보관해두세요.
      </WarningBox>
    ),
    "after-2": (
      <WarningBox type="danger" title="자동차 비용은 임대사업자 경비 처리 시 세무 조사 리스크가 높아요">
        부동산임대업은 차량을 직접 사업 수단으로 쓰는 업종이 아니므로 차량 관련 비용 전액 공제는 위험해요. 운행 일지를 작성하고 업무 사용 비율을 명확히 해야 해요.
      </WarningBox>
    ),
    "after-3": (
      <StatCard
        items={[
          { label: "건강보험료 처리 방식", value: "세액공제", sub: "필요경비 아님" },
          { label: "보험료 세액공제율", value: "12%", sub: "산출세액에서 직접 차감" },
          { label: "종소세 신고 시", value: "세액공제란 입력", sub: "필요경비란 입력 금지" },
        ]}
      />
    ),
  },

  // ── Article 56: 직장인 상가 임대사업자 등록 의무 ──
  "jikjangin-sangga-imdaesaeobja-deungrok-uimu": {
    "after-0": (
      <StatCard
        items={[
          { label: "사업자 등록 기한", value: "20일 이내", sub: "사업 개시일로부터" },
          { label: "부가세 환급 조건", value: "일반과세자 등록", sub: "간이과세자는 환급 제한" },
          { label: "임대수입 분리과세 기준", value: "연 2,000만 원 이하", sub: "15.4% 분리과세 선택 가능" },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="info" title="건강보험료 변동이 간접적으로 임대소득을 노출할 수 있어요">
        직장가입자는 임대·사업소득이 연 2,000만 원을 초과하면 추가 건강보험료가 부과돼요. 이 변동이 간접적으로 임대소득을 드러낼 수 있으니 민감한 직종이라면 취업규칙을 먼저 확인하세요.
      </WarningBox>
    ),
    "after-2": (
      <ComparisonTable
        title="간이과세 vs 일반과세 비교"
        columns={[
          { name: "항목" },
          { name: "간이과세" },
          { name: "일반과세", highlight: true },
        ]}
        rows={[
          { label: "적용 기준", values: ["연 공급가액 8,000만 원 미만", "8,000만 원 이상 또는 선택"] },
          { label: "부가세율", values: ["업종별 부가가치율 × 10% (임대업 40%)", "매출세액 - 매입세액"] },
          { label: "매입세액공제", values: ["제한 있음", "전액 공제"] },
          { label: "건물분 부가세 환급", values: ["불가", "가능"] },
          { label: "세금계산서 발행", values: ["가능 (2021년 이후)", "가능"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="danger" title="사업자 미등록 시 공급가액 1% 가산세가 부과돼요">
        사업자 등록을 하지 않으면 미등록 가산세와 함께 매입세액공제도 받지 못해요. 특히 신규 상가 취득 시 등록이 늦어지면 건물분 부가세 환급 기회를 완전히 잃을 수 있어요.
      </WarningBox>
    ),
  },

  // ── Article 57: 상가 임대사업자 부가세 간주임대료 계산 ──
  "sangga-imdaesaeobja-bugase-ganjuimdaeryo": {
    "after-0": (
      <StatCard
        items={[
          { label: "간주임대료 계산 공식", value: "보증금 × 이자율 × 임대일수 / 365", sub: "부가세 = 간주임대료 × 10%" },
          { label: "보증금 1억 원 × 1년", value: "120만 원", sub: "간주임대료 (부가세 12만 원)" },
          { label: "차입금 있을 때", value: "보증금 - 차입금 잔액", sub: "과세 대상 금액 감소" },
        ]}
      />
    ),
    "after-1": (
      <StatCard
        items={[
          { label: "현재 정기예금이자율", value: "1.2%", sub: "기획재정부 고시 (2022년 이후)" },
          { label: "2019년 이전 이자율", value: "2.1%", sub: "현재보다 높아 세 부담 컸음" },
          { label: "이자율 확인처", value: "국세청 홈택스", sub: "기획재정부 고시 참고" },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="info" title="간주임대료 부가세를 임차인이 부담하기로 했다면 계약서에 반드시 명시하세요">
        구두 합의만으로는 분쟁이 생길 수 있어요. 임대차계약서에 '간주임대료 부가세 임차인 부담' 조항을 명확히 기재하고 세금계산서를 발행하면 임차인도 매입세액공제를 받을 수 있어요.
      </WarningBox>
    ),
    "after-3": (
      <WarningBox type="warning" title="연체 임대료를 이유로 보증금을 임의 차감하면 부가세 신고가 틀릴 수 있어요">
        간주임대료 계산 기준은 계약서상 보증금이에요. 임차인 연체를 이유로 보증금을 임의로 줄여 신고하면 과세당국에서 부인될 수 있어요. 정산은 임대차 종료 시 합의로 처리하세요.
      </WarningBox>
    ),
  },

  // ── Article 58: 상가 임대사업자 부가세 환급 방법 ──
  "sangga-imdaesaeobja-bugase-hwanggeup": {
    "after-0": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "일반과세자로 사업자 등록", desc: "잔금 납부 전 또는 매수 직후 세무서·홈택스 등록" },
          { step: "2", title: "세금계산서 수취", desc: "분양사 또는 매도인으로부터 건물분 세금계산서 수령" },
          { step: "3", title: "부가세 확정 신고", desc: "첫 신고 기간(1월 또는 7월)에 매입세액 환급 신청" },
          { step: "4", title: "환급금 수령", desc: "신청 후 30일 이내 환급금 지급이 원칙" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="신규 분양 vs 중고 상가 부가세 환급 비교"
        columns={[
          { name: "항목" },
          { name: "신규 분양 상가" },
          { name: "중고 상가" },
        ]}
        rows={[
          { label: "부가세 부과 여부", values: ["건물분 부가세 발생", "매도자 유형에 따라 다름"] },
          { label: "개인 매도자", values: ["해당 없음", "부가세 없음 → 환급 없음"] },
          { label: "법인·일반과세자 매도", values: ["항상 부가세 발생", "부가세 발생 → 환급 가능"] },
          { label: "포괄양수도 거래", values: ["해당 없음", "부가세 면제 → 환급 없음"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="과세 임대에서 주거용으로 전환하면 남은 기간 비율로 부가세를 반환해야 해요">
        건물 취득 후 10년(20 과세기간) 이내에 주거용으로 전환하면 잔여 기간 비율만큼 환급세액을 반환해야 해요. 10년 경과 후 전환하면 추가 납부 의무가 없어요.
      </WarningBox>
    ),
    "after-3": (
      <StatCard
        items={[
          { label: "매입세액 재계산 기간", value: "취득 후 10년", sub: "20 과세기간 기준" },
          { label: "반환 계산 공식", value: "환급세액 × (잔여과세기간 / 20)", sub: "3년 후 폐업 시: × 14/20" },
          { label: "10년 경과 시", value: "반환 의무 없음", sub: "자유롭게 용도 변경·폐업 가능" },
        ]}
      />
    ),
  },

  // ── Article 59: 상가 무단전대 임대인 계약해지 요건 ──
  "sangga-mudanjeonddae-gyeyakhaeji-yogeon": {
    "after-0": (
      <WarningBox type="danger" title="무단전대 시 임대인은 계약을 해지할 수 있어요">
        민법 제629조에 따라 임대인 동의 없이 전대하면 임대차 계약 해지 사유가 돼요. 다만 배우자·직계가족 등 실질적으로 동일인인 경우에는 배신적 행위 예외가 인정될 수 있어요.
      </WarningBox>
    ),
    "after-1": (
      <AccordionChecklist
        groups={[
          {
            title: "배신적 행위 예외로 인정될 수 있는 사례",
            items: [
              "임차인과 전차인이 배우자·직계가족 등 실질적 동일인인 경우",
              "법인 분할·명칭 변경 등으로 인격만 변경됐을 뿐 실사용자 동일한 경우",
              "임대인이 사전에 구두·묵시적으로 동의한 정황이 있는 경우",
            ],
          },
          {
            title: "예외 인정이 어려운 사례",
            items: [
              "전차인이 전혀 다른 제3자인 경우",
              "영업 형태·업종이 크게 변경된 경우",
              "임대인이 모른 채 전대가 이루어진 경우",
            ],
          },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="무단 전차인은 임대인에게 점유 권원을 주장할 수 없어요">
        무단전대로 입주한 전차인은 임대인에 대해 불법점유자 지위에 놓여요. 임대차 계약이 해지되면 임대인의 명도 청구를 거부하기 어려우니 전대 전 반드시 임대인 동의를 확인하세요.
      </WarningBox>
    ),
    "after-3": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "내용증명 발송", desc: "임대인이 무단전대를 이유로 계약 해지 및 명도 통지" },
          { step: "2", title: "이행 기간 부여", desc: "상당한 기간 내 자진 퇴거 요청" },
          { step: "3", title: "건물인도청구 소송", desc: "퇴거하지 않으면 민사법원에 소송 제기" },
          { step: "4", title: "강제집행", desc: "인도 판결 확정 후 강제집행으로 퇴거 조치" },
        ]}
      />
    ),
  },

  // ── Article 60: 상가 전대차 전차인 보증금 보호 ──
  "sangga-jeondaecha-jeonchaiin-boho": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "전차인 대항력 취득 요건 (3가지 모두 충족)",
            items: [
              "① 임대인의 동의를 받은 적법한 전대차 계약 체결",
              "② 해당 상가에서 사업자등록 신청",
              "③ 건물 인도 수령",
            ],
          },
          {
            title: "주의 사항",
            items: [
              "대항력 취득 시점: 사업자등록 신청일의 다음 날",
              "무단전대 전차인은 대항력 보호 없음",
              "임차인 권리 소멸 방식에 따라 전차인도 영향 받을 수 있음",
            ],
          },
        ]}
      />
    ),
    "after-1": (
      <StatCard
        items={[
          { label: "해지 통지 후 유예 기간", value: "6개월", sub: "통지 받은 날부터 기산" },
          { label: "적용 대상", value: "적법 전대차만", sub: "무단전대는 유예 기간 없음" },
          { label: "유예 기간 중 차임", value: "임대인에게 직접 납부", sub: "임차인 계약 종료 후" },
        ]}
      />
    ),
    "after-2": (
      <ComparisonTable
        title="합의 해지 vs 기간만료 전차인 보호 비교"
        columns={[
          { name: "구분" },
          { name: "합의 해지", highlight: true },
          { name: "기간만료·채무불이행 해지" },
        ]}
        rows={[
          { label: "전차인 권리 소멸 여부", values: ["소멸하지 않음 (민법 631조)", "원칙적으로 소멸"] },
          { label: "6개월 유예 기간", values: ["불필요 (전대차 존속)", "필요 (통지 후 6개월)"] },
          { label: "전차인 보호 수준", values: ["더 두터움", "상대적으로 약함"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="info" title="전대 후에도 임차인 명의 사업자등록을 유지해야 대항력이 지속돼요">
        임차인이 전대 후 사업자등록을 말소하면 임차인의 대항력 요건이 사라져요. 전대 후에도 임차인 명의 등록을 유지하거나 전차인 등록 주소가 임차물 범위 안임을 증명할 수 있어야 해요.
      </WarningBox>
    ),
  },

  // ── Article 61: 상가 전대차 임대인 동의 서면 요건 ──
  "sangga-jeondaecha-imdaein-seomyeon-yogeon": {
    "after-0": (
      <WarningBox type="warning" title="구두 동의는 나중에 임대인이 부인할 수 있어요">
        민법상 구두 동의도 유효하지만, 분쟁 시 입증이 어려워요. 인감증명이 첨부된 서면 동의서가 가장 강력한 증거예요. 고액 보증금·권리금이 걸린 전대차라면 반드시 서면으로 받아두세요.
      </WarningBox>
    ),
    "after-1": (
      <AccordionChecklist
        groups={[
          {
            title: "안전한 전대 동의서 구비 서류",
            items: [
              "임대인 인감도장이 날인된 서면 동의서",
              "임대인 인감증명서 (발급일로부터 3개월 이내)",
              "임대차계약서 사본 (전대 허용 조항 확인)",
              "전대차계약서 사본",
            ],
          },
          {
            title: "분쟁 예방 추가 조치",
            items: [
              "동의서에 전대 기간·전대 목적물 범위 명기",
              "전차인 상호·대표자 정보 기재",
              "임대인 서명·날인 영상 또는 녹취 보관",
            ],
          },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="info" title="임대인이 전대 사실을 알고도 오래 방치하면 묵시적 동의로 인정될 수 있어요">
        전대 사실을 알린 후 임대인이 이의를 제기하지 않는 상황을 문자·이메일 등으로 증거화해두세요. 묵시적 동의 인정 여부는 법원이 사실관계를 종합해 판단해요.
      </WarningBox>
    ),
    "after-3": (
      <WarningBox type="info" title="처음 임대차 계약 시 전대 허용 특약을 넣으면 매번 동의받는 번거로움이 없어요">
        민법 제629조는 임의 규정이라 당사자 합의로 달리 정할 수 있어요. 임대차 계약 체결 시 '임대인 동의 없이 전대 가능' 특약을 협의해두면 전대 시마다 동의 절차가 필요 없어요.
      </WarningBox>
    ),
  },

  // ── Article 62: 상가 일부 전대 임대인 동의 불필요 범위 ──
  "sangga-ibo-jeonddae-dongui-bupillyeo": {
    "after-0": (
      <ComparisonTable
        title="전체 전대 vs 일부 전대 비교"
        columns={[
          { name: "구분" },
          { name: "전체 전대" },
          { name: "일부 전대", highlight: true },
        ]}
        rows={[
          { label: "임대인 동의 필요 여부", values: ["필요 (민법 629조)", "불필요 (민법 632조, 특약 없을 때)"] },
          { label: "무단 시 계약 해지", values: ["해지 가능", "해지 불가 (판례)"] },
          { label: "전대 금지 특약 시", values: ["동의 필수", "동의 필수 (특약 우선)"] },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="warning" title="임차인 본인이 주된 영업을 유지해야 '일부 전대'로 인정받을 수 있어요">
        임차인이 상가에서 직접 영업하지 않고 전부를 제3자에게 넘기면 사실상 전체 전대로 판단될 수 있어요. 일부 전대의 보호를 받으려면 임차인이 주된 사용자로서 영업을 계속해야 해요.
      </WarningBox>
    ),
    "after-2": (
      <WarningBox type="danger" title="임대차계약서에 '일부 전대도 금지' 특약이 있으면 임대인 동의가 반드시 필요해요">
        민법 제632조는 임의 규정이므로 계약서 특약으로 일부 전대도 금지할 수 있어요. 전대 전 계약서의 전대 금지 조항이 전체만 금지하는지, 일부까지 금지하는지 반드시 확인하세요.
      </WarningBox>
    ),
    "after-3": (
      <WarningBox type="info" title="대법원 판례: 일부 전대는 임대인이 계약을 해지할 수 없어요 (특약 없는 경우)">
        전대 금지 특약이 없다면 상가 일부를 임대인 동의 없이 전대해도 임대인은 계약을 해지할 수 없어요 (민법 제632조). 일부 전대 계획이 있다면 계약서 확인을 먼저 하세요.
      </WarningBox>
    ),
  },

  // ── Article 63: 상가 전대차 합의 해지 시 전차인 보호 ──
  "sangga-jeondaecha-habi-jeonchaiin-boho": {
    "after-0": (
      <WarningBox type="info" title="임대인·임차인 합의 해지로는 전차인을 내보낼 수 없어요">
        민법 제631조에 따라 임차인과 임대인이 합의로 계약을 끝내도 전차인의 전대차 권리는 소멸하지 않아요. 임대인이 전차인에게 퇴거를 요구하려면 전대차 계약을 별도로 해지해야 해요.
      </WarningBox>
    ),
    "after-1": (
      <WarningBox type="warning" title="기간만료·채무불이행 해지 시 전차인 권리도 원칙적으로 소멸해요">
        합의 해지와 달리 기간만료나 임차인의 채무 불이행으로 임대차가 종료되면 전차인의 권리도 함께 소멸해요. 임대인이 6개월 전에 통지해야 전차인에 대한 해지 효력이 발생해요.
      </WarningBox>
    ),
    "after-2": (
      <ComparisonTable
        title="임대차 종료 유형별 전차인 보호 비교"
        columns={[
          { name: "종료 유형" },
          { name: "전차인 권리" },
          { name: "6개월 유예 적용" },
        ]}
        rows={[
          { label: "합의 해지", values: ["소멸하지 않음 (민법 631조)", "불필요"] },
          { label: "기간만료", values: ["원칙적 소멸", "필요 (통지 후 6개월)"] },
          { label: "임차인 채무불이행 해지", values: ["원칙적 소멸", "필요 (통지 후 6개월)"] },
          { label: "무단전대 해지", values: ["보호 없음", "미적용"] },
        ]}
      />
    ),
    "after-3": (
      <StatCard
        items={[
          { label: "해지 통지 후 유예 기간", value: "6개월", sub: "상가건물임대차보호법 적용" },
          { label: "유예 기간 차임 납부", value: "임대인에게 직접", sub: "임차인 계약 종료 이후" },
          { label: "합의 해지 시", value: "전대차 존속", sub: "임대인이 전대차 별도 해지 필요" },
        ]}
      />
    ),
  },

  // ── Article 64: 상가 입주 전 하자 임대인 수리 의무 ──
  "sangga-ibju-jeon-haja-imdaein-suriuimu": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "입주 전 반드시 확인할 하자 항목",
            items: [
              "보일러·냉난방 설비 작동 여부",
              "배관·배수·누수 흔적",
              "전기 배선·콘센트·차단기 상태",
              "외벽·천장 균열 및 방수 상태",
              "출입문·창문·잠금장치",
            ],
          },
          {
            title: "계약서 특약으로 명기할 사항",
            items: [
              "발견 하자 내역 및 수리 주체 (임대인/임차인)",
              "입주 후 30일 이내 하자 → 인도 전 발생 추정",
              "잔금일 전 추가 근저당·가압류 설정 금지",
              "잔금일까지 전 임차인 미납 공과금 임대인 정산",
            ],
          },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="info" title="입주 후 30일 이내 발견 하자는 인도 전 발생 추정 특약을 요청하세요">
        보일러·배관 등 고가 설비는 입주 직후 고장이 나도 임대 전 발생이었는지 입증하기 어려워요. 계약서에 '입주 후 30일 이내 하자 = 인도 전 발생 추정' 특약을 넣으면 임차인이 유리해요.
      </WarningBox>
    ),
    "after-2": (
      <WarningBox type="warning" title="잔금일 전날 등기부등본을 반드시 재확인하세요">
        계약 후 잔금 전 근저당 금지 특약이 있어도 실제로 설정되는 경우가 있어요. 잔금 지급 전날 등기부등본을 출력해 계약 당시와 비교하고, 변동이 있으면 잔금 납부를 보류하세요.
      </WarningBox>
    ),
    "after-3": (
      <WarningBox type="danger" title="이전 임차인 미납 공과금은 입주 전 반드시 확인해야 해요">
        미납 전기·수도요금이 있으면 공급이 중단돼 새 임차인이 직접 피해를 볼 수 있어요. 입주 전 한국전력·수도사업소에 미납 여부를 확인하고, 미납분은 계약서 특약으로 임대인이 정산하도록 명기하세요.
      </WarningBox>
    ),
  },

  // ── Article 65: 상가 수선 특약 임차인 부담 효력 ──
  "sangga-seonbu-teugak-imsaigin-budaam": {
    "after-0": (
      <ComparisonTable
        title="소수선 vs 대수선 임차인 부담 특약 유효성 비교"
        columns={[
          { name: "구분" },
          { name: "소수선", highlight: true },
          { name: "대수선" },
        ]}
        rows={[
          { label: "예시", values: ["문손잡이·전구·도어락 전지 교체", "지붕 방수·외벽 균열·배관 교체"] },
          { label: "임차인 부담 특약 유효 여부", values: ["유효", "무효 (강행규정 위반)"] },
          { label: "기본 설비 교체 (보일러·에어컨)", values: ["대수선 준하여 무효 가능성", "무효"] },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="danger" title="대수선까지 임차인 부담으로 정한 특약은 무효예요">
        상가건물임대차보호법 제11조에 따라 임차인에게 불리한 약정은 효력이 없어요. 포괄적 수선 의무 특약이 있어도 대수선 발생 시 임대인에게 이행을 청구할 수 있어요.
      </WarningBox>
    ),
    "after-2": (
      <WarningBox type="warning" title="보일러·에어컨 등 기본 설비 교체는 임차인이 아닌 임대인 부담이에요">
        기본 설비 교체는 소모성 수선이 아닌 대수선 수준이어서 임차인 부담 특약이 무효로 볼 가능성이 높아요. 입주 시 설비 상태를 사진으로 기록해두면 책임 소재를 명확히 할 수 있어요.
      </WarningBox>
    ),
    "after-3": (
      <WarningBox type="info" title="특약 무효 여부가 궁금하면 대한법률구조공단(132) 무료 상담을 이용하세요">
        상가건물임대차 표준계약서와 비교해 과도한 특약은 계약 전 수정 요청하세요. 특약 일부가 무효여도 계약 전체가 취소되지 않고, 해당 조항만 효력을 잃어요.
      </WarningBox>
    ),
  },

  // ── Article 66: 상가 하자 차임 지급 거절 ──
  "sangga-haja-chaim-georjeol-ganeung": {
    "after-0": (
      <WarningBox type="warning" title="하자가 있어도 차임 전액 거절은 안 돼요 — 비율만큼만 감액하세요">
        대법원은 목적물 사용·수익이 '완전히 불가능'한 경우에만 전액 거절을 허용해요. 일부 영업이 가능하다면 하자 비율만큼만 감액 지급해야 해요. 전액 거절 시 3기 연체로 계약 해지 위험이 있어요.
      </WarningBox>
    ),
    "after-1": (
      <AccordionChecklist
        groups={[
          {
            title: "차임 감액 청구 시 확보해야 할 증빙",
            items: [
              "하자 발생 사진·영상 (발생 일자 포함)",
              "임대인에게 수선 요구한 내용증명 사본",
              "수리 견적서 (전문 업체 발행)",
              "하자로 인한 영업 손실 증빙 (매출 감소 자료 등)",
              "공공기관 점검 기록 (소방서, 지자체 등)",
            ],
          },
          {
            title: "임차인이 직접 수리한 경우 구비 서류",
            items: [
              "수리 전 임대인 통보 내용증명",
              "수리 전·후 사진",
              "시공 업체 세금계산서·영수증",
              "견적서 (수리 전 작성)",
            ],
          },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="danger" title="3기 연체 시 임대인이 계약을 해지할 수 있어요">
        하자를 이유로 차임 납부를 장기간 거절하면 3기 연체에 해당해요. 임대인에게 하자 통보 내용증명을 먼저 보내고, 하자 비율만큼만 감액해 나머지는 반드시 납부하세요.
      </WarningBox>
    ),
    "after-3": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "하자 사진·증거 확보", desc: "발생 일자가 표시된 사진·영상 촬영, 견적서 수령" },
          { step: "2", title: "임대인에게 내용증명 발송", desc: "하자 내역·수선 기한·불이행 시 조치 예고 명시" },
          { step: "3", title: "차임 감액 후 잔여분 납부", desc: "하자 비율만큼 감액, 나머지는 정상 납부" },
          { step: "4", title: "조정 신청 또는 소송", desc: "임대인 불응 시 분쟁조정위원회 또는 법원 소송" },
        ]}
      />
    ),
  },

  // ── Article 67: 상가 임대차 분쟁조정위원회 신청 ──
  "sangga-imdaecha-bunjeongjojeong-sincheng": {
    "after-0": (
      <AccordionChecklist
        groups={[
          {
            title: "분쟁조정 신청 가능 분쟁 유형",
            items: [
              "차임·보증금 증감 분쟁",
              "임대차 계약 갱신 거절 분쟁",
              "권리금 회수 방해 분쟁",
              "계약 해지·명도 관련 분쟁",
              "임대인 수선 의무 불이행 분쟁",
            ],
          },
          {
            title: "신청 시 준비 서류",
            items: [
              "분쟁조정 신청서 (hldcc.or.kr 서식)",
              "임대차계약서 사본",
              "분쟁 관련 내용증명·문자·이메일 등",
              "하자 사진, 영수증 등 증빙서류",
            ],
          },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="info" title="온라인과 방문 접수 모두 가능해요 — hldcc.or.kr에서 신청하세요">
        한국부동산원 임대차분쟁조정위원회(hldcc.or.kr)에서 온라인 신청서를 작성하거나 관할 지역 분조위를 방문해 접수할 수 있어요. 분쟁조정 신청은 무료예요.
      </WarningBox>
    ),
    "after-2": (
      <StatCard
        items={[
          { label: "조정 성립 효력", value: "재판상 화해와 동일", sub: "확정 판결과 같은 집행력" },
          { label: "강제집행 신청", value: "별도 소송 없이 가능", sub: "조정서 기반으로 바로 신청" },
          { label: "신청 비용", value: "무료", sub: "한국부동산원 분조위 기준" },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="임대인이 불응하면 조정 불성립 — 소송 준비를 병행하세요">
        분쟁조정은 임의적 절차여서 피신청인이 거부하면 불성립으로 종료돼요. 조정 신청과 동시에 소멸시효 중단 효과가 발생하므로 소송 준비를 병행하는 것이 실무적으로 유리해요.
      </WarningBox>
    ),
  },

  // ── Article 68: 상가 임대차 분쟁조정 비용 소요기간 비교 ──
  "sangga-bunjeongjojeong-biyong-sosong-bipyo": {
    "after-0": (
      <StatCard
        items={[
          { label: "신청 수수료", value: "무료", sub: "한국부동산원 임대차분쟁조정위원회" },
          { label: "법률 상담", value: "132 무료", sub: "대한법률구조공단" },
          { label: "소송 인지대 (보증금 1억)", value: "약 51만 원", sub: "소송 비용 참고용" },
        ]}
      />
    ),
    "after-1": (
      <StatCard
        items={[
          { label: "분쟁조정 처리 기간", value: "60일 이내", sub: "합의 시 30일 이내 연장 가능" },
          { label: "민사소송 1심 평균", value: "6~12개월", sub: "사건 복잡도에 따라 다름" },
          { label: "소액 심판 (3,000만 원 이하)", value: "1~2개월", sub: "1회 심문 판결" },
        ]}
      />
    ),
    "after-2": (
      <ComparisonTable
        title="분쟁조정 vs 소송 장단점 비교"
        columns={[
          { name: "항목" },
          { name: "분쟁조정", highlight: true },
          { name: "소송" },
        ]}
        rows={[
          { label: "비용", values: ["무료", "인지대·변호사비 발생"] },
          { label: "처리 기간", values: ["60일 이내", "6개월 이상"] },
          { label: "상대방 불응 시", values: ["불성립 (강제 불가)", "판결 강제 가능"] },
          { label: "성립 시 집행력", values: ["재판상 화해 동일", "확정 판결"] },
          { label: "유연한 해결", values: ["가능 (협의)", "판결 기준 엄격"] },
        ]}
      />
    ),
    "after-3": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "분쟁조정 신청", desc: "hldcc.or.kr 온라인 또는 방문 접수 (무료)" },
          { step: "2", title: "조정 기간 진행", desc: "60일 이내 조정 절차 완료" },
          { step: "3", title: "불성립 확인서 수령", desc: "피신청인 불응 또는 합의 실패 시 발급" },
          { step: "4", title: "소송 제기", desc: "소액 심판(3,000만 원 이하) 또는 일반 민사소송" },
        ]}
      />
    ),
  },

  // ── Article 69: 상가 조정서 강제집행 승낙 효력 ──
  "sangga-jojeongwseo-gangjejibhaeng": {
    "after-0": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "조정서 작성", desc: "강제집행 승낙 조항을 조정서에 명시 요청" },
          { step: "2", title: "조정서 보관", desc: "조정서 원본을 안전하게 보관" },
          { step: "3", title: "집행문 신청", desc: "관할 법원 민사집행과에 집행문 부여 신청" },
          { step: "4", title: "강제집행 신청", desc: "집행문 받은 후 법원에 강제집행 신청" },
        ]}
      />
    ),
    "after-1": (
      <StatCard
        items={[
          { label: "조정서 효력", value: "재판상 화해 동일", sub: "확정 판결과 같은 집행력" },
          { label: "집행문 부여", value: "법원 민사집행과", sub: "조정서 원본 제출 필요" },
          { label: "소송 대체", value: "명도소송 불필요", sub: "조정서 기반으로 즉시 집행 가능" },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="info" title="조정서 명도 조항 — 구체적 기재가 집행력의 핵심이에요">
        조정서에 명도 시점, 이행 기한, 위반 시 집행 가능 조항을 구체적으로 기재해야 해요. 추상적으로 작성된 조정서는 집행문 부여가 거부될 수 있어요.
      </WarningBox>
    ),
    "after-3": (
      <ComparisonTable
        title="분쟁조정 조정서 vs 제소전화해 비교"
        columns={[
          { name: "항목" },
          { name: "분쟁조정 조정서", highlight: true },
          { name: "제소전화해" },
        ]}
        rows={[
          { label: "비용", values: ["무료", "수수료 발생"] },
          { label: "주관 기관", values: ["분쟁조정위원회", "법원"] },
          { label: "집행력", values: ["재판상 화해 동일", "확정 판결 동일"] },
          { label: "집행문 부여", values: ["법원 신청 필요", "바로 발급"] },
          { label: "활용 적합 시점", values: ["분쟁 발생 후", "분쟁 예방 목적"] },
        ]}
      />
    ),
  },

  // ── Article 70: 상가 임대인 분쟁조정 불응 소송 전환 ──
  "sangga-imdaein-bunjeongjojeong-bulloung": {
    "after-0": (
      <WarningBox type="warning" title="임대인 불응 시 조정 불성립 — 불성립 확인서를 꼭 받으세요">
        분쟁조정은 임의적 절차이므로 임대인이 거부하면 불성립으로 종료돼요. 불성립 확인서를 받아 소송 전환 시 첨부 서류로 활용하고, 소멸시효 중단 효과도 확인하세요.
      </WarningBox>
    ),
    "after-1": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "불성립 확인서 수령", desc: "분쟁조정위원회에서 불성립 확인서 발급" },
          { step: "2", title: "증빙서류 준비", desc: "계약서, 내용증명, 사진, 영수증 등 수집" },
          { step: "3", title: "소장 작성", desc: "법률구조공단(132) 지원 또는 변호사 선임" },
          { step: "4", title: "소송 제기", desc: "관할 법원 민사과에 소장 제출" },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="info" title="조정과 소송 병행 시 조정 각하 가능성 있어요">
        소송을 먼저 제기하면 분쟁조정 신청이 받아들여지지 않을 수 있어요. 조정 불성립 후 소송으로 전환하는 순서가 실무적으로 가장 효율적이에요.
      </WarningBox>
    ),
    "after-3": (
      <AccordionChecklist
        groups={[
          {
            title: "소송 전환 전 준비 체크리스트",
            items: [
              "불성립 확인서 수령 (분쟁조정위원회)",
              "임대차계약서 원본·사본 보관",
              "내용증명 발송 및 수신 확인서 보관",
              "분쟁 관련 사진·영수증 정리",
              "소액심판(3,000만 원 이하) 해당 여부 확인",
            ],
          },
        ]}
      />
    ),
  },

  // ── Article 71: 상가 양도소득세 장기보유특별공제 ──
  "sangga-yangsodeukse-janggiboyu-gongje": {
    "top": (
      <StatCard
        items={[
          { label: "공제 시작 보유 기간", value: "3년 이상", sub: "연 2%씩 공제 시작" },
          { label: "최대 공제율", value: "30%", sub: "15년 이상 보유 시" },
          { label: "연간 기본공제", value: "250만 원", sub: "양도소득에서 추가 차감" },
        ]}
      />
    ),
    "after-0": (
      <ComparisonTable
        title="상가 보유 기간별 장기보유특별공제율"
        columns={[
          { name: "보유 기간" },
          { name: "공제율", highlight: true },
        ]}
        rows={[
          { label: "3년 이상 4년 미만", values: ["6%"] },
          { label: "4년 이상 5년 미만", values: ["8%"] },
          { label: "5년 이상 6년 미만", values: ["10%"] },
          { label: "10년 이상", values: ["20%"] },
          { label: "15년 이상", values: ["30% (최대)"] },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="사업용 토지 vs 비사업용 토지 세금 비교"
        columns={[
          { name: "구분" },
          { name: "사업용 토지", highlight: true },
          { name: "비사업용 토지" },
        ]}
        rows={[
          { label: "장기보유특별공제", values: ["적용 (연 2%)", "미적용"] },
          { label: "세율", values: ["기본세율 (6~45%)", "기본세율 + 10%"] },
          { label: "임대사업자 등록", values: ["필요", "미등록 시 해당"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="양도소득세 예정 신고 기한을 꼭 지키세요">
        양도소득세 예정 신고는 양도일이 속하는 달의 말일부터 2개월 이내에 해야 해요. 무신고 가산세 20%와 납부 지연 가산세가 부과되므로 기한 내 홈택스(hometax.go.kr)에서 신고하세요.
      </WarningBox>
    ),
  },

  // ── Article 72: 상가 단기양도 중과세율 ──
  "sangga-dangigyodo-junggwaseyul": {
    "top": (
      <StatCard
        items={[
          { label: "1년 미만 보유 세율", value: "50%", sub: "중과세율 (단기 투기 억제)" },
          { label: "1~2년 보유 세율", value: "40%", sub: "중과세율 구간" },
          { label: "2년 이상 보유 세율", value: "기본세율", sub: "6~45% 누진세율 적용" },
        ]}
      />
    ),
    "after-0": (
      <ComparisonTable
        title="상가 보유 기간별 양도소득세율 비교"
        columns={[
          { name: "보유 기간" },
          { name: "세율", highlight: true },
          { name: "비고" },
        ]}
        rows={[
          { label: "1년 미만", values: ["50%", "단기 중과세율"] },
          { label: "1년 이상 2년 미만", values: ["40%", "중과세율"] },
          { label: "2년 이상", values: ["기본세율 (6~45%)", "누진세율 적용"] },
          { label: "3년 이상", values: ["기본세율 + 장기보유공제", "최대 30% 추가 공제"] },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="info" title="2년 보유 시점이 세율 전환의 핵심 기준점이에요">
        1년 미만 50% → 1~2년 40% → 2년 이상 기본세율로 급격히 낮아져요. 2년 보유 시점까지 기다리는 것이 절세 효과가 가장 커요. 3년 이상이면 장기보유특별공제까지 추가로 받을 수 있어요.
      </WarningBox>
    ),
    "after-3": (
      <WarningBox type="warning" title="취득 비용을 필요경비로 반영해 양도차익을 줄이세요">
        취득세, 법무사비, 중개수수료, 수리비 등 취득 관련 비용을 필요경비로 신고하면 양도차익이 줄어요. 중과세 구간에서 양도차익을 줄이는 것이 세 부담을 낮추는 현실적인 전략이에요.
      </WarningBox>
    ),
  },

  // ── Article 73: 상가겸용주택 양도소득세 ──
  "sangga-gyeomubjuteog-yangdosodeukse": {
    "after-0": (
      <ComparisonTable
        title="상가겸용주택 면적 비율별 과세 방식"
        columns={[
          { name: "면적 비율" },
          { name: "과세 방식", highlight: true },
        ]}
        rows={[
          { label: "주택 면적 > 상가 면적", values: ["전체를 주택으로 봐서 1세대 1주택 비과세 가능"] },
          { label: "주택 면적 ≤ 상가 면적", values: ["주택 부분만 비과세, 상가 부분은 일반 과세"] },
        ]}
      />
    ),
    "after-1": (
      <StatCard
        items={[
          { label: "1세대 1주택 비과세 요건", value: "2년 이상 보유", sub: "조정대상지역은 2년 거주 추가" },
          { label: "양도 기준일", value: "잔금일", sub: "소유권 이전 등기일 중 빠른 날" },
          { label: "면적 기준 자료", value: "건축물대장", sub: "용도별 면적 확인" },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="잔금일 기준으로 주택 여부를 판단해요 — 용도변경에 주의하세요">
        주택 비과세 여부는 계약일이 아닌 잔금일(또는 소유권 이전 등기일 중 빠른 날) 현재 실제 사용 현황으로 판단해요. 잔금일 전에 용도변경하면 비과세 혜택을 받지 못할 수 있어요.
      </WarningBox>
    ),
    "after-3": (
      <WarningBox type="info" title="절세 목적 용도변경은 세법상 인정되지 않아요">
        비과세 혜택을 노린 의도적 용도변경은 과세당국의 조사 대상이에요. 오히려 비과세 혜택을 잃고 상가 양도세가 부과될 수 있으니 매도 전 세무사와 충분히 상담하세요.
      </WarningBox>
    ),
  },

  // ════════════════════════════════
  // 민형사소송 카테고리
  // ════════════════════════════════

  // ── Article 1: 교통사고 진단주수 합의금 계산 기준 ──
  "traffic-accident-settlement-calculation": {
    "top": (
      <StatCard
        items={[
          { label: "합의금 구성", value: "3대 항목", sub: "위자료 + 치료비 + 휴업손해" },
          { label: "주부 휴업손해 기준", value: "도시 일용노임", sub: "대법원 판례 인정" },
          { label: "보험사 이의 신청", value: "항목별 내역서 요청", sub: "부상등급 재산정 가능" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="자동차보험 부상등급별 위자료 기준"
        columns={[
          { name: "부상등급" },
          { name: "부상 수준" },
          { name: "위자료 기준", highlight: true },
        ]}
        rows={[
          { label: "1급", values: ["중상 (생명 위협)", "1,800만 원 이상"] },
          { label: "7급", values: ["중등도 부상", "약 400만 원"] },
          { label: "12급", values: ["경상 (2주 통원)", "약 120만 원"] },
          { label: "14급", values: ["최경상", "약 80만 원"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="info" title="주부 휴업손해 — 수입 없어도 일용노임 기준으로 청구하세요">
        전업주부도 가사 노동 능력 상실에 대한 휴업손해를 청구할 수 있어요. 진단서·통원 확인서로 치료 사실을 증명하면 도시 일용 노임 기준으로 인정받을 수 있어요.
      </WarningBox>
    ),
    "after-3": (
      <AccordionChecklist
        groups={[
          {
            title: "개호비 청구 준비 서류",
            items: [
              "의사 개호 필요 소견서",
              "간병인 계약서 또는 영수증",
              "입원 확인서 (입원 기간 확인)",
              "가족 간호 시 일용노임 산정 근거",
              "치료 기간 진단서",
            ],
          },
        ]}
      />
    ),
  },

  // ── Article 2: 교통사고 과실비율 쌍방 산정 방식 ──
  "traffic-accident-fault-ratio": {
    "after-0": (
      <WarningBox type="warning" title="100:0은 매우 엄격하게 인정돼요 — 증거 확보가 핵심이에요">
        피해자 차량이 주행 중이었다면 방어운전 의무를 이유로 일부 과실이 인정되는 경우가 많아요. 블랙박스·CCTV 영상이 있으면 100:0 주장에 유리해요.
      </WarningBox>
    ),
    "after-1": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "보험사 과실비율 통보", desc: "사고 후 각 보험사가 과실비율 산정" },
          { step: "2", title: "이의 신청", desc: "불합리한 과실비율에 이의 제기" },
          { step: "3", title: "분쟁심의위원회 심의", desc: "accident.knia.or.kr 무료 신청" },
          { step: "4", title: "소송 제기", desc: "심의 결과 불복 시 법원 소송" },
        ]}
      />
    ),
    "after-2": (
      <ComparisonTable
        title="사고 유형별 과실비율 기준 (일반)"
        columns={[
          { name: "사고 유형" },
          { name: "가해차량 과실" },
          { name: "피해차량 과실", highlight: true },
        ]}
        rows={[
          { label: "신호위반 vs 신호준수", values: ["90~100%", "0~10%"] },
          { label: "비보호좌회전 vs 직진", values: ["85~100%", "0~15%"] },
          { label: "추돌 (선행차 급정거)", values: ["70~80%", "20~30%"] },
          { label: "차선변경 접촉", values: ["70~80%", "20~30%"] },
        ]}
      />
    ),
    "after-3": (
      <AccordionChecklist
        groups={[
          {
            title: "블랙박스 없을 때 증거 확보 체크리스트",
            items: [
              "사고 현장 사진 즉시 촬영 (차량 위치, 파손 부위)",
              "경찰 신고 및 사고 기록 확보",
              "목격자 연락처 확보",
              "인근 건물·신호등 CCTV 영상 요청 (경찰 경유)",
              "차량 손상 패턴 사진 보관",
            ],
          },
        ]}
      />
    ),
  },

  // ── Article 3: 교통사고 후유장해 등급 보험금 ──
  "traffic-accident-permanent-disability": {
    "top": (
      <StatCard
        items={[
          { label: "후유장해 보험금 산정", value: "보험금 × 장해율", sub: "보험 종류별 기준 상이" },
          { label: "진단서 발급 시기", value: "증상고정 후", sub: "사고 후 6개월~1년 이상" },
          { label: "보험사 거절 대응", value: "금감원 1332", sub: "민원 제기 후 소송 검토" },
        ]}
      />
    ),
    "after-1": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "증상 고정 확인", desc: "주치의와 증상 고정 시점 협의" },
          { step: "2", title: "후유장해 진단서 발급", desc: "주치의에게 후유장해 진단서 요청" },
          { step: "3", title: "보험사 청구", desc: "가입 보험 전체에 후유장해 보험금 청구" },
          { step: "4", title: "이의 신청 또는 소송", desc: "거절 시 금감원 민원 또는 소송" },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="증상 고정 전에 너무 빨리 진단서를 받으면 장해율이 낮아져요">
        후유장해 진단서는 증상이 충분히 안정된 후 발급받아야 해요. 치료 중인 상태에서 발급받으면 장해율이 실제보다 낮게 산정될 수 있어요.
      </WarningBox>
    ),
    "after-3": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "보험사 이의 신청", desc: "추가 의학 자료 제출 후 등급 재심사 요청" },
          { step: "2", title: "금감원 민원 제기", desc: "금융민원센터(1332) 민원 접수" },
          { step: "3", title: "손해배상 소송 제기", desc: "법원 의료 감정으로 독립 판단" },
          { step: "4", title: "법률구조공단 상담", desc: "132 무료 법률 상담 활용" },
        ]}
      />
    ),
  },

  // ── Article 4: 교통사고 형사합의 민사합의 차이 ──
  "traffic-accident-criminal-civil-settlement": {
    "after-0": (
      <ComparisonTable
        title="형사합의 vs 공탁 비교"
        columns={[
          { name: "구분" },
          { name: "형사합의", highlight: true },
          { name: "공탁" },
        ]}
        rows={[
          { label: "피해자 동의", values: ["필요 (직접 서명)", "불필요"] },
          { label: "처벌 불원 효과", values: ["인정", "미인정"] },
          { label: "양형 반영", values: ["높음", "상대적으로 낮음"] },
          { label: "민사 청구 영향", values: ["조항에 따라 다름", "수령 시 공제"] },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="warning" title="형사합의서에 '민사 청구 포기' 문구 포함 여부를 반드시 확인하세요">
        형사합의서에 '향후 민사상 일체의 청구를 포기한다'는 문구가 있으면 민사 손해배상 청구권도 함께 포기한 것으로 해석될 수 있어요. 합의서 서명 전 반드시 확인하세요.
      </WarningBox>
    ),
    "after-2": (
      <WarningBox type="info" title="채권양도 조항의 의미 — 민사 보험금에서 공제돼요">
        형사합의서의 채권양도 조항은 보험사가 형사합의금만큼을 나중에 지급 보험금에서 공제할 수 있게 해요. 채권양도 조항 없이 합의하면 민사 청구권을 유지할 수 있어요.
      </WarningBox>
    ),
    "after-3": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "형사합의 협상", desc: "가해자 측과 합의금 금액 협상" },
          { step: "2", title: "합의서 검토", desc: "민사 포기 문구·채권양도 조항 확인" },
          { step: "3", title: "형사합의서 서명", desc: "처벌 불원 의사 확인 후 서명" },
          { step: "4", title: "민사 청구 별도 진행", desc: "형사합의와 별도로 민사 손해배상 청구" },
        ]}
      />
    ),
  },

  // ── Article 5: 교통사고 보험사 합의 거부 민사소송 절차 ──
  "traffic-accident-lawsuit-procedure": {
    "top": (
      <StatCard
        items={[
          { label: "손해배상 소멸시효", value: "3년", sub: "손해·가해자를 안 날부터" },
          { label: "소액심판 기준", value: "3,000만 원 이하", sub: "변호사 없이 진행 가능" },
          { label: "법률 상담", value: "132 무료", sub: "법률구조공단" },
        ]}
      />
    ),
    "after-0": (
      <WarningBox type="info" title="소송 전 법률구조공단(132) 상담으로 소송 가능성을 먼저 확인하세요">
        소송 비용(인지대+감정비+변호사비)이 추가로 받을 수 있는 금액보다 클 수 있어요. 소송 전 무료 법률 상담을 통해 소송 타당성을 먼저 판단하는 것이 좋아요.
      </WarningBox>
    ),
    "after-1": (
      <WarningBox type="warning" title="소멸시효 3년 — 임박하면 내용증명 발송 또는 소장 제출로 시효를 중단하세요">
        교통사고 후 3년이 지나면 손해배상 청구권을 상실할 수 있어요. 시효가 임박했다면 즉시 내용증명을 발송하거나 소장을 제출해 시효 중단 효과를 확보하세요.
      </WarningBox>
    ),
    "after-2": (
      <ComparisonTable
        title="소가별 민사소송 인지대 기준"
        columns={[
          { name: "청구 금액(소가)" },
          { name: "인지대 기준", highlight: true },
        ]}
        rows={[
          { label: "1,000만 원", values: ["약 4만 5천 원"] },
          { label: "3,000만 원", values: ["약 13만 원"] },
          { label: "5,000만 원", values: ["약 22만 원"] },
          { label: "1억 원", values: ["약 40만 원"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="info" title="보험사가 피해자에게 구상권을 청구하는 것은 원칙적으로 불가능해요">
        가해자 측 보험사는 피해자에게 구상권을 행사할 수 없어요. 구상권은 보험사에서 공동 가해자 방향으로만 행사돼요. 피해자 본인은 구상권으로 인한 불이익을 받지 않아요.
      </WarningBox>
    ),
  },

  // ── Article 74: 상가 매매 부가가치세 임대사업자 포괄양수도 ──
  "sangga-maemae-bugase-pogwal-pyogi": {
    "after-0": (
      <WarningBox type="warning" title="건물분 부가세 10% — 매도 전 포괄양수도 요건 확인이 필수예요">
        상가 매도 시 건물분 양도가액의 10%가 부가세로 부과돼요. 포괄양수도 요건을 충족하면 부가세가 면제되므로 계약 전 세무사와 요건 충족 여부를 반드시 확인하세요.
      </WarningBox>
    ),
    "after-1": (
      <AccordionChecklist
        groups={[
          {
            title: "포괄양수도 성립 요건 체크리스트",
            items: [
              "임대차계약 전부 승계 (임차인 동의 포함)",
              "보증금 인수 확인",
              "임대사업자 등록 승계 (폐업 후 재등록 방지)",
              "계약서에 포괄양수도 명시",
              "권리·의무 전부 이전 확인",
            ],
          },
        ]}
      />
    ),
    "after-2": (
      <StatCard
        items={[
          { label: "건물분 부가세율", value: "10%", sub: "토지분에는 부가세 미부과" },
          { label: "포괄양수도 시 부가세", value: "면제", sub: "권리·의무 전부 승계 시" },
          { label: "잔존재화 과세 기준", value: "폐업 시 시가", sub: "중복 과세 방지 확인 필요" },
        ]}
      />
    ),
    "after-3": (
      <ComparisonTable
        title="일반 매매 vs 포괄양수도 부가세 비교"
        columns={[
          { name: "구분" },
          { name: "일반 매매" },
          { name: "포괄양수도", highlight: true },
        ]}
        rows={[
          { label: "건물분 부가세", values: ["부과 (양도가액의 10%)", "면제"] },
          { label: "임대차계약", values: ["신규 계약 체결", "기존 계약 승계"] },
          { label: "임대사업자 등록", values: ["매수인 신규 등록", "매도인 등록 승계"] },
          { label: "절세 효과", values: ["없음", "건물분 부가세 절감"] },
        ]}
      />
    ),
  },

  // ── Article 75: 상가 취득세 시가표준액 계산 방법 ──
  "sangga-chwideukse-sigahaejunamaek-gyesan": {
    "top": (
      <StatCard
        items={[
          { label: "상가 취득세율", value: "4%", sub: "농특세·교육세 포함 실효세율 4.6%" },
          { label: "취득세 신고 기한", value: "취득일부터 60일", sub: "기한 초과 시 가산세 부과" },
          { label: "과세표준", value: "실거래가", sub: "시가표준액이 하한선으로 적용" },
        ]}
      />
    ),
    "after-0": (
      <ComparisonTable
        title="상가 취득세 세율 구성"
        columns={[
          { name: "세목" },
          { name: "세율", highlight: true },
        ]}
        rows={[
          { label: "취득세", values: ["4.0%"] },
          { label: "농어촌특별세", values: ["0.2%"] },
          { label: "지방교육세", values: ["0.4%"] },
          { label: "합계 (실효세율)", values: ["4.6%"] },
        ]}
      />
    ),
    "after-2": (
      <ComparisonTable
        title="개인 vs 법인 상가 취득세 비교"
        columns={[
          { name: "구분" },
          { name: "개인", highlight: true },
          { name: "법인" },
        ]}
        rows={[
          { label: "일반 세율", values: ["4.6%", "4.6%"] },
          { label: "수도권 과밀억제권역", values: ["일반 세율 동일", "중과세 가능 (최대 12%+α)"] },
          { label: "중과 여부 판단", values: ["해당 없음", "설립 연도·취득 목적 따라 다름"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="info" title="부가세 환급받으면 취득세 과세표준에서도 제외 가능해요">
        임대사업자 등록 후 건물분 부가세를 환급받으면 실제 부담이 없으므로 취득세 과세표준에서 제외할 수 있어요. 부가세 환급 신청은 취득 후 확정 신고 시 홈택스(hometax.go.kr)에서 하세요.
      </WarningBox>
    ),
  },

  // ── Article 76: 상가 부부공동명의 취득세 절세 ──
  "sangga-bubu-gongdonmyeongui-chwideukse": {
    "after-0": (
      <WarningBox type="info" title="취득세 총액은 동일 — 공동명의 절세 효과는 임대소득세에서 나타나요">
        부부공동명의로 취득해도 취득세 총액은 단독명의와 같아요. 공동명의의 실질적인 절세 효과는 임대소득 분산을 통한 종합소득세와 양도소득세 절감에서 나타나요.
      </WarningBox>
    ),
    "after-1": (
      <ComparisonTable
        title="단독명의 vs 부부공동명의(50:50) 종합소득세 비교"
        columns={[
          { name: "구분" },
          { name: "단독명의" },
          { name: "공동명의(50:50)", highlight: true },
        ]}
        rows={[
          { label: "임대소득 귀속", values: ["전액 1인", "각자 50% 분산"] },
          { label: "누진세율 적용", values: ["높은 구간 적용", "낮은 구간 적용 가능"] },
          { label: "종합소득세 절감", values: ["없음", "배우자 소득 낮을수록 효과 큼"] },
          { label: "취득세 총액", values: ["동일", "동일"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="지분 비율은 실제 투자 금액 비율로 설정해야 해요">
        세금 절감 목적으로 지분 비율을 임의 설정하면 과세관청에서 부인될 수 있어요. 처음 취득 시 실제 자금 출처 비율을 근거로 지분을 설정하고, 자금 이체 내역을 보관하세요.
      </WarningBox>
    ),
    "after-3": (
      <AccordionChecklist
        groups={[
          {
            title: "부부공동명의 임대사업자 등록 절차",
            items: [
              "각자의 지분에 해당하는 임대사업자 등록 신청",
              "세무서 방문 또는 홈택스(hometax.go.kr) 온라인 신청",
              "사업자등록 신청서 + 임대차계약서 제출",
              "지분 비율 확인 (등기부등본 기준)",
              "각자 별도 사업소득세 신고",
            ],
          },
        ]}
      />
    ),
  },

  // ── Article 6 (민형사소송): 뺑소니 무보험 정부보장사업 ──
  "traffic-accident-government-guarantee": {
    "top": (
      <StatCard
        items={[
          { value: "1억 5천만원", label: "대인 사망·후유장해 보상 한도", sub: "자동차손해배상보장법 시행령" },
          { value: "3천만원", label: "대인 부상 최대 보상 한도", sub: "부상 등급에 따라 차등" },
          { value: "2천만원", label: "대물 보상 한도", sub: "무보험 사고만 해당 (뺑소니 제외)" },
          { value: "3년", label: "소멸시효", sub: "손해·가해자를 안 날부터" },
        ]}
      />
    ),
    "after-1": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "사고 접수", desc: "경찰에 교통사고 신고 → 사고 사실 확인서 발급" },
          { step: "2", title: "보험사 창구 접수", desc: "가까운 손해보험사 창구에 정부보장사업 청구 접수" },
          { step: "3", title: "서류 제출", desc: "진단서·치료비 영수증·사고 확인서 제출" },
          { step: "4", title: "심사", desc: "자동차손해배상진흥원 심사 (보험사 대행)" },
          { step: "5", title: "보상금 지급", desc: "심사 완료 후 계좌 입금" },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="소멸시효 — 사고 후 빨리 접수하세요">
        정부보장사업 청구권은 손해·가해자를 안 날부터 3년, 사고 발생일부터 10년 이내에만 행사할 수 있어요. 서류가 미비해도 먼저 접수해 두면 시효 중단 효력이 생겨요.
      </WarningBox>
    ),
  },

  // ── Article 7 (민형사소송): 12대 중과실 형사처벌 ──
  "traffic-accident-12-serious-violations": {
    "top": (
      <WarningBox type="warning" title="12대 중과실 — 종합보험 가입해도 형사처벌 가능">
        신호위반·중앙선 침범·음주운전 등 12대 중과실은 교통사고처리특례법상 종합보험 면책 적용이 제외돼요. 피해자 합의 없이도 공소 제기가 가능해요.
      </WarningBox>
    ),
    "after-1": (
      <ComparisonTable
        title="일반 교통사고 vs 12대 중과실 처리 비교"
        columns={[
          { name: "구분" },
          { name: "일반 교통사고" },
          { name: "12대 중과실", highlight: true },
        ]}
        rows={[
          { label: "종합보험 가입 시 면책", values: [true, false] },
          { label: "피해자 합의 시 불기소", values: ["가능", "기소유예 가능 (일부)"] },
          { label: "음주·무면허 별도 처벌", values: [false, true] },
          { label: "중상해 시 피해자 합의 효력", values: ["유효", "공소 제기 가능"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="danger" title="음주운전 — 피해자 합의 여부와 관계없이 형사처벌">
        음주운전 사고는 도로교통법 위반으로 별도 처벌받아요. 피해자가 합의하고 처벌불원서를 써줘도 형사처벌을 완전히 피하기 어려워요.
      </WarningBox>
    ),
  },

  // ── Article 8 (민형사소송): 손해사정사·변호사 활용 ──
  "traffic-accident-adjuster-lawyer": {
    "after-0": (
      <ComparisonTable
        title="보험사 파견 손해사정사 vs 사설 손해사정사 비교"
        columns={[
          { name: "구분" },
          { name: "보험사 파견" },
          { name: "사설(독립)", highlight: true },
        ]}
        rows={[
          { label: "선임 주체", values: ["보험사", "피해자 직접"] },
          { label: "비용 부담", values: ["보험사", "보상금의 5~10%"] },
          { label: "대리 이익", values: ["보험사 이익 우선", "피해자 이익 우선"] },
          { label: "항목 개발 적극성", values: ["소극적", "적극적"] },
          { label: "활용 시점", values: ["자동 배정", "분쟁 발생 시 선임"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="합의서 서명 전 권리 포기 문구를 반드시 확인하세요">
        합의서에 '향후 일체의 청구권을 포기한다'는 문구가 있으면 증상 악화 후 추가 청구가 어려워요. 치료가 완전히 종결된 후에 서명하는 것이 안전해요.
      </WarningBox>
    ),
  },

  // ── Article 9 (민형사소송): 사망 유족 손해배상 ──
  "traffic-accident-death-compensation": {
    "top": (
      <StatCard
        items={[
          { value: "약 1억원", label: "사망 피해자 본인 위자료", sub: "대법원 판례 기준" },
          { value: "약 1,500만원", label: "장례비 인정 기준", sub: "실무상 통상 인정 금액" },
          { value: "65세", label: "가동연한", sub: "일실수입 산정 기준" },
          { value: "호프만 공식", label: "일실수입 현재가치 환산", sub: "중간이자 공제" },
        ]}
      />
    ),
    "after-2": (
      <ComparisonTable
        title="교통사고 사망 손해배상 항목"
        columns={[
          { name: "항목" },
          { name: "내용" },
          { name: "비고" },
        ]}
        rows={[
          { label: "적극적 손해", values: ["치료비·장례비 등", "실제 지출 비용"] },
          { label: "소극적 손해", values: ["일실수입", "가동연한·직업 기준 산정"] },
          { label: "위자료 (본인)", values: ["약 1억원", "대법원 판례 기준"] },
          { label: "위자료 (배우자)", values: ["약 5,000만원", "관계·부양에 따라 조정"] },
          { label: "위자료 (부모·자녀)", values: ["2,000~4,000만원", "관계에 따라 차등"] },
        ]}
      />
    ),
  },

  // ── Article 10 (민형사소송): 합의금 증액·금감원 분쟁조정 ──
  "traffic-accident-insurer-dispute": {
    "after-1": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "민원 접수", desc: "금융감독원(1332) 또는 온라인 금융민원센터 접수" },
          { step: "2", title: "사실조사", desc: "금감원이 보험사 자료 요청 및 사실관계 조사" },
          { step: "3", title: "조정안 제시", desc: "조정위원회가 양측에 조정안 통보 (접수 후 약 60일)" },
          { step: "4", title: "수락 또는 거부", desc: "양측 수락 시 재판상 화해 효력 / 보험사 거부 시 소송" },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="info" title="실손보험과 자동차보험 — 위자료·휴업손해는 중복 수령 가능">
        실손보험은 치료비만 보상하지만, 자동차보험 합의금에는 위자료·휴업손해가 포함돼요. 위자료와 휴업손해는 실손보험과 별개이므로 중복 수령이 아니에요.
      </WarningBox>
    ),
  },

  // ── Article 11 (민형사소송): 스쿨존 교통사고 민식이법 ──
  "traffic-accident-school-zone": {
    "top": (
      <WarningBox type="warning" title="민식이법 — 스쿨존 어린이 사고는 종합보험 면책 불가">
        어린이보호구역 안전운전 의무 위반은 12대 중과실에 해당해요. 종합보험 가입 여부와 관계없이 형사처벌 대상이며, 상해 1~15년 또는 사망 시 무기 이상 징역이 규정돼 있어요(특가법 제5조의13).
      </WarningBox>
    ),
    "after-1": (
      <ComparisonTable
        title="스쿨존 사고 유죄 vs 무죄 판단 요소"
        columns={[
          { name: "구분" },
          { name: "유죄 가능성 높음" },
          { name: "무죄 가능성", highlight: true },
        ]}
        rows={[
          { label: "주행 속도", values: ["제한속도 초과", "20km/h 이하 서행"] },
          { label: "전방 주시", values: ["불충분", "충분히 주시"] },
          { label: "어린이 출현 방식", values: ["예측 가능", "갑자기 뛰어나옴"] },
          { label: "블랙박스 증거", values: ["없음", "서행·주시 확인 영상"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="info" title="사고 즉시 블랙박스·CCTV 영상을 보전하세요">
        스쿨존 사고에서 무죄 또는 감형을 받으려면 서행·전방 주시 증거가 핵심이에요. 사고 직후 블랙박스 SD카드를 확보하고, 주변 CCTV 영상 보전을 경찰에 요청하세요.
      </WarningBox>
    ),
  },

  // ── Article 12 (민형사소송): 음주운전 피해자 보상 ──
  "traffic-accident-drunk-driving-victim": {
    "top": (
      <StatCard
        items={[
          { value: "위자료 가산 가능", label: "음주운전 피해자 추가 보상", sub: "법원 재량, 20~50%+ 사례" },
          { value: "대인배상 I", label: "의무보험 — 음주 면책 불가", sub: "피해자 보호 최우선" },
          { value: "1억 5천만원", label: "정부보장사업 대인 한도", sub: "무보험 음주사고 대비" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="대인배상 I(의무보험) vs 대인배상 II(임의보험) 면책 비교"
        columns={[
          { name: "구분" },
          { name: "대인배상 I" },
          { name: "대인배상 II", highlight: true },
        ]}
        rows={[
          { label: "음주운전 면책", values: [false, "일부 가능"] },
          { label: "피해자 직접 청구", values: [true, "면책 시 가해자 직접"] },
          { label: "보험사 구상권", values: ["가해자에게 행사", "해당 없음"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="info" title="형사합의금은 민사 배상에서 공제될 수 있어요">
        형사합의금을 받으면 민사 손해배상 청구 시 공제되는 경우가 많아요. 형사합의 전에 민사 청구 전략을 함께 고려하고, 형사합의서에 민사 청구권 유보 문구를 넣는 방법을 검토하세요.
      </WarningBox>
    ),
  },

  // ── Article 13 (민형사소송): 휴업손해 산정 ──
  "traffic-accident-lost-income": {
    "after-0": (
      <ComparisonTable
        title="직업별 교통사고 휴업손해 소득 기준"
        columns={[
          { name: "직업 유형" },
          { name: "소득 기준" },
          { name: "주요 증빙" },
        ]}
        rows={[
          { label: "급여생활자", values: ["실제 감소 급여", "급여명세서·진단서"] },
          { label: "자영업자", values: ["세금신고 소득 (실제 소득 보완 가능)", "종합소득세 신고서·매출 장부"] },
          { label: "일용직", values: ["실제 일당 or 도시 일용노임", "고용주 확인서·통장 내역"] },
          { label: "전업주부", values: ["도시 일용노동자 임금", "가사노동 경제적 가치 인정"] },
          { label: "무직자", values: ["도시 일용노동자 임금", "이전 직업력·취업 가능성"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="info" title="유급 연차 소진도 휴업손해로 청구할 수 있어요">
        부득이 유급 연차를 소진한 경우 그 일수만큼의 연차 수당을 휴업손해로 청구할 수 있어요. 연차 사용 내역서와 1일 급여 환산 자료를 준비하세요.
      </WarningBox>
    ),
  },

  // ── Article 14 (민형사소송): 합의서 효력·주의사항 ──
  "traffic-accident-settlement-agreement": {
    "after-0": (
      <WarningBox type="warning" title="합의서 서명 전 반드시 이 문구를 확인하세요">
        '향후 일체의 손해배상 청구를 포기한다'는 문구가 있으면 나중에 후유증이 생겨도 추가 청구가 어려워요. 이 문구의 유무를 서명 전에 반드시 확인하세요.
      </WarningBox>
    ),
    "after-1": (
      <ComparisonTable
        title="형사합의 vs 민사합의 관계"
        columns={[
          { name: "구분" },
          { name: "형사합의" },
          { name: "민사합의" },
        ]}
        rows={[
          { label: "목적", values: ["형사처벌 경감", "손해배상 청구권 해결"] },
          { label: "효력", values: ["양형 참작 (처벌 감경)", "청구권 소멸 (포기 문구 시)"] },
          { label: "민사 공제", values: ["민사에서 공제 가능", "별도"] },
          { label: "합의 후 민사 청구", values: ["가능 (민사 포기 없으면)", "포기 문구 따라 달라짐"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="최종합의 후 후유증 — 포기 문구 유무가 핵심">
        권리 포기 문구가 없다면 예측 불가한 후유증 재청구 가능성이 있어요. 포기 문구가 있다면 착오·사기 취소 소송 외에는 재청구가 어려우니 서명 전에 치료 종결을 확인하세요.
      </WarningBox>
    ),
  },

  // ── Article 15 (민형사소송): 치료 중 합의 압박·전략 ──
  "traffic-accident-treatment-negotiation": {
    "after-0": (
      <WarningBox type="warning" title="치료 중 합의 — 향후치료비·후유장해 배상 기회를 잃을 수 있어요">
        치료가 끝나지 않은 상태에서 합의하면 향후 치료가 더 필요하거나 후유장해가 발생해도 추가 배상을 받기 어려워요. 증상 고정 후 합의하는 것이 원칙이에요.
      </WarningBox>
    ),
    "after-2": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "소견서 확보", desc: "주치의에게 추가 치료 필요 소견서 발급 요청" },
          { step: "2", title: "보험사 제출", desc: "소견서를 보험사에 제출해 지급 재개 요청" },
          { step: "3", title: "금감원 민원", desc: "지급 거부 지속 시 금융감독원(1332) 민원 제기" },
          { step: "4", title: "가처분 신청", desc: "긴급 치료 필요 시 법원에 진료비 지급 가처분 신청" },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="info" title="증상 고정 후 합의가 최선 — 모든 항목을 한 번에 청구하세요">
        증상 고정 후에는 향후치료비, 후유장해 위자료, 개호비 등 모든 항목을 파악해 한 번에 청구할 수 있어요. 주치의에게 증상 고정 여부를 확인한 뒤 협상을 시작하세요.
      </WarningBox>
    ),
  },

  // ── Article 16 (민형사소송): 자동차보험 담보 비교 ──
  "traffic-accident-insurance-coverage": {
    "top": (
      <ComparisonTable
        title="대인배상1(의무) vs 대인배상2(임의) 비교"
        columns={[
          { name: "구분" },
          { name: "대인배상1 (의무보험)" },
          { name: "대인배상2 (임의보험)", highlight: true },
        ]}
        rows={[
          { label: "가입 여부", values: ["필수", "선택"] },
          { label: "사망·후유장해 한도", values: ["최대 1억 5천만원", "무제한 or 한도 선택"] },
          { label: "부상 한도", values: ["최대 3천만원", "초과분 보장"] },
          { label: "종합보험 면책 적용", values: ["해당 없음", "가입 시 면책 가능"] },
          { label: "피해자 직접 청구", values: [true, true] },
        ]}
      />
    ),
    "after-2": (
      <ComparisonTable
        title="자기신체손해 vs 자동차상해 특약 비교"
        columns={[
          { name: "구분" },
          { name: "자기신체손해" },
          { name: "자동차상해 특약", highlight: true },
        ]}
        rows={[
          { label: "보상 기준", values: ["약관 정액 기준", "실제 손해액 기준"] },
          { label: "후유장해 보상", values: ["정액 지급", "실손 기준 지급"] },
          { label: "보험료", values: ["상대적 저렴", "상대적 비쌈"] },
          { label: "고액 피해 시 유리함", values: ["불리", "유리"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="info" title="운전자보험 형사합의금 담보 — 12대 중과실·스쿨존 사고 시 필수">
        자동차보험은 민사 배상만 처리해요. 형사합의금은 운전자보험에서 지원돼요. 12대 중과실이나 스쿨존 사고에서 형사합의금이 수천만 원에 달할 수 있으니 가입 전 음주·무면허 면책 조항을 확인하세요.
      </WarningBox>
    ),
  },

  // ── Article 17 (민형사소송): 소멸시효 기산점 ──
  "traffic-accident-statute-limitations-start": {
    "top": (
      <StatCard
        items={[
          { value: "3년", label: "단기 소멸시효", sub: "손해·가해자를 안 날부터 (민법 제766조 제1항)" },
          { value: "10년", label: "장기 소멸시효", sub: "불법행위(사고일)로부터 (민법 제766조 제2항)" },
          { value: "먼저 완성된 것 적용", label: "두 시효 중 하나라도 완성되면 소멸", sub: "단기·장기 중 먼저 완성된 기준" },
        ]}
      />
    ),
    "after-2": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "소송 제기", desc: "가장 확실한 시효 중단 — 소장 접수 즉시 중단 효력" },
          { step: "2", title: "가압류 신청", desc: "가해자 재산에 가압류 신청으로 시효 중단 가능" },
          { step: "3", title: "금감원 분쟁조정", desc: "신청 기간 중 시효 진행 정지 — 비용 없음" },
          { step: "4", title: "내용증명 + 6개월 내 소송", desc: "내용증명만으로는 중단 불가 — 반드시 소송 병행" },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="warning" title="사고일 = 시효 기산점이 아닐 수 있어요">
        후유증이 뒤늦게 발현됐거나 장해 등급 판정이 늦어진 경우, 손해를 안 날이 사고일보다 늦을 수 있어요. 기산점을 이연할 수 있는 사정이 있다면 포기 전에 반드시 확인하세요.
      </WarningBox>
    ),
  },

  // ── Article 18 (민형사소송): 후유증 뒤늦게 발견 시효 ──
  "traffic-accident-latent-injury-statute": {
    "top": (
      <WarningBox type="info" title="뒤늦게 발현된 후유증 — 장애 진단일부터 시효가 시작될 수 있어요">
        교통사고 후 수년 뒤 장애가 발현되면 장애를 인식한 날이 소멸시효 기산점이 될 수 있어요. 다만 사고일로부터 10년이 지나면 장기 소멸시효가 완성돼 청구가 불가능해요.
      </WarningBox>
    ),
    "after-2": (
      <WarningBox type="info" title="미성년자 피해자 — 성년이 된 후에도 청구 가능">
        법정대리인이 없는 경우 미성년자는 성년이 된 때부터 시효가 진행돼요(민법 제179조). 부모가 제때 청구하지 못했더라도 피해자 본인이 성년이 된 후 청구할 여지가 있어요.
      </WarningBox>
    ),
    "after-3": (
      <WarningBox type="warning" title="뇌 손상 지연 발현 — 즉시 정밀 검사·진단서를 확보하세요">
        대법원은 손해의 현실적 발생 시점을 기산점으로 봐요. 뇌 MRI 이상 발견 시점·장애 진단 시점이 핵심 증거가 돼요. 증상이 나타나면 즉시 전문 의료기관에서 검사를 받고 진단서를 보관하세요.
      </WarningBox>
    ),
  },

  // ── Article 19 (민형사소송): 보험금 청구 시효 2년 ──
  "traffic-accident-insurance-claim-vs-damage-period": {
    "top": (
      <ComparisonTable
        title="손해배상 청구권 vs 보험금 청구권 시효 비교"
        columns={[
          { name: "구분" },
          { name: "손해배상 청구권" },
          { name: "보험금 청구권", highlight: true },
        ]}
        rows={[
          { label: "법적 근거", values: ["민법 제766조", "상법 제662조"] },
          { label: "소멸시효", values: ["3년", "2년"] },
          { label: "기산점", values: ["손해·가해자를 안 날", "보험금 청구권 발생일"] },
          { label: "청구 대상", values: ["가해자(보험사)", "내 보험사"] },
          { label: "약관 연장", values: ["불가", "3년으로 연장 가능 (약관 확인)"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="warning" title="심신불명 시 법정대리인이 즉시 청구권 행사를 해야 해요">
        피해자가 심신불명이면 법정대리인(가족)이 보험금 청구를 대신할 수 있어요. 법정대리인이 없다면 법원에 성년후견인 선임을 신청해야 해요. 2년 시효를 놓치지 않도록 사고 직후 신속히 대응하세요.
      </WarningBox>
    ),
    "after-3": (
      <WarningBox type="info" title="2년이 지났다고 무조건 포기하지 마세요">
        보험사가 치료비를 지급했거나 합의를 협의했다면 시효 이익 포기 또는 시효 중단을 주장할 수 있어요. 가해자 보험사에 대한 손해배상 청구(3년)가 남아 있다면 별도 경로로 청구 가능해요.
      </WarningBox>
    ),
  },

  // ── Article 20 (민형사소송): 10년 장기소멸시효 ──
  "traffic-accident-10year-longterm-statute": {
    "top": (
      <StatCard
        items={[
          { value: "3년", label: "단기 시효", sub: "손해·가해자를 안 날부터" },
          { value: "10년", label: "장기 시효", sub: "불법행위(사고일)부터" },
          { value: "10년", label: "판결 확정 후 추심 기간", sub: "민법 제165조" },
        ]}
      />
    ),
    "after-1": (
      <ComparisonTable
        title="단기 3년 시효 vs 장기 10년 시효"
        columns={[
          { name: "구분" },
          { name: "단기 3년 시효" },
          { name: "장기 10년 시효", highlight: true },
        ]}
        rows={[
          { label: "법적 근거", values: ["민법 제766조 제1항", "민법 제766조 제2항"] },
          { label: "기산점", values: ["손해·가해자를 안 날", "불법행위 한 날(사고일)"] },
          { label: "활용 상황", values: ["일반적 기준", "기산점 이연 시 보완"] },
          { label: "먼저 완성 시", values: ["청구권 소멸", "청구권 소멸"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="info" title="판결 확정 후에는 새로 10년 시효가 시작돼요">
        교통사고 손해배상 판결이 확정되면 민법 제165조에 따라 확정 채권의 시효가 10년으로 새로 시작돼요. 가해자 재산이 없어도 10년 이내에 재산이 생기면 강제집행이 가능해요.
      </WarningBox>
    ),
    "after-3": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "재산 조회", desc: "금융거래 조회·부동산 조회로 가해자 재산 확인" },
          { step: "2", title: "강제집행 신청", desc: "판결문 기준 집행관에게 강제집행 신청" },
          { step: "3", title: "10년 만료 전 갱신 소송", desc: "판결 확정 후 10년 만료 전 이행 청구 소송 제기" },
          { step: "4", title: "새 판결로 10년 연장", desc: "새 판결 확정 시 다시 10년 추심 권리 확보" },
        ]}
      />
    ),
  },

  // ── Article 21 (민형사소송): 개호비 정기금 vs 일시금 ──
  "traffic-accident-nursing-care-periodical-vs-lump": {
    "top": (
      <StatCard
        items={[
          { value: "정기금", label: "여명 초과 생존 → 계속 지급", sub: "사정변경 증감 신청 가능" },
          { value: "일시금", label: "호프만 공식 현재가치 환산", sub: "예측여명 초과 생존 시 추가청구 어려움" },
          { value: "10년", label: "판결 확정 정기금 채권 시효", sub: "민법 제165조" },
        ]}
      />
    ),
    "after-0": (
      <ComparisonTable
        title="개호비 정기금 vs 일시금 비교"
        columns={[
          { name: "구분" },
          { name: "일시금" },
          { name: "정기금", highlight: true },
        ]}
        rows={[
          { label: "지급 방식", values: ["현재가치 일괄 수령", "매월/매년 지급"] },
          { label: "여명 초과 생존", values: ["추가 청구 원칙 불가", "계속 지급"] },
          { label: "사정변경 대응", values: ["어려움", "증감 신청 가능"] },
          { label: "시효 구조", values: ["일반 시효 적용", "회분별 독립 (판결 시 10년)"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="info" title="정기금 판결 후에도 사정변경 시 증감 신청이 가능해요">
        민사소송법 제252조에 따라 정기금 판결 확정 후 피해자 상태 악화, 개호 필요도 증가, 임금 상승 등이 생기면 증액 신청을 할 수 있어요. 일시금 합의보다 유연하게 대응할 수 있어요.
      </WarningBox>
    ),
  },

  // ── Article 22 (민형사소송): 개호비 도시일용노임·근친자 개호 ──
  "traffic-accident-nursing-care-daily-wage-calculation": {
    "after-0": (
      <ComparisonTable
        title="도시 일용노임 기준 개호비 산정 구조"
        columns={[
          { name: "구분" },
          { name: "내용" },
        ]}
        rows={[
          { label: "기준 임금", values: ["도시 일용노동자 임금 (통계청 기준)"] },
          { label: "근친자 개호", values: ["실비 지출 없어도 동일 기준 적용"] },
          { label: "1일 개호 시간", values: ["신체감정 결과에 따라 결정"] },
          { label: "완전 개호 시", values: ["2인 이상 풀타임 인정 사례 있음"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="info" title="신체감정 결과에 이의가 있으면 재감정을 신청하세요">
        신체감정에서 1일 개호 시간이 낮게 나오면 재감정 신청 또는 독립 의료 전문가 의견서로 다툴 수 있어요. 1시간 차이가 개호비 총액에 수백만원 이상 영향을 줄 수 있어요.
      </WarningBox>
    ),
    "after-3": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "진단서·소견서 확보", desc: "개호 필요도를 뒷받침하는 의무기록 수집" },
          { step: "2", title: "신체감정 신청", desc: "법원에 신체감정 신청 또는 보험사 감정에 응함" },
          { step: "3", title: "감정 결과 검토", desc: "1일 개호 시간·개호 인원 결과 확인" },
          { step: "4", title: "이의 시 재감정 신청", desc: "결과에 이의 있으면 법원에 재감정 신청" },
        ]}
      />
    ),
  },

  // ── Article 23 (민형사소송): 보험사 구상권 청구 대응 ──
  "traffic-accident-insurance-subrogation-claim": {
    "top": (
      <WarningBox type="warning" title="구상금 소장을 받으면 30일 내 답변서를 반드시 제출하세요">
        답변서를 제출하지 않으면 자백간주로 처리돼 보험사 청구 금액 전액이 인용될 수 있어요. 소장 수령 즉시 답변서 제출 기한을 확인하고 대응을 시작하세요.
      </WarningBox>
    ),
    "after-1": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "소장 수령 확인", desc: "답변서 제출 기한(통상 30일) 확인" },
          { step: "2", title: "사건 검토", desc: "과실비율·금액 산정·시효 여부 점검" },
          { step: "3", title: "답변서 제출", desc: "법원 민사 접수 창구 또는 전자소송으로 제출" },
          { step: "4", title: "증거 수집", desc: "블랙박스·사고 현장 CCTV·경찰 조사서 확보" },
        ]}
      />
    ),
    "after-2": (
      <ComparisonTable
        title="구상금 소송 주요 항변 전략"
        columns={[
          { name: "항변 유형" },
          { name: "내용" },
          { name: "인정 가능성" },
        ]}
        rows={[
          { label: "과실비율 다툼", values: ["실제보다 높게 산정된 과실비율 이의", "블랙박스·CCTV 증거 있으면 높음"] },
          { label: "소멸시효 완성", values: ["3년 또는 10년 시효 완성 주장", "기산점 계산 명확 시 높음"] },
          { label: "금액 산정 오류", values: ["구상 금액 계산 근거 이의", "산정 내역 확인 필요"] },
          { label: "권리남용 항변", values: ["신의칙 위반 주장", "요건 까다로워 낮음"] },
        ]}
      />
    ),
  },

  // ── Article 24 (민형사소송): 보험사 구상권 소멸시효 10년 ──
  "traffic-accident-subrogation-statute-10year": {
    "top": (
      <StatCard
        items={[
          { value: "3년", label: "보험금 지급일부터 단기 시효", sub: "보험자대위 구상권 기산점" },
          { value: "10년", label: "사고일부터 장기 시효", sub: "불법행위 장기 시효 우선 완성 시 소멸" },
          { value: "먼저 완성", label: "두 시효 중 선완성 기준", sub: "시효 완성 항변은 피고가 주장해야" },
        ]}
      />
    ),
    "after-0": (
      <ComparisonTable
        title="보험사 구상권 시효 구조"
        columns={[
          { name: "시효 유형" },
          { name: "기산점" },
          { name: "기간" },
        ]}
        rows={[
          { label: "단기 소멸시효", values: ["보험금 지급일", "3년"] },
          { label: "장기 소멸시효", values: ["불법행위일(사고일)", "10년"] },
          { label: "판결 확정 후", values: ["판결 확정일", "10년 (민법 제165조)"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="info" title="시효 완성 항변은 답변서에 명시적으로 주장해야 해요">
        소멸시효 완성은 법원이 직권으로 판단하지 않아요. 구상금 소장을 받으면 답변서에 '소멸시효 완성 항변'을 명시적으로 기재해야 인정받을 수 있어요.
      </WarningBox>
    ),
  },

  // ── Article 25 (민형사소송): 음주운전 구상권·피해자 보상 ──
  "traffic-accident-drunk-driving-subrogation": {
    "top": (
      <StatCard
        items={[
          { value: "대인배상 I", label: "의무보험 — 음주 면책 불가", sub: "피해자 보호 최우선" },
          { value: "1억 5천만원", label: "정부보장사업 대인 한도", sub: "무보험 음주사고 피해자 구제" },
          { value: "전액 구상", label: "음주 가해자 — 보험사 구상 가능", sub: "대인배상 II 면책 해당분" },
        ]}
      />
    ),
    "after-0": (
      <ComparisonTable
        title="음주운전 사고 피해자 보상 경로"
        columns={[
          { name: "보상 경로" },
          { name: "조건" },
          { name: "한도" },
        ]}
        rows={[
          { label: "대인배상 I (의무보험)", values: ["항상 지급", "사망 최대 1억 5천만원"] },
          { label: "대인배상 II (임의보험)", values: ["면책 없으면 지급", "무제한 또는 한도 선택"] },
          { label: "정부보장사업", values: ["무보험·뺑소니 사고", "대인 최대 1억 5천만원"] },
          { label: "무보험자동차 상해 특약", values: ["내 보험 가입 시", "특약 한도 이내"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="info" title="음주운전 무보험 가해자 — 정부보장사업 창구를 이용하세요">
        가까운 손해보험사 지점에 자동차손해배상 보장사업 보상을 신청할 수 있어요. 가해자가 보험 미가입이거나 뺑소니인 경우 모두 해당돼요. 내 보험 무보험자동차 상해 특약도 확인하세요.
      </WarningBox>
    ),
  },

  // ── Article 26 (민형사소송): 동승자 구상권·호의동승 ──
  "traffic-accident-passenger-subrogation": {
    "after-0": (
      <ComparisonTable
        title="동승자 유형별 배상 청구 조건"
        columns={[
          { name: "동승 유형" },
          { name: "배상 청구 가능 여부" },
          { name: "감액 여부" },
        ]}
        rows={[
          { label: "일반 동승(비용 부담)", values: [true, "과실 없으면 감액 없음"] },
          { label: "호의동승(무상 탑승)", values: [true, "10~30% 감액 가능"] },
          { label: "음주운전 인지 후 탑승", values: [true, "과실상계 폭 큼"] },
          { label: "가족 동승", values: ["약관 확인 필요", "특약 적용 여부 확인"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="info" title="호의동승이라도 배상을 포기할 필요 없어요">
        호의동승 감액 비율은 운전자 과실 정도에 따라 달라져요. 음주운전·무면허 등 중대 과실인 경우 감액이 제한돼요. 배상 포기 전에 전문가 상담을 받으세요.
      </WarningBox>
    ),
    "after-3": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "가해 차량 보험사 확인", desc: "가해 차량 자동차보험사 및 사고 접수번호 확인" },
          { step: "2", title: "직접 청구 접수", desc: "보험사 직접 청구권 행사 (자동차손해배상보장법 제10조)" },
          { step: "3", title: "내 보험 확인", desc: "탑승자 특약·자동차상해 특약 적용 여부 확인" },
          { step: "4", title: "감액 비율 다툼", desc: "호의동승 감액 비율 이의 시 변호사 조력 검토" },
        ]}
      />
    ),
  },

  // ── Article 27 (민형사소송): 회사 차량·사용자책임 구상권 ──
  "traffic-accident-employer-employee-subrogation": {
    "after-0": (
      <ComparisonTable
        title="사용자책임 성립 여부 판단 기준"
        columns={[
          { name: "상황" },
          { name: "사용자책임" },
        ]}
        rows={[
          { label: "업무 중 정규 사고", values: ["성립"] },
          { label: "출퇴근 중 사고", values: ["사안에 따라 성립 가능"] },
          { label: "업무 외 묵시적 허락 사용", values: ["성립 가능"] },
          { label: "무단 사용 사고", values: ["부정 가능"] },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="info" title="회사가 구상 청구를 받으면 직원 고의·중과실 여부를 먼저 확인하세요">
        직원의 단순 과실에서 회사가 전액 구상을 청구하면 신의칙 위반으로 다툴 수 있어요. 업무 지시 경위, 회사 이익 수취 여부 등을 검토해 구상 범위를 제한하세요.
      </WarningBox>
    ),
    "after-3": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "소장 수령 확인", desc: "30일 내 답변서 제출 기한 확인" },
          { step: "2", title: "사용자책임 검토", desc: "업무 관련성·차량 사용 허락 여부 확인" },
          { step: "3", title: "답변서 제출", desc: "사용자책임 불성립·과실비율 이의 등 항변 기재" },
          { step: "4", title: "증거 수집", desc: "블랙박스·업무 지시서·차량 관리 대장 확보" },
        ]}
      />
    ),
  },

  // ── Article 28 (민형사소송): 미성년자·취약계층 구상권 ──
  "traffic-accident-minor-victim-subrogation": {
    "top": (
      <WarningBox type="warning" title="구상금 소장을 받으면 30일 내 답변서를 반드시 제출하세요">
        미성년자는 법정대리인이 대신 답변서를 제출해야 해요. 무응답 시 자백간주로 처리돼요. 소멸시효 완성, 과실 부존재, 권리남용 항변을 검토하세요.
      </WarningBox>
    ),
    "after-2": (
      <ComparisonTable
        title="구상금 소송 대응 항변 유형"
        columns={[
          { name: "항변 유형" },
          { name: "내용" },
          { name: "인정 가능성" },
        ]}
        rows={[
          { label: "과실 부존재", values: ["피해자 무과실 입증", "증거 확보 시 높음"] },
          { label: "소멸시효 완성", values: ["3년 또는 10년 시효 완성", "기산점 계산 명확 시 높음"] },
          { label: "권리남용 항변", values: ["취약계층 대상 부당 청구", "요건 까다로워 중간"] },
          { label: "청구 금액 이의", values: ["산정 근거 부재", "내역 확인 필요"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="info" title="시효 완성 후 채무 승인이나 일부 납부는 절대 하지 마세요">
        소멸시효가 완성된 후에 채무를 인정하거나 일부만 납부하면 시효 이익을 포기한 것으로 간주돼 새 시효가 시작돼요. 보험사 요구에 응하기 전에 반드시 시효 완성 여부를 확인하세요.
      </WarningBox>
    ),
  },

  // ── Article 29 (민형사소송): 렌터카 CDW·수리비·휴차보상료 ──
  "rentcar-cdw-repair-cost": {
    "top": (
      <StatCard
        items={[
          { value: "CDW 미가입", label: "수리비 전액 본인 부담", sub: "타차운전 특약·카드 보험 확인 필요" },
          { value: "완전면책", label: "자기부담금 0원", sub: "타이어·휠 단독 손상은 제외 가능" },
          { value: "휴차보상료", label: "수리일수 기준 산정", sub: "1일 대여요금 기준" },
        ]}
      />
    ),
    "after-0": (
      <ComparisonTable
        title="렌터카 자차 보험 유형 비교"
        columns={[
          { name: "유형" },
          { name: "자기부담금" },
          { name: "특이사항" },
        ]}
        rows={[
          { label: "CDW 미가입", values: ["수리비 전액", "타차운전 특약으로 대체 가능"] },
          { label: "일반자차(CDW)", values: ["30만~100만원", "초과분 면책"] },
          { label: "완전면책(Super CDW)", values: ["0원", "타이어·휠 등 일부 제외"] },
        ]}
      />
    ),
    "after-3": (
      <WarningBox type="info" title="대여·반납 시 차량 상태를 사진으로 반드시 기록하세요">
        기존 손상이 있는 상태로 반납하면 새로운 손상으로 오해받을 수 있어요. 대여 전·반납 시 차량 사방을 사진으로 기록하고 직원 확인을 받으세요.
      </WarningBox>
    ),
  },

  // ── Article 30 (민형사소송): 렌터카 공제조합·과실비율 분쟁 ──
  "rentcar-gongje-vs-insurance": {
    "after-0": (
      <ComparisonTable
        title="렌터카 공제조합 vs 일반 보험사 보상 비교"
        columns={[
          { name: "구분" },
          { name: "공제조합" },
          { name: "일반 보험사", highlight: true },
        ]}
        rows={[
          { label: "대인배상 한도", values: ["법정 최저 기준 가능", "무한 또는 고액"] },
          { label: "대물배상 한도", values: ["한도 제한 가능", "무한 또는 고액"] },
          { label: "피해자 직접청구", values: [true, true] },
          { label: "분쟁조정 기관", values: ["금감원·소비자원", "금감원·소비자원"] },
        ]}
      />
    ),
    "after-1": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "보험사·공제조합 이의 신청", desc: "과실비율 재심 신청 (결과 2~6주 소요)" },
          { step: "2", title: "금감원 민원", desc: "금융감독원(1332) 민원 접수" },
          { step: "3", title: "분쟁조정 신청", desc: "금융분쟁조정위원회 또는 소비자원 신청" },
          { step: "4", title: "소송 제기", desc: "조정 결렬 시 민사 소송 (소액사건 간이 가능)" },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="info" title="사고 직후 블랙박스 SD카드를 분리해 보관하세요">
        과실비율 분쟁에서 블랙박스 영상이 핵심 증거예요. 렌터카에도 블랙박스가 장착된 경우 반납 전 영상 사본을 요청하거나 SD카드를 먼저 확보하세요.
      </WarningBox>
    ),
  },

  // ── Article 31 (민형사소송): 대차료 거절·수리기간·휴차손해 ──
  "accident-rental-claim-denial": {
    "after-0": (
      <ComparisonTable
        title="대차료 청구 주요 기준"
        columns={[
          { name: "항목" },
          { name: "보험사 인정 기준" },
        ]}
        rows={[
          { label: "차량 등급", values: ["피해 차량과 동급 렌터카 요금"] },
          { label: "렌터카 업체", values: ["제휴 업체 기준 (비제휴 이용 시 차액 본인 부담 가능)"] },
          { label: "인정 기간", values: ["적정 수리 일수 (지연 사유 증빙 시 연장 가능)"] },
          { label: "영업용 차량", values: ["대차료 + 휴차손해 별도 청구 가능"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="info" title="수리 지연이 업체 귀책이라면 지연 사유 확인서를 받으세요">
        부품 대기, 수리 업체 일정 등 업체 귀책 지연은 추가 대차료가 인정돼요. 수리 업체에서 지연 사유 확인서를 받아 보험사에 제출하세요.
      </WarningBox>
    ),
    "after-3": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "동급 기준 확인", desc: "보험사에 피해 차량 동급 렌트 요금 기준 확인" },
          { step: "2", title: "렌터카 계약", desc: "제휴 업체 또는 비제휴 업체 이용 (사전 협의 권장)" },
          { step: "3", title: "수리 완료 확인", desc: "수리 일자 확인 및 대차 기간 산정" },
          { step: "4", title: "대차료 청구", desc: "렌트 영수증·계약서 첨부해 보험사 청구" },
        ]}
      />
    ),
  },

  // ── Article 32 (민형사소송): 격락손해·전손·수리비 재견적 ──
  "accident-depreciation-total-loss": {
    "top": (
      <StatCard
        items={[
          { value: "출고 2년 이내", label: "격락손해 10~20% 수준 인정", sub: "수리비 기준 비율" },
          { value: "전손 처리", label: "수리비 > 차량가액 시 적용", sub: "보험개발원 기준가액 기준" },
          { value: "재견적", label: "수리비 과다 의심 시 신청 가능", sub: "공인 감정기관 의뢰 가능" },
        ]}
      />
    ),
    "after-0": (
      <ComparisonTable
        title="격락손해 청구 기준 (출고 연식별)"
        columns={[
          { name: "출고 연식" },
          { name: "인정 비율(수리비 기준)" },
        ]}
        rows={[
          { label: "2년 이내", values: ["10~20%"] },
          { label: "2~5년", values: ["5~10%"] },
          { label: "5년 초과", values: ["원칙적 미인정"] },
          { label: "프레임 손상 시", values: ["비율 상향 인정 가능"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="info" title="대물 한도 초과분은 가해자에게 직접 청구해야 해요">
        보험 한도 초과 수리비는 가해자 개인 책임이에요. 가해자 재산 여부를 확인하고 내용증명, 소송, 강제집행 순서로 대응하세요.
      </WarningBox>
    ),
  },

  // ── Article 33 (민형사소송): 무단횡단 과실비율·형사처벌 ──
  "pedestrian-jaywalking-fault-ratio": {
    "after-0": (
      <ComparisonTable
        title="무단횡단 사고 과실비율 주요 기준"
        columns={[
          { name: "상황" },
          { name: "보행자 과실" },
          { name: "운전자 과실" },
        ]}
        rows={[
          { label: "일반 무단횡단", values: ["20~30%", "70~80%"] },
          { label: "야간 무단횡단", values: ["30~50%", "50~70%"] },
          { label: "갑작스러운 뛰어듦", values: ["40~60%", "40~60%"] },
          { label: "어린이·고령자", values: ["10~20% (감산)", "80~90%"] },
        ]}
      />
    ),
    "after-1": (
      <WarningBox type="info" title="무단횡단 사고라도 운전자 과실이 없는 건 아니에요">
        무단횡단이더라도 운전자가 과속·전방 주시 불충분 등이 있으면 과실이 인정돼요. 100대0 주장은 블랙박스·CCTV 증거가 있어야 가능해요.
      </WarningBox>
    ),
    "after-3": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "증거 확보", desc: "블랙박스·현장 CCTV·목격자 진술 즉시 수집" },
          { step: "2", title: "과실비율 확인", desc: "보험사 산정 과실비율 검토" },
          { step: "3", title: "이의 신청", desc: "과실비율 이의 시 손해보험협회 분쟁심의 신청" },
          { step: "4", title: "금감원 분쟁조정", desc: "이의 결과 불만족 시 금감원 분쟁조정 신청" },
        ]}
      />
    ),
  },

  // ── Article 34 (민형사소송): 횡단보도 우회전 중과실·형사처벌 ──
  "crosswalk-right-turn-pedestrian-criminal": {
    "top": (
      <WarningBox type="warning" title="횡단보도 우회전 사고는 종합보험이 있어도 형사처벌 대상이에요">
        보행자 신호 초록불 중 우회전 사고는 12대 중과실(신호 위반)에 해당해요. 형사처벌을 피하려면 피해자와 형사합의 또는 공탁이 필요해요.
      </WarningBox>
    ),
    "after-1": (
      <ComparisonTable
        title="형사합의 vs 공탁 비교"
        columns={[
          { name: "구분" },
          { name: "형사합의" },
          { name: "공탁", highlight: true },
        ]}
        rows={[
          { label: "피해자 동의", values: ["필요", "불필요"] },
          { label: "형사 면책 효과", values: ["높음 (합의서 제출 시)", "낮음 (감형 사유)"] },
          { label: "금액 결정", values: ["당사자 협의", "손해액 기준 산정"] },
          { label: "민사 청구 제한", values: ["포기 문구 있으면 제한", "없음"] },
        ]}
      />
    ),
    "after-3": (
      <ProcessTimeline
        steps={[
          { step: "1", title: "사고 신고", desc: "경찰 신고 및 피해자 구호 조치 (뺑소니 방지)" },
          { step: "2", title: "형사합의 시도", desc: "피해자 측에 형사합의 의사 전달" },
          { step: "3", title: "합의 거부 시 공탁", desc: "손해액 산정 후 법원에 공탁금 납입" },
          { step: "4", title: "형사 변호사 선임", desc: "중과실 사건은 형사 전문 변호사 조력 필요" },
        ]}
      />
    ),
  },

  // ── Article 35 (민형사소송): 노인·어린이 교통사고 배상 ──
  "elderly-child-accident-compensation": {
    "after-0": (
      <ComparisonTable
        title="노인·어린이 교통사고 손해배상 항목"
        columns={[
          { name: "항목" },
          { name: "노인 피해자" },
          { name: "어린이 피해자" },
        ]}
        rows={[
          { label: "일실수입", values: ["가사노동 등 도시일용노임 기준", "장래 취업 가능성 기준"] },
          { label: "위자료", values: ["나이 불문 청구 가능", "법원 재량 높게 인정 경향"] },
          { label: "개호비", values: ["여명 기준 산정", "여명 기준 산정"] },
          { label: "장례비", values: ["실비 기준", "실비 기준"] },
        ]}
      />
    ),
    "after-2": (
      <WarningBox type="info" title="어린이 사망사고에서 일실수입을 빠뜨리지 마세요">
        어린이는 현재 소득이 없어도 장래 취업 가능성을 기준으로 일실수입이 산정돼요. 항목이 누락되지 않도록 전문가 조력을 받아 청구하세요.
      </WarningBox>
    ),
    "after-3": (
      <WarningBox type="warning" title="시효 완성 전에 반드시 내용증명 또는 소제기로 시효를 중단하세요">
        사고일부터 10년, 손해·가해자를 안 날부터 3년이 소멸시효예요. 미성년 피해자는 법정대리인이 안 날부터 시효가 진행되므로 주의하세요.
      </WarningBox>
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
