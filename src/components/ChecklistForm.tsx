import React, { useState } from 'react';

// REPLACE THIS WITH YOUR FORMSPREE ID
const FORMSPREE_ID = "mjgzvwvg";

const ChecklistForm = () => {
  const [status, setStatus] = useState<'idle' | 'fetching' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('fetching');
    setProgress(0);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Start UI progress animation
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 10;
      if (currentProgress >= 90) {
        currentProgress = 90;
        clearInterval(interval);
      }
      setProgress(Math.floor(currentProgress));
    }, 100);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      clearInterval(interval);
      if (response.ok) {
        setProgress(100);
        setTimeout(() => setStatus('success'), 500);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      clearInterval(interval);
      setStatus('error');
    }
  };

  if (status === 'fetching') {
    return (
      <div className="p-6 sm:p-10 font-mono text-left">
        <div className="text-neon-cyan text-xs mb-4 uppercase tracking-[0.2em]">_Initializing_Secure_Fetch</div>
        <div className="w-full bg-white/5 h-2 mb-6 overflow-hidden">
          <div 
            className="bg-neon-cyan h-full transition-all duration-300 shadow-[0_0_10px_#00f2ff]" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-slate-500 text-[10px] space-y-1 uppercase tracking-widest text-left">
          <div>{">"} Connecting to node_columbus_614...</div>
          <div>{">"} Requesting asset: visibility_checklist.pkg</div>
          <div>{">"} Verifying credentials...</div>
          {progress > 40 && <div>{">"} Decrypting payload...</div>}
          {progress > 70 && <div>{">"} Bypassing crawler blocks...</div>}
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="p-6 sm:p-10 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="flex items-center justify-center h-20 w-20 bg-neon-purple/20 mx-auto mb-8">
          <svg className="h-10 w-10 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </div>
        <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Payload_Ready</h3>
        <p className="text-slate-400 font-medium uppercase text-[10px] tracking-widest leading-loose mb-10">
          The AI Visibility Checklist has been <br /> synchronized with your device.
        </p>
        <a 
          href="/visibility_checklist.pdf" 
          download
          className="inline-block bg-neon-purple text-white px-10 py-5 font-black uppercase text-xs tracking-[0.4em] shadow-[0_0_20px_rgba(255,0,229,0.3)] hover:bg-white hover:text-dark-bg transition-all active:scale-95"
        >
          Execute_Download
        </a>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 text-left">
      <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
        ACCESS <br />
        <span className="text-transparent bg-clip-text vapor-gradient">INTEL</span>
      </h2>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-10 leading-loose">
        Enter your terminal address to unlock the <br /> AI Visibility Self-Assessment Checklist.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="check-email" className="block text-[10px] font-black text-neon-cyan uppercase tracking-[0.3em] mb-4">Work Email</label>
          <input
            type="email"
            id="check-email"
            name="email"
            required
            className="w-full bg-transparent border-b border-white/20 py-4 text-white font-bold placeholder:text-white/10 focus:border-neon-cyan outline-none transition-all"
            placeholder="j.doe@network.com"
          />
        </div>

        {status === 'error' && (
          <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest animate-pulse">
            ! Access_Denied: Transmission_Failed.
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-white text-dark-bg py-6 font-black uppercase text-sm tracking-[0.3em] hover:bg-neon-cyan transition-all active:scale-95 shadow-xl"
        >
          Request_Access
        </button>
      </form>
    </div>
  );
};

export default ChecklistForm;
