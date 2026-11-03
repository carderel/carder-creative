// Single source of truth for service-page content AND their structured data.
// Pure data (no React) so src/seo/siteMeta.ts can import it without pulling in
// component code. Keep slugs in sync with routes in AppRoutes.tsx, prerender.mjs,
// and public/sitemap.xml.

import type { NeedSlug } from './inquiry';
import { FOCUSED_DIAGNOSTIC } from './focusedDiagnostic';

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

/** A hero or card CTA: opens the inquiry modal with a category preselected,
 *  or links to an in-page anchor. */
export type ServiceCta = { label: string; need: NeedSlug } | { label: string; href: string };

export interface EngagementOption {
  kind: 'One-time' | 'Ongoing';
  title: string;
  description: string;
  /** Pricing basis shown under the description, e.g. "Custom quote". */
  scope: string;
  cta: string;
  need: NeedSlug;
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
  /** Context-specific hero CTAs. */
  heroPrimaryCta: ServiceCta;
  heroSecondaryCta: ServiceCta;
  /** Category preselected in the page's own contact form. */
  formNeed: NeedSlug;
  /** Optional "ways to work together" block shown under the hero. */
  engagements?: {
    heading: string;
    intro: string;
    /** When set, the $300 Focused Diagnostic block leads the section with this opening line. */
    diagnosticLede?: string;
    options: EngagementOption[];
  };
  /** Closing contact section copy. */
  ctaHeading: [string, string];
  ctaBody: string;
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
      ...(data.engagements?.diagnosticLede
        ? {
            offers: {
              '@type': 'Offer',
              name: FOCUSED_DIAGNOSTIC.name,
              price: FOCUSED_DIAGNOSTIC.priceValue,
              priceCurrency: 'USD',
            },
          }
        : {}),
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
    'AI visibility is not a replacement for SEO. It is strong SEO viewed through a different lens. The same fundamentals - accessible pages, clear information, trusted sources, consistent business data, and structured content - are exactly what [help AI systems find, understand, verify, and recommend your business](/blog/how-ai-systems-decide-what-businesses-to-recommend/). Investing in SEO strengthens both channels at once.',
  faq: [
    { q: 'What does an SEO engagement include?', a: 'A typical engagement starts with a technical and on-page audit, then moves through local SEO, metadata and schema, internal linking, and content structure improvements - prioritized by impact. We can work as a one-time audit or as ongoing monthly support.' },
    { q: 'How is SEO different from AI visibility?', a: 'SEO optimizes how search engines rank your pages. AI visibility is about how AI systems like ChatGPT, Gemini, and Claude find, understand, and recommend your business. They share the same foundations, which is why we treat AI visibility as strong SEO viewed through a different lens.' },
    { q: 'Do you offer local SEO for Columbus businesses?', a: 'Yes. We focus on Columbus and Central Ohio businesses - Google Business Profile optimization, local citations, NAP consistency, and location-relevant content that helps you show up for nearby customers.' },
    { q: 'How long until we see results?', a: 'Technical fixes can be picked up within days to weeks. Ranking and traffic gains from content and authority work typically build over two to six months, depending on competition and your starting point. We report on leading indicators along the way.' },
    { q: 'Do you do one-time audits or ongoing work?', a: 'Both. Some clients want a one-time audit with a prioritized action list they implement themselves. Others prefer ongoing monthly execution and reporting. We scope to fit.' },
    { q: 'What does the $300 Focused Diagnostic cover?', a: 'One isolated technical SEO issue, with up to 60 minutes of consultation and investigation and a brief written summary of findings and recommended next steps. It is not a comprehensive SEO audit. Implementation and repairs are quoted separately.' },
  ],
  heroPrimaryCta: { label: 'Request SEO Help', need: 'seo' },
  heroSecondaryCta: { label: 'See Ways to Work Together', href: '#engagements' },
  formNeed: 'seo',
  engagements: {
    heading: 'ONE-TIME FIXES OR ONGOING SEO',
    intro: 'Start with a $300 Focused Diagnostic for one isolated technical SEO issue. Comprehensive SEO audits, larger technical implementations, and ongoing optimization are custom-quoted, and the person who diagnoses the issue implements the fix.',
    diagnosticLede: 'Have one isolated technical SEO issue, such as a page that will not index or a broken redirect? Get an experienced second opinion without committing to a large project or ongoing contract.',
    options: [
      { kind: 'One-time', title: 'Comprehensive SEO Audit', description: 'A technical and on-page review with a prioritized action list you can implement yourself or hand back to us.', scope: 'Custom quote', cta: 'Request an SEO Audit', need: 'seo' },
      { kind: 'One-time', title: 'Technical SEO Implementation', description: 'Indexing, crawlability, redirects, structured data, and other technical work, diagnosed and then implemented under an agreed scope.', scope: 'Custom quote', cta: 'Request a Technical Fix', need: 'seo' },
      { kind: 'Ongoing', title: 'Ongoing SEO Support', description: 'Monthly technical, local, and content SEO execution with reporting. Agencies can subcontract SEO work.', scope: 'Custom monthly retainer', cta: 'Discuss Ongoing SEO', need: 'ongoing-support' },
    ],
  },
  ctaHeading: ['GET HELP WITH', 'YOUR SEO'],
  ctaBody: 'Describe the issue or the site. You get a reply within 24 hours and a quote before any paid work starts. A free 30-minute call is available if it helps.',
};

