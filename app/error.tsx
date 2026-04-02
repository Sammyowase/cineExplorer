"use client";

import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

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
        Something went wrong
      </h2>
      <p className="mb-6 max-w-md text-sm text-text-secondary">
        {error.message || "We couldn't load the movies. This might be a temporary issue."}
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
      >
        <FiRefreshCw className="h-4 w-4" />
        Try again
      </button>
    </div>
  );
}
