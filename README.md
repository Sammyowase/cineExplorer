# TMDB Content Explorer — Technical Assessment

A production-quality "Content Explorer" built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**, fetching data from The Movie Database (TMDB) API.

## 🚀 Quick Start

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Setup environment variables**:
    Create a `.env.local` file in the root and add your TMDB API Key:
    ```bash
    TMDB_API_KEY=your_api_key_here
    ```
4.  **Run the development server**:
    ```bash
    npm run dev
    ```
5.  **Run tests**:
    ```bash
    npm test
    ```

---

## 🏗️ Architecture Decisions

### 1. Next.js 16 App Router & Server Components
I used the **App Router** to leverage **React Server Components (RSC)**. All data fetching for the listing and detail pages happens on the server. This reduces client-side JavaScript, improves SEO (via `generateMetadata`), and allows for faster First Contentful Paint (FCP).

### 2. API Layer Abstraction (`lib/tmdb.ts`)
Components do not call `fetch()` directly. Instead, they use abstracted functions in `lib/tmdb.ts`. This allows for:
-   **Centralized Cache Management**: Each fetch call defines its own revalidation strategy (e.g., popular movies revalidate every hour, movie details every 24 hours).
-   **Strong Typing**: All responses are mapped to TypeScript interfaces in `types/tmdb.ts`, ensuring zero `any` usage.

### 3. URL-Driven State Management
Search query, genre filters, and pagination are all synced with the **URL search parameters** using `useSearchParams`.
-   **Shareability**: Users can share a link to a specific search result or page.
-   **SSR Compatibility**: The server can read these params to perform initial data fetching before the page reaches the client.

### 4. TanStack Query for Client-Side Data
While the initial page is SSR, I've included **TanStack Query** to handle client-side data fetching and caching for a smoother user experience during interactive search/filtering.

---

## ⚡ Performance Optimizations

### 1. Largest Contentful Paint (LCP)
-   **next/image**: Used for all posters and backdrops. Poster images use `sizes` to ensure the browser loads the smallest possible variant.
-   **Priority Loading**: The detail page backdrop and poster use the `priority` attribute to skip lazy-loading and improve LCP.

### 2. Cumulative Layout Shift (CLS)
-   **Skeleton Loaders**: Custom skeleton components in `loading.tsx` mimic the exact card and layout structure, preventing layout shifts when data arrives.
-   **Explicit Aspect Ratios**: Poster containers have defined aspect ratios (`aspect-[2/3]`) to reserve space before images load.

### 3. React 18 Streaming (Bonus B-2)
The main listing page uses **Streaming with Suspense**. The Hero section and search bar render immediately, while the heavy movie data streams in, showing skeleton loaders in the meantime. This significantly improves perceived performance.

### 4. Cache Strategies
-   **Force-cache**: Used for static data like the Genre list.
-   **Revalidate (ISR)**: Used for popular movies (1 hour) and movie details (24 hours).
-   **No-store**: Used for search results to ensure freshness.

---

## ♿ Accessibility (Bonus B-3)

-   **Semantic HTML**: Used `<header>`, `<main>`, `<footer>`, `<section>`, `<nav>`, and `<article>` appropriately.
-   **ARIA Labels**: Added `aria-label` to search inputs and pagination buttons.
-   **Contrast Compliance**: Secondary text colors were adjusted to meet **WCAG AA (4.5:1)** contrast ratios.
-   **Focus Management**: Custom `:focus-visible` styles ensure a consistent and clear focus ring for keyboard users.
-   **Screen Reader Optimization**: Search clear buttons and pagination controls have descriptive labels.

---

## 🛠️ Trade-offs & Future Improvements

-   **Infinite Scroll vs Pagination**: I chose **Pagination** because it’s better for SEO and URL shareability. Infinite scroll can often lead to "footer chasing" and makes it harder to bookmark a specific result page.
-   **UI Library**: I avoided UI libraries (Radix/Shadcn) per the brief to showcase raw CSS/Tailwind skills. In a larger production app, I would use Radix primitives for more complex components like accessible dropdowns or modals.
-   **Testing Scope**: With more time, I would add **Playwright** for E2E testing to verify the full user flow (Search → Filter → Navigate → Back).
-   **Edge Caching**: While aware of **OpenNext** and Cloudflare's `Cache-Control` capabilities, I focused on application-level caching via Next.js `fetch` options for portability across Vercel and Cloudflare.

---

## 🧪 Bonus Tasks Attempted

-   **B-1: Cloudflare Workers Edge Caching with OpenNext**: 
    - **Implementation**: Used `@opennextjs/cloudflare` to map Next.js fetch cache semantics to the Workers runtime.
    - **Cache Header**: Implemented `middleware.ts` to expose an `x-cache-status: HIT/MISS` header on the listing page.
    - **Awareness**: Documented how OpenNext leverages the Workers Cache API to provide ISR/SSG functionality at the edge.
-   **B-2: React 18 Streaming with Suspense**: Implemented on the home page listing.
-   **B-3: Accessibility Audit**: Achieved high compliance through semantic HTML, ARIA, and contrast fixes.
-   **Movie Trailers**: Implemented a "Watch Trailer" modal with YouTube integration, prioritizing official trailers and teasers.
