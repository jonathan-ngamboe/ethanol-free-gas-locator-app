import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../../context/ThemeContext';
import { useGlobalStyles } from '../../styles/globalStyles';
import AuthScreen from '../../screens/AuthScreen';

const Stack = createStackNavigator();

export const AuthStack = () => {
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
        name="Authentification"
        component={AuthScreen}
        options={{
            headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};