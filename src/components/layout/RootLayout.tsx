import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { useNavigation } from '../../context/NavigationContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RootLayout = () => {
  const { showHeader, setShowHeader } = useNavigation();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Remove any old triggers if present
    ScrollTrigger.getAll().forEach(st => st.kill());
    
    const landingPage = document.getElementById('landing-page');
    if (!landingPage) return;

    // Create a trigger that toggles the header visibility based on scroll position
    ScrollTrigger.create({
      trigger: landingPage,
      start: "bottom 80%", // Adjust as needed. When bottom of landing hits 80% viewport height
      onEnter: () => setShowHeader(true),      // Once we scroll past this point, show the header
      onLeaveBack: () => setShowHeader(false)  // If we scroll back up above this point, hide the header again
    });

    // Initial header positioning based on route. If you always want it hidden on landing:
    if (window.location.pathname === '/') {
      setShowHeader(false);
      gsap.set(headerRef.current, { yPercent: -100 });
    } else {
      setShowHeader(true);
      gsap.set(headerRef.current, { yPercent: 0 });
    }

    // Refresh ScrollTrigger to ensure it calculates positions correctly
    ScrollTrigger.refresh();
  }, [setShowHeader]);

  return (
    <div className="min-h-screen bg-surface-darker">
      {/* Fixed Background */}
      <div className="fixed inset-0 z-[1]">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-800 opacity-20" />
      </div>

      {/* Header */}
      <div ref={headerRef} className="fixed top-0 left-0 right-0 z-[100] transition-transform duration-500">
        <Header
          className={`w-full backdrop-blur-md border-b border-white/10 ${
            showHeader ? 'translate-y-0' : '-translate-y-full'
          }`}
        />
      </div>

      {/* Main Content */}
      <main
        className="relative z-[10] min-h-screen"
        style={{
          paddingTop: showHeader ? '80px' : '0',
          willChange: 'transform'
        }}
      >
        <Outlet />
      </main>

      {/* Footer */}
      <div className="relative z-[50]">
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
