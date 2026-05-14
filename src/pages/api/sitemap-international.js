/**
 * API Route: /api/sitemap-international
 * Generates an international sitemap with hreflang alternates
 */

import { createSupabaseServerClient } from '@/lib/supabaseServer';
import {
  buildFullSitemapPages,
  generateInternationalSitemap,
} from '@/utils/internationalSitemap';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

  try {
    const supabaseServer = createSupabaseServerClient(req, res);
    const pages = await buildFullSitemapPages(supabaseServer);
    const sitemap = generateInternationalSitemap(pages);

    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error generating international sitemap:', error);
    res.status(500).send('<?xml version="1.0" encoding="UTF-8"?><error>Failed to generate sitemap</error>');
  }
}

