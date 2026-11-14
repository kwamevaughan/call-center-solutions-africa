import Head from "next/head";
import { useRouter } from "next/router";
import { schemaToJsonLd } from "@/lib/schemas";

const BASE_URL = "https://callcentersolutionsafrica.com";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  noindex?: boolean;
  imageWidth?: number;
  imageHeight?: number;
  schema?: object | object[];
}

const SEO = ({
  title = "Call Center Solutions Africa | Advanced BPO & Contact Center Services",
  description = "Empowering businesses with tailored call center solutions. From cloud technology to advisory and equipment, we help you launch, scale, and thrive in 30 days or less.",
  keywords = "call center solutions Africa, BPO services Africa, contact center technology, African business solutions, cloud call center, customer experience Africa, Nairobi call center services",
  image = "https://ik.imagekit.io/nkmvdjnna/CCSA/hero.webp",
  noindex = false,
  imageWidth = 1200,
  imageHeight = 630,
  schema,
}: SEOProps) => {
  const router = useRouter();
  const path = router.asPath.split("?")[0];
  const canonicalUrl = `${BASE_URL}${path === "/" ? "" : path}`;

  const schemas = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Call Center Solutions Africa" />
      <meta name="robots" content={noindex ? "noindex" : "index, follow"} />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content={imageWidth.toString()} />
      <meta property="og:image:height" content={imageHeight.toString()} />
      <meta property="og:site_name" content="Call Center Solutions Africa" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

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
