'use client';

import React from 'react';

interface Props {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}

export default function BulletListEditor({ items, onChange, placeholder = 'One bullet per line…' }: Props) {
  const value = items.join('\n');

  const handleChange = (text: string) => {
    onChange(text.split('\n'));
  };

  return (
    <textarea
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      onFocus={(e) => e.currentTarget.select()}
      placeholder={placeholder}
      rows={Math.max(4, items.length + 1)}
      className="w-full rounded-md px-3 py-2 text-sm text-white placeholder-gray-600 resize-y focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
      style={{ backgroundColor: '#1e2130', border: '1px solid #2e3245' }}
    />
  );
}
