import type {
  Movie,
  MovieDetail,
  TMDBResponse,
  GenreListResponse,
} from "@/types/tmdb";

const BASE_URL = "https://api.themoviedb.org/3";

function getApiKey(): string {
  const key = process.env.TMDB_API_KEY;
  if (!key) {
    throw new Error("TMDB_API_KEY is not defined in environment variables");
  }
  return key;
}

function buildUrl(path: string, params: Record<string, string> = {}): string {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("api_key", getApiKey());
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  return url.toString();
}


export async function getPopularMovies(
  page: number = 1
): Promise<TMDBResponse<Movie>> {
  const url = buildUrl("/movie/popular", { page: String(page) });
  const res = await fetch(url, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error(`Failed to fetch popular movies: ${res.status}`);
  }

  return res.json();
}

export async function getMovieDetails(id: number): Promise<MovieDetail> {
  const url = buildUrl(`/movie/${id}`, { append_to_response: "credits,videos" });
  const res = await fetch(url, { next: { revalidate: 86400 } });

  if (!res.ok) {
    throw new Error(`Failed to fetch movie details: ${res.status}`);
  }

  return res.json();
}


export async function searchMovies(
  query: string,
  page: number = 1
): Promise<TMDBResponse<Movie>> {
  const url = buildUrl("/search/movie", {
    query,
    page: String(page),
    include_adult: "false",
  });
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Failed to search movies: ${res.status}`);
  }

  return res.json();
}


export async function getGenres(): Promise<GenreListResponse> {
  const url = buildUrl("/genre/movie/list");
  const res = await fetch(url, { cache: "force-cache" });

  if (!res.ok) {
    throw new Error(`Failed to fetch genres: ${res.status}`);
  }

  return res.json();
}


export async function getMoviesByGenre(
  genreId: number,
  page: number = 1
): Promise<TMDBResponse<Movie>> {
  const url = buildUrl("/discover/movie", {
    with_genres: String(genreId),
    page: String(page),
    sort_by: "popularity.desc",
  });
  const res = await fetch(url, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error(`Failed to fetch movies by genre: ${res.status}`);
  }

  return res.json();
}
