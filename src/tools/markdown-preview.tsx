'use client';

import { useState, useMemo } from 'react';
import CopyButton from '@/components/CopyButton';

function renderMarkdown(md: string): string {
  let html = md
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2 text-gray-900 dark:text-white">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mt-5 mb-2 text-gray-900 dark:text-white">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-5 mb-3 text-gray-900 dark:text-white">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 rounded-md px-1.5 py-0.5 text-sm font-mono text-pink-600 dark:text-pink-400">$1</code>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-primary-400 dark:border-primary-600 pl-4 italic text-gray-600 dark:text-gray-400 my-2">$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li class="ml-5 list-disc text-gray-700 dark:text-gray-300">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-5 list-decimal text-gray-700 dark:text-gray-300">$1. $2</li>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary-600 dark:text-primary-400 underline hover:text-primary-800 dark:hover:text-primary-300 transition-colors" target="_blank" rel="noopener">$1</a>')
    .replace(/\n\n/g, '</p><p class="mb-3 text-gray-700 dark:text-gray-300">')
    .replace(/\n/g, '<br/>');
  html = '<p class="mb-3 text-gray-700 dark:text-gray-300">' + html + '</p>';
  return html;
}

export default function MarkdownPreview() {
  const defaultMd = `# Hello Markdown

This is **bold** and *italic* text.

## Features
- Headers (H1, H2, H3)
- **Bold** and *Italic*
- \`Inline code\`
- [Links](https://example.com)
- Lists
- Blockquotes

> This is a blockquote

1. First item
2. Second item
`;
  const [input, setInput] = useState(defaultMd);
  const html = useMemo(() => renderMarkdown(input), [input]);

  return (
    <div className="tool-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="label-premium mb-0">Markdown</label>
            <CopyButton text={input} />
          </div>
          <textarea className="input-premium min-h-[350px] resize-y font-mono text-sm" value={input} onChange={e => setInput(e.target.value)} />
        </div>
        <div>
          <label className="label-premium">Preview</label>
          <div className="input-premium min-h-[350px] overflow-auto prose prose-sm max-w-none bg-white dark:bg-gray-800/50" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </div>
  );
}
