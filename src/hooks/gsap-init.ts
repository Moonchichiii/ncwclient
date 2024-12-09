import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// GSAP Default Configurations
ScrollTrigger.defaults({
  markers: import.meta.env.DEV,
  start: 'top center',
  end: 'bottom center',
  toggleActions: 'play none none reverse',
  preventOverlaps: true,
  fastScrollEnd: true
});

gsap.defaults({
  ease: 'power3.out',
  duration: 0.8,
  overwrite: 'auto'
});

gsap.config({
  autoSleep: 60,
  force3D: true,
  nullTargetWarn: false,
  units: { left: '%', top: '%', rotation: 'deg' },
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
});

// Utilities
export const scrollTo = (target: string | number | Element, options = {}) => {
  const defaults = {
    duration: 1,
    ease: "power2.inOut",
    autoKill: true,
    offsetY: 0
  };

  return gsap.to(window, {
    ...defaults,
    ...options,
    scrollTo: typeof target === 'string' || target instanceof Element ?
      { y: target, offsetY: defaults.offsetY } :
      { y: target }
  });
};

// Main GSAP Setup Hook
export const useGSAPSetup = () => {
  useEffect(() => {
    ScrollTrigger.getAll().forEach(t => t.kill());
    gsap.killTweensOf(window);

    const elements = {
      header: document.querySelector('#masthead'),
      intro: document.querySelector('#intro'),
      panelsSection: document.querySelector('#panels'),
      panelsContainer: document.querySelector('#panels-container'),
      panels: gsap.utils.toArray('.panel')
    };

    if (!elements.header || !elements.panelsSection || !elements.panelsContainer) return;

    const ctx = gsap.context(() => {
      // Header Animation
      ScrollTrigger.create({
        trigger: elements.intro,
        start: "bottom top+=100",
        onEnter: () => gsap.to(elements.header, { opacity: 1, pointerEvents: 'auto', duration: 0.3 }),
        onLeaveBack: () => gsap.to(elements.header, { opacity: 0, pointerEvents: 'none', duration: 0.3 })
      });

      // Horizontal Scroll
      const horizontalScroll = gsap.to(elements.panelsContainer, {
        x: () => -(elements.panelsContainer.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: elements.panelsSection,
          pin: true,
          start: "top top",
          end: () => `+=${elements.panelsContainer.scrollWidth - window.innerWidth}`,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (elements.panels.length - 1),
            duration: 0.3,
            ease: "power1.inOut"
          },
          onUpdate: (self) => {
            gsap.set(elements.panelsContainer, {
              force3D: true,
              willChange: self.isActive ? "transform" : "auto"
            });
          }
        }
      });

      // Navigation Handler
      const handleNavClick = (e: Event) => {
        const link = (e.target as Element).closest('a[href^="#"]');
        if (!link) return;
        
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (!targetId) return;

        const target = document.querySelector(targetId);
        if (!target) return;

        const panel = target.closest('.panel');
        if (panel && elements.panels.includes(panel)) {
          const progress = elements.panels.indexOf(panel) / (elements.panels.length - 1);
          scrollTo(elements.panelsSection, {
            onComplete: () => horizontalScroll.scrollTrigger?.scroll(progress)
          });
        } else {
          scrollTo(target);
        }
      };

      document.addEventListener('click', handleNavClick);
      return () => document.removeEventListener('click', handleNavClick);
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
};

// Utilities for external use
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh(true);
};

let refreshTimeout: number;
export const debouncedRefresh = () => {
  window.clearTimeout(refreshTimeout);
  refreshTimeout = window.setTimeout(() => ScrollTrigger.refresh(true), 100);
};