import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { usePageAnimation } from '../../hooks/usePageAnimation';
import gsap from 'gsap';
import { ScrollTrigger, ScrollSmoother, SplitText, Flip } from 'gsap';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, Flip);

const RootLayout = () => {
  const { mainRef, isTransitioning } = usePageAnimation();
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  useEffect(() => {
    // Initialize ScrollSmoother
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true
    });

    // Footer animation timeline
    if (isContactPage) {
      gsap.fromTo('.footer-container',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3 }
      );
    }

    return () => {
      smoother.kill();
    };
  }, [isContactPage]);

  return (
    <div className="min-h-screen flex flex-col relative bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-800 opacity-20" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Center Line */}
      <div
        className="fixed left-1/2 h-full w-[1px] opacity-20 top-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, white 30%, white 70%, transparent 100%)',
        }}
      />

      {/* Main Content */}
      <Header className="relative z-10" />
      
      <div className="flex-1 relative z-10">
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <main
              ref={mainRef}
              className={`${isTransitioning ? 'opacity-80' : 'opacity-100'}`}
            >
              <div className="min-h-full">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Footer */}
      {isContactPage && (
        <div className="footer-container relative z-10">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default RootLayout;