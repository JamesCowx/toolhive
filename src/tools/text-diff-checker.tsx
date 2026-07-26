'use client';

import { useState, useMemo } from 'react';

interface DiffSegment {
  text: string;
  type: 'same' | 'added' | 'removed';
}

function computeDiff(a: string, b: string): DiffSegment[] {
  if (!a && !b) return [];
  if (!a) return [{ text: b, type: 'added' }];
  if (!b) return [{ text: a, type: 'removed' }];

  const wordsA = a.split(/(\s+)/);
  const wordsB = b.split(/(\s+)/);
  const m = wordsA.length, n = wordsB.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = wordsA[i - 1] === wordsB[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  const result: DiffSegment[] = [];
  let i = m, j = n;
  const temp: DiffSegment[] = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && wordsA[i - 1] === wordsB[j - 1]) {
      temp.push({ text: wordsA[i - 1], type: 'same' });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      temp.push({ text: wordsB[j - 1], type: 'added' });
      j--;
    } else {
      temp.push({ text: wordsA[i - 1], type: 'removed' });
      i--;
    }
  }

  return temp.reverse();
}

export default function TextDiffChecker() {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');

  const diff = useMemo(() => computeDiff(textA, textB), [textA, textB]);

  const removed = diff.filter(d => d.type === 'removed').map(d => d.text).join('');
  const added = diff.filter(d => d.type === 'added').map(d => d.text).join('');

  return (
    <div className="tool-section">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-text">Original Text</label>
          <textarea className="input-field min-h-[150px] resize-y font-mono text-sm" value={textA} onChange={e => setTextA(e.target.value)} placeholder="Original text..." />
        </div>
        <div>
          <label className="label-text">Modified Text</label>
          <textarea className="input-field min-h-[150px] resize-y font-mono text-sm" value={textB} onChange={e => setTextB(e.target.value)} placeholder="Modified text..." />
        </div>
      </div>

      {diff.length > 0 && (textA || textB) && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-red-50 border border-red-200 p-3">
              <p className="text-xs font-semibold text-red-700 mb-1">Removed ({diff.filter(d => d.type === 'removed').length} changes)</p>
              <div className="text-sm whitespace-pre-wrap font-mono">
                {removed || <span className="text-gray-400">None</span>}
              </div>
            </div>
            <div className="rounded-xl bg-green-50 border border-green-200 p-3">
              <p className="text-xs font-semibold text-green-700 mb-1">Added ({diff.filter(d => d.type === 'added').length} changes)</p>
              <div className="text-sm whitespace-pre-wrap font-mono">
                {added || <span className="text-gray-400">None</span>}
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
            <p className="text-xs font-semibold text-gray-700 mb-2">Combined Diff View</p>
            <div className="text-sm whitespace-pre-wrap font-mono leading-relaxed">
              {diff.map((seg, i) => {
                const cls = seg.type === 'added' ? 'bg-green-200 text-green-900' : seg.type === 'removed' ? 'bg-red-200 text-red-900 line-through' : '';
                return <span key={i} className={cls}>{seg.text}</span>;
              })}
            </div>
          </div>
        </div>
      )}

      {!textA && !textB && (
        <p className="text-center text-sm text-gray-400">Enter text in both fields to see the differences</p>
      )}
    </div>
  );
}
