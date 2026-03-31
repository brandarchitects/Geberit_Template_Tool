'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Login failed');
        return;
      }

      const from = searchParams.get('from') ?? '/editor';
      router.replace(from);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0f1117' }}>
      <div className="w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div
            className="inline-block w-3 h-3 rounded-sm mb-4"
            style={{ backgroundColor: '#004673' }}
          />
          <h1 className="text-white text-xl font-semibold tracking-wide">
            Geberit Template Tool
          </h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to continue</p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-lg p-6 space-y-4"
          style={{ backgroundColor: '#1a1d27', border: '1px solid #2a2d3a' }}
        >
          <div>
            <label
              htmlFor="password"
              className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wide"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="w-full rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ backgroundColor: '#252836', border: '1px solid #3a3d4a' }}
              placeholder="Enter password"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-2 text-sm font-medium text-white rounded transition-opacity disabled:opacity-50"
            style={{ backgroundColor: '#004673' }}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
