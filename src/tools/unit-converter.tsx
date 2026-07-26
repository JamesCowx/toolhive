'use client';

import { useState } from 'react';

type UnitCategory = 'length' | 'weight' | 'temperature' | 'volume';

interface UnitDef {
  label: string;
  value: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

const units: Record<UnitCategory, UnitDef[]> = {
  length: [
    { label: 'Meters', value: 'm', toBase: v => v, fromBase: v => v },
    { label: 'Kilometers', value: 'km', toBase: v => v * 1000, fromBase: v => v / 1000 },
    { label: 'Centimeters', value: 'cm', toBase: v => v / 100, fromBase: v => v * 100 },
    { label: 'Millimeters', value: 'mm', toBase: v => v / 1000, fromBase: v => v * 1000 },
    { label: 'Miles', value: 'mi', toBase: v => v * 1609.344, fromBase: v => v / 1609.344 },
    { label: 'Yards', value: 'yd', toBase: v => v * 0.9144, fromBase: v => v / 0.9144 },
    { label: 'Feet', value: 'ft', toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
    { label: 'Inches', value: 'in', toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
  ],
  weight: [
    { label: 'Kilograms', value: 'kg', toBase: v => v, fromBase: v => v },
    { label: 'Grams', value: 'g', toBase: v => v / 1000, fromBase: v => v * 1000 },
    { label: 'Milligrams', value: 'mg', toBase: v => v / 1_000_000, fromBase: v => v * 1_000_000 },
    { label: 'Pounds', value: 'lb', toBase: v => v * 0.453592, fromBase: v => v / 0.453592 },
    { label: 'Ounces', value: 'oz', toBase: v => v * 0.0283495, fromBase: v => v / 0.0283495 },
    { label: 'Tons (metric)', value: 't', toBase: v => v * 1000, fromBase: v => v / 1000 },
    { label: 'Stones', value: 'st', toBase: v => v * 6.35029, fromBase: v => v / 6.35029 },
  ],
  temperature: [
    { label: 'Celsius', value: 'c', toBase: v => v, fromBase: v => v },
    { label: 'Fahrenheit', value: 'f', toBase: v => (v - 32) * 5 / 9, fromBase: v => v * 9 / 5 + 32 },
    { label: 'Kelvin', value: 'k', toBase: v => v - 273.15, fromBase: v => v + 273.15 },
  ],
  volume: [
    { label: 'Liters', value: 'l', toBase: v => v, fromBase: v => v },
    { label: 'Milliliters', value: 'ml', toBase: v => v / 1000, fromBase: v => v * 1000 },
    { label: 'Gallons (US)', value: 'gal', toBase: v => v * 3.78541, fromBase: v => v / 3.78541 },
    { label: 'Quarts (US)', value: 'qt', toBase: v => v * 0.946353, fromBase: v => v / 0.946353 },
    { label: 'Pints (US)', value: 'pt', toBase: v => v * 0.473176, fromBase: v => v / 0.473176 },
    { label: 'Cups', value: 'cup', toBase: v => v * 0.236588, fromBase: v => v / 0.236588 },
    { label: 'Fluid Ounces (US)', value: 'floz', toBase: v => v * 0.0295735, fromBase: v => v / 0.0295735 },
    { label: 'Cubic Meters', value: 'm3', toBase: v => v * 1000, fromBase: v => v / 1000 },
  ],
};

const swapIcon = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
  </svg>
);

export default function UnitConverter() {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('km');
  const [value, setValue] = useState('1');
  const [result, setResult] = useState('');

  function convert() {
    const v = parseFloat(value);
    if (isNaN(v)) { setResult(''); return; }
    const cat = units[category];
    const from = cat.find(u => u.value === fromUnit);
    const to = cat.find(u => u.value === toUnit);
    if (!from || !to) return;
    const base = from.toBase(v);
    const converted = to.fromBase(base);
    setResult(converted.toLocaleString(undefined, { maximumFractionDigits: 6 }));
  }

  function swap() {
    const tmp = fromUnit; setFromUnit(toUnit); setToUnit(tmp);
    if (result) setTimeout(convert, 0);
  }

  const catUnits = units[category];

  return (
    <div className="tool-section">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(units) as UnitCategory[]).map(c => (
          <button key={c} onClick={() => { setCategory(c); setFromUnit(units[c][0].value); setToUnit(units[c][1]?.value ?? units[c][0].value); setResult(''); }} className={`btn-${category === c ? 'premium' : 'outline'} capitalize`}>{c}</button>
        ))}
      </div>

      <div>
        <label className="label-premium">Value</label>
        <input type="number" className="input-premium" value={value} onChange={e => { setValue(e.target.value); setResult(''); }} />
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end">
        <div>
          <label className="label-premium">From</label>
          <select className="input-premium" value={fromUnit} onChange={e => { setFromUnit(e.target.value); setResult(''); }}>
            {catUnits.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
          </select>
        </div>
        <button onClick={swap} className="pb-2 text-gray-400 hover:text-primary-500 transition-colors" title="Swap units">
          {swapIcon}
        </button>
        <div>
          <label className="label-premium">To</label>
          <select className="input-premium" value={toUnit} onChange={e => { setToUnit(e.target.value); setResult(''); }}>
            {catUnits.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
          </select>
        </div>
      </div>

      <button onClick={convert} className="btn-premium w-full">Convert</button>

      {result && (
        <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-200/50 dark:border-primary-700/50 p-6 text-center animate-scale-in">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {value} {catUnits.find(u => u.value === fromUnit)?.label}
          </p>
          <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-primary-700 dark:text-primary-300">
            {result}
          </p>
          <p className="text-lg font-semibold text-primary-600 dark:text-primary-400 mt-2">
            {catUnits.find(u => u.value === toUnit)?.label}
          </p>
        </div>
      )}

      {!result && (
        <p className="text-center text-sm text-gray-400 dark:text-gray-500">Enter a value and click Convert</p>
      )}
    </div>
  );
}
