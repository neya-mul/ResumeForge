import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-zinc-950 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="h-9 bg-gray-200 dark:bg-zinc-800 rounded-lg w-48 mb-2" />
          <div className="h-4 bg-gray-250 dark:bg-zinc-850 rounded-lg w-36" />
        </div>

        {/* Filter Bar Skeleton */}
        <div className="mb-8 p-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm space-y-4 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-11 bg-gray-200 dark:bg-zinc-800 rounded-xl w-full" />
            <div className="h-11 bg-gray-200 dark:bg-zinc-800 rounded-xl w-full" />
            <div className="h-11 bg-gray-200 dark:bg-zinc-800 rounded-xl w-full" />
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded-lg w-28" />
            <div className="flex gap-2">
              <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded-lg w-10" />
              <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded-lg w-10" />
            </div>
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-5 w-full shadow-sm flex flex-col justify-between h-full animate-pulse"
            >
              <div>
                <div className="h-5 bg-gray-200 dark:bg-zinc-800 rounded-lg w-3/4 mb-3" />
                <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded-lg w-1/2 mb-1.5" />
                <div className="h-3.5 bg-gray-200 dark:bg-zinc-800 rounded-lg w-2/3 mb-2" />
                <div className="h-3.5 bg-gray-200 dark:bg-zinc-800 rounded-lg w-1/3 mb-4" />
                <div className="flex flex-wrap gap-1.5 mt-4">
                  <div className="h-5 bg-gray-200 dark:bg-zinc-800 rounded-md w-12" />
                  <div className="h-5 bg-gray-200 dark:bg-zinc-800 rounded-md w-16" />
                  <div className="h-5 bg-gray-200 dark:bg-zinc-800 rounded-md w-14" />
                </div>
              </div>
              <div className="h-9 bg-gray-200 dark:bg-zinc-800 rounded-xl w-full mt-6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
