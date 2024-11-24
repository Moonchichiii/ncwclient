import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { useNavigation } from '../../../context/NavigationContext'; // Adjust the import path as needed

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { showHeader } = useNavigation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const navigationItems = [
        { path: '/home', label: 'Home' },
        { path: '/portfolio', label: 'Portfolio' },
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' },
    ];

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
                isScrolled ? 'bg-[#223651]/90 backdrop-blur-sm' : 'bg-transparent'
            }`}
            initial={{ y: -100 }}
            animate={{ y: showHeader ? 0 : -100 }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link to="/home" className="flex items-center">
                        <motion.span 
                            className="text-xl font-bold"
                            whileHover={{ scale: 1.05 }}
                        >
                            Nordic<span className="text-[#CBB26A]">Code</span>
                        </motion.span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`text-sm font-medium transition-colors hover:text-[#CBB26A] ${
                                    location.pathname === item.path ? 'text-[#CBB26A]' : 'text-gray-300'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <SocialLinks />
                    </nav>

                    <motion.button
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.button>
                </div>
            </div>

            <MobileMenu isOpen={isMobileMenuOpen} items={navigationItems} />
        </motion.header>
    );
};

const SocialLinks = () => (
    <div className="flex items-center gap-4 ml-4">
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
);

const MobileMenu = ({ isOpen, items }: { isOpen: boolean; items: Array<{ path: string; label: string }> }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                className="md:hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
            >
                <div className="px-4 pt-2 pb-6 space-y-4 bg-[#223651] shadow-lg">
                    {items.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="block py-2 text-base font-medium transition-colors hover:text-[#CBB26A] text-gray-300"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="flex items-center gap-4 pt-4">
                        <SocialLinks />
                    </div>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
);

export default Header;