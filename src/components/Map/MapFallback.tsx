import React from 'react';
import { AlertCircle, MapPin, ExternalLink, RefreshCw } from 'lucide-react';
import { LandslideIncident } from '../../types';

interface MapFallbackProps {
  incidents: LandslideIncident[];
  onSelectIncident: (incident: LandslideIncident) => void;
  onRetry: () => void;
}

export const MapFallback: React.FC<MapFallbackProps> = ({
  incidents,
  onSelectIncident,
  onRetry
}) => {
  return (
    <div className="w-full h-full min-h-[500px] bg-parchment-100/80 rounded-2xl border border-parchment-300 p-6 flex flex-col justify-between">
      <div className="max-w-2xl mx-auto text-center py-6">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-3 shadow-inner">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-charcoal-900">
          Geospatial Map Offline / Fallback Mode
        </h3>
        <p className="text-xs text-charcoal-600 mt-1.5 max-w-md mx-auto">
          Tile streaming is unavailable or offline. All incident telemetry and coordinates remain fully accessible below.
        </p>
        <button
          onClick={onRetry}
          className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reload Map Tiles</span>
        </button>
      </div>

      {/* Grid of incidents */}
      <div className="flex-1 overflow-y-auto max-h-[380px] space-y-2 pr-1">
        {incidents.map((inc) => (
          <div
            key={inc.id}
            onClick={() => onSelectIncident(inc)}
            className="p-3 bg-white rounded-xl border border-parchment-200 hover:border-emerald-600 flex items-center justify-between cursor-pointer transition-all hover:bg-parchment-50"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                  inc.severity === 'Catastrophic' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {inc.severity}
                </span>
                <span className="text-xs font-semibold text-charcoal-800">
                  {inc.title}
                </span>
              </div>
              <p className="text-[11px] text-charcoal-500 mt-0.5">
                📍 {inc.coordinates[0].toFixed(4)}°N, {inc.coordinates[1].toFixed(4)}°E • {inc.district}, {inc.state}
              </p>
            </div>
            <button className="text-xs font-semibold text-emerald-800 flex items-center gap-1">
              Inspect <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

