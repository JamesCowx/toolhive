'use client';

import { useState } from 'react';

function diffDays(d1: Date, d2: Date) {
  const ms = Math.abs(d2.getTime() - d1.getTime());
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

function diffFull(d1: Date, d2: Date) {
  let years = d2.getFullYear() - d1.getFullYear();
  let months = d2.getMonth() - d1.getMonth();
  let days = d2.getDate() - d1.getDate();
  if (days < 0) { months--; const pm = new Date(d2.getFullYear(), d2.getMonth(), 0); days += pm.getDate(); }
  if (months < 0) { years--; months += 12; }
  if (years < 0) { years = 0; months = 0; days = 0; }
  return { years, months, days };
}

export default function DateDifference() {
  const [start, setStart] = useState('2024-01-01');
  const [end, setEnd] = useState(new Date().toISOString().slice(0, 10));
  const [result, setResult] = useState<{ years: number; months: number; days: number; totalDays: number } | null>(null);

  function calculate() {
    const d1 = new Date(start);
    const d2 = new Date(end);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return;
    const [a, b] = d1 <= d2 ? [d1, d2] : [d2, d1];
    const full = diffFull(a, b);
    setResult({ ...full, totalDays: diffDays(a, b) + 1 });
  }

  return (
    <div className="tool-section">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-text">Start Date</label>
          <input type="date" className="input-field" value={start} onChange={e => setStart(e.target.value)} />
        </div>
        <div>
          <label className="label-text">End Date</label>
          <input type="date" className="input-field" value={end} onChange={e => setEnd(e.target.value)} />
        </div>
      </div>

      <button onClick={calculate} className="btn-primary w-full">Calculate Difference</button>

      {result && (
        <div className="rounded-xl bg-primary-50 p-6 space-y-3">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="rounded-lg bg-white p-3">
              <p className="text-2xl font-bold text-primary-700">{result.years}</p>
              <p className="text-xs text-gray-500">Years</p>
            </div>
            <div className="rounded-lg bg-white p-3">
              <p className="text-2xl font-bold text-primary-700">{result.months}</p>
              <p className="text-xs text-gray-500">Months</p>
            </div>
            <div className="rounded-lg bg-white p-3">
              <p className="text-2xl font-bold text-primary-700">{result.days}</p>
              <p className="text-xs text-gray-500">Days</p>
            </div>
            <div className="rounded-lg bg-white p-3">
              <p className="text-2xl font-bold text-primary-700">{result.totalDays.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Total Days</p>
            </div>
          </div>
        </div>
      )}

      {!result && (
        <p className="text-center text-sm text-gray-400">Select two dates and click Calculate</p>
      )}
    </div>
  );
}
