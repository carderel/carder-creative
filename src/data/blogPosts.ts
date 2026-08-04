// Single source of truth for blog posts AND their structured data.
// Pure data (no React) so src/seo/siteMeta.ts can import it without pulling in
// component code. To publish a new post: add the .md file to src/content/blog/,
// import it with ?raw, and append an entry here. Keep slugs in sync with
// prerender.mjs ROUTES and public/sitemap.xml.

import whatRankingMd from '../content/blog/what-ranking-in-chatgpt-really-means.md?raw';

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
];

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
