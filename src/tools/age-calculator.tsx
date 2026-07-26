'use client';

import { useState, useEffect, useRef } from 'react';

function computeAge(birth: Date, now: Date) {
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();
  if (days < 0) { months--; const pm = new Date(now.getFullYear(), now.getMonth(), 0); days += pm.getDate(); }
  if (months < 0) { years--; months += 12; }
  const totalDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
  const totalHours = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60));
  const totalMinutes = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60));
  const totalSeconds = Math.floor((now.getTime() - birth.getTime()) / 1000);
  return { years, months, days, totalDays, totalHours, totalMinutes, totalSeconds };
}

export default function AgeCalculator() {
  const [birthdate, setBirthdate] = useState('1990-01-01');
  const [now, setNow] = useState(new Date());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setNow(new Date()), 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const birth = new Date(birthdate);
  const isValid = !isNaN(birth.getTime()) && birth < now;
  const age = isValid ? computeAge(birth, now) : null;

  const stats = age ? [
    { label: 'Years', value: age.years },
    { label: 'Months', value: age.months },
    { label: 'Days', value: age.days },
    { label: 'Total Days', value: age.totalDays.toLocaleString() },
    { label: 'Total Hours', value: age.totalHours.toLocaleString() },
    { label: 'Total Minutes', value: age.totalMinutes.toLocaleString() },
    { label: 'Total Seconds', value: age.totalSeconds.toLocaleString() },
  ] : [];

  return (
    <div className="tool-section">
      <div>
        <label className="label-premium">Date of Birth</label>
        <input type="date" className="input-premium" value={birthdate} onChange={e => setBirthdate(e.target.value)} max={new Date().toISOString().slice(0, 10)} />
      </div>

      {age && (
        <div className="animate-fade-in-up space-y-4">
          <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border p-6 text-center" style={{ borderColor: 'var(--border)' }}>
            <p className="text-lg font-semibold text-primary-700 dark:text-primary-300">
              You are <span className="text-3xl font-extrabold">{age.years}</span> years old
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              or {age.months} months, {age.days} days
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {stats.map((s, i) => (
              <div key={s.label} className="rounded-xl p-4 text-center border animate-count-up" style={{ background: 'var(--bg-muted)', borderColor: 'var(--border)', animationDelay: `${i * 60}ms` }}>
                <p className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">{s.value}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-center" style={{ color: 'var(--text-dim)' }}>
            Age updates in real-time &middot; Last updated: {now.toLocaleTimeString()}
          </p>
        </div>
      )}

      {!isValid && birthdate && (
        <p className="text-sm text-red-500">Please enter a valid date of birth in the past.</p>
      )}
    </div>
  );
}
