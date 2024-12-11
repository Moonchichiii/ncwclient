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
    ScrollTrigger.create({
      trigger: "#intro", 
      start: "top top",   
      end: "bottom top",  
      onLeave: () => {
        gsap.to('.side-link, .scroll-indicator', { opacity: 0, y: -20, duration: 0.5 });
      },
      onEnterBack: () => {
        gsap.to('.side-link, .scroll-indicator', { opacity: 1, y: 0, duration: 0.5 });
      },
    });
    

    // Cleanup the ScrollTrigger instance on unmount
    return () => scrollTrigger.kill();
  }, [headerRef, setShowHeader]);
};
