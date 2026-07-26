'use client';

import { useState, useMemo } from 'react';

function renderMarkdown(md: string): string {
  let html = md
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mt-5 mb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-5 mb-3">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="bg-gray-100 rounded px-1 text-sm font-mono text-pink-600">$1</code>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-2">$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal">$1. $2</li>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary-600 underline hover:text-primary-800" target="_blank" rel="noopener">$1</a>')
    .replace(/\n\n/g, '</p><p class="mb-3">')
    .replace(/\n/g, '<br/>');

  html = '<p class="mb-3">' + html + '</p>';
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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-text">Markdown</label>
          <textarea className="input-field min-h-[300px] resize-y font-mono text-sm" value={input} onChange={e => setInput(e.target.value)} />
        </div>
        <div>
          <label className="label-text">Preview</label>
          <div className="input-field min-h-[300px] overflow-auto prose prose-sm prose-headings:text-gray-900" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </div>
  );
}
