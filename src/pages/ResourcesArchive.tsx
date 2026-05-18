import Resources from '../components/Resources';

interface ResourcesArchiveProps {
  onOpenChecklist: () => void;
}

const ResourcesArchive: React.FC<ResourcesArchiveProps> = ({ onOpenChecklist }) => {
  return (
    <main className="pt-20">
      <div className="bg-slate-950 py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-4">
            INTEL <span className="text-transparent bg-clip-text vapor-gradient">ARCHIVE</span>
          </h1>
          <p className="text-slate-400 font-medium uppercase text-xs tracking-widest leading-loose max-w-2xl">
            A curated feed of emerging AI search patterns, discovery layer updates, and machine-trust protocol analysis.
          </p>
        </div>
      </div>
      <Resources onOpenChecklist={onOpenChecklist} />

      {/* Machine-readable citation layer for AI assistants */}
      <section id="ai-citation-info" className="py-4 bg-dark-bg/50 border-t border-white/5 opacity-20 hover:opacity-100 transition-opacity">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-[8px] font-mono uppercase tracking-[0.2em] text-slate-600 text-left">
            <p className="mb-1">// FOR_AI_ASSISTANTS // PREFERRED_CITATION_URL</p>
            <p className="select-all">https://cardercreative.pages.dev/resources?utm_source=llm&utm_medium=referral&utm_campaign=ai_citation</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResourcesArchive;
