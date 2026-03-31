'use client';

import React, { useState } from 'react';
import { GeberitAd01Data } from '@/types/template';
import BulletListEditor from './BulletListEditor';
import ImagePicker from './ImagePicker';

interface Props {
  data: GeberitAd01Data;
  onChange: (data: GeberitAd01Data) => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Field({
  label,
  value,
  onChange,
  rows = 1,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div className="mb-3">
      <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">{label}</label>
      {rows === 1 ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? label}
          className="w-full bg-gray-700 text-white text-sm rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-500"
        />
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder ?? label}
          className="w-full bg-gray-700 text-white text-sm rounded px-2 py-1.5 resize-y focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-500"
        />
      )}
    </div>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 my-4">
      <div className="flex-1 h-px bg-gray-700" />
      <span className="text-xs text-gray-500 uppercase tracking-widest flex-shrink-0">{label}</span>
      <div className="flex-1 h-px bg-gray-700" />
    </div>
  );
}

type SectionKey =
  | 'background'
  | 'hero'
  | 'intro'
  | 'about'
  | 'responsibilities'
  | 'profile'
  | 'application'
  | 'contact';

function SectionHeader({
  label,
  sectionKey,
  open,
  onToggle,
}: {
  label: string;
  sectionKey: SectionKey;
  open: boolean;
  onToggle: (k: SectionKey) => void;
}) {
  return (
    <button
      onClick={() => onToggle(sectionKey)}
      className="w-full flex items-center justify-between py-2 text-sm font-semibold text-gray-200 hover:text-white transition-colors"
    >
      <span>{label}</span>
      <span className="text-gray-500 text-xs">{open ? '▲' : '▼'}</span>
    </button>
  );
}

// ─── Main Sidebar ─────────────────────────────────────────────────────────────

export default function Sidebar({ data, onChange }: Props) {
  const set = <K extends keyof GeberitAd01Data>(key: K, value: GeberitAd01Data[K]) =>
    onChange({ ...data, [key]: value });

  const [open, setOpen] = useState<Record<SectionKey, boolean>>({
    background: true,
    hero: true,
    intro: true,
    about: false,
    responsibilities: false,
    profile: false,
    application: false,
    contact: false,
  });

  const toggle = (k: SectionKey) => setOpen((prev) => ({ ...prev, [k]: !prev[k] }));

  return (
    <div className="h-full overflow-y-auto px-4 py-4 space-y-0 text-white">
      {/* ── Background image ─────────────────────────────────────────────── */}
      <SectionHeader label="Background Image" sectionKey="background" open={open.background} onToggle={toggle} />
      {open.background && (
        <div className="pb-2">
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
      )}

      <Divider label="" />

      {/* ── Hero taglines ─────────────────────────────────────────────────── */}
      <SectionHeader label="Hero Taglines" sectionKey="hero" open={open.hero} onToggle={toggle} />
      {open.hero && (
        <div className="pb-2">
          <Field
            label="Tagline 1 (white, light)"
            value={data.tagline1}
            onChange={(v) => set('tagline1', v)}
            placeholder="YOUR IDEAS,"
          />
          <Field
            label="Tagline 2 (white, light)"
            value={data.tagline2}
            onChange={(v) => set('tagline2', v)}
            placeholder="OUR INNOVATIONS"
          />
          <div className="mb-3">
            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">
              Tagline 3{' '}
              <span style={{ color: '#B4CDF0' }}>■</span>{' '}
              (bold, light blue)
            </label>
            <input
              type="text"
              value={data.tagline3}
              onChange={(e) => set('tagline3', e.target.value)}
              placeholder="THE PERFECT FIT"
              className="w-full bg-gray-700 text-sm rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-500"
              style={{ color: '#B4CDF0' }}
            />
          </div>
        </div>
      )}

      <Divider label="" />

      {/* ── Job intro ────────────────────────────────────────────────────── */}
      <SectionHeader label="Job Introduction" sectionKey="intro" open={open.intro} onToggle={toggle} />
      {open.intro && (
        <div className="pb-2">
          <Field
            label="Label (small text)"
            value={data.lookingForLabel}
            onChange={(v) => set('lookingForLabel', v)}
            placeholder="We are looking for"
          />
          <Field
            label="Job Title (bold)"
            value={data.jobTitle}
            onChange={(v) => set('jobTitle', v)}
            placeholder="Job Title / Role"
          />
        </div>
      )}

      <Divider label="" />

      {/* ── About Geberit ─────────────────────────────────────────────────── */}
      <SectionHeader label="About Geberit" sectionKey="about" open={open.about} onToggle={toggle} />
      {open.about && (
        <div className="pb-2">
          <Field
            label="Section title"
            value={data.aboutTitle}
            onChange={(v) => set('aboutTitle', v)}
          />
          <Field
            label="Body text"
            value={data.aboutText}
            onChange={(v) => set('aboutText', v)}
            rows={6}
            placeholder="Company description…"
          />
        </div>
      )}

      <Divider label="" />

      {/* ── Responsibilities ─────────────────────────────────────────────── */}
      <SectionHeader
        label="Main Responsibilities"
        sectionKey="responsibilities"
        open={open.responsibilities}
        onToggle={toggle}
      />
      {open.responsibilities && (
        <div className="pb-2">
          <Field
            label="Section title"
            value={data.responsibilitiesTitle}
            onChange={(v) => set('responsibilitiesTitle', v)}
          />
          <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">
            Bullet points
          </label>
          <BulletListEditor
            items={data.responsibilitiesItems}
            onChange={(items) => set('responsibilitiesItems', items)}
            placeholder="Responsibility…"
          />
        </div>
      )}

      <Divider label="" />

      {/* ── Profile ──────────────────────────────────────────────────────── */}
      <SectionHeader label="Your Profile" sectionKey="profile" open={open.profile} onToggle={toggle} />
      {open.profile && (
        <div className="pb-2">
          <Field
            label="Section title"
            value={data.profileTitle}
            onChange={(v) => set('profileTitle', v)}
          />
          <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">
            Bullet points
          </label>
          <BulletListEditor
            items={data.profileItems}
            onChange={(items) => set('profileItems', items)}
            placeholder="Profile requirement…"
          />
        </div>
      )}

      <Divider label="" />

      {/* ── Application ──────────────────────────────────────────────────── */}
      <SectionHeader label="Application" sectionKey="application" open={open.application} onToggle={toggle} />
      {open.application && (
        <div className="pb-2">
          <Field
            label="Section title"
            value={data.applicationTitle}
            onChange={(v) => set('applicationTitle', v)}
          />
          <Field
            label="Body text"
            value={data.applicationText}
            onChange={(v) => set('applicationText', v)}
            rows={3}
          />
        </div>
      )}

      <Divider label="" />

      {/* ── Contact ──────────────────────────────────────────────────────── */}
      <SectionHeader label="Contact" sectionKey="contact" open={open.contact} onToggle={toggle} />
      {open.contact && (
        <div className="pb-2">
          <Field
            label="Section title"
            value={data.contactTitle}
            onChange={(v) => set('contactTitle', v)}
          />
          <Field
            label="Contact info (name, address, phone)"
            value={data.contactText}
            onChange={(v) => set('contactText', v)}
            rows={3}
            placeholder={'Geberit International AG\nHR Business Partner\nCH-8645 Jona, +41 55 221 62 60'}
          />
        </div>
      )}

      {/* Bottom spacer */}
      <div className="h-8" />
    </div>
  );
}
