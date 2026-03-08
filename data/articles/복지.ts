import { HubArticle, SpokeArticle } from "@/lib/types";
import { welfareSpokes1 } from "./welfare-spokes-1";
import { welfareSpokes2 } from "./welfare-spokes-2";
import { welfareSpokes3 } from "./welfare-spokes-3";
import { welfareSpokes4 } from "./welfare-spokes-4";

// ── 모든 spoke 합본 ──
const allSpokes: SpokeArticle[] = [
  ...welfareSpokes1,
  ...welfareSpokes2,
  ...welfareSpokes3,
  ...welfareSpokes4,
];

// ── Hub Article ──
export const hub: HubArticle = {
  categorySlug: "복지",
  title:
    "국민건강보험 직장가입자 총정리 | 요양급여 보험료 건강검진 이의신청",
  h1: "국민건강보험 직장가입자 총정리",
  metaDescription:
    "국민건강보험 직장가입자의 가입 자격, 요양급여·비급여 범위, 본인부담금, 임신출산 진료비, 건강검진, 보험료 산정·납부·경감·면제, 이의신청까지 법률정보를 정리했습니다.",
  description:
    "국민건강보험 직장가입자의 가입 자격부터 요양급여 범위, 본인부담금, 보험료 산정·경감·면제, 건강검진, 이의신청까지 핵심 법률정보를 정리했어요.",
  heroDescription:
    "직장가입자로서 건강보험 혜택은 어디까지인지, 보험료는 어떻게 산정되는지, 급여가 제한되는 경우는 언제인지 궁금하시죠? 국민건강보험 직장가입자의 핵심 정보를 한곳에 정리했어요.",
  datePublished: "2026-03-08",
  dateModified: "2026-03-08",
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
