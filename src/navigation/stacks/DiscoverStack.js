import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useGlobalStyles } from '../../styles/globalStyles';
import DiscoverScreen from '../../screens/DiscoverScreen';
import StationDetails from '../../screens/StationDetails';
import DotMenu from '../../components/DotMenu';
import { share, openEmail, copyToClipboard } from '../ExternalNavigation';

const Stack = createStackNavigator();

export const DiscoverStack = () => {
  const { theme } = useTheme();
  const styles = useGlobalStyles();

  const items = [
    { title: 'Share', icon: 'share-variant', onPress: () => share('Check out this station!') },
    { title: 'Report', icon: 'alert-circle-outline', onPress: () => openEmail('contact@ethanol-free-gas-locator.app') },
    { title: 'Copy address', icon: 'content-copy', onPress: () => copyToClipboard('1234 Station St, Houston, TX 77002') },
  ];

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
                <DotMenu items={items} color={theme.colors.primary} style={{ marginRight: 20 }} />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};