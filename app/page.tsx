import { Suspense } from "react";
import { getGenres } from "@/lib/tmdb";
import SearchBar from "@/components/SearchBar";
import GenreFilter from "@/components/GenreFilter";
import MovieResults from "@/components/MovieResults";
import { MovieGridSkeleton } from "@/components/Skeleton";
import type { MovieSearchParams } from "@/types/tmdb";

interface HomePageProps {
  searchParams: Promise<MovieSearchParams>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const query = params.query ?? "";
  const genreId = params.genre ?? "";

 
  const genresData = await getGenres();

  return (
    <div className="page-enter">
     
      <section className="border-b border-border bg-gradient-to-b from-brand-light/50 to-background">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Discover Movies
          </h1>
          <p className="mb-8 max-w-2xl text-sm text-text-secondary sm:text-base">
            Explore trending films, search by title, and filter by genre.
          </p>

          
          <div className="flex flex-col gap-4">
            <Suspense fallback={<div className="skeleton h-11 w-full max-w-md rounded-xl" />}>
              <SearchBar />
            </Suspense>
            <Suspense fallback={<div className="flex gap-2 overflow-x-auto pb-1"><div className="skeleton h-9 w-16 rounded-full" /></div>}>
              <GenreFilter genres={genresData.genre} />
            </Suspense>
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Suspense
          key={`${query}-${genreId}-${page}`}
          fallback={
            <div>
              <div className="skeleton mb-6 h-4 w-40" />
              <MovieGridSkeleton count={20} />
            </div>
          }
        >
          <MovieResults query={query} genreId={genreId} page={page} />
        </Suspense>
      </section>
    </div>
  );
}
