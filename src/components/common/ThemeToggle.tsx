import { FC, useEffect, useRef } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import gsap from 'gsap';

interface ThemeToggleProps {
  variant?: 'landing' | 'header';
}

const ThemeToggle: FC<ThemeToggleProps> = ({ variant = 'landing' }) => {
  const { theme, toggleTheme } = useTheme();
  const iconRef = useRef<HTMLDivElement>(null);

  // Position and style classes based on variant
  const baseClasses = "flex items-center justify-center rounded-full transition-all duration-300";
  const variantClasses = {
    landing: `absolute top-8 right-8 w-10 h-10 backdrop-blur-sm 
              dark:bg-gray-900/20 dark:hover:bg-gray-900/40 
              bg-white/20 hover:bg-white/40
              border border-gray-200/20 dark:border-gray-700/20`,
    header: `relative w-8 h-8 
             dark:bg-gray-900/20 dark:hover:bg-gray-900/40 
             bg-white/20 hover:bg-white/40
             border border-gray-200/20 dark:border-gray-700/20`
  };

  useEffect(() => {
    if (iconRef.current) {
      gsap.fromTo(iconRef.current,
        { rotate: 0, scale: 0.5, opacity: 0 },
        {
          rotate: 360,
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)"
        }
      );
    }
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className={`${baseClasses} ${variantClasses[variant]}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div ref={iconRef} className="relative">
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-tekhelet-base" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;