import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'ToolHive terms of service.',
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      <Link href="/" className="text-sm text-primary-600 dark:text-primary-400 hover:underline mb-6 inline-block">&larr; Back to Home</Link>
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <div className="space-y-4" style={{ color: 'var(--text-secondary)' }}>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2 className="text-xl font-semibold mt-8">1. Acceptance of Terms</h2>
        <p>By using ToolHive, you agree to these terms. If you do not agree, do not use the service.</p>
        <h2 className="text-xl font-semibold mt-8">2. Use of Service</h2>
        <p>ToolHive provides free online utility tools for personal and commercial use. All tools are provided "as is" without warranty of any kind.</p>
        <h2 className="text-xl font-semibold mt-8">3. Limitation of Liability</h2>
        <p>ToolHive and its creators are not liable for any damages arising from the use of these tools. Users should verify critical results independently.</p>
        <h2 className="text-xl font-semibold mt-8">4. Changes</h2>
        <p>We reserve the right to update these terms at any time. Continued use constitutes acceptance of changes.</p>
      </div>
    </div>
  );
}
