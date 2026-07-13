export default function Suggestions({
  suggestions,
  activeSuggestion,
  onSelectSuggestion,
}) {
  return (
    <div className="mt-6">
      <h2 className="font-bold mb-2">Related Searches</h2>

      <ul className="space-y-2">
        {suggestions.map((item, index) => (
          <li key={index}>
            <button
              type="button"
              onClick={() => onSelectSuggestion(item)}
              className="w-full text-left rounded-lg px-3 py-2 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              • {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}