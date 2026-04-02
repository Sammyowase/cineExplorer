import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

const mockPush = vi.fn();

function setupMocks(initialQuery: string = "") {
  (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
    push: mockPush,
  });

  const params = new URLSearchParams();
  if (initialQuery) params.set("query", initialQuery);

  (useSearchParams as ReturnType<typeof vi.fn>).mockReturnValue({
    get: (key: string) => params.get(key),
    toString: () => params.toString(),
  });
}

describe("SearchBar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders search input with placeholder", () => {
    setupMocks();
    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText("Search movies...")
    ).toBeInTheDocument();
  });

  it("has correct aria-label", () => {
    setupMocks();
    render(<SearchBar />);
    expect(screen.getByLabelText("Search movies")).toBeInTheDocument();
  });

  it("renders with initial query value from URL", () => {
    setupMocks("batman");
    render(<SearchBar />);
    const input = screen.getByLabelText("Search movies") as HTMLInputElement;
    expect(input.value).toBe("batman");
  });

  it("updates input value on change", () => {
    setupMocks();
    render(<SearchBar />);
    const input = screen.getByLabelText("Search movies") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "inception" } });
    expect(input.value).toBe("inception");
  });

  it("shows clear button when input has value", () => {
    setupMocks();
    render(<SearchBar />);
    const input = screen.getByLabelText("Search movies");
    fireEvent.change(input, { target: { value: "test" } });
    expect(screen.getByLabelText("Clear search")).toBeInTheDocument();
  });

  it("hides clear button when input is empty", () => {
    setupMocks();
    render(<SearchBar />);
    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument();
  });

  it("clears input when clear button is clicked", () => {
    setupMocks();
    render(<SearchBar />);
    const input = screen.getByLabelText("Search movies") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(screen.getByLabelText("Clear search"));
    expect(input.value).toBe("");
  });

  it("debounces URL update by 300ms", () => {
    setupMocks();
    render(<SearchBar />);
    const input = screen.getByLabelText("Search movies");

    fireEvent.change(input, { target: { value: "interstellar" } });

    // Should not have called push immediately
    expect(mockPush).not.toHaveBeenCalled();

    // Advance timers inside act() so React flushes useEffect
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(mockPush).toHaveBeenCalledWith("/?query=interstellar");
  });

  it("does not update URL before debounce delay", () => {
    setupMocks();
    render(<SearchBar />);
    const input = screen.getByLabelText("Search movies");

    fireEvent.change(input, { target: { value: "matrix" } });

    // Advance only 200ms — not enough
    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(mockPush).not.toHaveBeenCalled();

    // Now advance the remaining 100ms
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(mockPush).toHaveBeenCalledWith("/?query=matrix");
  });

  it("clears search and updates URL immediately", () => {
    setupMocks("batman");
    render(<SearchBar />);

    fireEvent.click(screen.getByLabelText("Clear search"));

    // Clear calls updateUrl directly — but debounce still applies for the empty value
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(mockPush).toHaveBeenCalledWith("/?");
  });
});
