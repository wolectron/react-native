
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar, Avatar, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotpwdScreen from '../screens/ForgotpwdScreen';
import ContentScreen from '../screens/ContentScreen';
import YoutubeScreen from '../screens/YoutubeScreen';

const Stack = createStackNavigator();

const Header = ({ scene, previous, navigation }) => {
  const theme = useTheme();
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : "test";

  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }}>
      {previous ? (
        <Appbar.BackAction
          onPress={navigation.goBack}
          color={theme.colors.primary}
        />
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Avatar.Image
            size={40}
            source={{
              uri:
                'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
            }}
          />
        </TouchableOpacity>
      )}
      <Appbar.Content
        title={
          previous ? title : <MaterialCommunityIcons name="twitter" size={40} />
        }
      />
    </Appbar.Header>
  );
};

//Stack.navigationOptions = { header: null };

const MainStackNavigator = () => {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        headerMode="screen"
        
        screenOptions={{
          header: ({ scene, previous, navigation }) => (
            <Header scene={scene} previous={previous} navigation={navigation} />
          ),
        }} 

      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerTitle: 'Home' }}
        />
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerTitle: 'Splash' }}
        />
        <Stack.Screen
          name="Content"
          component={ContentScreen}
          options={{ headerTitle: 'Details' }}
        />
        <Stack.Screen
          name="Youtube"
          component={YoutubeScreen}
          options={{ headerTitle: 'Details' }}
        />
      </Stack.Navigator>
    );
  }

  const UserStackNavigator = () => {
      return (
          <Stack.Navigator
              initialRouteName="Login"
          >
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ 
                  title: null
                }}
              />
              <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={{ 
                  title: null
                }}
              />
              <Stack.Screen
                name="Forgotpwd"
                component={ForgotpwdScreen}
                options={{ 
                  title: null
                }}
              />
          </Stack.Navigator>
      );
  }

  export { MainStackNavigator, UserStackNavigator };

  
 