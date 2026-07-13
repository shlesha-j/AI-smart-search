// import Image from "next/image";
"use client";

import { useState } from "react";

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

  const handleSearch = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Search failed.");
      }

      setResults(data.results || []);
      setSummary(data.summary || "");
      setSuggestions(data.suggestions || []);
      setActiveSuggestion("");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">
        AI Smart Search
      </h1>


      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        loading={loading}
      />
      {loading ? (
        <div className="mt-6 text-lg font-medium">
          Searching...
        </div>
      ) : (
        <>
          {summary && <SummaryCard summary={summary} />}
          {results.length > 0 && <SearchResults results={results} />}
          {suggestions.length > 0 && (
            <Suggestions
              suggestions={suggestions}
              activeSuggestion={activeSuggestion}
              onSelectSuggestion={setActiveSuggestion}
            />
          )}
        </>
      )}
    </main>
  );
}