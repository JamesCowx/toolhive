import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <span className="text-6xl mb-4">🔧</span>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
      <p className="text-gray-600 mb-6">The tool or page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="btn-primary">Go Home</Link>
    </div>
  );
}
