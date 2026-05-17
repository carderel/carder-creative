const tiers = [
  {
    name: 'Tier 1: Audit & Baseline',
    price: '$3,500 – $6,500',
    duration: '2–3 weeks',
    description: 'Comprehensive audit identifying where AI systems struggle to find, understand, or recommend your business.',
    features: [
      'Discovery and access audit',
      'Entity & content understanding',
      'Structured data (Schema) review',
      'Trust & corroboration analysis',
      'Recommendation strength test',
      'AI prompt visibility sampling',
      'Prioritized Gap Report',
    ],
    cta: 'Book Audit',
  },
  {
    name: 'Tier 2: Implementation',
    price: '$6,000 – $15,000',
    duration: '6–10 weeks',
    description: 'Targeted implementation of audit recommendations across six critical workstreams.',
    features: [
      'On-page content improvements',
      'Technical discovery (robots/sitemaps)',
      'Website Guide & /llms.txt',
      'JSON-LD Structured Data fixes',
      'Citation cleanup (GBP, Bing, Apple)',
      'Objection handling & proof points',
      'Entity signal synchronization',
    ],
    cta: 'Start Implementation',
    highlighted: true,
  },
  {
    name: 'Tier 3: Monitoring Retainer',
    price: '$1,500 – $3,500',
    duration: 'Monthly',
    description: 'A monthly engagement to monitor confirmed and probable AI visibility signals over time.',
    features: [
      'Confirmed AI referral tracking',
      'AI crawler activity monitoring',
      'Monthly synthetic prompt re-runs',
      'Citation drift & NAP monitoring',
      'Competitive comparison reporting',
      'Monthly strategic recommendation',
      'GA4 custom AI channel setup',
    ],
    cta: 'Subscribe',
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Service Tiers</h2>
          <p className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Clear, Productized Solutions
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Choose the level of support your business needs to establish and maintain AI visibility.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={`flex flex-col rounded-3xl p-8 transition-all duration-200 h-full ${
                tier.highlighted 
                ? 'bg-slate-900 text-white ring-4 ring-blue-600/20 scale-105 z-10' 
                : 'bg-white text-slate-900 border border-gray-200'
              }`}
            >
              <div className="mb-8">
                <h3 className={`text-xl font-bold ${tier.highlighted ? 'text-white' : 'text-slate-900'}`}>
                  {tier.name}
                </h3>
                <p className={`mt-4 text-3xl font-extrabold ${tier.highlighted ? 'text-white' : 'text-slate-900'}`}>
                  {tier.price}
                </p>
                <p className={`mt-2 text-sm font-medium ${tier.highlighted ? 'text-slate-400' : 'text-gray-500'}`}>
                  {tier.duration}
                </p>
                <p className={`mt-6 text-sm leading-relaxed ${tier.highlighted ? 'text-slate-300' : 'text-gray-600'}`}>
                  {tier.description}
                </p>
              </div>
              
              <ul className="flex-1 space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start text-sm">
                    <svg className={`flex-shrink-0 w-5 h-5 ${tier.highlighted ? 'text-blue-400' : 'text-blue-600'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-3 leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a
                href="#diagnostic"
                className={`w-full py-3 px-6 rounded-xl text-center font-bold transition-colors mt-auto ${
                  tier.highlighted 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            All engagements include a <span className="text-slate-900 font-semibold italic">founding client</span> discount for our first five partners.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
