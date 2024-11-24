import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { NavigationProvider } from './context/NavigationContext';
// Lazy load components
const RootLayout = lazy(() => import('./components/layout/RootLayout'));
const LandingPage = lazy(() => import('./pages/Landing/LandingPage'));
const HomePage = lazy(() => import('./pages/Home/HomePage'));
const PortfolioPage = lazy(() => import('./pages/Portfolio/PortfolioPage'));
const AboutPage = lazy(() => import('./pages/About/AboutPage'));
const ContactPage = lazy(() => import('./pages/Contact/ContactPage'));

// PageLoader component
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
        <Route path="/" element={<LandingPage />} />
        <Route element={<RootLayout />}>
          <Route
            path="/home"
            element={
              <Suspense fallback={<PageLoader />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/portfolio"
            element={
              <Suspense fallback={<PageLoader />}>
                <PortfolioPage />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<PageLoader />}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<PageLoader />}>
                <ContactPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </Suspense>
    </NavigationProvider>

  );
};

export default App;