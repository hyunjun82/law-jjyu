import { HubArticle, SpokeArticle } from "@/lib/types";
import { spokes1 } from "./divorce-spokes-1";
import { spokes2 } from "./divorce-spokes-2";
import { spokes3 } from "./divorce-spokes-3";
import { spokes4 } from "./divorce-spokes-4";

// ── 모든 spoke 합본 ──
const allSpokes: SpokeArticle[] = [
  ...spokes1,
  ...spokes2,
  ...spokes3,
  ...spokes4,
];

// ── Hub Article ──
export const hub: HubArticle = {
  categorySlug: "가정법률",
  title: "이혼 법률정보 총정리 | 협의이혼 재판이혼 재산분할 양육권",
  h1: "이혼 법률정보 총정리",
  metaDescription:
    "이혼 절차, 재산분할, 위자료, 양육권, 면접교섭권 등 이혼과 관련된 모든 법률정보를 한곳에서 확인하세요.",
  description:
    "협의이혼과 재판이혼의 절차, 재산분할 방법, 위자료 산정, 자녀 양육권과 양육비까지. 이혼에 관한 법률정보를 체계적으로 정리했습니다.",
  heroDescription:
    "이혼을 고민하고 계신가요? 협의이혼부터 재판이혼, 재산분할, 위자료, 양육권까지 꼭 알아야 할 법률정보를 총정리했습니다.",
  datePublished: "2025-03-01",
  dateModified: "2025-03-01",
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
