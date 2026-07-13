"use client";

import { useEffect, useState } from "react";

import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import Suggestions from "@/components/Suggestions";
import SummaryCard from "@/components/SummaryCard";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("ai-smart-search-theme");
    const preferredTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    setTheme(preferredTheme);
    document.documentElement.classList.toggle("dark", preferredTheme === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("ai-smart-search-theme", theme);
  }, [theme]);

  const handleSearch = async (searchQuery = query) => {
    const normalizedQuery = searchQuery.trim();

    if (!normalizedQuery) return;

    try {
      setLoading(true);

      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: normalizedQuery }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Search failed.");
      }

      setResults(data.results || []);
      setSummary(data.summary || "");
      setSuggestions(data.suggestions || []);
      setActiveSuggestion("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionSelect = async (item) => {
    setActiveSuggestion(item);
    setQuery(item);
    await handleSearch(item);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(129,140,248,0.22),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.16),_transparent_26%)] px-4 py-6 text-slate-900 transition-colors dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <header className="rounded-[28px] border border-slate-200/70 bg-white/70 p-6 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/70">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <span className="inline-flex w-fit items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
                AI-powered discovery
              </span>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">AI Smart Search</h1>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                  Search intelligently, get instant summaries, and explore related ideas in a cleaner, modern workspace.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200"
            >
              <span>{theme === "dark" ? "☀️" : "🌙"}</span>
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </header>

        <section className="rounded-[28px] border border-slate-200/70 bg-white/75 p-4 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.2)] backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/70 sm:p-6">
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={() => handleSearch(query)}
            loading={loading}
          />

          {loading ? (
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/80 px-4 py-4 text-sm font-medium text-slate-600 dark:border-slate-800/80 dark:bg-slate-950/70 dark:text-slate-300">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-indigo-500" />
              Preparing your smartest results…
            </div>
          ) : (
            <>
              {summary && <SummaryCard summary={summary} />}
              {results.length > 0 && <SearchResults results={results} />}
              {suggestions.length > 0 && (
                <Suggestions
                  suggestions={suggestions}
                  activeSuggestion={activeSuggestion}
                  onSelectSuggestion={handleSuggestionSelect}
                />
              )}
              {!loading && query && results.length === 0 && !summary && (
                <div className="mt-6 rounded-2xl border border-dashed border-slate-300/70 bg-slate-50/70 p-5 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-400">
                  No results yet. Try a broader search to discover helpful answers and follow-up ideas.
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}