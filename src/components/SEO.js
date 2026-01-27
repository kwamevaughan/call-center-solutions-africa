// components/SEO.js
import Head from "next/head";
import { useRouter } from "next/router";
import { schemaToJsonLd } from "@/lib/schemas";

const SEO = ({
  title = "Call Center Solutions Africa | Advanced BPO & Contact Center Services",
  description = "Empowering businesses with tailored call center solutions. From cloud technology to advisory and equipment, we help you launch, scale, and thrive in 30 days or less.",
  keywords = "call center solutions Africa, BPO services Africa, contact center technology, African business solutions, cloud call center, customer experience Africa, Nairobi call center services, healthcare customer support, fintech customer service, SaaS support, insurance contact center, travel customer care, telecoms helpdesk, HIPAA compliant call center, GDPR compliant BPO, multilingual customer service, patient engagement, fraud prevention, KYC support, technical support Africa, claims processing, telehealth support, digital payments support, omnichannel contact center, 24/7 customer service Africa, ISO 27001 call center, PCI-DSS compliant, customer retention, back-office outsourcing",
  image = "https://ik.imagekit.io/nkmvdjnna/CCSA/hero.webp",
  noindex = false,
  imageWidth = 1200, // Default image width
  imageHeight = 630, // Default image height
  schema, // JSON-LD schema object or array of schema objects
}) => {
  const router = useRouter();
  // Construct the full URL for the current page
  const canonicalUrl = `https://callcentersolutionsafrica.com${router.asPath === "/" ? "" : router.asPath.split("?")[0]}`;

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
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} /> {/* Dynamic URL */}
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />{" "}
      {/* Ensure HTTPS */}
      <meta property="og:image:width" content={imageWidth.toString()} />
      <meta property="og:image:height" content={imageHeight.toString()} />
      <meta
        property="og:image:alt"
        content="Call Center Solutions Africa | Advanced BPO & Contact Center Services"
      />
      <meta property="og:site_name" content="Call Center Solutions Africa" />
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