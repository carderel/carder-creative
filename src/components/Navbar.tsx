import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onOpenDiagnostic: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenDiagnostic }) => {
  const location = useLocation();

  const getHref = (id: string) => `/${id}`;

  return (
    <nav id="site-navigation" className="sticky top-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-neon-cyan/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex-shrink-0 flex flex-col justify-center hover:opacity-80 transition-opacity">
            <span className="text-[clamp(0.875rem,4.5vw,1.25rem)] font-bold text-white tracking-tighter uppercase font-mono leading-none">
              CARDER <span className="text-neon-cyan">CREATIVE</span>
            </span>
            <span className="text-[8px] font-black text-slate-500 tracking-[0.2em] uppercase mt-1">
              AI Visibility · SEO · PPC · Columbus, OH
            </span>
          </Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <div className="relative group">
                <a
                  href={getHref('#search-stack-section')}
                  className="inline-flex items-center text-slate-400 group-hover:text-neon-cyan px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all"
                >
                  Services
                  <svg className="ml-1.5 w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                {/* pt-2 creates a hover bridge so the panel doesn't close between trigger and menu */}
                <div className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200">
                  <div className="bg-dark-bg/95 backdrop-blur-md border border-neon-cyan/20 shadow-[0_0_20px_rgba(0,242,255,0.1)] py-2">
                    <Link to="/ai-visibility-services/" className={`block px-4 py-3 text-[11px] font-bold uppercase tracking-widest transition-all hover:bg-white/5 ${location.pathname.replace(/\/$/, '') === '/ai-visibility-services' ? 'text-neon-cyan' : 'text-slate-400 hover:text-neon-cyan'}`}>AI Visibility</Link>
                    <Link to="/seo-services/" className={`block px-4 py-3 text-[11px] font-bold uppercase tracking-widest transition-all hover:bg-white/5 ${location.pathname.replace(/\/$/, '') === '/seo-services' ? 'text-neon-cyan' : 'text-slate-400 hover:text-neon-cyan'}`}>SEO Services</Link>
                    <Link to="/ppc-services/" className={`block px-4 py-3 text-[11px] font-bold uppercase tracking-widest transition-all hover:bg-white/5 ${location.pathname.replace(/\/$/, '') === '/ppc-services' ? 'text-neon-cyan' : 'text-slate-400 hover:text-neon-cyan'}`}>PPC Services</Link>
                  </div>
                </div>
              </div>
              <a href={getHref('#methodology-section')} className="text-slate-400 hover:text-neon-cyan px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all">Methodology</a>
              <a href={getHref('#pricing-section')} className="text-slate-400 hover:text-neon-cyan px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all">Pricing</a>
              <Link to="/resources/" className={`px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all ${location.pathname.replace(/\/$/, '') === '/resources' ? 'text-neon-cyan' : 'text-slate-400 hover:text-neon-cyan'}`}>Resources</Link>
              <Link to="/news/" className={`px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all ${location.pathname.replace(/\/$/, '') === '/news' ? 'text-neon-cyan' : 'text-slate-400 hover:text-neon-cyan'}`}>Intel Feed</Link>
              <a href={getHref('#about-section')} className="text-slate-400 hover:text-neon-cyan px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all">About</a>
              <button 
                onClick={onOpenDiagnostic}
                className="relative group px-6 py-2 overflow-hidden bg-transparent border border-neon-cyan text-neon-cyan text-xs font-black uppercase tracking-widest ml-4"
              >
                <span className="relative z-10 group-hover:text-dark-bg transition-colors duration-300">Free Diagnostic Call</span>
                <div className="absolute inset-0 bg-neon-cyan translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
