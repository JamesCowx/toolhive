'use client';

import { useState } from 'react';
import { copyToClipboard, downloadFile } from '@/lib/utils';

type Direction = 'json-to-csv' | 'csv-to-json';

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

  async function handleCopy() { if (output) await copyToClipboard(output); }

  function handleDownload() {
    const ext = direction === 'json-to-csv' ? 'csv' : 'json';
    const mime = direction === 'json-to-csv' ? 'text/csv' : 'application/json';
    if (output) downloadFile(output, `converted.${ext}`, mime);
  }

  return (
    <div className="tool-section">
      <div className="flex gap-2">
        <button onClick={() => setDirection('json-to-csv')} className={`btn-${direction === 'json-to-csv' ? 'primary' : 'secondary'}`}>JSON → CSV</button>
        <button onClick={() => setDirection('csv-to-json')} className={`btn-${direction === 'csv-to-json' ? 'primary' : 'secondary'}`}>CSV → JSON</button>
      </div>

      <div>
        <label className="label-text">Input {direction === 'json-to-csv' ? 'JSON' : 'CSV'}</label>
        <textarea className="input-field min-h-[150px] resize-y font-mono text-sm" value={input} onChange={e => setInput(e.target.value)} placeholder={direction === 'json-to-csv' ? 'Paste JSON here...' : 'Paste CSV here...'} />
      </div>

      <button onClick={convert} className="btn-primary w-full">Convert</button>

      {error && <p className="text-sm text-red-600 bg-red-50 rounded-xl p-3">{error}</p>}

      {output && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="label-text mb-0">Output</label>
            <div className="flex gap-2">
              <button onClick={handleCopy} className="btn-secondary text-xs py-1.5 px-3">Copy</button>
              <button onClick={handleDownload} className="btn-secondary text-xs py-1.5 px-3">Download</button>
            </div>
          </div>
          <textarea readOnly value={output} className="input-field min-h-[150px] resize-y font-mono text-sm" />
        </div>
      )}
    </div>
  );
}
