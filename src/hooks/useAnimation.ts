import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimationRefs {
    containerRef: React.RefObject<HTMLDivElement>;
    textRef: React.RefObject<HTMLDivElement>;
    scrollProgress: React.RefObject<number>;
    overlayRef: React.RefObject<HTMLDivElement>;
}

interface AnimationProps {
    refs: AnimationRefs;
    onScroll: (progress: number) => void;
    onComplete?: () => void;
}

export const useLandingAnimations = ({ refs, onScroll, onComplete }: AnimationProps) => {
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Initial sequence
            const mainTl = gsap.timeline({
                onComplete: () => onComplete?.(),
            });

            // Loading overlay animation
            mainTl.from('.overlay-slice', {
                scaleY: 0,
                duration: 1,
                ease: 'power4.inOut',
                stagger: 0.1,
            })
            .to('.overlay-slice', {
                scaleY: 0,
                transformOrigin: 'top',
                duration: 1,
                ease: 'power4.inOut',
                stagger: 0.1,
            });

            // Enhanced text animations
            mainTl.from('.title-char', {
                opacity: 0,
                y: 100,
                duration: 1,
                stagger: 0.05,
                ease: 'power4.out',
                delay: 0.5,
            }, "-=0.5")
            .from('.desc-text', {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out',
            }, "-=0.5")
            .from('.hero-button', {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out',
            }, "-=0.3");

            // Background elements animation
            mainTl.from('.bg-line', {
                scaleY: 0,
                opacity: 0,
                duration: 1.5,
                stagger: 0.02,
                ease: 'power3.out',
            }, "-=1");

            // Scroll-triggered animations
            const sections = gsap.utils.toArray('.scroll-section');
            
            // Pin first section
            ScrollTrigger.create({
                trigger: '.hero-section',
                start: 'top top',
                pin: true,
                pinSpacing: false,
            });

            // Section animations
            sections.forEach((section: any) => {
                const heading = section.querySelector('.section-heading');
                const content = section.querySelector('.section-content');
                
                if (heading) {
                    gsap.from(heading, {
                        opacity: 0,
                        y: 50,
                        scrollTrigger: {
                            trigger: section,
                            start: 'top center',
                            end: 'center center',
                            scrub: 1,
                        },
                    });
                }

                if (content) {
                    gsap.from(content, {
                        opacity: 0,
                        y: 100,
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 60%',
                            end: 'center center',
                            scrub: 1,
                        },
                    });
                }
            });

            // Enhanced parallax effects
            const parallaxElements = gsap.utils.toArray('.parallax-bg');
            parallaxElements.forEach((el: any) => {
                gsap.to(el, {
                    y: '30%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                    },
                });
            });

            // Stats counter animation
            const stats = gsap.utils.toArray('.stat-number');
            stats.forEach((stat: any) => {
                gsap.from(stat, {
                    textContent: 0,
                    duration: 2,
                    ease: 'power1.inOut',
                    snap: { textContent: 1 },
                    scrollTrigger: {
                        trigger: stat,
                        start: 'top center+=100',
                        once: true,
                    },
                });
            });

            // Scroll progress
            ScrollTrigger.create({
                trigger: refs.containerRef.current,
                start: 'top top',
                end: 'bottom bottom',
                onUpdate: (self) => {
                    if (refs.scrollProgress.current) {
                        refs.scrollProgress.current = self.progress;
                    }
                    onScroll(self.progress);
                },
            });

            // Enhanced scroll indicator
            mainTl.from('.scroll-indicator', {
                opacity: 0,
                y: -20,
                duration: 0.8,
                delay: 1,
            });

            gsap.to('.scroll-indicator', {
                opacity: 0,
                y: 30,
                scrollTrigger: {
                    trigger: '.hero-section',
                    start: 'center center',
                    end: 'bottom center',
                    scrub: 1,
                },
            });
        }, refs.containerRef);

        return () => ctx.revert();
    }, [onScroll, onComplete]);
};