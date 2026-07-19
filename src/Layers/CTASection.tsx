'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const CTASection = () => {
  return (
    <section className="py-20 bg-[#F8F7FF] dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-16 text-center shadow-xl overflow-hidden"
        >
          {/* Subtle inner ambient light effect */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Build a Resume That Opens Doors
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-indigo-100 leading-relaxed">
              Join thousands of job seekers who have built better resumes and taken the next step in their career.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 relative">
              <Link
                href="/register"
                className="rounded-full bg-white px-6 py-3 text-sm font-bold text-indigo-600 shadow-md hover:bg-indigo-50 transition-all duration-200 hover:scale-[1.02]"
              >
                Get Started Free →
              </Link>
              
              {/* "It's free!" handdrawn text/arrow helper */}
              <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-2 pointer-events-none select-none">
                <svg className="w-10 h-6 text-indigo-200" fill="none" viewBox="0 0 40 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 2c5 5 10 10 20 12m0 0l-4-4m4 4l-4 4" />
                </svg>
                <span className="font-mono text-xs font-bold text-indigo-200 transform -rotate-6">It's free!</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};