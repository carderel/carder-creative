import { Link } from 'react-router-dom';
import { FOCUSED_DIAGNOSTIC as D } from '../data/focusedDiagnostic';
import { contactHref } from '../data/inquiry';

// Featured block for the $300 Focused Diagnostic, the only fixed-price service.
// Used on the homepage (CTA is a crawlable link to /contact/) and on the SEO and
// PPC pages (CTA opens the inquiry modal, like the other CTAs there).

interface FocusedDiagnosticProps {
  /** Page-specific opening line; defaults to the general summary. */
  lede?: string;
  /** When provided, the CTA is a button that calls this (modal). Otherwise it
   *  links to the contact form with the category preselected. */
  onRequest?: () => void;
}

const ctaClass =
  'inline-block w-full sm:w-auto py-4 px-8 text-center bg-neon-cyan text-dark-bg font-black uppercase text-[10px] tracking-[0.25em] border border-neon-cyan hover:bg-white hover:border-white transition-all';

const FocusedDiagnostic: React.FC<FocusedDiagnosticProps> = ({ lede = D.summary, onRequest }) => (
  <div
    id="focused-diagnostic"
    className="scroll-mt-24 border border-neon-cyan/60 bg-white/5 shadow-[0_0_30px_rgba(0,242,255,0.08)] p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
  >
    <div className="flex flex-col">
      <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-neon-cyan">// Fixed fee. One specific issue.</p>
      <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-4">{D.name}</h3>
      <p className="mb-6 flex items-baseline gap-3">
        <span className="text-4xl sm:text-5xl font-black text-white tracking-tighter">{D.price}</span>
        <span className="text-[11px] font-bold text-neon-cyan uppercase tracking-widest">{D.priceLabel}</span>
      </p>
      <p className="text-slate-300 text-base font-medium leading-relaxed mb-6">{lede}</p>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">Included</p>
      <ul className="space-y-2 mb-8">
        {D.included.map((item) => (
          <li key={item} className="flex gap-3 text-slate-300 text-sm font-medium leading-relaxed">
            <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 shrink-0 bg-neon-cyan" />
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        {onRequest ? (
          <button type="button" onClick={onRequest} className={ctaClass}>{D.cta}</button>
        ) : (
          <Link to={contactHref('focused-diagnostic')} className={ctaClass}>{D.cta}</Link>
        )}
      </div>
    </div>

    <div className="lg:border-l lg:border-white/10 lg:pl-16">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">Before we start</p>
      <ol className="space-y-3 mb-8">
        {D.beforeWeStart.map((item, i) => (
          <li key={item} className="flex gap-3 text-slate-300 text-sm font-medium leading-relaxed">
            <span aria-hidden="true" className="font-mono text-neon-cyan text-xs font-black pt-0.5">0{i + 1}</span>
            {item}
          </li>
        ))}
      </ol>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">Scope</p>
      <ul className="space-y-2">
        {D.limits.map((item) => (
          <li key={item} className="flex gap-3 text-slate-400 text-sm font-medium leading-relaxed">
            <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 shrink-0 bg-neon-purple" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default FocusedDiagnostic;
