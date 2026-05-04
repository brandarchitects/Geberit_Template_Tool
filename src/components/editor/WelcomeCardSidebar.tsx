'use client';

import React from 'react';
import { WelcomeCardData } from '@/types/template';
import ImagePicker from './ImagePicker';

interface Props {
  data: WelcomeCardData;
  onChange: (data: WelcomeCardData) => void;
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 sticky top-0 z-10"
      style={{ backgroundColor: '#13151f', borderBottom: '1px solid #1e2130' }}
    >
      <div className="w-0.5 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: '#004673' }} />
      <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">{children}</span>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  rows = 1,
  placeholder,
  accent,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
  accent?: string;
}) {
  return (
    <div className="mb-4">
      <label className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
        {accent && (
          <span className="inline-block w-2 h-2 rounded-sm flex-shrink-0" style={{ backgroundColor: accent }} />
        )}
        {label}
      </label>
      {rows === 1 ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={(e) => e.currentTarget.select()}
          placeholder={placeholder ?? label}
          className="w-full rounded-md px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
          style={{ backgroundColor: '#1e2130', border: '1px solid #2e3245' }}
        />
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={(e) => e.currentTarget.select()}
          rows={rows}
          placeholder={placeholder ?? label}
          className="w-full rounded-md px-3 py-2 text-sm text-white placeholder-gray-600 resize-y focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
          style={{ backgroundColor: '#1e2130', border: '1px solid #2e3245' }}
        />
      )}
    </div>
  );
}

export default function WelcomeCardSidebar({ data, onChange }: Props) {
  const set = <K extends keyof WelcomeCardData>(key: K, value: WelcomeCardData[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <div className="h-full overflow-y-auto" style={{ color: '#e5e7eb' }}>

      {/* Background */}
      <SectionHeader>Background &amp; Style</SectionHeader>
      <div className="px-4 pt-3 pb-4">
        <ImagePicker
          selectedId={data.backgroundImageId}
          customBase64={data.customBackgroundBase64}
          customMimeType={data.customBackgroundMimeType}
          onSelect={(id) => set('backgroundImageId', id)}
          onCustomUpload={(b64, mime) =>
            onChange({
              ...data,
              backgroundImageId: 'custom',
              customBackgroundBase64: b64,
              customBackgroundMimeType: mime,
            })
          }
          gradientOpacity={data.gradientOpacity}
          onGradientChange={(v) => set('gradientOpacity', v)}
        />
      </div>

      {/* Taglines */}
      <SectionHeader>Hero Taglines</SectionHeader>
      <div className="px-4 pt-3 pb-4">
        <Field label="Line 1 — white · light" value={data.tagline1} onChange={(v) => set('tagline1', v)} placeholder="YOUR IDEAS," />
        <Field label="Line 2 — white · light" value={data.tagline2} onChange={(v) => set('tagline2', v)} placeholder="OUR INNOVATIONS" />
        <div className="mb-4">
          <label className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
            <span className="inline-block w-2 h-2 rounded-sm flex-shrink-0" style={{ backgroundColor: '#B4CDF0' }} />
            Line 3 — bold · light blue
          </label>
          <input
            type="text"
            value={data.tagline3}
            onChange={(e) => set('tagline3', e.target.value)}
            onFocus={(e) => e.currentTarget.select()}
            placeholder="THE PERFECT FIT"
            className="w-full rounded-md px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
            style={{ backgroundColor: '#1e2130', border: '1px solid #2e3245', color: '#B4CDF0' }}
          />
        </div>
      </div>

      {/* Body */}
      <SectionHeader>Message</SectionHeader>
      <div className="px-4 pt-3 pb-4">
        <Field
          label="Salutation"
          value={data.salutation}
          onChange={(v) => set('salutation', v)}
          placeholder="Dear [Name],"
        />
        <Field
          label="Body text"
          value={data.bodyText}
          onChange={(v) => set('bodyText', v)}
          rows={5}
          placeholder="Welcome message…"
        />
        <Field
          label="Sign-off"
          value={data.signoff}
          onChange={(v) => set('signoff', v)}
          rows={2}
          placeholder={'Welcome on board!\nThe Geberit HR Team'}
        />
      </div>

      <div className="h-6" />
    </div>
  );
}
