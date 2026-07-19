import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen py-16 px-6 bg-[#F8F7FF] dark:bg-zinc-950">
      <div className="max-w-5xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-24 mb-2" />
          <div className="h-10 bg-gray-250 dark:bg-zinc-800 rounded w-64 mb-2" />
          <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded w-40" />
        </div>

        {/* Profile Document Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] rounded-2xl overflow-hidden mb-8 border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md animate-pulse">
          {/* Sidebar */}
          <div className="p-8 space-y-8 bg-gray-50/50 dark:bg-zinc-900/50 border-b md:border-b-0 md:border-r border-gray-250/60 dark:border-zinc-800">
            {/* Contact */}
            <div>
              <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-20 mb-3" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-5/6" />
                <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-2/3" />
              </div>
            </div>

            {/* Skills */}
            <div>
              <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-16 mb-3" />
              <div className="flex flex-wrap gap-2">
                <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded-lg w-12" />
                <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded-lg w-16" />
                <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded-lg w-14" />
                <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded-lg w-10" />
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-24 mb-3" />
              <div className="space-y-3">
                <div>
                  <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded w-1/2 mt-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Column */}
          <div className="p-8 space-y-8">
            {/* Summary */}
            <div>
              <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-20 mb-3" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-full" />
                <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-11/12" />
                <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-5/6" />
              </div>
            </div>

            {/* Experience */}
            <div>
              <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-24 mb-3" />
              <div className="space-y-6">
                {Array.from({ length: 2 }).map((_, idx) => (
                  <div key={idx} className="pl-5 border-l-2 border-indigo-150 dark:border-zinc-800 space-y-1.5">
                    <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/2" />
                    <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded w-1/3" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Layer Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-pulse">
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl h-80 p-6 space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-32" />
            <div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded-xl w-28" />
            <div className="space-y-2 pt-2">
              <div className="h-12 bg-gray-200 dark:bg-zinc-800 rounded-xl" />
              <div className="h-12 bg-gray-200 dark:bg-zinc-800 rounded-xl" />
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl h-80 p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-36" />
              <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/2 mx-auto mt-8" />
            </div>
            <div className="flex gap-2">
              <div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded-xl flex-1" />
              <div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded-xl w-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
