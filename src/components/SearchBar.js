export default function SearchBar({
  query,
  setQuery,
  onSearch,
  loading,
}) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearch();
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/70 p-3 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/70 sm:flex-row">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything…"
        className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-indigo-500 dark:focus:ring-indigo-900"
      />

      <button
        type="button"
        onClick={onSearch}
        disabled={loading}
        className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}