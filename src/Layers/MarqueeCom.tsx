'use client';

import React from 'react';
import Marquee from 'react-fast-marquee';

const RESUME_HIGHLIGHTS = [
  'AI-Powered Writing',
  'ATS Optimized',
  'Professional Templates',
  'Smart Suggestions',
  'PDF Export',
  'One-Click Formatting',
  'Keyword Analysis',
  'Industry Standards',
];

export default function TechMarquee() {
  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-zinc-900 border-y border-gray-100 dark:border-zinc-800 py-4">
      {/* Visual edge gradients to fade the elements in and out nicely */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-zinc-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent z-10 pointer-events-none" />

      {/* React Fast Marquee Engine */}
      <Marquee 
        speed={40} 
        gradient={false} 
        pauseOnHover={true}
      >
        <div className="flex gap-8 items-center pr-8">
          {RESUME_HIGHLIGHTS.map((tech, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-3 text-xs font-semibold tracking-wider text-gray-400 dark:text-zinc-600 uppercase select-none"
            >
              <span>{tech}</span>
              {/* Indigo Dot Separator */}
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/60 block" />
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
}