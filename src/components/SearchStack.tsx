import React from 'react';
import { Link } from 'react-router-dom';

interface SearchStackProps {
  onOpenDiagnostic: () => void;
}

const SearchStack: React.FC<SearchStackProps> = ({ onOpenDiagnostic }) => {
  const services = [
    {
      title: 'AI VISIBILITY',
      subtitle: 'Make your business easier for AI systems to find, understand, verify, and recommend.',
      bullets: [
        'AI visibility audits',
        'Entity clarity and content structure',
        'Citation and trust signal review',
        'AI referral and visibility monitoring',
      ],
      ctaText: 'VIEW AI VISIBILITY SERVICES',
      ctaLink: '#pricing-section',
      highlighted: true,
    },
    {
      title: 'SEO SERVICES',
      subtitle: 'Strengthen the organic search foundation that supports both traditional search and AI-powered discovery.',
      bullets: [
        'Technical SEO audits',
        'Local SEO and entity consistency',
        'Metadata, schema, and internal linking',
        'Content structure and page-level improvements',
      ],
      ctaText: 'DISCUSS SEO SUPPORT',
      ctaLink: '#diagnostic-section',
    },
    {
      title: 'PPC SERVICES',
      subtitle: 'Capture high-intent demand while organic search and AI visibility mature.',
      bullets: [
        'Google Ads strategy and management',
        'Search query and intent analysis',
        'Conversion tracking review',
        'Landing page alignment',
      ],
      ctaText: 'DISCUSS PPC SUPPORT',
      ctaLink: '#diagnostic-section',
    },
  ];

  return (
    <section id="search-stack-section" className="py-16 bg-dark-bg border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h2 className="text-neon-cyan font-mono text-xs font-black uppercase tracking-[0.4em] mb-4">// SEARCH INFRASTRUCTURE</h2>
          <p className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-6">
            AI DISCOVERY. <br />
            <span className="text-transparent bg-clip-text vapor-gradient">ORGANIC SEARCH. PAID DEMAND.</span>
          </p>
          <p className="text-slate-400 text-sm font-medium leading-relaxed tracking-wide">
            AI visibility does not exist in isolation. The same foundations that help AI systems find, understand, and trust a business also support traditional SEO, paid search, and conversion tracking. Carder Creative supports the full search stack through AI Visibility, SEO, and PPC services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div 
              key={service.title}
              className={`group p-8 border transition-all duration-300 flex flex-col h-full ${
                service.highlighted 
                ? 'bg-white/5 border-neon-cyan shadow-[0_0_20px_rgba(0,242,255,0.1)]' 
                : 'bg-transparent border-white/10 hover:border-white/20'
              }`}
            >
              <div className="mb-8">
                <h3 className={`text-xl font-black uppercase tracking-tight mb-3 ${service.highlighted ? 'text-neon-cyan' : 'text-white'}`}>
                  {service.title}
                </h3>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-loose h-12">
                  {service.subtitle}
                </p>
              </div>

              <ul className="flex-1 space-y-4 mb-10">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span className="text-neon-purple mr-3 mt-1">{" >> "}</span>
                    {bullet}
                  </li>
                ))}
              </ul>

              {service.ctaLink.startsWith('#') ? (
                <a 
                  href={service.ctaLink}
                  onClick={(e) => {
                    if (service.ctaLink === '#diagnostic-section') {
                      e.preventDefault();
                      onOpenDiagnostic();
                    }
                  }}
                  className={`w-full py-4 text-center font-black uppercase text-[10px] tracking-[0.3em] transition-all border ${
                    service.highlighted 
                    ? 'bg-neon-cyan text-dark-bg border-neon-cyan hover:bg-white hover:border-white' 
                    : 'bg-transparent text-white border-white/20 hover:border-white'
                  }`}
                >
                  {service.ctaText}
                </a>
              ) : (
                <Link 
                  to={service.ctaLink}
                  className="w-full py-4 text-center font-black uppercase text-[10px] tracking-[0.3em] transition-all border bg-transparent text-white border-white/20 hover:border-white"
                >
                  {service.ctaText}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchStack;