export const PPC_SERVICE: ServicePageData = {
  slug: '/ppc-services',
  title: 'PPC & Google Ads Management in Columbus, Ohio | Carder Creative',
  metaDescription:
    'Google Ads strategy, management, and conversion tracking for Columbus businesses - capture high-intent demand while organic search and AI visibility mature.',
  eyebrow: '// PPC SERVICES',
  h1: 'PPC & Google Ads Management for Columbus Businesses',
  heroLede:
    'Carder Creative is an independent PPC agency in Columbus, Ohio. Capture high-intent demand right now while your organic search and AI visibility mature. We build, manage, and measure Google Ads campaigns that turn searches into customers - and feed what we learn back into your SEO.',
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
    'PPC and SEO are not either/or. Paid search captures high-intent demand immediately, while SEO and [AI visibility](/blog/generative-engine-optimization-what-geo-means/) build durable, compounding presence over time. The query data from your ads reveals exactly what your customers search for - intelligence we feed straight into your organic content and AI-visibility work.',
  faq: [
    { q: 'Are you a PPC agency or a PPC management company?', a: 'Both descriptions fit, with one caveat worth stating plainly. Carder Creative is an independent PPC agency serving Columbus and Central Ohio, and the person who audits your account is the person who runs it. There is no account-manager layer between you and the work, and no junior buyer learning on your budget. If you are comparing Ohio PPC companies, that is the difference worth asking every one of them about.' },
    { q: 'What platforms do you manage?', a: 'We focus on Google Ads (Search, and Performance Max where it fits). We can advise on Microsoft Ads and paid social, and scope those in when they match your goals.' },
    { q: 'How much should I budget for Google Ads?', a: 'It depends on your industry, competition, and goals. We help you set a budget tied to a target cost-per-acquisition rather than a fixed number, and we start conservatively while we gather conversion data.' },
    { q: 'How does PPC fit with SEO and AI visibility?', a: 'PPC delivers immediate, high-intent traffic while SEO and AI visibility build over months. The query and conversion data from ads also informs which topics and pages to prioritize organically - so the channels strengthen each other.' },
    { q: 'Do you set up conversion tracking?', a: 'Yes. Accurate conversion tracking is the foundation of profitable PPC. We review or implement tracking for leads, calls, and sales before scaling spend.' },
    { q: 'Is there a minimum commitment?', a: 'We keep engagements flexible. Many clients start with an audit and initial build, then move to monthly management. We scope to fit your budget and goals.' },
    { q: 'What does the $300 Focused Diagnostic cover?', a: 'One specific Google Ads or conversion tracking issue, with up to 60 minutes of consultation and investigation and a brief written summary of findings and recommended next steps. It is not a full account audit. Repairs and further work are quoted separately.' },
  ],
  heroPrimaryCta: { label: 'Request an Account Review', need: 'google-ads' },
  heroSecondaryCta: { label: 'Get Tracking Help', need: 'conversion-tracking' },
  formNeed: 'google-ads',
  engagements: {
    heading: 'ONE-TIME PROJECTS OR ONGOING MANAGEMENT',
    intro: 'Start with a $300 Focused Diagnostic for one specific Google Ads or conversion tracking issue. Comprehensive account audits, campaign management, and ongoing PPC are custom-quoted, and the person who reviews your account does the work.',
    diagnosticLede: 'Have one specific Google Ads or conversion tracking issue? Get an experienced second opinion without committing to a full account audit or ongoing management.',
    options: [
      { kind: 'One-time', title: 'Google Ads Account Review', description: 'Find wasted spend, campaign structure problems, tracking issues, and missed opportunities across the account. You get a full assessment with prioritized recommendations.', scope: 'Custom quote', cta: 'Request an Account Review', need: 'google-ads' },
      { kind: 'One-time', title: 'Campaign Repairs', description: 'Fixes for campaign problems such as falling conversions, rising costs, or disapproved ads, carried out under an agreed scope.', scope: 'Quoted by scope', cta: 'Get Campaign Help', need: 'google-ads' },
      { kind: 'One-time', title: 'Conversion Tracking Repair', description: 'Find and fix why GA4, Google Tag Manager, and Google Ads disagree, then implement the agreed repair.', scope: 'Quoted by scope and complexity', cta: 'Get Tracking Help', need: 'conversion-tracking' },
      { kind: 'Ongoing', title: 'Ongoing Management', description: 'Monthly Google Ads management and optimization. Agencies can subcontract campaign management.', scope: 'Custom monthly retainer', cta: 'Discuss Ongoing Management', need: 'ongoing-support' },
    ],
  },
  ctaHeading: ['GET HELP WITH', 'YOUR GOOGLE ADS'],
  ctaBody: 'Describe the account or the problem. You get a reply within 24 hours and a quote before any paid work starts. A free 30-minute call is available if it helps.',
};

