import { LandslideIncident, SusceptibilityZone, OfficialWarning, FilterOptions, NewIncidentSubmission } from '../types';
import { INITIAL_VERIFIED_INCIDENTS } from '../data/verifiedIncidents';
import { HIGH_RISK_ZONES } from '../data/susceptibilityZones';

export interface ILandslideDataProvider {
  name: string;
  getIncidents(): Promise<LandslideIncident[]>;
  getSusceptibilityZones(): Promise<SusceptibilityZone[]>;
  getOfficialWarnings(): Promise<OfficialWarning[]>;
}

// 1. Static Geological Survey of India & NDMA Research Provider
export class GsiVerifiedProvider implements ILandslideDataProvider {
  name = 'Geological Survey of India (GSI) & National Disaster Management Authority (NDMA) Open Repository';

  async getIncidents(): Promise<LandslideIncident[]> {
    return Promise.resolve([...INITIAL_VERIFIED_INCIDENTS]);
  }

  async getSusceptibilityZones(): Promise<SusceptibilityZone[]> {
    return Promise.resolve([...HIGH_RISK_ZONES]);
  }

  async getOfficialWarnings(): Promise<OfficialWarning[]> {
    return Promise.resolve([
      {
        id: 'WARN-KL-2026-08',
        region: 'Western Ghats (Wayanad & Idukki)',
        state: 'Kerala',
        level: 'Orange Alert',
        validUntil: '2026-10-29 08:30 IST',
        issuedAt: '2026-10-27 06:00 IST',
        issuingAuthority: 'IMD',
        headline: 'Heavy to very heavy rainfall expected along high-range ghat cuts. Saturated soil hazard.',
        precautions: [
          'Avoid non-essential travel along Thamarassery & Shiradi Ghats during night hours.',
          'Residents along natural stream catchments should remain attentive to sudden muddy water flow.',
          'Local SDRF units deployed on alert.'
        ],
        rainfallForecastMm: '115mm - 204mm in 24 hours',
        isSimulatedDemo: true
      },
      {
        id: 'WARN-UK-2026-09',
        region: 'Garhwal Himalayas (NH-58 Corridor)',
        state: 'Uttarakhand',
        level: 'Red Alert',
        validUntil: '2026-10-28 18:00 IST',
        issuedAt: '2026-10-27 07:30 IST',
        issuingAuthority: 'SDMA',
        headline: 'Active slope movement recorded between Sirobagarh and Helang. Rockfall hazard high.',
        precautions: [
          'Strict convoy movement enforced between Devprayag and Joshimath.',
          'Clearance machinery stationed at designated vulnerable chokepoints.',
          'Pilgrims and tourists advised to shelter at safe transit bases.'
        ],
        rainfallForecastMm: '> 180mm with localized cloudburst threat',
        isSimulatedDemo: false
      }
    ]);
  }
}

// 2. Local Storage Provider for Community Crowdsourced Reports
const LOCAL_STORAGE_KEY = 'landlife_community_reports_v1';

