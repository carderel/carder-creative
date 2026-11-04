import { Link } from 'react-router-dom';
import { sortedBlogPosts } from '../data/blogPosts';

// The 404 page, laid out like a mall directory: a "you are here" marker, then
// every section of the site grouped into zones. Prerendered to dist/404.html and
// served by Cloudflare Pages at any unknown URL, so nothing here may depend on the
// current pathname: the client hydrates this same tree under whatever URL was hit.

interface NotFoundProps {
  onOpenDiagnostic: () => void;
}

interface Stop {
  label: string;
  href: string;
  note?: string;
  /** route = client-side <Link>; anchor = in-page section on another route;
   *  file = static file outside the React app (llms.txt, sitemap.xml). */
  kind: 'route' | 'anchor' | 'file';
  children?: Stop[];
}

interface Zone {
  code: string;
  name: string;
  summary: string;
  accent: 'cyan' | 'purple';
  stops: Stop[];
}

// Built at module load from the post registry, so a new post shows up here with
// no edit to this file.
const ZONES: Zone[] = [
  {
    code: 'A',
    name: 'Services',
    summary: 'What we do for clients.',
    accent: 'cyan',
    stops: [
      { label: 'AI Visibility', href: '/ai-visibility-services/', kind: 'route', note: 'Get AI assistants to find and recommend your business.' },
      { label: 'SEO Services', href: '/seo-services/', kind: 'route', note: 'Technical and local SEO so Google can find and rank your pages.' },
      { label: 'PPC Services', href: '/ppc-services/', kind: 'route', note: 'Google Ads campaigns aimed at the terms your buyers search.' },
    ],
  },
  {
    code: 'B',
    name: 'Learn',
    summary: 'Articles about AI search.',
    accent: 'purple',
    stops: [
      {
        label: 'Blog',
        href: '/blog/',
        kind: 'route',
        note: 'All of our articles in one place.',
        children: sortedBlogPosts().map((post) => ({
          label: post.title,
          href: `/blog/${post.slug}/`,
          kind: 'route' as const,
        })),
      },
    ],
  },
  {
    code: 'C',
    name: 'About us & contact',
    summary: 'Who we are and how to reach us.',
    accent: 'cyan',
    stops: [
      { label: 'About', href: '/#about-section', kind: 'anchor', note: 'Who runs Carder Creative and how we work.' },
      { label: 'Pricing', href: '/ai-visibility-services/#pricing-section', kind: 'anchor', note: 'Plans and prices for AI visibility work.' },
      { label: 'Contact', href: '/contact/', kind: 'route', note: 'Phone, email and a contact form. We reply within 24 hours.' },
    ],
  },
  {
    code: 'D',
    name: 'For AI assistants',
    summary: 'Plain facts about us for machines to read.',
    accent: 'purple',
    stops: [
      { label: 'AI Assistant Info', href: '/ai-info/', kind: 'route', note: 'Facts about Carder Creative for ChatGPT, Claude, Gemini and Perplexity.' },
      { label: 'AI Site Guide', href: '/site-guide/', kind: 'route', note: 'A short directory for crawlers and AI agents.' },
      { label: 'llms.txt', href: '/llms.txt', kind: 'file', note: 'A text summary of the site for language models.' },
      { label: 'sitemap.xml', href: '/sitemap.xml', kind: 'file', note: 'Every page URL, in the format search engines read.' },
    ],
  },
  {
    code: 'E',
    name: 'Small print',
    summary: 'The legal page.',
    accent: 'cyan',
    stops: [
      { label: 'Privacy Policy & Terms', href: '/legal/', kind: 'route', note: 'How we handle your data, plus our terms of service.' },
    ],
  },
];

const ACCENT = {
  cyan: { text: 'text-neon-cyan', border: 'border-neon-cyan/30', hover: 'hover:text-neon-cyan', badge: 'bg-neon-cyan text-dark-bg' },
  purple: { text: 'text-neon-purple', border: 'border-neon-purple/30', hover: 'hover:text-neon-purple', badge: 'bg-neon-purple text-dark-bg' },
} as const;

