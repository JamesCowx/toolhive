'use client';

import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';

export default function UrlEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  function encode() {
    setError('');
    try { setOutput(encodeURIComponent(input)); }
    catch { setError('Failed to encode'); }
  }

  function decode() {
    setError('');
    try { setOutput(decodeURIComponent(input)); }
    catch { setError('Invalid URL encoding'); }
  }

  function encodeFull() {
    setError('');
    try { setOutput(encodeURI(input)); }
    catch { setError('Failed to encode'); }
  }

  return (
    <div className="tool-section">
      <textarea className="input-field min-h-[120px] resize-y font-mono text-sm" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter URL or text to encode/decode..." />

      <div className="flex flex-wrap gap-2">
        <button onClick={encode} className="btn-primary">Encode URI Component</button>
        <button onClick={encodeFull} className="btn-secondary">Encode URI</button>
        <button onClick={decode} className="btn-secondary">Decode</button>
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

      {!input && <p className="text-center text-sm text-gray-400">Type or paste a URL to encode or decode</p>}
    </div>
  );
}
