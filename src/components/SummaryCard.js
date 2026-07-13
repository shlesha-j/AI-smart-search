export default function SummaryCard({ summary }) {
  return (
    <section className="mt-6 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/70">
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
          Summary
        </span>
      </div>
      <p className="leading-7 text-slate-700 dark:text-slate-300">{summary}</p>
    </section>
  );
}