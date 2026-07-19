'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  // Simple scroll utility to move smoothly to the next content block
  const scrollToContent = () => {
    const nextSection = document.getElementById('features-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] w-full bg-gradient-to-b from-[#F8F7FF] via-[#EEF2FF] to-[#F8F7FF] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E0E7FF30_1px,transparent_1px),linear-gradient(to_bottom,#E0E7FF30_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Floating Ambient Light Orb - Indigo */}
      <motion.div 
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.22, 0.12]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute h-[500px] w-[500px] rounded-full bg-indigo-400/20 blur-[120px] top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
      />
      {/* Secondary violet orb */}
      <motion.div 
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.18, 0.08]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute h-[400px] w-[400px] rounded-full bg-violet-400/15 blur-[100px] bottom-1/4 right-1/4 pointer-events-none z-0"
      />

      <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">
        
        {/* Animated Micro-Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-4 py-1.5 text-xs font-semibold text-indigo-700 mb-8 backdrop-blur-sm shadow-sm"
        >
          <span className="text-base">✨</span>
          AI-Powered. Professionally Yours.
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Build Resumes <br />
          That <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">Get You Noticed</span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base sm:text-lg text-gray-500 font-normal leading-relaxed"
        >
          Create stunning resumes in minutes with AI-powered suggestions and professional templates designed to get you hired.
        </motion.p>

        {/* Interactive CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <Link
            href="/add-resume"
            className="group rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-3.5 text-sm font-semibold text-white hover:from-indigo-700 hover:to-violet-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-[1.02] flex items-center gap-2"
          >
            Create Your Resume
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <Link
            href="/brouse-resumes"
            className="rounded-full bg-white border border-gray-200 px-7 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 hover:scale-[1.02] shadow-sm"
          >
            View Templates
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex items-center gap-3"
        >
          <div className="flex -space-x-2">
            {['bg-indigo-400', 'bg-violet-400', 'bg-purple-400', 'bg-pink-400'].map((color, i) => (
              <div key={i} className={`w-8 h-8 rounded-full ${color} border-2 border-white flex items-center justify-center text-white text-[10px] font-bold`}>
                {['A', 'B', 'C', 'D'][i]}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Join <span className="font-bold text-gray-800">10,000+</span> job seekers who have<br className="sm:hidden" /> built better resumes with ResumeForge
          </p>
        </motion.div>

      </div>

      {/* Visual Directional Flow Element (Scroll Indicator) */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.1 }}
        className="absolute bottom-6 z-10 flex flex-col items-center gap-1 text-xs font-semibold text-gray-400 hover:text-indigo-600 transition-colors duration-200 cursor-pointer focus:outline-none"
      >
        <span>Discover Features</span>
        <motion.svg
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </motion.svg>
      </motion.button>

    </section>
  );
};