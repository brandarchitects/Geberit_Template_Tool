'use client';

import React, { useState, useRef, useEffect } from 'react';
import { GeberitAd01Data, WelcomeCardData, AnyTemplateData } from '@/types/template';
import { defaultData as defaultAd01 } from '@/components/templates/geberit-ad-01/defaultData';
import { defaultWelcomeCardData } from '@/components/templates/geberit-welcome-card/defaultData';
import GeberitAd01Template from '@/components/templates/geberit-ad-01/Template';
import WelcomeCardTemplate from '@/components/templates/geberit-welcome-card/Template';
import Sidebar from '@/components/editor/Sidebar';
import WelcomeCardSidebar from '@/components/editor/WelcomeCardSidebar';
import Toolbar from '@/components/editor/Toolbar';

const SIDEBAR_WIDTH = 380;

// Physical dimensions in mm
const TEMPLATES_DIM: Record<string, { w: number; h: number }> = {
  'geberit-ad-01':        { w: 210, h: 297 },  // A4 portrait
  'geberit-welcome-card': { w: 257, h: 182 },  // B5 landscape
};

// Convert mm to px at 96 dpi
const mmToPx = (mm: number) => Math.round((mm * 96) / 25.4);

export default function EditorPage() {
  const [activeTemplate, setActiveTemplate] = useState('geberit-ad-01');
  const [ad01Data, setAd01Data]             = useState<GeberitAd01Data>(defaultAd01);
  const [cardData, setCardData]             = useState<WelcomeCardData>(defaultWelcomeCardData);

  const previewWrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.75);

  const dim = TEMPLATES_DIM[activeTemplate];
  const pxW = mmToPx(dim.w);
  const pxH = mmToPx(dim.h);

  useEffect(() => {
    const calc = () => {
      if (!previewWrapperRef.current) return;
      const { clientWidth, clientHeight } = previewWrapperRef.current;
      const padding = 48;
      const scaleW = (clientWidth  - padding) / pxW;
      const scaleH = (clientHeight - padding) / pxH;
      setScale(Math.min(scaleW, scaleH, 1));
    };
    calc();
    const ro = new ResizeObserver(calc);
    if (previewWrapperRef.current) ro.observe(previewWrapperRef.current);
    return () => ro.disconnect();
  }, [pxW, pxH]);

  // Active data / setters
  const activeData: AnyTemplateData = activeTemplate === 'geberit-welcome-card' ? cardData : ad01Data;

  const handleImport = (importedTemplateId: string, importedData: AnyTemplateData) => {
    if (importedTemplateId === 'geberit-welcome-card') {
      setCardData(importedData as WelcomeCardData);
      setActiveTemplate('geberit-welcome-card');
    } else {
      setAd01Data(importedData as GeberitAd01Data);
      setActiveTemplate('geberit-ad-01');
    }
  };

  const handleReset = () => {
    if (activeTemplate === 'geberit-welcome-card') setCardData(defaultWelcomeCardData);
    else setAd01Data(defaultAd01);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ backgroundColor: '#0f1117' }}>

      {/* ── Toolbar ─────────────────────────────────────────────────────── */}
      <Toolbar
        data={activeData}
        templateId={activeTemplate}
        onTemplateChange={setActiveTemplate}
        onImport={handleImport}
        onReset={handleReset}
      />

      {/* ── Main area ───────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Preview canvas */}
        <div
          ref={previewWrapperRef}
          className="flex-1 flex items-center justify-center overflow-auto py-6"
          style={{ backgroundColor: '#1a1d27' }}
        >
          <div style={{
            width:  pxW * scale,
            height: pxH * scale,
            flexShrink: 0,
            position: 'relative',
            boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
          }}>
            <div style={{ transformOrigin: 'top left', transform: `scale(${scale})`, width: pxW, height: pxH }}>
              {activeTemplate === 'geberit-welcome-card'
                ? <WelcomeCardTemplate data={cardData}  previewMode={true} />
                : <GeberitAd01Template data={ad01Data} previewMode={true} />
              }
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          backgroundColor: '#13151f',
          borderLeft: '1px solid #1e2235',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Sidebar header */}
          <div className="px-4 py-3 text-xs uppercase tracking-widest font-semibold flex-shrink-0"
            style={{ borderBottom: '1px solid #1e2235', color: '#6b7280' }}>
            Edit Content
          </div>

          {/* Sidebar body */}
          <div className="flex-1 overflow-hidden">
            {activeTemplate === 'geberit-welcome-card'
              ? <WelcomeCardSidebar data={cardData}  onChange={setCardData} />
              : <Sidebar            data={ad01Data} onChange={setAd01Data} />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
