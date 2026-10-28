import { SusceptibilityZone } from '../types';

export const HIGH_RISK_ZONES: SusceptibilityZone[] = [
  {
    id: 'ZONE-WG-01',
    name: 'Western Ghats Escarpment & High Ranges',
    region: 'Western Ghats',
    riskLevel: 'Very High',
    description: 'Steep windward slopes with high monsoon precipitation (>3000mm/yr), deep weathered regolith, and extensive slope modification for tea/rubber plantations.',
    triggerFactors: ['Orographic cloudbursts', 'Shallow topsoil saturation', 'Toe excavation for road widening'],
    statesCovered: ['Kerala', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Goa'],
    center: [11.5, 76.1],
    radiusKm: 90
  },
  {
    id: 'ZONE-NW-HIM-01',
    name: 'Garhwal & Kumaon Himalayas (MCT Corridor)',
    region: 'North-West Himalayas',
    riskLevel: 'Very High',
    description: 'Active tectonic compression along Main Central Thrust (MCT), steep river gorges (Alaknanda, Bhagirathi, Mandakini), fragile seismic terrain.',
    triggerFactors: ['Intense monsoon rainfall & cloudbursts', 'Glacial lake outburst floods (GLOF)', 'High seismicity'],
    statesCovered: ['Uttarakhand'],
    center: [30.4, 79.2],
    radiusKm: 110
  },
  {
    id: 'ZONE-HP-HIM-02',
    name: 'Himachal Lesser & Outer Himalayas',
    region: 'North-West Himalayas',
    riskLevel: 'High',
    description: 'Steep slopes in Beas, Sutlej, and Ravi catchments; fragile sedimentary and metamorphic rock overburden with intense urban loading.',
    triggerFactors: ['Precipitation deluges', 'Uncontrolled debris dumping into ravines', 'River bank scouring'],
    statesCovered: ['Himachal Pradesh'],
    center: [31.8, 77.1],
    radiusKm: 95
  },
  {
    id: 'ZONE-NE-HIM-01',
    name: 'Darjeeling-Sikkim Eastern Himalayas',
    region: 'Eastern Himalayas & North-East',
    riskLevel: 'Very High',
    description: 'Deep incised gorges along the Teesta river basin, highly weathered Daling group phyllites, and vulnerable lifeline corridors (NH-10).',
    triggerFactors: ['Prolonged monsoon downpours', 'High slope steepness (>35°)', 'Seismic shock propagation'],
    statesCovered: ['West Bengal (Hills)', 'Sikkim'],
    center: [27.3, 88.4],
    radiusKm: 75
  },
  {
    id: 'ZONE-NE-HILLS-02',
    name: 'Indo-Burma Border & Patkai/Barail Range',
    region: 'Eastern Himalayas & North-East',
    riskLevel: 'High',
    description: 'Young sedimentary tertiary fold belt composed of weak shales, claystones, and heavy soil leaching subject to rapid slope liquefaction.',
    triggerFactors: ['South-west monsoon surges', 'Railway and highway embankment cuts', 'Earth tremors'],
    statesCovered: ['Manipur', 'Nagaland', 'Mizoram', 'Assam (Dima Hasao)'],
    center: [25.0, 93.8],
    radiusKm: 120
  },
  {
    id: 'ZONE-KONKAN-01',
    name: 'Konkan Coastal Belt & Sahyadri Foothills',
    region: 'Central India / Konkan',
    riskLevel: 'High',
    description: 'Basaltic stepped escarpments prone to debris avalanches, rockfalls, and lateritic plateaus bordering Mumbai-Goa corridor.',
    triggerFactors: ['Intense squall line downpours', 'Padkai agricultural slope cuts', 'Quarrying activities'],
    statesCovered: ['Maharashtra', 'Goa'],
    center: [18.5, 73.4],
    radiusKm: 80
  }
];
