'use client';

import React from 'react';

interface Props {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}

export default function BulletListEditor({ items, onChange, placeholder = 'Enter item…' }: Props) {
  const update = (index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };

  const add = () => onChange([...items, '']);

  const remove = (index: number) => {
    const next = items.filter((_, i) => i !== index);
    onChange(next);
  };

  const move = (index: number, direction: -1 | 1) => {
    const next = [...items];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-1">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-1">
          {/* Move buttons */}
          <div className="flex flex-col pt-1 gap-0.5">
            <button
              onClick={() => move(i, -1)}
              disabled={i === 0}
              className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-20 text-xs leading-none"
              title="Move up"
            >
              ▲
            </button>
            <button
              onClick={() => move(i, 1)}
              disabled={i === items.length - 1}
              className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-20 text-xs leading-none"
              title="Move down"
            >
              ▼
            </button>
          </div>

          {/* Bullet indicator */}
          <span className="mt-2 text-gray-400 text-sm select-none">•</span>

          {/* Text input */}
          <textarea
            value={item}
            onChange={(e) => update(i, e.target.value)}
            placeholder={placeholder}
            rows={2}
            className="flex-1 bg-gray-700 text-white text-sm rounded px-2 py-1.5 resize-none focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-500"
          />

          {/* Remove button */}
          <button
            onClick={() => remove(i)}
            className="mt-1 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-red-400 text-lg leading-none flex-shrink-0"
            title="Remove item"
          >
            ×
          </button>
        </div>
      ))}

      <button
        onClick={add}
        className="mt-1 w-full py-1.5 text-sm text-gray-400 hover:text-white border border-dashed border-gray-600 hover:border-gray-400 rounded transition-colors"
      >
        + Add item
      </button>
    </div>
  );
}
