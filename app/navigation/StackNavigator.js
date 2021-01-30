
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar, Avatar, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons'; 


import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotpwdScreen from '../screens/ForgotpwdScreen';
import ContentScreen from '../screens/ContentScreen';
import YoutubeScreen from '../screens/YoutubeScreen';
import AddtolistScreen from '../screens/AddtolistScreen';
import MylistScreen from '../screens/MylistScreen';

const Stack = createStackNavigator()

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
          <Octicons name="three-bars" size={34}  color="white" style={{paddingLeft: 5}}/>
        </TouchableOpacity>
      )}
      <Appbar.Content
        title={
          previous ? title : <Image source={require('../assets/flexstream.png')} />
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
          options={{ headerTitle: '' }}
        />
        <Stack.Screen
          name="Youtube"
          component={YoutubeScreen}
          options={{ headerTitle: 'Details' }}
        />
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
        <Stack.Screen
          name="Addtolist"
          component={AddtolistScreen}
          options={{ 
            title: null
          }}
        />
        <Stack.Screen
          name="Mylist"
          component={MylistScreen}
          options={{ 
            title: "My Lists"
          }}
        />
      </Stack.Navigator>
    )
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
              <Stack.Screen
                name="Mylist"
                component={MylistScreen}
                options={{ 
                  title: "My lists"
                }}
              />
          </Stack.Navigator>
      )
  }

  export { MainStackNavigator, UserStackNavigator };

  
 
