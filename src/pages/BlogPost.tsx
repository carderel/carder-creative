import { Link, useParams } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogPosts';
import { parseArticle } from '../blog/markdown';

// Format in UTC so the build (Node) and the browser produce identical strings —
// otherwise a timezone difference could shift the day and cause a hydration mismatch.
const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

const BlogPost = () => {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="pt-20">
        <div className="bg-slate-950 py-24 border-b border-white/5">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-mono text-slate-600 text-xs uppercase tracking-[0.4em] mb-6">// SIGNAL NOT FOUND</p>
            <Link to="/blog/" className="text-neon-cyan font-black text-xs uppercase tracking-[0.4em] hover:text-white transition-colors">
              Back to Blog
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Pure function of the markdown string — identical output on SSR and client.
  const { title, nodes } = parseArticle(post.markdown);

  return (
    <main className="pt-20">
      <div className="bg-slate-950 py-16 border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog/"
            className="inline-block font-mono text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] hover:text-neon-cyan transition-colors mb-8"
          >
            &lt;&lt; Back to Blog
          </Link>
          <p className="text-neon-cyan font-mono text-xs font-black uppercase tracking-[0.4em] mb-4">// FIELD NOTES</p>
          <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-black text-white uppercase tracking-tighter leading-[0.95] mb-6">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
              {formatDate(post.datePublished)} · Carder Creative
            </span>
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[9px] font-black text-neon-purple uppercase tracking-[0.15em] border border-neon-purple/30 px-2 py-0.5">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <article className="py-16 bg-dark-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">{nodes}</div>
      </article>

      {/* CTA */}
      <section className="py-16 bg-slate-950 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter mb-6">
            SEE WHERE YOU <span className="text-transparent bg-clip-text vapor-gradient">ACTUALLY STAND</span>
          </h2>
          <p className="text-slate-400 text-base font-medium leading-relaxed mb-8 max-w-2xl">
            We audit how AI systems find, understand, and represent your business - and report what is confirmed vs. probable, honestly.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <a
              href="/ai-visibility-services/"
              className="inline-block px-8 py-4 bg-neon-cyan text-dark-bg font-black uppercase text-[10px] tracking-[0.3em] border border-neon-cyan hover:bg-white hover:border-white transition-all text-center"
            >
              Explore AI Visibility Services
            </a>
            <Link to="/blog/" className="text-neon-cyan font-black text-xs uppercase tracking-[0.4em] hover:text-white transition-colors">
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogPost;
