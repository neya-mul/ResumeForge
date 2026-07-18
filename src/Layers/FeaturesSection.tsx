import React from 'react';

export const FeaturesSection = () => {
  const features = [
    {
      title: 'AI-Powered Tailoring',
      description: 'Instantly align your resume sentences with specific job descriptions using targeted Groq LLM optimization.',
      icon: '⚡',
    },
    {
      title: 'ATS-Friendly Formatting',
      description: 'Clean, parseable templates designed strictly against industry tracking standards to maximize callback rates.',
      icon: '🎯',
    },
    {
      title: 'Dynamic Recommendations',
      description: 'Get real-time contextual improvements and alternative wording metrics directly inside the workspace.',
      icon: '📊',
    },
    {
      title: 'Instant Markdown/PDF Export',
      description: 'Export structured, pixel-perfect documents ready to submit to high-performance tech roles.',
      icon: '📂',
    },
  ];

  return (
    <section className="py-20 border-b border-slate-900 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            Built for Modern <span className="text-emerald-500">Engineering Workflows</span>
          </h2>
          <p className="mt-4 text-slate-400">
            Stop fighting word processors. Use a structured, schema-driven environment backed by smart contextual intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="group rounded-xl border border-slate-900 bg-slate-900/20 p-6 transition-all duration-300 hover:border-slate-800 hover:bg-slate-900/40"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-lg group-hover:border-emerald-500/30 group-hover:bg-emerald-950/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-200">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};