import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import { CONTACT_CHANNELS, CONTACT_STEPS, CONTACT_FAQ } from '../data/contactPage';

// A real, shareable contact route. The pop-up diagnostic modal stays exactly as
// it was on every other page: this page is an addition, not a replacement, so no
// existing conversion path changes. It reuses the same ContactForm component the
// modal renders, which keeps the Formspree endpoint and the submit states in one
// place.

const Contact = () => {
  return (
    <main className="pt-20">
      <div className="bg-slate-950 py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[10px] font-black text-neon-cyan uppercase tracking-[0.3em] mb-4 block font-mono">
            // CONTACT
          </span>
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-4">
            TALK TO <span className="text-transparent bg-clip-text vapor-gradient">CARDER CREATIVE</span>
          </h1>
          <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-2xl">
            Send the details below, or call. You reach the practitioner who would do the work, not an
            intake queue. Replies come {CONTACT_CHANNELS.responseTime}.
          </p>
        </div>
      </div>

      {/* Form + direct channels */}
      <section className="py-16 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:flex lg:items-start lg:gap-20">
          <div className="lg:w-3/5 mb-16 lg:mb-0">
            <h2 className="text-white font-black text-2xl uppercase tracking-tight mb-8 flex items-center">
              <span className="text-neon-cyan mr-4">//</span> Send a Message
            </h2>
            <ContactForm />
          </div>

          <div className="lg:w-2/5">
            <h2 className="text-white font-black text-2xl uppercase tracking-tight mb-8 flex items-center">
              <span className="text-neon-purple mr-4">//</span> Direct Channels
            </h2>
            <dl className="font-mono text-[11px] uppercase tracking-widest space-y-8">
              <div>
                <dt className="text-neon-cyan font-black tracking-[0.3em] mb-3">Phone</dt>
                <dd>
                  <a
                    href={CONTACT_CHANNELS.phoneHref}
                    className="text-white font-bold hover:text-neon-cyan transition-colors text-base tracking-tight"
                  >
                    {CONTACT_CHANNELS.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-neon-cyan font-black tracking-[0.3em] mb-3">Email</dt>
                <dd>
                  <a
                    href={`mailto:${CONTACT_CHANNELS.email}`}
                    className="text-white font-bold hover:text-neon-cyan transition-colors break-all"
                  >
                    {CONTACT_CHANNELS.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-neon-cyan font-black tracking-[0.3em] mb-3">LinkedIn</dt>
                <dd>
                  <a
                    href={CONTACT_CHANNELS.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-bold hover:text-neon-cyan transition-colors"
                  >
                    Carder Creative
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-neon-cyan font-black tracking-[0.3em] mb-3">Service Area</dt>
                <dd className="text-slate-400 font-bold leading-loose">
                  {CONTACT_CHANNELS.serviceArea}. National and global clients welcome. Consultations by
                  appointment.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="py-16 bg-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-12">
            What Happens Next
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {CONTACT_STEPS.map((step, i) => (
              <li key={step.title} className="glass-card p-8 border border-white/10">
                <span className="font-mono text-neon-cyan text-[10px] font-black tracking-[0.3em] block mb-6">
                  0{i + 1}
                </span>
                <h3 className="text-white font-black text-lg uppercase tracking-tight mb-4">{step.title}</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-dark-bg border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-12">FAQ</h2>
          <div className="max-w-3xl space-y-4">
            {CONTACT_FAQ.map((item) => (
              <details key={item.q} className="group glass-card p-6 border border-white/10">
                <summary className="cursor-pointer list-none flex justify-between items-center text-white font-black text-sm uppercase tracking-tight">
                  {item.q}
                  <span className="text-neon-cyan ml-4 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="text-slate-400 text-sm font-medium leading-relaxed mt-4">{item.a}</p>
              </details>
            ))}
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-12">
            Researching first?{' '}
            <Link to="/ai-info/" className="text-neon-cyan hover:text-white transition-colors">
              Information for AI assistants
            </Link>{' '}
            lists the facts, pricing model, and limitations in one place.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Contact;
