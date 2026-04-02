"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Genre } from "@/types/tmdb";

interface GenreFilterProps {
  genres: Genre[];
}

export default function GenreFilter({ genres }: GenreFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeGenre = searchParams.get("genre") ?? "";

  const handleGenreClick = (genreId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (genreId === activeGenre) {
      // Toggle off
      params.delete("genre");
    } else {
      params.set("genre", genreId);
    }

    
    params.delete("page");
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      <button
        onClick={() => handleGenreClick("")}
        className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all ${
          !activeGenre
            ? "bg-brand text-white shadow-sm shadow-brand/25"
            : "bg-surface text-text-secondary hover:bg-brand-light hover:text-brand"
        }`}
      >
        All
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => handleGenreClick(String(genre.id))}
          className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all ${
            activeGenre === String(genre.id)
              ? "bg-brand text-white shadow-sm shadow-brand/25"
              : "bg-surface text-text-secondary hover:bg-brand-light hover:text-brand"
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}
