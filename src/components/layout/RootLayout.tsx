import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const RootLayout: FC = () => {
  return (
    <div className="root-layout">
      {/* Always visible header */}
      <Header className="site-header visible" />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer className="site-footer" />
    </div>
  );
};

export default RootLayout;
