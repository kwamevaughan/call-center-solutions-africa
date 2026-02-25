# International SEO - Quick Start Guide

## What Has Been Implemented

✅ **International SEO Configuration** (`src/utils/internationalSEO.js`)
- Language/region mappings for English, French, Swahili, and Arabic
- Hreflang tag generation utilities
- Canonical URL generation
- Geo-targeting helpers

✅ **Updated SEO Component** (`src/components/SEO.js`)
- Automatic hreflang tag generation
- Geo-targeting meta tags
- Open Graph locale tags
- International SEO enabled by default

✅ **Updated Document Component** (`src/pages/_document.js`)
- Dynamic HTML lang attribute
- Language detection from URL

✅ **International Sitemap Generator** (`src/utils/internationalSitemap.js`)
- Generates sitemap with hreflang alternates
- API endpoint: `/api/sitemap-international`

✅ **Updated llms.txt**
- Added international SEO information
- Language/region documentation

## How to Use

### 1. Using SEO Component (Already Works!)

The SEO component now automatically includes hreflang tags. No changes needed to existing pages:

```jsx
// This already works with international SEO!
<SEO
  title="Page Title"
  description="Page description"
/>
```

### 2. Access International Sitemap

Visit: `https://callcentersolutionsafrica.com/api/sitemap-international`

Or add to `next.config.js`:
```js
async rewrites() {
  return [
    {
      source: '/sitemap-international.xml',
      destination: '/api/sitemap-international',
    },
  ];
}
```

### 3. Testing Hreflang Tags

1. Visit any page on your site
2. View page source
3. Look for `<link rel="alternate" hreflang="..." href="..." />` tags
4. Should see tags for all language/region combinations

### 4. Next Steps (Optional Enhancements)

#### A. Create Language-Specific Pages

Create pages for each language:
- `src/pages/fr-FR/[page].js` for French pages
- `src/pages/sw-KE/[page].js` for Swahili pages
- `src/pages/ar-SA/[page].js` for Arabic pages

#### B. Add Language Switcher Component

```jsx
import { SUPPORTED_LANGUAGES, getCurrentLanguage } from '@/utils/internationalSEO';
import { useRouter } from 'next/router';

function LanguageSwitcher() {
  const router = useRouter();
  const currentLang = getCurrentLanguage(router.asPath);
  
  return (
    <select onChange={(e) => {
      const lang = e.target.value;
      // Redirect to language-specific URL
      router.push(`/${lang}${router.asPath}`);
    }}>
      {Object.values(SUPPORTED_LANGUAGES).map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.nativeName}
        </option>
      ))}
    </select>
  );
}
```

#### C. Update robots.txt

Add sitemap reference:
```
Sitemap: https://callcentersolutionsafrica.com/api/sitemap-international
```

#### D. Submit to Google Search Console

1. Go to Google Search Console
2. Add property: `https://callcentersolutionsafrica.com`
3. Submit sitemap: `https://callcentersolutionsafrica.com/api/sitemap-international`
4. Check International Targeting report

## Current Language Support

| Language | Code | Regions | Default Region |
|----------|------|---------|----------------|
| English  | en   | US, GB, ZA, KE | en-US |
| French   | fr   | FR, CA, BE, CH | fr-FR |
| Swahili  | sw   | KE, TZ, UG     | sw-KE |
| Arabic   | ar   | SA, AE, EG, MA  | ar-SA |

## URL Examples

- English: `https://callcentersolutionsafrica.com/about-us`
- French: `https://callcentersolutionsafrica.com/fr-FR/about-us`
- Swahili: `https://callcentersolutionsafrica.com/sw-KE/about-us`
- Arabic: `https://callcentersolutionsafrica.com/ar-SA/about-us`

## Verification Checklist

- [ ] Hreflang tags appear in page source
- [ ] HTML lang attribute is correct
- [ ] Canonical URLs are correct
- [ ] International sitemap is accessible
- [ ] Geo-targeting meta tags are present
- [ ] Open Graph locale tags are present
- [ ] Submit sitemap to Google Search Console

## Need Help?

See full documentation: `docs/INTERNATIONAL_SEO.md`

