import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gov-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div>
            <p className="text-sm font-bold text-white/90">생활법령</p>
            <p className="mt-1 text-xs text-white/50">
              법제처 &lsquo;찾기쉬운 생활법령정보&rsquo; 기반 법률정보 서비스
            </p>
          </div>
          <div className="flex gap-6 text-xs text-white/50">
            <Link href="/" className="hover:text-white/80 transition-colors">
              홈
            </Link>
            <Link href="/about" className="hover:text-white/80 transition-colors">
              작성자 소개
            </Link>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
          <p className="text-xs text-white/60 leading-relaxed">
            <strong className="text-white/80">면책조항:</strong> 본 사이트에서 제공하는 법률 정보는
            법제처 &lsquo;찾기쉬운 생활법령정보&rsquo;의 공식 데이터를 기반으로 하며,
            일반적인 정보 제공 목적입니다. 개별 사안에 대해서는 반드시{" "}
            <strong className="text-white/80">변호사 또는 법률 전문가와 상담</strong>하시기 바랍니다.
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-4 sm:flex-row">
          <div className="flex items-center gap-4 text-xs text-white/40">
            <span>출처: 법제처 찾기쉬운 생활법령정보</span>
          </div>
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} 생활법령. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
