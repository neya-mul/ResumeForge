import ResumeFilters from '@/components/ResumeFilters';
import React from 'react';
// import ResumeFilters from './ResumeFilters';

interface Resume {
  _id: string;
  title: string;
  fullName: string;
  email: string;
  location?: string;
  summary?: string;
  skills?: string[];
  createdAt: string;
}

interface ResumesResponse {
  success: boolean;
  count: number;
  total: number;
  totalPages: number;
  page: number;
  limit: number;
  resumes: Resume[];
}

interface PageProps {
  searchParams: Promise<{
    search?: string;
    location?: string;
    skill?: string;
    page?: string;
  }>;
}

export default async function BrouseResumes({ searchParams }: PageProps) {
  const { search = '', location = '', skill = '', page = '1' } = await searchParams;

  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (location) params.set('location', location);
  if (skill) params.set('skill', skill);
  params.set('page', page);
  params.set('limit', '10');

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/resumes?${params.toString()}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    console.error('Failed to fetch resumes:', res.status, await res.text());
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
        <p>Failed to load resumes. Check that the backend is running and reachable.</p>
      </div>
    );
  }

  const { resumes, totalPages, page: currentPage, total }: ResumesResponse = await res.json();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <h1 className="text-2xl font-bold mb-2">All Resumes</h1>
      <p className="text-sm text-slate-500 mb-6">{total} result{total === 1 ? '' : 's'}</p>

      <ResumeFilters totalPages={totalPages} currentPage={currentPage} />

      {resumes.length === 0 ? (
        <p className="text-slate-400">No resumes found yet.</p>
      ) : (
        <div className="space-y-4">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-slate-900/40 border border-slate-800 rounded-xl p-4"
            >
              <h2 className="font-semibold text-emerald-400">{resume.title}</h2>
              <p className="text-sm text-slate-300">{resume.fullName} — {resume.email}</p>
              {resume.location && (
                <p className="text-xs text-slate-500">{resume.location}</p>
              )}
              {resume.skills && resume.skills.length > 0 && (
                <p className="text-xs text-slate-600 mt-1">
                  {resume.skills.join(' · ')}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}