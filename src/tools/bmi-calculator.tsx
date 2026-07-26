'use client';

import { useState } from 'react';

type UnitSystem = 'metric' | 'imperial';

const bmiCategories = [
  { label: 'Severely underweight', range: [0, 16], color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Underweight', range: [16, 18.5], color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Normal weight', range: [18.5, 25], color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Overweight', range: [25, 30], color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { label: 'Obese Class I', range: [30, 35], color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: 'Obese Class II', range: [35, 40], color: 'text-red-500', bg: 'bg-red-50' },
  { label: 'Obese Class III', range: [40, Infinity], color: 'text-red-700', bg: 'bg-red-100' },
];

function findCategory(bmi: number) {
  return bmiCategories.find(c => bmi >= c.range[0] && bmi < c.range[1]) ?? bmiCategories[6];
}

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

  return (
    <div className="tool-section">
      <div className="flex gap-2">
        <button onClick={() => setSystem('metric')} className={`btn-${system === 'metric' ? 'primary' : 'secondary'}`}>Metric</button>
        <button onClick={() => setSystem('imperial')} className={`btn-${system === 'imperial' ? 'primary' : 'secondary'}`}>Imperial</button>
      </div>

      {system === 'metric' ? (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label-text">Height (cm)</label>
            <input type="number" className="input-field" value={metricH} onChange={e => setMetricH(e.target.value)} min="1" max="300" />
          </div>
          <div>
            <label className="label-text">Weight (kg)</label>
            <input type="number" className="input-field" value={metricW} onChange={e => setMetricW(e.target.value)} min="1" max="700" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="label-text">Feet</label>
            <input type="number" className="input-field" value={imperialFt} onChange={e => setImperialFt(e.target.value)} min="0" max="8" />
          </div>
          <div>
            <label className="label-text">Inches</label>
            <input type="number" className="input-field" value={imperialIn} onChange={e => setImperialIn(e.target.value)} min="0" max="11" />
          </div>
          <div>
            <label className="label-text">Weight (lbs)</label>
            <input type="number" className="input-field" value={imperialW} onChange={e => setImperialW(e.target.value)} min="1" max="1500" />
          </div>
        </div>
      )}

      <button onClick={calculate} className="btn-primary w-full">Calculate BMI</button>

      {result !== null && cat && (
        <div className={`rounded-xl p-6 text-center ${cat.bg}`}>
          <p className="text-sm text-gray-600 mb-1">Your BMI</p>
          <p className={`text-5xl font-extrabold ${cat.color}`}>{result}</p>
          <p className={`mt-2 font-semibold ${cat.color}`}>{cat.label}</p>
        </div>
      )}
    </div>
  );
}
