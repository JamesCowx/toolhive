'use client';

import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ListRandomizer() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string[]>([]);
  const [picked, setPicked] = useState<string | null>(null);

  function getItems(): string[] {
    return input.split('\n').map(s => s.trim()).filter(Boolean);
  }

  function handleShuffle() {
    const items = getItems();
    if (items.length < 2) return;
    setResult(shuffle(items));
    setPicked(null);
  }

  function handleSort() {
    const items = getItems();
    if (items.length < 2) return;
    setResult([...items].sort((a, b) => a.localeCompare(b)));
    setPicked(null);
  }

  function handlePick() {
    const items = getItems();
    if (items.length === 0) return;
    setPicked(items[Math.floor(Math.random() * items.length)]);
    setResult([]);
  }

  return (
    <div className="tool-section">
      <div>
        <label className="label-premium">Enter items (one per line)</label>
        <textarea className="input-premium min-h-[150px] resize-y font-mono text-sm" value={input} onChange={e => setInput(e.target.value)} placeholder="Item 1&#10;Item 2&#10;Item 3" />
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">{getItems().length} items</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={handleShuffle} className="btn-premium">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Shuffle
        </button>
        <button onClick={handleSort} className="btn-outline">Sort A-Z</button>
        <button onClick={handlePick} className="btn-outline">Pick Random</button>
      </div>

      {picked && (
        <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-200/50 dark:border-primary-700/50 p-6 text-center animate-scale-in">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Random Pick:</p>
          <p className="text-2xl font-bold text-primary-700 dark:text-primary-300">{picked}</p>
        </div>
      )}

      {result.length > 0 && (
        <div className="animate-fade-in-up space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">{result.length} items</span>
            <CopyButton text={result.join('\n')} />
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 divide-y divide-gray-100 dark:divide-gray-700/50">
            {result.map((item, i) => (
              <div key={i} className="py-2 first:pt-0 last:pb-0 text-sm text-gray-700 dark:text-gray-300 flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30 text-xs font-bold text-primary-600 dark:text-primary-400">{i + 1}</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      {!input && !result.length && !picked && (
        <p className="text-center text-sm text-gray-400 dark:text-gray-500">Enter a list of items to get started</p>
      )}
    </div>
  );
}
