export default function Suggestions({
  suggestions,
  activeSuggestion,
  onSelectSuggestion,
}) {
  return (
    <section className="mt-6 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/70">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">
          Related Searches
        </h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {suggestions.map((item, index) => {
          const isActive = item === activeSuggestion;

          return (
            <button
              key={index}
              type="button"
              onClick={() => onSelectSuggestion(item)}
              className={`rounded-full border px-3 py-2 text-sm transition ${
                isActive
                  ? "border-indigo-500 bg-indigo-500/10 text-indigo-700 dark:border-indigo-400 dark:text-indigo-300"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-indigo-300 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-300"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </section>
  );
}