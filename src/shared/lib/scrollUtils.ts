import { useState, useEffect } from "react";

export const useFixedHeader = (): boolean => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScrollEvent = () => {
      setIsFixed(window.scrollY > 50);
    };

    handleScrollEvent();
    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  return isFixed;
};

export const handleScroll = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  isFixed: boolean,
): void => {
  e.preventDefault();
  const targetId = href.replace("#", "");
  const element = document.getElementById(targetId);
  if (element) {
    setTimeout(() => {
      const header = document.querySelector("nav");
      const headerHeight = header ? header.offsetHeight : 0;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offset = isFixed ? headerHeight + 20 : 0;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }, 0);
  }
};
