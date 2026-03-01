import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, BookOpen, FileText, AlertTriangle, HelpCircle, CheckCircle } from "lucide-react";
import { categories } from "@/data/categories";
import { getSpokeArticle, hubArticles } from "@/data/articles";
import { Badge } from "@/components/ui/badge";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { ShareButtons } from "@/components/ShareButtons";
import { CategorySidebar } from "@/components/CategorySidebar";
import { RelatedSpokes } from "@/components/RelatedSpokes";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

const SECTION_ICONS: Record<string, React.ReactNode> = {
  개요: <BookOpen className="h-5 w-5 text-gov-500" />,
  요건: <CheckCircle className="h-5 w-5 text-gov-500" />,
  절차: <FileText className="h-5 w-5 text-gov-500" />,
  주의사항: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  default: <HelpCircle className="h-5 w-5 text-gov-500" />,
};

function getSectionIcon(title: string) {
  for (const [key, icon] of Object.entries(SECTION_ICONS)) {
    if (key !== "default" && title.includes(key)) return icon;
  }
  return SECTION_ICONS.default;
}

export async function generateStaticParams() {
  const params: { category: string; slug: string }[] = [];
  for (const cat of categories) {
    const hub = hubArticles[cat.slug];
    if (!hub) continue;
    for (const spoke of hub.spokes) {
      params.push({ category: cat.slug, slug: spoke.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const catSlug = decodeURIComponent(category);
  const spokeSlug = decodeURIComponent(slug);
  const article = getSpokeArticle(catSlug, spokeSlug);

  if (!article) return {};

  return {
    title: article.title,
    description: article.metaDescription,
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: "article",
    },
    alternates: {
      canonical: `https://law.jjyu.co.kr/${catSlug}/${spokeSlug}`,
    },
  };
}

export default async function SpokePage({ params }: Props) {
  const { category, slug } = await params;
  const catSlug = decodeURIComponent(category);
  const spokeSlug = decodeURIComponent(slug);

  const cat = categories.find((c) => c.slug === catSlug);
  const article = getSpokeArticle(catSlug, spokeSlug);

  if (!cat || !article) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: "https://law.jjyu.co.kr" },
      { "@type": "ListItem", position: 2, name: cat.name, item: `https://law.jjyu.co.kr/${catSlug}` },
      { "@type": "ListItem", position: 3, name: article.h1, item: `https://law.jjyu.co.kr/${catSlug}/${spokeSlug}` },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.h1,
    description: article.metaDescription,
    author: { "@type": "Person", name: "생활법령 에디터" },
    publisher: { "@type": "Organization", name: "생활법령" },
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    mainEntityOfPage: `https://law.jjyu.co.kr/${catSlug}/${spokeSlug}`,
  };

  const faqSchema =
    article.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            [breadcrumbSchema, articleSchema, faqSchema].filter(Boolean)
          ),
        }}
      />

      {/* Breadcrumb */}
      <nav className="mx-auto max-w-6xl px-4 pt-6">
        <ol className="flex items-center gap-1.5 text-sm text-gray-400">
          <li>
            <Link href="/" className="hover:text-gray-600">홈</Link>
          </li>
          <ChevronRight className="h-3.5 w-3.5" />
          <li>
            <Link href={`/${catSlug}`} className="hover:text-gray-600">
              {cat.name}
            </Link>
          </li>
          <ChevronRight className="h-3.5 w-3.5" />
          <li className="font-medium text-gray-900 truncate max-w-[200px]">
            {article.h1}
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <Badge variant="secondary" className="mb-3">
          {cat.name}
        </Badge>
        <h1 className="text-2xl font-extrabold text-gray-900 md:text-3xl leading-tight">
          {article.h1}
        </h1>
        <p className="mt-3 text-gray-600">{article.heroDescription}</p>
      </section>

      <AuthorBio
        categoryName={cat.name}
        datePublished={article.datePublished}
        dateModified={article.dateModified}
      />

      {/* 2-column layout */}
      <div className="mx-auto max-w-6xl px-4 pb-12 flex gap-8">
        <article className="min-w-0 flex-1">
          {/* Sections */}
          {article.sections.map((section, i) => (
            <section key={i} className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                {getSectionIcon(section.title)}
                <h2 className="text-xl font-bold text-gray-900">
                  {section.title}
                </h2>
              </div>
              <div
                className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </section>
          ))}

          {/* Share */}
          <div className="my-8 rounded-xl border border-gray-200 bg-gray-50/50 p-4">
            <ShareButtons title={article.title} />
          </div>

          {/* FAQ */}
          {article.faq.length > 0 && <FAQSection items={article.faq} />}

          {/* Related Spokes */}
          <div className="mt-12">
            <RelatedSpokes categorySlug={catSlug} currentSlug={spokeSlug} />
          </div>
        </article>

        {/* Sidebar */}
        <CategorySidebar categorySlug={catSlug} currentSlug={spokeSlug} />
      </div>
    </>
  );
}
