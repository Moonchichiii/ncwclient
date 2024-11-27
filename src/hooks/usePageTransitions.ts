import { useEffect } from 'react';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom';

export const usePageTransitions = (ref: React.RefObject<HTMLElement>) => {
  const location = useLocation();
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    const getTransitionConfig = () => {
      if (isMobile) {
        return {
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 }
        };
      }

      switch (location.pathname) {
        case '/home':
        case '/about':
          return {
            initial: { opacity: 0, x: '100%' },
            animate: { opacity: 1, x: 0 }
          };
        case '/portfolio':
        case '/contact':
          return {
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 }
          };
        default:
          return {
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 }
          };
      }
    };

    const config = getTransitionConfig();

    gsap.fromTo(element, 
      config.initial,
      {
        ...config.animate,
        duration: 1,
        ease: 'power2.out',
        clearProps: 'all',
        delay: 0.2
      }
    );
  }, [location.pathname]);
};