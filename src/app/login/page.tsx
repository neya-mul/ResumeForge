'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter();
    // 1. Core State Tracking
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // 2. Generic Input Handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // 3. Demo Credentials Auto-Fill Hook
    const handleDemoFill = () => {
        setFormData({
            email: 'demo.developer@resume-forge.ai',
            password: 'SecureDemoPassword2026',
        });
        console.log('💡 Demo credentials injected into state.');
    };

    // 4. Submission Console Output
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { data, error } = await authClient.signIn.email({
            email: formData.email,
            password: formData.password,
            callbackURL: "/",
        });

        if (error) {
            toast.error(error.message || 'Login failed. Please try again.');
            return;
        }

        router.push('/');
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#F8F7FF] dark:bg-zinc-950">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md space-y-8 p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-xl shadow-indigo-100/40 dark:shadow-zinc-900/80"
            >
                <div>
                    <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-100" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-500 dark:text-zinc-400">
                        Or{' '}
                        <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                            create a new workspace profile
                        </Link>
                    </p>
                </div>

                {/* Demo Helper Action */}
                {/* <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 rounded-xl flex items-center justify-between">
                    <div className="text-xs text-gray-600 dark:text-zinc-400">
                        <span className="font-bold text-indigo-700 dark:text-indigo-400 block mb-0.5">Presentation Mode</span>
                        Quickly load sample profile credentials.
                    </div>
                    <button
                        type="button"
                        onClick={handleDemoFill}
                        className="text-xs font-semibold px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm"
                    >
                        Auto-Fill
                    </button>
                </div> */}

                <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md">
                        <div>
                            <label htmlFor="email" className="block text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-700 text-sm transition-all"
                                placeholder="alex@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-700 text-sm transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/35"
                        >
                            Sign In & Log Data
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}