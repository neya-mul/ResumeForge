import React from 'react';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import DeleteResumeButton from '@/components/DeleteResumeButton';

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
      <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
        <p>You need to be signed in to view your resumes.</p>
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
      <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
        <p>Failed to load your resumes. Check that the backend is running and reachable.</p>
      </div>
    );
  }

  const { resumes, count }: ResumesResponse = await res.json();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <h1 className="text-2xl font-bold mb-2">My Resumes</h1>
      <p className="text-sm text-slate-500 mb-6">{count} resume{count === 1 ? '' : 's'}</p>

      {resumes.length === 0 ? (
        <p className="text-slate-400">You haven't created any resumes yet.</p>
      ) : (
        <div className="space-y-4">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 flex items-start justify-between gap-4"
            >
              <div>
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

              <DeleteResumeButton resumeId={resume._id} resumeTitle={resume.title} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}