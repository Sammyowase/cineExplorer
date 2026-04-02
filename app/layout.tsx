import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/QueryProvider";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CineExplorer — Discover Movies",
    template: "%s | CineExplorer",
  },
  description:
    "Explore trending movies, search by title, filter by genre. Powered by TMDB.",
  openGraph: {
    title: "CineExplorer — Discover Movies",
    description:
      "Explore trending movies, search by title, filter by genre.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className="flex min-h-full flex-col bg-background text-text-primary"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <QueryProvider>
          <Header />
          <main className="flex-1 pt-16">{children}</main>
          <footer className="border-t border-border bg-surface py-6">
            <div className="mx-auto max-w-7xl px-4 text-center text-xs text-text-secondary sm:px-6 lg:px-8">
              <p>
                cineExplorer @ { new Date().getFullYear()} .{" "}
                <a
                  href="https://www.themoviedb.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline"
                >
                  Data provided by TMDB
                </a>
              </p>
            </div>
          </footer>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                borderRadius: "12px",
                background: "#1A1A2E",
                color: "#fff",
                fontSize: "14px",
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
