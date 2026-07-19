"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ResumeChat({ resumeId }: { resumeId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/resumes/${resumeId}/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, history: newMessages }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to get a response.");

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className="rounded-2xl flex flex-col h-96 border border-gray-200/80 shadow-sm border-t-4 bg-white"
      style={{ borderTopColor: "#4F46E5" }}
    >
      <div className="px-6 pt-6 pb-3 flex items-center gap-2">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-600"
          style={{ animation: loading ? "rf-pulse 1s ease-in-out infinite" : "none" }}
        />
        <p className="text-xs font-bold tracking-[0.15em] uppercase text-indigo-750 font-mono">
          Ask About This Candidate
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-2 space-y-3">
        {messages.length === 0 && (
          <p className="text-xs text-center mt-10 text-gray-400 font-mono">
            Ask about experience, skills, or fit for a role.
          </p>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            style={{ animation: "rf-message-in 0.3s ease both" }}
          >
            <div
              className={`max-w-[80%] rounded-xl px-4 py-2 text-xs leading-relaxed ${
                m.role === "user"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-indigo-50/50 text-gray-700 border border-indigo-100/50"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 text-xs text-gray-400 font-mono italic">thinking…</div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {error && <p className="text-xs px-6 text-red-500 font-medium">{error}</p>}

      <div className="px-6 py-4 flex gap-2 border-t border-gray-100">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a question…"
          disabled={loading}
          className="flex-1 px-4 py-2 text-xs rounded-xl outline-none bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white transition-all disabled:opacity-50"
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="px-4 py-2 text-xs font-bold rounded-xl transition-all disabled:opacity-50 bg-indigo-600 text-white hover:bg-indigo-750 shadow-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}