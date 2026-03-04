import { HubArticle, SpokeArticle } from "@/lib/types";
import { financeSpokes1 } from "./finance-spokes-1";
import { financeSpokes2 } from "./finance-spokes-2";
import { financeSpokes3 } from "./finance-spokes-3";
import { financeSpokes4 } from "./finance-spokes-4";
import { financeSpokes5 } from "./finance-spokes-5";
import { financeSpokes6 } from "./finance-spokes-6";
import { financeSpokes7 } from "./finance-spokes-7";
import { financeSpokes8 } from "./finance-spokes-8";
import { financeSpokes9 } from "./finance-spokes-9";
import { financeSpokes10 } from "./finance-spokes-10";
import { financeSpokes11 } from "./finance-spokes-11";
import { financeSpokes12 } from "./finance-spokes-12";
import { financeSpokes13 } from "./finance-spokes-13";
import { financeSpokes14 } from "./finance-spokes-14";
import { financeSpokes15 } from "./finance-spokes-15";
import { financeSpokes16 } from "./finance-spokes-16";

// ── 모든 spoke 합본 ──
const allSpokes: SpokeArticle[] = [...financeSpokes1, ...financeSpokes2, ...financeSpokes3, ...financeSpokes4, ...financeSpokes5, ...financeSpokes6, ...financeSpokes7, ...financeSpokes8, ...financeSpokes9, ...financeSpokes10, ...financeSpokes11, ...financeSpokes12, ...financeSpokes13, ...financeSpokes14, ...financeSpokes15, ...financeSpokes16];

// ── Hub Article ──
export const hub: HubArticle = {
  categorySlug: "금융금전",
  title: "채무조정 법률정보 총정리 | 개인회생 개인파산 워크아웃 비교",
  h1: "채무조정 법률정보 총정리",
  metaDescription:
    "개인회생, 개인파산, 개인워크아웃 등 채무조정 제도의 신청 자격, 절차, 탕감률을 비교하여 안내합니다.",
  description:
    "빚 때문에 힘드시죠? 개인회생, 개인파산, 워크아웃 중 나에게 맞는 채무조정 방법을 찾을 수 있도록 정리했어요.",
  heroDescription:
    "채무가 감당이 안 될 때, 어떤 제도를 이용해야 할까요? 개인회생부터 개인파산, 워크아웃까지 찾기쉬운 생활법령정보 기반으로 정리했어요.",
  datePublished: "2026-03-02",
  dateModified: "2026-03-02",
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
