'use client';

import { useState } from 'react';
import CopyButton from '@/components/CopyButton';
import { downloadFile } from '@/lib/utils';

type Direction = 'json-to-csv' | 'csv-to-json';

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQuotes) {
      if (c === '"' && line[i + 1] === '"') { current += '"'; i++; }
      else if (c === '"') { inQuotes = false; }
      else { current += c; }
    } else {
      if (c === '"') { inQuotes = true; }
      else if (c === ',') { result.push(current.trim()); current = ''; }
      else { current += c; }
    }
  }
  result.push(current.trim());
  return result;
}

export default function JsonCsvConverter() {
  const [direction, setDirection] = useState<Direction>('json-to-csv');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  function convert() {
    setError('');
    setOutput('');
    if (!input.trim()) { setError('Please enter data'); return; }

    try {
      if (direction === 'json-to-csv') {
        const data = JSON.parse(input);
        const arr = Array.isArray(data) ? data : [data];
        if (arr.length === 0) { setError('JSON array is empty'); return; }
        const headers = [...new Set(arr.flatMap(Object.keys))];
        const rows = arr.map(obj => headers.map(h => {
          const val = obj[h];
          const str = val === null || val === undefined ? '' : String(val);
          return str.includes(',') || str.includes('"') || str.includes('\n') ? `"${str.replace(/"/g, '""')}"` : str;
        }));
        setOutput([headers.join(','), ...rows.map(r => r.join(','))].join('\n'));
      } else {
        const lines = input.split('\n').filter(l => l.trim());
        if (lines.length < 2) { setError('CSV must have headers and at least one row'); return; }
        const headers = parseCSVLine(lines[0]);
        const result = lines.slice(1).map(line => {
          const vals = parseCSVLine(line);
          const obj: Record<string, string> = {};
          headers.forEach((h, i) => { obj[h] = vals[i] ?? ''; });
          return obj;
        });
        setOutput(JSON.stringify(result, null, 2));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Conversion failed');
    }
  }

  function handleDownload() {
    const ext = direction === 'json-to-csv' ? 'csv' : 'json';
    const mime = direction === 'json-to-csv' ? 'text/csv' : 'application/json';
    if (output) downloadFile(output, `converted.${ext}`, mime);
  }

  function handleSwap() {
    if (output) {
      setInput(output);
      setOutput('');
      setDirection(prev => prev === 'json-to-csv' ? 'csv-to-json' : 'json-to-csv');
    }
  }

  return (
    <div className="tool-section">
      <div className="flex gap-2">
        <button onClick={() => { setDirection('json-to-csv'); setOutput(''); }} className={`btn-${direction === 'json-to-csv' ? 'premium' : 'outline'}`}>JSON → CSV</button>
        <button onClick={() => { setDirection('csv-to-json'); setOutput(''); }} className={`btn-${direction === 'csv-to-json' ? 'premium' : 'outline'}`}>CSV → JSON</button>
      </div>

      <div>
        <label className="label-premium">Input {direction === 'json-to-csv' ? 'JSON' : 'CSV'}</label>
        <textarea className="input-premium min-h-[150px] resize-y font-mono text-sm" value={input} onChange={e => { setInput(e.target.value); setOutput(''); }} placeholder={direction === 'json-to-csv' ? 'Paste JSON here...' : 'Paste CSV here...'} />
      </div>

      <div className="flex gap-2">
        <button onClick={convert} className="btn-premium flex-1">Convert</button>
        {output && (
          <button onClick={handleSwap} className="btn-outline" title="Swap input/output">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
        )}
      </div>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 animate-fade-in">
          {error}
        </div>
      )}

      {output && (
        <div className="animate-fade-in-up space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Output</span>
            <div className="flex gap-2">
              <CopyButton text={output} />
              <button onClick={handleDownload} className="btn-outline text-xs !py-2 !px-3">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download
              </button>
            </div>
          </div>
          <textarea readOnly value={output} className="input-premium min-h-[150px] resize-y font-mono text-sm" />
        </div>
      )}
    </div>
  );
}
