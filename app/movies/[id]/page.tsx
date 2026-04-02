import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getMovieDetails, getPopularMovies } from "@/lib/tmdb";
import {
  getImageUrl,
  formatYear,
  formatRuntime,
  formatCurrency,
} from "@/lib/utils";
import Breadcrumb from "@/components/Breadcrumb";
import RatingBadge from "@/components/RatingBadge";
import MovieTrailer from "@/components/MovieTrailer";

interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const { results } = await getPopularMovies();
  return results.map((movie) => ({
    id: movie.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: MovieDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const movie = await getMovieDetails(Number(id));
    const posterUrl = getImageUrl(movie.poster_path, "w500");

    return {
      title: movie.title,
      description: movie.overview || `Details for ${movie.title}`,
      openGraph: {
        title: movie.title,
        description: movie.overview || `Details for ${movie.title}`,
        images: posterUrl ? [{ url: posterUrl }] : [],
      },
    };
  } catch {
    return {
      title: "Movie Not Found",
    };
  }
}

export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
  const { id } = await params;
  let movie;

  try {
    movie = await getMovieDetails(Number(id));
  } catch {
    notFound();
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, "w1280");
  const posterUrl = getImageUrl(movie.poster_path, "w500");
  const year = formatYear(movie.release_date);
  const runtime = formatRuntime(movie.runtime);
  const director = movie.credits?.crew.find((c) => c.job === "Director");
  const cast = movie.credits?.cast.slice(0, 10) ?? [];

  return (
    <div className="page-enter">
      
      <div className="relative h-64 w-full overflow-hidden sm:h-80 lg:h-96">
        {backdropUrl ? (
          <>
            <Image
              src={backdropUrl}
              alt={`${movie.title} backdrop`}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </>
        ) : (
          <div className="h-full w-full bg-gradient-to-b from-brand-light to-background" />
        )}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="pt-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Movies", href: "/" },
              { label: movie.title },
            ]}
          />
        </div>

        
        <div className="flex flex-col gap-8 pb-16 md:flex-row">
          <div className="-mt-32 shrink-0 self-center md:-mt-40 md:self-start">
            <div className="relative h-[360px] w-[240px] overflow-hidden rounded-xl shadow-2xl shadow-black/20 sm:h-[450px] sm:w-[300px]">
              {posterUrl ? (
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="300px"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-surface text-text-secondary">
                  <span className="text-sm">No Poster</span>
                </div>
              )}
            </div>
          </div>

         
          <div className="flex flex-1 flex-col gap-4 md:-mt-16">
           
            <div>
              <h1 className="text-2xl font-bold text-text-primary sm:text-3xl lg:text-4xl">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="mt-1 text-sm italic text-text-secondary">
                  &ldquo;{movie.tagline}&rdquo;
                </p>
              )}
            </div>

         
            <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary">
              <RatingBadge rating={movie.vote_average} size="md" />
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>{year}</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>{runtime}</span>
              {director && (
                <>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span>
                    Dir. <span className="text-text-primary">{director.name}</span>
                  </span>
                </>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-brand-light px-3 py-1 text-xs font-medium text-brand"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Trailer (Bonus) */}
            {movie.videos?.results && movie.videos.results.length > 0 && (
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <MovieTrailer
                  videos={movie.videos.results}
                  movieTitle={movie.title}
                />
              </div>
            )}

            {/* Overview */}
            <div className="mt-6">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-text-secondary">
                Overview
              </h2>
              <p className="leading-relaxed text-text-primary">
                {movie.overview || "No overview available for this movie."}
              </p>
            </div>

            {/* Additional details */}
            <div className="mt-4 grid grid-cols-2 gap-4 rounded-xl bg-surface p-4 sm:grid-cols-4">
              <div>
                <p className="text-xs font-medium text-text-secondary">
                  Status
                </p>
                <p className="mt-0.5 text-sm font-semibold text-text-primary">
                  {movie.status}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-text-secondary">
                  Language
                </p>
                <p className="mt-0.5 text-sm font-semibold text-text-primary uppercase">
                  {movie.original_language}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-text-secondary">
                  Budget
                </p>
                <p className="mt-0.5 text-sm font-semibold text-text-primary">
                  {formatCurrency(movie.budget)}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-text-secondary">
                  Revenue
                </p>
                <p className="mt-0.5 text-sm font-semibold text-text-primary">
                  {formatCurrency(movie.revenue)}
                </p>
              </div>
            </div>

            {/* Cast */}
            {cast.length > 0 && (
              <div className="mt-6">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
                  Top Cast
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {cast.map((member) => {
                    const profileUrl = getImageUrl(member.profile_path, "w200");
                    return (
                      <div
                        key={member.id}
                        className="flex items-center gap-3 rounded-lg bg-surface p-2.5"
                      >
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-border">
                          {profileUrl ? (
                            <Image
                              src={profileUrl}
                              alt={member.name}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs font-medium text-text-secondary">
                              {member.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-text-primary">
                            {member.name}
                          </p>
                          <p className="truncate text-xs text-text-secondary">
                            {member.character}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
