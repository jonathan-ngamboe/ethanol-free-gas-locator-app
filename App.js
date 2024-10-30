import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { TabNavigator } from './src/navigation/TabNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthContext';
import { SnackbarProvider } from './src/context/SnackbarContext';
import SnackbarNotification from './src/components/SnackbarNotification'; 

function AppContent() {
  const { theme } = useTheme();

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
        <SnackbarNotification /> 
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default function App() {
  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeProvider>
              <AuthProvider>
                <SnackbarProvider>
                  <AppContent />
                </SnackbarProvider>
              </AuthProvider>
          </ThemeProvider>
      </GestureHandlerRootView>
  );
}