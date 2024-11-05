import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "../../context/ThemeContext";
import { useGlobalStyles } from "../../styles/globalStyles";
import HomeScreen from "../../screens/HomeScreen";
import StationDetails from "../../screens/StationDetails";
import { ProfileStack } from "./ProfileStack";
import { View } from "react-native";
import StationViewHeader from "../../components/StationViewHeader.js";

const Stack = createStackNavigator();

export const HomeStack = () => {
  const { theme } = useTheme();
  const styles = useGlobalStyles();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTitleStyle: [
          styles.headerTitle,
          { color: theme.colors.background },
        ],
        headerTintColor: theme.colors.primary,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitleAlign: "left",
          headerBackground: () => (
            <View
              style={{ flex: 1, backgroundColor: theme.colors.onBackground }}
            />
          ),
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
          headerRight: () => <StationViewHeader />,
        }}
      />
    </Stack.Navigator>
  );
};
