'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-nav shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0 transition-colors" style={{ color: 'var(--text)' }}>
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/tools">All Tools</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative h-10 w-10 rounded-xl border-2 flex items-center justify-center transition-all duration-200"
            style={{ borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--text-secondary)' }}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col items-center gap-1">
              <span className={`block h-0.5 w-5 rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} style={{ background: 'currentColor' }} />
              <span className={`block h-0.5 w-5 rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} style={{ background: 'currentColor' }} />
              <span className={`block h-0.5 w-5 rounded-full transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} style={{ background: 'currentColor' }} />
            </div>
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          mobileOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="border-t px-4 py-4 space-y-1" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
          <Link
            href="/"
            className="block rounded-xl px-4 py-3 text-sm font-medium transition-all"
            style={{ color: 'var(--text-muted)' }}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/tools"
            className="block rounded-xl px-4 py-3 text-sm font-medium transition-all"
            style={{ color: 'var(--text-muted)' }}
            onClick={() => setMobileOpen(false)}
          >
            All Tools
          </Link>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 group"
      style={{ color: 'var(--text-muted)' }}
    >
      {children}
      <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-300 group-hover:w-4/5 -translate-x-1/2" />
    </Link>
  );
}
