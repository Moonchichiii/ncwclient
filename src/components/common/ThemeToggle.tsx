import { FC } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface ThemeToggleProps {
  position?: 'header' | 'landing';
}

const ThemeToggle: FC<ThemeToggleProps> = ({ position = 'landing' }) => {
  const { theme, toggleTheme } = useTheme();

  const positionClasses = position === 'landing'
    ? 'absolute top-8 right-36'
    : 'relative';

  return (
    <button
      onClick={toggleTheme}
      className={`w-10 h-10 flex items-center justify-center ${positionClasses} rounded-full
      bg-mono-800/50 backdrop-blur-sm hover:bg-mono-700/50 transition-colors`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ?
        <Sun className="w-6 h-6 text-mono-50" /> :
        <Moon className="w-6 h-6 text-mono-50" />}
    </button>
  );
};

export default ThemeToggle;
