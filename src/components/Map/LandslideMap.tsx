import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Crosshair, 
  Layers, 
  MapPin, 
  ShieldAlert, 
  Filter, 
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';
import { LandslideIncident, SusceptibilityZone, FilterOptions } from '../../types';
import { MapFilters } from './MapFilters';
import { IncidentDrawer } from './IncidentDrawer';
import { MapFallback } from './MapFallback';

interface LandslideMapProps {
  incidents: LandslideIncident[];
  zones: SusceptibilityZone[];
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onResetFilters: () => void;
  selectedIncidentId?: string;
}

export const LandslideMap: React.FC<LandslideMapProps> = ({
  incidents,
  zones,
  filters,
  onFilterChange,
  onResetFilters,
  selectedIncidentId
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const zonesGroupRef = useRef<L.LayerGroup | null>(null);

  const [hasMapError, setHasMapError] = useState(false);
  const [showZones, setShowZones] = useState(true);
  const [activeIncident, setActiveIncident] = useState<LandslideIncident | null>(null);
  const [mapStyle, setMapStyle] = useState<'osm' | 'topo'>('osm');

  // Handle selectedIncidentId changes
  useEffect(() => {
    if (selectedIncidentId) {
      const match = incidents.find(i => i.id === selectedIncidentId);
      if (match) {
        setActiveIncident(match);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo(match.coordinates, 9, { duration: 1.2 });
        }
      }
    }
  }, [selectedIncidentId, incidents]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    try {
      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [22.8, 80.5], // Center of India
          zoom: 5,
          minZoom: 4,
          maxZoom: 18,
          zoomControl: false
        });

        // Add Tile layer
        const tileUrl = mapStyle === 'osm'
          ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          : 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';

        const tileLayer = L.tileLayer(tileUrl, {
          attribution: '&copy; OpenStreetMap contributors, GSI India'
        });
        tileLayer.addTo(map);

        const markersGroup = L.layerGroup().addTo(map);
        const zonesGroup = L.layerGroup().addTo(map);

        mapInstanceRef.current = map;
        markersGroupRef.current = markersGroup;
        zonesGroupRef.current = zonesGroup;

        // Custom Zoom Control top-right
        L.control.zoom({ position: 'topright' }).addTo(map);
      }
    } catch (err) {
      console.error('Failed to initialize map:', err);
      setHasMapError(true);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers & Susceptibility Zones whenever incidents, zones, or toggle changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current || !zonesGroupRef.current) return;

    markersGroupRef.current.clearLayers();
    zonesGroupRef.current.clearLayers();

    // 1. Render Susceptibility Zones if enabled
    if (showZones) {
      zones.forEach(zone => {
        const circle = L.circle(zone.center, {
          radius: zone.radiusKm * 1000,
          color: zone.riskLevel === 'Very High' ? '#dc2626' : '#d97706',
          fillColor: zone.riskLevel === 'Very High' ? '#dc2626' : '#f59e0b',
          fillOpacity: 0.12,
          weight: 1.5,
          dashArray: '4, 6'
        });

        circle.bindTooltip(
          `<div style="font-size:11px;font-weight:700;">${zone.name}<br/><span style="color:#dc2626;">${zone.riskLevel} Susceptibility</span></div>`,
          { sticky: true }
        );

        zonesGroupRef.current?.addLayer(circle);
      });
    }

    // 2. Render Incident Markers
    incidents.forEach(incident => {
      const getPinColor = () => {
        if (incident.status === 'official_warning') return '#dc2626';
        if (incident.status === 'community_unverified') return '#7e22ce';
        if (incident.status === 'environmental_observation') return '#0284c7';
        if (incident.severity === 'Catastrophic') return '#991b1b';
        if (incident.severity === 'Severe') return '#ea580c';
        return '#15803d';
      };

      const color = getPinColor();
      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            background-color: ${color};
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 4px 6px rgba(0,0,0,0.35);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s;
          ">
            <svg style="width:14px;height:14px;color:white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker(incident.coordinates, { icon: customIcon });

      const popupContent = `
        <div style="padding: 4px; min-width: 200px; font-family: system-ui, sans-serif;">
          <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: ${color};">
            ${incident.status.replace('_', ' ')} • ${incident.severity}
          </div>
          <div style="font-weight: 800; font-size: 13px; color: #111827; margin-top: 2px;">
            ${incident.title}
          </div>
          <div style="font-size: 11px; color: #4b5563; margin-top: 2px;">
            📍 ${incident.district}, ${incident.state}
          </div>
          <div style="font-size: 10px; color: #6b7280; margin-top: 4px;">
            ${incident.date} ${incident.fatalities > 0 ? `• <strong>${incident.fatalities} Fatalities</strong>` : ''}
          </div>
          <button id="btn-${incident.id}" style="
            margin-top: 8px;
            width: 100%;
            background-color: #143828;
            color: white;
            border: none;
            padding: 5px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
          ">
            Inspect Full Dossier →
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-${incident.id}`);
        if (btn) {
          btn.onclick = () => {
            setActiveIncident(incident);
            marker.closePopup();
          };
        }
      });

      marker.on('click', () => {
        setActiveIncident(incident);
      });

      markersGroupRef.current?.addLayer(marker);
    });
  }, [incidents, zones, showZones]);

  // "Locate Me" button with permission handling
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([lat, lng], 11, { duration: 1.5 });

          // Add temporary pulsing user location marker
          const userIcon = L.divIcon({
            className: 'user-pos-marker',
            html: `
              <div style="
                background-color: #2563eb;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 0 10px rgba(37,99,235,0.7);
              "></div>
            `,
            iconSize: [18, 18],
            iconAnchor: [9, 9]
          });

          L.marker([lat, lng], { icon: userIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup('<strong>Your Current Location</strong><br/>Checking proximity to slope hazard zones...')
            .openPopup();
        }
      },
      (err) => {
        alert('Could not retrieve location. Please check location permissions in your browser.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([22.8, 80.5], 5, { duration: 1 });
    }
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Filter Controls Header */}
      <MapFilters
        filters={filters}
        onFilterChange={onFilterChange}
        onReset={onResetFilters}
        totalFiltered={incidents.length}
      />

      {/* Map Card */}
      <div className="relative w-full h-[600px] sm:h-[650px] rounded-3xl overflow-hidden border border-parchment-200 shadow-md bg-white">
        {hasMapError ? (
          <MapFallback
            incidents={incidents}
            onSelectIncident={(inc) => setActiveIncident(inc)}
            onRetry={() => setHasMapError(false)}
          />
        ) : (
          <>
            {/* The Map Div */}
            <div ref={mapContainerRef} className="w-full h-full" />

            {/* Floating Map Controls - Top Left */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
              <button
                onClick={handleLocateMe}
                className="flex items-center gap-2 px-3 py-2 bg-white/95 hover:bg-white text-charcoal-800 rounded-xl shadow-md border border-parchment-200 text-xs font-semibold backdrop-blur transition-all active:scale-95"
                title="Locate my position (Requests GPS permission)"
              >
                <Crosshair className="w-4 h-4 text-emerald-700" />
                <span className="hidden sm:inline">Locate Me</span>
              </button>

              <button
                onClick={() => setShowZones(!showZones)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl shadow-md border text-xs font-semibold backdrop-blur transition-all active:scale-95 ${
                  showZones 
                    ? 'bg-forest-900 text-white border-forest-700' 
                    : 'bg-white/95 text-charcoal-700 border-parchment-200'
                }`}
                title="Toggle GSI Susceptibility Zone Overlays"
              >
                <Layers className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">GSI Risk Zones</span>
              </button>

              <button
                onClick={handleResetView}
                className="flex items-center gap-2 px-3 py-2 bg-white/95 hover:bg-white text-charcoal-800 rounded-xl shadow-md border border-parchment-200 text-xs font-semibold backdrop-blur transition-all active:scale-95"
                title="Reset zoom to India overview"
              >
                <Maximize2 className="w-4 h-4 text-charcoal-600" />
                <span className="hidden sm:inline">India View</span>
              </button>
            </div>

            {/* Map Legend - Bottom Left */}
            <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur p-2.5 sm:p-3 rounded-2xl shadow-lg border border-parchment-200 text-xs max-w-[280px]">
              <span className="font-bold text-charcoal-800 text-[11px] block uppercase tracking-wider mb-1.5">
                Geospatial Legend
              </span>
              <div className="space-y-1 text-[11px] text-charcoal-600">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#991b1b]"></span>
                  <span>Catastrophic Historical (Wayanad/Kedarnath)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ea580c]"></span>
                  <span>Severe Slope Failure</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#dc2626] animate-pulse"></span>
                  <span>Official Warning (IMD/SDMA)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#7e22ce]"></span>
                  <span>Unverified Community Report</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full border border-dashed border-[#dc2626] bg-[#dc2626]/20"></span>
                  <span>GSI High Susceptibility Zone</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Incident Details Drawer */}
      <IncidentDrawer
        incident={activeIncident}
        onClose={() => setActiveIncident(null)}
      />
    </div>
  );
};

