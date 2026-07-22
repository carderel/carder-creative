// Single source of truth for service-page content AND their structured data.
// Pure data (no React) so src/seo/siteMeta.ts can import it without pulling in
// component code. Keep slugs in sync with routes in AppRoutes.tsx, prerender.mjs,
// and public/sitemap.xml.

const SITE_URL = 'https://cardercreative.com'; // hardcoded to avoid a circular import with siteMeta.ts

export interface FaqItem {
  q: string;
  a: string;
}

export interface ProcessStep {
  num: string;
  title: string;
  description: string;
}

export interface IncludedItem {
  title: string;
  description: string;
}

export interface ServicePageData {
  slug: string; // e.g. '/seo-services' (no trailing slash)
  title: string; // document/meta title
  metaDescription: string;
  eyebrow: string; // small mono label above H1
  h1: string;
  heroLede: string;
  serviceType: string; // schema.org Service.serviceType
  included: IncludedItem[];
  process: ProcessStep[];
  aiConnectionHeading: string;
  aiConnectionBody: string;
  faq: FaqItem[];
}

// Builds [Service, FAQPage] JSON-LD for a service page. Provider references the
// global Organization node (@id) defined in index.html.
export function serviceJsonLd(data: ServicePageData): object[] {
  const url = `${SITE_URL}${data.slug}/`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: data.title.split('|')[0].trim(),
      serviceType: data.serviceType,
      url,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: 'Columbus, OH',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: data.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];
}

export const SEO_SERVICE: ServicePageData = {
  slug: '/seo-services',
  title: 'SEO Services in Columbus, Ohio | Carder Creative',
  metaDescription:
    'Technical, local, and content SEO for Columbus and Central Ohio businesses - the organic foundation that supports both traditional search and AI-powered discovery.',
  eyebrow: '// SEO SERVICES',
  h1: 'SEO Services for Columbus & Central Ohio Businesses',
  heroLede:
    'Strengthen the organic search foundation that supports both traditional search and AI-powered discovery. We make your business easier for search engines - and the AI systems built on top of them - to find, understand, and trust.',
  serviceType: 'Search Engine Optimization',
  included: [
    {
      title: 'Technical SEO Audits',
      description:
        'Crawlability, indexation, site speed, and the technical barriers that keep search engines and AI crawlers from reaching your key pages.',
    },
    {
      title: 'Local SEO & Entity Consistency',
      description:
        'Google Business Profile, citations, and consistent NAP data so Columbus customers - and the systems that recommend you - trust your business information.',
    },
    {
      title: 'Metadata, Schema & Internal Linking',
      description:
        'Titles, descriptions, structured data, and a clean internal link structure that helps every page get found and understood.',
    },
    {
      title: 'Content Structure & Page-Level Improvements',
      description:
        'Headings, on-page clarity, and content that answers the real questions your customers ask - readable for humans, structured for machines.',
    },
  ],
  process: [
    { num: '01', title: 'Audit', description: 'We assess crawl access, on-page signals, local presence, and how your site is currently understood by search and AI systems.' },
    { num: '02', title: 'Plan', description: 'We prioritize fixes by impact - technical foundations first, then local, content, and authority signals.' },
    { num: '03', title: 'Execute', description: 'We implement the changes: technical fixes, metadata, schema, internal links, and content improvements.' },
    { num: '04', title: 'Measure', description: 'We track rankings, impressions, clicks, and local visibility - and adjust based on what the data shows.' },
  ],
  aiConnectionHeading: 'SEO IS THE FOUNDATION AI DISCOVERY IS BUILT ON',
  aiConnectionBody:
    'AI visibility is not a replacement for SEO. It is strong SEO viewed through a different lens. The same fundamentals - accessible pages, clear information, trusted sources, consistent business data, and structured content - are exactly what help AI systems find, understand, verify, and recommend your business. Investing in SEO strengthens both channels at once.',
  faq: [
    { q: 'What does an SEO engagement include?', a: 'A typical engagement starts with a technical and on-page audit, then moves through local SEO, metadata and schema, internal linking, and content structure improvements - prioritized by impact. We can work as a one-time audit or as ongoing monthly support.' },
    { q: 'How is SEO different from AI visibility?', a: 'SEO optimizes how search engines rank your pages. AI visibility is about how AI systems like ChatGPT, Gemini, and Claude find, understand, and recommend your business. They share the same foundations, which is why we treat AI visibility as strong SEO viewed through a different lens.' },
    { q: 'Do you offer local SEO for Columbus businesses?', a: 'Yes. We focus on Columbus and Central Ohio businesses - Google Business Profile optimization, local citations, NAP consistency, and location-relevant content that helps you show up for nearby customers.' },
    { q: 'How long until we see results?', a: 'Technical fixes can be picked up within days to weeks. Ranking and traffic gains from content and authority work typically build over two to six months, depending on competition and your starting point. We report on leading indicators along the way.' },
    { q: 'Do you do one-time audits or ongoing work?', a: 'Both. Some clients want a one-time audit with a prioritized action list they implement themselves. Others prefer ongoing monthly execution and reporting. We scope to fit.' },
  ],
};
