import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import tools, { categoryLabels, getToolsByCategory } from '@/data/tools';

const featured = tools.slice(0, 8);

export default function HomePage() {
  const grouped = getToolsByCategory();

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Free Online Utility Tools
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Fast, free tools for everyday tasks. Calculators, generators, converters, text tools and more — no sign-up required.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/tools" className="btn-primary text-base px-8 py-3">
              Browse All Tools
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Popular Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map(tool => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/tools" className="text-primary-600 font-semibold hover:text-primary-700">
            View all {tools.length} tools &rarr;
          </Link>
        </div>
      </section>

      {Object.entries(grouped).map(([cat, catTools]) =>
        catTools.length > 0 && (
          <section key={cat} className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {categoryLabels[cat as keyof typeof categoryLabels]}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {catTools.slice(0, 4).map(tool => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
            {catTools.length > 4 && (
              <div className="mt-4 text-center">
                <Link href={`/tools#${cat}`} className="text-sm text-primary-600 font-medium hover:text-primary-700">
                  View all {catTools.length} tools &rarr;
                </Link>
              </div>
            )}
          </section>
        )
      )}
    </div>
  );
}
