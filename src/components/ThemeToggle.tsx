'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 animate-pulse" />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gray-50 hover:bg-gray-150 border border-gray-200 text-gray-500 hover:text-gray-900 transition-colors focus:outline-none dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0, scale: theme === 'dark' ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute flex items-center justify-center"
      >
        <Sun className="w-5 h-5" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : -180, scale: theme === 'dark' ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute flex items-center justify-center"
      >
        <Moon className="w-5 h-5" />
      </motion.div>
    </motion.button>
  );
};
