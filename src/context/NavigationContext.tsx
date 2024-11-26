import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type NavigationContextType = {
  showHeader: boolean;
  setShowHeader: (show: boolean) => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const [showHeader, setShowHeader] = useState(false);
  const location = useLocation();

  useEffect(() => {
    
    if (location.pathname !== '/') {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }
  }, [location.pathname]);

  return (
    <NavigationContext.Provider value={{ showHeader, setShowHeader }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};