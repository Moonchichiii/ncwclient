import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { useNavigation } from '../../context/NavigationContext';
import { usePageAnimations } from '../../hooks/usePageAnimation';

const RootLayout: FC = () => {
  const { showHeader } = useNavigation();
  const { smoothWrapperRef, smoothContentRef } = usePageAnimations();

  return (
    <div className="min-h-screen flex flex-col relative bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-800 opacity-20" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Center Line */}
      <div
        className="fixed left-1/2 h-full w-[1px] opacity-20 top-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, white 30%, white 70%, transparent 100%)'
        }}
      />

      {/* Header - Initially hidden */}
      {showHeader && (
        <Header className="header relative z-10 transform -translate-y-full" />
      )}

      {/* Main Content */}
      <div className="flex-1 relative z-10">
      <div id="smooth-wrapper" ref={smoothWrapperRef}>
      <div id="smooth-content" ref={smoothContentRef}>
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
      </div>

      {/* Footer - Initially hidden */}
      <Footer className="footer relative z-10 transform translate-y-full opacity-0" />
    </div>
  );
};

export default RootLayout;