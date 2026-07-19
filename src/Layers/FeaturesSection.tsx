'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FileText, ShieldCheck, Download } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export const FeaturesSection = () => {
  const features = [
    {
      title: 'AI-Powered Assistance',
      description: 'Get smart suggestions to enhance your content and make your resume shine.',
      icon: Sparkles,
      color: 'from-indigo-500 to-violet-500',
      bg: 'bg-indigo-50',
    },
    {
      title: 'Professional Templates',
      description: 'Choose from modern, ATS-friendly templates designed to impress recruiters.',
      icon: FileText,
      color: 'from-violet-500 to-purple-500',
      bg: 'bg-violet-50',
    },
    {
      title: 'ATS Optimized',
      description: 'Built to pass Applicant Tracking Systems and get in front of more employers.',
      icon: ShieldCheck,
      color: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-50',
    },
    {
      title: 'Export & Share',
      description: 'Download in PDF or share a link instantly with recruiters.',
      icon: Download,
      color: 'from-pink-500 to-rose-500',
      bg: 'bg-pink-50',
    },
  ];

  return (
    <section id="features-section" className="py-24 bg-[#F8F7FF] dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center rounded-full border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-400 mb-4 shadow-sm">
            Powerful Features
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-100 sm:text-4xl" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Everything You Need to <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Stand Out</span>
          </h2>
          <p className="mt-4 text-gray-500 dark:text-zinc-400 text-base">
            Smart tools. Beautiful templates. Better opportunities.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              variants={cardVariants}
              className="group rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 transition-all duration-300 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-lg hover:shadow-indigo-100/50 dark:hover:shadow-indigo-900/30 hover:-translate-y-1"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg} transition-colors group-hover:bg-gradient-to-br group-hover:${feature.color}`}>
                <feature.icon className="h-6 w-6 text-indigo-600 group-hover:text-indigo-600 transition-colors" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-gray-900 dark:text-zinc-100">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};