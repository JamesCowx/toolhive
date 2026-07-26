import Link from 'next/link';
import Logo from './Logo';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg-muted)' }}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2" style={{ color: 'var(--text)' }}>
              <Logo />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-muted)' }}>
              Free online utility tools for everyday tasks. Fast, private, and always free.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-dim)' }}>Popular Tools</h3>
            <div className="grid grid-cols-2 gap-2">
              <FooterLink href="/tools/password-generator">Password Generator</FooterLink>
              <FooterLink href="/tools/qr-code-generator">QR Code Generator</FooterLink>
              <FooterLink href="/tools/bmi-calculator">BMI Calculator</FooterLink>
              <FooterLink href="/tools/unit-converter">Unit Converter</FooterLink>
              <FooterLink href="/tools/word-counter">Word Counter</FooterLink>
              <FooterLink href="/tools/hash-generator">Hash Generator</FooterLink>
              <FooterLink href="/tools/percentage-calculator">Percentage Calc</FooterLink>
              <FooterLink href="/tools/emoji-picker">Emoji Picker</FooterLink>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-dim)' }}>Links</h3>
            <div className="flex flex-col gap-2">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/tools">All Tools</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-dim)' }}>Categories</h3>
            <div className="flex flex-col gap-2">
              <FooterLink href="/tools#calculators">Calculators</FooterLink>
              <FooterLink href="/tools#generators">Generators</FooterLink>
              <FooterLink href="/tools#converters">Converters</FooterLink>
              <FooterLink href="/tools#text-tools">Text Tools</FooterLink>
              <FooterLink href="/tools#encoders">Encoders</FooterLink>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col items-center justify-between gap-4 sm:flex-row" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--text-dim)' }}>
            &copy; {currentYear} ToolHive. Free online utility tools.
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
      className="text-sm transition-colors duration-200"
      style={{ color: 'var(--text-muted)' }}
    >
      {children}
    </Link>
  );
}
