import { HubArticle, SpokeArticle } from "@/lib/types";
import { dailyWorkerSpokes1 } from "./일용직-spokes-1";
import { workerCompSpokes1 } from "./worker-comp-spokes-1";
import { workerCompSpokes2 } from "./worker-comp-spokes-2";
import { workerCompSpokes3 } from "./worker-comp-spokes-3";
import { workerCompSpokes4 } from "./worker-comp-spokes-4";
import { workerCompSpokes5 } from "./worker-comp-spokes-5";
import { workerCompSpokes6 } from "./worker-comp-spokes-6";
import { workerCompSpokes7 } from "./worker-comp-spokes-7";
import { workerCompSpokes8 } from "./worker-comp-spokes-8";
import { workerCompSpokes9 } from "./worker-comp-spokes-9";

// ── 모든 spoke 합본 ──
const allSpokes: SpokeArticle[] = [
  ...dailyWorkerSpokes1,
  ...workerCompSpokes1,
  ...workerCompSpokes2,
  ...workerCompSpokes3,
  ...workerCompSpokes4,
  ...workerCompSpokes5,
  ...workerCompSpokes6,
  ...workerCompSpokes7,
  ...workerCompSpokes8,
  ...workerCompSpokes9,
];

// ── Hub Article ──
export const hub: HubArticle = {
  categorySlug: "근로노동",
  title:
    "산업재해보상보험 보험급여 총정리 | 요양급여 휴업급여 장해급여 신청",
  h1: "산업재해보상보험 보험급여 총정리",
  metaDescription:
    "산업재해보상보험의 개념, 보험급여 종류, 요양급여 지급 요건과 범위, 휴업급여·장해급여·유족급여 산정 방법까지 근로자를 위한 산재보험 법률정보를 정리했습니다.",
  description:
    "산업재해보상보험 개념부터 보험급여 8가지 종류, 요양급여 지급 요건·범위, 휴업급여·장해급여·유족급여 산정 방법까지 산재보험 핵심 법률정보를 정리했어요.",
  heroDescription:
    "산재를 당하면 어떤 보상을 받을 수 있는지, 치료비·생활비·장해 보상은 어떻게 되는지 궁금하시죠? 산업재해보상보험 보험급여의 핵심 정보를 한곳에 정리했어요.",
  datePublished: "2026-03-07",
  dateModified: "2026-03-07",
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
