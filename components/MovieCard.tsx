import Link from "next/link";
import Image from "next/image";
import { getImageUrl, formatYear } from "@/lib/utils";
import RatingBadge from "./RatingBadge";
import type { Movie } from "@/types/tmdb";

interface MovieCardProps {
  movie: Movie;
  genreMap?: Map<number, string>;
  priority?: boolean;
}

export default function MovieCard({ movie, genreMap, priority = false }: MovieCardProps) {
  const posterUrl = getImageUrl(movie.poster_path, "w500");
  const year = formatYear(movie.release_date);
  const genres = movie.genre_ids
    .slice(0, 2)
    .map((id) => genreMap?.get(id) ?? "")
    .filter(Boolean);

  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/10"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-text-secondary">
            <svg
              className="h-16 w-16 opacity-30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>
        )}

        
        <div className="absolute top-2 right-2">
          <RatingBadge rating={movie.vote_average} size="sm" />
        </div>
      </div>

     
      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <h3 className="line-clamp-1 text-sm font-semibold text-text-primary transition-colors group-hover:text-brand">
          {movie.title}
        </h3>

        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <span>{year}</span>
          {genres.length > 0 && (
            <>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span className="line-clamp-1">{genres.join(", ")}</span>
            </>
          )}
        </div>

        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-text-secondary">
          {movie.overview || "No description available."}
        </p>
      </div>
    </Link>
  );
}
