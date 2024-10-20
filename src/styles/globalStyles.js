import { StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export const useGlobalStyles = () => {
  const { theme } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
  
    header: {
      backgroundColor: theme.colors.background,
      shadowColor: theme.colors.background,
    },
  
    headerTitle: {
      fontSize: 24,
      color: theme.colors.onBackground,
    },
  
    tabBar: {
      backgroundColor: theme.colors.background,
      borderTopColor: theme.colors.background,
    },

    cardOnSurfaceColor: {
      backgroundColor: theme.colors.inverseOnSurface,
    },

    cardOnBackgroundColor: {
      backgroundColor: theme.colors.onBackground,
    },

    titleCardColor: {
      color: theme.colors.background,
    },

    avatar: {
      backgroundColor: theme.colors.accent,
    },
  
  });
};
