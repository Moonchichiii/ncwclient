// usePageAnimations.ts
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger, ScrollSmoother } from 'gsap/all';
import { useNavigation } from '../context/NavigationContext';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const usePageAnimations = () => {
  const { setShowHeader } = useNavigation();
  const smoothWrapperRef = useRef<HTMLDivElement>(null);
  const smoothContentRef = useRef<HTMLDivElement>(null);
  const smoother = useRef<any>(null);

  useEffect(() => {
    if (!smoothWrapperRef.current || !smoothContentRef.current) return;

    const smootherInstance = ScrollSmoother.create({
      wrapper: smoothWrapperRef.current,
      content: smoothContentRef.current,
      smooth: 1.5,
      effects: true,
      normalizeScroll: true,
    });

    const sections = gsap.utils.toArray<HTMLElement>('section');
    sections.forEach((section, index) => {
      const isVertical = index === 0 || index === sections.length - 1;

      gsap.set(section, {
        x: isVertical ? '0%' : (index % 2 === 0 ? '100%' : '-100%'),
        y: isVertical ? '100%' : '0%',
        opacity: 0,
      });

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'top center',
        scrub: 1,
        onEnter: () => gsap.to(section, { x: '0%', y: '0%', opacity: 1 }),
        onLeaveBack: () => gsap.to(section, {
          x: isVertical ? '0%' : (index % 2 === 0 ? '-100%' : '100%'),
          y: isVertical ? '100%' : '0%',
          opacity: 0,
        }),
      });
    });

    // Fix Header Animation
    ScrollTrigger.create({
      trigger: '.home-intro',
      start: 'top top',
      end: '+=200',
      onEnter: () => {
        setShowHeader(true);
        gsap.to('.header', { y: 0, duration: 0.6, ease: 'power2.out' });
      },
      onLeaveBack: () => {
        setShowHeader(false);
        gsap.to('.header', { y: -100, duration: 0.6, ease: 'power2.in' });
      },
    });

    return () => {
      smootherInstance.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [setShowHeader]);

  return {
    smoothWrapperRef,
    smoothContentRef,
  };
};

export default usePageAnimations;
