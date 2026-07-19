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
      className="rounded-lg px-6 py-6 border border-white/10 border-t-2"
      style={{ background: "#0F172A", borderTopColor: "#34D399", borderTopStyle: "dashed" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"
          style={{ animation: loading ? "rf-pulse 1s ease-in-out infinite" : "none" }}
        />
        <p className="text-xs tracking-[0.15em] uppercase text-emerald-400 font-mono">
          AI Resume Review
        </p>
      </div>

      <button
        onClick={handleGetSuggestions}
        disabled={loading}
        className="px-4 py-2 text-sm font-medium rounded-md transition-colors disabled:opacity-50 bg-white text-[#0A0F1C] hover:bg-emerald-400"
      >
        {loading ? "Reading resume…" : hasRun ? "Re-run review" : "Get AI suggestions"}
      </button>

      {error && <p className="text-sm mt-3 text-red-400">{error}</p>}

      {suggestions.length > 0 && (
        <ul className="mt-5 space-y-3">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="flex gap-3 px-4 py-3 rounded-md text-sm text-slate-200 bg-emerald-400/5 border border-emerald-400/15"
              style={{ animation: "rf-message-in 0.35s ease both", animationDelay: `${i * 60}ms` }}
            >
              <span className="shrink-0 text-emerald-400 font-mono">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}