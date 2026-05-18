const About = () => {
  return (
    <section id="about-section" className="py-16 bg-dark-bg overflow-hidden relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:flex lg:items-center lg:justify-between gap-20">
          <div className="lg:w-1/2">
            <h2 className="text-neon-cyan font-mono text-xs font-black uppercase tracking-[0.4em] mb-4">// ABOUT THE PRACTICE</h2>
            <p className="text-5xl font-black text-white uppercase tracking-tighter mb-8 leading-tight">
              LOCAL OFFICE. <br />
              <span className="text-neon-purple drop-shadow-[0_0_8px_rgba(255,0,229,0.3)]">GLOBAL SIGNAL.</span>
            </p>
            <p className="text-lg text-slate-400 leading-relaxed mb-12 font-medium">
              AI Visibility Services is a specialized consulting practice by Carder Creative serving Columbus, Ohio. We help mid-market businesses adapt to the shift from traditional search to AI-powered discovery through technical audits, content structure, trust signals, and honest measurement.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-8 bg-white/5 border-l-2 border-neon-cyan">
                <h4 className="text-white font-black uppercase tracking-widest text-xs mb-3">Honest Measurement</h4>
                <p className="text-slate-500 text-[11px] font-bold leading-relaxed uppercase">
                  We distinguish between confirmed and probable signals. No vague promises — just rigorous, observable data.
                </p>
              </div>
              
              <div className="p-8 bg-white/5 border-l-2 border-neon-purple">
                <h4 className="text-white font-black uppercase tracking-widest text-xs mb-3">Columbus Focus</h4>
                <p className="text-slate-500 text-[11px] font-bold leading-relaxed uppercase">
                  Strategies for the industries that drive Ohio: Insurance, Healthcare, and Professional Services.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 lg:mt-0 lg:w-5/12 relative">
            <div className="aspect-square glass-card rounded-none overflow-hidden shadow-2xl flex flex-col items-center justify-center p-12 text-center group">
               <div className="text-neon-cyan text-8xl font-black mb-4 group-hover:scale-110 transition-transform duration-500">6-10</div>
               <div className="text-xs font-black text-white uppercase tracking-[0.3em] mb-4">Weeks to Deploy</div>
               <div className="w-12 h-0.5 bg-neon-purple mb-4"></div>
               <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-loose">Typical timeline to deploy improvements <br /> and begin monitoring visibility signals.</p>
            </div>
            {/* Decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-neon-cyan/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-neon-purple/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
