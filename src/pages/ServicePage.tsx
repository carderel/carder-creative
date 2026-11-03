import { Link } from 'react-router-dom';
import { renderInline } from '../blog/markdown';
import ContactForm from '../components/ContactForm';
import FocusedDiagnostic from '../components/FocusedDiagnostic';
import type { ServicePageData, ServiceCta } from '../data/servicePages';
import type { NeedSlug } from '../data/inquiry';
import { CONTACT_CHANNELS } from '../data/contactPage';

interface ServicePageProps {
  data: ServicePageData;
  onOpenContact: (need: NeedSlug) => void;
  /** When provided, a checklist text link shows under the hero CTAs. */
  onOpenChecklist?: () => void;
  extraSections?: React.ReactNode;
}

const ServicePage: React.FC<ServicePageProps> = ({ data, onOpenContact, onOpenChecklist, extraSections }) => {
  const renderCta = (cta: ServiceCta, className: string) =>
    'need' in cta ? (
      <button type="button" onClick={() => onOpenContact(cta.need)} className={className}>
        {cta.label}
      </button>
    ) : (
      <a href={cta.href} className={`${className} text-center`}>
        {cta.label}
      </a>
    );

  return (
    <main>
      {/* Hero */}
      <section className="py-20 sm:py-28 bg-dark-bg border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-neon-cyan font-mono text-xs font-black uppercase tracking-[0.4em] mb-6">{data.eyebrow}</p>
          <h1 className="text-[clamp(2.25rem,7vw,4.5rem)] font-black text-white uppercase tracking-tighter leading-[0.95] mb-8 max-w-4xl">
            {data.h1}
          </h1>
          <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-2xl mb-10">{data.heroLede}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            {renderCta(data.heroPrimaryCta, 'px-8 py-4 bg-neon-cyan text-dark-bg font-black uppercase text-[10px] tracking-[0.3em] border border-neon-cyan hover:bg-white hover:border-white transition-all')}
            {renderCta(data.heroSecondaryCta, 'px-8 py-4 bg-transparent text-white font-black uppercase text-[10px] tracking-[0.3em] border border-white/20 hover:border-white transition-all')}
          </div>
          {onOpenChecklist && (
            <p className="mt-6 text-sm text-slate-400 font-medium">
              Checking your own site first?{' '}
              <button type="button" onClick={onOpenChecklist} className="text-neon-cyan font-bold underline underline-offset-4 hover:text-white transition-colors">
                Download the AI visibility checklist
              </button>
            </p>
          )}
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[120px]"></div>
      </section>

      {/* Ways to work together: one-time projects and ongoing support */}
      {data.engagements && (
        <section id="engagements" aria-labelledby="engagements-heading" className="py-16 bg-slate-950 border-b border-white/5 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-neon-cyan font-mono text-xs font-black uppercase tracking-[0.4em] mb-4">// WAYS TO WORK TOGETHER</p>
            <h2 id="engagements-heading" className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter mb-6 max-w-4xl">{data.engagements.heading}</h2>
            <p className="text-slate-400 text-base font-medium leading-relaxed max-w-3xl mb-10">{data.engagements.intro}</p>
            {data.engagements.diagnosticLede && (
              <div className="mb-12">
                <FocusedDiagnostic lede={data.engagements.diagnosticLede} onRequest={() => onOpenContact('focused-diagnostic')} />
                <h3 className="mt-16 text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter">Larger projects &amp; ongoing work</h3>
              </div>
            )}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${data.engagements.options.length === 4 ? 'xl:grid-cols-4' : 'lg:grid-cols-3'}`}>
              {data.engagements.options.map((opt) => {
                const ongoing = opt.kind === 'Ongoing';
                const OptHeading = data.engagements?.diagnosticLede ? 'h4' : 'h3';
                return (
                  <div key={opt.title} className={`p-8 border flex flex-col h-full ${ongoing ? 'border-neon-purple/50 bg-white/5' : 'border-white/10'}`}>
                    <p className={`font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-4 ${ongoing ? 'text-neon-purple' : 'text-neon-cyan'}`}>// {opt.kind}</p>
                    <OptHeading className="text-lg font-black text-white uppercase tracking-tight mb-3">{opt.title}</OptHeading>
                    <p className="flex-1 text-slate-400 text-sm font-medium leading-relaxed mb-6">{opt.description}</p>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">{opt.scope}</p>
                    <button
                      type="button"
                      onClick={() => onOpenContact(opt.need)}
                      className={`w-full py-4 px-4 text-center font-black uppercase text-[10px] tracking-[0.25em] transition-all border text-white ${ongoing ? 'border-neon-purple hover:bg-neon-purple hover:text-dark-bg' : 'border-white/20 hover:border-neon-cyan hover:text-neon-cyan'}`}
                    >
                      {opt.cta}
                    </button>
                  </div>
                );
              })}
            </div>
            <p className="mt-8 text-slate-400 text-sm font-medium">We scope and quote every project before work begins. One-time projects and ongoing engagements are both welcome.</p>
          </div>
        </section>
      )}

      {/* What's included */}
      <section className="py-16 bg-dark-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-12">WHAT&apos;S INCLUDED</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.included.map((item) => (
              <div key={item.title} className="glass-card p-8 border border-white/10">
                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-dark-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-neon-cyan font-mono text-xs font-black uppercase tracking-[0.4em] mb-4">// HOW WE WORK</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-12">OUR PROCESS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.process.map((step) => (
              <div key={step.num} className="group glass-card p-10 relative overflow-hidden transition-all duration-500 hover:bg-white/10">
                <div className="absolute -right-4 -top-8 text-white/5 text-[120px] font-black pointer-events-none group-hover:text-neon-cyan/10 transition-colors">{step.num}</div>
                <div className="relative z-10">
                  <div className="text-neon-cyan mb-8 font-mono text-sm font-bold tracking-widest uppercase">Step {step.num}</div>
                  <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">{step.description}</p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 bg-neon-cyan w-0 group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI-visibility connection */}
      <section className="py-16 bg-slate-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter mb-6">
            <span className="text-transparent bg-clip-text vapor-gradient">{data.aiConnectionHeading}</span>
          </h2>
          <p className="text-slate-300 text-base font-medium leading-relaxed">{renderInline(data.aiConnectionBody, `ai-connection-${data.slug}`)}</p>
        </div>
      </section>

      {/* Optional injected sections (e.g. Methodology + Pricing on the AI Visibility page) */}
      {extraSections}

      {/* FAQ */}
      <section className="py-16 bg-dark-bg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-12">FAQ</h2>
          <div className="max-w-3xl space-y-4">
            {data.faq.map((item) => (
              <details key={item.q} className="group glass-card p-6 border border-white/10">
                <summary className="cursor-pointer list-none flex justify-between items-center text-white font-black text-sm uppercase tracking-tight">
                  {item.q}
                  <span className="text-neon-cyan ml-4 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="text-slate-400 text-sm font-medium leading-relaxed mt-4">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-16 bg-slate-950 relative overflow-hidden border-t border-white/5 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 lg:flex lg:items-start lg:justify-between gap-24">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-8">
              {data.ctaHeading[0]} <br />
              <span className="text-transparent bg-clip-text vapor-gradient">{data.ctaHeading[1]}</span>
            </h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed mb-8">{data.ctaBody}</p>
            <p className="text-slate-400 text-sm font-medium mb-8">
              Prefer to call?{' '}
              <a href={CONTACT_CHANNELS.phoneHref} className="text-white font-bold hover:text-neon-cyan transition-colors">{CONTACT_CHANNELS.phone}</a>
            </p>
            {data.formNeed === 'ai-visibility' && (
              <Link to="/blog/ai-visibility-audit-checklist/" className="inline-flex items-center text-neon-cyan font-black text-xs uppercase tracking-[0.4em] hover:text-white transition-colors">
                Read the audit checklist
              </Link>
            )}
          </div>
          <div className="lg:w-5/12">
            <ContactForm defaultNeed={data.formNeed} />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[120px]"></div>
      </section>
    </main>
  );
};

export default ServicePage;
