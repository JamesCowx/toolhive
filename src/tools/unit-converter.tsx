'use client';

import { useState } from 'react';

type UnitCategory = 'length' | 'weight' | 'temperature' | 'volume';

const units: Record<UnitCategory, { label: string; value: string; toBase: (v: number) => number; fromBase: (v: number) => number }[]> = {
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

  const catUnits = units[category];

  return (
    <div className="tool-section">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(units) as UnitCategory[]).map(c => (
          <button key={c} onClick={() => { setCategory(c); const u = units[c][0]; setFromUnit(u.value); setToUnit(units[c][1]?.value ?? u.value); }} className={`btn-${category === c ? 'primary' : 'secondary'} capitalize`}>{c}</button>
        ))}
      </div>

      <div>
        <label className="label-text">Value</label>
        <input type="number" className="input-field" value={value} onChange={e => setValue(e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-text">From</label>
          <select className="select-field" value={fromUnit} onChange={e => setFromUnit(e.target.value)}>
            {catUnits.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
          </select>
        </div>
        <div>
          <label className="label-text">To</label>
          <select className="select-field" value={toUnit} onChange={e => setToUnit(e.target.value)}>
            {catUnits.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
          </select>
        </div>
      </div>

      <button onClick={convert} className="btn-primary w-full">Convert</button>

      {result && (
        <div className="text-center rounded-xl bg-primary-50 p-4">
          <p className="text-sm text-gray-600">
            {value} {catUnits.find(u => u.value === fromUnit)?.label} =
          </p>
          <p className="text-2xl font-bold text-primary-700">{result} {catUnits.find(u => u.value === toUnit)?.label}</p>
        </div>
      )}
    </div>
  );
}
