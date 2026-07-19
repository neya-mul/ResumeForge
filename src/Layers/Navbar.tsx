'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { authClient } from '@/lib/auth-client';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // 1. Fetch live session data from Better Auth
  const { data: session, isPending } = authClient.useSession();

  // Explicitly derive boolean flags from live auth state
  const isLoggedIn = !!session;
  const user = session?.user;
  // console.log(user)

  // Close the mobile drawer automatically whenever the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Track scroll for navbar background effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Exact routes matching your specifications
  const loggedOutRoutes = [
    { name: 'Home', path: '/' },
    { name: 'Browse Resumes', path: '/brouse-resumes' },
    { name: 'About', path: '/about' },
  ];

  const loggedInRoutes = [
    { name: 'Home', path: '/' },
    { name: 'Browse Resumes', path: '/brouse-resumes' },
    { name: 'Add Resume', path: '/add-resume' },
    { name: 'My Resumes', path: '/my-resume' },
    { name: 'About', path: '/about' },
  ];

  const activeRoutes = isLoggedIn ? loggedInRoutes : loggedOutRoutes;

  // 3. Complete Better Auth Sign Out Handler
  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setIsOpen(false);
            router.push('/login'); // Imperatively route to your login screen
          },
        },
      });
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <nav className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${scrolled ? 'bg-white/90 border-gray-200 shadow-sm' : 'bg-white/70 border-transparent'} backdrop-blur-xl`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
              R
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Resume<span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Forge</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {activeRoutes.map((route) => {
              const isActive = pathname === route.path;
              return (
                <Link
                  key={route.path}
                  href={route.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${isActive ? 'text-indigo-700' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="bubble"
                      className="absolute inset-0 z-0 bg-indigo-50 rounded-lg"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{route.name}</span>
                </Link>
              );
            })}

            {/* Dynamic Auth Status Area */}
            <div className="ml-4 flex items-center space-x-4 border-l border-gray-200 pl-4 min-w-[140px] justify-end">
              {isPending ? (
                // Clean loading skeleton to match typography metrics
                <div className="h-8 w-8 animate-pulse rounded-full bg-indigo-100" />
              ) : isLoggedIn && user ? (
                <div className="flex items-center space-x-3">
                  {/* User profile info */}
                  <div className="flex flex-col items-end text-right">
                    <span className="text-xs font-semibold text-gray-800 line-clamp-1 max-w-[125px]">
                      {user.name}
                    </span>
                    <span className="text-[10px] font-medium text-indigo-600 uppercase tracking-wider">
                      Author
                    </span>
                  </div>

                  {/* Profile image avatar circle */}
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="h-8 w-8 rounded-full border-2 border-indigo-100 object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full border-2 border-indigo-100 bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-xs text-white select-none">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}

                  <button
                    onClick={handleLogout}
                    className="rounded-lg bg-gray-50 border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2 text-sm font-semibold text-white hover:from-indigo-700 hover:to-violet-700 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-200"
                  >
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-3">
            {/* Compact avatar shown next to the hamburger on mobile when logged in */}
            {!isPending && isLoggedIn && user && (
              user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-8 w-8 rounded-full border-2 border-indigo-100 object-cover"
                />
              ) : (
                <div className="h-8 w-8 rounded-full border-2 border-indigo-100 bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-xs text-white select-none">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              )
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`h-6 w-6 transform transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-2 overflow-hidden"
          >
            {isLoggedIn && user && (
              <div className="flex items-center space-x-3 px-3 py-2 bg-indigo-50/60 rounded-lg mb-2 border border-indigo-100">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="h-9 w-9 rounded-full object-cover" />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-xs text-white">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-800">{user.name}</span>
                  <span className="text-xs text-gray-500">{user.email}</span>
                </div>
              </div>
            )}

            {activeRoutes.map((route) => {
              const isActive = pathname === route.path;
              return (
                <Link
                  key={route.path}
                  href={route.path}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {route.name}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-center rounded-lg bg-gray-50 border border-gray-200 px-4 py-2.5 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center rounded-lg bg-gray-50 border border-gray-200 px-4 py-2.5 text-base font-medium text-gray-600"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-base font-semibold text-white shadow-md"
                  >
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};