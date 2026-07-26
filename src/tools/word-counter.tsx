'use client';

import { useState, useMemo } from 'react';

interface Stats {
  words: number;
  chars: number;
  charsNoSpace: number;
  sentences: number;
  paragraphs: number;
  readingTime: string;
}

function computeStats(text: string): Stats {
  const t = text.trim();
  const words = t ? t.split(/\s+/).length : 0;
  const chars = t.length;
  const charsNoSpace = t.replace(/\s/g, '').length;
  const sentences = t ? t.split(/[.!?]+/).filter(s => s.trim()).length : 0;
  const paragraphs = t ? t.split(/\n\s*\n/).filter(p => p.trim()).length : Math.min(1, t ? 1 : 0);
  const wpm = 200;
  const minutes = words / wpm;
  const readingTime = minutes < 1 ? '<1 min' : `${Math.ceil(minutes)} min`;
  return { words, chars, charsNoSpace, sentences, paragraphs, readingTime };
}

export default function WordCounter() {
  const [text, setText] = useState('');
  const stats = useMemo(() => computeStats(text), [text]);

  const counters = [
    { label: 'Words', value: stats.words },
    { label: 'Characters', value: stats.chars },
    { label: 'No Spaces', value: stats.charsNoSpace },
    { label: 'Sentences', value: stats.sentences },
    { label: 'Paragraphs', value: stats.paragraphs },
    { label: 'Reading Time', value: stats.readingTime },
  ];

  return (
    <div className="tool-section">
      <textarea
        className="input-field min-h-[200px] resize-y"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type or paste your text here..."
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {counters.map(c => (
          <div key={c.label} className="rounded-xl bg-gray-50 border border-gray-200 p-4 text-center">
            <p className="text-2xl font-bold text-primary-700">{c.value}</p>
            <p className="text-xs text-gray-500 mt-1">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
