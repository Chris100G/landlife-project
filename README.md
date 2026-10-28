# LandLife — India's Landslide Intelligence & Safety Network

**LandLife** is a responsive, mobile-first web application designed for people across India to understand landslide hazards, access life-saving emergency protocols, report local slope movements, and explore peer-reviewed geological landslide data without requiring paid APIs or AI credits.

---

## 🚀 Local Development

Run the development server to access the application locally. Vite uses port 3000 by default and selects another available port if needed.

---

## 🌟 Core Features Implemented

### 1. Intelligence Dashboard
- **Telemetry Overview:** Aggregated statistics of historical Indian landslide events, fatalities, active watches, and GSI high-susceptibility zones.
- **Official Warning Ticker & Bulletins:** Real-time alert feed displaying warnings with issuing authority (IMD / SDMA / NDMA), rainfall forecast, and simulation disclaimers.
- **Monsoon Seasonality Hazard Curve:** Pure SVG monthly temporal distribution proving how the SW Monsoon (June–September) drives >75% of catastrophic Indian failures.
- **State Vulnerability Analysis:** Horizontal distribution across Kerala, Uttarakhand, Himachal Pradesh, Maharashtra, Assam, West Bengal, and Manipur.
- **Geological Province Navigator:** Direct jump cards for the Western Ghats Escarpment, Garhwal/Kumaon MCT Corridor, Himachal Lesser Himalayas, Darjeeling-Sikkim, and Konkan Belt.

### 2. Interactive India Landslide Map
- **Geospatial Mapping:** Responsive Leaflet map centered on the Indian subcontinent with OpenStreetMap tiles (100% free, no API keys).
- **Custom Categorized Markers:**
  - 🔴 **Catastrophic Historical:** Wayanad (2024), Malin (2014), Kedarnath (2013), Chamoli (2021).
  - 🟠 **Severe Slope Failures:** Irshalwadi (2023), Shimla Summer Hill (2023), Shirur NH-66 (2024), Kotropi (2017).
  - 🚨 **Official Warnings:** Active monitored segments with movement advisories.
  - 🟣 **Unverified Community Reports:** Locally contributed ground observations.
  - 🔵 **Environmental Field Observations:** Pre-failure cues like tension cracks and pavement displacement.
- **GSI Susceptibility Zones Overlay:** Semi-transparent polygon/radius overlays depicting Geological Survey of India macro-scale hazard zones.
- **"Locate Me" Button:** Geolocation with explicit user permission and proximity visualization.
- **Detailed Incident Dossier Drawer:** Slide-over modal with coordinates, elevation, bedrock lithology, trigger cause, highway blockage, and DRR advisory.
- **Offline / Map Fallback:** Graceful fallback rendering when tile streaming is interrupted or offline.

### 3. Landslide Safety & Survival Center
- **Early Physical Warning Signs:** Illustrated indicators (tension cracks, tilting "J-curve" trees/poles, sudden muddy stream pulses, bulging slope toes).
- **Life-Saving Evacuation Protocols:** Step-by-step actions during cloudbursts (lateral uphill evacuation away from ravines, indoor brace postures).
- **Monsoon Ghat & Mountain Travel Rules:** Precautions for Western Ghats passes (Tamhini, Shiradi, Charmadi) and Himalayan highways (NH-58, NH-5).
- **Interactive Go-Bag Checklist:** Persistent checklist stored in browser `localStorage` across reloads.
- **Emergency Helplines Directory:** Instant tap-to-call links for `112` (National Emergency), `1070` (NDMA), `1077` (DDMA), KSDMA, USDMA, and HPSDMA.
- **Print / Save Action Sheet:** One-click print-ready emergency sheet.

### 4. Incident Reporting Form
- **Form Fields:** Landmark location, state, district, exact GPS coordinates with "Use Current GPS" button, landslide movement classification, severity estimate, trigger observations, and affected highway.
- **Photo Upload:** Local image attachment with client-side preview and size validation.
- **Ethical Integrity Notice:** Clear warning stating reports are saved locally to the browser session and marked as **UNVERIFIED COMMUNITY REPORTS**, not sent to emergency authorities. Prominent reminder to call `112` in real emergencies.

### 5. Research Lab & Data Explorer
- **Replaceable Data-Provider Architecture:** Clean TypeScript provider interfaces (`ILandslideDataProvider`, `GsiVerifiedProvider`, `LocalCommunityProvider`).
- **Data Quality & Completeness Audit:** Methodological scores for spatial geocoding, geological lithology attribution, and confidence ratings.
- **Field Survey CSV Importer:** Drag-and-drop CSV parser with coordinate bounds checking (India bounding box 6°–38°N, 68°–98°E), date validation, and row-by-row error reporting.
- **Export to CSV & GeoJSON:** One-click clean export formatted for GIS analysis (QGIS, ArcGIS, Mapbox).

### 6. PWA & Localization
- **Offline Support:** `manifest.json` and `sw.js` Service Worker for caching safety guidelines.
- **Indian Languages Supported:** English, हिन्दी (Hindi), বাংলা (Bengali), and മലയാളം (Malayalam).

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React 18, TypeScript 5, Vite 5
- **Styling:** Tailwind CSS (Deep Forest Green `#143828`, Charcoal `#151918`, Parchment `#fcfbf8`)
- **Icons:** Lucide React
- **Geospatial:** Leaflet with custom SVG DOM markers
- **Storage:** LocalStorage & In-Memory Service Aggregator
- **Zero Paid Dependencies:** No Google Maps API key, Mapbox token, or AI credits required.

---

## 🏃 Running Instructions

To restart or run the project in any terminal:

```bash
# 1. Install dependencies (already installed)
npm install

# 2. Run the development server
npm run dev
# -> Opens on http://localhost:3000

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

## 🚀 Deploying to GitHub Pages

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds the project and publishes the `dist` directory to GitHub Pages whenever changes are pushed to `main`.

To enable deployment, create a public repository named `landlife-project`, push this project to its `main` branch, then set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. The site will be available at `https://<your-github-username>.github.io/landlife-project/` after the workflow completes.

---

## 📚 Real-World Scientific Sources & Attribution

All benchmark historical incidents incorporated in LandLife are compiled from official public disaster survey reports:
1. **Geological Survey of India (GSI):** National Landslide Susceptibility Mapping (NLSM) Programme & Post-Disaster Field Survey Bulletins.
2. **National Disaster Management Authority (NDMA):** High-Powered Committee Reports (Uttarakhand 2013, Wayanad 2024).
3. **Wadia Institute of Himalayan Geology (WIHG):** Debris avalanche telemetry and MCT fault line analysis.
4. **Kerala State Disaster Management Authority (KSDMA) & HPSDMA:** Monsoon season damage assessments and rainfall thresholds.
5. **NASA Global Landslide Catalog (GLC):** Open research data for South Asia.
