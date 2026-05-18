const tiers = [
  {
    name: 'AI Visibility Audit',
    price: '$3,500',
    duration: '2-3 WEEKS',
    features: [
      'Discovery access audit',
      'Entity clarity check',
      'Structured data review',
      'Trust & corroboration',
      'Gap report (PDF)',
    ],
    cta: 'Schedule Audit',
  },
  {
    name: 'Strategic Implementation',
    price: '$8,000',
    duration: '6-10 WEEKS',
    description: 'Targeted execution across six critical workstreams.',
    features: [
      'On-page optimizations',
      'Sitemap/Robots repairs',
      'Schema deployment',
      'Citation cleanup',
      'Objection handling copy',
    ],
    cta: 'Start Implementation',
    highlighted: true,
  },
  {
    name: 'Ongoing Monitoring',
    price: '$2,500',
    duration: 'MONTHLY',
    features: [
      'AI referral tracking',
      'Crawler activity monitor',
      'Synthetic prompt runs',
      'Citation drift alerts',
      'Monthly strategy report',
    ],
    cta: 'Subscribe',
  },
];

const Pricing = () => {
  return (
    <section id="pricing-section" className="py-16 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-neon-purple font-mono text-xs font-black uppercase tracking-[0.4em] mb-4">// SERVICE TIERS</h2>
          <p className="text-5xl font-black text-white uppercase tracking-tighter">
            SCALED <span className="text-neon-cyan neon-text">SOLUTIONS</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-white/10">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={`flex flex-col p-12 transition-all duration-300 ${
                tier.highlighted 
                ? 'bg-white text-dark-bg ring-4 ring-neon-cyan z-10 -my-4 lg:my-0 lg:-mx-2' 
                : 'bg-transparent text-slate-400 hover:bg-white/5 border-x border-white/5'
              }`}
            >
              <div className="mb-12">
                <h3 className={`font-mono text-xs font-black uppercase tracking-widest mb-6 ${tier.highlighted ? 'text-dark-bg' : 'text-neon-cyan'}`}>
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className={`text-5xl font-black ${tier.highlighted ? 'text-dark-bg' : 'text-white'}`}>
                    {tier.price}
                  </span>
                  <span className="text-xs font-bold uppercase opacity-50">/ Project</span>
                </div>
                <p className="mt-4 text-[10px] font-black uppercase tracking-widest opacity-60">
                  Estimated Timeline: {tier.duration}
                </p>
              </div>
              
              <ul className="flex-1 space-y-5 mb-16">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center text-xs font-bold uppercase tracking-tight">
                    <div className={`w-1.5 h-1.5 mr-3 ${tier.highlighted ? 'bg-dark-bg' : 'bg-neon-cyan shadow-[0_0_5px_#00f2ff]'}`}></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <a
                href="#diagnostic"
                className={`w-full py-5 px-8 font-black uppercase tracking-[0.2em] text-xs text-center transition-all ${
                  tier.highlighted 
                  ? 'bg-dark-bg text-white hover:bg-neon-cyan hover:text-dark-bg' 
                  : 'bg-transparent border border-white/20 text-white hover:border-neon-cyan hover:text-neon-cyan'
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
