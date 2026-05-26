import React, { useState, useRef } from 'react';
import { SurveyResponses } from './types';
import Header from './components/Header';
import MainHero from './components/MainHero';
import QualificationCheck from './components/QualificationCheck';
import ResultDashboard from './components/ResultDashboard';
import EligibilityNotes from './components/EligibilityNotes';
import Footer from './components/Footer';
import SuccessCaseMatcher from './components/SuccessCaseMatcher';
import RepaymentPlanBuilder from './components/RepaymentPlanBuilder';
import { motion, AnimatePresence } from 'motion/react';
import { Scale, HeartHandshake, ShieldCheck, Info, X, Sparkles, MessageCircle } from 'lucide-react';

export default function App() {
  const [surveyActive, setSurveyActive] = useState(false);
  const [surveyMode, setSurveyMode] = useState<string>('general');
  const [caseMatcherActive, setCaseMatcherActive] = useState(false);
  const [planSimulatorActive, setPlanSimulatorActive] = useState(false);
  const [userResponses, setUserResponses] = useState<SurveyResponses | null>(null);
  const [brandPopupActive, setBrandPopupActive] = useState(false);

  // References for scrolling
  const heroRef = useRef<HTMLDivElement>(null);
  const eligibilityRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'hero') {
      setSurveyActive(false);
      setCaseMatcherActive(false);
      setPlanSimulatorActive(false);
      setUserResponses(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'brand' || sectionId === 'service') {
      setBrandPopupActive(true);
    } else if (sectionId === 'stories') {
      setSurveyActive(false);
      setCaseMatcherActive(false);
      setPlanSimulatorActive(false);
      setUserResponses(null);
      setTimeout(() => {
        eligibilityRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    } else if (sectionId === 'our-spirit') {
      setSurveyActive(false);
      setCaseMatcherActive(false);
      setPlanSimulatorActive(false);
      setUserResponses(null);
      setTimeout(() => {
        const el = document.getElementById('our-spirit');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          eligibilityRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);
    } else if (sectionId === 'faq') {
      setSurveyActive(false);
      setCaseMatcherActive(false);
      setPlanSimulatorActive(false);
      setUserResponses(null);
      setTimeout(() => {
        const faqEl = document.getElementById('faq');
        if (faqEl) {
          faqEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 80);
    }
  };

  const handleStartSurvey = (mode?: string) => {
    setUserResponses(null); // Reset past scores
    if (mode === 'case') {
      setCaseMatcherActive(true);
      setPlanSimulatorActive(false);
      setSurveyActive(false);
    } else if (mode === 'plan') {
      setPlanSimulatorActive(false);
      setCaseMatcherActive(false);
      setSurveyActive(false);
      setTimeout(() => {
        calculatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return; // Skip standard scrolling
    } else {
      setSurveyActive(true);
      setSurveyMode(mode || 'general');
      setCaseMatcherActive(false);
      setPlanSimulatorActive(false);
    }
    // Scroll smoothly to target survey zone
    setTimeout(() => {
      heroRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSurveyComplete = (responses: SurveyResponses) => {
    setUserResponses(responses);
    // Smooth scroll back up to results dashboard
    setTimeout(() => {
      heroRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleRestartSurvey = () => {
    setUserResponses(null);
    setSurveyActive(true);
    setSurveyMode('general');
    setCaseMatcherActive(false);
    setPlanSimulatorActive(false);
    setTimeout(() => {
      heroRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleCancelSurvey = () => {
    setSurveyActive(false);
    setCaseMatcherActive(false);
    setPlanSimulatorActive(false);
    setUserResponses(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-500 selection:text-white" id="main-landing-wrap">
      {/* Universal Sticky Header */}
      <Header
        onNavClick={handleNavClick}
        onStartSurvey={() => handleStartSurvey('general')}
      />

      {/* Main Container */}
      <main className="flex-1 w-full flex flex-col" id="landing-main-stage">
        
        {/* Dynamic Display Anchor Area */}
        <div ref={heroRef} className="scroll-mt-20">
          <AnimatePresence mode="wait">
            {!surveyActive && !caseMatcherActive && !planSimulatorActive && !userResponses ? (
              // Case 1: Standard Homepage Intro Hero Area
              <motion.div
                key="home-hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col"
              >
                <MainHero onStartSurvey={handleStartSurvey} />

                {/* Direct display of RepaymentPlanBuilder on the main page */}
                <div ref={calculatorRef} className="scroll-mt-24 bg-gradient-to-b from-blue-200 via-indigo-100 to-slate-200 py-16 relative">
                  {/* Subtle Background Accent */}
                  <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
                  
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="text-center mb-10">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-xs font-extrabold text-blue-900 shadow-3xs">
                        <Sparkles className="w-3.5 h-3.5 text-blue-700 animate-spin" />
                        <span>실시간 변제금 확인 서비스</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-3">
                        맞춤형 월 변제 상환계획기
                      </h3>
                      <p className="mt-2.5 text-xs sm:text-sm text-slate-500 font-bold max-w-lg mx-auto leading-relaxed whitespace-pre-line">
                        본인의 소득과 최저생계비 기준에 맞는{"\n"}월 가용소득(변제금)을{"\n"}실시간 설계하며 확인해 보세요.
                      </p>
                    </div>

                    <RepaymentPlanBuilder
                      onSubmitPlan={(answers) => {
                        handleSurveyComplete(answers);
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ) : surveyActive && !userResponses ? (
              // Case 2: Survey Qualification Wizard in progress
              <motion.div
                key="survey-flow"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-radial from-slate-55 to-slate-105/50 py-10 md:py-16"
              >
                <div className="text-center mb-6 px-4">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {surveyMode === 'debt' 
                      ? '실시간 채무 탕감 시뮬레이션 계산기' 
                      : '법무사 여환동 개인회생 자격 정밀 진단'}
                  </h2>
                  <p className="text-xs text-slate-500 font-bold mt-1.5 max-w-sm mx-auto">
                    {surveyMode === 'debt'
                      ? '2026년 최신 소득 및 생계비 기준을 적용해 원금 탕감비율을 즉시 계산합니다.'
                      : '법률 실무 준칙 및 기각 선례 분석 알고리즘에 기초하여 실시간 탕감 한도를 산출합니다.'}
                  </p>
                </div>
                <QualificationCheck
                  mode={surveyMode}
                  onComplete={handleSurveyComplete}
                  onCancel={handleCancelSurvey}
                />
              </motion.div>
            ) : caseMatcherActive && !userResponses ? (
              // Case 3: Success Case Matcher
              <motion.div
                key="case-matcher"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                <SuccessCaseMatcher
                  onBack={handleCancelSurvey}
                  onSelectPlan={({ occupation, debtAmount }) => {
                    // pre-fill and start the survey!
                    setSurveyActive(true);
                    setSurveyMode('general');
                    setCaseMatcherActive(false);
                    setPlanSimulatorActive(false);
                  }}
                />
              </motion.div>
            ) : planSimulatorActive && !userResponses ? (
              // Case 4: 1:1 Repayment Plan Builder
              <motion.div
                key="plan-builder"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                <RepaymentPlanBuilder
                  onBack={handleCancelSurvey}
                  onSubmitPlan={(answers) => {
                    handleSurveyComplete(answers);
                  }}
                />
              </motion.div>
            ) : (
              // Case 3: Simulation Diagnostic report result dashboard
              <motion.div
                key="report-dashboard"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-slate-100/50 py-10 md:py-16"
              >
                <div className="text-center mb-4 px-4">
                  <span className="text-emerald-600 font-extrabold text-xs tracking-wider uppercase bg-emerald-50 border border-emerald-200/50 px-3 py-1 rounded-full">
                    ANALYSIS REPORT
                  </span>
                  <p className="text-xs text-slate-400 font-semibold mt-2">
                    작성일: {new Date().toLocaleDateString('ko-KR')} | 보안등급: 기밀 안심 보고
                  </p>
                </div>
                {userResponses && (
                  <ResultDashboard
                    responses={userResponses}
                    onRestart={handleRestartSurvey}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Permanent Premium Guidelines and Stories (Scroll Trigger Point) */}
        <div ref={eligibilityRef} className="scroll-mt-16" id="brand">
          <EligibilityNotes />
        </div>

      </main>

      {/* Universal Footer */}
      <Footer />

      {/* Brand & Service introduction Modal Portal (Fallback for un-implemented subdomains) */}
      <AnimatePresence>
        {brandPopupActive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop blur clickoff */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setBrandPopupActive(false)}
              className="absolute inset-0 bg-slate-950"
            />
            
            {/* Modal Body card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative z-10 border border-slate-100 overflow-hidden"
            >
              {/* Top Accent Light decoration */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-600 to-violet-600" />
              
              <button
                onClick={() => setBrandPopupActive(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 cursor-pointer"
                aria-label="Close brand popup"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4 pt-2">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <HeartHandshake className="w-6 h-6 text-emerald-600" />
                </div>
                
                <div className="space-y-1.5">
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    법무사 여환동 사무소 소개
                  </h3>
                  <p className="text-xs text-emerald-600 font-extrabold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    울산지방법원 맞춤 개인회생 진행
                  </p>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                  <p>
                    울산법원앞에 위치하면서 울산 거주자들의 개인회생 사건을 처리해 온지 14년동안 약 1,000건 이상의 인가결정을 얻어내 실전 경험이 풍부한 법무사가 직접 상담 및 진행하는 사무실입니다.
                  </p>
                  <p>
                    대표 법무사 여환동이 의뢰인 한 분 한 분의 월 평균 소득 산출, 보유하고 있는 순자산 가액, 최근대출의 소명 방법, 부동산 및 보유 자산의 처리 방법 등을 직접 검토한 다음, 채권자목록·변제계획안·수입및지출에관한목록·재산목록·진술서 등을 직접 작성해, 신청부터 개시결정 및 인가결정까지 직접 챙기고 있는 사무실입니다.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex gap-2.5">
                  <button
                    onClick={() => setBrandPopupActive(false)}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer text-center"
                  >
                    소개 닫기
                  </button>
                  <button
                    onClick={() => {
                      setBrandPopupActive(false);
                      handleStartSurvey('direct');
                    }}
                    className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-extrabold rounded-xl text-xs shadow-md shadow-emerald-100 transition-colors cursor-pointer text-center"
                  >
                    지금 바로 진단하기
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons Area */}
      <div className="fixed right-4 bottom-4 z-50 animate-fade-in" id="floating-consultation-buttons">
        {/* KakaoTalk Float Button */}
        <a
          href="http://pf.kakao.com/_xhTqgG/chat"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 shrink-0 cursor-pointer bg-[#FEE500] hover:bg-[#FDD100] rounded-full shadow-2xl hover:scale-110 active:scale-95 duration-100 transition-all border border-amber-300/60 text-[#3C1E1E] select-none"
          title="법무사 카카오톡 1:1 실시간 상담"
        >
          <MessageCircle className="w-7 h-7 fill-[#3C1E1E]/15 stroke-[2.3]" />
        </a>
      </div>
    </div>
  );
}

