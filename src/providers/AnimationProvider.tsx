'use client';

import React, { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimationContextType {
  lenis: Lenis | null;
  isReady: boolean;
}

const AnimationContext = createContext<AnimationContextType>({
  lenis: null,
  isReady: false,
});

export function useAnimation() {
  return useContext(AnimationContext);
}

export function useLenis() {
  const { lenis } = useAnimation();
  return lenis;
}

interface AnimationProviderProps {
  children: React.ReactNode;
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Prevent browser from restoring scroll position on navigation
    if (typeof window !== 'undefined') {
      history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }

    // Initialize Lenis smooth scroll
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    setLenis(lenisInstance);

    // Sync Lenis with GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    // Add Lenis to GSAP ticker (single RAF source)
    const tickerCallback = (time: number) => {
      lenisInstance.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    // Disable GSAP's default lag smoothing
    gsap.ticker.lagSmoothing(0);

    // Mark as ready
    setIsReady(true);

    // Cleanup
    return () => {
      gsap.ticker.remove(tickerCallback);
      lenisInstance.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Kill all ScrollTriggers on route change BEFORE React unmounts DOM nodes.
  // GSAP pin: true reparents elements into spacer divs. React can't find them
  // during unmount → removeChild error. The cleanup function of useLayoutEffect
  // runs BEFORE DOM mutations, so we kill ScrollTriggers here to restore the DOM
  // tree before React tries to remove nodes.
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  lenisRef.current = lenis;

  useLayoutEffect(() => {
    // Reset scroll immediately when new route mounts (before paint)
    document.documentElement.scrollTop = 0;
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }

    // Defer refresh until after child useEffects have run (pin spacers are added)
    // Double-RAF ensures we're past the React commit + browser paint cycle
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        // Re-assert scroll position after pin spacers may have shifted layout
        document.documentElement.scrollTop = 0;
        window.scrollTo(0, 0);
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        }
        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      // CLEANUP: runs BEFORE next route's DOM mutations
      // Kill all ScrollTriggers (removes pin spacers, restores DOM tree)
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf('*');

      // Reset scroll position
      document.documentElement.scrollTop = 0;
      window.scrollTo(0, 0);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    };
  }, [pathname]);

  // Refresh ScrollTrigger on resize
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AnimationContext.Provider value={{ lenis, isReady }}>
      {children}
    </AnimationContext.Provider>
  );
}
