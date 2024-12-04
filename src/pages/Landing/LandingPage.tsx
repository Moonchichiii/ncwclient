import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import { ArrowDown, Clock } from 'lucide-react';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const { setShowHeader } = useNavigation();

    const [times, setTimes] = useState<Record<string, Date>>({});
    const [isLoaded, setIsLoaded] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const scrollProgress = useRef<number>(0);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            if (scrollPosition > windowHeight * 0.5) {
                navigate('/home');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [navigate]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.1,
            },
        },
    };

    const letterVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 50,
            },
        },
    };

    useEffect(() => {
        const updateTimes = () => {
            const now = new Date();
            setTimes({
                stockholm: new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Stockholm' })),
                newYork: new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' })),
                london: new Date(now.toLocaleString('en-US', { timeZone: 'Europe/London' })),
                tokyo: new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' })),
            });
        };

        updateTimes();
        const interval = setInterval(updateTimes, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (date?: Date) => {
        return date?.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    };

    const nordicText = 'nordic'.split('');
    const codeText = '((code) => works)'.split('');

    useEffect(() => {
        const routes = ['/home', '/about', '/portfolio', '/contact'];
        routes.forEach((route) => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = route;
            document.head.appendChild(link);
        });

        setTimeout(() => setIsLoaded(true), 500);
    }, [navigate]);

    return (
        <div ref={containerRef} className="bg-black text-white overflow-hidden min-h-screen relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-800 opacity-20 z-0" />

            <div className="relative min-h-screen flex flex-col justify-center items-center px-4 landscape:justify-start landscape:pt-16">
                <div className="absolute top-8 sm:top-10 md:top-12 left-6 sm:left-8 md:left-12 flex items-center gap-2 text-xs sm:text-sm landscape:top-4">
                    <div className="w-8 sm:w-10 md:w-12 h-[1px] bg-white opacity-20" />
                    <span>2024</span>
                </div>

                <div className="absolute top-8 sm:top-10 md:top-12 right-6 sm:right-8 md:right-12 flex flex-col sm:flex-row flex-wrap justify-end items-end sm:items-center gap-3 sm:gap-6 md:gap-8 text-xs landscape:flex-row landscape:items-center landscape:top-4 landscape:gap-4">
                    {[
                        { city: 'STOCKHOLM', timeZone: 'stockholm' },
                        { city: 'NEW YORK', timeZone: 'newYork' },
                        { city: 'LONDON', timeZone: 'london' },
                        { city: 'TOKYO', timeZone: 'tokyo' },
                    ].map((location) => (
                        <div key={location.city} className="flex items-center gap-2">
                            <Clock size={12} className="text-white opacity-70" />
                            <span className="text-white opacity-70 font-medium hidden sm:inline landscape:hidden">
                                {location.city}
                            </span>
                            <span className="text-white opacity-70 font-medium sm:hidden landscape:inline">
                                {location.city.slice(0, 3)}
                            </span>
                            <span className="text-white font-mono font-medium">
                                {formatTime(times[location.timeZone])}
                            </span>
                            <div className="w-8 h-[1px] bg-white opacity-30" />
                        </div>
                    ))}
                </div>

                <motion.div ref={textRef} className="text-center w-full max-w-[90vw] mx-auto mb-8 landscape:mb-4 landscape:mt-8" variants={containerVariants} initial="hidden" animate="visible">
                    <h1 className="text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[7vw] font-mono leading-none tracking-tighter mb-4 landscape:text-[4vw] landscape:mb-2">
                        <div className="block text-white overflow-hidden">
                            <motion.div className="flex justify-center">
                                {nordicText.map((letter, index) => (
                                    <motion.span key={index} variants={letterVariants} className="inline-block">
                                        {letter}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </div>
                        <div className="block text-white opacity-90 overflow-hidden">
                            <motion.div className="flex justify-center">
                                {codeText.map((letter, index) => (
                                    <motion.span key={index} variants={letterVariants} className="inline-block">
                                        {letter}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </div>
                    </h1>

                    <motion.div className="overflow-hidden landscape:mb-2" variants={letterVariants}>
                        <p className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light landscape:text-sm">
                            Crafting digital solutions with Nordic precision
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div className="flex flex-wrap justify-center gap-2 px-4 mb-8 landscape:mb-4 landscape:gap-1.5" variants={containerVariants} initial="hidden" animate="visible">
                    {['React', 'Node.js', 'TypeScript', 'Python', 'Django'].map((tech) => (
                        <motion.span key={tech} variants={letterVariants} className="text-xs px-3 py-1 rounded-full border border-white/20 text-gray-300 hover:border-white/40 transition-colors landscape:text-xs landscape:px-2 landscape:py-0.5" whileHover={{ scale: 1.05 }}>
                            {tech}
                        </motion.span>
                    ))}
                </motion.div>

                <motion.div className="absolute bottom-6 w-full left-0 right-0 flex flex-col items-center justify-center gap-2 landscape:bottom-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
                    <ArrowDown className="animate-bounce text-white w-5 mx-auto landscape:w-4" />
                    <span className="text-xs uppercase tracking-widest text-gray-300 font-medium text-center w-full inline-block landscape:text-xs">
                        Scroll Down
                    </span>
                </motion.div>
            </div>
        </div>
    );
};

export default LandingPage;
