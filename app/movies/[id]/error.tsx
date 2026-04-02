"use client";

import { FiAlertTriangle, FiRefreshCw, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-error/10">
        <FiAlertTriangle className="h-7 w-7 text-error" />
      </div>
      <h2 className="mb-2 text-xl font-semibold text-text-primary">
        Movie not found
      </h2>
      <p className="mb-6 max-w-md text-sm text-text-secondary">
        {error.message || "We couldn't find this movie. It may have been removed or the link is incorrect."}
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-brand hover:text-brand"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
        >
          <FiRefreshCw className="h-4 w-4" />
          Try again
        </button>
      </div>
    </div>
  );
}
