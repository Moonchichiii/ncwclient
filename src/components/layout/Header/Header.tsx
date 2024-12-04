import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { useNavigation } from '../../../context/NavigationContext';

const navigationItems = [
  { path: '/home', label: 'Home' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

const socialLinks = [
  {
    platform: 'GitHub',
    url: 'https://github.com/nordiccodeworks',
    icon: Github,
    ariaLabel: 'Visit our GitHub profile',
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/company/nordiccodeworks',
    icon: Linkedin,
    ariaLabel: 'Visit our LinkedIn page',
  },
];

const SocialLinks = () => (
  <div className="flex items-center gap-4">
    {socialLinks.map(({ platform, url, icon: Icon, ariaLabel }) => (
      <motion.a
        key={platform}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        className="text-gray-300 hover:text-white transition-colors duration-300"
        aria-label={ariaLabel}
      >
        <Icon size={20} strokeWidth={1.5} />
      </motion.a>
    ))}
  </div>
);

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { showHeader } = useNavigation();

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 ${
        showHeader ? 'bg-black/60 backdrop-blur-md border-b border-white/10' : ''
      } transition-all`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/home" className="flex items-center group" aria-label="Nordic Code Works - Home">
            <motion.div
              className="relative overflow-hidden font-mono tracking-tighter flex"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-2xl font-bold">
                <span style={{ color: '#3BB4C5' }}>nordic</span>
                <span style={{ color: '#F1B418' }}>(</span>
                <span style={{ color: '#8655CA' }}>(</span>
                <span style={{ color: '#2D7ACA' }}>code</span>
                <span style={{ color: '#8655CA' }}>)</span>
                <span style={{ color: '#8655CA' }}></span>
                <span style={{ color: '#2D7ACA' }}> works</span>
                <span style={{ color: '#8655CA' }}>)</span>
              </span>
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-300 hover:text-white ${
                  location.pathname === item.path ? 'text-white font-bold' : 'text-gray-300'
                }`}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
            <div className="pl-4 border-l border-white/10">
              <SocialLinks />
            </div>
          </nav>

          <motion.button
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} strokeWidth={1.5} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} strokeWidth={1.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden fixed inset-x-0 top-20"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav
              className="mx-4 rounded-xl bg-black/80 backdrop-blur-md shadow-lg border border-white/10"
              aria-label="Mobile navigation"
            >
              <div className="px-4 py-6 space-y-4">
                {navigationItems.map((item) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-2 text-base font-medium transition-colors duration-300 hover:text-white ${
                        location.pathname === item.path ? 'text-white font-bold' : 'text-gray-300'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  className="pt-4 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <SocialLinks />
                </motion.div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
