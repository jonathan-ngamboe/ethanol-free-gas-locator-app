import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../../context/ThemeContext';
import { useGlobalStyles } from '../../styles/globalStyles';
import StationDetails from '../../screens/StationDetails';
import ListScreen from '../../screens/ListScreen';
import StationViewHeader from '../../components/StationViewHeader';


const Stack = createStackNavigator();


export const ListScreenStack = () => {
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
            name="List Screen"
            component={ListScreen}
            options={({ route }) => ({
                headerTitle: route.params?.pageTitle || "List",
                headerTitleStyle: { color: 'transparent' },
            })}
        />

        <Stack.Screen 
            name="StationDetails" 
            component={StationDetails}
            options={{
            headerTitle: "", 
            headerRight: () => (<StationViewHeader />),
            }}
        />

    </Stack.Navigator>
  );
};