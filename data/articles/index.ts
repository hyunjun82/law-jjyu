import { HubArticle, SpokeArticle } from "@/lib/types";

// 카테고리별 hub/spoke 데이터를 여기에서 import
// 콘텐츠 추가 시 아래 패턴으로 확장:
// import { hub as 가정법률Hub, spokes as 가정법률Spokes } from "./가정법률";

export const hubArticles: Record<string, HubArticle> = {
  // 가정법률: 가정법률Hub,
  // 부동산임대차: 부동산임대차Hub,
  // 금융금전: 금융금전Hub,
  // 민형사소송: 민형사소송Hub,
  // 근로노동: 근로노동Hub,
  // 복지: 복지Hub,
};

export const spokeArticles: Record<string, Record<string, SpokeArticle>> = {
  // 가정법률: 가정법률Spokes,
  // 부동산임대차: 부동산임대차Spokes,
  // 금융금전: 금융금전Spokes,
  // 민형사소송: 민형사소송Spokes,
  // 근로노동: 근로노동Spokes,
  // 복지: 복지Spokes,
};

export function getHubArticle(categorySlug: string): HubArticle | undefined {
  return hubArticles[categorySlug];
}

export function getSpokeArticle(
  categorySlug: string,
  spokeSlug: string
): SpokeArticle | undefined {
  return spokeArticles[categorySlug]?.[spokeSlug];
}
