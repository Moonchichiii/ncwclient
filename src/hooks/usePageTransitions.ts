import { useEffect } from 'react';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom';

export const usePageTransitions = (ref: React.RefObject<HTMLElement>) => {
  const location = useLocation();
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const currentRoute = location.pathname;
    
    const getAnimationConfig = () => {
      if (isMobile) return { y: 50, delay: 0.2 };
      
      switch(currentRoute) {
        case '/home':
        case '/about':
          return { x: '100%', delay: 0 };
        case '/portfolio':
        case '/contact':
          return { y: 50, delay: 0.2 };
        default:
          return { y: 50, delay: 0 };
      }
    };

    const config = getAnimationConfig();
    
    gsap.from(element, {
      opacity: 0,
      ...config,
      duration: 1,
      ease: 'power2.out',
      clearProps: 'all'
    });
  }, [location.pathname]);
};