// pages/_app.js
import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [mode, setMode] = useState("light");
  // Toggle dark mode and persist in localStorage
  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("mode", newMode);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedMode = window.localStorage.getItem("mode");
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemMode = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setMode(systemMode);
      window.localStorage.setItem("mode", systemMode);
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      const systemMode = e.matches ? "dark" : "light";
      if (!window.localStorage.getItem("mode")) {
        setMode(systemMode);
      }
    };
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <>
      {/* Google Analytics Global Site Tag - Suppress errors in development */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=AW-11088484153"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11088484153', {
              send_page_view: true,
              anonymize_ip: true
            });
            // Suppress Google Analytics fetch errors in console (especially in development)
            if (typeof window !== 'undefined' && window.fetch) {
              const originalFetch = window.fetch;
              window.fetch = function(...args) {
                const url = args[0];
                if (typeof url === 'string' && (url.includes('google-analytics.com') || url.includes('googletagmanager.com') || url.includes('google.com/ccm'))) {
                  return originalFetch.apply(this, args).catch(() => {
                    // Silently handle GA fetch errors - don't log to console
                    return Promise.resolve(new Response(null, { status: 200 }));
                  });
                }
                return originalFetch.apply(this, args);
              };
            }
          `,
        }}
      />
      <Component {...pageProps} mode={mode} toggleMode={toggleMode} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default MyApp;
