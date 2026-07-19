'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface ResumeFiltersProps {
  totalPages: number;
  currentPage: number;
}

export default function ResumeFilters({ totalPages, currentPage }: ResumeFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const [location, setLocation] = useState(searchParams.get('location') ?? '');
  const [skill, setSkill] = useState(searchParams.get('skill') ?? '');

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateParams = useCallback(
    (updates: Record<string, string>, resetPage = true) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value.trim()) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      if (resetPage) {
        params.set('page', '1');
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  // Debounce text inputs so every keystroke doesn't trigger a fetch
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      updateParams({ search, location, skill });
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, location, skill]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mb-8 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, title, summary..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
          />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Filter by location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
          />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Filter by skill..."
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-2 flex-wrap text-sm justify-center pt-2">
          {pageNumbers.map((num) => (
            <button
              key={num}
              onClick={() => goToPage(num)}
              className={`cursor-pointer px-3.5 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                num === currentPage
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 hover:border-indigo-500 hover:text-indigo-600'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}