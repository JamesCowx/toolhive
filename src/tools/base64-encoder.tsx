'use client';

import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';

export default function Base64Encoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  function encode() {
    setError('');
    try {
      setOutput(btoa(input));
    } catch { setError('Failed to encode'); }
  }

  function decode() {
    setError('');
    try {
      setOutput(atob(input));
    } catch { setError('Invalid Base64 input'); }
  }

  return (
    <div className="tool-section">
      <textarea className="input-field min-h-[120px] resize-y font-mono text-sm" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text or Base64..." />

      <div className="flex gap-2">
        <button onClick={encode} className="btn-primary flex-1">Encode → Base64</button>
        <button onClick={decode} className="btn-secondary flex-1">Decode ← Text</button>
      </div>

      {error && <p className="text-sm text-red-600 bg-red-50 rounded-xl p-3">{error}</p>}

      {output && (
        <div className="space-y-2">
          <div className="flex justify-end">
            <button onClick={() => copyToClipboard(output)} className="btn-secondary text-xs py-1.5 px-3">Copy</button>
          </div>
          <textarea readOnly value={output} className="input-field min-h-[120px] resize-y font-mono text-sm" />
        </div>
      )}
    </div>
  );
}
