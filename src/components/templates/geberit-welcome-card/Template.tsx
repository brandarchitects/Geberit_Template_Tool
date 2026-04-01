'use client';

import React from 'react';
import { WelcomeCardData } from '@/types/template';
import { WC } from './constants';

interface Props {
  data: WelcomeCardData;
  previewMode?: boolean;
  baseUrl?: string;
}

function resolveBackgroundSrc(data: WelcomeCardData, baseUrl = ''): string {
  if (data.customBackgroundBase64) {
    return `data:${data.customBackgroundMimeType ?? 'image/jpeg'};base64,${data.customBackgroundBase64}`;
  }
  return `${baseUrl}/images/${data.backgroundImageId}.jpg`;
}

function resolveLogoSrc(baseUrl = ''): string {
  return `${baseUrl}/images/Logo_Geberit_white_transparent.png`;
}

export default function WelcomeCardTemplate({ data, previewMode = true, baseUrl = '' }: Props) {
  const bgSrc   = resolveBackgroundSrc(data, previewMode ? '' : baseUrl);
  const logoSrc = resolveLogoSrc(previewMode ? '' : baseUrl);

  const o = data.gradientOpacity;
  const gradient = `linear-gradient(to top,
    rgba(0,70,115,${o}) 0%,
    rgba(0,70,115,${(o * 0.75).toFixed(2)}) 40%,
    rgba(0,70,115,${(o * 0.35).toFixed(2)}) 65%,
    transparent 85%)`;

  return (
    <div
      id="geberit-welcome-card"
      style={{
        width: WC.pageWidth,
        height: WC.pageHeight,
        position: 'relative',
        overflow: 'hidden',
        fontFamily: WC.fontFamily,
      }}
    >
      {/* ── Full-bleed background image ─────────────────────────────────── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={bgSrc}
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
        }}
      />

      {/* ── Gradient overlay ────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: gradient,
          mixBlendMode: 'multiply',
        }}
      />

      {/* ── Geberit Logo ────────────────────────────────────────────────── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoSrc}
        alt="GEBERIT"
        style={{
          position: 'absolute',
          top: WC.logoTop,
          right: WC.logoRight,
          width: WC.logoWidth,
          height: 'auto',
        }}
      />

      {/* ── Text content — anchored to bottom-left ───────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: WC.contentBottom,
          left: WC.contentLeft,
          maxWidth: WC.contentMaxWidth,
        }}
      >
        {/* Tagline 1 — white, light */}
        <div style={{
          fontFamily: WC.fontFamily,
          fontWeight: 300,
          fontSize: WC.taglineFontSize,
          lineHeight: WC.taglineLineHeight,
          color: WC.white,
          textTransform: 'uppercase',
        }}>
          {data.tagline1}
        </div>

        {/* Tagline 2 — white, light */}
        <div style={{
          fontFamily: WC.fontFamily,
          fontWeight: 300,
          fontSize: WC.taglineFontSize,
          lineHeight: WC.taglineLineHeight,
          color: WC.white,
          textTransform: 'uppercase',
        }}>
          {data.tagline2}
        </div>

        {/* Tagline 3 — light blue, bold */}
        <div style={{
          fontFamily: WC.fontFamily,
          fontWeight: 700,
          fontSize: WC.taglineFontSize,
          lineHeight: WC.taglineLineHeight,
          color: WC.perfectFitBlue,
          textTransform: 'uppercase',
          marginBottom: WC.bodyMarginTop,
        }}>
          {data.tagline3}
        </div>

        {/* Salutation */}
        <div style={{
          fontFamily: WC.fontFamily,
          fontWeight: 400,
          fontSize: WC.bodySize,
          lineHeight: WC.bodyLineHeight,
          color: WC.white,
        }}>
          {data.salutation}
        </div>

        {/* Body text */}
        <div style={{
          fontFamily: WC.fontFamily,
          fontWeight: 400,
          fontSize: WC.bodySize,
          lineHeight: WC.bodyLineHeight,
          color: WC.white,
          whiteSpace: 'pre-line',
        }}>
          {data.bodyText}
        </div>

        {/* Sign-off */}
        <div style={{
          fontFamily: WC.fontFamily,
          fontWeight: 400,
          fontSize: WC.bodySize,
          lineHeight: WC.bodyLineHeight,
          color: WC.white,
          marginTop: WC.signoffMarginTop,
          whiteSpace: 'pre-line',
        }}>
          {data.signoff}
        </div>
      </div>
    </div>
  );
}
