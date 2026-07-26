'use client';

import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace(/^#/, '').match(/^([a-f0-9]{6})$/i);
  if (!m) return null;
  return { r: parseInt(m[1].slice(0, 2), 16), g: parseInt(m[1].slice(2, 4), 16), b: parseInt(m[1].slice(4, 6), 16) };
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  s /= 100; l /= 100;
  const fn = (n: number) => {
    const k = (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return { r: Math.round(fn(0) * 255), g: Math.round(fn(8) * 255), b: Math.round(fn(4) * 255) };
}

export default function ColorConverter() {
  const [hex, setHex] = useState('#3498db');
  const [rgb, setRgb] = useState('52, 152, 219');
  const [hsl, setHsl] = useState('210, 70%, 53%');
  const [error, setError] = useState('');

  function fromHex(value: string) {
    setHex(value);
    const c = hexToRgb(value);
    if (!c) { setError('Invalid hex color'); setRgb(''); setHsl(''); return; }
    setError('');
    setRgb(`${c.r}, ${c.g}, ${c.b}`);
    const hsl = rgbToHsl(c.r, c.g, c.b);
    setHsl(`${hsl.h}, ${hsl.s}%, ${hsl.l}%`);
  }

  function fromRgb(value: string) {
    setRgb(value);
    const parts = value.split(',').map(s => parseInt(s.trim()));
    if (parts.length !== 3 || parts.some(v => isNaN(v))) { setError('Invalid RGB. Format: R, G, B'); setHex(''); setHsl(''); return; }
    setError('');
    const [r, g, b] = parts;
    setHex(rgbToHex(r, g, b));
    const hsl = rgbToHsl(r, g, b);
    setHsl(`${hsl.h}, ${hsl.s}%, ${hsl.l}%`);
  }

  function fromHsl(value: string) {
    setHsl(value);
    const parts = value.split(',').map(s => parseInt(s.trim()));
    if (parts.length !== 3 || parts.some(v => isNaN(v))) { setError('Invalid HSL. Format: H, S%, L%'); setHex(''); setRgb(''); return; }
    setError('');
    const [h, s, l] = parts;
    const rgb = hslToRgb(h, s, l);
    setRgb(`${rgb.r}, ${rgb.g}, ${rgb.b}`);
    setHex(rgbToHex(rgb.r, rgb.g, rgb.b));
  }

  const validColor = hex && !error;

  return (
    <div className="tool-section">
      {validColor && (
        <div className="h-24 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-inner transition-all duration-300" style={{ backgroundColor: hex }}>
          <div className="flex items-center justify-center h-full">
            <code className="bg-white/90 dark:bg-gray-900/90 px-4 py-1.5 rounded-xl text-sm font-mono shadow-lg">{hex}</code>
          </div>
        </div>
      )}

      <div>
        <label className="label-premium">HEX</label>
        <div className="flex gap-2">
          <input className="input-premium font-mono flex-1" value={hex} onChange={e => fromHex(e.target.value)} placeholder="#ff0000" />
          {hex && <CopyButton text={hex} />}
        </div>
      </div>

      <div>
        <label className="label-premium">RGB</label>
        <div className="flex gap-2">
          <input className="input-premium font-mono flex-1" value={rgb} onChange={e => fromRgb(e.target.value)} placeholder="255, 0, 0" />
          {rgb && <CopyButton text={rgb} />}
        </div>
      </div>

      <div>
        <label className="label-premium">HSL</label>
        <div className="flex gap-2">
          <input className="input-premium font-mono flex-1" value={hsl} onChange={e => fromHsl(e.target.value)} placeholder="0, 100%, 50%" />
          {hsl && <CopyButton text={hsl} />}
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 animate-fade-in">{error}</div>
      )}
    </div>
  );
}
