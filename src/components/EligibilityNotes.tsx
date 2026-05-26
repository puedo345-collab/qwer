import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FAQ_ITEMS } from '../data';
import { Scale, CheckCircle2, AlertCircle, Sparkles, ChevronDown, ChevronUp, Lock, Target, HelpCircle, Landmark } from 'lucide-react';

export default function EligibilityNotes() {
  const [activeChip, setActiveChip] = useState<number | null>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const chipContent = [
    {
      title: '최근 1년이내 대출',
      tag: '최근 신규 대출 및 고금리 다중채무',
      desc: '단순히 최근에 발생한 채무(예: 1년 이내 50% 이상)라는 이유로 기각 되지 않습니다. 중요한 건 대출의 사용처이므로 정당한 곳에 사용하였다는 것을 성실히 소명하는 방법을 찾아 최소한의 청산가치 반영과 월 변제금으로 맞추어 드립니다.',
      points: ['고이율 대부업 채무나 개인 사채도 원금 탕감 가능', '대출이나 신용카드 돌려막기 중단', '저희 사무소의 노하우로 최근대출 소명']
    },
    {
      title: '추심·독촉 스트레스',
      tag: '전화 독촉, 자택 방문, 급여 가압류 중단',
      desc: '법원에 개인회생 절차 개시 신청서 접수 시 \'금지명령 신청서\'를 함께 접수합니다. 법원의 금지명령 결정문이 채권사(은행, 카드사 등)에 도달하면 모든 전화 및 추심 업무, 통장·월급 등에 대한 압류가 전면 금지됩니다.',
      points: ['접수 후 평균 3~5일 이내 압류등 전면 금지', '전화/자택방문 추심 모두 금지', '급여 및 통장 압류 등 강제집행 금지']
    },
    {
      title: '주식·코인 투자 채무',
      tag: '주식, 가상화폐(코인), 선물옵션, 사설도박',
      desc: '서울회생법원을 비롯한 각급 회생법원의 실무 준칙 개정으로, 투자 실패로 인한 손실액을 채무자의 청산가치(보유재산)에 산입하지 않는 판결 선례가 이어지고 있습니다. 이로 인해 과거 대비 현격히 많은 탕감 수혜를 누리실 수 있습니다.',
      points: ['코인/주식 투자라도 도덕성 결함으로 기각 불가', '투자 손실금 청산가치 반영 최소화', '도박에 사용한 채무도 인가가능']
    },
    {
      title: '배우자 몰래 진행',
      tag: '1:1 비밀 수임 보장 및 전담 대리 송달',
      desc: '법원에서 송달하는 일체의 보정명령문·채권자 이의신청서·결정문 등을 법무사여환동사무소의 주소지로 100% 안전하게 대리 송달됩니다. 이에 따라 개인적인 상황이 외부에 노출되는 불상사를 사전에 차단합니다.',
      points: ['채권사 부채확인 절차를 대리해 처리', '직장 통지로 인한 불이익 원천 차단', '법원 우편물 100% 대리 수령']
    }
  ];

  return (
    <section className="py-8 sm:py-12 md:py-20 bg-gradient-to-b from-slate-200 via-sky-100 to-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
        
         {/* Eligibility Header Area */}
        <div className="text-center space-y-2.5">
          <span className="text-indigo-850 text-indigo-800 font-extrabold text-xs tracking-widest uppercase block">
            회생 가이드
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight px-1 text-center">
            개인회생 신청 자격 안내
          </h2>
          <p className="text-xs sm:text-base text-slate-500 font-medium max-w-xl mx-auto leading-relaxed px-2">
            4대 보험 가입자, 일용직, 계약직, 아르바이트, 자영업자, 프리랜서 관계없이 기본 3가지 요건만 충족하면 개인회생을 진행할 수 있습니다.
          </p>
        </div>

        {/* 3 Core Eligibility Rule cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-base">
              01
            </div>
            <div className="space-y-1.5 text-left">
              <h4 className="font-extrabold text-slate-800 text-sm sm:text-base">꾸준한 소득 발생 여부</h4>
              <p className="text-[11px] sm:text-xs text-slate-500 font-bold leading-normal">
                직업의 종류와는 관계없이 인가 된 변제계획안 기간(통상 36개월) 동안 월 가용소득(변제금)을 꾸준히 납부할 수 있는 소득만 있으면 가능합니다. 예를 들어 최저생계비 이상의 소득이 있다면 인가를 받을 수 있습니다.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between space-y-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-black text-base">
              02
            </div>
            <div className="space-y-1.5 text-left">
              <h4 className="font-extrabold text-slate-800 text-sm sm:text-base">채무 합계액 한도</h4>
              <p className="text-[11px] sm:text-xs text-slate-500 font-bold leading-normal">
                무담보 채무(신용 대출, 신용카드 연체대금 등) 10억 이하, 담보 채무(아파트·주택 담보 채무, 자동차 담보 채무 등) 15억 이하 이면서, 너무 소액의 채무는 인가 가능성이 낮으므로 약 1천만 원 이상의 채무가 있으면 됩니다.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-base">
              03
            </div>
            <div className="space-y-1.5 text-left">
              <h4 className="font-extrabold text-slate-800 text-sm sm:text-base">보유한 재산보다 채무가 많아야</h4>
              <p className="text-[11px] sm:text-xs text-slate-500 font-bold leading-normal">
                채무자가 보유하고 있는 부동산이나 자동차 등의 시세 가액이, 채무자가 부담하고 있는 채무(담보채무 제외) 보다 적을 경우에 개인회생 대상이 됩니다. 다만, 재산의 가액 산정 시 시세에서 담보 채무를 뺀 나머지를 재산 가액으로 산정해야 합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Accordions for Key Concerns Chips */}
        <div id="our-spirit" className="scroll-mt-24 md:scroll-mt-28 space-y-4 pt-4 border-t border-slate-100 text-center">
          <div>
            <span className="text-[10px] sm:text-xs font-black text-violet-600 bg-violet-50 px-3 py-1 rounded-full border border-violet-100">
              핵심 상황별 집중 클리닉 케어
            </span>
          </div>

          {/* Tab buttons / Chips selector */}
          <div className="flex flex-wrap justify-center gap-1.5 max-w-2xl mx-auto px-1">
            {chipContent.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveChip(idx)}
                className={`px-3 py-2 text-[11px] sm:text-xs font-black rounded-lg border transition-all cursor-pointer ${
                  activeChip === idx
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Expandable Chip Details Panel */}
          {activeChip !== null && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-50/50 border border-slate-200/50 max-w-2xl mx-auto space-y-4 text-left"
            >
              <div>
                <span className="text-[9px] sm:text-[10px] text-violet-600 font-black tracking-wide uppercase">
                  {chipContent[activeChip].tag}
                </span>
                <h3 className="text-base sm:text-xl font-black text-slate-800 mt-0.5">
                  {chipContent[activeChip].title} 걱정, 법무사의 해답은?
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-bold leading-relaxed">
                {chipContent[activeChip].desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                {chipContent[activeChip].points.map((pt, pidx) => (
                  <div key={pidx} className="p-3 bg-white rounded-xl border border-slate-200 shadow-3xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                    <span className="text-[10px] sm:text-[11px] text-slate-700 font-black tracking-tight leading-snug">{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Accordion FAQ Area ("세상의 이야기") */}
        <div id="faq" className="scroll-mt-24 md:scroll-mt-28 space-y-4 pt-12 border-t border-slate-100">
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">자주 묻는 질문</h3>
            <p className="text-xs text-slate-500 font-bold">법무사 여환동 사무소에 의뢰하시는 많은 분들이 가장 먼저 확인하시는 핵심 질의응답입니다.</p>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {FAQ_ITEMS.map((faq) => {
              const isSelected = activeFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setActiveFaq(isSelected ? null : faq.id)}
                    className="w-full px-5 py-4 text-left font-bold text-xs sm:text-sm text-slate-800 hover:bg-slate-50 flex justify-between items-center gap-4 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                      {faq.question}
                    </span>
                    {isSelected ? <ChevronUp className="w-4.5 h-4.5 text-slate-550 shrink-0" /> : <ChevronDown className="w-4.5 h-4.5 text-slate-450 shrink-0" />}
                  </button>

                  {isSelected && (
                    <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed border-t border-slate-100/50 bg-slate-50/30">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
