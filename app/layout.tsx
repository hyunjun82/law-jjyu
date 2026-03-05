import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

const SITE_NAME = "생활법령";
const SITE_URL = "https://law.jjyu.co.kr";
const SITE_DESCRIPTION =
  "가정법률, 부동산, 금융, 소송, 근로, 복지 등 일상 속 법률 정보를 쉽고 정확하게 안내합니다.";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - 쉽고 정확한 생활법령 정보`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE_NAME,
    title: `${SITE_NAME} - 쉽고 정확한 생활법령 정보`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  alternates: { canonical: SITE_URL },
  verification: {
    google: "kPe6sAN7cMBDG2OVVWHcI8hH-BxkT5Zv6U8TVWTxuwI",
    other: {
      "naver-site-verification": "938338b518d659991f9afbce027f783bd360e986",
      "daum-verification": "344b28703590bfdf05d201d0db5218b1a49befbba4200d7cba082fae109d9e39:dKVUblTVRLcGFFyWA4gifA==",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "ko",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };

  return (
    <html lang="ko" className={notoSansKR.variable}>
      <head>
        <meta name="verify-v1" content="DaumWebMasterTool:344b28703590bfdf05d201d0db5218b1a49befbba4200d7cba082fae109d9e39:dKVUblTVRLcGFFyWA4gifA==" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([websiteSchema, orgSchema]),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2442517902625121"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
