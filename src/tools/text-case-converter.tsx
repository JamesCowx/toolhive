'use client';

import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';

type CaseType = 'upper' | 'lower' | 'title' | 'camel' | 'pascal' | 'kebab' | 'snake' | 'sentence';

const caseTypes: { value: CaseType; label: string }[] = [
  { value: 'upper', label: 'UPPER CASE' },
  { value: 'lower', label: 'lower case' },
  { value: 'title', label: 'Title Case' },
  { value: 'camel', label: 'camelCase' },
  { value: 'pascal', label: 'PascalCase' },
  { value: 'kebab', label: 'kebab-case' },
  { value: 'snake', label: 'snake_case' },
  { value: 'sentence', label: 'Sentence case' },
];

function convert(text: string, type: CaseType): string {
  const words = text.match(/[a-zA-Z0-9]+/g) || [''];
  switch (type) {
    case 'upper': return text.toUpperCase();
    case 'lower': return text.toLowerCase();
    case 'title': return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    case 'camel': return words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
    case 'pascal': return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
    case 'kebab': return words.map(w => w.toLowerCase()).join('-');
    case 'snake': return words.map(w => w.toLowerCase()).join('_');
    case 'sentence': const s = words.join(' '); return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  }
}

export default function TextCaseConverter() {
  const [input, setInput] = useState('');
  const [selectedCase, setSelectedCase] = useState<CaseType>('upper');
  const [output, setOutput] = useState('');

  function handleInput(val: string) {
    setInput(val);
    if (val.trim()) setOutput(convert(val, selectedCase));
    else setOutput('');
  }

  function handleCase(type: CaseType) {
    setSelectedCase(type);
    if (input.trim()) setOutput(convert(input, type));
  }

  return (
    <div className="tool-section">
      <textarea className="input-field min-h-[120px] resize-y font-mono text-sm" value={input} onChange={e => handleInput(e.target.value)} placeholder="Type or paste text here..." />

      <div className="flex flex-wrap gap-2">
        {caseTypes.map(ct => (
          <button key={ct.value} onClick={() => handleCase(ct.value)} className={`btn-${selectedCase === ct.value ? 'primary' : 'secondary'} text-xs`}>{ct.label}</button>
        ))}
      </div>

      {output && (
        <div className="space-y-2">
          <div className="flex justify-end">
            <button onClick={() => copyToClipboard(output)} className="btn-secondary text-xs py-1.5 px-3">Copy</button>
          </div>
          <textarea readOnly value={output} className="input-field min-h-[120px] resize-y font-mono text-sm" />
        </div>
      )}

      {!input && <p className="text-center text-sm text-gray-400">Type text above and select a case to convert</p>}
    </div>
  );
}
