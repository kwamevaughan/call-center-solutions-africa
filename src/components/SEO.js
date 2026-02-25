// components/SEO.js
import Head from "next/head";
import { useRouter } from "next/router";
import { schemaToJsonLd } from "@/lib/schemas";
import {
  generateAlternateUrls,
  getCanonicalUrl,
  getCurrentLanguage,
  getCurrentRegion,
  getGeoTargetingTags,
  getLanguageConfig,
} from "@/utils/internationalSEO";

const SEO = ({
  title = "Call Center Solutions Africa | Advanced BPO & Contact Center Services",
  description = "Empowering businesses with tailored call center solutions. From cloud technology to advisory and equipment, we help you launch, scale, and thrive in 30 days or less.",
  keywords = "call center solutions Africa, BPO services Africa, contact center technology, African business solutions, cloud call center, customer experience Africa, Nairobi call center services, healthcare customer support, fintech customer service, SaaS support, insurance contact center, travel customer care, telecoms helpdesk, HIPAA compliant call center, GDPR compliant BPO, multilingual customer service, patient engagement, fraud prevention, KYC support, technical support Africa, claims processing, telehealth support, digital payments support, omnichannel contact center, 24/7 customer service Africa, ISO 27001 call center, PCI-DSS compliant, customer retention, back-office outsourcing",
  image = "https://ik.imagekit.io/nkmvdjnna/CCSA/hero.webp",
  noindex = false,
  imageWidth = 1200, // Default image width
  imageHeight = 630, // Default image height
  schema, // JSON-LD schema object or array of schema objects
  enableInternationalSEO = true, // Enable hreflang tags and international SEO
  geoRegion = null, // Override geo-targeting region (e.g., 'US', 'KE', 'FR')
}) => {
  const router = useRouter();
  const currentPath = router.asPath || "/";
  
  // Get current language and region
  const currentLang = getCurrentLanguage(currentPath);
  const currentRegion = getCurrentRegion(currentPath);
  
  // Get canonical URL with proper language handling
  const canonicalUrl = enableInternationalSEO
    ? getCanonicalUrl(currentPath, currentLang)
    : `https://callcentersolutionsafrica.com${currentPath === "/" ? "" : currentPath.split("?")[0]}`;

  // Generate alternate language URLs for hreflang tags
  const alternateUrls = enableInternationalSEO
    ? generateAlternateUrls(currentPath, currentLang)
    : [];

  // Get geo-targeting information
  const geoInfo = geoRegion
    ? getGeoTargetingTags(geoRegion)
    : getGeoTargetingTags(currentRegion.split('-')[1] || 'INT');

  // Handle schema(s) - can be single object or array
  const schemas = Array.isArray(schema) ? schema : (schema ? [schema] : []);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Call Center Solutions Africa" />
      <meta name="robots" content={noindex ? "noindex" : "index, follow"} />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Geo-targeting Meta Tags */}
      {enableInternationalSEO && geoInfo.country && (
        <>
          <meta name="geo.region" content={geoInfo.country} />
          <meta name="geo.placename" content={geoInfo.country} />
        </>
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Hreflang Tags for International SEO */}
      {enableInternationalSEO && alternateUrls.length > 0 && (
        <>
          {alternateUrls.map((alternate) => (
            <link
              key={alternate.hreflang}
              rel="alternate"
              hrefLang={alternate.hreflang}
              href={alternate.href}
            />
          ))}
        </>
      )}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:width" content={imageWidth.toString()} />
      <meta property="og:image:height" content={imageHeight.toString()} />
      <meta
        property="og:image:alt"
        content="Call Center Solutions Africa | Advanced BPO & Contact Center Services"
      />
      <meta property="og:site_name" content="Call Center Solutions Africa" />
      
      {/* Open Graph Locale Tags for International SEO */}
      {enableInternationalSEO && (
        <>
          <meta property="og:locale" content={currentRegion.replace('-', '_')} />
          {/* Add alternate locales */}
          {alternateUrls
            .filter((alt) => alt.hreflang !== 'x-default')
            .map((alternate) => (
              <meta
                key={`og-locale-${alternate.hreflang}`}
                property="og:locale:alternate"
                content={alternate.hreflang.replace('-', '_')}
              />
            ))}
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta
        name="twitter:image:alt"
        content="Call Center Solutions Africa | Advanced BPO & Contact Center Services"
      />
      
      {/* JSON-LD Structured Data */}
      {schemas.map((schemaObj, index) => {
        const jsonLd = schemaToJsonLd(schemaObj);
        if (!jsonLd) return null;
        return (
          <script
            key={`schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={jsonLd}
          />
        );
      })}
    </Head>
  );
};

export default SEO;