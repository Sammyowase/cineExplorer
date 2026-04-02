import { FiSearch } from "react-icons/fi";

interface EmptyStateProps {
  title?: string;
  message?: string;
  onClear?: () => void;
}

const EmptyState =({
  title = "No movies found",
  message = "Try adjusting your search or filters to find what you're looking for.",
  onClear,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-light">
        <FiSearch className="h-7 w-7 text-brand" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-text-primary">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-text-secondary">{message}</p>
      {onClear && (
        <button
          onClick={onClear}
          className="rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
export default EmptyState;