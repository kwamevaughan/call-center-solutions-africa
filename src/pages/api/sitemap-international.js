/**
 * API Route: /api/sitemap-international
 * Generates an international sitemap with hreflang alternates
 */

import { generateInternationalSitemap } from '@/utils/internationalSitemap';

export default function handler(req, res) {
  // Set headers for XML content
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  
  try {
    // Generate the international sitemap
    const sitemap = generateInternationalSitemap();
    
    // Return the sitemap XML
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error generating international sitemap:', error);
    res.status(500).send('<?xml version="1.0" encoding="UTF-8"?><error>Failed to generate sitemap</error>');
  }
}

