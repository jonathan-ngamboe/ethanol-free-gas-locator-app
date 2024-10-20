import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme, Appearance } from 'react-native';
import { lightTheme, darkTheme } from '../styles/theme';

const ThemeContext = createContext();

// ThemeProvider component to wrap the entire app with the theme context
export const ThemeProvider = ({ children }) => {
    // Get the device theme
    const deviceTheme = useColorScheme();
    
    // State to hold the current theme
    const [isDarkMode, setIsDarkMode] = useState(deviceTheme === 'dark');
    
    // Listen to changes in device theme
    useEffect(() => {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setIsDarkMode(colorScheme === 'dark');
      });
  
      // Clean up the subscription
      return () => {
        subscription.remove();
      };
    }, []);
  
    // Get the theme based on the state
    const theme = isDarkMode ? darkTheme : lightTheme;
  
    // Fonction pour changer manuellement le thème
    const toggleTheme = () => {
      setIsDarkMode(!isDarkMode);
    };
  
    // Wrap the entire app with the theme context to make the theme available to all components
    return (
      <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  };
  
  // Personnalised hook to get the theme context
  export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error("useTheme doit être utilisé à l'intérieur de ThemeProvider");
    }
    return context;
  };