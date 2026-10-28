import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtext: string;
  icon: LucideIcon;
  variant?: 'forest' | 'amber' | 'red' | 'blue';
  badge?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtext,
  icon: Icon,
  variant = 'forest',
  badge
}) => {
  const variantStyles = {
    forest: {
      bg: 'bg-emerald-50/60 border-emerald-200/80',
      iconBg: 'bg-emerald-800 text-emerald-100',
      text: 'text-emerald-950',
      badge: 'bg-emerald-100 text-emerald-800'
    },
    amber: {
      bg: 'bg-amber-50/70 border-amber-200/80',
      iconBg: 'bg-amber-600 text-white',
      text: 'text-amber-950',
      badge: 'bg-amber-100 text-amber-800'
    },
    red: {
      bg: 'bg-rose-50/70 border-rose-200/80',
      iconBg: 'bg-rose-700 text-white',
      text: 'text-rose-950',
      badge: 'bg-rose-100 text-rose-800'
    },
    blue: {
      bg: 'bg-sky-50/70 border-sky-200/80',
      iconBg: 'bg-sky-700 text-white',
      text: 'text-sky-950',
      badge: 'bg-sky-100 text-sky-800'
    }
  }[variant];

  return (
    <div className={`p-4 sm:p-5 rounded-2xl border ${variantStyles.bg} shadow-sm backdrop-blur transition-transform hover:-translate-y-0.5`}>
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl ${variantStyles.iconBg} flex items-center justify-center shadow-sm`}>
          <Icon className="w-5 h-5" />
        </div>
        {badge && (
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${variantStyles.badge}`}>
            {badge}
          </span>
        )}
      </div>
      <div className="mt-3.5">
        <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-600">
          {title}
        </p>
        <p className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 ${variantStyles.text}`}>
          {value}
        </p>
        <p className="text-xs text-charcoal-500 mt-1 font-medium">
          {subtext}
        </p>
      </div>
    </div>
  );
};
