import { createContext, useContext, useState } from 'react';

type NavigationContextType = {
  showHeader: boolean;
  setShowHeader: (show: boolean) => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const [showHeader, setShowHeader] = useState(false);

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