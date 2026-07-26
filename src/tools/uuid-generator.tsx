'use client';

import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';

function generateUUID(): string {
  return crypto.randomUUID();
}

export default function UUIDGenerator() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  function generate() {
    const n = Math.max(1, Math.min(100, count));
    setUuids(Array.from({ length: n }, () => generateUUID()));
  }

  async function handleCopy(index: number) {
    await copyToClipboard(uuids[index]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function copyAll() {
    await copyToClipboard(uuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="tool-section">
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <label className="label-text">Number of UUIDs (1-100)</label>
          <input type="number" min="1" max="100" className="input-field" value={count} onChange={e => setCount(Number(e.target.value))} />
        </div>
        <button onClick={generate} className="btn-primary">Generate</button>
      </div>

      {uuids.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{uuids.length} UUID{uuids.length > 1 ? 's' : ''} generated</span>
            {uuids.length > 1 && (
              <button onClick={copyAll} className="btn-secondary text-xs py-1.5 px-3">{copied ? 'Copied!' : 'Copy All'}</button>
            )}
          </div>
          <div className="max-h-64 overflow-y-auto space-y-1.5">
            {uuids.map((uuid, i) => (
              <div key={i} className="flex items-center gap-2">
                <code className="result-box flex-1 text-xs py-2">{uuid}</code>
                <button onClick={() => handleCopy(i)} className="btn-secondary text-xs py-1.5 px-3 shrink-0">
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {uuids.length === 0 && (
        <p className="text-center text-sm text-gray-400">Click Generate to create UUIDs</p>
      )}
    </div>
  );
}
