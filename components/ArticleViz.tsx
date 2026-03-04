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
