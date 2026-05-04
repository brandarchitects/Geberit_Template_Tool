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

  return (
    <div className="space-y-3">
      {/* 4-column compact grid */}
      <div className="grid grid-cols-4 gap-1.5">
        {BACKGROUND_IMAGES.map((id, idx) => {
          const isActive = selectedId === id && !isCustomActive;
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              title={id.replace('Geberit_Ad_', 'Image ')}
              className={`relative aspect-[3/2] rounded overflow-hidden border-2 transition-colors ${
                isActive ? 'border-blue-400' : 'border-transparent hover:border-gray-500'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/${id}.jpg`}
                alt={id}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              {/* Number badge fallback */}
              <div className="absolute inset-0 bg-gray-700 flex items-center justify-center text-gray-500 text-[10px] font-medium -z-10">
                {idx + 1}
              </div>
              {/* Blue checkmark when active */}
              {isActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-blue-500/20">
                  <div className="w-4 h-4 rounded-full bg-blue-400 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Custom upload */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className={`w-full py-2 text-sm rounded border-2 border-dashed transition-colors ${
            isCustomActive
              ? 'border-blue-400 text-white bg-gray-700'
              : 'border-gray-600 text-gray-400 hover:border-gray-400 hover:text-white'
          }`}
        >
          {isCustomActive ? '✓ Custom image active — click to replace' : '↑ Upload custom image'}
        </button>
      </div>

      {/* Gradient opacity */}
      <div>
        <label className="block text-xs text-gray-400 mb-1">
          Gradient opacity: <span className="text-white font-medium">{Math.round(gradientOpacity * 100)}%</span>
        </label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={gradientOpacity}
          onChange={(e) => onGradientChange(parseFloat(e.target.value))}
          className="w-full accent-blue-400"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-0.5">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
