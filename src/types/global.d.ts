declare global {
  interface Window {
    trackEvent: (eventName: string, params?: Record<string, unknown>) => void;
    gtag_report_conversion: (url?: string) => boolean;
    gtag: (...args: unknown[]) => void;
  }
}

export {};
