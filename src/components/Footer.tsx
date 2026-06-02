const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="site-footer" className="bg-slate-950 text-slate-500 py-20 border-t border-white/5 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-20">
          <div>
            <span className="text-[clamp(0.875rem,4.5vw,1.25rem)] font-bold text-white tracking-tighter uppercase mb-2 block">
              AI VISIBILITY <span className="text-neon-cyan">SERVICES</span>
            </span>
            <span className="text-[10px] font-black text-slate-600 tracking-[0.2em] uppercase mb-8 block">
              by Carder Creative
            </span>
            <p className="text-[10px] font-bold uppercase leading-loose tracking-widest">
              A specialized consulting practice helping businesses navigate the AI discovery layer. <br />
              Node Location: Columbus, Ohio.
            </p>
          </div>

          <div>
            <h3 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-8">// NAV MAP</h3>
            <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest">
              <li><a href="#methodology-section" className="hover:text-neon-cyan transition-colors">AI Visibility</a></li>
              <li><a href="#search-stack-section" className="hover:text-neon-cyan transition-colors">SEO Services</a></li>
              <li><a href="#search-stack-section" className="hover:text-neon-cyan transition-colors">PPC Services</a></li>
              <li><a href="/site-guide/" className="text-neon-cyan hover:text-white transition-colors">AI Site Guide</a></li>
              <li><a href="#about-section" className="hover:text-neon-cyan transition-colors">About</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-8">// TERMINAL</h3>
            <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest">
              <li>COLUMBUS OH USA</li>
              <li><a href="mailto:aivisibility@cardercreative.com" className="text-neon-cyan hover:text-white transition-colors">AIVISIBILITY@CARDERCREATIVE.COM</a></li>
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
