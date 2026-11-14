import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 – Page Not Found | Call Center Solutions Africa",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-ccsa-dark-blue flex items-center justify-center px-4">
      <div className="text-center text-white max-w-md">
        <p className="text-7xl font-bold text-ccsa-blue mb-4">404</p>
        <h1 className="text-2xl font-bold mb-3">Page Not Found</h1>
        <p className="text-white/60 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3 bg-ccsa-blue text-white font-semibold rounded-xl hover:bg-ccsa-blue/90 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
