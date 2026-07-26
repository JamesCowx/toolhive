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
  const [result, setResult] = useState<{ years: number; months: number; days: number; totalDays: number; totalWeeks: number; totalHours: number } | null>(null);

  function calculate() {
    const d1 = new Date(start);
    const d2 = new Date(end);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return;
    const [a, b] = d1 <= d2 ? [d1, d2] : [d2, d1];
    const full = diffFull(a, b);
    const td = diffDays(a, b) + 1;
    setResult({ ...full, totalDays: td, totalWeeks: Math.floor(td / 7), totalHours: td * 24 });
  }

  return (
    <div className="tool-section">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-premium">Start Date</label>
          <input type="date" className="input-premium" value={start} onChange={e => setStart(e.target.value)} />
        </div>
        <div>
          <label className="label-premium">End Date</label>
          <input type="date" className="input-premium" value={end} onChange={e => setEnd(e.target.value)} />
        </div>
      </div>

      <button onClick={calculate} className="btn-premium w-full">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Calculate Difference
      </button>

      {result && (
        <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-200/50 dark:border-primary-700/50 p-6 animate-scale-in">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Years', value: result.years, icon: '📅' },
              { label: 'Months', value: result.months, icon: '📆' },
              { label: 'Days', value: result.days, icon: '🗓️' },
              { label: 'Total Days', value: result.totalDays.toLocaleString(), icon: '📊' },
            ].map((item, i) => (
              <div key={item.label} className="rounded-xl bg-white dark:bg-gray-800/50 p-4 text-center shadow-sm animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                <span className="text-2xl">{item.icon}</span>
                <p className="text-2xl sm:text-3xl font-bold text-primary-700 dark:text-primary-300 mt-1">{item.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="text-center rounded-lg bg-white/50 dark:bg-gray-800/30 p-3">
              <p className="text-lg font-bold text-primary-600 dark:text-primary-400">{result.totalWeeks.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Total Weeks</p>
            </div>
            <div className="text-center rounded-lg bg-white/50 dark:bg-gray-800/30 p-3">
              <p className="text-lg font-bold text-primary-600 dark:text-primary-400">{result.totalHours.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Total Hours</p>
            </div>
          </div>
        </div>
      )}

      {!result && (
        <p className="text-center text-sm text-gray-400 dark:text-gray-500">Select two dates and click Calculate</p>
      )}
    </div>
  );
}
