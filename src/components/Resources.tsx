import { Link } from 'react-router-dom';
import intelData from '../data/intel_feed.json';

interface ResourcesProps {
  limit?: number;
  onOpenChecklist: () => void;
}

const Resources: React.FC<ResourcesProps> = ({ limit, onOpenChecklist }) => {
  const displayedData = limit ? intelData.slice(0, limit) : intelData;

  return (
    <section id="resources-section" className="py-16 bg-dark-bg border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl text-left">
            <h2 className="text-neon-cyan font-mono text-xs font-black uppercase tracking-[0.4em] mb-4">// RESOURCES & GUIDES</h2>
            <p className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter">
              KNOWLEDGE <span className="text-transparent bg-clip-text vapor-gradient">TRANSFER</span>
            </p>
            <p className="max-w-md text-slate-500 text-xs font-bold uppercase tracking-widest leading-loose mt-6">
              Curated intelligence on AI discovery, <br /> search systems, and machine-trust protocols.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {displayedData.map((post) => (
            <a 
              key={post.id} 
              href={post.url} 
              target={post.url.startsWith('http') ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="group flex flex-col md:flex-row md:items-center p-8 bg-white/5 hover:bg-neon-cyan/5 transition-all border border-white/5 hover:border-neon-cyan/30"
            >
              <div className="font-mono text-neon-cyan text-xs font-bold mr-12 mb-4 md:mb-0">
                {post.id}
              </div>
              <div className="flex-grow">
                <span className="text-[10px] font-black text-neon-purple uppercase tracking-[0.2em] mb-1 block">{post.category}</span>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight group-hover:text-neon-cyan transition-colors">
                  {post.title}
                </h3>
              </div>
              <div className="mt-4 md:mt-0 flex items-center font-mono text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                {post.date}
                <svg className={`ml-4 w-5 h-5 text-neon-cyan opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all ${post.url.startsWith('http') ? 'rotate-[-45deg]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {limit && (
          <div className="mt-12 flex justify-center">
            <Link 
              to="/resources"
              className="px-12 py-5 bg-transparent border border-neon-cyan/50 text-neon-cyan font-black text-xs uppercase tracking-[0.4em] hover:bg-neon-cyan hover:text-dark-bg transition-all shadow-[0_0_20px_rgba(0,242,255,0.1)] active:scale-95"
            >
              Access Full Intel Archive
            </Link>
          </div>
        )}

        {limit && (
          <div className="mt-16 p-10 bg-white/5 border border-white/10 group text-left">
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
        )}
      </div>
    </section>
  );
};

export default Resources;
