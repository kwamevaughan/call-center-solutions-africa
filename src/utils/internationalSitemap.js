/**
 * International Sitemap Generator
 * Generates sitemap with hreflang alternates for international SEO
 */

import { SUPPORTED_LANGUAGES, getBasePath } from './internationalSEO';
import { caseStudyDetails } from '../data/caseStudies';

const BASE_URL = 'https://callcentersolutionsafrica.com';

/**
 * List of all pages that should be included in the sitemap
 * Format: { path: string, priority: number, changefreq: string, lastmod?: string }
 */
export const SITEMAP_PAGES = [
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
  ...caseStudyDetails.map((s) => ({
    path: `/case-studies/${s.id}`,
    priority: 0.65,
    changefreq: 'monthly',
  })),
  { path: '/delivery-models', priority: 0.6, changefreq: 'yearly' },
  { path: '/privacy-policy', priority: 0.3, changefreq: 'yearly' },
  { path: '/terms-of-service', priority: 0.3, changefreq: 'yearly' },
  { path: '/security-and-compliance', priority: 0.5, changefreq: 'yearly' },
  { path: '/global-compliance-playbook', priority: 0.5, changefreq: 'yearly' },
  { path: '/data-processing-addendum', priority: 0.3, changefreq: 'yearly' },
  { path: '/responsible-disclosure', priority: 0.3, changefreq: 'yearly' },
];

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
 * @param {Date} lastmod - Last modification date (defaults to current date)
 * @returns {string} XML sitemap content
 */
export const generateInternationalSitemap = (lastmod = new Date()) => {
  const lastmodString = lastmod.toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;
  
  SITEMAP_PAGES.forEach((page) => {
    const basePath = getBasePath(page.path);
    
    // Generate URLs for all language/region combinations
    const urlEntries = [];
    
    Object.values(SUPPORTED_LANGUAGES).forEach((lang) => {
      Object.keys(lang.regions).forEach((regionCode) => {
        const url = generateLangUrl(basePath, lang.code, regionCode);
        urlEntries.push({ url, hreflang: regionCode });
      });
    });
    
    // Add x-default
    const defaultUrl = generateLangUrl(basePath, 'en', 'en-US');
    urlEntries.push({ url: defaultUrl, hreflang: 'x-default' });
    
    // Generate XML for each URL entry
    urlEntries.forEach((entry) => {
      xml += `  <url>\n`;
      xml += `    <loc>${entry.url}</loc>\n`;
      xml += `    <lastmod>${page.lastmod || lastmodString}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      
      // Add hreflang alternates
      urlEntries.forEach((alt) => {
        if (alt.url !== entry.url) {
          xml += `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.url}" />\n`;
        }
      });
      
      xml += `  </url>\n`;
    });
  });
  
  xml += `</urlset>`;
  
  return xml;
};

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
  SITEMAP_PAGES,
};

