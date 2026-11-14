/**
 * JSON-LD Schema Generator Utilities
 * Generates structured data for SEO according to schema.org standards
 */

const BASE_URL = 'https://callcentersolutionsafrica.com';

/**
 * Organization Schema
 * Used globally across the site
 */
export const getOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Call Center Solutions Africa',
    alternateName: 'CCSA',
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.svg`,
    description: 'Empowering businesses with tailored call center solutions. From cloud technology to advisory and equipment, we help you launch, scale, and thrive in 30 days or less.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'The Westwood Office, 6th Floor 6A, Comply Guide Advisory',
      addressLocality: 'Westlands',
      addressRegion: 'Nairobi',
      addressCountry: 'KE',
      postalCode: '00100'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+254-701-850-850',
      contactType: 'Customer Service',
      email: 'hello@callcentersolutionsafrica.com',
      areaServed: 'Worldwide',
      availableLanguage: ['English', 'French', 'Swahili', 'Arabic']
    },
    sameAs: [
      'https://www.linkedin.com/company/call-center-solutions-africa/',
      'https://x.com/Callcentersols',
      'https://www.facebook.com/callcentersolutionsafrica'
    ],
    foundingDate: '2020',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: '50-200'
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide'
    }
  };
};

/**
 * Website Schema
 * Used globally to help search engines understand the site structure
 */
export const getWebsiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Call Center Solutions Africa',
    url: BASE_URL,
    description: 'Advanced BPO & Contact Center Services from Africa',
    publisher: {
      '@type': 'Organization',
      name: 'Call Center Solutions Africa',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/favicon.svg`
      }
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/blog?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
};

/**
 * Article Schema (Blog Post)
 * Used for individual blog posts
 */
export const getArticleSchema = ({
  title,
  description,
  image,
  author = 'Call Center Solutions Africa',
  datePublished,
  dateModified,
  url,
  category,
  wordCount
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: image ? [image] : [`${BASE_URL}/favicon.svg`],
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author,
      url: BASE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: 'Call Center Solutions Africa',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/favicon.svg`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    url: url
  };

  if (category) {
    schema.articleSection = category;
  }

  if (wordCount) {
    schema.wordCount = wordCount;
  }

  return schema;
};

/**
 * BreadcrumbList Schema
 * Used for navigation breadcrumbs
 */
export const getBreadcrumbSchema = (items) => {
  if (!items || items.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
};

/**
 * Service Schema
 * Used for service pages
 */
export const getServiceSchema = ({
  name,
  description,
  provider = 'Call Center Solutions Africa',
  areaServed = 'Worldwide',
  serviceType,
  url
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: name,
    description: description,
    provider: {
      '@type': 'Organization',
      name: provider,
      url: BASE_URL
    },
    areaServed: {
      '@type': 'Place',
      name: areaServed
    },
    serviceType: serviceType,
    url: url,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD'
    }
  };
};

/**
 * FAQPage Schema
 * Used for pages with frequently asked questions
 */
export const getFAQPageSchema = (faqs) => {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

/**
 * LocalBusiness Schema (if needed)
 */
export const getLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}#organization`,
    name: 'Call Center Solutions Africa',
    image: `${BASE_URL}/favicon.svg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'The Westwood Office, 6th Floor 6A, Comply Guide Advisory',
      addressLocality: 'Westlands',
      addressRegion: 'Nairobi',
      postalCode: '00100',
      addressCountry: 'KE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -1.2644,
      longitude: 36.8065
    },
    url: BASE_URL,
    telephone: '+254-701-850-850',
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      opens: '08:00',
      closes: '18:00'
    }
  };
};

/**
 * CollectionPage Schema (for blog listing page)
 */
export const getCollectionPageSchema = ({
  name = 'Blog Articles',
  description = 'Expert articles on call center best practices, customer experience trends, BPO strategies, and business growth tips',
  url
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: name,
    description: description,
    url: url,
    publisher: {
      '@type': 'Organization',
      name: 'Call Center Solutions Africa',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/favicon.svg`
      }
    }
  };
};

/**
 * WebPage Schema
 * Used for individual web pages
 */
export const getWebPageSchema = ({
  name,
  description,
  url,
  breadcrumb
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: name,
    description: description,
    url: url,
    publisher: {
      '@type': 'Organization',
      name: 'Call Center Solutions Africa',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/favicon.svg`
      }
    }
  };

  if (breadcrumb) {
    schema.breadcrumb = breadcrumb;
  }

  return schema;
};

/**
 * AboutPage Schema
 * Used for About Us pages
 */
export const getAboutPageSchema = ({
  name = 'About Us',
  description,
  url
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: name,
    description: description,
    url: url,
    publisher: {
      '@type': 'Organization',
      name: 'Call Center Solutions Africa',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/favicon.svg`
      }
    },
    mainEntity: {
      '@type': 'Organization',
      name: 'Call Center Solutions Africa',
      url: BASE_URL
    }
  };
};

/**
 * ContactPage Schema
 * Used for Contact Us pages
 */
export const getContactPageSchema = ({
  name = 'Contact Us',
  description,
  url
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: name,
    description: description,
    url: url,
    publisher: {
      '@type': 'Organization',
      name: 'Call Center Solutions Africa',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/favicon.svg`
      }
    },
    mainEntity: {
      '@type': 'Organization',
      name: 'Call Center Solutions Africa',
      email: 'hello@callcentersolutionsafrica.com',
      telephone: '+254-701-850-850',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'The Westwood Office, 6th Floor 6A, Comply Guide Advisory',
        addressLocality: 'Westlands',
        addressRegion: 'Nairobi',
        addressCountry: 'KE',
        postalCode: '00100'
      }
    }
  };
};

/**
 * Helper function to convert schema object to JSON-LD script tag
 */
export const schemaToJsonLd = (schema) => {
  if (!schema) return null;
  return {
    __html: JSON.stringify(schema, null, 2)
  };
};

/**
 * Helper function to generate multiple schemas
 */
export const generateSchemas = (schemas) => {
  return schemas.filter(schema => schema !== null);
};

