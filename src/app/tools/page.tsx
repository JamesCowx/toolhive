import type { Metadata } from 'next';
import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import tools, { categoryLabels, categoryDescriptions, getToolsByCategory } from '@/data/tools';

export const metadata: Metadata = {
  title: 'All Tools',
  description: 'Browse all free online utility tools: calculators, generators, converters, text tools, encoders, and more.',
};

export default function AllToolsPage() {
  const grouped = getToolsByCategory();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">All Tools</h1>
        <p className="mt-2 text-gray-600">{tools.length} free online tools at your fingertips.</p>
      </div>

      <div className="space-y-12">
        {Object.entries(grouped).map(([cat, catTools]) =>
          catTools.length > 0 && (
            <section key={cat} id={cat}>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">{categoryLabels[cat as keyof typeof categoryLabels]}</h2>
                <p className="text-sm text-gray-500">{categoryDescriptions[cat as keyof typeof categoryDescriptions]}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {catTools.map(tool => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </section>
          )
        )}
      </div>
    </div>
  );
}
