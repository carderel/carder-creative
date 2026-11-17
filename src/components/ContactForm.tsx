import React, { useEffect, useId, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NEED_OPTIONS, isNeedSlug, needLabel, type NeedSlug } from '../data/inquiry';
import { CONTACT_CHANNELS } from '../data/contactPage';
import { trackEvent } from '../lib/analytics';

// Formspree form ID. Submissions are emailed to the owner by Formspree.
const FORMSPREE_ID = "xwvzkoeg";

interface ContactFormProps {
  /** Category to preselect, e.g. from a service-specific CTA. When omitted, the
   *  form reads ?need=<slug> from the URL after mount (never during render, so
   *  the prerendered HTML and the first client render stay identical). */
  defaultNeed?: NeedSlug;
}

type FieldErrors = Partial<Record<'name' | 'email' | 'phone', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const labelClass = 'block text-[10px] font-black text-neon-cyan uppercase tracking-[0.3em] mb-3';
const inputClass =
  'w-full bg-transparent border-b border-white/20 py-3 text-white font-bold placeholder:text-white/30 focus:border-neon-cyan outline-none transition-all aria-[invalid=true]:border-red-400';
const errorClass = 'mt-2 text-red-400 text-xs font-bold';

const ContactForm: React.FC<ContactFormProps> = ({ defaultNeed }) => {
  const uid = useId();
  const id = (field: string) => `${uid}-${field}`;
  const { search } = useLocation();
  const needRef = useRef<HTMLSelectElement>(null);

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [wantsCall, setWantsCall] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  // Preselect the category from ?need= after mount. Writing the DOM value of an
  // uncontrolled select keeps this out of render (no hydration mismatch).
  useEffect(() => {
    if (defaultNeed || !needRef.current) return;
    const need = new URLSearchParams(search).get('need');
    if (isNeedSlug(need)) needRef.current.value = need;
  }, [search, defaultNeed]);

  const validate = (form: HTMLFormElement): FieldErrors => {
    const data = new FormData(form);
    const next: FieldErrors = {};
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    if (!name) next.name = 'Please enter your name.';
    if (!email) next.email = 'Please enter your email address.';
    else if (!EMAIL_RE.test(email)) next.email = 'Please enter a valid email address, like name@company.com.';
    if (wantsCall && !String(data.get('phone') ?? '').trim()) {
      next.phone = 'Please enter a phone number, or uncheck the phone call option.';
    }
    return next;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(form);
    setErrors(found);
    const firstInvalid = (['name', 'email', 'phone'] as const).find((f) => found[f]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`#${CSS.escape(id(firstInvalid))}`)?.focus();
      return;
    }

    setStatus('submitting');
    const formData = new FormData(form);
    const needSlug = String(formData.get('need') ?? '');
    const need = needLabel(needSlug) ?? 'Not specified';

    // Human-readable keys: these become the field names in the owner's email.
    const payload: Record<string, string> = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      company_or_website: String(formData.get('company_or_website') ?? '').trim(),
      need,
      description: String(formData.get('description') ?? '').trim(),
      phone_call_requested: wantsCall ? 'Yes' : 'No',
      phone: wantsCall ? String(formData.get('phone') ?? '').trim() : '',
      page: window.location.pathname,
      _subject: `New inquiry: ${need}`,
    };

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        trackEvent('generate_lead', {
          lead_type: 'inquiry',
          need: isNeedSlug(needSlug) ? needSlug : 'none',
          phone_call_requested: wantsCall ? 'yes' : 'no',
          page_path: window.location.pathname,
        });
      }
      setStatus(response.ok ? 'success' : 'error');
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  const isSubmitting = status === 'submitting';

  if (status === 'success') {
    return (
      <div role="status" className="bg-white/5 p-8 sm:p-10 border border-neon-cyan shadow-[0_0_30px_rgba(0,242,255,0.1)] text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="flex items-center justify-center h-20 w-20 bg-neon-cyan/20 mx-auto mb-8 text-center">
          <svg aria-hidden="true" className="h-10 w-10 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-mono text-[10px] text-neon-cyan uppercase tracking-[0.3em] mb-3">// Transmission_Received</p>
        <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 text-center">Message Sent</h3>
        <p className="text-slate-400 font-medium text-sm leading-relaxed text-center">
          Thanks. You will get a reply within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => { setStatus('idle'); setWantsCall(false); }}
          className="mt-10 text-neon-purple font-black uppercase text-[10px] tracking-[0.3em] hover:text-white transition-colors"
        >
          [Send another message]
        </button>
      </div>
    );
  }

  const describedBy = (field: keyof FieldErrors) => (errors[field] ? id(`${field}-error`) : undefined);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSubmitting}
      className="bg-white/5 p-8 sm:p-10 border border-white/10 relative overflow-hidden text-left"
    >
      <div aria-hidden="true" className="absolute top-0 right-0 p-4 font-mono text-[8px] text-white/10 uppercase tracking-widest pointer-events-none">
        Secure_Connection_v4.5
      </div>

      <div className="space-y-7">
        <div>
          <label htmlFor={id('name')} className={labelClass}>Name <span aria-hidden="true">*</span></label>
          <input
            type="text"
            id={id('name')}
            name="name"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy('name')}
            className={`${inputClass} uppercase tracking-tighter`}
            placeholder="Your name"
          />
          {errors.name && <p id={id('name-error')} className={errorClass}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={id('email')} className={labelClass}>Email <span aria-hidden="true">*</span></label>
          <input
            type="email"
            id={id('email')}
            name="email"
            autoComplete="email"
            inputMode="email"
            required
            aria-required="true"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy('email')}
            className={inputClass}
            placeholder="name@company.com"
          />
          {errors.email && <p id={id('email-error')} className={errorClass}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor={id('company')} className={labelClass}>Company or website <span className="text-slate-400 normal-case tracking-normal font-bold">(optional)</span></label>
          <input
            type="text"
            id={id('company')}
            name="company_or_website"
            autoComplete="organization"
            className={inputClass}
            placeholder="yourdomain.com"
          />
        </div>
        <div className="group">
          <label htmlFor={id('need')} className={labelClass}>What do you need help with?</label>
          <select
            ref={needRef}
            id={id('need')}
            name="need"
            defaultValue={defaultNeed ?? ''}
            className={`${inputClass} bg-dark-bg cursor-pointer`}
          >
            <option value="">Choose one (optional)</option>
            {NEED_OPTIONS.map((o) => (
              <option key={o.slug} value={o.slug}>{o.label}</option>
            ))}
          </select>
          {/* Shown by CSS (no state) when the Focused Diagnostic option is selected. */}
          <p className="hidden group-has-[option[value=focused-diagnostic]:checked]:block mt-3 text-slate-400 text-xs font-medium leading-relaxed">
            Describe the one issue you want reviewed. We confirm it fits the diagnostic scope and arrange payment before work starts.
          </p>
        </div>
        <div>
          <label htmlFor={id('description')} className={labelClass}>Brief description <span className="text-slate-400 normal-case tracking-normal font-bold">(optional)</span></label>
          <textarea
            id={id('description')}
            name="description"
            rows={4}
            className={`${inputClass} font-medium resize-y`}
            placeholder="What is happening, and what have you tried?"
          />
        </div>

        <div>
          <label htmlFor={id('call')} className="flex items-center gap-4 cursor-pointer group">
            <input
              type="checkbox"
              id={id('call')}
              checked={wantsCall}
              onChange={(e) => setWantsCall(e.target.checked)}
              className="w-5 h-5 accent-[#00f2ff] cursor-pointer"
            />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-white transition-colors">I would prefer a phone call</span>
          </label>
        </div>

        {wantsCall && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            <label htmlFor={id('phone')} className={labelClass}>Phone number <span aria-hidden="true">*</span></label>
            <input
              type="tel"
              id={id('phone')}
              name="phone"
              autoComplete="tel"
              required
              aria-required="true"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={describedBy('phone')}
              className={inputClass}
              placeholder="(614) 000-0000"
            />
            {errors.phone && <p id={id('phone-error')} className={errorClass}>{errors.phone}</p>}
          </div>
        )}

        {/* Live region: announces validation, sending, and failure states. */}
        <div role="status" aria-live="polite" className="empty:hidden">
          {Object.keys(errors).length > 0 && status !== 'submitting' && (
            <p className="text-red-400 text-xs font-bold">
              Please fix the {Object.keys(errors).length === 1 ? 'field' : `${Object.keys(errors).length} fields`} marked above.
            </p>
          )}
          {isSubmitting && (
            <div className="font-mono">
              <div className="text-neon-cyan text-xs mb-3 uppercase tracking-[0.2em] animate-pulse">Sending your message...</div>
              <div className="w-full bg-white/5 h-1 overflow-hidden">
                <div className="bg-neon-cyan h-full w-full animate-progress shadow-[0_0_10px_#00f2ff]"></div>
              </div>
            </div>
          )}
        </div>

        {status === 'error' && (
          <p role="alert" className="text-red-400 text-xs font-bold leading-relaxed">
            We may not have received your message. Email{' '}
            <a href={`mailto:${CONTACT_CHANNELS.email}`} className="underline hover:text-white">{CONTACT_CHANNELS.email}</a>{' '}
            or call <a href={CONTACT_CHANNELS.phoneHref} className="underline hover:text-white">{CONTACT_CHANNELS.phone}</a>.
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-neon-cyan text-dark-bg py-6 font-black uppercase text-sm tracking-[0.3em] hover:bg-white transition-all shadow-[0_0_20px_rgba(0,242,255,0.2)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
