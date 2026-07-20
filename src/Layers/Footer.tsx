'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Add Resume', path: '/add-resume' },
    { name: 'Browse Resumes', path: '/brouse-resumes' },
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/neya-mul' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/neya-mul/' },
  ];

  return (
    <footer className="w-full bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800 text-gray-500 dark:text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand Column */}
          <div className="md:col-span-2 flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-7 w-7 rounded-md bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center font-bold text-white text-sm shadow-sm">
                R
              </div>
              <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-zinc-100">
                Resume<span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Forge</span>
              </span>
            </Link>
            <p className="text-sm max-w-sm text-gray-500 leading-relaxed">
              Create stunning, professional, and ATS-optimized resumes in minutes with AI-powered suggestions designed to get you hired.
            </p>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 dark:text-zinc-200 uppercase tracking-wider mb-4">Connect</h4>
            <ul className="space-y-2.5">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  
                  <a  href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm hover:text-indigo-600 transition-colors duration-150"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Company Info */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 dark:text-zinc-200 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 mb-4">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="text-sm hover:text-indigo-600 transition-colors duration-150">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-2 border-t border-gray-100 dark:border-zinc-800 text-xs space-y-1 text-gray-400 dark:text-zinc-500">
              <p>Email: neyamulislam946@gmail.com</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 dark:text-zinc-500">
          <p>&copy; {currentYear} ResumeForge. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="https://github.com/neya-mul" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">GitHub</a>
            {/* <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">X (Twitter)</a> */}
            <a href="https://www.linkedin.com/in/neya-mul/" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}