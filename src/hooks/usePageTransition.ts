import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ROUTES = ['/home', '/portfolio', '/about', '/contact'];

export const usePageTransition = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getNextRoute = (currentPath: string) => {
    const currentIndex = ROUTES.indexOf(currentPath);
    if (currentIndex === -1) return '/home';
    return ROUTES[(currentIndex + 1) % ROUTES.length];
  };

  const handleScroll = () => {
    if (isTransitioning) return;

    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (scrollPosition + windowHeight) / docHeight;

    if (scrollPercentage > 0.8) {
      setIsTransitioning(true);
      const nextRoute = location.pathname === '/' ? '/home' : getNextRoute(location.pathname);
      
      navigate(nextRoute, {
        state: {
          transition: location.pathname === '/' ? 'slide-up' : 'slide-horizontal',
          previousPath: location.pathname
        }
      });
      
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, isTransitioning]);

  return { isTransitioning };
};
