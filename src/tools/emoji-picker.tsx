'use client';

import { useState, useMemo } from 'react';
import { copyToClipboard } from '@/lib/utils';

interface EmojiEntry {
  emoji: string;
  name: string;
  category: string;
}

const EMOJIS: EmojiEntry[] = [
  { emoji: '😀', name: 'Grinning Face', category: 'Smileys' },
  { emoji: '😂', name: 'Face with Tears of Joy', category: 'Smileys' },
  { emoji: '😊', name: 'Smiling Face with Smiling Eyes', category: 'Smileys' },
  { emoji: '🥰', name: 'Smiling Face with Hearts', category: 'Smileys' },
  { emoji: '😍', name: 'Smiling Face with Heart-Eyes', category: 'Smileys' },
  { emoji: '🤔', name: 'Thinking Face', category: 'Smileys' },
  { emoji: '😎', name: 'Smiling Face with Sunglasses', category: 'Smileys' },
  { emoji: '🙄', name: 'Face with Rolling Eyes', category: 'Smileys' },
  { emoji: '😏', name: 'Smirking Face', category: 'Smileys' },
  { emoji: '😭', name: 'Loudly Crying Face', category: 'Smileys' },
  { emoji: '😤', name: 'Face with Steam From Nose', category: 'Smileys' },
  { emoji: '😱', name: 'Face Screaming in Fear', category: 'Smileys' },
  { emoji: '🤗', name: 'Hugging Face', category: 'Smileys' },
  { emoji: '🤩', name: 'Star-Struck', category: 'Smileys' },
  { emoji: '🥳', name: 'Partying Face', category: 'Smileys' },
  { emoji: '😴', name: 'Sleeping Face', category: 'Smileys' },
  { emoji: '👍', name: 'Thumbs Up', category: 'Gestures' },
  { emoji: '👎', name: 'Thumbs Down', category: 'Gestures' },
  { emoji: '👏', name: 'Clapping Hands', category: 'Gestures' },
  { emoji: '🙌', name: 'Raising Hands', category: 'Gestures' },
  { emoji: '🤝', name: 'Handshake', category: 'Gestures' },
  { emoji: '💪', name: 'Flexed Biceps', category: 'Gestures' },
  { emoji: '✌️', name: 'Victory Hand', category: 'Gestures' },
  { emoji: '🔥', name: 'Fire', category: 'Symbols' },
  { emoji: '❤️', name: 'Red Heart', category: 'Symbols' },
  { emoji: '💯', name: 'Hundred Points', category: 'Symbols' },
  { emoji: '⭐', name: 'Star', category: 'Symbols' },
  { emoji: '✅', name: 'Check Mark', category: 'Symbols' },
  { emoji: '❌', name: 'Cross Mark', category: 'Symbols' },
  { emoji: '💡', name: 'Light Bulb', category: 'Symbols' },
  { emoji: '🎉', name: 'Party Popper', category: 'Events' },
  { emoji: '🎂', name: 'Birthday Cake', category: 'Events' },
  { emoji: '🎁', name: 'Wrapped Gift', category: 'Events' },
  { emoji: '🏆', name: 'Trophy', category: 'Events' },
  { emoji: '🚀', name: 'Rocket', category: 'Travel' },
  { emoji: '🌍', name: 'Globe Showing Europe-Africa', category: 'Travel' },
  { emoji: '☀️', name: 'Sun', category: 'Nature' },
  { emoji: '🌈', name: 'Rainbow', category: 'Nature' },
  { emoji: '🌸', name: 'Cherry Blossom', category: 'Nature' },
  { emoji: '🍕', name: 'Pizza', category: 'Food' },
  { emoji: '☕', name: 'Hot Beverage', category: 'Food' },
  { emoji: '🎵', name: 'Musical Note', category: 'Music' },
  { emoji: '🎮', name: 'Video Game', category: 'Activities' },
  { emoji: '📱', name: 'Mobile Phone', category: 'Objects' },
  { emoji: '💻', name: 'Laptop', category: 'Objects' },
  { emoji: '🔒', name: 'Locked', category: 'Objects' },
  { emoji: '🗓️', name: 'Spiral Calendar', category: 'Objects' },
  { emoji: '⚡', name: 'High Voltage', category: 'Symbols' },
  { emoji: '🎯', name: 'Direct Hit', category: 'Activities' },
  { emoji: '🧠', name: 'Brain', category: 'People' },
];

const categories = [...new Set(EMOJIS.map(e => e.category))];

export default function EmojiPicker() {
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return EMOJIS;
    const q = search.toLowerCase();
    return EMOJIS.filter(e => e.name.toLowerCase().includes(q) || e.emoji.includes(q));
  }, [search]);

  const grouped = useMemo(() => {
    const map: Record<string, EmojiEntry[]> = {};
    for (const emoji of filtered) {
      if (!map[emoji.category]) map[emoji.category] = [];
      map[emoji.category].push(emoji);
    }
    return map;
  }, [filtered]);

  async function handleCopy(emoji: string) {
    await copyToClipboard(emoji);
    setCopied(emoji);
    setTimeout(() => setCopied(null), 1000);
  }

  return (
    <div className="tool-section">
      <div className="relative">
        <input
          className="input-premium pl-10"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search emojis..."
        />
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text-dim)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className="space-y-6 max-h-[400px] overflow-y-auto">
        {Object.entries(grouped).map(([cat, emojis]) => (
          <div key={cat}>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-dim)' }}>{cat} ({emojis.length})</h3>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1.5">
              {emojis.map(e => (
                <button
                  key={e.emoji}
                  onClick={() => handleCopy(e.emoji)}
                  className="relative flex items-center justify-center h-12 rounded-xl text-xl transition-all duration-200 hover:scale-125 hover:shadow-md"
                  style={{ background: 'var(--bg-muted)' }}
                  title={e.name}
                >
                  {e.emoji}
                  {copied === e.emoji && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-500 flex items-center justify-center animate-scale-in">
                      <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-sm" style={{ color: 'var(--text-dim)' }}>No emojis found</p>
      )}

      <p className="text-xs text-center" style={{ color: 'var(--text-dim)' }}>
        Click any emoji to copy &middot; {EMOJIS.length} emojis available
      </p>
    </div>
  );
}
