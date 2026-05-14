/**
 * International Sitemap Generator
 * Generates sitemap with hreflang alternates for international SEO
 */

import { SUPPORTED_LANGUAGES, getBasePath } from './internationalSEO';
import { caseStudyDetails } from '../data/caseStudies';
import { fetchPublishedBlogSlugsForSitemap } from '../lib/blogSitemapQueries';

const BASE_URL = 'https://callcentersolutionsafrica.com';

/**
 * Static routes only (no CMS / DB-driven paths). Keep in sync with `src/pages`.
 * Format: { path: string, priority: number, changefreq: string, lastmod?: string }
 */
export const STATIC_SITEMAP_PAGES = [
  { path: '/', priority: 1.0, changefreq: 'monthly' },
  { path: '/about-us', priority: 0.8, changefreq: 'monthly' },
  { path: '/services', priority: 0.9, changefreq: 'monthly' },
  { path: '/services/inbound-outbound-customer-service', priority: 0.8, changefreq: 'monthly' },
  { path: '/services/omnichannel-contact-center-operations', priority: 0.8, changefreq: 'monthly' },
  { path: '/services/sales-revenue-enablement', priority: 0.8, changefreq: 'monthly' },
  { path: '/services/customer-retention-loyalty', priority: 0.8, changefreq: 'monthly' },
  { path: '/services/technical-support-help-desk', priority: 0.8, changefreq: 'monthly' },
  { path: '/services/claims-dispute-verification', priority: 0.8, changefreq: 'monthly' },
  { path: '/services/quality-assurance-cx-analytics', priority: 0.8, changefreq: 'monthly' },
  { path: '/services/back-office-admin-outsourcing', priority: 0.8, changefreq: 'monthly' },
  { path: '/industries', priority: 0.8, changefreq: 'monthly' },
  { path: '/blog', priority: 0.7, changefreq: 'weekly' },
  { path: '/careers', priority: 0.7, changefreq: 'weekly' },
  { path: '/contact-us', priority: 0.6, changefreq: 'yearly' },
  { path: '/case-studies', priority: 0.7, changefreq: 'monthly' },
  { path: '/delivery-models', priority: 0.6, changefreq: 'yearly' },
  { path: '/privacy-policy', priority: 0.3, changefreq: 'yearly' },
  { path: '/terms-of-service', priority: 0.3, changefreq: 'yearly' },
  { path: '/security-and-compliance', priority: 0.5, changefreq: 'yearly' },
  { path: '/global-compliance-playbook', priority: 0.5, changefreq: 'yearly' },
  { path: '/data-processing-addendum', priority: 0.3, changefreq: 'yearly' },
  { path: '/responsible-disclosure', priority: 0.3, changefreq: 'yearly' },
  { path: '/thank-you', priority: 0.3, changefreq: 'yearly' },
];

const caseStudySitemapEntries = () =>
  caseStudyDetails.map((s) => ({
    path: `/case-studies/${s.id}`,
    priority: 0.65,
    changefreq: 'monthly',
  }));

/** Sync subset: static + case studies (no Supabase blog URLs). */
export const getSyncSitemapPages = () => [...STATIC_SITEMAP_PAGES, ...caseStudySitemapEntries()];

/**
 * Full list for sitemap: static + case studies + published blog posts from DB.
 * On blog fetch failure, returns sync pages so the sitemap still serves.
 */
export const buildFullSitemapPages = async (supabaseServer) => {
  const syncPages = getSyncSitemapPages();

  try {
    const rows = await fetchPublishedBlogSlugsForSitemap(supabaseServer);
    const blogPages = rows
      .filter((r) => r.slug && String(r.slug).trim())
      .map((r) => {
        const raw = String(r.slug).trim().replace(/^\/+/, '');
        const iso =
          r.updated_at || r.publish_date || r.created_at || null;
        let lastmod;
        if (iso) {
          const d = new Date(iso);
          if (!Number.isNaN(d.getTime())) {
            lastmod = d.toISOString().split('T')[0];
          }
        }
        return {
          path: `/blog/${raw}`,
          priority: 0.64,
          changefreq: 'weekly',
          ...(lastmod ? { lastmod } : {}),
        };
      });

    const byPath = new Map(syncPages.map((p) => [p.path, p]));
    blogPages.forEach((p) => {
      if (!byPath.has(p.path)) {
        byPath.set(p.path, p);
      }
    });
    return Array.from(byPath.values());
  } catch (e) {
    console.error('Sitemap: could not load blog URLs', e);
    return syncPages;
  }
};

