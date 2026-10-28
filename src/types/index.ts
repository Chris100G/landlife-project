export type IncidentStatus = 
  | 'historical_verified' 
  | 'official_warning' 
  | 'community_unverified' 
  | 'environmental_observation' 
  | 'susceptibility_estimate';

export type LandslideType = 
  | 'Debris Flow' 
  | 'Rockfall' 
  | 'Mudflow / Flash Mudslide' 
  | 'Rotational Slump' 
  | 'Translational Slide' 
  | 'Slope Creep / Subsidence' 
  | 'Complex / Cascade';

export type SeverityLevel = 'Minor' | 'Moderate' | 'Severe' | 'Catastrophic';

export type IndianRegion = 
  | 'All India'
  | 'Western Ghats' 
  | 'North-West Himalayas' 
  | 'Eastern Himalayas & North-East' 
  | 'Central India / Konkan' 
  | 'Eastern Ghats & Nilgiris';

export interface LandslideIncident {
  id: string;
  title: string;
  location: string;
  district: string;
  state: string;
  coordinates: [number, number]; // [lat, lng]
  elevationMeters?: number;
  date: string; // ISO date string
  status: IncidentStatus;
  landslideType: LandslideType;
  severity: SeverityLevel;
  fatalities: number;
  injured?: number;
  displaced?: number;
  economicDamageINR?: string;
  trigger: string; // e.g. "Continuous rainfall > 300mm / 24h", "Cloudburst", "Unplanned hill-cutting"
  geologyDetails?: string;
  roadBlocked?: string;
  source: string; // e.g. "Geological Survey of India (GSI) NLSM", "NDMA Post-Disaster Report", "NASA GLCD"
  verifiedBy?: string;
  confidenceScore: number; // 0 - 100%
  description: string;
  safetyAdvisory?: string;
  imageUrl?: string;
  isDemo?: boolean;
}

export interface SusceptibilityZone {
  id: string;
  name: string;
  region: IndianRegion;
  riskLevel: 'Very High' | 'High' | 'Moderate' | 'Low';
  description: string;
  triggerFactors: string[];
  statesCovered: string[];
  center: [number, number];
  radiusKm: number;
}

export interface OfficialWarning {
  id: string;
  region: string;
  state: string;
  level: 'Red Alert' | 'Orange Alert' | 'Yellow Watch';
  validUntil: string;
  issuedAt: string;
  issuingAuthority: 'IMD' | 'GSI' | 'SDMA' | 'NDMA';
  headline: string;
  precautions: string[];
  rainfallForecastMm?: string;
  isSimulatedDemo: boolean;
}

export interface FilterOptions {
  region: IndianRegion;
  status: IncidentStatus | 'all';
  severity: SeverityLevel | 'all';
  searchQuery: string;
  dateRange: 'all' | 'past30days' | 'pastYear' | 'historical';
}

export interface NewIncidentSubmission {
  title: string;
  location: string;
  district: string;
  state: string;
  coordinates: [number, number];
  date: string;
  landslideType: LandslideType;
  severity: SeverityLevel;
  trigger: string;
  roadBlocked: string;
  description: string;
  reporterContact?: string;
  imageDataUrl?: string;
}

export type SupportedLanguage = 'en' | 'hi' | 'bn' | 'ml';
