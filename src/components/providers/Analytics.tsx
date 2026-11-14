"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    const pushEvent = (payload: Record<string, unknown>) => {
      if (!payload || typeof payload !== "object") return;
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push(payload);
    };

    pushEvent({
      event: "page_view",
      page_path: pathname,
      page_title: document.title,
    });
  }, [pathname]);

  useEffect(() => {
    const pushEvent = (payload: Record<string, unknown>) => {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push(payload);
    };

    const getLabel = (el: Element) =>
      el.getAttribute("data-track-label") ||
      el.getAttribute("aria-label") ||
      (el.textContent?.trim().slice(0, 120) ?? "") ||
      el.id ||
      (el as HTMLInputElement).name ||
      "";

    const handleClick = (e: MouseEvent) => {
      const clickable = (e.target as Element)?.closest?.("a, button, [data-track-event]");
      if (!clickable) return;
      const tag = clickable.tagName.toLowerCase();
      const href = clickable.getAttribute("href") || "";
      const isOutbound = href.startsWith("http") && !href.includes(window.location.hostname);
      pushEvent({
        event: clickable.getAttribute("data-track-event") || (isOutbound ? "outbound_link_click" : "ui_click"),
        element_type: tag,
        element_text: getLabel(clickable),
        element_id: clickable.id || "",
        link_url: href,
        page_path: window.location.pathname,
      });
    };

    const handleSubmit = (e: Event) => {
      const form = e.target;
      if (!(form instanceof HTMLFormElement)) return;
      pushEvent({
        event: "form_submit",
        form_id: form.id || "",
        form_name: form.getAttribute("name") || form.id || "unknown_form",
        page_path: window.location.pathname,
      });
    };

    (window as any).trackEvent = (name: string, payload = {}) => {
      pushEvent({ event: name, ...payload });
    };

    document.addEventListener("click", handleClick, true);
    document.addEventListener("submit", handleSubmit, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("submit", handleSubmit, true);
    };
  }, []);

  return null;
}
