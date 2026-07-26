import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import tools, { categoryLabels, getToolsByCategory } from '@/data/tools';

const featured = tools.slice(0, 8);

export default function HomePage() {
  const grouped = getToolsByCategory();

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-gray-100 dark:border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-200/30 to-accent-200/30 dark:from-primary-500/5 dark:to-accent-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-hero-glow" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-accent-200/20 to-primary-200/20 dark:from-accent-500/5 dark:to-primary-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 animate-float-slow" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/30 px-4 py-1.5 text-xs font-semibold text-primary-700 dark:text-primary-300 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500 animate-pulse" />
              20 Free Tools Available
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Free Online{' '}
            <span className="gradient-text">Utility Tools</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Fast, private, free tools for everyday tasks. Calculators, generators, converters, text tools and more — no sign-up, no fuss.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <Link href="/tools" className="btn-premium text-base px-8 py-3.5 shadow-xl shadow-primary-500/20">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Browse All Tools
            </Link>
            <Link href="#popular" className="btn-outline text-base px-8 py-3.5">
              Popular Tools
            </Link>
          </div>
        </div>
      </section>

      {/* ── Popular Tools ── */}
      <section id="popular" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="section-heading text-gray-900 dark:text-white">Popular Tools</h2>
          <p className="section-subtitle">Most used tools by our visitors</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((tool, i) => (
            <ToolCard key={tool.slug} tool={tool} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center animate-fade-in-up">
          <Link href="/tools" className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors group">
            <span>View all {tools.length} tools</span>
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── Category Sections ── */}
      {Object.entries(grouped).map(([cat, catTools], catIndex) =>
        catTools.length > 0 && (
          <section key={cat} className={`mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 ${catIndex % 2 === 0 ? '' : 'bg-gray-50/50 dark:bg-gray-900/30 rounded-3xl'}`}>
            <div className="mb-8 animate-fade-in-up" style={{ animationDelay: `${catIndex * 100}ms` }}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {categoryLabels[cat as keyof typeof categoryLabels]}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{catTools.length} tools</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {catTools.slice(0, 4).map((tool, i) => (
                <ToolCard key={tool.slug} tool={tool} index={i} />
              ))}
            </div>
            {catTools.length > 4 && (
              <div className="mt-6 text-center animate-fade-in-up">
                <Link href={`/tools#${cat}`} className="text-sm text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors inline-flex items-center gap-1">
                  View all {catTools.length} tools <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            )}
          </section>
        )
      )}

      {/* ── CTA ── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 px-8 py-16 text-center shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 animate-fade-in-up">
              Ready to Get Started?
            </h2>
            <p className="text-primary-100 max-w-lg mx-auto text-lg leading-relaxed mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              All tools are free, fast, and private. No sign-up required.
            </p>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-primary-700 shadow-xl hover:bg-primary-50 transition-all duration-200 hover:-translate-y-0.5 animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Explore All Tools
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
