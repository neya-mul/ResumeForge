'use client';

import React from 'react';

// Change this to a default export so Next.js can resolve the route page properly
const AboutPage = () => {
  const pillars = [
    {
      title: 'The Challenge',
      subtitle: 'Static Document Friction',
      description: 'Traditional word processors treat resumes as unstructured visual layouts. This leads to broken formatting, hours spent tweaking margins, and systemic failure when parsed by modern Applicant Tracking Systems (ATS).',
    },
    {
      title: 'The Architecture',
      subtitle: 'Schema-First Intelligence',
      description: 'ResumeForge AI addresses this by decoupling your professional data from the presentation layer. Built on a robust MongoDB document schema, your history remains structured, relational, and ready for mapping.',
    },
    {
      title: 'The AI Engine',
      subtitle: 'Sub-200ms Contextual Inference',
      description: 'Leveraging the Groq API running Llama models, the application provides instantaneous keyword optimization, semantic tailoring, and phrasing recommendations aligned precisely with specific job description vectors.',
    },
  ];

  return (
    <section className="py-20 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-500 mb-3">
            Project Overview
          </h2>
          <h3 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            Engineering the Future of <span className="text-emerald-500">Career Artifacts</span>
          </h3>
          <p className="mt-4 text-sm text-slate-400 leading-relaxed">
            ResumeForge AI is an advanced, full-stack conceptual workspace designed to transition professional portfolios out of legacy rich-text documents and into high-performance, machine-readable datasets.
          </p>
        </div>

        {/* Dynamic Architectural Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mb-16">
          {pillars.map((pillar, i) => (
            <div 
              key={i} 
              className="relative rounded-xl border border-slate-900 bg-slate-900/10 p-8 hover:border-slate-800 transition-colors"
            >
              <div className="text-xs font-mono font-semibold text-emerald-500/80 uppercase tracking-wider mb-1">
                {pillar.subtitle}
              </div>
              <h4 className="text-xl font-bold text-slate-200 mb-4">
                {pillar.title}
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tech Stack Blueprint Callout */}
        <div className="rounded-xl border border-slate-900 bg-slate-900/20 p-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-semibold text-slate-200">
                System Blueprint Stack
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                Engineered with end-to-end TypeScript using Next.js (App Router) on the presentation layer, backed by an Express/MongoDB REST core, and secured via Better Auth ecosystem structures.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'Express.js', 'MongoDB', 'Groq API', 'Tailwind CSS'].map((tech) => (
                <span 
                  key={tech} 
                  className="rounded-md border border-slate-800 bg-slate-950 px-3 py-1 text-xs font-mono text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutPage;