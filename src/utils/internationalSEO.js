/**
 * International SEO Configuration and Utilities
 * Handles hreflang tags, language/region mappings, and international URL generation
 */

const BASE_URL = 'https://callcentersolutionsafrica.com';

/**
 * Supported languages and regions configuration
 * Format: { code: 'lang-REGION', name: 'Language Name', nativeName: 'Native Name', region: 'Region Code' }
 */
export const SUPPORTED_LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    regions: {
      'en-US': { name: 'English (United States)', region: 'US' },
      'en-GB': { name: 'English (United Kingdom)', region: 'GB' },
      'en-ZA': { name: 'English (South Africa)', region: 'ZA' },
      'en-KE': { name: 'English (Kenya)', region: 'KE' },
      'en': { name: 'English (International)', region: 'INT' }, // x-default
    },
    defaultRegion: 'en-US',
    isDefault: true, // Primary language
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    regions: {
      'fr-FR': { name: 'French (France)', region: 'FR' },
      'fr-CA': { name: 'French (Canada)', region: 'CA' },
      'fr-BE': { name: 'French (Belgium)', region: 'BE' },
      'fr-CH': { name: 'French (Switzerland)', region: 'CH' },
      'fr': { name: 'French (International)', region: 'INT' },
    },
    defaultRegion: 'fr-FR',
    isDefault: false,
  },
  sw: {
    code: 'sw',
    name: 'Swahili',
    nativeName: 'Kiswahili',
    regions: {
      'sw-KE': { name: 'Swahili (Kenya)', region: 'KE' },
      'sw-TZ': { name: 'Swahili (Tanzania)', region: 'TZ' },
      'sw-UG': { name: 'Swahili (Uganda)', region: 'UG' },
      'sw': { name: 'Swahili (International)', region: 'INT' },
    },
    defaultRegion: 'sw-KE',
    isDefault: false,
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    regions: {
      'ar-SA': { name: 'Arabic (Saudi Arabia)', region: 'SA' },
      'ar-AE': { name: 'Arabic (UAE)', region: 'AE' },
      'ar-EG': { name: 'Arabic (Egypt)', region: 'EG' },
      'ar-MA': { name: 'Arabic (Morocco)', region: 'MA' },
      'ar': { name: 'Arabic (International)', region: 'INT' },
    },
    defaultRegion: 'ar-SA',
    isDefault: false,
  },
};

/**
 * Get all hreflang codes (including x-default)
 */
export const getAllHreflangCodes = () => {
  const codes = [];
  
  Object.values(SUPPORTED_LANGUAGES).forEach((lang) => {
    Object.keys(lang.regions).forEach((regionCode) => {
      codes.push(regionCode);
    });
  });
  
  // Add x-default pointing to English (International)
  codes.push('x-default');
  
  return codes;
};

/**
 * Generate alternate language URLs for a given path
 * @param {string} path - Current page path (e.g., '/about-us')
 * @param {string} currentLang - Current language code (e.g., 'en')
 * @returns {Array} Array of { hreflang, href } objects
 */
export const generateAlternateUrls = (path = '/', currentLang = 'en') => {
  const alternates = [];
  const cleanPath = path.split('?')[0]; // Remove query params
  
  // Generate URLs for all language/region combinations
  Object.values(SUPPORTED_LANGUAGES).forEach((lang) => {
    Object.keys(lang.regions).forEach((regionCode) => {
      let url = BASE_URL;
      
      // If not default language, add language prefix
      // Option 1: Subdirectory structure (recommended for SEO)
      if (!lang.isDefault && regionCode !== lang.code) {
        // Use region-specific code (e.g., /fr-FR/about-us)
        url += `/${regionCode}${cleanPath === '/' ? '' : cleanPath}`;
      } else if (!lang.isDefault) {
        // Use language code only (e.g., /fr/about-us)
        url += `/${lang.code}${cleanPath === '/' ? '' : cleanPath}`;
      } else {
        // Default language (English) - no prefix
        url += cleanPath === '/' ? '' : cleanPath;
      }
      
      alternates.push({
        hreflang: regionCode,
        href: url,
      });
    });
  });
  
  // Add x-default pointing to English (International) version
  alternates.push({
    hreflang: 'x-default',
    href: `${BASE_URL}${cleanPath === '/' ? '' : cleanPath}`,
  });
  
  return alternates;
};

/**
 * Get current language from path or default to English
 * @param {string} path - Current page path
 * @returns {string} Language code
 */
export const getCurrentLanguage = (path = '/') => {
  const pathSegments = path.split('/').filter(Boolean);
  
  if (pathSegments.length === 0) {
    return 'en';
  }
  
  const firstSegment = pathSegments[0];
  
  // Check if first segment is a language code
  if (SUPPORTED_LANGUAGES[firstSegment]) {
    return firstSegment;
  }
  
  // Check if first segment is a region code (e.g., fr-FR)
  for (const lang of Object.values(SUPPORTED_LANGUAGES)) {
    if (lang.regions[firstSegment]) {
      return lang.code;
    }
  }
  
  return 'en'; // Default to English
};

/**
 * Get current region from path or default
 * @param {string} path - Current page path
 * @returns {string} Region code (e.g., 'en-US')
 */
export const getCurrentRegion = (path = '/') => {
  const pathSegments = path.split('/').filter(Boolean);
  
  if (pathSegments.length === 0) {
    return 'en-US'; // Default region
  }
  
  const firstSegment = pathSegments[0];
  
  // Check if first segment is a region code
  for (const lang of Object.values(SUPPORTED_LANGUAGES)) {
    if (lang.regions[firstSegment]) {
      return firstSegment;
    }
  }
  
  // Check if first segment is a language code
  if (SUPPORTED_LANGUAGES[firstSegment]) {
    return SUPPORTED_LANGUAGES[firstSegment].defaultRegion;
  }
  
  return 'en-US'; // Default region
};

/**
 * Get HTML lang attribute value
 * @param {string} path - Current page path
 * @returns {string} HTML lang attribute (e.g., 'en-US')
 */
export const getHtmlLang = (path = '/') => {
  return getCurrentRegion(path);
};

/**
 * Generate geo-targeting meta tags
 * @param {string} region - Region code (e.g., 'US', 'KE', 'FR')
 * @returns {Object} Geo-targeting meta tags
 */
export const getGeoTargetingTags = (region = 'INT') => {
  const geoMapping = {
    'US': { country: 'US', continent: 'NA' },
    'GB': { country: 'GB', continent: 'EU' },
    'ZA': { country: 'ZA', continent: 'AF' },
    'KE': { country: 'KE', continent: 'AF' },
    'FR': { country: 'FR', continent: 'EU' },
    'CA': { country: 'CA', continent: 'NA' },
    'BE': { country: 'BE', continent: 'EU' },
    'CH': { country: 'CH', continent: 'EU' },
    'TZ': { country: 'TZ', continent: 'AF' },
    'UG': { country: 'UG', continent: 'AF' },
    'SA': { country: 'SA', continent: 'AS' },
    'AE': { country: 'AE', continent: 'AS' },
    'EG': { country: 'EG', continent: 'AF' },
    'MA': { country: 'MA', continent: 'AF' },
    'INT': { country: null, continent: null }, // International
  };
  
  return geoMapping[region] || geoMapping['INT'];
};

/**
 * Get canonical URL for a page
 * @param {string} path - Current page path
 * @param {string} lang - Language code
 * @returns {string} Canonical URL
 */
export const getCanonicalUrl = (path = '/', lang = 'en') => {
  const cleanPath = path.split('?')[0];
  
  // For default language, use base URL
  if (lang === 'en') {
    return `${BASE_URL}${cleanPath === '/' ? '' : cleanPath}`;
  }
  
  // For other languages, include language prefix
  const region = getCurrentRegion(path);
  const langConfig = SUPPORTED_LANGUAGES[lang];
  
  if (langConfig && region !== lang) {
    return `${BASE_URL}/${region}${cleanPath === '/' ? '' : cleanPath}`;
  }
  
  return `${BASE_URL}/${lang}${cleanPath === '/' ? '' : cleanPath}`;
};

/**
 * Remove language prefix from path to get base path
 * @param {string} path - Path with language prefix
 * @returns {string} Base path without language prefix
 */
export const getBasePath = (path = '/') => {
  const pathSegments = path.split('/').filter(Boolean);
  
  if (pathSegments.length === 0) {
    return '/';
  }
  
  const firstSegment = pathSegments[0];
  
  // Check if first segment is a language/region code
  for (const lang of Object.values(SUPPORTED_LANGUAGES)) {
    if (lang.regions[firstSegment] || lang.code === firstSegment) {
      // Remove language prefix
      const remainingPath = '/' + pathSegments.slice(1).join('/');
      return remainingPath === '/' ? '/' : remainingPath;
    }
  }
  
  return path;
};

/**
 * Get language-specific content configuration
 * This can be extended with actual translations
 */
export const getLanguageConfig = (lang = 'en') => {
  const configs = {
    en: {
      siteName: 'Call Center Solutions Africa',
      tagline: 'Advanced BPO & Contact Center Services',
      defaultTitle: 'Call Center Solutions Africa | Advanced BPO & Contact Center Services',
      defaultDescription: 'Empowering businesses with tailored call center solutions. From cloud technology to advisory and equipment, we help you launch, scale, and thrive in 30 days or less.',
    },
    fr: {
      siteName: 'Call Center Solutions Africa',
      tagline: 'Services BPO et Centre de Contact Avancés',
      defaultTitle: 'Call Center Solutions Africa | Services BPO et Centre de Contact Avancés',
      defaultDescription: 'Donner aux entreprises des solutions de centre d\'appels sur mesure. De la technologie cloud aux conseils et équipements, nous vous aidons à lancer, développer et prospérer en 30 jours ou moins.',
    },
    sw: {
      siteName: 'Call Center Solutions Africa',
      tagline: 'Huduma za BPO na Kituo cha Mawasiliano cha Hali ya Juu',
      defaultTitle: 'Call Center Solutions Africa | Huduma za BPO na Kituo cha Mawasiliano',
      defaultDescription: 'Kuwawezesha biashara kwa suluhisho za kituo cha simu zilizoboreshwa. Kutoka teknolojia ya wingu hadi ushauri na vifaa, tunakusaidia kuanzisha, kuongeza, na kufanikiwa kwa siku 30 au chini.',
    },
    ar: {
      siteName: 'Call Center Solutions Africa',
      tagline: 'خدمات BPO ومركز الاتصال المتقدم',
      defaultTitle: 'Call Center Solutions Africa | خدمات BPO ومركز الاتصال المتقدم',
      defaultDescription: 'تمكين الشركات بحلول مراكز الاتصال المخصصة. من التكنولوجيا السحابية إلى الاستشارات والمعدات، نساعدك على الإطلاق والتوسع والازدهار في 30 يومًا أو أقل.',
    },
  };
  
  return configs[lang] || configs.en;
};

export default {
  SUPPORTED_LANGUAGES,
  getAllHreflangCodes,
  generateAlternateUrls,
  getCurrentLanguage,
  getCurrentRegion,
  getHtmlLang,
  getGeoTargetingTags,
  getCanonicalUrl,
  getBasePath,
  getLanguageConfig,
};

