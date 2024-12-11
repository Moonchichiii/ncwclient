import { useState, useEffect, useRef, FC } from 'react';
import gsap from 'gsap';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import ThemeToggle from '@/components/common/ThemeToggle';

interface HeaderProps {
  className?: string;
}

const navigationItems = [
  { href: '#intro', label: 'Home' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' }
];

const SocialLinks: FC = () => {
  const socialLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const links = document.querySelectorAll('.social-link');
      links.forEach(link => {
        const animation = gsap.to(link, {
          scale: 1.1,
          duration: 0.2,
          paused: true,
          ease: 'power2.out'
        });

        link.addEventListener('mouseenter', () => animation.play());
        link.addEventListener('mouseleave', () => animation.reverse());
      });
    }, socialLinksRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={socialLinksRef} className="flex items-center gap-4">
      <a
        href="https://github.com/nordiccodeworks"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link 
          text-gray-600 dark:text-gray-200
          hover:text-tekhelet-base dark:hover:text-tekhelet-hover-dark
          transition-all duration-300 hover:scale-105"
        aria-label="GitHub"
      >
        <Github size={20} strokeWidth={1.5} />
      </a>
      <a
        href="https://linkedin.com/company/nordiccodeworks"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link 
          text-gray-600 dark:text-gray-200
          hover:text-tekhelet-base dark:hover:text-tekhelet-hover-dark
          transition-all duration-300 hover:scale-105"
        aria-label="LinkedIn"
      >
        <Linkedin size={20} strokeWidth={1.5} />
      </a>
    </div>
  );
};

const Header: FC<HeaderProps> = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Close mobile menu when location changes
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [location.hash, isMobileMenuOpen]);

  // Header entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: 'power3.out'
      });

      const logoAnimation = gsap.to(logoRef.current, {
        scale: 1.05,
        duration: 0.3,
        paused: true,
        ease: 'power2.out'
      });

      logoRef.current?.addEventListener('mouseenter', () => logoAnimation.play());
      logoRef.current?.addEventListener('mouseleave', () => logoAnimation.reverse());
    }, headerRef);

    return () => ctx.revert();
  }, []);

  const handleMenuButtonClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    gsap.to(menuButtonRef.current, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });
  };

  // Update active link based on location
  const isActiveLink = (href: string) => {
    return location.hash === href || (href === '#intro' && !location.hash);
  };

  const handleLinkClick = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    window.location.hash = href;
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full 
        bg-white/90 dark:bg-surface-darker/90 
        backdrop-blur-md 
        border-b border-gray-200/20 dark:border-white/10 
        shadow-lg dark:shadow-xl
        z-[999] ${className}`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link 
            to="/" 
            className="flex items-center group relative" 
            aria-label="Nordic Code Works - Home"
          >
            <div ref={logoRef} className="relative overflow-hidden font-mono tracking-tighter flex">
              <span className="text-2xl font-bold">
                <span style={{ color: '#3BB4C5' }}>nordic</span>
                <span style={{ color: '#F1B418' }}>(</span>
                <span style={{ color: '#8655CA' }}>(</span>
                <span style={{ color: '#2D7ACA' }}>code</span>
                <span style={{ color: '#8655CA' }}>)</span>
                <span style={{ color: '#2D7ACA' }}> works</span>
                <span style={{ color: '#8655CA' }}>)</span>
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleLinkClick(item.href)}
                className={`nav-link text-sm font-medium 
                  text-gray-700 dark:text-gray-200 
                  hover:text-tekhelet-base dark:hover:text-tekhelet-hover-dark 
                  transition-all duration-300 hover:scale-105
                  ${isActiveLink(item.href) ? 'text-tekhelet-base dark:text-tekhelet-hover-dark' : ''}`}
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center gap-4 pl-4 border-l border-gray-200/50 dark:border-white/10">
              <ThemeToggle variant="header" />
              <SocialLinks />
            </div>
          </nav>

          <button
            ref={menuButtonRef}
            className="md:hidden relative w-10 h-10 flex items-center justify-center 
              text-gray-600 dark:text-gray-200 
              hover:text-tekhelet-base dark:hover:text-tekhelet-hover-dark 
              transition-all duration-300 hover:scale-105"
            onClick={handleMenuButtonClick}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className="md:hidden fixed inset-x-0 top-20"
        >
          <nav className="mx-4 rounded-xl glass shadow-lg transform-gpu" aria-label="Mobile navigation">
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item, index) => (
                <div key={item.href} ref={(el) => (menuItemsRef.current[index] = el)}>
                  <a 
                    href={item.href} 
                    onClick={handleLinkClick(item.href)}
                    className={`nav-link block py-2 text-base font-medium
                      text-gray-700 dark:text-gray-200
                      hover:text-tekhelet-base dark:hover:text-tekhelet-hover-dark
                      transition-all duration-300 hover:translate-x-1
                      ${isActiveLink(item.href) ? 'text-tekhelet-base dark:text-tekhelet-hover-dark' : ''}`}
                  >
                    {item.label}
                  </a>
                </div>
              ))}
              <div className="pt-4 border-t border-gray-200/50 dark:border-white/10">
                <SocialLinks />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;