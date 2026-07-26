'use client';

import { useState, useCallback } from 'react';
import { copyToClipboard } from '@/lib/utils';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  onCopy?: () => void;
}

export default function CopyButton({ text, label = 'Copy', className = '', onCopy }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!text) return;
    await copyToClipboard(text);
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  }, [text, onCopy]);

  return (
    <button
      onClick={handleCopy}
      className={`group relative inline-flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
        copied
          ? 'border-green-400 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
          : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50/50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-primary-600 dark:hover:text-primary-400'
      } ${className}`}
    >
      {copied ? (
        <>
          <svg className="h-4 w-4 animate-scale-in" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" style={{ animation: 'checkmark 0.3s ease-out both' }} />
          </svg>
          <span className="animate-fade-in">Copied!</span>
        </>
      ) : (
        <>
          <svg className="h-4 w-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
