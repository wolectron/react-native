import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

import { DrawerContent } from '../components/DrawerContent';

import { MainStackNavigator, UserStackNavigator } from "./StackNavigator";
import { BottomTabNavigator} from "./TabNavigator";



const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={MainStackNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator