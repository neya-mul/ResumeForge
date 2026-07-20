'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface ResumeFiltersProps {
  totalPages: number;
  currentPage: number;
}

const BD_DIVISIONS = [
  'Dhaka',
  'Chattogram',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Sylhet',
  'Rangpur',
  'Mymensingh',
];

const SKILLS = [
  'React',
  'Next.js',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'Express.js',
  'PHP',
  'Laravel',
  'Python',
  'Django',
  'Java',
  'Spring Boot',
  'MongoDB',
  'MySQL',
  'PostgreSQL',
  'HTML/CSS',
  'Tailwind CSS',
  'Vue.js',
  'Angular',
];

const selectClasses =
  'w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-zinc-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm cursor-pointer appearance-none';

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

  // Debounce the text search input so every keystroke doesn't trigger a fetch
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      updateParams({ search, location, skill });
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // Dropdowns update immediately on change, no need to debounce
  const handleLocationChange = (value: string) => {
    setLocation(value);
    updateParams({ search, location: value, skill });
  };

  const handleSkillChange = (value: string) => {
    setSkill(value);
    updateParams({ search, location, skill: value });
  };

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
          <select
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className={selectClasses}
          >
            <option value="">All locations</option>
            {BD_DIVISIONS.map((division) => (
              <option key={division} value={division}>
                {division}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 text-xs">
            ▼
          </span>
        </div>

        <div className="relative">
          <select
            value={skill}
            onChange={(e) => handleSkillChange(e.target.value)}
            className={selectClasses}
          >
            <option value="">All skills</option>
            {SKILLS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 text-xs">
            ▼
          </span>
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