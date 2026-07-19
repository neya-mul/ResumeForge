"use client";

import { useState } from "react";

export default function AiSuggestions({ resumeId }: { resumeId: string }) {
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetSuggestions = async () => {
    setLoading(true);
    setError("");
    setSuggestions("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/resumes/${resumeId}/ai-suggestions`,
        { method: "POST" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to get suggestions.");
      setSuggestions(data.suggestions);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleGetSuggestions}
        disabled={loading}
        className="px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Get AI Suggestions"}
      </button>

      {error && <p className="text-red-600 mt-3">{error}</p>}

      {suggestions && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h2 className="font-semibold mb-2">AI Suggestions</h2>
          <pre className="whitespace-pre-wrap font-sans text-sm">
            {suggestions}
          </pre>
        </div>
      )}
    </div>
  );
}