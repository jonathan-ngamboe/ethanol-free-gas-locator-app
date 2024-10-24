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

    shadow: {
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25, 
      shadowColor: theme.colors.onSurface,
    },

    contentPaddingLeft: {
      paddingLeft: 30,
    },

    contentPaddingRight: {
      paddingRight: 20,
    },

    contentPaddingHorizontal: {
      paddingHorizontal: 20,
    },

    listTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      lineHeight: 0,
    },

    listSection: {
      width: '100%',
      marginTop: 10,
    },

    listDescription: {
      fontSize: 14,
      lineHeight: 0,
    },

    divider: {
      marginHorizontal: 20,
      marginVertical: 10,
  },
  
  });
};
