import { LandslideIncident } from '../types';

export interface CsvValidationResult {
  validIncidents: LandslideIncident[];
  errors: string[];
  totalRows: number;
}

export function exportToCsv(incidents: LandslideIncident[], filename = 'landlife_landslide_data.csv'): void {
  const headers = [
    'ID',
    'Title',
    'Location',
    'District',
    'State',
    'Latitude',
    'Longitude',
    'Date',
    'Status',
    'Landslide_Type',
    'Severity',
    'Fatalities',
    'Injured',
    'Displaced',
    'Trigger',
    'Geology',
    'Road_Blocked',
    'Source',
    'Confidence_Score'
  ];

  const escapeCsv = (str: string | number | undefined) => {
    if (str === undefined || str === null) return '""';
    const s = String(str).replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = incidents.map(inc => [
    escapeCsv(inc.id),
    escapeCsv(inc.title),
    escapeCsv(inc.location),
    escapeCsv(inc.district),
    escapeCsv(inc.state),
    inc.coordinates[0],
    inc.coordinates[1],
    escapeCsv(inc.date),
    escapeCsv(inc.status),
    escapeCsv(inc.landslideType),
    escapeCsv(inc.severity),
    inc.fatalities || 0,
    inc.injured || 0,
    inc.displaced || 0,
    escapeCsv(inc.trigger),
    escapeCsv(inc.geologyDetails || ''),
    escapeCsv(inc.roadBlocked || ''),
    escapeCsv(inc.source),
    inc.confidenceScore || 0
  ].join(','));

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportToGeoJson(incidents: LandslideIncident[], filename = 'landlife_landslide_data.geojson'): void {
  const geojson = {
    type: 'FeatureCollection',
    metadata: {
      generatedAt: new Date().toISOString(),
      network: "LandLife - India's Landslide Intelligence Network",
      count: incidents.length
    },
    features: incidents.map(inc => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [inc.coordinates[1], inc.coordinates[0]] // GeoJSON standard is [longitude, latitude]
      },
      properties: {
        id: inc.id,
        title: inc.title,
        location: inc.location,
        district: inc.district,
        state: inc.state,
        date: inc.date,
        status: inc.status,
        landslideType: inc.landslideType,
        severity: inc.severity,
        fatalities: inc.fatalities,
        trigger: inc.trigger,
        source: inc.source,
        confidenceScore: inc.confidenceScore
      }
    }))
  };

  const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/geo+json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function parseAndValidateCsv(csvText: string): CsvValidationResult {
  const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
  const errors: string[] = [];
  const validIncidents: LandslideIncident[] = [];

  if (lines.length < 2) {
    return {
      validIncidents: [],
      errors: ['The uploaded CSV file is empty or missing a header row.'],
      totalRows: 0
    };
  }

  // Parse header
  const rawHeaders = splitCsvLine(lines[0]).map(h => h.trim().toLowerCase().replace(/[\s_-]+/g, ''));
  
  const latIndex = rawHeaders.findIndex(h => h.includes('lat'));
  const lngIndex = rawHeaders.findIndex(h => h.includes('lon') || h.includes('lng'));
  const titleIndex = rawHeaders.findIndex(h => h.includes('title') || h.includes('name') || h.includes('event'));
  const locationIndex = rawHeaders.findIndex(h => h.includes('loc') || h.includes('place') || h.includes('area'));
  const stateIndex = rawHeaders.findIndex(h => h.includes('state') || h.includes('province'));
  const dateIndex = rawHeaders.findIndex(h => h.includes('date') || h.includes('time'));
  const fatalIndex = rawHeaders.findIndex(h => h.includes('fatal') || h.includes('death') || h.includes('casualt'));
  const typeIndex = rawHeaders.findIndex(h => h.includes('type'));
  const triggerIndex = rawHeaders.findIndex(h => h.includes('trig') || h.includes('cause') || h.includes('reason'));

  if (latIndex === -1 || lngIndex === -1) {
    errors.push('Required geospatial columns missing: Latitude and Longitude columns could not be identified.');
    return { validIncidents: [], errors, totalRows: lines.length - 1 };
  }

  for (let i = 1; i < lines.length; i++) {
    const rowNum = i + 1;
    const cols = splitCsvLine(lines[i]);
    if (cols.length < 2) continue;

    const latStr = cols[latIndex]?.trim();
    const lngStr = cols[lngIndex]?.trim();
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);

    if (isNaN(lat) || isNaN(lng) || lat < 6 || lat > 38 || lng < 68 || lng > 98) {
      errors.push(`Row ${rowNum}: Invalid coordinate (${latStr}, ${lngStr}). Must be within India bounding box (Lat: 6-38°N, Lng: 68-98°E).`);
      continue;
    }

    const title = (titleIndex !== -1 && cols[titleIndex]?.trim()) || `Survey Incident #${i}`;
    const location = (locationIndex !== -1 && cols[locationIndex]?.trim()) || 'Imported Location';
    const state = (stateIndex !== -1 && cols[stateIndex]?.trim()) || 'India (Imported)';
    const date = (dateIndex !== -1 && cols[dateIndex]?.trim()) || new Date().toISOString().split('T')[0];
    const fatalities = (fatalIndex !== -1 && parseInt(cols[fatalIndex]?.trim())) || 0;
    const trigger = (triggerIndex !== -1 && cols[triggerIndex]?.trim()) || 'Heavy monsoon rainfall';
    const rawType = (typeIndex !== -1 && cols[typeIndex]?.trim()) || 'Debris Flow';

    validIncidents.push({
      id: `IMPORT-${Date.now()}-${i}`,
      title,
      location,
      district: 'Survey Field District',
      state,
      coordinates: [lat, lng],
      date,
      status: 'community_unverified',
      landslideType: (rawType.includes('Rock') ? 'Rockfall' : rawType.includes('Slump') ? 'Rotational Slump' : 'Debris Flow'),
      severity: fatalities > 10 ? 'Catastrophic' : fatalities > 0 ? 'Severe' : 'Moderate',
      fatalities,
      trigger,
      source: 'Custom CSV Import (Field Survey Dataset)',
      verifiedBy: 'Researcher Uploaded',
      confidenceScore: 70,
      description: `Imported survey record at ${location}, ${state}. Verified coordinates: ${lat.toFixed(4)}, ${lng.toFixed(4)}.`,
      safetyAdvisory: 'Field survey record imported for scientific analysis.'
    });
  }

  return {
    validIncidents,
    errors,
    totalRows: lines.length - 1
  };
}

function splitCsvLine(line: string): string[] {
  const result: string[] = [];
  let inQuotes = false;
  let current = '';

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}
