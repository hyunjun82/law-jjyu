import type { Metadata } from "next";
import Link from "next/link";
import { Scale, Database, BookOpen, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "작성자 소개",
  description: "생활법령 사이트의 콘텐츠 작성자를 소개합니다.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gov-600 transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        홈으로 돌아가기
      </Link>

      <div className="rounded-2xl border border-gray-200 bg-white p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gov-100 text-gov-600">
            <Scale className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              생활법령 에디터
            </h1>
            <p className="text-sm text-gray-500">법률 정보 전문 에디터</p>
          </div>
        </div>

        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            복잡한 법률 정보를 누구나 이해할 수 있도록 쉽게 풀어서 전달합니다.
            법제처 &lsquo;찾기쉬운 생활법령정보&rsquo;의 공식 데이터를 기반으로
            정확하고 신뢰할 수 있는 콘텐츠를 작성하고 있습니다.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <Database className="h-5 w-5 text-gov-500 mb-2" />
            <h3 className="font-bold text-gray-900 text-sm">데이터 출처</h3>
            <p className="text-xs text-gray-500 mt-1">
              법제처 찾기쉬운 생활법령정보 공식 데이터
            </p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <BookOpen className="h-5 w-5 text-gov-500 mb-2" />
            <h3 className="font-bold text-gray-900 text-sm">콘텐츠 원칙</h3>
            <p className="text-xs text-gray-500 mt-1">
              정확성, 최신성, 이해하기 쉬운 설명
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
