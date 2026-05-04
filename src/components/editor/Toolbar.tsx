'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnyTemplateData, ExportedJSON, TEMPLATE_VERSION } from '@/types/template';

interface Props {
  data: AnyTemplateData;
  templateId: string;
  onTemplateChange: (id: string) => void;
  onImport: (data: AnyTemplateData) => void;
  onReset: () => void;
}

const TEMPLATES = [
  { id: 'geberit-ad-01', label: 'Job Ad A4' },
  { id: 'geberit-welcome-card', label: 'Welcome Card' },
];

export default function Toolbar({ data, templateId, onTemplateChange, onImport, onReset }: Props) {
  const router = useRouter();
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
    a.download = `geberit_${templateId}_${Date.now()}.json`;
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
      a.download = `geberit_${templateId}_${Date.now()}.pdf`;
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

  // ─── Logout ─────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.replace('/login');
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-gray-900 border-b border-gray-800 flex-shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-2 mr-2">
        <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: '#004673' }} />
        <span className="text-white font-semibold text-sm tracking-wide">Geberit HR Template</span>
      </div>

      {/* Template tabs */}
      <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => onTemplateChange(t.id)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              templateId === t.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
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

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="px-3 py-1.5 text-sm text-gray-500 hover:text-red-400 border border-gray-700 hover:border-red-800 rounded transition-colors"
        title="Logout"
      >
        Logout
      </button>
    </div>
  );
}
