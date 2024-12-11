import { FC, lazy, Suspense, useRef, useState } from 'react';
import { useGSAPSetup } from './hooks/gsap-init';
import LoadingSpinner from './components/common/LoadingSpinner';
import CookieConsent from './components/common/CookieConsent';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const Header = lazy(() => import('./components/layout/Header'));
const Footer = lazy(() => import('./components/layout/Footer'));

const App: FC = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [showHeader, setShowHeader] = useState(false);

  useGSAPSetup(headerRef, setShowHeader);

  return (
    <div className="min-h-screen">
      {showHeader && (
        <header
          ref={headerRef}
          id="masthead"
          className={`fixed top-0 left-0 right-0 w-full bg-white/90 dark:bg-black/80
            backdrop-blur-md border-b border-gray-200/20 dark:border-white/10
            transform transition-transform duration-300 z-50
            ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}
        >
          <Header />
        </header>
      )}

      <section id="intro" className="min-h-screen">
        <LandingPage />
      </section>

      <Suspense fallback={<LoadingSpinner />}>
        <section id="home" className="min-h-screen">
          <HomePage />
        </section>

        <section id="portfolio" className="min-h-screen">
          <PortfolioPage />
        </section>

        <section id="about" className="min-h-screen">
          <AboutPage />
        </section>

        <section id="contact" className="min-h-screen">
          <ContactPage />
        </section>

        <footer className="bg-theme-light-bg dark:bg-theme-dark-bg 
          text-theme-light-text dark:text-theme-dark-text 
          border-t border-black/10 dark:border-white/10">
          <Footer />
        </footer>

        <CookieConsent />
      </Suspense>
    </div>
  );
};

export default App;
