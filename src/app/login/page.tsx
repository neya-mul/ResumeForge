'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function LoginPage() {
    const router = useRouter()
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
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();


        const { data, error } = await authClient.signIn.email({
            // name: formData.name, // required
            email: formData.email, // required
            password: formData.password, // required
            // image: "https://example.com/image.png",
            callbackURL: "/",
        });
        router.push('/')

        console.log(data, error)

        // console.log('--- Login Form Submission Data ---');
        // console.log('Email Address:', formData.email);
        // console.log('Password Hash (Raw String):', formData.password);
        // console.log('----------------------------------');
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
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-400">
                        Or{' '}
                        <Link href="/register" className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                            create a new workspace profile
                        </Link>
                    </p>
                </div>

                {/* Demo Helper Action */}
                <div className="p-3.5 bg-emerald-950/40 border border-emerald-800/60 rounded-lg flex items-center justify-between">
                    <div className="text-xs text-slate-300">
                        <span className="font-bold text-emerald-400 block mb-0.5">Presentation Mode</span>
                        Quickly load sample profile credentials.
                    </div>
                    <button
                        type="button"
                        onClick={handleDemoFill}
                        className="text-xs font-semibold px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded transition-colors"
                    >
                        Auto-Fill
                    </button>
                </div>

                <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md">
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
                            Sign In & Log Data
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}