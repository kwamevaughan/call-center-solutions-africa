// pages/_app.js
import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const [mode, setMode] = useState("light");
  const router = useRouter();
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
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

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pushEvent = (payload) => {
      if (!payload || typeof payload !== "object") return;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(payload);
    };

    const trackPageView = (url) => {
      pushEvent({
        event: "page_view",
        page_path: url || window.location.pathname,
        page_title: document.title,
      });
    };

    const handleRouteChange = (url) => {
      trackPageView(url);
    };

    const getElementLabel = (element) => {
      if (!element) return "";
      return (
        element.getAttribute("data-track-label") ||
        element.getAttribute("aria-label") ||
        element.textContent?.trim()?.slice(0, 120) ||
        element.id ||
        element.name ||
        ""
      );
    };

    const handleDocumentClick = (event) => {
      const clickable = event.target?.closest?.("a, button, [data-track-event]");
      if (!clickable) return;

      const tagName = clickable.tagName?.toLowerCase() || "unknown";
      const href = clickable.getAttribute("href") || "";
      const isOutbound =
        href.startsWith("http") && !href.includes(window.location.hostname);

      const eventName =
        clickable.getAttribute("data-track-event") ||
        (isOutbound ? "outbound_link_click" : "ui_click");

      pushEvent({
        event: eventName,
        element_type: tagName,
        element_text: getElementLabel(clickable),
        element_id: clickable.id || "",
        element_classes: clickable.className || "",
        link_url: href,
        page_path: window.location.pathname,
      });
    };

    const handleFormSubmit = (event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;

      pushEvent({
        event: "form_submit",
        form_id: form.id || "",
        form_name: form.getAttribute("name") || form.id || "unknown_form",
        form_action: form.getAttribute("action") || window.location.pathname,
        form_method: form.getAttribute("method") || "post",
        page_path: window.location.pathname,
      });
    };

    window.trackEvent = (eventName, payload = {}) => {
      pushEvent({ event: eventName, ...payload });
    };

    trackPageView(window.location.pathname);
    router.events.on("routeChangeComplete", handleRouteChange);
    document.addEventListener("click", handleDocumentClick, true);
    document.addEventListener("submit", handleFormSubmit, true);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      document.removeEventListener("click", handleDocumentClick, true);
      document.removeEventListener("submit", handleFormSubmit, true);
    };
  }, [router.events]);

  return (
    <>
      {/* Google Analytics Global Site Tag - Suppress errors in development */}
      {gtmId ? (
        <>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
          />
          <Script
            id="gtm-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  'gtm.start': new Date().getTime(),
                  event: 'gtm.js'
                });
              `,
            }}
          />
        </>
      ) : null}
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
            window.gtag = gtag;
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
