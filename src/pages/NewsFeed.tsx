import { useState, useMemo } from 'react';

export interface Article {
  id: number;
  url: string;
  title: string;
  source: string | null;
  published_at: string | null;
  keywords: string[];
  summary: string | null;
}

declare global {
  interface Window {
    // Seed data injected into the prerendered /news page so client hydration
    // matches the server-rendered article list (no flash, no mismatch).
    __NEWS_ARTICLES__?: Article[];
  }
}

// Format in UTC so the build (Node) and the browser produce identical strings —
// otherwise a timezone difference could shift the day and cause a hydration mismatch.
const formatDate = (dateStr: string | null): string => {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  } catch {
    return dateStr;
  }
};

type SortMode = 'Newest' | 'Oldest';
type Period = 'All' | '24h' | '7 days' | '30 days';

const PERIODS: Period[] = ['All', '24h', '7 days', '30 days'];

// Window (in ms) each period represents. 'All' has no window.
const PERIOD_MS: Record<Exclude<Period, 'All'>, number> = {
  '24h': 24 * 60 * 60 * 1000,
  '7 days': 7 * 24 * 60 * 60 * 1000,
  '30 days': 30 * 24 * 60 * 60 * 1000,
};

// Parse published_at to an epoch ms, or null when missing/invalid.
const parseTime = (dateStr: string | null): number | null => {
  if (!dateStr) return null;
  const t = new Date(dateStr).getTime();
  return Number.isNaN(t) ? null : t;
};

interface NewsFeedProps {
  // Provided during prerender (server). On the client it is undefined and the
  // seed is read from window.__NEWS_ARTICLES__ instead, so first render matches SSR.
  initialArticles?: Article[];
}

function resolveSeed(initialArticles?: Article[]): Article[] {
  if (initialArticles && initialArticles.length) return initialArticles;
  if (typeof window !== 'undefined' && Array.isArray(window.__NEWS_ARTICLES__)) return window.__NEWS_ARTICLES__;
  return [];
}

const NewsFeed: React.FC<NewsFeedProps> = ({ initialArticles }) => {
  const seed = resolveSeed(initialArticles);
  const [articles] = useState<Article[]>(seed);
  const [activeKeyword, setActiveKeyword] = useState<string>('All');
  // Defaults keep the first (hydration) render deterministic: sorting by
  // published_at is pure, and period 'All' avoids any "now"-dependent math on
  // the server. Period filtering only kicks in after a client interaction.
  const [sortMode, setSortMode] = useState<SortMode>('Newest');
  const [activePeriod, setActivePeriod] = useState<Period>('All');
  // "Now" reference for the period-filter cutoff. Captured in the period
  // button's click handler (not during render) so render stays pure/SSR-safe.
  // Stays null until a non-'All' period is chosen on the client.
  const [nowRef, setNowRef] = useState<number | null>(null);

  const keywords = useMemo(() => {
    const seen = new Set<string>();
    articles.forEach(a => a.keywords.forEach(k => seen.add(k)));
    return ['All', ...Array.from(seen).sort()];
  }, [articles]);

  const filtered = useMemo(() => {
    // 1. Keyword filter.
    let result = activeKeyword === 'All'
      ? articles
      : articles.filter(a => a.keywords.includes(activeKeyword));

    // 2. Period filter. 'All' is a no-op (and the only value during SSR/first
    //    render, so no "now"-dependent math runs on the server). Any other
    //    period uses the "now" reference captured when the period button was
    //    clicked (nowRef) rather than reading the clock during render, and
    //    excludes articles with an unknown (null/invalid) published_at.
    if (activePeriod !== 'All' && nowRef !== null) {
      const cutoff = nowRef - PERIOD_MS[activePeriod];
      result = result.filter(a => {
        const t = parseTime(a.published_at);
        return t !== null && t >= cutoff;
      });
    }

    // 3. Sort by published_at. Null/unknown dates always sort to the bottom in
    //    both modes. This is deterministic and safe on server and client.
    const sorted = [...result].sort((a, b) => {
      const ta = parseTime(a.published_at);
      const tb = parseTime(b.published_at);
      if (ta === null && tb === null) return 0;
      if (ta === null) return 1;
      if (tb === null) return -1;
      return sortMode === 'Newest' ? tb - ta : ta - tb;
    });

    return sorted;
  }, [articles, activeKeyword, activePeriod, sortMode, nowRef]);

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
          <p className="mt-4 font-mono text-[10px] text-slate-600 uppercase tracking-[0.2em]">
            {articles.length} signals indexed · refreshed daily at 11:00 UTC
          </p>
        </div>
      </div>

      <section className="py-16 bg-dark-bg border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Period + sort controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex flex-wrap gap-2">
              {PERIODS.map(p => (
                <button
                  key={p}
                  onClick={() => {
                    // Capture "now" here, in the click handler, rather than
                    // during render — keeps the filter computation pure.
                    setNowRef(p === 'All' ? null : Date.now());
                    setActivePeriod(p);
                  }}
                  className={`px-4 py-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${
                    activePeriod === p
                      ? 'bg-neon-cyan text-dark-bg border-neon-cyan'
                      : 'bg-transparent text-slate-500 border-white/10 hover:border-neon-cyan/40 hover:text-slate-300'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {(['Newest', 'Oldest'] as SortMode[]).map(mode => (
                <button
                  key={mode}
                  onClick={() => setSortMode(mode)}
                  className={`px-4 py-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${
                    sortMode === mode
                      ? 'bg-neon-cyan text-dark-bg border-neon-cyan'
                      : 'bg-transparent text-slate-500 border-white/10 hover:border-neon-cyan/40 hover:text-slate-300'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

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
              <span className="font-mono text-slate-600 text-xs uppercase tracking-[0.4em]">// No signals match these filters</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {filtered.map((article) => (
                <a
                  key={article.id}
                  href={article.url}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="group flex flex-col p-8 bg-white/5 hover:bg-neon-cyan/5 transition-all border border-white/5 hover:border-neon-cyan/30"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="font-mono text-neon-cyan text-xs font-bold w-12 shrink-0 pt-0.5">
                      {String(article.id).padStart(3, '0')}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        {article.keywords.slice(0, 3).map((kw) => (
                          <span key={kw} className="text-[9px] font-black text-neon-purple uppercase tracking-[0.15em] border border-neon-purple/30 px-2 py-0.5">{kw}</span>
                        ))}
                        {article.keywords.length > 3 && (
                          <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.15em]">+{article.keywords.length - 3}</span>
                        )}
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

        </div>
      </section>
    </main>
  );
};

export default NewsFeed;
