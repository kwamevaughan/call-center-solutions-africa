import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@/shared/providers/Analytics";
import { ToasterProvider } from "@/shared/providers/ToasterProvider";
import { getOrganizationSchema, getWebsiteSchema, schemaToJsonLd } from "@/shared/lib/schemas";
import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Call Center Solutions Africa | Advanced BPO & Contact Center Services",
  description:
    "Empowering businesses with tailored call center solutions. From cloud technology to advisory and equipment, we help you launch, scale, and thrive in 30 days or less.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CCSA | Customer Service Outsourcing from Africa",
  },
};

export const viewport: Viewport = {
  themeColor: "#F25849",
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_ID = "G-10ELYW45R8";
const AW_ID = "AW-11088484153";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = getOrganizationSchema();
  const webSchema = getWebsiteSchema();

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={schemaToJsonLd(orgSchema)}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={schemaToJsonLd(webSchema)}
        />
      </head>
      <body>
        {/* GTM */}
        {GTM_ID && (
          <>
            <Script
              id="gtm-script"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
            />
            <Script
              id="gtm-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});`,
              }}
            />
          </>
        )}

        {/* Google Ads / GA4 */}
        <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${AW_ID}`} />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer=window.dataLayer||[];
              function gtag(){dataLayer.push(arguments);}
              window.gtag=gtag;
              gtag('js',new Date());
              gtag('config','${AW_ID}',{send_page_view:true,anonymize_ip:true});
              gtag('config','${GA_ID}',{send_page_view:true,anonymize_ip:true});
            `,
          }}
        />

        <Analytics />
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
