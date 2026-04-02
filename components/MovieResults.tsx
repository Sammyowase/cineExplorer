import {
  getPopularMovies,
  searchMovies,
  getMoviesByGenre,
  getGenres,
} from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import MovieGrid from "@/components/MovieGrid";
import EmptyState from "@/components/EmptyState";
import Pagination from "@/components/Pagination";

interface MovieResultsProps {
  query: string;
  genreId: string;
  page: number;
}

export default async function MovieResults({
  query,
  genreId,
  page,
}: MovieResultsProps) {
 
  const [moviesData, genresData] = await Promise.all([
    query
      ? searchMovies(query, page)
      : genreId
        ? getMoviesByGenre(Number(genreId), page)
        : getPopularMovies(page),
    getGenres(),
  ]);

  const genreMap = new Map(
    genresData.genre.map((g) => [g.id, g.name])
  );

  const hasResults = moviesData.results.length > 0;

  if (!hasResults) {
    return <EmptyState />;
  }

  return (
    <>
      <p className="mb-6 text-sm text-text-secondary">
        {query && (
          <>
            Results for &ldquo;<span className="font-medium text-text-primary">{query}</span>&rdquo;
            {" · "}
          </>
        )}
        {moviesData.total_results.toLocaleString()} movies found
      </p>

      <MovieGrid>
        {moviesData.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} genreMap={genreMap} />
        ))}
      </MovieGrid>

      <div className="mt-10">
        <Pagination
          currentPage={page}
          totalPages={moviesData.total_pages}
        />
      </div>
    </>
  );
}
