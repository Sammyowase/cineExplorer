interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`skeleton ${className}`} />;
}

export function MovieCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-white">
  
      <div className="skeleton aspect-2/3 w-full" />

      
      <div className="flex flex-col gap-2 p-3.5">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-1/2" />
        <div className="mt-1 flex flex-col gap-1.5">
          <div className="skeleton h-3 w-full" />
          <div className="skeleton h-3 w-2/3" />
        </div>
      </div>
    </div>
  );
}

export function MovieGridSkeleton({ count = 20 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DetailPageSkeleton() {
  return (
    <div className="page-enter">
     
      <div className="skeleton h-64 w-full sm:h-80 lg:h-96" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
       
        <div className="skeleton mb-6 h-4 w-48" />

        <div className="flex flex-col gap-8 md:flex-row">
        
          <div className="skeleton mx-auto h-450px w-300px shrink-0 rounded-xl md:mx-0" />

        
          <div className="flex flex-1 flex-col gap-4">
            <div className="skeleton h-8 w-3/4" />
            <div className="skeleton h-4 w-1/2" />
            <div className="flex gap-2">
              <div className="skeleton h-8 w-20 rounded-full" />
              <div className="skeleton h-8 w-20 rounded-full" />
              <div className="skeleton h-8 w-20 rounded-full" />
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
