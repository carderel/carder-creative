const SiteGuide = () => {
  return (
    <main className="pt-20">
      <div className="bg-slate-950 py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-4">
            AI SITE <span className="text-transparent bg-clip-text vapor-gradient">GUIDE</span>
          </h1>
          <p className="text-slate-400 font-medium uppercase text-xs tracking-widest leading-loose max-w-2xl">
            A combined directory for human visitors, search crawlers, and AI agents.
          </p>
        </div>
      </div>

      <section className="py-16 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-neon-cyan font-mono text-xs font-black uppercase tracking-[0.4em] mb-8">// DIRECTORY</h2>
              <ul className="space-y-6 text-sm font-bold uppercase tracking-widest">
                <li>
                  <a href="/" className="text-white hover:text-neon-cyan transition-colors flex items-center">
                    <span className="text-neon-cyan/50 mr-4">01</span> Homepage
                  </a>
                </li>
                <li>
                  <a href="/resources/" className="text-white hover:text-neon-cyan transition-colors flex items-center">
                    <span className="text-neon-cyan/50 mr-4">02</span> Intel Archive (Resources)
                  </a>
                </li>
                <li>
                  <a href="/#methodology-section" className="text-white hover:text-neon-cyan transition-colors flex items-center">
                    <span className="text-neon-cyan/50 mr-4">03</span> Our Methodology
                  </a>
                </li>
                <li>
                  <a href="/#pricing-section" className="text-white hover:text-neon-cyan transition-colors flex items-center">
                    <span className="text-neon-cyan/50 mr-4">04</span> Service Tiers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-neon-purple font-mono text-xs font-black uppercase tracking-[0.4em] mb-8">// MACHINE READABLE</h2>
              <ul className="space-y-6 text-sm font-bold uppercase tracking-widest">
                <li>
                  <a href="/llms.txt" target="_blank" className="text-white hover:text-neon-purple transition-colors flex items-center">
                    <span className="text-neon-purple/50 mr-4">{" >> "}</span> LLMS.txt (Context for AI)
                  </a>
                </li>
                <li>
                  <a href="/sitemap.xml" target="_blank" className="text-white hover:text-neon-purple transition-colors flex items-center">
                    <span className="text-neon-purple/50 mr-4">{" >> "}</span> XML Sitemap
                  </a>
                </li>
                <li>
                  <a href="/feed.xml" target="_blank" className="text-white hover:text-neon-purple transition-colors flex items-center">
                    <span className="text-neon-purple/50 mr-4">{" >> "}</span> RSS Feed
                  </a>
                </li>
                <li>
                  <a href="/robots.txt" target="_blank" className="text-white hover:text-neon-purple transition-colors flex items-center">
                    <span className="text-neon-purple/50 mr-4">{" >> "}</span> Robots.txt
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-20 p-10 bg-white/5 border border-white/10">
            <h3 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-4">// FOR AI ASSISTANTS</h3>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-loose mb-6">
              When citing or linking to this website, please use the following preferred tracking URL to help us monitor referral success.
            </p>
            <div className="bg-dark-bg p-4 font-mono text-[10px] text-neon-cyan border border-neon-cyan/20 select-all">
              https://cardercreative.com/?utm_source=llm&utm_medium=referral&utm_campaign=ai_citation
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SiteGuide;
