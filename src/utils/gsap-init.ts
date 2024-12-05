// utils/gsap-init.ts
import gsap from 'gsap';
import {
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  CustomEase
} from 'gsap/all';

// Register essential GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// Configure ScrollTrigger defaults
ScrollTrigger.defaults({
  limitCallbacks: true,
  markers: false,
  invalidateOnRefresh: true,
  ignoreMobileResize: true,
});

// Custom eases for animations
const eases = {
  textReveal: CustomEase.create('textReveal', 'M0,0 C0.25,0.1 0.25,1 1,1'),
  headerSlide: CustomEase.create('headerSlide', 'M0,0,C0.4,0,0.2,1,1,1'),
  smoothReveal: CustomEase.create('smoothReveal', 'M0,0,C0.25,0.1,0.5,1,1,1'),
};

// Smooth scroll initialization
export const initSmoothScroll = (wrapper: string = '#smooth-wrapper', content: string = '#smooth-content') => {
  if (!ScrollSmoother.get()) {
    return ScrollSmoother.create({
      wrapper: wrapper,
      content: content,
      smooth: 1.5,
      normalizeScroll: true,
      smoothTouch: 0.1,
      ignoreMobileResize: true,
      onUpdate: (self) => {
        const progress = document.querySelector('.scroll-progress');
        if (progress) {
          gsap.to(progress, {
            width: `${self.progress * 100}%`,
            duration: 0.1,
            ease: 'none',
          });
        }
      },
    });
  }
  return ScrollSmoother.get();
};

// Page transition animations
export const pageTransition = {
  vertical: (element: HTMLElement, direction: 'up' | 'down' = 'up') => {
    return gsap.fromTo(
      element,
      { 
        opacity: 0,
        y: direction === 'up' ? 100 : -100 
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: eases.smoothReveal,
      }
    );
  },

  horizontal: (element: HTMLElement, direction: 'left' | 'right' = 'right') => {
    return gsap.fromTo(
      element,
      { 
        opacity: 0,
        x: direction === 'left' ? -100 : 100 
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: eases.smoothReveal,
      }
    );
  },

  fade: (element: HTMLElement) => {
    return gsap.fromTo(
      element,
      { opacity: 0 },
      { 
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      }
    );
  }
};

// Animation presets
export const animations = {
  letterReveal: (elements: HTMLElement[]) => {
    return gsap.from(elements, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: eases.textReveal,
    });
  },

  fadeUp: (elements: HTMLElement[], delay = 0) => {
    return gsap.from(elements, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      delay,
      ease: 'power2.out',
    });
  }
};

// Initialize scroll triggers
export const initScrollTriggers = () => {
  ScrollTrigger.batch('.fadeIn', {
    start: 'top 85%',
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, ease: eases.smoothReveal }),
    onLeave: (batch) => gsap.to(batch, { opacity: 0, y: -20 }),
    onEnterBack: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15 }),
    onLeaveBack: (batch) => gsap.to(batch, { opacity: 0, y: 20 }),
  });
};

export { gsap, ScrollTrigger, eases };