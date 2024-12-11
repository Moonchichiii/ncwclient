import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Github, Linkedin } from 'lucide-react';
import PolicyModal from '../common/PolicyModal';
import { policies } from './policies';

interface NavigationItem {
  path: string;
  label: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: React.ElementType;
  ariaLabel: string;
}

const Footer: React.FC = () => {
  const [selectedPolicy, setSelectedPolicy] = useState<{ title: string; content: string } | null>(null);
  const footerRef = useRef<HTMLElement>(null);

  const navigationItems: NavigationItem[] = [
    { path: '/home', label: 'Home' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const legalLinks = [
    { path: 'terms', label: 'Terms of Service', key: 'terms' },
    { path: 'privacy', label: 'Privacy Policy', key: 'privacy' },
    { path: 'cookie-policy', label: 'Cookie Policy', key: 'cookies' },
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
      ariaLabel: 'Connect with us on LinkedIn'
    },
  ];

  // Footer animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set('.footer-section', { opacity: 0, y: 20 });
      gsap.set('.animate-link', { opacity: 0, y: 10 });
      gsap.set('.footer-divider', { scaleX: 0 });

      // Create timeline
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      // Animate sections
      tl.to('.footer-section', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
      })
      .to('.animate-link', {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
      }, '-=0.3')
      .to('.footer-divider', {
        scaleX: 1,
        duration: 0.6,
        ease: 'power2.inOut'
      }, '-=0.4');

      // Social links hover animations
      const socialLinks = document.querySelectorAll('.social-link');
      socialLinks.forEach(link => {
        const animation = gsap.to(link, {
          scale: 1.1,
          duration: 0.2,
          paused: true,
          ease: 'power2.out'
        });

        link.addEventListener('mouseenter', () => {
          animation.play();
        });
        link.addEventListener('mouseleave', () => {
          animation.reverse();
        });
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handlePolicyClick = (key: string) => {
    setSelectedPolicy(policies[key as keyof typeof policies]);
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer ref={footerRef} className="relative w-full bg-white dark:bg-surface-darker py-16 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-5 dark:opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center sm:text-left">
            {/* Company Description */}
            <div className="footer-section">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white font-mono">Nordic Code Works</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed max-w-xs">
                Crafting elegant digital solutions with Scandinavian simplicity and precision.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="footer-section">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
              <nav className="flex flex-col items-center sm:items-start space-y-3">
                {navigationItems.map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
                    className="animate-link text-gray-600 dark:text-gray-300 hover:text-tekhelet-base dark:hover:text-white transition-all duration-300 hover:translate-x-1 text-sm"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Legal Links */}
            <div className="footer-section">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Legal</h3>
              <nav className="flex flex-col items-center sm:items-start space-y-3">
                {legalLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => handlePolicyClick(link.key)}
                    className="animate-link text-gray-600 dark:text-gray-300 hover:text-tekhelet-base dark:hover:text-white transition-all duration-300 hover:translate-x-1 text-sm text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Contact and Social Links */}
            <div className="footer-section">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Connect</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 justify-center sm:justify-start">
                  {socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300"
                      aria-label={social.ariaLabel}
                    >
                      <social.icon size={18} className="text-gray-600 dark:text-white" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Copyright and Legal Disclaimer */}
          <div className="footer-divider w-full h-px bg-gray-200 dark:bg-white/10 mt-12 mb-8 origin-left" />
          <div className="footer-section text-center w-full">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {currentYear} Nordic Code Works. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <PolicyModal
        isOpen={!!selectedPolicy}
        onClose={() => setSelectedPolicy(null)}
        title={selectedPolicy?.title ?? ''}
        content={selectedPolicy?.content ?? ''}
      />
    </>
  );
};

export default Footer;