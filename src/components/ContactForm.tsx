import React, { useState } from 'react';

const ContactForm = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [showPhone, setShowPhone] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="bg-white/5 p-12 border border-neon-cyan shadow-[0_0_30px_rgba(0,242,255,0.1)] text-center">
        <div className="flex items-center justify-center h-20 w-20 bg-neon-cyan/20 mx-auto mb-8">
          <svg className="h-10 w-10 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Transmission_Received</h3>
        <p className="text-slate-400 font-medium uppercase text-xs tracking-widest leading-loose">We will establish a link <br /> within 24 hours.</p>
        <button 
          onClick={() => setStatus(null)}
          className="mt-10 text-neon-purple font-black uppercase text-[10px] tracking-[0.3em] hover:text-white transition-colors"
        >
          [Send_Another_Signal]
        </button>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white/5 p-12 border border-white/10 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-white/10 uppercase tracking-widest pointer-events-none">
        Secure_Connection_v4.5
      </div>
      
      <div className="space-y-8">
        <div>
          <label htmlFor="name" className="block text-[10px] font-black text-neon-cyan uppercase tracking-[0.3em] mb-4">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full bg-transparent border-b border-white/20 py-4 text-white font-bold placeholder:text-white/10 focus:border-neon-cyan outline-none transition-all uppercase tracking-tighter"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-[10px] font-black text-neon-cyan uppercase tracking-[0.3em] mb-4">Work Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full bg-transparent border-b border-white/20 py-4 text-white font-bold placeholder:text-white/10 focus:border-neon-cyan outline-none transition-all"
            placeholder="email@company.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-[10px] font-black text-neon-cyan uppercase tracking-[0.3em] mb-4">Website URL</label>
          <textarea
            id="message"
            name="message"
            rows={3}
            className="w-full bg-transparent border-b border-white/20 py-4 text-white font-bold placeholder:text-white/10 focus:border-neon-cyan outline-none transition-all uppercase tracking-tighter resize-none"
            placeholder="YourDomain.com"
          ></textarea>
        </div>

        <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => setShowPhone(!showPhone)}>
          <div className={`w-5 h-5 border-2 transition-all flex items-center justify-center ${showPhone ? 'border-neon-cyan bg-neon-cyan/20' : 'border-white/20 group-hover:border-white/40'}`}>
            {showPhone && <div className="w-2 h-2 bg-neon-cyan shadow-[0_0_8px_#00f2ff]"></div>}
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-hover:text-white transition-colors">I would like a phone call</span>
        </div>

        {showPhone && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            <label htmlFor="phone" className="block text-[10px] font-black text-neon-cyan uppercase tracking-[0.3em] mb-4">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required={showPhone}
              className="w-full bg-transparent border-b border-white/20 py-4 text-white font-bold placeholder:text-white/10 focus:border-neon-cyan outline-none transition-all"
              placeholder="+1 (614) 000-0000"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-neon-cyan text-dark-bg py-6 font-black uppercase text-sm tracking-[0.3em] hover:bg-white transition-all shadow-[0_0_20px_rgba(0,242,255,0.2)] active:scale-95"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
