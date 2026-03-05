import { HubArticle, SpokeArticle } from "@/lib/types";
import { realestateSpokes1 } from "./realestate-spokes-1";
import { realestateSpokes2 } from "./realestate-spokes-2";
import { realestateSpokes3 } from "./realestate-spokes-3";
import { realestateSpokes4 } from "./realestate-spokes-4";
import { realestateSpokes5 } from "./realestate-spokes-5";

// ── 모든 spoke 합본 ──
const allSpokes: SpokeArticle[] = [
  ...realestateSpokes1,
  ...realestateSpokes2,
  ...realestateSpokes3,
  ...realestateSpokes4,
  ...realestateSpokes5,
];

// ── Hub Article ──
export const hub: HubArticle = {
  categorySlug: "부동산임대차",
  title: "상가 임대차 법률정보 총정리 | 환산보증금 대항력 권리금 계약갱신",
  h1: "상가 임대차 법률정보 총정리",
  metaDescription:
    "상가 임대차 계약에서 꼭 알아야 할 환산보증금 계산, 대항력 취득, 전월세 전환이율, 소액임차인 보호, 임대인 변경 시 승계 등 상임법 핵심 내용을 한곳에서 확인하세요.",
  description:
    "환산보증금 계산부터 대항력 취득 시점, 권리금 보호, 계약갱신요구권까지. 상가건물임대차보호법에 관한 법률정보를 체계적으로 정리했어요.",
  heroDescription:
    "상가 임대차 계약을 앞두고 계신가요? 환산보증금, 대항력, 소액임차인 보호, 임대인 변경 시 승계 여부까지 꼭 알아야 할 상임법 정보를 총정리했어요.",
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
