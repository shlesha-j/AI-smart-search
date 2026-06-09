export default function Suggestions({
  suggestions,
}) {
  return (
    <div className="mt-6">
      <h2 className="font-bold mb-2">
        Related Searches
      </h2>

      <ul>
        {suggestions.map((item, index) => (
          <li key={index}>
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}