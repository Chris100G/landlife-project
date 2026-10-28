import React, { useState } from 'react';
import { 
  Send, 
  MapPin, 
  Camera, 
  AlertTriangle, 
  Crosshair, 
  CheckCircle2, 
  ShieldAlert, 
  X,
  Info
} from 'lucide-react';
import { LandslideType, SeverityLevel, NewIncidentSubmission, SupportedLanguage } from '../../types';
import { TRANSLATIONS } from '../../services/localization';

interface IncidentReportFormProps {
  currentLang: SupportedLanguage;
  onSubmit: (submission: NewIncidentSubmission) => void;
  onSuccessNavigateToMap: () => void;
}

const INDIAN_STATES = [
  'Kerala',
  'Uttarakhand',
  'Himachal Pradesh',
  'Maharashtra',
  'Karnataka',
  'Tamil Nadu',
  'West Bengal',
  'Sikkim',
  'Assam',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Arunachal Pradesh',
  'Jammu & Kashmir',
  'Ladakh',
  'Goa',
  'Other'
];

export const IncidentReportForm: React.FC<IncidentReportFormProps> = ({
  currentLang,
  onSubmit,
  onSuccessNavigateToMap
}) => {
  const t = TRANSLATIONS[currentLang];

  const [title, setTitle] = useState('');
  const [state, setState] = useState('Kerala');
  const [district, setDistrict] = useState('');
  const [location, setLocation] = useState('');
  const [lat, setLat] = useState('11.5360');
  const [lng, setLng] = useState('76.1650');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [landslideType, setLandslideType] = useState<LandslideType>('Debris Flow');
  const [severity, setSeverity] = useState<SeverityLevel>('Moderate');
  const [trigger, setTrigger] = useState('');
  const [roadBlocked, setRoadBlocked] = useState('');
  const [description, setDescription] = useState('');
  const [reporterContact, setReporterContact] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [isLocating, setIsLocating] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle GPS detection
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude.toFixed(5));
        setLng(pos.coords.longitude.toFixed(5));
        setIsLocating(false);
      },
      (err) => {
        setIsLocating(false);
        alert('Could not detect location. Please check browser permissions or type coordinates manually.');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Handle Image Upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      alert('Photo size exceeds 4MB. Please choose a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!title.trim() || !location.trim() || !district.trim() || !description.trim()) {
      setErrorMessage('Please fill in all mandatory fields (Title, Landmark/Location, District, and Description).');
      return;
    }

    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);

    if (isNaN(parsedLat) || isNaN(parsedLng) || parsedLat < 6 || parsedLat > 38 || parsedLng < 68 || parsedLng > 98) {
      setErrorMessage('Please enter valid GPS coordinates within India (Lat: 6-38°N, Lng: 68-98°E).');
      return;
    }

    const newReport: NewIncidentSubmission = {
      title: title.trim(),
      location: location.trim(),
      district: district.trim(),
      state,
      coordinates: [parsedLat, parsedLng],
      date,
      landslideType,
      severity,
      trigger: trigger.trim() || 'Heavy monsoon rainfall',
      roadBlocked: roadBlocked.trim(),
      description: description.trim(),
      reporterContact: reporterContact.trim(),
      imageDataUrl: imagePreview || undefined
    };

    onSubmit(newReport);
    setShowSuccessModal(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-[#0e261b] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-forest-700/50">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-semibold mb-2">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Crowdsourced Ground Observation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-parchment-50">
          {t.report.title}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-forest-100/80">
          {t.report.subtitle}
        </p>
      </div>

      {/* Strict Ethical & Life-Safety Disclaimer */}
      <div className="p-4 sm:p-5 bg-rose-50 border-2 border-rose-300 rounded-2xl flex items-start gap-3.5 text-xs text-rose-950 leading-relaxed shadow-sm">
        <ShieldAlert className="w-6 h-6 text-rose-700 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-extrabold text-rose-900 text-sm mb-1 uppercase tracking-wide">
            Emergency & Disclaimer Notice
          </h4>
          <p>{t.report.demoNotice}</p>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-parchment-200 p-5 sm:p-7 shadow-sm space-y-5">
        {errorMessage && (
          <div className="p-3 bg-rose-100 border border-rose-300 text-rose-800 rounded-xl text-xs font-medium">
            {errorMessage}
          </div>
        )}

        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-charcoal-700 mb-1">
            {t.report.incidentTitle} <span className="text-rose-600">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Major mudslide blocking NH-766 hairpin bend 4"
            className="w-full text-xs sm:text-sm px-3 py-2.5 bg-parchment-50 border border-parchment-200 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
          />
        </div>

        {/* State & District */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">
              {t.report.state} <span className="text-rose-600">*</span>
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2.5 bg-parchment-50 border border-parchment-200 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">
              {t.report.district} <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              required
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="e.g. Wayanad / Chamoli / Shimla"
              className="w-full text-xs sm:text-sm px-3 py-2.5 bg-parchment-50 border border-parchment-200 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
          </div>
        </div>

        {/* Specific Location Landmark */}
        <div>
          <label className="block text-xs font-bold text-charcoal-700 mb-1">
            {t.report.location} <span className="text-rose-600">*</span>
          </label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Near Meppadi tea factory, KM 42 on ghat road"
            className="w-full text-xs sm:text-sm px-3 py-2.5 bg-parchment-50 border border-parchment-200 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
          />
        </div>

        {/* Coordinates with GPS Detect */}
        <div className="p-3.5 bg-parchment-50 rounded-xl border border-parchment-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-charcoal-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-forest-700" /> Geospatial Coordinates
            </span>
            <button
              type="button"
              onClick={handleDetectLocation}
              disabled={isLocating}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 bg-white rounded-lg border border-parchment-300 text-forest-800 hover:bg-forest-50 transition-colors shadow-xs"
            >
              <Crosshair className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? 'Detecting...' : 'Use Current GPS'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-charcoal-500 mb-0.5">Latitude (°N)</label>
              <input
                type="number"
                step="any"
                required
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 bg-white border border-parchment-200 rounded-lg text-charcoal-800 font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] text-charcoal-500 mb-0.5">Longitude (°E)</label>
              <input
                type="number"
                step="any"
                required
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                className="w-full text-xs px-2.5 py-1.5 bg-white border border-parchment-200 rounded-lg text-charcoal-800 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Date, Category, Severity */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">
              Date Observed
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-parchment-50 border border-parchment-200 rounded-xl text-charcoal-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">
              {t.report.landslideType}
            </label>
            <select
              value={landslideType}
              onChange={(e) => setLandslideType(e.target.value as LandslideType)}
              className="w-full text-xs px-3 py-2 bg-parchment-50 border border-parchment-200 rounded-xl text-charcoal-900"
            >
              <option value="Debris Flow">Debris Flow / Mudslide</option>
              <option value="Rockfall">Rockfall / Falling Boulders</option>
              <option value="Rotational Slump">Rotational Slump</option>
              <option value="Slope Creep / Subsidence">Tension Cracks / Subsidence</option>
              <option value="Complex / Cascade">Complex Multi-Failure</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">
              {t.report.severity}
            </label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value as SeverityLevel)}
              className="w-full text-xs px-3 py-2 bg-parchment-50 border border-parchment-200 rounded-xl text-charcoal-900"
            >
              <option value="Minor">Minor (No blockage)</option>
              <option value="Moderate">Moderate (Single lane blocked)</option>
              <option value="Severe">Severe (Road severed)</option>
              <option value="Catastrophic">Catastrophic (Habitation hit)</option>
            </select>
          </div>
        </div>

        {/* Trigger and Road Affected */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">
              {t.report.triggerObserved}
            </label>
            <input
              type="text"
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              placeholder="e.g. Torrential rain past 6 hours, road cut"
              className="w-full text-xs px-3 py-2 bg-parchment-50 border border-parchment-200 rounded-xl text-charcoal-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">
              {t.report.roadAffected}
            </label>
            <input
              type="text"
              value={roadBlocked}
              onChange={(e) => setRoadBlocked(e.target.value)}
              placeholder="e.g. NH-766, Kozhikode-Kollegal"
              className="w-full text-xs px-3 py-2 bg-parchment-50 border border-parchment-200 rounded-xl text-charcoal-900"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-charcoal-700 mb-1">
            {t.report.description} <span className="text-rose-600">*</span>
          </label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what you saw: slope appearance, width of crack, water flow, endangered homes, or vehicle queues..."
            className="w-full text-xs px-3 py-2.5 bg-parchment-50 border border-parchment-200 rounded-xl text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white leading-relaxed"
          />
        </div>

        {/* Optional Photo Attachment */}
        <div>
          <label className="block text-xs font-bold text-charcoal-700 mb-1">
            {t.report.photoUpload}
          </label>
          <div className="flex items-center gap-3">
            <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-parchment-100 hover:bg-parchment-200 text-charcoal-700 text-xs font-semibold border border-parchment-300 transition-colors">
              <Camera className="w-4 h-4 text-emerald-800" />
              <span>Choose Photo (Max 4MB)</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {imagePreview && (
              <button
                type="button"
                onClick={() => setImagePreview(null)}
                className="text-xs text-rose-600 hover:underline flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Remove
              </button>
            )}
          </div>
          {imagePreview && (
            <div className="mt-2.5">
              <img
                src={imagePreview}
                alt="Upload preview"
                className="w-32 h-24 object-cover rounded-xl border border-parchment-300"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-forest-800 hover:bg-forest-700 text-white font-bold text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{t.report.submitReport}</span>
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-parchment-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-charcoal-900">
                Community Report Stored
              </h3>
              <p className="text-xs text-charcoal-600 mt-1.5 leading-relaxed">
                Your report has been saved locally and mapped under <strong>Unverified Community Observations</strong>.
              </p>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
              <strong>Reminder:</strong> This demo observation is stored on your device and is not forwarded to civil authorities. If anyone is in danger, call <strong>112</strong> now.
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  onSuccessNavigateToMap();
                }}
                className="flex-1 py-2.5 rounded-xl bg-forest-800 text-white text-xs font-bold hover:bg-forest-700 transition-colors"
              >
                View on Map
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setTitle('');
                  setLocation('');
                  setDescription('');
                  setImagePreview(null);
                }}
                className="px-4 py-2.5 rounded-xl border border-parchment-300 text-charcoal-700 text-xs font-semibold hover:bg-parchment-100"
              >
                Submit Another
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

