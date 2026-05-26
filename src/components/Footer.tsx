import React from 'react';
import { Scale, PhoneCall, HelpCircle, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Main Hotline and Core Anchors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-8 border-b border-slate-800">
          <div className="space-y-2">
            <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              필요한 만큼, 꼭 필요한 방식으로
            </h4>
            <p className="text-xs text-slate-400 font-semibold max-w-sm">
              나에게 딱 맞는 채무 탕감 맞춤 설계를 만나보세요. 1:1 비밀 수임 보장 및 법무사 여환동 직접 밀착 서포트와 함께 일어섭니다.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
            <a
              href="tel:010-5410-5679"
              className="px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/40 text-base"
            >
              <PhoneCall className="w-5 h-5 text-white animate-bounce" />
              법무사 즉시 상담 010-5410-5679
            </a>
          </div>
        </div>

        {/* Legal and Office Metadata */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2">
          <div className="space-y-2 col-span-2 sm:col-span-1">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">공식 자격심사</span>
            <span className="text-xs text-slate-400 font-semibold block">
              대표 법무사 여환동
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">서비스 링크</span>
            <div className="space-y-1 text-xs font-semibold">
              <a href="#brand" className="block hover:text-emerald-400 transition-colors">법무사 사무소 소개</a>
              <a href="#faq" className="block hover:text-emerald-400 transition-colors">자주 묻는 질문</a>
            </div>
          </div>

          <div className="space-y-2 col-span-2 sm:col-span-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">검토 및 자격 수임</span>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              입력하신 정보는 자격 진단·상담 목적으로만 사용되며, 개인정보 보호법에 따라 안전하게 보호됩니다.
            </p>
          </div>
        </div>

        {/* Corporate bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-6 border-t border-slate-800 text-[10px] sm:text-xs">
          <div className="space-y-1 font-semibold text-slate-500">
            <p>상호: 법무사 여환동 사무소 | 대표 법무사 여환동</p>
            <p>사업자등록번호: 610-06-65592 | 주소: 울산 남구 법대로14번길 18 1층</p>
            <p className="text-slate-600">
              유의사항: 본 시뮬레이션 결과는 간이 진단 기준이며, 실제 변제액은 소득과 재산 실사 후 달라질 수 있습니다.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="font-extrabold text-[#94a3b8]">© {currentYear} 법무사 여환동 사무소. All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
