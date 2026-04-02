"use client";

import { useState } from "react";
import { FiPlay, FiX } from "react-icons/fi";
import type { TMDBVideo } from "@/types/tmdb";

interface MovieTrailerProps {
  videos: TMDBVideo[];
  movieTitle: string;
}

export default function MovieTrailer({ videos, movieTitle }: MovieTrailerProps) {
  const [isOpen, setIsOpen] = useState(false);

  
  const trailer =
    videos.find((v) => v.type === "Trailer" && v.official && v.site === "YouTube") ||
    videos.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
    videos.find((v) => v.type === "Teaser" && v.official && v.site === "YouTube") ||
    videos.find((v) => v.type === "Teaser" && v.site === "YouTube") ||
    videos.find((v) => v.type === "Clip" && v.site === "YouTube");

  if (!trailer) return null;

  return (
    <>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative inline-flex items-center gap-3 rounded-xl bg-brand px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-brand/20 transition-all hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-brand/40 active:scale-95"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:scale-110">
            <FiPlay className="h-3 w-3 fill-current ml-0.5" />
          </span>
          Watch Trailer
        </button>
      </div>

     
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      
          <div
            className="absolute inset-0 bg-text-primary/90 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

         
          <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black"
              aria-label="Close trailer"
            >
              <FiX className="h-5 w-5" />
            </button>

            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title={`${movieTitle} Trailer`}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
