'use client';

import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

type NumberBase = 'binary' | 'hex' | 'decimal';

export default function BinaryHexConverter() {
  const [input, setInput] = useState('');
  const [inputBase, setInputBase] = useState<NumberBase>('decimal');
  const [error, setError] = useState('');

  function parseValue(s: string, base: NumberBase): number | null {
    try {
      const clean = s.trim();
      if (!clean) return null;
      switch (base) {
        case 'binary': {
          if (!/^[01]+$/.test(clean)) { setError('Invalid binary (only 0 and 1)'); return null; }
          return parseInt(clean, 2);
        }
        case 'hex': {
          const h = clean.replace(/^0x/i, '');
          if (!/^[0-9a-fA-F]+$/.test(h)) { setError('Invalid hex (0-9, A-F)'); return null; }
          return parseInt(h, 16);
        }
        case 'decimal': {
          const n = parseInt(clean, 10);
          if (isNaN(n)) { setError('Invalid number'); return null; }
          return n;
        }
      }
    } catch { setError('Conversion error'); return null; }
  }

  const val = parseValue(input, inputBase);
  const results = val !== null ? {
    decimal: val.toString(10),
    binary: val.toString(2),
    hex: val.toString(16).toUpperCase(),
    octal: val.toString(8),
  } : null;

  const rows = results ? [
    { label: 'Decimal', value: results.decimal },
    { label: 'Binary', value: results.binary },
    { label: 'Hexadecimal', value: results.hex },
    { label: 'Octal', value: results.octal },
  ] : [];

  return (
    <div className="tool-section">
      <div className="flex gap-2">
        {(['decimal', 'binary', 'hex'] as NumberBase[]).map(b => (
          <button key={b} onClick={() => { setInputBase(b); setError(''); }} className={`btn-${inputBase === b ? 'premium' : 'outline'} capitalize`}>{b}</button>
        ))}
      </div>

      <div>
        <label className="label-premium">Enter {inputBase} value</label>
        <input className="input-premium font-mono" value={input} onChange={e => { setInput(e.target.value); setError(''); }} placeholder={inputBase === 'binary' ? 'e.g. 1010' : inputBase === 'hex' ? 'e.g. FF' : 'e.g. 255'} />
      </div>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 animate-fade-in">{error}</div>
      )}

      {results && !error && (
        <div className="animate-fade-in-up space-y-3">
          {rows.map((r, i) => (
            <div key={r.label} className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
              <span className="w-24 text-sm font-medium shrink-0" style={{ color: 'var(--text-muted)' }}>{r.label}</span>
              <code className="flex-1 font-mono text-sm bg-gray-50 dark:bg-gray-800/50 border rounded-xl px-4 py-2.5 break-all select-all" style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
                {r.value}
              </code>
              <CopyButton text={r.value} />
            </div>
          ))}
        </div>
      )}

      {!input && (
        <p className="text-center text-sm" style={{ color: 'var(--text-dim)' }}>Enter a number to convert</p>
      )}
    </div>
  );
}
