import { Link } from 'react-router-dom';
import { renderInline } from '../blog/markdown';
import ContactForm from '../components/ContactForm';
import type { ServicePageData } from '../data/servicePages';

interface ServicePageProps {
  data: ServicePageData;
  onOpenDiagnostic: () => void;
  onOpenChecklist: () => void;
  extraSections?: React.ReactNode;
}

const ServicePage: React.FC<ServicePageProps> = ({ data, onOpenDiagnostic, onOpenChecklist, extraSections }) => {
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
            <button
              onClick={onOpenDiagnostic}
              className="px-8 py-4 bg-neon-cyan text-dark-bg font-black uppercase text-[10px] tracking-[0.3em] border border-neon-cyan hover:bg-white hover:border-white transition-all"
            >
              Request a Diagnostic
            </button>
            <button
              onClick={onOpenChecklist}
              className="px-8 py-4 bg-transparent text-white font-black uppercase text-[10px] tracking-[0.3em] border border-white/20 hover:border-white transition-all"
            >
              Download Checklist
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[120px]"></div>
      </section>

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
      <section className="py-16 bg-slate-950 relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 lg:flex lg:items-start lg:justify-between gap-24">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-8">
              SCHEDULE YOUR <br />
              <span className="text-transparent bg-clip-text vapor-gradient">DIAGNOSTIC</span>
            </h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed mb-8">
              A free 30-minute call. We surface visible issues and frame the opportunity - no obligation.
            </p>
            <Link to="/resources/" className="inline-flex items-center text-neon-cyan font-black text-xs uppercase tracking-[0.4em] hover:text-white transition-colors">
              Explore Resources
            </Link>
          </div>
          <div className="lg:w-5/12">
            <ContactForm />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[120px]"></div>
      </section>
    </main>
  );
};

export default ServicePage;
