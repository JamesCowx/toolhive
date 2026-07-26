'use client';

import { useState, useMemo } from 'react';

interface Stats {
  words: number;
  chars: number;
  charsNoSpace: number;
  sentences: number;
  paragraphs: number;
  readingTime: string;
  speakingTime: string;
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
  const spm = 150;
  const speakingMinutes = words / spm;
  const speakingTime = speakingMinutes < 1 ? '<1 min' : `${Math.ceil(speakingMinutes)} min`;
  return { words, chars, charsNoSpace, sentences, paragraphs, readingTime, speakingTime };
}

export default function WordCounter() {
  const [text, setText] = useState('');
  const stats = useMemo(() => computeStats(text), [text]);

  const counters = [
    { label: 'Words', value: stats.words, icon: '🔤' },
    { label: 'Characters', value: stats.chars, icon: '🔡' },
    { label: 'No Spaces', value: stats.charsNoSpace, icon: '✏️' },
    { label: 'Sentences', value: stats.sentences, icon: '📝' },
    { label: 'Paragraphs', value: stats.paragraphs, icon: '📋' },
    { label: 'Reading Time', value: stats.readingTime, icon: '📖' },
    { label: 'Speaking Time', value: stats.speakingTime, icon: '🎤' },
  ];

  return (
    <div className="tool-section">
      <div className="relative">
        <textarea
          className="input-premium min-h-[200px] resize-y pr-12"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type or paste your text here..."
        />
        {text && (
          <button
            onClick={() => setText('')}
            className="absolute top-3 right-3 rounded-lg p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {text ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {counters.map((c, i) => (
            <div
              key={c.label}
              className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-4 text-center animate-fade-in-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="text-2xl mb-1 block">{c.icon}</span>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{c.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{c.label}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {counters.map(c => (
            <div key={c.label} className="rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-4 text-center">
              <span className="text-2xl mb-1 block">{c.icon}</span>
              <p className="text-2xl font-bold text-gray-300 dark:text-gray-600">0</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{c.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
