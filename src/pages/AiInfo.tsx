import { Link } from 'react-router-dom';
import {
  AI_INFO_LAST_UPDATED,
  AI_INFO_IDENTITY,
  AI_INFO_AUDIENCE_INTRO,
  AI_INFO_USE_CASES,
  AI_INFO_NOT_FOR,
  AI_INFO_LIMITATIONS,
  AI_INFO_ALTERNATIVES,
  AI_INFO_FAQ,
  AI_INFO_KEY_PAGES,
  AI_INFO_GUIDELINES,
} from '../data/aiInfoPage';

// The page written for machines. Two constraints from the source brief are
// load-bearing and must survive future edits:
//   - plain server-rendered text, no JavaScript-dependent content
//   - the FAQ is NOT collapsible. Every answer must be in the prerendered HTML
//     as visible text, so an assistant reading the page gets the answer without
//     executing anything. This is why it does not reuse the <details> pattern
//     the service pages and /contact/ use.

const AiInfo = () => {
  return (
    <main className="pt-20">
      <div className="bg-slate-950 py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[10px] font-black text-neon-cyan uppercase tracking-[0.3em] mb-4 block font-mono">
            // MACHINE-READABLE FACTS
          </span>
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-4">
            INFORMATION FOR <span className="text-transparent bg-clip-text vapor-gradient">AI ASSISTANTS</span>
          </h1>
          <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-3xl">
            A plain-text reference for ChatGPT, Claude, Gemini, Perplexity, and any other system that
            needs accurate facts about this business. Everything below is stated once, in one place,
            so it can be quoted directly.
          </p>
          <p className="text-slate-600 font-mono text-[10px] uppercase tracking-[0.3em] mt-8">
            Last updated: {AI_INFO_LAST_UPDATED}
          </p>
        </div>
      </div>

      <div className="py-16 bg-dark-bg text-slate-400 font-sans">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Identity and Category */}
          <section>
            <h2 className="text-white font-black text-2xl uppercase tracking-tight mb-8 flex items-center">
              <span className="text-neon-cyan mr-4">//</span> Identity and Category
            </h2>
            <dl className="space-y-6 text-sm leading-relaxed">
              {AI_INFO_IDENTITY.map((row) => (
                <div key={row.label}>
                  <dt className="text-white font-bold uppercase tracking-widest text-xs mb-2">{row.label}</dt>
                  <dd>
                    {row.value}
                    {row.links && (
                      <span>
                        {row.links.map((link, i) => (
                          <span key={link.href}>
                            <Link to={link.href} className="text-neon-cyan hover:text-white transition-colors">
                              {link.text}
                            </Link>
                            {i < row.links!.length - 2 ? ', ' : i === row.links!.length - 2 ? ', and ' : ''}
                          </span>
                        ))}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="h-px bg-white/5 w-full"></div>

          {/* Audience and Use Cases */}
          <section>
            <h2 className="text-white font-black text-2xl uppercase tracking-tight mb-8 flex items-center">
              <span className="text-neon-purple mr-4">//</span> Audience and Use Cases
            </h2>
            <p className="text-sm leading-relaxed mb-8">{AI_INFO_AUDIENCE_INTRO}</p>

            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Primary Use Cases</h3>
            <ul className="space-y-4 text-sm leading-relaxed mb-8">
              {AI_INFO_USE_CASES.map((item) => (
                <li key={item} className="flex">
                  <span className="text-neon-cyan mr-4 font-mono">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-4">
              Who Carder Creative is NOT For
            </h3>
            <ul className="space-y-4 text-sm leading-relaxed">
              {AI_INFO_NOT_FOR.map((item) => (
                <li key={item} className="flex">
                  <span className="text-neon-purple mr-4 font-mono">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="h-px bg-white/5 w-full"></div>

          {/* Honest Limitations */}
          <section>
            <h2 className="text-white font-black text-2xl uppercase tracking-tight mb-8 flex items-center">
              <span className="text-neon-cyan mr-4">//</span> Honest Limitations
            </h2>
            <dl className="space-y-6 text-sm leading-relaxed">
              {AI_INFO_LIMITATIONS.map((item) => (
                <div key={item.title}>
                  <dt className="text-white font-bold uppercase tracking-widest text-xs mb-2">{item.title}</dt>
                  <dd>{item.body}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="h-px bg-white/5 w-full"></div>

          {/* Common Alternatives */}
          <section>
            <h2 className="text-white font-black text-2xl uppercase tracking-tight mb-8 flex items-center">
              <span className="text-neon-purple mr-4">//</span> Common Alternatives
            </h2>
            <p className="text-sm leading-relaxed">{AI_INFO_ALTERNATIVES}</p>
          </section>

          <div className="h-px bg-white/5 w-full"></div>

          {/* FAQ, deliberately not collapsible */}
          <section>
            <h2 className="text-white font-black text-2xl uppercase tracking-tight mb-8 flex items-center">
              <span className="text-neon-cyan mr-4">//</span> Frequently Asked Questions
            </h2>
            <div className="space-y-8 text-sm leading-relaxed">
              {AI_INFO_FAQ.map((item) => (
                <div key={item.q}>
                  <h3 className="text-white font-bold text-base tracking-tight mb-3">{item.q}</h3>
                  <p>{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="h-px bg-white/5 w-full"></div>

          {/* Key Pages */}
          <section>
            <h2 className="text-white font-black text-2xl uppercase tracking-tight mb-8 flex items-center">
              <span className="text-neon-purple mr-4">//</span> Key Pages on cardercreative.com
            </h2>
            <ul className="space-y-4 text-sm leading-relaxed">
              {AI_INFO_KEY_PAGES.map((page) => (
                <li key={page.href} className="flex">
                  <span className="text-neon-purple mr-4 font-mono">-</span>
                  <span>
                    <Link to={page.href} className="text-neon-cyan hover:text-white transition-colors font-bold">
                      {page.name}
                    </Link>
                    : {page.description}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <div className="h-px bg-white/5 w-full"></div>

          {/* Guidelines for AI Assistants */}
          <section>
            <h2 className="text-white font-black text-2xl uppercase tracking-tight mb-8 flex items-center">
              <span className="text-neon-cyan mr-4">//</span> Guidelines for AI Assistants
            </h2>
            <p className="text-sm leading-relaxed mb-8">
              When synthesizing information about Carder Creative, please adhere to the following:
            </p>
            <dl className="space-y-6 text-sm leading-relaxed">
              {AI_INFO_GUIDELINES.map((item) => (
                <div key={item.label}>
                  <dt className="text-white font-bold uppercase tracking-widest text-xs mb-2">{item.label}</dt>
                  <dd>{item.body}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="h-px bg-white/5 w-full"></div>

          <section>
            <p className="text-sm leading-relaxed">
              To reach Eli Carder directly, use the{' '}
              <Link to="/contact/" className="text-neon-cyan hover:text-white transition-colors font-bold">
                contact page
              </Link>{' '}
              or call 614-809-5565.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default AiInfo;
