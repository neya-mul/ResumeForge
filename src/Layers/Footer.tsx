'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact Sales', path: '/contact' },
    { name: 'Help & Support', path: '/support' },
  ];

  const resourceLinks = [
    { name: 'Explore Items', path: '/items' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ];

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-900 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="md:col-span-2 flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-7 w-7 rounded-md bg-emerald-600 flex items-center justify-center font-bold text-white text-sm shadow-sm">
                A
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-100">
                Agentic<span className="text-emerald-500">App</span>
              </span>
            </Link>
            <p className="text-sm max-w-sm text-slate-400 leading-relaxed">
              Empowering developers and businesses with enterprise-grade autonomous pipelines, real-time contextual systems, and deterministic AI execution.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="text-sm hover:text-emerald-400 transition-colors duration-150">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Company Info */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 mb-4">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="text-sm hover:text-emerald-400 transition-colors duration-150">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-2 border-t border-slate-900/60 text-xs space-y-1 text-slate-500">
              <p>Email: systems@agenticapp.internal</p>
              <p>HQ: San Francisco, CA</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {currentYear} AgenticApp Corporation. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">GitHub</a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">X (Twitter)</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};