// The one fixed-price entry service. Everything else (audits, repairs,
// implementation, ongoing management) is custom-quoted. Pure data so the visible
// block and the machine-readable /pricing.md read the same source.

export const FOCUSED_DIAGNOSTIC = {
  name: 'Focused Diagnostic',
  price: '$300',
  priceValue: 300,
  priceLabel: 'Flat fee',
  summary:
    'Have a specific Google Ads, SEO, or conversion tracking problem? Get an experienced second opinion without committing to a large project or ongoing contract.',
  included: [
    'Review of one specific Google Ads, SEO, or conversion tracking issue',
    'Up to 60 minutes of consultation and investigation within a defined scope',
    'A brief written summary of findings and recommended next steps',
    'No ongoing commitment',
  ],
  beforeWeStart: [
    'We confirm the specific issue and whether it fits the diagnostic scope.',
    'We tell you what access or information we need.',
    'We confirm what you receive and what falls outside the diagnostic.',
    "We arrange payment before work starts. You don't need to check out online.",
  ],
  limits: [
    'Covers one specific issue. It is not a comprehensive account or website audit.',
    'It does not guarantee a fix during the diagnostic.',
    'We quote implementation, further investigation, and repairs separately.',
    'If the issue is outside the diagnostic scope, we tell you before accepting payment and can quote it as a custom project.',
  ],
  cta: 'Request a Focused Diagnostic',
} as const;
