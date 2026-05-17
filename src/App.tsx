import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Methodology from './components/Methodology';
import Pricing from './components/Pricing';
import About from './components/About';
import Resources from './components/Resources';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Social Proof / Stats Strip */}
        <div className="bg-slate-50 border-y border-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-slate-900">100M+</div>
                <div className="text-sm text-gray-500 mt-1">AI Users Weekly</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">4-Stage</div>
                <div className="text-sm text-gray-500 mt-1">Proven Framework</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">Local</div>
                <div className="text-sm text-gray-500 mt-1">Columbus Presence</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">100%</div>
                <div className="text-sm text-gray-500 mt-1">Honest Measurement</div>
              </div>
            </div>
          </div>
        </div>

        <Methodology />
        <Pricing />
        <About />
        <Resources />
        
        {/* Contact / Lead Magnet Section */}
        <section id="diagnostic" className="py-24 bg-blue-600 relative overflow-hidden text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="lg:flex lg:items-start lg:justify-between gap-16">
              <div className="lg:w-1/2 mb-16 lg:mb-0">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  Ready to verify your AI visibility?
                </h2>
                <p className="mt-6 text-xl text-blue-100 leading-relaxed">
                  Book a free 30-minute diagnostic call. We'll surface 2–3 visible issues and frame the broader opportunity for your business.
                </p>
                <div className="mt-10 p-6 bg-blue-700/50 rounded-2xl border border-blue-400/30">
                  <h4 className="text-white font-bold mb-2">Looking for the Checklist?</h4>
                  <p className="text-blue-100 text-sm mb-4">Download our "AI Visibility Self-Assessment Checklist" to run your own preliminary audit.</p>
                  <a
                    id="checklist"
                    href="#"
                    className="inline-flex items-center text-white font-bold hover:text-blue-200 transition-colors"
                  >
                    Download Self-Assessment
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </a>
                </div>
                <p className="mt-8 text-sm text-blue-200 font-medium italic">
                  "Honest measurement. Rigorous methodology. Columbus roots."
                </p>
              </div>
              
              <div className="lg:w-5/12">
                <ContactForm />
              </div>
            </div>
          </div>
          
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-800/20 rounded-full blur-3xl"></div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
