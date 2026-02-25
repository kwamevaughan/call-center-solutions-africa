# International SEO Implementation Guide

This document explains how international SEO is implemented for Call Center Solutions Africa website.

## Overview

The website supports multiple languages and regions for international SEO:
- **English** (en): Default language with regional variants (US, GB, ZA, KE)
- **French** (fr): Regional variants (FR, CA, BE, CH)
- **Swahili** (sw): Regional variants (KE, TZ, UG)
- **Arabic** (ar): Regional variants (SA, AE, EG, MA)

## Implementation Components

### 1. International SEO Utilities (`src/utils/internationalSEO.js`)

This utility provides:
- Language and region configuration
- Hreflang tag generation
- Canonical URL generation
- Geo-targeting meta tags
- HTML lang attribute helpers

**Key Functions:**
- `generateAlternateUrls(path, currentLang)` - Generates hreflang alternate URLs
- `getCurrentLanguage(path)` - Detects current language from URL
- `getCurrentRegion(path)` - Detects current region from URL
- `getCanonicalUrl(path, lang)` - Generates canonical URL
- `getHtmlLang(path)` - Gets HTML lang attribute value

### 2. SEO Component (`src/components/SEO.js`)

The SEO component now includes:
- **Hreflang tags** - Automatically generates alternate language URLs
- **Geo-targeting meta tags** - Adds geo.region and geo.placename tags
- **Open Graph locale tags** - Includes og:locale and og:locale:alternate
- **Canonical URLs** - Proper canonical URLs for each language version

**Usage:**
```jsx
<SEO
  title="Page Title"
  description="Page description"
  enableInternationalSEO={true} // Enable hreflang tags (default: true)
  geoRegion="US" // Optional: Override geo-targeting region
/>
```

### 3. Document Component (`src/pages/_document.js`)

The `_document.js` component now:
- Dynamically sets the HTML `lang` attribute based on the current page
- Detects language from the request path

### 4. International Sitemap (`src/utils/internationalSitemap.js`)

Generates sitemap XML with:
- All pages in all language/region combinations
- Hreflang alternates for each URL
- Proper priority and changefreq settings

**API Endpoint:** `/api/sitemap-international`

## URL Structure

### Current Implementation (Subdirectory Structure)

The website uses subdirectory structure for language versions:

- **English (default):** `https://callcentersolutionsafrica.com/[page]`
- **French:** `https://callcentersolutionsafrica.com/fr-FR/[page]` or `/fr/[page]`
- **Swahili:** `https://callcentersolutionsafrica.com/sw-KE/[page]` or `/sw/[page]`
- **Arabic:** `https://callcentersolutionsafrica.com/ar-SA/[page]` or `/ar/[page]`

### Alternative URL Structures

You can modify the URL structure in `src/utils/internationalSEO.js`:

1. **Subdomain Structure:**
   - `en.callcentersolutionsafrica.com`
   - `fr.callcentersolutionsafrica.com`
   - `sw.callcentersolutionsafrica.com`
   - `ar.callcentersolutionsafrica.com`

2. **Query Parameter Structure:**
   - `callcentersolutionsafrica.com?lang=fr`
   - `callcentersolutionsafrica.com?lang=sw&region=KE`

## Hreflang Tags

Hreflang tags are automatically added to all pages. They include:
- All language/region combinations
- `x-default` pointing to English (International) version
- Self-referencing hreflang tag

Example:
```html
<link rel="alternate" hreflang="en-US" href="https://callcentersolutionsafrica.com/about-us" />
<link rel="alternate" hreflang="fr-FR" href="https://callcentersolutionsafrica.com/fr-FR/about-us" />
<link rel="alternate" hreflang="sw-KE" href="https://callcentersolutionsafrica.com/sw-KE/about-us" />
<link rel="alternate" hreflang="x-default" href="https://callcentersolutionsafrica.com/about-us" />
```

## Geo-Targeting

Geo-targeting meta tags are added based on the current region:

```html
<meta name="geo.region" content="US" />
<meta name="geo.placename" content="US" />
```

## Google Search Console Setup

1. **Add Property for Each Language/Region:**
   - Add each language version as a separate property in Google Search Console
   - Or use a single property with hreflang tags (recommended)

2. **Submit Sitemap:**
   - Submit the international sitemap: `https://callcentersolutionsafrica.com/api/sitemap-international`
   - Or update the existing sitemap.xml to reference the international sitemap

3. **Verify Hreflang Tags:**
   - Use Google Search Console's International Targeting report
   - Verify that hreflang tags are correctly implemented

## Best Practices

### 1. Content Localization

- Translate all content for each language version
- Use native speakers for translations
- Consider cultural differences, not just language

### 2. URL Structure

- Keep URLs consistent across languages (only language prefix changes)
- Use descriptive, keyword-rich URLs
- Avoid duplicate content issues

### 3. Canonical URLs

- Each language version should have its own canonical URL
- Don't canonicalize language versions to each other
- Use canonical tags to prevent duplicate content within the same language

### 4. Sitemap

- Include all language versions in the sitemap
- Use hreflang alternates in sitemap XML
- Keep sitemap updated when adding new pages

### 5. Performance

- Consider CDN for different regions
- Optimize images and assets for each region
- Use appropriate hosting locations

## Testing International SEO

### 1. Validate Hreflang Tags

Use these tools:
- Google Search Console International Targeting report
- Screaming Frog SEO Spider
- Hreflang Tags Testing Tool

### 2. Check Canonical URLs

- Verify each page has a proper canonical URL
- Ensure canonical URLs match the current language version
- Check for canonical conflicts

### 3. Test Language Detection

- Test automatic language detection from URL
- Verify HTML lang attribute is correct
- Check browser language detection (if implemented)

### 4. Validate Sitemap

- Validate XML syntax
- Check all URLs are accessible
- Verify hreflang alternates are correct

## Next Steps

### 1. Implement Language Routing

Create Next.js pages/routes for each language:
- `/fr-FR/[page]` for French pages
- `/sw-KE/[page]` for Swahili pages
- `/ar-SA/[page]` for Arabic pages

### 2. Add Language Switcher Component

Create a language switcher component that:
- Detects current language
- Shows available languages
- Links to alternate language versions

### 3. Implement Content Translation

- Set up translation management system
- Create translation files for each language
- Implement dynamic content loading based on language

### 4. Add Browser Language Detection

- Detect user's browser language
- Redirect to appropriate language version
- Store language preference in cookies/localStorage

### 5. Update Existing Sitemap

Update `public/sitemap.xml` to:
- Reference the international sitemap
- Or include hreflang alternates directly

## Troubleshooting

### Hreflang Tags Not Showing

- Check that `enableInternationalSEO={true}` is set in SEO component
- Verify the path is correctly detected
- Check browser console for errors

### Wrong Language Detected

- Verify URL structure matches expected format
- Check `getCurrentLanguage()` function logic
- Ensure language prefixes are correct

### Canonical URL Issues

- Verify canonical URL generation logic
- Check for trailing slashes
- Ensure query parameters are removed

## Resources

- [Google's Guide to Hreflang](https://developers.google.com/search/docs/advanced/crawling/localized-versions)
- [International SEO Best Practices](https://developers.google.com/search/docs/advanced/crawling/managing-multi-regional-sites)
- [Hreflang Tag Generator](https://technicalseo.com/tools/hreflang/)

## Support

For questions or issues with international SEO implementation, contact the development team.

