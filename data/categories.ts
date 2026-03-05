import { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    name: "가정법률",
    slug: "가정법률",
    icon: "👨‍👩‍👧‍👦",
    description: "이혼, 양육권, 상속, 가정폭력 등 가정 관련 법률 정보",
    count: 20,
  },
  {
    name: "부동산/임대차",
    slug: "부동산임대차",
    icon: "🏠",
    description: "전세, 월세, 임대차보호법, 부동산 매매 등 주거 법률 정보",
    count: 40,
  },
  {
    name: "금융/금전",
    slug: "금융금전",
    icon: "💰",
    description: "대출, 채무, 신용회복, 보증, 금전거래 관련 법률 정보",
    count: 102,
  },
  {
    name: "민형사/소송",
    slug: "민형사소송",
    icon: "⚖️",
    description: "민사소송, 형사고소, 손해배상, 소액재판 등 소송 절차 안내",
    count: 0,
  },
  {
    name: "근로/노동",
    slug: "근로노동",
    icon: "🏗️",
    description: "임금, 해고, 산재, 퇴직금, 근로계약 등 노동 법률 정보",
    count: 0,
  },
  {
    name: "복지",
    slug: "복지",
    icon: "🤝",
    description: "기초생활수급, 장애인복지, 국민연금, 의료급여 등 복지 제도 안내",
    count: 0,
  },
];
