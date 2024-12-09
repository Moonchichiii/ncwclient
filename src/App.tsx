import { FC, lazy, Suspense } from 'react';
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
  useGSAPSetup();

  return (
    <div id="page" className="bg-surface-darker">
      {/* Background Pattern - Consistent across all sections */}
      <div className="fixed inset-0 w-full h-full pointer-events-none bg-pattern" />
     
      <Suspense fallback={<LoadingSpinner />}>
        <header
          id="masthead"
          className="site-header opacity-0 pointer-events-none"
        >
          <nav className="anchor-nav p-4 bg-black/80 backdrop-blur-sm flex flex-wrap gap-2 md:gap-4">
            <Header />
          </nav>
        </header>

        <main id="content" className="site-content relative" role="main">
          {/* Landing Section */}
          <section id="intro" className="full-screen">
            <LandingPage />
          </section>

          {/* Home Section */}
          <section id="home" className="full-screen">
            <HomePage />
          </section>

          {/* Horizontal Panels Section */}
          <section id="panels" className="relative h-screen overflow-hidden">
            <div id="panels-container" className="absolute top-0 left-0 flex">
              {/* Portfolio Panels */}
              <article id="panel-1" className="panel">
                <div className="portfolio-section">
                  <PortfolioPage />
                </div>
              </article>
             
              <article id="panel-2" className="panel">
                <div className="portfolio-section">
                  <div className="container mx-auto px-4 h-full flex items-center">
                    <h2 className="text-4xl font-bold">Project 2</h2>
                  </div>
                </div>
              </article>

              {/* About Panels */}
              <article id="panel-3" className="panel">
                <div className="about-section">
                  <AboutPage />
                </div>
              </article>

              <article id="panel-4" className="panel">
                <div className="about-section">
                  <div className="container mx-auto px-4 h-full flex items-center">
                    <h2 className="text-4xl font-bold">More About</h2>
                  </div>
                </div>
              </article>

              <article id="panel-5" className="panel">
                <div className="about-section">
                  <div className="container mx-auto px-4 h-full flex items-center">
                    <h2 className="text-4xl font-bold">Experience</h2>
                  </div>
                </div>
              </article>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="full-screen">
            <ContactPage />
          </section>
        </main>

        <footer id="footer" className="relative z-[100] w-full bg-black text-white p-8">
          <div className="container mx-auto">
            <Footer />
          </div>
        </footer>

        <CookieConsent />
      </Suspense>
    </div>
  );
};

export default App;
