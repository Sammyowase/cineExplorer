"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({
    currentPage,
    totalPages,
}: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Cap total pages at 500 (TMDB limit)
    const maxPages = Math.min(totalPages, 500);

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        if (page <= 1) {
            params.delete("page");
        } else {
            params.set("page", String(page));
        }
        router.push(`/?${params.toString()}`);

        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    const getPageNumbers = (): (number | "...")[] => {
        const pages: (number | "...")[] = [];
        const delta = 2;

        const start = Math.max(2, currentPage - delta);
        const end = Math.min(maxPages - 1, currentPage + delta);

        pages.push(1);

        if (start > 2) {
            pages.push("...");
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < maxPages - 1) {
            pages.push("...");
        }

        if (maxPages > 1) {
            pages.push(maxPages);
        }

        return pages;
    };

    if (maxPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-1.5">

            <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text-secondary transition-all hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-text-secondary"
                aria-label="Previous page"
            >
                <FiChevronLeft className="h-4 w-4" />
            </button>


            {getPageNumbers().map((page, index) =>
                page === "..." ? (
                    <span
                        key={`dots-${index}`}
                        className="flex h-10 w-10 items-center justify-center text-sm text-text-secondary"
                    >
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all ${currentPage === page
                                ? "bg-brand text-white shadow-sm shadow-brand/25"
                                : "border border-border text-text-secondary hover:border-brand hover:text-brand"
                            }`}
                        aria-label={`Page ${page}`}
                        aria-current={currentPage === page ? "page" : undefined}
                    >
                        {page}
                    </button>
                )
            )}


            <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= maxPages}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text-secondary transition-all hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-text-secondary"
                aria-label="Next page"
            >
                <FiChevronRight className="h-4 w-4" />
            </button>
        </div>
    );
}
