'use client';

import { useState, useCallback } from 'react';
import CopyButton from '@/components/CopyButton';

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

function estimateStrength(length: number, charTypes: number): { label: string; color: string; width: string; score: number }[] {
  const maxScore = 128 * 4;
  const score = length * charTypes;
  const pct = Math.min(score / maxScore, 1);
  const segments = [
    { label: 'Weak', color: 'bg-red-500', threshold: 0.25 },
    { label: 'Fair', color: 'bg-orange-500', threshold: 0.5 },
    { label: 'Strong', color: 'bg-yellow-500', threshold: 0.75 },
    { label: 'Very Strong', color: 'bg-green-500', threshold: 1 },
  ];
  return segments.map(s => ({
    ...s,
    width: pct >= s.threshold ? '100%' : pct >= s.threshold - 0.25 ? `${((pct - (s.threshold - 0.25)) / 0.25) * 100}%` : '0%',
    score,
  }));
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generate = useCallback(() => {
    const types = [useUpper, useLower, useDigits, useSymbols].filter(Boolean).length;
    if (types === 0) return;
    setPassword(generatePassword(length, useUpper, useLower, useDigits, useSymbols));
  }, [length, useUpper, useLower, useDigits, useSymbols]);

  const segments = password ? estimateStrength(length, [useUpper, useLower, useDigits, useSymbols].filter(Boolean).length) : [];
  const activeLabel = segments.filter(s => s.width !== '0%').pop();

  return (
    <div className="tool-section">
      <div>
        <label className="label-premium">
          Password Length: <span className="font-bold text-primary-600 dark:text-primary-400">{length}</span>
        </label>
        <input
          type="range"
          min="4"
          max="128"
          value={length}
          onChange={e => setLength(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-primary-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1.5">
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
          <label key={label} className="flex items-center gap-3 cursor-pointer rounded-xl border-2 border-gray-200 dark:border-gray-700 px-4 py-3 transition-all duration-200 hover:border-primary-300 dark:hover:border-primary-600 has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50/50 dark:has-[:checked]:bg-primary-900/20">
            <input type="checkbox" checked={val} onChange={() => set(!val)} className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
          </label>
        ))}
      </div>

      <button onClick={generate} className="btn-premium w-full">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
        Generate Password
      </button>

      {password ? (
        <div className="animate-fade-in-up space-y-4">
          <div className="flex gap-2">
            <input type="text" readOnly value={password} className="input-premium font-mono text-base flex-1 cursor-pointer" onClick={() => navigator.clipboard.writeText(password)} />
            <CopyButton text={password} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Strength:</span>
              <span className={`font-semibold ${
                activeLabel?.label === 'Very Strong' ? 'text-green-600 dark:text-green-400' :
                activeLabel?.label === 'Strong' ? 'text-yellow-600 dark:text-yellow-400' :
                activeLabel?.label === 'Fair' ? 'text-orange-600 dark:text-orange-400' :
                'text-red-600 dark:text-red-400'
              }`}>{activeLabel?.label}</span>
            </div>
            <div className="h-2.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex gap-0.5">
              {segments.map((s, i) => (
                <div
                  key={i}
                  className={`h-full transition-all duration-700 ease-out ${s.color} ${s.width === '0%' ? 'opacity-0' : 'opacity-100'}`}
                  style={{
                    width: s.width,
                    transitionDelay: `${i * 100}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-sm text-gray-400 dark:text-gray-500">Select character types and click Generate</p>
      )}
    </div>
  );
}
