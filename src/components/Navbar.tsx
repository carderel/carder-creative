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
              AI VISIBILITY <span className="text-neon-cyan">SERVICES</span>
            </span>
            <span className="text-[8px] font-black text-slate-500 tracking-[0.2em] uppercase mt-1">
              by Carder Creative
            </span>
          </Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a href={getHref('#search-stack-section')} className="text-slate-400 hover:text-neon-cyan px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all">Services</a>
              <a href={getHref('#methodology-section')} className="text-slate-400 hover:text-neon-cyan px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all">Methodology</a>
              <a href={getHref('#pricing-section')} className="text-slate-400 hover:text-neon-cyan px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all">Pricing</a>
              <Link to="/resources" className={`px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all ${location.pathname === '/resources' ? 'text-neon-cyan' : 'text-slate-400 hover:text-neon-cyan'}`}>Resources</Link>
              <Link to="/news" className={`px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all ${location.pathname === '/news' ? 'text-neon-cyan' : 'text-slate-400 hover:text-neon-cyan'}`}>Intel Feed</Link>
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