export const AI_VISIBILITY_SERVICE: ServicePageData = {
  slug: '/ai-visibility-services',
  title: 'AI Visibility & GEO Services in Columbus, Ohio | Carder Creative',
  metaDescription:
    'AI search optimization for Columbus businesses - make it easy for ChatGPT, Gemini, and Claude to find, understand, verify, and recommend you.',
  eyebrow: '// AI VISIBILITY SERVICES',
  h1: 'AI Visibility Services for Columbus & Central Ohio Businesses',
  heroLede:
    'The shift from traditional search to AI search is here. We make your business easier for AI systems - ChatGPT, Gemini, Perplexity, Claude - to find, understand, verify, and recommend. It is not a replacement for SEO; it is strong SEO viewed through a new lens.',
  serviceType: 'AI Visibility / Generative Engine Optimization',
  included: [
    { title: 'AI Visibility Audits', description: 'A baseline of how AI systems currently find, read, and represent your business - crawl access, entity clarity, citations, and gaps.' },
    { title: 'Entity Clarity & Content Structure', description: 'Clear, structured content and consistent business data so AI systems can extract what you do, where you operate, and who you serve.' },
    { title: 'Citation & Trust Signal Review', description: 'Strengthen the third-party sources, reviews, and directory profiles that AI systems weigh when deciding whom to trust and recommend.' },
    { title: 'AI Referral & Visibility Monitoring', description: 'Track AI referrals, crawler activity, sampled prompt visibility, and citation drift over time - honest, observable measurement.' },
  ],
  process: [
    { num: '01', title: 'Audit', description: 'We baseline how AI and search systems currently find, understand, and represent your business.' },
    { num: '02', title: 'Plan', description: 'We prioritize the highest-impact fixes across access, clarity, trust, and content.' },
    { num: '03', title: 'Execute', description: 'We implement structured data, content, citations, and technical repairs.' },
    { num: '04', title: 'Measure', description: 'We monitor AI referrals, citations, and sampled visibility - and adjust.' },
  ],
  aiConnectionHeading: 'AI VISIBILITY IS STRONG SEO, VIEWED THROUGH A NEW LENS',
  aiConnectionBody:
    'AI search rewards the same fundamentals strong SEO always has: [accessible pages](/blog/ai-crawlers-what-they-want-from-your-website/), clear information, trusted sources, consistent business data, structured content, citations, reviews, and clean measurement. We improve those underlying signals so you are easier to find, understand, verify, and recommend - whether the customer starts in Google or in an AI assistant. Not sure where you stand? Start with the [10-point AI visibility audit](/blog/ai-visibility-audit-checklist/).',
  faq: [
    { q: 'What is AI visibility (or GEO)?', a: 'AI visibility - sometimes called Generative Engine Optimization (GEO) or Answer Engine Optimization (AEO) - is about how AI systems like ChatGPT, Gemini, Perplexity, and Claude find, understand, and recommend your business. It focuses on the signals those systems use, rather than only traditional search rankings.' },
    { q: 'Do you offer AI search optimization in Columbus?', a: 'Yes. AI search optimization is exactly what we do - it is another name for AI visibility, or GEO. We help Columbus and Central Ohio businesses show up when customers ask AI-powered search tools like ChatGPT, Gemini, and Perplexity for recommendations.' },
    { q: 'How is this different from SEO?', a: 'It is not a replacement for SEO - it is strong SEO viewed through a different lens. The same foundations (accessible pages, clear content, trusted citations, consistent data) drive both. We treat them as one connected system.' },
    { q: 'Can you guarantee we will rank #1 in ChatGPT?', a: 'No - and anyone who promises that is overselling. AI answers are generated and vary by prompt and context. We improve the underlying signals and measure sampled visibility and confirmed AI referrals honestly, distinguishing probable from confirmed.' },
    { q: 'How do you measure AI visibility?', a: 'A mix of confirmed signals (AI referral traffic, crawler activity in logs) and directional ones (sampled prompt testing, citation frequency, share of voice). We report what is confirmed vs. probable rather than vanity numbers.' },
    { q: 'What does an engagement look like?', a: 'Single-location businesses start with the fixed-scope AI Visibility Sprint. Larger or multi-location sites start with the AI Visibility Audit. From there you can move into Enhancements, then add ongoing monitoring.' },
  ],
  heroPrimaryCta: { label: 'Discuss AI Visibility', need: 'ai-visibility' },
  heroSecondaryCta: { label: 'See Pricing', href: '#pricing-section' },
  formNeed: 'ai-visibility',
  ctaHeading: ['BOOK A FREE', 'INTRO CALL'],
  ctaBody: 'A free 30-minute call. We surface visible issues and frame the opportunity, with no obligation.',
};
