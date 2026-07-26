'use client';

import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';

export default function RandomNumber() {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState(1);
  const [decimals, setDecimals] = useState(false);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  function generate() {
    const mn = parseFloat(min);
    const mx = parseFloat(max);
    const ct = Math.max(1, Math.min(100, Number(count)));
    if (isNaN(mn) || isNaN(mx) || mx <= mn) return;
    const range = mx - mn;
    const result: number[] = [];
    for (let i = 0; i < ct; i++) {
      const val = mn + Math.random() * range;
      result.push(decimals ? Math.round(val * 1000) / 1000 : Math.floor(val) + (val % 1 === 0 ? 0 : 0));
    }
    setNumbers(decimals ? result : result.map(v => Math.floor(v)));
  }

  async function handleCopyAll() {
    await copyToClipboard(numbers.join(', '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="tool-section">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-text">Min</label>
          <input type="number" className="input-field" value={min} onChange={e => setMin(e.target.value)} />
        </div>
        <div>
          <label className="label-text">Max</label>
          <input type="number" className="input-field" value={max} onChange={e => setMax(e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-text">Count</label>
          <input type="number" min="1" max="100" className="input-field" value={count} onChange={e => setCount(Number(e.target.value))} />
        </div>
        <label className="flex items-end pb-2.5 gap-2 cursor-pointer">
          <input type="checkbox" checked={decimals} onChange={() => setDecimals(!decimals)} className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
          <span className="text-sm text-gray-700">Allow decimals</span>
        </label>
      </div>

      <button onClick={generate} className="btn-primary w-full">Generate</button>

      {numbers.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{numbers.length} number{numbers.length > 1 ? 's' : ''}</span>
            <button onClick={handleCopyAll} className="btn-secondary text-xs py-1.5 px-3">{copied ? 'Copied!' : 'Copy'}</button>
          </div>
          <div className="result-box text-base">
            {numbers.join(', ')}
          </div>
        </div>
      )}

      {numbers.length === 0 && (
        <p className="text-center text-sm text-gray-400">Set range and click Generate</p>
      )}
    </div>
  );
}
