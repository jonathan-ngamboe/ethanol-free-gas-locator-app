import { StyleSheet } from 'react-native';

export const globalStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.backgroundColor,
  },

  header: {
    backgroundColor: theme.backgroundColor,
    shadowColor: theme.backgroundColor,
  },

  headerTitle: {
    fontSize: 32,
    color: theme.textColor,
  },

  tabBar: {
    backgroundColor: theme.backgroundColor,
    borderTopColor: theme.backgroundColor,
  },

  tabBarLabel: {
    color: theme.secondaryTextColor,
  },
});
