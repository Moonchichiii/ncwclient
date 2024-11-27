import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import { ArrowRight } from 'lucide-react';
import { useLandingAnimations } from '../../hooks/useAnimation';

// Type definitions for refs and props
interface AnimationRefs {
    containerRef: React.RefObject<HTMLDivElement>;
    textRef: React.RefObject<HTMLDivElement>;
    scrollProgress: React.RefObject<number>;
    overlayRef: React.RefObject<HTMLDivElement>;
}

gsap.registerPlugin(ScrollTrigger);

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const { setShowHeader } = useNavigation();
    
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const scrollProgress = useRef<number>(0);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Preload other pages and handle auto-navigation
    useEffect(() => {
        const routes = ['/home', '/about', '/portfolio', '/contact'];
        routes.forEach(route => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = route;
            document.head.appendChild(link);
        });

        const timer = setTimeout(() => {
            navigate('/home');
        }, 8000);

        return () => clearTimeout(timer);
    }, [navigate]);

    useLandingAnimations({
        refs: {
            containerRef,
            textRef,
            scrollProgress,
            overlayRef,
        },
        onScroll: (progress: number) => {
            if (progress > 0.5) {
                navigate('/home');
            }
        },
        onComplete: () => {},
    });

    const title = "Nordic Code".split('');

    const ScrollIndicator: React.FC = () => (
        <motion.div 
            className="scroll-indicator absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
        >
            <div className="relative w-1 h-12 md:h-16 overflow-hidden rounded-full bg-gradient-to-b from-tekhelet-base to-tekhelet-finn-3">
                <motion.div 
                    className="absolute top-0 w-full h-4 bg-white rounded-full"
                    animate={{ y: ["0%", "100%"] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
            <span className="mt-2 md:mt-4 text-white/50 text-xs md:text-sm font-medium tracking-wider">
                SCROLL TO ENTER
            </span>
        </motion.div>
    );

    return (
        <div ref={containerRef} className="bg-black text-white overflow-hidden min-h-screen">
            {/* Loading Overlay */}
            <div ref={overlayRef} className="fixed inset-0 z-50 flex">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="overlay-slice flex-1 bg-gradient-to-b from-tekhelet-base to-tekhelet-finn-3 transform origin-bottom"
                    />
                ))}
            </div>

            {/* Hero Section */}
            <section className="hero-section min-h-screen flex items-center justify-center relative overflow-hidden px-4 md:px-6">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
                    {/* Responsive grid lines */}
                    <div className="hidden md:block">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-px bg-gradient-to-b from-white/0 via-white/5 to-white/0"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    height: '100%',
                                    opacity: Math.random() * 0.3,
                                }}
                            />
                        ))}
                    </div>
                    {/* Mobile-optimized grid lines */}
                    <div className="block md:hidden">
                        {[...Array(10)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-px bg-gradient-to-b from-white/0 via-white/5 to-white/0"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    height: '100%',
                                    opacity: Math.random() * 0.3,
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div ref={textRef} className="text-center w-full max-w-4xl px-4 md:px-6 z-10">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-space-grotesk font-bold mb-4 md:mb-8">
                        <div className="flex flex-wrap justify-center gap-x-2 md:gap-x-3">
                            {title.map((char, i) => (
                                <span key={i} className="title-char inline-block">
                                    {char === " " ? "\u00A0" : char}
                                </span>
                            ))}
                            <span className="title-char text-tekhelet-finn-3">Works</span>
                        </div>
                    </h1>
                    <p className="desc-text text-lg sm:text-xl md:text-2xl font-inter text-gray-400 mb-8 md:mb-12 leading-relaxed max-w-sm md:max-w-2xl mx-auto">
                        Crafting digital experiences through minimalist design and innovative technology
                    </p>
                    <motion.button
                        onClick={() => navigate('/home')}
                        className="discover-btn group relative px-6 md:px-8 py-3 md:py-4 bg-transparent overflow-hidden border border-white/20 rounded-lg opacity-0 w-full sm:w-auto"
                        whileHover="hover"
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-tekhelet-base to-tekhelet-finn-3"
                            initial={{ scaleX: 0 }}
                            variants={{
                                hover: {
                                    scaleX: 1,
                                    transition: { duration: 0.3, ease: 'easeInOut' },
                                },
                            }}
                            style={{ originX: 0 }}
                        />
                        <motion.span
                            className="relative flex items-center justify-center md:justify-start gap-2 font-medium text-sm md:text-base"
                            variants={{
                                hover: {
                                    color: 'white',
                                },
                            }}
                        >
                            Enter Site
                            <ArrowRight className="w-4 h-4" />
                        </motion.span>
                    </motion.button>
                </div>
                <ScrollIndicator />
            </section>
        </div>
    );
};

export default LandingPage;