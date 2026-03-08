import { HubArticle, SpokeArticle } from "@/lib/types";
import { hub as 가정법률Hub, spokes as 가정법률Spokes } from "./가정법률";
import { hub as 금융금전Hub, spokes as 금융금전Spokes } from "./금융금전";
import { hub as 부동산임대차Hub, spokes as 부동산임대차Spokes } from "./부동산임대차";
import { hub as 민형사소송Hub, spokes as 민형사소송Spokes } from "./민형사소송";
import { hub as 근로노동Hub, spokes as 근로노동Spokes } from "./근로노동";
import { hub as 복지Hub, spokes as 복지Spokes } from "./복지";

export const hubArticles: Record<string, HubArticle> = {
  가정법률: 가정법률Hub,
  금융금전: 금융금전Hub,
  부동산임대차: 부동산임대차Hub,
  민형사소송: 민형사소송Hub,
  근로노동: 근로노동Hub,
  복지: 복지Hub,
};

export const spokeArticles: Record<string, Record<string, SpokeArticle>> = {
  가정법률: 가정법률Spokes,
  금융금전: 금융금전Spokes,
  부동산임대차: 부동산임대차Spokes,
  민형사소송: 민형사소송Spokes,
  근로노동: 근로노동Spokes,
  복지: 복지Spokes,
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
