import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import { ArrowDown, Clock } from 'lucide-react';

import gsap from 'gsap';
import '../../package/SplitText.js'; 

// Then you can use it as a property of gsap
const tl = gsap.timeline();
const splitText = new gsap.SplitText(nordicTextRef.current, { type: "chars" });

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const { setShowHeader } = useNavigation();
    const [times, setTimes] = useState<Record<string, Date>>({});
    const [isLoaded, setIsLoaded] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const nordicTextRef = useRef<HTMLDivElement>(null);
    const codeTextRef = useRef<HTMLDivElement>(null);
    const techStackRef = useRef<HTMLDivElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Text animation
        const nordicSplit = new SplitText(nordicTextRef.current, { type: "chars" });
        const codeSplit = new SplitText(codeTextRef.current, { type: "chars" });
        
        const tl = gsap.timeline();
        
        tl.from(nordicSplit.chars, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "back.out(1.7)"
        })
        .from(codeSplit.chars, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "back.out(1.7)"
        }, "-=0.5")
        .from(".tagline", {
            y: 30,
            opacity: 0,
            duration: 0.8
        }, "-=0.3")
        .from(".tech-item", {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)"
        })
        .from(scrollIndicatorRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.8
        });

        // Cleanup
        return () => {
            tl.kill();
            nordicSplit.revert();
            codeSplit.revert();
        };
    }, []);

    // Add hover effect for tech items
    useEffect(() => {
        const techItems = document.querySelectorAll('.tech-item');
        techItems.forEach(item => {
            gsap.to(item, {
                scale: 1.05,
                duration: 0.3,
                paused: true,
                ease: "power2.out"
            });
        });
    }, []);

    // Your existing scroll and time effects remain the same
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

    // Rest of your existing time-related code remains the same

    return (
        <div ref={containerRef} className="bg-black text-white overflow-hidden min-h-screen relative">
            {/* Background remains the same */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-800 opacity-20 z-0" />

            <div className="relative min-h-screen flex flex-col justify-center items-center px-4">
                {/* Time display section remains the same */}
                
                <div ref={textRef} className="text-center w-full max-w-[90vw] mx-auto mb-8">
                    <h1 className="text-[10vw] sm:text-[9vw] md:text-[8vw] lg:text-[7vw] font-mono leading-none tracking-tighter mb-4">
                        <div ref={nordicTextRef} className="block text-white overflow-hidden">
                            nordic
                        </div>
                        <div ref={codeTextRef} className="block text-white opacity-90 overflow-hidden">
                            ((code) => works)
                        </div>
                    </h1>

                    <div className="tagline overflow-hidden">
                        <p className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
                            Crafting digital solutions with Nordic precision
                        </p>
                    </div>
                </div>

                <div ref={techStackRef} className="flex flex-wrap justify-center gap-2 px-4 mb-8">
                    {['React', 'Node.js', 'TypeScript', 'Python', 'Django'].map((tech) => (
                        <span 
                            key={tech} 
                            className="tech-item text-xs px-3 py-1 rounded-full border border-white/20 text-gray-300 hover:border-white/40 transition-colors"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <div ref={scrollIndicatorRef} className="absolute bottom-6 w-full left-0 right-0 flex flex-col items-center justify-center gap-2">
                    <ArrowDown className="animate-bounce text-white w-5 mx-auto" />
                    <span className="text-xs uppercase tracking-widest text-gray-300 font-medium text-center w-full inline-block">
                        Scroll Down
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;