import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

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

export default BottomTabNavigator