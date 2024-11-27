import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

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
    if (!refs.containerRef.current) return;

    let isAnimationComplete = false;
    let isNavigating = false;

    const ctx = gsap.context(() => {
      // Main Timeline for Sequential Animations
      const mainTl = gsap.timeline({
        onComplete: () => {
          isAnimationComplete = true;
          onComplete?.();
        },
      });

      // Function to handle exit animation
      const handleExit = () => {
        if (isNavigating) return;
        isNavigating = true;

        const exitTl = gsap.timeline();
        
        exitTl.to('.desc-text', {
          text: "Welcome to Nordic Code Works",
          duration: 1,
          ease: "none"
        })
        .to('.title-char, .desc-text', {
          opacity: 0,
          y: -50,
          duration: 0.5,
          stagger: 0.02,
          ease: 'power4.in'
        })
        .to('.scroll-indicator', {
          opacity: 0,
          y: 30,
          duration: 0.3
        }, "<")
        .to('.overlay-slice', {
          scaleY: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.inOut',
          transformOrigin: 'bottom'
        }, "-=0.3");

        return exitTl;
      };

      // 1. Loading Overlay Animation
      mainTl.from('.overlay-slice', {
        scaleY: 0,
        duration: 1,
        ease: 'power4.inOut',
        stagger: 0.1,
        transformOrigin: 'bottom',
      })
      .to('.overlay-slice', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1,
        ease: 'power4.inOut',
        stagger: 0.1,
      });

      // 2. Text Animations
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
      .from('.discover-btn', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      }, "-=0.3");

      // 3. Background Lines Animation
      mainTl.from('.bg-line', {
        scaleY: 0,
        opacity: 0,
        duration: 1.5,
        stagger: 0.02,
        ease: 'power3.out',
      }, "-=1");

      // 4. Scroll Progress Tracking with debounce
      let scrollTimeout: NodeJS.Timeout;
      ScrollTrigger.create({
        trigger: refs.containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          if (!isAnimationComplete || isNavigating) return;
          
          if (self.progress > 0.1) {
            handleExit().then(() => {
              onScroll(self.progress);
            });
          }
        },
      });

      // 5. Scroll Indicator Animation
      mainTl.from('.scroll-indicator', {
        opacity: 0,
        y: -20,
        duration: 0.8,
        delay: 1,
      });

      // Handle automatic navigation
      setTimeout(() => {
        if (!isNavigating) {
          handleExit().then(() => {
            onScroll(1);
          });
        }
      }, 7000);

    }, refs.containerRef);

    // Cleanup
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [onScroll, onComplete, refs]);
};