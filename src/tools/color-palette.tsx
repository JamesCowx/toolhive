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
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  function regenerate() {
    setPalette(prev => prev.map((c, i) => locked[i] ? c : randomColor()));
  }

  async function copyColor(hex: string, i: number) {
    await copyToClipboard(hex);
    setCopiedIndex(i);
    setTimeout(() => setCopiedIndex(null), 1500);
  }

  function toggleLock(i: number) {
    setLocked(prev => { const n = [...prev]; n[i] = !n[i]; return n; });
  }

  return (
    <div className="tool-section">
      <button onClick={regenerate} className="btn-premium w-full">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Generate New Palette
      </button>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {palette.map((hex, i) => (
          <div key={i} className="space-y-2 animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div
              className="h-28 rounded-2xl border-2 border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl relative group"
              style={{ backgroundColor: hex }}
              onClick={() => copyColor(hex, i)}
              title="Click to copy hex"
            >
              <button
                onClick={e => { e.stopPropagation(); toggleLock(i); }}
                className="absolute top-2 right-2 rounded-lg bg-white/80 dark:bg-gray-900/80 p-1.5 text-xs opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white dark:hover:bg-gray-900 shadow-sm"
                title={locked[i] ? 'Unlock color' : 'Lock color'}
              >
                {locked[i] ? '🔓' : '🔒'}
              </button>
              {copiedIndex === i && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl animate-fade-in">
                  <span className="bg-white dark:bg-gray-900 text-green-600 dark:text-green-400 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">Copied!</span>
                </div>
              )}
            </div>
            <div className="text-center">
              <code className="text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2.5 py-1.5 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" onClick={() => copyColor(hex, i)}>
                {hex}
              </code>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-2">Click a color to copy its hex. Hover to lock/unlock colors.</p>
    </div>
  );
}
