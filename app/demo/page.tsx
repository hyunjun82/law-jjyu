"use client";

import { StatCard } from "@/components/viz/StatCard";
import { ProcessTimeline } from "@/components/viz/ProcessTimeline";
import { ProgressTracker } from "@/components/viz/ProgressTracker";
import { EligibilityChecker } from "@/components/viz/EligibilityChecker";
import { CostBreakdown } from "@/components/viz/CostBreakdown";
import { AccordionChecklist } from "@/components/viz/AccordionChecklist";
import { ComparisonTable } from "@/components/viz/ComparisonTable";
import { WarningBox, TipBox } from "@/components/viz/WarningBox";
import { Calculator } from "@/components/viz/Calculator";
import { DateCalculator } from "@/components/viz/DateCalculator";
import { DecisionTree } from "@/components/viz/DecisionTree";
import { RangeTable } from "@/components/viz/RangeTable";
import { ContactCard } from "@/components/viz/ContactCard";
import { FormDownload } from "@/components/viz/FormDownload";
import { CaseCard } from "@/components/viz/CaseCard";
import { DeadlineBanner } from "@/components/viz/DeadlineBanner";
import { FAQSection } from "@/components/FAQSection";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* 히어로 */}
      <section className="border-b bg-gradient-to-b from-green-50 to-white">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <span className="inline-block bg-gov-600 text-white text-xs font-medium px-2.5 py-1 rounded-md mb-4">
            시각화 컴포넌트 미리보기 · 전체 16종
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            개인회생 신청 가이드 (샘플)
          </h1>
          <p className="mt-3 text-base text-gray-500 leading-relaxed">
            모든 법률 카테고리에 재사용되는 16개 시각화 컴포넌트를 한 페이지에서 확인합니다.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-8 space-y-2">

        {/* ─── 1. StatCard ─── */}
        <div>
          <SectionLabel num={1} name="StatCard" desc="핵심 수치 — 페이지 상단" />
          <StatCard
            items={[
              { value: "최대 90%", label: "채무 면책 비율", sub: "법원 인가 기준" },
              { value: "3년", label: "변제 기간", sub: "최소 기간" },
              { value: "50만원~", label: "신청 비용", sub: "변호사 포함 시" },
              { value: "6개월", label: "평균 소요기간", sub: "접수→인가" },
            ]}
          />
        </div>

        {/* ─── 2. ProcessTimeline ─── */}
        <div>
          <SectionLabel num={2} name="ProcessTimeline" desc="단계별 세로 타임라인" />
          <ProcessTimeline
            steps={[
              { step: "1", title: "상담 및 서류 준비", desc: "법률구조공단 또는 변호사 상담 후 필요 서류를 모아요." },
              { step: "2", title: "법원에 신청서 제출", desc: "관할 법원 파산부에 개인회생 신청서를 접수해요." },
              { step: "3", title: "개시 결정", desc: "법원이 요건을 심사한 뒤 개인회생 개시 결정을 내려요." },
              { step: "4", title: "변제계획 인가", desc: "채권자 의견 조회 후 법원이 변제계획을 인가해요." },
              { step: "5", title: "변제 수행 (3~5년)", desc: "매달 정해진 금액을 변제하면서 생활해요." },
              { step: "6", title: "면책 결정", desc: "변제를 모두 마치면 나머지 채무가 면책돼요!" },
            ]}
          />
        </div>

        {/* ─── 3. ProgressTracker ─── */}
        <div>
          <SectionLabel num={3} name="ProgressTracker" desc="현재 단계 가로 표시" />
          <ProgressTracker
            steps={[
              { label: "상담" },
              { label: "신청" },
              { label: "개시결정" },
              { label: "인가" },
              { label: "변제" },
              { label: "면책" },
            ]}
            current={3}
          />
        </div>

        {/* ─── 4. EligibilityChecker ─── */}
        <div>
          <SectionLabel num={4} name="EligibilityChecker" desc="자격 요건 예/아니오 체크" />
          <EligibilityChecker
            questions={[
              { question: "총 채무액이 무담보 10억 원 이하인가요?", helpText: "담보채무 포함 15억 원 이하" },
              { question: "급여 등 정기적인 소득이 있나요?", helpText: "근로·사업·연금 등" },
              { question: "현재 파산 선고를 받은 상태가 아닌가요?" },
              { question: "채무 원인이 도박·사치가 아닌가요?", helpText: "일부 면책 제한 사유" },
            ]}
            passMessage="개인회생 신청 자격이 있어요!"
            failMessage="일부 조건이 충족되지 않았어요."
          />
        </div>

        {/* ─── 5. CostBreakdown ─── */}
        <div>
          <SectionLabel num={5} name="CostBreakdown" desc="비용 구조 도넛 차트" />
          <CostBreakdown
            total="약 150만원"
            unit="만원"
            items={[
              { name: "인지대·송달료", value: 30 },
              { name: "변호사 선임비", value: 80 },
              { name: "채권자 목록 작성", value: 20 },
              { name: "기타 (우편·교통)", value: 20 },
            ]}
          />
        </div>

        {/* ─── 6. AccordionChecklist ─── */}
        <div>
          <SectionLabel num={6} name="AccordionChecklist" desc="접기/펼치기 체크리스트" />
          <AccordionChecklist
            groups={[
              {
                title: "기본 서류",
                items: [
                  "주민등록등본 1통",
                  "가족관계증명서 1통",
                  "소득 증명 (급여명세서 or 소득금액증명원)",
                  "재산 목록 (부동산·차량·예금 등)",
                  "채권자 목록 (금액·채권자명·연락처)",
                ],
              },
              {
                title: "추가 서류",
                items: ["임대차계약서 사본", "보험 가입 내역서", "카드 사용 내역 (최근 2년)"],
              },
              {
                title: "법원 제출 서류",
                items: ["개인회생 신청서 (법원 양식)", "변제계획안", "채권자 일람표", "수입·지출 목록"],
              },
            ]}
          />
        </div>

        {/* ─── 7. ComparisonTable ─── */}
        <div>
          <SectionLabel num={7} name="ComparisonTable" desc="비교표 + 추천 하이라이트" />
          <ComparisonTable
            title="개인회생 vs 개인파산 비교"
            columns={[
              { name: "개인회생", highlight: true },
              { name: "개인파산" },
            ]}
            rows={[
              { label: "소득 요건", values: ["정기 소득 필요", "소득 없어도 가능"] },
              { label: "채무 한도", values: ["무담보 10억 이하", "제한 없음"] },
              { label: "변제 기간", values: ["3~5년", "없음 (즉시 면책)"] },
              { label: "재산 유지", values: [true, false] },
              { label: "면책 범위", values: ["잔여 채무 면책", "전액 면책"] },
              { label: "신용 회복", values: ["빠름 (3~5년)", "느림 (7~10년)"] },
              { label: "직업 제한", values: [false, true] },
            ]}
          />
        </div>

        {/* ─── 8. WarningBox / TipBox (리디자인) ─── */}
        <div>
          <SectionLabel num={8} name="WarningBox / TipBox" desc="좌측 컬러바 + 아이콘 배경 (4타입)" />
          <WarningBox type="warning" title="허위 서류 제출 금지">
            재산이나 소득을 숨기면 면책 불허가 사유가 돼요. 모든 채무와 재산을 정직하게 신고하세요.
          </WarningBox>
          <TipBox title="법률구조공단 무료 상담 활용하세요">
            기초생활수급자, 차상위계층은 대한법률구조공단에서 무료 변호사 선임까지 지원받을 수 있어요.
            전화 132로 상담 예약하세요.
          </TipBox>
          <WarningBox type="danger" title="변제금 미납 시 폐지">
            변제 기간 중 2회 이상 미납하면 개인회생이 폐지될 수 있어요. 납부일을 꼭 지키세요.
          </WarningBox>
          <WarningBox type="info" title="2025년 변경 사항">
            2025년부터 무담보 채무 한도가 5억 → 10억으로 상향되었어요.
          </WarningBox>
        </div>

        {/* ─── 9. Calculator ─── */}
        <div>
          <SectionLabel num={9} name="Calculator" desc="금액 계산기 (양육비/위자료/변제금)" />
          <Calculator
            title="개인회생 월 변제금 계산기"
            description="총 채무액과 변제 기간을 입력하면 월 변제 금액을 계산해드려요."
            fields={[
              { key: "debt", label: "총 채무액", placeholder: "5000", unit: "만원" },
              { key: "rate", label: "면책 비율", placeholder: "80", unit: "%" },
              {
                key: "period",
                label: "변제 기간",
                type: "select",
                options: [
                  { label: "3년 (36개월)", value: "36" },
                  { label: "4년 (48개월)", value: "48" },
                  { label: "5년 (60개월)", value: "60" },
                ],
                defaultValue: "36",
              },
            ]}
            results={[
              {
                label: "면책 금액 (안 갚아도 되는 금액)",
                formula: (v) => {
                  const debt = Number(v.debt) || 0;
                  const rate = Number(v.rate) || 0;
                  return `${Math.round(debt * rate / 100).toLocaleString()}만원`;
                },
              },
              {
                label: "총 변제 금액",
                formula: (v) => {
                  const debt = Number(v.debt) || 0;
                  const rate = Number(v.rate) || 0;
                  return `${Math.round(debt * (100 - rate) / 100).toLocaleString()}만원`;
                },
              },
              {
                label: "월 변제금",
                highlight: true,
                formula: (v) => {
                  const debt = Number(v.debt) || 0;
                  const rate = Number(v.rate) || 0;
                  const period = Number(v.period) || 36;
                  const total = debt * (100 - rate) / 100;
                  return `약 ${Math.round(total / period * 10000).toLocaleString()}원 / 월`;
                },
              },
            ]}
          />
        </div>

        {/* ─── 10. DateCalculator ─── */}
        <div>
          <SectionLabel num={10} name="DateCalculator" desc="기간/기한 계산 (D-day)" />
          <DateCalculator
            title="소멸시효 · 기한 계산기"
            description="기준일과 기간을 선택하면 만료일과 남은 일수를 계산해요."
            presets={[
              { label: "숙려기간 30일", days: 30, description: "협의이혼 숙려기간" },
              { label: "항소기한 14일", days: 14, description: "판결 선고일로부터" },
              { label: "소멸시효 3년", days: 1095, description: "민사채권" },
              { label: "소멸시효 10년", days: 3650, description: "확정판결" },
            ]}
          />
        </div>

        {/* ─── 11. DecisionTree ─── */}
        <div>
          <SectionLabel num={11} name="DecisionTree" desc="조건 분기 가이드 (내 상황은?)" />
          <DecisionTree
            title="나에게 맞는 채무 해결 방법은?"
            nodes={[
              {
                id: "q1",
                question: "현재 정기적인 소득이 있나요?",
                helpText: "급여, 사업소득, 연금 등",
                options: [
                  { label: "네, 매달 소득이 있어요", nextId: "q2" },
                  { label: "아니요, 소득이 없어요", nextId: "q3" },
                ],
              },
              {
                id: "q2",
                question: "총 채무액이 무담보 10억 원 이하인가요?",
                options: [
                  {
                    label: "네, 10억 이하예요",
                    resultTitle: "개인회생을 추천해요",
                    resultDesc: "정기 소득이 있고 채무 한도 내에 있으므로 개인회생 절차가 적합해요. 재산을 유지하면서 3~5년간 변제 후 나머지 채무를 면책받을 수 있어요.",
                    resultLink: "/가정법률/개인회생-신청",
                  },
                  {
                    label: "아니요, 10억을 초과해요",
                    resultTitle: "개인파산을 검토하세요",
                    resultDesc: "채무 한도 초과로 개인회생이 어렵습니다. 개인파산 및 면책 절차를 변호사와 상담하세요.",
                  },
                ],
              },
              {
                id: "q3",
                question: "향후 취업이나 소득 발생 가능성이 있나요?",
                options: [
                  {
                    label: "곧 취업 예정이에요",
                    resultTitle: "개인회생을 준비하세요",
                    resultDesc: "취업 후 소득이 발생하면 개인회생 신청이 가능해요. 미리 서류를 준비해두세요.",
                  },
                  {
                    label: "당분간 어려워요",
                    resultTitle: "개인파산을 검토하세요",
                    resultDesc: "소득이 없는 상태에서는 개인파산이 현실적인 선택이에요. 법률구조공단에서 무료 상담을 받아보세요.",
                  },
                ],
              },
            ]}
          />
        </div>

        {/* ─── 12. RangeTable ─── */}
        <div>
          <SectionLabel num={12} name="RangeTable" desc="금액 구간표 (소득별/연령별)" />
          <RangeTable
            title="양육비 산정 기준표"
            description="부모 합산 소득 구간별 자녀 1인 기준 월 양육비 (2025년 서울가정법원 기준)"
            rowHeader="합산 소득"
            colHeaders={[
              { label: "0~5세" },
              { label: "6~11세" },
              { label: "12~14세" },
              { label: "15~18세" },
            ]}
            rows={[
              { range: "200만원 미만", values: ["50만", "55만", "60만", "65만"] },
              { range: "200~300만원", values: ["65만", "70만", "80만", "85만"] },
              { range: "300~400만원", values: ["80만", "90만", "100만", "110만"], highlight: true },
              { range: "400~500만원", values: ["95만", "105만", "120만", "130만"] },
              { range: "500만원 이상", values: ["110만", "125만", "140만", "155만"] },
            ]}
            highlightLabel="가장 많은 구간"
          />
        </div>

        {/* ─── 13. ContactCard ─── */}
        <div>
          <SectionLabel num={13} name="ContactCard" desc="기관 연락처 카드" />
          <ContactCard
            contacts={[
              {
                name: "대한법률구조공단",
                description: "무료 법률 상담 및 소송 지원",
                phone: "132",
                hours: "평일 09:00~18:00",
                url: "https://www.klac.or.kr",
              },
              {
                name: "대한변호사협회 법률구조재단",
                description: "무료 법률 상담",
                phone: "02-3476-6515",
                hours: "평일 09:30~12:00, 13:00~17:00",
                url: "https://www.legalaid.or.kr",
              },
              {
                name: "서울회생법원",
                description: "개인회생·파산 접수",
                phone: "02-530-1114",
                address: "서울특별시 서초구 법원로 3",
              },
              {
                name: "신용회복위원회",
                description: "채무조정 신청 및 상담",
                phone: "1600-5500",
                hours: "평일 09:00~18:00",
                url: "https://www.ccrs.or.kr",
              },
            ]}
          />
        </div>

        {/* ─── 14. FormDownload ─── */}
        <div>
          <SectionLabel num={14} name="FormDownload" desc="서식 다운로드 안내" />
          <FormDownload
            items={[
              {
                name: "개인회생 신청서",
                description: "법원 제출용 표준 양식 (2025년 개정판)",
                fileType: "HWP",
                url: "#",
              },
              {
                name: "변제계획안",
                description: "월별 변제 금액 및 기간을 기재하는 양식",
                fileType: "HWP",
                url: "#",
              },
              {
                name: "채권자 일람표",
                description: "모든 채권자의 채권액·연락처를 정리하는 표",
                fileType: "XLSX",
                url: "#",
                note: "빠짐없이 작성해야 면책이 가능해요",
              },
              {
                name: "수입·지출 목록",
                description: "최근 3개월 수입과 지출 내역 정리",
                fileType: "HWP",
              },
            ]}
          />
        </div>

        {/* ─── 15. CaseCard ─── */}
        <div>
          <SectionLabel num={15} name="CaseCard" desc="판례 요약 카드" />
          <CaseCard
            cases={[
              {
                caseNumber: "2024개회12345",
                court: "서울회생법원",
                date: "2024.09.15",
                summary: "총 채무 2억 3천만원 중 80% 면책, 월 55만원씩 36개월 변제 계획이 인가된 사례. 급여소득자로서 성실히 변제 수행 중.",
                result: "인가 결정",
                resultType: "win",
              },
              {
                caseNumber: "2023개회67890",
                court: "수원지방법원",
                date: "2023.12.20",
                summary: "도박으로 인한 채무가 전체의 70%를 차지하여 면책 불허가된 사례. 다만, 성실한 변제 의지가 인정되어 일부 감경.",
                result: "일부 감경",
                resultType: "partial",
              },
            ]}
          />
        </div>

        {/* ─── 16. DeadlineBanner ─── */}
        <div>
          <SectionLabel num={16} name="DeadlineBanner" desc="기한 경고 배너 (D-day)" />
          <DeadlineBanner
            deadlines={[
              {
                title: "개인회생 채권자 이의신청 기한",
                date: "2026-03-15",
                description: "개시결정일로부터 30일 이내",
              },
              {
                title: "항소 기한",
                date: "2026-03-05",
                description: "판결 선고일로부터 14일",
              },
              {
                title: "소멸시효 만료",
                date: "2026-02-01",
                description: "민사채권 3년 시효",
              },
            ]}
          />
        </div>

        {/* ─── FAQ (기존) ─── */}
        <div>
          <SectionLabel num={17} name="FAQSection" desc="자주 묻는 질문 (기존)" />
          <FAQSection
            items={[
              { question: "개인회생 신청하면 직장에 알려지나요?", answer: "법원에서 직장에 직접 통보하지는 않아요. 다만, 급여 압류가 있었다면 해제 과정에서 알려질 수 있어요." },
              { question: "집이나 차를 뺏기나요?", answer: "개인회생은 재산을 유지하면서 채무를 갚는 제도예요. 다만, 변제 금액 산정 시 재산 가치가 반영돼요." },
              { question: "변제 기간을 줄일 수 있나요?", answer: "원칙적으로 3년(급여소득자)이지만, 변제율 100% 달성 시 조기 면책이 가능해요." },
            ]}
          />
        </div>

      </div>
    </div>
  );
}

/* ─── 섹션 라벨 (데모 전용) ─── */
function SectionLabel({ num, name, desc }: { num: number; name: string; desc: string }) {
  return (
    <div className="flex items-center gap-3 mt-10 mb-2 first:mt-0">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-white text-xs font-bold">
        {num}
      </span>
      <div>
        <span className="text-sm font-bold text-gray-900">{name}</span>
        <span className="ml-2 text-xs text-gray-400">{desc}</span>
      </div>
    </div>
  );
}
