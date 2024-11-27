import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

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
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/company/nordiccodeworks',
      icon: Linkedin,
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#223651] py-8 sm:py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center sm:text-left">
          {/* Company Description */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">
              Nordic Code Works
            </h3>
            <p className="text-gray-300 text-sm sm:text-base max-w-xs">
              Crafting elegant digital solutions with Scandinavian simplicity
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">
              Quick Links
            </h3>
            <nav className="flex flex-col items-center sm:items-start space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-300 hover:text-[#CBB26A] transition-colors duration-200 text-sm sm:text-base"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">
              Connect
            </h3>
            <div className="flex flex-col items-center sm:items-start space-y-2">
              <a
                href="mailto:contact@nordiccodeworks.com"
                className="text-gray-300 hover:text-[#CBB26A] transition-colors duration-200 text-sm sm:text-base break-all sm:break-normal"
              >
                contact@nordiccodeworks.com
              </a>
              <div className="flex items-center gap-4 mt-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="text-gray-300 hover:text-[#CBB26A] transition-colors duration-200"
                    aria-label={`Visit our ${social.platform}`}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Nordic Code Works. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;