export default function SearchBar({
    query,
    setQuery,
    onSearch,
    loading,
}) {
    return (
        <div className="flex gap-3">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 border rounded-lg p-3"
            />

            <button
                onClick={onSearch}
                disabled={loading}
                className="bg-black text-white px-6 rounded-lg disabled:opacity-50"
            >
                {loading ? "Searching..." : "Search"}
            </button>
        </div>
    );
}