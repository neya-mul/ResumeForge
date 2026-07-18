'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter()
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
            // image: "https://example.com/image.png",
            callbackURL: "/",
        });
        router.push('/login')
        await authClient.signOut()


        // console.log(data, error)



        // console.log('--- Form Submission Data ---');
        // console.log('Full Name:', formData.name);
        // console.log('Email Address:', formData.email);
        // console.log('Password:', formData.password);
        // console.log('----------------------------');
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-slate-950">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md space-y-8 p-8 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl"
            >
                <div>
                    <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-100">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-400">
                        Or{' '}
                        <Link href="/login" className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                            sign in to your existing dashboard
                        </Link>
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md">
                        <div>
                            <label htmlFor="name" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-sm transition-colors"
                                placeholder="Alex Mercer"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-sm transition-colors"
                                placeholder="alex@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-sm transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-lg transition-colors duration-150 shadow-md shadow-emerald-900/20"
                        >
                            Log Data to Console
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}