'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import CopyButton from '@/components/CopyButton';

export default function Stopwatch() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [mode, setMode] = useState<'stopwatch' | 'countdown'>('stopwatch');
  const [countdownInput, setCountdownInput] = useState('300');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startRef = useRef(0);

  const countdownTime = parseInt(countdownInput) || 0;
  const remaining = Math.max(0, countdownTime - elapsed);

  useEffect(() => {
    if (running) {
      startRef.current = Date.now() - elapsed;
      intervalRef.current = setInterval(() => {
        setElapsed(Date.now() - startRef.current);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  useEffect(() => {
    if (mode === 'countdown' && remaining <= 0 && running) {
      setRunning(false);
    }
  }, [remaining, running, mode]);

  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const cs = Math.floor((ms % 1000) / 10);
    return `${h > 0 ? `${h}:${String(m).padStart(2, '0')}:` : ''}${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
  };

  const toggle = () => setRunning(prev => !prev);
  const reset = () => { setRunning(false); setElapsed(0); setLaps([]); };
  const addLap = () => { if (running) setLaps(prev => [elapsed - (prev.length > 0 ? prev.reduce((a, b) => a + b, 0) : 0), ...prev]); };

  const displayTime = mode === 'stopwatch' ? elapsed : remaining;
  const isDone = mode === 'countdown' && remaining <= 0;

  return (
    <div className="tool-section">
      <div className="flex gap-2">
        <button onClick={() => { setMode('stopwatch'); reset(); }} className={`btn-${mode === 'stopwatch' ? 'premium' : 'outline'}`}>Stopwatch</button>
        <button onClick={() => { setMode('countdown'); reset(); }} className={`btn-${mode === 'countdown' ? 'premium' : 'outline'}`}>Countdown</button>
      </div>

      {mode === 'countdown' && !running && elapsed === 0 && (
        <div>
          <label className="label-premium">Countdown Time (seconds)</label>
          <input type="number" min="1" max="86400" className="input-premium" value={countdownInput} onChange={e => setCountdownInput(e.target.value)} />
        </div>
      )}

      <div className="text-center py-8">
        <p className={`text-5xl sm:text-7xl font-mono font-bold tracking-wider tabular-nums ${isDone ? 'text-red-500 animate-pulse' : ''}`} style={{ color: isDone ? undefined : 'var(--text)' }}>
          {isDone ? '00:00.00' : formatTime(displayTime)}
        </p>
        {mode === 'countdown' && countdownTime > 0 && (
          <div className="mt-4 h-2 rounded-full overflow-hidden mx-auto max-w-xs" style={{ background: 'var(--bg-muted)' }}>
            <div className="h-full rounded-full bg-primary-500 transition-all duration-200" style={{ width: `${((countdownTime - remaining) / countdownTime) * 100}%` }} />
          </div>
        )}
      </div>

      <div className="flex justify-center gap-3">
        {!isDone && (
          <button onClick={toggle} className={`btn-${running ? 'outline' : 'premium'}`}>
            {running ? (
              <><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6" /></svg>Pause</>
            ) : (
              <><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>{elapsed > 0 ? 'Resume' : 'Start'}</>
            )}
          </button>
        )}
        <button onClick={reset} className="btn-outline">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset
        </button>
        {mode === 'stopwatch' && running && (
          <button onClick={addLap} className="btn-premium">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Lap
          </button>
        )}
      </div>

      {laps.length > 0 && (
        <div className="animate-fade-in-up space-y-1 max-h-48 overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Laps ({laps.length})</span>
            <CopyButton text={laps.map((l, i) => `Lap ${laps.length - i}: ${formatTime(l)}`).join('\n')} className="text-xs !py-1.5 !px-3" />
          </div>
          {laps.map((l, i) => (
            <div key={i} className="flex justify-between items-center rounded-xl px-4 py-2 text-sm animate-fade-in" style={{ background: 'var(--bg-muted)', animationDelay: `${i * 30}ms` }}>
              <span style={{ color: 'var(--text-muted)' }}>Lap {laps.length - i}</span>
              <span className="font-mono font-medium">{formatTime(l)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
