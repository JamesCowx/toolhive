import type { ReactNode } from 'react';
import type { ToolDefinition } from '@/data/tools';
import Link from 'next/link';
import tools from '@/data/tools';

export default function ToolLayout({ tool, children }: { tool: ToolDefinition; children: ReactNode }) {
  const relatedTools = tools.filter(t => t.category === tool.category && t.slug !== tool.slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-primary-600 transition-colors">Tools</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{tool.name}</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{tool.icon}</span>
          <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
        </div>
        <p className="text-gray-600 max-w-2xl">{tool.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <div className="card">
            {children}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Related Tools</h2>
            <div className="space-y-2">
              {relatedTools.length > 0 ? relatedTools.map(rt => (
                <Link
                  key={rt.slug}
                  href={`/tools/${rt.slug}`}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                >
                  <span>{rt.icon}</span>
                  <span>{rt.name}</span>
                </Link>
              )) : (
                <p className="text-sm text-gray-400 px-3">No related tools</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
