import { MovieGridSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div>
      
      <section className="border-b border-border bg-gradient-to-b from-brand-light/50 to-background">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="skeleton mb-2 h-9 w-64" />
          <div className="skeleton mb-8 h-5 w-96" />
          <div className="skeleton mb-4 h-11 w-full max-w-md rounded-xl" />
          <div className="flex gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton h-9 w-20 shrink-0 rounded-full" />
            ))}
          </div>
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="skeleton mb-6 h-4 w-40" />
        <MovieGridSkeleton count={20} />
      </section>
    </div>
  );
}
