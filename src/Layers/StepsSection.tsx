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

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export const StepsSection = () => {
  const steps = [
    { step: '01', title: 'Enter Your Details', desc: 'Fill in your professional information, work history, and skills into our guided form.' },
    { step: '02', title: 'Choose a Template', desc: 'Pick from our collection of modern, ATS-friendly templates designed for your industry.' },
    { step: '03', title: 'Enhance with AI', desc: 'Let our AI suggest improvements, optimize keywords, and refine your content.' },
    { step: '04', title: 'Download & Apply', desc: 'Export your polished resume as a PDF and start landing interviews.' },
  ];

  return (
    <section className="py-24 bg-white dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/50 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-400 mb-4">
            How It Works
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-100 sm:text-4xl" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Four Simple <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Steps</span> to Your Dream Resume
          </h2>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-4 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((item, i) => (
            <motion.div key={i} variants={stepVariants} className="relative flex flex-col items-start">
              {/* Step Number */}
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white font-bold text-sm mb-4 shadow-lg shadow-indigo-500/20">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-zinc-100 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
              
              {/* Connector Arrow */}
              {i < 3 && (
                <div className="hidden md:block absolute top-6 right-0 translate-x-1/2 text-indigo-300 text-xl">
                  →
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};