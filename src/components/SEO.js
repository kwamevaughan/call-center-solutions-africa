// components/SEO.js
import Head from "next/head";

const SEO = ({
  title = "Call Center Solutions Africa | Advanced BPO & Contact Center Services",
  description = "Empowering African businesses with tailored call center solutions. From cloud technology to advisory and equipment, we help you launch, scale, and thrive in 30 days or less.",
  keywords = "call center solutions Africa, BPO services Africa, contact center technology, African business solutions, cloud call center, customer experience Africa, Nairobi call center services",
  image = "https://callcentersolutionsafrica.com/assets/images/logo.svg",
  canonical = "https://callcentersolutionsafrica.com/",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Call Center Solutions Africa" />
      <meta name="robots" content="index, follow" />
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta
        property="og:image:alt"
        content="Call Center Solutions Africa - Empowering African Businesses"
      />
      <meta property="og:site_name" content="Call Center Solutions Africa" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta
        name="twitter:image:alt"
        content="Call Center Solutions Africa - Empowering African Businesses"
      />
      {/* <meta name="twitter:site" content="@YourTwitterHandle" />
      <meta name="twitter:creator" content="@YourTwitterHandle" /> */}
    </Head>
  );
};

export default SEO;
