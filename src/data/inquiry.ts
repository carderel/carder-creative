// Inquiry categories for the contact form, shared by every CTA that preselects
// one. The slug travels in URLs (/contact/?need=google-ads#form) and in the modal
// preset; the label is what the owner reads in the Formspree notification email.

export const NEED_OPTIONS = [
  { slug: 'focused-diagnostic', label: 'Focused Diagnostic ($300)' },
  { slug: 'google-ads', label: 'Google Ads' },
  { slug: 'seo', label: 'SEO' },
  { slug: 'conversion-tracking', label: 'Conversion Tracking' },
  { slug: 'ai-visibility', label: 'AI Visibility' },
  { slug: 'custom-project', label: 'Custom Project (Quote)' },
  { slug: 'ongoing-support', label: 'Ongoing Support' },
  { slug: 'other', label: 'Other' },
] as const;

export type NeedSlug = (typeof NEED_OPTIONS)[number]['slug'];

export function isNeedSlug(value: string | null | undefined): value is NeedSlug {
  return NEED_OPTIONS.some((o) => o.slug === value);
}

export function needLabel(slug: string): string | undefined {
  return NEED_OPTIONS.find((o) => o.slug === slug)?.label;
}

/** Link to the /contact/ form with a category preselected. */
export function contactHref(need?: NeedSlug): string {
  return need ? `/contact/?need=${need}#form` : '/contact/#form';
}
