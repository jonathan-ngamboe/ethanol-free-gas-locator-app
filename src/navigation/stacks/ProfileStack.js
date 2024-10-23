import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../../context/ThemeContext';
import { useGlobalStyles } from '../../styles/globalStyles';
import FavoriteScreen from '../../screens/FavoriteScreen';
import HistoryScreen from '../../screens/HistoryScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();

export const ProfileStack = () => {
  const { theme } = useTheme();
  const styles = useGlobalStyles();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: theme.colors.primary,
      }}
    >
      <Stack.Screen 
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: "Profile",
          headerTitleStyle: { color: 'transparent' },
          headerRight: () => (
            <Icon 
              name="pencil"
              size={24} 
              style={{ marginRight: 20 }} 
              color={theme.colors.primary} 
            />
          ),
        }}
      />
      <Stack.Screen 
        name="Favorites"
        component={FavoriteScreen}
        options={{
          headerTitle: "", 
        }}
      />
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
};