'use client';

import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';

export default function TextRepeater() {
  const [text, setText] = useState('');
  const [count, setCount] = useState(5);
  const [separator, setSeparator] = useState('\n');
  const [result, setResult] = useState('');

  function repeat() {
    if (!text.trim()) { setResult(''); return; }
    const n = Math.max(1, Math.min(10000, count));
    const sep = separator.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\s/g, ' ');
    setResult(Array.from({ length: n }, () => text).join(sep));
  }

  return (
    <div className="tool-section">
      <div>
        <label className="label-text">Text to Repeat</label>
        <textarea className="input-field min-h-[80px] resize-y font-mono text-sm" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-text">Number of Times (1-10000)</label>
          <input type="number" min="1" max="10000" className="input-field" value={count} onChange={e => setCount(Number(e.target.value))} />
        </div>
        <div>
          <label className="label-text">Separator</label>
          <input className="input-field" value={separator} onChange={e => setSeparator(e.target.value)} placeholder="e.g., \n, ,, -" />
        </div>
      </div>

      <button onClick={repeat} className="btn-primary w-full">Repeat</button>

      {result && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{count} repetitions</span>
            <button onClick={() => copyToClipboard(result)} className="btn-secondary text-xs py-1.5 px-3">Copy</button>
          </div>
          <textarea readOnly value={result} className="input-field min-h-[150px] resize-y font-mono text-xs" />
        </div>
      )}
    </div>
  );
}
