export interface EmergencyContact {
  title: string;
  number: string;
  description: string;
  scope: 'National' | 'State' | 'District';
  state?: string;
}

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    title: 'National Emergency Helpline (All Disasters)',
    number: '112',
    description: 'Single national emergency number for Police, Fire, Ambulance & SDRF dispatch across India.',
    scope: 'National'
  },
  {
    title: 'NDMA Control Room (Disaster Response)',
    number: '1070',
    description: 'National & State Disaster Management Authority emergency operation helpline.',
    scope: 'National'
  },
  {
    title: 'District Disaster Management Authority (DDMA)',
    number: '1077',
    description: 'Toll-free helpline connecting directly to your local District Magistrate / Collector control room.',
    scope: 'District'
  },
  {
    title: 'National Disaster Response Force (NDRF) HQ',
    number: '011-24363260',
    description: 'Direct national HQ operational helpline for specialized search, rescue & canine squads.',
    scope: 'National'
  },
  {
    title: 'Kerala State Disaster Management (KSDMA)',
    number: '0471-2331645',
    description: 'Thiruvananthapuram Emergency Operation Centre for Western Ghats alerts.',
    scope: 'State',
    state: 'Kerala'
  },
  {
    title: 'Uttarakhand Disaster Control (USDMA)',
    number: '0135-2710334',
    description: 'State Emergency Operations Centre (SEOC) Dehradun for Chardham & Himalayan highway updates.',
    scope: 'State',
    state: 'Uttarakhand'
  },
  {
    title: 'Himachal Pradesh SEOC (HPSDMA)',
    number: '0177-2929688',
    description: 'Shimla Disaster helpline for flash floods, highway debris, and mountain pass clearances.',
    scope: 'State',
    state: 'Himachal Pradesh'
  },
  {
    title: 'Assam State Disaster Control (ASDMA)',
    number: '1079',
    description: 'Dispur Emergency helpline for Brahmaputra valley & hillside landslide response.',
    scope: 'State',
    state: 'Assam'
  }
];
