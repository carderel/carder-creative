import { Link } from 'react-router-dom';
import { contactHref, type NeedSlug } from '../data/inquiry';
import FocusedDiagnostic from './FocusedDiagnostic';

// Homepage entry point: the fixed-fee Focused Diagnostic first, then the four
// custom-quoted project types and ongoing work.
// CTAs are real links to /contact/ with the category preselected, so they work
// as crawlable internal links and need no modal.

interface HelpCard {
  kind: 'One-time project' | 'Ongoing';
  title: string;
  description: string;
  deliverable: string;
  scope: string;
  cta: string;
  need: NeedSlug;
}

const CARDS: HelpCard[] = [
  {
    kind: 'One-time project',
    title: 'Google Ads Account Review',
    description: 'Find wasted spend, campaign structure problems, tracking issues, and missed opportunities in your account.',
    deliverable: 'A full account assessment with prioritized recommendations.',
    scope: 'Custom quote, scoped before work starts.',
    cta: 'Request an Account Review',
    need: 'google-ads',
  },
  {
    kind: 'One-time project',
    title: 'Conversion Tracking Repair',
    description: 'Find and fix why GA4, Google Tag Manager, and Google Ads disagree about your conversions.',
    deliverable: 'A diagnosis and repair of the tracking setup within an agreed scope.',
    scope: 'Quoted by scope and complexity.',
    cta: 'Get Tracking Help',
    need: 'conversion-tracking',
  },
  {
    kind: 'One-time project',
    title: 'Technical SEO Implementation',
    description: 'Indexing, crawlability, redirects, structured data, and other defined technical issues.',
    deliverable: 'A diagnosis plus implementation of the agreed fixes.',
    scope: 'Custom quote, scoped before work starts.',
    cta: 'Request SEO Help',
    need: 'seo',
  },
  {
    kind: 'Ongoing',
    title: 'Ongoing Search Support',
    description: 'Flexible Google Ads management, technical SEO support, and strategic consulting for businesses that need recurring help. Agencies can subcontract search work.',
    deliverable: 'A monthly scope agreed up front and adjusted as your needs change.',
    scope: 'Custom monthly retainer, scoped before work starts.',
    cta: 'Discuss Ongoing Support',
    need: 'ongoing-support',
  },
];

const ProjectHelp = () => (
  <section id="project-help" aria-labelledby="project-help-heading" className="py-16 bg-slate-950 border-t border-white/5 scroll-mt-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-12">
        <p className="text-neon-cyan font-mono text-xs font-black uppercase tracking-[0.4em] mb-4">// ONE-TIME PROJECTS &amp; ONGOING SUPPORT</p>
        <h2 id="project-help-heading" className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-6">
          NEED HELP WITH A <span className="text-transparent bg-clip-text vapor-gradient">SPECIFIC PROBLEM?</span>
        </h2>
        <p className="text-slate-400 text-base font-medium leading-relaxed">
          Start with a focused $300 diagnostic for one specific problem, or request a custom quote for comprehensive audits, implementation, and ongoing management. The person who scopes the work does the work.
        </p>
      </div>

      <FocusedDiagnostic />

      <div className="mt-16 mb-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div className="max-w-3xl">
          <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter mb-3">Larger projects &amp; ongoing support</h3>
          <p className="text-slate-400 text-base font-medium leading-relaxed">
            We scope and quote every project before work begins. One-time projects and ongoing engagements are both welcome.
          </p>
        </div>
        <Link
          to={contactHref('custom-project')}
          className="shrink-0 py-4 px-8 text-center font-black uppercase text-[10px] tracking-[0.25em] transition-all border bg-transparent text-white border-neon-purple hover:bg-neon-purple hover:text-dark-bg"
        >
          Request a Custom Quote
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {CARDS.map((card) => {
          const ongoing = card.kind === 'Ongoing';
          return (
            <div
              key={card.title}
              className={`p-8 border flex flex-col h-full transition-colors ${ongoing ? 'border-neon-purple/50 bg-white/5' : 'border-white/10 hover:border-white/20'}`}
            >
              <p className={`font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-4 ${ongoing ? 'text-neon-purple' : 'text-neon-cyan'}`}>
                // {card.kind}
              </p>
              <h4 className="text-xl font-black text-white uppercase tracking-tight mb-4">{card.title}</h4>
              <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">{card.description}</p>
              <div className="flex-1 mb-8">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">You get</p>
                <p className="text-slate-300 text-sm font-medium leading-relaxed mb-4">{card.deliverable}</p>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{card.scope}</p>
              </div>
              <Link
                to={contactHref(card.need)}
                className={`w-full py-4 px-4 text-center font-black uppercase text-[10px] tracking-[0.25em] transition-all border ${
                  ongoing
                    ? 'bg-transparent text-white border-neon-purple hover:bg-neon-purple hover:text-dark-bg'
                    : 'bg-transparent text-white border-white/20 hover:border-neon-cyan hover:text-neon-cyan'
                }`}
              >
                {card.cta}
              </Link>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-slate-400 text-sm font-medium leading-relaxed max-w-3xl">
        Not sure which fits?{' '}
        <Link to={contactHref('other')} className="text-neon-cyan font-bold hover:text-white transition-colors">Describe the problem</Link>{' '}
        and we will tell you where to start.
      </p>
    </div>
  </section>
);

export default ProjectHelp;
