import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../../context/ThemeContext';
import { useGlobalStyles } from '../../styles/globalStyles';
import HomeScreen from '../../screens/HomeScreen';
import { ProfileStack } from './ProfileStack';

const Stack = createStackNavigator();

export const HomeStack = () => {
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
        name="Home" 
        component={HomeScreen}
        options={{
          headerTitleAlign: 'left',
        }} 
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};