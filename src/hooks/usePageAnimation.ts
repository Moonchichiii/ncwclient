import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export const usePageTransition = (containerRef: React.RefObject<HTMLElement>) => {
  const location = useLocation();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Clear any existing ScrollTriggers for the previous page
      ScrollTrigger.getAll().forEach(st => st.kill());

      // Initial animation for page entrance
      gsap.fromTo(
        containerRef.current,
        { 
          opacity: 0,
          y: location.pathname === '/' ? 0 : 50 
        },
        { 
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => {
            // Re-initialize page-specific ScrollTriggers
            ScrollTrigger.refresh();
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [location.pathname]);
};