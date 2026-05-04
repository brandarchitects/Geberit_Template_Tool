'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AnyTemplateData, GeberitAd01Data, WelcomeCardData } from '@/types/template';
import { defaultData as ad01Defaults } from '@/components/templates/geberit-ad-01/defaultData';
import { defaultData as welcomeCardDefaults } from '@/components/templates/geberit-welcome-card/defaultData';
import GeberitAd01Template from '@/components/templates/geberit-ad-01/Template';
import WelcomeCardTemplate from '@/components/templates/geberit-welcome-card/Template';
import Sidebar from '@/components/editor/Sidebar';
import WelcomeCardSidebar from '@/components/editor/WelcomeCardSidebar';
import Toolbar from '@/components/editor/Toolbar';

const SIDEBAR_WIDTH = 380;

// A4 portrait at 96 dpi
const A4_W = 794;
const A4_H = 1123;

// JIS B5 landscape at 96 dpi (~971 × 688)
const WC_W = 971;
const WC_H = 688;

export default function EditorPage() {
  const [templateId, setTemplateId] = useState('geberit-ad-01');
  const [ad01Data, setAd01Data] = useState<GeberitAd01Data>(ad01Defaults);
  const [wcData, setWcData] = useState<WelcomeCardData>(welcomeCardDefaults);

  const previewWrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.75);

  const isWelcomeCard = templateId === 'geberit-welcome-card';
  const tplW = isWelcomeCard ? WC_W : A4_W;
  const tplH = isWelcomeCard ? WC_H : A4_H;

  // Recalculate scale whenever wrapper size or template dimensions change
  useEffect(() => {
    const calc = () => {
      if (!previewWrapperRef.current) return;
      const { clientWidth, clientHeight } = previewWrapperRef.current;
      const padding = 40;
      const scaleW = (clientWidth - padding) / tplW;
      const scaleH = (clientHeight - padding) / tplH;
      setScale(Math.min(scaleW, scaleH, 1));
    };
    calc();
    const ro = new ResizeObserver(calc);
    if (previewWrapperRef.current) ro.observe(previewWrapperRef.current);
    return () => ro.disconnect();
  }, [tplW, tplH]);

  const currentData: AnyTemplateData = isWelcomeCard ? wcData : ad01Data;

  const handleImport = (imported: AnyTemplateData) => {
    if (isWelcomeCard) {
      setWcData(imported as WelcomeCardData);
    } else {
      setAd01Data(imported as GeberitAd01Data);
    }
  };

  const handleReset = () => {
    if (isWelcomeCard) setWcData(welcomeCardDefaults);
    else setAd01Data(ad01Defaults);
  };

  const handleTemplateChange = (id: string) => {
    setTemplateId(id);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ backgroundColor: '#0f1117' }}>
      {/* ── Toolbar ─────────────────────────────────────────────────────── */}
      <Toolbar
        data={currentData}
        templateId={templateId}
        onTemplateChange={handleTemplateChange}
        onImport={handleImport}
        onReset={handleReset}
      />

      {/* ── Main area ───────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Preview canvas */}
        <div
          ref={previewWrapperRef}
          className="flex-1 flex items-start justify-center overflow-auto py-5"
          style={{ backgroundColor: '#1a1d27' }}
        >
          <div
            style={{
              width: tplW * scale,
              height: tplH * scale,
              flexShrink: 0,
              position: 'relative',
              boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
            }}
          >
            <div
              style={{
                transformOrigin: 'top left',
                transform: `scale(${scale})`,
                width: tplW,
                height: tplH,
              }}
            >
              {isWelcomeCard ? (
                <WelcomeCardTemplate data={wcData} previewMode={true} />
              ) : (
                <GeberitAd01Template data={ad01Data} previewMode={true} />
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div
          style={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            backgroundColor: '#13151f',
            borderLeft: '1px solid #2a2d3a',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            className="px-4 py-3 text-xs uppercase tracking-widest font-semibold flex-shrink-0"
            style={{ borderBottom: '1px solid #2a2d3a', color: '#6b7280' }}
          >
            Edit Content
          </div>
          <div className="flex-1 overflow-hidden">
            {isWelcomeCard ? (
              <WelcomeCardSidebar data={wcData} onChange={setWcData} />
            ) : (
              <Sidebar data={ad01Data} onChange={setAd01Data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
