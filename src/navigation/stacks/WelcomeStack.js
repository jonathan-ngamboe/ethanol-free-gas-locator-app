import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../../context/ThemeContext';
import { useGlobalStyles } from '../../styles/globalStyles';
import AuthScreen from '../../screens/AuthScreen';
import WelcomeScreen from '../../screens/WelcomeScreen';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

export const WelcomeStack = () => {
  const { theme } = useTheme();
  const styles = useGlobalStyles();
  const navigation = useNavigation();

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
          headerTitle: '',
          headerRight: () => (
            <View style={localStyles.headerRightContainer}>
              <Text style={[localStyles.headerTitle, { color: theme.colors.outline }]}>
                Already have an account?
              </Text>
              <Button
                mode="text"
                icon="login"
                onPress={() => navigation.navigate('AuthScreen', { screen: 'Sign in' })}
              >
                Sign in
              </Button>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{
          headerTitle: '',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

const localStyles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  headerTitle: {
    marginRight: 8,
  },
});