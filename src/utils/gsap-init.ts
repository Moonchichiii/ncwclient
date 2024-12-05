// utils/gsap-init.ts
import gsap from 'gsap';
import { 
  ScrollTrigger, 
  ScrollSmoother,
  SplitText,
  CustomEase,
  CustomBounce,
  CustomWiggle,
  MotionPathPlugin,
  MorphSVGPlugin,
  DrawSVGPlugin
} from 'gsap/all';

// Register all GSAP plugins
gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  CustomEase,
  CustomBounce,
  CustomWiggle,
  MotionPathPlugin,
  MorphSVGPlugin,
  DrawSVGPlugin
);

// Configure ScrollTrigger defaults
ScrollTrigger.config({
  limitCallbacks: true,
  syncInterval: 0.5,
  ignoreMobileResize: true
});

// Custom eases for different animations
const eases = {
  textReveal: CustomEase.create('textReveal', 'M0,0 C0.25,0.1 0.25,1 1,1'),
  headerSlide: CustomEase.create('headerSlide', 'M0,0,C0.4,0,0.2,1,1,1'),
  softBounce: CustomBounce.create('softBounce', { strength: 0.6, squash: 2, squashID: "softBounce" }),
  elementHover: CustomWiggle.create('elementHover', { wiggles: 8, type: "random" }),
  smoothReveal: CustomEase.create('smoothReveal', 'M0,0,C0.25,0.1,0.5,1,1,1')
};

// Enhanced smooth scroll with touch support
export const initSmoothScroll = (wrapper: string, content: string) => {
  if (!ScrollSmoother.get()) {
    return ScrollSmoother.create({
      wrapper: wrapper,
      content: content,
      smooth: 1.5,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
      smoothTouch: 0.1, // Light touch smoothing for mobile
      onUpdate: (self) => {
        // Update scroll progress indicator if it exists
        const progress = document.querySelector('.scroll-progress');
        if (progress) {
          gsap.to(progress, {
            width: `${self.progress * 100}%`,
            duration: 0.1,
            ease: 'none'
          });
        }
      }
    });
  }
  return ScrollSmoother.get();
};

// Enhanced page transitions with advanced effects
export const pageTransition = {
  enter: (container: HTMLElement) => {
    const titles = container.querySelectorAll('h1, h2');
    const paragraphs = container.querySelectorAll('p');
    const images = container.querySelectorAll('img');
    const cards = container.querySelectorAll('.card');

    const tl = gsap.timeline({
      defaults: { ease: eases.smoothReveal }
    });

    // Temporarily disable scroll during transition
    ScrollTrigger.getAll().forEach(st => st.disable());
    
    // Split and animate text with MorphSVG for special characters
    titles.forEach(title => {
      const splitter = new SplitText(title, { 
        type: 'chars,words,lines',
        charsClass: 'char',
        wordsClass: 'word',
        linesClass: 'line'
      });

      tl.from(splitter.chars, {
        opacity: 0,
        y: 50,
        rotateX: -90,
        stagger: 0.02,
        duration: 0.7,
        ease: eases.textReveal
      }, '-=0.6');
    });

    // Animate other elements with custom effects
    tl.from(paragraphs, {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      ease: eases.softBounce
    }, '-=0.4')
    .from(images, {
      opacity: 0,
      scale: 0.8,
      stagger: 0.1,
      duration: 0.8,
      ease: 'back.out(1.7)'
    }, '-=0.6')
    .from(cards, {
      opacity: 0,
      scale: 0.9,
      rotation: -5,
      stagger: 0.1,
      duration: 1,
      ease: eases.softBounce
    }, '-=0.7');

    // Re-enable scroll after animation
    setTimeout(() => {
      ScrollTrigger.getAll().forEach(st => st.enable());
    }, 1500);

    return tl;
  },

  leave: (container: HTMLElement) => {
    const tl = gsap.timeline();
    
    // Capture current scroll position
    const scrollPos = window.scrollY;
    
    tl.to(container, {
      opacity: 0,
      y: -50,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        // Restore scroll position after transition
        window.scrollTo(0, scrollPos);
      }
    });

    return tl;
  }
};

// Enhanced scroll triggers with advanced effects
export const initScrollTriggers = () => {
  // Batch animations for performance
  ScrollTrigger.batch('.fadeIn', {
    start: 'top 85%',
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 1,
      ease: eases.smoothReveal,
      overwrite: true
    }),
    onLeave: batch => gsap.to(batch, {
      opacity: 0,
      y: -20,
      overwrite: true
    }),
    onEnterBack: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      overwrite: true
    }),
    onLeaveBack: batch => gsap.to(batch, {
      opacity: 0,
      y: 20,
      overwrite: true
    })
  });

  // Special animations for cards
  ScrollTrigger.batch('.card', {
    start: 'top 85%',
    onEnter: batch => gsap.to(batch, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      stagger: 0.1,
      duration: 1,
      ease: eases.softBounce,
      clearProps: 'all'
    })
  });
};

// Export eases for reuse
export { eases };