import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { useNavigation } from '../../../context/NavigationContext';

interface NavigationItem {
  path: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  items: NavigationItem[];
}

interface SocialLink {
  platform: string;
  url: string;
  icon: typeof Github | typeof Linkedin;
  ariaLabel: string;
}

const SCROLL_THRESHOLD = 20;
const HEADER_ANIMATION_DURATION = 0.6;

const navigationItems: NavigationItem[] = [
  { path: '/home', label: 'Home' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

const socialLinks: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/nordiccodeworks',
    icon: Github,
    ariaLabel: 'Visit our GitHub profile'
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/company/nordiccodeworks',
    icon: Linkedin,
    ariaLabel: 'Visit our LinkedIn page'
  },
];

const SocialLinks: React.FC = () => (
  <div className="flex items-center gap-4 ml-4">
    {socialLinks.map(({ platform, url, icon: Icon, ariaLabel }) => (
      <motion.a
        key={platform}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        className="text-gray-300 hover:text-[#CBB26A] transition-colors duration-200"
        aria-label={ariaLabel}
      >
        <Icon size={20} />
      </motion.a>
    ))}
  </div>
);

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, items }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="md:hidden"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
      >
        <nav 
          className="px-4 pt-2 pb-6 space-y-4 bg-[#223651] shadow-lg"
          aria-label="Mobile navigation"
        >
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block py-2 text-base font-medium transition-colors duration-200 hover:text-[#CBB26A] text-gray-300"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 pt-4">
            <SocialLinks />
          </div>
        </nav>
      </motion.div>
    )}
  </AnimatePresence>
);

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { showHeader } = useNavigation();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-[#223651]/90 backdrop-blur-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: showHeader ? 0 : -100 }}
      transition={{ duration: HEADER_ANIMATION_DURATION }}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link 
            to="/home" 
            className="flex items-center"
            aria-label="Nordic Code Works - Home"
          >
            <motion.span 
              className="text-xl font-bold"
              whileHover={{ scale: 1.05 }}
            >
              Nordic Code <span className="text-[#CBB26A]">Works</span>
            </motion.span>
          </Link>

          <nav 
            className="hidden md:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-[#CBB26A] ${
                  location.pathname === item.path ? 'text-[#CBB26A]' : 'text-gray-300'
                }`}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
            <SocialLinks />
          </nav>

          <motion.button
            className="md:hidden text-gray-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} items={navigationItems} />
    </motion.header>
  );
};

export default Header;