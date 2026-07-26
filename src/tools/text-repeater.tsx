'use client';

import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function TextRepeater() {
  const [text, setText] = useState('');
  const [count, setCount] = useState(5);
  const [separator, setSeparator] = useState('\\n');
  const [result, setResult] = useState('');

  function repeat() {
    if (!text.trim()) { setResult(''); return; }
    const n = Math.max(1, Math.min(10000, count));
    const sep = separator.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
    setResult(Array.from({ length: n }, () => text).join(sep));
  }

  return (
    <div className="tool-section">
      <div>
        <label className="label-premium">Text to Repeat</label>
        <textarea className="input-premium min-h-[80px] resize-y font-mono text-sm" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-premium">Number of Times (1-10000)</label>
          <input type="number" min="1" max="10000" className="input-premium" value={count} onChange={e => setCount(Number(e.target.value))} />
        </div>
        <div>
          <label className="label-premium">Separator</label>
          <input className="input-premium" value={separator} onChange={e => setSeparator(e.target.value)} placeholder='e.g., \n, ,, -' />
        </div>
      </div>

      <button onClick={repeat} className="btn-premium w-full">Repeat</button>

      {result && (
        <div className="animate-fade-in-up space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">{count} repetitions</span>
            <CopyButton text={result} />
          </div>
          <textarea readOnly value={result} className="input-premium min-h-[150px] resize-y font-mono text-xs" />
        </div>
      )}

      {!result && (
        <p className="text-center text-sm text-gray-400 dark:text-gray-500">Enter text and click Repeat</p>
      )}
    </div>
  );
}
