// NavigationContext.tsx
import { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type NavigationContextType = {
  showHeader: boolean;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  // Automatically determine if the header should be shown based on the route
  const showHeader = location.pathname !== '/';

  return (
    <NavigationContext.Provider value={{ showHeader }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useNavigation must be used within NavigationProvider');
  return context;
};
