import { FC, lazy, Suspense } from 'react';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/common/LoadingSpinner';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

const App: FC = () => {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <section id="intro" className="min-h-screen">
          <LandingPage />
        </section>

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
      </Suspense>
    </Layout>
  );
};

export default App;
