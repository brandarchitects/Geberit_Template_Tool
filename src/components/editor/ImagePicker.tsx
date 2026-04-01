'use client';

import React, { useRef } from 'react';
import { BACKGROUND_IMAGES } from '@/lib/backgroundImages';

interface Props {
  selectedId: string;
  customBase64?: string;
  customMimeType?: string;
  onSelect: (id: string) => void;
  onCustomUpload: (base64: string, mimeType: string) => void;
  gradientOpacity: number;
  onGradientChange: (val: number) => void;
}

export default function ImagePicker({
  selectedId,
  customBase64,
  onSelect,
  onCustomUpload,
  gradientOpacity,
  onGradientChange,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const [meta, base64] = dataUrl.split(',');
      const mimeType = meta.split(':')[1].split(';')[0];
      onCustomUpload(base64, mimeType);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const isCustomActive = selectedId === 'custom' && !!customBase64;
  const previewSrc = isCustomActive
    ? `data:image/jpeg;base64,${customBase64}`
    : `/images/${selectedId}.jpg`;

  return (
    <div className="space-y-3">

      {/* ── Selected image preview ─────────────────────────────────────── */}
      <div
        className="relative w-full rounded-lg overflow-hidden"
        style={{ aspectRatio: '16/9', backgroundColor: '#1c2035' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={previewSrc}
          src={previewSrc}
          alt="Selected background"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute bottom-0 left-0 right-0 px-2 py-1 text-[10px] font-semibold truncate"
          style={{ background: 'rgba(0,0,0,0.55)', color: 'rgba(255,255,255,0.7)' }}
        >
          {isCustomActive ? 'Custom image' : selectedId}
        </div>
      </div>

      {/* ── Grid thumbnails ───────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-1">
        {BACKGROUND_IMAGES.map((id) => {
          const active = selectedId === id && !isCustomActive;
          const num = id.replace('Geberit_Ad_', '');
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              title={id}
              className="relative rounded overflow-hidden transition-all"
              style={{
                aspectRatio: '3/2',
                outline: active ? '2px solid #3b82f6' : '2px solid transparent',
                outlineOffset: '1px',
              }}
            >
              {/* Number fallback layer (behind image) */}
              <div
                className="absolute inset-0 flex items-center justify-center text-[9px] font-bold"
                style={{ backgroundColor: '#1c2035', color: '#374151' }}
              >
                {num}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/${id}.jpg`}
                alt={id}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Active check badge */}
              {active && (
                <div
                  className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#3b82f6' }}
                >
                  <svg className="w-2 h-2 text-white" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1.5 5l2.5 2.5 4.5-4.5" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Custom upload ─────────────────────────────────────────────── */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full py-1.5 text-xs rounded border border-dashed transition-colors"
        style={{
          borderColor: isCustomActive ? '#3b82f6' : '#2a2f4a',
          color: isCustomActive ? '#93c5fd' : '#6b7280',
        }}
      >
        {isCustomActive ? '✓ Custom image active — click to replace' : '↑ Upload custom image'}
      </button>

      {/* ── Gradient opacity ──────────────────────────────────────────── */}
      <div>
        <div className="flex justify-between text-[11px] mb-1">
          <span className="text-gray-500 uppercase tracking-widest font-semibold">Gradient</span>
          <span className="text-gray-300 font-medium">{Math.round(gradientOpacity * 100)}%</span>
        </div>
        <input
          type="range" min={0} max={1} step={0.01}
          value={gradientOpacity}
          onChange={(e) => onGradientChange(parseFloat(e.target.value))}
          className="w-full accent-blue-400"
        />
      </div>

    </div>
  );
}
