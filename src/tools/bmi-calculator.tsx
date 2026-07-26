'use client';

import { useState } from 'react';

type UnitSystem = 'metric' | 'imperial';

const bmiCategories = [
  { label: 'Severely Underweight', range: [0, 16], color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20', bar: 'bg-blue-500' },
  { label: 'Underweight', range: [16, 18.5], color: 'text-blue-500 dark:text-blue-300', bg: 'bg-blue-50 dark:bg-blue-900/20', bar: 'bg-blue-400' },
  { label: 'Normal Weight', range: [18.5, 25], color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20', bar: 'bg-green-500' },
  { label: 'Overweight', range: [25, 30], color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/20', bar: 'bg-yellow-500' },
  { label: 'Obese Class I', range: [30, 35], color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20', bar: 'bg-orange-500' },
  { label: 'Obese Class II', range: [35, 40], color: 'text-red-500 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20', bar: 'bg-red-500' },
  { label: 'Obese Class III', range: [40, Infinity], color: 'text-red-700 dark:text-red-300', bg: 'bg-red-100 dark:bg-red-900/30', bar: 'bg-red-700' },
];

function findCategory(bmi: number) {
  return bmiCategories.find(c => bmi >= c.range[0] && bmi < c.range[1]) ?? bmiCategories[6];
}

const bmiMax = 50;
const bmiMin = 10;

export default function BMICalculator() {
  const [system, setSystem] = useState<UnitSystem>('metric');
  const [metricH, setMetricH] = useState('170');
  const [metricW, setMetricW] = useState('70');
  const [imperialFt, setImperialFt] = useState('5');
  const [imperialIn, setImperialIn] = useState('9');
  const [imperialW, setImperialW] = useState('154');
  const [result, setResult] = useState<number | null>(null);

  function calculate() {
    let heightM: number, weightKg: number;
    if (system === 'metric') {
      const h = parseFloat(metricH);
      const w = parseFloat(metricW);
      if (!h || !w || h <= 0 || w <= 0) return;
      heightM = h / 100;
      weightKg = w;
    } else {
      const ft = parseFloat(imperialFt);
      const inc = parseFloat(imperialIn);
      const w = parseFloat(imperialW);
      if (!ft || inc === undefined || !w || ft < 0 || inc < 0 || w <= 0) return;
      const totalInches = ft * 12 + inc;
      if (totalInches <= 0) return;
      heightM = totalInches * 0.0254;
      weightKg = w * 0.453592;
    }
    const bmi = weightKg / (heightM * heightM);
    setResult(Math.round(bmi * 10) / 10);
  }

  const cat = result !== null ? findCategory(result) : null;
  const barPercent = result !== null ? Math.min(((result - bmiMin) / (bmiMax - bmiMin)) * 100, 100) : 0;

  return (
    <div className="tool-section">
      <div className="flex gap-2">
        <button onClick={() => setSystem('metric')} className={`btn-${system === 'metric' ? 'premium' : 'outline'}`}>Metric (cm/kg)</button>
        <button onClick={() => setSystem('imperial')} className={`btn-${system === 'imperial' ? 'premium' : 'outline'}`}>Imperial (ft/lbs)</button>
      </div>

      {system === 'metric' ? (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label-premium">Height (cm)</label>
            <input type="number" className="input-premium" value={metricH} onChange={e => setMetricH(e.target.value)} min="1" max="300" />
          </div>
          <div>
            <label className="label-premium">Weight (kg)</label>
            <input type="number" className="input-premium" value={metricW} onChange={e => setMetricW(e.target.value)} min="1" max="700" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="label-premium">Feet</label>
            <input type="number" className="input-premium" value={imperialFt} onChange={e => setImperialFt(e.target.value)} min="0" max="8" />
          </div>
          <div>
            <label className="label-premium">Inches</label>
            <input type="number" className="input-premium" value={imperialIn} onChange={e => setImperialIn(e.target.value)} min="0" max="11" />
          </div>
          <div>
            <label className="label-premium">Weight (lbs)</label>
            <input type="number" className="input-premium" value={imperialW} onChange={e => setImperialW(e.target.value)} min="1" max="1500" />
          </div>
        </div>
      )}

      <button onClick={calculate} className="btn-premium w-full">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Calculate BMI
      </button>

      {result !== null && cat && (
        <div className={`rounded-2xl p-6 sm:p-8 text-center animate-scale-in ${cat.bg} border border-gray-200/50 dark:border-gray-700/50`}>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Your BMI</p>
          <p className={`text-6xl sm:text-7xl font-extrabold tracking-tight ${cat.color}`}>
            {result}
          </p>
          <p className={`mt-3 text-lg font-semibold ${cat.color}`}>{cat.label}</p>

          <div className="mt-6 relative h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${cat.bar}`}
              style={{ width: `${barPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1.5">
            <span>10 (Underweight)</span>
            <span>50 (Obese)</span>
          </div>
        </div>
      )}

      {!result && (
        <p className="text-center text-sm text-gray-400 dark:text-gray-500">Enter your height and weight, then click Calculate</p>
      )}
    </div>
  );
}
