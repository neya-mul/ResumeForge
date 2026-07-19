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
      <div className="flex items-center gap-2 text-xs bg-red-50 border border-red-100 rounded-lg p-2 animate-reveal">
        <span className="text-red-700 font-medium">Delete "{resumeTitle}"?</span>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="px-2.5 py-1 rounded bg-red-600 text-white hover:bg-red-700 font-bold transition-all disabled:opacity-50 text-[10px]"
        >
          {isPending ? 'Deleting…' : 'Confirm'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={isPending}
          className="px-2.5 py-1 rounded border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-all text-[10px]"
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
        className="text-xs text-red-500 hover:text-red-700 font-semibold underline underline-offset-2 transition-colors cursor-pointer"
      >
        Delete
      </button>
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
    </div>
  );
}