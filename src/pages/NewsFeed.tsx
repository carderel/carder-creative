import { useState, useEffect, useMemo } from 'react';

const API_URL = 'https://ai-visibility-news-agent.carder-creative.workers.dev/api/news/articles';

interface Article {
  id: number;
  url: string;
  title: string;
  source: string | null;
  published_at: string | null;
  keyword: string;
  summary: string | null;
}

const formatDate = (dateStr: string | null): string => {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr;
  }
};

const NewsFeed: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeKeyword, setActiveKeyword] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}?limit=200`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => setArticles(data.articles ?? []))
      .catch(() => setError('Failed to load signals. Try again later.'))
      .finally(() => setLoading(false));
  }, []);

  const keywords = useMemo(() => {
    const seen = new Set<string>();
    articles.forEach(a => seen.add(a.keyword));
    return ['All', ...Array.from(seen).sort()];
  }, [articles]);

  const filtered = useMemo(() =>
    activeKeyword === 'All' ? articles : articles.filter(a => a.keyword === activeKeyword),
    [articles, activeKeyword]
  );

  return (
    <main className="pt-20">
      <div className="bg-slate-950 py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-neon-cyan font-mono text-xs font-black uppercase tracking-[0.4em] mb-4">// LIVE SIGNAL FEED</h2>
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-4">
            AI SEARCH <span className="text-transparent bg-clip-text vapor-gradient">INTEL</span>
          </h1>
          <p className="text-slate-400 font-medium uppercase text-xs tracking-widest leading-loose max-w-2xl">
            Real-time news on AI search, GEO, LLM visibility, and the emerging discovery layer. Updated daily.
          </p>
          {!loading && !error && (
            <p className="mt-4 font-mono text-[10px] text-slate-600 uppercase tracking-[0.2em]">
              {articles.length} signals indexed · refreshed daily at 11:00 UTC
            </p>
          )}
        </div>
      </div>

      <section className="py-16 bg-dark-bg border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {loading && (
            <div className="text-center py-24">
              <span className="font-mono text-neon-cyan text-xs uppercase tracking-[0.4em] animate-pulse">// Loading signals...</span>
            </div>
          )}

          {error && (
            <div className="text-center py-24">
              <span className="font-mono text-red-400 text-xs uppercase tracking-[0.4em]">// {error}</span>
            </div>
          )}

          {!loading && !error && (
            <>
              {/* Keyword filter tabs */}
              <div className="flex flex-wrap gap-2 mb-10">
                {keywords.map(kw => (
                  <button
                    key={kw}
                    onClick={() => setActiveKeyword(kw)}
                    className={`px-4 py-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${
                      activeKeyword === kw
                        ? 'bg-neon-cyan text-dark-bg border-neon-cyan'
                        : 'bg-transparent text-slate-500 border-white/10 hover:border-neon-cyan/40 hover:text-slate-300'
                    }`}
                  >
                    {kw}
                  </button>
                ))}
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-24">
                  <span className="font-mono text-slate-600 text-xs uppercase tracking-[0.4em]">// No signals for this keyword yet</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  {filtered.map((article) => (
                    <a
                      key={article.id}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col p-8 bg-white/5 hover:bg-neon-cyan/5 transition-all border border-white/5 hover:border-neon-cyan/30"
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="font-mono text-neon-cyan text-xs font-bold w-12 shrink-0 pt-0.5">
                          {String(article.id).padStart(3, '0')}
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="text-[10px] font-black text-neon-purple uppercase tracking-[0.2em]">{article.keyword}</span>
                            {article.source && (
                              <span className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.15em]">{article.source}</span>
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-neon-cyan transition-colors leading-tight">
                            {article.title}
                          </h3>
                          {article.summary && (
                            <p className="mt-3 text-slate-400 text-xs leading-relaxed font-medium tracking-wide max-w-4xl">
                              {article.summary}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-4 md:ml-8 shrink-0">
                          <span className="font-mono text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
                            {formatDate(article.published_at)}
                          </span>
                          <svg
                            className="w-5 h-5 text-neon-cyan opacity-0 group-hover:opacity-100 -rotate-45 transform translate-x-[-10px] group-hover:translate-x-0 transition-all"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </>
          )}

        </div>
      </section>
    </main>
  );
};

export default NewsFeed;
