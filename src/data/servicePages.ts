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
      areaServed: { '@type': 'City', name: 'Columbus', containedInPlace: { '@type': 'State', name: 'Ohio' } },
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
    'Technical, local, and content SEO for Columbus and Central Ohio businesses - the foundation that supports both traditional search and AI-powered discovery.',
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

export const PPC_SERVICE: ServicePageData = {
  slug: '/ppc-services',
  title: 'PPC & Google Ads Management in Columbus, Ohio | Carder Creative',
  metaDescription:
    'Google Ads strategy, management, and conversion tracking for Columbus businesses - capture high-intent demand while organic search and AI visibility mature.',
  eyebrow: '// PPC SERVICES',
  h1: 'PPC & Google Ads Management for Columbus Businesses',
  heroLede:
    'Capture high-intent demand right now while your organic search and AI visibility mature. We build, manage, and measure Google Ads campaigns that turn searches into customers - and feed what we learn back into your SEO.',
  serviceType: 'Pay-per-click advertising management',
  included: [
    { title: 'Google Ads Strategy & Management', description: 'Campaign structure, keyword selection, bidding, and ongoing optimization built around your margins and goals.' },
    { title: 'Search Query & Intent Analysis', description: 'We mine the queries triggering your ads to separate high-intent buyers from wasted spend - and to inform your organic content.' },
    { title: 'Conversion Tracking Review', description: 'We verify that leads, calls, and sales are tracked accurately so spend decisions are based on real outcomes, not guesses.' },
    { title: 'Landing Page Alignment', description: 'We align ad messaging with landing pages so the click-to-conversion path is clear, fast, and relevant.' },
  ],
  process: [
    { num: '01', title: 'Audit', description: 'We review your account structure, spend, conversion tracking, and the queries currently triggering ads.' },
    { num: '02', title: 'Plan', description: 'We define campaign structure, target queries, budget allocation, and the conversion actions that matter.' },
    { num: '03', title: 'Execute', description: 'We build and launch campaigns, align landing pages, and set up clean conversion tracking.' },
    { num: '04', title: 'Measure', description: 'We optimize against cost-per-acquisition and ROAS, cutting waste and scaling what converts.' },
  ],
  aiConnectionHeading: 'PAID DEMAND BUYS TIME WHILE ORGANIC & AI VISIBILITY COMPOUND',
  aiConnectionBody:
    'PPC and SEO are not either/or. Paid search captures high-intent demand immediately, while SEO and AI visibility build durable, compounding presence over time. The query data from your ads reveals exactly what your customers search for - intelligence we feed straight into your organic content and AI-visibility work.',
  faq: [
    { q: 'What platforms do you manage?', a: 'We focus on Google Ads (Search, and Performance Max where it fits). We can advise on Microsoft Ads and paid social, and scope those in when they match your goals.' },
    { q: 'How much should I budget for Google Ads?', a: 'It depends on your industry, competition, and goals. We help you set a budget tied to a target cost-per-acquisition rather than a fixed number, and we start conservatively while we gather conversion data.' },
    { q: 'How does PPC fit with SEO and AI visibility?', a: 'PPC delivers immediate, high-intent traffic while SEO and AI visibility build over months. The query and conversion data from ads also informs which topics and pages to prioritize organically - so the channels strengthen each other.' },
    { q: 'Do you set up conversion tracking?', a: 'Yes. Accurate conversion tracking is the foundation of profitable PPC. We review or implement tracking for leads, calls, and sales before scaling spend.' },
    { q: 'Is there a minimum commitment?', a: 'We keep engagements flexible. Many clients start with an audit and initial build, then move to monthly management. We scope to fit your budget and goals.' },
  ],
};
