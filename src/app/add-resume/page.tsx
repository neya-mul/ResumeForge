'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function AddResumePage() {
  const {data: session} = authClient.useSession()
  const user = session?.user
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State Structured for ResumeForge parsing
  const [formData, setFormData] = useState({
    title: 'My Engineering Resume',
    fullName: '',
    email: '',
    phoneNumber: '',
    location: '',
    website: '',
    summary: '',
    skills: '', // Comma separated string internally
    experience: [{ company: '', position: '', startDate: '', endDate: 'Present', description: '' }],
    education: [{ school: '', degree: '', graduationYear: '' }]
  });

  // Handle simple top-level fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Dynamic Array Handlers for Experience
  const handleExpChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updated = [...formData.experience];
    updated[index] = { ...updated[index], [e.target.name]: e.target.value };
    setFormData({ ...formData, experience: updated });
  };

  const addExperienceBlock = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { company: '', position: '', startDate: '', endDate: 'Present', description: '' }]
    });
  };

  // Dynamic Array Handlers for Education
  const handleEduChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = [...formData.education];
    updated[index] = { ...updated[index], [e.target.name]: e.target.value };
    setFormData({ ...formData, education: updated });
  };

  const addEducationBlock = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { school: '', degree: '', graduationYear: '' }]
    });
  };

  // Submission handler to backend Single-File Engine
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Transform clean payload
    const payload = {
      ...formData,
      userId: user?.id, // Replace with auth context session token later
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:5000'}/api/resumes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        // Correctly maps to the server's .json({ message }) error structure
        throw new Error(errData.message || 'Failed to sync record.');
      }


      console.log(response)
      // router.push('/my-resumes'); // Relocate user on successful pipeline submission
    } catch (err: any) {
      setError(err.message || 'Network connection interface error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Title Block */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-100">
            Forge New <span className="text-emerald-500">Resume Schema</span>
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Input structured data elements. Presentation layout compiles automatically for ATS target parsers.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/30 border border-red-900 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Metadata Section */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-emerald-400 mb-4 font-mono text-xs uppercase tracking-wider">01. Document Indexing</h2>
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase mb-2">Resume Configuration Title</label>
              <input 
                type="text" name="title" value={formData.title} onChange={handleInputChange} required
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm focus:outline-none focus:border-emerald-500 text-slate-100"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-emerald-400 mb-4 font-mono text-xs uppercase tracking-wider">02. Core Contact Block</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase mb-2">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm focus:outline-none focus:border-emerald-500 text-slate-100" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase mb-2">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm focus:outline-none focus:border-emerald-500 text-slate-100" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase mb-2">Phone Number</label>
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm focus:outline-none focus:border-emerald-500 text-slate-100" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase mb-2">Location (City, Country)</label>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm focus:outline-none focus:border-emerald-500 text-slate-100" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-medium text-slate-400 uppercase mb-2">Portfolio / Website Link</label>
              <input type="url" name="website" value={formData.website} onChange={handleInputChange} className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm focus:outline-none focus:border-emerald-500 text-slate-100" />
            </div>
          </div>

          {/* Professional Profile Summary */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-emerald-400 mb-4 font-mono text-xs uppercase tracking-wider">03. Executive Summary</h2>
            <textarea name="summary" value={formData.summary} onChange={handleInputChange} rows={4} className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm focus:outline-none focus:border-emerald-500 text-slate-100" placeholder="Briefly explain your executive engineering trajectory..." />
          </div>

          {/* Core Technical Capabilities */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-emerald-400 mb-4 font-mono text-xs uppercase tracking-wider">04. Technical Competencies Matrix</h2>
            <input type="text" name="skills" value={formData.skills} onChange={handleInputChange} className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-sm focus:outline-none focus:border-emerald-500 text-slate-100" placeholder="React, Node.js, TypeScript, Docker, Go" />
            <p className="text-xs text-slate-500 mt-2 font-mono">Delimit separate entities cleanly with commas.</p>
          </div>

          {/* Dynamic Experience Timeline */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-900 pb-2">
              <h2 className="text-lg font-semibold text-emerald-400 font-mono text-xs uppercase tracking-wider">05. Professional Experience Records</h2>
              <button type="button" onClick={addExperienceBlock} className="text-xs font-mono px-3 py-1 bg-slate-950 border border-slate-800 hover:border-emerald-500 rounded-lg text-emerald-400 transition-colors">
                + Add Record
              </button>
            </div>
            {formData.experience.map((exp, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 border-l-2 border-slate-900 pl-4 space-y-2 md:space-y-0">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Company Entity</label>
                  <input type="text" name="company" value={exp.company} onChange={(e) => handleExpChange(idx, e)} required className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-slate-100" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Functional Position Role</label>
                  <input type="text" name="position" value={exp.position} onChange={(e) => handleExpChange(idx, e)} required className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-slate-100" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Start Timeline String</label>
                  <input type="text" name="startDate" value={exp.startDate} placeholder="e.g. June 2022" onChange={(e) => handleExpChange(idx, e)} required className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-slate-100" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">End Timeline String</label>
                  <input type="text" name="endDate" value={exp.endDate} placeholder="Present" onChange={(e) => handleExpChange(idx, e)} className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-slate-100" />
                </div>
                <div className="md:col-span-2 mt-2">
                  <label className="block text-xs text-slate-400 mb-1">Core Deliverables & Contributions</label>
                  <textarea name="description" value={exp.description} onChange={(e) => handleExpChange(idx, e)} rows={3} required className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-slate-100" placeholder="Engineered high performance indexing services scaling optimization bounds by 40%..." />
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Academic Timeline */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-900 pb-2">
              <h2 className="text-lg font-semibold text-emerald-400 font-mono text-xs uppercase tracking-wider">06. Academic History Matrix</h2>
              <button type="button" onClick={addEducationBlock} className="text-xs font-mono px-3 py-1 bg-slate-950 border border-slate-800 hover:border-emerald-500 rounded-lg text-emerald-400 transition-colors">
                + Add Milestone
              </button>
            </div>
            {formData.education.map((edu, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 border-l-2 border-slate-900 pl-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Academic Institution</label>
                  <input type="text" name="school" value={edu.school} onChange={(e) => handleEduChange(idx, e)} required className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-slate-100" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Conferred Degree/Major</label>
                  <input type="text" name="degree" value={edu.degree} onChange={(e) => handleEduChange(idx, e)} required className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-slate-100" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Graduation Year</label>
                  <input type="text" name="graduationYear" value={edu.graduationYear} onChange={(e) => handleEduChange(idx, e)} required className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-slate-100" placeholder="e.g. 2025" />
                </div>
              </div>
            ))}
          </div>

          {/* Actions Bar */}
          <div className="flex justify-end pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="px-6 py-3 font-mono font-bold text-sm text-slate-950 bg-emerald-500 hover:bg-emerald-400 active:scale-95 transition-all rounded-xl disabled:opacity-50"
            >
              {loading ? 'SYNCING DATA ARTIFACTS...' : 'COMPILE & SAVE TO FORGE'}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}