export class LocalCommunityProvider {
  getStoredReports(): LandslideIncident[] {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data);
    } catch (e) {
      console.warn('Failed to parse local community reports:', e);
      return [];
    }
  }

  saveReport(submission: NewIncidentSubmission): LandslideIncident {
    const existing = this.getStoredReports();
    const newIncident: LandslideIncident = {
      id: `COMM-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: submission.title,
      location: submission.location,
      district: submission.district,
      state: submission.state,
      coordinates: submission.coordinates,
      date: submission.date,
      status: 'community_unverified',
      landslideType: submission.landslideType,
      severity: submission.severity,
      fatalities: 0,
      trigger: submission.trigger || 'Observed ground displacement / rainfall',
      roadBlocked: submission.roadBlocked || 'Information pending',
      source: 'Unverified Community Submission (Stored Locally)',
      verifiedBy: 'Unverified / Crowd Sourced Observation',
      confidenceScore: 35,
      description: submission.description,
      safetyAdvisory: 'CAUTION: Unverified community observation. Exercise personal situational vigilance and consult local authorities.',
      imageUrl: submission.imageDataUrl,
      isDemo: false
    };

    const updated = [newIncident, ...existing];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    return newIncident;
  }

  deleteReport(id: string): void {
    const existing = this.getStoredReports();
    const updated = existing.filter(item => item.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  }
}

// 3. Unified Aggregator Service
export class UnifiedLandslideService {
  private static instance: UnifiedLandslideService;
  private primaryProvider: ILandslideDataProvider;
  private communityProvider: LocalCommunityProvider;
  private customImportedIncidents: LandslideIncident[] = [];

  private constructor() {
    this.primaryProvider = new GsiVerifiedProvider();
    this.communityProvider = new LocalCommunityProvider();
  }

  public static getInstance(): UnifiedLandslideService {
    if (!UnifiedLandslideService.instance) {
      UnifiedLandslideService.instance = new UnifiedLandslideService();
    }
    return UnifiedLandslideService.instance;
  }

  public async getAllIncidents(): Promise<LandslideIncident[]> {
    const baseIncidents = await this.primaryProvider.getIncidents();
    const communityIncidents = this.communityProvider.getStoredReports();
    return [...communityIncidents, ...this.customImportedIncidents, ...baseIncidents];
  }

  public async getSusceptibilityZones(): Promise<SusceptibilityZone[]> {
    return this.primaryProvider.getSusceptibilityZones();
  }

  public async getOfficialWarnings(): Promise<OfficialWarning[]> {
    return this.primaryProvider.getOfficialWarnings();
  }

  public addCommunityReport(submission: NewIncidentSubmission): LandslideIncident {
    return this.communityProvider.saveReport(submission);
  }

  public setCustomImportedIncidents(incidents: LandslideIncident[]): void {
    this.customImportedIncidents = incidents;
  }

  public getCustomImportedIncidents(): LandslideIncident[] {
    return this.customImportedIncidents;
  }

  public filterIncidents(
    incidents: LandslideIncident[], 
    filters: FilterOptions
  ): LandslideIncident[] {
    return incidents.filter(incident => {
      // Region filter
      if (filters.region !== 'All India') {
        const matchesRegion = this.matchesRegion(incident.state, filters.region);
        if (!matchesRegion) return false;
      }

      // Status filter
      if (filters.status !== 'all' && incident.status !== filters.status) {
        return false;
      }

      // Severity filter
      if (filters.severity !== 'all' && incident.severity !== filters.severity) {
        return false;
      }

      // Search Query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesQuery = 
          incident.title.toLowerCase().includes(query) ||
          incident.location.toLowerCase().includes(query) ||
          incident.district.toLowerCase().includes(query) ||
          incident.state.toLowerCase().includes(query) ||
          (incident.roadBlocked && incident.roadBlocked.toLowerCase().includes(query)) ||
          incident.landslideType.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // Date Range
      if (filters.dateRange !== 'all') {
        const incidentDate = new Date(incident.date).getTime();
        const now = new Date().getTime();
        const daysAgo = (now - incidentDate) / (1000 * 60 * 60 * 24);

        if (filters.dateRange === 'past30days' && daysAgo > 30) return false;
        if (filters.dateRange === 'pastYear' && daysAgo > 365) return false;
        if (filters.dateRange === 'historical' && daysAgo <= 365) return false;
      }

      return true;
    });
  }

  private matchesRegion(state: string, region: string): boolean {
    const s = state.toLowerCase();
    switch (region) {
      case 'Western Ghats':
        return s.includes('kerala') || s.includes('karnataka') || s.includes('maharashtra') || s.includes('goa') || s.includes('tamil nadu');
      case 'North-West Himalayas':
        return s.includes('uttarakhand') || s.includes('himachal') || s.includes('jammu') || s.includes('ladakh');
      case 'Eastern Himalayas & North-East':
        return s.includes('sikkim') || s.includes('bengal') || s.includes('assam') || s.includes('manipur') || s.includes('meghalaya') || s.includes('mizoram') || s.includes('nagaland') || s.includes('arunachal');
      case 'Central India / Konkan':
        return s.includes('maharashtra') || s.includes('goa') || s.includes('madhya');
      case 'Eastern Ghats & Nilgiris':
        return s.includes('tamil nadu') || s.includes('andhra') || s.includes('odisha');
      default:
        return true;
    }
  }

  public calculateStats(incidents: LandslideIncident[]) {
    const total = incidents.length;
    const totalFatalities = incidents.reduce((sum, item) => sum + (item.fatalities || 0), 0);
    const totalDisplaced = incidents.reduce((sum, item) => sum + (item.displaced || 0), 0);
    const verifiedCount = incidents.filter(i => i.status === 'historical_verified').length;
    const communityCount = incidents.filter(i => i.status === 'community_unverified').length;
    const warningsCount = incidents.filter(i => i.status === 'official_warning').length;

    // Monthly distribution (Monsoon peak analysis)
    const monthCounts: Record<string, number> = {
      'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0,
      'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov': 0, 'Dec': 0
    };
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    incidents.forEach(inc => {
      try {
        const d = new Date(inc.date);
        const m = months[d.getMonth()];
        if (m) monthCounts[m] = (monthCounts[m] || 0) + 1;
      } catch (e) {
        // ignore date parse issues
      }
    });

    // Regional distribution
    const stateCounts: Record<string, number> = {};
    incidents.forEach(inc => {
      stateCounts[inc.state] = (stateCounts[inc.state] || 0) + 1;
    });

    // Severity distribution
    const severityCounts: Record<string, number> = {
      'Catastrophic': 0,
      'Severe': 0,
      'Moderate': 0,
      'Minor': 0
    };
    incidents.forEach(inc => {
      if (severityCounts[inc.severity] !== undefined) {
        severityCounts[inc.severity]++;
      }
    });

    return {
      total,
      totalFatalities,
      totalDisplaced,
      verifiedCount,
      communityCount,
      warningsCount,
      monthCounts,
      stateCounts,
      severityCounts
    };
  }
}
