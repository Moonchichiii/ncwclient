import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Github, Linkedin } from 'lucide-react';
import PolicyModal from '../../common/PolicyModal';
import { policies } from './policies'; 

interface NavigationItem {
  path: string;
  label: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: typeof Github | typeof Linkedin;
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
    { platform: 'GitHub', url: 'https://github.com/nordiccodeworks', icon: Github },
    { platform: 'LinkedIn', url: 'https://linkedin.com/company/nordiccodeworks', icon: Linkedin },
  ];

  // Footer entrance animation
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const links = footer.querySelectorAll('.animate-link');
    const sections = footer.querySelectorAll('.footer-section');

    gsap.from(sections, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    });

    gsap.from(links, {
      opacity: 0,
      y: 10,
      duration: 0.4,
      stagger: 0.05,
      delay: 0.3,
      ease: 'power2.out',
    });
  }, []);

  const handlePolicyClick = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    setSelectedPolicy(policies[key as keyof typeof policies]);
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer ref={footerRef} className="bg-[#6a6969] py-8 sm:py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
            {/* Company Description */}
            <div className="footer-section flex flex-col items-center sm:items-start">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">Nordic Code Works</h3>
              <p className="text-gray-300 text-sm sm:text-base max-w-xs">
                Crafting elegant digital solutions with Scandinavian simplicity.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="footer-section flex flex-col items-center sm:items-start">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">Quick Links</h3>
              <nav className="flex flex-col items-center sm:items-start space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="animate-link text-gray-300 hover:text-[#CBB26A] transition-colors duration-200 text-sm sm:text-base"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Legal Links */}
            <div className="footer-section flex flex-col items-center sm:items-start">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">Legal</h3>
              <nav className="flex flex-col items-center sm:items-start space-y-2">
                {legalLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={(e) => handlePolicyClick(e, link.key)}
                    className="animate-link text-gray-300 hover:text-[#CBB26A] transition-colors duration-200 text-sm sm:text-base cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Contact and Social Links */}
            <div className="footer-section flex flex-col items-center sm:items-start">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">Connect</h3>
              <div className="flex flex-col items-center sm:items-start space-y-2">
                <a
                  href="mailto:contact@nordiccodeworks.com"
                  className="animate-link text-gray-300 hover:text-[#CBB26A] transition-colors duration-200 text-sm sm:text-base break-all sm:break-normal"
                >
                  contact@nordiccodeworks.com
                </a>
                <div className="flex items-center gap-4 mt-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link text-gray-300 hover:text-[#CBB26A] transition-colors duration-200"
                      aria-label={`Visit our ${social.platform}`}
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Copyright and Legal Disclaimer */}
          <div className="footer-section border-t border-gray-700 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-sm sm:text-base">
            <p className="text-gray-400">© {currentYear} Nordic Code Works. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <PolicyModal
        isOpen={!!selectedPolicy}
        onClose={() => setSelectedPolicy(null)}
        title={selectedPolicy?.title || ''}
        content={selectedPolicy?.content || ''}
      />
    </>
  );
};

export default Footer;
