'use client';

import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

const WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
  'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat',
  'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'voluptate', 'velit',
  'esse', 'cillum', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum',
];

function generateWords(count: number): string {
  return Array.from({ length: count }, () => WORDS[Math.floor(Math.random() * WORDS.length)]).join(' ');
}

function generateSentences(count: number): string {
  const sents: string[] = [];
  for (let i = 0; i < count; i++) {
    const wc = 8 + Math.floor(Math.random() * 12);
    const words = generateWords(wc);
    sents.push(words.charAt(0).toUpperCase() + words.slice(1) + '.');
  }
  return sents.join(' ');
}

function generateParagraphs(count: number): string {
  return Array.from({ length: count }, () => {
    const sc = 3 + Math.floor(Math.random() * 5);
    return generateSentences(sc);
  }).join('\n\n');
}

type Mode = 'words' | 'sentences' | 'paragraphs';

export default function LoremIpsum() {
  const [mode, setMode] = useState<Mode>('paragraphs');
  const [count, setCount] = useState(3);
  const [result, setResult] = useState('');

  function generate() {
    const n = Math.max(1, Math.min(100, count));
    switch (mode) {
      case 'words': setResult(generateWords(n)); break;
      case 'sentences': setResult(generateSentences(n)); break;
      case 'paragraphs': setResult(generateParagraphs(n)); break;
    }
  }

  return (
    <div className="tool-section">
      <div className="flex gap-2">
        {(['words', 'sentences', 'paragraphs'] as Mode[]).map(m => (
          <button key={m} onClick={() => setMode(m)} className={`btn-${mode === m ? 'premium' : 'outline'} capitalize`}>{m}</button>
        ))}
      </div>

      <div className="flex items-end gap-4">
        <div className="flex-1">
          <label className="label-premium">Number of {mode}</label>
          <input type="number" min="1" max="100" className="input-premium" value={count} onChange={e => setCount(Number(e.target.value))} />
        </div>
        <button onClick={generate} className="btn-premium">Generate</button>
      </div>

      {result && (
        <div className="animate-fade-in-up space-y-3">
          <div className="flex justify-end gap-2">
            <button onClick={() => { setResult(''); }} className="btn-outline text-xs !py-1.5 !px-3">Clear</button>
            <CopyButton text={result} />
          </div>
          <textarea readOnly value={result} className="input-premium min-h-[200px] resize-y font-serif text-sm leading-relaxed" />
        </div>
      )}

      {!result && (
        <p className="text-center text-sm text-gray-400 dark:text-gray-500">Click Generate to create Lorem Ipsum text</p>
      )}
    </div>
  );
}
