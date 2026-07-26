'use client';

import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';

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
        <label className="label-text">Enter items (one per line)</label>
        <textarea className="input-field min-h-[150px] resize-y font-mono text-sm" value={input} onChange={e => setInput(e.target.value)} placeholder="Item 1&#10;Item 2&#10;Item 3" />
        <p className="text-xs text-gray-400 mt-1">{getItems().length} items</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={handleShuffle} className="btn-primary">Shuffle</button>
        <button onClick={handleSort} className="btn-secondary">Sort A-Z</button>
        <button onClick={handlePick} className="btn-secondary">Pick Random</button>
      </div>

      {picked && (
        <div className="rounded-xl bg-primary-50 p-4 text-center">
          <p className="text-sm text-gray-600">Random Pick:</p>
          <p className="text-xl font-bold text-primary-700">{picked}</p>
        </div>
      )}

      {result.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{result.length} items</span>
            <button onClick={() => copyToClipboard(result.join('\n'))} className="btn-secondary text-xs py-1.5 px-3">Copy</button>
          </div>
          <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
            {result.map((item, i) => (
              <div key={i} className="py-1 border-b border-gray-100 last:border-0 text-sm">{i + 1}. {item}</div>
            ))}
          </div>
        </div>
      )}

      {!input && <p className="text-center text-sm text-gray-400">Enter a list of items to get started</p>}
    </div>
  );
}
