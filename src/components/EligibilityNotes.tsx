import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_ITEMS } from '../data';
import { Scale, CheckCircle2, AlertCircle, Sparkles, ChevronDown, ChevronUp, Lock, Target, HelpCircle, Landmark, ArrowRight, Library, FileText, Check } from 'lucide-react';

export default function EligibilityNotes() {
  const [activeTab, setActiveTab] = useState<'rehabilitation' | 'bankruptcy'>('rehabilitation');
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
    <section className="pt-20 md:pt-28 lg:pt-36 pb-20 md:pb-28 lg:pb-36 bg-gradient-to-b from-slate-200 via-sky-100 to-white border-b border-slate-100">
      <div className="max-w-5xl md:max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Dynamic Tab Switch Selector */}
        <div className="flex flex-col items-center mb-10 md:mb-14">
          <div className="inline-flex bg-slate-250/90 p-1.5 rounded-2xl gap-1.5 w-full max-w-lg shadow-md border border-slate-300/45">
            <button
               onClick={() => setActiveTab('rehabilitation')}
              className={`flex-1 px-3 sm:px-6 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-extrabold tracking-tight transition-all duration-300 cursor-pointer ${
                activeTab === 'rehabilitation'
                  ? 'bg-white text-emerald-900 shadow-lg scale-[1.02] border border-slate-100/50 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/30'
              }`}
            >
              개인회생 신청자격 안내
            </button>
            <button
              onClick={() => setActiveTab('bankruptcy')}
              className={`flex-1 px-3 sm:px-6 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-extrabold tracking-tight transition-all duration-300 cursor-pointer ${
                activeTab === 'bankruptcy'
                  ? 'bg-white text-emerald-900 shadow-lg scale-[1.02] border border-slate-100/50 font-black'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/30'
              }`}
            >
              개인파산 신청자격 안내
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'rehabilitation' ? (
            <motion.div
              key="rehab-pane"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Eligibility Header Area */}
              <div className="text-center space-y-4 mb-8 md:mb-10 lg:mb-12">
                <span className="text-indigo-850 text-indigo-800 font-extrabold text-sm tracking-widest uppercase block">
                  회생 가이드
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight px-1 text-center font-sans">
                  개인회생 신청 자격 안내
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed px-2">
                  4대 보험 가입자, 일용직, 계약직, 아르바이트, 자영업자, 프리랜서 관계없이 기본 3가지 요건만 충족하면 개인회생을 진행할 수 있습니다.
                </p>
              </div>

              {/* 3 Core Eligibility Rule cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-28 lg:mb-36">
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-55 bg-slate-50/70 border border-slate-250 flex flex-col justify-between space-y-4 md:min-h-[260px] shadow-3xs">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-lg">
                    01
                  </div>
                  <div className="space-y-2 text-left">
                    <h4 className="font-extrabold text-slate-800 text-base sm:text-lg">꾸준한 소득 발생 여부</h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-bold leading-relaxed">
                      직업의 종류와는 관계없이 인가 된 변제계획안 기간(통상 36개월) 동안 월 가용소득(변제금)을 꾸준히 납부할 수 있는 소득만 있으면 가능합니다. 예를 들어 최저생계비 이상의 소득이 있다면 인가를 받을 수 있습니다.
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 rounded-3xl bg-slate-55 bg-slate-50/70 border border-slate-250 flex flex-col justify-between space-y-4 md:min-h-[260px] shadow-3xs">
                  <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center font-black text-lg">
                    02
                  </div>
                  <div className="space-y-2 text-left">
                    <h4 className="font-extrabold text-slate-800 text-base sm:text-lg">채무 합계액 한도</h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-bold leading-relaxed">
                      무담보 채무(신용 대출, 신용카드 연체대금 등) 10억 이하, 담보 채무(아파트·주택 담보 채무, 자동차 담보 채무 등) 15억 이하 이면서, 너무 소액의 채무는 인가 가능성이 낮으므로 약 1천만 원 이상의 채무가 있으면 됩니다.
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 rounded-3xl bg-slate-55 bg-slate-50/70 border border-slate-250 flex flex-col justify-between space-y-4 md:min-h-[260px] shadow-3xs">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-lg">
                    03
                  </div>
                  <div className="space-y-2 text-left">
                    <h4 className="font-extrabold text-slate-800 text-base sm:text-lg">보유한 재산보다 채무가 많아야</h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-bold leading-relaxed">
                      채무자가 보유하고 있는 부동산이나 자동차 등의 시세 가액이, 채무자가 부담하고 있는 채무(담보채무 제외) 보다 적을 경우에 개인회생 대상이 됩니다. 다만, 재산의 가액 산정 시 시세에서 담보 채무를 뺀 나머지를 재산 가액으로 산정해야 합니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* Accordions for Key Concerns Chips */}
              <div id="our-spirit" className="scroll-mt-24 md:scroll-mt-28 space-y-12 pt-20 md:pt-28 lg:pt-36 mb-20 md:mb-28 lg:mb-36 border-t border-slate-200/50 text-center">
                <div className="space-y-4 sm:space-y-6">
                  <span className="text-indigo-850 text-indigo-800 font-extrabold text-sm sm:text-base tracking-widest uppercase block">
                    집중 케어
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight px-1 text-center">
                    핵심 상황별 집중 클리닉 케어
                  </h2>
                </div>

                {/* Tab buttons / Chips selector */}
                <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto px-1">
                  {chipContent.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveChip(idx)}
                      className={`px-4.5 py-3 text-xs sm:text-sm font-black rounded-xl border transition-all cursor-pointer ${
                        activeChip === idx
                          ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 bg-slate-50'
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
                    className="p-6 sm:p-10 md:p-12 rounded-3xl bg-slate-50/50 border border-slate-200/50 max-w-3xl mx-auto space-y-6 text-left shadow-xs"
                  >
                    <div>
                      <span className="text-[10px] sm:text-xs text-violet-600 font-black tracking-wide uppercase">
                        {chipContent[activeChip].tag}
                      </span>
                      <h3 className="text-lg sm:text-2xl font-black text-slate-800 mt-1">
                        {chipContent[activeChip].title} 걱정, 법무사의 해답은?
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base text-slate-600 font-bold leading-relaxed font-sans">
                      {chipContent[activeChip].desc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                      {chipContent[activeChip].points.map((pt, pidx) => (
                        <div key={pidx} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-3xs flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 stroke-[2.5]" />
                          <span className="text-[11px] sm:text-xs md:text-sm text-slate-700 font-black tracking-tight leading-snug">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="bankruptcy-pane"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Bankruptcy Header Area */}
              <div className="text-center space-y-4 mb-12">
                <span className="text-emerald-700 font-extrabold text-sm tracking-widest uppercase block">
                  파산 가이드
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight px-1 text-center font-sans">
                  개인파산 신청 자격 요건
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed px-2">
                  일부 금액을 매달 변제해 나가는 회생 절차와 다르게, 법원이 파산선고 결정 후 즉시 원금 및 이자에 대해 <strong className="text-slate-950 font-black text-emerald-700">100% 면책(전액 탕감)</strong>처리를 내려주는 최고 수준의 구제제도입니다.
                </p>
              </div>

              {/* 3 Core Bankruptcy Rule cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-28 lg:mb-32">
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-250 flex flex-col justify-between space-y-4 md:min-h-[280px] shadow-3xs">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-lg">
                    01
                  </div>
                  <div className="space-y-2 text-left">
                    <h4 className="font-extrabold text-slate-800 text-base sm:text-lg">소득불능 및 최저생계비 미달</h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-bold leading-relaxed">
                      소득이 전혀 없거나 소득이 있더라도 보건복지부 기준 최저생계비 미만이어야 합니다. 특히 고령(통상 만 60세 이상), 큰 질병, 장애 등 객관적으로 경제 활동이 불가능하다는 점을 증명하는 것이 최선입니다.
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-250 flex flex-col justify-between space-y-4 md:min-h-[280px] shadow-3xs">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-lg">
                    02
                  </div>
                  <div className="space-y-2 text-left">
                    <h4 className="font-extrabold text-slate-800 text-base sm:text-lg">재산보다 압도적으로 많은 채무</h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-bold leading-relaxed">
                      현재 본인 소유의 재산(집, 땅, 예적금, 보험 해약환급금, 임차 보증금 등)의 가치가 채무 총액보다 현격히 적어야 합니다. 채무보다 재산이 조금이라도 많다면 파산 면책 대상에서 원천적으로 제외됩니다.
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-250 flex flex-col justify-between space-y-4 md:min-h-[280px] shadow-3xs">
                  <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-black text-lg">
                    03
                  </div>
                  <div className="space-y-2 text-left">
                    <h4 className="font-extrabold text-slate-800 text-base sm:text-lg">면책 불허가 사유의 배제</h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-bold leading-relaxed">
                      고의로 고액의 재산을 타인 명의로 넘기거나 은닉하고 거짓 진술하는 행위가 없어야 합니다. 또한 단순 과도한 도박, 사치 등은 불합리한 행위로 판단되어 기각 사유가 될 수 있으므로 법무사 조력이 절대적으로 필요합니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bankruptcy Step-by-Step Procedure Timeline */}
              <div className="border-t border-slate-200/50 pt-20 md:pt-28 mb-20 md:mb-28 lg:mb-32">
                <div className="text-center space-y-3 mb-12">
                  <span className="text-indigo-800 font-extrabold text-xs tracking-widest uppercase block">진행 단계</span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">개인파산 & 면책 결정 과정</h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-semibold max-w-xl mx-auto">
                    법무사 여환동 사무소와 함께 세세하고 빈틈없는 서명 소명을 통과하여 최종 면책 결정까지 진행되는 핵심 4단계 과정 안내입니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-left">
                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 relative">
                    <div className="absolute top-4 right-4 text-xs font-black text-slate-300">STAGE 01</div>
                    <FileText className="w-8 h-8 text-indigo-600 mb-3" />
                    <h5 className="font-extrabold text-sm sm:text-base text-slate-900">파산 및 면책 동시 접수</h5>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mt-2 font-sans">
                      부채 증명서 및 소득불능 관련 소명 보정 자료들을 완벽하게 보완하여 관할 법원에 종합 신청서를 제출합니다.
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 relative">
                    <div className="absolute top-4 right-4 text-xs font-black text-slate-300">STAGE 02</div>
                    <Library className="w-8 h-8 text-emerald-600 mb-3" />
                    <h5 className="font-extrabold text-sm sm:text-base text-slate-900">파산관재인 선임 & 선고</h5>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mt-2 font-sans">
                      법원이 채무 실태 및 파산 원인 조사를 위해 관재인을 지정하여 대면 심사 및 객관적 재산 세부 실사를 거쳐 법리적 판단을 선언합니다.
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 relative">
                    <div className="absolute top-4 right-4 text-xs font-black text-slate-300">STAGE 03</div>
                    <HelpCircle className="w-8 h-8 text-amber-600 mb-3" />
                    <h5 className="font-extrabold text-sm sm:text-base text-slate-900">관재인 면담 & 채권자 집회</h5>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mt-2 font-sans">
                      지정일 법원에 출석하여 관재인 미팅 및 채권자의 이의신청 제기 여부를 합법적으로 확인하고 소명의 정당성을 밝힙니다.
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 relative">
                    <div className="absolute top-4 right-4 text-xs font-black text-slate-300">STAGE 04</div>
                    <CheckCircle2 className="w-8 h-8 text-cyan-600 mb-3" />
                    <h5 className="font-extrabold text-sm sm:text-base text-slate-900 font-sans">최종 면책 허가 결정</h5>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mt-2 font-sans">
                      법원의 최종 면책 허가 결정문이 도달함과 동시에 모든 잔존 원금이 105% 100% 소멸되며 신용불량 정보도 동시 자동 해제됩니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cross Comparison Section: 회생 vs 파산 */}
              <div className="border-t border-slate-200/50 pt-20 max-w-4xl mx-auto">
                <div className="text-center space-y-2 mb-8">
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900">개인회생 vs 개인파산 한눈에 비교</h4>
                  <p className="text-xs text-slate-400 font-semibold">어떤 제도가 나에게 더 유리할까요? 명확하게 구분해 드립니다.</p>
                </div>

                <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-3xs">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="p-4 font-black text-slate-800 w-1/4">구분 기준</th>
                        <th className="p-4 font-black text-slate-800 bg-emerald-50/20 w-3/8 text-emerald-900">개인회생</th>
                        <th className="p-4 font-black text-slate-800 bg-indigo-50/20 w-3/8 text-indigo-900">개인파산</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                      <tr>
                        <td className="p-4 font-black text-slate-800 bg-slate-50/5">주요 대상자</td>
                        <td className="p-4 text-slate-700 font-bold">임금소득자, 영업자형 등 반복 장래소득이 있는 자</td>
                        <td className="p-4 text-slate-700 font-bold">소득 불능 상태, 고령, 중증 질환, 기초 수급자 등</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-black text-slate-800 bg-slate-50/5">원금 감면율</td>
                        <td className="p-4 bg-emerald-50/5">법원 승인된 가용 소득 외 원금 최대 90% 상당 감면</td>
                        <td className="p-4 bg-indigo-50/5 font-bold text-slate-900">최종 면책 시 무조건 채무액 <span className="text-indigo-600 font-extrabold">100% 면제</span></td>
                      </tr>
                      <tr>
                        <td className="p-4 font-black text-slate-800 bg-slate-50/5">최대 채무 한도</td>
                        <td className="p-4">무담보 채무 10억 / 담보 채무 15억 이하</td>
                        <td className="p-4 font-semibold text-slate-700">채무액 상한치 원칙적으로 전혀 한계 없음</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-black text-slate-800 bg-slate-50/5">신용 회복 기간</td>
                        <td className="p-4 bg-emerald-50/5">3년 ~ 5년 장래 변제금 분할 납부 시점 동안 유지</td>
                        <td className="p-4 bg-indigo-50/5 font-semibold text-slate-700">법원의 면책 승인 완료와 동시에 즉각 즉시 정상화</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Accordion FAQ Area ("세상의 이야기") */}
        <div id="faq" className="scroll-mt-24 md:scroll-mt-28 space-y-8 pt-20 md:pt-28 lg:pt-36 border-t border-slate-200/50">
          <div className="text-center space-y-3">
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">자주 묻는 질문</h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 font-semibold mt-2">법무사 여환동 사무소에 의뢰하시는 많은 분들이 가장 먼저 확인하시는 핵심 질의응답입니다.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_ITEMS.map((faq) => {
              const isSelected = activeFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-3xl border border-slate-200 bg-white overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setActiveFaq(isSelected ? null : faq.id)}
                    className="w-full px-6 py-5 text-left font-bold text-sm sm:text-base text-slate-800 hover:bg-slate-50 flex justify-between items-center gap-4 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                      {faq.question}
                    </span>
                    {isSelected ? <ChevronUp className="w-4.5 h-4.5 text-slate-550 shrink-0" /> : <ChevronDown className="w-4.5 h-4.5 text-slate-450 shrink-0" />}
                  </button>

                  {isSelected && (
                    <div className="px-6 pb-6 pt-3 text-xs sm:text-sm md:text-base text-slate-500 font-medium leading-relaxed border-t border-slate-100/50 bg-slate-50/30">
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
