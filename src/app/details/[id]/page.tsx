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
      <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C]">
        <p className="text-lg text-slate-400">This resume couldn't be found.</p>
      </div>
    );
  }

  const data = await res.json();
  const resume: Resume = data.resume;

  return (
    <div className="min-h-screen py-16 px-6 bg-[#0A0F1C]">
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
          <p className="text-xs tracking-[0.2em] uppercase mb-2 text-emerald-400 font-mono">
            Candidate Profile
          </p>
          <h1 className="text-4xl font-bold mb-1 text-white">{resume.fullName}</h1>
          <p className="text-lg font-medium text-emerald-400">{resume.title}</p>
        </div>

        {/* Document grid */}
        <div
          className="rf-reveal grid grid-cols-1 md:grid-cols-[280px_1fr] rounded-lg overflow-hidden mb-8 border border-white/10"
          style={{ animationDelay: "80ms", background: "#0F172A" }}
        >
          {/* Sidebar */}
          <div className="p-8 space-y-8 bg-white/[0.02] border-b md:border-b-0 md:border-r border-white/10">
            <div>
              <SectionLabel>Contact</SectionLabel>
              <div className="space-y-1.5 text-sm text-slate-300">
                <p>{resume.location}</p>
                <p className="break-words">{resume.email}</p>
                <p>{resume.phoneNumber}</p>
                {resume.website && (
                  
                 <a   href={resume.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block underline underline-offset-2 text-slate-300 hover:text-emerald-400 transition-colors"
                  >
                    {resume.website}
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
                      className="px-3 py-1 text-xs rounded-md font-mono text-emerald-300 bg-emerald-400/10 border border-emerald-400/20 transition-transform hover:-translate-y-0.5"
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
                        <p className="text-sm font-semibold text-white">{edu.degree}</p>
                      )}
                      <p className="text-xs text-slate-400">
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
                <p className="leading-relaxed text-slate-200">{resume.summary}</p>
              </div>
            )}

            {resume.experience?.length > 0 && (
              <div>
                <SectionLabel>Experience</SectionLabel>
                <div className="space-y-5">
                  {resume.experience.map((exp, i) => (
                    <div key={i} className="pl-4 border-l-2 border-white/10">
                      <p className="font-semibold text-white">{exp.role}</p>
                      <p className="text-sm text-slate-400">
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
    <p className="text-xs tracking-[0.15em] uppercase mb-3 text-slate-400 font-mono">
      {children}
    </p>
  );
}