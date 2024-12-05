import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import { ArrowDown, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText, CustomEase } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const { setShowHeader } = useNavigation();
    const [times, setTimes] = useState<Record<string, Date>>({});
    const [isLoaded, setIsLoaded] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);
    const timeDisplayRef = useRef<HTMLDivElement>(null);

    const nordicText = 'nordic'.split('');
    const codeText = '((code) => works)'.split('');

    useEffect(() => {
        setShowHeader(false);

        CustomEase.create("textReveal", "M0,0 C0.25,0.1 0.25,1 1,1");

        const tl = gsap.timeline();
        const titleSplit = new SplitText(textRef.current?.querySelector('h1'), {
            type: 'chars,words',
            charsClass: 'char-split'
        });

        gsap.set([titleSplit.chars, '.tagline', '.tech-item', scrollIndicatorRef.current], {
            y: 50,
            opacity: 0
        });

        gsap.set(timeDisplayRef.current, {
            x: -30,
            opacity: 0
        });

        tl.to(titleSplit.chars, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.03,
            ease: 'textReveal'
        })
        .to('.tagline', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5')
        .to('.tech-item', {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        }, '-=0.5')
        .to(scrollIndicatorRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.3')
        .to(timeDisplayRef.current, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.6');

        const scrollTrigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            onEnter: () => {
                setShowHeader(true);
                navigate('/home');
            },
        });

        return () => {
            scrollTrigger.kill();
            titleSplit.revert();
        };
    }, [navigate, setShowHeader]);

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

    useEffect(() => {
        const techItems = document.querySelectorAll('.tech-item');

        techItems.forEach((item) => {
            const el = item as HTMLElement;

            const handleMouseEnter = () => {
                gsap.to(el, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
            };

            const handleMouseLeave = () => {
                gsap.to(el, { scale: 1, duration: 0.3, ease: 'power2.out' });
            };

            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            };
        });
    }, []);

    return (
        <div ref={containerRef} className="bg-black text-white overflow-hidden min-h-screen relative">
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-800 opacity-20" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '32px 32px'
                    }}
                />
            </div>

            <div className="relative min-h-screen flex flex-col justify-center items-center px-4 landscape:justify-start landscape:pt-16">
                <div ref={timeDisplayRef} className="absolute top-8 sm:top-10 md:top-12 left-6 sm:left-8 md:left-12 flex items-center gap-2 text-xs sm:text-sm landscape:top-4">
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

                <div ref={textRef} className="text-center w-full max-w-[90vw] mx-auto mb-8 landscape:mb-4 landscape:mt-8">
                    <h1 className="text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[7vw] font-mono leading-none tracking-tighter mb-4 landscape:text-[4vw] landscape:mb-2">
                        <div className="block text-white overflow-hidden">
                            <div className="flex justify-center">
                                {nordicText.map((letter, index) => (
                                    <span key={index} className="letter inline-block">
                                        {letter}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="block text-white opacity-90 overflow-hidden">
                            <div className="flex justify-center">
                                {codeText.map((letter, index) => (
                                    <span key={index} className="letter inline-block">
                                        {letter}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </h1>

                    <div className="overflow-hidden landscape:mb-2">
                        <p className="tagline text-base sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light landscape:text-sm">
                            Crafting digital solutions with Nordic precision
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 px-4 mb-8 landscape:mb-4 landscape:gap-1.5">
                    {['React', 'Node.js', 'TypeScript', 'Python', 'Django'].map((tech) => (
                        <span
                            key={tech}
                            className="tech-item text-xs px-3 py-1 rounded-full border border-white/20 text-gray-300 hover:border-white/40 transition-colors landscape:text-xs landscape:px-2 landscape:py-0.5"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <div
                    ref={scrollIndicatorRef}
                    className="scroll-indicator absolute bottom-6 w-full left-0 right-0 flex flex-col items-center justify-center gap-2 landscape:bottom-2"
                >
                    <ArrowDown className="animate-bounce text-white w-5 mx-auto landscape:w-4" />
                    <span className="text-xs uppercase tracking-widest text-gray-300 font-medium text-center w-full inline-block landscape:text-xs mb-10">
                        Scroll Down
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
