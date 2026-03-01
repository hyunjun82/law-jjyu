import Link from "next/link";
import { ArrowRight, Calendar, Database, Scale } from "lucide-react";

interface AuthorBioProps {
  categoryName?: string;
  datePublished?: string;
  dateModified?: string;
}

function formatKoreanDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
}

export function AuthorBio({ categoryName, datePublished, dateModified }: AuthorBioProps) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-6">
      <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gov-100 text-gov-600">
            <Scale className="h-6 w-6" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-gray-900">
                생활법령 에디터
              </span>
              <span className="rounded-full bg-gov-100 px-2 py-0.5 text-[11px] font-medium text-gov-700">
                법률 정보 전문
              </span>
              {categoryName && (
                <span className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-medium text-gray-500">
                  {categoryName}
                </span>
              )}
            </div>
            <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">
              법제처 &lsquo;찾기쉬운 생활법령정보&rsquo; 기반으로 복잡한 법률 내용을 쉽게 풀어드려요.
              정확한 정보 전달을 위해 공식 데이터를 활용합니다.
            </p>

            {(datePublished || dateModified) && (
              <div className="mt-2 flex items-center gap-3 flex-wrap text-[11px] text-gray-400">
                {datePublished && (
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    작성 {formatKoreanDate(datePublished)}
                  </span>
                )}
                {dateModified && dateModified !== datePublished && (
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    수정 {formatKoreanDate(dateModified)}
                  </span>
                )}
              </div>
            )}

            <div className="mt-2 flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600">
                <Database className="h-2.5 w-2.5" />
                법제처 생활법령정보
              </span>
              <Link
                href="/about"
                className="inline-flex items-center gap-1 text-xs font-medium text-gov-600 hover:text-gov-700 transition-colors"
              >
                작성자 소개
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
