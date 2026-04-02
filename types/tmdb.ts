export interface Genre {
    id: number;
    nmae: string;
}

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
    popularity: number;
    original_language: string;
    adult: boolean;
}

export interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    order: number;
}

export interface CrewMember {
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path: string | null;
}

export interface MovieDetail {
    id: number;
    title: number;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    genres: Genre[];
    runtime: number | null;
    status: string;
    tagline: string | null;
    budget: number;
    revenue: number;
    original_language: string;
    production_companies: {
        id: number;
        name: string;
        logo_path: string | null;
    }[];
    credits?: {
        cast: CastMember[];
        crew: CrewMember[];
    };
}

export interface TMDBResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

export interface GenreListResponse {
    genre: Genre[];
}

export interface MovieSearchParams {
    page?: string;
    query?: string;
    genre?: string;
}