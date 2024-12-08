import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { useNavigation } from '../../context/NavigationContext';

const RootLayout: React.FC = (): JSX.Element => {
  const { showHeader } = useNavigation();
  const location = useLocation();

  console.log('showHeader:', showHeader, 'path:', location.pathname); // Debug line

  return (
    <div className="root-layout">
      <Header className={`site-header ${showHeader ? 'visible' : ''}`} />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer className="site-footer" />
    </div>
  );
};

export default RootLayout;
