import React, { useState, useEffect } from 'react';
import { 
  SupportedLanguage, 
  LandslideIncident, 
  SusceptibilityZone, 
  OfficialWarning, 
  FilterOptions, 
  NewIncidentSubmission,
  IndianRegion
} from './types';
import { UnifiedLandslideService } from './services/dataProvider';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { Dashboard } from './components/Dashboard/Dashboard';
import { LandslideMap } from './components/Map/LandslideMap';
import { SafetyCenter } from './components/Safety/SafetyCenter';
import { IncidentReportForm } from './components/Report/IncidentReportForm';
import { ResearchLab } from './components/ResearchLab/ResearchLab';

const DEFAULT_FILTERS: FilterOptions = {
  region: 'All India',
  status: 'all',
  severity: 'all',
  searchQuery: '',
  dateRange: 'all'
};

export const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('en');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  const [incidents, setIncidents] = useState<LandslideIncident[]>([]);
  const [zones, setZones] = useState<SusceptibilityZone[]>([]);
  const [warnings, setWarnings] = useState<OfficialWarning[]>([]);
  const [filters, setFilters] = useState<FilterOptions>(DEFAULT_FILTERS);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const service = UnifiedLandslideService.getInstance();

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [incList, zoneList, warnList] = await Promise.all([
        service.getAllIncidents(),
        service.getSusceptibilityZones(),
        service.getOfficialWarnings()
      ]);
      setIncidents(incList);
      setZones(zoneList);
      setWarnings(warnList);
    } catch (e) {
      console.error('Failed to load initial data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReportSubmit = (submission: NewIncidentSubmission) => {
    const saved = service.addCommunityReport(submission);
    setIncidents(prev => [saved, ...prev]);
    setSelectedIncidentId(saved.id);
  };

  const handleImportIncidents = (newIncidents: LandslideIncident[]) => {
    service.setCustomImportedIncidents([
      ...service.getCustomImportedIncidents(),
      ...newIncidents
    ]);
    loadData();
  };

  const handleNavigateToMap = (incidentId?: string) => {
    if (incidentId) {
      setSelectedIncidentId(incidentId);
    }
    setActiveTab('map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRegion = (regionName: IndianRegion) => {
    setFilters(prev => ({ ...prev, region: regionName }));
    setActiveTab('map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredIncidents = service.filterIncidents(incidents, filters);
  const stats = service.calculateStats(incidents);

  return (
    <div className="min-h-screen bg-[#fcfbf8] text-[#151918] flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        warnings={warnings}
      />

      {/* Main Body View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-20 md:pb-12">
        {isLoading ? (
          <div className="h-96 flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 border-4 border-emerald-800 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-semibold text-charcoal-600">
              Initializing LandLife Geospatial Registry...
            </p>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <Dashboard
                incidents={incidents}
                zones={zones}
                warnings={warnings}
                stats={stats}
                currentLang={currentLang}
                onNavigateToMap={handleNavigateToMap}
                onSelectRegion={handleSelectRegion}
              />
            )}

            {activeTab === 'map' && (
              <LandslideMap
                incidents={filteredIncidents}
                zones={zones}
                filters={filters}
                onFilterChange={setFilters}
                onResetFilters={() => setFilters(DEFAULT_FILTERS)}
                selectedIncidentId={selectedIncidentId}
              />
            )}

            {activeTab === 'safety' && (
              <SafetyCenter currentLang={currentLang} />
            )}

            {activeTab === 'report' && (
              <IncidentReportForm
                currentLang={currentLang}
                onSubmit={handleReportSubmit}
                onSuccessNavigateToMap={() => {
                  setActiveTab('map');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {activeTab === 'research' && (
              <ResearchLab
                incidents={incidents}
                onImportIncidents={handleImportIncidents}
                currentLang={currentLang}
                onSelectIncident={(id) => handleNavigateToMap(id)}
              />
            )}
          </>
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentLang={currentLang}
      />
    </div>
  );
};
export default App;

