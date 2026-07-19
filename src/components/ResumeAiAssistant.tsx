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
    <div className="rounded-2xl border border-gray-100 bg-white p-6 space-y-6 shadow-sm">
      <div>
        <h3 className="text-lg font-bold text-gray-900">
          ResumeForge <span className="text-indigo-600">AI Optimization Engine</span>
        </h3>
        <p className="text-[10px] text-gray-400 font-mono mt-1 uppercase tracking-wider">
          Model Instance Matrix: Llama-3-8B via Groq Core
        </p>
      </div>

      {/* Output Console Box */}
      {analysis && (
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-150 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-sans shadow-inner">
          <div className="text-[10px] text-indigo-600 font-mono tracking-wider mb-2 uppercase border-b border-gray-200 pb-1 font-bold">
            Analysis Stream Output
          </div>
          {analysis}
        </div>
      )}

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-150 text-red-650 text-xs font-mono">
          🛑 {error}
        </div>
      )}

      {/* Input Action Form */}
      <form onSubmit={handleAiInference} className="space-y-3">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about ATS compatibility, missing core skills, or phrasing improvements..."
          className="w-full min-h-[80px] rounded-xl bg-gray-50 border border-gray-200 p-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:bg-white resize-y transition-all"
          disabled={loading}
        />
        
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-750 disabled:bg-gray-100 disabled:text-gray-400 text-white font-bold text-xs font-mono tracking-wide transition-all uppercase shadow-sm"
        >
          {loading ? 'Processing Model Reasoning Matrix...' : 'Execute AI Analysis'}
        </button>
      </form>
    </div>
  );
}