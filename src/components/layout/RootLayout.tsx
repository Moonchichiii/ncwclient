import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';
import { motion, AnimatePresence } from 'framer-motion';

const RootLayout = () => {
  const { mainRef, isTransitioning, showFooter } = useHorizontalScroll();

  return (
    <div className="min-h-screen bg-surface-dark">
      <Header />
      <div className="relative flex">
        <main
          ref={mainRef}
          className={`flex-1 pt-20 h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden transition-all duration-500
            ${isTransitioning ? 'opacity-80' : 'opacity-100'}`}
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255, 255, 255, 0.1) transparent'
          }}
        >
          <div className="min-h-full relative">
            <Outlet />
          </div>
          <AnimatePresence>
            {showFooter && (
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
        </main>
      </div>
    </div>
  );
};

export default RootLayout;