import React from 'react';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import DeleteResumeButton from '@/components/DeleteResumeButton';
import Link from 'next/link';

interface Resume {
  _id: string;
  title: string;
  fullName: string;
  email: string;
  location?: string;
  summary?: string;
  skills?: string[];
  userId: string;
  createdAt: string;
}

interface ResumesResponse {
  success: boolean;
  count: number;
  resumes: Resume[];
}

export default async function MyResume() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return (
      <div className="min-h-screen bg-[#F8F7FF] dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 p-8 flex items-center justify-center">
        <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm text-center max-w-sm">
          <p className="text-gray-600 dark:text-zinc-400 mb-4">You need to be signed in to view your resumes.</p>
          <Link href="/login" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-semibold transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/resumes/user/${session.user.id}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    console.error('Failed to fetch resumes:', res.status, await res.text());
    return (
      <div className="min-h-screen bg-[#F8F7FF] dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 p-8 flex items-center justify-center">
        <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-red-150 dark:border-red-900/50 shadow-sm text-center max-w-md">
          <p className="text-red-500 font-semibold mb-2">Failed to load resumes</p>
          <p className="text-sm text-gray-500 dark:text-zinc-400">Check that the backend is running and reachable.</p>
        </div>
      </div>
    );
  }

  const { resumes, count }: ResumesResponse = await res.json();

  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-100" style={{ fontFamily: "'Outfit', sans-serif" }}>
              My Resumes
            </h1>
            <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">{count} resume{count === 1 ? '' : 's'} managed</p>
          </div>
          <Link href="/add-resume" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm">
            Create Resume
          </Link>
        </div>

        {resumes.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl">
            <p className="text-gray-400 dark:text-zinc-500">You haven't created any resumes yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex items-start justify-between gap-4 hover:border-indigo-100 dark:hover:border-indigo-800 transition-all"
              >
                <div>
                  <h2 className="font-bold text-lg text-indigo-700 mb-1">{resume.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-zinc-300 font-medium">{resume.fullName} — {resume.email}</p>
                  {resume.location && (
                    <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">{resume.location}</p>
                  )}
                  {resume.skills && resume.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {resume.skills.map((s, i) => (
                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 text-gray-500 dark:text-zinc-400 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Link href={`/details/${resume._id}`} className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline">
                    View 
                  </Link>
                  <DeleteResumeButton resumeId={resume._id} resumeTitle={resume.title} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}