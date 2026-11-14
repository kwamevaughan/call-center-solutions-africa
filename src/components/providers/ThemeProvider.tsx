"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  mode: Theme;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: "light",
  toggleMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Theme>("light");

  useEffect(() => {
    const saved = window.localStorage.getItem("mode") as Theme | null;
    if (saved) {
      setMode(saved);
    } else {
      const system: Theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setMode(system);
      window.localStorage.setItem("mode", system);
    }

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!window.localStorage.getItem("mode")) {
        setMode(e.matches ? "dark" : "light");
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggleMode = () => {
    const next: Theme = mode === "light" ? "dark" : "light";
    setMode(next);
    window.localStorage.setItem("mode", next);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <div data-theme={mode}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
