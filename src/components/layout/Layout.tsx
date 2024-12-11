import { FC, useRef, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useGSAPSetup } from '../../hooks/gsap-init';

const Layout: FC = ({ children }) => {
  const headerRef = useRef<HTMLElement>(null);
  const [showHeader, setShowHeader] = useState(false);

  // Attach GSAP logic to control header visibility
  useGSAPSetup(headerRef, setShowHeader);

  return (
    <div>
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
      
      <main>{children}</main>
      
      <Footer />
    </div>
  );
};

export default Layout;