function StopLink({ stop, className }: { stop: Stop; className: string }) {
  if (stop.kind === 'route') {
    return <Link to={stop.href} className={className}>{stop.label}</Link>;
  }
  if (stop.kind === 'file') {
    return <a href={stop.href} target="_blank" rel="noopener" className={className}>{stop.label}</a>;
  }
  return <a href={stop.href} className={className}>{stop.label}</a>;
}

const NotFound: React.FC<NotFoundProps> = ({ onOpenDiagnostic }) => {
  return (
    <main className="pt-20">
      {/* Header */}
      <div className="bg-slate-950 py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-neon-cyan font-mono text-xs font-black uppercase tracking-[0.4em] mb-6">// ERROR 404</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-6">
            WRONG PAGE. <span className="text-transparent bg-clip-text vapor-gradient">THAT'S OK.</span>
          </h1>
          <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-2xl mb-10">
            The page you wanted isn't here. It may have moved, or the link had a typo. Below is a map of
            everything on the site, so you can go straight to what you came for.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-8 py-4 border border-neon-cyan text-neon-cyan font-black uppercase text-[10px] tracking-[0.3em] hover:bg-neon-cyan hover:text-dark-bg transition-all"
            >
              Take me home
            </Link>
            <button
              type="button"
              onClick={onOpenDiagnostic}
              className="inline-flex items-center justify-center px-8 py-4 border border-neon-purple text-neon-purple font-black uppercase text-[10px] tracking-[0.3em] hover:bg-neon-purple hover:text-dark-bg transition-all"
            >
              Book a free intro call
            </button>
          </div>
        </div>
      </div>

      {/* Directory */}
      <section className="py-16 bg-dark-bg" aria-labelledby="site-directory-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="site-directory-heading" className="text-neon-purple font-mono text-xs font-black uppercase tracking-[0.4em] mb-8">
            // SITE DIRECTORY
          </h2>

          {/* You are here */}
          <div className="flex items-center gap-4 mb-12 p-6 bg-white/5 border border-white/10">
            <span className="relative flex h-4 w-4 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-60 animate-ping"></span>
              <span className="relative inline-flex h-4 w-4 rounded-full bg-neon-cyan"></span>
            </span>
            <div>
              <p className="text-white font-black text-xs uppercase tracking-[0.3em]">You are here</p>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">A page that doesn't exist. You'll find every real page below.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ZONES.map((zone) => {
              const accent = ACCENT[zone.accent];
              return (
                <div key={zone.code} className={`p-6 sm:p-8 bg-slate-950 border ${accent.border}`}>
                  <div className="flex items-center gap-4 mb-3">
                    <span className={`inline-flex items-center justify-center h-8 w-8 shrink-0 font-mono font-black text-sm ${accent.badge}`} aria-hidden="true">
                      {zone.code}
                    </span>
                    <h3 className="text-white font-black text-lg uppercase tracking-tighter">{zone.name}</h3>
                  </div>
                  <p className="text-slate-500 text-sm font-medium mb-6">{zone.summary}</p>
                  <ul className="space-y-5">
                    {zone.stops.map((stop) => (
                      <li key={stop.href}>
                        <StopLink
                          stop={stop}
                          className={`text-white ${accent.hover} transition-colors text-xs font-black uppercase tracking-widest`}
                        />
                        {stop.note && <p className="text-slate-400 text-sm leading-relaxed mt-1">{stop.note}</p>}
                        {stop.children && stop.children.length > 0 && (
                          <ul className={`mt-3 space-y-2 border-l ${accent.border} pl-4`}>
                            {stop.children.map((child) => (
                              <li key={child.href}>
                                <StopLink
                                  stop={child}
                                  className={`text-slate-300 ${accent.hover} transition-colors text-sm leading-snug`}
                                />
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Still stuck */}
          <div className="mt-12 p-6 sm:p-10 bg-white/5 border border-white/10 sm:flex sm:items-center sm:justify-between gap-8">
            <div className="mb-6 sm:mb-0">
              <h3 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-3">// STILL CAN'T FIND IT?</h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xl">
                Tell us what you were looking for and we'll send you the right link.
              </p>
            </div>
            <Link
              to="/contact/"
              className="shrink-0 inline-flex items-center text-neon-cyan font-black text-xs uppercase tracking-[0.4em] hover:text-white transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
