import { useState } from 'react';

const ContactForm = () => {
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real production environment, you would send this to your backend or a service like Formspree/HubSpot.
    // For now, we simulate a success message.
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mx-auto mb-4">
          <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900">Message Received</h3>
        <p className="mt-2 text-gray-600">We'll be in touch within 24 hours to schedule your diagnostic call.</p>
        <button 
          onClick={() => setStatus(null)}
          className="mt-6 text-blue-600 font-semibold hover:text-blue-700"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
    >
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2 text-left">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2 text-left">Work Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
            placeholder="john@company.com"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-slate-900 mb-2 text-left">Company Name</label>
          <input
            type="text"
            id="company"
            name="company"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
            placeholder="Your Business Name"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2 text-left">How can we help?</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none"
            placeholder="Tell us about your AI visibility goals..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/20 active:scale-[0.98]"
        >
          Schedule Diagnostic Call
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
