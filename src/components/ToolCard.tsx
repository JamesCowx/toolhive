import Link from 'next/link';
import type { ToolDefinition } from '@/data/tools';

export default function ToolCard({ tool, index = 0 }: { tool: ToolDefinition; index?: number }) {
  const delay = Math.min(100 + index * 50, 700);

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group card-premium animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 text-xl shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-110 group-hover:from-primary-100 group-hover:to-primary-200 dark:group-hover:from-primary-800/40 dark:group-hover:to-primary-700/40">
          {tool.icon}
        </span>
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
            {tool.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {tool.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
