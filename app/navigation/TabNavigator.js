/*
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, UserStackNavigator, HtmlStackNavigator } from "./StackNavigator"

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MainStackNavigator} />
      <Tab.Screen name="Login" component={UserStackNavigator} />
      <Tab.Screen name="HTML" component={HtmlStackNavigator} />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator;
*/

import React from 'react';
import color from 'color';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme } from 'react-native-paper';
import { useSafeArea } from 'react-native-safe-area-context';
import { useIsFocused, RouteProp } from '@react-navigation/native';

import overlay from '../components/Overlay';
import { MainStackNavigator, UserStackNavigator } from "./StackNavigator";

const Tab = createMaterialBottomTabNavigator();

export const BottomTabNavigator = () => {

  const theme = useTheme();
  const safeArea = useSafeArea();
  const isFocused = useIsFocused();

  let icon = 'feather';

  const tabBarColor = theme.dark
    ? (overlay(6, theme.colors.surface))
    : theme.colors.surface;

  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior="initialRoute"
        shifting={true}
        activeColor={theme.colors.primary}
        inactiveColor={color(theme.colors.text)
          .alpha(0.6)
          .rgb()
          .string()}
        sceneAnimationEnabled={false}
      >
        <Tab.Screen
          name="Home"
          component={MainStackNavigator}
          options={{
            tabBarIcon: 'home-account',
            tabBarColor,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={UserStackNavigator}
          options={{
            tabBarIcon: 'account',
            tabBarColor,
          }}
        />
      </Tab.Navigator>
    </React.Fragment>
  );
};
