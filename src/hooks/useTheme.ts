import { useState, useEffect, useCallback } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollSmoother from 'gsap/ScrollSmoother';

export const useTheme = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    
    // Check localStorage first
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
    
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    // Handle theme class on document
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Store preference
    localStorage.setItem('theme', theme);
    
    // Update meta theme color
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute(
        'content',
        theme === 'dark' ? '#131B2E' : '#F7F9FC'
      );
    }

    // Update background color transition
    document.body.style.transition = 'background-color 0.3s ease-in-out';
    document.body.style.backgroundColor = theme === 'dark' ? '#131B2E' : '#F7F9FC';

    // Refresh GSAP ScrollTrigger and ScrollSmoother
    const refreshGSAP = () => {
      // Kill existing ScrollSmoother instance
      const smoother = ScrollSmoother.get();
      if (smoother) {
        smoother.kill();
      }

      // Kill all ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      // Refresh ScrollTrigger
      ScrollTrigger.refresh(true);
    };

    // Delay refresh to allow theme transition to complete
    const timeoutId = setTimeout(refreshGSAP, 300);

    return () => clearTimeout(timeoutId);
  }, [theme]);

  // Handle system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem('theme');
      if (!stored) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(current => current === 'dark' ? 'light' : 'dark');
  }, []);

  return { theme, toggleTheme };
};

export default useTheme;