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
    if (!refs.containerRef.current) return; // Ensure the containerRef is available

    const ctx = gsap.context(() => {
      // Main Timeline for Sequential Animations
      const mainTl = gsap.timeline({
        onComplete: () => onComplete?.(),
      });

      // 1. Loading Overlay Animation
      mainTl.from('.overlay-slice', {
        scaleY: 0,
        duration: 1,
        ease: 'power4.inOut',
        stagger: 0.1,
        transformOrigin: 'bottom',
        willChange: 'transform, opacity',
      })
      .to('.overlay-slice', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1,
        ease: 'power4.inOut',
        stagger: 0.1,
        willChange: 'transform, opacity',
      });

      // 2. Enhanced Text Animations
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
        delay: 0.5 
      }, "-=0.3");

      // 3. Background Elements Animation
      mainTl.from('.bg-line', {
        scaleY: 0,
        opacity: 0,
        duration: 1.5,
        stagger: 0.02,
        ease: 'power3.out',
      }, "-=1");

      // 4. Scroll-Triggered Animations
      const sections = gsap.utils.toArray<HTMLElement>('.scroll-section');

      // Pin the first section
      ScrollTrigger.create({
        trigger: '.hero-section',
        start: 'top top',
        pin: true,
        pinSpacing: false,
      });

      // Animate each section's heading and content
      sections.forEach((section) => {
        const heading = section.querySelector<HTMLElement>('.section-heading');
        const content = section.querySelector<HTMLElement>('.section-content');

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

      // 5. Enhanced Parallax Effects
      const parallaxElements = gsap.utils.toArray<HTMLElement>('.parallax-bg');
      parallaxElements.forEach((el) => {
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

      // 6. Stats Counter Animation
      const stats = gsap.utils.toArray<HTMLElement>('.stat-number');
      stats.forEach((stat) => {
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

      // 7. Scroll Progress Indicator
      ScrollTrigger.create({
        trigger: refs.containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          if (refs.scrollProgress.current !== undefined) {
            refs.scrollProgress.current = self.progress;
          }
          onScroll(self.progress);
        },
      });

      // 8. Enhanced Scroll Indicator Animation
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

    // Cleanup on unmount
    return () => ctx.revert();
  }, [onScroll, onComplete, refs]);
};
