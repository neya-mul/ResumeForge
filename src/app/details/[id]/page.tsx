import AiSuggestions from "@/components/AiSuggestions";
import ResumeChat from "@/components/ResumeChat";

interface Experience {
  company: string;
  role: string;
  duration: string;
}

interface Education {
  institution?: string;
  degree?: string;
  duration?: string;
  [key: string]: any;
}

interface Resume {
  _id: string;
  title: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  location: string;
  website?: string;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  userId: string;
  createdAt: string;
}

export default async function Details({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/resumes/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7FF] dark:bg-zinc-950">
        <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800 shadow-sm text-center max-w-sm">
          <p className="text-lg text-gray-500 dark:text-zinc-400">This resume couldn't be found.</p>
        </div>
      </div>
    );
  }

  const data = await res.json();
  const resume: Resume = data.resume;

  return (
    <div className="min-h-screen py-16 px-6 bg-[#F8F7FF] dark:bg-zinc-950 text-gray-900 dark:text-zinc-100">
      <style>{`
        @keyframes rf-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes rf-message-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes rf-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .rf-reveal {
          opacity: 0;
          animation: rf-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .rf-reveal { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="rf-reveal mb-8">
          <p className="text-xs tracking-[0.2em] uppercase mb-2 text-indigo-600 font-mono font-bold">
            Candidate Profile
          </p>
          <h1 className="text-4xl font-bold mb-1 text-gray-900 dark:text-zinc-100" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {resume.fullName}
          </h1>
          <p className="text-lg font-semibold text-indigo-600">{resume.title}</p>
        </div>

        {/* Document grid */}
        <div
          className="rf-reveal grid grid-cols-1 md:grid-cols-[280px_1fr] rounded-2xl overflow-hidden mb-8 border border-gray-200/80 dark:border-zinc-800 shadow-md bg-white dark:bg-zinc-900"
          style={{ animationDelay: "80ms" }}
        >
          {/* Sidebar */}
          <div className="p-8 space-y-8 bg-gray-50/50 dark:bg-zinc-900/50 border-b md:border-b-0 md:border-r border-gray-250/60 dark:border-zinc-800">
            <div>
              <SectionLabel>Contact</SectionLabel>
              <div className="space-y-2 text-sm text-gray-600 dark:text-zinc-400">
                <p className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {resume.location}
                </p>
                <p className="break-all flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {resume.email}
                </p>
                <p className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {resume.phoneNumber}
                </p>
                {resume.website && (
                  <a
                    href={resume.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 underline underline-offset-2 text-indigo-600 hover:text-indigo-850 transition-colors"
                  >
                    <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <span className="truncate">{resume.website}</span>
                  </a>
                )}
              </div>
            </div>

            {resume.skills?.length > 0 && (
              <div>
                <SectionLabel>Skills</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-lg font-mono text-indigo-700 bg-indigo-50 border border-indigo-100 transition-transform hover:-translate-y-0.5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {resume.education?.length > 0 && (
              <div>
                <SectionLabel>Education</SectionLabel>
                <div className="space-y-4">
                  {resume.education.map((edu, i) => (
                    <div key={i}>
                      {edu.degree && (
                        <p className="text-sm font-bold text-gray-900 dark:text-zinc-100">{edu.degree}</p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-zinc-500 mt-0.5">
                        {edu.institution}
                        {edu.duration ? ` \u00b7 ${edu.duration}` : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main column */}
          <div className="p-8 space-y-8">
            {resume.summary && (
              <div>
                <SectionLabel>Summary</SectionLabel>
                <p className="leading-relaxed text-gray-700 dark:text-zinc-300 text-sm whitespace-pre-line">{resume.summary}</p>
              </div>
            )}

            {resume.experience?.length > 0 && (
              <div>
                <SectionLabel>Experience</SectionLabel>
                <div className="space-y-6">
                  {resume.experience.map((exp, i) => (
                    <div key={i} className="pl-5 border-l-2 border-indigo-100 relative">
                      <div className="absolute w-2 h-2 rounded-full bg-indigo-650 -left-[5px] top-1.5" />
                      <p className="font-bold text-gray-900 dark:text-zinc-100 text-sm">{exp.role}</p>
                      <p className="text-xs text-gray-500 dark:text-zinc-500 font-medium mt-0.5">
                        {exp.company} &middot; {exp.duration}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* AI layer */}
        <div className="rf-reveal grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ animationDelay: "160ms" }}>
          <AiSuggestions resumeId={resume._id} />
          <ResumeChat resumeId={resume._id} />
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs tracking-[0.15em] uppercase mb-3 text-indigo-800 dark:text-indigo-400 font-mono font-bold">
      {children}
    </p>
  );
}