const posts = [
  {
    title: "What 'rank in ChatGPT' actually means — and what it doesn't.",
    category: 'Analysis',
    date: 'May 2026',
  },
  {
    title: 'The 20-minute AI visibility check for a local services business.',
    category: 'Guide',
    date: 'May 2026',
  },
  {
    title: 'Why your Google Business Profile is more important for AI than you think.',
    category: 'Strategy',
    date: 'June 2026',
  },
  {
    title: 'The 20-minute AI visibility check for a local services business.',
    category: 'Technical',
    date: 'June 2026',
  },
];

const Resources = () => {
  return (
    <section id="resources" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Resources</h2>
          <p className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Insights for the AI Era
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Deep dives into the mechanics of AI visibility and generative search.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <a 
              key={post.title} 
              href="#" 
              className="group flex flex-col p-6 rounded-2xl border border-gray-100 hover:border-blue-600/20 hover:shadow-xl hover:shadow-blue-600/5 transition-all bg-slate-50"
            >
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">{post.category}</span>
              <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors mb-4 flex-grow">
                {post.title}
              </h3>
              <div className="flex items-center text-sm text-gray-400">
                <span>{post.date}</span>
                <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
