'use client';

import React, { useState } from 'react';

interface AiAssistantProps {
  resumeId: string;
}

export default function ResumeAiAssistant({ resumeId }: AiAssistantProps) {
  const [query, setQuery] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAiInference = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:5000';
      const response = await fetch(`${baseUrl}/api/resumes/${resumeId}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userQuery: query }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'AI engine optimization pipeline error.');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (err: any) {
      setError(err.message || 'Failed to communicate with AI core.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-900 bg-slate-900/10 p-6 space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-200">
          ResumeForge <span className="text-emerald-500">AI Optimization Engine</span>
        </h3>
        <p className="text-xs text-slate-500 font-mono mt-1">
          Model Instance Matrix: Llama-3-8B via Groq Core
        </p>
      </div>

      {/* Output Console Box */}
      {analysis && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
          <div className="text-[10px] text-emerald-500 font-mono tracking-wider mb-2 uppercase border-b border-slate-900 pb-1">
            Analysis Stream Output
          </div>
          {analysis}
        </div>
      )}

      {error && (
        <div className="p-3 rounded-lg bg-red-950/30 border border-red-900 text-red-400 text-xs font-mono">
          🛑 {error}
        </div>
      )}

      {/* Input Action Form */}
      <form onSubmit={handleAiInference} className="space-y-3">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about ATS compatibility, missing core skills, or phrasing improvements..."
          className="w-full min-h-[80px] rounded-lg bg-slate-950 border border-slate-900 p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 resize-y"
          disabled={loading}
        />
        
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-900 disabled:text-slate-600 text-slate-950 font-bold text-xs font-mono tracking-wide transition-all duration-150 uppercase"
        >
          {loading ? 'Processing Model Reasoning Matrix...' : 'Execute AI Analysis'}
        </button>
      </form>
    </div>
  );
}