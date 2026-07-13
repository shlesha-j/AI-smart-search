export default function SearchResults({ results }) {
  return (
    <section className="mt-6 space-y-3">
      {results.map((item, index) => (
        <article
          key={index}
          className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900/70"
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Result {index + 1}</span>
          </div>
          <p className="leading-7 text-slate-700 dark:text-slate-300">{item}</p>
        </article>
      ))}
    </section>
  );
}