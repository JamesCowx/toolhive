'use client';

import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState(2);

  function format() {
    setError('');
    if (!input.trim()) { setOutput(''); return; }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  }

  function minify() {
    setError('');
    if (!input.trim()) { setOutput(''); return; }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  }

  function validate() {
    setError('');
    if (!input.trim()) { setOutput(''); return; }
    try {
      JSON.parse(input);
      setOutput('✓ Valid JSON');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  }

  const lineCount = output ? output.split('\n').length : 0;

  return (
    <div className="tool-section">
      <textarea className="input-premium min-h-[180px] resize-y font-mono text-sm" value={input} onChange={e => { setInput(e.target.value); setOutput(''); }} placeholder="Paste JSON here..." />

      <div className="flex flex-wrap gap-2">
        <button onClick={format} className="btn-premium">Format</button>
        <button onClick={minify} className="btn-outline">Minify</button>
        <button onClick={validate} className="btn-outline">Validate</button>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Indent:</label>
        {[2, 4, 8].map(n => (
          <button key={n} onClick={() => { setIndent(n); if (output) { try { setOutput(JSON.stringify(JSON.parse(input), null, n)); } catch {} } }} className={`btn-${indent === n ? 'premium' : 'outline'} text-xs !py-1 !px-3`}>{n}</button>
        ))}
      </div>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 animate-fade-in">
          {error}
        </div>
      )}

      {output && !error && (
        <div className="animate-fade-in-up space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs" style={{ color: 'var(--text-dim)' }}>{lineCount} lines</span>
            <CopyButton text={output} />
          </div>
          {output === '✓ Valid JSON' ? (
            <div className="rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 text-center text-green-700 dark:text-green-300 font-semibold animate-scale-in">
              {output}
            </div>
          ) : (
            <textarea readOnly value={output} className="input-premium min-h-[180px] resize-y font-mono text-sm" />
          )}
        </div>
      )}
    </div>
  );
}
