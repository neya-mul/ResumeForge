'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    // 1. Form State Tracking
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    // 2. Generic Input Handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // 3. Simple Console Log Handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { data, error } = await authClient.signUp.email({
            name: formData.name, // required
            email: formData.email, // required
            password: formData.password, // required
            callbackURL: "/",
        });
        router.push('/login');
        await authClient.signOut();
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#F8F7FF]">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md space-y-8 p-8 rounded-2xl bg-white border border-gray-100 shadow-xl shadow-indigo-100/40"
            >
                <div>
                    <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-500">
                        Or{' '}
                        <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                            sign in to your existing dashboard
                        </Link>
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md">
                        <div>
                            <label htmlFor="name" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:bg-white text-sm transition-all"
                                placeholder="Alex Mercer"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:bg-white text-sm transition-all"
                                placeholder="alex@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:bg-white text-sm transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/35"
                        >
                            Log Data to Console
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}