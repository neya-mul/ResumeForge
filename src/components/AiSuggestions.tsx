"use client";

import { useState } from "react";

export default function AiSuggestions({ resumeId }: { resumeId: string }) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasRun, setHasRun] = useState(false);

  const handleGetSuggestions = async () => {
    setLoading(true);
    setError("");
    setSuggestions([]);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/resumes/${resumeId}/ai-suggestions`,
        { method: "POST" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to get suggestions.");

      const items = data.suggestions
        .split(/\n(?=\d+\.)/)
        .map((s: string) => s.replace(/^\d+\.\s*/, "").trim())
        .filter(Boolean);

      setSuggestions(items);
      setHasRun(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="rounded-2xl px-6 py-6 border border-gray-200/80 dark:border-zinc-800 shadow-sm border-t-4 bg-white dark:bg-zinc-900"
      style={{ borderTopColor: "#4F46E5" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-600"
          style={{ animation: loading ? "rf-pulse 1s ease-in-out infinite" : "none" }}
        />
        <p className="text-xs font-bold tracking-[0.15em] uppercase text-indigo-750 font-mono">
          AI Resume Review
        </p>
      </div>

      <button
        onClick={handleGetSuggestions}
        disabled={loading}
        className="px-4 py-2.5 text-xs font-bold rounded-xl transition-all disabled:opacity-50 bg-indigo-600 text-white hover:bg-indigo-750 shadow-sm"
      >
        {loading ? "Reading resume…" : hasRun ? "Re-run review" : "Get AI suggestions"}
      </button>

      {error && <p className="text-sm mt-3 text-red-500 font-medium">{error}</p>}

      {suggestions.length > 0 && (
        <ul className="mt-5 space-y-3">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="flex gap-3 px-4 py-3 rounded-xl text-sm text-gray-700 dark:text-zinc-300 bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100/50 dark:border-indigo-900/50"
              style={{ animation: "rf-message-in 0.35s ease both", animationDelay: `${i * 60}ms` }}
            >
              <span className="shrink-0 text-indigo-600 font-mono font-bold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="leading-relaxed">{s}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}