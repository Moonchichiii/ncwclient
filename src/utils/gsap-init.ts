import gsap from 'gsap';
import { ScrollTrigger, ScrollSmoother, SplitText, CustomEase } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, CustomEase);

gsap.defaults({
  ease: 'power2.out',
  duration: 0.7,
});

ScrollTrigger.defaults({
  limitCallbacks: true,
  markers: false,
  invalidateOnRefresh: true,
  ignoreMobileResize: true,
});

const eases = {
  textReveal: CustomEase.create('textReveal', 'M0,0 C0.25,0.1 0.25,1 1,1'),
  headerSlide: CustomEase.create('headerSlide', 'M0,0,C0.4,0,0.2,1,1,1'),
  smoothReveal: CustomEase.create('smoothReveal', 'M0,0,C0.25,0.1,0.5,1,1,1'),
};

export { gsap, ScrollTrigger, eases };
