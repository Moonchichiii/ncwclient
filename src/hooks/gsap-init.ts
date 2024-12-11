import { useLayoutEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import ScrollSmoother from 'gsap/ScrollSmoother';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

// Base GSAP configuration
gsap.config({
  autoSleep: 60,
  force3D: true,
  nullTargetWarn: false
});

ScrollTrigger.config({
  limitCallbacks: true,
  ignoreMobileResize: true,
});

interface Section extends Element {
  id?: string;
}

const setupHeaderAnimation = (headerRef: RefObject<HTMLElement>, lastScrollY: RefObject<number>) => {
  if (!headerRef.current) return;

  // Force initial state
  gsap.set(headerRef.current, {
    opacity: 0,
    y: -100,
    pointerEvents: 'none',
    immediateRender: true,
    force3D: true
  });

  // Kill any existing animations on the header
  gsap.killTweensOf(headerRef.current);

  // Create trigger for home section to hide header
  ScrollTrigger.create({
    trigger: '#home',
    start: 'top top',
    end: 'bottom top',
    onEnter: () => {
      gsap.to(headerRef.current, {
        opacity: 0,
        y: -100,
        pointerEvents: 'none',
        duration: 0.4,
        ease: 'power2.out'
      });
    },
    onLeave: () => {
      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        pointerEvents: 'auto',
        duration: 0.4,
        ease: 'power2.out'
      });
    },
    onLeaveBack: () => {
      gsap.to(headerRef.current, {
        opacity: 0,
        y: -100,
        pointerEvents: 'none',
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  });

  // Create scroll trigger for header show/hide after home section
  ScrollTrigger.create({
    start: 'top+=100',
    end: 'max',
    onUpdate: (self) => {
      if (!headerRef.current) return;
      
      const scrollY = window.scrollY;
      const isPassedHome = scrollY > window.innerHeight;

      if (isPassedHome) {
        const direction = self.direction;
        const delta = scrollY - lastScrollY.current;

        if (direction === 1 && delta > 50) {
          // Scrolling down - hide header
          gsap.to(headerRef.current, {
            y: -100,
            opacity: 0,
            pointerEvents: 'none',
            duration: 0.3,
            ease: 'power2.out'
          });
        } else if (direction === -1) {
          // Scrolling up - show header
          gsap.to(headerRef.current, {
            y: 0,
            opacity: 1,
            pointerEvents: 'auto',
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      }

      lastScrollY.current = scrollY;
    }
  });
};

const handleNavClick = (e: MouseEvent) => {
  e.preventDefault();
  const target = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
  if (!target) return;

  const element = document.querySelector(target);
  if (!element) return;

  const header = document.querySelector('.site-header');
  const headerHeight = header?.getBoundingClientRect().height ?? 0;
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const smoother = ScrollSmoother.get();

  if (smoother) {
    smoother.scrollTo(elementPosition - headerHeight, {
      duration: 1,
      ease: 'power2.inOut'
    });
  } else {
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: elementPosition - headerHeight,
        autoKill: true
      },
      ease: 'power2.inOut',
      onComplete: () => {
        window.history.pushState(null, '', target);
      }
    });
  }
};

const setupNavigationHandlers = () => {
  const headerLinks = document.querySelectorAll('header .nav-link');
  const footerLinks = document.querySelectorAll('footer a[href^="#"]');

  const handleClick = (e: Event) => {
    handleNavClick(e as MouseEvent);
  };

  [...headerLinks, ...footerLinks].forEach(link => {
    link.addEventListener('click', handleClick);
  });

  return () => {
    [...headerLinks, ...footerLinks].forEach(link => {
      link.removeEventListener('click', handleClick);
    });
  };
};

const updateActiveNavLink = (sectionId: string) => {
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = (link as HTMLAnchorElement).getAttribute('href');
    if (href === `#${sectionId}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
};

export const useGSAPSetup = (headerRef?: RefObject<HTMLElement>) => {
  const lastScrollY = useRef(0);
  const cleanupRef = useRef<(() => void)[]>([]);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useLayoutEffect(() => {
    // Clean up existing animations
    ScrollTrigger.getAll().forEach(t => t.kill());
    gsap.killTweensOf(window);
    cleanupRef.current.forEach(cleanup => cleanup());
    cleanupRef.current = [];

    // Cache DOM elements
    const elements = {
      header: headerRef?.current ?? document.querySelector('#masthead'),
      sections: gsap.utils.toArray<Section>('.section'),
      footer: document.querySelector('footer'),
      wrapper: document.querySelector('#smooth-wrapper'),
      content: document.querySelector('#smooth-content')
    };

    // Initialize ScrollSmoother
    if (elements.wrapper && elements.content) {
      smootherRef.current = ScrollSmoother.create({
        wrapper: elements.wrapper,
        content: elements.content,
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: true,
        ignoreMobileResize: true
      });
    }

    const ctx = gsap.context(() => {
      // Setup header animations
      if (headerRef) {
        setupHeaderAnimation(headerRef, lastScrollY);
      }

      // Setup navigation
      const cleanupNav = setupNavigationHandlers();
      cleanupRef.current.push(cleanupNav);

      // Section triggers for navigation
      elements.sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            if (section.id) updateActiveNavLink(section.id);
          },
          onEnterBack: () => {
            if (section.id) updateActiveNavLink(section.id);
          }
        });
      });

      // Footer animation
      if (elements.footer) {
        ScrollTrigger.create({
          trigger: elements.footer,
          start: 'top bottom',
          end: 'bottom bottom',
          animation: gsap.from(elements.footer, {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power2.out'
          })
        });
      }
    });

    // Handle window resize
    const handleResize = () => {
      debouncedRefresh();
    };

    window.addEventListener('resize', handleResize);
    cleanupRef.current.push(() => {
      window.removeEventListener('resize', handleResize);
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
      if (smootherRef.current) {
        smootherRef.current.kill();
      }
      cleanupRef.current.forEach(cleanup => cleanup());
      cleanupRef.current = [];
    };
  }, [headerRef]);
};

// Utilities for ScrollTrigger refresh
export const refreshScrollTrigger = () => {
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.kill();
  }
  ScrollTrigger.refresh(true);
};

let refreshTimeout: number;
export const debouncedRefresh = () => {
  window.clearTimeout(refreshTimeout);
  refreshTimeout = window.setTimeout(refreshScrollTrigger, 100);
};