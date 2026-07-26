'use client';

import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

const MORSE_MAP: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
  'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
  'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.',
  '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-',
  '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.', '@': '.--.-.', ' ': '/',
};

const REVERSE_MAP: Record<string, string> = {};
for (const [k, v] of Object.entries(MORSE_MAP)) {
  REVERSE_MAP[v] = k;
}

function textToMorse(text: string): string {
  return text.toUpperCase().split('').map(ch => MORSE_MAP[ch] || ch).join(' ');
}

function morseToText(morse: string): string {
  return morse.trim().split(/\s+/).map(code => REVERSE_MAP[code] || code).join('');
}

export default function MorseCode() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  function convert() {
    if (!input.trim()) { setOutput(''); return; }
    setOutput(mode === 'encode' ? textToMorse(input) : morseToText(input));
  }

  return (
    <div className="tool-section">
      <div className="flex gap-2">
        <button onClick={() => { setMode('encode'); setOutput(''); }} className={`btn-${mode === 'encode' ? 'premium' : 'outline'}`}>Text → Morse</button>
        <button onClick={() => { setMode('decode'); setOutput(''); }} className={`btn-${mode === 'decode' ? 'premium' : 'outline'}`}>Morse → Text</button>
      </div>

      <textarea className="input-premium min-h-[100px] resize-y font-mono text-sm" value={input} onChange={e => { setInput(e.target.value); setOutput(''); }} placeholder={mode === 'encode' ? 'Enter text to convert to Morse code...' : 'Enter Morse code (use dots and dashes separated by spaces)...'} />

      <button onClick={convert} className="btn-premium w-full">Convert</button>

      {output && (
        <div className="animate-fade-in-up space-y-2">
          <div className="flex justify-end">
            <CopyButton text={output} />
          </div>
          <textarea readOnly value={output} className="input-premium min-h-[100px] resize-y font-mono text-sm" />
        </div>
      )}

      {!input && (
        <p className="text-center text-sm" style={{ color: 'var(--text-dim)' }}>Enter text or Morse code to convert</p>
      )}
    </div>
  );
}
