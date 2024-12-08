import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavigationProvider } from './context/NavigationContext';

import RootLayout from './components/layout/RootLayout';
import LandingPage from './pages/Landing/LandingPage';
import HomePage from './pages/Home/HomePage';
import PortfolioPage from './pages/Portfolio/PortfolioPage';
import AboutPage from './pages/About/AboutPage';
import ContactPage from './pages/Contact/ContactPage';

const App: FC = () => {
  return (
    <NavigationProvider>
      <div className="relative min-h-screen bg-surface-darker text-white">
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </div>
    </NavigationProvider>
  );
};

export default App;
