import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
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

const SocialLinks = () => {
  const socialLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const links = socialLinksRef.current?.querySelectorAll('.social-link');
    if (!links) return;

    links.forEach((link) => {
      const el = link as HTMLElement;
      
      const enterAnimation = gsap.to(el, {
        scale: 1.1,
        duration: 0.2,
        paused: true,
      });

      el.addEventListener('mouseenter', () => enterAnimation.play());
      el.addEventListener('mouseleave', () => enterAnimation.reverse());
    });
  }, []);

  return (
    <div ref={socialLinksRef} className="flex items-center gap-4">
      {socialLinks.map(({ platform, url, icon: Icon, ariaLabel }) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link text-gray-300 hover:text-white transition-colors duration-300"
          aria-label={ariaLabel}
        >
          <Icon size={20} strokeWidth={1.5} />
        </a>
      ))}
    </div>
  );
};

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { showHeader } = useNavigation();
  
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize header animation
  useEffect(() => {
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, []);

  // Logo hover animation
  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    const hoverAnimation = gsap.to(logo, {
      scale: 1.05,
      duration: 0.3,
      paused: true,
    });

    logo.addEventListener('mouseenter', () => hoverAnimation.play());
    logo.addEventListener('mouseleave', () => hoverAnimation.reverse());
  }, []);

  // Mobile menu animations
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    const tl = gsap.timeline({ paused: true });
    
    tl.fromTo(mobileMenuRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }
    );

    menuItemsRef.current.forEach((item, index) => {
      if (item) {
        tl.fromTo(item,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.2 },
          index * 0.1
        );
      }
    });

    if (isMobileMenuOpen) {
      tl.play();
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: 'power2.in',
      });
    }
  }, [isMobileMenuOpen]);

  // Reset mobile menu state on route change
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
    });
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 ${
        showHeader ? 'bg-black/60 backdrop-blur-md border-b border-white/10' : ''
      } transition-all`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/home" className="flex items-center group" aria-label="Nordic Code Works - Home">
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

          <button
            ref={menuButtonRef}
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-300"
            onClick={handleMenuButtonClick}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <X size={24} strokeWidth={1.5} />
            ) : (
              <Menu size={24} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className="md:hidden fixed inset-x-0 top-20"
        >
          <nav
            className="mx-4 rounded-xl bg-black/80 backdrop-blur-md shadow-lg border border-white/10"
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
                    className={`block py-2 text-base font-medium transition-colors duration-300 hover:text-white ${
                      location.pathname === item.path ? 'text-white font-bold' : 'text-gray-300'
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