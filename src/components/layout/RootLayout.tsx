import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { usePageAnimation } from '../../hooks/usePageAnimation';

const RootLayout = () => {
  const { mainRef, isTransitioning } = usePageAnimation();
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-800 opacity-20 z-0" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div
        className="fixed left-1/2 h-full w-[1px] opacity-20 top-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, white 30%, white 70%, transparent 100%)',
        }}
      />

      <Header />

      <div className="relative flex flex-col h-full">
      <div id="smooth-wrapper">
  <div id="smooth-content">
        <motion.main
          ref={mainRef}
          className={`flex-1 overflow-hidden ${isTransitioning ? 'opacity-80' : 'opacity-100'}`}
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255, 255, 255, 0.1) transparent',
          }}
        >
          <div className="relative z-10 min-h-full">
            <Outlet />
          </div>
          
        </motion.main>
        </div>
</div>

        <AnimatePresence>
          {isContactPage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RootLayout;
