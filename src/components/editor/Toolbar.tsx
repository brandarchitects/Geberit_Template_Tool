'use client';

import React, { useRef, useState } from 'react';
import { GeberitAd01Data } from '@/types/template';
import { ExportedJSON, TEMPLATE_VERSION } from '@/types/template';

interface Props {
  data: GeberitAd01Data;
  templateId: string;
  onImport: (data: GeberitAd01Data) => void;
  onReset: () => void;
}

export default function Toolbar({ data, templateId, onImport, onReset }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ─── JSON Export ────────────────────────────────────────────────────────
  const handleExportJSON = () => {
    const payload: ExportedJSON = {
      version: TEMPLATE_VERSION,
      templateId,
      data,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `geberit_ad_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ─── JSON Import ────────────────────────────────────────────────────────
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed: ExportedJSON = JSON.parse(reader.result as string);
        if (!parsed.data) throw new Error('Invalid file: missing data field');
        onImport(parsed.data);
        setError(null);
      } catch {
        setError('Could not import file. Make sure it is a valid Geberit template JSON.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // ─── PDF Export ─────────────────────────────────────────────────────────
  const handleExportPDF = async () => {
    setPdfLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId, data }),
      });
      if (!res.ok) {
        try {
          const json = await res.json();
          if (json.error === 'no_browser') {
            throw new Error('PDF export requires Chrome. Please deploy to Vercel, or install Google Chrome locally.');
          }
          throw new Error(json.message || 'PDF generation failed');
        } catch (parseErr) {
          if (parseErr instanceof SyntaxError) throw new Error('PDF generation failed');
          throw parseErr;
        }
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `geberit_ad_${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'PDF generation failed');
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-gray-900 border-b border-gray-800 flex-shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-2 mr-2">
        <div
          className="w-2.5 h-2.5 rounded-sm"
          style={{ backgroundColor: '#004673' }}
        />
        <span className="text-white font-semibold text-sm tracking-wide">
          Geberit Template Tool
        </span>
      </div>

      <div className="flex-1" />

      {/* Error message */}
      {error && (
        <span className="text-red-400 text-xs max-w-xs truncate" title={error}>
          ⚠ {error}
        </span>
      )}

      {/* Reset */}
      <button
        onClick={onReset}
        className="px-3 py-1.5 text-sm text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 rounded transition-colors"
        title="Reset all fields to default values"
      >
        Reset
      </button>

      {/* Import JSON */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleImportFile}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="px-3 py-1.5 text-sm text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500 rounded transition-colors"
      >
        Import JSON
      </button>

      {/* Export JSON */}
      <button
        onClick={handleExportJSON}
        className="px-3 py-1.5 text-sm text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500 rounded transition-colors"
      >
        Export JSON
      </button>

      {/* Export PDF */}
      <button
        onClick={handleExportPDF}
        disabled={pdfLoading}
        className="px-4 py-1.5 text-sm font-medium text-white rounded transition-colors disabled:opacity-60"
        style={{ backgroundColor: pdfLoading ? '#003a5c' : '#004673' }}
      >
        {pdfLoading ? 'Generating PDF…' : 'Export PDF'}
      </button>
    </div>
  );
}
