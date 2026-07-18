import Link from 'next/link';

export const CTASection = () => {
  return (
    <section className="py-24 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-xl border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-8 py-16 text-center shadow-2xl overflow-hidden">
          {/* Subtle inner ambient grid light effect */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
              Ready to Upgrade Your <span className="text-emerald-500">Career Stack?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-slate-400 leading-relaxed">
              Create structured resume files backed by smart context alignment. Start tracking tailored variants effortlessly.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                href="/register"
                className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-900/20 hover:bg-emerald-500 transition-colors"
              >
                Get Started Free
              </Link>
              <Link
                href="/resumes"
                className="rounded-lg bg-slate-900 border border-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition-colors"
              >
                Browse Templates
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};