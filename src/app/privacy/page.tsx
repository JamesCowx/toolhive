import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'ToolHive privacy policy - how we handle your data.',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 animate-fade-in">
      <Link href="/" className="text-sm text-primary-600 dark:text-primary-400 hover:underline mb-6 inline-block">&larr; Back to Home</Link>
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose dark:prose-invert max-w-none space-y-4" style={{ color: 'var(--text-secondary)' }}>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <h2 className="text-xl font-semibold mt-8">1. Data Collection</h2>
        <p>ToolHive does not collect, store, or transmit any personal data. All tools run entirely in your browser. No input you enter is ever sent to a server.</p>
        <h2 className="text-xl font-semibold mt-8">2. Local Storage</h2>
        <p>We use localStorage solely to remember your theme preference (light/dark mode). This data never leaves your device.</p>
        <h2 className="text-xl font-semibold mt-8">3. Analytics</h2>
        <p>We may use basic anonymous analytics to understand which tools are popular. No personal information is collected.</p>
        <h2 className="text-xl font-semibold mt-8">4. Third Parties</h2>
        <p>We do not share, sell, or transfer any data to third parties.</p>
        <h2 className="text-xl font-semibold mt-8">5. Contact</h2>
        <p>If you have questions about this policy, please reach out via GitHub.</p>
      </div>
    </div>
  );
}
