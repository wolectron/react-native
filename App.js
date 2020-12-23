import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux'
import store from './app/redux/store'
import SplashScreen from './app/screens/SplashScreen';
import HomeScreen from './app/screens/HomeScreen';

import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './app/screens/LoginScreen';

const Stack = createStackNavigator();

Stack.navigationOptions = { header: null };

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
          <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ 
                  headerShown: false,
                  title: 'Home',
                }}
              />
              <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{ 
                  headerShown: false,
                  title: 'Home',
                }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ 
                  title: null,
                  headerStyle: {
                    backgroundColor: '#ffffff',
                  },
                }}
              />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
      </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dodgerblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
