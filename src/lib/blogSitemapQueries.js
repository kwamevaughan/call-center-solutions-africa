/**
 * Server-only blog reads for sitemap (no browser Supabase client import).
 * @param {import('@supabase/supabase-js').SupabaseClient} supabaseClient
 */
export async function fetchPublishedBlogSlugsForSitemap(supabaseClient) {
  if (!supabaseClient) return [];

  const { data, error } = await supabaseClient
    .from('blogs')
    .select('slug, updated_at, publish_date, created_at')
    .eq('is_published', true)
    .eq('is_draft', false)
    .not('slug', 'is', null);

  if (error) {
    console.error('Error fetching blog slugs for sitemap:', error);
    throw error;
  }

  return data || [];
}
