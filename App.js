import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { globalStyles } from './src/styles/globalStyles';
import { lightTheme, darkTheme } from './src/styles/theme';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
  
const Tab = createBottomTabNavigator();
  
export default function App() {
  const currentTheme = lightTheme;

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            headerTitleAlign: 'left',
            headerStyle: globalStyles(currentTheme).header,
            headerTitleStyle: globalStyles(currentTheme).headerTitle,
            tabBarStyle: globalStyles(currentTheme).tabBar,
            tabBarLabelStyle: globalStyles(currentTheme).tabBarLabel,
            tabBarActiveTintColor: currentTheme.primary,
            tabBarInactiveTintColor: currentTheme.textColor,
            tabBarIcon: ({ color, size }) => {
              return <Icon name="home-variant-outline" size={size} color={color} />;
            },
          }}
        /> 
        <Tab.Screen
          name="Discover"
          component={DiscoverScreen}
          options={{
            tabBarLabel: 'Discover',
            headerShown: false,
            headerStyle: globalStyles(currentTheme).header,
            tabBarStyle: globalStyles(currentTheme).tabBar,
            tabBarLabelStyle: globalStyles(currentTheme).tabBarLabel,
            tabBarActiveTintColor: currentTheme.primary,
            tabBarInactiveTintColor: currentTheme.textColor,
            tabBarIcon: ({ color, size }) => {
              return <Icon name="map-search" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{
            tabBarLabel: 'Profile',
            headerTitleAlign: 'left',
            headerStyle: globalStyles(currentTheme).header,
            headerTitleStyle: globalStyles(currentTheme).headerTitle,
            tabBarStyle: globalStyles(currentTheme).tabBar,
            tabBarLabelStyle: globalStyles(currentTheme).tabBarLabel,
            tabBarActiveTintColor: currentTheme.primary,
            tabBarInactiveTintColor: currentTheme.textColor,
            tabBarIcon: ({ color, size }) => {
              return <Icon name="account" size={size} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
