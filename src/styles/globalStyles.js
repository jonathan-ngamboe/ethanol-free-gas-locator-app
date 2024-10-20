import { StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export const useGlobalStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
  
    header: {
      backgroundColor: theme.colors.background,
      shadowColor: theme.colors.background,
    },
  
    headerTitle: {
      fontSize: 32,
      color: theme.colors.onBackground,
    },
  
    tabBar: {
      backgroundColor: theme.colors.background,
      borderTopColor: theme.colors.background,
    },
  
  });
};
