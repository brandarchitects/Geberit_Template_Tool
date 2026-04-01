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
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: '#004673' }}
    >
      {/* Card */}
      <div
        className="w-full max-w-xs rounded-2xl overflow-hidden"
        style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.35)' }}
      >
        {/* Header band */}
        <div
          className="flex flex-col items-center justify-center py-8 px-8"
          style={{ backgroundColor: '#003558' }}
        >
          {/* Geberit logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/Logo_Geberit_white_transparent.png"
            alt="GEBERIT"
            style={{ width: '140px', height: 'auto', display: 'block' }}
          />
          <p
            className="mt-3 text-xs uppercase tracking-widest"
            style={{ color: 'rgba(255,255,255,0.55)', letterSpacing: '0.15em' }}
          >
            HR Template
          </p>
        </div>

        {/* Form body */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 px-8 py-7"
          style={{ backgroundColor: '#ffffff' }}
        >
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
              style={{ color: '#004673', letterSpacing: '0.1em' }}
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
              className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
              style={{
                backgroundColor: '#f4f6f9',
                border: '1px solid #dce3ed',
                color: '#1a2433',
              }}
              placeholder="Enter access password"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 -mt-1">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-2.5 text-sm font-semibold text-white rounded-lg transition-opacity disabled:opacity-40"
            style={{ backgroundColor: '#004673' }}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>

      {/* Footer */}
      <p className="mt-8 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
        © Geberit Group
      </p>
    </div>
  );
}
