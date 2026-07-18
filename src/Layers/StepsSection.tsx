export const StepsSection = () => {
  const steps = [
    { step: '01', title: 'Input Baseline Data', desc: 'Paste your current profile information or markdown template into the dashboard interface.' },
    { step: '02', title: 'Target Target Job', desc: 'Drop the target role requirements to hook up contextual AI relevance vectors.' },
    { step: '03', title: 'Refine & Polish', desc: 'Review alternative metrics and instantly approve system recommendations.' },
    { step: '04', title: 'Deploy Artifact', desc: 'Generate standard schema JSON or compile a production-ready export.' },
  ];

  return (
    <section className="py-20 border-b border-slate-900 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            The <span className="text-emerald-500">Forge Pipelines</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 relative">
          {steps.map((item, i) => (
            <div key={i} className="relative flex flex-col items-start">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-500 mb-2">
                Phase {item.step}
              </div>
              <h3 className="text-xl font-semibold text-slate-200 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              
              {i < 3 && (
                <div className="hidden md:block absolute top-2 right-4 translate-x-1/2 text-slate-800 font-mono text-xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};