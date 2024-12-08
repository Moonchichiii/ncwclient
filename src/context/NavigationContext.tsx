import { createContext, useContext, FC } from 'react';

type NavigationContextType = {
  showHeader: boolean;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always show header for simplicity
  const showHeader = true;

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
