'use client';

import { useState, useCallback } from 'react';
import { copyToClipboard } from '@/lib/utils';

function generatePassword(length: number, useUpper: boolean, useLower: boolean, useDigits: boolean, useSymbols: boolean): string {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  let chars = '';
  if (useUpper) chars += upper;
  if (useLower) chars += lower;
  if (useDigits) chars += digits;
  if (useSymbols) chars += symbols;
  if (!chars) return '';
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array).map(v => chars[v % chars.length]).join('');
}

function estimateStrength(length: number, charTypes: number): { label: string; color: string; width: string } {
  const score = length * charTypes;
  if (score < 20) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/4' };
  if (score < 40) return { label: 'Fair', color: 'bg-yellow-500', width: 'w-2/4' };
  if (score < 60) return { label: 'Strong', color: 'bg-green-500', width: 'w-3/4' };
  return { label: 'Very Strong', color: 'bg-green-600', width: 'w-full' };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const types = [useUpper, useLower, useDigits, useSymbols].filter(Boolean).length;
    if (types === 0) return;
    setPassword(generatePassword(length, useUpper, useLower, useDigits, useSymbols));
  }, [length, useUpper, useLower, useDigits, useSymbols]);

  const handleCopy = async () => {
    if (!password) return;
    await copyToClipboard(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = password ? estimateStrength(length, [useUpper, useLower, useDigits, useSymbols].filter(Boolean).length) : null;

  return (
    <div className="tool-section">
      <div>
        <label className="label-text">Password Length: {length}</label>
        <input type="range" min="4" max="128" value={length} onChange={e => setLength(Number(e.target.value))} className="w-full accent-primary-600" />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>4</span>
          <span>128</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Uppercase (A-Z)', val: useUpper, set: setUseUpper },
          { label: 'Lowercase (a-z)', val: useLower, set: setUseLower },
          { label: 'Digits (0-9)', val: useDigits, set: setUseDigits },
          { label: 'Symbols (!@#)', val: useSymbols, set: setUseSymbols },
        ].map(({ label, val, set }) => (
          <label key={label} className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={val} onChange={() => set(!val)} className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
            <span className="text-sm text-gray-700">{label}</span>
          </label>
        ))}
      </div>

      <button onClick={generate} className="btn-primary w-full">Generate Password</button>

      {password && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <input type="text" readOnly value={password} className="input-field font-mono text-base" />
            <button onClick={handleCopy} className="btn-secondary shrink-0">
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          {strength && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Strength:</span>
                <span className="font-semibold">{strength.label}</span>
              </div>
              <div className="h-2 rounded-full bg-gray-200">
                <div className={`h-2 rounded-full transition-all ${strength.color} ${strength.width}`} />
              </div>
            </div>
          )}
        </div>
      )}

      {!password && (
        <p className="text-center text-sm text-gray-400">Select character types and click Generate</p>
      )}
    </div>
  );
}
