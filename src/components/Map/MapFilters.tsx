import React from 'react';
import { Search, Filter, RotateCcw, MapPin } from 'lucide-react';
import { FilterOptions, IndianRegion, IncidentStatus, SeverityLevel } from '../../types';

interface MapFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
  totalFiltered: number;
}

const REGIONS: IndianRegion[] = [
  'All India',
  'Western Ghats',
  'North-West Himalayas',
  'Eastern Himalayas & North-East',
  'Central India / Konkan',
  'Eastern Ghats & Nilgiris'
];

export const MapFilters: React.FC<MapFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalFiltered
}) => {
  return (
    <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-parchment-200 shadow-sm space-y-3">
      {/* Top Search & Reset Row */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400 pointer-events-none" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            placeholder="Search Wayanad, Kedarnath, Shimla, NH-58, Debris Flow..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-parchment-50 border border-parchment-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all text-charcoal-900"
          />
        </div>

        <div className="flex items-center gap-2 justify-between sm:justify-end">
          <span className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-forest-50 text-forest-800 border border-forest-200">
            {totalFiltered} matching points
          </span>
          <button
            onClick={onReset}
            className="p-2 rounded-xl text-charcoal-600 hover:text-charcoal-900 hover:bg-parchment-100 border border-parchment-200 transition-colors"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Selectors Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {/* Region */}
        <div>
          <label className="block text-[11px] font-semibold text-charcoal-600 mb-1">
            Indian Region
          </label>
          <select
            value={filters.region}
            onChange={(e) => onFilterChange({ ...filters, region: e.target.value as IndianRegion })}
            className="w-full text-xs py-1.5 px-2.5 bg-parchment-50 border border-parchment-200 rounded-lg text-charcoal-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-600"
          >
            {REGIONS.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-[11px] font-semibold text-charcoal-600 mb-1">
            Status Category
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value as IncidentStatus | 'all' })}
            className="w-full text-xs py-1.5 px-2.5 bg-parchment-50 border border-parchment-200 rounded-lg text-charcoal-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-600"
          >
            <option value="all">All Categories</option>
            <option value="historical_verified">Historical Verified (GSI)</option>
            <option value="official_warning">Official Warning (IMD/SDMA)</option>
            <option value="environmental_observation">Field Observation</option>
            <option value="community_unverified">Community Report</option>
            <option value="susceptibility_estimate">Susceptibility Estimate</option>
          </select>
        </div>

        {/* Severity */}
        <div>
          <label className="block text-[11px] font-semibold text-charcoal-600 mb-1">
            Severity
          </label>
          <select
            value={filters.severity}
            onChange={(e) => onFilterChange({ ...filters, severity: e.target.value as SeverityLevel | 'all' })}
            className="w-full text-xs py-1.5 px-2.5 bg-parchment-50 border border-parchment-200 rounded-lg text-charcoal-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-600"
          >
            <option value="all">All Severities</option>
            <option value="Catastrophic">Catastrophic</option>
            <option value="Severe">Severe</option>
            <option value="Moderate">Moderate</option>
            <option value="Minor">Minor</option>
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-[11px] font-semibold text-charcoal-600 mb-1">
            Time Horizon
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => onFilterChange({ ...filters, dateRange: e.target.value as any })}
            className="w-full text-xs py-1.5 px-2.5 bg-parchment-50 border border-parchment-200 rounded-lg text-charcoal-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-600"
          >
            <option value="all">Full Historical Catalog</option>
            <option value="past30days">Recent (Past 30 Days)</option>
            <option value="pastYear">Past 12 Months</option>
            <option value="historical">Historical Archive</option>
          </select>
        </div>
      </div>
    </div>
  );
};

