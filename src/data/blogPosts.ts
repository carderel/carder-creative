// Single source of truth for blog posts AND their structured data.
// Pure data (no React) so src/seo/siteMeta.ts can import it without pulling in
// component code. To publish a new post: add the .md file to src/content/blog/,
// import it with ?raw, and append an entry here. That is the ONLY manual step:
// route meta (siteMeta.ts), the prerender route list, sitemap.xml, and feed.xml
// are all derived from this array at build time.

import whatRankingMd from '../content/blog/what-ranking-in-chatgpt-really-means.md?raw';
import geoMd from '../content/blog/generative-engine-optimization-what-geo-means.md?raw';
import crawlersMd from '../content/blog/ai-crawlers-what-they-want-from-your-website.md?raw';
import recommendMd from '../content/blog/how-ai-systems-decide-what-businesses-to-recommend.md?raw';
import auditMd from '../content/blog/ai-visibility-audit-checklist.md?raw';
import aiSearchColumbusMd from '../content/blog/ai-search-columbus-how-local-businesses-get-recommended.md?raw';
import platformsComparedMd from '../content/blog/chatgpt-perplexity-google-ai-overviews-compared.md?raw';

const SITE_URL = 'https://cardercreative.com'; // hardcoded to avoid a circular import with siteMeta.ts

export interface BlogPost {
  slug: string; // e.g. 'what-ranking-in-chatgpt-really-means' (no slashes)
  title: string; // display title (matches the markdown H1)
  metaTitle: string; // <title> tag (~60 chars max)
  metaDescription: string; // meta description (~155 chars max)
  datePublished: string; // ISO date, e.g. '2026-08-04'
  tags: string[];
  markdown: string; // raw .md source (frontmatter + body)
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'what-ranking-in-chatgpt-really-means',
    title: 'What "Ranking in ChatGPT" Really Means',
    metaTitle: 'What "Ranking in ChatGPT" Really Means | Carder Creative',
    metaDescription:
      "AI visibility tools track brand mentions, citations, and share of voice across sampled AI prompts. Here's what LLM rank tracking actually measures.",
    datePublished: '2026-08-04',
    tags: [
      'AI visibility',
      'LLM visibility tracking',
      'AI search optimization',
      'SEO',
      'generative engine optimization',
      'AI-powered discovery',
    ],
    markdown: whatRankingMd,
  },
  {
    slug: 'generative-engine-optimization-what-geo-means',
    title: 'Generative Engine Optimization: What GEO Actually Means for Your Business',
    metaTitle: 'What Is GEO? Generative Engine Optimization | Carder Creative',
    metaDescription:
      'Generative Engine Optimization means making your content visible and citable inside AI answers. What GEO is, what works, what to do first.',
    datePublished: '2026-08-18',
    tags: [
      'GEO',
      'generative engine optimization',
      'AI search optimization',
      'answer engine optimization',
      'AI visibility',
      'topical authority',
      'structured data',
      'SEO',
    ],
    markdown: geoMd,
  },
  {
    slug: 'ai-crawlers-what-they-want-from-your-website',
    title: "AI Crawlers Are Reading Your Website. Here's What They're Looking For.",
    metaTitle: 'AI Crawlers: What GPTBot and ClaudeBot Want | Carder Creative',
    metaDescription:
      'GPTBot, ClaudeBot, and PerplexityBot are crawling your site right now. What each one does, what they look for, and what to do about it.',
    datePublished: '2026-08-18',
    tags: [
      'AI crawlers',
      'GPTBot',
      'ClaudeBot',
      'PerplexityBot',
      'AI search visibility',
      'robots.txt AI',
      'llms.txt',
      'AI referral traffic',
      'structured data',
    ],
    markdown: crawlersMd,
  },
  {
    slug: 'how-ai-systems-decide-what-businesses-to-recommend',
    title: 'How AI Systems Decide Which Businesses to Recommend',
    metaTitle: 'How AI Picks Which Businesses to Recommend | Carder Creative',
    metaDescription:
      'ChatGPT, Perplexity, and AI Overviews do not pick businesses at random. How trust signals, citations, and entity consistency drive AI answers.',
    datePublished: '2026-08-18',
    tags: [
      'AI recommendations',
      'AI trust signals',
      'entity consistency',
      'AI citations',
      'AI brand visibility',
      'local SEO AI',
      'Google Business Profile AI',
      'structured data',
    ],
    markdown: recommendMd,
  },
  {
    slug: 'ai-visibility-audit-checklist',
    title: 'Is Your Business Visible to AI? A Practical 10-Point Audit',
    metaTitle: 'AI Visibility Audit: A 10-Point Checklist | Carder Creative',
    metaDescription:
      'Before you buy an AI visibility tool, run this 10-point audit: crawlability, entity consistency, content structure, citations, measurement.',
    datePublished: '2026-08-18',
    tags: [
      'AI visibility audit',
      'AI search visibility',
      'entity consistency',
      'structured data',
      'schema markup',
      'AI citations',
      'GEO',
      'ChatGPT visibility',
    ],
    markdown: auditMd,
  },
  {
    slug: 'ai-search-columbus-how-local-businesses-get-recommended',
    title: 'AI Search Columbus: How Local Businesses Get Recommended',
    metaTitle: 'AI Search Columbus: Getting Recommended | Carder Creative',
    metaDescription:
      'How do Columbus and Central Ohio businesses get recommended by ChatGPT, Google AI Overviews, and Perplexity? The local signals that actually matter.',
    datePublished: '2026-08-18',
    tags: [
      'AI search Columbus',
      'AI visibility Columbus',
      'local AI search',
      'Central Ohio marketing',
      'Google Business Profile',
      'AI-powered discovery',
      'local SEO',
      'generative engine optimization',
    ],
    markdown: aiSearchColumbusMd,
  },
  {
    slug: 'chatgpt-perplexity-google-ai-overviews-compared',
    title: 'ChatGPT vs. Perplexity vs. Google AI Overviews: How Each One Decides What to Cite',
    metaTitle: 'ChatGPT vs Perplexity vs Google AI Citations | Carder Creative',
    metaDescription:
      "ChatGPT, Perplexity, Google AI Overviews, Gemini, and Copilot pick sources differently. Here's what drives AI citations on each platform, plainly explained.",
    datePublished: '2026-08-18',
    tags: [
      'AI visibility',
      'generative engine optimization',
      'ChatGPT',
      'Perplexity AI',
      'Google AI Overviews',
      'Gemini',
      'Microsoft Copilot',
      'AI search citations',
      'AI-powered discovery',
    ],
    markdown: platformsComparedMd,
  },
];

/** Route paths for every published post, e.g. '/blog/my-slug'. Consumed by the
 *  prerenderer so the static route list can never drift from the registry. */
export const BLOG_ROUTES: string[] = BLOG_POSTS.map((post) => `/blog/${post.slug}`);

/** Posts sorted newest-first for the /blog listing. */
export function sortedBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

export function blogPostUrl(post: BlogPost): string {
  return `${SITE_URL}/blog/${post.slug}/`;
}

// BlogPosting JSON-LD for a post. Author/publisher reference the global
// Organization node (@id) defined in index.html.
export function blogPostJsonLd(post: BlogPost): object {
  const url = blogPostUrl(post);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.metaDescription,
    url,
    datePublished: post.datePublished,
    dateModified: post.datePublished,
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: post.tags.join(', '),
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };
}
