export default function SummaryCard({ summary }) {
  return (
    <div className="mt-6 border rounded-lg p-4">
      <h2 className="font-bold mb-2">
        Summary
      </h2>

      <p>{summary}</p>
    </div>
  );
}