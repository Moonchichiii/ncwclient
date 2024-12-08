import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { NavigationProvider } from './context/NavigationContext';

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

  return (
    <NavigationProvider>
      <div className="relative min-h-screen bg-surface-darker text-white">
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
    </NavigationProvider>
  );
};

export default App;
