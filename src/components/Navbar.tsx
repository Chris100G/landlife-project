import React, { useState, useEffect } from 'react';
import { Mountain, AlertTriangle, Globe, Wifi, WifiOff, Bell, ShieldAlert } from 'lucide-react';
import { SupportedLanguage, OfficialWarning } from '../types';
import { TRANSLATIONS } from '../services/localization';

interface NavbarProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  warnings: OfficialWarning[];
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  activeTab,
  onTabChange,
  warnings
}) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [activeWarningIndex, setActiveWarningIndex] = useState(0);
  const t = TRANSLATIONS[currentLang];

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (warnings.length > 1) {
      const interval = setInterval(() => {
        setActiveWarningIndex(prev => (prev + 1) % warnings.length);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [warnings]);

  const activeWarning = warnings[activeWarningIndex];

  return (
    <header className="sticky top-0 z-50 bg-[#0e261b] text-white border-b border-forest-700/60 shadow-md">
      {/* Official Alert Ticker */}
      {activeWarning && (
        <div className={`px-4 py-1.5 text-xs font-medium flex items-center justify-between border-b transition-colors ${
          activeWarning.level === 'Red Alert' 
            ? 'bg-hazard-red text-white border-red-700' 
            : 'bg-amber-600 text-white border-amber-700'
        }`}>
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap max-w-4xl">
            <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0 animate-pulse" />
            <span className="font-bold uppercase tracking-wider text-[11px] bg-black/20 px-1.5 py-0.5 rounded">
              {activeWarning.level} • {activeWarning.issuingAuthority}
            </span>
            <span className="truncate">
              <strong>{activeWarning.region}:</strong> {activeWarning.headline}
            </span>
            {activeWarning.isSimulatedDemo && (
              <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded uppercase font-semibold">
                Demo
              </span>
            )}
          </div>
          <span className="text-[10px] opacity-80 hidden md:inline ml-4 flex-shrink-0">
            Valid: {activeWarning.validUntil}
          </span>
        </div>
      )}

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => onTabChange('dashboard')}
        >
          <div className="w-10 h-10 rounded-xl bg-forest-800 flex items-center justify-center border border-forest-600 shadow-inner">
            <Mountain className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-parchment-50">LandLife</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700/50">
                INDIA
              </span>
            </div>
            <p className="text-[11px] text-forest-100/70 hidden sm:block tracking-wide">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {[
            { id: 'dashboard', label: t.nav.dashboard },
            { id: 'map', label: t.nav.map },
            { id: 'safety', label: t.nav.safety },
            { id: 'report', label: t.nav.report },
            { id: 'research', label: t.nav.research }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-forest-800 text-emerald-300 border border-emerald-600/40 shadow-sm'
                    : 'text-forest-100/80 hover:text-white hover:bg-forest-900/60'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Offline Status + Language Switcher */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Offline/Online badge */}
          <div 
            className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${
              isOnline 
                ? 'bg-emerald-950/60 border-emerald-700/50 text-emerald-300' 
                : 'bg-amber-950/80 border-amber-700 text-amber-300 animate-pulse'
            }`}
            title={isOnline ? 'Online - Live feeds connected' : 'Offline - Operating with cached safety data'}
          >
            {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isOnline ? 'Online' : 'Offline'}</span>
          </div>

          {/* Language Selector */}
          <div className="relative flex items-center bg-forest-900/80 border border-forest-700 rounded-lg px-2 py-1">
            <Globe className="w-3.5 h-3.5 text-forest-100/80 mr-1.5 flex-shrink-0" />
            <select
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              className="bg-transparent text-xs font-semibold text-parchment-50 focus:outline-none cursor-pointer pr-1"
              aria-label="Select Language"
            >
              <option value="en" className="bg-charcoal-900 text-white">English</option>
              <option value="hi" className="bg-charcoal-900 text-white">हिन्दी (Hindi)</option>
              <option value="bn" className="bg-charcoal-900 text-white">বাংলা (Bengali)</option>
              <option value="ml" className="bg-charcoal-900 text-white">മലയാളം (Malayalam)</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
