'use client';

import { useState } from 'react';

export default function TipCalculator() {
  const [bill, setBill] = useState('50');
  const [tipPercent, setTipPercent] = useState(15);
  const [split, setSplit] = useState(1);

  const billNum = parseFloat(bill) || 0;
  const tipAmount = billNum * (tipPercent / 100);
  const total = billNum + tipAmount;
  const perPerson = split > 0 ? total / split : 0;

  const presets = [10, 15, 18, 20, 25];

  return (
    <div className="tool-section">
      <div>
        <label className="label-premium">Bill Amount ($)</label>
        <input type="number" className="input-premium" value={bill} onChange={e => setBill(e.target.value)} min="0" step="0.01" />
      </div>

      <div>
        <label className="label-premium">Tip: {tipPercent}%</label>
        <input type="range" min="0" max="100" value={tipPercent} onChange={e => setTipPercent(Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer accent-primary-600" style={{ background: 'var(--bg-muted)' }} />
        <div className="flex gap-2 mt-2">
          {presets.map(p => (
            <button key={p} onClick={() => setTipPercent(p)} className={`btn-${tipPercent === p ? 'premium' : 'outline'} text-xs flex-1`}>{p}%</button>
          ))}
        </div>
      </div>

      <div>
        <label className="label-premium">Split: {split} {split === 1 ? 'person' : 'people'}</label>
        <input type="range" min="1" max="20" value={split} onChange={e => setSplit(Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer accent-primary-600" style={{ background: 'var(--bg-muted)' }} />
        <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-dim)' }}>
          <span>1</span>
          <span>20</span>
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border p-6 space-y-4 animate-scale-in" style={{ borderColor: 'var(--border)' }}>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-white dark:bg-gray-800/50 p-4 text-center shadow-sm">
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Tip Amount</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">${tipAmount.toFixed(2)}</p>
          </div>
          <div className="rounded-xl bg-white dark:bg-gray-800/50 p-4 text-center shadow-sm">
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Total</p>
            <p className="text-2xl font-bold text-primary-700 dark:text-primary-300">${total.toFixed(2)}</p>
          </div>
        </div>
        {split > 1 && (
          <div className="rounded-xl bg-white dark:bg-gray-800/50 p-4 text-center shadow-sm">
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Per Person</p>
            <p className="text-2xl font-bold text-accent-600 dark:text-accent-400">${perPerson.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
