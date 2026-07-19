'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteResumeButtonProps {
  resumeId: string;
  resumeTitle: string;
}

export default function DeleteResumeButton({ resumeId, resumeTitle }: DeleteResumeButtonProps) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/resumes/${resumeId}`,
        { method: 'DELETE' }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to delete resume.');
      }

      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setConfirming(false);
    }
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-400">Delete "{resumeTitle}"?</span>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="px-2 py-1 rounded-md bg-red-500/90 text-white hover:bg-red-500 disabled:opacity-50"
        >
          {isPending ? 'Deleting…' : 'Confirm'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={isPending}
          className="px-2 py-1 rounded-md border border-slate-700 text-slate-300 hover:border-slate-500"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={() => setConfirming(true)}
        className="text-xs text-red-400/80 hover:text-red-400 underline underline-offset-2"
      >
        Delete
      </button>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}