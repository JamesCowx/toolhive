import Link from 'next/link';
import type { ToolDefinition } from '@/data/tools';

export default function ToolCard({ tool }: { tool: ToolDefinition }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group card hover:border-primary-300 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-xl">
          {tool.icon}
        </span>
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {tool.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {tool.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
