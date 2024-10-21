import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { useGlobalStyles } from './src/styles/globalStyles';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import StationDetails from './src/screens/StationDetails';
  
const Tab = createBottomTabNavigator();
  
function AppContent() {
  const { theme } = useTheme();
  const styles = useGlobalStyles();

  const HomeStack = createStackNavigator();

  function HomeStackScreen() {
    return (
      <HomeStack.Navigator
        screenOptions={{
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerTintColor: theme.colors.primary,
        }}
      >
        <HomeStack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            headerTitleAlign: 'left',
          }} 
        />
        <HomeStack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{
            headerTitle: "", 
          }}
        />
      </HomeStack.Navigator>
    );
  }

  function DiscoverStackScreen() {
    return (
      <HomeStack.Navigator
        screenOptions={{
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerTintColor: theme.colors.primary,
        }}
      >
        <HomeStack.Screen 
          name="Map" 
          component={DiscoverScreen}
          options={{
            headerShown: false,
          }} 
        />
        <HomeStack.Screen 
          name="StationDetails" 
          component={StationDetails}
          options={{
            headerTitle: "", 
          }}
        />
      </HomeStack.Navigator>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
              tabBarStyle: styles.tabBar,
              tabBarActiveTintColor: theme.colors.primary,
            }}
          >
              <Tab.Screen
                name="HomeStack"
                component={HomeStackScreen}
                options={{
                  tabBarLabel: 'Home',
                  headerShown: false,
                  headerTitleAlign: 'left',
                  tabBarIcon: ({ color, size }) => {
                    return <Icon name="home-variant-outline" size={size} color={color} />;
                  },
                }}
              /> 
              <Tab.Screen
                name="Discover"
                component={DiscoverStackScreen}
                options={{
                  tabBarLabel: 'Discover',
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => {
                    return <Icon name="map-search" size={size} color={color} />;
                  },
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
                  tabBarIcon: ({ color, size }) => {
                    return <Icon name="cog-outline" size={size} color={color} />;
                  },
                }}
              />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
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