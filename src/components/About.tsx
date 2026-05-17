const About = () => {
  return (
    <section id="about" className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h2 className="text-base text-blue-400 font-semibold tracking-wide uppercase">Why Us?</h2>
            <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Local Relationships. <br />
              <span className="text-blue-500">Global Expertise.</span>
            </p>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed">
              Based in Columbus, Ohio, we specialize in helping mid-market businesses navigate the shift from traditional search to AI-powered discovery. We don't just "do AI SEO" — we apply a rigorous framework built on intellectual honesty and technical depth.
            </p>
            
            <div className="mt-10 space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold">Honest Measurement</h4>
                  <p className="mt-1 text-slate-400 text-sm">
                    We distinguish between confirmed and probable signals. No vague promises — just rigorous, observable data.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold">Columbus Focused</h4>
                  <p className="mt-1 text-slate-400 text-sm">
                    We understand the local market. From insurance to healthcare, we build strategies for the businesses that drive Ohio's economy.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 lg:mt-0 lg:w-5/12 relative">
            <div className="aspect-square bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 flex items-center justify-center p-12">
               <div className="text-center">
                 <div className="text-blue-500 text-6xl font-black mb-4">6-10</div>
                 <div className="text-xl font-bold text-white mb-2">Weeks to Visibility</div>
                 <p className="text-slate-400 text-sm">Our typical implementation timeline for measurable results.</p>
               </div>
            </div>
            {/* Decoration */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-600/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
