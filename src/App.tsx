import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { NavigationProvider } from './context/NavigationContext';

// Lazy-loaded components
const RootLayout = lazy(() => import('./components/layout/RootLayout'));
const LandingPage = lazy(() => import('./pages/Landing/LandingPage'));
const HomePage = lazy(() => import('./pages/Home/HomePage'));
const PortfolioPage = lazy(() => import('./pages/Portfolio/PortfolioPage'));
const AboutPage = lazy(() => import('./pages/About/AboutPage'));
const ContactPage = lazy(() => import('./pages/Contact/ContactPage'));

const PageLoader = () => (
  <div className="min-h-screen bg-[#343A40] flex items-center justify-center">
    <LoadingSpinner />
  </div>
);

const App = () => {
  return (
    <NavigationProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<RootLayout />}>
            <Route
              path="/*"
              element={
                <div className="scroll-container">
                  <section id="landing"><LandingPage /></section>
                  <section id="home"><HomePage /></section>
                  <section id="portfolio"><PortfolioPage /></section>
                  <section id="about"><AboutPage /></section>
                  <section id="contact"><ContactPage /></section>
                </div>
              }
            />
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </Suspense>
    </NavigationProvider>
  );
};

export default App;
