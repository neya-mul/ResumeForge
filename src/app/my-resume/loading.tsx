import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-zinc-950 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8 flex items-center justify-between animate-pulse">
          <div>
            <div className="h-9 bg-gray-200 dark:bg-zinc-800 rounded-lg w-40 mb-2" />
            <div className="h-4 bg-gray-250 dark:bg-zinc-850 rounded-lg w-28" />
          </div>
          <div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded-xl w-32" />
        </div>

        {/* List Skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex items-start justify-between gap-4 animate-pulse"
            >
              <div className="flex-1">
                <div className="h-5 bg-gray-200 dark:bg-zinc-800 rounded-lg w-1/3 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded-lg w-1/2 mb-2" />
                <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded-lg w-1/4 mb-4" />
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <div className="h-5 bg-gray-200 dark:bg-zinc-800 rounded w-10" />
                  <div className="h-5 bg-gray-200 dark:bg-zinc-800 rounded w-14" />
                  <div className="h-5 bg-gray-200 dark:bg-zinc-800 rounded w-12" />
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-20" />
                <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded w-14 mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
