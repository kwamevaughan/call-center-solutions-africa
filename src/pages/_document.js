// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";
import { getOrganizationSchema, getWebsiteSchema, schemaToJsonLd } from "@/lib/schemas";

class MyDocument extends Document {
  render() {
    // Generate global schemas
    const organizationSchema = getOrganizationSchema();
    const websiteSchema = getWebsiteSchema();

    return (
      <Html lang="en">
        <Head>
          {/* Global JSON-LD Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={schemaToJsonLd(organizationSchema)}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={schemaToJsonLd(websiteSchema)}
          />

          {/* Google Analytics Script */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-10ELYW45R8"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-10ELYW45R8', {
                  send_page_view: true,
                  anonymize_ip: true
                });
                // Suppress Google Analytics fetch errors in console
                if (typeof window !== 'undefined' && window.fetch) {
                  const originalFetch = window.fetch;
                  window.fetch = function(...args) {
                    const url = args[0];
                    if (typeof url === 'string' && (url.includes('google-analytics.com') || url.includes('googletagmanager.com') || url.includes('google.com/ccm'))) {
                      return originalFetch.apply(this, args).catch(() => {
                        return Promise.resolve(new Response(null, { status: 200 }));
                      });
                    }
                    return originalFetch.apply(this, args);
                  };
                }
              `,
            }}
          />

          {/* Add Google Fonts for Poppins */}
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap"
            rel="stylesheet"
          />

          {/* Favicon Links */}
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/svg"
            sizes="32x32"
            href="/favicon.svg"
          />
          <link
            rel="icon"
            type="image/svg"
            sizes="16x16"
            href="/favicon.svg"
          />

          {/* Web App Manifest for PWA */}
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#F25849" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta
            name="apple-mobile-web-app-title"
            content="CCSA | Customer Service Outsourcing from Africa"
          />
          <link rel="apple-touch-icon" href="/favicon.svg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
