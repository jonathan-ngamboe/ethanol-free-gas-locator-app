import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider as PaperProvider } from 'react-native-paper';

import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { useGlobalStyles } from './src/styles/globalStyles';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
  
const Tab = createBottomTabNavigator();
  
function AppContent() {
  const { theme } = useTheme();
  const styles = useGlobalStyles();

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: theme.colors.primary,
          }}
        >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarLabel: 'Home',
                headerTitleAlign: 'left',
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
                tabBarIcon: ({ color, size }) => {
                  return <Icon name="account" size={size} color={color} />;
                },
              }}
            />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
} 