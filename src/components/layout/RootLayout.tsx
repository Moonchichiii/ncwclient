import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { useNavigation } from '../../context/NavigationContext';
import { pageTransitions } from '../../utils/gsap-init';

const RootLayout = () => {
  const { showHeader } = useNavigation();
  const location = useLocation();
  const mainRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!mainRef.current) return;

    // Determine transition direction based on route
    const direction = ['/portfolio', '/about'].includes(location.pathname) 
      ? 'horizontal' 
      : 'vertical';

    pageTransitions.enterPage(mainRef.current, direction);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 bg-black pointer-events-none">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-800 opacity-20" />
      </div>

      {/* Header */}
      {showHeader && (
        <Header className="fixed top-0 left-0 right-0 z-header backdrop-blur-md" />
      )}

      {/* Main Content */}
      <main
        ref={mainRef}
        className="flex-1 relative"
        style={{
          paddingTop: showHeader ? '80px' : '0',
        }}
      >
        <Outlet />
      </main>

      {/* Footer */}
      <Footer className="relative z-base" />
    </div>
  );
};

export default RootLayout;