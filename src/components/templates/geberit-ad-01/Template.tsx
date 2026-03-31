'use client';

import React from 'react';
import { GeberitAd01Data } from '@/types/template';
import { C } from './constants';

interface Props {
  data: GeberitAd01Data;
  /** When true, images are served from /images/…  When false (PDF mode), pass absolute URLs or base64 via data. */
  previewMode?: boolean;
  /** Absolute base URL used to resolve asset URLs in PDF mode */
  baseUrl?: string;
}

function resolveBackgroundSrc(data: GeberitAd01Data, baseUrl = ''): string {
  if (data.customBackgroundBase64) {
    return `data:${data.customBackgroundMimeType ?? 'image/jpeg'};base64,${data.customBackgroundBase64}`;
  }
  return `${baseUrl}/images/backgrounds/${data.backgroundImageId}.jpg`;
}

function resolveLogoSrc(baseUrl = ''): string {
  return `${baseUrl}/images/Logo_Geberit_white_transparent.png`;
}

// ─── Section block ────────────────────────────────────────────────────────────

interface SectionProps {
  title: string;
  text?: string;
  items?: string[];
  /** Blue title + separator (default true). False = bold black title, no line */
  blueTitle?: boolean;
}

function Section({ title, text, items, blueTitle = true }: SectionProps) {
  return (
    <div style={{ marginBottom: '4mm' }}>
      {/* Title row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: C.separatorMarginTop,
        }}
      >
        <span
          style={{
            fontFamily: "'AktivGrotesk-Bold', 'AktivGrotesk', Arial, sans-serif",
            fontWeight: C.sectionTitleWeight,
            fontSize: C.sectionTitleSize,
            color: blueTitle ? C.geberitBlue : C.textBlack,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            flexShrink: 0,
            marginRight: '2mm',
          }}
        >
          {title}
        </span>
        {blueTitle && (
          <div
            style={{
              flex: 1,
              height: C.separatorThickness,
              backgroundColor: C.separatorColor,
              marginTop: '0.5mm',
            }}
          />
        )}
      </div>

      {/* Body text */}
      {text && (
        <div
          style={{
            fontFamily: "'AktivGrotesk', Arial, sans-serif",
            fontWeight: 400,
            fontSize: C.bodySize,
            color: C.textBlack,
            lineHeight: C.lineHeight,
            whiteSpace: 'pre-line',
          }}
        >
          {text}
        </div>
      )}

      {/* Bullet list */}
      {items && items.length > 0 && (
        <ul
          style={{
            margin: 0,
            paddingLeft: '3.5mm',
            listStyleType: 'disc',
          }}
        >
          {items.map((item, i) => (
            <li
              key={i}
              style={{
                fontFamily: "'AktivGrotesk', Arial, sans-serif",
                fontWeight: 400,
                fontSize: C.bulletSize,
                color: C.textBlack,
                lineHeight: C.lineHeight,
                marginBottom: '0.5mm',
                paddingLeft: '0.5mm',
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Main Template ────────────────────────────────────────────────────────────

export default function GeberitAd01Template({ data, previewMode = true, baseUrl = '' }: Props) {
  const bgSrc = resolveBackgroundSrc(data, previewMode ? '' : baseUrl);
  const logoSrc = resolveLogoSrc(previewMode ? '' : baseUrl);

  return (
    <div
      id="geberit-ad-01"
      style={{
        width: C.pageWidth,
        height: C.pageHeight,
        position: 'relative',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        fontFamily: "'AktivGrotesk', Arial, sans-serif",
      }}
    >
      {/* ── Hero section ─────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: C.pageWidth,
          height: C.heroHeight,
          overflow: 'hidden',
        }}
      >
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgSrc}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />

        {/* Gradient overlay — Geberit Blue → transparent, bottom to top */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to top, rgba(0,70,115,${data.gradientOpacity}) 0%, rgba(0,70,115,${data.gradientOpacity * 0.3}) 45%, transparent 75%)`,
          }}
        />

        {/* Geberit Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt="GEBERIT"
          style={{
            position: 'absolute',
            top: C.logoTop,
            right: C.logoRight,
            width: C.logoWidth,
            height: 'auto',
          }}
        />

        {/* Taglines */}
        <div
          style={{
            position: 'absolute',
            bottom: C.taglineBottom,
            left: C.taglineLeft,
          }}
        >
          <div
            style={{
              fontFamily: "'AktivGrotesk-Light', 'AktivGrotesk', Arial, sans-serif",
              fontWeight: 300,
              fontSize: C.taglineFontSize,
              color: C.white,
              lineHeight: C.taglineLineHeight,
              textTransform: 'uppercase',
            }}
          >
            {data.tagline1}
          </div>
          <div
            style={{
              fontFamily: "'AktivGrotesk-Light', 'AktivGrotesk', Arial, sans-serif",
              fontWeight: 300,
              fontSize: C.taglineFontSize,
              color: C.white,
              lineHeight: C.taglineLineHeight,
              textTransform: 'uppercase',
            }}
          >
            {data.tagline2}
          </div>
          <div
            style={{
              fontFamily: "'AktivGrotesk-Bold', 'AktivGrotesk', Arial, sans-serif",
              fontWeight: 700,
              fontSize: C.taglineFontSize,
              color: C.perfectFitBlue,
              lineHeight: C.taglineLineHeight,
              textTransform: 'uppercase',
            }}
          >
            {data.tagline3}
          </div>
        </div>
      </div>

      {/* ── Content section ──────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: C.heroHeight,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          paddingTop: C.contentPaddingTop,
          paddingBottom: C.contentPaddingBottom,
          paddingLeft: C.contentPaddingLeft,
          paddingRight: C.contentPaddingRight,
          gap: C.columnGap,
          boxSizing: 'border-box',
        }}
      >
        {/* ── Left column ──────────────────────────────────────────────── */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          {/* Job title intro */}
          <div style={{ marginBottom: '5mm' }}>
            <div
              style={{
                fontFamily: "'AktivGrotesk-Light', 'AktivGrotesk', Arial, sans-serif",
                fontWeight: C.lookingForWeight,
                fontSize: C.lookingForSize,
                color: C.textBlack,
                lineHeight: 1.3,
                marginBottom: '1mm',
              }}
            >
              {data.lookingForLabel}
            </div>
            <div
              style={{
                fontFamily: "'AktivGrotesk-Bold', 'AktivGrotesk', Arial, sans-serif",
                fontWeight: C.jobTitleWeight,
                fontSize: C.jobTitleSize,
                color: C.textBlack,
                lineHeight: 1.2,
              }}
            >
              {data.jobTitle}
            </div>
          </div>

          <Section title={data.aboutTitle} text={data.aboutText} />
          <Section title={data.responsibilitiesTitle} items={data.responsibilitiesItems} />
        </div>

        {/* ── Right column ─────────────────────────────────────────────── */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <Section title={data.profileTitle} items={data.profileItems} />
          <Section
            title={data.applicationTitle}
            text={data.applicationText}
            blueTitle={false}
          />
          <Section
            title={data.contactTitle}
            text={data.contactText}
            blueTitle={false}
          />
        </div>
      </div>
    </div>
  );
}
