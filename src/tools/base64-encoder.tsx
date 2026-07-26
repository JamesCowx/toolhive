'use client';

import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function Base64Encoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  function encode() {
    setError(''); setOutput('');
    try { setOutput(btoa(input)); }
    catch { setError('Failed to encode'); }
  }

  function decode() {
    setError(''); setOutput('');
    try { setOutput(atob(input)); }
    catch { setError('Invalid Base64 input'); }
  }

  return (
    <div className="tool-section">
      <textarea className="input-premium min-h-[120px] resize-y font-mono text-sm" value={input} onChange={e => { setInput(e.target.value); setOutput(''); }} placeholder="Enter text or Base64..." />

      <div className="flex gap-2">
        <button onClick={encode} className="btn-premium flex-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          Encode
        </button>
        <button onClick={decode} className="btn-outline flex-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Decode
        </button>
      </div>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 animate-fade-in">{error}</div>
      )}

      {output && (
        <div className="animate-fade-in-up space-y-2">
          <div className="flex justify-end">
            <CopyButton text={output} />
          </div>
          <textarea readOnly value={output} className="input-premium min-h-[120px] resize-y font-mono text-sm" />
        </div>
      )}

      {!input && !output && (
        <p className="text-center text-sm text-gray-400 dark:text-gray-500">Enter text to encode or decode</p>
      )}
    </div>
  );
}
