import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import { ArrowRight, Code, Rocket, Shield, Star } from 'lucide-react';
import { useLandingAnimations } from '../../hooks/useAnimation';


gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
    const navigate = useNavigate();
    const { setShowHeader } = useNavigation();
    
    // Define all refs
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const scrollProgress = useRef(0);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Use the custom hook for animations
    useLandingAnimations({
        refs: {
            containerRef,
            textRef,
            scrollProgress,
            overlayRef,
        },
        onScroll: (progress) => {
            // Show header after 75% scroll
            if (progress > 0.75) {
                setShowHeader(true);
            } else {
                setShowHeader(false);
            }

            // Navigate to home when reaching the bottom
            if (progress === 1) {
                navigate('/home');
            }
        },
        onComplete: () => {
            // Optional callback when initial animations complete
        },
    });

    const title = "Nordic Code".split('');

    const ScrollIndicator = () => (
        <motion.div 
            className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
        >
            <div className="relative w-6 h-24">
                <div className="absolute top-0 w-full h-full border-2 border-white/20 rounded-full">
                    <div 
                        className="w-2 h-2 bg-[#CBB26A] rounded-full transform translate-x-1"
                        style={{
                            animation: 'scrollDown 2s infinite',
                        }}
                    />
                </div>
            </div>
            <span className="mt-4 text-white/50 text-sm font-medium tracking-wider">
                SCROLL
            </span>
        </motion.div>
    );

    return (
        <div ref={containerRef} className="bg-black text-white overflow-hidden">
            {/* Loading Overlay */}
            <div ref={overlayRef} className="fixed inset-0 z-50 flex">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="overlay-slice flex-1 bg-white transform origin-bottom"
                    />
                ))}
            </div>

            {/* Hero Section */}
            <section className="hero-section h-screen flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
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

                <div ref={textRef} className="text-center max-w-4xl px-4 z-10">
                    <h1 className="text-6xl md:text-8xl font-space-grotesk font-bold mb-8 flex justify-center">
                        <div className="flex">
                            {title.map((char, i) => (
                                <span key={i} className="title-char inline-block">
                                    {char === " " ? "\u00A0" : char}
                                </span>
                            ))}
                        </div>
                        <span className="title-char text-[#CBB26A]">Works</span>
                    </h1>
                    <p className="desc-text text-xl md:text-2xl font-inter text-gray-400 mb-12 leading-relaxed">
                        Crafting digital experiences through minimalist design and innovative technology
                    </p>
                    <motion.button
                        onClick={() => {
                            const nextSection = document.querySelector('.mission-section');
                            nextSection?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="group relative px-8 py-4 bg-transparent overflow-hidden border border-white/20 rounded-lg"
                        whileHover="hover"
                    >
                        <motion.div
                            className="absolute inset-0 bg-white"
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
                            className="relative flex items-center gap-2 font-medium"
                            variants={{
                                hover: {
                                    color: '#000',
                                },
                            }}
                        >
                            Discover Our Story
                            <ArrowRight className="w-4 h-4" />
                        </motion.span>
                    </motion.button>
                </div>
                <ScrollIndicator />
            </section>

            {/* Mission Section */}
            <section className="mission-section scroll-section relative min-h-screen bg-black py-32">
                <div className="parallax-bg absolute inset-0 bg-gradient-to-b from-[#223651]/20 to-transparent opacity-50" />
                <div className="relative z-10 max-w-6xl mx-auto px-4">
                    <h2 className="section-heading text-5xl md:text-6xl font-bold mb-16 text-center">
                        Our <span className="text-[#CBB26A]">Mission</span>
                    </h2>
                    <div className="section-content grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <Shield className="text-[#CBB26A] w-8 h-8 mt-1" />
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Security First</h3>
                                    <p className="text-gray-400">Building with security as a fundamental principle, not an afterthought.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Code className="text-[#CBB26A] w-8 h-8 mt-1" />
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Clean Code</h3>
                                    <p className="text-gray-400">Writing maintainable, scalable code that stands the test of time.</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <Rocket className="text-[#CBB26A] w-8 h-8 mt-1" />
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Innovation</h3>
                                    <p className="text-gray-400">Pushing boundaries with cutting-edge technologies and methodologies.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Star className="text-[#CBB26A] w-8 h-8 mt-1" />
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Excellence</h3>
                                    <p className="text-gray-400">Delivering exceptional quality in every project we undertake.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Numbers Section */}
            <section className="scroll-section relative min-h-screen bg-black py-32">
                <div className="parallax-bg absolute inset-0 bg-gradient-to-t from-[#223651]/20 to-transparent opacity-50" />
                <div className="relative z-10 max-w-6xl mx-auto px-4">
                    <h2 className="section-heading text-5xl md:text-6xl font-bold mb-16 text-center">
                        By the <span className="text-[#CBB26A]">Numbers</span>
                    </h2>
                    <div className="section-content grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: '100+', label: 'Projects Completed' },
                            { number: '50+', label: 'Happy Clients' },
                            { number: '5+', label: 'Years Experience' },
                            { number: '24/7', label: 'Support' },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-6xl font-bold text-[#CBB26A] mb-2">{stat.number}</div>
                                <div className="text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="scroll-section relative min-h-screen bg-black py-32 flex items-center">
                <div className="parallax-bg absolute inset-0 bg-gradient-to-b from-transparent via-[#223651]/20 to-transparent opacity-50" />
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <h2 className="section-heading text-5xl md:text-6xl font-bold mb-8">
                        Ready to <span className="text-[#CBB26A]">Start</span>?
                    </h2>
                    <p className="section-content text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                        Let's transform your ideas into reality with our expertise in digital solutions.
                    </p>
                    <motion.button
                        onClick={() => navigate('/contact')}
                        className="group relative px-8 py-4 bg-[#CBB26A] rounded-lg overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative font-medium text-black flex items-center gap-2">
                            Get in Touch
                            <ArrowRight className="w-4 h-4" />
                        </span>
                    </motion.button>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
