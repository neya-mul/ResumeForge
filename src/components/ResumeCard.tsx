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
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-5 w-full shadow-sm hover:shadow-md hover:border-indigo-150 dark:hover:border-indigo-700 transition-all flex flex-col justify-between h-full">
            <div>
                <h2 className="text-lg font-bold text-indigo-700 leading-snug line-clamp-1 mb-1">
                    {resume.title}
                </h2>

                <p className="text-sm font-semibold text-gray-800 dark:text-zinc-200 leading-tight">
                    {resume.fullName}
                </p>
                <p className="text-xs text-gray-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                    {resume.email}
                </p>

                {resume.location && (
                    <p className="text-xs text-gray-400 dark:text-zinc-500 font-medium mt-1.5 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {resume.location}
                    </p>
                )}

                {resume.skills && resume.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-4">
                        {resume.skills.slice(0, 4).map((skill, index) => (
                            <span key={index} className="text-[10px] font-mono px-2 py-0.5 bg-indigo-50 border border-indigo-100/50 text-indigo-600 rounded-md">
                                {skill}
                            </span>
                        ))}
                        {resume.skills.length > 4 && (
                            <span className="text-[10px] font-mono px-2 py-0.5 bg-gray-50 text-gray-400 rounded-md">
                                +{resume.skills.length - 4} more
                            </span>
                        )}
                    </div>
                )}
            </div>
            
            <Link
                href={`/details/${resume._id}`}
                className="mt-6 w-full text-center inline-block rounded-xl bg-indigo-650 px-4 py-2.5 text-xs bg-indigo-600 font-bold text-white hover:bg-indigo-700 transition shadow-sm hover:shadow shadow-indigo-200"
            >
                View Details
            </Link>
        </div>
    );
}