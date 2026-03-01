import Link from "next/link";
import { Scale, Search, Menu } from "lucide-react";

const categories = [
  { name: "가정법률", href: "/가정법률" },
  { name: "부동산/임대차", href: "/부동산임대차" },
  { name: "금융/금전", href: "/금융금전" },
  { name: "민형사/소송", href: "/민형사소송" },
  { name: "근로/노동", href: "/근로노동" },
  { name: "복지", href: "/복지" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* 정부 식별 바 */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-4 py-1.5 flex items-center gap-2">
          <span className="text-[11px] text-gray-500">
            법제처 생활법령정보 기반 법률정보 서비스
          </span>
        </div>
      </div>

      {/* 메인 헤더 */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-4 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gov-700 text-white">
              <Scale className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 leading-tight">생활법령</span>
              <span className="text-[10px] text-gray-400 leading-tight">쉽고 정확한 법률 정보</span>
            </div>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden lg:flex items-center gap-1">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gov-50 hover:text-gov-700"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* 검색 + 메뉴 */}
          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
