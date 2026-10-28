import React from 'react';
import { 
  AlertTriangle, 
  ShieldCheck, 
  Users, 
  MapPin, 
  Compass, 
  ArrowRight, 
  AlertCircle,
  ExternalLink,
  Info
} from 'lucide-react';
import { LandslideIncident, SusceptibilityZone, OfficialWarning, SupportedLanguage } from '../../types';
import { MetricCard } from './MetricCard';
import { TrendCharts } from './TrendCharts';
import { TRANSLATIONS } from '../../services/localization';

interface DashboardProps {
  incidents: LandslideIncident[];
  zones: SusceptibilityZone[];
  warnings: OfficialWarning[];
  stats: any;
  currentLang: SupportedLanguage;
  onNavigateToMap: (incidentId?: string) => void;
  onSelectRegion: (regionName: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  incidents,
  zones,
  warnings,
  stats,
  currentLang,
  onNavigateToMap,
  onSelectRegion
}) => {
  const t = TRANSLATIONS[currentLang];
  const recentVerified = incidents
    .filter(i => i.status === 'historical_verified' || i.status === 'official_warning')
    .slice(0, 5);

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#0e261b] via-[#143828] to-[#1e4d38] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-forest-700/50 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-600/40 text-emerald-300 text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Operational Intelligence Platform
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-parchment-50">
            {t.dashboard.title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-forest-100/90 leading-relaxed font-normal">
            {t.dashboard.subtitle}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigateToMap()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Interactive Map</span>
            </button>
            <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-forest-900/80 text-parchment-100 border border-forest-700 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified against GSI & NDMA Records</span>
            </div>
          </div>
        </div>

        {/* Subtle decorative background ring */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />
      </div>

      {/* Scientific Integrity Disclaimer */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-parchment-100 border border-parchment-300 text-charcoal-800 text-xs leading-relaxed">
        <Info className="w-5 h-5 text-forest-700 flex-shrink-0 mt-0.5" />
        <p>
          <strong className="font-semibold text-forest-900">Safety & Scientific Notice:</strong> {t.dashboard.disclaimerBanner}
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        <MetricCard
          title={t.dashboard.verifiedIncidents}
          value={stats.total}
          subtext="Indian Landslide Catalog"
          icon={MapPin}
          variant="forest"
          badge="Verified GSI"
        />
        <MetricCard
          title={t.dashboard.totalLivesLost}
          value={stats.totalFatalities.toLocaleString()}
          subtext="Historical Recorded Loss"
          icon={Users}
          variant="red"
          badge="Casualty Record"
        />
        <MetricCard
          title={t.dashboard.highRiskZones}
          value={zones.length}
          subtext="Western Ghats & Himalayas"
          icon={AlertTriangle}
          variant="amber"
          badge="NLSM Atlas"
        />
        <MetricCard
          title={t.dashboard.activeWarnings}
          value={warnings.length}
          subtext="IMD & SDMA Bulletins"
          icon={AlertCircle}
          variant="blue"
          badge="Monsoon Watch"
        />
      </div>

      {/* Official Warning Bulletins */}
      {warnings.length > 0 && (
        <div className="bg-white rounded-2xl border border-parchment-200 p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-rose-50 text-rose-700 rounded-lg">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
              </span>
              <div>
                <h3 className="text-base font-bold text-charcoal-900">
                  Active Official Hazard Advisories & Watches
                </h3>
                <p className="text-xs text-charcoal-500">
                  Direct government alerts from IMD & State Disaster Management Authorities
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {warnings.map((warn) => (
              <div 
                key={warn.id}
                className={`p-4 rounded-xl border transition-all ${
                  warn.level === 'Red Alert'
                    ? 'bg-rose-50/50 border-rose-200'
                    : 'bg-amber-50/50 border-amber-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      warn.level === 'Red Alert' ? 'bg-rose-700 text-white' : 'bg-amber-600 text-white'
                    }`}>
                      {warn.level}
                    </span>
                    <span className="text-xs font-bold text-charcoal-700">
                      {warn.issuingAuthority} Bulletin
                    </span>
                  </div>
                  {warn.isSimulatedDemo && (
                    <span className="text-[10px] bg-charcoal-100 text-charcoal-600 px-2 py-0.5 rounded font-mono font-medium">
                      Simulated Advisory
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-charcoal-900 mt-2">
                  {warn.region} ({warn.state})
                </h4>
                <p className="text-xs text-charcoal-700 mt-1">
                  {warn.headline}
                </p>

                {warn.rainfallForecastMm && (
                  <p className="text-xs font-semibold text-rose-800 mt-2 bg-white/70 p-1.5 rounded border border-rose-100">
                    🌧️ Forecast: {warn.rainfallForecastMm}
                  </p>
                )}

                <ul className="mt-2.5 space-y-1 text-xs text-charcoal-600">
                  {warn.precautions.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-charcoal-400">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visual Charts: Seasonality & State Vulnerability */}
      <TrendCharts
        monthCounts={stats.monthCounts}
        stateCounts={stats.stateCounts}
        severityCounts={stats.severityCounts}
      />

      {/* High-Risk Geological Provinces across India */}
      <div className="bg-white rounded-2xl border border-parchment-200 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-charcoal-900">
              India High-Risk Geological Susceptibility Zones
            </h3>
            <p className="text-xs text-charcoal-500">
              National Landslide Susceptibility Mapping (GSI NLSM) Classified Sectors
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {zones.map((zone) => (
            <div
              key={zone.id}
              onClick={() => onSelectRegion(zone.region)}
              className="p-4 rounded-xl border border-parchment-200 hover:border-emerald-600 bg-parchment-50/50 hover:bg-emerald-50/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  zone.riskLevel === 'Very High' 
                    ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  {zone.riskLevel} Risk
                </span>
                <span className="text-xs font-semibold text-charcoal-500 group-hover:text-emerald-800 transition-colors flex items-center gap-1">
                  View <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>

              <h4 className="text-sm font-bold text-charcoal-900 mt-2 group-hover:text-emerald-900">
                {zone.name}
              </h4>
              <p className="text-xs text-charcoal-600 mt-1 line-clamp-2">
                {zone.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1">
                {zone.statesCovered.map((st) => (
                  <span key={st} className="text-[10px] bg-white border border-parchment-200 px-1.5 py-0.5 rounded text-charcoal-600">
                    {st}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Major Verified Ground Movements */}
      <div className="bg-white rounded-2xl border border-parchment-200 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-charcoal-900">
              {t.dashboard.recentEvents}
            </h3>
            <p className="text-xs text-charcoal-500">
              Disaster-risk scientific telemetry and benchmark records
            </p>
          </div>
          <button
            onClick={() => onNavigateToMap()}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-700 flex items-center gap-1"
          >
            {t.dashboard.viewAll} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-parchment-200">
          {recentVerified.map((inc) => (
            <div 
              key={inc.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-parchment-50/70 px-2 rounded-xl transition-colors cursor-pointer"
              onClick={() => onNavigateToMap(inc.id)}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    inc.severity === 'Catastrophic' ? 'bg-rose-100 text-rose-800' :
                    inc.severity === 'Severe' ? 'bg-amber-100 text-amber-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {inc.severity}
                  </span>
                  <span className="text-xs font-semibold text-charcoal-500">
                    {inc.landslideType}
                  </span>
                  <span className="text-xs text-charcoal-400">•</span>
                  <span className="text-xs text-charcoal-500">
                    {inc.date}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-charcoal-900">
                  {inc.title}
                </h4>
                <p className="text-xs text-charcoal-600">
                  📍 {inc.location}, <span className="font-semibold">{inc.district}, {inc.state}</span>
                </p>
              </div>

              <div className="flex items-center gap-4 sm:flex-shrink-0">
                {inc.fatalities > 0 && (
                  <div className="text-right">
                    <span className="text-xs font-bold text-rose-700">{inc.fatalities}</span>
                    <span className="text-[10px] text-charcoal-500 block">fatalities</span>
                  </div>
                )}
                <button
                  className="px-3 py-1.5 rounded-lg bg-forest-50 hover:bg-forest-100 text-forest-800 text-xs font-semibold flex items-center gap-1 border border-forest-200"
                >
                  Inspect <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

