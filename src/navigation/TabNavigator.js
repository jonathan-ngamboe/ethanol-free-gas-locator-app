import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';
import { useGlobalStyles } from '../styles/globalStyles';
import SettingsScreen from '../screens/SettingsScreen';
import { HomeStack } from './stacks/HomeStack';
import { DiscoverStack } from './stacks/DiscoverStack';
import { settingsConstants } from '../constants/storageConstants';
import { loadData } from '../utils/asyncStorage';
import { useAuth } from '../context/AuthContext';
import { WelcomeStack } from './stacks/WelcomeStack';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const { session } = useAuth();
  const { theme } = useTheme();
  const styles = useGlobalStyles();

  // Load the startScreen from asyncStorage
  const [startScreen, setStartScreen] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const loadedSettings = await loadData(settingsConstants.SETTINGS_KEY);
      setStartScreen(loadedSettings?.startScreen || 'Discover');
    };
    fetchSettings();
  }, []);

  // Load the tab navigator only when the neme of the startScreen is loaded from asyncStorage
  if (!startScreen) {
    return null;
  }

  return (
    <Tab.Navigator
      initialRouteName={startScreen}
      screenOptions={{
        lazy: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: theme.colors.primary,
      }}
    >
      { session ? ( 
        <>
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              tabBarLabel: 'Home',
              headerShown: false,
              headerTitleAlign: 'left',
              tabBarIcon: ({ color, size }) => (
                <Icon name="home-variant-outline" size={size} color={color} />
              ),
            }}
          /> 
          <Tab.Screen
            name="Discover"
            component={DiscoverStack}
            options={{
              tabBarLabel: 'Discover',
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Icon name="map-search" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen 
            name="Settings" 
            component={SettingsScreen} 
            options={{
              headerStyle: styles.header,
              headerTitleStyle: styles.headerTitle,
              tabBarLabel: 'Settings',
              headerTitleAlign: 'left',
              tabBarIcon: ({ color, size }) => (
                <Icon name="cog-outline" size={size} color={color} />
              ),
            }}
          />
        </>
      ) : 
      <Tab.Screen
        name="WelcomeStack"
        component={WelcomeStack}
        options={{ 
          tabBarButton: () => null, // Hide the button
          headerShown: false,
        }} 
      />
    }
    </Tab.Navigator>
  );
};