// Single source of truth for service pricing, used by BOTH the visible Pricing
// component and the machine-readable /pricing.md generated at build time.
//
// Why the .md file exists: AI assistants and agentic buyers increasingly compare
// options programmatically before a human visits the site. Pricing locked inside a
// JS-rendered component is unreadable to them, and opaque pricing gets filtered out
// of AI-mediated shortlists. For a practice that sells AI discoverability, its own
// pricing being machine-readable is the minimum credible standard.

export interface PricingTier {
  name: string;
  price: string;
  duration: string;
  description?: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  note?: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'AI Visibility Sprint',
    price: '$1,500',
    duration: '10 BUSINESS DAYS',
    description: 'Fixed-scope foundation for single-location service businesses.',
    features: [
      'Baseline prompt test (4 AI engines)',
      'AI search crawler access fix',
      'Entity & NAP consistency check',
      'Core schema deployment',
      'Prioritized fix list',
    ],
    cta: 'Start Sprint',
  },
  {
    name: 'AI Visibility Audit',
    price: '$3,500',
    duration: '2-3 WEEKS',
    features: [
      'Discovery access audit',
      'Entity clarity check',
      'Structured data review',
      'Trust & corroboration',
      'Gap report (PDF)',
    ],
    cta: 'Schedule Audit',
    note: '100% of the audit fee is credited toward Enhancements if Enhancements starts within 30 days.',
  },
  {
    name: 'AI Visibility Enhancements',
    price: '$8,000',
    duration: '6-10 WEEKS',
    description: 'Targeted execution across six critical workstreams.',
    features: [
      'Content & entity improvements',
      'AI-readable site guide',
      'Sitemap/Robots repairs',
      'Schema deployment',
      'Citation cleanup',
      'Freshness feed setup',
    ],
    cta: 'Start Implementation',
    highlighted: true,
  },
  {
    name: 'Ongoing Monitoring',
    price: '$2,500',
    duration: 'MONTHLY',
    features: [
      'AI referral tracking',
      'Crawler activity monitor',
      'Synthetic prompt runs',
      'Citation drift alerts',
      'Monthly strategy report',
    ],
    cta: 'Subscribe',
  },
];

/** Machine-readable pricing for AI assistants and agentic buyers. Written to
 *  dist/pricing.md at build time so it can never drift from the visible tiers. */
export function pricingMarkdown(siteUrl: string): string {
  const lines: string[] = [
    '# Pricing  -  Carder Creative',
    '',
    'AI visibility, SEO, and PPC services for Columbus and Central Ohio businesses.',
    'Independent practice. The person who audits your account is the person who runs it.',
    '',
    `Source of truth: ${siteUrl}/ai-visibility-services/`,
    'Currency: USD. Prices are project fees unless marked MONTHLY.',
    '',
  ];

  for (const tier of PRICING_TIERS) {
    lines.push(`## ${tier.name}`);
    const isMonthly = tier.duration.toUpperCase().includes('MONTH');
    lines.push(`- Price: ${tier.price}${isMonthly ? ' per month' : ' one-time project fee'}`);
    lines.push(`- Duration: ${tier.duration.toLowerCase()}`);
    if (tier.description) lines.push(`- Summary: ${tier.description}`);
    if (tier.note) lines.push(`- Note: ${tier.note}`);
    lines.push(`- Includes: ${tier.features.join('; ')}`);
    lines.push('');
  }

  lines.push('## How engagements start');
  lines.push('- Engagements begin with either the AI Visibility Sprint (single-location businesses) or the AI Visibility Audit (larger or multi-location sites). Both are sold standalone.');
  lines.push('- The Audit fee is 100% credited toward Enhancements if Enhancements starts within 30 days of audit delivery.');
  lines.push('- Enhancements and Ongoing Monitoring are scoped from the Sprint or Audit findings.');
  lines.push('- SEO and PPC engagements are scoped individually. Ask for a quote.');
  lines.push('');
  lines.push('## Contact');
  lines.push('- Email: aivisibility@cardercreative.com');
  lines.push('- Phone: +1-614-809-5565');
  lines.push('- Service area: Columbus, Ohio and Central Ohio. Service-area business, no walk-in address.');
  lines.push('');
  lines.push('## What is not included');
  lines.push('- No guarantee of specific rankings, citations, or AI recommendations. Carder Creative');
  lines.push('  improves the signals AI systems and search engines use; the systems decide the outcome.');
  lines.push('- Paid media budget is billed by the platform, separately from management fees.');
  lines.push('');

  return lines.join('\n');
}
