import React from 'react'

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

export default async function BrouseResumes() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/resumes`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error('Failed to fetch resumes:', res.status, await res.text());
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
        <p>Failed to load resumes. Check that the backend is running and reachable.</p>
      </div>
    );
  }

  const { resumes }: { resumes: Resume[] } = await res.json();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <h1 className="text-2xl font-bold mb-6">All Resumes</h1>

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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}