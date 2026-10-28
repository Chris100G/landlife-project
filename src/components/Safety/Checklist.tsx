import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, RefreshCw, ShieldCheck } from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: 'Go-Bag' | 'Home Safety' | 'Monsoon Car Kit';
  text: string;
  priority: 'Critical' | 'Important';
}

const DEFAULT_ITEMS: ChecklistItem[] = [
  { id: 'c1', category: 'Go-Bag', text: 'Waterproof pouch with Aadhaar, property papers, insurance, and medical records', priority: 'Critical' },
  { id: 'c2', category: 'Go-Bag', text: 'Sturdy LED torch with extra rechargeable batteries', priority: 'Critical' },
  { id: 'c3', category: 'Go-Bag', text: 'High-decibel emergency whistle for acoustic search and rescue signaling', priority: 'Critical' },
  { id: 'c4', category: 'Go-Bag', text: 'First-aid kit: antiseptic, sterile bandages, burn cream, ORS packets, and 7-day chronic prescription medicines', priority: 'Critical' },
  { id: 'c5', category: 'Go-Bag', text: 'High-capacity power bank (10,000+ mAh) with multi-type charging cables', priority: 'Important' },
  { id: 'c6', category: 'Go-Bag', text: 'Pack of high-energy dry rations: glucose biscuits, roasted chana, nuts, and 3L sealed drinking water', priority: 'Important' },
  { id: 'h1', category: 'Home Safety', text: 'Inspect slope retaining walls behind the house for new bulging or cracked mortar', priority: 'Critical' },
  { id: 'h2', category: 'Home Safety', text: 'Ensure hillside rooftop storm drains and roadside swales are cleared of debris and mud', priority: 'Critical' },
  { id: 'h3', category: 'Home Safety', text: 'Establish an agreed-upon uphill evacuation meeting spot with family members', priority: 'Critical' },
  { id: 'h4', category: 'Home Safety', text: 'Keep emergency helpline numbers (112, 1070, 1077) visibly pinned or programmed in speed-dial', priority: 'Important' },
  { id: 'm1', category: 'Monsoon Car Kit', text: 'Reflective emergency hazard triangle and high-visibility rain poncho', priority: 'Important' },
  { id: 'm2', category: 'Monsoon Car Kit', text: 'Folding trench shovel or tow strap in vehicle trunk for ghat road travel', priority: 'Important' },
  { id: 'm3', category: 'Monsoon Car Kit', text: 'Offline pre-downloaded GPS maps on phone before entering high-range ghat corridors', priority: 'Critical' }
];

const STORAGE_KEY = 'landlife_emergency_checklist_state';

export const Checklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeCategory, setActiveCategory] = useState<'All' | 'Go-Bag' | 'Home Safety' | 'Monsoon Car Kit'>('All');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedIds));
    } catch (e) {
      console.warn('Failed to save checklist state');
    }
  }, [checkedIds]);

  const toggleItem = (id: string) => {
    setCheckedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    if (window.confirm('Reset all checklist items to unchecked?')) {
      setCheckedIds([]);
    }
  };

  const filteredItems = activeCategory === 'All'
    ? DEFAULT_ITEMS
    : DEFAULT_ITEMS.filter(item => item.category === activeCategory);

  const completionPct = Math.round((checkedIds.length / DEFAULT_ITEMS.length) * 100);

  return (
    <div className="bg-white rounded-2xl border border-parchment-200 p-5 sm:p-6 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-bold text-charcoal-900">
              Interactive Emergency Preparedness Checklist
            </h3>
          </div>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Progress is automatically preserved locally in your browser for offline use.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-bold text-emerald-800">
              {completionPct}% Ready
            </span>
            <div className="w-24 bg-parchment-200 h-2 rounded-full overflow-hidden mt-1">
              <div
                style={{ width: `${completionPct}%` }}
                className="bg-emerald-600 h-full rounded-full transition-all duration-300"
              />
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-charcoal-400 hover:text-charcoal-700 hover:bg-parchment-100 transition-colors"
            title="Reset checklist"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {(['All', 'Go-Bag', 'Home Safety', 'Monsoon Car Kit'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              activeCategory === cat
                ? 'bg-forest-800 text-white'
                : 'bg-parchment-100 text-charcoal-700 hover:bg-parchment-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Checklist Items */}
      <div className="space-y-2 pt-2 divide-y divide-parchment-100">
        {filteredItems.map(item => {
          const isChecked = checkedIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`pt-2 flex items-start gap-3 p-2.5 rounded-xl cursor-pointer transition-colors ${
                isChecked ? 'bg-emerald-50/50' : 'hover:bg-parchment-50'
              }`}
            >
              <div className="mt-0.5 flex-shrink-0 text-emerald-700">
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-charcoal-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${isChecked ? 'line-through text-charcoal-400' : 'text-charcoal-800 font-medium'}`}>
                    {item.text}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-parchment-200 text-charcoal-600">
                    {item.category}
                  </span>
                  {item.priority === 'Critical' && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800">
                      Critical
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

