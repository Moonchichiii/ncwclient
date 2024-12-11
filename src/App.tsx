import { FC, lazy, Suspense, useRef, useState } from 'react';
import { useGSAPSetup } from './hooks/gsap-init';
import LoadingSpinner from './components/common/LoadingSpinner';
import CookieConsent from './components/common/CookieConsent';

// Lazy load components
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
    <div id="page" className="relative min-h-screen bg-theme-light-bg dark:bg-theme-dark-bg transition-colors duration-300">
      {/* Background Pattern */}
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-pattern opacity-5 dark:opacity-10" />
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        {/* Header */}
        <header
          ref={headerRef}
          id="masthead"
          className={`site-header transform ${
            showHeader 
              ? 'translate-y-0 opacity-100 visible'
              : '-translate-y-full opacity-0 invisible pointer-events-none'
          }`}
        >
          <nav className="p-4 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-black/10 dark:border-white/10">
            <Header />
          </nav>
        </header>

        <div id="smooth-wrapper">
          <div id="smooth-content">
            <main id="content" className="relative bg-theme-light-bg dark:bg-theme-dark-bg text-theme-light-text dark:text-theme-dark-text transition-colors duration-300" role="main">
              {/* Landing Section */}
              <section id="intro" className="section min-h-screen">
                <LandingPage />
              </section>

              {/* Home Section */}
              <section id="home" className="section min-h-screen">
                <HomePage />
              </section>

              {/* Portfolio Section */}
              <section id="portfolio" className="section min-h-screen">
                <PortfolioPage />
              </section>

              {/* About Section */}
              <section id="about" className="section min-h-screen">
                <AboutPage />
              </section>

              {/* Contact Section */}
              <section id="contact" className="section min-h-screen">
                <ContactPage />
              </section>
            </main>

            {/* Footer */}
            <footer className="relative z-10 bg-theme-light-bg dark:bg-theme-dark-bg text-theme-light-text dark:text-theme-dark-text border-t border-black/10 dark:border-white/10 transition-colors duration-300">
              <div className="container mx-auto p-8">
                <Footer />
              </div>
            </footer>
          </div>
        </div>

        <CookieConsent />
      </Suspense>
    </div>
  );
};

export default App;