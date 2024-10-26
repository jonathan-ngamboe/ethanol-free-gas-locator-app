import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../../context/ThemeContext';
import { useGlobalStyles } from '../../styles/globalStyles';
import HomeScreen from '../../screens/HomeScreen';
import StationDetails from '../../screens/StationDetails';
import { ProfileStack } from './ProfileStack';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DotMenu from '../../components/DotMenu';


const Stack = createStackNavigator();

export const HomeStack = () => {
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
        headerTitleStyle: [styles.headerTitle, { color: theme.colors.background }],
        headerTintColor: theme.colors.primary,
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          headerTitleAlign: 'left',
          headerBackground: () => <View style={{flex: 1, backgroundColor: theme.colors.onBackground}} />,
        }} 
      />

      <Stack.Screen 
        name="ProfileStack" 
        component={ProfileStack}
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