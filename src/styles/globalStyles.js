import { StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SearchBar } from 'react-native-screens';

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

    textColor: {
      color: theme.colors.onBackground,
    },
  
    tabBar: {
      backgroundColor: theme.colors.background,
      borderTopColor: theme.colors.background,
    },

    cardBackgroundColor: {
      backgroundColor: theme.colors.inverseOnSurface,
    },

    avatar: {
      backgroundColor: theme.colors.accent,
    },

    searchBar: {
      borderColor: theme.colors.outline,
    },

    moreIndicator: {
      color: theme.colors.background,
      backgroundColor: theme.colors.onBackground,
    },
  
  });
};
