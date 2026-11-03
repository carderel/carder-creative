import { Link } from 'react-router-dom';
import { contactHref } from '../data/inquiry';

interface HeroProps {
  onOpenDiagnostic: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenDiagnostic }) => {
  return (
    <section id="hero-section" className="relative min-h-[60vh] flex items-center bg-dark-bg pt-8 pb-12 overflow-hidden scanlines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div id="hero-content" className="text-left max-w-4xl">
          <div className="inline-block mb-4 px-3 py-1 border border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan text-[10px] font-black uppercase tracking-[0.3em]">
            Now Booking Projects and Retainers
          </div>
          {/* Visual headline (brand lockup). Kept as a styled <p> so the keyword-rich
              sentence below can be the semantic <h1> for SEO/AI visibility. */}
          <p className="text-[clamp(2.5rem,10vw,3.5rem)] sm:text-[clamp(4rem,12vw,5.7rem)] font-black text-white uppercase leading-[0.85] tracking-tighter mb-4">
            WRITE FOR <span className="text-neon-cyan neon-text italic">HUMANS</span>.<br />
            STRUCTURE FOR <span className="text-neon-purple drop-shadow-[0_0_8px_rgba(255,0,229,0.5)] italic">MACHINES</span>.
          </p>
          <div className="border-l-2 border-neon-cyan pl-6 mb-8 max-w-2xl">
            <h1 className="text-lg text-slate-300 font-medium leading-relaxed mb-3">
              Carder Creative provides independent SEO, Google Ads, and AI visibility expertise for businesses and agencies, based in Columbus, Ohio.
            </h1>
            <p className="text-base text-slate-400 font-medium leading-relaxed">
              From one-time troubleshooting to ongoing search strategy and management. Local to Central Ohio, with remote engagements available nationwide.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link
              to={contactHref()}
              className="px-10 py-5 bg-neon-cyan text-dark-bg font-black uppercase tracking-widest text-sm hover:bg-white transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)] hover:shadow-white/20 active:scale-95 text-center"
            >
              Get Help With a Project
            </Link>
            <a
              href="#search-stack-section"
              className="px-10 py-5 bg-transparent border border-white/20 text-white font-black uppercase tracking-widest text-sm hover:bg-white hover:text-dark-bg transition-all active:scale-95 text-center"
            >
              Explore Services
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-400 font-medium">
            Prefer to talk first?{' '}
            <button type="button" onClick={onOpenDiagnostic} className="text-neon-cyan font-bold underline underline-offset-4 hover:text-white transition-colors">
              Book a free 30-minute intro call
            </button>
          </p>
        </div>
      </div>
      
      {/* High-tech grid background */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ 
        backgroundImage: `linear-gradient(to right, #ffffff0a 1px, transparent 1px), linear-gradient(to bottom, #ffffff0a 1px, transparent 1px)`,
        backgroundSize: '40px 40px' 
      }}></div>
      
      {/* Glows */}
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-neon-cyan/10 rounded-full blur-[120px]"></div>
      <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[120px]"></div>
    </section>
  );
};

export default Hero;
