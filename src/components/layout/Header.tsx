import { useState, useEffect, useRef, FC } from 'react';
import gsap from 'gsap';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Github, Linkedin } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

const navigationItems = [
  { path: '/home', label: 'Home' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
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
        className="social-link text-gray-300 hover:text-white transition-colors duration-300"
        aria-label="GitHub"
      >
        <Github size={20} strokeWidth={1.5} />
      </a>
      <a
        href="https://linkedin.com/company/nordiccodeworks"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link text-gray-300 hover:text-white transition-colors duration-300"
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

  // Header entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: 'power3.out'
      });

      // Initialize hover animation for logo
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

  // Mobile menu animations
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      // Menu container animation
      tl.fromTo(mobileMenuRef.current,
        { 
          opacity: 0,
          y: -10,
          clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)'
        },
        { 
          opacity: 1,
          y: 0,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 0.3,
          ease: 'power3.out'
        }
      );

      // Menu items animation
      menuItemsRef.current.forEach((item, index) => {
        if (item) {
          tl.fromTo(item,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.3 },
            '-=0.1'
          );
        }
      });

      if (isMobileMenuOpen) {
        tl.play();
      } else if (mobileMenuRef.current) {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          y: -10,
          clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
          duration: 0.2,
          ease: 'power2.in'
        });
      }
    }, mobileMenuRef);

    return () => ctx.revert();
  }, [isMobileMenuOpen]);

  // Close mobile menu on location change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

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

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md border-b border-white/20 shadow-lg ${className}`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Keeping exact same colors */}
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-all duration-300 hover:text-white 
                  ${location.pathname === item.path 
                    ? 'text-white font-bold scale-105' 
                    : 'text-gray-300 hover:scale-105'
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

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            className="md:hidden relative w-10 h-10 flex items-center justify-center 
              text-gray-300 hover:text-white transition-colors duration-300"
            onClick={handleMenuButtonClick}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className="md:hidden fixed inset-x-0 top-20"
        >
          <nav
            className="mx-4 rounded-xl bg-black/90 backdrop-blur-md shadow-lg 
              border border-white/10 transform-gpu"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item, index) => (
                <div
                  key={item.path}
                  ref={(el) => (menuItemsRef.current[index] = el)}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2 text-base font-medium transition-all duration-300 
                      hover:text-white hover:translate-x-1 
                      ${location.pathname === item.path 
                        ? 'text-white font-bold' 
                        : 'text-gray-300'
                      }`}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
              <div
                className="pt-4 border-t border-white/10"
                ref={(el) => (menuItemsRef.current[navigationItems.length] = el)}
              >
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