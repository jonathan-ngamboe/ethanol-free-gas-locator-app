import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useGlobalStyles } from '../../styles/globalStyles';
import DiscoverScreen from '../../screens/DiscoverScreen';
import StationDetails from '../../screens/StationDetails';

const Stack = createStackNavigator();

export const DiscoverStack = () => {
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
        name="Map" 
        component={DiscoverScreen}
        options={{
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="StationDetails" 
        component={StationDetails}
        options={{
          headerTitle: "", 
          headerRight: () => (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Icon 
                name="heart-outline" 
                size={24} 
                style={{ marginRight: 20 }} 
                color={theme.colors.primary} 
              />
              <Icon 
                name="dots-vertical" 
                size={24} 
                style={{ marginRight: 20 }} 
                color={theme.colors.primary} 
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};