import type { Metadata } from 'next';
import ToolCard from '@/components/ToolCard';
import tools, { categoryLabels, categoryDescriptions, getToolsByCategory } from '@/data/tools';

export const metadata: Metadata = {
  title: 'All Tools',
  description: 'Browse all free online utility tools: calculators, generators, converters, text tools, encoders, and more.',
};

export default function AllToolsPage() {
  const grouped = getToolsByCategory();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="mb-12 animate-fade-in-up">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          All Tools
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400 text-lg">
          {tools.length} free online tools at your fingertips.
        </p>
      </div>

      <div className="space-y-16">
        {Object.entries(grouped).map(([cat, catTools], catIndex) =>
          catTools.length > 0 && (
            <section key={cat} id={cat} className="animate-fade-in-up" style={{ animationDelay: `${catIndex * 100}ms` }}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {categoryLabels[cat as keyof typeof categoryLabels]}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {categoryDescriptions[cat as keyof typeof categoryDescriptions]}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {catTools.map((tool, i) => (
                  <ToolCard key={tool.slug} tool={tool} index={i} />
                ))}
              </div>
            </section>
          )
        )}
      </div>
    </div>
  );
}
