import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "../../context/ThemeContext";
import { useGlobalStyles } from "../../styles/globalStyles";
import DiscoverScreen from "../../screens/DiscoverScreen";
import StationDetails from "../../screens/StationDetails";
import { ProfileStack } from "./ProfileStack";
import StationViewHeader from "../../components/StationViewHeader";

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
          headerRight: () => <StationViewHeader />,
        }}
      />
      <Stack.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
