'use client';

import React from 'react';

interface Props {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}

/**
 * Single textarea — each line becomes one bullet point.
 * Empty lines are ignored in the template output.
 */
export default function BulletListEditor({ items, onChange, placeholder }: Props) {
  const text = items.join('\n');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const lines = e.target.value.split('\n');
    onChange(lines);
  };

  return (
    <textarea
      value={text}
      onChange={handleChange}
      onFocus={(e) => e.currentTarget.select()}
      placeholder={placeholder ?? 'One bullet per line…'}
      rows={Math.max(4, items.length + 1)}
      className="w-full rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-700 resize-y focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
      style={{
        backgroundColor: '#1c2035',
        border: '1px solid #2a2f4a',
        lineHeight: '1.6',
      }}
    />
  );
}
