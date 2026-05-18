const steps = [
  {
    title: 'Find',
    description: 'We audit crawl access, robots.txt, sitemaps, feeds, and technical barriers that may prevent AI and search systems from reaching key pages.',
    icon: '01',
  },
  {
    title: 'Understand',
    description: 'We improve entity clarity, structured data, and page content so AI systems can better extract what you do, where you operate, and who you serve.',
    icon: '02',
  },
  {
    title: 'Trust',
    description: 'We strengthen reviews, citations, directory profiles, and NAP consistency so third-party sources corroborate your business information.',
    icon: '03',
  },
  {
    title: 'Recommend',
    description: 'We build recommendation-layer content, proof points, and objection handling that improve your chances of being included in commercially relevant AI answers.',
    icon: '04',
  },
];

const Methodology = () => {
  return (
    <section id="methodology-section" className="py-16 bg-dark-bg border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl text-left">
            <h2 className="text-neon-cyan font-mono text-xs font-black uppercase tracking-[0.4em] mb-4">// OUR METHODOLOGY</h2>
            <p className="text-[clamp(2rem,8vw,3.75rem)] sm:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
              THE PATH TO <br />
              <span className="text-transparent bg-clip-text vapor-gradient">AI VISIBILITY</span>
            </p>
          </div>
          <p className="max-w-md text-slate-500 text-sm font-medium leading-relaxed">
            A rigorous four-stage model designed to move businesses from digital obscurity to AI recommendation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div 
              key={step.title} 
              className="group glass-card p-10 relative overflow-hidden transition-all duration-500 hover:bg-white/10"
            >
              {/* Number background */}
              <div className="absolute -right-4 -top-8 text-white/5 text-[120px] font-black pointer-events-none group-hover:text-neon-cyan/10 transition-colors">
                {step.icon}
              </div>
              
              <div className="relative z-10">
                <div className="text-neon-cyan mb-8 font-mono text-sm font-bold tracking-widest uppercase">
                  Step {step.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
              
              {/* Animated bottom bar */}
              <div className="absolute bottom-0 left-0 h-1 bg-neon-cyan w-0 group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Methodology;
