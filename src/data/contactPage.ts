// Content and structured data for /contact/.
// Kept beside servicePages.ts and blogPosts.ts so siteMeta.ts stays a thin
// registry: the page component and the JSON-LD read from the same source, which
// is what stops the visible FAQ and the FAQPage schema from drifting apart.

import { SITE_URL } from '../seo/siteMeta';

export interface FaqItem {
  q: string;
  a: string;
}

/** Direct contact channels. Every value here is verified project fact: the phone
 *  number the user supplied 2026-08-04, the inbox the contact form already
 *  transmits to, and the company LinkedIn profile that is in Organization
 *  sameAs. No street address: Carder Creative is a service-area business and the
 *  address is deliberately withheld, matching the hidden-address GBP setup. */
export const CONTACT_CHANNELS = {
  phone: '614-809-5565',
  phoneHref: 'tel:+16148095565',
  email: 'aivisibility@cardercreative.com',
  linkedIn: 'https://www.linkedin.com/company/carder-creative/',
  serviceArea: 'Columbus and Central Ohio',
  responseTime: 'within 24 hours',
} as const;

/** What happens after the form is sent. Mirrors the copy already published in
 *  the ContactForm success state and the service-page CTA, so the promise made
 *  here is the promise already made everywhere else on the site. */
export const CONTACT_STEPS: { title: string; description: string }[] = [
  {
    title: 'You send the details',
    description:
      'The form below, or a direct call. Tell us the site, the market, and what is not working. Nothing more is needed to start.',
  },
  {
    title: 'We reply within 24 hours',
    description:
      'A real reply from the practitioner who would do the work, not an intake queue. If a call makes sense, we book one.',
  },
  {
    title: 'A free 30-minute call',
    description:
      'We surface the visible issues and frame the opportunity. No obligation, no pitch deck, no junior account manager.',
  },
];

export const CONTACT_FAQ: FaqItem[] = [
  {
    q: 'How quickly will I hear back?',
    a: 'Within 24 hours. Inquiries are accepted any time through the form or by phone, and consultations are booked by appointment.',
  },
  {
    q: 'Do you only work with businesses in Columbus?',
    a: 'Columbus and Central Ohio are the focus, and local search is a core part of the practice. Carder Creative also works with national and global clients who want direct, expert-level execution.',
  },
  {
    q: 'What happens on the first call?',
    a: 'A free 30-minute call. We surface the visible issues on your site and in your search presence, then frame the opportunity. There is no obligation to continue.',
  },
  {
    q: 'Do you require a long-term contract?',
    a: 'No. Engagements are flexible: a flat project fee, such as the AI Visibility Audit, or an ongoing monthly retainer. There are no long-term lock-ins and no mandatory minimum ad spend.',
  },
];

/** ContactPage + FAQPage, merged into the page's single @graph by entry-server.
 *  The ContactPage points at the existing Organization and LocalBusiness nodes by
 *  @id rather than restating the NAP, so there is exactly one place on the site
 *  where the business identity is defined. */
export function contactJsonLd(): object[] {
  const url = `${SITE_URL}/contact/`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': `${url}#contactpage`,
      url,
      name: 'Contact Carder Creative',
      description:
        'Contact Carder Creative in Columbus, Ohio for AI visibility, SEO, and Google Ads. Phone, email, and a direct contact form.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      mainEntity: { '@id': `${SITE_URL}/#business` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: CONTACT_FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];
}
