'use client';

import { useState } from 'react';
import CopyButton from '@/components/CopyButton';
import { copyToClipboard } from '@/lib/utils';

function generateUUID(): string {
  return crypto.randomUUID();
}

export default function UUIDGenerator() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);

  function generate() {
    const n = Math.max(1, Math.min(100, count));
    setUuids(Array.from({ length: n }, () => generateUUID()));
  }

  return (
    <div className="tool-section">
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <label className="label-premium">Number of UUIDs (1-100)</label>
          <input type="number" min="1" max="100" className="input-premium" value={count} onChange={e => setCount(Number(e.target.value))} />
        </div>
        <button onClick={generate} className="btn-premium">Generate</button>
      </div>

      {uuids.length > 0 && (
        <div className="animate-fade-in-up space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">{uuids.length} UUID{uuids.length > 1 ? 's' : ''} generated</span>
            {uuids.length > 1 && <CopyButton text={uuids.join('\n')} label="Copy All" className="text-xs !py-1.5 !px-3" />}
          </div>
          <div className="max-h-64 overflow-y-auto space-y-2">
            {uuids.map((uuid, i) => (
              <div key={i} className="flex items-center gap-2 group animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
                <code className="flex-1 text-xs font-mono bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 break-all select-all">{uuid}</code>
                <button onClick={() => copyToClipboard(uuid)} className="p-2 rounded-lg text-gray-400 hover:text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all opacity-0 group-hover:opacity-100">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {uuids.length === 0 && (
        <p className="text-center text-sm text-gray-400 dark:text-gray-500">Click Generate to create UUIDs</p>
      )}
    </div>
  );
}
