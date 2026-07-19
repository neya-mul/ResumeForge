'use client';

import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const pillarVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

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
    <section className="py-20 bg-[#F8F7FF] dark:bg-zinc-950 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 mb-3">
            Project Overview
          </h2>
          <h3 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-100 sm:text-4xl" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Engineering the Future of <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Career Artifacts</span>
          </h3>
          <p className="mt-4 text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">
            ResumeForge AI is an advanced, full-stack conceptual workspace designed to transition professional portfolios out of legacy rich-text documents and into high-performance, machine-readable datasets.
          </p>
        </motion.div>

        {/* Dynamic Architectural Grid */}
        <motion.div 
          className="grid grid-cols-1 gap-8 lg:grid-cols-3 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {pillars.map((pillar, i) => (
            <motion.div 
              key={i} 
              variants={pillarVariants}
              className="relative rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-lg hover:shadow-indigo-100/30 dark:hover:shadow-indigo-900/30 transition-all duration-300"
            >
              <div className="text-xs font-mono font-semibold text-indigo-600/80 dark:text-indigo-400/80 uppercase tracking-wider mb-1">
                {pillar.subtitle}
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-zinc-100 mb-4">
                {pillar.title}
              </h4>
              <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack Blueprint Callout */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">
                System Blueprint Stack
              </h4>
              <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 max-w-xl">
                Engineered with end-to-end TypeScript using Next.js (App Router) on the presentation layer, backed by an Express/MongoDB REST core, and secured via Better Auth ecosystem structures.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'Express.js', 'MongoDB', 'Groq API', 'Tailwind CSS'].map((tech) => (
                <span 
                  key={tech} 
                  className="rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 px-3 py-1.5 text-xs font-mono text-gray-600 dark:text-zinc-300 hover:border-indigo-200 dark:hover:border-indigo-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutPage;