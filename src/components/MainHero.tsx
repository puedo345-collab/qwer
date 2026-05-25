import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, TrendingDown, ClipboardCheck, Users, HelpCircle } from 'lucide-react';

interface MainHeroProps {
  onStartSurvey: (initialMode?: string) => void;
}

export default function MainHero({ onStartSurvey }: MainHeroProps) {
  // Config for the 3 interactive entry cards
  const entranceCards = [
    {
      title: '내 예상 채무 탕감액 조회',
      subtitle: '탕감 한도 & 예상 잔여금 계산',
      icon: <TrendingDown className="w-8 h-8 text-blue-700" />,
      color: 'from-blue-500/15 to-indigo-500/10 hover:border-blue-400',
      actionKey: 'debt'
    },
    {
      title: '개인회생 신청 자격 확인',
      subtitle: '소득 및 재산 자격 심사',
      icon: <ClipboardCheck className="w-8 h-8 text-violet-600" />,
      color: 'from-violet-500/10 to-indigo-500/10 hover:border-violet-300',
      actionKey: 'qualification'
    },
    {
      title: '나와 비슷한 성공사례 매칭',
      subtitle: '실제 해방인의 면책사례 비교',
      icon: <Users className="w-8 h-8 text-amber-600" />,
      color: 'from-amber-500/10 to-orange-500/10 hover:border-amber-300',
      actionKey: 'case'
    }
  ];

  const worrychips = [
    '최근 대출이 많아요',
    '독촉 스트레스가 심해요',
    '투자 및 코인 채무',
    '가족 몰래 은밀하게 진행'
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-200 via-indigo-100 to-blue-200 py-12 md:py-20 lg:py-24">
      {/* Sophisticated Background Design: Subtle Grid Pattern & Light Beam */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a06_1px,transparent_1px),linear-gradient(to_bottom,#0f172a06_1px,transparent_1px)] bg-[size:16px_24px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-xs font-bold text-blue-900 mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-700 animate-spin" />
          <span>채무 탕감 보장제 자가 진단</span>
        </motion.div>

        {/* Master Titles */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2 sm:space-y-3"
        >
          <h2 className="text-indigo-800 font-extrabold text-sm sm:text-base md:text-lg tracking-wider uppercase">
            울산에 사시는데 다른 지역에 맡기시려고요? ⚖️
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight whitespace-pre-line">
            울산관할 개인회생{"\n"}13년 경력 법무사
          </h1>
        </motion.div>

        {/* Introduction Cards */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 sm:mt-6 text-sm sm:text-lg text-slate-500 max-w-xl mx-auto font-medium leading-relaxed px-2"
        >
          복잡한 절차 없이 1분만 시간내어 진단해 보세요.
        </motion.p>

        {/* Quick Highlight Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto px-1"
        >
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-100 shadow-3xs flex flex-col items-center justify-center text-center">
            <span className="text-[11px] font-extrabold text-blue-800 mb-1 leading-none">소득 기준 최소화</span>
            <p className="text-xs sm:text-sm font-black text-slate-800 leading-snug">
              어떤 직종이든<br className="hidden sm:block" /> 소득이 있다면 가능!
            </p>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-100 shadow-3xs flex flex-col items-center justify-center text-center">
            <span className="text-[11px] font-extrabold text-violet-600 mb-1 leading-none">최소 채무 허들</span>
            <p className="text-xs sm:text-sm font-black text-slate-800 leading-snug">
              총 빚 합산금액이<br className="hidden sm:block" /> 천만 원 이상이면 가능!
            </p>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-100 shadow-3xs flex flex-col items-center justify-center text-center">
            <span className="text-[11px] font-extrabold text-amber-600 mb-1 leading-none">재산 한계 범위</span>
            <p className="text-xs sm:text-sm font-black text-slate-800 leading-snug">
              소유 재산 가격보다<br className="hidden sm:block" /> 채무가 더 많다면 가능!
            </p>
          </div>
        </motion.div>

        {/* Worry chips area */}
        <div className="mt-8 flex flex-wrap justify-center gap-1.5 max-w-2xl mx-auto px-2">
          {worrychips.map((chip, index) => (
            <span
              key={index}
              className="px-3 py-1.5 rounded-xl bg-slate-200/50 border border-slate-300/25 text-[11px] font-bold text-slate-600 shadow-3xs"
            >
              #{chip}
            </span>
          ))}
        </div>

        {/* Action Title Block */}
        <div className="mt-12 sm:mt-20 border-t border-slate-200/50 pt-10">
          <span className="text-xs font-extrabold text-violet-600 tracking-wider uppercase block mb-1">
            진단 질문지 무료 배포
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight px-2">
            나는 얼마나 탕감 받을까?
          </h3>
          <p className="mt-2 text-xs sm:text-base text-slate-550 font-bold max-w-lg mx-auto leading-relaxed px-4">
            개인회생이 가능한지, 6개월 뒤 나의 채무량 변화와 맞춤 변제 상환 보고서를 발송해 드립니다.
          </p>
        </div>

        {/* Entrance Interactive Selection Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3.5 max-w-4xl mx-auto px-1 text-left">
          {entranceCards.map((card, idx) => (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={idx}
              onClick={() => onStartSurvey(card.actionKey)}
              className={`p-4 sm:p-5 md:p-6 rounded-2xl bg-gradient-to-br ${card.color} border border-slate-200/45 shadow-3xs cursor-pointer transition-all duration-200 flex items-center sm:items-start gap-4 hover:shadow-sm relative group`}
            >
              <div className="p-3 bg-white rounded-xl shadow-3xs shrink-0 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <div className="space-y-0.5 flex-1 min-w-0">
                <h4 className="font-extrabold text-slate-800 text-sm sm:text-base flex items-center justify-between w-full">
                  <span className="truncate">{card.title}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 group-hover:translate-x-1 shrink-0 transition-all ml-1.5" />
                </h4>
                <p className="text-[11px] text-slate-500 font-bold truncate">{card.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subtle timer warning */}
        <p className="mt-6 text-xs text-slate-400 font-medium tracking-wide">
          ⏱️ 약 1분 소요, 총 5개 간편 문항으로 정밀 설계
        </p>
      </div>
    </section>
  );
}
