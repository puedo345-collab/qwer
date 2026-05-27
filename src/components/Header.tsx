import React, { useState } from 'react';
import { ShieldCheck, Menu, X, Scale, Camera } from 'lucide-react';

interface HeaderProps {
  onNavClick: (section: string) => void;
  onStartSurvey: () => void;
}

export default function Header({ onNavClick, onStartSurvey }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [logoImg, setLogoImg] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  React.useEffect(() => {
    // Load custom logo on mount
    fetch('/api/logo-image')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.image) {
          setLogoImg(data.image);
        }
      })
      .catch((err) => console.error("Error loading logo:", err));
  }, []);

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64String = event.target?.result as string;
      if (!base64String) {
        setUploading(false);
        return;
      }

      const img = new Image();
      img.src = base64String;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 120; // 120px fits perfectly in header icon container
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          if (width > MAX_SIZE) {
            height = height * (MAX_SIZE / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = width * (MAX_SIZE / height);
            height = MAX_SIZE;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/png'); // Preserve transparent logo backgrounds
          
          fetch('/api/logo-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: compressedDataUrl })
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                setLogoImg(compressedDataUrl);
              } else {
                alert("로고 등록 실패: " + data.error);
              }
            })
            .catch((err) => {
              console.error("Logo upload error:", err);
              alert("서버 통신 실패");
            })
            .finally(() => {
              setUploading(false);
            });
        } else {
          setUploading(false);
        }
      };
    };
    reader.readAsDataURL(file);
  };

  const navItems = [
    { id: 'brand', label: '법무사 소개' },
    { id: 'stories', label: '신청자격 (회생·파산)' },
    { id: 'our-spirit', label: '회생절차 & 준비서류' },
    { id: 'faq', label: '자주 묻는 질문' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo Brand area */}
          <div className="flex items-center gap-3 select-none">
            <div 
              id="header-logo-container"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group overflow-hidden ${
                logoImg 
                  ? 'bg-transparent border border-transparent' 
                  : 'bg-slate-900 border border-slate-800 text-amber-400 shadow-sm'
              }`}
              title="클릭하여 새로운 로고 이미지 업로드"
            >
              {logoImg ? (
                <img 
                  src={logoImg} 
                  alt="로고" 
                  className="w-full h-full object-contain"
                />
              ) : (
                <Scale className="w-5 h-5 stroke-[2.2]" />
              )}
              
              {/* Subtle Camera Hover Indicator */}
              <div className="absolute inset-0 bg-slate-950/65 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-4 h-4 text-white" />
              </div>
              
              {uploading && (
                <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center">
                  <div className="w-4 h-4 border border-emerald-400 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* Hidden Input for Logo File Upload */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleLogoChange} 
              accept="image/*" 
              className="hidden" 
            />

            <div 
              className="flex flex-col cursor-pointer" 
              onClick={() => onNavClick('hero')}
            >
              <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 block leading-tight">
                법무사 여환동 사무소
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                className="text-lg font-bold text-slate-600 hover:text-slate-950 transition-colors duration-200 cursor-pointer py-2"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Button Area */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onStartSurvey}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm tracking-wide shadow-sm hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              1분 자격진단 시작
            </button>
          </div>

          {/* Mobile hamburger icon */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onStartSurvey}
              className="px-4 py-2.5 text-xs font-black text-slate-900 bg-slate-100 hover:bg-indigo-100/50 active:bg-slate-200 rounded-xl transition-all cursor-pointer shadow-3xs active:scale-95 duration-100"
              id="mobile-header-accent-btn"
            >
              자가진단
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-all cursor-pointer flex items-center justify-center min-w-10 min-h-10"
              aria-label="Toggle Menu"
              id="mobile-header-hamburger-btn"
            >
              {isOpen ? <X className="w-6 h-6 stroke-[2.5]" /> : <Menu className="w-6 h-6 stroke-[2.5]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-50 bg-white shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavClick(item.id);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-3 rounded-xl text-base font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition-all cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-slate-100 pt-4 mt-2">
              <button
                onClick={() => {
                  onStartSurvey();
                  setIsOpen(false);
                }}
                className="w-full py-3.5 text-center bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl shadow-md tracking-wide cursor-pointer flex justify-center items-center gap-2"
              >
                <Scale className="w-5 h-5 text-amber-400" />
                신청자격 무료 알아보기 (약 1분)
              </button>
            </div>
            <p className="text-center text-[11px] text-slate-400 font-medium">
              ※ 법무사 여환동 직접 검토 및 철저한 개인정보 보호 보장
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
