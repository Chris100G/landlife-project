import React from 'react';
import { Calendar, Layers, MapPin } from 'lucide-react';

interface TrendChartsProps {
  monthCounts: Record<string, number>;
  stateCounts: Record<string, number>;
  severityCounts: Record<string, number>;
}

export const TrendCharts: React.FC<TrendChartsProps> = ({
  monthCounts,
  stateCounts,
  severityCounts
}) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const maxMonthVal = Math.max(...Object.values(monthCounts), 1);

  // Sort states by count descending
  const sortedStates = Object.entries(stateCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  const maxStateVal = Math.max(...sortedStates.map(s => s[1]), 1);

  const totalSeverity = Object.values(severityCounts).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Chart 1: Monsoon Hazard Curve */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-parchment-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-charcoal-900">
                Monsoon Seasonality Hazard Curve
              </h4>
              <p className="text-xs text-charcoal-500">
                Historical monthly incident clustering (SW Monsoon Peak)
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
            Jul-Aug Peak
          </span>
        </div>

        {/* SVG Monthly Bar Chart */}
        <div className="h-48 w-full flex items-end justify-between gap-1 sm:gap-2 pt-6 px-1 border-b border-parchment-200">
          {months.map((m) => {
            const count = monthCounts[m] || 0;
            const heightPercent = Math.max((count / maxMonthVal) * 100, 6);
            const isMonsoon = ['Jun', 'Jul', 'Aug', 'Sep'].includes(m);

            return (
              <div key={m} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                {/* Tooltip on hover */}
                <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-charcoal-900 text-white text-[10px] py-0.5 px-1.5 rounded pointer-events-none whitespace-nowrap z-20">
                  {m}: {count} events
                </div>
                {/* Bar */}
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-t-md transition-all duration-300 ${
                    isMonsoon
                      ? count > 2 
                        ? 'bg-emerald-700 group-hover:bg-emerald-600 shadow-sm' 
                        : 'bg-emerald-500 group-hover:bg-emerald-400'
                      : 'bg-parchment-300 group-hover:bg-parchment-200'
                  }`}
                />
                <span className={`text-[10px] mt-2 font-medium ${isMonsoon ? 'text-emerald-800 font-bold' : 'text-charcoal-500'}`}>
                  {m}
                </span>
              </div>
            );
          })}
        </div>
        <p className="text-[11px] text-charcoal-500 mt-3 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-700"></span>
          <span>South-West Monsoon months (June–September) exhibit over 78% of catastrophic slope failures across Western Ghats and Himalayas.</span>
        </p>
      </div>

      {/* Chart 2: Regional Distribution */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-parchment-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-charcoal-900">
                State Landslide Incident Distribution
              </h4>
              <p className="text-xs text-charcoal-500">
                Key states with documented high-impact ground movements
              </p>
            </div>
          </div>
        </div>

        {/* Horizontal Bars */}
        <div className="space-y-3 pt-2">
          {sortedStates.map(([state, count]) => {
            const widthPercent = (count / maxStateVal) * 100;
            return (
              <div key={state} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-charcoal-800">
                  <span>{state}</span>
                  <span className="text-emerald-800 font-bold">{count} major events</span>
                </div>
                <div className="w-full bg-parchment-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${widthPercent}%` }}
                    className="bg-emerald-800 h-full rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Severity Summary Bar */}
        <div className="mt-6 pt-4 border-t border-parchment-200">
          <div className="flex items-center justify-between text-xs font-bold text-charcoal-700 mb-2">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-charcoal-500" />
              Severity Classification
            </span>
          </div>
          <div className="w-full h-3 rounded-full flex overflow-hidden bg-parchment-200">
            <div
              style={{ width: `${(severityCounts['Catastrophic'] / totalSeverity) * 100}%` }}
              className="bg-rose-700"
              title={`Catastrophic: ${severityCounts['Catastrophic']}`}
            />
            <div
              style={{ width: `${(severityCounts['Severe'] / totalSeverity) * 100}%` }}
              className="bg-amber-600"
              title={`Severe: ${severityCounts['Severe']}`}
            />
            <div
              style={{ width: `${(severityCounts['Moderate'] / totalSeverity) * 100}%` }}
              className="bg-yellow-500"
              title={`Moderate: ${severityCounts['Moderate']}`}
            />
            <div
              style={{ width: `${(severityCounts['Minor'] / totalSeverity) * 100}%` }}
              className="bg-emerald-600"
              title={`Minor: ${severityCounts['Minor']}`}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-[10px] text-charcoal-600 font-medium">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-700"></span> Catastrophic ({severityCounts['Catastrophic']})
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span> Severe ({severityCounts['Severe']})
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Moderate ({severityCounts['Moderate']})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
