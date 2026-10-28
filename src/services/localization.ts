import { SupportedLanguage } from '../types';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  nav: {
    dashboard: string;
    map: string;
    safety: string;
    report: string;
    research: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    verifiedIncidents: string;
    totalLivesLost: string;
    highRiskZones: string;
    activeWarnings: string;
    monsoonTrend: string;
    regionalBreakdown: string;
    recentEvents: string;
    viewAll: string;
    disclaimerBanner: string;
  };
  map: {
    title: string;
    subtitle: string;
    filterRegion: string;
    filterStatus: string;
    filterSeverity: string;
    searchPlaceholder: string;
    toggleZones: string;
    locateMe: string;
    layers: string;
    incidentDetails: string;
    fatalities: string;
    trigger: string;
    geology: string;
    source: string;
    date: string;
    status: string;
  };
  safety: {
    title: string;
    subtitle: string;
    warningSignsTitle: string;
    evacuationTitle: string;
    travelPrecautionsTitle: string;
    emergencyKitTitle: string;
    helplinesTitle: string;
    offlineReadyNotice: string;
  };
  report: {
    title: string;
    subtitle: string;
    incidentTitle: string;
    location: string;
    district: string;
    state: string;
    landslideType: string;
    severity: string;
    triggerObserved: string;
    roadAffected: string;
    description: string;
    photoUpload: string;
    submitReport: string;
    demoNotice: string;
  };
  research: {
    title: string;
    subtitle: string;
    datasetOverview: string;
    exportCsv: string;
    exportGeoJson: string;
    importCsv: string;
    temporalAnalysis: string;
    qualityAudit: string;
    precisionScore: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    appName: 'LandLife',
    tagline: "India's Landslide Intelligence & Safety Network",
    nav: {
      dashboard: 'Dashboard',
      map: 'Hazard Map',
      safety: 'Safety Center',
      report: 'Report Incident',
      research: 'Research Lab'
    },
    dashboard: {
      title: 'National Landslide Intelligence',
      subtitle: 'Verified incident telemetry, regional susceptibility mapping, and safety intelligence across vulnerable Indian terrains.',
      verifiedIncidents: 'Documented Incidents',
      totalLivesLost: 'Fatalities Recorded',
      highRiskZones: 'Critical Hazard Zones',
      activeWarnings: 'Official Alerts & Watches',
      monsoonTrend: 'Monsoon Hazard Temporal Curve',
      regionalBreakdown: 'Incidents by Geological Region',
      recentEvents: 'Verified Major Ground Movements',
      viewAll: 'Inspect on Map',
      disclaimerBanner: 'Official Warning / Research Integrity: LandLife aggregates verified GSI, NDMA, and open research inventories. Live alerts reflect issued advisories and simulated demos are clearly tagged.'
    },
    map: {
      title: 'Interactive Landslide & Hazard Map',
      subtitle: 'Filter by geological zone, verification status, date, or severity. Toggle GSI National Landslide Susceptibility zones.',
      filterRegion: 'Filter Region',
      filterStatus: 'Status Category',
      filterSeverity: 'Severity',
      searchPlaceholder: 'Search by location, district, highway...',
      toggleZones: 'Susceptibility Zones',
      locateMe: 'Find My Location',
      layers: 'Map Layers',
      incidentDetails: 'Incident Details',
      fatalities: 'Fatalities Recorded',
      trigger: 'Trigger Factor',
      geology: 'Geological Context',
      source: 'Data Source',
      date: 'Incident Date',
      status: 'Status'
    },
    safety: {
      title: 'Landslide Safety & Survival Center',
      subtitle: 'Critical warning signs, life-saving evacuation protocols, monsoon travel advice, and interactive emergency checklists.',
      warningSignsTitle: 'Early Physical Warning Signs',
      evacuationTitle: 'Evacuation Protocol & Action Plan',
      travelPrecautionsTitle: 'Monsoon Ghat & Mountain Travel',
      emergencyKitTitle: 'Emergency Go-Bag Checklist',
      helplinesTitle: 'National & State Disaster Helplines',
      offlineReadyNotice: 'Offline Capable: All safety protocols and checklists on this page are stored locally in your browser for immediate emergency reference during connectivity loss.'
    },
    report: {
      title: 'Report a Landslide or Slope Movement',
      subtitle: 'Crowdsource ground observations, road obstructions, or tension cracks to build community hazard awareness.',
      incidentTitle: 'Incident or Hazard Summary',
      location: 'Specific Landmark / Village / KM Marker',
      district: 'District',
      state: 'State',
      landslideType: 'Type of Movement',
      severity: 'Estimated Severity',
      triggerObserved: 'Probable Trigger (e.g. Incessant Rain, Road Cut)',
      roadAffected: 'Road / Highway Affected',
      description: 'Detailed Observations & Safety Concerns',
      photoUpload: 'Attach On-site Photo (Optional)',
      submitReport: 'Save Community Report',
      demoNotice: 'COMMUNITY OBSERVATION NOTICE: Reports submitted here are stored locally in your browser and labeled as UNVERIFIED COMMUNITY REPORTS. They are NOT automatically sent to emergency services. In case of an ongoing disaster or danger to life, dial 112 immediately.'
    },
    research: {
      title: 'Scientific Data Explorer & Research Lab',
      subtitle: 'Access structured landslide records, validate dataset completeness, import custom field surveys, and export GIS-ready datasets.',
      datasetOverview: 'Inventory Overview & Attributes',
      exportCsv: 'Export Clean CSV',
      exportGeoJson: 'Export GeoJSON (GIS)',
      importCsv: 'Import Field Survey CSV',
      temporalAnalysis: 'Temporal Distribution & Triggers',
      qualityAudit: 'Scientific Data Quality & Verification Audit',
      precisionScore: 'Geospatial Precision Score'
    }
  },
  hi: {
    appName: 'LandLife',
    tagline: 'भारत का भूस्खलन आसूचना एवं सुरक्षा नेटवर्क',
    nav: {
      dashboard: 'डैशबोर्ड',
      map: 'खतरा मानचित्र',
      safety: 'सुरक्षा केंद्र',
      report: 'घटना रिपोर्ट करें',
      research: 'शोध प्रयोगशाला'
    },
    dashboard: {
      title: 'राष्ट्रीय भूस्खलन आसूचना',
      subtitle: 'भारत के संवेदनशील क्षेत्रों में सत्यापित घटनाओं, क्षेत्रीय संवेदनशीलता और सुरक्षा जानकारी का व्यापक विश्लेषण।',
      verifiedIncidents: 'सत्यापित घटनाएं',
      totalLivesLost: 'दर्ज जनहानि',
      highRiskZones: 'अति संवेदनशील क्षेत्र',
      activeWarnings: 'आधिकारिक चेतावनी व निगरानी',
      monsoonTrend: 'मानसून भूस्खलन आवृत्ति ग्राफ',
      regionalBreakdown: 'भूवैज्ञानिक क्षेत्रवार घटनाएं',
      recentEvents: 'हाल की प्रमुख घटनाएं',
      viewAll: 'मानचित्र पर देखें',
      disclaimerBanner: 'अस्वीकरण: LandLife भारतीय भूवैज्ञानिक सर्वेक्षण (GSI), NDMA तथा शोध आंकड़ों को संकलित करता है। डेमो चेतावनी स्पष्ट रूप से चिह्नित हैं।'
    },
    map: {
      title: 'इंटरएक्टिव भूस्खलन मानचित्र',
      subtitle: 'क्षेत्र, स्थिति, तिथि या तीव्रता के आधार पर फ़िल्टर करें। GSI संवेदनशीलता क्षेत्र चालू या बंद करें।',
      filterRegion: 'क्षेत्र चुनें',
      filterStatus: 'स्थिति श्रेणी',
      filterSeverity: 'तीव्रता',
      searchPlaceholder: 'स्थान, जिला या राजमार्ग खोजें...',
      toggleZones: 'संवेदनशीलता क्षेत्र',
      locateMe: 'मेरी स्थिति खोजें',
      layers: 'मानचित्र परतें',
      incidentDetails: 'घटना विवरण',
      fatalities: 'जनहानि',
      trigger: 'कारण/ट्रिगर',
      geology: 'भूवैज्ञानिक स्थिति',
      source: 'डेटा स्रोत',
      date: 'घटना तिथि',
      status: 'स्थिति'
    },
    safety: {
      title: 'भूस्खलन सुरक्षा एवं आपदा तैयारी केंद्र',
      subtitle: 'प्रारंभिक चेतावनी संकेत, जीवनरक्षक निकासी नियम, मानसूनी यात्रा निर्देश तथा इंटरएक्टिव आपातकालीन चेकलिस्ट।',
      warningSignsTitle: 'प्रारंभिक चेतावनी संकेत',
      evacuationTitle: 'सुरक्षित निकासी एवं आपातकालीन योजना',
      travelPrecautionsTitle: 'मानसून में पहाड़ी और घाट यात्रा सावधानियां',
      emergencyKitTitle: 'आपातकालीन बैग चेकलिस्ट',
      helplinesTitle: 'राष्ट्रीय एवं राज्य आपदा हेल्पलाइन',
      offlineReadyNotice: 'ऑफ़लाइन तैयार: इंटरनेट न होने पर भी सभी सुरक्षा नियम आपके डिवाइस पर उपलब्ध रहते हैं।'
    },
    report: {
      title: 'भूस्खलन या दरार की रिपोर्ट करें',
      subtitle: 'समुदाय को सतर्क रखने हेतु मार्ग अवरोध, मिट्टी खिसकने या ज़मीनी दरारों की जानकारी दर्ज करें।',
      incidentTitle: 'घटना का संक्षिप्त शीर्षक',
      location: 'विशिष्ट स्थान / गांव / किमी का पत्थर',
      district: 'जिला',
      state: 'राज्य',
      landslideType: 'खिसकाव का प्रकार',
      severity: 'अनुमानित गंभीरता',
      triggerObserved: 'संभावित कारण (उदा. भारी वर्षा)',
      roadAffected: 'प्रभावित मार्ग या राजमार्ग',
      description: 'विस्तृत विवरण एवं सुरक्षा टिप्पणियां',
      photoUpload: 'फ़ोटो जोड़ें (वैकल्पिक)',
      submitReport: 'रिपोर्ट सुरक्षित करें',
      demoNotice: 'महत्वपूर्ण सूचना: यह रिपोर्ट आपके ब्राउज़र में सुरक्षित की जाती है। यह आपातकालीन सेवाओं को सीधे प्रेषित नहीं होती। जीवन रक्षा हेतु तुरंत 112 पर कॉल करें।'
    },
    research: {
      title: 'वैज्ञानिक डेटा प्रयोगशाला',
      subtitle: 'भूस्खलन डेटा का अन्वेषण, जीआईएस फ़ाइलें (CSV/GeoJSON) निर्यात और नई सर्वेक्षण फाइलों का आयात करें।',
      datasetOverview: 'डेटाबेस अवलोकन',
      exportCsv: 'CSV निर्यात करें',
      exportGeoJson: 'GeoJSON निर्यात करें',
      importCsv: 'सर्वेक्षण CSV आयात करें',
      temporalAnalysis: 'समयबद्ध विश्लेषण एवं ट्रिगर्स',
      qualityAudit: 'डेटा गुणवत्ता एवं सटीकता समीक्षा',
      precisionScore: 'स्थानिक सटीकता स्कोर'
    }
  },
  bn: {
    appName: 'LandLife',
    tagline: "ভারতের ভূমিধস গোয়েন্দা ও নিরাপত্তা নেটওয়ার্ক",
    nav: {
      dashboard: 'ড্যাশবোর্ড',
      map: 'মানচিত্র',
      safety: 'নিরাপত্তা কেন্দ্র',
      report: 'রিপোর্ট করুন',
      research: 'গবেষণাগার'
    },
    dashboard: {
      title: 'জাতীয় ভূমিধস তথ্য ও পূর্বাভাস',
      subtitle: 'ভারতের ঝুঁকিপূর্ণ পার্বত্য অঞ্চলের ভূতাত্ত্বিক তথ্য ও জরুরি নিরাপত্তা নির্দেশনা।',
      verifiedIncidents: 'নথিভুক্ত দুর্ঘটনা',
      totalLivesLost: 'প্রাণহানি',
      highRiskZones: 'উচ্চ ঝুঁকিপূর্ণ অঞ্চল',
      activeWarnings: 'সরকারি সতর্কতা',
      monsoonTrend: 'বর্ষাকালীন ভূমিধসের গ্রাফ',
      regionalBreakdown: 'অঞ্চলভিত্তিক বিশ্লেষণ',
      recentEvents: 'সাম্প্রতিক ভূমিধস',
      viewAll: 'ম্যাপে দেখুন',
      disclaimerBanner: 'সতর্কতা: LandLife শুধুমাত্র জিএসআই (GSI) ও এনডিএমএ (NDMA) এর যাচাইকৃত তথ্য উপস্থাপন করে।'
    },
    map: {
      title: 'ইন্টারেক্টিভ ভূমিধস মানচিত্র',
      subtitle: 'অঞ্চল, স্থিতি ও তীব্রতা অনুযায়ী ফিল্টার করুন।',
      filterRegion: 'অঞ্চল নির্বাচন',
      filterStatus: 'স্থিতি',
      filterSeverity: 'তীব্রতা',
      searchPlaceholder: 'স্থান, জেলা বা মহাসড়ক খুঁজুন...',
      toggleZones: 'ঝুঁকিপূর্ণ জোন',
      locateMe: 'আমার অবস্থান',
      layers: 'ম্যাপ লেয়ার',
      incidentDetails: 'ঘটনার বিস্তারিত',
      fatalities: 'প্রাণহানি',
      trigger: 'মূল কারণ',
      geology: 'ভূতাত্ত্বিক বিবরণ',
      source: 'তথ্যসূত্র',
      date: 'তারিখ',
      status: 'অবস্থা'
    },
    safety: {
      title: 'ভূমিধস নিরাপত্তা ও প্রস্তুতি কেন্দ্র',
      subtitle: 'বিপদ সংকেত, জরুরি স্থানান্তর নির্দেশিকা এবং পার্বত্য ভ্রমণের নিরাপত্তা নিয়ম।',
      warningSignsTitle: 'পূর্বাভাস ও বিপদ সংকেত',
      evacuationTitle: 'নিরাপদ স্থানান্তর পরিকল্পনা',
      travelPrecautionsTitle: 'বর্ষায় পাহাড়ে ভ্রমণের সতর্কতা',
      emergencyKitTitle: 'জরুরি কিট চেকলিস্ট',
      helplinesTitle: 'জরুরি হেল্পলাইন নম্বর',
      offlineReadyNotice: 'অফলাইন মোড: ইন্টারনেট সংযোগ বিচ্ছিন্ন হলেও সমস্ত তথ্য তাৎক্ষণিকভাবে প্রদর্শিত হবে।'
    },
    report: {
      title: 'ভূমিধসের তথ্য রিপোর্ট করুন',
      subtitle: 'রাস্তা বন্ধ বা পাহাড়ের ফাটল সম্পর্কে স্থানীয়দের সচেতন করতে রিপোর্ট যোগ করুন।',
      incidentTitle: 'ঘটনার শিরোনাম',
      location: 'স্থানের নাম / কিমি মার্কার',
      district: 'জেলা',
      state: 'রাজ্য',
      landslideType: 'ভূমিধসের ধরন',
      severity: 'তীব্রতা',
      triggerObserved: 'সম্ভাব্য কারণ',
      roadAffected: 'আক্রান্ত রাস্তা',
      description: 'বিস্তারিত পর্যবেক্ষণ',
      photoUpload: 'ছবি আপলোড করুন',
      submitReport: 'রিপোর্ট সেভ করুন',
      demoNotice: 'সতর্কবার্তা: এই রিপোর্টটি আপনার ডিভাইসে সেভ হয়। জরুরি পরিস্থিতিতে অনুগ্রহ করে ১১২ (112) নম্বরে ডায়াল করুন।'
    },
    research: {
      title: 'গবেষণা ও বৈজ্ঞানিক তথ্য বিশ্লেষণ',
      subtitle: 'ভূমিধস সংক্রান্ত পরিসংখ্যান বিশ্লেষণ, CSV/GeoJSON এক্সপোর্ট ও কাস্টম ফিল্ড ডাটা ইমপোর্ট করুন।',
      datasetOverview: 'উপাত্ত পর্যালোচনা',
      exportCsv: 'CSV ডাউনলোড',
      exportGeoJson: 'GeoJSON ডাউনলোড',
      importCsv: 'CSV ফাইল আপলোড',
      temporalAnalysis: 'সময়ভিত্তিক বিশ্লেষণ',
      qualityAudit: 'ডেটা কোয়ালিটি নিরীক্ষা',
      precisionScore: 'ভৌগোলিক নির্ভুলতা'
    }
  },
  ml: {
    appName: 'LandLife',
    tagline: 'ഇന്ത്യയുടെ ഉരുൾപൊട്ടൽ വിവര & സുരക്ഷാ ശൃംഖല',
    nav: {
      dashboard: 'ഡാഷ്‌ബോർഡ്',
      map: 'മാപ്പ്',
      safety: 'സുരക്ഷാ കേന്ദ്രം',
      report: 'റിപ്പോർട്ട് ചെയ്യുക',
      research: 'ഗവേഷണ ശാല'
    },
    dashboard: {
      title: 'ദേശീയ ഉരുൾപൊട്ടൽ വിവരകേന്ദ്രം',
      subtitle: 'പശ്ചിമഘട്ടവും ഹിമാലയവും ഉൾപ്പെടെയുള്ള പ്രദേശങ്ങളിലെ ഉരുൾപൊട്ടൽ വിവരങ്ങളും ഔദ്യോഗിക സുരക്ഷാ നിർദ്ദേശങ്ങളും.',
      verifiedIncidents: 'രേഖപ്പെടുത്തിയ ദുരന്തങ്ങൾ',
      totalLivesLost: 'മരണങ്ങൾ',
      highRiskZones: 'അതീവ അപകട സാധ്യത മേഖലകൾ',
      activeWarnings: 'ഔദ്യോഗിക മുന്നറിയിപ്പുകൾ',
      monsoonTrend: 'മൺസൂൺ ദുരന്ത കാലഘട്ടം',
      regionalBreakdown: 'മേഖലാടിസ്ഥാനത്തിലുള്ള കണക്ക്',
      recentEvents: 'പ്രധാന ഉരുൾപൊട്ടലുകൾ',
      viewAll: 'മാപ്പിൽ കാണുക',
      disclaimerBanner: 'ശ്രദ്ധിക്കുക: LandLife ലഭ്യമാക്കുന്നത് ജിയോളജിക്കൽ സർവേ ഓഫ് ഇന്ത്യ (GSI), NDMA എന്നിവയുടെ അംഗീകൃത വിവരങ്ങളാണ്.'
    },
    map: {
      title: 'ഉരുൾപൊട്ടൽ വിവര മാപ്പ്',
      subtitle: 'പ്രദേശം, തീയതി, തീവ്രത എന്നിവ അനുസരിച്ച് തിരയുക. അതീവ അപകട മേഖലകൾ കാണുക.',
      filterRegion: 'മേഖല തിരഞ്ഞെടുക്കുക',
      filterStatus: 'വിഭാഗം',
      filterSeverity: 'തീവ്രത',
      searchPlaceholder: 'സ്ഥലം, ജില്ല, റോഡ് തിരയുക...',
      toggleZones: 'അപകട സാധ്യത മേഖലകൾ',
      locateMe: 'എന്റെ സ്ഥാനം',
      layers: 'മാപ്പ് ലെയറുകൾ',
      incidentDetails: 'വിശദവിവരങ്ങൾ',
      fatalities: 'മരണങ്ങൾ',
      trigger: 'പ്രധാന കാരണം',
      geology: 'ഭൂമിശാസ്ത്ര വിവരങ്ങൾ',
      source: 'ഡാറ്റ ഉറവിടം',
      date: 'തീയതി',
      status: 'നിലവിലെ അവസ്ഥ'
    },
    safety: {
      title: 'ഉരുൾപൊട്ടൽ സുരക്ഷാ കേന്ദ്രം',
      subtitle: 'മുന്നറിയിപ്പ് ലക്ഷണങ്ങൾ, അടിയന്തര ഒഴിപ്പിക്കൽ മാർഗ്ഗരേഖകൾ, ചുരം റോഡ് യാത്ര നിർദ്ദേശങ്ങൾ.',
      warningSignsTitle: 'മുൻകരുതൽ ലക്ഷണങ്ങൾ',
      evacuationTitle: 'സുരക്ഷിതമായി ഒഴിഞ്ഞുമാറൽ',
      travelPrecautionsTitle: 'മൺസൂൺ മലയോര യാത്ര നിർദ്ദേശങ്ങൾ',
      emergencyKitTitle: 'എമർജൻസി കിറ്റ് ചെക്ക്‌ലിസ്റ്റ്',
      helplinesTitle: 'അടിയന്തര ഹെൽപ്പ് ലൈൻ നമ്പരുകൾ',
      offlineReadyNotice: 'ഓഫ്‌ലൈൻ സൗകര്യം: ഇന്റർനെറ്റ് ഇല്ലെങ്കിലും ഈ പേജിലെ എല്ലാ സുരക്ഷാ വിവരങ്ങളും ലഭ്യമാകും.'
    },
    report: {
      title: 'ഉരുൾപൊട്ടൽ അല്ലെങ്കിൽ വിള്ളൽ റിപ്പോർട്ട് ചെയ്യുക',
      subtitle: 'റോഡ് തടസ്സങ്ങൾ, മലയിടിച്ചിൽ ലക്ഷണങ്ങൾ എന്നിവ മറ്റുള്ളവരുടെ ശ്രദ്ധയിൽപ്പെടുത്താൻ പങ്കുവെക്കുക.',
      incidentTitle: 'സംഭവത്തിന്റെ പേര്',
      location: 'സ്ഥലം / റോഡ് / മൈൽക്കുറ്റി',
      district: 'ജില്ല',
      state: 'സംസ്ഥാനം',
      landslideType: 'ദുരന്ത സ്വഭാവം',
      severity: 'തീവ്രത',
      triggerObserved: 'സാധ്യമായ കാരണം (അതിതീവ്ര മഴ)',
      roadAffected: 'തടസ്സപ്പെട്ട റോഡ്',
      description: 'വിശദവിവരങ്ങൾ',
      photoUpload: 'ഫോട്ടോ ചേർക്കുക (ഓപ്ഷണൽ)',
      submitReport: 'റിപ്പോർട്ട് രേഖപ്പെടുത്തുക',
      demoNotice: 'ശ്രദ്ധിക്കുക: ഈ വിവരങ്ങൾ നിങ്ങളുടെ ബ്രൗസറിലാണ് സൂക്ഷിക്കുന്നത്. ഇത് രക്ഷാസേനക്ക് നേരിട്ട് കൈമാറുന്നില്ല. അടിയന്തര സഹായത്തിന് 112 വിളിക്കുക.'
    },
    research: {
      title: 'ശാസ്ത്രീയ ഡാറ്റാ ഗവേഷണ ശാല',
      subtitle: 'ഭൂമിശാസ്ത്ര വിവരങ്ങൾ വിശകലനം ചെയ്യുക, CSV/GeoJSON ഫയലുകൾ ഡൗൺലോഡ് ചെയ്യുക, ഫീൽഡ് സർവേകൾ ഉൾപ്പെടുത്തുക.',
      datasetOverview: 'വിവര ശേഖരം',
      exportCsv: 'CSV എക്സ്പോർട്ട്',
      exportGeoJson: 'GeoJSON എക്സ്പോർട്ട്',
      importCsv: 'CSV ഫയൽ ചേർക്കുക',
      temporalAnalysis: 'കാലിക വിശകലനം',
      qualityAudit: 'ഡാറ്റാ കൃത്യതാ പരിശോധന',
      precisionScore: 'ഭൗമ കൃത്യതാ സ്കോർ'
    }
  }
};
