const Hero = () => {
  return (
    <section className="relative bg-white pt-20 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Write for humans.</span>{' '}
            <span className="block text-blue-600 xl:inline">Structure for machines.</span>
          </h1>
          <p className="mt-6 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-8 md:text-xl md:max-w-3xl">
            Helping Columbus businesses become easier for AI systems — ChatGPT, Gemini, Perplexity, and Claude — to find, understand, verify, and recommend.
          </p>
          <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
            <div className="rounded-md shadow">
              <a
                href="#diagnostic"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors shadow-lg"
              >
                Book Free Diagnostic
              </a>
            </div>
            <div className="mt-3 rounded-md sm:mt-0 sm:ml-4">
              <a
                href="#checklist"
                className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-semibold rounded-lg text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors shadow-sm"
              >
                Download Checklist
              </a>
            </div>
          </div>
          <p className="mt-8 text-sm text-gray-400 font-medium uppercase tracking-widest">
            Specialized for Columbus Mid-Market Businesses
          </p>
        </div>
      </div>
      
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 pointer-events-none opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
