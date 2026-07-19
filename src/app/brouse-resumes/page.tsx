import ResumeCard from '@/components/ResumeCard';
import ResumeFilters from '@/components/ResumeFilters';
import React from 'react';

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
            <div className="min-h-screen bg-[#F8F7FF] text-gray-900 p-8 flex items-center justify-center">
                <div className="p-6 rounded-2xl bg-white border border-red-100 shadow-sm text-center max-w-md">
                    <p className="text-red-500 font-semibold mb-2">Failed to load resumes</p>
                    <p className="text-sm text-gray-500">Check that the backend is running and reachable.</p>
                </div>
            </div>
        );
    }

    const { resumes, totalPages, page: currentPage, total }: ResumesResponse = await res.json();

    return (
        <div className="min-h-screen bg-[#F8F7FF] text-gray-900 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        All Resumes
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">{total} record{total === 1 ? '' : 's'} compiled</p>
                </div>

                <ResumeFilters totalPages={totalPages} currentPage={currentPage} />

                {resumes.length === 0 ? (
                    <div className="text-center py-16 bg-white border border-gray-150 rounded-2xl">
                        <p className="text-gray-400">No resumes found matching your filter criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {resumes.map((resume) => (
                            <ResumeCard
                                key={resume._id}
                                resume={resume}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}