/**
 * @deprecated Use `getSyncSitemapPages()` or `buildFullSitemapPages()` for DB-backed URLs.
 * Kept for backward compatibility: static + case studies only.
 */
export const SITEMAP_PAGES = getSyncSitemapPages();

const escapeXmlUrl = (url) =>
  String(url)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * Generate URL with language prefix
 * @param {string} basePath - Base path without language prefix
 * @param {string} langCode - Language code (e.g., 'en', 'fr')
 * @param {string} regionCode - Region code (e.g., 'en-US', 'fr-FR')
 * @returns {string} Full URL with language prefix
 */
const generateLangUrl = (basePath, langCode, regionCode) => {
  const cleanPath = basePath === '/' ? '' : basePath;
  
  // Default language (English) - no prefix
  if (langCode === 'en' && regionCode === 'en-US') {
    return `${BASE_URL}${cleanPath}`;
  }
  
  // Other languages - add prefix
  if (regionCode && regionCode !== langCode) {
    return `${BASE_URL}/${regionCode}${cleanPath}`;
  }
  
  return `${BASE_URL}/${langCode}${cleanPath}`;
};

/**
 * Generate sitemap XML with hreflang alternates
 * @param {Array<{path:string,priority:number,changefreq:string,lastmod?:string}>|Date} [pagesOrLastmod] - URL entries, or legacy: default lastmod date
 * @param {Date} [lastmodArg] - Default lastmod when first argument is the pages array
 * @returns {string} XML sitemap content
 */
export function generateInternationalSitemap(pagesOrLastmod, lastmodArg) {
  let pages = SITEMAP_PAGES;
  let lastmod = new Date();
  if (Array.isArray(pagesOrLastmod)) {
    pages = pagesOrLastmod;
    lastmod = lastmodArg instanceof Date ? lastmodArg : new Date();
  } else if (pagesOrLastmod instanceof Date) {
    lastmod = pagesOrLastmod;
  }

  const lastmodString = lastmod.toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  pages.forEach((page) => {
    const basePath = getBasePath(page.path);

    const urlEntries = [];

    Object.values(SUPPORTED_LANGUAGES).forEach((lang) => {
      Object.keys(lang.regions).forEach((regionCode) => {
        const url = generateLangUrl(basePath, lang.code, regionCode);
        urlEntries.push({ url, hreflang: regionCode });
      });
    });

    const defaultUrl = generateLangUrl(basePath, 'en', 'en-US');
    urlEntries.push({ url: defaultUrl, hreflang: 'x-default' });

    urlEntries.forEach((entry) => {
      xml += `  <url>\n`;
      xml += `    <loc>${escapeXmlUrl(entry.url)}</loc>\n`;
      xml += `    <lastmod>${page.lastmod || lastmodString}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;

      urlEntries.forEach((alt) => {
        if (alt.url !== entry.url) {
          xml += `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${escapeXmlUrl(alt.url)}" />\n`;
        }
      });

      xml += `  </url>\n`;
    });
  });

  xml += `</urlset>`;

  return xml;
}

/**
 * Generate sitemap index for multiple sitemaps (if needed for large sites)
 * @param {Array<string>} sitemapUrls - Array of sitemap URLs
 * @returns {string} Sitemap index XML
 */
export const generateSitemapIndex = (sitemapUrls) => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  sitemapUrls.forEach((url) => {
    xml += `  <sitemap>\n`;
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += `  </sitemap>\n`;
  });
  
  xml += `</sitemapindex>`;
  
  return xml;
};

export default {
  generateInternationalSitemap,
  generateSitemapIndex,
  buildFullSitemapPages,
  getSyncSitemapPages,
  SITEMAP_PAGES,
};

