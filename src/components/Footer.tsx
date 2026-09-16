const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="site-footer" className="bg-slate-950 text-slate-500 py-20 border-t border-white/5 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-20">
          <div>
            <span className="text-[clamp(0.875rem,4.5vw,1.25rem)] font-bold text-white tracking-tighter uppercase mb-2 block">
              CARDER <span className="text-neon-cyan">CREATIVE</span>
            </span>
            <span className="text-[10px] font-black text-slate-600 tracking-[0.2em] uppercase mb-8 block">
              AI Visibility · SEO · PPC
            </span>
            <p className="text-[10px] font-bold uppercase leading-loose tracking-widest">
              A specialized consulting practice helping businesses navigate the AI discovery layer. <br />
              Node Location: Columbus, Ohio.
            </p>
            <a
              href="https://www.linkedin.com/company/carder-creative/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Carder Creative on LinkedIn"
              className="inline-flex items-center justify-center mt-8 h-10 w-10 border border-white/10 text-slate-500 hover:text-neon-cyan hover:border-neon-cyan transition-colors"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
              </svg>
            </a>
          </div>

          <div>
            <h3 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-8">// NAV MAP</h3>
            <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest">
              <li><a href="/ai-visibility-services/" className="hover:text-neon-cyan transition-colors">AI Visibility</a></li>
              <li><a href="/seo-services/" className="hover:text-neon-cyan transition-colors">SEO Services</a></li>
              <li><a href="/ppc-services/" className="hover:text-neon-cyan transition-colors">PPC Services</a></li>
              <li><a href="/blog/" className="hover:text-neon-cyan transition-colors">Blog</a></li>
              <li><a href="/site-guide/" className="text-neon-cyan hover:text-white transition-colors">AI Site Guide</a></li>
              <li><a href="/#about-section" className="hover:text-neon-cyan transition-colors">About</a></li>
              <li><a href="/contact/" className="hover:text-neon-cyan transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-8">// TERMINAL</h3>
            <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest">
              <li>COLUMBUS OH USA</li>
              <li><a href="mailto:aivisibility@cardercreative.com" className="text-neon-cyan hover:text-white transition-colors">AIVISIBILITY@CARDERCREATIVE.COM</a></li>
              <li><a href="tel:+16148095565" className="text-neon-cyan hover:text-white transition-colors">614-809-5565</a></li>
              <li><a href="/ai-info/" className="text-neon-cyan hover:text-white transition-colors">Information for AI assistants</a></li>
              <li><a href="/llms.txt" target="_blank" className="hover:text-neon-cyan transition-colors">LLMS.TXT</a></li>
              <li><a href="/sitemap.xml" target="_blank" className="hover:text-neon-cyan transition-colors">SITEMAP.XML</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[8px] font-black uppercase tracking-[0.4em]">
          <p>&copy; {currentYear} CARDER CREATIVE LLC. ALL RIGHTS RESERVED.</p>
          <div className="mt-8 md:mt-0 flex space-x-10">
            <a href="/legal/#privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="/legal/#terms" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
