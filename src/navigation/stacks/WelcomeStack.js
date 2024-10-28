import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../../context/ThemeContext';
import { useGlobalStyles } from '../../styles/globalStyles';
import { AuthStack } from './AuthStack';
import WelcomeScreen from '../../screens/WelcomeScreen';

const Stack = createStackNavigator();

export const WelcomeStack = () => {
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
        name="Welcome"
        component={WelcomeScreen}
        options={{
            headerShown: false,
        }}
      />
      <Stack.Screen 
        name="AuthStack"
        component={AuthStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};