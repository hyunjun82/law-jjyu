import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { hubArticles } from "@/data/articles";

const SITE_URL = "https://law.jjyu.co.kr";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  for (const cat of categories) {
    const hub = hubArticles[cat.slug];
    entries.push({
      url: `${SITE_URL}/${cat.slug}`,
      lastModified: hub?.dateModified ? new Date(hub.dateModified) : new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });

    if (hub) {
      for (const spoke of hub.spokes) {
        entries.push({
          url: `${SITE_URL}/${cat.slug}/${spoke.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    }
  }

  return entries;
}
