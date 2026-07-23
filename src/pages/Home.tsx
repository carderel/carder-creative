import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import Resources from '../components/Resources';
import SearchStack from '../components/SearchStack';
import ContactForm from '../components/ContactForm';

interface HomeProps {
  onOpenDiagnostic: () => void;
  onOpenChecklist: () => void;
}

const Home: React.FC<HomeProps> = ({ onOpenDiagnostic, onOpenChecklist }) => {
  return (
    <main>
      <Hero onOpenDiagnostic={onOpenDiagnostic} onOpenChecklist={onOpenChecklist} />

      {/* Brand stats strip */}
      <div id="stats-bar" className="bg-slate-950 border-y border-white/5 py-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="group">
              <div className="text-2xl sm:text-4xl font-black text-white group-hover:text-neon-cyan transition-colors">20+</div>
              <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-3 group-hover:text-slate-400">Years In Practice</div>
            </div>
            <div className="group">
              <div className="text-3xl sm:text-4xl font-black text-white group-hover:text-neon-purple transition-colors">614</div>
              <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-3 group-hover:text-slate-400">Central Ohio Focus</div>
            </div>
            <div className="group">
              <div className="text-2xl sm:text-4xl font-black text-white group-hover:text-neon-cyan transition-colors">3</div>
              <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-3 group-hover:text-slate-400">Search Service Lines</div>
            </div>
            <div className="group">
              <div className="text-3xl sm:text-4xl font-black text-white group-hover:text-neon-purple transition-colors">HONEST</div>
              <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-3 group-hover:text-slate-400">Measurement Standard</div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 vapor-gradient opacity-[0.03]"></div>
      </div>

      {/* Services trio */}
      <SearchStack onOpenDiagnostic={onOpenDiagnostic} />

      {/* Methodology teaser -> AI Visibility page */}
      <section className="py-16 bg-dark-bg border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-neon-cyan font-mono text-xs font-black uppercase tracking-[0.4em] mb-4">// THE FRAMEWORK</h2>
            <p className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter leading-tight">
              FIND <span className="text-slate-600">→</span> UNDERSTAND <span className="text-slate-600">→</span> TRUST <span className="text-transparent bg-clip-text vapor-gradient">→ RECOMMEND</span>
            </p>
            <p className="mt-4 text-slate-400 text-sm font-medium leading-relaxed">
              The model behind our AI visibility work - the same fundamentals that strengthen traditional and paid search.
            </p>
          </div>
          <Link to="/ai-visibility-services/" className="shrink-0 inline-flex items-center px-8 py-4 border border-neon-cyan text-neon-cyan font-black uppercase text-[10px] tracking-[0.3em] hover:bg-neon-cyan hover:text-dark-bg transition-all">
            Explore AI Visibility
          </Link>
        </div>
      </section>

      <About />

      {/* Range strip - broader creative capability (no dedicated pages yet) */}
      <section className="py-16 bg-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-neon-purple font-mono text-xs font-black uppercase tracking-[0.4em] mb-4">// BEYOND SEARCH</h2>
          <p className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter mb-8 max-w-3xl">
            20+ YEARS OF <span className="text-transparent bg-clip-text vapor-gradient">CREATIVE</span> BEHIND THE DATA.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {['Brand & Identity', 'Web Design', 'Photography & Video', 'Motion Graphics'].map((item) => (
              <div key={item} className="glass-card p-6 border border-white/10 text-center">
                <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{item}</span>
              </div>
            ))}
          </div>
          <button onClick={onOpenDiagnostic} className="inline-flex items-center text-neon-cyan font-black text-xs uppercase tracking-[0.4em] hover:text-white transition-colors">
            Ask About A Project →
          </button>
        </div>
      </section>

      <Resources limit={4} onOpenChecklist={onOpenChecklist} />

      {/* Contact / Lead Magnet Section */}
      <section id="diagnostic-section" className="py-16 bg-slate-950 relative overflow-hidden text-left border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:flex lg:items-start lg:justify-between gap-24">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h2 id="diagnostic-headline" className="text-5xl font-black text-white uppercase tracking-tighter mb-8">
                SCHEDULE YOUR <br />
                <span className="text-transparent bg-clip-text vapor-gradient">DIAGNOSTIC</span>
              </h2>
              <p className="mt-6 text-xl text-slate-400 leading-relaxed font-medium mb-12">
                Schedule a free 30-minute diagnostic call. We will surface visible issues in your AI discovery layer and frame the strategic opportunity.
              </p>
              <div className="p-10 bg-white/5 border border-white/10 group">
                <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-4 group-hover:text-neon-cyan transition-colors">// DOWNLOAD CHECKLIST</h4>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-loose mb-8">Download the AI Visibility Checklist to see whether AI systems can find, understand, and trust your business.</p>
                <button
                  onClick={onOpenChecklist}
                  className="inline-flex items-center text-neon-cyan font-black text-xs uppercase tracking-[0.4em] hover:text-white transition-colors"
                >
                  Download Checklist
                  <svg className="ml-4 w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="lg:w-5/12">
              <ContactForm />
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[120px]"></div>
      </section>

      {/* Machine-readable citation layer for AI assistants */}
      <section id="ai-citation-info" className="py-4 bg-dark-bg/50 border-t border-white/5 opacity-20 hover:opacity-100 transition-opacity">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[8px] font-mono uppercase tracking-[0.2em] text-slate-600">
            <p className="mb-1">// FOR_AI_ASSISTANTS // PREFERRED_CITATION_URL</p>
            <p className="select-all">https://cardercreative.com/?utm_source=llm&utm_medium=referral&utm_campaign=ai_citation</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
