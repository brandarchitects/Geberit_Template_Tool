'use client';

import React from 'react';
import { GeberitAd01Data } from '@/types/template';
import BulletListEditor from './BulletListEditor';
import ImagePicker from './ImagePicker';

interface Props {
  data: GeberitAd01Data;
  onChange: (data: GeberitAd01Data) => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const BG = '#161929';
const BORDER = '#252840';
const INPUT_BG = '#1c2035';
const INPUT_BORDER = '#2a2f4a';

// ─── Section divider ──────────────────────────────────────────────────────────

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

// ─── Single-line field ────────────────────────────────────────────────────────

function Field({
  label,
  value,
  onChange,
  placeholder,
  hint,
  color,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  color?: string; // text colour for the input
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
        style={{
          backgroundColor: INPUT_BG,
          border: `1px solid ${INPUT_BORDER}`,
          color: color ?? '#e5e7eb',
        }}
      />
    </div>
  );
}

// ─── Multi-line field ─────────────────────────────────────────────────────────

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  hint,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  rows?: number;
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
        style={{
          backgroundColor: INPUT_BG,
          border: `1px solid ${INPUT_BORDER}`,
          minHeight: `${rows * 1.6 + 1}rem`,
        }}
      />
    </div>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────

function Divider() {
  return <div className="mx-4 my-1 border-t" style={{ borderColor: BORDER }} />;
}

// ─── Main Sidebar ─────────────────────────────────────────────────────────────

export default function Sidebar({ data, onChange }: Props) {
  const set = <K extends keyof GeberitAd01Data>(key: K, value: GeberitAd01Data[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <div
      className="h-full overflow-y-auto"
      style={{ backgroundColor: BG, color: '#e5e7eb' }}
    >

      {/* ── Background & Gradient ──────────────────────────────────────────── */}
      <SectionTitle>Background &amp; Style</SectionTitle>
      <div className="px-4 pb-2">
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

      <Divider />

      {/* ── Hero Taglines ──────────────────────────────────────────────────── */}
      <SectionTitle>Hero Taglines</SectionTitle>

      <Field
        label="Line 1"
        hint="white · light · 40 pt"
        value={data.tagline1}
        onChange={(v) => set('tagline1', v)}
        placeholder="YOUR IDEAS,"
      />
      <Field
        label="Line 2"
        hint="white · light · 40 pt"
        value={data.tagline2}
        onChange={(v) => set('tagline2', v)}
        placeholder="OUR INNOVATIONS"
      />
      <Field
        label="Line 3"
        hint="light blue · bold · 40 pt"
        value={data.tagline3}
        onChange={(v) => set('tagline3', v)}
        placeholder="THE PERFECT FIT"
        color="#B4CDF0"
      />

      <Divider />

      {/* ── Job Introduction ───────────────────────────────────────────────── */}
      <SectionTitle>Job Introduction</SectionTitle>

      <Field
        label="Looking-for label"
        hint="light · 11 pt"
        value={data.lookingForLabel}
        onChange={(v) => set('lookingForLabel', v)}
        placeholder="We are looking for"
      />
      <Field
        label="Job Title"
        hint="bold"
        value={data.jobTitle}
        onChange={(v) => set('jobTitle', v)}
        placeholder="Electrical Engineer FH"
      />

      <Divider />

      {/* ── About Geberit ──────────────────────────────────────────────────── */}
      <SectionTitle>About Geberit</SectionTitle>

      <Field
        label="Section title"
        value={data.aboutTitle}
        onChange={(v) => set('aboutTitle', v)}
      />
      <TextArea
        label="Body text"
        value={data.aboutText}
        onChange={(v) => set('aboutText', v)}
        rows={5}
        placeholder="Company description…"
      />

      <Divider />

      {/* ── Main Responsibilities ──────────────────────────────────────────── */}
      <SectionTitle>Main Responsibilities</SectionTitle>

      <Field
        label="Section title"
        value={data.responsibilitiesTitle}
        onChange={(v) => set('responsibilitiesTitle', v)}
      />
      <div className="px-4 mb-3">
        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-2">
          Bullet points
        </p>
        <BulletListEditor
          items={data.responsibilitiesItems}
          onChange={(items) => set('responsibilitiesItems', items)}
          placeholder="Responsibility…"
        />
      </div>

      <Divider />

      {/* ── Your Profile ───────────────────────────────────────────────────── */}
      <SectionTitle>Your Profile</SectionTitle>

      <Field
        label="Section title"
        value={data.profileTitle}
        onChange={(v) => set('profileTitle', v)}
      />
      <div className="px-4 mb-3">
        <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-2">
          Bullet points
        </p>
        <BulletListEditor
          items={data.profileItems}
          onChange={(items) => set('profileItems', items)}
          placeholder="Profile requirement…"
        />
      </div>

      <Divider />

      {/* ── Application ────────────────────────────────────────────────────── */}
      <SectionTitle>Application</SectionTitle>

      <Field
        label="Section title"
        value={data.applicationTitle}
        onChange={(v) => set('applicationTitle', v)}
      />
      <TextArea
        label="Body text"
        value={data.applicationText}
        onChange={(v) => set('applicationText', v)}
        rows={3}
      />

      <Divider />

      {/* ── Contact ────────────────────────────────────────────────────────── */}
      <SectionTitle>Contact</SectionTitle>

      <Field
        label="Section title"
        value={data.contactTitle}
        onChange={(v) => set('contactTitle', v)}
      />
      <TextArea
        label="Name, address, phone"
        value={data.contactText}
        onChange={(v) => set('contactText', v)}
        rows={3}
        placeholder={'Geberit International AG\nHR Business Partner\nCH-8645 Jona, +41 55 221 62 60'}
      />

      {/* Bottom padding */}
      <div className="h-10" />
    </div>
  );
}
