import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function upsertMeta({ selector, attrName, attrValue, content }) {
  if (typeof document === 'undefined') return;

  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }

  el.setAttribute(attrName, attrValue);
  el.setAttribute('content', content);
}

function upsertLinkCanonical(href) {
  if (typeof document === 'undefined') return;

  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd({ id, json }) {
  if (typeof document === 'undefined') return;

  let el = document.head.querySelector(`script#${CSS?.escape?.(id) ?? id}`);
  if (!el) {
    el = document.createElement('script');
    el.setAttribute('type', 'application/ld+json');
    el.setAttribute('id', id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(json);
}

/**
 * Lightweight SEO helper for React 19 (no external deps).
 * Note: This is still client-rendered. For maximum SEO, consider prerender/SSR later.
 */
export default function SEO({
  title,
  description,
  ogImagePath = '/01.png',
  ogLocale = 'en_GB',
  robots = 'index,follow',
}) {
  const location = useLocation();

  useEffect(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') return;

    const origin = window.location.origin;
    const canonicalUrl = `${origin}${location.pathname}`;

    if (title) document.title = title;
    if (description) {
      upsertMeta({
        selector: 'meta[name="description"]',
        attrName: 'name',
        attrValue: 'description',
        content: description,
      });
    }

    upsertMeta({
      selector: 'meta[name="robots"]',
      attrName: 'name',
      attrValue: 'robots',
      content: robots,
    });

    upsertLinkCanonical(canonicalUrl);

    // Open Graph
    upsertMeta({
      selector: 'meta[property="og:type"]',
      attrName: 'property',
      attrValue: 'og:type',
      content: 'website',
    });
    if (title) {
      upsertMeta({
        selector: 'meta[property="og:title"]',
        attrName: 'property',
        attrValue: 'og:title',
        content: title,
      });
    }
    if (description) {
      upsertMeta({
        selector: 'meta[property="og:description"]',
        attrName: 'property',
        attrValue: 'og:description',
        content: description,
      });
    }
    upsertMeta({
      selector: 'meta[property="og:url"]',
      attrName: 'property',
      attrValue: 'og:url',
      content: canonicalUrl,
    });
    upsertMeta({
      selector: 'meta[property="og:image"]',
      attrName: 'property',
      attrValue: 'og:image',
      content: `${origin}${ogImagePath.startsWith('/') ? ogImagePath : `/${ogImagePath}`}`,
    });
    upsertMeta({
      selector: 'meta[property="og:locale"]',
      attrName: 'property',
      attrValue: 'og:locale',
      content: ogLocale,
    });

    // Twitter
    upsertMeta({
      selector: 'meta[name="twitter:card"]',
      attrName: 'name',
      attrValue: 'twitter:card',
      content: 'summary_large_image',
    });
    if (title) {
      upsertMeta({
        selector: 'meta[name="twitter:title"]',
        attrName: 'name',
        attrValue: 'twitter:title',
        content: title,
      });
    }
    if (description) {
      upsertMeta({
        selector: 'meta[name="twitter:description"]',
        attrName: 'name',
        attrValue: 'twitter:description',
        content: description,
      });
    }
    upsertMeta({
      selector: 'meta[name="twitter:image"]',
      attrName: 'name',
      attrValue: 'twitter:image',
      content: `${origin}${ogImagePath.startsWith('/') ? ogImagePath : `/${ogImagePath}`}`,
    });

    // JSON-LD (Person) — focused on hiring intent and target markets
    upsertJsonLd({
      id: 'ld-person-lena-roh',
      json: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'LENA ROH',
        jobTitle: 'Interior Architect & Designer',
        description:
          'Interior architect and designer with over a decade of experience, open to opportunities in Switzerland, the United Kingdom and Denmark (remote or on-site).',
        url: canonicalUrl,
        email: 'mailto:roglenusia@gmail.com',
        telephone: ['+34 611 76 36 15', '+380 95 80 18 718'],
        sameAs: ['https://www.linkedin.com/in/lena-roh-architect/'],
        areaServed: ['Switzerland', 'United Kingdom', 'Denmark'],
        knowsAbout: [
          'interior architecture',
          'interior design',
          'space planning',
          'material selection',
          'residential interiors',
          'hospitality interiors',
        ],
      },
    });
  }, [description, location.pathname, ogImagePath, ogLocale, robots, title]);

  return null;
}
