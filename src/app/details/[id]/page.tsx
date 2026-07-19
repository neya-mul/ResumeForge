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
      <div className="max-w-2xl mx-auto p-6 text-center text-gray-500">
        Resume not found.
      </div>
    );
  }

  const data = await res.json();
  const resume: Resume = data.resume;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="border-b pb-6 mb-6">
        <h1 className="text-3xl font-bold">{resume.fullName}</h1>
        <p className="text-lg text-indigo-600 font-medium">{resume.title}</p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-gray-600">
          <span>{resume.location}</span>
          <span>{resume.email}</span>
          <span>{resume.phoneNumber}</span>
          {resume.website && (

            <a href={resume.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline"
            >
              {resume.website}
            </a>
          )}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Summary</h2>
          <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
        </section>
      )}

      {/* Skills */}
      {resume.skills?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {resume.experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Experience</h2>
          <div className="space-y-4">
            {resume.experience.map((exp, i) => (
              <div key={i} className="border-l-2 border-indigo-200 pl-4">
                <p className="font-medium">{exp.role}</p>
                <p className="text-gray-600 text-sm">
                  {exp.company} · {exp.duration}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {resume.education?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Education</h2>
          <div className="space-y-4">
            {resume.education.map((edu, i) => (
              <div key={i} className="border-l-2 border-gray-200 pl-4">
                {edu.degree && <p className="font-medium">{edu.degree}</p>}
                <p className="text-gray-600 text-sm">
                  {edu.institution}
                  {edu.duration ? ` · ${edu.duration}` : ""}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* AI Suggestions */}
      <section className="border-t pt-6">
        <h2 className="text-lg font-semibold mb-3">AI Resume Review</h2>
        <AiSuggestions resumeId={resume._id} />
      </section>

      {/* Chatbot */}
      <section className="border-t pt-6 mt-6">
        <h2 className="text-lg font-semibold mb-3">Ask About This Resume</h2>
        <ResumeChat resumeId={resume._id} />
      </section>
    </div>
  );
}