'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const StatsSection = () => {
  const stats = [
    { value: '10,000+', label: 'Resumes Created' },
    { value: '99.4%', label: 'ATS Pass Rate' },
    { value: '4.5x', label: 'Average Build Speed Increase' },
    { value: '100%', label: 'Data Privacy Ownership' },
  ];

  return (
    <section className="py-16 bg-[#F8F7FF] dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-2 gap-8 md:grid-cols-4 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm backdrop-blur-sm"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-extrabold text-indigo-600 sm:text-4xl font-mono tracking-tight">
                {stat.value}
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};