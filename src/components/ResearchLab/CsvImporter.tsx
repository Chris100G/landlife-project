import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Download, X } from 'lucide-react';
import { parseAndValidateCsv, CsvValidationResult } from '../../services/exportImport';
import { LandslideIncident } from '../../types';

interface CsvImporterProps {
  onImportSuccess: (incidents: LandslideIncident[]) => void;
}

export const CsvImporter: React.FC<CsvImporterProps> = ({ onImportSuccess }) => {
  const [result, setResult] = useState<CsvValidationResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const processFile = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      alert('Please upload a valid .csv file.');
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsed = parseAndValidateCsv(text);
      setResult(parsed);
      if (parsed.validIncidents.length > 0) {
        onImportSuccess(parsed.validIncidents);
      }
    };
    reader.readAsText(file);
  };

  const handleDownloadSample = () => {
    const sampleCsv = `title,location,district,state,latitude,longitude,date,type,fatalities,trigger\n` +
      `"Munnar Gap Road Debris Slide","Gap Road, Kochi-Dhanushkodi NH","Idukki","Kerala",10.0521,77.1215,"2023-08-11","Debris Flow",0,"Continuous rain & steep highway cut"\n` +
      `"Badrinath Sirobagarh Rockfall","Sirobagarh, NH-58","Rudraprayag","Uttarakhand",30.2811,78.9814,"2023-07-20","Rockfall",2,"Sheared quartz-mica schists following downpour"`;

    const blob = new Blob([sampleCsv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'landlife_sample_import_template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl border border-parchment-200 p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-charcoal-900 flex items-center gap-2">
            <Upload className="w-5 h-5 text-emerald-700" />
            Import Custom Field Survey CSV
          </h3>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Integrate local research inventories with real-time coordinate validation
          </p>
        </div>

        <button
          onClick={handleDownloadSample}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-parchment-300 text-charcoal-700 hover:bg-parchment-100 text-xs font-semibold transition-colors flex-shrink-0"
        >
          <Download className="w-3.5 h-3.5 text-forest-700" />
          <span>Download Sample Template</span>
        </button>
      </div>

      {/* Drag & Drop Box */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) processFile(file);
        }}
        className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors ${
          isDragging ? 'border-emerald-600 bg-emerald-50/50' : 'border-parchment-300 bg-parchment-50/40 hover:bg-parchment-50'
        }`}
      >
        <FileText className="w-8 h-8 text-forest-700 mx-auto mb-2" />
        <p className="text-xs sm:text-sm font-semibold text-charcoal-800">
          Drag & drop your research CSV here, or
        </p>
        <label className="mt-2 inline-block cursor-pointer px-4 py-2 bg-forest-800 hover:bg-forest-700 text-white rounded-xl text-xs font-bold transition-colors">
          Browse File
          <input
            type="file"
            accept=".csv"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) processFile(file);
            }}
            className="hidden"
          />
        </label>
        <p className="text-[11px] text-charcoal-500 mt-2">
          Required columns: <code className="bg-parchment-200 px-1 py-0.5 rounded text-charcoal-800">latitude</code>, <code className="bg-parchment-200 px-1 py-0.5 rounded text-charcoal-800">longitude</code>. Optional: title, location, date, type, fatalities.
        </p>
      </div>

      {/* Validation Result Box */}
      {result && (
        <div className="space-y-3 pt-2">
          {result.validIncidents.length > 0 ? (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-950">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">
                  Successfully imported {result.validIncidents.length} valid geospatial records from {fileName}!
                </p>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  These records are now dynamically merged into your active map, dashboard statistics, and export streams.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-950">
              <AlertCircle className="w-5 h-5 text-rose-700 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">No valid records could be extracted.</p>
                <p className="text-[11px] text-rose-800 mt-0.5">
                  Please review the errors below and compare your CSV format against the sample template.
                </p>
              </div>
            </div>
          )}

          {result.errors.length > 0 && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
              <span className="text-xs font-bold text-amber-900 block">
                Validation Warnings & Errors ({result.errors.length}):
              </span>
              <ul className="text-[11px] text-amber-800 space-y-1 max-h-36 overflow-y-auto pl-1">
                {result.errors.map((err, i) => (
                  <li key={i}>• {err}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

