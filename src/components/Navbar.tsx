import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { contactHref } from '../data/inquiry';

interface NavbarProps {
  onOpenDiagnostic: () => void;
}

const MOBILE_MENU_ID = 'mobile-menu';

const Navbar: React.FC<NavbarProps> = ({ onOpenDiagnostic }) => {
  const location = useLocation();
  const path = location.pathname.replace(/\/$/, '');

  // The menu is open only for the location it was opened on, so any route change
  // closes it without a state-syncing effect. Starts closed (SSR-safe).
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const isMenuOpen = openedAt === location.key;

  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeMenu = (restoreFocus: boolean) => {
    setOpenedAt(null);
    if (restoreFocus) toggleRef.current?.focus();
  };

  // While open: focus the first item, close on Escape, lock body scroll.
  useEffect(() => {
    if (!isMenuOpen) return;
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenedAt(null);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isMenuOpen]);

  const getHref = (id: string) => `/${id}`;

  const mobileLink = (active: boolean) =>
    `block py-3 text-xs font-bold uppercase tracking-widest transition-colors ${active ? 'text-neon-cyan' : 'text-slate-300 hover:text-neon-cyan'}`;
  const mobileSubLink = (active: boolean) =>
    `block py-2.5 pl-4 text-[11px] font-bold uppercase tracking-widest transition-colors ${active ? 'text-neon-cyan' : 'text-slate-400 hover:text-neon-cyan'}`;
  const onMobileLinkClick = () => closeMenu(false);

  return (
    <nav
      id="site-navigation"
      className="sticky top-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-neon-cyan/20"
      onBlur={(e) => {
        // Focus moving to an element outside the nav (e.g. tabbing past the last
        // item) closes the menu. A null relatedTarget (Safari click) is ignored.
        const next = e.relatedTarget as Node | null;
        if (isMenuOpen && next && !e.currentTarget.contains(next)) setOpenedAt(null);
      }}
    >
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
          {/* Desktop nav needs ~1250px on one line, so it starts at xl; below that the menu button shows. */}
          <div className="hidden xl:block">
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
                    <Link to="/ai-visibility-services/" className={`block px-4 py-3 text-[11px] font-bold uppercase tracking-widest transition-all hover:bg-white/5 ${path === '/ai-visibility-services' ? 'text-neon-cyan' : 'text-slate-400 hover:text-neon-cyan'}`}>AI Visibility</Link>
                    <Link to="/seo-services/" className={`block px-4 py-3 text-[11px] font-bold uppercase tracking-widest transition-all hover:bg-white/5 ${path === '/seo-services' ? 'text-neon-cyan' : 'text-slate-400 hover:text-neon-cyan'}`}>SEO Services</Link>
                    <Link to="/ppc-services/" className={`block px-4 py-3 text-[11px] font-bold uppercase tracking-widest transition-all hover:bg-white/5 ${path === '/ppc-services' ? 'text-neon-cyan' : 'text-slate-400 hover:text-neon-cyan'}`}>PPC Services</Link>
                  </div>
                </div>
              </div>
              <a href="/ai-visibility-services/#methodology-section" className="text-slate-400 hover:text-neon-cyan px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all">Methodology</a>
              <a href="/ai-visibility-services/#pricing-section" className="text-slate-400 hover:text-neon-cyan px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all">AI Pricing</a>
              <Link to="/blog/" className={`px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all ${path.startsWith('/blog') ? 'text-neon-cyan' : 'text-slate-400 hover:text-neon-cyan'}`}>Blog</Link>
              <a href={getHref('#about-section')} className="text-slate-400 hover:text-neon-cyan px-3 py-2 text-xs font-bold uppercase tracking-widest transition-all">About</a>
              <button
                onClick={onOpenDiagnostic}
                className="relative group px-6 py-2 overflow-hidden bg-transparent border border-neon-cyan text-neon-cyan text-xs font-black uppercase tracking-widest ml-4"
              >
                <span className="relative z-10 group-hover:text-dark-bg transition-colors duration-300">Free Intro Call</span>
                <div className="absolute inset-0 bg-neon-cyan translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>
          </div>

          {/* Mobile / tablet menu toggle */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => (isMenuOpen ? closeMenu(true) : setOpenedAt(location.key))}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls={MOBILE_MENU_ID}
            className="xl:hidden -mr-2 inline-flex items-center justify-center w-11 h-11 border border-neon-cyan/30 text-neon-cyan hover:border-neon-cyan hover:bg-neon-cyan/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu panel: overlays content below the bar, so no layout shift.
          Visibility flips instantly on open (so focus can land) and only animates on close. */}
      <div
        id={MOBILE_MENU_ID}
        ref={panelRef}
        className={`xl:hidden absolute left-0 right-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto bg-dark-bg border-b border-neon-cyan/20 shadow-[0_20px_40px_rgba(0,0,0,0.6)] duration-200 ${isMenuOpen ? 'visible opacity-100 translate-y-0 transition-[opacity,transform]' : 'invisible opacity-0 -translate-y-2 transition-[opacity,transform,visibility]'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <ul className="divide-y divide-white/5">
            <li className="pb-2">
              <a href={getHref('#search-stack-section')} onClick={onMobileLinkClick} className={mobileLink(false)}>Services</a>
              <ul className="border-l border-neon-cyan/20 ml-1">
                <li><Link to="/ai-visibility-services/" onClick={onMobileLinkClick} className={mobileSubLink(path === '/ai-visibility-services')}>AI Visibility</Link></li>
                <li><Link to="/seo-services/" onClick={onMobileLinkClick} className={mobileSubLink(path === '/seo-services')}>SEO Services</Link></li>
                <li><Link to="/ppc-services/" onClick={onMobileLinkClick} className={mobileSubLink(path === '/ppc-services')}>PPC Services</Link></li>
              </ul>
            </li>
            <li><a href="/ai-visibility-services/#methodology-section" onClick={onMobileLinkClick} className={mobileLink(false)}>Methodology</a></li>
            <li><a href="/ai-visibility-services/#pricing-section" onClick={onMobileLinkClick} className={mobileLink(false)}>AI Pricing</a></li>
            <li><Link to="/blog/" onClick={onMobileLinkClick} className={mobileLink(path.startsWith('/blog'))}>Blog</Link></li>
            <li><a href={getHref('#about-section')} onClick={onMobileLinkClick} className={mobileLink(false)}>About</a></li>
          </ul>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => { closeMenu(false); onOpenDiagnostic(); }}
              className="flex-1 px-6 py-3 border border-neon-cyan bg-neon-cyan text-dark-bg text-xs font-black uppercase tracking-widest hover:bg-transparent hover:text-neon-cyan transition-colors"
            >
              Free Intro Call
            </button>
            <Link
              to={contactHref()}
              onClick={onMobileLinkClick}
              className="flex-1 px-6 py-3 border border-neon-purple/60 text-center text-white text-xs font-black uppercase tracking-widest hover:border-neon-purple hover:text-neon-purple transition-colors"
            >
              Get Help With a Project
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
