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
  const bgSrc = resolveBackgroundSrc(data, previewMode ? '' : baseUrl);
  const logoSrc = resolveLogoSrc(previewMode ? '' : baseUrl);

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
      {/* Full-bleed background image */}
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

      {/* Gradient overlay — bottom to top, multiply */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to top, rgba(0,70,115,${data.gradientOpacity}) 0%, rgba(0,70,115,${data.gradientOpacity * 0.3}) 45%, transparent 75%)`,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Logo — top right */}
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

      {/* Text block — bottom left */}
      <div
        style={{
          position: 'absolute',
          bottom: WC.contentBottom,
          left: WC.contentLeft,
          maxWidth: WC.contentMaxWidth,
        }}
      >
        {/* Tagline 1 — white, light */}
        <div
          style={{
            fontFamily: WC.fontFamily,
            fontWeight: 300,
            fontSize: WC.taglineFontSize,
            color: WC.white,
            lineHeight: WC.taglineLineHeight,
            textTransform: 'uppercase',
          }}
        >
          {data.tagline1}
        </div>
        {/* Tagline 2 — white, light */}
        <div
          style={{
            fontFamily: WC.fontFamily,
            fontWeight: 300,
            fontSize: WC.taglineFontSize,
            color: WC.white,
            lineHeight: WC.taglineLineHeight,
            textTransform: 'uppercase',
          }}
        >
          {data.tagline2}
        </div>
        {/* Tagline 3 — light blue, bold */}
        <div
          style={{
            fontFamily: WC.fontFamily,
            fontWeight: 700,
            fontSize: WC.taglineFontSize,
            color: WC.perfectFitBlue,
            lineHeight: WC.taglineLineHeight,
            textTransform: 'uppercase',
          }}
        >
          {data.tagline3}
        </div>

        {/* Body text */}
        <div
          style={{
            marginTop: WC.bodyMarginTop,
            fontFamily: WC.fontFamily,
            fontWeight: 400,
            fontSize: WC.bodySize,
            color: WC.white,
            lineHeight: WC.bodyLineHeight,
            whiteSpace: 'pre-line',
          }}
        >
          {data.salutation}
        </div>
        <div
          style={{
            fontFamily: WC.fontFamily,
            fontWeight: 400,
            fontSize: WC.bodySize,
            color: WC.white,
            lineHeight: WC.bodyLineHeight,
            whiteSpace: 'pre-line',
          }}
        >
          {data.bodyText}
        </div>

        {/* Signoff */}
        <div
          style={{
            marginTop: WC.signoffMarginTop,
            fontFamily: WC.fontFamily,
            fontWeight: 400,
            fontSize: WC.bodySize,
            color: WC.white,
            lineHeight: WC.bodyLineHeight,
            whiteSpace: 'pre-line',
          }}
        >
          {data.signoff}
        </div>
      </div>
    </div>
  );
}
