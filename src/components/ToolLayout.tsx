import type { ReactNode } from 'react';
import type { ToolDefinition } from '@/data/tools';
import Link from 'next/link';
import tools from '@/data/tools';

export default function ToolLayout({ tool, children }: { tool: ToolDefinition; children: ReactNode }) {
  const relatedTools = tools.filter(t => t.category === tool.category && t.slug !== tool.slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 animate-fade-in-down">
        <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Home</Link>
        <svg className="h-3.5 w-3.5 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <Link href="/tools" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Tools</Link>
        <svg className="h-3.5 w-3.5 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="text-gray-900 dark:text-white font-medium">{tool.name}</span>
      </nav>

      <div className="mb-8 animate-fade-in-up">
        <div className="flex items-center gap-4 mb-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-800/30 dark:to-primary-700/30 text-2xl shadow-sm animate-float" style={{ animationDuration: '4s' }}>
            {tool.icon}
          </span>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{tool.name}</h1>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-base leading-relaxed">{tool.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-3 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="card-premium">
            {children}
          </div>
        </div>

        <aside className="space-y-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="card-premium">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="h-4 w-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Related Tools
            </h2>
            <div className="space-y-1">
              {relatedTools.length > 0 ? relatedTools.map(rt => (
                <Link
                  key={rt.slug}
                  href={`/tools/${rt.slug}`}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 group"
                >
                  <span className="text-lg shrink-0 transition-transform duration-200 group-hover:scale-110">{rt.icon}</span>
                  <span className="font-medium">{rt.name}</span>
                </Link>
              )) : (
                <p className="text-sm text-gray-400 dark:text-gray-500 px-3 py-2">No related tools</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
