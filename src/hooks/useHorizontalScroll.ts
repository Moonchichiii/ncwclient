import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { debounce } from 'lodash';

const ROUTES = ['/home', '/portfolio', '/about', '/contact'];
const TRANSITION_DELAY = 500;

export const useHorizontalScroll = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const currentIndex = ROUTES.indexOf(location.pathname);
    if (currentIndex === -1) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    let isScrolling = false;

    const getTransitionDirection = (current: number, next: number) => {
      if (isMobile) return 'vertical';
      // Alternate between horizontal and vertical
      switch(current) {
        case 0: return 'horizontal'; // Home -> Portfolio
        case 1: return 'vertical';   // Portfolio -> About
        case 2: return 'horizontal'; // About -> Contact
        default: return 'vertical';
      }
    };

    const handleScroll = debounce(() => {
      if (isTransitioning || isScrolling) return;

      const { scrollHeight, scrollTop, clientHeight } = main;
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
      
      setShowFooter(scrollPercentage > 0.85);

      if (scrollPercentage >= 0.98) {
        const nextIndex = (currentIndex + 1) % ROUTES.length;
        initiateTransition(nextIndex);
      }
    }, TRANSITION_DELAY);

    const initiateTransition = (nextIndex: number) => {
      isScrolling = true;
      setIsTransitioning(true);

      const direction = getTransitionDirection(currentIndex, nextIndex);
      const axis = direction === 'vertical' ? 'y' : 'x';

      gsap.timeline({
        onComplete: () => {
          gsap.set(main.children[0], { [axis]: 0, opacity: 1 });
          navigate(ROUTES[nextIndex]);
          isScrolling = false;
          setIsTransitioning(false);
          if (main) main.scrollTop = 0;
        }
      })
      .to(main.children[0], {
        [axis]: '-100%',
        opacity: 0,
        duration: 1,
        ease: "power2.inOut"
      });
    };

    main.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      main.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, [location.pathname, navigate, isTransitioning]);

  return { mainRef, isTransitioning, showFooter };
};