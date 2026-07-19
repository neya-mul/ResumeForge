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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Search by name, title, summary..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-slate-900/60 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
        />
        <input
          type="text"
          placeholder="Filter by location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-slate-900/60 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
        />
        <input
          type="text"
          placeholder="Filter by skill..."
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="bg-slate-900/60 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
        />
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-2 flex-wrap text-sm">
          {pageNumbers.map((num) => (
            <span
              key={num}
              onClick={() => goToPage(num)}
              className={`cursor-pointer px-3 py-1 rounded-md border transition-colors ${
                num === currentPage
                  ? 'bg-emerald-500 text-slate-950 border-emerald-500'
                  : 'border-slate-800 text-slate-300 hover:border-emerald-500 hover:text-emerald-400'
              }`}
            >
              {num}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}