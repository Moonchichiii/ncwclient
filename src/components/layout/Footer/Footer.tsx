import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
  const navigationItems = [
    { path: '/home', label: 'Home' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-[#223651] py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Nordic Code Works</h3>
            <p className="text-gray-300">
              Crafting elegant digital solutions with Scandinavian simplicity
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block text-gray-300 hover:text-[#CBB26A] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <div className="space-y-2">
              <a
                href="mailto:contact@nordiccodeworks.com"
                className="block text-gray-300 hover:text-[#CBB26A] transition-colors"
              >
                contact@nordiccodeworks.com
              </a>
              <div className="flex items-center gap-4 mt-4">
                <motion.a
                  href="https://github.com/nordiccodeworks"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-300 hover:text-[#CBB26A]"
                >
                  <Github size={20} />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/company/nordiccodeworks"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-300 hover:text-[#CBB26A]"
                >
                  <Linkedin size={20} />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Nordic Code Works. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
