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

    scrollView: {
      flexGrow: 1,
      backgroundColor: theme.colors.background,
      paddingBottom: 20,
    },
  
    header: {
      backgroundColor: theme.colors.background,
      shadowColor: theme.colors.background,
    },
  
    headerTitle: {
      fontSize: 24,
      color: theme.colors.onBackground,
    },

    textColor: {
      color: theme.colors.onBackground,
    },
  
    tabBar: {
      backgroundColor: theme.colors.background,
      borderTopColor: theme.colors.background,
    },

    cardBackgroundColor: {
      backgroundColor: theme.colors.background,
    },

    avatar: {
      backgroundColor: theme.colors.accent,
    },

    moreIndicator: {
      color: theme.colors.background,
      backgroundColor: theme.colors.onBackground,
    },

    dotMenuColor: {
      backgroundColor: theme.colors.inverseOnSurface,
      borderColor: theme.colors.onSurface,
    },
  
  });
};
