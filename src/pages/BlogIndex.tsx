import { Link } from 'react-router-dom';
import { sortedBlogPosts } from '../data/blogPosts';

// Format in UTC so the build (Node) and the browser produce identical strings —
// otherwise a timezone difference could shift the day and cause a hydration mismatch.
const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

const BlogIndex = () => {
  const posts = sortedBlogPosts();

  return (
    <main className="pt-20">
      <div className="bg-slate-950 py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-neon-cyan font-mono text-xs font-black uppercase tracking-[0.4em] mb-4">// FIELD NOTES</h2>
          <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-4">
            THE <span className="text-transparent bg-clip-text vapor-gradient">BLOG</span>
          </h1>
          <p className="text-slate-400 font-medium uppercase text-xs tracking-widest leading-loose max-w-2xl">
            Plain-English analysis of AI visibility, GEO, and SEO - how AI systems find, understand, and recommend businesses.
          </p>
        </div>
      </div>

      <section className="py-16 bg-dark-bg border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}/`}
                className="group flex flex-col p-8 bg-white/5 hover:bg-neon-cyan/5 transition-all border border-white/5 hover:border-neon-cyan/30"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-grow min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[9px] font-black text-neon-purple uppercase tracking-[0.15em] border border-neon-purple/30 px-2 py-0.5">{tag}</span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.15em]">+{post.tags.length - 3}</span>
                      )}
                    </div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-neon-cyan transition-colors leading-tight">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-slate-400 text-sm leading-relaxed font-medium tracking-wide max-w-4xl">
                      {post.metaDescription}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 md:ml-8 shrink-0">
                    <span className="font-mono text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
                      {formatDate(post.datePublished)}
                    </span>
                    <svg
                      className="w-5 h-5 text-neon-cyan opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogIndex;
