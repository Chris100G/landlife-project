import React from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Footprints, 
  Car, 
  PhoneCall, 
  Download, 
  Printer, 
  HelpCircle,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { SupportedLanguage } from '../../types';
import { TRANSLATIONS } from '../../services/localization';
import { EMERGENCY_CONTACTS } from '../../data/emergencyContacts';
import { Checklist } from './Checklist';

interface SafetyCenterProps {
  currentLang: SupportedLanguage;
}

export const SafetyCenter: React.FC<SafetyCenterProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  const handlePrint = () => {
    window.print();
  };

  const WARNING_SIGNS = [
    {
      title: 'Tension Cracks on Slopes & Pavement',
      desc: 'Fresh fissures or widening gaps appearing in road tar, concrete verandahs, or hillside retaining walls indicating tensile stress detachment.',
      severity: 'Critical Early Indicator'
    },
    {
      title: 'Tilting Utility Poles & Trees ("J-Curves")',
      desc: 'Trees, telephone poles, or boundary fences leaning progressively downhill due to plastic creep in the underlying soil mantle.',
      severity: 'Active Creep Phase'
    },
    {
      title: 'Sudden Creek Mud Surges & Volume Drop',
      desc: 'A hill stream abruptly turning dense brownish-muddy, or water levels suddenly dropping despite torrential rain (signaling an upstream debris dam).',
      severity: 'Imminent Flash Mudflow'
    },
    {
      title: 'Sticking Doors & Windows / Creaking Sounds',
      desc: 'Doors or window frames jamming in their casings as the foundation tilts, accompanied by rumbling subterranean vibrations or breaking tree roots.',
      severity: 'Structural Ground Flex'
    },
    {
      title: 'Bulging Ground at Slope Base (Toe Heave)',
      desc: 'Soil hummocks or upward bulging appearing near the bottom toe of an embankment or garden slope, signaling imminent shear rupture.',
      severity: 'Shear Failure Warning'
    }
  ];

  const EVACUATION_STEPS = [
    {
      step: '1',
      title: 'Recognize the Rumble & Evacuate Instantly',
      desc: 'A landslide moves at 15–50 km/h. Do not pause to salvage heavy household belongings. Grab your pre-packed Go-Bag and evacuate immediately.'
    },
    {
      step: '2',
      title: 'Move Perpendicular & Uphill to the Flow Path',
      desc: 'Never run straight downhill in the direction of the slide debris. Run sideways (perpendicular) toward stable ridges or elevated terrain.'
    },
    {
      step: '3',
      title: 'Avoid Valleys, Ravines & Stream Beds',
      desc: 'Debris flows concentrate and accelerate through natural gullies and drainage channels. Seek higher ground away from stream beds.'
    },
    {
      step: '4',
      title: 'If Trapped Indoors: Curl into a Tight Ball',
      desc: 'If escape is blocked, curl into a fetal position under a sturdy timber table or interior corner away from downslope windows, shielding your head.'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-[#0e261b] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-forest-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-semibold mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>National Disaster Preparedness Protocol</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-parchment-50">
            {t.safety.title}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-forest-100/80 max-w-2xl">
            {t.safety.subtitle}
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-parchment-50 border border-forest-600 text-xs font-semibold shadow-sm transition-all flex-shrink-0"
        >
          <Printer className="w-4 h-4 text-emerald-400" />
          <span>Print / Save Action Sheet</span>
        </button>
      </div>

      {/* Offline Ready Notice */}
      <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center gap-3 text-xs text-emerald-900 font-medium">
        <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
        <p>{t.safety.offlineReadyNotice}</p>
      </div>

      {/* Warning Signs Section */}
      <div className="bg-white rounded-2xl border border-parchment-200 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-amber-50 text-amber-700 rounded-lg">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-charcoal-900">
              {t.safety.warningSignsTitle}
            </h3>
            <p className="text-xs text-charcoal-500">
              Pre-failure geological cues observed 1 hour to 3 days prior to catastrophic slope failure
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {WARNING_SIGNS.map((item, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl border border-parchment-200 bg-parchment-50/50 hover:bg-parchment-50 transition-colors space-y-2"
            >
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 inline-block">
                {item.severity}
              </span>
              <h4 className="text-sm font-bold text-charcoal-900 leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Evacuation Protocol */}
      <div className="bg-white rounded-2xl border border-parchment-200 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg">
            <Footprints className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-charcoal-900">
              {t.safety.evacuationTitle}
            </h3>
            <p className="text-xs text-charcoal-500">
              Life-saving actions during intense cloudbursts or ground movement
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EVACUATION_STEPS.map((step) => (
            <div key={step.step} className="flex items-start gap-3.5 p-3.5 rounded-xl border border-parchment-200 bg-parchment-50/40">
              <span className="w-8 h-8 rounded-full bg-forest-800 text-parchment-50 font-extrabold text-sm flex items-center justify-center flex-shrink-0 shadow-sm">
                {step.step}
              </span>
              <div>
                <h4 className="text-sm font-bold text-charcoal-900">
                  {step.title}
                </h4>
                <p className="text-xs text-charcoal-600 mt-1 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monsoon Travel Precautions */}
      <div className="bg-white rounded-2xl border border-parchment-200 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-sky-50 text-sky-800 rounded-lg">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-charcoal-900">
              {t.safety.travelPrecautionsTitle}
            </h3>
            <p className="text-xs text-charcoal-500">
              Essential precautions for Western Ghats passes & Himalayan pilgrimage highways
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-parchment-200 bg-parchment-50/50 space-y-1.5">
            <h4 className="font-bold text-charcoal-900 flex items-center gap-1.5">
              <span>🚫 Strict Night Travel Ban</span>
            </h4>
            <p className="text-charcoal-600 leading-relaxed">
              Never drive through ghat sections (Charmadi, Shiradi, Tamhini, Amboli, NH-58 Rishikesh-Joshimath) between 20:00 and 06:00 during Red or Orange alerts. Inability to see falling boulders is the leading cause of vehicle fatalities.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-parchment-200 bg-parchment-50/50 space-y-1.5">
            <h4 className="font-bold text-charcoal-900 flex items-center gap-1.5">
              <span>⚠️ Watch Road Shoulders & Culverts</span>
            </h4>
            <p className="text-charcoal-600 leading-relaxed">
              If water is overtopping the road or mud is spurting from retaining weep holes, stop immediately before the section. Do not attempt to cross flooded causeways or newly created debris berms.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-parchment-200 bg-parchment-50/50 space-y-1.5">
            <h4 className="font-bold text-charcoal-900 flex items-center gap-1.5">
              <span>📱 Verify State Traffic Advisory</span>
            </h4>
            <p className="text-charcoal-600 leading-relaxed">
              Before setting out on mountain trips, always cross-reference District Collector social feeds or dial the 1077 district helpline for live updates on landslide clearance bulldozers.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Checklist */}
      <Checklist />

      {/* Emergency Helplines Directory */}
      <div className="bg-white rounded-2xl border border-parchment-200 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-rose-50 text-rose-700 rounded-lg">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-charcoal-900">
              {t.safety.helplinesTitle}
            </h3>
            <p className="text-xs text-charcoal-500">
              Verified 24x7 control rooms for search, rescue, and evacuation dispatch
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {EMERGENCY_CONTACTS.map((c) => (
            <a
              key={c.number}
              href={`tel:${c.number.replace(/-/g, '')}`}
              className="p-3.5 rounded-xl border border-parchment-200 hover:border-emerald-600 bg-parchment-50/60 hover:bg-emerald-50/40 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-parchment-200 text-charcoal-700">
                    {c.scope} {c.state ? `• ${c.state}` : ''}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-charcoal-400 group-hover:text-emerald-700 transition-colors" />
                </div>
                <h4 className="text-xs font-bold text-charcoal-900 mt-2">
                  {c.title}
                </h4>
                <p className="text-[11px] text-charcoal-500 mt-0.5 line-clamp-2">
                  {c.description}
                </p>
              </div>
              <p className="text-base font-extrabold text-emerald-800 mt-3 group-hover:text-emerald-700 flex items-center gap-1">
                📞 {c.number}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

