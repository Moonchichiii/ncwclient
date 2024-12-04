import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { NavigationProvider } from './context/NavigationContext';

// Lazy-loaded components
const RootLayout = lazy(() => import('./components/layout/RootLayout.tsx'));
const LandingPage = lazy(() => import('./pages/Landing/LandingPage.tsx'));
const HomePage = lazy(() => import('./pages/Home/HomePage.tsx'));
const PortfolioPage = lazy(() => import('./pages/Portfolio/PortfolioPage.tsx'));
const AboutPage = lazy(() => import('./pages/About/AboutPage.tsx'));
const ContactPage = lazy(() => import('./pages/Contact/ContactPage.tsx'));






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
            <Route path="/home" element={
              <Suspense fallback={<PageLoader />}>
                <HomePage />
              </Suspense>
            } />
            <Route path="/portfolio" element={
              <Suspense fallback={<PageLoader />}>
                <PortfolioPage />
              </Suspense>
            } />
            <Route path="/about" element={
              <Suspense fallback={<PageLoader />}>
                <AboutPage />
              </Suspense>
            } />
            <Route path="/contact" element={
              <Suspense fallback={<PageLoader />}>
                <ContactPage />
              </Suspense>
            } />
          </Route>
        </Routes>
      </Suspense>
    </NavigationProvider>
  );
};

export default App;



your suggestion ??? : 
const pageVariants = {
  initial: (custom) => ({
    opacity: 0,
    y: custom?.transition === 'slide-up' ? '100%' : 0,
    x: custom?.transition === 'slide-horizontal' ? '100%' : 0
  }),
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1]
    }
  },
  exit: (custom) => ({
    opacity: 0,
    y: custom?.transition === 'slide-up' ? '-100%' : 0,
    x: custom?.transition === 'slide-horizontal' ? '-100%' : 0,
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1]
    }
  })
};

const PageWrapper = ({ children }) => {
  const location = useLocation();
  const prevPath = location.state?.previousPath;
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      custom={{ 
        transition: location.state?.transition,
        previousPath: prevPath
      }}
    >
      {children}
    </motion.div>
  );
};

// Modified Routes in App.tsx
const App = () => {
  return (
    <NavigationProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
          <Route element={<RootLayout />}>
            <Route path="/home" element={
              <PageWrapper>
                <HomePage />
              </PageWrapper>
            } />
            {/* Other routes with PageWrapper */}
          </Route>
        </Routes>
      </AnimatePresence>
    </NavigationProvider>
  );
};