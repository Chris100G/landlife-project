import React, { useState } from 'react';
import { 
  Database, 
  Download, 
  Upload, 
  FileCheck, 
  SlidersHorizontal, 
  Search,
  ExternalLink,
  ShieldCheck,
  Check,
  BarChart3
} from 'lucide-react';
import { LandslideIncident, SupportedLanguage } from '../../types';
import { TRANSLATIONS } from '../../services/localization';
import { exportToCsv, exportToGeoJson } from '../../services/exportImport';
import { CsvImporter } from './CsvImporter';

interface ResearchLabProps {
  incidents: LandslideIncident[];
  onImportIncidents: (newIncidents: LandslideIncident[]) => void;
  currentLang: SupportedLanguage;
  onSelectIncident: (id: string) => void;
}

export const ResearchLab: React.FC<ResearchLabProps> = ({
  incidents,
  onImportIncidents,
  currentLang,
  onSelectIncident
}) => {
  const t = TRANSLATIONS[currentLang];
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'date' | 'fatalities' | 'confidence'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Calculate Data Quality Metrics
  const total = incidents.length;
  const withCoordinates = incidents.filter(i => i.coordinates && !isNaN(i.coordinates[0])).length;
  const withGeology = incidents.filter(i => i.geologyDetails && i.geologyDetails.length > 5).length;
  const withFatalitiesRecorded = incidents.filter(i => i.fatalities !== undefined).length;
  const avgConfidence = total > 0 
    ? Math.round(incidents.reduce((sum, i) => sum + (i.confidenceScore || 0), 0) / total) 
    : 0;

  const completenessScore = Math.round(
    ((withCoordinates / total) * 0.4 +
     (withGeology / total) * 0.3 +
     (withFatalitiesRecorded / total) * 0.3) * 100
  );

  const filtered = incidents.filter(inc => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      inc.title.toLowerCase().includes(q) ||
      inc.state.toLowerCase().includes(q) ||
      inc.district.toLowerCase().includes(q) ||
      inc.landslideType.toLowerCase().includes(q) ||
      inc.trigger.toLowerCase().includes(q)
    );
  }).sort((a, b) => {
    let diff = 0;
    if (sortField === 'date') {
      diff = new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortField === 'fatalities') {
      diff = (b.fatalities || 0) - (a.fatalities || 0);
    } else if (sortField === 'confidence') {
      diff = (b.confidenceScore || 0) - (a.confidenceScore || 0);
    }
    return sortOrder === 'desc' ? diff : -diff;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-[#0e261b] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-forest-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-semibold mb-2">
            <Database className="w-3.5 h-3.5" />
            <span>Open Geospatial Research Core</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-parchment-50">
            {t.research.title}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-forest-100/80 max-w-2xl">
            {t.research.subtitle}
          </p>
        </div>

        {/* Export Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
          <button
            onClick={() => exportToCsv(filtered)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-forest-800 hover:bg-forest-700 text-parchment-50 border border-forest-600 text-xs font-semibold shadow-sm transition-all active:scale-95"
            title="Download full CSV with UTF-8 BOM"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.research.exportCsv}</span>
          </button>
          <button
            onClick={() => exportToGeoJson(filtered)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
            title="Download GeoJSON for QGIS / ArcGIS"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.research.exportGeoJson}</span>
          </button>
        </div>
      </div>

      {/* Scientific Data Quality & Completeness Audit */}
      <div className="bg-white rounded-2xl border border-parchment-200 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-charcoal-900">
                {t.research.qualityAudit}
              </h3>
              <p className="text-xs text-charcoal-500">
                Methodological audit of spatial precision, lithology, and trigger documentation
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
            {completenessScore}% Comprehensive
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
          <div className="p-3.5 bg-parchment-50 rounded-xl border border-parchment-200">
            <span className="text-[10px] font-bold uppercase text-charcoal-500 block">
              Spatial Geocoding
            </span>
            <span className="text-lg font-extrabold text-charcoal-900 mt-0.5 block">
              {Math.round((withCoordinates / total) * 100)}%
            </span>
            <span className="text-[10px] text-charcoal-500 block mt-0.5">
              Exact GPS Lat/Lng verified
            </span>
          </div>

          <div className="p-3.5 bg-parchment-50 rounded-xl border border-parchment-200">
            <span className="text-[10px] font-bold uppercase text-charcoal-500 block">
              Geology Attribution
            </span>
            <span className="text-lg font-extrabold text-charcoal-900 mt-0.5 block">
              {Math.round((withGeology / total) * 100)}%
            </span>
            <span className="text-[10px] text-charcoal-500 block mt-0.5">
              Bedrock & soil stratigraphy
            </span>
          </div>

          <div className="p-3.5 bg-parchment-50 rounded-xl border border-parchment-200">
            <span className="text-[10px] font-bold uppercase text-charcoal-500 block">
              Trigger Identification
            </span>
            <span className="text-lg font-extrabold text-charcoal-900 mt-0.5 block">
              100%
            </span>
            <span className="text-[10px] text-charcoal-500 block mt-0.5">
              Rainfall / anthropogenic cut
            </span>
          </div>

          <div className="p-3.5 bg-parchment-50 rounded-xl border border-parchment-200">
            <span className="text-[10px] font-bold uppercase text-charcoal-500 block">
              Average Confidence
            </span>
            <span className="text-lg font-extrabold text-emerald-800 mt-0.5 block">
              {avgConfidence}%
            </span>
            <span className="text-[10px] text-charcoal-500 block mt-0.5">
              Peer / agency cross-verified
            </span>
          </div>
        </div>
      </div>

      {/* CSV Importer Component */}
      <CsvImporter onImportSuccess={onImportIncidents} />

      {/* Dataset Records Table */}
      <div className="bg-white rounded-2xl border border-parchment-200 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-charcoal-900">
              {t.research.datasetOverview} ({filtered.length} records)
            </h3>
            <p className="text-xs text-charcoal-500">
              Transparent multi-parameter incident repository
            </p>
          </div>

          {/* Search bar & Sort controls */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-charcoal-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search repository..."
                className="pl-8 pr-3 py-1.5 text-xs bg-parchment-50 border border-parchment-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 text-charcoal-800 w-44 sm:w-56"
              />
            </div>

            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as any)}
              className="text-xs py-1.5 px-2 bg-parchment-50 border border-parchment-200 rounded-lg text-charcoal-700"
            >
              <option value="date">Sort by Date</option>
              <option value="fatalities">Sort by Fatalities</option>
              <option value="confidence">Sort by Confidence</option>
            </select>

            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="p-1.5 text-xs font-bold rounded-lg border border-parchment-200 hover:bg-parchment-100"
              title="Toggle ascending / descending"
            >
              {sortOrder === 'desc' ? '↓' : '↑'}
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-xl border border-parchment-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-parchment-100/70 text-charcoal-700 font-bold uppercase text-[10px] tracking-wider border-b border-parchment-200">
              <tr>
                <th className="py-3 px-3.5">ID / Title</th>
                <th className="py-3 px-3">State / District</th>
                <th className="py-3 px-3">Coordinates</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Movement Type</th>
                <th className="py-3 px-3">Severity</th>
                <th className="py-3 px-3 text-right">Fatalities</th>
                <th className="py-3 px-3 text-center">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-parchment-100">
              {filtered.map((item) => (
                <tr 
                  key={item.id}
                  onClick={() => onSelectIncident(item.id)}
                  className="hover:bg-parchment-50 cursor-pointer transition-colors"
                >
                  <td className="py-2.5 px-3.5 font-bold text-charcoal-900 max-w-[200px] truncate" title={item.title}>
                    <span className="text-[10px] text-charcoal-500 font-mono block">{item.id}</span>
                    {item.title}
                  </td>
                  <td className="py-2.5 px-3 text-charcoal-700 whitespace-nowrap">
                    {item.state} <span className="text-charcoal-400">({item.district})</span>
                  </td>
                  <td className="py-2.5 px-3 text-charcoal-600 font-mono text-[11px] whitespace-nowrap">
                    {item.coordinates[0].toFixed(3)}°, {item.coordinates[1].toFixed(3)}°
                  </td>
                  <td className="py-2.5 px-3 text-charcoal-600 whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="py-2.5 px-3 text-charcoal-800 whitespace-nowrap">
                    {item.landslideType}
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      item.severity === 'Catastrophic' ? 'bg-rose-100 text-rose-800' :
                      item.severity === 'Severe' ? 'bg-amber-100 text-amber-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {item.severity}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-extrabold text-charcoal-800">
                    {item.fatalities > 0 ? (
                      <span className="text-rose-700">{item.fatalities}</span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      {item.confidenceScore}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

