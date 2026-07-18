export const StatsSection = () => {
  const stats = [
    { value: '< 200ms', label: 'Groq Generation Latency' },
    { value: '99.4%', label: 'ATS Parser Accuracy Match' },
    { value: '4.5x', label: 'Average Pipeline Build Speed' },
    { value: '100%', label: 'Data Schema Ownership' },
  ];

  return (
    <section className="py-16 border-b border-slate-900 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 rounded-xl border border-slate-900 bg-slate-900/10 p-8 backdrop-blur-sm">
          {stats.map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="text-3xl font-extrabold text-emerald-500 sm:text-4xl font-mono tracking-tight">
                {stat.value}
              </div>
              <div className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};