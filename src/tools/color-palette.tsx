'use client';

import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';

function randomColor(): string {
  return '#' + Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0');
}

function generatePalette(count: number): string[] {
  return Array.from({ length: count }, () => randomColor());
}

export default function ColorPalette() {
  const [palette, setPalette] = useState<string[]>(generatePalette(5));
  const [locked, setLocked] = useState<boolean[]>(new Array(5).fill(false));

  function regenerate() {
    setPalette(prev => prev.map((c, i) => locked[i] ? c : randomColor()));
  }

  async function copyColor(hex: string) {
    await copyToClipboard(hex);
  }

  function toggleLock(i: number) {
    setLocked(prev => { const n = [...prev]; n[i] = !n[i]; return n; });
  }

  return (
    <div className="tool-section">
      <button onClick={regenerate} className="btn-primary w-full">Generate New Palette</button>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {palette.map((hex, i) => (
          <div key={i} className="space-y-2">
            <div
              className="h-24 rounded-xl border-2 border-gray-200 cursor-pointer transition-transform hover:scale-105 relative group"
              style={{ backgroundColor: hex }}
              onClick={() => copyColor(hex)}
              title="Click to copy"
            >
              <button
                onClick={e => { e.stopPropagation(); toggleLock(i); }}
                className="absolute top-1 right-1 rounded-md bg-white/80 p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {locked[i] ? '🔓' : '🔒'}
              </button>
            </div>
            <div className="text-center">
              <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded cursor-pointer hover:bg-gray-200" onClick={() => copyColor(hex)}>
                {hex}
              </code>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400">Click a color to copy its hex code. Hover to lock/unlock colors.</p>
    </div>
  );
}
