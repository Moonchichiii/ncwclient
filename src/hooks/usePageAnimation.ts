import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { debounce } from 'lodash';

// Constants
const ROUTES = ['/home', '/portfolio', '/about', '/contact'];
const TRANSITION_DELAY = 500;
const SCROLL_THRESHOLD = 0.98;

interface PageAnimationConfig {
  direction: 'horizontal' | 'vertical';
  duration: number;
  ease: string;
}

export const usePageAnimation = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  // Determine animation direction based on route
  const getAnimationConfig = (currentPath: string): PageAnimationConfig => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (isMobile) {
      return {
        direction: 'vertical',
        duration: 0.8,
        ease: 'power2.inOut'
      };
    }

    // Desktop animations
    switch (currentPath) {
      case '/home':
      case '/portfolio':
        return {
          direction: 'horizontal',
          duration: 1,
          ease: 'power2.inOut'
        };
      case '/about':
      case '/contact':
        return {
          direction: 'vertical',
          duration: 0.8,
          ease: 'power2.inOut'
        };
      default:
        return {
          direction: 'vertical',
          duration: 0.8,
          ease: 'power2.inOut'
        };
    }
  };

  // Handle page transitions
  const handlePageTransition = (nextRoute: string) => {
    if (!mainRef.current || isTransitioning) return;

    setIsTransitioning(true);
    const config = getAnimationConfig(location.pathname);
    const element = mainRef.current.children[0];

    gsap.timeline({
      onComplete: () => {
        navigate(nextRoute);
        setIsTransitioning(false);
        if (mainRef.current) {
          mainRef.current.scrollTop = 0;
        }
      }
    }).to(element, {
      [config.direction === 'horizontal' ? 'x' : 'y']: '-100%',
      opacity: 0,
      duration: config.duration,
      ease: config.ease
    });
  };

  // Handle scroll events
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const currentIndex = ROUTES.indexOf(location.pathname);
    if (currentIndex === -1) return;

    let isScrolling = false;

    const handleScroll = debounce(() => {
      if (isTransitioning || isScrolling || !main) return;

      const { scrollHeight, scrollTop, clientHeight } = main;
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
      
      // Show/hide footer based on scroll position
      setShowFooter(scrollPercentage > 0.85);

      // Handle page transition on scroll end
      if (scrollPercentage >= SCROLL_THRESHOLD) {
        const nextIndex = (currentIndex + 1) % ROUTES.length;
        const nextRoute = ROUTES[nextIndex];
        
        // Only transition if we're not on the contact page
        if (location.pathname !== '/contact') {
          isScrolling = true;
          handlePageTransition(nextRoute);
        }
      }
    }, TRANSITION_DELAY);

    main.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      main.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, [location.pathname, navigate, isTransitioning]);

  // Set up entry animations
  useEffect(() => {
    const element = mainRef.current?.children[0];
    if (!element) return;

    const config = getAnimationConfig(location.pathname);

    gsap.fromTo(element,
      {
        [config.direction === 'horizontal' ? 'x' : 'y']: '100%',
        opacity: 0
      },
      {
        [config.direction === 'horizontal' ? 'x' : 'y']: '0%',
        opacity: 1,
        duration: config.duration,
        ease: config.ease,
        clearProps: 'all'
      }
    );
  }, [location.pathname]);

  return {
    mainRef,
    isTransitioning,
    showFooter
  };
};