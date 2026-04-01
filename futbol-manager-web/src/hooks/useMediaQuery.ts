import { useEffect, useState } from "react";

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

const breakpoints: Record<Breakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const useMediaQuery = (breakpoint: Breakpoint, isAbove: boolean = true) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(${isAbove ? "min" : "max"}-width: ${breakpoints[breakpoint]}px)`
    );

    const handler = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Set inicial
    setMatches(mediaQuery.matches);

    // Agregar listener
    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, [breakpoint, isAbove]);

  return matches;
};

// Helper exports
export const useIsMobile = () => useMediaQuery("md", false);
export const useIsTablet = () => useMediaQuery("md") && !useMediaQuery("lg");
export const useIsDesktop = () => useMediaQuery("lg");