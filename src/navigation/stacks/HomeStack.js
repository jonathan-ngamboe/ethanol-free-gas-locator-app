import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../context/ThemeContext';
import { useGlobalStyles } from '../../styles/globalStyles';
import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen';

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
        component={ProfileScreen}
        options={{
          headerTitle: "",
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
    </Stack.Navigator>
  );
};