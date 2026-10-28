import React from 'react';
import { LayoutDashboard, Map, Shield, PlusCircle, Database } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../services/localization';

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentLang: SupportedLanguage;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  onTabChange,
  currentLang
}) => {
  const t = TRANSLATIONS[currentLang];

  const items = [
    { id: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { id: 'map', label: t.nav.map, icon: Map },
    { id: 'safety', label: t.nav.safety, icon: Shield },
    { id: 'report', label: t.nav.report, icon: PlusCircle, isPrimary: true },
    { id: 'research', label: t.nav.research, icon: Database }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0e261b] border-t border-forest-700/70 md:hidden px-2 py-1 shadow-lg pb-safe">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          if (item.isPrimary) {
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className="flex flex-col items-center justify-center -mt-4 group focus:outline-none"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg border-2 border-[#0e261b] group-active:scale-95 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-[10px] mt-0.5 font-medium ${isActive ? 'text-emerald-400 font-semibold' : 'text-forest-100/70'}`}>
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors ${
                isActive ? 'text-emerald-400' : 'text-forest-100/70 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-normal'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
