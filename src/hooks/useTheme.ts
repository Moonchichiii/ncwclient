import { useEffect, useState, useCallback } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme as 'dark' | 'light';
      }
      // If no saved theme, check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark'; // Default fallback
  });

  const applyTheme = useCallback((newTheme: 'dark' | 'light') => {
    // Update DOM
    const root = window.document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(newTheme);
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', newTheme === 'dark' ? '#223651' : '#ffffff');
    }

    // Update localStorage
    localStorage.setItem('theme', newTheme);
  }, []);

  useEffect(() => {
    applyTheme(theme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(newTheme);
      applyTheme(newTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, applyTheme]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }, [theme]);

  return { theme, toggleTheme };
};