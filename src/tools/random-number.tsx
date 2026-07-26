'use client';

import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function RandomNumber() {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState(1);
  const [decimals, setDecimals] = useState(false);
  const [numbers, setNumbers] = useState<number[]>([]);

  function generate() {
    const mn = parseFloat(min);
    const mx = parseFloat(max);
    const ct = Math.max(1, Math.min(100, Number(count)));
    if (isNaN(mn) || isNaN(mx) || mx <= mn) return;
    const range = mx - mn;
    const result: number[] = [];
    for (let i = 0; i < ct; i++) {
      const val = mn + Math.random() * range;
      result.push(decimals ? Math.round(val * 1000) / 1000 : Math.floor(val));
    }
    setNumbers(result);
  }

  return (
    <div className="tool-section">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-premium">Min</label>
          <input type="number" className="input-premium" value={min} onChange={e => setMin(e.target.value)} />
        </div>
        <div>
          <label className="label-premium">Max</label>
          <input type="number" className="input-premium" value={max} onChange={e => setMax(e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-premium">Count (1-100)</label>
          <input type="number" min="1" max="100" className="input-premium" value={count} onChange={e => setCount(Number(e.target.value))} />
        </div>
        <label className="flex items-end pb-3 gap-3 cursor-pointer">
          <input type="checkbox" checked={decimals} onChange={() => setDecimals(!decimals)} className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Allow decimals</span>
        </label>
      </div>

      <button onClick={generate} className="btn-premium w-full">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Generate
      </button>

      {numbers.length > 0 && (
        <div className="animate-fade-in-up space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">{numbers.length} number{numbers.length > 1 ? 's' : ''}</span>
            <CopyButton text={numbers.join(', ')} />
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 font-mono text-base sm:text-lg text-gray-900 dark:text-white text-center break-all">
            {numbers.join(', ')}
          </div>
        </div>
      )}

      {numbers.length === 0 && (
        <p className="text-center text-sm text-gray-400 dark:text-gray-500">Set range and click Generate</p>
      )}
    </div>
  );
}
