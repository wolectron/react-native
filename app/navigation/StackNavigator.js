
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import HtmlrenderScreen from '../screens/HtmlrenderScreen';
import ContentScreen from '../screens/ContentScreen';
import YoutubeScreen from '../screens/YoutubeScreen';

const Stack = createStackNavigator();

Stack.navigationOptions = { header: null };

const MainStackNavigator = () => {
    return (
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
          name="Content"
          component={ContentScreen}
          options={{
            title: null,
            headerStyle: {
              backgroundColor: '#ffffff',
            },
          }}
        />
        <Stack.Screen
          name="Youtube"
          component={YoutubeScreen}
          options={{
            title: null,
            headerStyle: {
              backgroundColor: '#ffffff',
            },
          }}
        />
      </Stack.Navigator>
    );
  }

  const UserStackNavigator = () => {
      return (
          <Stack.Navigator>
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
      );
  }

  const HtmlStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
              name="HTML"
              component={HtmlrenderScreen}
              options={{ 
                title: null,
                headerStyle: {
                  backgroundColor: '#ffffff',
                },
              }}
            />
        </Stack.Navigator>
    );
}

  export { MainStackNavigator, UserStackNavigator, HtmlStackNavigator };