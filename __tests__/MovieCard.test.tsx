import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import MovieCard from "@/components/MovieCard";
import type { Movie } from "@/types/tmdb";

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const mockMovie: Movie = {
  id: 550,
  title: "Fight Club",
  overview: "An insomniac office worker and a soap maker form an underground fight club.",
  poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  backdrop_path: "/hZkgoQYus5dXo3H8T7Uef6DNknx.jpg",
  release_date: "1999-10-15",
  vote_average: 8.4,
  vote_count: 26280,
  genre_ids: [18, 53, 35],
  popularity: 61.4,
  original_language: "en",
  adult: false,
};

const genreMap = new Map([
  [18, "Drama"],
  [53, "Thriller"],
  [35, "Comedy"],
]);

describe("MovieCard", () => {
  it("renders movie title", () => {
    render(<MovieCard movie={mockMovie} genreMap={genreMap} />);
    expect(screen.getByText("Fight Club")).toBeInTheDocument();
  });

  it("renders release year", () => {
    render(<MovieCard movie={mockMovie} genreMap={genreMap} />);
    expect(screen.getByText("1999")).toBeInTheDocument();
  });

  it("renders rating", () => {
    render(<MovieCard movie={mockMovie} genreMap={genreMap} />);
    expect(screen.getByText("8.4")).toBeInTheDocument();
  });

  it("renders genre names", () => {
    render(<MovieCard movie={mockMovie} genreMap={genreMap} />);
    expect(screen.getByText("Drama, Thriller")).toBeInTheDocument();
  });

  it("renders overview text", () => {
    render(<MovieCard movie={mockMovie} genreMap={genreMap} />);
    expect(
      screen.getByText(/An insomniac office worker/)
    ).toBeInTheDocument();
  });

  it("links to the correct detail page", () => {
    render(<MovieCard movie={mockMovie} genreMap={genreMap} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/movies/550");
  });

  it("renders poster image with correct alt text", () => {
    render(<MovieCard movie={mockMovie} genreMap={genreMap} />);
    const img = screen.getByRole("img", { name: "Fight Club" });
    expect(img).toBeInTheDocument();
  });

  it("renders fallback when poster is null", () => {
    const movieNoPoster = { ...mockMovie, poster_path: null };
    render(<MovieCard movie={movieNoPoster} genreMap={genreMap} />);
    // Should not have an img element for the poster
    expect(screen.queryByRole("img", { name: "Fight Club" })).not.toBeInTheDocument();
  });

  it("shows 'N/A' for missing release date", () => {
    const movieNoDate = { ...mockMovie, release_date: "" };
    render(<MovieCard movie={movieNoDate} genreMap={genreMap} />);
    expect(screen.getByText("N/A")).toBeInTheDocument();
  });
});
