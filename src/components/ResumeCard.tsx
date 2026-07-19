import Link from "next/link";
import React from "react";

interface Resume {
    _id: string;
    title: string;
    fullName: string;
    email: string;
    location?: string;
    skills?: string[];
}

interface ResumeCardProps {
    resume: Resume;
}

export default function ResumeCard({ resume }: ResumeCardProps) {
    return (
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 max-w-100 mx-auto w-full max-h-[400px] h-full">
            <h2 className="text-lg font-semibold text-emerald-400">
                {resume.title}
            </h2>

            <p className="text-sm text-slate-300">
                {resume.fullName} — {resume.email}
            </p>

            {resume.location && (
                <p className="text-xs text-slate-500">{resume.location}</p>
            )}

            {resume.skills && resume.skills.length > 0 && (
                <p className="text-xs text-slate-600 mt-2">
                    {resume.skills.join(" · ")}
                </p>
            )}
            <Link
                href={`/details/${resume._id}`}
                className="mt-4 inline-block rounded-md bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600 transition"
            >
                Details
            </Link>
        </div>
    );
}