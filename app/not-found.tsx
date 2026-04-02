import Link from "next/link";
import { FiHome, FiFilm } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-brand-light">
        <FiFilm className="h-9 w-9 text-brand" />
      </div>
      <h2 className="mb-2 text-2xl font-bold text-text-primary">
        Page not found
      </h2>
      <p className="mb-8 max-w-sm text-sm text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
      >
        <FiHome className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}
