'use client';

import React, { useState } from 'react';
import { GeberitAd01Data } from '@/types/template';
import BulletListEditor from './BulletListEditor';
import ImagePicker from './ImagePicker';

interface Props {
  data: GeberitAd01Data;
  onChange: (data: GeberitAd01Data) => void;
}

// ─── Field ────────────────────────────────────────────────────────────────────

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
  accent?: string; // optional colored dot/swatch next to label
}) {
  return (
    <div className="mb-4">
      <label className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
        {accent && (
          <span
            className="inline-block w-2 h-2 rounded-sm flex-shrink-0"
            style={{ backgroundColor: accent }}
          />
        )}
        {label}
      </label>
      {rows === 1 ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? label}
          className="w-full rounded-md px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
          style={{ backgroundColor: '#1e2130', border: '1px solid #2e3245' }}
        />
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder ?? label}
          className="w-full rounded-md px-3 py-2 text-sm text-white placeholder-gray-600 resize-y focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
          style={{ backgroundColor: '#1e2130', border: '1px solid #2e3245' }}
        />
      )}
    </div>
  );
}

// ─── Accordion section ────────────────────────────────────────────────────────

function AccordionSection({
  label,
  badge,
  open,
  onToggle,
  children,
}: {
  label: string;
  badge?: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="border-b"
      style={{ borderColor: '#1e2130' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/5 transition-colors group"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
            {label}
          </span>
          {badge && (
            <span
              className="text-[10px] font-semibold px-1.5 py-0.5 rounded text-gray-400"
              style={{ backgroundColor: '#1e2130' }}
            >
              {badge}
            </span>
          )}
        </div>
        <svg
          className="w-4 h-4 text-gray-500 flex-shrink-0 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-4 pt-1 pb-4">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Subsection label ─────────────────────────────────────────────────────────

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-2 mt-1">
      {children}
    </p>
  );
}

// ─── Main Sidebar ─────────────────────────────────────────────────────────────

type SectionKey = 'background' | 'hero' | 'intro' | 'about' | 'responsibilities' | 'profile' | 'application' | 'contact';

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

  const toggle = (k: SectionKey) => setOpen((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ color: '#e5e7eb' }}>

      {/* ── Background & Gradient ─────────────────────────────────────────── */}
      <AccordionSection
        label="Background Image"
        open={open.background}
        onToggle={() => toggle('background')}
      >
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
      </AccordionSection>

      {/* ── Hero Taglines ─────────────────────────────────────────────────── */}
      <AccordionSection
        label="Hero Taglines"
        badge="40 pt"
        open={open.hero}
        onToggle={() => toggle('hero')}
      >
        <Field
          label="Line 1 — white · light"
          value={data.tagline1}
          onChange={(v) => set('tagline1', v)}
          placeholder="YOUR IDEAS,"
        />
        <Field
          label="Line 2 — white · light"
          value={data.tagline2}
          onChange={(v) => set('tagline2', v)}
          placeholder="OUR INNOVATIONS"
        />
        <div className="mb-4">
          <label className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
            <span
              className="inline-block w-2 h-2 rounded-sm flex-shrink-0"
              style={{ backgroundColor: '#B4CDF0' }}
            />
            Line 3 — bold · light blue
          </label>
          <input
            type="text"
            value={data.tagline3}
            onChange={(e) => set('tagline3', e.target.value)}
            placeholder="THE PERFECT FIT"
            className="w-full rounded-md px-3 py-2 text-sm placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
            style={{
              backgroundColor: '#1e2130',
              border: '1px solid #2e3245',
              color: '#B4CDF0',
            }}
          />
        </div>
      </AccordionSection>

      {/* ── Job Introduction ──────────────────────────────────────────────── */}
      <AccordionSection
        label="Job Introduction"
        open={open.intro}
        onToggle={() => toggle('intro')}
      >
        <Field
          label="Label — 11 pt · light"
          value={data.lookingForLabel}
          onChange={(v) => set('lookingForLabel', v)}
          placeholder="We are looking for"
        />
        <Field
          label="Job Title — bold"
          value={data.jobTitle}
          onChange={(v) => set('jobTitle', v)}
          placeholder="Job Title / Role"
        />
      </AccordionSection>

      {/* Scrollable area for remaining sections */}
      <div className="flex-1 overflow-y-auto">

        {/* ── About Geberit ─────────────────────────────────────────────── */}
        <AccordionSection
          label="About Geberit"
          open={open.about}
          onToggle={() => toggle('about')}
        >
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
        </AccordionSection>

        {/* ── Responsibilities ──────────────────────────────────────────── */}
        <AccordionSection
          label="Main Responsibilities"
          badge={`${data.responsibilitiesItems.length} items`}
          open={open.responsibilities}
          onToggle={() => toggle('responsibilities')}
        >
          <Field
            label="Section title"
            value={data.responsibilitiesTitle}
            onChange={(v) => set('responsibilitiesTitle', v)}
          />
          <SubLabel>Bullet points</SubLabel>
          <BulletListEditor
            items={data.responsibilitiesItems}
            onChange={(items) => set('responsibilitiesItems', items)}
            placeholder="Responsibility…"
          />
        </AccordionSection>

        {/* ── Your Profile ──────────────────────────────────────────────── */}
        <AccordionSection
          label="Your Profile"
          badge={`${data.profileItems.length} items`}
          open={open.profile}
          onToggle={() => toggle('profile')}
        >
          <Field
            label="Section title"
            value={data.profileTitle}
            onChange={(v) => set('profileTitle', v)}
          />
          <SubLabel>Bullet points</SubLabel>
          <BulletListEditor
            items={data.profileItems}
            onChange={(items) => set('profileItems', items)}
            placeholder="Profile requirement…"
          />
        </AccordionSection>

        {/* ── Application ───────────────────────────────────────────────── */}
        <AccordionSection
          label="Application"
          open={open.application}
          onToggle={() => toggle('application')}
        >
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
        </AccordionSection>

        {/* ── Contact ───────────────────────────────────────────────────── */}
        <AccordionSection
          label="Contact"
          open={open.contact}
          onToggle={() => toggle('contact')}
        >
          <Field
            label="Section title"
            value={data.contactTitle}
            onChange={(v) => set('contactTitle', v)}
          />
          <Field
            label="Name, address, phone"
            value={data.contactText}
            onChange={(v) => set('contactText', v)}
            rows={3}
            placeholder={'Geberit International AG\nHR Business Partner\nCH-8645 Jona, +41 55 221 62 60'}
          />
        </AccordionSection>

        <div className="h-6" />
      </div>
    </div>
  );
}
