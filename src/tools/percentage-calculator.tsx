'use client';

import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function PercentageCalculator() {
  const [mode, setMode] = useState<'pct-of' | 'pct-change' | 'pct-from' | 'add-pct'>('pct-of');
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');
  const [result, setResult] = useState<{ label: string; value: string } | null>(null);

  function calculate() {
    const a = parseFloat(val1);
    const b = parseFloat(val2);
    if (isNaN(a) || isNaN(b)) return;

    switch (mode) {
      case 'pct-of': {
        // What percent of X is Y?
        if (b === 0) return;
        setResult({ label: `Percentage`, value: `${((a / b) * 100).toFixed(2)}%` });
        break;
      }
      case 'pct-change': {
        // Percentage change from X to Y
        if (a === 0) return;
        const change = ((b - a) / a) * 100;
        const sign = change >= 0 ? '+' : '';
        setResult({ label: `Percentage Change`, value: `${sign}${change.toFixed(2)}%` });
        break;
      }
      case 'pct-from': {
        // X% of Y
        setResult({ label: `${a}% of ${b}`, value: `${(a / 100 * b).toFixed(4)}` });
        break;
      }
      case 'add-pct': {
        // Add X% to Y
        setResult({ label: `${a}% added to ${b}`, value: `${(b + (a / 100 * b)).toFixed(4)}` });
        break;
      }
    }
  }

  return (
    <div className="tool-section">
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setMode('pct-of')} className={`btn-${mode === 'pct-of' ? 'premium' : 'outline'} text-xs`}>X is what % of Y?</button>
        <button onClick={() => setMode('pct-change')} className={`btn-${mode === 'pct-change' ? 'premium' : 'outline'} text-xs`}>% change X → Y</button>
        <button onClick={() => setMode('pct-from')} className={`btn-${mode === 'pct-from' ? 'premium' : 'outline'} text-xs`}>X% of Y</button>
        <button onClick={() => setMode('add-pct')} className={`btn-${mode === 'add-pct' ? 'premium' : 'outline'} text-xs`}>Add X% to Y</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-premium">
            {mode === 'pct-of' ? 'Value X' : mode === 'pct-change' ? 'Start Value' : mode === 'pct-from' ? 'Percentage' : 'Percentage'}
          </label>
          <input type="number" className="input-premium" value={val1} onChange={e => { setVal1(e.target.value); setResult(null); }} />
        </div>
        <div>
          <label className="label-premium">
            {mode === 'pct-of' ? 'Total Y' : mode === 'pct-change' ? 'End Value' : 'Value'}
          </label>
          <input type="number" className="input-premium" value={val2} onChange={e => { setVal2(e.target.value); setResult(null); }} />
        </div>
      </div>

      <button onClick={calculate} className="btn-premium w-full">Calculate</button>

      {result && (
        <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border p-6 text-center animate-scale-in" style={{ borderColor: 'var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{result.label}</p>
          <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary-700 dark:text-primary-300 mt-2">
            {result.value}
          </p>
          <div className="mt-4 flex justify-center">
            <CopyButton text={result.value.replace(/^\+/, '')} />
          </div>
        </div>
      )}

      {!result && (
        <p className="text-center text-sm" style={{ color: 'var(--text-dim)' }}>Enter values and click Calculate</p>
      )}
    </div>
  );
}
