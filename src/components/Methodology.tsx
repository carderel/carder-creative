const steps = [
  {
    title: 'Find',
    description: 'We audit discovery and access, technical discovery (robots.txt, sitemaps), and crawl issues to ensure AI systems and their feeding search systems can access your relevant pages.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    title: 'Understand',
    description: 'We optimize entity clarity, on-page content, and structured data (JSON-LD) so models can accurately extract what you do, who you serve, and why you matter.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Trust',
    description: 'We strengthen citation and trust signals through reviews, industry directories, and NAP consistency to corroborate your information across authoritative web sources.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Recommend',
    description: 'We build recommendation-layer improvements like objection handling and proof points, surfacing your business over alternatives in commercially relevant AI prompts.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

const Methodology = () => {
  return (
    <section id="methodology" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Our Framework</h2>
          <p className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            The Path to AI Discovery
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            We use a rigorous four-stage model to ensure your business is ready for the generative search era.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.title} 
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative hover:shadow-md transition-shadow flex flex-col h-full"
            >
              <div className="text-blue-600 mb-6 bg-blue-50 w-16 h-16 flex items-center justify-center rounded-xl">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center">
                <span className="text-blue-200 text-4xl font-black mr-3 opacity-50">{index + 1}</span>
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm flex-grow">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Methodology;
