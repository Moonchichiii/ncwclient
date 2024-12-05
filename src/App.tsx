import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { NavigationProvider } from './context/NavigationContext';
import { initSmoothScroll, ScrollTrigger } from './utils/gsap-init';

const RootLayout = lazy(() => import('./components/layout/RootLayout'));
const LandingPage = lazy(() => import('./pages/Landing/LandingPage'));
const HomePage = lazy(() => import('./pages/Home/HomePage'));
const PortfolioPage = lazy(() => import('./pages/Portfolio/PortfolioPage'));
const AboutPage = lazy(() => import('./pages/About/AboutPage'));
const ContactPage = lazy(() => import('./pages/Contact/ContactPage'));

const PageLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-surface-darker">
    <LoadingSpinner />
  </div>
);

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize smooth scroll
    const smoother = initSmoothScroll();

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      smoother?.kill();
    };
  }, []);

  return (
    <NavigationProvider>
      <div id="smooth-wrapper" className="fixed inset-0 overflow-hidden">
        <div id="smooth-content">
          <Suspense fallback={<PageLoader />}>
            <Routes location={location}>
              <Route element={<RootLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Route>
            </Routes>
          </Suspense>
        </div>
      </div>
    </NavigationProvider>
  );
};

export default App;