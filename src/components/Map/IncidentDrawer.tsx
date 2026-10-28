import React from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  ShieldAlert, 
  Copy, 
  Check,
  Compass,
  Layers,
  Activity
} from 'lucide-react';
import { LandslideIncident } from '../../types';

interface IncidentDrawerProps {
  incident: LandslideIncident | null;
  onClose: () => void;
}

export const IncidentDrawer: React.FC<IncidentDrawerProps> = ({
  incident,
  onClose
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!incident) return null;

  const copyCoordinates = () => {
    navigator.clipboard.writeText(`${incident.coordinates[0]}, ${incident.coordinates[1]}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusConfig = {
    historical_verified: {
      label: 'Verified Historical Disaster',
      bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      icon: ShieldCheck
    },
    official_warning: {
      label: 'Official Warning / Live Watch',
      bg: 'bg-rose-100 text-rose-900 border-rose-300',
      icon: ShieldAlert
    },
    community_unverified: {
      label: 'Unverified Community Submission',
      bg: 'bg-purple-100 text-purple-900 border-purple-300',
      icon: AlertTriangle
    },
    environmental_observation: {
      label: 'Field Environmental Observation',
      bg: 'bg-blue-100 text-blue-900 border-blue-300',
      icon: Activity
    },
    susceptibility_estimate: {
      label: 'GSI Susceptibility Estimate',
      bg: 'bg-amber-100 text-amber-900 border-amber-300',
      icon: Layers
    }
  }[incident.status] || {
    label: 'Incident Record',
    bg: 'bg-gray-100 text-gray-800 border-gray-300',
    icon: FileText
  };

  const StatusIcon = statusConfig.icon;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-white shadow-2xl border-l border-parchment-200 flex flex-col transform transition-transform duration-300 ease-in-out">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-parchment-200 flex items-start justify-between bg-parchment-50">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${statusConfig.bg}`}>
              <StatusIcon className="w-3.5 h-3.5" />
              {statusConfig.label}
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-charcoal-900 leading-tight">
            {incident.title}
          </h2>
          <p className="text-xs text-charcoal-500 mt-0.5">
            {incident.district}, {incident.state}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-xl text-charcoal-400 hover:text-charcoal-800 hover:bg-parchment-200 transition-colors"
          title="Close drawer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {/* Status Callout if Community Unverified */}
        {incident.status === 'community_unverified' && (
          <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-900">
            <strong>Community Observation:</strong> This report was entered locally by an observer. It has not undergone formal GSI geotechnical verification.
          </div>
        )}

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 bg-parchment-50 rounded-xl border border-parchment-200">
            <span className="text-[10px] font-bold uppercase text-charcoal-500 block">
              Movement Type
            </span>
            <span className="text-xs font-bold text-charcoal-900 mt-0.5 block">
              {incident.landslideType}
            </span>
          </div>

          <div className="p-3 bg-parchment-50 rounded-xl border border-parchment-200">
            <span className="text-[10px] font-bold uppercase text-charcoal-500 block">
              Severity Level
            </span>
            <span className={`text-xs font-bold mt-0.5 block ${
              incident.severity === 'Catastrophic' ? 'text-rose-700' :
              incident.severity === 'Severe' ? 'text-amber-700' :
              'text-emerald-700'
            }`}>
              {incident.severity}
            </span>
          </div>

          <div className="p-3 bg-parchment-50 rounded-xl border border-parchment-200">
            <span className="text-[10px] font-bold uppercase text-charcoal-500 block">
              Incident Date
            </span>
            <span className="text-xs font-bold text-charcoal-900 mt-0.5 block">
              {incident.date}
            </span>
          </div>

          <div className="p-3 bg-parchment-50 rounded-xl border border-parchment-200">
            <span className="text-[10px] font-bold uppercase text-charcoal-500 block">
              Casualties
            </span>
            <span className="text-xs font-bold text-charcoal-900 mt-0.5 block">
              {incident.fatalities > 0 ? `${incident.fatalities} Fatalities` : 'None Reported'}
            </span>
          </div>
        </div>

        {/* Location & GPS */}
        <div className="p-3.5 bg-parchment-50 rounded-xl border border-parchment-200 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-charcoal-800 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-forest-700" /> Location Coordinates
            </span>
            <button
              onClick={copyCoordinates}
              className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy GPS'}
            </button>
          </div>
          <p className="text-xs text-charcoal-700 font-mono">
            {incident.coordinates[0].toFixed(5)}° N, {incident.coordinates[1].toFixed(5)}° E
            {incident.elevationMeters && ` • Alt: ${incident.elevationMeters}m MSL`}
          </p>
          <p className="text-xs text-charcoal-600">
            {incident.location}
          </p>
        </div>

        {/* Trigger Analysis */}
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-charcoal-700 uppercase tracking-wider">
            Primary Trigger Mechanism
          </h4>
          <p className="text-xs text-charcoal-800 bg-amber-50/50 p-2.5 rounded-lg border border-amber-200 leading-relaxed font-medium">
            {incident.trigger}
          </p>
        </div>

        {/* Geological Details */}
        {incident.geologyDetails && (
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-charcoal-700 uppercase tracking-wider">
              Geological Bedrock & Lithology
            </h4>
            <p className="text-xs text-charcoal-700 bg-parchment-50 p-2.5 rounded-lg border border-parchment-200 leading-relaxed">
              {incident.geologyDetails}
            </p>
          </div>
        )}

        {/* Road & Infrastructure Blockage */}
        {incident.roadBlocked && (
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-charcoal-700 uppercase tracking-wider">
              Highway / Transportation Impact
            </h4>
            <p className="text-xs text-charcoal-800 bg-rose-50/50 p-2.5 rounded-lg border border-rose-200 leading-relaxed">
              🚧 {incident.roadBlocked}
            </p>
          </div>
        )}

        {/* Narrative Description */}
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-charcoal-700 uppercase tracking-wider">
            Scientific Incident Dossier
          </h4>
          <p className="text-xs text-charcoal-700 leading-relaxed">
            {incident.description}
          </p>
        </div>

        {/* Optional Image */}
        {incident.imageUrl && (
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-charcoal-700 uppercase tracking-wider">
              Field Photograph
            </h4>
            <img 
              src={incident.imageUrl} 
              alt={incident.title} 
              className="w-full h-48 object-cover rounded-xl border border-parchment-200"
            />
          </div>
        )}

        {/* Safety Advisory */}
        {incident.safetyAdvisory && (
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
            <strong className="block font-bold text-emerald-900">
              Disaster Risk Reduction Advisory:
            </strong>
            <p className="leading-relaxed">
              {incident.safetyAdvisory}
            </p>
          </div>
        )}

        {/* Scientific Source Citation */}
        <div className="pt-3 border-t border-parchment-200 text-[11px] text-charcoal-500 space-y-0.5">
          <p>
            <strong className="text-charcoal-700">Source:</strong> {incident.source}
          </p>
          {incident.verifiedBy && (
            <p>
              <strong className="text-charcoal-700">Audit / Verification:</strong> {incident.verifiedBy}
            </p>
          )}
          <p>
            <strong className="text-charcoal-700">Data Confidence:</strong> {incident.confidenceScore}%
          </p>
        </div>
      </div>
    </div>
  );
};

