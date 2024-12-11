import { useLayoutEffect, RefObject } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type SetShowHeader = (show: boolean) => void;

export const useGSAPSetup = (
  headerRef: RefObject<HTMLElement | null>,
  setShowHeader: SetShowHeader
) => {
  useLayoutEffect(() => {
    if (!headerRef.current) return;

    // Set initial header visibility to hidden
    setShowHeader(false);

    // Create scroll trigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: "#intro", // The landing page section
      start: "top top",   // When the top of #intro hits the top of the viewport
      end: "bottom top",  // When the bottom of #intro hits the top of the viewport
      onLeave: () => setShowHeader(true),  // Show header after leaving the intro
      onEnterBack: () => setShowHeader(false), // Hide header when scrolling back into the intro
    });

    // Cleanup the ScrollTrigger instance on unmount
    return () => scrollTrigger.kill();
  }, [headerRef, setShowHeader]);
};
