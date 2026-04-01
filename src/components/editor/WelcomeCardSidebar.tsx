'use client';

import React from 'react';
import { WelcomeCardData } from '@/types/template';
import ImagePicker from './ImagePicker';

interface Props {
  data: WelcomeCardData;
  onChange: (data: WelcomeCardData) => void;
}

const BG = '#161929';
const INPUT_BG = '#1c2035';
const INPUT_BORDER = '#2a2f4a';
const BORDER = '#252840';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-2 px-4 pt-5 pb-2 sticky top-0 z-10"
      style={{ backgroundColor: BG }}
    >
      <div className="w-0.5 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: '#004673' }} />
      <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">
        {children}
      </span>
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, hint, color,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; hint?: string; color?: string;
}) {
  return (
    <div className="px-4 mb-3">
      <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-1">
        {label}
        {hint && <span className="normal-case tracking-normal font-normal text-gray-600 ml-1">· {hint}</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={(e) => e.currentTarget.select()}
        placeholder={placeholder ?? label}
        className="w-full rounded-lg px-3 py-2 text-sm placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
        style={{ backgroundColor: INPUT_BG, border: `1px solid ${INPUT_BORDER}`, color: color ?? '#e5e7eb' }}
      />
    </div>
  );
}

function TextArea({
  label, value, onChange, placeholder, hint, rows = 3,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; hint?: string; rows?: number;
}) {
  return (
    <div className="px-4 mb-3">
      <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-1">
        {label}
        {hint && <span className="normal-case tracking-normal font-normal text-gray-600 ml-1">· {hint}</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={(e) => e.currentTarget.select()}
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-700 resize-y focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
        style={{ backgroundColor: INPUT_BG, border: `1px solid ${INPUT_BORDER}` }}
      />
    </div>
  );
}

function Divider() {
  return <div className="mx-4 my-1 border-t" style={{ borderColor: BORDER }} />;
}

export default function WelcomeCardSidebar({ data, onChange }: Props) {
  const set = <K extends keyof WelcomeCardData>(key: K, value: WelcomeCardData[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <div className="h-full overflow-y-auto" style={{ backgroundColor: BG, color: '#e5e7eb' }}>

      {/* ── Background & Gradient ──────────────────────────────────────── */}
      <SectionTitle>Background &amp; Style</SectionTitle>
      <div className="px-4 pb-2">
        <ImagePicker
          selectedId={data.backgroundImageId}
          customBase64={data.customBackgroundBase64}
          customMimeType={data.customBackgroundMimeType}
          onSelect={(id) => set('backgroundImageId', id)}
          onCustomUpload={(b64, mime) =>
            onChange({ ...data, backgroundImageId: 'custom', customBackgroundBase64: b64, customBackgroundMimeType: mime })
          }
          gradientOpacity={data.gradientOpacity}
          onGradientChange={(v) => set('gradientOpacity', v)}
        />
      </div>

      <Divider />

      {/* ── Hero Taglines ───────────────────────────────────────────────── */}
      <SectionTitle>Hero Taglines</SectionTitle>

      <Field label="Line 1" hint="name / placeholder · white · 36 pt"
        value={data.tagline1} onChange={(v) => set('tagline1', v)} placeholder="XXX" />
      <Field label="Line 2" hint="white · light · 36 pt"
        value={data.tagline2} onChange={(v) => set('tagline2', v)} placeholder="AND GEBERIT" />
      <Field label="Line 3" hint="light blue · bold · 36 pt"
        value={data.tagline3} onChange={(v) => set('tagline3', v)}
        placeholder="THE PERFECT FIT" color="#B4CDF0" />

      <Divider />

      {/* ── Body Content ────────────────────────────────────────────────── */}
      <SectionTitle>Body Content</SectionTitle>

      <Field label="Salutation" hint="e.g. Dear XXX,"
        value={data.salutation} onChange={(v) => set('salutation', v)} placeholder="Dear XXX," />
      <TextArea label="Body text" rows={4}
        value={data.bodyText} onChange={(v) => set('bodyText', v)}
        placeholder={"Only a few more days until you join us at Geberit.\nWe look forward to welcoming you."} />
      <TextArea label="Sign-off" rows={2}
        value={data.signoff} onChange={(v) => set('signoff', v)}
        placeholder={"Kind regards,\nYour HR team"} />

      <div className="h-10" />
    </div>
  );
}
