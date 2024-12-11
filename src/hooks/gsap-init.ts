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

interface SetShowHeader {
  (show: boolean): void;
}

const setupHeaderAnimation = (
  headerRef: RefObject<HTMLElement>, 
  lastScrollY: RefObject<number>,
  setShowHeader: SetShowHeader
) => {
  if (!headerRef.current) return;

  // Set initial state
  setShowHeader(false);

  // Landing page section - keep header hidden
  ScrollTrigger.create({
    trigger: '#intro',
    start: 'top top',
    end: 'bottom bottom',
    onEnter: () => {
      setShowHeader(false);
    },
    onEnterBack: () => {
      setShowHeader(false);
    }
  });
  
  // Create trigger for home section
  ScrollTrigger.create({
    trigger: '#home',
    start: 'top bottom-=20%',
    end: 'bottom top',
    onEnter: () => {
      setShowHeader(true);
    },
    onLeave: () => {
      setShowHeader(true);
    },
    onLeaveBack: () => {
      setShowHeader(false);
    }
  });
  
  // Global scroll behavior
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const scrollY = window.scrollY;
      const isPassedIntro = scrollY > window.innerHeight;
  
      if (isPassedIntro) {
        const direction = self.direction;
        const delta = scrollY - lastScrollY.current;
  
        if (direction === 1 && delta > 50) {
          setShowHeader(false);
        } else if (direction === -1) {
          setShowHeader(true);
        }
      }
  
      lastScrollY.current = scrollY;
    }
  });
};

// Add these functions back
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

export const useGSAPSetup = (
  headerRef?: RefObject<HTMLElement>,
  setShowHeader?: SetShowHeader
) => {
  const lastScrollY = useRef(0);
  const cleanupRef = useRef<(() => void)[]>([]);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useLayoutEffect(() => {
    if (!setShowHeader || !headerRef) return;

    // Clean up existing animations
    ScrollTrigger.getAll().forEach(t => t.kill());
    gsap.killTweensOf(window);
    cleanupRef.current.forEach(cleanup => cleanup());
    cleanupRef.current = [];

    // Set initial state
    setShowHeader(false);

    // Cache DOM elements
    const elements = {
      header: headerRef.current,
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
      setupHeaderAnimation(headerRef, lastScrollY, setShowHeader);

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
  }, [headerRef, setShowHeader]);
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