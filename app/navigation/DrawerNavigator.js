import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { MainStackNavigator, UserStackNavigator } from "./StackNavigator";
import BottomTabNavigator from "./TabNavigator";


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="Login" component={UserStackNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;