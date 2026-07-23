// JS mirror of the global JSON-LD @graph (the canonical copy for crawlers lives in
// index.html <head>; this copy powers the visible "Quick Facts" block on the page).
// Keep the business facts here in sync with index.html.
import { metaForPath } from './siteMeta';

export const BUSINESS_GRAPH: object[] = [
  {
    '@type': 'Organization',
    '@id': 'https://cardercreative.com/#organization',
    name: 'Carder Creative',
    url: 'https://cardercreative.com/',
    logo: { '@type': 'ImageObject', url: 'https://cardercreative.com/favicon.svg' },
    sameAs: ['https://github.com/carderel/carder-creative'],
  },
  {
    '@type': 'LocalBusiness',
    '@id': 'https://cardercreative.com/#business',
    name: 'Carder Creative',
    url: 'https://cardercreative.com/',
    address: { '@type': 'PostalAddress', addressLocality: 'Columbus', addressRegion: 'OH', addressCountry: 'US' },
    geo: { '@type': 'GeoCoordinates', latitude: 39.9612, longitude: -82.9988 },
    areaServed: 'Columbus, OH',
    parentOrganization: { '@id': 'https://cardercreative.com/#organization' },
  },
  {
    '@type': 'WebSite',
    '@id': 'https://cardercreative.com/#website',
    url: 'https://cardercreative.com/',
    name: 'Carder Creative',
    publisher: { '@id': 'https://cardercreative.com/#organization' },
  },
];

export function schemaForPath(pathname: string): object {
  const meta = metaForPath(pathname);
  const perRoute = meta.jsonLd ? (Array.isArray(meta.jsonLd) ? meta.jsonLd : [meta.jsonLd]) : [];
  return { '@context': 'https://schema.org', '@graph': [...BUSINESS_GRAPH, ...perRoute] };
}
