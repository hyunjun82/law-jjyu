import { HubArticle, SpokeArticle } from "@/lib/types";
import { trafficSpokes1 } from "./traffic-spokes-1";
import { trafficSpokes2 } from "./traffic-spokes-2";
import { trafficSpokes3 } from "./traffic-spokes-3";

// ── 모든 spoke 합본 ──
const allSpokes: SpokeArticle[] = [
  ...trafficSpokes1,
  ...trafficSpokes2,
  ...trafficSpokes3,
];

// ── Hub Article ──
export const hub: HubArticle = {
  categorySlug: "민형사소송",
  title: "교통사고 손해배상 법률정보 총정리 | 합의금 과실비율 후유장해 소송",
  h1: "교통사고 손해배상 법률정보 총정리",
  metaDescription:
    "교통사고 합의금 산정 기준, 과실비율 다툼, 후유장해 보험금 청구, 형사합의와 민사합의 차이, 소송 절차까지 교통사고 손해배상에 관한 법률정보를 한곳에서 확인하세요.",
  description:
    "교통사고 합의금 산정부터 과실비율 분쟁, 후유장해 보험금, 형사합의·민사합의 차이, 소송 절차까지. 교통사고 손해배상에 관한 법률정보를 체계적으로 정리했어요.",
  heroDescription:
    "교통사고 후 보험사 합의금이 적정한지, 과실비율이 억울한지, 후유장해를 인정받지 못한다면 어떻게 해야 하는지 궁금하신가요? 교통사고 손해배상 관련 핵심 법률정보를 총정리했어요.",
  datePublished: "2026-03-05",
  dateModified: "2026-03-05",
  spokes: allSpokes.map((s) => ({
    slug: s.slug,
    title: s.title,
    description: s.description,
  })),
};

// ── Spokes (slug → SpokeArticle) ──
export const spokes: Record<string, SpokeArticle> = Object.fromEntries(
  allSpokes.map((s) => [s.slug, s])
);
