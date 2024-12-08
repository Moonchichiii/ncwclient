// src/hooks/gsap-init.ts

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const useGSAPSetup = () => {
  useEffect(() => {
    // Kill all existing ScrollTriggers to prevent duplicates
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Select essential elements
    const panelsSection = document.querySelector("#panels");
    const panelsContainer = document.querySelector("#panels-container");
    const header = document.querySelector("#masthead");

    if (!panelsSection || !panelsContainer || !header) return;

    // GSAP configuration
    gsap.config({
      autoSleep: 60,
      force3D: true,
      nullTargetWarn: false,
    });

    // Create GSAP context
    const ctx = gsap.context(() => {
      // **Header Visibility ScrollTrigger**
      ScrollTrigger.create({
        trigger: "#home",
        start: "top center",
        end: "#contact top center",
        markers: true,
        onUpdate: (self) => {
          if (self.direction === 1) { // Scrolling down
            if (self.progress > 0) {
              gsap.to(header, {
                opacity: 1,
                pointerEvents: 'auto',
                duration: 0.3,
                ease: 'power3.out'
              });
            }
          } else { // Scrolling up
            if (self.progress <= 0) {
              gsap.to(header, {
                opacity: 0,
                pointerEvents: 'none',
                duration: 0.3,
                ease: 'power3.in'
              });
            }
          }
        }
      });

      // **Horizontal Scroll Setup**
      const panels = gsap.utils.toArray('.panel');      
      const panelEndMarkers = gsap.utils.toArray('.panel-end'); // Ensure these exist or remove snap

      const horizontalScroll = gsap.to(panelsContainer, {
        x: () => -(panelsContainer.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: panelsSection,
          start: "top top",
          end: () => `+=${panelsContainer.scrollWidth - window.innerWidth}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          snap: {
            snapTo: (value) => {
              // Find nearest panel marker
              const progress = value;
              const snapPoints = panelEndMarkers.length > 0
                ? panelEndMarkers.map((_, i) => i / (panels.length - 1))
                : panels.map((_, i) => i / (panels.length - 1)); // Fallback if no markers
              const closest = snapPoints.reduce((prev, curr) =>
                Math.abs(curr - progress) < Math.abs(prev - progress) ? curr : prev
              );
              return closest;
            },
            duration: { min: 0.2, max: 0.3 },
            delay: 0,
            ease: "power1.inOut"
          },
          invalidateOnRefresh: true,
        }
      });

      // **Navigation Click Handling**
      document.querySelectorAll('.anchor-nav a').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const target = e.currentTarget as HTMLAnchorElement;
          const targetId = target.getAttribute('href');
          if (!targetId) return;

          const targetElement = document.querySelector(targetId);
          const targetMarker = document.querySelector(`#${targetId.replace('#', '')}`);

          if (!targetElement) return;

          // Handle horizontal scroll section
          if (targetElement.closest('#panels-container')) {
            const panel = targetElement.closest('.panel');
            if (panel) {
              const panelIndex = Array.from(panels).indexOf(panel);
              const progress = panelIndex / (panels.length - 1);
              horizontalScroll.scrollTrigger?.scroll(
                horizontalScroll.scrollTrigger.start +
                (horizontalScroll.scrollTrigger.end - horizontalScroll.scrollTrigger.start) * progress
              );
            }
          } else {
            // Vertical scrolling to section marker
            gsap.to(window, {
              duration: 1,
              scrollTo: {
                y: targetMarker || targetElement,
                offsetY: 0,
                autoKill: false
              },
              ease: "power2.inOut"
            });
          }
        });
      });

      // **Section Transition ScrollTriggers**
      const sections = ['intro', 'home', 'panels', 'contact'];
      sections.forEach((section, index) => {
        if (index < sections.length - 1) {
          ScrollTrigger.create({
            trigger: `#${section}`,
            start: "top center",
            end: `#${sections[index + 1]} top center`,
            markers: false, // Set to true for debugging
            onLeave: () => {
              // Transition to next section
              gsap.to(window, {
                duration: 0.5,
                scrollTo: {
                  y: `#${sections[index + 1]}`,
                  offsetY: 0,
                  autoKill: false
                },
                ease: "power2.inOut"
              });
            },
            onLeaveBack: () => {
              // Transition to previous section
              if (index > 0) {
                gsap.to(window, {
                  duration: 0.5,
                  scrollTo: {
                    y: `#${sections[index - 1]}`,
                    offsetY: 0,
                    autoKill: false
                  },
                  ease: "power2.inOut"
                });
              }
            }
          });
        }
      });
    }, panelsContainer); // Context based on panelsContainer

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ctx.revert();
    };
  }, []);
};
