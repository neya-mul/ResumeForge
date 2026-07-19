'use client';

import React from 'react';
import Marquee from 'react-fast-marquee';

const TECH_STACK = [
  'Next.js 15',
  'TypeScript',
  'Tailwind CSS',
  'Express.js',
  'Native MongoDB',
  'ATS Parser v2',
  'Slate Design System',
  'Emerald Core Engine',
];

export default function TechMarquee() {
  return (
    <div className="relative w-full overflow-hidden bg-slate-950 border-y border-slate-900 py-4">
      {/* Visual edge gradients to fade the elements in and out nicely */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      {/* React Fast Marquee Engine */}
      <Marquee 
        speed={40} 
        gradient={false} 
        pauseOnHover={true}
      >
        <div className="flex gap-8 items-center pr-8">
          {TECH_STACK.map((tech, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-3 text-xs font-mono tracking-wider font-bold text-slate-400 uppercase select-none"
            >
              <span>{tech}</span>
              {/* Emerald Dot Matrix Separator */}
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 block" />
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
}