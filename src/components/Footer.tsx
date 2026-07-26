import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-900 dark:text-white">
              <Logo />
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
              Free online utility tools for everyday tasks. Fast, private, and always free.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">Tools</h3>
            <div className="grid grid-cols-2 gap-2">
              <FooterLink href="/tools/password-generator">Password Generator</FooterLink>
              <FooterLink href="/tools/qr-code-generator">QR Code Generator</FooterLink>
              <FooterLink href="/tools/bmi-calculator">BMI Calculator</FooterLink>
              <FooterLink href="/tools/unit-converter">Unit Converter</FooterLink>
              <FooterLink href="/tools/word-counter">Word Counter</FooterLink>
              <FooterLink href="/tools/hash-generator">Hash Generator</FooterLink>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">Links</h3>
            <div className="flex flex-col gap-2">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/tools">All Tools</FooterLink>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} ToolHive. Free online utility tools.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
    >
      {children}
    </Link>
  );
}
