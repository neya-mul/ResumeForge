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
    <section className="relative h-[65vh] min-h-[500px] max-h-[700px] w-full bg-slate-950 flex items-center justify-center overflow-hidden border-b border-slate-900 px-4 sm:px-6 lg:px-8">
      
      {/* Interactive Background Grid Graphic */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />

      {/* Floating Ambient Light Orb */}
      <motion.div 
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute h-96 w-96 rounded-full bg-emerald-500/20 blur-[128px] top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
      />

      <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">
        
        {/* Animated Micro-Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-medium text-emerald-400 mb-6 backdrop-blur-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Next-Gen Agentic Workflows Active
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-100 leading-none"
        >
          Forge High-Performance <br />
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            AI-Driven Artifacts
          </span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base sm:text-lg text-slate-400 font-normal leading-relaxed"
        >
          Automate data processing, content generation, and contextual intelligence with an autonomous system designed to build structural items seamlessly.
        </motion.p>

        {/* Interactive CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <Link
            href="/items"
            className="rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/30 transition-all duration-200 hover:scale-[1.02]"
          >
            Explore Dashboard
          </Link>
          <Link
            href="/items/add"
            className="rounded-xl bg-slate-900 border border-slate-800 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition-all duration-200 hover:scale-[1.02]"
          >
            Deploy New Item
          </Link>
        </motion.div>

      </div>

      {/* Visual Directional Flow Element (Scroll Indicator) */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.1 }}
        className="absolute bottom-6 z-10 flex flex-col items-center gap-1 text-xs font-semibold text-slate-500 hover:text-emerald-400 transition-colors duration-200 cursor-pointer focus:outline-none"
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