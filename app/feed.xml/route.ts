import { categories } from "@/data/categories";
import { hubArticles, spokeArticles } from "@/data/articles";

const SITE_URL = "https://law.jjyu.co.kr";
const SITE_NAME = "생활법령";

export async function GET() {
  const allItems: { title: string; link: string; description: string; date: string }[] = [];

  for (const cat of categories) {
    const hub = hubArticles[cat.slug];
    if (hub) {
      allItems.push({
        title: hub.title,
        link: `${SITE_URL}/${cat.slug}`,
        description: hub.metaDescription,
        date: hub.datePublished || "2026-02-28",
      });
    }

    const spokes = spokeArticles[cat.slug];
    if (spokes) {
      for (const spoke of Object.values(spokes)) {
        allItems.push({
          title: spoke.title,
          link: `${SITE_URL}/${cat.slug}/${spoke.slug}`,
          description: spoke.metaDescription,
          date: spoke.datePublished || "2026-02-28",
        });
      }
    }
  }

  allItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>쉽고 정확한 생활법령 정보</description>
    <language>ko</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${allItems
      .map(
        (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <guid>${item.link}</guid>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
