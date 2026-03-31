'use client';

import React, { useState, useRef, useEffect } from 'react';
import { GeberitAd01Data } from '@/types/template';
import { defaultData } from '@/components/templates/geberit-ad-01/defaultData';
import GeberitAd01Template from '@/components/templates/geberit-ad-01/Template';
import Sidebar from '@/components/editor/Sidebar';
import Toolbar from '@/components/editor/Toolbar';

const TEMPLATE_ID = 'geberit-ad-01';
const SIDEBAR_WIDTH = 380;

// A4 dimensions at 96dpi: 210mm × 297mm → 794 × 1123 px
const A4_PX_WIDTH = 794;
const A4_PX_HEIGHT = 1123;

export default function EditorPage() {
  const [data, setData] = useState<GeberitAd01Data>(defaultData);
  const previewWrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.75);

  // Recalculate preview scale on resize
  useEffect(() => {
    const calc = () => {
      if (!previewWrapperRef.current) return;
      const { clientWidth, clientHeight } = previewWrapperRef.current;
      const padding = 40;
      const scaleW = (clientWidth - padding) / A4_PX_WIDTH;
      const scaleH = (clientHeight - padding) / A4_PX_HEIGHT;
      setScale(Math.min(scaleW, scaleH, 1));
    };
    calc();
    const ro = new ResizeObserver(calc);
    if (previewWrapperRef.current) ro.observe(previewWrapperRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ backgroundColor: '#0f1117' }}>
      {/* ── Top toolbar ─────────────────────────────────────────────────── */}
      <Toolbar
        data={data}
        templateId={TEMPLATE_ID}
        onImport={(imported) => setData(imported)}
        onReset={() => setData(defaultData)}
      />

      {/* ── Main area ───────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Preview canvas */}
        <div
          ref={previewWrapperRef}
          className="flex-1 flex items-start justify-center overflow-auto py-5"
          style={{ backgroundColor: '#1a1d27' }}
        >
          {/* Scaled A4 container */}
          <div
            style={{
              width: A4_PX_WIDTH * scale,
              height: A4_PX_HEIGHT * scale,
              flexShrink: 0,
              position: 'relative',
              boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
            }}
          >
            <div
              style={{
                transformOrigin: 'top left',
                transform: `scale(${scale})`,
                width: A4_PX_WIDTH,
                height: A4_PX_HEIGHT,
              }}
            >
              <GeberitAd01Template data={data} previewMode={true} />
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
          {/* Sidebar header */}
          <div
            className="px-4 py-3 text-xs uppercase tracking-widest font-semibold flex-shrink-0"
            style={{
              borderBottom: '1px solid #2a2d3a',
              color: '#6b7280',
            }}
          >
            Edit Content
          </div>

          {/* Sidebar body */}
          <div className="flex-1 overflow-hidden">
            <Sidebar data={data} onChange={setData} />
          </div>
        </div>
      </div>
    </div>
  );
}
