import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} ToolHive. Free online utility tools.
          </p>
          <nav className="flex gap-6">
            <Link href="/tools" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
              All Tools
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
