"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useDebounce } from "@/hooks/useDebounce";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") ?? "";
  const [value, setValue] = useState(initialQuery);
  const debouncedValue = useDebounce(value, 300);

  const updateUrl = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("query", query);
      } else {
        params.delete("query");
      }
      
      params.delete("page");
      router.push(`/?${params.toString()}`);
    },
    [router, searchParams]
  );

  useEffect(() => {
    // Only update URL when debounced value changes
    if (debouncedValue !== initialQuery) {
      updateUrl(debouncedValue);
    }
  }, [debouncedValue, updateUrl, initialQuery]);

  const clearSearch = () => {
    setValue("");
    updateUrl("");
  };

  return (
    <div className="relative w-full max-w-md">
      <FiSearch className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
      <input
        type="text"
        placeholder="Search movies..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-11 w-full rounded-xl border border-border bg-white pl-10 pr-10 text-sm text-text-primary placeholder:text-text-secondary/60 outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/20"
        aria-label="Search movies"
      />
      {value && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
          aria-label="Clear search"
        >
          <FiX className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
