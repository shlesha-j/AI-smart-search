export default function SearchResults({ results }) {
  return (
    <div className="mt-6">
      {results.map((item, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 mb-3"
        >
          {item}
        </div>
      ))}
    </div>
  );
}