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
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = wordsA[i - 1] === wordsB[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
  const result: DiffSegment[] = [];
  let i = m, j = n;
  const temp: DiffSegment[] = [];
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && wordsA[i - 1] === wordsB[j - 1]) { temp.push({ text: wordsA[i - 1], type: 'same' }); i--; j--; }
    else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) { temp.push({ text: wordsB[j - 1], type: 'added' }); j--; }
    else { temp.push({ text: wordsA[i - 1], type: 'removed' }); i--; }
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
          <label className="label-premium">Original Text</label>
          <textarea className="input-premium min-h-[150px] resize-y font-mono text-sm" value={textA} onChange={e => setTextA(e.target.value)} placeholder="Original text..." />
        </div>
        <div>
          <label className="label-premium">Modified Text</label>
          <textarea className="input-premium min-h-[150px] resize-y font-mono text-sm" value={textB} onChange={e => setTextB(e.target.value)} placeholder="Modified text..." />
        </div>
      </div>

      {(textA || textB) && (
        <div className="animate-fade-in-up space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 p-4">
              <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-2 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                Removed ({diff.filter(d => d.type === 'removed').length})
              </p>
              <div className="text-sm whitespace-pre-wrap font-mono text-red-800 dark:text-red-300 leading-relaxed">
                {removed || <span className="text-red-400/50 italic">None</span>}
              </div>
            </div>
            <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/50 p-4">
              <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Added ({diff.filter(d => d.type === 'added').length})
              </p>
              <div className="text-sm whitespace-pre-wrap font-mono text-green-800 dark:text-green-300 leading-relaxed">
                {added || <span className="text-green-400/50 italic">None</span>}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-4">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-3">Combined Diff View</p>
            <div className="text-sm whitespace-pre-wrap font-mono leading-relaxed max-h-48 overflow-y-auto">
              {diff.map((seg, i) => {
                const cls = seg.type === 'added' ? 'bg-green-200 dark:bg-green-900/40 text-green-900 dark:text-green-200 rounded px-0.5' :
                            seg.type === 'removed' ? 'bg-red-200 dark:bg-red-900/40 text-red-900 dark:text-red-200 line-through rounded px-0.5' : '';
                return <span key={i} className={cls}>{seg.text}</span>;
              })}
            </div>
          </div>
        </div>
      )}

      {!textA && !textB && (
        <p className="text-center text-sm text-gray-400 dark:text-gray-500">Enter text in both fields to see the differences</p>
      )}
    </div>
  );
}
