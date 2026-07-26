'use client';

import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

type HashAlgo = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512';

const algos: { value: HashAlgo; label: string }[] = [
  { value: 'MD5', label: 'MD5' },
  { value: 'SHA-1', label: 'SHA-1' },
  { value: 'SHA-256', label: 'SHA-256' },
  { value: 'SHA-512', label: 'SHA-512' },
];

function md5(input: string): string {
  const s = (x: number, y: number, z: number) => (x & y) | (~x & z);
  const t = (x: number, y: number, z: number) => (x & z) | (y & ~z);
  const u = (x: number, y: number, z: number) => x ^ y ^ z;
  const v = (x: number, y: number, z: number) => y ^ (x | ~z);
  const rot = (x: number, n: number) => (x << n) | (x >>> (32 - n));
  const K = [
    0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
    0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
    0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
    0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
    0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
    0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
    0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
    0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391,
  ];
  const S = [
    7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,
    5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,
    4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,
    6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21,
  ];
  const F: ((x: number, y: number, z: number) => number)[] = [s, t, u, v];
  let bits = new Uint8Array([...new TextEncoder().encode(input), 0x80]);
  const len = input.length * 8;
  while (bits.length % 64 !== 56) bits = new Uint8Array([...bits, 0]);
  const lenBuf = new ArrayBuffer(8);
  const lenView = new DataView(lenBuf);
  lenView.setUint32(0, len, true);
  lenView.setUint32(4, 0, true);
  const padded = new Uint8Array([...bits, ...new Uint8Array(lenBuf)]);
  let h0 = 0x67452301, h1 = 0xefcdab89, h2 = 0x98badcfe, h3 = 0x10325476;
  for (let i = 0; i < padded.length; i += 64) {
    const w = new Uint32Array(16);
    const dv = new DataView(padded.buffer, padded.byteOffset + i, 64);
    for (let j = 0; j < 16; j++) w[j] = dv.getUint32(j * 4, true);
    let a = h0, b = h1, c = h2, d = h3;
    for (let j = 0; j < 64; j++) {
      const g = Math.floor(j / 16);
      const f = F[g](b, c, d);
      const k = K[j % 16 + g * 16];
      const si = S[j];
      const idx = j < 16 ? j : j < 32 ? (5 * j + 1) % 16 : j < 48 ? (3 * j + 5) % 16 : (7 * j) % 16;
      const temp = rot(a + f + w[idx] + k, si);
      a = d; d = c; c = b; b = (b + temp) | 0;
    }
    h0 = (h0 + a) | 0; h1 = (h1 + b) | 0; h2 = (h2 + c) | 0; h3 = (h3 + d) | 0;
  }
  const hex = (n: number) => (n >>> 0).toString(16).padStart(8, '');
  return hex(h0) + hex(h1) + hex(h2) + hex(h3);
}

async function computeHash(text: string, algo: HashAlgo): Promise<string> {
  if (algo === 'MD5') return md5(text);
  const encoder = new TextEncoder();
  const hash = await crypto.subtle.digest(algo, encoder.encode(text));
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [algo, setAlgo] = useState<HashAlgo>('SHA-256');
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(false);

  async function generate() {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const h = await computeHash(input, algo);
      setHash(h);
    } catch { setHash('Error computing hash'); }
    setLoading(false);
  }

  return (
    <div className="tool-section">
      <div>
        <label className="label-premium">Text to Hash</label>
        <textarea className="input-premium min-h-[100px] resize-y font-mono text-sm" value={input} onChange={e => { setInput(e.target.value); setHash(''); }} placeholder="Enter text..." />
      </div>

      <div className="flex flex-wrap gap-2">
        {algos.map(a => (
          <button key={a.value} onClick={() => setAlgo(a.value)} className={`btn-${algo === a.value ? 'premium' : 'outline'}`}>{a.label}</button>
        ))}
      </div>

      <button onClick={generate} disabled={loading || !input.trim()} className="btn-premium w-full">
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Computing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Generate Hash
          </span>
        )}
      </button>

      {hash && (
        <div className="animate-fade-in-up space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{algo} Hash</span>
            <CopyButton text={hash} />
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 font-mono text-xs break-all text-gray-900 dark:text-white select-all">{hash}</div>
        </div>
      )}

      {!input && !hash && (
        <p className="text-center text-sm text-gray-400 dark:text-gray-500">Enter text and select an algorithm to hash</p>
      )}
    </div>
  );
}
