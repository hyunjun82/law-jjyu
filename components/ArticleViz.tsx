"use client";

import { AccordionChecklist } from "@/components/viz/AccordionChecklist";
import { ComparisonTable } from "@/components/viz/ComparisonTable";
import { DateCalculator } from "@/components/viz/DateCalculator";
import { WarningBox } from "@/components/viz/WarningBox";
import { ContactCard } from "@/components/viz/ContactCard";
import { FormDownload } from "@/components/viz/FormDownload";
import { StatCard } from "@/components/viz/StatCard";

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
