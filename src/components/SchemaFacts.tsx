import { useLocation } from 'react-router-dom';
import { schemaForPath } from '../seo/schema';

// Visible "Quick Facts" block: renders the structured data this page exposes to
// search engines and AI systems. Deterministic per pathname (SSR-safe).
const SchemaFacts = () => {
  const { pathname } = useLocation();
  const schema = schemaForPath(pathname);
  return (
    <section id="quick-facts" className="py-16 bg-dark-bg border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-neon-cyan font-mono text-xs font-black uppercase tracking-[0.4em] mb-4">// QUICK FACTS</h2>
        <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-2xl mb-8">
          The structured data this page exposes to search engines and AI systems. We write for humans and structure for machines - here is the structure.
        </p>
        <div className="glass-card border border-white/10 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
            <span className="w-2 h-2 rounded-full bg-neon-cyan"></span>
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">application/ld+json</span>
          </div>
          <pre className="p-6 overflow-auto max-h-96 text-[11px] leading-relaxed font-mono text-slate-400 whitespace-pre">
{JSON.stringify(schema, null, 2)}
          </pre>
        </div>
      </div>
    </section>
  );
};

export default SchemaFacts;
